import IntakeForm from './components/IntakeForm';

export default function Home() {
return (
<div style={{minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff'}}>
{/* Header */}
<header style={{padding: '20px 40px', borderBottom: '1px solid #334155', backgroundColor: '#1e293b'}}>
<h1 style={{margin: '0', fontSize: '28px', fontWeight: 'bold'}}>CaseFlow AI</h1>
<p style={{margin: '5px 0 0 0', color: '#94a3b8', fontSize: '14px'}}>Client Intake & Discovery Platform</p>
</header>

{/* Main Content */}
<main style={{padding: '40px', maxWidth: '900px', margin: '0 auto'}}>
<div style={{marginBottom: '40px', textAlign: 'center'}}>
<h2 style={{fontSize: '36px', marginBottom: '15px'}}>Tell Us About Your Needs</h2>
<p style={{fontSize: '16px', color: '#cbd5e1', marginBottom: '30px'}}>
Quick intake form to help us understand your situation and provide the best solution for you.
</p>
</div>

{/* Intake Form */}
<div style={{backgroundColor: '#1e293b', padding: '30px', borderRadius: '12px', border: '1px solid #334155'}}>
<IntakeForm />
</div>
</main>

{/* Footer */}
<footer style={{padding: '20px 40px', textAlign: 'center', color: '#64748b', borderTop: '1px solid #334155', marginTop: '60px'}}>
<p>Your information is secure and confidential. © 2024 CaseFlow AI</p>
</footer>
</div>
);
}
