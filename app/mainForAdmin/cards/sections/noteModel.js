/* eslint-disable react/prop-types */
// NoteModal.js
import React from 'react';
import { Modal, TouchableOpacity, Text } from 'react-native';
import * as S from '../sections/sectionsStyle';
import { useTranslation } from 'react-i18next';

const NoteModal = ({ isVisible,setModalVisible, toggleModal, notes, setNotes, saveNotes }) => {
const { t } = useTranslation();
  return (
    
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >

        
        <S.ModalContainer>
            <TouchableOpacity 
                        style={styles.exitButton} 
                        onPress={() => setModalVisible(false)}
                    >
                <Text style={styles.exitButtonText}>X</Text>
            </TouchableOpacity>
            <S.ModalTitle>{t('note_button_text')}</S.ModalTitle>
            <S.ModalInput
                placeholder={t('enterNote')}
                value={notes}
                onChangeText={setNotes}
                multiline
                />
                <S.ModalSaveButton onPress={saveNotes}>
                <S.ModalSaveButtonText>{t('save_button_text')}</S.ModalSaveButtonText>
                </S.ModalSaveButton>

        </S.ModalContainer>
    </Modal>
  );
};



const styles = {
    exitButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      padding: 5,
      backgroundColor: '#73224B',
      borderRadius: 15,
    },
    exitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    notificationContainer: {
      marginVertical: 10,
      width: '100%',
      
    },
    notificationLabel: {
      fontSize: 18,
      marginBottom: 5,
      color:'#73224B',
      fontWeight: 'bold',
  
    },
  };
export default NoteModal;
