import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  item: {
    id: string;
    name: string;
    price: string | number;
    originalPrice?: string | number;
    image?: any;
    image_url?: string;
    category: string;
    rating?: number;
    reviews?: number;
    prime?: boolean;
    deal?: string;
  };
  onPress: () => void;
  style?: any;
  showDetails?: boolean;
}

export default function ProductCard({ item, onPress, style, showDetails = false }: ProductCardProps) {
  // LOGIQUE DE SOURCE D'IMAGE :
  // Si image_url existe (Backend Supabase), on utilise uri. 
  // Sinon, on utilise l'image locale (require).
  const imageSource = item.image_url 
    ? { uri: item.image_url } 
    : item.image;

  return (
    <TouchableOpacity
      style={[styles.productCard, style]}
      onPress={onPress}
    >
      {item.deal && (
        <View style={styles.dealBadge}>
          <ThemedText style={styles.dealText}>{item.deal}</ThemedText>
        </View>
      )}
      {item.prime && (
        <View style={styles.primeBadge}>
          <ThemedText style={styles.primeText}>Prime</ThemedText>
        </View>
      )}
      <Image
        source={imageSource}
        style={styles.productImage}
        contentFit="contain"
      />
      <ThemedText type="subtitle" style={styles.productName} numberOfLines={2}>
        {item.name}
      </ThemedText>
      
      {showDetails && item.rating && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFA41C" />
          <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
          {item.reviews && (
            <ThemedText style={styles.reviewsText}>({item.reviews})</ThemedText>
          )}
        </View>
      )}
      
      <View style={styles.priceContainer}>
        <ThemedText type="defaultSemiBold" style={styles.productPrice}>
          {item.price}
        </ThemedText>
        {item.originalPrice && (
          <ThemedText style={styles.originalPrice}>
            {item.originalPrice}
          </ThemedText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});

