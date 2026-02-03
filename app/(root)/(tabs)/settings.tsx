import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Settings = () => {
  const router = useRouter();

  const [reminders, setReminders] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [autoArchive, setAutoArchive] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const SectionTitle = ({ title }: { title: string }) => (
    <Text className="text-slate-400 text-xs font-semibold mt-8 mb-3">
      {title}
    </Text>
  );

  const Row = ({
    icon,
    iconBg,
    iconColor,
    title,
    subtitle,
    right,
    danger,
  }: any) => (
    <View className="flex-row items-center py-4">
      <View
        className="w-9 h-9 rounded-xl items-center justify-center"
        style={{ backgroundColor: iconBg }}
      >
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>

      <View className="flex-1 ml-4">
        <Text
          className={`text-[15px] ${
            danger ? "text-red-500" : "text-black"
          }`}
        >
          {title}
        </Text>
        {subtitle && (
          <Text className="text-slate-500 text-xs mt-1">{subtitle}</Text>
        )}
      </View>

      {right}
    </View>
  );

 const handleArchiveTask =()=>{
      router.push('/(root)/(tabs)/archive')
 } 

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center py-4">
        <TouchableOpacity className="ml-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-semibold text-lg mr-8">
          Settings
        </Text>
      </View>
<ScrollView
    className="px-5"
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 40 }}
  >
      <View className="px-5">
        {/* NOTIFICATIONS */}
        <SectionTitle title="NOTIFICATIONS" />

        <Row
          icon="notifications"
          iconBg="#2563eb"
          iconColor="#fff"
          title="Task Reminders"
          right={
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ false: "#e5e7eb", true: "#2563eb" }}
              thumbColor="#fff"
            />
          }
        />

        <Row
          icon="time"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Reminder Timing"
          right={
            <View className="flex-row items-center">
              <Text className="text-slate-500 mr-2">15 min before</Text>
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9ca3af"
              />
            </View>
          }
        />

        {/* TASK BEHAVIOR */}
        <SectionTitle title="TASK BEHAVIOR" />

        <Row
          icon="checkmark-circle"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Show Completed Tasks"
          subtitle="Completed tasks will appear at the bottom of the task list"
          right={
            <Switch
              value={showCompleted}
              onValueChange={setShowCompleted}
              trackColor={{ false: "#e5e7eb", true: "#2563eb" }}
              thumbColor="#fff"
            />
          }
        />

        <Row
          icon="archive"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Auto-archive (30 days)"
          right={
            <View className="flex-row items-center">
              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9ca3af"
              />
              <Switch
                value={autoArchive}
                onValueChange={setAutoArchive}
                trackColor={{ false: "#e5e7eb", true: "#2563eb" }}
                thumbColor="#fff"
                className="ml-3"
              />
            </View>
          }
        />

        {/* ARCHIVE */}
        <SectionTitle title="ARCHIVE" />
    <TouchableOpacity onPress={handleArchiveTask}>
        <Row
          icon="archive-outline"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Archived Tasks"
          right={
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#9ca3af"
            />
          }
        />
</TouchableOpacity>
        <Row
          icon="trash"
          iconBg="#fee2e2"
          iconColor="#ef4444"
          title="Clear Archive"
          danger
          right={
            <Ionicons
              name="warning"
              size={18}
              color="#ef4444"
            />
          }
        />

        {/* APPEARANCE */}
        <SectionTitle title="APPEARANCE" />

        <Row
          icon="moon"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Dark Mode"
          right={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: "#e5e7eb", true: "#2563eb" }}
              thumbColor="#fff"
            />
          }
        />

        {/* INFO */}
        <SectionTitle title="INFO" />

        <Row
          icon="help-circle"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="Help Center"
          right={
            <Ionicons
              name="open-outline"
              size={18}
              color="#9ca3af"
            />
          }
        />

        <Row
          icon="information-circle"
          iconBg="#f1f5f9"
          iconColor="#000"
          title="App Version"
          right={
            <View className="bg-blue-100 px-3 py-1 rounded-full">
              <Text className="text-blue-600 text-xs font-semibold">
                v2.4.0
              </Text>
            </View>
          }
        />

        {/* Footer */}
        <View className="items-center mt-10 opacity-40">
          <Ionicons name="checkmark-circle" size={32} />
          <Text className="text-xs mt-2 tracking-widest">
            SMART TASK MANAGER
          </Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
