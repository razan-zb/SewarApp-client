import React, { useState } from 'react';
import * as S from './styleHeader';
import Header from '../header';
import {SendEmail} from '../../../helpers/api'


const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = async() => {
    if( !name || !email || !message){
      alert('Empty fields!');
    }else{
      setLoading(true);
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
      };
  
      const result = await SendEmail(formData);
      if(result){
        alert('Message sent!');
        setLoading(false);
      }
      else{
        alert('Message failed!');
        setLoading(false);
      }
    }

  };

  return (
    <S.PageContainer>
      <Header />
      <S.ContactContainer>
        <S.Header>
          <S.HeaderTitle>Contact Us</S.HeaderTitle>
        </S.Header>

        <S.FormContainer>
          <S.Input1
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <S.Input1
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <S.Input1
            placeholder="Subject"
            value={subject}
            onChangeText={(text) => setSubject(text)}
          />
          <S.Input1
            placeholder="Message"
            multiline
            numberOfLines={5}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <S.Button onPress={sendEmail} disabled={loading}>
            <S.ButtonText>{loading ? 'Sending...' : 'Send Message'}</S.ButtonText>
          </S.Button>
        </S.FormContainer>

        <S.ContactDetails>
          <S.ContactText>Email: sewardesigns2024@gmail.com</S.ContactText>
        </S.ContactDetails>
      </S.ContactContainer>
    </S.PageContainer>
  );
};

export default ContactUs;
