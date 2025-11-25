import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useLoginMutation } from "../redux/api/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, setToken } from "../redux/slices/authSlice";
import { storage } from "../utils/storage";
import { useNavigation } from "expo-router";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      dispatch(setUser(result.user));
      dispatch(setToken(result.token));
      await storage.setToken(result.token);
      await storage.setUser(result.user);
      router.replace("/(tabs)");
    } catch (error: any) {
      alert(error?.data?.message || "Login failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-12 justify-center">
        <Text className="text-3xl font-bold mb-8 text-gray-900">Sign In</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          keyboardType="email-address"
          editable={!isLoading}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="border border-gray-300 rounded-lg p-4 mb-6 text-gray-900"
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          className="bg-blue-600 rounded-lg p-4 mb-4"
        >
          <Text className="text-white text-center font-semibold">
            {isLoading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/register")}>
          <Text className="text-center text-blue-600">Don't have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
