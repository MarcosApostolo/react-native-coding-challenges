import React, { useState, memo } from 'react';
import { Button, ColorValue, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

const CORRECT_WORD = "agent"

const useWordle = () => {
  const [words, setWords] = useState<string[]>([])
  const [word, setWord] = useState<string>("")

  const handleChange = (val: string) => {
    if (val.length <= 5) {
      setWord(val)
    }
  }

  const handleSubmit = () => {
    setWords((state) => [...state, word])
    setWord("")
  }

  return {
    words,
    handleChange,
    word,
    handleSubmit,
    isDisabled: word.length < 5
  }
}

const WordRowView = memo(({ word } : { word: string }) => {
  const getColor = (letter: string, index: number): ColorValue => {
    if (CORRECT_WORD[index] === letter) {
      return "green"
    }

    if (CORRECT_WORD.includes(letter)) {
      return "orange"
    }

    return "grey"
  }

  return (
    <View style={styles.wordsContainer}>
      {word.split("").map((letter: string, index: number) => {
        console.log("render")
        const color: ColorValue = getColor(letter, index)

        return <Text style={{ color, letterSpacing: 1 }}>{letter}</Text>
      })}
    </View>
  )
})

function WordsView({ words }: { words: string[] }) {
  return words.map((word, index) => <WordRowView word={word} />)
}

export default function App() {
  const { word, words, handleChange, handleSubmit, isDisabled } = useWordle()

  return (
    <View style={styles.container}>
      <Button title="Submit" onPress={handleSubmit} disabled={isDisabled} />
      <TextInput placeholder="type your word here" onChangeText={handleChange} value={word} />
      <WordsView words={words} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
    justifyContent: "flex-start",
    gap: 20 
  },
  wordsContainer: {
    flexDirection: "row"
  }
});

