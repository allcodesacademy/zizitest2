import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../src/redux/hooks";
import { logout } from "../../src/redux/slices/authSlice";
import { storage } from "../../src/utils/storage";
import { LogOut } from "lucide-react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    dispatch(logout());
    await storage.removeToken();
    await storage.removeUser();
    router.replace("/auth/login");
  };

  if (!user) {
    return router.replace("/auth/login");
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-4 py-8">
        <Text className="text-2xl font-bold mb-8 text-gray-900">Profile</Text>

        <View className="bg-white rounded-lg p-6 mb-6">
          <Text className="text-sm text-gray-600 mb-2">Name</Text>
          <Text className="text-lg font-semibold text-gray-900 mb-6">{user.name}</Text>

          <Text className="text-sm text-gray-600 mb-2">Email</Text>
          <Text className="text-lg font-semibold text-gray-900">{user.email}</Text>
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 rounded-lg p-4 flex-row items-center justify-center"
        >
          <LogOut size={20} color="#fff" />
          <Text className="text-white text-center font-semibold ml-2">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
