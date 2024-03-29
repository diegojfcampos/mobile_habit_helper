import { TouchableOpacity, Dimensions, TouchableOpacityProps} from 'react-native'

const weekDays = 7;
const screenHorinzontalPadding = (32 * 2) / 5;
export const dayMarginBetween = 8;
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorinzontalPadding  + 5);


interface Props extends TouchableOpacityProps{};


export function HabitDay({...rest}: Props){
    return(
        <TouchableOpacity activeOpacity={0.6}
            className="bg-zinc-900  rounded-lg border-2 m-1 border-zinc-800"
            style={{width: daySize, height: daySize}}
            {...rest}
        />     
    );
}