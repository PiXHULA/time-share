import WheelPicker from '@quidone/react-native-wheel-picker';
import React from 'react';
import { Text, View } from 'react-native';



type TimeWheelInputProps = {
  value: number;
  setValue: (value: number) => void;
  values: { label: string; value: number }[];
  label: string;
  borderRadiusLeft?: number;
  borderRadiusRight?: number;
  width?: number;
};

const TimeWheelInput = ({ value, setValue, values, label, borderRadiusLeft = 0, borderRadiusRight = 0, width }: TimeWheelInputProps) => {
  let widthValue: number | 'auto' | `${number}%` = width ? `${width}%` : 'auto';
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '25%', padding: 0 }}>
      <WheelPicker
        data={values}
        value={value}
        onValueChanged={({ item: { value } }) => setValue(value)}
        enableScrollByTapOnItem={true}
        itemHeight={25}
        width={widthValue}
        overlayItemStyle={{ opacity: 0.3, paddingBottom: 35, borderWidth: 0, borderTopLeftRadius: borderRadiusLeft, borderTopRightRadius: borderRadiusRight, borderBottomLeftRadius: borderRadiusLeft, borderBottomRightRadius: borderRadiusRight}}
        renderItem={value => {
          return (
            <View style={{ backgroundColor: 'transparent'}}>
              {value.item.value < 10 ?
                <Text style={{ backgroundColor: 'transparent', color: '#ffffffff', fontSize: 20, paddingLeft: 22 }}>{value.item.label}</Text>
                :
                <Text style={{ color: '#ffffffff', fontSize: 20, paddingLeft: 12 }}>{value.item.label}</Text>
              }
            </View>
          )
        }}
      />
      <Text style={{ position: 'absolute', left: 36, top: 57, color: '#ffffffff', fontWeight: 900, fontSize: 16, lineHeight: 16 * 1.1 }}>{label}</Text>
    </View>
  );

};

export default TimeWheelInput;