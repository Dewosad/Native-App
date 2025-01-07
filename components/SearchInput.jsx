import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  inputSyles,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
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
        value={value}
        placeholder="Search"
        onChangeText={handleChangeText}
        placeholderTextColor="#7b7b8b"
        secureTextEntry={title === "Password" && !showPassword}
      />

      <TouchableOpacity className="w-[30px] px-10 absolute right-0 top-0 h-[50px] items-center justify-center">
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
