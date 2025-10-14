:root{
  --bg:#292728;
  --panel-bg:#eaa73a; /* amarillo cinta */
  --panel-dark:#e89b2b;
  --muted:#cfcfcf;
  --pink:#d71f61; /* flechas y acento */
  --title-yellow:#f0a92b;
  --max-w:1200px;
  --ff-title:"Orbitron","Segoe UI",Arial,sans-serif;
  --ff-body:"Open Sans",Arial,sans-serif;
}

*{box-sizing:border-box}
html,body{height:100%;margin:0;padding:0}
body{
  background:var(--bg);
  color:#f1f1f1;
  font-family:var(--ff-body);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

.container{max-width:var(--max-w);margin:0 auto;padding:28px}

/* Header */
.site-header{position:relative;padding-top:28px;padding-bottom:18px;overflow:visible}
.header-inner{display:flex;align-items:center;justify-content:space-between}
.title{margin:0;font-family:var(--ff-title);color:var(--title-yellow);letter-spacing:2px;font-size:36px;text-transform:uppercase;text-shadow:0 6px 20px rgba(0,0,0,0.6)}

/* underline anim */
.underline-anim{height:4px;width:40%;max-width:700px;background:linear-gradient(90deg,var(--title-yellow),rgba(255,255,255,0.03));margin:12px 0 0 36px;transform-origin:left center;transform:scaleX(0);border-radius:3px;box-shadow:0 4px 18px rgba(240,178,58,0.09);transition:transform .9s cubic-bezier(.2,.9,.25,1)}

/* Hero */
.hero-title{text-align:center;font-family:var(--ff-title);font-size:28px;margin:20px 0 6px;color:#fff}
.hero-sub{text-align:center;color:var(--muted);margin:0 0 28px}

/* ---- Media rows ---- */
.media-row{margin:34px 0}
.media-title{font-family:var(--ff-title);color:var(--title-yellow);font-size:26px;margin:0 0 12px;padding-left:14px;display:inline-block;}

/* Carousel wrap and ribbon behavior */
.carousel-wrap{position:relative;display:flex;align-items:center;height:220px;padding:12px 6px;}

/* Yellow ribbon (background bar) — hidden by default, appears on hover */
.carousel{flex:1;height:160px;border-radius:6px;background:transparent;display:flex;gap:18px;overflow-x:auto;padding:16px 28px;scroll-behavior:smooth;align-items:center;transition:background .28s ease;border:10px solid transparent}
.media-row:hover .carousel{background:linear-gradient(90deg,var(--panel-bg),var(--panel-dark));border-color:var(--panel-bg)}

/* Card */
.card{min-width:320px;height:100%;background:#000;border:10px solid #0a0a0a;border-radius:4px;overflow:hidden;position:relative;flex:0 0 auto;box-shadow:0 10px 30px rgba(0,0,0,0.6);cursor:pointer}
.thumb{position:absolute;inset:0;background-size:cover;background-position:center}
.card-overlay{position:absolute;left:8px;bottom:8px;color:#fff;font-weight:700;padding:6px 8px;background:rgba(0,0,0,0.45);border-radius:4px;font-size:12px}

/* Arrows */
.carousel-arrow{position:absolute;top:50%;transform:translateY(-50%);z-index:30;border:0;background:transparent;color:var(--pink);font-size:36px;width:54px;height:54px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.carousel-arrow.left{left:0}
.carousel-arrow.right{right:0}
.carousel-arrow::before{content:"";width:40px;height:40px;border-radius:6px;background:rgba(0,0,0,0.0)}
.carousel-arrow:hover{filter:drop-shadow(0 6px 10px rgba(0,0,0,0.6))}

/* small responsive tweaks */
@media (max-width:980px){
  .card{min-width:260px}
  .carousel-wrap{height:200px}
}
@media (max-width:640px){
  .title{font-size:26px}
  .carousel-arrow{font-size:28px}
  .carousel{padding:12px}
}

/* Footer */
.site-footer{padding:24px 0;text-align:center;color:var(--muted)}
