import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { refreshGoogleAccessTokenForWorker } from "@/lib/googleAuth";
import { Worker } from "bullmq";
import { redisConnection } from "@/lib/redis";
import clientPromise from "@/lib/mongodb";
import { getUpcomingEvents } from "@/lib/googleCalendar";
import { makeCall } from "@/lib/twilio";

new Worker(
  "calendar-reminder",
  async () => {
    console.log(" Worker triggered at", new Date().toLocaleTimeString());

    const client = await clientPromise;
    const db = client.db();

  const users = await db
  .collection("users")
  .aggregate([
    {
      $match: { phone: { $exists: true } },
    },
    {
      $lookup: {
        from: "accounts",
        localField: "_id",
        foreignField: "userId",
        as: "account",
      },
    },
    { $unwind: "$account" },
    {
      $match: {
        "account.provider": "google",
      },
    },
  ])
  .toArray();


    console.log("👥 Users found:", users.length);

    for (const user of users) {
      console.log(" Checking calendar for:", user.email);

  const accessToken = await refreshGoogleAccessTokenForWorker(
  user.account.refresh_token
);
await db.collection("accounts").updateOne(
  { _id: user.account._id },
  { $set: { access_token: accessToken } }
);


const events = await getUpcomingEvents(accessToken);

      console.log(" Events found:", events.length);
      await db.collection("users").updateOne(
  { _id: user._id },
  { $set: { accessToken } }
);


      for (const event of events) {
        console.log(" Event:", event.summary, event.start?.dateTime);

        if (!event.id || !event.start?.dateTime) continue;

        const alreadyCalled = await db
          .collection("called_events")
          .findOne({
            userEmail: user.email,
            eventId: event.id,
          });

        if (alreadyCalled) {
          console.log("⏭ Already called, skipping");
          continue;
        }

        console.log(" MAKING CALL TO", user.phone);
        await makeCall(user.phone);

        await db.collection("called_events").insertOne({
          userEmail: user.email,
          eventId: event.id,
          calledAt: new Date(),
        });
      }
    }
  },
  { connection: redisConnection }
);
