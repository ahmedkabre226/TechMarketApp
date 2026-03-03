import { StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  mainContent: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Fond gris très clair pour faire ressortir les cartes
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20, // Chevauchement sur le header pour un effet moderne
  },

  // SECTION TITRES
  sectionHeader: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  sectionContainer: {
    marginVertical: 15,
  },

  // CARTES DE PRODUITS (La pièce maîtresse)
  productList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  // LOCALISATION (Style Pilule)
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: -25,
    // Ombre Premium
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },

  // PARTENAIRES
  categoriesContainer: {
    paddingVertical: 20,
  },

  verticalCategoryItem: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  }
});