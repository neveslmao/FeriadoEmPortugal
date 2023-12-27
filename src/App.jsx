import { useState } from 'react';
import './App.css'

function replaceSpace(inputString) {
  return inputString.replace(" ", "+");
}

function App() {

  function updateHolidayName(date) {
    let isHoliday = false;

    fetch('https://date.nager.at/api/v3/PublicHolidays/2023/pt').then(async (response) => {
      let holidays = await response.json();
  
      for (let holiday of holidays) {
        if (holiday["date"] == date) {
          setHolidayName(holiday["localName"]);
          setIsHoliday(true);
          setSearch(`https://www.google.com/search?q=${holidayName}+Feriado`);
          return;
        }
      }
      setIsHoliday(false);
    })
  }

  const today = new Date();
  updateHolidayName(`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`);

  const [search, setSearch] = useState("Loading...");
  const [holidayName, setHolidayName] = useState("Loading...");
  const [isHoliday, setIsHoliday] = useState(false);~

  console.log(search);

  let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (<>
    <h2>É feriado em Portugal?</h2>
    { isHoliday && <h1>SIM</h1> }
    { !isHoliday && <h1>NÃO</h1> }
    { isHoliday && <h3>Dia {today.getDate()} de {months[today.getMonth()]} de {today.getFullYear()} celebra-se o feriado “<a href={search}>{holidayName}</a>”!</h3> }
    <footer>Feito por Iúri Neves com &lt;3</footer>
    </>
  )
}

export default App
