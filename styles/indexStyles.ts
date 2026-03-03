import { Platform, StyleSheet } from "react-native";

export const indexStyles = StyleSheet.create({
  // Style pour l'image de fond
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // Style pour le contenu principal avec fond semi-transparent
  mainContent: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.92)",
  },

  // Header avec fond semi-transparent
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 50 : 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "rgba(35, 47, 62, 0.8)", // Bleu Amazon semi-transparent
  },

  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },

  locationText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  categoriesButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF9900",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 8,
  },

  categoriesButtonText: {
    color: "#fff",
    fontSize: 14,
  },

  categoriesDropdown: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 8,
    elevation: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0px 2px 3.84px rgba(0,0,0,0.25)",
      },
    }),
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  dropdownIcon: {
    marginRight: 12,
  },

  dropdownText: {
    fontSize: 16,
    color: "#131921",
  },

  languageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232F3E",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    gap: 4,
  },

  languageButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  returnsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232F3E",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
  },

  returnsButtonText: {
    color: "#fff",
    fontSize: 12,
  },

  accountButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232F3E",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
  },

  accountButtonText: {
    color: "#fff",
    fontSize: 12,
  },

  accountContainer: {
    position: "relative",
  },

  accountDropdown: {
    backgroundColor: "#fff",
    borderRadius: 4,
    marginTop: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "absolute",
    top: 50,
    right: 10,
    minWidth: 150,
    zIndex: 1000,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    minWidth: 200,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: "#000",
  },

  cartIconContainer: {
    position: "relative",
    padding: 8,
  },

  cartBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#FF9900",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  cartBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  categoriesContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },

  categoriesList: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  categoryItem: {
    alignItems: "center",
    marginRight: 20,
    paddingVertical: 8,
    minWidth: 60,
  },

  categoryItemSelected: {
    borderBottomWidth: 2,
    borderBottomColor: "#FF9900",
  },

  categoryText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  categoryTextSelected: {
    color: "#FF9900",
    fontWeight: "600",
  },

  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionHeader: {
    fontSize: 18,
    color: "#131921",
  },

  seeAllText: {
    color: "#007185",
    fontSize: 14,
  },

  manufacturerScroll: {
    height: 100,
  },

  manufacturerContainer: {
    paddingRight: 16,
  },

  manufacturerItem: {
    alignItems: "center",
    marginRight: 20,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f8f9fa",
  },

  manufacturerItemSelected: {
    backgroundColor: "#FF9900",
  },

  manufacturerLogo: {
    width: 50,
    height: 50,
  },

  manufacturerName: {
    fontSize: 12,
    marginTop: 4,
    color: "#131921",
  },

  productList: {
    paddingBottom: 20,
  },

  horizontalProductList: {
    paddingBottom: 20,
    paddingRight: 16,
  },

  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    position: "relative",
    minHeight: 280,
  },

  dealBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#CC0C39",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },

  dealText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  primeBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#00A8E1",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },

  primeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },

  productImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 8,
  },

  productName: {
    textAlign: "left",
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
    minHeight: 36,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  ratingText: {
    fontSize: 12,
    color: "#0F1111",
    marginLeft: 4,
    marginRight: 4,
  },

  reviewsText: {
    fontSize: 12,
    color: "#007185",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  productPrice: {
    fontSize: 18,
    color: "#0F1111",
    marginRight: 8,
  },

  originalPrice: {
    fontSize: 14,
    color: "#565959",
    textDecorationLine: "line-through",
  },

  cartButton: {
    backgroundColor: "#FFA41C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },

  cartButtonText: {
    color: "#0F1111",
    fontSize: 14,
    fontWeight: "600",
  },

  primeSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232F3E",
    margin: 16,
    padding: 20,
    borderRadius: 8,
    gap: 16,
  },

  primeContent: {
    flex: 1,
  },

  primeTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 4,
  },

  primeDescription: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 12,
  },

  primeButton: {
    backgroundColor: "#FF9900",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },

  primeButtonText: {
    color: "#0F1111",
    fontSize: 14,
    fontWeight: "600",
  },

  // Vertical categories bar styles
  verticalCategoriesBar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 300,
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 1000,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  closeVerticalBar: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1001,
  },

  verticalBarTitle: {
    fontSize: 18,
    color: "#131921",
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },

  verticalCategoriesList: {
    flex: 1,
    paddingHorizontal: 20,
  },

  verticalCategoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  verticalCategoryItemSelected: {
    backgroundColor: "#FFF8F0",
  },

  verticalCategoryText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 15,
  },

  verticalCategoryTextSelected: {
    color: "#FF9900",
    fontWeight: "600",
  },

  // Styles for index.tsx
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    gap: 8,
    alignSelf: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  reactLogo: {
    width: "100%",
    height: 200,
  },

  // Styles pour le survol des produits
  imageContainer: {
    position: "relative",
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 8,
  },

  hoverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  hoverText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});
