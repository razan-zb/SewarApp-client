/* eslint-disable react/prop-types */
// AddItemModal.js
import React, { useState,useEffect } from 'react';
import { Modal, TouchableOpacity, Text, View } from 'react-native';
import * as S from '../sections/sectionsStyle';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {featchCreateFashionItem,sendImageFirebase}from "../../../../helpers/api"
import { Alert ,ActivityIndicator,Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
 
const AddItemModal = ({ isVisible, setModalVisible, toggleModal, saveItem }) => {
  const [name, setName] = useState('');
  const [sizeRange, setSizeRange] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [type, setType] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAddingNewType, setIsAddingNewType] = useState(false); 
  const [newType, setNewType] = useState(''); // Holds the new type input value
  const { t } = useTranslation();

  
  const fetchData = async()=>{
    const results = await AsyncStorage.getItem('fashionItems');
    if(results !== null){
      const parsedResults = JSON.parse(results);
      const allTypes = parsedResults.map(item => item.type);
      const uniqueTypes = [...new Set(allTypes)];
      const typeItems = uniqueTypes.map(type => ({ label: type, value: type }));
      typeItems.push({ label: 'Add New Type', value: 'add-new' });
      setItems(typeItems)
    }

  }

  const showAlert = (title, message, buttons) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, buttons);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const pickImage = async () => {
    if (!name || !sizeRange || !price) {
      showAlert('Warning', 'Fill all the fields first.', [{ text: 'OK' }]);
    }else{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri } = result.assets[0];
        const formData = new FormData();
        formData.append('file', {
          uri,
          name: `${name}${photos.length}.png`,
          type: 'image/png',
        });
  
        try {
          setLoading1(true);
          // Send image to the server
          const downloadURL = await sendImageFirebase(formData);
          if(downloadURL){  
            setPhotos([...photos, downloadURL.url]);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          showAlert('Upload Failed', 'There was a problem uploading the image.', [{ text: 'OK' }]);  
        } finally {
          setLoading1(false);
        }
      }
    

    }
    
  };

  const handleSaveItem = () => {

    if (!name || !sizeRange || !price || !photos.length){
        console.log("Please fill all fields before adding the item.");
      } else {
        const newItem = {
            _id:name,
            name:name,
            size:sizeRange,
            price:price,
            description:description,
            photos:photos,
            type:type
          };
          try {
            setLoading(true);
            saveItem(newItem);
            if(featchCreateFashionItem(newItem)){
              // Clear form after saving
              setName('');
              setSizeRange(''); 
              setPrice('');
              setDescription('');
              setPhotos([]);
              setModalVisible(false);
              showAlert('Success', 'The Item uploaded successfully.', [{ text: 'OK' }]);
            }
              else{
                showAlert('Upload Failed', 'There was a problem uploading the data.', [{ text: 'OK' }]);
              }
          } catch (error) {
            console.error("Error uploading data:", error);
            showAlert('Upload Failed', 'There was a problem uploading the data.', [{ text: 'OK' }]);
    
          } finally {
            // Stop the loading indicator
            setLoading(false);
          }
          
      }

  };

  useEffect(() => {
    handleTypeChange(type)
  }, [type]);



  // Handle when user selects an item from dropdown
  const handleTypeChange = (value) => {
    if (value === 'add-new') {
      setIsAddingNewType(true); // Show the input field if "Add New Type" is selected
    } else {
      setType(value);
      setIsAddingNewType(false); // Hide the input field if a type is selected
    }
  };

  // Add new type to the dropdown
  const handleAddNewType = () => {
    if (newType.trim() === '') {
      alert('Please enter a valid type');
      return;
    }

    const newTypeItem = { label: newType, value: newType };
    setItems([...items, newTypeItem]); 
    setType(newType); 
    setIsAddingNewType(false); 
    setNewType('');

    alert('New type added!');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}
    >
      <S.ModalContainer2>
        <TouchableOpacity 
          style={styles.exitButton} 
          onPress={() => {setModalVisible(false);
            setName('');
            setSizeRange('');
            setPrice('');
            setDescription('');
            setPhotos([]);
          }}
         >
         <Text style={styles.exitButtonText}>X</Text>
        </TouchableOpacity>

        <S.ModalTitle2>{t('addingNewItem')}</S.ModalTitle2>

          <S.ModalInput2
            placeholder={t('namePlaceholder')}
            value={name}
            onChangeText={setName}
          />
          <S.ModalInput2
            placeholder={t('sizeRangePlaceholder')}
            value={sizeRange}
            onChangeText={setSizeRange}
          />
  

          <S.StyledDropDownPicker
                open={open}
                value={type}
                items={items}
                setOpen={setOpen}
                setValue={setType}
                setItems={setItems}
                dropDownContainerStyle={{
                    borderColor: "#73224B",
                    backgroundColor: "#f9f9f9",
                    width: 250,
                    alignSelf:"center",
                  }}      
        />

     {isAddingNewType && (
        <View style={{ marginTop: 10 }}>
          <S.ModalInput2
            placeholder={t('addNewTypeLabel')}
            value={newType}
            onChangeText={setNewType}
            style={{
              borderWidth: 1,
              borderColor: '#73224B',
              padding: 10,
              marginVertical: 10,
              borderRadius: 5,
              backgroundColor: '#f9f9f9',
            }}
          />
          <S.ButtonAddingType  title={t('addNewTypeLabel')} onPress={handleAddNewType} />
        </View>
      )}

      
          <S.ModalInput2
            placeholder={t('pricePlaceholder')}
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />
          <S.ModalInput3
            placeholder={t('descriptionPlaceholder')}
            value={description}
            onChangeText={setDescription}
            multiline
          />

            
          {/* Photos Section */}
          <View style={styles.photosSection}>
            <S.Text2>{t('photosLabel')}</S.Text2>
            <View style={styles.photosList}>
              {photos.map((photo, index) => (
                <FontAwesome key={index} name="image" size={30} color="#73224B" />
              ))}
               {loading1 ? (
                      <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                         <>
                         </> 
                )}
            </View>
            <Button icon="camera" mode="contained" onPress={pickImage} style={styles.addPhotoButton}>
            {t('addPhotoButton')}
            </Button>
          </View>

        

        <S.ModalSaveButton onPress={handleSaveItem}>
        {loading ? (
                      <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                          <S.ModalSaveButtonText>{t('saveButton')}</S.ModalSaveButtonText>
        )}
          
        </S.ModalSaveButton>

      </S.ModalContainer2>
    </Modal>
  );

}
const styles = {
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#73224B',
    borderRadius: 2,
  },
  exitButtonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },
  photosSection: {
    marginVertical: 20,
  },
  sectionLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#73224B',
    fontWeight: 'bold',
  },
  photosList: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  addPhotoButton: {
    backgroundColor: '#73224B',
    
  },
};

export default AddItemModal;
