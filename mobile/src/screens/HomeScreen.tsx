import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useGetAdsQuery } from "../redux/api/adsApi";
import { useAppSelector } from "../redux/hooks";

export function HomeScreen() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const { data: ads, isLoading } = useGetAdsQuery({ limit: 10 });

  if (!user) {
    return router.replace("/auth/login");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-4">
        <Text className="text-2xl font-bold mb-4 text-gray-900">Listings</Text>

        {isLoading ? (
          <View className="py-12 items-center justify-center">
            <ActivityIndicator size="large" color="#2563eb" />
          </View>
        ) : ads && ads.length > 0 ? (
          ads.map((ad: any) => (
            <TouchableOpacity
              key={ad.id}
              onPress={() => router.push(`/ads/${ad.id}`)}
              className="bg-white rounded-lg p-4 mb-4 border border-gray-200"
            >
              <Text className="text-lg font-semibold text-gray-900 mb-2">{ad.title}</Text>
              <Text className="text-gray-600 mb-2">{ad.description}</Text>
              <View className="flex-row justify-between items-center">
                <Text className="text-xl font-bold text-blue-600">${ad.price}</Text>
                <Text className="text-sm text-gray-500">{ad.category}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-center text-gray-500 py-8">No listings found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
