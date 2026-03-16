"use client";

import { useState } from "react";

const STEPS = [
  "Contact Info",
  "Company Profile",
  "Operations",
  "Tools",
  "Pain Points",
  "Goals",
  "Review",
];

const COLORS = {
  bg: "#0f0f1a",
  card: "#1a1a2e",
  cardBorder: "#252540",
  accent: "#2E75B6",
  accentHover: "#3a88d0",
  text: "#e0e0e8",
  muted: "#8888a0",
  inputBg: "#12122a",
  inputBorder: "#2a2a4a",
  inputBorderFocus: "#2E75B6",
  success: "#22c55e",
  errorBg: "#2a1a1a",
  errorBorder: "#7f1d1d",
  errorText: "#fca5a5",
};

const inputStyle = {
  width: "100%",
  background: COLORS.inputBg,
  border: `1px solid ${COLORS.inputBorder}`,
  borderRadius: "8px",
  color: COLORS.text,
  padding: "10px 14px",
  fontSize: "15px",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "'DM Sans', sans-serif",
};

const labelStyle = {
  display: "block",
  color: COLORS.muted,
  fontSize: "13px",
  fontWeight: 500,
  marginBottom: "6px",
  letterSpacing: "0.02em",
  textTransform: "uppercase",
};

const fieldWrap = {
  marginBottom: "20px",
};

function Field({ label, children }) {
  return (
    <div style={fieldWrap}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = "text" }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        ...inputStyle,
        borderColor: focused ? COLORS.inputBorderFocus : COLORS.inputBorder,
        boxShadow: focused ? `0 0 0 3px rgba(46,117,182,0.15)` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        ...inputStyle,
        resize: "vertical",
        minHeight: "100px",
        borderColor: focused ? COLORS.inputBorderFocus : COLORS.inputBorder,
        boxShadow: focused ? `0 0 0 3px rgba(46,117,182,0.15)` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function Select({ value, onChange, options }) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputStyle,
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238888a0' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: "36px",
        borderColor: focused ? COLORS.inputBorderFocus : COLORS.inputBorder,
        boxShadow: focused ? `0 0 0 3px rgba(46,117,182,0.15)` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <option value="">Select...</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

function CheckboxGroup({ options, selected, onChange }) {
  const toggle = (opt) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "10px",
      }}
    >
      {options.map((opt) => {
        const checked = selected.includes(opt);
        return (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              background: checked ? "rgba(46,117,182,0.12)" : COLORS.inputBg,
              border: `1px solid ${checked ? COLORS.accent : COLORS.inputBorder}`,
              borderRadius: "8px",
              cursor: "pointer",
              color: checked ? COLORS.text : COLORS.muted,
              fontSize: "14px",
              transition: "all 0.15s",
              userSelect: "none",
            }}
          >
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                border: `2px solid ${checked ? COLORS.accent : COLORS.inputBorder}`,
                background: checked ? COLORS.accent : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.15s",
              }}
            >
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(opt)}
              style={{ display: "none" }}
            />
            {opt}
          </label>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────
// Step components
// ──────────────────────────────────────────────

function Step1({ data, setData }) {
  return (
    <>
      <StepHeader
        title="Contact Information"
        subtitle="Let's start with your basic contact details."
      />
      <Field label="Contact Name *">
        <TextInput
          value={data.contactName}
          onChange={(v) => setData({ ...data, contactName: v })}
          placeholder="Jane Smith"
        />
      </Field>
      <Field label="Company Name *">
        <TextInput
          value={data.companyName}
          onChange={(v) => setData({ ...data, companyName: v })}
          placeholder="Acme Corp"
        />
      </Field>
      <Field label="Email *">
        <TextInput
          type="email"
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
          placeholder="jane@acmecorp.com"
        />
      </Field>
      <Field label="Phone">
        <TextInput
          type="tel"
          value={data.phone}
          onChange={(v) => setData({ ...data, phone: v })}
          placeholder="+1 (555) 000-0000"
        />
      </Field>
    </>
  );
}

