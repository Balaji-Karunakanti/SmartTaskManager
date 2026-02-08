import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function AddTaskScreen() {
  /* ---------------- STATES ---------------- */

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [important, setImportant] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTiming, setReminderTiming] = useState("10 mins before");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isValid, setIsValid] = useState(false);

  /* ---------------- TASK ARRAY ---------------- */

  const [tasks, setTasks] = useState<any[]>([]);

  /* ---------------- TEMP DATA (FOR TESTING) ---------------- */

  useEffect(() => {
    const tempTasks = [
      {
        id: 1,
        title: "Buy groceries",
        description: "Milk, Bread, Eggs",
        deadline: {
          date: new Date(),
          time: new Date(),
        },
        important: true,
        reminderEnabled: true,
        reminderTiming: "10 mins before",
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Study React Native",
        description: "Work on Add Task screen",
        deadline: {
          date: new Date(),
          time: new Date(),
        },
        important: false,
        reminderEnabled: false,
        reminderTiming: null,
        createdAt: new Date(),
      },
    ];

    setTasks(tempTasks);
    console.log("Initial Tasks:", tempTasks);
  }, []);

  /* ---------------- VALIDATION ---------------- */

  useEffect(() => {
    setIsValid(title.trim().length > 0);
  }, [title]);

  /* ---------------- HANDLER ---------------- */

  const handleCreateTask = () => {
    if (!isValid) return;

    const newTask = {
      id: Date.now(), // simple unique id
      title,
      description,
      deadline: {
        date,
        time,
      },
      important,
      reminderEnabled,
      reminderTiming: reminderEnabled ? reminderTiming : null,
      createdAt: new Date(),
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);

    console.log("New Task Added:", newTask);
    console.log("All Tasks:", [...tasks, newTask]);

    // reset form (optional but logical)
    setTitle("");
    setDescription("");
    setImportant(false);
    setReminderEnabled(false);
    setDate(new Date());
    setTime(new Date());
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView className="flex flex-1">
      <View className="flex-row items-center py-4">
        <TouchableOpacity className="ml-4" onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center font-semibold text-lg mr-10">
          Add New Task
        </Text>
      </View>

      <View className="flex-1 bg-white px-5 pt-4">
        {/* -------- Task Title -------- */}
        <Text className="text-base font-semibold mb-1">
          Task Title <Text className="text-red-500">*</Text>
        </Text>
        <TextInput
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          className="border border-gray-300 rounded-xl px-4 py-3 text-base mb-4"
        />

        {/* -------- Description -------- */}
        <Text className="text-base font-semibold mb-1">Description</Text>
        <TextInput
          placeholder="Add task details..."
          value={description}
          onChangeText={setDescription}
          multiline
          className="border border-gray-300 rounded-xl px-4 py-4 h-28 text-base mb-6"
        />

        {/* -------- Deadline -------- */}
        <Text className="text-lg font-semibold mb-3">Deadline</Text>

        <View className="flex-row gap-4 mb-6">
          {/* Date */}
          <View className="flex-1">
            <Text className="font-medium mb-1">
              Date <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between items-center"
            >
              <Text>{date.toDateString()}</Text>
              <Ionicons name="calendar-outline" size={20} />
            </TouchableOpacity>
          </View>

          {/* Time */}
          <View className="flex-1">
            <Text className="font-medium mb-1">
              Time <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="border border-gray-300 rounded-xl px-4 py-3 flex-row justify-between items-center"
            >
              <Text>
                {time.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
              <Ionicons name="time-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* -------- Important -------- */}
        <View className="flex-row justify-between items-center bg-gray-50 rounded-xl px-4 py-4 mb-3">
          <View className="flex-row items-center gap-3">
            <Ionicons name="star" size={22} color="#facc15" />
            <Text className="text-base font-medium">Mark as Important</Text>
          </View>
          <Switch value={important} onValueChange={setImportant} />
        </View>

        {/* -------- Reminder -------- */}
        <View className="bg-gray-50 rounded-xl px-4 py-4 mb-4">
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-3">
              <Ionicons name="notifications" size={22} color="#2563eb" />
              <Text className="text-base font-medium">Enable Reminder</Text>
            </View>
            <Switch
              value={reminderEnabled}
              onValueChange={setReminderEnabled}
            />
          </View>

          {reminderEnabled && (
            <View className="flex-row justify-between mt-4">
              <Text className="text-gray-500">Reminder Timing</Text>
              <Text className="text-blue-600 font-medium">
                {reminderTiming}
              </Text>
            </View>
          )}
        </View>

        {/* -------- Created Date -------- */}
        <Text className="text-center text-gray-400 mb-6">
          Created on: {new Date().toDateString()}
        </Text>

        {/* -------- Create Button -------- */}
        <TouchableOpacity
          disabled={!isValid}
          onPress={handleCreateTask}
          className={`flex-row justify-center items-center py-4 rounded-2xl ${
            isValid ? "bg-blue-600" : "bg-blue-300"
          }`}
        >
          <Ionicons name="checkmark-circle" size={22} color="#fff" />
          <Text className="text-white text-lg font-semibold ml-2">
            Create Task
          </Text>
        </TouchableOpacity>

        {/* -------- Date Picker -------- */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={(_: any, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        {/* -------- Time Picker -------- */}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            onChange={(_: any, selectedTime?: Date) => {
              setShowTimePicker(false);
              if (selectedTime) setTime(selectedTime);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
