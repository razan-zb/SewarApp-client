import React, { useState, useEffect } from 'react';
import { TextInput, Text, Alert,Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Stack } from 'expo-router';
import * as S from '../sections/sectionsStyle';
import { featchsaveClient } from '../../../../helpers/api';
import { useTranslation } from 'react-i18next';
import NoteModal from './noteModel'

const MeasuresForOne = () => {
  const user = useLocalSearchParams();
  const { t } = useTranslation();

  if (!user) {
    return <Text>No user data available</Text>;
  }

  const [name, setName] = useState(''); 
const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [notes,setNotes]=useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const formattedDate = moment(date).format('D MMMM YYYY');
  const formattedDate2 = moment(date2).format('D MMMM YYYY');

  const measurementFields = {
    chestHeight: user.chestHeight || '',
    frontWaistHeight: user.frontWaistHeight || '',
    hipHeight: user.hipHeight || '',
    backWaistHeight: user.backWaistHeight || '',
    waistHeight: user.waistHeight || '',
    kneeHeight: user.kneeHeight || '',
    fullLength: user.fullLength || '',
    shoulderWidth: user.shoulderWidth || '',
    shoulderSlope: user.shoulderSlope || '',
    bustDistance: user.bustDistance || '',
    bustCircumference: user.bustCircumference || '',
    waistCircumference: user.waistCircumference || '',
    hipCircumference: user.hipCircumference || '',
    sleeveCircumference: user.sleeveCircumference || '',
    wristCircumference: user.wristCircumference || '',
    handCircumference: user.handCircumference || '',
    sleeveLength: user.sleeveLength || '',
  };

  const [values, setValues] = useState(measurementFields);

  useEffect(() => {
    if (user) {
    
      user.firstName===undefined?setName(""):setName(user.firstName + " " + user.lastName);
      setPhoneNumber(user.phoneNumber || '');
      if (user.lastModifingDate) setDate(new Date(user.lastModifingDate));
      if (user.eventDate) setDate2(new Date(user.eventDate));
      setNotes(user.notes|| '');
    }
  }, []);

  const handleValueChange = (field, value) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(false);
    setDate2(currentDate);
  };

  const fetchSave = async () => {
    const showAlert = (title, message) => {
      if (Platform.OS === 'web') {
        alert(`${title}: ${message}`);
      } else {
        Alert.alert(title, message);
      }
    };
  
    try {
      const [firstName, lastName = ''] = name.split(' ', 2);
      const respond = await featchsaveClient(firstName, lastName, phoneNumber, date2, values, notes);
  
      if (respond) {
        showAlert('Success', 'Client updated successfully!');
      } else {
        showAlert('Save Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const checkFields = () => {
    const showAlert = (title, message) => {
      if (Platform.OS === 'web') {
        alert(`${title}: ${message}`);
      } else {
        Alert.alert(title, message);
      }
    };
  
    if (!name || !phoneNumber || !formattedDate || !formattedDate2) {
      showAlert('Error', 'Please fill in all the required fields: name, phone number, and dates.');
      return false;
    }
  
    if (isNaN(phoneNumber)) {
      showAlert('Error', 'Phone number must be numeric.');
      return false;
    }
  
    for (const field in values) {
      if (!values[field]) {
        showAlert('Error', `Please enter a value for ${t(field)}.`);
        return false;
      }
  
      if (isNaN(values[field])) {
        showAlert('Error', `${t(field)} must be numeric.`);
        return false;
      }
    }
  
    return true;
  };

  const toggleModal = () => {
    console.log(isModalVisible)
    setModalVisible(!isModalVisible);
  };

  const saveNotes = () => {
    setModalVisible(false);
  };


  const handleSave = () => {
    if (checkFields()) {
      fetchSave();
    }
  };


  

  return (
    <S.ContainerOneM>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#cccccc' },
          headerShadowVisible: false,
          headerTitle: name,
          headerShown: true,
          headerTintColor: '#73224B',
        }}
      />

      <S.InputsContainer>
        
        <S.DateLabel>{t('name_label')}</S.DateLabel>
        <S.PhoneInput
          placeholder={t('enter_name_placeholder')}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        
      </S.InputsContainer>

      <S.InputsContainer>
        
        <S.DateLabel>{t('phone_label')}</S.DateLabel>
        <S.PhoneInput
          placeholder={t('enter_phone_placeholder')}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        
      </S.InputsContainer>

      <S.InputsContainer>
        <S.DateLabel>{t('last_modified_date_label')}</S.DateLabel>
        <S.Date onPress={() => setShow(true)}>{formattedDate}</S.Date>
      </S.InputsContainer>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      <S.InputsContainer>
        <S.DateLabel>{t('event_date_label')}</S.DateLabel>
        <S.Date onPress={() => setShow2(true)}>{formattedDate2}</S.Date>
        
      </S.InputsContainer>
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date2}
          mode="date"
          display="default"
          onChange={onChange2}
        />
      )}

      <S.ScrollContainer>
        {Object.keys(measurementFields).map((field) => (
          <S.DetailsContainer key={field}>
            <S.Label>{t(field)}</S.Label>
            <TextInput
              style={{ width:60,borderWidth: 1, borderColor: '#ccc', padding: 10 }}
              placeholder={t('enter_value_placeholder')}
              keyboardType="numeric"
              value={values[field]}
              onChangeText={(text) => handleValueChange(field, text)}
            />
            
          </S.DetailsContainer>
        ))}
      </S.ScrollContainer>

      <S.ButtonsContainer>
        <S.SaveButton onPress={handleSave}>
          <S.SaveButtonText>{t('saveButton')}</S.SaveButtonText>
        </S.SaveButton>
        <S.NoteButton onPress={toggleModal}>
          <S.NoteButtonText>{t('note_button_text')}</S.NoteButtonText>
        </S.NoteButton>
      </S.ButtonsContainer>

      <NoteModal
        isVisible={isModalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
        notes={notes}
        setNotes={setNotes}
        saveNotes={saveNotes}
      />
    </S.ContainerOneM>
  );
};

export default MeasuresForOne;
