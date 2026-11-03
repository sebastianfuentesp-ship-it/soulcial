"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Brand from "@/components/Brand";

type Person = { name: string; age: number; city: string; bio: string; interests: string[]; color: string; initials: string; photo: string; online?: boolean };

const people: Person[] = [
  { name: "Maris Herrera", age: 22, city: "Villa El Salvador · Lima Sur", bio: "Fan de los planes tranquilos, los libros que te cambian la vida y encontrar cafeterías bonitas.", interests: ["Libros", "Café", "Ilustración"], color: "#d6c5ea", initials: "MH", photo: "/images/people/maris-lima-sur.png", online: true },
  { name: "Luis López", age: 24, city: "Chorrillos · Lima Sur", bio: "Siempre listo para una partida, una caminata o hablar de la última película que vi.", interests: ["Videojuegos", "Cine", "Senderismo"], color: "#e9c5ba", initials: "LL", photo: "/images/people/luis-lima-sur.png" },
  { name: "Micaela García", age: 21, city: "Miraflores · Lima Centro", bio: "Música en vivo, aprender cosas nuevas y compartir recomendaciones de playlists.", interests: ["Música", "Conciertos", "Cocina"], color: "#b9d7d0", initials: "MG", photo: "/images/people/micaela-lima-centro.png", online: true },
  { name: "Gabriel Fernández", age: 23, city: "San Juan de Miraflores · Lima Sur", bio: "Hago fotos de todo, cocino recetas improvisadas y me encanta conocer gente.", interests: ["Fotografía", "Comida", "Viajes"], color: "#e6cf96", initials: "GF", photo: "/images/people/gabriel-lima-sur.png" },
  { name: "Santiago Torres", age: 22, city: "Los Olivos · Lima Norte", bio: "Me gusta la música, probar comida nueva y conocer gente con buena vibra.", interests: ["Música", "Comida", "Amistad"], color: "#d9b8c8", initials: "ST", photo: "/images/people/santiago-lima-norte.png" },
];

