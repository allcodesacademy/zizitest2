import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useSearchAdsQuery } from "../../src/redux/api/adsApi";

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const { data: results } = useSearchAdsQuery({ searchTerm, category }, { skip: !searchTerm });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-4">
        <Text className="text-2xl font-bold mb-4 text-gray-900">Search</Text>

        <TextInput
          placeholder="Search listings..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-900"
        />

        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">Category</Text>
          <View className="flex-row flex-wrap gap-2">
            {["Electronics", "Books", "Furniture", "Clothing"].map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => setCategory(category === cat ? "" : cat)}
                className={`px-4 py-2 rounded-full ${
                  category === cat ? "bg-blue-600" : "bg-white border border-gray-300"
                }`}
              >
                <Text className={category === cat ? "text-white" : "text-gray-900"}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {results && results.length > 0 ? (
          results.map((ad: any) => (
            <TouchableOpacity
              key={ad.id}
              onPress={() => router.push(`/ads/${ad.id}`)}
              className="bg-white rounded-lg p-4 mb-3 border border-gray-200"
            >
              <Text className="font-semibold text-gray-900 mb-1">{ad.title}</Text>
              <Text className="text-blue-600 font-bold">${ad.price}</Text>
            </TouchableOpacity>
          ))
        ) : searchTerm ? (
          <Text className="text-center text-gray-500 mt-8">No results found</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
