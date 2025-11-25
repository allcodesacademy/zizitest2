import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetAdDetailQuery } from "../redux/api/adsApi";
import { ArrowLeft } from "lucide-react-native";

export function AdDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: ad, isLoading } = useGetAdDetailQuery(id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  if (!ad) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-center text-gray-500 mt-8">Ad not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <View className="p-4">
          <Text className="text-3xl font-bold text-gray-900 mb-2">{ad.title}</Text>
          <Text className="text-2xl font-bold text-blue-600 mb-4">${ad.price}</Text>

          <View className="bg-gray-100 rounded-lg p-4 mb-4">
            <Text className="text-gray-600">{ad.description}</Text>
          </View>

          <View className="bg-gray-50 rounded-lg p-4 mb-4">
            <Text className="text-sm text-gray-600 mb-2">Category</Text>
            <Text className="text-base font-semibold text-gray-900">{ad.category}</Text>
          </View>

          {ad.seller && (
            <View className="bg-gray-50 rounded-lg p-4">
              <Text className="text-sm text-gray-600 mb-2">Seller</Text>
              <Text className="text-base font-semibold text-gray-900">{ad.seller.name}</Text>
              <Text className="text-sm text-gray-600">{ad.seller.email}</Text>
            </View>
          )}

          <TouchableOpacity className="bg-blue-600 rounded-lg p-4 mt-6">
            <Text className="text-white text-center font-semibold">Contact Seller</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
