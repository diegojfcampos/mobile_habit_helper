import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const availableWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function New(){

  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToogleWeekDays(weekDayIndex: number){
    if(!weekDays.includes(weekDayIndex)){
        setWeekDays(prevState => prevState.filter(weekDay =>  weekDay !== weekDayIndex));
    }else{
        setWeekDays(prevState => [...prevState, weekDayIndex]);
    }

  }

  return(
  <View className="flex-1 bg-background px-8 pt-16">
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 20}}
    >

      <BackButton />

      <Text className="mt-6 text-white font-extraBold text-3xl">
        Create Habit
      </Text>

      <Text className="mt-6 text-white font-semiBold text-base">
        Are you commited?
      </Text>

      <TextInput 
        className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
        placeholder="Sleep 8 hours"
        placeholderTextColor={colors.zinc[400]}
      />

      <Text className="font-semibold mt-4 mb-3 text-white text-base">How Often?</Text>

      {
        availableWeekDays.map((weekDay, index) => (
          <CheckBox 
            key={weekDay} 
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToogleWeekDays(index)}
          />
        ))
    }      
    <TouchableOpacity 
      activeOpacity={0.7}
      className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
    >
      <Feather
        name="check"
        size={20}
        color={colors.white}
      />

      <Text className="font-semibold text-base text-white ml-2 ">
        Save
      </Text>
      
    </TouchableOpacity>

    </ScrollView>
  </View> 
  )
}