import { useEffect, useRef, useState } from "react";
import {
  Cpu, Zap, ShieldCheck, WifiOff, Glasses, Leaf, Mail,
  ArrowRight, ArrowUpRight, Layers, Boxes, Radio, Linkedin,
  Github, MapPin, Activity, MapPinned, GraduationCap,
  Handshake, Eye, TrendingUp, Phone
} from "lucide-react";

/* =========================================================================
   VOX.IA — voxiatec.com.br
   Site institucional / pitch — Edge AI & dispositivos com IA integrada
   Gustavo Rodrigues · CTO & Founder
   ========================================================================= */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root{
  --bg:#06080e;
  --bg-2:#0a0e18;
  --panel:#0d1320;
  --panel-2:#111829;
  --ink:#eaf1fb;
  --muted:#8a97ac;
  --faint:#5a6478;
  --line:rgba(255,255,255,.075);
  --line-2:rgba(255,255,255,.13);
  --c1:#34e3cf;          /* aqua / edge */
  --c1-deep:#0fb6a6;
  --c2:#5b8cff;          /* azul elétrico */
  --lime:#bdf24a;        /* sinal "ao vivo" */
  --glow:0 0 0 1px rgba(52,227,207,.25), 0 0 40px rgba(52,227,207,.18);
  --radius:18px;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--ink);font-family:'Hanken Grotesk',sans-serif;-webkit-font-smoothing:antialiased;line-height:1.55;overflow-x:hidden}
.vx{position:relative;min-height:100vh;background:var(--bg);overflow:hidden}

/* ---- atmosfera de fundo ---- */
.vx-bg{position:fixed;inset:0;z-index:0;pointer-events:none}
.vx-bg::before{content:"";position:absolute;inset:0;
  background:
    radial-gradient(800px 600px at 78% -8%, rgba(52,227,207,.16), transparent 60%),
    radial-gradient(700px 600px at 8% 12%, rgba(91,140,255,.12), transparent 55%),
    radial-gradient(900px 700px at 50% 110%, rgba(52,227,207,.07), transparent 60%);
}
.vx-grid{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.5;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:62px 62px;
  mask-image:radial-gradient(circle at 50% 30%, #000 0%, transparent 80%);
  -webkit-mask-image:radial-gradient(circle at 50% 30%, #000 0%, transparent 80%);
}
.vx-noise{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.035;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");}

.wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 26px}

/* ---- tipografia ---- */
.display{font-family:'Bricolage Grotesque',sans-serif;font-weight:700;letter-spacing:-.02em;line-height:1.02}
.mono{font-family:'JetBrains Mono',monospace;font-weight:500;letter-spacing:.02em}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--c1)}

/* ---- nav ---- */
.nav{position:fixed;top:0;left:0;right:0;z-index:50;transition:all .35s ease}
.nav-in{max-width:1180px;margin:0 auto;padding:16px 26px;display:flex;align-items:center;justify-content:space-between}
.nav.scrolled{background:rgba(6,8,14,.72);backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.nav.scrolled .nav-in{padding:11px 26px}
.brand{display:flex;align-items:center;gap:10px;font-family:'Bricolage Grotesque';font-weight:800;font-size:20px;letter-spacing:-.02em;color:var(--ink);text-decoration:none}
.brand .dot{width:9px;height:9px;border-radius:50%;background:var(--lime);box-shadow:0 0 12px var(--lime);animation:pulse 2.4s infinite}
.brand b{color:var(--c1)}
.nav-links{display:flex;gap:30px;align-items:center}
.nav-links a{color:var(--muted);text-decoration:none;font-size:14.5px;font-weight:500;transition:color .2s}
.nav-links a:hover{color:var(--ink)}
.nav-cta{display:inline-flex;align-items:center;gap:7px;background:var(--c1);color:#04231f;font-weight:700;font-size:14px;padding:10px 16px;border-radius:11px;text-decoration:none;transition:transform .2s,box-shadow .2s}
.nav-cta:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(52,227,207,.3)}
@media(max-width:880px){.nav-links{display:none}}

/* ---- botões ---- */
.btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:15px;padding:14px 22px;border-radius:13px;text-decoration:none;cursor:pointer;border:0;transition:transform .2s,box-shadow .2s,background .2s}
.btn-primary{background:var(--c1);color:#04231f}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 12px 34px rgba(52,227,207,.32)}
.btn-ghost{background:transparent;color:var(--ink);border:1px solid var(--line-2)}
.btn-ghost:hover{border-color:var(--c1);color:var(--c1)}

/* ---- hero ---- */
.hero{position:relative;padding:170px 0 90px}
.hero-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:56px;align-items:center}
@media(max-width:940px){.hero-grid{grid-template-columns:1fr;gap:40px}.hero{padding:140px 0 60px}}
.hero h1{font-size:clamp(40px,6.4vw,74px);margin:22px 0 0}
.hero h1 .hl{color:var(--c1);position:relative}
.hero p.lead{font-size:clamp(17px,2vw,20px);color:var(--muted);max-width:560px;margin:26px 0 34px}
.hero-cta{display:flex;gap:14px;flex-wrap:wrap}
.hero-tags{display:flex;gap:10px;flex-wrap:wrap;margin-top:34px}
.tag{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted);border:1px solid var(--line);border-radius:99px;padding:7px 13px;background:rgba(255,255,255,.02)}
.tag b{color:var(--c1)}

