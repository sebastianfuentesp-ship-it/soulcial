"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Brand from "@/components/Brand";

export default function Login() {
  const router = useRouter();
  return <main className="auth-page"><section className="auth-card login-card">
    <div className="login-illustration"><Image src="/images/soulcial-amigos.png" alt="Amigos de Soulcial" fill priority sizes="(max-width: 768px) 100vw, 45vw" /><div><strong>Qué bueno tenerte<br />de vuelta.</strong><span>Tu próxima gran conversación te espera.</span></div></div>
    <div className="login-content"><Brand className="auth-brand" /><span className="eyebrow">TU COMUNIDAD TE ESPERA</span><h1>Inicia sesión</h1><p className="auth-intro">Continúa donde se quedó tu próxima amistad.</p>
      <form className="auth-form" onSubmit={(event) => { event.preventDefault(); router.push("/"); }}><label htmlFor="login-email">Correo electrónico</label><input id="login-email" name="email" type="email" placeholder="tu@correo.com" autoComplete="email" required /><label htmlFor="login-password">Contraseña</label><input id="login-password" name="password" type="password" placeholder="Tu contraseña" autoComplete="current-password" required /><button className="auth-primary" type="submit">Entrar a Soulcial <span>→</span></button></form>
      <p className="auth-switch">¿Todavía no tienes cuenta? <Link href="/auth/register">Regístrate</Link></p><Link className="auth-back" href="/bienvenida">← Volver a bienvenida</Link>
    </div>
  </section></main>;
}
