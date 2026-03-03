// Si vous ne l'avez pas encore fait, créez app.config.js à la racine (supprimez app.json si vous préférez tout centraliser, ou gardez les deux mais app.config.js est prioritaire pour les secrets).
//Configuration recommandée :

import 'dotenv/config'; // Charge le fichier .env
export default {
  expo: {
    name: "TechMarketApp",
    slug: "tech-market-app",
    version: "1.0.0",
    // ... vos autres configurations (ios, android, etc.)
    extra: {
      apiUrl: process.env.API_URL || "https://api-fallback.com",
      eas: {
        projectId: "8f403005-3225-47c4-80c7-7ffba93c6741" // L'ID généré pour vous
      }
    },
    updates: {
      url: "https://u.expo.dev/8f403005-3225-47c4-80c7-7ffba93c6741"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    android: {
      package: "com.techmarket.app",
      allowBackup: false // Règle de Moindre Privilège : interdit l'extraction des données
    }
  }
};
