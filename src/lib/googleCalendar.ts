export async function getUpcomingEvents(accessToken: string) {
  const now = new Date();

const fifteenMinLater = new Date(now.getTime() + 15 * 60 * 1000);


 const res = await fetch(
  `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
    `timeMin=${now.toISOString()}` +
    `&timeMax=${fifteenMinLater.toISOString()}` +
    `&singleEvents=true&orderBy=startTime`,
  {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
);


  const data = await res.json();

  console.log(" RAW CALENDAR RESPONSE:", data);

  return data.items || [];
}
