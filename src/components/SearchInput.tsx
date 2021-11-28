import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

interface SearchInputProps {
  placeholder: string;
  setLocation: (city: string) => void;
}

interface SearchInputState {
  text: string;
}

export const SearchInput = ({ placeholder, setLocation }: SearchInputProps) => {

  const [{ text }, setState] = useState<SearchInputState>({
    text: ''
  });

  const handleChangeText = (value: string) => {
    setState({ text: value });
  };

  const handleSubmitEditing = () => {
    if (!text) return;

    setLocation(text);
    setState({ text: '' });
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        value={text}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
});