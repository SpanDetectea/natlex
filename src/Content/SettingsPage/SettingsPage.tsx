import React from 'react';
import './SettingsPage.scss'
import { useDispatch } from 'react-redux';
import { deleteChart, setNewChart, editChartValue } from '../../store/actions';
import { useState } from 'react';
import ChartList from './ChartList/ChartList';
import ModalHeader from './ModalHeader/ModalHeader';
import ModalFooter from './ModalFooter/ModalFooter';
import ModalBody from './ModalBody/ModalBody';
import { useTypedSelector } from '../../Hooks/useTypedSelector/useTypedSelector';

type TState = string | boolean;

function Settings() {
    const chartList = useTypedSelector(state => state.content.chartList);
    const days = useTypedSelector(state => state.content.data);
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [color, setColor] = useState('#6c757d')
    const [data, setData] = useState('')
    const [type, setType] = useState('line')
    const [isActiveColor, setIsActiveColor] = useState(false);
    const [state, setstate] = useState<TState>(false)

    const setNC = () => {
        state === 'add' ? dispatch(setNewChart(title, color, data.split(','), type)) 
        : dispatch(editChartValue(title, color, Array.isArray(data) ? data : data.split(','), +state, type))
        setstate(false)
    }
    const toggleActiveColor = () => setIsActiveColor(!isActiveColor)
    const toggleState = () => setstate(!state);
    const delChart = (id?: number) => dispatch(deleteChart(id))
    const addChart = () => {
        setstate('add');
        setTitle('')
        setData('')
        setColor('#6c757d')
    }
    const editChart = (index?: number):void => {
        setTitle(chartList[index].name);
        setColor(chartList[index].color);
        setType(chartList[index].type)
        const nameProp = chartList[index].nameEn;
        const dayData = days.map(item => item[nameProp])
        setData(dayData);
        setstate(`${index}`)
    }
    const setChartColor = (color: string) => setColor(color);
    const setChartTitle = (value: string) => setTitle(value);
    const setChartData = (value: string) => setData(value);
    const setChartType = (value: string) => setType(value)
    return <div className="settings container-sm">
        <ul className="list-group">
            {chartList.map((item, index) => {
                return <ChartList chart={item} index={index} editChart={editChart} delChart={delChart} key={index}/>
            })
            }
        </ul >
        <button type="button" className="btn btn-primary mt-4" onClick={addChart} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add chart
        </button>

        <div className={"modal fade" + (state ? ' show' : "")} style={state ? { display: 'block' } : null} id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <ModalHeader toggleState={toggleState} />
                    <ModalBody
                        setChartTitle={setChartTitle} title={title} data={data}
                        setChartData={setChartData} toggleActiveColor={toggleActiveColor}
                        setChartColor={setChartColor} type={type} setChartType={setChartType}
                        color={color} isActiveColor={isActiveColor}
                    />
                    <ModalFooter setNC={setNC} toggleState={toggleState} title={title} data={data}/>
                </div>
            </div>
        </div>
    </div >
}

export default Settings;