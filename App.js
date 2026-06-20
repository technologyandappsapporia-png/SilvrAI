import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [xp, setXp] = useState(0);
  const [mood, setMood] = useState('Calm'); 
  const [newTxt, setNewTxt] = useState('');
  const [newXp, setNewXp] = useState('25'); 
  const [inTxt, setInTxt] = useState('');

  const [quests, setQuests] = useState([
    { id: '1', text: 'Meditate 10m', completed: false, xpReward: 20 },
    { id: '2', text: 'Write Ideas', completed: false, xpReward: 30 }
  ]);

  const [messages, setMessages] = useState([
    { id: '1', text: 'Pure thoughts only.', sender: 'System' }
  ]);

  const total = quests.length;
  const done = quests.filter(q => q.completed).length;
  const rate = total > 0 ? Math.round((done / total) * 100) : 0;

  const addQ = () => {
    if (!newTxt.trim()) return;
    const num = parseInt(newXp, 10);
    const reward = isNaN(num) || num <= 0 ? 25 : num;
    setQuests([...quests, { id: Date.now().toString(), text: newTxt, completed: false, xpReward: reward }]);
    setNewTxt('');
    setNewXp('25'); 
  };

  const toggleQ = (id, comp, rwd) => {
    setQuests(quests.map(q => q.id === id ? { ...q, completed: !q.completed } : q));
    setXp(prev => comp ? Math.max(0, prev - rwd) : prev + rwd);
  };

  const delQ = (id, comp, rwd) => {
    if (comp) setXp(prev => Math.max(0, prev - rwd));
    setQuests(quests.filter(q => q.id !== id));
  };

  const sendM = () => {
    if (!inTxt.trim()) return;
    setMessages([{ id: Date.now().toString(), text: inTxt, sender: 'User' }, ...messages]);
    setInTxt('');
    setXp(prev => prev + 5);
  };

  const delM = (id, snd) => {
    if (snd === 'User') setXp(prev => Math.max(0, prev - 5));
    setMessages(messages.filter(m => m.id !== id));
  };

  const isC = mood === 'Calm';
  const bg = isC ? '#0F172A' : '#0F1123';
  const border = isC ? '#334155' : '#4C1D95';
  const accent = isC ? '#38BDF8' : '#A78BFA';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 30 }}>
        
        {/* HEADER */}
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#FFF' }}>SilvrAI</Text>
          <View style={{ backgroundColor: accent, paddingVertical: 4, paddingHorizontal: 12, borderRadius: 15, marginTop: 5 }}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 12 }}>{xp >= 150 ? 'Cyber Overlord' : xp >= 60 ? 'Cosmos' : 'Novice'}</Text>
          </View>
          <Text style={{ color: '#94A3B8', marginTop: 4, fontSize: 14 }}>XP: {xp}</Text>
        </View>

        {/* DASHBOARD */}
        <View style={{ backgroundColor: '#1E293B', borderRadius: 12, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: border }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF', marginBottom: 10 }}>Dashboard</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: '800', color: accent }}>{rate}%</Text><Text style={{ fontSize: 11, color: '#94A3B8' }}>Rate</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: '800', color: '#FFF' }}>{total}</Text><Text style={{ fontSize: 11, color: '#94A3B8' }}>Total</Text></View>
            <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: '800', color: '#FFF' }}>{done}</Text><Text style={{ fontSize: 11, color: '#94A3B8' }}>Done</Text></View>
          </View>
        </View>

        {/* MOODS */}
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: isC ? '#0284C7' : '#334155', padding: 12, borderRadius: 10, alignItems: 'center', marginRight: 5 }} onPress={() => setMood('Calm')}><Text style={{ color: '#FFF', fontWeight: '600' }}>🧘 Calm</Text></TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, backgroundColor: !isC ? '#7C3AED' : '#334155', padding: 12, borderRadius: 10, alignItems: 'center', marginLeft: 5 }} onPress={() => setMood('Creative')}><Text style={{ color: '#FFF', fontWeight: '600' }}>🎨 Creative</Text></TouchableOpacity>
        </View>

        {/* QUESTS */}
        <View style={{ backgroundColor: '#1E293B', borderRadius: 12, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: border }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF', marginBottom: 10 }}>Quests</Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TextInput style={{ flex: 2, backgroundColor: '#334155', borderRadius: 8, paddingHorizontal: 10, color: '#FFF', height: 36, fontSize: 12 }} placeholder="Quest..." placeholderTextColor="#94A3B8" value={newTxt} onChangeText={setNewTxt} />
            <TextInput style={{ width: 40, backgroundColor: '#334155', borderRadius: 8, textAlign: 'center', color: '#34D399', height: 36, fontSize: 12, marginLeft: 5 }} placeholder="XP" placeholderTextColor="#94A3B8" keyboardType="numeric" value={newXp} onChangeText={setNewXp} maxLength={3} />
            <TouchableOpacity style={{ backgroundColor: '#10B981', justifyContent: 'center', height: 36, paddingHorizontal: 10, borderRadius: 8, marginLeft: 5 }} onPress={addQ}><Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>+ Add</Text></TouchableOpacity>
          </View>
          {quests.map(q => (
            <View key={q.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#334155', padding: 10, borderRadius: 8, marginBottom: 8, opacity: q.completed ? 0.6 : 1 }}>
              <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, marginRight: 5 }} onPress={() => toggleQ(q.id, q.completed, q.xpReward)}>
                <Text style={{ color: '#FFF', fontSize: 13, textDecorationLine: q.completed ? 'line-through' : 'none' }}>{q.completed ? '✅ ' : '🔲 '} {q.text}</Text>
                <Text style={{ color: '#34D399', fontWeight: 'bold', fontSize: 11 }}>+{q.xpReward} XP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => delQ(q.id, q.completed, q.xpReward)}><Text style={{ fontSize: 12 }}>❌</Text></TouchableOpacity>
            </View>
          ))}
        </View>

        {/* CHAT */}
        <View style={{ backgroundColor: '#1E293B', borderRadius: 12, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: border }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFF', marginBottom: 10 }}>Creative Space</Text>
          <View style={{ flexDirection: 'row', marginBottom: 15 }}>
            <TextInput style={{ flex: 1, backgroundColor: '#334155', borderRadius: 8, paddingHorizontal: 10, color: '#FFF', height: 36, fontSize: 12 }} placeholder="Thought..." placeholderTextColor="#94A3B8" value={inTxt} onChangeText={setInTxt} />
            <TouchableOpacity style={{ backgroundColor: '#6366F1', justifyContent: 'center', height: 36, paddingHorizontal: 12, borderRadius: 8, marginLeft: 5 }} onPress={sendM}><Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>Post</Text></TouchableOpacity>
          </View>
          {messages.map(m => (
            <View key={m.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderRadius: 8, marginBottom: 6, backgroundColor: m.sender === 'User' ? '#4338CA' : '#475569' }}>
              <Text style={{ color: '#FFF', fontSize: 13, flex: 1, marginRight: 5 }}>{m.text}</Text>
              <TouchableOpacity onPress={() => delM(m.id, m.sender)}><Text style={{ fontSize: 12 }}>🗑️</Text></TouchableOpacity>
            </View>
          ))}
        </View>

        {/* RESET */}
        <TouchableOpacity style={{ backgroundColor: '#7F1D1D', padding: 12, borderRadius: 10, alignItems: 'center' }} onPress={() => { setXp(0); setQuests([]); setMessages([]); }}><Text style={{ color: '#FCA5A5', fontWeight: '700', fontSize: 13 }}>🧹 Reset Progress</Text></TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}
