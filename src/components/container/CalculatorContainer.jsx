import React, { useState } from 'react';
import CalculatorForm from '../pure/CalculatorForm';

import '../../styles/calContainer/containerStyles.css';

const CalculatorContainer = () => {
    const [days, setDays] = useState(null);
    const [months, setMonths] = useState(null);
    const [years, setYears] = useState(null);

    const calculate = (values) =>{
        var currentTime = new Date();
        var currentMonth = currentTime.getMonth() + 1;
        var currentDay = currentTime.getDate();
        var currentYear = currentTime.getFullYear();

        let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        if(values.day > currentDay){
            currentDay = currentDay + daysPerMonth[currentMonth - 1];
            currentMonth = currentMonth - 1;
        }

        if(values.month > currentMonth){
            currentMonth = currentMonth + 12;
            currentYear = currentYear - 1;
        }

        setDays(currentDay - values.day);
        setMonths(currentMonth - values.month);
        setYears(currentYear - values.year);
    }

    return (
        <div className="container">
            <div id='upper-section'>
                <CalculatorForm calculate={calculate}></CalculatorForm>
            </div>
            <div id='lower-section'>
                <p className='value'><span className='date-number'>{ years == null ? '--' : years}</span> years</p>
                <p className='value'><span className='date-number'>{ months == null ? '--' : months}</span> months</p>
                <p className='value'><span className='date-number'>{ days == null ? '--' : days}</span> days</p>
            </div>
        </div>
    );
}

export default CalculatorContainer;
