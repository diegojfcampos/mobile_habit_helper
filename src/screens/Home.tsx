import { View, Text, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { Loading } from "../components/loading";
import { HabitDay, daySize } from "../components/HabitDay";
import { generateYearDates } from "../utils/generate-year-dates";
import { useNavigation } from "@react-navigation/native";
import { api } from "../lib/axios";
import { useState, useEffect } from "react";
import dayjs from "dayjs";



const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const datesFromYearStart =  generateYearDates();
const minumumSummaryDays = 18 * 5;
const amountDaysToFill = minumumSummaryDays - datesFromYearStart.length;

export function Home(){

    const [loading, setLoading] = useState(true)
    const [summary, setSummary] = useState(null)

    const { navigate } = useNavigation();
    
    async function fetchData(){
        try{
            setLoading(true);
            const response = await api.get('/summary');
            setSummary(response.data.summary)
            Alert.alert(response.data.summary)
            console.log(response.data.summary)
            

        }catch(error){
            Alert.alert('Error to loead habits summary')
            console.log(error);
        } finally{
            setLoading(false);
        }        
    }
    
    /*
    async function fetchDataTest(){
       
            const response = await api.get('/summary');
            console.log(response.data)
            Alert.alert(response.data)
    }
    */
    useEffect(() => {
        fetchData();
    },[]);

    if(!loading){
        return(
            <Loading/>
        )
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <Header/>
            <View className="flex-row mt-6 mb-2">
                {
                    weekDays.map((weekDay, index) => (
                        <Text 
                            key={`${weekDay}-${index}`}
                            className="text-zinc-400 text-xl font-bold text-center mx-1"
                            style={{width: daySize}}
                        >
                            {weekDay}
                        </Text>
                    ))
                }
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{paddingBottom: 50}}
            >
                <View className="flex-row flex-wrap">
                    {
                        datesFromYearStart.map(date => {
                            const dayWithHabits = summary.find(day => {
                               return dayjs(date).isSame(day.date, 'day')
                            })

                            return (
                                <HabitDay 
                                    key={date.toISOString()}
                                    onPress={() => navigate('habit', {date: date.toISOString()})}
                                />
                            
                            )
                        })
                    }

                    {
                        amountDaysToFill > 0 && Array.from({length: amountDaysToFill})
                        .map((_ , index) => (
                            <view 
                                key={index}
                                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            />
                        ))            
                    }
                </View>
            </ScrollView>
        </View>
    )
}