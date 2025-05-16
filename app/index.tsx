import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type NewsPost = {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
};

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export default function Index() {
  const [txtFind, setTxtFind] = useState("");
  const [newsList, setNewsList] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    if (!txtFind) return;
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(txtFind)}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setNewsList(data.articles || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderArticle = ({ item }: { item: NewsPost }) => (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() => Linking.openURL(item.url)}
    >
      {item.urlToImage && (
        <Image source={{ uri: item.urlToImage }} style={styles.thumbnail} />
      )}
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>
        {item.description ?? "No description available"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>🗞️ Explore Top News</Text>

        <TextInput
          style={styles.input}
          placeholder="Search for a topic..."
          value={txtFind}
          onChangeText={setTxtFind}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.button} onPress={getNews}>
          <Text style={styles.buttonText}>🔍 Search</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator size="large" color="#6d28d9" />
        ) : (
          <FlatList
            data={newsList}
            ListEmptyComponent={
              <Text style={{ color: "#888" }}>{`No news articles found.`}</Text>
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.url}
            renderItem={renderArticle}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
  },
  innerContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 20,
    color: "#1e1b4b",
    textAlign: "center",
  },
  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#c4b5fd",
    borderRadius: 12,
    backgroundColor: "#ffffff",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6d28d9",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#6d28d9",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
  },
  list: {
    paddingBottom: 20,
  },
  articleCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#1e1b4b",
  },
  articleDescription: {
    fontSize: 14,
    color: "#4c566a",
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
    marginBottom: 12,
  },
});
