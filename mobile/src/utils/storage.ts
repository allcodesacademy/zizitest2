import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async setToken(token: string) {
    await AsyncStorage.setItem("auth_token", token);
  },
  async getToken() {
    return await AsyncStorage.getItem("auth_token");
  },
  async removeToken() {
    await AsyncStorage.removeItem("auth_token");
  },
  async setUser(user: any) {
    await AsyncStorage.setItem("auth_user", JSON.stringify(user));
  },
  async getUser() {
    const user = await AsyncStorage.getItem("auth_user");
    return user ? JSON.parse(user) : null;
  },
  async removeUser() {
    await AsyncStorage.removeItem("auth_user");
  },
};
