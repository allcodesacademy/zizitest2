import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import { useRegisterMutation } from "../redux/api/authApi";

export function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register({ name, email, password }).unwrap();
      alert("Registration successful! Please login.");
      router.replace("/auth/login");
    } catch (error: any) {
      alert(error?.data?.message || "Registration failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-12 justify-center">
        <Text className="text-3xl font-bold mb-8 text-gray-900">Create Account</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          editable={!isLoading}
        />

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
          className="border border-gray-300 rounded-lg p-4 mb-4 text-gray-900"
          secureTextEntry
          editable={!isLoading}
        />

        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          className="border border-gray-300 rounded-lg p-4 mb-6 text-gray-900"
          secureTextEntry
          editable={!isLoading}
        />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={isLoading}
          className="bg-blue-600 rounded-lg p-4 mb-4"
        >
          <Text className="text-white text-center font-semibold">
            {isLoading ? "Creating..." : "Create Account"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/auth/login")}>
          <Text className="text-center text-blue-600">Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
