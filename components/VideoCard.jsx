import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { icons } from "@/constants";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent } from "expo";

const VideoCard = ({
  video: {
    heading,
    thumbnail,
    media,
    users: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useVideoPlayer(media, (player) => {
    player.loop = false;
    if (play) {
      player.play();
    }
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing,
  });

  const handlePlayPress = useCallback(() => {
    // setIsLoading(true);
    setPlay(true);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-semibold text-sm"
              numberOfLines={1}
            >
              {heading}
            </Text>
            <Text
              className="text-gray-100 text-xs font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <View className="w-full h-70 rounded-l mt-3 justify-center items-center overflow-hidden">
          {isLoading && !isPlaying && (
            <ActivityIndicator size="large" className="absolute z-10" />
          )}
          <VideoView
            style={{
              width: "100%",
              height: 300,
              borderRadius: 35,
            }}
            player={player}
            onLoad={handleVideoLoad}
            allowsFullscreen
            allowsPictureInPicture
          />
          {!isPlaying && (
            <TouchableOpacity
              className="absolute z-20 w-full h-full items-center justify-center bg-black/20"
              onPress={() => {
                if (isPlaying) {
                  player.pause();
                } else {
                  player.play();
                }
              }}
            >
              <Image
                source={icons.play}
                resizeMode="contain"
                className="w-12 h-12"
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 relative justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute right-[170px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
