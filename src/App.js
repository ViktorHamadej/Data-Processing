import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

let urls = [];

for(var x = 1; x < 6; x++){
  urls.push('https://dev.energo.itsmart.sk:8081/api/data/actual/' + x);
}

const requests = urls.map((url) => axios.get(url));


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    var resp_data = [
      ["nazov", "hodnota", "jednotka", "timestamp"],
      ["nazov", "hodnota", "jednotka", "timestamp"],
      ["nazov", "hodnota", "jednotka", "timestamp"],
      ["nazov", "hodnota", "jednotka", "timestamp"],
      ["nazov", "hodnota", "jednotka", "timestamp"]
    ];

    axios.all(requests)
    .then((response) => {
      response.forEach((resp) => {
        var pass = true;
        for(var v = 0; v < 5; v++){
          if(pass === true){
            if(resp_data[v][0] === "nazov"){
              resp_data[v][0] = resp.data.nazov;
              resp_data[v][1] = resp.data.hodnota;
              resp_data[v][2] = resp.data.jednotka;

              var timestampArray = resp.data.timestamp.split("T");
              var dateArray = timestampArray[0].split("-");
              var timeArray = timestampArray[1].split(":");

              resp_data[v][3] = dateArray[2] + "." + dateArray[1] + "." + dateArray[0] + " " + timeArray[0] + ":" + timeArray[1];

              pass = false;
            }
          }
        }
      });
      setData(resp_data);
    });
  }, []);

  const arr = data.map((info, index) => {
    return (
      <div className="main" key={index}>
        <div className="main-name">{info[0]}</div>
        <div className="main-body">
          <div>Hodnota: {info[1]} {info[2]}</div>
          <div>Posledný záznam: {info[3]}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="App">
      {arr}
    </div>
  );
}

export default App;
