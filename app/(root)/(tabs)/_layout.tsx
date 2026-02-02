import React from "react";
import { Tabs, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";

const TabIcon = ({
  focused,
  name,
  title,
}: {
  focused: boolean;
  name: keyof typeof Ionicons.glyphMap;
  title: string;
}) => {
  return (
    <View className="items-center justify-center w-16">
      <Ionicons
        name={name}
        size={24}
        color={focused ? "#0061FF" : "#9CA3AF"}
      />
      <Text
        numberOfLines={1}
        className={`text-[11px] mt-1 text-center ${
          focused ? "text-blue-600 font-semibold" : "text-gray-400"
        }`}
      >
        {title}
      </Text>
    </View>
  );
};

const AddButton = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push("/add-task")}
      style={{
        width: 60,
        height: 60,
        borderRadius: 32,
        backgroundColor: "#0061FF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        shadowColor: "#0061FF",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        marginLeft:8
      }}
    >
      <Ionicons name="add" size={32} color="#fff" />
    </TouchableOpacity>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? "home" : "home-outline"}
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="important"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? "star" : "star-outline"}
              title="Important"
            />
          ),
        }}
      />

     <Tabs.Screen
  name="add-task"
  options={{
    tabBarLabel: () => null,
    tabBarIcon: () => null,
    tabBarButton: () => <AddButton />,
  }}
/>


      <Tabs.Screen
        name="archive"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? "archive" : "archive-outline"}
              title="Archive"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? "settings" : "settings-outline"}
              title="Settings"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
