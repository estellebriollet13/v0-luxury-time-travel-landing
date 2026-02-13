# Chronos Voyages - Agence de Voyage Temporel

Webapp interactive pour une agence de voyage temporel fictive de luxe. Projet pédagogique développé dans le cadre du M1 Digital & IA.

## Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/) avec App Router
- **Language** : [TypeScript](https://www.typescriptlang.org/) 5.7
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) 3.4
- **UI Library** : [shadcn/ui](https://ui.shadcn.com/) (composants Radix UI)
- **Animations** : CSS/Tailwind (transitions fluides)
- **Icons** : [Lucide React](https://lucide.dev/)
- **Forms** : React Hook Form + Zod validation
- **Package Manager** : pnpm
- **Hébergement** : [Vercel](https://vercel.com)

## Features

### Landing Page Interactive
- Hero section immersive avec call-to-action
- Navigation fluide avec sections ancrées
- Design responsive (mobile, tablette, desktop)
- Thème sombre par défaut avec CSS variables personnalisées

### Galerie de Destinations Temporelles
- **Paris 1889** - L'Exposition Universelle et la construction de la Tour Eiffel
- **Crétacé Supérieur** - Observation de dinosaures depuis une capsule blindée
- **Florence 1504** - La Renaissance italienne avec Michel-Ange et les Médicis
- Cards interactives avec effets de hover
- Descriptions détaillées et tarifs (en CR - Crédits Temporels)

### Chatbot IA Conversationnel
- Concierge temporel alimenté par **Mistral Small** via l'API Mistral AI
- Réponses intelligentes et contextuelles en temps réel
- Suggestions de questions rapides
- Interface élégante et responsive
- Capacités de conversation sur :
  - Informations sur les destinations
  - Explications du fonctionnement
  - Tarifs et forfaits
  - Protocoles de sécurité

### Section Réservation
- Formulaire de réservation complet
- Validation des champs avec Zod
- Design élégant et accessible

### Section À Propos
- Présentation de l'agence
- Statistiques (12 000+ voyages, 100% de retours sécurisés)
- Philosophie de l'entreprise

### Footer
- Liens de navigation
- Informations de contact
- Réseaux sociaux

## IA Utilisées

### Génération de Code
- **Kimi k2.5** (via OpenCode CLI) - Architecture et développement des composants
- **Claude 3.5 Sonnet** (via OpenCode) - Refactoring et optimisation du code

### Assistant de Développement
- **OpenCode Agent** - Navigation du codebase, modifications et création de fichiers

### Chatbot & IA Conversationnelle
- **Mistral Small** via [API Mistral AI](https://docs.mistral.ai/) - Modèle de langage pour le concierge temporel

### Design & Direction Artistique
- Conception UI/UX manuelle avec guidelines shadcn/ui
- Thème sombre personnalisé avec palette de couleurs HSL

## Instructions d'Installation

### Prérequis
- Node.js 18+ 
- pnpm (ou npm/yarn)

### Installation

```bash
# Cloner le repository
git clone https://github.com/username/chronos-voyages.git
cd chronos-voyages

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
# Créer un fichier .env.local avec :
# MISTRAL_API_KEY=votre_cle_api_mistral

# Lancer le serveur de développement
pnpm dev
```

L'application sera accessible à l'adresse `http://localhost:3000`

### Build Production

```bash
# Créer le build de production
pnpm build

# Lancer le serveur de production
pnpm start
```

### Scripts Disponibles

- `pnpm dev` - Démarrage avec Turbopack (développement rapide)
- `pnpm build` - Build de production
- `pnpm start` - Démarrage du serveur de production
- `pnpm lint` - Vérification ESLint

## Structure du Projet

```
app/                          # Next.js App Router
├── api/                      # API Routes
│   └── chat/
│       └── route.ts          # Endpoint API pour le chatbot Mistral
├── globals.css               # Styles globaux et CSS variables
├── layout.tsx                # Root layout avec providers
└── page.tsx                  # Page d'accueil

components/                   # Composants React
├── ui/                       # Composants shadcn/ui (40+ composants)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── form.tsx
│   ├── dialog.tsx
│   ├── toast.tsx
│   ├── toaster.tsx
│   ├── select.tsx
│   ├── calendar.tsx
│   ├── tooltip.tsx
│   ├── badge.tsx
│   ├── avatar.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   └── ... (autres composants UI)
├── chatbot-widget.tsx        # Widget chatbot flottant
├── hero-section.tsx          # Section hero immersive
├── destinations-section.tsx  # Galerie des destinations temporelles
├── experience-section.tsx    # Présentation des expériences
├── booking-section.tsx       # Formulaire de réservation
├── about-section.tsx         # Section À propos
├── navbar.tsx                # Navigation fixe
├── footer.tsx                # Pied de page
└── theme-provider.tsx        # Provider pour le thème

hooks/                        # Hooks React personnalisés
├── use-mobile.tsx            # Détection mobile (breakpoint 768px)
└── use-toast.ts              # Système de notifications toast

lib/                          # Utilitaires
└── utils.ts                  # Fonction cn() pour classes CSS conditionnelles

public/                       # Assets statiques
├── images/                   # Images des destinations
├── placeholder.svg
├── placeholder.jpg
├── placeholder-user.jpg
├── placeholder-logo.svg
└── placeholder-logo.png

styles/                       # Styles additionnels
└── globals.css               # Styles globaux alternatifs

Configuration racine:
├── next.config.mjs           # Configuration Next.js
├── tailwind.config.ts        # Configuration Tailwind CSS
├── postcss.config.mjs        # Configuration PostCSS
├── tsconfig.json             # Configuration TypeScript
├── components.json           # Configuration shadcn/ui
└── package.json              # Dépendances et scripts
```

## Thème et Design

- **Thème par défaut** : Sombre (dark mode)
- **Palette** : Couleurs HSL personnalisées avec accents cuivrés et bleus
- **Typographie** : System fonts avec Tailwind
- **Animations** : Transitions CSS fluides (300-500ms)
- **Responsive** : Breakpoints Tailwind standard (sm, md, lg, xl)

## Crédits

### Ressources
- **UI Components** : [shadcn/ui](https://ui.shadcn.com/) - Base de composants Radix UI
- **Icons** : [Lucide React](https://lucide.dev/) - Bibliothèque d'icônes
- **Images** : À compléter (recommandé : Midjourney, DALL-E, ou banques d'images libres)

### APIs et Services
- **Mistral AI API** : [mistral.ai](https://mistral.ai/) - API pour le chatbot conversationnel

### Inspirations
- Design luxury travel agencies
- Esthétique steampunk/retro-futuriste
- Interfaces de conciergerie haut de gamme

## Contexte du Projet

**Projet académique** - M1 Digital & IA  
**Cours** : Projet IA  
**Objectif** : Développement d'une webapp interactive utilisant des outils d'IA pour la génération de code

## Licence

Projet pédagogique - M1/M2 Digital & IA  
Tous droits réservés à fins éducatives uniquement.

---

*Chronos Voyages - Voyager, c'est vivre... dans le temps.*
