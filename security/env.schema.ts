//Puisque nous venons de configurer les secrets (étape 2), utilisons Zod pour vérifier que ces secrets sont corrects dès le démarrage de l'app.
//Action : Créez un dossier src/security/ et un fichier env.schema.ts :

import { z } from 'zod';

// On définit le schéma de ce qu'on attend
export const envSchema = z.object({
  apiUrl: z.string().url("L'URL de l'API est malformée ou absente"),
  // Vous pouvez ajouter d'autres validations ici
});

// Fonction pour valider
export const validateConfig = (config: any) => {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    console.error("🚨 ERREUR DE CONFIGURATION :", result.error.format());
    // En production, vous pourriez empêcher l'app de démarrer ici
    return null;
  }
  return result.data;
};
// constants/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  // ...
}