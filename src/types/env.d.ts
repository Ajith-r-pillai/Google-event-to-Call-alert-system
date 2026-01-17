declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    MONGODB_URI: string;

    REDIS_URL: string;

    TWILIO_ACCOUNT_SID: string;
    TWILIO_AUTH_TOKEN: string;
    TWILIO_PHONE_NUMBER: string;

    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;
  }
}
