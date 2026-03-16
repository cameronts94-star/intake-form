import "./globals.css";

export const metadata = {
  title: "AI Enablement Discovery | Intake",
  description: "Client discovery questionnaire",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
