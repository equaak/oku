import { Outlet } from 'react-router-dom';
import logo from '../../pages/home/Group 56 (1).svg'
import cap from './cap.svg'
import './Layout.css'

const Layout = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
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
                </header>
                <Outlet />

                <footer>
                    <img src={cap} alt=''/>
                    <p className='currentyear'>{currentYear}</p>
                </footer>
            </div>
        </main>
    )
}

export default Layout;