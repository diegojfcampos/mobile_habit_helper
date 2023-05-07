import { View, ScrollView, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { CheckBox } from "../components/CheckBox";

interface Params{
  date: string;
}

export function Habit(){
  const route = useRoute();
  const { date } = route.params as Params; 
  const parsedDAte = dayjs(date);
  const dayOfWeek = parsedDAte.format('dddd');
  const dayAndMonth = parsedDAte.format('DD/MM');
  return(
  <View className="flex-1 bg-background px-8 pt-16">
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{paddingBottom: 50}}
    >
      <BackButton/>

      <Text className="mt-6 font-semibold text-zinc-400 text-base lowercase">
        {dayOfWeek}
      </Text>

      <Text className="font-extrabold text-white text-3xl">
        {dayAndMonth}
      </Text>

    <ProgressBar progress={70}/>

    <View className="mt-6">
      <CheckBox 
        title="Sleep at least 8 hours"
        checked={false}
      />
    </View>

    <View className="mt-6">
      <CheckBox 
        title="Decode at least 2h"
        checked={false}
      />
    </View>

    <View className="mt-6">
      <CheckBox 
        title="1h of physical exercises"
        checked={false}
      />
    </View>

    </ScrollView>

  </View> 
  )
}