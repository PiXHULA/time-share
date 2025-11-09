import WheelPicker from '@quidone/react-native-wheel-picker';
import React from 'react';
import { Text, View } from 'react-native';



type TimeWheelInputSecondsProps = {
  value: number;
  setValue: (value: number) => void;
  values: { label: string; value: number }[];
  label: string;
  borderRadiusLeft?: number;
  borderRadiusRight?: number;
  width?: number;
};

const TimeWheelInputSeconds = ({ value, setValue, values, label, borderRadiusLeft = 0, borderRadiusRight = 0, width }: TimeWheelInputSecondsProps) => {
  let widthValue: number | 'auto' | `${number}%` = width ? `${width}%` : 'auto';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '33%' }}>
      <WheelPicker
        data={values}
        value={value}
        onValueChanged={({ item: { value } }) => setValue(value)}
        enableScrollByTapOnItem={true}
        itemHeight={25}
        width={"100%"}
        overlayItemStyle={{ backgroundColor: 'black',width: 65, paddingBottom: 35, opacity: 0.1, borderWidth: 0, borderTopLeftRadius: borderRadiusLeft, borderTopRightRadius: borderRadiusRight, borderBottomLeftRadius: borderRadiusLeft, borderBottomRightRadius: borderRadiusRight}}
        renderItem={value => {
          return (
            <View>
              {value.item.value < 10 ?
                <Text style={{ color: '#ffffffff', fontSize: 20, paddingLeft: 11 }}>{value.item.label}</Text>
                :
                <Text style={{ color: '#ffffffff', fontSize: 20 }}>{value.item.label}</Text>
              }
            </View>
          )
        }}
      />
      <Text style={{ position: 'absolute', left: 25, top: 57, color: '#ffffffff', fontWeight: 900, fontSize: 16, lineHeight: 16 * 1.1 }}>{label}</Text>
    </View>
  );

};

export default TimeWheelInputSeconds;