import { Pressable, Text } from "react-native"
import { colors, styles } from "../../config/app-theme"

interface Props{
    label: string;
    color?: string;
    doubleSize?: boolean;
    isLeft?: boolean;
    paddingZero?: boolean;
    blackText?: boolean;
    onPress: () => void;
}

export const CalculatorButton = ({
    label,
    color = colors.darkGray,
    doubleSize = false,
    isLeft = false,
    paddingZero = false,
    blackText = false,
    onPress,
} : Props) => {
  return (
    <Pressable 
    onPress={() => onPress()}
    style={({pressed}) => ({
        ...styles.button,
        backgroundColor: color,
        width:(doubleSize) ? 180: 80,
        opacity: (pressed) ? 0.5 : 1,
        alignItems: (isLeft) ? "flex-start" : "center",
        paddingLeft: (paddingZero) ? 20 : 0,
    })}> 
        <Text style={{
            ...styles.buttonText,
            color: (blackText) ? 'black' : 'white'
        }}>{label}</Text>
     </Pressable>
  )
}