function Step2({ data, setData }) {
  return (
    <>
      <StepHeader
        title="Company Profile"
        subtitle="Tell us about your business so we can tailor our approach."
      />
      <Field label="Industry *">
        <Select
          value={data.industry}
          onChange={(v) => setData({ ...data, industry: v })}
          options={[
            "Technology",
            "Healthcare",
            "Finance",
            "Real Estate",
            "Manufacturing",
            "Retail/E-commerce",
            "Professional Services",
            "Construction",
            "Education",
            "Other",
          ]}
        />
      </Field>
      <Field label="Annual Revenue Range">
        <Select
          value={data.annualRevenue}
          onChange={(v) => setData({ ...data, annualRevenue: v })}
          options={[
            "Under $500K",
            "$500K-$1M",
            "$1M-$5M",
            "$5M-$10M",
            "$10M-$50M",
            "$50M+",
          ]}
        />
      </Field>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <Field label="Team Size">
          <Select
            value={data.teamSize}
            onChange={(v) => setData({ ...data, teamSize: v })}
            options={["1-5", "6-15", "16-50", "51-200", "200+"]}
          />
        </Field>
        <Field label="Years in Business">
          <Select
            value={data.yearsInBusiness}
            onChange={(v) => setData({ ...data, yearsInBusiness: v })}
            options={["Less than 1", "1-3", "3-5", "5-10", "10+"]}
          />
        </Field>
      </div>
      <Field label="Brief Description of Your Business">
        <Textarea
          value={data.businessDescription}
          onChange={(v) => setData({ ...data, businessDescription: v })}
          placeholder="Describe what your company does, your main products or services, and who you serve..."
          rows={4}
        />
      </Field>
    </>
  );
}

function Step3({ data, setData }) {
  return (
    <>
      <StepHeader
        title="Current Operations"
        subtitle="Help us understand how your team spends its time."
      />
      <Field label="What are your top 3 most time-consuming processes?">
        <Textarea
          value={data.timeConsumingProcesses}
          onChange={(v) => setData({ ...data, timeConsumingProcesses: v })}
          placeholder="e.g., 1. Manual invoice processing  2. Client reporting  3. Lead follow-up..."
          rows={4}
        />
      </Field>
      <Field label="Hours per week on administrative tasks">
        <Select
          value={data.adminHoursPerWeek}
          onChange={(v) => setData({ ...data, adminHoursPerWeek: v })}
          options={["Under 5", "5-10", "10-20", "20-40", "40+"]}
        />
      </Field>
      <Field label="What is the biggest bottleneck in your team's workflow?">
        <Textarea
          value={data.biggestBottleneck}
          onChange={(v) => setData({ ...data, biggestBottleneck: v })}
          placeholder="Describe the single most frustrating or time-consuming constraint your team faces..."
          rows={4}
        />
      </Field>
    </>
  );
}

function Step4({ data, setData }) {
  const toolOptions = [
    "Google Workspace",
    "Microsoft 365",
    "Slack",
    "Salesforce",
    "HubSpot",
    "QuickBooks/Xero",
    "Notion",
    "Monday.com",
    "Custom Software",
    "Other",
  ];
  return (
    <>
      <StepHeader
        title="Technology & Tools"
        subtitle="Understanding your current stack helps us identify integration opportunities."
      />
      <Field label="Which tools does your team currently use?">
        <CheckboxGroup
          options={toolOptions}
          selected={data.currentTools}
          onChange={(v) => setData({ ...data, currentTools: v })}
        />
      </Field>
      {data.currentTools.includes("Other") && (
        <Field label="Please specify other tools">
          <TextInput
            value={data.currentToolsOther}
            onChange={(v) => setData({ ...data, currentToolsOther: v })}
            placeholder="List any other tools you use..."
          />
        </Field>
      )}
      <Field label="How is your data primarily stored?">
        <Select
          value={data.dataStorage}
          onChange={(v) => setData({ ...data, dataStorage: v })}
          options={[
            "Cloud-based",
            "On-premise servers",
            "Spreadsheets",
            "Mixed",
            "Not sure",
          ]}
        />
      </Field>
      <Field label="Do your current tools have API access or integrations?">
        <Select
          value={data.apiAccess}
          onChange={(v) => setData({ ...data, apiAccess: v })}
          options={["Yes", "No", "Not sure"]}
        />
      </Field>
    </>
  );
}

