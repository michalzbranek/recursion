# PLAN.md — recursion

## Kontext

Toto repo je interaktivní app s rekurzivní hierarchickou tabulkou — rozbalování řádků,
mazání, sdílený stav přes Redux Toolkit. **React + Redux zde mají smysl a zůstanou.**

**Problém:** Repo nemá `.gitignore`, takže jsou v gitu commitnuty soubory, které tam
nepatří — generuje je CI nebo jsou OS junk. Tím zbytečně nafukují repozitář.

**CI workflow** (`.github/workflows/deploy.yml`) spouští `npm ci` + `npm run build`
a nasazuje čerstvý `dist/` přes peaceiris — **vše níže je mrtvá zátěž, kterou CI
generuje znovu.**

---

## Co smazat z gitu

| Soubor / složka | Proč tam nepatří |
|----------------|------------------|
| `node_modules/` | generuje `npm ci`; ~desítky MB |
| `dist/` | generuje `npm run build`; CI ho nasadí |
| `.DS_Store` | macOS metadata, junk |
| `tsconfig.app.tsbuildinfo` | TypeScript build cache, generuje `tsc -b` |
| `tsconfig.node.tsbuildinfo` | TypeScript build cache, generuje `tsc -b` |

**Co nechat:** `package.json`, `package-lock.json`, `.nvmrc` (CI je potřebuje),
`src/`, `public/`, `.github/`, `index.html`, konfigurační soubory.

---

## Postup úklidu

### 1. Přidat `.gitignore`

Vytvořit soubor `.gitignore` v kořeni repa:

```
node_modules/
dist/
.DS_Store
*.tsbuildinfo
```

### 2. Odebrat sledované soubory z gitu (bez smazání z disku)

Pouze pokud pracuješ lokálně — spustit v terminálu:

```bash
git rm -r --cached node_modules dist .DS_Store tsconfig.app.tsbuildinfo tsconfig.node.tsbuildinfo
git add .gitignore
git commit -m "chore: přidat .gitignore, odebrat node_modules/dist/.DS_Store z gitu"
git push
```

> **Poznámka:** `git rm --cached` odstraní soubory ze sledování gitu, ale nesmaže je
> z disku. Po commitu a pushu je GitHub smaže ze stromu, ale zůstanou ve starých
> commitech — to je normální a nevadí.

### 3. Ověřit deploy

Po pushu zkontrolovat, že CI workflow proběhne úspěšně:
- GitHub Actions → Deploy → Build & Test → zelené ✓
- Stránka `michalzbranek.github.io/recursion/` funguje stejně jako předtím.

---

## Co se NEMĚNÍ

- React 19 + Redux Toolkit + react-redux — zůstávají beze změny.
- Vite + TypeScript + ESLint — zůstávají.
- `.github/workflows/deploy.yml` — zůstává (dělá npm ci + build + deploy).
- Celý `src/` — žádné refaktorování.

---

## Verifikace po úklidu

- `node_modules/`, `dist/`, `.DS_Store`, `*.tsbuildinfo` nejsou vidět na GitHubu
  (v main větvi).
- `.gitignore` je v kořeni repa.
- CI workflow prošel (zelené Actions).
- Aplikace funguje na `michalzbranek.github.io/recursion/` — tabulka, rozbalování, mazání.
