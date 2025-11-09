import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, Share, StatusBar, StyleSheet, Text, Vibration, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// ...



const hour = [...Array(24).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}))
const min = [...Array(60).keys()].map((index) => ({
  value: index,
  label: index.toString(),
}))


import { useAudioPlayer } from 'expo-audio';
import * as Linking from 'expo-linking';

import TimeWheelInput from '@/components/time-wheel-input';
import TimeWheelInputSeconds from '@/components/time-wheel-input-seconds';
import CircularTimer from '../../components/circular-timer';

const audioSource = require('../../assets/mixkit-data-scaner-2847.mp3');

const formatted = (num: number) => (num < 10 ? `0${num}` : num);

export default function SharedTimer() {
  const [remainingSecs, setRemainingSecs] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hours, setHours] = useState(0); //SÄTT IHOP MIG
  const [minutes, setMinutes] = useState(0); //SÄTT IHOP MIG OCKSÅ
  const [seconds, setSeconds] = useState(0); //SÄTT IHOP MIG OCKSÅ
  const [startTime, setStartTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const [value, setValue] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const alarmAudioPlayer = useAudioPlayer(audioSource);

  const displayTimeLeft = (time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = Math.floor(time % 60);
    return `${formatted(hrs)}:${formatted(mins)}:${formatted(secs)}`;
  };

  const displayDuration = () => {
    if (!duration) return null;

    const hrs = Math.floor(duration / 3600);
    const mins = Math.floor((duration % 3600) / 60);
    const secs = Math.floor(duration % 60);

    const parts: string[] = [];

    // Only show hours if > 0
    if (hrs > 0) parts.push(`${hrs} hour${hrs > 1 ? 's' : ''}`);
    // Only show minutes if > 0 or if there are hours (so "1 hour 0 min" becomes "1 hour")
    if (mins > 0 || (hrs > 0 && mins > 0)) parts.push(`${mins} min${mins > 1 ? 's' : ''}`);
    // Show seconds only if no hours
    if (hrs === 0 && secs > 0) parts.push(`${secs} sec${secs > 1 ? 's' : ''}`);

    return parts.join(' ');
  };

  const displayEndTime = () => {
    let endtime = startTime && duration ? startTime + duration * 1000 : null;
    return endtime ? `${formatted(new Date(endtime).getHours())}:${formatted(new Date(endtime).getMinutes())}` : null;
  }

  // ⏱️ Start local timer
  const startTimer = () => {
    const total = Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);
    if (total <= 0) return;
    setDuration(total);
    setStartTime(Date.now());
    setRemainingSecs(total);
    setIsActive(true);
  };

  // 🕊️ Share button
  const shareTimer = async () => {
    if (!startTime || !duration) return;

    const link = Linking.createURL('/', {
      queryParams: {
        t: startTime.toString(),
        d: duration.toString(),
      },
    });

    await Share.share({
      message: `Open this link in Expo Go to join my timer:\n\n${link}`,
    });
  };

  // 🔗 Handle incoming links (when opened from Expo Go)
  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      const { queryParams } = Linking.parse(event.url);
      const t = Number(queryParams?.t);
      const d = Number(queryParams?.d);
      if (t && d) {
        const elapsed = (Date.now() - t) / 1000;
        const remaining = Math.max(d - elapsed, 0);
        setRemainingSecs(remaining);
        setIsActive(true);
        setStartTime(t);
        setDuration(d);
      }
    };

    const sub = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });

    return () => sub.remove();
  }, []);

  // ⏳ Countdown logic
  useEffect(() => {
    let interval: any;
    if (isActive && remainingSecs > 0) {
      interval = setInterval(() => {
        setRemainingSecs((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsActive(false);
            Vibration.vibrate(2000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);

  const resetTimer = () => {
    setIsActive(false);
    setRemainingSecs(0);
    setDuration(null);
    setStartTime(null);
  };

  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }} >
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.inputContainer}>
          {isActive
            ? <>
              <Text style={{ color: '#B9AAFF', fontSize: 16, lineHeight: 16 * 1.1, fontVariant: ['tabular-nums'], paddingBottom: 25 }}>{duration ? `Duration: ${displayDuration()}` : 'Set Duration'}</Text>
              <CircularTimer displayEndTime={displayEndTime()} displayTimeLeft={displayTimeLeft(remainingSecs)} remainingSecs={remainingSecs} totalSecs={duration}></CircularTimer>
            </>
            : <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingLeft: 30 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                <TimeWheelInput value={hours} setValue={setHours} values={hour} label='timmar' borderRadiusLeft={15} width={100} />
                <TimeWheelInput value={minutes} setValue={setMinutes} values={min} label='min' width={100} />
                <TimeWheelInputSeconds value={seconds} setValue={setSeconds} values={min} label='sek' borderRadiusRight={15} />
              </View>
            </View>
          }
        </View>

        <View style={styles.outerButtonContainer}>
          <View style={styles.innerButtonContainer}>

            {/* Controls */}
            <Pressable style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.resetButton]}
              // onPress={() => {
              //   alarmAudioPlayer.seekTo(0);
              //   alarmAudioPlayer.play();
              // }}
              onPress={resetTimer}
            >
              <Text style={[styles.buttonText, styles.resetText]}>Reset</Text>
            </Pressable>
          </View>

          <Pressable
            style={[styles.button, styles.shareButton]}
            onPress={shareTimer}
            disabled={!duration}
          >
            <Ionicons name="share-outline" color="#2ECC71" size={60} />
          </Pressable>
        </View>
      </View>
    </Pressable >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0e11ff'
  },
  inputContainer: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 55,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#B9AAFF',
    color: '#FFF',
    fontSize: 28,
    width: 60,
    textAlign: 'center',
  },
  outerButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  innerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20
  },
  button: {
    borderWidth: 4,
    borderColor: '#B9AAFF',
    backgroundColor: '#B9AAFF',
    borderRadius: 100,
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: 900,
    color: '#0f0e11ff',
    textAlign: 'center'
  },
  shareButton: {
    borderColor: '#2ECC71',
    backgroundColor: 'transparent',
    width: 150,
    height: 150,
  },
  shareText: {
    color: '#2ECC71'
  },
  resetButton: {
    borderColor: '#FF851B',
    backgroundColor: 'transparent'
  },
  resetText: {
    fontSize: 26,
    color: '#FF851B'
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
