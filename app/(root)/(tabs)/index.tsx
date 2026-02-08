import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "@/context/TaskContext";

export default function HomeScreen() {
  /* ---------------- SHARED TASK STATE ---------------- */

  const { tasks, setTasks } = useTasks();

  /* ---------------- LOGIC ---------------- */

  // Toggle important ⭐
  const toggleImportant = (taskId: number) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, important: !task.important }
          : task
      )
    );
  };

  // Toggle completed ✔️
  const toggleCompleted = (taskId: number) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // 🔥 Hide completed tasks
  const visibleTasks = tasks.filter((task: any) => !task.completed);

  /* ---------------- TASK CARD ---------------- */

  const TaskCard = ({ task }: any) => {
    const statusColor = task.important ? "text-blue-600" : "text-gray-500";

    return (
      <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <View className="flex-row justify-between items-start">
          <Text className={`text-sm font-semibold ${statusColor}`}>
            {task.important ? "IMPORTANT" : "TASK"}
          </Text>

          {/* ⭐ IMPORTANT */}
          <TouchableOpacity onPress={() => toggleImportant(task.id)}>
            <Ionicons
              name={task.important ? "star" : "star-outline"}
              size={20}
              color={task.important ? "#2563eb" : "#cbd5e1"}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-lg font-semibold mt-2">{task.title}</Text>

        <Text className="text-gray-500 mt-2">
          Created:{" "}
          {new Date(task.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        <Text className="text-gray-600 mt-1">
          Deadline:{" "}
          {new Date(task.deadline.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>

        {/* ✔️ COMPLETE */}
        <View className="absolute right-4 bottom-4">
          <TouchableOpacity
            onPress={() => toggleCompleted(task.id)}
            className={`p-3 rounded-full ${
              task.completed ? "bg-green-500" : "bg-blue-100"
            }`}
          >
            <Ionicons
              name="checkmark"
              size={18}
              color={task.completed ? "#fff" : "#2563eb"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView className="flex-1 bg-gray-100 px-4">
      {/* Header */}
      <Text className="text-2xl font-bold mt-2">Smart Task Manager</Text>
      <Text className="text-gray-500 mb-4">
        {new Date().toDateString()}
      </Text>

      {/* Filter Tabs (UI only for now) */}
      <View className="flex-row gap-3 mb-6">
        <View className="bg-blue-600 px-4 py-2 rounded-full">
          <Text className="text-white font-medium">All Tasks</Text>
        </View>
        <View className="bg-white px-4 py-2 rounded-full">
          <Text className="text-gray-600">Today</Text>
        </View>
        <View className="bg-white px-4 py-2 rounded-full">
          <Text className="text-gray-600">Important</Text>
        </View>
      </View>

      {/* Task List */}
      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <TaskCard task={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
