# MedCof — Site de vendas (protótipo para desenvolvimento)

Protótipo funcional do site de cursos da **MedCof** (preparação para provas de Anestesiologia: ME, TEA, TSA + aperfeiçoamento).
Feito em **HTML + CSS + JavaScript puro** (sem build, sem dependências) para ser fácil de visualizar e de entregar ao desenvolvedor.

> **Para o Dev:** este é um protótipo de estrutura, navegação e design. Textos e **preços são placeholders**. A ideia é servir de base — você pode publicar como está (estático) ou reconstruir no framework de sua preferência (Next.js, Astro, etc.) reaproveitando o `data.js` e o CSS.

---

## Como rodar / visualizar

**Opção 1 — abrir direto:** dê dois cliques em `index.html`. Funciona, mas o navegador pode bloquear alguns recursos em `file://`.

**Opção 2 — servidor local (recomendado):** a navegação entre páginas fica 100% fluida.

```bash
# Python (já instalado na máquina)
python -m http.server 8123
# depois abra http://localhost:8123
```

```bash
# ou com Node
npx serve .
```

---

## Duas regras de negócio (já implementadas)

1. **Navegação por tipo de procura (perfil do aluno).** A home leva o aluno a escolher o *objetivo* (Residente SBA, Residente MEC, TEA, TSA, Segunda Fase, Aperfeiçoamento). Cada clique **redireciona para outra página** — fluxo guiado, passo a passo.

2. **Extensivos e Intensivos SEMPRE em páginas separadas.** Para os grupos que têm os dois tipos (SBA, MEC, TEA), o aluno passa por uma página-*hub* que oferece dois caminhos: **Cursos Extensivos** e **Cursos Intensivos**. Cada um abre uma **landing própria** — os preços de extensivo e intensivo **nunca aparecem na mesma página**.

Fluxo:

```
Home  →  Perfil (hub)  →  Extensivos  (página com preços)
                       →  Intensivos  (página com preços)   ← páginas separadas
```

---

## Estrutura de arquivos

```
medcof-site/
├── index.html                 Home — navegação por perfil
├── matricula.html             Página de conversão (formulário — PLACEHOLDER)
├── residentes-sba/
│   ├── index.html             Hub: escolher Extensivo ou Intensivo
│   ├── extensivos.html        ME Completão, ME1/2/3, TSA ME
│   └── intensivos.html        HIIT ME
├── residentes-mec/
│   ├── index.html  ·  extensivos.html (TEA anual/bianual/trianual)  ·  intensivos.html (HIIT TEA, 2ª fase TEA)
├── tea/
│   ├── index.html  ·  extensivos.html (TEA Regular/Elite)  ·  intensivos.html (HIIT TEA, 2ª fase TEA)
├── tsa/index.html             Só extensivo (TSA Regular/Elite)
├── segunda-fase/index.html    Segunda Fase TSA e TEA
├── aperfeicoamento/index.html AnestUS, MedcofECO (em breve), MedcofHEMO (em breve)
└── assets/
    ├── css/styles.css         Sistema de design (cores, tipografia, componentes)
    └── js/
        ├── data.js            ⭐ FONTE ÚNICA de produtos, textos e preços
        └── main.js            Motor: monta menu/rodapé, renderiza cards, transições
```

---

## Como editar (sem mexer no código)

### 1. Produtos, textos e PREÇOS → `assets/js/data.js`
É a fonte única de verdade. Todo o site é gerado a partir desse arquivo.

- **Preço:** cada produto tem `price: null` (aparece como *"definir preço"*). Basta preencher:
  ```js
  price: "12x R$ 199"      // ou "R$ 2.400", "A partir de R$ 1.980"...
  ```
- **Produtos com Regular/Elite:** preencha o `price` de cada item em `tiers`.
- **Adicionar/remover curso:** copie um bloco de produto, mude `id`, `name`, `group` e `track`.
  - `group` = qual perfil (`residentes-sba`, `residentes-mec`, `tea`, `tsa`, `segunda-fase`, `aperfeicoamento`)
  - `track` = `extensivo`, `intensivo` ou `unico`

### 2. Cores da marca → topo do `assets/css/styles.css`
Identidade **MedCof Anest**: vermelho de marca `#C1272D` sobre neutros claros (versão mais leve que o site atual, que é preto). Tudo é controlado por variáveis — muda em um lugar, propaga para o site inteiro:
```css
--color-primary: #C1272D;   /* vermelho da marca (detalhes, links, destaques) */
--color-accent:  #C1272D;   /* botões de ação (CTA) */
--color-background: #F4F4F5; /* cinza claro de fundo */
--color-dark:    #18181B;   /* botões secundários escuros */
```
- **Fonte:** títulos em **Mona Sans** (a fonte da marca, carregada via CDN); corpo em fonte de sistema.
- **Tema sempre claro** por pedido. Se quiser um modo escuro on-brand (preto + vermelho, como o site atual), dá para reativar um bloco `@media (prefers-color-scheme: dark)` no CSS.

### 3. Logo
Hoje o cabeçalho/rodapé usam um wordmark em texto: **MedCof** (escuro) + **Anest** (vermelho), com um "M" vermelho. Troque pelo logo oficial em `main.js` (função `buildHeader`/`buildFooter`). Atenção: o `logo-branca-anest.png` é **branco** e some no fundo claro — use uma versão escura/colorida do logo, ou mantenha o wordmark em texto.

---

## O que ainda é PLACEHOLDER (precisa do Dev)

| Item | Onde | O que fazer |
|------|------|-------------|
| **Preços** | `data.js` | Preencher os `price`. |
| **Formulário de matrícula** | `matricula.html` | Conectar o envio ao checkout / CRM / e-mail (hoje só mostra um alerta). |
| **WhatsApp e redes** | `data.js` (`whatsapp`, `email`) e rodapé em `main.js` | Colocar links reais. |
| **Logo** | menu/rodapé em `main.js` (`brand-mark`) | Trocar o "M" por um SVG/imagem da marca. |
| **Páginas "Sobre" e "FAQ"** | links no rodapé | Criar as páginas (hoje apontam para `#`). |
| **Domínio/analytics/SEO** | — | Configurar no deploy. |

---

## Notas técnicas

- **Vanilla, sem build:** HTML/CSS/JS puro. Abre em qualquer navegador moderno.
- **Renderização orientada a dados:** os cards são montados por `main.js` a partir do `data.js` — pouca repetição, fácil manutenção.
- **Navegação fluida:** usa a *View Transitions API* (transição suave entre páginas nos navegadores que suportam) + animações de entrada. Respeita `prefers-reduced-motion`.
- **Fundo animado:** degradê de cinza + "orbs" de luz (vermelho/coral da marca) que se movem lentamente + textura de grão. É um elemento fixo injetado por `main.js` (`renderBackground`), estilizado em `styles.css` (seção *12b*). Some com `prefers-reduced-motion`. Ajuste cor/velocidade nas variáveis `.orb-*` e nos `@keyframes drift*`.
- **Acessibilidade:** foco visível, navegação por teclado, contraste alto, alvos de toque de 44px, ícones em SVG (sem emoji), `aria-current` no menu.
- **Responsivo:** testado em 375px (mobile), 768px, 1024px e desktop. Menu vira hambúrguer no mobile.

---

*Gerado como protótipo de estrutura e design. Sinta-se à vontade para reconstruir na stack de sua preferência — o `data.js` já entrega o modelo de dados pronto.*