/* ---- device card (visual hero) ---- */
.device{position:relative;background:linear-gradient(160deg,var(--panel),var(--bg-2));border:1px solid var(--line-2);border-radius:22px;padding:24px;box-shadow:0 40px 80px -30px rgba(0,0,0,.7);overflow:hidden}
.device::before{content:"";position:absolute;top:-40%;left:-10%;width:120%;height:80%;background:radial-gradient(circle,rgba(52,227,207,.16),transparent 60%);filter:blur(20px)}
.device-top{display:flex;justify-content:space-between;align-items:center;position:relative;z-index:1}
.device-top .live{display:flex;align-items:center;gap:8px;font-family:'JetBrains Mono';font-size:12px;color:var(--lime)}
.device-top .live .d{width:8px;height:8px;border-radius:50%;background:var(--lime);box-shadow:0 0 10px var(--lime);animation:pulse 1.8s infinite}
.device-chip{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono';font-size:11.5px;color:var(--c1);border:1px solid rgba(52,227,207,.3);padding:5px 10px;border-radius:8px;background:rgba(52,227,207,.06)}
.scan{position:relative;z-index:1;margin:22px 0;height:128px;border-radius:14px;border:1px solid var(--line);background:
  repeating-linear-gradient(180deg,rgba(255,255,255,.018) 0 1px,transparent 1px 6px),var(--bg);overflow:hidden;display:flex;align-items:center;justify-content:center}
.scan .ico{color:var(--c1);opacity:.9;animation:float 4s ease-in-out infinite}
.scan .beam{position:absolute;left:0;right:0;height:46px;top:-46px;background:linear-gradient(180deg,transparent,rgba(52,227,207,.22),transparent);animation:scan 3.2s linear infinite}
.box{position:absolute;border:1.5px solid var(--lime);border-radius:6px;width:64px;height:46px;top:38px;left:calc(50% - 6px);box-shadow:0 0 16px rgba(189,242,74,.25)}
.box span{position:absolute;top:-19px;left:-1px;font-family:'JetBrains Mono';font-size:10px;color:var(--lime);background:rgba(0,0,0,.5);padding:1px 5px;border-radius:4px}
.metrics{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}
.metric{background:rgba(255,255,255,.025);border:1px solid var(--line);border-radius:11px;padding:12px}
.metric .v{font-family:'Bricolage Grotesque';font-weight:700;font-size:20px;color:var(--ink)}
.metric .v small{font-size:12px;color:var(--c1);font-family:'JetBrains Mono'}
.metric .k{font-size:11px;color:var(--faint);font-family:'JetBrains Mono';letter-spacing:.04em;margin-top:3px}

/* ---- secoes ---- */
.section{position:relative;padding:96px 0}
.section-head{max-width:680px;margin-bottom:54px}
.section-head h2{font-size:clamp(30px,4.4vw,46px);margin:14px 0 16px}
.section-head p{color:var(--muted);font-size:17px}

/* ---- grid de cards ---- */
.cards{display:grid;gap:18px}
.cards-4{grid-template-columns:repeat(4,1fr)}
.cards-3{grid-template-columns:repeat(3,1fr)}
.cards-2{grid-template-columns:repeat(2,1fr)}
@media(max-width:940px){.cards-4{grid-template-columns:1fr 1fr}.cards-3{grid-template-columns:1fr}.cards-2{grid-template-columns:1fr}}
@media(max-width:560px){.cards-4{grid-template-columns:1fr}}
.card{background:linear-gradient(165deg,var(--panel),var(--bg-2));border:1px solid var(--line);border-radius:var(--radius);padding:26px;transition:transform .3s,border-color .3s,box-shadow .3s;position:relative;overflow:hidden}
.card:hover{transform:translateY(-5px);border-color:var(--line-2);box-shadow:0 26px 50px -28px rgba(0,0,0,.8)}
.card .ic{width:46px;height:46px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(52,227,207,.1);border:1px solid rgba(52,227,207,.22);color:var(--c1);margin-bottom:18px}
.card h3{font-family:'Bricolage Grotesque';font-weight:700;font-size:19px;margin-bottom:9px}
.card p{color:var(--muted);font-size:14.5px}
.card .num{position:absolute;top:18px;right:20px;font-family:'JetBrains Mono';font-size:12px;color:var(--faint)}

/* ---- tecnologia / stack ---- */
.stack{display:flex;flex-direction:column;gap:0;border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
.layer{display:grid;grid-template-columns:auto 1fr auto;gap:22px;align-items:center;padding:24px 28px;background:var(--panel);border-bottom:1px solid var(--line);transition:background .25s}
.layer:last-child{border-bottom:0}
.layer:hover{background:var(--panel-2)}
.layer .li{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:rgba(91,140,255,.1);border:1px solid rgba(91,140,255,.25);color:var(--c2)}
.layer h4{font-family:'Bricolage Grotesque';font-weight:700;font-size:17px;margin-bottom:3px}
.layer p{color:var(--muted);font-size:14px}
.layer .lt{font-family:'JetBrains Mono';font-size:11px;color:var(--faint);text-align:right;white-space:nowrap}
@media(max-width:640px){.layer{grid-template-columns:auto 1fr}.layer .lt{display:none}}

/* ---- produtos ---- */
.prod{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:860px){.prod{grid-template-columns:1fr}}
.prod-card{position:relative;background:linear-gradient(160deg,var(--panel),var(--bg-2));border:1px solid var(--line);border-radius:22px;padding:30px;overflow:hidden;transition:border-color .3s,transform .3s}
.prod-card:hover{border-color:var(--line-2);transform:translateY(-4px)}
.prod-card::after{content:"";position:absolute;bottom:-50%;right:-20%;width:80%;height:90%;background:radial-gradient(circle,rgba(52,227,207,.1),transparent 60%);filter:blur(20px)}
.prod-card.b::after{background:radial-gradient(circle,rgba(189,242,74,.09),transparent 60%)}
.prod-head{display:flex;align-items:center;gap:14px;margin-bottom:18px;position:relative;z-index:1}
.prod-head .pic{width:52px;height:52px;border-radius:13px;display:flex;align-items:center;justify-content:center;background:rgba(52,227,207,.1);border:1px solid rgba(52,227,207,.22);color:var(--c1)}
.prod-card.b .pic{background:rgba(189,242,74,.1);border-color:rgba(189,242,74,.25);color:var(--lime)}
.prod-name{font-family:'Bricolage Grotesque';font-weight:800;font-size:23px}
.prod-market{font-family:'JetBrains Mono';font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--faint);margin-top:2px}
.prod-card p{color:var(--muted);font-size:15px;position:relative;z-index:1;margin-bottom:18px}
.prod-spec{display:flex;flex-wrap:wrap;gap:8px;position:relative;z-index:1}
.spec{font-family:'JetBrains Mono';font-size:11.5px;color:var(--ink);background:rgba(255,255,255,.04);border:1px solid var(--line);border-radius:8px;padding:5px 10px}
.collection-label{display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono';font-size:12.5px;letter-spacing:.08em;text-transform:uppercase;color:var(--c1);margin:0 0 16px 2px}

/* ---- faixa tese ---- */
.belt{border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:linear-gradient(180deg,rgba(52,227,207,.04),transparent)}
.belt-in{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;padding:54px 0}
@media(max-width:780px){.belt-in{grid-template-columns:1fr 1fr;gap:34px 20px}}
.stat .v{font-family:'Bricolage Grotesque';font-weight:800;font-size:clamp(30px,4vw,44px);color:var(--ink);line-height:1}
.stat .v b{color:var(--c1)}
.stat .k{color:var(--muted);font-size:14px;margin-top:8px}

/* ---- founder ---- */
.founder{display:grid;grid-template-columns:.8fr 1.2fr;gap:44px;align-items:center;background:linear-gradient(160deg,var(--panel),var(--bg-2));border:1px solid var(--line);border-radius:24px;padding:44px}
@media(max-width:820px){.founder{grid-template-columns:1fr;gap:28px;padding:30px}}
.avatar{aspect-ratio:1;border-radius:20px;background:
  radial-gradient(circle at 35% 25%, rgba(52,227,207,.25), transparent 55%),
  linear-gradient(145deg,var(--panel-2),var(--bg));border:1px solid var(--line-2);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.avatar .mono-init{font-family:'Bricolage Grotesque';font-weight:800;font-size:64px;color:var(--c1);text-shadow:0 0 30px rgba(52,227,207,.4)}
.avatar-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:20px}
.avatar .ring{z-index:2}
.avatar .ring{position:absolute;inset:14px;border:1px dashed rgba(52,227,207,.3);border-radius:16px;animation:spin 22s linear infinite}
.founder .role{font-family:'JetBrains Mono';font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--c1)}
.founder h3{font-family:'Bricolage Grotesque';font-weight:800;font-size:34px;margin:8px 0 16px}
.founder p{color:var(--muted);font-size:16px;margin-bottom:14px}
.founder .links{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap}
.flink{display:inline-flex;align-items:center;gap:8px;color:var(--ink);text-decoration:none;font-size:14px;font-weight:600;border:1px solid var(--line-2);border-radius:11px;padding:10px 15px;transition:border-color .2s,color .2s}
.flink:hover{border-color:var(--c1);color:var(--c1)}

/* ---- contato ---- */
.contact{text-align:center;padding:30px 0 10px}
.contact h2{font-size:clamp(32px,5vw,56px);margin-bottom:18px}
.contact p{color:var(--muted);font-size:18px;max-width:540px;margin:0 auto 32px}
.mailbox{display:inline-flex;align-items:center;gap:12px;background:var(--panel);border:1px solid var(--line-2);border-radius:14px;padding:14px 20px;font-family:'JetBrains Mono';font-size:15px;color:var(--ink);text-decoration:none;transition:border-color .25s,box-shadow .25s;margin-bottom:30px}
.mailbox:hover{border-color:var(--c1);box-shadow:var(--glow)}
.mailbox b{color:var(--c1)}

/* ---- footer ---- */
.footer{border-top:1px solid var(--line);margin-top:90px;padding:40px 0 50px}
.footer-in{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
.footer .muted{color:var(--faint);font-size:13.5px;font-family:'JetBrains Mono'}

/* ---- animacoes ---- */
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.82)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes scan{0%{top:-46px}100%{top:128px}}
@keyframes spin{to{transform:rotate(360deg)}}
.reveal{opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
.reveal.in{opacity:1;transform:none}
.d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}
@media(prefers-reduced-motion:reduce){.reveal{transition:none;opacity:1;transform:none}.scan .beam,.brand .dot,.live .d,.avatar .ring,.scan .ico{animation:none}}
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const WHATSAPP_URL = "https://wa.me/5531994752630";
const FOUNDER_PHOTO = "data:image/jpeg;base64,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";

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="vx">
      <style>{CSS}</style>
      <div className="vx-bg" />
      <div className="vx-grid" />
      <div className="vx-noise" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-in">
          <a href="#top" className="brand">
            <span className="dot" /> VOX<b>.IA</b>
          </a>
          <div className="nav-links">
            <a href="#tese">Por que Edge</a>
            <a href="#tecnologia">Tecnologia</a>
            <a href="#produtos">Produtos</a>
            <a href="#parcerias">Parcerias</a>
            <a href="#fundador">Fundador</a>
          </div>
          <a className="nav-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar com o fundador <ArrowRight size={15} />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="hero wrap">
        <div className="hero-grid">
          <div>
            <div className="eyebrow reveal in">Edge AI · Computação no dispositivo</div>
            <h1 className="display reveal in d1">
              Inteligência artificial que roda <span className="hl">no dispositivo</span>. Não na nuvem.
            </h1>
            <p className="lead reveal in d2">
              A VOX.IA projeta hardware com IA integrada — do silício ao modelo. Visão e voz
              processadas localmente, em tempo real, com privacidade por padrão e funcionamento
              mesmo offline.
            </p>
            <div className="hero-cta reveal in d3">
              <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Conversar sobre o projeto <ArrowRight size={17} />
              </a>
              <a className="btn btn-ghost" href="#tecnologia">
                Conhecer a tecnologia
              </a>
            </div>
            <div className="hero-tags reveal in d4">
              <span className="tag"><b>0</b> dependência de nuvem para inferir</span>
              <span className="tag">Visão · Voz · <b>on-device</b></span>
              <span className="tag">Hardware <b>+</b> Firmware <b>+</b> Modelo</span>
            </div>
          </div>

          {/* device card */}
          <div className="device reveal in d2">
            <div className="device-top">
              <span className="device-chip"><Cpu size={14} /> NPU edge · on-device</span>
              <span className="live"><span className="d" /> ON-DEVICE</span>
            </div>
            <div className="scan">
              <div className="beam" />
              <Glasses className="ico" size={52} />
              <div className="box"><span>objeto 0.97</span></div>
            </div>
            <div className="metrics">
              <div className="metric">
                <div className="v">12<small>ms</small></div>
                <div className="k">latência</div>
              </div>
              <div className="metric">
                <div className="v">100<small>%</small></div>
                <div className="k">local</div>
              </div>
              <div className="metric">
                <div className="v">0<small>kb</small></div>
                <div className="k">enviado</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TESE — por que edge */}
      <section id="tese" className="section wrap">
        <div className="section-head reveal">
          <div className="eyebrow">A tese</div>
          <h2 className="display">A próxima onda de IA não acontece em data centers.</h2>
          <p>
            Acontece nas mãos, nos olhos e nos campos das pessoas. Levar o modelo até o dado —
            e não o dado até o modelo — resolve quatro problemas que a nuvem não resolve.
          </p>
        </div>
        <div className="cards cards-4">
          {[
            { i: <Zap size={22} />, t: "Latência real", d: "Resposta em milissegundos. Sem ida e volta à internet — essencial para assistência em tempo real." },
            { i: <ShieldCheck size={22} />, t: "Privacidade por padrão", d: "Imagem, áudio e contexto são processados no próprio dispositivo. O dado sensível não viaja." },
            { i: <WifiOff size={22} />, t: "Funciona offline", d: "Opera em campo, em fábrica ou em movimento, sem depender de conexão estável." },
            { i: <Activity size={22} />, t: "Custo previsível", d: "Sem custo de inferência por requisição na nuvem. A inteligência mora no produto." },
          ].map((c, n) => (
            <div className={`card reveal d${(n % 4) + 1}`} key={c.t}>
              <span className="num">0{n + 1}</span>
              <div className="ic">{c.i}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TECNOLOGIA */}
      <section id="tecnologia" className="section wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Tecnologia</div>
          <h2 className="display">Do silício ao modelo, integrado de ponta a ponta.</h2>
          <p>
            Dominamos a pilha completa do dispositivo inteligente — o que permite otimizar
            energia, latência e custo onde realmente importa.
          </p>
        </div>
        <div className="stack reveal">
          {[
            { i: <Cpu size={20} />, t: "Hardware embarcado", d: "SoCs de baixo consumo, câmeras, microfones e sensores — projetados para inferência na borda.", x: "SoC edge · NPU" },
            { i: <Radio size={20} />, t: "Firmware & conectividade", d: "Captura, deep sleep, onboarding WiFi e gerência de energia para autonomia real em uso contínuo.", x: "C/C++ · RTOS" },
            { i: <Layers size={20} />, t: "Modelos otimizados", d: "Visão computacional e voz comprimidos para rodar localmente, com fallback inteligente quando necessário.", x: "YOLO · ASR · TTS" },
            { i: <Boxes size={20} />, t: "Plataforma & integração", d: "Apps, backend e painéis que conectam o dispositivo ao usuário — com modelo BYOK quando aplicável.", x: "React · Node · BYOK" },
          ].map((l, n) => (
            <div className={`layer reveal d${(n % 4) + 1}`} key={l.t}>
              <div className="li">{l.i}</div>
              <div>
                <h4>{l.t}</h4>
                <p>{l.d}</p>
              </div>
              <div className="lt">{l.x}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <section id="produtos" className="section wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Produtos</div>
          <h2 className="display">Edge AI aplicada a mercados reais.</h2>
          <p>Uma coleção de óculos inteligentes e soluções embarcadas — a mesma plataforma de IA na borda por trás de todas.</p>
        </div>

        <div className="collection-label reveal">
          <Glasses size={16} /> A coleção Vox · óculos com IA na borda
        </div>
        <div className="prod">
          <div className="prod-card reveal d1">
            <div className="prod-head">
              <span className="pic"><MapPinned size={26} /></span>
              <div>
                <div className="prod-name">Vox Signature</div>
                <div className="prod-market">Wearable · Consumer & Acessibilidade</div>
              </div>
            </div>
            <p>
              Óculos inteligentes com IA integrada e <b style={{ color: "var(--ink)" }}>geolocalização contextual</b>.
              Visão computacional e voz descrevem o ambiente, leem textos e orientam o usuário em
              tempo real — sabendo onde ele está e o que há ao redor, com processamento no dispositivo.
            </p>
            <div className="prod-spec">
              <span className="spec">Visão + Voz</span>
              <span className="spec">Geolocalização</span>
              <span className="spec">Tempo real</span>
              <span className="spec">On-device</span>
            </div>
          </div>

          <div className="prod-card b reveal d2">
            <div className="prod-head">
              <span className="pic"><GraduationCap size={26} /></span>
              <div>
                <div className="prod-name">Vox Kids / Edu</div>
                <div className="prod-market">Educação · Crianças</div>
              </div>
            </div>
            <p>
              Óculos para crianças com uma <b style={{ color: "var(--ink)" }}>plataforma educacional inteligente</b>.
              A IA acompanha, responde e estimula o aprendizado de forma lúdica e segura, conectando
              o que a criança vê ao conteúdo certo — um tutor que enxerga junto.
            </p>
            <div className="prod-spec">
              <span className="spec">Plataforma educacional</span>
              <span className="spec">Aprendizado adaptativo</span>
              <span className="spec">Ambiente seguro</span>
              <span className="spec">Visão + Voz</span>
            </div>
          </div>
        </div>

        <div className="collection-label reveal" style={{ marginTop: 30 }}>
          <Leaf size={16} /> Outras frentes
        </div>
        <div className="prod-card b reveal d1" style={{ marginTop: 0 }}>
          <div className="prod-head">
            <span className="pic"><Leaf size={26} /></span>
            <div>
              <div className="prod-name">AgroScan IA</div>
              <div className="prod-market">Agro · Diagnóstico em campo</div>
            </div>
          </div>
          <p>
            Diagnóstico agrícola que roda 100% offline. Visão computacional detecta doenças em
            culturas direto no dispositivo, em campo e sem internet, gerando laudos técnicos
            acionáveis para o produtor.
          </p>
          <div className="prod-spec">
            <span className="spec">100% offline</span>
            <span className="spec">Visão especializada</span>
            <span className="spec">Base técnica EMBRAPA</span>
            <span className="spec">Laudo automático</span>
          </div>
        </div>
      </section>

      {/* PARCERIAS & RESPALDO */}
      <section id="parcerias" className="section wrap">
        <div className="section-head reveal">
          <div className="eyebrow">Parcerias &amp; respaldo</div>
          <h2 className="display">Nossa tecnologia, nas mãos de quem é referência.</h2>
          <p>A VOX.IA desenvolve a plataforma de Edge AI e a disponibiliza para parceiros líderes em óculos e óptica — com respaldo de investimento estratégico.</p>
        </div>
        <div className="cards cards-3">
          <div className="card reveal d1">
            <div className="ic"><Handshake size={22} /></div>
            <h3>YoFace</h3>
            <p>Fabricante de óculos personalizados e impressos sob medida. Parceira que integra a tecnologia de Edge AI da VOX.IA aos seus óculos e a leva ao usuário final.</p>
          </div>
          <div className="card reveal d2">
            <div className="ic"><Eye size={22} /></div>
            <h3>Zeiss</h3>
            <p>Multinacional alemã e referência global em tecnologia óptica. Parceira para a disponibilização da plataforma VOX.IA em produtos ópticos de alto padrão.</p>
          </div>
          <div className="card reveal d3">
            <div className="ic"><TrendingUp size={22} /></div>
            <h3>Investidor estratégico</h3>
            <p>Projeto com respaldo de investidor estratégico — identidade mantida em confidencialidade nesta etapa.</p>
          </div>
        </div>
      </section>

      {/* BELT — tese de valor */}
      <section className="belt">
        <div className="wrap belt-in">
          {[
            { v: <>100<b>%</b></>, k: "Inferência no dispositivo, sem nuvem obrigatória" },
            { v: <>3<b>+</b></>, k: "Produtos: linha de óculos Vox e agro" },
            { v: <><b>full</b>-stack</>, k: "Hardware, firmware, modelo e plataforma" },
            { v: <>YoFace<b>·</b>Zeiss</>, k: "Parcerias estratégicas e respaldo de investidor" },
          ].map((s, n) => (
            <div className={`stat reveal d${(n % 4) + 1}`} key={n}>
              <div className="v display">{s.v}</div>
              <div className="k">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FUNDADOR */}
      <section id="fundador" className="section wrap">
        <div className="founder reveal">
          <div className="avatar">
            <div className="ring" />
            <img className="avatar-img" src={FOUNDER_PHOTO} alt="Gustavo Rodrigues — CTO & Founder da VOX.IA" />
          </div>
          <div>
            <div className="role">CTO & Founder</div>
            <h3 className="display">Gustavo Rodrigues</h3>
            <p>
              Engenheiro de software e líder técnico full-stack, com atuação que vai do firmware
              de dispositivos embarcados a aplicativos, backend e integração de IA. Fundou a VOX.IA
              para transformar inteligência artificial embarcada em produtos de hardware reais.
            </p>
            <p>
              Atua também como educador em ensino técnico de Desenvolvimento de Sistemas, formando
              talento em tecnologia — uma ponte direta entre pesquisa aplicada, produto e formação.
            </p>
            <div className="links">
              <a className="flink" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp</a>
              <a className="flink" href="https://www.linkedin.com/in/gustavo-rodrigues-733a8993/" target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn</a>
              <a className="flink" href="https://github.com/Gusdevr" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              <span className="flink" style={{ cursor: "default" }}><MapPin size={16} /> Minas Gerais, Brasil</span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="section wrap contact">
        <div className="reveal">
          <div className="eyebrow" style={{ display: "block", marginBottom: 16 }}>Vamos conversar</div>
          <h2 className="display">
            Investidor, parceiro ou empresa?
          </h2>
          <p>
            Estamos abertos a conversas sobre investimento, pilotos e parcerias estratégicas em
            Edge AI. Fale diretamente com o fundador.
          </p>
          <a className="mailbox" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <Phone size={18} /> <b>(31) 99475-2630</b>
          </a>
          <div>
            <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Conversar no WhatsApp <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-in">
          <a href="#top" className="brand"><span className="dot" /> VOX<b>.IA</b></a>
          <span className="muted">voxiatec.com.br · Edge AI &amp; dispositivos com IA integrada</span>
          <span className="muted">© {new Date().getFullYear()} VOX.IA</span>
        </div>
      </footer>
    </div>
  );
}
