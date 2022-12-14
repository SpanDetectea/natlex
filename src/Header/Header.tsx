import React from 'react';
import {  useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss'
import { weatherApi } from '../api/api';
import { useDispatch} from 'react-redux';
import { setDataContent } from '../store/actions';
import { useTypedSelector } from '../Hooks/useTypedSelector/useTypedSelector';

function Header() {
    const location = useLocation();
    const data = useTypedSelector(state => state.content.data);

    const dispatch=useDispatch();
    useEffect(() => {
        if (!data.length) {
            weatherApi.getWeatherData().then(res => dispatch(setDataContent(res)))
        }
    }, [])

    return <div className="header btn-group my-4">
        <NavLink to='/view'><button type="button" className={"btn btn-primary header__button" + (location.pathname === '/view' ? ' activeBtn' : '')}>View Move</button></NavLink>
        <NavLink to='/settings'><button type="button" className={"btn btn-primary header__button" + (location.pathname === '/settings' ? ' activeBtn' : '')}>Settings</button></NavLink>
    </div>
}

export default Header;