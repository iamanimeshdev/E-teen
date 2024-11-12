import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase'; 
import { useParams } from 'react-router-dom'; 
const CardDisplay = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams(); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await firestore.collection('users').doc(userId).get();
        if (userDoc.exists) {
          setUser(userDoc.data());
        } else {
          console.log('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]); 
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Card Number: {user.cardNumber}</p>
      {user.profilePicBase64 && <img src={user.profilePicBase64} alt="Profile Picture" width="100" />}
      {user.signatureBase64 && <img src={user.signatureBase64} alt="Signature" width="100" />}
    </div>
  );
};

export default CardDisplay;
