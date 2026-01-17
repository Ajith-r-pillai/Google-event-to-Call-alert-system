import { Queue } from "bullmq";
import { redisConnection } from "@/lib/redis";

export const calendarQueue = new Queue("calendar-reminder", {
  connection: redisConnection,
});
