/* ============================================================================
   MedCof — Motor do site (chrome + render de cards + navegação fluida)
   Funciona abrindo os arquivos direto no navegador (file://) — sem servidor.
   Cada página define window.SITE_ROOT ("" na home, "../" nas subpastas).
   ============================================================================ */
(function () {
  "use strict";
  var S = window.SITE || { groups: [], products: [] };
  var ROOT = window.SITE_ROOT || "";

  /* ---- ícones (SVG, sem emojis — Heroicons style) ---- */
  var I = {
    graduation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/><path d="M22 10v6"/></svg>',
    hospital:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15"/><path d="M2 21h20"/><path d="M12 8v6M9 11h6"/><path d="M9 21v-3h6v3"/></svg>',
    certificate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="5"/><path d="M12 9h.01"/><path d="m8.5 13-1.5 8 5-3 5 3-1.5-8"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>',
    checklist:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11"/><path d="m3 6 1.2 1.2L6.5 5"/><path d="m3 12 1.2 1.2L6.5 11"/><path d="m3 18 1.2 1.2L6.5 17"/></svg>',
    sparkles:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="m6.3 6.3 2.4 2.4M15.3 15.3l2.4 2.4M17.7 6.3l-2.4 2.4M8.7 15.3l-2.4 2.4"/></svg>',
    layers:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
    bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    info:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/></svg>',
    doc:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>',
    cards:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="13" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-2"/></svg>',
    shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>'
  };
  function icon(n){ return I[n] || I.star; }

  /* ---- helpers ---- */
  function el(html){ var d=document.createElement("div"); d.innerHTML=html.trim(); return d.firstChild; }
  function link(path){ return ROOT + path; }
  function groupById(id){ return S.groups.filter(function(g){return g.id===id;})[0]; }
  function productsOf(gid, track){ return S.products.filter(function(p){ return p.group===gid && (!track || p.track===track); }); }
  function productById(id){ return S.products.filter(function(p){ return p.id===id; })[0]; }
  function getParam(name){ try { return new URLSearchParams(window.location.search).get(name); } catch(e){ return null; } }
  function productHref(id){ return link("produto.html") + "?id=" + encodeURIComponent(id); }
  function pageOf(gid, track){ // caminho relativo para a landing de um grupo/track
    if(track==="extensivo") return link(gid+"/extensivos.html");
    if(track==="intensivo") return link(gid+"/intensivos.html");
    if(track==="segunda-fase") return link(gid+"/segunda-fase.html");
    return link(gid+"/index.html");
  }
  function ctaHref(name, tier){
    var q = "?produto=" + encodeURIComponent(name + (tier?(" — "+tier):""));
    return link("matricula.html") + q;
  }

  /* ---- HEADER + FOOTER (injetados) ---- */
  function buildHeader(activeId){
    var navLinks = S.groups.map(function(g){
      var cur = g.id===activeId ? ' aria-current="page"' : '';
      return '<a href="'+pageOf(g.id)+'"'+cur+'>'+g.short+'</a>';
    }).join("");
    var h = ''+
    '<header class="site-header">'+
      '<div class="container">'+
        '<a class="brand" href="'+link("index.html")+'" aria-label="'+S.brand+' — início">'+
          '<span class="brand-mark">M</span><span>MedCof <b>Anest</b></span>'+
        '</a>'+
        '<button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">'+icon("menu")+'</button>'+
        '<nav class="nav" aria-label="Navegação principal">'+
          navLinks+
          '<a class="btn btn-primary nav-cta" href="'+link("matricula.html")+'">Fale conosco</a>'+
        '</nav>'+
      '</div>'+
    '</header>';
    return el(h);
  }

  function buildFooter(){
    var colGroups = S.groups.map(function(g){ return '<a href="'+pageOf(g.id)+'">'+g.label+'</a>'; }).join("");
    var h = ''+
    '<footer class="site-footer"><div class="container">'+
      '<div class="footer-grid">'+
        '<div class="footer-brand">'+
          '<a class="brand" href="'+link("index.html")+'"><span class="brand-mark">M</span><span>MedCof <b>Anest</b></span></a>'+
          '<p>'+S.tagline+'. Preparação para as provas de Anestesiologia (ME, TEA e TSA) e cursos de aperfeiçoamento.</p>'+
        '</div>'+
        '<div class="footer-col"><h4>Trilhas</h4>'+colGroups+'</div>'+
        '<div class="footer-col"><h4>Institucional</h4>'+
          '<a href="'+link("index.html")+'">Início</a>'+
          '<a href="'+link("matricula.html")+'">Fale conosco</a>'+
          '<a href="#">Sobre a MedCof</a>'+
          '<a href="#">Perguntas frequentes</a></div>'+
        '<div class="footer-col"><h4>Contato</h4>'+
          '<a href="mailto:'+S.email+'">'+S.email+'</a>'+
          '<a href="#">WhatsApp</a>'+
          '<a href="#">Instagram</a></div>'+
      '</div>'+
      '<div class="footer-bottom"><span>© '+yearPlaceholder()+' '+S.brand+'. Todos os direitos reservados.</span>'+
      '<span>Protótipo para desenvolvimento — textos e preços são placeholders.</span></div>'+
    '</div></footer>';
    return el(h);
  }
  function yearPlaceholder(){ var m=document.documentElement.getAttribute("data-year"); return m||"2025"; }

  function renderBackground(){
    if(document.querySelector(".bg-fx")) return;
    var fx = el('<div class="bg-fx" aria-hidden="true"><span class="orb orb-1"></span><span class="orb orb-2"></span><span class="orb orb-3"></span></div>');
    var grain = el('<div class="bg-grain" aria-hidden="true"></div>');
    document.body.insertBefore(grain, document.body.firstChild);
    document.body.insertBefore(fx, document.body.firstChild);
  }

  function renderChrome(activeId){
    renderBackground();
    var mount = document.getElementById("header");
    if(mount) mount.replaceWith(buildHeader(activeId));
    else document.body.insertBefore(buildHeader(activeId), document.body.firstChild);
    var f = document.getElementById("footer");
    if(f) f.replaceWith(buildFooter());
    else document.body.appendChild(buildFooter());
    initMenu();
  }

  function initMenu(){
    var btn = document.querySelector(".menu-toggle");
    var nav = document.querySelector(".nav");
    if(!btn||!nav) return;
    btn.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open?"true":"false");
      btn.innerHTML = open ? icon("close") : icon("menu");
    });
    nav.addEventListener("click", function(e){ if(e.target.tagName==="A"){ nav.classList.remove("open"); btn.setAttribute("aria-expanded","false"); btn.innerHTML=icon("menu"); }});
  }

  /* ---- RENDER: cards de perfil (home) ---- */
  function renderGroups(sel){
    var box = document.querySelector(sel); if(!box) return;
    box.setAttribute("data-stagger","");
    box.innerHTML = S.groups.map(function(g){
      var tags = (g.tags||[]).map(function(t){return '<span class="tag">'+t+'</span>';}).join("");
      return ''+
      '<article class="profile-card">'+
        '<div class="card-ic">'+icon(g.icon)+'</div>'+
        '<h3>'+g.label+'</h3>'+
        '<p>'+g.desc+'</p>'+
        '<div class="card-tags">'+tags+'</div>'+
        '<a class="card-link stretched-link" href="'+pageOf(g.id)+'">Ver trilha '+icon("arrow")+'</a>'+
      '</article>';
    }).join("");
  }

  /* ---- RENDER: hub de um grupo (Extensivo x Intensivo em páginas separadas) ---- */
  function renderHub(gid){
    var box = document.querySelector("#hub"); if(!box) return;
    var cfg = {
      extensivo: { icon:"layers", pill:"Extensivo", cls:"ext", title:"Cursos Extensivos", desc:"Preparação completa e aprofundada, distribuída ao longo do ano (ou de vários anos). Ideal para construir base sólida com tempo.",
        feats:["Conteúdo completo e progressivo","Maior tempo de acesso","Banco de questões + simulados"] },
      intensivo: { icon:"bolt", pill:"Intensivo", cls:"int", title:"Cursos Intensivos", desc:"Revisão de alta intensidade para a reta final. Foco em desempenho, simulados e temas mais cobrados.",
        feats:["Revisão focada na reta final","Simulados cronometrados","Alto rendimento em pouco tempo"] },
      "segunda-fase": { icon:"checklist", pill:"Segunda Fase", cls:"sf", title:"Segunda Fase", cta:"Quero me preparar para segunda fase",
        desc:"Preparação dedicada à 2ª fase (prova prática/oral): simulações realistas, casos clínicos e treino de argumentação e conduta.",
        feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação"] }
    };
    var g = groupById(gid);
    box.setAttribute("data-stagger","");
    box.innerHTML = (g.tracks||[]).filter(function(t){return t!=="unico";}).map(function(t){
      var c = cfg[t]; if(!c) return "";
      var count = productsOf(gid,t).length;
      var feats = c.feats.map(function(f){return '<li>'+icon("check")+'<span>'+f+'</span></li>';}).join("");
      var cta = c.cta ? c.cta : (count>0 ? ("Ver "+count+" curso"+(count>1?"s":"")) : "Em breve");
      return ''+
      '<article class="path-card">'+
        '<div class="card-ic">'+icon(c.icon)+'</div>'+
        '<span class="track-pill '+c.cls+'">'+c.pill+'</span>'+
        '<h3>'+c.title+'</h3>'+
        '<p style="color:var(--color-muted-fg);margin-top:8px">'+c.desc+'</p>'+
        '<ul class="feat">'+feats+'</ul>'+
        '<div style="margin-top:24px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">'+
          '<a class="btn btn-secondary stretched-link" href="'+pageOf(gid,t)+'">'+cta+' '+icon("arrow")+'</a>'+
        '</div>'+
      '</article>';
    }).join("");
  }

  /* ---- RENDER: cards de produto ---- */
  function priceHTML(price, compact){
    if(price){ return compact ? '<span class="price-value">'+price+'</span>'
      : '<div class="price-row"><span class="price-from">a partir de</span><span class="price-value">'+price+'</span></div>'; }
    return '<span class="price-placeholder" title="Preencha em assets/js/data.js">definir preço</span>';
  }
  function badgeHTML(b){
    if(!b) return "";
    var cls = {hot:"badge-hot",primary:"badge-primary",soon:"badge-soon",elite:"badge-elite"}[b.type]||"badge-primary";
    return '<span class="badge '+cls+'">'+b.text+'</span>';
  }
  function productCard(p){
    var soon = p.status==="em-breve";
    var feats = (p.feats||[]).map(function(f){return '<li>'+icon("check")+'<span>'+f+'</span></li>';}).join("");
    var body, foot="";
    if(p.tiers){
      // Elite sempre primeiro; Regular vem depois (navegável pela setinha)
      var ordered = p.tiers.slice().sort(function(a,b){ return (b.elite?1:0)-(a.elite?1:0); });
      var slides = ordered.map(function(t){
        return ''+
        '<div class="tier'+(t.elite?" elite":"")+'">'+
          '<span class="tier-name">'+t.name+(t.elite?badgeHTML({text:"Elite",type:"elite"}):"")+'</span>'+
          '<div class="tier-price">'+priceHTML(t.price,true)+'</div>'+
          '<small class="tier-note">'+(t.note||"")+'</small>'+
          '<a class="btn btn-primary" href="'+productHref(p.id)+'">Conhecer o curso</a>'+
        '</div>';
      }).join("");
      var tiersHTML;
      if(ordered.length>1){
        var dots = ordered.map(function(t,i){ return '<button class="tier-dot'+(i===0?" active":"")+'" data-go="'+i+'" aria-label="Ver '+t.name+'"></button>'; }).join("");
        tiersHTML = ''+
        '<div class="tier-carousel" data-index="0">'+
          '<div class="tier-viewport"><div class="tier-track">'+slides+'</div></div>'+
          '<div class="tier-controls">'+
            '<button class="tier-nav prev" aria-label="Opção anterior" disabled>'+icon("arrow")+'</button>'+
            '<div class="tier-dots">'+dots+'</div>'+
            '<button class="tier-nav next" aria-label="Próxima opção">'+icon("arrow")+'</button>'+
          '</div>'+
        '</div>';
      } else {
        tiersHTML = '<div class="tiers">'+slides+'</div>';
      }
      body = '<ul class="pc-feats">'+feats+'</ul>'+tiersHTML;
    } else {
      body = '<ul class="pc-feats">'+feats+'</ul><div class="pc-price">'+priceHTML(p.price)+'</div>';
      foot = '<div class="pc-foot">'+ (soon
        ? '<a class="btn btn-ghost btn-block stretched-link" href="'+productHref(p.id)+'">'+icon("clock")+'Ver detalhes</a>'
        : '<a class="btn btn-primary btn-block stretched-link" href="'+productHref(p.id)+'">Conhecer o curso '+icon("arrow")+'</a>') +'</div>';
    }
    return ''+
    '<article class="product-card'+(p.featured?" featured":"")+(soon?" coming":"")+'">'+
      '<div class="pc-head"><div class="pc-badges">'+badgeHTML(p.badge)+'</div><h3>'+p.name+'</h3><p class="pc-tagline">'+p.tagline+'</p></div>'+
      '<div class="pc-body">'+body+'</div>'+ foot +
    '</article>';
  }
  function fillProducts(box, list){
    if(!box) return 0;
    if(!list.length){
      box.innerHTML = '<div class="empty-state">'+icon("clock")+
        '<p><b>Em breve.</b> Estamos preparando os cursos desta trilha. '+
        'Enquanto isso, <a href="'+link("matricula.html")+'">fale com a equipe MedCof</a> para saber das novidades.</p></div>';
      return 0;
    }
    box.innerHTML = list.map(productCard).join("");
    return list.length;
  }
  function renderProducts(gid, track, sel){
    var box = document.querySelector(sel||"#products"); if(!box) return;
    return fillProducts(box, productsOf(gid, track));
  }

  /* ---- RENDER: seleção do ano de residência (R1/R2/R3) antes dos produtos ----
     Regras (Residentes SBA · Extensivos):
       - Pergunta R1/R2/R3. ME1=R1, ME2=R2, ME3=R3.
       - Ordem dos cards: sempre Completão e TSA ANTES do módulo ME (Regular/Elite).
       - Durações por ano (primeira = destaque; setinha vê as demais):
           R1 → 3 anos, depois 2 e 1    R2 → 2 anos, depois 1    R3 → 1 ano
  */
  var DUR = {
    trianual: { label:"Trianual", tag:"3 anos de acesso" },
    bianual:  { label:"Bianual",  tag:"2 anos de acesso" },
    anual:    { label:"Anual",    tag:"1 ano de acesso" }
  };
  var FAMILY = {
    completao: { title:"ME Completão", tagline:"Do ME1 ao ME3 em um só plano, no ritmo da sua residência." },
    tsa:       { title:"TSA ME",       tagline:"Trilha TSA dentro do contexto ME." },
    tea:       { title:"TEA",          tagline:"Preparação completa para o TEA, no ritmo da sua residência." }
  };
  var YEAR_META = {
    r1: { label:"R1", tag:"1º ano de residência", icon:"graduation" },
    r2: { label:"R2", tag:"2º ano de residência", icon:"hospital" },
    r3: { label:"R3", tag:"3º ano de residência", icon:"star" }
  };

  // Card de uma família (Completão / TSA) com carrossel de durações (setinha).
  function durationGroupCard(fam, list){
    if(!list.length) return "";
    var f = FAMILY[fam] || { title:fam, tagline:"" };
    var slides = list.map(function(p){
      var d = DUR[p.duration] || { label:p.duration, tag:"" };
      var feats = (p.feats||[]).map(function(x){ return '<li>'+icon("check")+'<span>'+x+'</span></li>'; }).join("");
      return ''+
      '<div class="tier dur-slide">'+
        '<div class="dur-head"><span class="dur-name">'+d.label+'</span>'+badgeHTML({text:d.tag,type:"primary"})+'</div>'+
        '<ul class="pc-feats">'+feats+'</ul>'+
        '<div class="dur-foot"><div class="dur-price">'+priceHTML(p.price)+'</div>'+
          '<a class="btn btn-primary" href="'+productHref(p.id)+'">Conhecer o curso '+icon("arrow")+'</a></div>'+
      '</div>';
    }).join("");

    var carousel;
    if(list.length>1){
      var dots = list.map(function(p,i){ var d=DUR[p.duration]||{label:p.duration};
        return '<button class="tier-dot'+(i===0?" active":"")+'" data-go="'+i+'" aria-label="Ver '+d.label+'"></button>'; }).join("");
      carousel = ''+
      '<div class="tier-carousel dur-carousel" data-index="0">'+
        '<div class="tier-viewport"><div class="tier-track">'+slides+'</div></div>'+
        '<div class="tier-controls">'+
          '<button class="tier-nav prev" aria-label="Duração anterior" disabled>'+icon("arrow")+'</button>'+
          '<div class="tier-dots">'+dots+'</div>'+
          '<button class="tier-nav next" aria-label="Ver outras durações">'+icon("arrow")+'</button>'+
        '</div>'+
      '</div>';
    } else {
      carousel = '<div class="dur-single">'+slides+'</div>';
    }

    return ''+
    '<article class="product-card featured">'+
      '<div class="pc-head"><div class="pc-badges">'+badgeHTML(list[0].badge)+'</div>'+
        '<h3>'+f.title+'</h3><p class="pc-tagline">'+f.tagline+'</p></div>'+
      '<div class="pc-body">'+carousel+'</div>'+
    '</article>';
  }

  // Seleciona os produtos de uma família na ordem de durações do ano (melhor primeiro).
  function famByDurOrder(all, family, durOrder){
    var list = all.filter(function(p){ return p.family===family; });
    return durOrder.map(function(d){ return list.filter(function(p){ return p.duration===d; })[0]; }).filter(Boolean);
  }

  /* Fluxos por trilha: cada ano tem descrição, resumo e um build() que devolve os cards.
     - Residentes SBA: Completão + TSA (com setinha de duração) + módulo ME (Regular/Elite).
     - Residentes MEC: TEA com setinha de duração (melhor primeiro; setinha vê as demais). */
  var YEAR_FLOWS = {
    "residentes-sba": {
      ask:  "Em qual ano da residência você está?",
      help: "Escolha o seu ano para ver os cursos indicados para o seu momento.",
      order: ["r1","r2","r3"],
      years: {
        r1: { desc:"Início da trilha ME. Recomendamos o maior tempo de acesso para acompanhar toda a residência.",
              summary:"Completão · TSA · ME1", durOrder:["trianual","bianual","anual"], module:"r1" },
        r2: { desc:"Continuidade da preparação, com foco no módulo ME2 e planos de 2 ou 1 ano.",
              summary:"Completão · TSA · ME2", durOrder:["bianual","anual"], module:"r2" },
        r3: { desc:"Reta final da residência: foco no ME3 e no TSA, com plano anual.",
              summary:"Completão · TSA · ME3", durOrder:["anual"], module:"r3" }
      },
      build: function(all, y){
        var out = "";
        out += durationGroupCard("completao", famByDurOrder(all, "completao", y.durOrder));
        out += durationGroupCard("tsa", famByDurOrder(all, "tsa", y.durOrder));
        var mod = all.filter(function(p){ return p.family==="modulo" && p.year===y.module; })[0];
        if(mod) out += productCard(mod);
        return out;
      }
    },
    "residentes-mec": {
      ask:  "Em qual ano da residência você está?",
      help: "Escolha o seu ano para ver os planos TEA indicados, do maior ao menor tempo de acesso.",
      order: ["r1","r2","r3"],
      years: {
        r1: { desc:"Início da residência: aproveite o maior tempo de acesso, com preparação distribuída em 3 anos.",
              summary:"TEA — Trianual, Bianual ou Anual", durOrder:["trianual","bianual","anual"] },
        r2: { desc:"Metade da residência: planos de 2 ou 1 ano acompanham você até a prova.",
              summary:"TEA — Bianual ou Anual", durOrder:["bianual","anual"] },
        r3: { desc:"Reta final: preparação TEA concentrada em 1 ano.",
              summary:"TEA — Anual", durOrder:["anual"] }
      },
      build: function(all, y){ return durationGroupCard("tea", famByDurOrder(all, "tea", y.durOrder)); }
    }
  };

  function buildYear(flow, all, id){
    var y = flow.years[id]; if(!y) return "";
    return flow.build(all, y);
  }

  function yearParam(){ return getParam("ano"); }

  function renderProductsByYear(gid, track, sel){
    var box = document.querySelector(sel||"#products"); if(!box) return;
    var flow = YEAR_FLOWS[gid];
    var all = productsOf(gid, track);
    if(!flow){ return fillProducts(box, all); }

    var ids = flow.order.filter(function(id){ return buildYear(flow, all, id).length; });
    if(!ids.length){ return fillProducts(box, all); }

    // Voltou da tela de carregamento com ?ano=rX -> mostra direto os cursos do ano.
    var pre = yearParam();
    var chosen = (pre && ids.indexOf(pre)>=0) ? pre : null;
    if(chosen){
      var mc = YEAR_META[chosen];
      box.innerHTML = buildYear(flow, all, chosen);
      var bar = el(''+
        '<div class="access-chooser"><div class="access-selected">'+
          '<span>Mostrando cursos para <b>'+mc.label+' — '+mc.tag+'</b></span>'+
          '<a class="btn btn-outline" href="extensivos.html">Trocar ano</a>'+
        '</div></div>');
      box.parentNode.insertBefore(bar, box);
      return all.length;
    }

    var opts = ids.map(function(id){
      var m = YEAR_META[id], y = flow.years[id];
      return ''+
      '<button type="button" class="access-opt" data-year="'+id+'">'+
        '<span class="card-ic">'+icon(m.icon)+'</span>'+
        '<span class="access-tag">'+m.tag+'</span>'+
        '<span class="access-title">'+m.label+'</span>'+
        '<span class="access-desc">'+y.desc+'</span>'+
        '<span class="access-count">'+y.summary+'</span>'+
        '<span class="access-go">Ver cursos '+icon("arrow")+'</span>'+
      '</button>';
    }).join("");

    var chooser = el(''+
      '<div class="access-chooser">'+
        '<div class="access-ask reveal">'+
          '<span class="eyebrow">Passo 1 de 2</span>'+
          '<h2 class="access-q">'+flow.ask+'</h2>'+
          '<p class="access-help">'+flow.help+'</p>'+
        '</div>'+
        '<div class="access-grid" data-stagger>'+opts+'</div>'+
      '</div>');

    box.parentNode.insertBefore(chooser, box);
    box.hidden = true;

    function goYear(id){
      if(ids.indexOf(id)<0) return;
      var m = YEAR_META[id];
      var target = new URL("extensivos.html?ano="+id, window.location.href).href;
      var loader = new URL(ROOT+"carregando.html", window.location.href).href;
      window.location.href = loader + "?to=" + encodeURIComponent(target) +
        "&label=" + encodeURIComponent(m.label + " · " + m.tag);
    }

    chooser.querySelectorAll(".access-opt").forEach(function(b){
      b.addEventListener("click", function(){ goYear(b.getAttribute("data-year")); });
    });
    return all.length;
  }

  /* ---- RENDER: landing page individual do produto (produto.html?id=...) ---- */
  var TRACK_INFO = {
    extensivo:      { label:"Curso Extensivo", cls:"ext", page:"extensivos.html" },
    intensivo:      { label:"Curso Intensivo", cls:"int", page:"intensivos.html" },
    "segunda-fase": { label:"Segunda Fase",    cls:"sf",  page:"segunda-fase.html" },
    unico:          { label:"Curso",           cls:"ext", page:"index.html" }
  };

  function productFaq(p){
    var acesso = "";
    (p.feats||[]).forEach(function(f){ if(!acesso && /ano|acesso/i.test(f)) acesso = f; });
    return [
      { q:"Como recebo o acesso?", a:"Assim que a matrícula é confirmada, o acesso à plataforma é liberado e você já pode começar a estudar, no computador ou no celular." },
      { q:"Por quanto tempo o curso fica disponível?", a: acesso
          ? ("Este curso oferece "+acesso.toLowerCase()+". Você acompanha o conteúdo no seu ritmo dentro desse período.")
          : "O período de acesso é informado na descrição do curso e liberado conforme o cronograma." },
      { q:"Como tiro dúvidas durante o curso?", a:"Você conta com o CofBot (IA de estudo) para localizar questões e trechos das aulas, além das revisões inteligentes e do suporte da equipe MedCof." },
      { q:"Ainda tenho dúvidas. Com quem falo?", a:"Fale com a nossa equipe pela página de contato — ajudamos você a escolher o melhor plano para o seu momento." }
    ];
  }

  function renderProductPage(sel){
    var mount = document.querySelector(sel||"#produto"); if(!mount) return;
    var id = getParam("id");
    var p = id && productById(id);
    if(!p){
      renderChrome(null);
      mount.innerHTML = '<section class="section"><div class="container"><div class="empty-state">'+icon("info")+
        '<p><b>Curso não encontrado.</b> O link pode estar incorreto ou desatualizado. '+
        '<a href="'+link("index.html")+'">Voltar para a página inicial</a> e escolher sua trilha.</p></div></div></section>';
      return;
    }
    var g = groupById(p.group) || { label:"MedCof", id:null };
    var t = TRACK_INFO[p.track] || TRACK_INFO.unico;
    var soon = p.status==="em-breve";
    var listPage = g.id ? link(g.id+"/"+t.page) : link("index.html");

    renderChrome(g.id);
    document.title = p.name + " — " + g.label + " | MedCof";

    var crumbs = ''+
      '<a href="'+link("index.html")+'">Início</a><span class="sep">'+icon("arrow")+'</span>'+
      '<a href="'+pageOf(g.id)+'">'+g.label+'</a><span class="sep">'+icon("arrow")+'</span>'+
      '<a href="'+listPage+'">'+t.label+'</a><span class="sep">'+icon("arrow")+'</span>'+
      '<b>'+p.name+'</b>';

    var feats = (p.feats||[]).map(function(f){ return '<li>'+icon("check")+'<span>'+f+'</span></li>'; }).join("");

    // Planos / preço
    var plansHTML;
    if(p.tiers){
      var ordered = p.tiers.slice().sort(function(a,b){ return (b.elite?1:0)-(a.elite?1:0); });
      plansHTML = '<div class="plans-grid">'+ ordered.map(function(tr){
        return ''+
        '<div class="plan-opt'+(tr.elite?" elite":"")+'">'+
          '<span class="plan-opt-name">'+tr.name+(tr.elite?badgeHTML({text:"Elite",type:"elite"}):"")+'</span>'+
          '<div class="plan-opt-price">'+priceHTML(tr.price,true)+'</div>'+
          '<small class="plan-opt-note">'+(tr.note||"")+'</small>'+
          '<a class="btn btn-primary btn-block" href="'+ctaHref(p.name,tr.name)+'">Matricular · '+tr.name+'</a>'+
        '</div>';
      }).join("") + '</div>';
    } else {
      plansHTML = '<div class="plan-single">'+
        '<div class="plan-single-price">'+priceHTML(p.price)+'</div>'+
        (soon
          ? '<a class="btn btn-ghost btn-lg" href="'+ctaHref(p.name,"Aviso de lançamento")+'">'+icon("clock")+' Avise-me quando lançar</a>'
          : '<a class="btn btn-primary btn-lg" href="'+ctaHref(p.name)+'">Quero me matricular '+icon("arrow")+'</a>')+
      '</div>';
    }

    // Outras durações da mesma família
    var siblingsHTML = "";
    if(p.family && p.duration){
      var sibs = S.products.filter(function(x){ return x.group===p.group && x.family===p.family && x.id!==p.id; });
      if(sibs.length){
        siblingsHTML = '<div class="siblings"><span class="siblings-label">Outras durações:</span>'+
          sibs.map(function(x){ return '<a class="chip-link" href="'+productHref(x.id)+'">'+x.name+'</a>'; }).join("")+'</div>';
      }
    }

    var faqHTML = productFaq(p).map(function(it){
      return '<details class="faq-item"><summary>'+it.q+'<span class="faq-plus">'+icon("arrow")+'</span></summary><div class="faq-a">'+it.a+'</div></details>';
    }).join("");

    var mainCta = soon ? ctaHref(p.name,"Aviso de lançamento") : ctaHref(p.name);
    var mainLabel = soon ? "Avise-me quando lançar" : "Quero me matricular";

    mount.innerHTML = ''+
    '<header class="page-head product-hero">'+
      '<div class="container">'+
        '<nav class="breadcrumb">'+crumbs+'</nav>'+
        '<div class="product-hero-grid">'+
          '<div class="reveal">'+
            '<span class="track-pill '+t.cls+'">'+t.label+'</span>'+
            (p.badge?'<div class="pc-badges" style="margin:10px 0">'+badgeHTML(p.badge)+'</div>':'')+
            '<h1>'+p.name+'</h1>'+
            '<p class="lead">'+p.tagline+'</p>'+
            '<div class="hero-actions">'+
              '<a class="btn btn-primary btn-lg" href="'+mainCta+'">'+mainLabel+' '+icon("arrow")+'</a>'+
              '<a class="btn btn-outline btn-lg" href="'+listPage+'">Ver outras opções</a>'+
            '</div>'+
            siblingsHTML+
          '</div>'+
          '<aside class="product-hero-card reveal">'+
            '<h3>O que está incluído</h3>'+
            '<ul class="pc-feats">'+feats+'</ul>'+
          '</aside>'+
        '</div>'+
      '</div>'+
    '</header>'+
    '<section class="section-tight" id="planos"><div class="container">'+
      '<div class="center reveal"><span class="eyebrow">Matrícula</span>'+
      '<h2 class="section-title">'+(p.tiers?"Escolha o seu plano":"Garanta a sua vaga")+'</h2>'+
      '<p class="section-sub">'+(p.tiers?"Compare as versões e comece agora mesmo.":"Matricule-se e comece a estudar hoje.")+'</p></div>'+
      '<div class="plans-wrap">'+plansHTML+'</div>'+
    '</div></section>'+
    '<section class="section-tight"><div class="container">'+
      '<div class="center reveal"><span class="eyebrow">A plataforma</span>'+
      '<h2 class="section-title">A metodologia MedCof</h2>'+
      '<p class="section-sub">Tecnologia a favor do seu estudo: IA, revisões inteligentes, questões comentadas e flashcards.</p></div>'+
      '<div class="feature-grid" id="features" style="margin-top:40px"></div>'+
    '</div></section>'+
    '<section class="section-tight"><div class="container">'+
      '<div class="center reveal"><span class="eyebrow">Quem ensina</span>'+
      '<h2 class="section-title">Coordenadores e <span class="accent">professores</span></h2></div>'+
      '<div class="prof-carousel" id="professors" style="margin-top:34px"></div>'+
    '</div></section>'+
    '<section class="section-tight"><div class="container">'+
      '<div class="center reveal"><span class="eyebrow">Dúvidas</span>'+
      '<h2 class="section-title">Perguntas frequentes</h2></div>'+
      '<div class="faq reveal">'+faqHTML+'</div>'+
    '</div></section>'+
    '<section class="section"><div class="container"><div class="cta-band reveal">'+
      '<h2>Pronto para dar o próximo passo?</h2>'+
      '<p>'+p.tagline+'</p>'+
      '<a class="btn btn-primary btn-lg" href="'+mainCta+'">'+mainLabel+'</a>'+
    '</div></div></section>';

    renderFeatures("#features");
    renderProfessors("#professors");
    fillIcons();
    initReveal();
  }

  /* ---- RENDER: Funcionalidades da plataforma (card ativo alterna) ---- */
  function renderFeatures(sel){
    var box = document.querySelector(sel||"#features"); if(!box || !S.features) return;
    box.innerHTML = S.features.map(function(f){
      return ''+
      '<article class="feature-card" data-feat="'+f.id+'" tabindex="0" aria-current="false">'+
        '<div class="feature-visual"><span class="feature-ic">'+icon(f.icon)+'</span></div>'+
        '<div class="feature-body"><h3>'+f.title+'</h3><p>'+f.desc+'</p></div>'+
      '</article>';
    }).join("");
    initFeatureAutoplay(box);
  }
  function initFeatureAutoplay(box){
    var cards = Array.prototype.slice.call(box.querySelectorAll(".feature-card"));
    if(!cards.length) return;
    var idx = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function setActive(i){ idx=i; cards.forEach(function(c,j){ var on=j===i; c.classList.toggle("active", on); c.setAttribute("aria-current", on?"true":"false"); }); }
    function next(){ setActive((idx+1)%cards.length); }
    function play(){ if(reduce) return; stop(); timer=setInterval(next, 5000); }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }
    setActive(0);
    cards.forEach(function(c,i){
      c.addEventListener("mouseenter", function(){ setActive(i); stop(); });
      c.addEventListener("focusin", function(){ setActive(i); stop(); });
      c.addEventListener("mouseleave", play);
      c.addEventListener("focusout", play);
    });
    play();
  }

  /* ---- RENDER: Funcionalidades em seções próprias (home) ---- */
  function renderFeatureSections(sel){
    var box = document.querySelector(sel||"#feature-sections"); if(!box || !S.features) return;
    box.innerHTML = S.features.map(function(f, i){
      var pts = (f.points||[]).map(function(p){ return '<li>'+icon("check")+'<span>'+p+'</span></li>'; }).join("");
      var demoBtn = f.demo ? '<div class="feat-sec-cta"><button type="button" class="btn btn-secondary" data-demo-open>'+f.demo.label+' '+icon("arrow")+'</button></div>' : '';
      var copy = ''+
        '<div class="feat-sec-copy reveal">'+
          '<span class="eyebrow">'+icon(f.icon)+' '+(f.eyebrow||"Funcionalidade")+'</span>'+
          '<h2 class="section-title">'+f.title+'</h2>'+
          '<p class="feat-sec-desc">'+f.desc+'</p>'+
          (pts?'<ul class="feat-sec-list">'+pts+'</ul>':'')+
          demoBtn+
        '</div>';
      var visual = ''+
        '<div class="feat-sec-visual reveal">'+
          '<div class="feat-mock">'+
            '<div class="feat-mock-bar"><span></span><span></span><span></span></div>'+
            '<div class="feat-mock-body">'+
              '<div class="feat-mock-ic">'+icon(f.icon)+'</div>'+
              '<div class="feat-mock-lines"><i style="width:82%"></i><i style="width:60%"></i><i style="width:71%"></i><i style="width:48%"></i></div>'+
            '</div>'+
          '</div>'+
        '</div>';
      return '<section class="section feat-sec'+(i%2?" reverse":"")+'"><div class="container feat-sec-grid">'+copy+visual+'</div></section>';
    }).join("");

    // Botão "Veja como é uma questão comentada" -> modal com exemplo
    var demoFeat = S.features.filter(function(f){ return f.demo; })[0];
    if(demoFeat){
      var openDemo = buildQuestaoModal(demoFeat.demo);
      box.querySelectorAll("[data-demo-open]").forEach(function(b){ b.addEventListener("click", openDemo); });
    }
  }

  /* ---- Modal: exemplo de questão comentada ---- */
  function buildQuestaoModal(demo){
    var existing = document.getElementById("demo-modal");
    if(existing) return existing.__open;

    var alts = (demo.alternativas||[]).map(function(a,i){
      var letra = String.fromCharCode(65+i);
      return '<li class="q-alt'+(a.correct?" correct":"")+'">'+
        '<span class="q-letra">'+letra+'</span>'+
        '<span class="q-alt-text">'+a.t+(a.correct?' '+icon("check"):'')+'</span>'+
      '</li>';
    }).join("");
    var coment = (demo.comentario||[]).map(function(p){ return '<p>'+p+'</p>'; }).join("");

    var modal = el(''+
      '<div class="modal-overlay" id="demo-modal" hidden>'+
        '<div class="modal" role="dialog" aria-modal="true" aria-label="Exemplo de questão comentada">'+
          '<button type="button" class="modal-close" aria-label="Fechar">'+icon("close")+'</button>'+
          '<div class="modal-scroll">'+
            '<span class="track-pill ext">Exemplo · Questão comentada</span>'+
            '<p class="q-enunciado">'+demo.enunciado+'</p>'+
            '<ul class="q-alts">'+alts+'</ul>'+
            '<div class="q-answer">'+icon("check")+' Resposta correta: <b>'+demo.correta+'</b></div>'+
            '<div class="q-comment"><h4>Comentário do especialista</h4>'+coment+
              '<p class="q-video-note">'+icon("chat")+' Na plataforma, cada questão traz também o comentário em vídeo.</p>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>');
    document.body.appendChild(modal);

    function open(){ modal.hidden = false; document.body.style.overflow = "hidden"; var c = modal.querySelector(".modal-close"); if(c) c.focus(); }
    function close(){ modal.hidden = true; document.body.style.overflow = ""; }
    modal.addEventListener("click", function(e){ if(e.target===modal || (e.target.closest && e.target.closest(".modal-close"))) close(); });
    document.addEventListener("keydown", function(e){ if(e.key==="Escape" && !modal.hidden) close(); });
    modal.__open = open;
    return open;
  }

  /* ---- RENDER: Coordenadores e Professores (carrossel) ---- */
  function renderProfessors(sel){
    var box = document.querySelector(sel||"#professors"); if(!box || !S.professors) return;
    var cards = S.professors.map(function(p){
      var creds = (p.credentials||[]).map(function(c){ return '<li>'+c+'</li>'; }).join("");
      var photo = p.photo ? '<img src="'+p.photo.src+'" alt="'+(p.photo.alt||p.name)+'">' : '<span class="prof-initials">'+(p.initials||"")+'</span>';
      return ''+
      '<article class="prof-card">'+
        '<div class="prof-photo">'+photo+'</div>'+
        '<h3 class="prof-name">'+p.name+'</h3>'+
        '<p class="prof-role">'+p.role+'</p>'+
        '<span class="prof-divider"></span>'+
        '<ul class="prof-creds">'+creds+'</ul>'+
      '</article>';
    }).join("");
    box.innerHTML = ''+
      '<button class="prof-nav prev" aria-label="Professor anterior">'+icon("arrow")+'</button>'+
      '<div class="prof-track" role="region" aria-roledescription="carrossel" aria-label="Coordenadores e professores">'+cards+'</div>'+
      '<button class="prof-nav next" aria-label="Próximo professor">'+icon("arrow")+'</button>';
    initProfCarousel(box);
  }
  function initProfCarousel(box){
    var track = box.querySelector(".prof-track"); if(!track) return;
    var prev = box.querySelector(".prof-nav.prev"), next = box.querySelector(".prof-nav.next");
    function step(){ var c=track.querySelector(".prof-card"); return c ? Math.round(c.getBoundingClientRect().width)+22 : 320; }
    function update(){
      var max = track.scrollWidth - track.clientWidth - 2;
      var noScroll = max <= 2;
      [prev,next].forEach(function(b){ if(b) b.style.display = noScroll ? "none" : "grid"; });
      if(prev) prev.disabled = track.scrollLeft <= 2;
      if(next) next.disabled = track.scrollLeft >= max;
    }
    if(prev) prev.addEventListener("click", function(){ track.scrollBy({left:-step(), behavior:"smooth"}); });
    if(next) next.addEventListener("click", function(){ track.scrollBy({left:step(), behavior:"smooth"}); });
    track.addEventListener("scroll", update, {passive:true});
    window.addEventListener("resize", update);
    update();
  }

  /* ---- RENDER: card do Plano Trianual ---- */
  function renderPlano(sel){
    var box = document.querySelector(sel||"#plano"); if(!box || !S.planoTrianual) return;
    var pl = S.planoTrianual;
    var paras = (pl.paragraphs||[]).map(function(t){ return '<p class="plan-para">'+t+'</p>'; }).join("");
    var highs = (pl.highlights||[]).map(function(h){
      return '<div class="plan-highlight"><span class="plan-hl-ic">'+icon(h.icon)+'</span><div><b>'+h.title+'</b><p>'+h.text+'</p></div></div>';
    }).join("");
    box.innerHTML = ''+
      '<div class="plan-card">'+
        '<div class="plan-head"><span class="plan-shield">'+icon("shield")+'</span><h3>'+pl.title+'</h3></div>'+
        '<div class="plan-body">'+paras+highs+'</div>'+
      '</div>';
  }

  /* ---- RENDER: breadcrumb ---- */
  function renderBreadcrumb(items){
    var box = document.querySelector("#breadcrumb"); if(!box) return;
    box.innerHTML = items.map(function(it,i){
      var last = i===items.length-1;
      return (last ? '<b>'+it.label+'</b>' : '<a href="'+it.href+'">'+it.label+'</a><span class="sep">'+icon("arrow")+'</span>');
    }).join("");
  }

  /* ---- animações de entrada ---- */
  function initReveal(){
    var els = document.querySelectorAll(".reveal,[data-stagger]");
    if(!("IntersectionObserver" in window)){ els.forEach(function(e){e.classList.add("in");}); return; }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target);} });
    }, {threshold:.12, rootMargin:"0px 0px -40px 0px"});
    els.forEach(function(e){ io.observe(e); });
    // stagger delays
    document.querySelectorAll("[data-stagger]").forEach(function(box){
      Array.prototype.forEach.call(box.children, function(c,i){ c.style.transitionDelay=(i*60)+"ms"; });
    });
  }

  /* ---- expõe API ---- */
  window.MedCof = {
    icon: icon, link: link, groupById: groupById, productsOf: productsOf, pageOf: pageOf, ctaHref: ctaHref,
    renderChrome: renderChrome, renderGroups: renderGroups, renderHub: renderHub,
    renderProducts: renderProducts, renderProductsByYear: renderProductsByYear, renderProductPage: renderProductPage, productHref: productHref, renderBreadcrumb: renderBreadcrumb,
    renderFeatures: renderFeatures, renderFeatureSections: renderFeatureSections, renderProfessors: renderProfessors, renderPlano: renderPlano
  };

  /* ---- carrossel de tiers (Elite -> Regular pela setinha) ---- */
  function tierGo(car, idx){
    var track = car.querySelector(".tier-track"); if(!track) return;
    var n = track.children.length;
    if(idx<0) idx=0; if(idx>n-1) idx=n-1;
    car.setAttribute("data-index", idx);
    track.style.transform = "translateX(-"+(idx*100)+"%)";
    var prev = car.querySelector(".tier-nav.prev"), next = car.querySelector(".tier-nav.next");
    if(prev) prev.disabled = (idx===0);
    if(next) next.disabled = (idx===n-1);
    car.querySelectorAll(".tier-dot").forEach(function(d,i){ d.classList.toggle("active", i===idx); });
  }
  document.addEventListener("click", function(e){
    var t = e.target; if(!t || !t.closest) return;
    var nav = t.closest(".tier-nav");
    if(nav){ var car=nav.closest(".tier-carousel"); var idx=parseInt(car.getAttribute("data-index")||"0",10); tierGo(car, idx + (nav.classList.contains("next")?1:-1)); return; }
    var dot = t.closest(".tier-dot");
    if(dot){ tierGo(dot.closest(".tier-carousel"), parseInt(dot.getAttribute("data-go"),10)); }
  });

  function fillIcons(){
    document.querySelectorAll("[data-ic]").forEach(function(n){ n.innerHTML = icon(n.getAttribute("data-ic")); });
    document.querySelectorAll("[data-ic-pre]").forEach(function(n){ if(!n.querySelector("svg")) n.insertAdjacentHTML("afterbegin", icon(n.getAttribute("data-ic-pre"))); });
  }

  document.addEventListener("DOMContentLoaded", function(){ fillIcons(); initReveal(); });
})();
