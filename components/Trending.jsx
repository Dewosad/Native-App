import { useState, useCallback } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItemId, item }) => {
  const [play, setPlay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const player = useVideoPlayer(item.media, (player) => {
    player.loop = false;
    if (play) {
      player.play();
    }
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player?.playing,
  });

  const handlePlayPress = useCallback(() => {
    setIsLoading(true);
    setPlay(true);
  }, []);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItemId === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <View className="w-52 h-72 rounded-[35px] mt-3 bg-white/10 justify-center items-center overflow-hidden">
          {isLoading && !isPlaying && (
            <ActivityIndicator size="large" className="absolute z-10" />
          )}
          <VideoView
            style={{
              width: 208, // w-52 in pixels
              height: 288, // h-72 in pixels
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
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={handlePlayPress}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black-100"
            resizeMode="cover"
          >
            <View className="flex-1 justify-center items-center">
              <Image
                source={icons.play}
                resizeMode="contain"
                className="w-12 h-12"
              />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItemId, setActiveItemId] = useState(
    posts?.length > 0 ? posts[0].$id : null
  );

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      const firstViewableItem = viewableItems[0].item;
      setActiveItemId(firstViewableItem.$id);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItemId={activeItemId} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
      horizontal
    />
  );
};

export default Trending;
