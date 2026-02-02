import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabIcon = ({
  focused,
  name,
  title,
}: {
  focused: boolean
  name: keyof typeof Ionicons.glyphMap
  title: string
}) => (
  <View className="items-center justify-center mt-2">
    <Ionicons
      name={name}
      size={24}
      color={focused ? '#0061FF' : '#9CA3AF'}
    />
    <Text
      className={`text-xs mt-1 ${
        focused ? 'text-blue-600 font-semibold' : 'text-gray-400'
      }`}
    >
      {title}
    </Text>
  </View>
)

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          position: 'absolute',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? 'home' : 'home-outline'}
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
              name={focused ? 'star' : 'star-outline'}
              title="Important"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="archive"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              name={focused ? 'archive' : 'archive-outline'}
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
              name={focused ? 'settings' : 'settings-outline'}
              title="Settings"
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabsLayout
