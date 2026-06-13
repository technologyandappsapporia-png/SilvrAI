import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(3); // Dummy initial streak for layout

  const handleInteraction = (gainedPoints) => {
    const newPoints = points + gainedPoints;
    setPoints(newPoints);

    // Evolution logic for level system
    if (newPoints >= 200) {
      setLevel(3);
    } else if (newPoints >= 80) {
      setLevel(2);
    }
  };

  // Dynamic status bar colors matching premium themes
  const getThemeColor = () => {
    if (level === 3) return '#1e1b4b'; // Deep Space Blue
    if (level === 2) return '#311042'; // Cosmic Purple
    return '#0f172a'; // Sleek Dark Slate
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: getThemeColor() }]}>
      <StatusBar barStyle="light-content" />
      
      {/* Premium Header Architecture */}
      <View style={styles.header}>
        <Text style={styles.logo}>SilvrAI</Text>
        <View style={styles.statsContainer}>
          <View style={styles.badge}><Text style={styles.streakText}>🔥 {streak}</Text></View>
          <View style={styles.badge}><Text style={styles.pointsText}>✨ {points} DP</Text></View>
        </View>
      </View>

      {/* Mature Level Banner */}
      <View style={styles.levelBanner}>
        <Text style={styles.levelText}>
          {level === 1 && "RANK: NOVICE SYSTEM"}
          {level === 2 && "RANK: ADVANCED COSMOS"}
          {level === 3 && "RANK: CYBER OVERLORD"}
        </Text>
      </View>

      {/* Center Zone: Circular Interactive Avatar */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarCircle, { borderColor: level === 3 ? '#10b981' : level === 2 ? '#ec4899' : '#a855f7' }]}>
          <Text style={styles.avatarEmoji}>
            {level === 3 ? '👑' : level === 2 ? '⚡' : '🤖'}
          </Text>
        </View>
        <Text style={styles.subtitle}>System Frequency Tuned. Select state:</Text>
      </View>

      {/* Mature Styled Mobile Action Buttons */}
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={[styles.btn, styles.btnCalm]} onPress={() => handleInteraction(15)}>
          <Text style={styles.btnText}>Calm Mode (+15)</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.btn, styles.btnCreative]} onPress={() => handleInteraction(25)}>
          <Text style={styles.btnText}>Creative Focus (+25)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  logo: { fontSize: 26, fontWeight: '900', color: '#f8fafc', letterSpacing: 1 },
  statsContainer: { flexDirection: 'row', gap: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.08)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  streakText: { color: '#f97316', fontWeight: 'bold', fontSize: 14 },
  pointsText: { color: '#c084fc', fontWeight: 'bold', fontSize: 14 },
  levelBanner: { backgroundColor: 'rgba(255,255,255,0.03)', paddingVertical: 8, borderRadius: 12, alignItems: 'center', marginVertical: 15 },
  levelText: { color: '#94a3b8', fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  avatarContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatarCircle: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.02)', borderWidth: 3, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 5 },
  avatarEmoji: { fontSize: 55 },
  subtitle: { color: '#64748b', marginTop: 25, fontSize: 15, fontWeight: '600', textAlign: 'center' },
  buttonGrid: { flexDirection: 'row', gap: 15, marginBottom: 35 },
  btn: { flex: 1, paddingVertical: 16, borderRadius: 16, alignItems: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, elevation: 4 },
  btnCalm: { backgroundColor: '#0284c7' },
  btnCreative: { backgroundColor: '#db2777' },
  btnText: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 }
});
