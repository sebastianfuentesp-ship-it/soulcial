import Image from "next/image";
import Link from "next/link";
import Brand from "@/components/Brand";

export default function Welcome() {
  return <main className="auth-page welcome-auth"><section className="auth-card welcome-auth-card">
    <div className="auth-illustration"><Image src="/images/soulcial-amigos.png" alt="Tres amigos compartiendo un momento juntos" fill priority sizes="(max-width: 768px) 100vw, 50vw" /></div>
    <div className="welcome-auth-content"><Brand className="auth-brand" /><div><span className="eyebrow">CONECTA A TU MANERA</span><h1>Bienvenido a<br />Soulcial</h1><p>Un lugar donde las conexiones van más allá de lo superficial. Conoce personas con las que compartes tus gustos, hobbies y personalidad.</p><div className="auth-actions"><Link href="/auth/register" className="auth-primary">Crear cuenta <span>→</span></Link><Link href="/login" className="auth-secondary">Ya tengo una cuenta</Link></div></div><span className="auth-tagline">Conecta. Comparte. Pertenece.</span></div>
  </section></main>;
}
