import logo from './Group 56 (1).svg'
import right from './Arrow 3 (1).png'
import left from './Arrow 2.png'
import dropdownarrow from './dropdown-arrow.svg'

import './Home.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import userStore from '../../store/UserStore'
import { useFetcher, useNavigate } from 'react-router-dom';

const Home = () => {
    const [periodType, setPeriodType] = useState(0)
    const [schedule, setSchedule] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [month, setMonth] = useState(currentDate.getMonth() + 1)
    const [year, setYear] = useState(currentDate.getFullYear())
    const [day, setDay] = useState(currentDate.getDate())
    const [weekDay, setWeekDay] = useState('')
    const navigate = useNavigate();
    const lessonCount = 6;
    

    const convertWeekDay = (index) => {
        switch(index){
            case 1: 
                return 'Понедельник';
            case 2: 
                return 'Вторник';
            case 3:
                return 'Среда';
            case 4: 
                return 'Четверг';
            case 5: 
                return 'Пятница';
            case 6:
                return 'Суббота';
            case 7: 
                return 'Воскресенье';
        }
    }


    useEffect(() => {
        if(userStore.user === null){
            navigate('/')
        }
        let tempWeekDay = convertWeekDay(currentDate.getDay());
        setWeekDay(tempWeekDay)
        getschedule()
    }, [])

    useEffect(() => {
        getschedule()
    }, [periodType])

    useEffect(() => {
        setDay(currentDate.getDate())
        setMonth(currentDate.getMonth() + 1)
        setYear(currentDate.getFullYear())
    }, [currentDate])

    const compareTimes = (time1, time2) => {
        let [hours1, minutes1] = time1.split(":").map(Number);
        let [hours2, minutes2] = time2.split(":").map(Number);
    
        var totalMinutes1 = hours1 * 60 + minutes1;
        var totalMinutes2 = hours2 * 60 + minutes2;

        if (totalMinutes1 < totalMinutes2) {
            return -1;
        } else if (totalMinutes1 > totalMinutes2) {
            return 1;
        } else {
            return 0;
        }
    }

    const getschedule = async () => {
        let monthString = month;
        let dayString = day;
        if(month < 10){
            monthString = '0' + monthString;
        }
        if(day < 10){
            dayString = '0' + dayString;
        }
        let responce;
        if(periodType === 2){
            responce = await axios.get('http://localhost:5000/schedule/month?month=03');
        }
        else if(periodType === 1){
            responce = await axios.get('http://localhost:5000/schedule/week?date=2024-01-20');

        }
        else{
            responce = await axios.get(`http://localhost:5000/schedule/day?date=${year}-${monthString}-${dayString}`);
            if (responce.data.length == 0){
                let tempSchedule = [];
                for(let i = 0; i < lessonCount; i++){
                    tempSchedule.push('-');
                }
                setSchedule(tempSchedule);
            }
            else{
                let tempSchedule = [];
                let currentTimeString = currentDate.toLocaleTimeString();
                let curTime = currentTimeString.split(':')[0] + ':' + currentTimeString.split(':')[1];
                for(let i = 0; i < lessonCount; i++){
                    if(responce.data[i] !== undefined){
                        if(responce.data[i].start_of_lesson !== undefined && responce.data[i].end_of_lesson !== undefined){
                            if(compareTimes(responce.data[i].start_of_lesson, curTime) === -1 && compareTimes(responce.data[i].end_of_lesson, curTime) === 1){
                                responce.data[i]['active'] = 'Идет';
                            }
                            else if(compareTimes(responce.data[i].start_of_lesson, curTime) === 1 && compareTimes(responce.data[i].end_of_lesson, curTime) === 1){
                                responce.data[i]['active'] = 'Прошел';
                            }
                            else{
                                responce.data[i]['active'] = 'Не начат';
                            }
                        }
                    }
                    tempSchedule.push(responce.data[i]);
                }
                setSchedule(tempSchedule);
            }
        }
    }    
    const handleDay = () => {
        setPeriodType(0)
    }

    const handleWeek = () => {
        setPeriodType(1)
    }

    const handleMonth = () => {
        setPeriodType(2)
    }

    const handlePrev = () => {
        let prevDate = new Date()
        prevDate.setDate(currentDate.getDate() - 1)
        if (prevDate.getMonth() !== currentDate.getMonth()) {       
            prevDate.setMonth(currentDate.getMonth()-1);
            if(prevDate.getFullYear() !== currentDate.getFullYear()){
                prevDate.setFullYear(currentDate.getFullYear() - 1);
            }
            else{
                prevDate.setFullYear(currentDate.getFullYear());
            }
        }
        setCurrentDate(prevDate)
    }
    
    const handleNext = () => {
        let nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);

    
        if (nextDate.getMonth() !== currentDate.getMonth()) {       
            nextDate.setMonth(currentDate.getMonth()+1);
            if(nextDate.getFullYear() !== currentDate.getFullYear()){
                nextDate.setFullYear(currentDate.getFullYear() + 1);
            }
            else{
                nextDate.setFullYear(currentDate.getFullYear());
            }
        }
        setCurrentDate(nextDate);
    }
    
    return(
        <main>
            <div className='wrapper'>
                <nav>
                    <div className='switch-buttons'>
                        <button className='switch-button' onClick={handlePrev}><img src={left} alt=''/></button>
                        <button className='switch-button left' onClick={handleNext}><img src={right} alt=''/></button>
                        <p className='period-label'>{day}.{month}.{year}</p>
                    </div>
                    <div className='dropdown-menus'>
                        <div className='dropdown-menu'>
                            <img src={dropdownarrow} alt=''/>
                            <p className='dropdown-name'>ФИЛИАЛ</p>
                        </div>
                        <div className='dropdown-menu'>
                            <img src={dropdownarrow} alt=''/>
                            <p className='dropdown-name'>ПРЕДМЕТ</p>
                        </div>
                    </div>
                    <div className='period-types'>
                        <button onClick={handleMonth} className={periodType === 2 ? 'active' : ''}>Месяц</button>
                        <button onClick={handleWeek} className={periodType === 1 ? 'active' : ''}>Неделя</button>
                        <button onClick={handleDay} className={periodType === 0 ? 'active' : ''}>День</button>
                    </div>
                </nav>
                <main>
                    <div className='main-info'>
                        <p className='branch-office'>Улица Достык, 17</p>
                        <p className='subject-label'>Английский язык</p>
                    </div>

                    <div className='main-schedule'>
                        <header className='main-header'>
                            <p className='schedule-label'>{weekDay}</p>
                        </header>
                        <main className='main-block'>
                            {periodType === 0 ? 
                                schedule.map((item) => {
                                    return(
                                        <div className='lesson'>
                                            <div></div>
                                        </div>
                                    )
                                })                            
                            :                             
                            ''}
                            {periodType === 1 ? <div></div> : ''}
                            {periodType === 2 ? <div></div> : ''}
                        </main>
                    </div>
                </main>
            </div>
        </main>                                                                                                                 
    )
}

export default Home;