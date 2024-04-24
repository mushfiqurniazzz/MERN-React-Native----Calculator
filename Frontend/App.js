import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [responseData, setResponseData] = useState(null); // State to hold response data

  const items = [
    { label: 'Plus', value: '+' },
    { label: 'Minus', value: '-' },
    { label: 'Multiply', value: '*' },
    { label: 'Divide', value: '/' }
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const handleFirstInputChange = (text) => {
    setFirstValue(text);
  };

  const handleSecondInputChange = (text) => {
    setSecondValue(text);
  };

  const sendToBackend = () => {
    axios.post('http://localhost:3000', { firstValue, secondValue, operationValue: selectedItem?.value })
      .then(response => {
        console.log('Data sent to backend:', response.data);
        setResponseData(response.data); // Update state with response data
      })
      .catch(error => {
        console.error('Error sending data to backend:', error);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleFirstInputChange}
        value={firstValue}
        placeholder="First Value"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
        <Text>{selectedItem ? selectedItem.label : 'Select an operation'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {items.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleSelectItem(item)} style={styles.dropdownItem}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TextInput
        style={styles.input}
        onChangeText={handleSecondInputChange}
        value={secondValue}
        placeholder="Second Value"
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={sendToBackend} style={styles.sendButton}>
        <Text>Send to Backend</Text>
      </TouchableOpacity>

      {/* Display response data */}
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Response from backend:</Text>
          <Text>{JSON.stringify(responseData)}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownButton: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    marginTop: 10,
    borderWidth: 1,
  },
  dropdownItem: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  sendButton: {
    borderWidth: 1,
    padding: 10,
  },
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
  },
  responseText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default App;
