import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setIsLogged, setUser } = useGlobalContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center itemsf-center h-[85vh] px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          />
          <Text className="text-2xl text-white text-semibold pt-10 font-psemibold">
            Sign Up
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles="w-full mt-7"
          />
          <View className="justify-center flex-row gap-2 pt-5">
            <Text className="text-gray-100 text-lg font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login{" "}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
