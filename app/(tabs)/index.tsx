import Header from "@/components/Header";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { ThemedText } from "@/components/themed-text";
import { manufacturers } from "@/constants/manufacturers";
import { products as allProducts } from "@/constants/products";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

// Helper function to filter products
const filterProducts = (
  searchText: string,
  selectedManufacturer: string | null
) => {
  let filtered = allProducts;

  // Filter by manufacturer
  if (selectedManufacturer) {
    filtered = filtered.filter(
      (product) => product.manufacturer === selectedManufacturer
    );
  }

  // Filter by search text
  if (searchText.trim()) {
    const searchLower = searchText.toLowerCase().trim();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.manufacturer?.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
    );
  }

  return filtered;
};

export default function HomeScreen() {
  // State variables
  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productDetailsVisible, setProductDetailsVisible] = useState(false);

  // Scroll view ref for auto-scrolling manufacturers
  const scrollViewRef = useRef<ScrollView>(null);

  // Duplicate manufacturers for infinite scroll effect
  const duplicatedManufacturers = useMemo(() => {
    return [...manufacturers, ...manufacturers, ...manufacturers];
  }, []);

  // Request location permission
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          const locationResult = await Location.getCurrentPositionAsync({});
          const [address] = await Location.reverseGeocodeAsync({
            latitude: locationResult.coords.latitude,
            longitude: locationResult.coords.longitude,
          });
          if (address) {
            setLocation(
              `${address.street || ""} ${address.city || ""} ${
                address.postalCode || ""
              }`.trim()
            );
          }
        } catch (error) {
          console.log("Error getting location:", error);
        }
      }
    })();
  }, []);

  // Auto-scroll manufacturers (optional: rotate every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      // Optional: Add auto-scroll logic here if needed
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return filterProducts(searchText, selectedManufacturer);
  }, [searchText, selectedManufacturer]);

  // Handle location request
  const handleLocationRequest = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission refusée",
        "Nous avons besoin de votre localisation pour vous proposer des produits près de chez vous."
      );
      return;
    }

    try {
      const locationResult = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });
      if (address) {
        setLocation(
          `${address.street || ""} ${address.city || ""} ${
            address.postalCode || ""
          }`.trim()
        );
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'obtenir votre position.");
    }
  };

  // Render product item
  const renderProduct = useCallback(
    ({ item }: { item: typeof allProducts[0] }) => (
      <ProductCard
        item={item}
        onPress={() => {
          setSelectedProduct(item);
          setProductDetailsVisible(true);
        }}
        // MODERNISATION : Ombre portée et bords très arrondis (Pill style)
        style={{
          borderRadius: 24,
          backgroundColor: "#fff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.05,
          shadowRadius: 15,
          elevation: 5,
          margin: 10,
          padding: 4,
        }}
        showDetails={true}
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#FFFFFF", dark: "#121212" }}
        headerImage={
          <Header
            searchText={searchText}
            setSearchText={setSearchText}
            showCategories={showCategories}
            setShowCategories={setShowCategories}
          />
        }
      >
        {/* SÉLECTEUR DE LOCALISATION : Design "Floating Chip" */}
        <TouchableOpacity
          onPress={handleLocationRequest}
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 50,
            marginTop: -25, // Effet de relief sur le header
            borderWidth: 1,
            borderColor: "#F0F0F0",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            elevation: 3,
          }}
        >
          <Ionicons name="location" size={18} color="#FF9900" />
          <ThemedText style={{ marginLeft: 8, fontWeight: "600" }}>
            {location || "Définir mon adresse"}
          </ThemedText>
        </TouchableOpacity>

        {/* SECTION PARTENAIRES : Logos circulaires épurés */}
        <View style={{ marginTop: 30 }}>
          <ThemedText
            type="defaultSemiBold"
            style={{ paddingLeft: 20, fontSize: 18 }}
          >
            Marques Officielles
          </ThemedText>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingVertical: 15 }}
          >
            {duplicatedManufacturers.map((manufacturer, index) => (
              <TouchableOpacity
                key={`${manufacturer.id}-${index}`}
                onPress={() =>
                  setSelectedManufacturer(
                    selectedManufacturer === manufacturer.name
                      ? null
                      : manufacturer.name
                  )
                }
                style={{ alignItems: "center", marginRight: 25 }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: selectedManufacturer === manufacturer.name ? 2 : 0,
                    borderColor: "#FF9900",
                    elevation: 2,
                  }}
                >
                  <Image
                    source={manufacturer.logo}
                    style={{ width: 45, height: 45 }}
                    contentFit="contain"
                  />
                </View>
                <ThemedText style={{ fontSize: 11, marginTop: 6, color: "#666" }}>
                  {manufacturer.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* GRILLE DE PRODUITS : Espacement aéré */}
        <View style={{ paddingHorizontal: 10 }}>
          <ThemedText
            type="defaultSemiBold"
            style={{ marginLeft: 10, fontSize: 22, marginBottom: 15 }}
          >
            Articles en vedette
          </ThemedText>
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ParallaxScrollView>

      <ProductDetails
        product={selectedProduct}
        visible={productDetailsVisible}
        onClose={() => setProductDetailsVisible(false)}
      />
    </View>
  );
}

