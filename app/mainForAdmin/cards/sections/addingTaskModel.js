/* eslint-disable react/prop-types */
import * as S from '../cardStyle';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Dropdown from './Dropdown';
import * as Notifications from 'expo-notifications';
import React, { useEffect} from 'react';
import moment from 'moment';
import { Platform } from 'react-native';

const TaskModal = ({
  selectedDate,
  isEditing,
  modalVisible,
  setModalVisible,
  taskTitle,
  setTaskTitle,
  startHour,
  setStartHour,
  endHour,
  setEndHour,
  addTask,
  updateTask,
  deleteTask,
  notificationTriggerTime,
  setNotificationTriggerTime,
  notificationTriggerShow,
  setNotificationTriggerShow,
  startTime,
  setStartTime,
}) => {
  const { t } = useTranslation();

  // Options for the dropdown
  const notificationTriggerShows = [
    t('oneHourBefore'),
    t('oneDayBefore'),
    t('fiveMinutesBefore'),
    t('none')
  ];



  // Function to schedule notifications
  const scheduleNotification = async (date) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: t('taskReminder'),
        body: `${taskTitle}`,
        sound:true,
      },
      trigger: date,
    });
  };

  useEffect(()=>{
    setStartTime(moment.utc(`${selectedDate} ${startHour}`, 'YYYY-MM-DD HH:mm').toDate())
    handleChange();

  },[startHour,notificationTriggerShow])


  

  const handleChange =()=>{
    setNotificationTriggerShow(notificationTriggerShow)
    if (notificationTriggerShow) {
      const notificationTime = startTime; // Adjust based on your task time
      switch (notificationTriggerShow) {
        case t('oneHourBefore'):
          notificationTime.setHours(notificationTime.getHours() - 1);
          break;
        case t('oneDayBefore'):
          notificationTime.setDate(notificationTime.getDate() - 1);
          break;
        case t('fiveMinutesBefore'):
          notificationTime.setMinutes(notificationTime.getMinutes() - 5);
          break;
        default:
          break;
      }

      setNotificationTriggerTime(notificationTime);

  }
}
  const handleAddTask = async () => {
    Platform.OS != 'web' && scheduleNotification(notificationTriggerTime);
    await addTask();

  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <S.ModalContainer>
        <S.ModalContent>
          <TouchableOpacity 
            style={styles.exitButton} 
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.exitButtonText}>X</Text>
          </TouchableOpacity>
          <S.ModalTitle>{isEditing ? t('edittask') : t('addTask')}</S.ModalTitle>
          <S.ModalInput
            placeholder={t('taskTitle')}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          <S.ModalInput
            placeholder={t('startHourExample')}
            value={startHour}
            onChangeText={setStartHour}
          />
          <S.ModalInput
            placeholder={t('endHourExample')}
            value={endHour}
            onChangeText={setEndHour}
          />

          {/* Notification Option Dropdown */}
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationLabel}>{t('notification')}</Text>
            <Dropdown
              options={notificationTriggerShows}
              selectedOption={notificationTriggerShow}
              onSelect={setNotificationTriggerShow  }
            />
          </View>

          <S.ModalButton onPress={isEditing ? updateTask : handleAddTask}>
            <S.ModalButtonText>{isEditing ? t('updateTask') : t('addTask')}</S.ModalButtonText>
          </S.ModalButton>
          {isEditing && (
            <S.ModalButton onPress={deleteTask}>
              <S.ModalButtonText>{t('deleteTask')}</S.ModalButtonText>
            </S.ModalButton>
          )}
        </S.ModalContent>
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

export default TaskModal;
