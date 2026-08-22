import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { ArrowUpRight, Copy, Menu, X } from 'lucide-react';
import './styles.css';

type Project = {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  slug: string;
  client: string;
  role: string;
  services: string;
  tools: string;
  art: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'DRAGON RAID',
    category: 'Minecraft Thumbnail',
    year: '2026',
    description:
      'A high-impact Minecraft thumbnail built around a clear focal character, dramatic scale, and instant visual storytelling.',
    slug: 'dragon-raid',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Composition / Image Editing',
    tools: 'Photoshop / Blender / Minecraft Assets',
    art: 'a1',
  },
  {
    id: 2,
    title: '100 DAYS',
    category: 'Minecraft Thumbnail',
    year: '2026',
    description:
      'A survival-series thumbnail focused on readability at small sizes, strong subject separation, and a cinematic sense of danger.',
    slug: '100-days',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Lighting / Compositing',
    tools: 'Photoshop / Blender / Minecraft Assets',
    art: 'a2',
  },
  {
    id: 3,
    title: 'BEDWARS',
    category: 'Minecraft Thumbnail',
    year: '2026',
    description:
      'A competitive gaming thumbnail using bold silhouettes, directional movement, and a simple visual hierarchy designed to stop the scroll.',
    slug: 'bedwars',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Cutouts / Effects',
    tools: 'Photoshop / Minecraft Assets',
    art: 'a3',
  },
  {
    id: 4,
    title: 'ONE BLOCK',
    category: 'Minecraft Thumbnail',
    year: '2026',
    description:
      'A clean challenge thumbnail where one oversized subject carries the concept and the surrounding space supports the story.',
    slug: 'one-block',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Art Direction / Typography',
    tools: 'Photoshop / Blender / Minecraft Assets',
    art: 'a4',
  },
  {
    id: 5,
    title: 'HARDCORE',
    category: 'Minecraft Thumbnail',
    year: '2026',
    description:
      'A dramatic hardcore thumbnail designed around danger, contrast, and a single readable story beat.',
    slug: 'hardcore',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Compositing / Color',
    tools: 'Photoshop / Blender / Minecraft Assets',
    art: 'a5',
  },
  {
    id: 6,
    title: 'HUNT',
    category: 'Minecraft Thumbnail',
    year: '2025',
    description:
      'A fast-paced Minecraft thumbnail exploring pursuit, depth, and exaggerated action while keeping the main idea instantly readable.',
    slug: 'hunt',
    client: 'Personal / Portfolio',
    role: 'Thumbnail Designer',
    services: 'Thumbnail Design / Motion Feel / Compositing',
    tools: 'Photoshop / Minecraft Assets / Blender',
    art: 'a6',
  },
];

const getProject = (slug: string) => projects.find((project) => project.slug === slug);

function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const go = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`nav ${open ? 'open' : ''}`}>
      <Link className="brand" to="/">
        RAVIEN<span>®</span>
      </Link>
      <button className="menu" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>
        {open ? <X size={19} /> : <Menu size={19} />}
      </button>
      <nav>
        <button onClick={() => go('work')}>WORK</button>
        <button onClick={() => go('about')}>ABOUT</button>
        <button onClick={() => go('archive')}>ARCHIVE</button>
        <button onClick={() => go('contact')}>CONTACT</button>
      </nav>
      <span className="status">THUMBNAILS / OPEN FOR WORK</span>
    </header>
  );
}

