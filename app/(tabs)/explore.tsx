import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

import { Header } from "@/components/Header";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import ProductCard from "@/components/ProductCard";
import ProductDetails from "@/components/ProductDetails";
import { ThemedText } from "@/components/themed-text";
import { categories } from "@/constants/exploreCategories";
import { products } from "@/constants/exploreProducts";

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productDetailsVisible, setProductDetailsVisible] = useState(false);
  const router = useRouter();

  const filteredProducts = useMemo(() => {
  let result = [...(products || [])];

  if (selectedCategory !== "Tous") {
    result = result.filter(
      (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

    if (searchText.trim()) {
    const searchLower = searchText.toLowerCase().trim();
    result = result.filter((p) => 
      p.name.toLowerCase().includes(searchLower)
    );
  }

    return result;
}, [searchText, selectedCategory]);

  const renderProduct = ({ item }: { item: typeof products[0] }) => (
    <ProductCard
      item={item}
      onPress={() => {
        setSelectedProduct(item);
        setProductDetailsVisible(true);
      }}
      style={{
        borderRadius: 16,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        margin: 6,
      }}
      showDetails={true}
    />
  );

  console.log("INDEX DATA:", products);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Header searchText={searchText} setSearchText={setSearchText} />

      <ParallaxScrollView
        headerBackgroundColor={{ light: "#F2F2F2", dark: "#1A1A1A" }}
      >
        {/* TITRE DE PAGE DYNAMIQUE */}
        <View style={{ padding: 20 }}>
          <ThemedText style={{ fontSize: 32, fontWeight: '800' }}>
            Trouvez votre Tech
          </ThemedText>
          <ThemedText style={{ color: "#8E8E93", marginTop: 4 }}>
            Explorez plus de 500 produits
          </ThemedText>
        </View>

        {/* FILTRE CATÉGORIES : Style "Apple Store Tabs" */}
        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedCategory(item.name)}
                style={{
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 15,
                  marginRight: 12,
                  backgroundColor:
                    selectedCategory === item.name ? "#000" : "#F2F2F7",
                }}
              >
                <ThemedText
                  style={{
                    fontWeight: "700",
                    color: selectedCategory === item.name ? "#FFF" : "#000",
                  }}
                >
                  {item.name}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* RÉSULTATS : Grille avec compteurs */}
        <View style={{ paddingHorizontal: 12 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 15,
              paddingHorizontal: 8,
            }}
          >
            <ThemedText style={{ fontWeight: "600", color: "#666" }}>
              {filteredProducts.length} modèles
            </ThemedText>
            <Ionicons name="options-outline" size={20} color="#000" />
          </View>

          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => `explore-${item.id}`}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{ justifyContent: "space-around" }}
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

