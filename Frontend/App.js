//importing neccessary function componenets, and axios library
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

//the main function component where we create axios post function, ui elements and more
function App() {
  //declaring use state variables to use in functions, elements and more
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firstValue, setFirstValue] = useState('');
  const [secondValue, setSecondValue] = useState('');
  const [responseData, setResponseData] = useState(null); // State to hold response data

  //adding items and values to those items through label to our drop down value that will send the operation to server
  const items = [
    { label: 'Plus', value: '+' },
    { label: 'Minus', value: '-' },
    { label: 'Multiply', value: '*' },
    { label: 'Divide', value: '/' }
  ];

  //this function open the drop down button and shows all the item saved
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //this function opens the drop down button and let us select an item for all the items
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  //this function dinamically changes and takes care of the value in the input field of the first value input
  const handleFirstInputChange = (text) => {
    setFirstValue(text);
  };

  //this function dinamically changes and takes care of the value in the input field of the second value input
  const handleSecondInputChange = (text) => {
    setSecondValue(text);
  };

  //asyncronus function that sends a post request to the server after user clicks a button which then sends the calculated result to the frontend
  const sendToBackend = async () => {
    await axios.post('http://localhost:3000', { firstValue, secondValue, operationValue: selectedItem?.value })
      .then(response => {
        console.log('Data sent to backend:', response.data);
        setResponseData(response.data); // Update state with response data
      })
      .catch(error => {
        //basic error handling
        console.error('Error sending data to backend:', error);
      });
  };
//ui rendering
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

//css here
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

//exporting the functional componenet
export default App;
