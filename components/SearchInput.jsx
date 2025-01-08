import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  inputSyles,
  ...props
}) => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className=" w-full flex-row items-center relative">
      <TextInput
        style={{
          borderRadius: 10,
          padding: 10,
          color: "white",
          backgroundColor: "#1E1E2D",
        }}
        className={`flex-1 text-white text-base font-pregular h-[50px] border border-black-200 bgf-black-100 roundedf-2xl focus:border-secondary space-x-4 ${inputSyles}`}
        value={query}
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert("Missing query", "Provide input to search");
          }

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
        className="w-[30px] px-10 absolute right-0 top-0 h-[50px] items-center justify-center"
      >
        <Image
          source={icons.search}
          className="w-5 h-5 "
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
