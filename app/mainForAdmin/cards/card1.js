// Screen1.js
import * as S from './cardStyle';
import React, { useState ,useEffect} from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
import { FlatList, TouchableOpacity ,StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import TaskModal from './sections/addingTaskModel';
import {fetchTasksData,featchCreateTask,fetchDeleteTask,fetchUpdateTask} from '../../../helpers/api';
import { Alert,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';




const Card1 = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [tasks, setTasks] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [notificationTriggerTime,setNotificationTriggerTime]=useState(new Date());
  const [notificationTriggerShow,setNotificationTriggerShow]=useState('');
  const [startTime,setStartTime]=useState();


  
  useEffect(()=>{
    setStartTime(moment.utc(`${selectedDate} ${startHour}`, 'YYYY-MM-DD HH:mm').toDate())
  },[endHour])

   // Function to transform tasks1 to the format required for tasks state
const transformTasksData = (tasks1) => {
  return tasks1.reduce((acc, task) => {
    const date = moment(task.date).format('YYYY-MM-DD'); // Ensure the date format is consistent
    if (!acc[date]) {
      acc[date] = [];
    }


    acc[date].push({
      title: task.description,
      startHour: moment.utc(task.startTime).format('HH:mm'),
      endHour: moment.utc(task.endTime).format('HH:mm'),
      startTime:startTime,
      date:task.date,
      notificationScheduled:task.notificationScheduled,
      notificationTriggerTime:task.notificationTriggerTime,
      id: task._id,
      notificationTriggerShow:task.notificationTriggerShow
    });
      return acc;
  }, {});
};

  //get the task for the current user 
  const fetchData = async () => {
    try {

      const tasks1 = await fetchTasksData('1234567890');
      const transformedTasks = transformTasksData(tasks1);
      setTasks(transformedTasks);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  const showAlert = (title, message) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
    }
  };
  const CreateTask = async () => {
    try {

      const newTask = await featchCreateTask(taskTitle,selectedDate,startHour,endHour,'1234567890',notificationTriggerTime,notificationTriggerShow,notificationTriggerShow!="none");
      if(newTask){
        fetchData();
        showAlert('Success', 'Task updated successfully!');
        const updatedTasks = { ...tasks };
        if (!updatedTasks[selectedDate]) {
          updatedTasks[selectedDate] = [];
        }

        updatedTasks[selectedDate].push({
          title: taskTitle,
          startHour,
          endHour,
          notificationTriggerShow,
        });
        setTasks(updatedTasks);
        setTaskTitle('');
        setStartHour('');
        setEndHour('');
        setModalVisible(false);
        setNotificationTriggerShow("none")
  
  
      }else {
        showAlert('Failed', 'Incorrect data. Please try again.');          
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const addTask = () => {
    if (taskTitle.trim() && startHour.trim() && endHour.trim()) {
      CreateTask();
    } else {
      setTaskTitle('');
      setStartHour('');
      setEndHour('');
      setModalVisible(false);
      setNotificationTriggerShow("none");
      
    }
  };


  const updateTaskById = async () => {
    try {
      const updatedTask={
        description: taskTitle,
        startTime: new Date(`${selectedDate}T${startHour}:00.000Z`), 
        endTime: new Date(`${selectedDate}T${endHour}:00.000Z`),  
        isCompleted:false,
        _id:taskToEdit.id,
        date: new Date(selectedDate) ,
        notificationTriggerShow:notificationTriggerShow,
        notificationTriggerTime:notificationTriggerTime
      }
      // eslint-disable-next-line no-unused-vars
      const result = await fetchUpdateTask(taskToEdit.id,updatedTask);
      return true;
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }; 


  const updateTask = () => {
    updateTaskById();
    const updatedTasks = { ...tasks };
    const taskIndex = updatedTasks[selectedDate].findIndex(
      task => task === taskToEdit
    );
    if (taskIndex !== -1) {
    
      updatedTasks[selectedDate][taskIndex] = {
        title: taskTitle,
        startHour,
        endHour,
        id:taskToEdit.id,
        notificationTriggerShow:notificationTriggerShow,
        notificationTriggerTime:notificationTriggerTime,
        date: new Date(selectedDate)
      };
      setTasks(updatedTasks);
      setTaskTitle('');
      setStartHour('');
      setEndHour('');
      setModalVisible(false);
      setIsEditing(false);
      setTaskToEdit(null);
      setNotificationTriggerShow("none")
    }
  };

  const deleteTaskById = async (taskId) => {
    try {
      const result = await fetchDeleteTask(taskId);
      return result;
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  }; 
  const deleteTask = () => {

    if(deleteTaskById(taskToEdit.id)){

      router.push(`/mainForAdmin/cards/card1`);
      setTaskTitle('');
      setStartHour('');
      setEndHour('');
      setModalVisible(false);
      setIsEditing(false);
      setTaskToEdit(null);
      setNotificationTriggerShow("none");
    }
    
  };

  const onTaskPress = (task) => {
    setTaskTitle(task.title);
    setStartHour(task.startHour);
    setEndHour(task.endHour);
    setTaskToEdit(task);
    setIsEditing(true);
    setModalVisible(true);
    setNotificationTriggerShow(task.notificationTriggerShow);
  };


  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + (minutes || 0);
  };
  
  const markedDates = {
    [selectedDate]: {
      selected: true,
      marked: tasks[selectedDate]?.length > 0,
      selectedColor: '#73224B',
      dots: tasks[selectedDate]?.length > 0 ? [{ color: '#73224B' }] : [], // Specify the color of the dot here
    },
    ...Object.keys(tasks).reduce((acc, date) => {
      acc[date] = {
        marked: true,
        dots: [
          {
            color: '#73224B', // Change this color to the desired dot color
          },
        ],
      };
      return acc;
    }, {}),
  };



  markedDates[selectedDate] = {
    ...markedDates[selectedDate],
    selected: true,
    selectedColor: '#73224B',
  };


  return (
    <S.Container2>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: 'red', // Adjusted color to match dots
          todayTextColor: '#73224B',
          dotColor: '#73224B', // Adjust dot color here
          selectedDotColor: '#ffffff', // Adjust selected dot color here
          arrowColor: '#73224B', // Change arrow color here

        }}
        style={styles.calendar} // Apply the custom style here
      />
      <S.TaskContainer>
        <S.TaskTitle>{t('taskfor')} {moment(selectedDate).format('D.M.YYYY')}</S.TaskTitle>
        <FlatList
          data={hours.map(hour => ({
            hour,
            task: tasks[selectedDate]?.find(task => {
              const taskStart = convertTimeToMinutes(task.startHour);
              const taskEnd = convertTimeToMinutes(task.endHour);
              const currentHour = convertTimeToMinutes(hour);
              return currentHour >= taskStart && currentHour <= taskEnd;
            }) || null,
          }))}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => item.task && onTaskPress(item.task)}>
              <S.TaskItem style={{ backgroundColor: item.task ? '#e8b0cc' : 'transparent' }}>
                <S.HourText style={{ color: item.task ? '#fff' : '#000' }}>{item.hour}</S.HourText>
                <S.TaskText style={{ color: item.task ? '#fff' : '#000' }}>{item.task ? item.task.title : t('notask') }</S.TaskText>
              </S.TaskItem>
            </TouchableOpacity>
          )}
          
          keyExtractor={(item) => item.hour}
        />
        <S.AddButton onPress={() => {setModalVisible(true); setIsEditing(false) ;setTaskTitle('') ;setEndHour('');setStartHour('')}}>
          <FontAwesome name="plus" size={24} color="#fff" />
        </S.AddButton>
    
      </S.TaskContainer>
      
     {/* Use TaskModal Component */}
     <TaskModal
       selectedDate={selectedDate}
        isEditing={isEditing}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        startHour={startHour}
        setStartHour={setStartHour}
        endHour={endHour}
        setEndHour={setEndHour}
        addTask={addTask}
        updateTask={updateTask}
        deleteTask={deleteTask}
        notificationTriggerTime={notificationTriggerTime}
        setNotificationTriggerTime={setNotificationTriggerTime}
        notificationTriggerShow={notificationTriggerShow}
        setNotificationTriggerShow={setNotificationTriggerShow}
        startTime={startTime}
        setStartTime={setStartTime}
      />
    </S.Container2>
  );
};


const styles = StyleSheet.create({
  calendar: {

    height: 320,
    arrowColor: '#73224B', // Change arrow color here
    

  },
});
export default Card1;
