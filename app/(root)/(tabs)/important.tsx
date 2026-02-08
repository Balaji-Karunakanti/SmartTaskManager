import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTasks } from "@/context/TaskContext";

export default function ImportantScreen() {

  const { tasks, setTasks } = useTasks();



  
  const importantTasks = tasks.filter(
  (task: any) => task.important === true && task.completed !== true
);



  const toggleImportant = (taskId: number) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, important: !task.important }
          : task
      )
    );
  };


  const toggleCompleted = (taskId: number) => {
    setTasks((prevTasks: any[]) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  /* ---------------- TASK CARD ---------------- */

  const TaskCard = ({ task }: any) => {
    return (
      <View
        className={`rounded-2xl p-4 mb-4 ${
          task.completed
            ? "border border-dashed border-gray-300 bg-gray-50"
            : "bg-white shadow-sm"
        }`}
      >
        <View className="flex-row items-center justify-between">
         
          <View className="flex-row items-center gap-3">
    
            <TouchableOpacity onPress={() => toggleImportant(task.id)}>
              <Ionicons name="star" size={22} color="#2563eb" />
            </TouchableOpacity>

            <View>
              <Text
                className={`text-base font-semibold ${
                  task.completed ? "line-through text-gray-400" : "text-black"
                }`}
              >
                {task.title}
              </Text>

              <Text
                className={`text-sm ${
                  task.completed ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {task.completed
                  ? "Completed"
                  : `Due ${new Date(
                      task.deadline.time
                    ).toLocaleString([], {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`}
              </Text>
            </View>
          </View>

          {/* ✔️ Complete */}
          <TouchableOpacity
            onPress={() => toggleCompleted(task.id)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center ${
              task.completed
                ? "bg-blue-600 border-blue-600"
                : "border-gray-300"
            }`}
          >
            {task.completed && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView className="flex-1 mt-2 bg-white px-5">
      {/* Header */}
      <View className="flex-row justify-between items-center mt-2 mb-1">
        <Text className="text-2xl font-bold">Important</Text>
        <Ionicons name="ellipsis-horizontal" size={22} color="#000" />
      </View>

      <Text className="text-gray-500 mb-6">Starred tasks</Text>

      {/* Empty state */}
      {importantTasks.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons
            name="star-outline"
            size={48}
            color="#cbd5e1"
          />
          <Text className="text-gray-400 mt-4">
            No important tasks
          </Text>
        </View>
      ) : (
        <FlatList
          data={importantTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TaskCard task={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
