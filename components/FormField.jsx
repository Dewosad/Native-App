import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
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
    <View className={`flex gap-5 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className=" w-full flex-row items-center relative">
        <TextInput
          style={{
            borderRadius: 10,
            padding: 10,
            color: "white",
            backgroundColor: "#1E1E2D",
          }}
          className={`flex-1 text-white font-psemibold text-base h-[50px] border border-black-200 bgf-black-100 roundedf-2xl focus:border-secondary ${inputSyles}`}
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6 border-black-200 absolute right-5 top-[-10]"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
