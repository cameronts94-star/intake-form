import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function row(label, value) {
  if (!value || (Array.isArray(value) && value.length === 0)) return "";
  const displayValue = Array.isArray(value) ? value.join(", ") : value;
  return `
    <tr>
      <td style="padding:8px 12px;color:#8888a0;font-size:13px;font-weight:500;vertical-align:top;width:38%;white-space:nowrap;border-bottom:1px solid #1e1e38;">${label}</td>
      <td style="padding:8px 12px;color:#e0e0e8;font-size:14px;vertical-align:top;border-bottom:1px solid #1e1e38;">${displayValue.replace(/\n/g, "<br/>")}</td>
    </tr>
  `;
}

function section(title, rows) {
  const content = rows.join("");
  if (!content.trim()) return "";
  return `
    <div style="margin-bottom:28px;">
      <h3 style="color:#2E75B6;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 10px 0;padding:0 0 8px 0;border-bottom:2px solid #2E75B6;">
        ${title}
      </h3>
      <table style="width:100%;border-collapse:collapse;background:#12122a;border-radius:8px;overflow:hidden;">
        <tbody>
          ${content}
        </tbody>
      </table>
    </div>
  `;
}

function buildEmailHtml(data) {
  const {
    contactName,
    companyName,
    email,
    phone,
    industry,
    annualRevenue,
    teamSize,
    yearsInBusiness,
    businessDescription,
    timeConsumingProcesses,
    adminHoursPerWeek,
    biggestBottleneck,
    currentTools,
    currentToolsOther,
    dataStorage,
    apiAccess,
    painPoints,
    painPointsOther,
    mostCostlyProcess,
    successVision,
    timeline,
    budget,
    automationExperience,
    internalChampion,
    dataReadiness,
    additionalNotes,
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Client Intake</title>
</head>
<body style="margin:0;padding:0;background:#0f0f1a;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:680px;margin:0 auto;padding:32px 20px;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1a1a2e,#0f0f2a);border:1px solid #252540;border-radius:12px;padding:28px 32px;margin-bottom:28px;">
      <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:14px;">
        <div style="width:10px;height:10px;border-radius:50%;background:#2E75B6;"></div>
        <span style="color:#8888a0;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">AI Enablement Discovery</span>
      </div>
      <h1 style="color:#e0e0e8;font-size:24px;font-weight:700;margin:0 0 6px 0;letter-spacing:-0.01em;">
        New Client Intake: ${companyName || "Unknown Company"}
      </h1>
      <p style="color:#8888a0;font-size:14px;margin:0;">
        Submitted by <span style="color:#e0e0e8;font-weight:500;">${contactName || "Unknown"}</span>
        ${email ? `(<a href="mailto:${email}" style="color:#2E75B6;text-decoration:none;">${email}</a>)` : ""}
      </p>
      <p style="color:#8888a0;font-size:12px;margin:12px 0 0 0;">
        Submitted on ${new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        })}
      </p>
    </div>

    <!-- Content -->
    <div style="background:#1a1a2e;border:1px solid #252540;border-radius:12px;padding:28px 32px;">

      ${section("Contact Information", [
        row("Contact Name", contactName),
        row("Company Name", companyName),
        row("Email", email),
        row("Phone", phone),
      ])}

      ${section("Company Profile", [
        row("Industry", industry),
        row("Annual Revenue", annualRevenue),
        row("Team Size", teamSize),
        row("Years in Business", yearsInBusiness),
        row("Business Description", businessDescription),
      ])}

      ${section("Current Operations", [
        row("Time-Consuming Processes", timeConsumingProcesses),
        row("Admin Hours/Week", adminHoursPerWeek),
        row("Biggest Bottleneck", biggestBottleneck),
      ])}

      ${section("Technology & Tools", [
        row("Current Tools", currentTools),
        row("Other Tools", currentToolsOther),
        row("Data Storage", dataStorage),
        row("API Access", apiAccess),
      ])}

      ${section("Pain Points", [
        row("Pain Points", painPoints),
        row("Other Pain Points", painPointsOther),
        row("Most Costly Process", mostCostlyProcess),
      ])}

      ${section("Goals & Readiness", [
        row("Success Vision", successVision),
        row("Timeline", timeline),
        row("Budget", budget),
        row("Automation Experience", automationExperience),
        row("Internal Champion", internalChampion),
        row("Data Readiness", dataReadiness),
        row("Additional Notes", additionalNotes),
      ])}

    </div>

    <!-- Footer -->
    <div style="text-align:center;margin-top:20px;color:#8888a0;font-size:12px;">
      This email was sent automatically from your AI Enablement intake form.
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request) {
  try {
    const data = await request.json();

    const { companyName, contactName, email, industry } = data;

    const html = buildEmailHtml(data);

    const { error } = await resend.emails.send({
      from: "Intake Form <onboarding@resend.dev>",
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Intake: ${companyName || "Unknown"} - ${industry || "Unknown"}`,
      replyTo: email || undefined,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Submit route error:", err);
    return Response.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
