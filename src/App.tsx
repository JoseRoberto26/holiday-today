import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
const API_TOKEN = 'anIubHNmMjZAZ21haWwuY29tJmhhc2g9MjUwOTMzMTUw';

function App() {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [holiday, setHoliday] = useState<string>('');
  const hoje = new Date();

	useEffect(() => {
    let holidayAux = '';
		navigator.geolocation.getCurrentPosition((info: Position) => {
      const latitude = info.coords.latitude.toString();
      const longitude = info.coords.longitude.toString();
      axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`).then(
        res => { 
          console.log(res.data.city, res.data.state);
          axios.get(`https://api.calendario.com.br/?json=true&ano=${hoje.getFullYear()}&estado=${res.data.state}&cidade=${res.data.city}&token=${API_TOKEN}`).then(response => { 
            response.data.map((holiday: any) => { 
              if(new Date(holiday.date.split('/').reverse().join('/')) >= hoje && !holidayAux){
                  holidayAux = holiday.name
                  setHoliday(holiday.name);
              }
              console.log(holiday.name, holiday.date, new Date(holiday.date.split('/').reverse().join('/')) >= hoje);
            })
          })
        }
      )
		});
	}, []);

	return (
		<div className="main-container">
      <div className="center-box">
			{loading ? (
				<div>Loading</div>
			) : (
				<>
					<h1>When it's the next holiday?!</h1>
          <h2>City - State</h2>
					<h2>{`Feriado ${holiday} - xx/xx/xxxx`}</h2>
					<h3>Hang tight! Just X more days and you will be fine!</h3>
        </>
      )}
      </div>
		</div>
	);
}

export default App;
