import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps, TouchableOpacity, Text } from 'react-native';

interface InputProps extends TextInputProps {
  isPassword?: boolean;
}

const Input: React.FC<InputProps> = ({ isPassword = false, ...props }) => {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        secureTextEntry={secureText}
        placeholderTextColor="#999"
        {...props}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.toggle}
          onPress={() => setSecureText(!secureText)}
        >
          <Text style={styles.toggleText}>{secureText ? '(◉‿◉)' : '( -‿- )'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    color: '#000',
  },
  toggle: {
    position: 'absolute',
    right: 10,
    justifyContent: 'center',
    height: '100%',
  },
  toggleText: {
    fontSize: 18,
    color: '#999'
  },
});

export default Input;
