/* ============================================================================
   MedCof — FONTE ÚNICA DE DADOS
   Edite APENAS este arquivo para mudar produtos, textos e preços.
   Tudo no site é gerado a partir daqui.

   PREÇOS: deixei como placeholder (price: null). Basta preencher, ex.:
     price: "12x R$ 199"   ou   price: "R$ 2.400"
   Para produtos com Regular/Elite, preencha o price de cada "tier".
   ============================================================================ */

window.SITE = {
  brand: "MedCof Anest",
  tagline: "Quem mais aprova em Anestesiologia no Brasil",
  whatsapp: "", // ex.: "5599999999999" — usado nos CTAs (placeholder)
  email: "contato@medcof.com.br",

  /* --------------------------------------------------------------------------
     PERFIS (navegação por tipo de procura) — ordem = ordem na home/menu
     -------------------------------------------------------------------------- */
  groups: [
    {
      id: "residentes-sba",
      label: "Residentes SBA",
      short: "Residentes SBA",
      icon: "graduation",
      tagline: "Preparação para a prova de acesso — Módulos ME",
      desc: "Trilha completa para residentes vinculados à SBA. Do ME1 ao ME3 e Completão, no seu ritmo.",
      tags: ["ME1 · ME2 · ME3", "Completão", "TSA ME"],
      tracks: ["extensivo", "intensivo"]
    },
    {
      id: "residentes-mec",
      label: "Residentes MEC",
      short: "Residentes MEC",
      icon: "hospital",
      tagline: "Trilha TEA para residentes MEC",
      desc: "Para residentes de programas credenciados MEC que vão prestar o TEA. Extensivo anual, bianual e trianual.",
      tags: ["TEA", "Anual · Bianual · Trianual"],
      tracks: ["extensivo", "intensivo", "segunda-fase"]
    },
    {
      id: "tea",
      label: "TEA",
      short: "TEA",
      icon: "certificate",
      tagline: "Título de Especialista em Anestesiologia",
      desc: "Preparação focada na prova do TEA, nas versões Regular e Elite, com trilha intensiva e segunda fase.",
      tags: ["Regular", "Elite", "Intensivo"],
      tracks: ["extensivo", "intensivo", "segunda-fase"]
    },
    {
      id: "tsa",
      label: "TSA",
      short: "TSA",
      icon: "star",
      tagline: "Título Superior em Anestesiologia",
      desc: "Preparação para o TSA, nas versões Regular e Elite. Extensivo, intensivo de reta final e segunda fase.",
      tags: ["Regular · Elite", "Intensivo", "Segunda Fase"],
      tracks: ["extensivo", "intensivo", "segunda-fase"]
    },
    {
      id: "segunda-fase",
      label: "Segunda Fase",
      short: "Segunda Fase",
      icon: "checklist",
      tagline: "Preparação para a 2ª fase (prova prática/oral)",
      desc: "Cursos dedicados à segunda fase do TSA e do TEA: simulações, casos e treino de argumentação.",
      tags: ["TSA", "TEA"],
      tracks: ["unico"]
    },
    {
      id: "aperfeicoamento",
      label: "Aperfeiçoamento",
      short: "Aperfeiçoamento",
      icon: "sparkles",
      tagline: "Cursos avançados e de subespecialidade",
      desc: "Aprofunde-se em temas específicos com os cursos de aperfeiçoamento MedCof.",
      tags: ["AnestUS", "ECO", "HEMO"],
      tracks: ["unico"]
    }
  ],

  /* --------------------------------------------------------------------------
     PRODUTOS
     group  = id do perfil acima
     track  = "extensivo" | "intensivo" | "unico"
     tiers  = [{name, price, note}] quando houver Regular/Elite; senão use price
     status = "ativo" | "em-breve"
     -------------------------------------------------------------------------- */
  products: [
    /* ===== RESIDENTES SBA — EXTENSIVOS ===== */
    { id:"me-completao-trianual", group:"residentes-sba", track:"extensivo", name:"ME Completão Trianual", tagline:"Do ME1 ao ME3 em um só plano — 3 anos de acesso.", badge:{text:"Melhor custo-benefício",type:"hot"}, featured:true, price:null,
      feats:["Todos os módulos ME1, ME2 e ME3","3 anos de acesso completo","Banco de questões + simulados","Atualizações incluídas"] },
    { id:"me-completao-bianual", group:"residentes-sba", track:"extensivo", name:"ME Completão Bianual", tagline:"Cobertura completa dos módulos ME em 2 anos.", price:null,
      feats:["Módulos ME1, ME2 e ME3","2 anos de acesso","Banco de questões + simulados"] },
    { id:"me-completao-anual", group:"residentes-sba", track:"extensivo", name:"ME Completão Anual", tagline:"Todos os módulos ME em 1 ano de acesso.", price:null,
      feats:["Módulos ME1, ME2 e ME3","1 ano de acesso","Banco de questões + simulados"] },
    { id:"me1-anual", group:"residentes-sba", track:"extensivo", name:"ME1 Anual", tagline:"Foco no primeiro módulo da trilha ME.", price:null,
      feats:["Conteúdo completo do ME1","1 ano de acesso","Questões comentadas"],
      tiers:[ {name:"Regular", price:null, note:"Aulas + material + questões"}, {name:"Elite", price:null, note:"Regular + mentorias e extras", elite:true} ] },
    { id:"me2-anual", group:"residentes-sba", track:"extensivo", name:"ME2 Anual", tagline:"Foco no segundo módulo da trilha ME.", price:null,
      feats:["Conteúdo completo do ME2","1 ano de acesso","Questões comentadas"],
      tiers:[ {name:"Regular", price:null, note:"Aulas + material + questões"}, {name:"Elite", price:null, note:"Regular + mentorias e extras", elite:true} ] },
    { id:"me3-anual", group:"residentes-sba", track:"extensivo", name:"ME3 Anual", tagline:"Foco no terceiro módulo da trilha ME.", price:null,
      feats:["Conteúdo completo do ME3","1 ano de acesso","Questões comentadas"],
      tiers:[ {name:"Regular", price:null, note:"Aulas + material + questões"}, {name:"Elite", price:null, note:"Regular + mentorias e extras", elite:true} ] },
    { id:"tsa-me-anual", group:"residentes-sba", track:"extensivo", name:"TSA ME Anual", tagline:"Trilha TSA dentro do contexto ME — 1 ano.", price:null,
      feats:["Conteúdo TSA orientado ao ME","1 ano de acesso","Simulados específicos"] },
    { id:"tsa-me-bianual", group:"residentes-sba", track:"extensivo", name:"TSA ME Bianual", tagline:"Trilha TSA no contexto ME — 2 anos.", price:null,
      feats:["Conteúdo TSA orientado ao ME","2 anos de acesso","Simulados específicos"] },
    { id:"tsa-me-trianual", group:"residentes-sba", track:"extensivo", name:"TSA ME Trianual", tagline:"Trilha TSA no contexto ME — 3 anos.", price:null,
      feats:["Conteúdo TSA orientado ao ME","3 anos de acesso","Simulados específicos"] },

    /* ===== RESIDENTES SBA — INTENSIVOS ===== */
    { id:"hiit-me", group:"residentes-sba", track:"intensivo", name:"HIIT ME", tagline:"Reta final de alta intensidade para a prova ME.", badge:{text:"Reta final",type:"hot"}, featured:true, price:null,
      feats:["Revisão intensiva dos temas quentes","Simulados cronometrados","Foco em desempenho na prova","Acesso por tempo limitado"] },

    /* ===== RESIDENTES MEC — EXTENSIVOS ===== */
    { id:"tea-trianual", group:"residentes-mec", track:"extensivo", name:"TEA Trianual", tagline:"Preparação TEA distribuída em 3 anos.", badge:{text:"Mais tempo de acesso",type:"primary"}, featured:true, price:null,
      feats:["Trilha TEA completa","3 anos de acesso","Banco de questões + simulados","Atualizações incluídas"] },
    { id:"tea-bianual", group:"residentes-mec", track:"extensivo", name:"TEA Bianual", tagline:"Preparação TEA em 2 anos.", price:null,
      feats:["Trilha TEA completa","2 anos de acesso","Banco de questões + simulados"] },
    { id:"tea-anual", group:"residentes-mec", track:"extensivo", name:"TEA Anual", tagline:"Preparação TEA intensiva em 1 ano.", price:null,
      feats:["Trilha TEA completa","1 ano de acesso","Banco de questões + simulados"] },

    /* ===== RESIDENTES MEC — INTENSIVOS ===== */
    { id:"hiit-tea-mec", group:"residentes-mec", track:"intensivo", name:"HIIT TEA", tagline:"Revisão intensiva de reta final para o TEA.", badge:{text:"Reta final",type:"hot"}, price:null,
      feats:["Revisão intensiva dos temas quentes","Simulados cronometrados","Foco em desempenho na prova"] },

    /* ===== RESIDENTES MEC — SEGUNDA FASE ===== */
    { id:"segunda-fase-tea-mec", group:"residentes-mec", track:"segunda-fase", name:"Segunda Fase TEA", tagline:"Treino dedicado para a 2ª fase do TEA.", price:null,
      feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação"] },

    /* ===== TEA — EXTENSIVOS (Regular / Elite) ===== */
    { id:"tea-extensivo", group:"tea", track:"extensivo", name:"TEA Anual", tagline:"Preparação completa para o TEA, no seu nível.", badge:{text:"Regular e Elite",type:"primary"}, featured:true, price:null,
      feats:["Trilha TEA completa","1 ano de acesso","Banco de questões + simulados"],
      tiers:[ {name:"TEA Regular", price:null, note:"Aulas + material + questões"}, {name:"TEA Elite", price:null, note:"Regular + mentorias, correções e extras", elite:true} ] },

    /* ===== TEA — INTENSIVOS ===== */
    { id:"hiit-tea", group:"tea", track:"intensivo", name:"HIIT TEA", tagline:"Reta final de alta intensidade para o TEA.", badge:{text:"Reta final",type:"hot"}, featured:true, price:null,
      feats:["Revisão intensiva dos temas quentes","Simulados cronometrados","Foco em desempenho na prova"] },

    /* ===== TEA — SEGUNDA FASE ===== */
    { id:"segunda-fase-tea", group:"tea", track:"segunda-fase", name:"Segunda Fase TEA", tagline:"Treino dedicado para a 2ª fase do TEA.", price:null,
      feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação"] },

    /* ===== TSA — EXTENSIVO (Regular / Elite) ===== */
    { id:"tsa-anual", group:"tsa", track:"extensivo", name:"TSA Anual", tagline:"Preparação para o Título Superior em Anestesiologia.", badge:{text:"Regular e Elite",type:"primary"}, featured:true, price:null,
      feats:["Trilha TSA completa","1 ano de acesso","Banco de questões + simulados avançados"],
      tiers:[ {name:"TSA Regular", price:null, note:"Aulas + material + questões"}, {name:"TSA Elite", price:null, note:"Regular + mentorias, correções e extras", elite:true} ] },

    /* ===== TSA — INTENSIVOS ===== */
    { id:"hiit-tsa", group:"tsa", track:"intensivo", name:"HIIT TSA", tagline:"Reta final de alta intensidade para o TSA.", badge:{text:"Reta final",type:"hot"}, featured:true, price:null,
      feats:["Revisão intensiva dos temas quentes","Simulados cronometrados","Foco em desempenho na prova"] },

    /* ===== TSA — SEGUNDA FASE ===== */
    { id:"segunda-fase-tsa", group:"tsa", track:"segunda-fase", name:"Segunda Fase TSA", tagline:"Treino dedicado para a 2ª fase do TSA.", price:null,
      feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação e conduta"] },

    /* ===== SEGUNDA FASE (categoria própria) ===== */
    { id:"segunda-fase-tsa-cat", group:"segunda-fase", track:"unico", name:"Segunda Fase TSA", tagline:"Preparação para a 2ª fase do TSA.", price:null,
      feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação e conduta"] },
    { id:"segunda-fase-tea-cat", group:"segunda-fase", track:"unico", name:"Segunda Fase TEA", tagline:"Preparação para a 2ª fase do TEA.", price:null,
      feats:["Simulações da prova prática/oral","Casos clínicos comentados","Treino de argumentação e conduta"] },

    /* ===== APERFEIÇOAMENTO ===== */
    { id:"anestus", group:"aperfeicoamento", track:"unico", name:"AnestUS", tagline:"Ultrassonografia aplicada à Anestesiologia.", badge:{text:"Disponível",type:"hot"}, status:"ativo", price:null,
      feats:["Do básico ao avançado em USG","Bloqueios guiados por ultrassom","Vídeos práticos e protocolos"] },
    { id:"medcof-eco", group:"aperfeicoamento", track:"unico", name:"MedcofECO", tagline:"Ecocardiografia para o anestesiologista.", badge:{text:"Em breve",type:"soon"}, status:"em-breve", price:null,
      feats:["Ecocardiografia perioperatória","Interpretação e conduta","Lançamento em breve"] },
    { id:"medcof-hemo", group:"aperfeicoamento", track:"unico", name:"MedcofHEMO", tagline:"Hemodinâmica e monitorização avançada.", badge:{text:"Em breve",type:"soon"}, status:"em-breve", price:null,
      feats:["Monitorização hemodinâmica","Manejo do paciente crítico","Lançamento em breve"] }
  ]
};
