import './App.css';
import Axios from "axios";
import React, {useState, useEffect} from "react";

function App() {
  const [currency1, setCurrency1] = useState("")
  const [currency2, setCurrency2] = useState("")
  const [amount, setAmount] = useState("")
  const [result, setResult] = useState("")

  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    setLoggedIn(JSON.parse(window.localStorage.getItem('loggedIn')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('loggedIn', loggedIn);
  }, [loggedIn]);

  const register = () => {
    Axios.post('http://localhost:3001/register',{
      username: usernameReg,
      password: passwordReg,
    })
   .then((response)=>{
     console.log(response);
   });
 };

  const login = () => {
     Axios.post('http://localhost:3001/login',{
       username: username,
       password: password,
     })
    .then((response)=>{
      if(response.data.message){
        setLoginStatus(response.data.message)
      }else{
        setLoginStatus(response.data[0].username);
        setLoggedIn(true)
        window.localStorage.setItem('user', JSON.stringify(response.data[0].username));
        window.location.reload()
      }
      console.log(response.data)
    });
  };
  
  function logout(){
    setLoggedIn(false)
    localStorage.clear()
    window.location.reload()
  }

  function calculate(){
  fetch(`https://api.fastforex.io//convert?from=${currency1}&to=${currency2}&amount=${amount}&api_key=6944b2a3b3-643cb1d4d0-r96ytq`)
   .then(res => res.json())
   .then((data)=>{
       setResult(data.result[(currency2)])
   });
  }

  return (
    <div className="App">
     <h1>Register</h1>
     <input type="text" placeholder="Name" 
     onChange={(e)=>{
       setUsernameReg(e.target.value);
     }}>
     </input><br/>
     <input type="text" placeholder="Password" 
     onChange={(e)=>{
       setPasswordReg(e.target.value);
     }}></input>
     <br/>
     <button onClick={register}>Register</button>

     <h1>Login</h1>
     <input type="text" placeholder="Name" 
     onChange={(e)=>{
       setUsername(e.target.value);
     }}>
     </input><br/>
     <input type="text" placeholder="Password" 
     onChange={(e)=>{
       setPassword(e.target.value);
     }}></input>
     <br/>
     <button onClick={login}>Login</button>

    {(loggedIn)===true &&
    <>
    <h1>Hi {JSON.parse(window.localStorage.getItem('user'))}! please enter your desired currency exchange</h1>
    <button onClick={logout}>Log Out</button><br/><br/>
     <div>
       <div>
         <select value={currency1} onChange={(e)=>{setCurrency1(e.target.value)}} id="currency1">
           <option>---</option>
           <option value="EUR" >EUR</option>
           <option value="GBP" >GBP</option>
           <option value="USD" >USD</option>
           <option value="GBP" >CAD</option>
           <option value="RON" >RON</option>
         </select>
         <input onChange={(e)=>{setAmount(e.target.value)}} type="number" id="amount1" placeholder="0" ></input>
         <select value={currency2} onChange={(e)=>{setCurrency2(e.target.value)}} id="currency2">
           <option>---</option>
           <option value="EUR" >EUR</option>
           <option value="GBP" >GBP</option>
           <option value="USD" >USD</option>
           <option value="GBP" >CAD</option>
           <option value="RON" >RON</option>
         </select>
      </div>
      <br/>
      <button onClick={calculate}>Convert</button>
      <h2>{result}</h2>
     </div>
    </>}

    {(loggedIn)===false &&
    <>
    <h1>{loginStatus}</h1>
    </>}
    
    </div>
  );
}

export default App;