const groups = [
  { name: "Videojuegos", topic: "Videojuegos", icon: "🎮", members: "2.4 mil" },
  { name: "Películas en estreno", topic: "Películas", icon: "🎬", members: "1.8 mil" },
  { name: "Música", topic: "Música", icon: "♫", members: "3.1 mil" },
  { name: "Deportes", topic: "Aire libre", icon: "🏃", members: "860" },
];
const communities = [
  { name: "ARMY", mark: "◢◤", members: "12.8 mil", online: "824", description: "Un espacio para compartir música, noticias, teorías y proyectos solidarios de BTS.", topics: ["BTS", "Música", "Conciertos"], activity: "¿Qué canción de BTS les acompaña hoy?" },
  { name: "SWIFTIE", mark: "TS", members: "8.2 mil", online: "316", description: "Fans de Taylor Swift compartiendo eras, letras, conciertos y recomendaciones.", topics: ["Taylor Swift", "The Eras Tour", "Pop"], activity: "Armemos nuestra playlist para el fin de semana ✨" },
  { name: "BAD BUNNY", mark: "BB", members: "5.6 mil", online: "208", description: "Novedades, música y planes para fans de Bad Bunny y el género urbano.", topics: ["Bad Bunny", "Reggaetón", "Estrenos"], activity: "¿Cuál es su álbum favorito para escuchar completo?" },
  { name: "DUAL", mark: "D", members: "1.9 mil", online: "92", description: "Una comunidad para descubrir artistas, compartir gustos y conocer gente nueva.", topics: ["Música", "Amistad", "Recomendaciones"], activity: "Dejen una canción para conocer nuevos artistas 🎧" },
];
// Local demo profile photo stored in public/images/profile.
const profilePhoto = "/images/profile/soulmi-avatar.png";
const profileMedia = [
  { src: "/images/profile/post-music-collage.png", views: "2.4 mil", position: "center 48%" },
  { src: "/images/profile/post-aesthetic-board.png", views: "1.8 mil", position: "center 50%" },
  { src: "/images/profile/post-park.png", views: "3.1 mil", position: "center 42%" },
  { src: "/images/profile/post-window.png", views: "986", position: "center 48%" },
  { src: "/images/profile/post-lake.png", views: "1.2 mil", position: "center 45%" },
  { src: "/images/profile/post-portrait-garden.png", views: "4.5 mil", position: "center 40%" },
  { src: "/images/profile/post-friends.png", views: "2.9 mil", position: "center 42%" },
  { src: "/images/profile/post-city.png", views: "1.3 mil", position: "center 50%" },
];
const chats = [
  { name: "Maris Herrera", age: 22, connection: "Café y libros", text: "¡También quería conocer esa cafetería! ☕", time: "10:42", color: "#d6c5ea", initials: "MH", photo: "/images/people/maris-lima-sur.png", unread: 2 },
  { name: "Luis López", age: 24, connection: "Videojuegos", text: "¿Te late jugar este fin?", time: "Ayer", color: "#e9c5ba", initials: "LL", photo: "/images/people/luis-lima-sur.png" },
  { name: "Micaela García", age: 21, connection: "Música", text: "Te paso la playlist ✨", time: "Lun", color: "#b9d7d0", initials: "MG", photo: "/images/people/micaela-lima-centro.png" },
  { name: "Gabriel Fernández", age: 23, connection: "Fotografía", text: "Tú: Me gustó mucho tu última foto", time: "Mar", color: "#e6cf96", initials: "GF", photo: "/images/people/gabriel-lima-sur.png" },
  { name: "Santiago Torres", age: 22, connection: "Música y comida", text: "¿Vamos por algo rico este sábado?", time: "Lun", color: "#d9b8c8", initials: "ST", photo: "/images/people/santiago-lima-norte.png" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = { home: "M3 10.8 12 3l9 7.8v9a1.2 1.2 0 0 1-1.2 1.2h-5.2v-6h-5v6H4.2A1.2 1.2 0 0 1 3 19.8z", discover: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm3.9 5.1-2.4 5.4-5.4 2.4 2.4-5.4z", chat: "M21 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-5 3v-5.5A7.5 7.5 0 1 1 21 11.5Zm-3-4h.1M12 7.5h.1M8 7.5h.1", profile: "M20 21a8 8 0 0 0-16 0m8-10a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z", search: "m20 20-4.5-4.5M18 10.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z", bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h2" };
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
}

function DiscoveryPromos({ mode, onSelect }: { mode: "mobile" | "desktop"; onSelect: (view: "groups" | "communities") => void }) {
  const isMobile = mode === "mobile";
  const promos = [
    { id: "groups" as const, title: "Grupos", description: "Descubre grupos en tendencia, los que comparten tus gustos o hobbies", image: "/images/groups-friends.png" },
    { id: "communities" as const, title: "Comunidades", description: "Entra a las comunidades para hablar con personas de tus mismos gustos.", image: "/images/communities-friends.png" },
  ];

  return <div className={`${mode}-discovery-tiles`}>{promos.map((promo) => <button key={promo.id} className={`${mode}-discovery-tile ${mode}-${promo.id}-tile`} onClick={() => onSelect(promo.id)}><span className={`${mode}-tile-copy`}><strong>{promo.title}</strong><small>{promo.description}</small><b>EMPECEMOS <i>→</i></b></span><div className={`${mode}-tile-art ${mode}-tile-art-${promo.id}`} aria-hidden="true"><Image src={promo.image} alt="" fill sizes={isMobile ? "58vw" : "22vw"} /></div></button>)}</div>;
}

export default function Home() {
  const [tab, setTab] = useState("inicio");
  const [query, setQuery] = useState("");
  const [activePerson, setActivePerson] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [joined, setJoined] = useState<string[]>([]);
  const [communityPhotos, setCommunityPhotos] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatQuery, setChatQuery] = useState("");
  const [discoveryView, setDiscoveryView] = useState<"home" | "groups" | "communities">("home");
  const [activeGroup, setActiveGroup] = useState(groups[0].name);
  const [activeCommunity, setActiveCommunity] = useState(communities[0].name);
  const [activeCommunityChannel, setActiveCommunityChannel] = useState("general");
  const [communityPost, setCommunityPost] = useState("");
  const [communityPosts, setCommunityPosts] = useState<Record<string, string[]>>({});
  const [profileTab, setProfileTab] = useState<"publicaciones" | "guardados" | "me gusta">("publicaciones");

  useEffect(() => {
    let frame = 0;
    try {
      const savedPhotos = localStorage.getItem("soulcial-community-photos");
      if (savedPhotos) {
        const parsedPhotos = JSON.parse(savedPhotos) as Record<string, string>;
        frame = window.requestAnimationFrame(() => setCommunityPhotos(parsedPhotos));
      }
    } catch {
      try { localStorage.removeItem("soulcial-community-photos"); } catch { /* Storage can be disabled in the browser. */ }
    }
    return () => { if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [tab, discoveryView]);
  const filtered = useMemo(() => people.filter((person) => `${person.name} ${person.city} ${person.interests.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const filteredChats = useMemo(() => chats.filter((chat) => `${chat.name} ${chat.connection}`.toLowerCase().includes(chatQuery.toLowerCase())), [chatQuery]);
  const selectedChat = chats.find((chat) => chat.name === activeChat);
  const selectedCommunity = communities.find((community) => community.name === activeCommunity) ?? communities[0];

  const nextPerson = (like: boolean) => {
    const person = people[activePerson % people.length];
    if (like && !liked.includes(person.name)) setLiked([...liked, person.name]);
    setActivePerson((activePerson + 1) % people.length);
  };
  const toggleJoin = (name: string) => setJoined(joined.includes(name) ? joined.filter((item) => item !== name) : [...joined, name]);
  const saveCommunityPhoto = async (name: string, file?: File) => {
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 512 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const imageBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.82));
      if (!imageBlob) return;
      const imageData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
        reader.readAsDataURL(imageBlob);
      });
      const updatedPhotos = { ...communityPhotos, [name]: imageData };
      localStorage.setItem("soulcial-community-photos", JSON.stringify(updatedPhotos));
      setCommunityPhotos(updatedPhotos);
    } catch {
      window.alert("No se pudo guardar la imagen. Prueba con otra foto más pequeña.");
    }
  };

  return <main className="app-shell">
    <aside className="sidebar">
      <Brand href="/inicio" />
      <div className="side-profile"><div className="avatar avatar-me" style={{ position: "relative", overflow: "hidden" }}><Image src={profilePhoto} alt="Foto de Soulmi" fill sizes="42px" /></div><div><strong>¡Hola, Soulmi!</strong><span>Tu espacio para conectar</span></div><span className="chevron">⌄</span></div>
      <p className="nav-label">MENÚ</p>
      <nav className="main-nav" aria-label="Navegación principal">
        {[ ["inicio", "Inicio", "home"], ["descubrir", "Descubrir", "discover"], ["mensajes", "Mensajes", "chat"], ["perfil", "Mi perfil", "profile"] ].map(([id, label, icon]) => <button key={id} className={`nav-item ${tab === id ? "selected" : ""}`} onClick={() => { if (id === "descubrir") setDiscoveryView("home"); setTab(id); }}><Icon name={icon} /><span>{label}</span>{id === "mensajes" && <b className="nav-badge">2</b>}</button>)}
      </nav>
      <div className="sidebar-note"><div className="note-spark">✦</div><strong>Las buenas amistades empiezan con un hola.</strong><span>Encuentra a tu gente, a tu ritmo.</span></div>
      <div className="sidebar-bottom"><span>Hecho para conectar</span><strong>♡ con intención</strong><Link href="/login" className="exit-link">← Cerrar sesión</Link></div>
    </aside>

    <section className="main-column">
      <header className={`topbar ${tab === "inicio" ? "topbar-home" : ""}`}><div className="mobile-brand"><Brand href="/inicio" /></div>{tab === "inicio" && <div className="mobile-welcome"><strong>¡Hola, Soulmi!</strong><span>Conecta con personas de tus mismos gustos e intereses</span></div>}<div className="searchbox"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Busca personas, grupos, comunidades..." aria-label="Buscar" /><kbd>⌘ K</kbd></div><button className="icon-button notification" aria-label="Notificaciones"><Icon name="bell" /><i /></button><button className="top-avatar" style={{ position: "relative", overflow: "hidden" }} onClick={() => setTab("perfil")} aria-label="Ver perfil"><Image src={profilePhoto} alt="" fill sizes="34px" /></button></header>
      <div className="content-area">
        {tab === "inicio" && <>
          <section className="welcome-row"><div><span className="eyebrow">MIÉRCOLES, 30 DE OCTUBRE</span><h1>Tu gente está <em>por aquí.</em></h1><p>Conecta con personas que comparten tus gustos y tu forma de ver el mundo.</p></div><div className="welcome-doodle" aria-hidden="true"><span>✳</span><b>☺</b><i>♡</i></div></section>
          <section className="hero-banner"><div className="hero-copy"><span className="hero-kicker">UN HOLA PUEDE CAMBIARLO TODO</span><h2><span className="desktop-hero-copy">Las mejores conexiones<br />empiezan siendo amigos.</span><span className="mobile-hero-copy">Conexiones más<br />allá de la pantalla</span></h2><p><span className="desktop-hero-copy">Personas reales. Intereses en común.<br />Conversaciones que sí fluyen.</span><span className="mobile-hero-copy">Descubre personas compatibles contigo.</span></p><button className="button-dark" onClick={() => setTab("descubrir")}><span className="desktop-hero-copy">Conocer personas</span><span className="mobile-hero-copy">Conocer gente</span> <span>↗</span></button></div><div className="hero-art"><Image src="/images/amigos-banner.png" alt="Dos amigos compartiendo un momento" width={1254} height={1254} className="hero-friends-image" /></div></section>
          <div className="section-heading"><div><span className="eyebrow">GENTE COMO TÚ</span><h2><span className="desktop-home-title">Personas para conocer</span><span className="mobile-home-title">Tus últimas soulcializaciones</span></h2></div><button className="text-link" onClick={() => setTab("descubrir")}>Ver todas <span>→</span></button></div>
          <section className="people-grid">{filtered.slice(0, 5).map((person) => <article className="person-card" key={person.name}><div className="person-visual" style={{ background: `linear-gradient(145deg, ${person.color}, #f4edf8)` }}><Image className="person-photo" src={person.photo} alt={`Foto de ${person.name}`} fill sizes="(max-width: 760px) 128px, (max-width: 1050px) 40vw, 33vw" />{person.online && <span className="online-pill"><i /> Disponible</span>}<button className="save-person" onClick={() => toggleJoin(person.name)} aria-label="Guardar perfil">{liked.includes(person.name) ? "♥" : "♡"}</button></div><div className="person-info"><div className="person-line"><h3>{person.name}</h3><span>{person.age}</span></div><p>⌖ {person.city}</p><div className="tag-row">{person.interests.slice(0, 2).map((tag) => <span key={tag}>{tag}</span>)}</div><button className="connect-button" onClick={() => { setTab("mensajes"); setActiveChat(person.name); setMessage(`¡Hola ${person.name.split(" ")[0]}!`); }}>Saludar <span>↗</span></button></div></article>)}</section>
          <div className="section-heading group-heading"><div><span className="eyebrow">COMPARTE LO QUE TE GUSTA</span><h2><span className="desktop-home-title">Encuentra tu comunidad</span><span className="mobile-home-title">Grupos en tendencia</span></h2></div><button className="text-link" onClick={() => setTab("descubrir")}>Ver más <span>→</span></button></div>
          <section className="group-grid">{groups.map((group, index) => <button className="group-card" key={group.name} onClick={() => toggleJoin(group.name)}><div className={`group-icon group-${index}`}>{group.icon}</div><div className="group-text"><strong>{group.name}</strong><span>{group.members} personas</span></div><span className={`join-mark ${joined.includes(group.name) ? "is-joined" : ""}`}>{joined.includes(group.name) ? "✓" : "+"}</span></button>)}</section>
          <div className="section-heading community-heading"><div><span className="eyebrow">ENCUENTRA A TU GENTE</span><h2>Comunidades</h2></div><button className="text-link" onClick={() => setTab("descubrir")}>Ver más <span>→</span></button></div>
          <section className="community-grid">{communities.map((community, index) => <article className="community-card" key={community.name}>
            <div className="community-logo-wrap">
              {communityPhotos[community.name] ? <Image className="community-photo" src={communityPhotos[community.name]} alt={`Logo de ${community.name}`} width={84} height={84} unoptimized /> : <span className={`community-mark community-${index}`}>{community.mark}</span>}
              <label className="community-upload" htmlFor={`community-photo-${index}`} title={`Agregar logo o foto a ${community.name}`} aria-label={`Agregar logo o foto a ${community.name}`}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7.5h3l1.4-2h7.2l1.4 2h3v11H4z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round"/><circle cx="12" cy="13" r="3.2" stroke="currentColor" strokeWidth="1.7"/></svg>
                <input id={`community-photo-${index}`} type="file" accept="image/*" onChange={(event) => { void saveCommunityPhoto(community.name, event.target.files?.[0]); event.currentTarget.value = ""; }} />
              </label>
            </div>
            <div className="community-copy"><span>COMUNIDAD</span><strong>{community.name}</strong></div>
            <button className={`community-join ${joined.includes(community.name) ? "is-joined" : ""}`} onClick={() => toggleJoin(community.name)}>{joined.includes(community.name) ? "Unido" : "Unirme"}</button>
          </article>)}</section>
        </>}

        {tab === "descubrir" && <section className="discovery-page"><div className="discovery-desktop-view"><span className="eyebrow">DESCUBRIR</span><h1>Una amistad nueva <em>te espera.</em></h1><p className="page-intro">Conoce personas con intereses parecidos. Sin presión, solo buena vibra.</p><DiscoveryPromos mode="desktop" onSelect={setDiscoveryView} /><div className="discovery-layout"><div className="discover-card"><div className="discover-photo" style={{ background: `linear-gradient(145deg, ${people[activePerson].color}, #f4edf8)` }}><Image className="discover-person-photo" src={people[activePerson].photo} alt={`Foto de ${people[activePerson].name}`} fill sizes="(max-width: 760px) 100vw, 60vw" /><span className="photo-count">✦ Soulcial recomienda</span></div><div className="discover-details"><div className="person-line"><h2>{people[activePerson].name}</h2><span>{people[activePerson].age}</span></div><p>⌖ {people[activePerson].city}</p><p className="discover-bio">{people[activePerson].bio}</p><div className="tag-row">{people[activePerson].interests.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="discover-actions"><button className="pass-button" onClick={() => nextPerson(false)} aria-label="Ver siguiente persona">×</button><button className="say-hi-button" onClick={() => { setLiked([...liked, people[activePerson].name]); setMessage(`¡Hola ${people[activePerson].name.split(" ")[0]}!`); setActiveChat(people[activePerson].name); setTab("mensajes"); }}>Enviar un saludo <span>♡</span></button><button className="like-button" onClick={() => nextPerson(true)} aria-label="Me interesa">♡</button></div></div></div><aside className="discovery-aside"><div className="aside-ornament">✳</div><h3>Amistades con algo en común.</h3><p>Tu próxima conversación favorita puede empezar con un interés compartido.</p><div className="aside-stat"><strong>{liked.length.toString().padStart(2, "0")}</strong><span>personas que te interesan</span></div></aside></div>
          </div><div className="discovery-mobile-view"><section className="mobile-discovery-home">
            <header className="mobile-discovery-header"><Brand href="/inicio" /><h2>¡Hola, Soulmi!</h2><p>Conecta con personas de tus mismos gustos e intereses</p><label className="mobile-discovery-search"><Icon name="search" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca grupos o comunidades..." /></label></header>
            <DiscoveryPromos mode="mobile" onSelect={setDiscoveryView} /></section></div>
          {discoveryView !== "home" && <section className="mobile-group-space">
            <header className="group-space-heading"><button onClick={() => setDiscoveryView("home")} aria-label="Volver">←</button><div><span className="eyebrow">SOULCIAL</span><h2>{discoveryView === "groups" ? "Grupos" : "Comunidades"}</h2></div><span className="group-space-mark">✦</span></header>
            {discoveryView === "groups" ? <div className="discord-layout"><aside className="discord-sidebar"><div className="discord-section-title">CONTACTOS <span>{people.length}</span></div>{people.map((person) => <button className="discord-contact" key={person.name} onClick={() => { setActiveChat(person.name); setMessage(""); setTab("mensajes"); }}><span className="discord-avatar"><Image src={person.photo} alt="" fill sizes="32px" /></span><span>{person.name.split(" ")[0]}</span><i /> </button>)}<div className="discord-section-title your-groups-title">TUS GRUPOS <span>＋</span></div>{groups.map((group, index) => <button key={group.name} className={`discord-group ${activeGroup === group.name ? "selected" : ""}`} onClick={() => setActiveGroup(group.name)}><span className={`discord-group-icon group-${index}`}>{group.icon}</span><span>{group.name}</span></button>)}</aside>
                <article className="discord-room"><div className="discord-room-header"><span className={`discord-group-icon group-${groups.findIndex((group) => group.name === activeGroup)}`}>{groups.find((group) => group.name === activeGroup)?.icon}</span><div><h3>{activeGroup}</h3><p>{groups.find((group) => group.name === activeGroup)?.members} personas · Un espacio para compartir</p></div></div><div className="discord-room-welcome"><span>✦</span><h3>Bienvenido a {activeGroup}</h3><p>Comparte tus ideas, conoce a los demás y empieza una conversación.</p></div><div className="discord-sample-message"><span className="discord-avatar"><Image src={people[0].photo} alt="" fill sizes="32px" /></span><div><strong>Maris Herrera <time>Hoy</time></strong><p>¡Hola! ¿Qué les gusta hacer en su tiempo libre? 😊</p></div></div><form className="discord-compose" onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSent([...sent, message]); setMessage(""); } }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={`Escribe en ${activeGroup}...`} /><button aria-label="Enviar">↑</button></form></article></div> : <div className="discord-layout community-space-layout"><aside className="discord-sidebar"><div className="discord-section-title">CONTACTOS <span>{people.length}</span></div>{people.map((person) => <button className="discord-contact" key={person.name} onClick={() => { setActiveChat(person.name); setMessage(""); setTab("mensajes"); }}><span className="discord-avatar"><Image src={person.photo} alt="" fill sizes="32px" /></span><span>{person.name.split(" ")[0]}</span><i /></button>)}<div className="discord-section-title your-groups-title">TUS COMUNIDADES <span>＋</span></div>{communities.map((community) => <button key={community.name} className={`discord-group ${activeCommunity === community.name ? "selected" : ""}`} onClick={() => { setActiveCommunity(community.name); setActiveCommunityChannel("general"); }}><span className="community-sidebar-logo">{communityPhotos[community.name] ? <Image src={communityPhotos[community.name]} alt="" fill unoptimized /> : community.mark}</span><span>{community.name}</span></button>)}</aside>
                <article className="community-room"><header className="community-room-banner"><div className="community-room-avatar">{communityPhotos[activeCommunity] ? <Image src={communityPhotos[activeCommunity]} alt={`Logo de ${activeCommunity}`} fill unoptimized /> : <span>{selectedCommunity.mark}</span>}</div><button className={`community-join community-room-join ${joined.includes(activeCommunity) ? "is-joined" : ""}`} onClick={() => toggleJoin(activeCommunity)}>{joined.includes(activeCommunity) ? "Unida ✓" : "Unirme +"}</button></header><div className="community-room-content"><div className="community-room-title"><div><span className="eyebrow">COMUNIDAD DESTACADA</span><h3>{activeCommunity}</h3></div><span className="community-online"><i /> {selectedCommunity.online} en línea</span></div><p className="community-description">{selectedCommunity.description}</p><div className="community-stats"><span><strong>{selectedCommunity.members}</strong> miembros</span><span><strong>{selectedCommunity.online}</strong> conectados</span></div><div className="community-topics"><span className="community-label">TEMAS</span><div className="tag-row">{selectedCommunity.topics.map((topic) => <span key={topic}>{topic}</span>)}</div></div><div className="community-channels"><span className="community-label">CANALES</span><div>{["general", "presentaciones", "recomendaciones"].map((channel) => <button key={channel} className={activeCommunityChannel === channel ? "selected" : ""} onClick={() => setActiveCommunityChannel(channel)}># {channel}</button>)}</div></div><div className="community-activity"><div className="community-feed-heading"><strong>Actividad reciente</strong><span>Ver todo →</span></div><article className="community-post"><span className="discord-avatar"><Image src={people[0].photo} alt="" fill sizes="32px" /></span><div><strong>Maris Herrera <time>Hace 12 min</time></strong><p>{selectedCommunity.activity}</p><small>♡ 8&nbsp;&nbsp; · &nbsp;💬 3 respuestas</small></div></article>{(communityPosts[activeCommunity] ?? []).map((post, index) => <article className="community-post own-community-post" key={`${post}-${index}`}><span className="community-own-avatar">S</span><div><strong>Soulmi Rivera <time>Ahora</time></strong><p>{post}</p><small>♡ 0&nbsp;&nbsp; · &nbsp;💬 0 respuestas</small></div></article>)}</div><form className="community-post-compose" onSubmit={(event) => { event.preventDefault(); if (communityPost.trim()) { setCommunityPosts({ ...communityPosts, [activeCommunity]: [...(communityPosts[activeCommunity] ?? []), communityPost.trim()] }); setCommunityPost(""); } }}><input value={communityPost} onChange={(event) => setCommunityPost(event.target.value)} placeholder={`Escribe en #${activeCommunityChannel}...`} /><button aria-label="Publicar">↑</button></form></div></article></div>}
          </section>}
        </section>}

        {tab === "mensajes" && <section className="messages-page">
          <header className="messages-mobile-header">
            <Brand href="/inicio" className="messages-mobile-brand" />
            <div className="messages-mobile-heading"><h2>Tus últimas soulcializaciones</h2><p>Todas tus conversaciones en un solo lugar</p></div>
            <div className="messages-search"><Icon name="search" /><input value={chatQuery} onChange={(event) => setChatQuery(event.target.value)} placeholder="Búsqueda específica" /></div>
          </header>
          <div className="page-title"><div><span className="eyebrow">TU ESPACIO SOCIAL</span><h1>Conversaciones</h1><p>Las buenas amistades comienzan hablando.</p></div><button className="new-message">＋ <span>Nuevo mensaje</span></button></div>
          <div className={`chat-layout ${activeChat ? "has-active-chat" : ""}`}>
            <div className="chat-list">
              <div className="chat-search"><Icon name="search" /><input value={chatQuery} onChange={(event) => setChatQuery(event.target.value)} placeholder="Buscar conversación" /></div>
              <div className="chat-list-heading"><strong>Contactos</strong><span>{filteredChats.length} conversaciones</span></div>
              {filteredChats.map((chat) => <button className={`chat-item ${activeChat === chat.name ? "active" : ""}`} key={chat.name} onClick={() => { setActiveChat(chat.name); setMessage(""); }}>
                <div className="avatar chat-avatar" style={{ background: chat.color, position: "relative", overflow: "hidden" }}><Image className="chat-photo" src={chat.photo} alt={`Foto de ${chat.name}`} fill sizes="54px" /></div>
                <div className="chat-meta"><div><strong>{chat.name}</strong><time>{chat.time}</time></div><span className="chat-connection">Edad: {chat.age} · Conexión: {chat.connection}</span><p><b>Tú:</b> {chat.text.replace(/^Tú:\s*/, "")}</p></div>
                {chat.unread && <i className="unread-dot" />}
              </button>)}
            </div>
            <div className="chat-window">
              {selectedChat ? <>
                <div className="chat-thread-header"><div className="avatar chat-avatar" style={{ background: selectedChat.color, position: "relative", overflow: "hidden" }}><Image className="chat-photo" src={selectedChat.photo} alt={`Foto de ${selectedChat.name}`} fill sizes="36px" /></div><div><strong>{selectedChat.name}</strong><span>Conexión: {selectedChat.connection}</span></div></div>
                <div className="chat-thread-messages"><div className="chat-bubble received">{selectedChat.text.replace(/^Tú:\s*/, "")}</div>{sent.map((text, index) => <div className="chat-bubble outgoing" key={`${text}-${index}`}>{text}</div>)}</div>
              </> : <div className="chat-empty"><div className="chat-empty-icon">☏</div><h3>¡Las amistades se construyen conversando!</h3><p>Elige un contacto para abrir el chat.</p></div>}
              <form className="message-compose" onSubmit={(event) => { event.preventDefault(); if (message.trim()) { setSent([...sent, message]); setMessage(""); } }}><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Escribe un mensaje..." /><button aria-label="Enviar mensaje">↗</button></form>
            </div>
          </div>
        </section>}

        {tab === "perfil" && <section className="profile-page"><div className="desktop-profile-view"><span className="eyebrow">ASÍ TE VE TU COMUNIDAD</span><h1>Tu perfil, <em>tu historia.</em></h1><article className="profile-card"><div className="profile-cover"><div className="profile-big-avatar" style={{ position: "relative", overflow: "hidden" }}><Image src={profilePhoto} alt="Foto de perfil de Soulmi" fill sizes="100px" /></div><button>Editar perfil <span>↗</span></button></div><div className="profile-body"><span className="online-pill"><i /> Aquí para conocer gente</span><h2>Soulmi Rivera, 22</h2><p className="profile-location">⌖ Ciudad de México</p><p className="profile-bio">Me encanta descubrir cafeterías, escuchar música y conocer personas con historias interesantes. Siempre lista para un buen plan ✨</p><div className="eyebrow">MIS INTERESES</div><div className="tag-row profile-tags">{["Música", "Café", "Películas", "Arte", "Viajes"].map((tag) => <span key={tag}>{tag}</span>)}</div><div className="profile-stats"><div><strong>{liked.length + 12}</strong><span>conexiones</span></div><div><strong>{joined.length + 3}</strong><span>comunidades</span></div><div><strong>6</strong><span>intereses</span></div></div><Link href="/login" className="profile-exit">← Cerrar sesión</Link></div></article>
          <div className="desktop-profile-gallery" aria-label="Publicaciones de Soulmi" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8, width: "100%", maxWidth: 1320, margin: "25px auto 0" }}>{profileMedia.map((post, index) => <article className="desktop-profile-post" key={`desktop-${index}`} style={{ position: "relative", aspectRatio: "0.82", overflow: "hidden", borderRadius: 12, background: "#e6ddea" }}><Image src={post.src} alt="Publicación de Soulmi" fill sizes="(max-width: 1100px) 25vw, 220px" style={{ objectPosition: post.position, objectFit: "cover" }} /><span className="desktop-post-views" style={{ position: "absolute", zIndex: 2, left: 10, bottom: 9, color: "#fff", fontSize: 11, fontWeight: 700, textShadow: "0 1px 4px #17131b" }}>▶ {post.views}</span></article>)}</div>          </div><div className="mobile-profile-view"><div className="mobile-profile-cover"><button onClick={() => setTab("inicio")} aria-label="Volver a inicio">←</button><Brand href="/inicio" /><button aria-label="Compartir perfil">↗</button></div><div className="mobile-profile-summary"><div className="mobile-profile-avatar"><Image src={profilePhoto} alt="Foto de perfil de Soulmi" fill sizes="100px" /></div><div className="mobile-profile-name"><h2>Soulmi Rivera</h2><span>@soulmi.rivera · Aquí para conocer gente</span></div><span className="mobile-profile-badge">✦</span></div><div className="mobile-profile-stats"><div><strong>{liked.length + 12}</strong><span>Siguiendo</span></div><div><strong>{joined.length + 3}</strong><span>Amigos</span></div><div><strong>6</strong><span>Intereses</span></div></div><div className="mobile-profile-actions"><button>Editar perfil</button><button>Compartir perfil ↗</button></div><div className="mobile-profile-bio"><p>Me encanta descubrir cafeterías, escuchar música y conocer personas con historias interesantes. Siempre lista para un buen plan ✨</p><div className="tag-row">{["Música", "Café", "Películas", "Arte", "Viajes"].map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className="mobile-profile-tabs" role="tablist" aria-label="Contenido del perfil">{([["publicaciones", "▦"], ["guardados", "▤"], ["me gusta", "♡"]] as const).map(([id, icon]) => <button key={id} role="tab" aria-selected={profileTab === id} className={profileTab === id ? "active" : ""} onClick={() => setProfileTab(id)}><span>{icon}</span><small>{id === "me gusta" ? "ME GUSTA" : id.toUpperCase()}</small></button>)}</div><div className="mobile-profile-grid">{(profileTab === "publicaciones" ? profileMedia : profileTab === "guardados" ? profileMedia.slice(1, 4) : profileMedia.slice(2, 5)).map((post, index) => <article className="mobile-profile-post" key={`${profileTab}-${index}`}><Image src={post.src} alt="Publicación de Soulmi" fill sizes="33vw" style={{ objectPosition: post.position }} /><span className="profile-post-views"><i>▶</i> {post.views}</span></article>)}</div><Link href="/login" className="mobile-profile-exit">Cerrar sesión</Link></div>
        </section>}
      </div>
    </section>
    <nav className="mobile-nav" aria-label="Navegación móvil">{[["inicio", "Inicio", "home"], ["descubrir", "Descubrir", "discover"], ["mensajes", "Mensajes", "chat"], ["perfil", "Perfil", "profile"]].map(([id, label, icon]) => <button key={id} className={tab === id ? "active" : ""} onClick={() => { if (id === "descubrir") setDiscoveryView("home"); setTab(id); }}><Icon name={icon} /><span>{label}</span></button>)}</nav>
  </main>;
}
