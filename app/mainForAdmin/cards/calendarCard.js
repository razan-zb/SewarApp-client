import React from 'react';
import { Calendar } from 'react-native-calendars';
import * as SC from './cardStyle';  // Assuming your styled components are defined here
import { StyleSheet} from 'react-native';

const CalendarCard = () => {

  return (
        <SC.CalendarContainer>
            <Calendar
                style={styles.calendar}
                current={new Date().toISOString().split('T')[0]}  // Current date
                markedDates={{
                '2024-08-21': {marked: true},  // Example: Marked date
                // Add more marked dates as needed
                }}
                hideExtraDays={true}  // Hide days outside the current month
                theme={{
                    calendarBackground: '#e6e6e6',
                    todayTextColor: '#73224B',
                    dotColor: '#73224B', // Adjust dot color here
                    selectedDotColor: '#ffffff', // Adjust selected dot color here
                    arrowColor: '#73224B', // Change arrow color here
        
                }}
            />
         </SC.CalendarContainer>
  );
};

const styles = StyleSheet.create({
    calendar: {
      arrowColor: '#73224B', // Change arrow color here
      borderRadius: 10, 
      
    },
  });

export default CalendarCard;
