# Soulcial

Prototipo responsivo de una comunidad para hacer amistades. Incluye inicio, descubrimiento de personas, comunidades, conversaciones de muestra y perfil. La interfaz usa datos de demostración en memoria; todavía no hay cuentas reales, persistencia ni chat en tiempo real.

## Desarrollo local

Requiere Node.js 20 o posterior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Despliegue en Railway

1. Sube este proyecto a un repositorio Git y conéctalo desde Railway con **New Project → Deploy from GitHub repo**.
2. Railway detecta `railway.json`, instala dependencias, ejecuta `npm run build` y arranca con `npm run start`.
3. En **Settings → Networking**, genera un dominio público.

No hacen falta variables de entorno para este prototipo. Cuando se agreguen cuentas y datos persistentes, el siguiente paso sería conectar una base PostgreSQL de Railway y guardar secretos como variables de servicio.
