import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  FlatList, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

export default function App() {
  // --- PART 1 STATES (Already Completed) ---
  const [xp, setXp] = useState(0);
  const [mood, setMood] = useState('Calm'); // Calm or Creative
  
  // --- PART 2 STATES (New Features) ---
  // Daily Quests State
  const [quests, setQuests] = useState([
    { id: '1', text: 'Meditate for 10 minutes', completed: false, xpReward: 20 },
    { id: '2', text: 'Write 3 creative ideas', completed: false, xpReward: 30 },
    { id: '3', text: 'Drink 3L water today', completed: false, xpReward: 15 },
  ]);

  // Creative Chat Feed State
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to the Anti-Algorithm Space. No trends, just pure thoughts.', sender: 'System' },
  ]);
  const [inputText, setInputText] = useState('');

  // --- LEVEL PROGRESSION LOGIC ---
  const getLevel = (currentXp) => {
    if (currentXp >= 150) return 'Cyber Overlord';
    if (currentXp >= 60) return 'Cosmos';
    return 'Novice';
  };

  // --- HANDLERS ---
  // Complete a Quest & Earn XP
  const toggleQuest = (id, completed, xpReward) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
    if (!completed) {
      setXp(prevXp => prevXp + xpReward);
    } else {
      setXp(prevXp => Math.max(0, prevXp - xpReward));
    }
  };

  // Send Chat Message
  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMsg = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'User'
    };
    setMessages([newMsg, ...messages]); // Newest messages on top
    setInputText('');
    setXp(prevXp => prevXp + 5); // Reward 5 XP for creative expression
  };

  // Dynamic Background Base Color
  const backgroundColor = mood === 'Calm' ? '#0F172A' : '#1E1B4B'; // Deep Slate vs Deep Purple

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* --- HEADER & LEVEL ENGINE --- */}
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>SilvrAI</Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{getLevel(xp)}</Text>
          </View>
          <Text style={styles.xpText}>XP: {xp}</Text>
        </View>

        {/* --- MOOD SWITCHER --- */}
        <View style={styles.moodContainer}>
          <Text style={styles.sectionTitle}>Current Mood</Text>
          <View style={styles.row}>
            <TouchableOpacity 
              style={[styles.moodButton, mood === 'Calm' && styles.activeCalm]} 
              onPress={() => setMood('Calm')}
            >
              <Text style={styles.buttonText}>🧘 Calm</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.moodButton, mood === 'Creative' && styles.activeCreative]} 
              onPress={() => setMood('Creative')}
            >
              <Text style={styles.buttonText}>🎨 Creative</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* --- DAILY QUESTS (TASK LIST BOX) --- */}
        <View style={styles.cardBox}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          {quests.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.questItem, item.completed && styles.questCompleted]}
              onPress={() => toggleQuest(item.id, item.completed, item.xpReward)}
            >
              <Text style={[styles.questText, item.completed && styles.textCrossed]}>
                {item.completed ? '✅ ' : '🔲 '} {item.text}
              </Text>
              <Text style={styles.xpRewardText}>+{item.xpReward} XP</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* --- CREATIVE SPACE (CHAT FEED) --- */}
        <View style={styles.cardBox}>
          <Text style={styles.sectionTitle}>Creative Space Chat</Text>
          
          {/* Chat Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Share an unfiltered thought..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Post</Text>
            </TouchableOpacity>
          </View>

          {/* Chat Feed List */}
          <View style={styles.chatFeed}>
            {messages.map((msg) => (
              <View key={msg.id} style={[styles.msgBubble, msg.sender === 'User' ? styles.userMsg : styles.systemMsg]}>
                <Text style={styles.msgText}>{msg.text}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    letterSpacing: 2,
  },
  badgeContainer: {
    backgroundColor: '#38BDF8',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 8,
  },
  badgeText: {
    color: '#0F172A',
    fontWeight: 'bold',
    fontSize: 14,
  },
  xpText: {
    color: '#94A3B8',
    marginTop: 6,
    fontSize: 16,
    fontWeight: '600',
  },
  moodContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F1F5F9',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'between',
  },
  moodButton: {
    flex: 1,
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeCalm: {
    backgroundColor: '#0284C7',
  },
  activeCreative: {
    backgroundColor: '#7C3AED',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardBox: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#334155',
  },
  questItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#334155',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  questCompleted: {
    backgroundColor: '#1E293B',
    opacity: 0.6,
    borderColor: '#475569',
    borderWidth: 1,
  },
  questText: {
    color: '#F8FAFC',
    fontSize: 14,
    flex: 1,
  },
  textCrossed: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  xpRewardText: {
    color: '#34D399',
    fontWeight: 'bold',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 14,
    color: '#FFFFFF',
    height: 45,
  },
  sendButton: {
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  chatFeed: {
    marginTop: 5,
  },
  msgBubble: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '100%',
  },
  userMsg: {
    backgroundColor: '#4338CA',
    alignSelf: 'flex-start',
  },
  systemMsg: {
    backgroundColor: '#475569',
    alignSelf: 'flex-start',
  },
  msgText: {
    color: '#F8FAFC',
    fontSize: 14,
  },
});
