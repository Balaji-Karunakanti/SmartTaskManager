import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex flex-1 justify-center items-center"
    >
     <Link href ='/(root)/(tabs)/Archive'>Archive</Link>
    </View>
  );
}
