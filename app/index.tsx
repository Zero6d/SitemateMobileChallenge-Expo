import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

export default function Index() {
  const [searchText, setSearchText] = useState("");

  const fetchNews = async () => {
    if (!searchText) return;
    try {
      const response = await fetch(
        `${BASE_URL}?q=${encodeURIComponent(searchText)}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      console.log(data.articles);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <SafeAreaView style={styles.screenSafeView}>
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>📰 News Search</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Enter topic or keyword..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchNews}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenSafeView: {
    flex: 1,
  },
  screen: {
    padding: 20,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
