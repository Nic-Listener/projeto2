import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  backgroundColor: string;
  textColor: string;
}

const Button: React.FC<ButtonProps> = ({ title, backgroundColor, textColor, ...props }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} {...props}>
      <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Button;
