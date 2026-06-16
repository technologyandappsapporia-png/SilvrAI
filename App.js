import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [xp, setXp] = useState(0);
  const [mood, setMood] = useState('Calm'); 
  const [quests, setQuests] = useState([
    { id: '1', text: 'Meditate for 10 minutes', completed: false, xpReward: 20 },
    { id: '2', text: 'Write 3 creative ideas', completed: false, xpReward: 30 },
  ]);
  const [newQuestText, setNewQuestText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Welcome to the Anti-Algorithm Space. No trends, just pure thoughts.', sender: 'System' },
  ]);
  const [inputText, setInputText] = useState('');

  const getLevel = (currentXp) => {
    if (currentXp >= 150) return 'Cyber Overlord';
    if (currentXp >= 60) return 'Cosmos';
    return 'Novice';
  };

  const addQuest = () => {
    if (newQuestText.trim() === '') return;
    const newQuest = { id: Date.now().toString(), text: newQuestText, completed: false, xpReward: 25 };
    setQuests([...quests, newQuest]);
    setNewQuestText('');
  };

  const toggleQuest = (id, completed, xpReward) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
    if (!completed) { setXp(prevXp => prevXp + xpReward); } 
    else { setXp(prevXp => Math.max(0, prevXp - xpReward)); }
  };

  const deleteQuest = (id, completed, xpReward) => {
    if (completed) { setXp(prevXp => Math.max(0, prevXp - xpReward)); }
    setQuests(quests.filter(q => q.id !== id));
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    const newMsg = { id: Date.now().toString(), text: inputText, sender: 'User' };
    setMessages([newMsg, ...messages]);
    setInputText('');
    setXp(prevXp => prevXp + 5);
  };

  const deleteMessage = (id, sender) => {
    if (sender === 'User') { setXp(prevXp => Math.max(0, prevXp - 5)); }
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const backgroundColor = mood === 'Calm' ? '#0F172A' : '#1E1B4B';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>SilvrAI</Text>
          <View style={styles.badgeContainer}><Text style={styles.badgeText}>{getLevel(xp)}</Text></View>
          <Text style={styles.xpText}>XP: {xp}</Text>
        </View>
        <View style={styles.moodContainer}>
          <Text style={styles.sectionTitle}>Current Mood</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.moodButton, mood === 'Calm' && styles.activeCalm]} onPress={() => setMood('Calm')}><Text style={styles.buttonText}>🧘 Calm</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.moodButton, mood === 'Creative' && styles.activeCreative]} onPress={() => setMood('Creative')}><Text style={styles.buttonText}>🎨 Creative</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.sectionTitle}>Daily Quests</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Create a custom quest..." placeholderTextColor="#94A3B8" value={newQuestText} onChangeText={setNewQuestText} />
            <TouchableOpacity style={styles.addButton} onPress={addQuest}><Text style={styles.buttonTextInside}>+ Add</Text></TouchableOpacity>
          </View>
          {quests.map((item) => (
            <View key={item.id} style={[styles.questItem, item.completed && styles.questCompleted]}>
              <TouchableOpacity style={styles.questTextContainer} onPress={() => toggleQuest(item.id, item.completed, item.xpReward)}>
                <Text style={[styles.questText, item.completed && styles.textCrossed]}>{item.completed ? '✅ ' : '🔲 '} {item.text}</Text>
                <Text style={styles.xpRewardText}>+{item.xpReward} XP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteQuest(item.id, item.completed, item.xpReward)}><Text style={styles.deleteIcon}>❌</Text></TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.cardBox}>
          <Text style={styles.sectionTitle}>Creative Space Chat</Text>
          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder="Share an unfiltered thought..." placeholderTextColor="#94A3B8" value={inputText} onChangeText={setInputText} />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}><Text style={styles.buttonTextInside}>Post</Text></TouchableOpacity>
          </View>
          <View style={styles.chatFeed}>
            {messages.map((msg) => (
              <View key={msg.id} style={[styles.msgBubbleRow, msg.sender === 'User' ? styles.userMsgRow : styles.systemMsgRow]}>
                <View style={styles.msgTextContainer}><Text style={styles.msgText}>{msg.text}</Text></View>
                <TouchableOpacity style={styles.chatDeleteButton} onPress={() => deleteMessage(msg.id, msg.sender)}><Text style={styles.chatDeleteIcon}>🗑️</Text></TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 40 },
  headerContainer: { alignItems: 'center', marginBottom: 25, marginTop: 10 },
  appTitle: { fontSize: 32, fontWeight: 'bold', color: '#F8FAFC', letterSpacing: 2 },
  badgeContainer: { backgroundColor: '#38BDF8', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginTop: 8 },
  badgeText: { color: '#0F172A', fontWeight: 'bold', fontSize: 14 },
  xpText: { color: '#94A3B8', marginTop: 6, fontSize: 16, fontWeight: '600' },
  moodContainer: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#F1F5F9', marginBottom: 12 },
  row: { flexDirection: 'row' },
  moodButton: { flex: 1, backgroundColor: '#334155', padding: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 5 },
  activeCalm: { backgroundColor: '#0284C7' },
  activeCreative: { backgroundColor: '#7C3AED' },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
  cardBox: { backgroundColor: '#1E293B', borderRadius: 16, padding: 16, marginBottom: 25, borderWidth: 1, borderColor: '#334155' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, width: '100%' },
  input: { flex: 1, backgroundColor: '#334155', borderRadius: 12, paddingHorizontal: 16, color: '#FFFFFF', height: 42, fontSize: 13 },
  addButton: { backgroundColor: '#10B981', justifyContent: 'center', alignItems: 'center', height: 34, paddingHorizontal: 12, borderRadius: 8, marginLeft: 8 },
  sendButton: { backgroundColor: '#6366F1', justifyContent: 'center', alignItems: 'center', height: 34, paddingHorizontal: 14, borderRadius: 8, marginLeft: 8 },
  buttonTextInside: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  questItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#334155', padding: 14, borderRadius: 10, marginBottom: 10 },
  questTextContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1, marginRight: 10 },
  questCompleted: { backgroundColor: '#1E293B', opacity: 0.6, borderColor: '#475569', borderWidth: 1 },
  questText: { color: '#F8FAFC', fontSize: 14, flex: 1 },
  textCrossed: { textDecorationLine: 'line-through', color: '#94A3B8' },
  xpRewardText: { color: '#34D399', fontWeight: 'bold', fontSize: 12, marginHorizontal: 8 },
  deleteButton: { padding: 5 },
  deleteIcon: { fontSize: 14 },
  chatFeed: { marginTop: 5 },
  msgBubbleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 12, marginBottom: 8, width: '100%' },
  userMsgRow: { backgroundColor: '#4338CA' },
  systemMsgRow: { backgroundColor: '#475569' },
  msgTextContainer: { flex: 1, marginRight: 10 },
  msgText: { color: '#F8FAFC', fontSize: 14 },
  chatDeleteButton: { padding: 4 },
  chatDeleteIcon: { fontSize: 14 }
});
