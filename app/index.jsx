import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Link } from "expo-router";
import "../global.css";

const index = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-pblack text-3xl">index</Text>
      <StatusBar style="auto"></StatusBar>
      <Link href="/home">Go to about</Link>
    </View>
  );
};

export default index;