function Step5({ data, setData }) {
  const painOptions = [
    "Manual data entry across systems",
    "Slow response times to clients",
    "Inconsistent processes across team",
    "Difficulty tracking leads/pipeline",
    "Time spent on repetitive reporting",
    "Poor visibility into operations",
    "Communication gaps between departments",
    "Other",
  ];
  return (
    <>
      <StepHeader
        title="Pain Points"
        subtitle="Identifying your pain points helps us focus on what matters most."
      />
      <Field label="Select all that apply">
        <CheckboxGroup
          options={painOptions}
          selected={data.painPoints}
          onChange={(v) => setData({ ...data, painPoints: v })}
        />
      </Field>
      {data.painPoints.includes("Other") && (
        <Field label="Please specify other pain points">
          <TextInput
            value={data.painPointsOther}
            onChange={(v) => setData({ ...data, painPointsOther: v })}
            placeholder="Describe any other pain points..."
          />
        </Field>
      )}
      <Field label="What single process costs you the most time or money?">
        <Textarea
          value={data.mostCostlyProcess}
          onChange={(v) => setData({ ...data, mostCostlyProcess: v })}
          placeholder="Be as specific as possible — this helps us prioritize high-impact automation opportunities..."
          rows={4}
        />
      </Field>
    </>
  );
}

function Step6({ data, setData }) {
  return (
    <>
      <StepHeader
        title="Goals & Readiness"
        subtitle="Let's align on your vision and set the stage for a successful engagement."
      />
      <Field label="What does success look like for you in 6 months?">
        <Textarea
          value={data.successVision}
          onChange={(v) => setData({ ...data, successVision: v })}
          placeholder="Describe the outcomes and improvements you're hoping to achieve..."
          rows={4}
        />
      </Field>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <Field label="Timeline Expectation">
          <Select
            value={data.timeline}
            onChange={(v) => setData({ ...data, timeline: v })}
            options={[
              "Immediate (within 30 days)",
              "Short-term (1-3 months)",
              "Medium-term (3-6 months)",
              "Long-term (6-12 months)",
            ]}
          />
        </Field>
        <Field label="Budget Range">
          <Select
            value={data.budget}
            onChange={(v) => setData({ ...data, budget: v })}
            options={[
              "Under $2,500/mo",
              "$2,500-$5,000/mo",
              "$5,000-$10,000/mo",
              "$10,000+/mo",
              "Not sure yet",
            ]}
          />
        </Field>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
        }}
      >
        <Field label="Previous Automation Experience">
          <Select
            value={data.automationExperience}
            onChange={(v) => setData({ ...data, automationExperience: v })}
            options={[
              "Yes - successfully",
              "Yes - with mixed results",
              "No - but we've researched it",
              "No - this is completely new",
            ]}
          />
        </Field>
        <Field label="Internal Champion">
          <Select
            value={data.internalChampion}
            onChange={(v) => setData({ ...data, internalChampion: v })}
            options={[
              "Yes - that's me",
              "Yes - someone on my team",
              "Not yet identified",
            ]}
          />
        </Field>
      </div>
      <Field label="Data Readiness">
        <Select
          value={data.dataReadiness}
          onChange={(v) => setData({ ...data, dataReadiness: v })}
          options={[
            "Excellent - clean and organized",
            "Good - mostly organized",
            "Fair - needs some cleanup",
            "Poor - significant work needed",
          ]}
        />
      </Field>
      <Field label="Additional Notes or Questions">
        <Textarea
          value={data.additionalNotes}
          onChange={(v) => setData({ ...data, additionalNotes: v })}
          placeholder="Anything else you'd like us to know before your discovery session?"
          rows={4}
        />
      </Field>
    </>
  );
}

function ReviewRow({ label, value }) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;
  return (
    <tr>
      <td
        style={{
          padding: "8px 12px",
          color: COLORS.muted,
          fontSize: "13px",
          fontWeight: 500,
          verticalAlign: "top",
          whiteSpace: "nowrap",
          width: "40%",
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "8px 12px",
          color: COLORS.text,
          fontSize: "14px",
          verticalAlign: "top",
        }}
      >
        {Array.isArray(value) ? value.join(", ") : value}
      </td>
    </tr>
  );
}

