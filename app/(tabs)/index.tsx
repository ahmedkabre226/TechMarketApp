import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";

import { Header } from "@/components/Header";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { ThemedText } from "@/components/themed-text";
import { manufacturers } from "@/constants/manufacturers";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productDetailsVisible, setProductDetailsVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // États pour les données Supabase
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Duplicate manufacturers for infinite scroll effect
  const duplicatedManufacturers = useMemo(() => {
    return [...manufacturers, ...manufacturers, ...manufacturers];
  }, []);

  // --- ÉTAPE CLÉ : FETCH DES DONNÉES DEPUIS SUPABASE ---
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      // Requête SQL via le client Supabase
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération:", error);
    } finally {
      setLoading(false);
    }
  }

  // --- LOGIQUE DE RECHERCHE MISE À JOUR ---
  useEffect(() => {
    const result = products.filter(product =>
      (product.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (product.category?.toLowerCase() || "").includes(searchText.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchText, products]);

  // Filter products based on search and manufacturer
  const displayedProducts = useMemo(() => {
    let result = [...filteredProducts];

    // Filter by manufacturer
    if (selectedManufacturer) {
      result = result.filter(
        (product) =>
          product.manufacturer?.toLowerCase() === selectedManufacturer.toLowerCase()
      );
    }

    return result;
  }, [filteredProducts, selectedManufacturer]);

  // Request location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission refusée");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // Reverse geocode to get address (simplified)
      setLocation("Paris, France");
    })();
  }, []);

  const handleLocationRequest = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission de localisation refusée");
        return;
      }
      setLocation("Paris, France");
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const renderProduct = ({ item }: { item: any }) => (
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
  );

  // Si ça charge, on affiche un indicateur de chargement
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#F9FAFB" }}>
        <ActivityIndicator size="large" color="#FF9900" />
        <ThemedText style={{ marginTop: 10 }}>Chargement des pépites tech...</ThemedText>
      </View>
    );
  }

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
            data={displayedProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            ListEmptyComponent={
              <View style={{ padding: 20, alignItems: 'center' }}>
                <ThemedText>Aucun produit trouvé</ThemedText>
              </View>
            }
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

