import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { categories } from "@/constants/categories";

interface HeaderProps {
  location?: string;
  searchText: string;
  setSearchText: (text: string) => void;
  showCategories?: boolean;
  setShowCategories?: (show: boolean) => void;
  language?: string;
  setLanguage?: (lang: string) => void;
  showAccountMenu?: boolean;
  setShowAccountMenu?: (show: boolean) => void;
  selectedCategory?: string;
  setSelectedCategory?: (category: string) => void;
}

export default function Header({
  location,
  searchText,
  setSearchText,
  showCategories = false,
  setShowCategories,
  language = "FR",
  setLanguage,
  showAccountMenu = false,
  setShowAccountMenu,
  selectedCategory,
  setSelectedCategory,
}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {location && (
        <ThemedText style={styles.locationText}>
          Votre adresse de livraison: {location}
        </ThemedText>
      )}
      <Image
        source={require("@/assets/images/logotechmarket2.png")}
        style={styles.bannerImage}
        resizeMode="cover"
      />
      <View style={styles.searchContainer}>
        {setShowCategories && (
          <TouchableOpacity
            style={styles.categoriesButton}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Ionicons name="menu" size={20} color="#fff" />
            <ThemedText style={styles.categoriesButtonText}>
              Toutes catégories
            </ThemedText>
          </TouchableOpacity>
        )}
        <View style={styles.searchBox}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher sur Tech Market"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <Ionicons name="camera-outline" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
        {setLanguage && (
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => setLanguage(language === "FR" ? "EN" : "FR")}
          >
            <Ionicons name="globe" size={16} color="#fff" />
            <ThemedText style={styles.languageButtonText}>
              {language}
            </ThemedText>
          </TouchableOpacity>
        )}
        {setShowAccountMenu && (
          <View style={styles.accountContainer}>
            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => setShowAccountMenu(!showAccountMenu)}
            >
              <Ionicons name="person-outline" size={20} color="#fff" />
              <ThemedText style={styles.accountButtonText}>
                Bonjour, identifiez-vous
              </ThemedText>
              <Ionicons name="chevron-down" size={16} color="#fff" />
            </TouchableOpacity>
            {showAccountMenu && (
              <View style={styles.accountDropdown}>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Ionicons name="person" size={16} color="#0F1111" />
                  <ThemedText style={styles.dropdownText}>
                    Votre compte
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownItem}>
                  <Ionicons name="list" size={16} color="#0F1111" />
                  <ThemedText style={styles.dropdownText}>
                    Vos commandes
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
          <View style={styles.cartBadge}>
            <ThemedText style={styles.cartBadgeText}>3</ThemedText>
          </View>
        </TouchableOpacity>
      </View>
      {showCategories && setShowCategories && (
        <View style={styles.categoriesDropdown}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.dropdownItem}
              onPress={() => {
                if (setSelectedCategory) {
                  setSelectedCategory(category.name);
                }
                setShowCategories(false);
              }}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color="#666"
                style={styles.dropdownIcon}
              />
              <ThemedText style={styles.dropdownText}>
                {category.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === "ios" ? 50 : 10,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "rgba(35, 47, 62, 0.8)",
  },
  locationText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 8,
  },
  bannerImage: {
    width: "100%",
    height: 150,
    marginBottom: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
});

export { Header };