function ReviewSection({ title, rows }) {
  const hasContent = rows.some(
    (r) => r.value && (Array.isArray(r.value) ? r.value.length > 0 : true)
  );
  if (!hasContent) return null;
  return (
    <div style={{ marginBottom: "24px" }}>
      <h3
        style={{
          color: COLORS.accent,
          fontSize: "14px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: "0 0 10px 0",
          padding: "0 0 8px 0",
          borderBottom: `1px solid ${COLORS.cardBorder}`,
        }}
      >
        {title}
      </h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map((r, i) => (
            <ReviewRow key={i} label={r.label} value={r.value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Step7({ data }) {
  return (
    <>
      <StepHeader
        title="Review & Submit"
        subtitle="Please review your responses before submitting."
      />
      <ReviewSection
        title="Contact Information"
        rows={[
          { label: "Contact Name", value: data.contactName },
          { label: "Company Name", value: data.companyName },
          { label: "Email", value: data.email },
          { label: "Phone", value: data.phone },
        ]}
      />
      <ReviewSection
        title="Company Profile"
        rows={[
          { label: "Industry", value: data.industry },
          { label: "Annual Revenue", value: data.annualRevenue },
          { label: "Team Size", value: data.teamSize },
          { label: "Years in Business", value: data.yearsInBusiness },
          { label: "Business Description", value: data.businessDescription },
        ]}
      />
      <ReviewSection
        title="Current Operations"
        rows={[
          {
            label: "Time-Consuming Processes",
            value: data.timeConsumingProcesses,
          },
          { label: "Admin Hours/Week", value: data.adminHoursPerWeek },
          { label: "Biggest Bottleneck", value: data.biggestBottleneck },
        ]}
      />
      <ReviewSection
        title="Technology & Tools"
        rows={[
          { label: "Current Tools", value: data.currentTools },
          { label: "Other Tools", value: data.currentToolsOther },
          { label: "Data Storage", value: data.dataStorage },
          { label: "API Access", value: data.apiAccess },
        ]}
      />
      <ReviewSection
        title="Pain Points"
        rows={[
          { label: "Pain Points", value: data.painPoints },
          { label: "Other Pain Points", value: data.painPointsOther },
          { label: "Most Costly Process", value: data.mostCostlyProcess },
        ]}
      />
      <ReviewSection
        title="Goals & Readiness"
        rows={[
          { label: "Success Vision", value: data.successVision },
          { label: "Timeline", value: data.timeline },
          { label: "Budget", value: data.budget },
          {
            label: "Automation Experience",
            value: data.automationExperience,
          },
          { label: "Internal Champion", value: data.internalChampion },
          { label: "Data Readiness", value: data.dataReadiness },
          { label: "Additional Notes", value: data.additionalNotes },
        ]}
      />
    </>
  );
}

function StepHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <h2
        style={{
          color: COLORS.text,
          fontSize: "22px",
          fontWeight: 700,
          margin: "0 0 6px 0",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: COLORS.muted,
          fontSize: "14px",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}

const INITIAL_DATA = {
  // Step 1
  contactName: "",
  companyName: "",
  email: "",
  phone: "",
  // Step 2
  industry: "",
  annualRevenue: "",
  teamSize: "",
  yearsInBusiness: "",
  businessDescription: "",
  // Step 3
  timeConsumingProcesses: "",
  adminHoursPerWeek: "",
  biggestBottleneck: "",
  // Step 4
  currentTools: [],
  currentToolsOther: "",
  dataStorage: "",
  apiAccess: "",
  // Step 5
  painPoints: [],
  painPointsOther: "",
  mostCostlyProcess: "",
  // Step 6
  successVision: "",
  timeline: "",
  budget: "",
  automationExperience: "",
  internalChampion: "",
  dataReadiness: "",
  additionalNotes: "",
};

export default function IntakeForm() {
  const [step, setStep] = useState(0); // 0-indexed
  const [data, setData] = useState(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [animating, setAnimating] = useState(false);

  const totalSteps = STEPS.length;
  const progress = ((step + 1) / totalSteps) * 100;

  const goNext = () => {
    if (step < totalSteps - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setAnimating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setAnimating(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setAnimating(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 150);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: COLORS.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: "16px",
            padding: "60px 48px",
            maxWidth: "520px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(34,197,94,0.12)",
              border: `2px solid ${COLORS.success}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 16L12.5 22.5L26 9"
                stroke={COLORS.success}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1
            style={{
              color: COLORS.text,
              fontSize: "28px",
              fontWeight: 700,
              margin: "0 0 16px 0",
            }}
          >
            Thank You
          </h1>
          <p
            style={{
              color: COLORS.muted,
              fontSize: "16px",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Your questionnaire has been submitted. We will review your responses
            and reach out within 2 business days to schedule your discovery
            session.
          </p>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Step1 data={data} setData={setData} />;
      case 1:
        return <Step2 data={data} setData={setData} />;
      case 2:
        return <Step3 data={data} setData={setData} />;
      case 3:
        return <Step4 data={data} setData={setData} />;
      case 4:
        return <Step5 data={data} setData={setData} />;
      case 5:
        return <Step6 data={data} setData={setData} />;
      case 6:
        return <Step7 data={data} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'DM Sans', sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: COLORS.accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1L10.5 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H5.5L8 1Z"
                  fill="white"
                />
              </svg>
            </div>
            <span
              style={{
                color: COLORS.text,
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              AI Enablement Discovery
            </span>
          </div>
          <h1
            style={{
              color: COLORS.text,
              fontSize: "28px",
              fontWeight: 700,
              margin: "0 0 8px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Client Onboarding Questionnaire
          </h1>
          <p style={{ color: COLORS.muted, fontSize: "15px", margin: 0 }}>
            Help us understand your business so we can build the right solution for you.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ color: COLORS.muted, fontSize: "13px" }}>
              Step {step + 1} of {totalSteps}:{" "}
              <span style={{ color: COLORS.text, fontWeight: 500 }}>
                {STEPS[step]}
              </span>
            </span>
            <span
              style={{
                color: COLORS.accent,
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <div
            style={{
              height: "4px",
              background: COLORS.inputBg,
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${COLORS.accent}, #5ba3e0)`,
                borderRadius: "2px",
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Step pills */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            marginBottom: "28px",
            flexWrap: "wrap",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 500,
                background:
                  i === step
                    ? COLORS.accent
                    : i < step
                    ? "rgba(46,117,182,0.2)"
                    : COLORS.inputBg,
                color:
                  i === step
                    ? "white"
                    : i < step
                    ? COLORS.accent
                    : COLORS.muted,
                border: `1px solid ${
                  i === step
                    ? COLORS.accent
                    : i < step
                    ? "rgba(46,117,182,0.4)"
                    : COLORS.inputBorder
                }`,
                transition: "all 0.2s",
                cursor: i < step ? "pointer" : "default",
              }}
              onClick={() => i < step && setStep(i)}
            >
              {i < step ? "✓ " : ""}
              {s}
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          style={{
            background: COLORS.card,
            border: `1px solid ${COLORS.cardBorder}`,
            borderRadius: "16px",
            padding: "36px 40px",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.15s ease, transform 0.15s ease",
          }}
        >
          {renderStep()}

          {/* Error message */}
          {error && (
            <div
              style={{
                background: COLORS.errorBg,
                border: `1px solid ${COLORS.errorBorder}`,
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "20px",
                color: COLORS.errorText,
                fontSize: "14px",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: `1px solid ${COLORS.cardBorder}`,
            }}
          >
            <button
              onClick={goBack}
              disabled={step === 0}
              style={{
                padding: "10px 24px",
                borderRadius: "8px",
                border: `1px solid ${COLORS.inputBorder}`,
                background: "transparent",
                color: step === 0 ? COLORS.muted : COLORS.text,
                fontSize: "14px",
                fontWeight: 500,
                cursor: step === 0 ? "default" : "pointer",
                opacity: step === 0 ? 0.4 : 1,
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.15s",
              }}
            >
              ← Back
            </button>

            {step < totalSteps - 1 ? (
              <button
                onClick={goNext}
                style={{
                  padding: "10px 28px",
                  borderRadius: "8px",
                  border: "none",
                  background: COLORS.accent,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = COLORS.accentHover)
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = COLORS.accent)
                }
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  padding: "10px 32px",
                  borderRadius: "8px",
                  border: "none",
                  background: submitting
                    ? "rgba(46,117,182,0.5)"
                    : COLORS.accent,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {submitting ? (
                  <>
                    <span
                      style={{
                        display: "inline-block",
                        width: "14px",
                        height: "14px",
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit Questionnaire"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "24px",
            color: COLORS.muted,
            fontSize: "12px",
          }}
        >
          Your responses are secure and will only be used for your discovery session.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        select option {
          background: #12122a;
          color: #e0e0e8;
        }
        @media (max-width: 600px) {
          div[style*="padding: 36px 40px"] {
            padding: 24px 20px !important;
          }
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
