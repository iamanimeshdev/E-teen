import React, { useState } from 'react';
import { firestore, auth } from '../firebase'; 
import { useNavigate } from 'react-router-dom';


const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onload = () => resolve(reader.result); 
    reader.onerror = (error) => reject(error);  
  });
};

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser; 

      if (!user) {
        alert('No user found. Please log in again.');
        return;
      }

      
      const profilePicBase64 = profilePic ? await fileToBase64(profilePic) : '';
      const signatureBase64 = signature ? await fileToBase64(signature) : '';

      
      const cardNumber = Math.floor(10000000 + Math.random() * 90000000);


      
      await firestore.collection('users').doc(user.uid).set({
        name,
        cardNumber,
        profilePicBase64,
        signatureBase64,
        userId: user.uid, 
      });

      alert('Profile created successfully!');
      navigate(`/card/${user.uid}`); 
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <div>
          <label>Signature:</label>
          <input
            type="file"
            onChange={(e) => setSignature(e.target.files[0])}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Create Profile'}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
