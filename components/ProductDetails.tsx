import { Image } from "expo-image";
import { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";

// Type commun pour les produits (compatible avec products.ts et exploreProducts.ts)
interface Product {
  id: string;
  name: string;
  price?: string;
  originalPrice?: string;
  image: any;
  category: string;
  manufacturer?: string;
  rating?: number;
  reviews?: number;
  prime?: boolean;
  deal?: string;
  description?: string;
}

interface ProductDetailsProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
}

export default function ProductDetails({
  product,
  visible,
  onClose,
}: ProductDetailsProps) {
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [imageOffset, setImageOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  if (!product) return null;

  //Suprimer les codes inutiles ci-dessous :
  const handleAddToCart = () => {
    Alert.alert("Panier", `${product.name} ajouté au panier !`);
  };

  const handleBuyNow = async () => {
    // Numéro WhatsApp
    const phoneNumber = "+243853242111";
    
    // Message formaté avec les informations du produit
    const message = `*Nouvelle commande depuis TechMarket*\n\n` +
      `*Produit:* ${product.name}\n` +
      `*Prix:* ${product.price || "Prix sur demande"}\n` +
      `*Catégorie:* ${product.category}\n` +
      `*Marque:* ${product.name.split(" ")[0]}\n\n` +
      `Je souhaite passer cette commande. Merci de me contacter pour finaliser l'achat.`;

    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Créer l'URL WhatsApp
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // Essayer d'ouvrir WhatsApp
    const canOpen = await Linking.canOpenURL(whatsappUrl);
    
    if (canOpen) {
      await Linking.openURL(whatsappUrl);
    } else {
      // Si WhatsApp n'est pas installé, essayer avec l'URL web
      const webWhatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
      await Linking.openURL(webWhatsappUrl);
    }
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.5, 1));
  };

  const resetZoom = () => {
    setZoomScale(1);
    setImageOffset({ x: 0, y: 0 });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#131921" />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>
            Détails du produit
          </ThemedText>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.imageContainer}>
            <Image
              source={product.image}
              style={[
                styles.productImage,
                { transform: [{ scale: zoomScale }] },
              ]}
              contentFit="contain"
            />
            <View style={styles.zoomControls}>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={handleZoomIn}
              >
                <Ionicons name="add" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.zoomButton}
                onPress={handleZoomOut}
              >
                <Ionicons name="remove" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.zoomButton} onPress={resetZoom}>
                <Ionicons name="refresh" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.content}>
            <ThemedText type="title" style={styles.productName}>
              {product.name}
            </ThemedText>

            <View style={styles.categoryContainer}>
              <ThemedText style={styles.categoryText}>
                Catégorie: {product.category}
              </ThemedText>
            </View>

            {product.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="#FFA41C" />
                <ThemedText style={styles.ratingText}>
                  {product.rating}
                </ThemedText>
                {product.reviews && (
                  <ThemedText style={styles.reviewsText}>
                    ({product.reviews} avis)
                  </ThemedText>
                )}
              </View>
            )}

            <View style={styles.priceContainer}>
              <ThemedText type="defaultSemiBold" style={styles.productPrice}>
                {product.price || "Prix sur demande"}
              </ThemedText>
              {product.originalPrice && (
                <ThemedText style={styles.originalPrice}>
                  {product.originalPrice}
                </ThemedText>
              )}
            </View>

            {product.deal && (
              <View style={styles.dealContainer}>
                <ThemedText style={styles.dealText}>{product.deal}</ThemedText>
              </View>
            )}

            {product.prime && (
              <View style={styles.primeContainer}>
                <Ionicons name="star" size={16} color="#00A8E1" />
                <ThemedText style={styles.primeText}>Prime</ThemedText>
              </View>
            )}

            <View style={styles.descriptionContainer}>
              <ThemedText
                type="defaultSemiBold"
                style={styles.descriptionTitle}
              >
                Description
              </ThemedText>
              <ThemedText style={styles.descriptionText}>
                {product.description ||
                  `Découvrez ${product.name}, un produit de haute qualité dans la
                catégorie ${product.category}.`}
              </ThemedText>
            </View>

            <View style={styles.specificationsContainer}>
              <ThemedText type="defaultSemiBold" style={styles.specsTitle}>
                Caractéristiques principales
              </ThemedText>
              <View style={styles.specsList}>
                <View style={styles.specItem}>
                  <ThemedText style={styles.specLabel}>Marque:</ThemedText>
                  <ThemedText style={styles.specValue}>
                    {product.name.split(" ")[0]}
                  </ThemedText>
                </View>
                <View style={styles.specItem}>
                  <ThemedText style={styles.specLabel}>Catégorie:</ThemedText>
                  <ThemedText style={styles.specValue}>
                    {product.category}
                  </ThemedText>
                </View>
                <View style={styles.specItem}>
                  <ThemedText style={styles.specLabel}>
                    Disponibilité:
                  </ThemedText>
                  <ThemedText style={styles.specValue}>En stock</ThemedText>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <ThemedText style={styles.buyButtonText}>
              Acheter maintenant
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  productImage: {
    width: 300,
    height: 300,
  },
  zoomControls: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    gap: 8,
  },
  zoomButton: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    marginBottom: 8,
    color: "#131921",
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    color: "#565959",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    color: "#0F1111",
    marginLeft: 4,
    marginRight: 8,
  },
  reviewsText: {
    fontSize: 14,
    color: "#007185",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 28,
    color: "#0F1111",
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: "#565959",
    textDecorationLine: "line-through",
  },
  dealContainer: {
    backgroundColor: "#CC0C39",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  dealText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  primeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#232F3E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  primeText: {
    color: "#00A8E1",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    marginBottom: 8,
    color: "#131921",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#565959",
  },
  specificationsContainer: {
    marginBottom: 24,
  },
  specsTitle: {
    fontSize: 18,
    marginBottom: 12,
    color: "#131921",
  },
  specsList: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 16,
  },
  specItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  specLabel: {
    fontSize: 14,
    color: "#565959",
    fontWeight: "500",
  },
  specValue: {
    fontSize: 14,
    color: "#131921",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
  },
  cartButton: {
    flex: 1,
    backgroundColor: "#FFA41C",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  cartButtonText: {
    color: "#0F1111",
    fontSize: 16,
    fontWeight: "600",
  },
  buyButton: {
    flex: 1,
    backgroundColor: "#FF9900",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  buyButtonText: {
    color: "#0F1111",
    fontSize: 16,
    fontWeight: "600",
  },
});
