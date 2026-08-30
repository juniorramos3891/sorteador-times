# ⚽ Tira Time

PWA para sortear times de futebol de forma equilibrada por **posição** e **nível de estrelas**.

## Como usar

1. Abra `index.html` no navegador (ou acesse o GitHub Pages)
2. Adicione os jogadores com nome, posição (G/D/M/A) e estrelas (1–3)
3. Clique em **Sortear Times**, configure número de times, jogadores por time e cores dos coletes
4. O app balanceia times automaticamente — inclusive os reservas

## Instalar no Android

1. Abra o link do GitHub Pages no **Chrome para Android**
2. Toque no menu (⋮) → **Instalar aplicativo** (ou "Adicionar à tela inicial")
3. Pronto — o app fica instalado como um aplicativo nativo ✓

## GitHub Pages

1. Suba o repositório no GitHub
2. Vá em **Settings → Pages → Branch: main → / (root)**
3. Aguarde ~1 minuto e acesse `https://<usuario>.github.io/<repo>/`

## Estrutura

```
├── index.html      ← App completo (HTML + CSS + JS)
├── manifest.json   ← Configuração PWA
├── sw.js           ← Service Worker (cache offline)
└── icons/          ← Ícones para instalação
```

## Algoritmo de sorteio

- **Fase 1:** Um goleiro por time (maior estrela → time mais fraco)
- **Fase 2:** Jogadores restantes distribuídos pelo mesmo critério (menor soma de estrelas recebe o próximo)
- **Reservas:** Tratadas como um "time" no sorteio — também recebem jogadores pelo critério de equilíbrio
- Resultado: diferença máxima de 0–1 estrela entre os times em cenários típicos
