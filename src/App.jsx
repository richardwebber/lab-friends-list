import { useEffect, useState } from 'react';
import axios from 'axios';


export default function App() {

  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  console.log('hello')

  useEffect(() => {
    axios.get('/api/friends').then(res => {
      setFriends(res.data)
    });
  }, [])

  const addFriend = () => {
    const newFriends = [...friends];
    newFriends.push({picture: picture, name: name})
    setFriends(newFriends)

    setPicture('');
    setName('')
  }

  const friendsInfo = friends.map(obj => 
  <div key={`${obj.name}`}>
    <img width="400px" src={obj.picture} alt={obj.name} />
    <span>{obj.name}</span>
  </div>
)

  return (
  <div>
    <label htmlFor="picture">Picture: </label>
    <input
    type="text"
    id="picture"
    value={picture}
    onChange={(e) => {setPicture(e.target.value)}}
    />

    <label htmlFor="name">Name: </label>
    <input 
    type="text" 
    id="name"
    value={name}
    onChange={(e) => {setName(e.target.value)}}
    />

    <button onClick={addFriend}> Add Friend </button>
    {friendsInfo}
  </div>
  );
}
