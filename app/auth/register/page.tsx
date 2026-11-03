
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Brand from "@/components/Brand";

export default function Register() {
  const router = useRouter();
  return (
    <main className="register-page">

      <section className="register-card">

        {/* PANEL IZQUIERDO */}
        <div className="register-illustration">

          <Image
            src="/images/soulcial-amigos.png"
            alt="Amigos de Soulcial"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="register-image"
          />

          <div className="register-overlay">
            <h2>¡Forma parte de Soulcial!</h2>
            <p>
              Encuentra personas que compartan
              tus intereses y construye conexiones
              auténticas.
            </p>
          </div>

        </div>

        {/* PANEL DERECHO */}
        <div className="register-content">

          {/* ENCABEZADO */}
          <div className="register-header">

            <Brand />

            <h1>Crear una cuenta</h1>

            <p>
              Comienza tu experiencia y conecta
              con nuevas personas.
            </p>

          </div>

          {/* FORMULARIO */}
          <form className="register-form" onSubmit={(event) => { event.preventDefault(); router.push("/"); }}>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>

                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">Apellido</label>

                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Tu apellido"
                  autoComplete="family-name"
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaNacimiento">
                Fecha de nacimiento
              </label>

              <input
                type="date"
                id="fechaNacimiento"
                name="fechaNacimiento"
                autoComplete="bday"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mínimo 8 caracteres"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirmar contraseña
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repite tu contraseña"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>

            {/* TÉRMINOS */}
            <label className="terms-container">
              <input
                type="checkbox"
                name="terms"
                required
              />

              <span>
                Acepto los{" "}
                <Link href="/terms">
                  términos y condiciones
                </Link>
                {" "}y la política de privacidad.
              </span>
            </label>

            {/* BOTÓN */}
            <button type="submit" className="register-button">
              Crear mi cuenta y entrar
              <span>→</span>
            </button>

          </form>

          {/* INICIO DE SESIÓN */}
          <div className="register-login">
            ¿Ya tienes una cuenta?

            <Link href="/login">
              Inicia sesión
            </Link>
          </div>

        </div>

      </section>

    </main>
  );
}
