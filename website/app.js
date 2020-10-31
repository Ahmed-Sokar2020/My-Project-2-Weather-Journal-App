// create global variables at the top
const myBaseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=&q=Zefta,EG&units=imperial'
const myApiKey = '&appid=150751a25589947f877272b9ecbe9346';
const myNewZip =  document.getElementById("zip");

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e){
  let myFeel =  document.getElementById("feelings").value;
  let myDate = new Date();

// if statement
  if (myNewZip.value != ""){
    getZip(myBaseURL,myNewZip,myApiKey) // to call our async GET request to the OpenWeatherMap API.
  
// to log the weather data to the console 
  .then( (data) => {
    console.log(data)

    const myTemp = data.main.temp
    console.log(myTemp)

// to add the API data, as well as data entered by the user, to our app
  postData("/add", {date: myDate, temp: myTemp, content: myFeel});

// another Promise that updates the UI dynamically
  updateUI()
})

  }else{
  alert("Please Enter Zip Code");
}
}
 

// Function to GET Web API Data
const getZip = async (url = "", data = {})=>{
  const res = await fetch(myBaseURL+myNewZip+myApiKey, {method:'GET'})
  try{
    const data = await res.json()
    console.log(data)
    return  data 
   
  }catch(error){
    console.log("error", error)
  }
};



// Function to POST data to the server
const postData = async ( url = '', data = {})=>{

  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin', 
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data), // body data type must match "Content-Type" header        
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
  console.log("error", error);
  }
};



// Function to GET Project Data--> retrieve data from our app
const updateUI = async () => {
  const request = await fetch("/all");
  try{
    const myAllData = await request.json();
    console.log(myAllData);
    document.getElementById('date').innerHTML = myAllData[myAllData.length-1].date;
    document.getElementById('temp').innerHTML = myAllData[myAllData.length-1].temp;
    document.getElementById('content').innerHTML = myAllData[myAllData.length-1].content;

  }catch(error){
    console.log("error", error);
  }
};





















      