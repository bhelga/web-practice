import { useState } from 'react';
import './App.css';

import Calendar from './components/calendar/Calendar';
import ToggleButton from './components/toggleButton/ToggleButton';

function App() {
  const [chosenCalendarType, setChosenCalendarType] = useState('single');

  const handleCallback = (childData) => {
    setChosenCalendarType(childData);
  }

  return (
    <div className="main">
      <ToggleButton parentCallback = {handleCallback}></ToggleButton>
      <Calendar type={chosenCalendarType}></Calendar>
    </div>
  );
}

export default App;
