// Import the libararies we will be using for our app.
// We will be using useEffect from react to get/update data from our express server.
// We will be using useState to see if the user has if anything on the page has changed.
// Axios will be used to access the data form our server. 
import { useEffect, useState } from 'react';
import axios from 'axios';

// This is our react component. 
// The point of this component is to be able to display our friends array on our page and be able to update the friends. 
// When the user puts in a URL and name, the picture along with the name will display on the page below our other friends.
export default function App() {
  // Here we are setting up our useState hooks. 
  // We will be setting our friends to an empty array since the data we will be recieving from our app.js file is an array of objects.
  // Both name and picture will be strings input by the user, so we will initialize them to an empty string at first.
  const [friends, setFriends] = useState([]);
  const [picture, setPicture] = useState("");
  const [name, setName] = useState("");
  // Testing to make sure we are connected.
  console.log('hello world')
  // Here we are setting up our useEffect to grab the information from our server. 
  // Effects lets you run some code after rendering so that you can synchronize your component with some system outside of React.
  // With out using Effect, the page would load before the data could come from the server.
  // https://react.dev/learn/synchronizing-with-effects
  useEffect(() => {
    // axios allows us to make a request to our server
    // We will be using the GET request to retrieve our [friends] data.
    axios.get('/api/friends')
    // If the GET request goes through to our server, then our response data [friends] is passed to our setFriends function.
    // The once blank useState([]) array is now filled with all the objects in our [friends] array.
    .then(res => {
      setFriends(res.data)
    })
    // If the server does not respond, you gone catch these hands.
    .catch((theseHands) => {
      console.log(theseHands)
    })
  // The emptry array lookin box tells the program to run this useEffect once on render so the page loads our data.
  }, [])
  // This function allows us to add a new friend to our friends list.
  // This function will run any time someone clicks on our submit button.
  // The user will provide a picture and a name to add to our friends list.
  // const addFriend = () => {
  //   const newFriends = [...friends];

  //   newFriends.push({picture: picture, name: name})
  //   setFriends(newFriends)

  //   setPicture('');
  //   setName('')
  // }
  // This function does the same thing but more concise.
  const addFriend = () => {
    setFriends((newFriend) => [
      ...newFriend,
      {picture: picture, name: name}
    ]);
  setPicture('');
  setName('');
  }
  // using a map function to return our friends array objects as appropriate JSX elements.
  // We set our key in our div to the current friends name so that React can see if there were anychanges to the DOM.
  const friendsInfo = friends.map(obj => 
  <div key={obj.name}>
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

// EXPLANATION ^ ^ ^
// At the end of our react component we return our final JSX to be added to our main.jsx
// Like we did with our friendsInfo function, we will be giving a value to our JSX parent elements <input/>
// so that react can better track any updates to the DOM.
// onChange={(e) => {setPicture(e.target.value)}} // anytime the input changes, the useState updates.
// The useState will be the current value stored in the input text