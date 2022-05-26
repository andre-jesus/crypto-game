import styles from '../styles/Home.module.css'
import { useState } from 'react'


export default function Home() {
  const [roomCreated, setRoomCreateState] = useState(null);

  function handleCreateButtonPressed() {
    // var roomName = document.getElementById("create-room-name").value;
    // console.log(roomName);
    // socket.emit("join_room", roomName);

    setRoomCreateState(true);
  }

  // function MyComponent({ initialId, onSave }) {
  //   const [newId, setNewId] = useState(initialId)

  //     return (
  //       <li>
  //         <input
  //           type="text"
  //           placeholder="Enter new ID"
  //           onChange={(e) => setNewId(e.target.value)}
  //         />
  //         <button onClick={() => onSave(newId)}>Save</button>
  //       </li>
  //     )
  //   }


  return (

    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1>Welcome to Rock Paper Scissors Crypto</h1>
      </div>
      <div className={styles.newGameButtons}>
        <li><input id="id-input" type="text" placeholder="Enter new ID" />
          <button data-input="#id-input" onClick={(e) => this.saveKonfigElementHandler(e)}>Save</button></li>
        <button className={styles.joinGame} onClick={() => MyComponent()}>Join Game</button>
        { }
        <button className={styles.NewGame} onClick={() => handleCreateButtonPressed()}>New Game</button>
      </div>
    </div>
  )
}
