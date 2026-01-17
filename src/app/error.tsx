"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global error:", error);

  return (
    <html>
      <body style={{ textAlign: "center", padding: 40 }}>
        <h2>Something went wrong 😢</h2>
        <p>{error.message}</p>

        <button
          onClick={() => reset()}
          style={{ marginTop: 20 }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
