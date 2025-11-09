import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedProps,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

type CircularProps = {
  remainingSecs: number;
  totalSecs: number;
  displayEndTime: string | null;
  displayTimeLeft: string;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const RADIUS = 140;

const CircularTimer = ({ remainingSecs, totalSecs, displayEndTime, displayTimeLeft }: CircularProps) => {
  const radius = 140;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = 2 * Math.PI * normalizedRadius;

  // Shared progress value (1 = full circle, 0 = empty)
  const progress = useSharedValue(remainingSecs / totalSecs);

  useEffect(() => {
    cancelAnimation(progress);

    // Start from the current percentage of remaining time
    progress.value = remainingSecs / totalSecs;

    // Animate smoothly to 0 (empty) over the remaining duration
    progress.value = withTiming(0, {
      duration: remainingSecs * 1000, // full remaining time in ms
      easing: Easing.linear,
    });
  }, [remainingSecs]);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 + progress.value),
    };
  });

  return (
    <View style={styles.circleTimerContainer}>
      <View style={styles.circleContainer}>
        <Svg height={RADIUS * 2} width={RADIUS * 2}>
          {/* Background Ring */}
          <Circle
            stroke="#B9AAFF33"
            fill="none"
            cx={RADIUS}
            cy={RADIUS}
            r={normalizedRadius}
            strokeWidth={strokeWidth}
          />

          {/* Animated Foreground Ring */}
          <AnimatedCircle
            stroke="#B9AAFF"
            fill="none"
            cx={RADIUS}
            cy={RADIUS}
            r={normalizedRadius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
            rotation="-90"
            origin={`${RADIUS}, ${RADIUS}`}
          />
        </Svg>
      </View>
      <Text style={styles.circleEndTimeText}>{displayEndTime}</Text>
      <Text style={styles.circleTimeLeftText}>{displayTimeLeft}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  circleTimerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: RADIUS * 2,
    width: RADIUS * 2,
  },
  circleContainer: {
    position: 'absolute',
  },
  circleEndTimeText: {
    position: 'absolute',
    top: RADIUS / 4,
    color: '#B9AAFF',
    fontSize: 24,
    lineHeight: 24 * 1.1,
    fontVariant: ['tabular-nums']
  },
  circleTimeLeftText: {
    fontSize: 48,
    fontVariant: ['tabular-nums'],
    lineHeight: 65 * 1.1,
    numberOfLines: 1,
    adjustsFontSizeToFit: true,
    color: '#B9AAFF',
  },
});

export default CircularTimer;