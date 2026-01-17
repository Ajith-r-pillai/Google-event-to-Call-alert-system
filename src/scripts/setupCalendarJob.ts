import { calendarQueue } from "@/queue/calendarQueue";

async function setup() {
  await calendarQueue.add(
    "check-calendar",
    {},
    { repeat: { every: 60 * 1000 } }
  );

  console.log(" Repeat job registered");
  process.exit(0);
}

setup();
