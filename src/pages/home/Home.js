import logo from './Group 56 (1).svg'
import right from './Arrow 3 (1).png'
import left from './Arrow 2.png'
import dropdownarrow from './dropdown-arrow.svg'

import './Home.css'
import { useEffect, useState } from 'react'

const Home = () => {
    const [periodType, setPeriodType] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)
    var currentDate = new Date();
    var currentTimeString = currentDate.toLocaleTimeString();
    
    useEffect(() => {
        var currentDate = new Date();
        var currentTimeString = currentDate.toLocaleTimeString();
        let currentTimeArray = currentTimeString.split(':')
        setCurrentTime(currentTimeArray)
    }, [])

    useEffect(() => {
        console.log(currentTime)
    }, [currentTime])

    const scheduleSample = [
        {
            time: '9:30 - 10:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
        {
            time: '10:30 - 11:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
        {
            time: '11:30 - 12:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
        {
            time: '12:30 - 13:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
        {
            time: '13:30 - 14:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
        {
            time: '14:30 - 15:30',
            room: 203,
            teacher: 'Беготаев Айдар',
            group: 12
        },
    ]

    const handleDay = () => {
        setPeriodType(0)
    }

    const handleWeek = () => {
        setPeriodType(1)
    }

    const handleMonth = () => {
        setPeriodType(2)
    }
    
    return(
        <main>
            <div className='wrapper'>
                <header>
                    <div className='website-info'>
                        <div className='website-logo'>
                            <img src={logo} alt=''/>
                            <p className='website-name'>OKU</p>
                            <div className='vert-line'></div>
                            <p className='website-spec'>журнал <br></br> посещений</p>
                        </div>
                        <p className='page-title'>ГЛАВНАЯ СТРАНИЦА</p>
                    </div>
                    <nav>
                        <div className='switch-buttons'>
                            <button className='switch-button'><img src={left} alt=''/></button>
                            <button className='switch-button left'><img src={right} alt=''/></button>
                            <p className='period-label'>08.12.23</p>
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
                </header>
                <main>
                    <div className='main-info'>
                        <p className='branch-office'>Улица Достык, 17</p>
                        <p className='subject-label'>Английский язык</p>
                    </div>

                    <div className='main-schedule'>
                        <header className='main-header'>
                            <p className='schedule-label'>ПЯТНИЦА</p>
                        </header>
                        <main className='main-block'>
                            {scheduleSample.map((item, i) => {
                                return(
                                    <div className='lesson-block'>
                                        <div className='left-info'>
                                            {
                                                item.time.split('-')
                                            }
                                        </div>
                                        <div className='right-info'>

                                        </div>
                                    </div>
                                )
                            })}
                        </main>
                    </div>
                </main>
            </div>
        </main>                                                                                                                 
    )
}

export default Home;