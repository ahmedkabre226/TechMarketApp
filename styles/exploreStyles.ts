import { Platform, StyleSheet } from "react-native";

export const exploreStyles = StyleSheet.create({
  // HEADER
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  // BARRE DE RECHERCHE (Plus ronde et plus haute)
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7", // Gris iOS standard
    borderRadius: 14,
    paddingHorizontal: 15,
    height: 50,
  },

  // CHIPS DE CATÉGORIES
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#F2F2F7",
    marginRight: 10,
    borderWidth: 0,
  },

  categoryChipSelected: {
    backgroundColor: "#FF9900", // Votre couleur signature
    shadowColor: "#FF9900",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  sectionContainer: {
    paddingTop: 20,
    backgroundColor: "#FFFFFF",
  }
});