/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native';

const Dropdown = ({ options, selectedOption, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedOption || 'Select Notification'}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  onSelect(option);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 10,
    borderRadius: 5,
    borderColor: '#73224B',
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    color: '#73224B',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Dropdown;
