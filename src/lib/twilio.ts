import twilio from "twilio";
import "dotenv/config";


const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function makeCall(phone: string) {
  try {
    const call = await client.calls.create({
      to: phone,
      from: process.env.TWILIO_PHONE_NUMBER!,
      twiml: `<Response><Say>You have a calendar meeting reminder.</Say></Response>`,
    });

    console.log(" Twilio Call SID:", call.sid);
  } catch (error) {
    console.error(" Twilio call failed:", error);
  }
}