function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        setActive(true);
        setLabel(target.getAttribute('data-cursor') || '');
      }
    };
    const out = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('[data-cursor]')) {
        setActive(false);
        setLabel('');
      }
    };

    addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <div
      className={`cursor ${active ? 'active' : ''}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {label}
    </div>
  );
}

function Art({ type = 'a1', large = false }: { type?: string; large?: boolean }) {
  return (
    <div className={`art ${type}${large ? ' large' : ''}`}>
      <i className="grid" />
      <i className="orbit one" />
      <i className="orbit two" />
      <i className="core" />
      <span className="art-label">RAVIEN / THUMBNAIL</span>
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  return (
    <Link to={`/project/${p.slug}`} className={`card c${i + 1}`} data-cursor="VIEW">
      <Art type={p.art} />
      <div className="card-meta">
        <small>0{p.id}</small>
        <div className="card-copy">
          <h3>{p.title}</h3>
          <p>{p.category}</p>
          <span>{p.year}</span>
        </div>
        <ArrowUpRight size={18} />
      </div>
    </Link>
  );
}

function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <section className="hero">
          <div className="hero-top">
            <span>MINECRAFT THUMBNAIL DESIGNER</span>
            <span>01—06 / SELECTED WORK</span>
          </div>

          <h1>
            <span>MAKE</span>
            <span>THE</span>
            <span>CLICK<span>.</span></span>
          </h1>

          <div className="hero-bottom">
            <p>
              High-impact Minecraft thumbnails built to grab attention,
              <br />
              communicate the idea fast, and make the video impossible to ignore.
            </p>
            <small>SCROLL TO EXPLORE ↓</small>
          </div>
        </section>

        <section id="work" className="work shell">
          <div className="head">
            <div>
              <label>01 / SELECTED WORK</label>
              <h2>
                THUMBNAILS
                <br />
                THAT <span>POP.</span>
              </h2>
            </div>
            <p>
              Minecraft thumbnails focused on strong composition, readable subjects,
              cinematic lighting, and click-worthy storytelling.
            </p>
          </div>

          <div className="stage">
            {projects.map((project, index) => (
              <Card key={project.id} p={project} i={index} />
            ))}
          </div>
        </section>

        <About />
        <Archive />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

function About() {
  return (
    <section id="about" className="about shell">
      <label>02 / ABOUT RAVIEN</label>
      <div className="about-grid">
        <h2>
          THUMBNAILS
          <br />
          SHOULD BE
          <br />
          <em>INSTANT.</em>
        </h2>
        <div className="copy">
          <p className="lead">
            I’m Ravien, a Minecraft thumbnail designer focused on making gaming visuals that get noticed in a crowded feed.
          </p>
          <p>
            I build thumbnails around one clear idea: the viewer should understand the story in a fraction of a second. Strong subjects, depth, lighting, scale, and controlled typography do the heavy lifting.
          </p>
          <p>
            I’m currently open to working with Minecraft creators, SMP channels, survival series, challenge videos, and gaming brands.
          </p>
        </div>
      </div>

      <div className="facts">
        <div>
          <span>NAME</span>
          <b>RAVIEN</b>
        </div>
        <div>
          <span>FOCUS</span>
          <b>MINECRAFT THUMBNAILS</b>
        </div>
        <div>
          <span>TOOLS</span>
          <b>PHOTOSHOP / BLENDER / MINECRAFT</b>
        </div>
        <div>
          <span>STATUS</span>
          <b>OPEN FOR COMMISSIONS</b>
        </div>
      </div>
    </section>
  );
}

function Archive() {
  const [hovered, setHovered] = useState<Project | null>(null);

  return (
    <section id="archive" className="archive shell">
      <label>03 / ARCHIVE</label>
      <h2>
        MORE
        <br />
        WORK<span>.</span>
      </h2>

      <div className="rows">
        {[...projects].reverse().map((project) => (
          <Link
            data-cursor="VIEW"
            onMouseEnter={() => setHovered(project)}
            onMouseLeave={() => setHovered(null)}
            key={project.id}
            to={`/project/${project.slug}`}
          >
            <span>{project.year}</span>
            <b>{project.title}</b>
            <span>{project.category}</span>
            <ArrowUpRight size={16} />
          </Link>
        ))}
      </div>

      {hovered && (
        <div className="preview">
          <Art type={hovered.art} />
        </div>
      )}
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'hello@ravien.design';

  const copy = async () => {
    await navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="contact" className="contact shell">
      <label>04 / CONTACT</label>
      <h2>
        NEED A
        <br />
        THUMBNAIL<span>?</span>
      </h2>
      <div className="contact-bottom">
        <button onClick={copy} data-cursor="COPY">
          {copied ? 'COPIED' : email}
          <Copy size={17} />
        </button>
        <div>
          <a href="#">INSTAGRAM</a>
          <a href="#">DISCORD</a>
          <a href="#">YOUTUBE</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer shell">
      <span>© {new Date().getFullYear()} RAVIEN®</span>
      <span>MINECRAFT THUMBNAILS / VISUAL DESIGN</span>
      <button onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}>BACK TO TOP ↑</button>
      <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </footer>
  );
}

function Project() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug || '');

  if (!project) {
    return (
      <>
        <Nav />
        <div className="notfound">
          <h1>
            NOT FOUND<span>.</span>
          </h1>
          <button onClick={() => navigate('/')}>BACK HOME</button>
        </div>
      </>
    );
  }

  const next = projects[project.id % projects.length];

  return (
    <>
      <Cursor />
      <Nav />
      <main className="case">
        <section className="case-head shell">
          <button onClick={() => navigate(-1)}>← BACK TO WORK</button>
          <label>PROJECT 0{project.id} / {project.year}</label>
          <h1>
            {project.title}
            <span>.</span>
          </h1>
          <p>{project.description}</p>
          <Art type={project.art} large />
        </section>

        <section className="case-info shell">
          <div>
            <span>CLIENT</span>
            <b>{project.client}</b>
          </div>
          <div>
            <span>ROLE</span>
            <b>{project.role}</b>
          </div>
          <div>
            <span>SERVICES</span>
            <b>{project.services}</b>
          </div>
          <div>
            <span>TOOLS</span>
            <b>{project.tools}</b>
          </div>
        </section>

        <section className="story shell">
          <p className="statement">One frame. One idea. Make the viewer stop scrolling.</p>
          <div className="story-grid">
            <Art type={project.art} />
            <Art type={project.art} />
          </div>
          <p className="bodycopy">
            This thumbnail is designed around a simple visual hierarchy: the main subject reads first, the action reads second, and supporting details add depth without competing with the story. Replace these generated placeholders with your final thumbnail artwork.
          </p>
        </section>

        <section className="next shell">
          <label>NEXT THUMBNAIL</label>
          <Link data-cursor="VIEW" to={`/project/${next.slug}`}>
            {next.title}
            <ArrowUpRight size={35} />
          </Link>
        </section>

        <Footer />
      </main>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:slug" element={<Project />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
