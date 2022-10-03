import {
    SET_DATA__CONTENT, TOGGLE__LIST__ACTIVE, TOGGLE__VIEW__ACCORDION,
    SET__NEW__CHART, DELETE__CHART, EDIT__CHART, UPDATE__CHART
} from './const'
let initialState = {
    data: [],
    chartList: [
        {
            name: 'Прогноз максимальной температуры по Цельсию',
            isActive: true,
            isView: true,
            nameEn: 'maxtemp_c',
            color: '#dc3545',
            type: 'line'
        },
        {
            name: 'Прогноз минимальной температуры по Цельсию',
            isActive: true,
            isView: true,
            nameEn: 'mintemp_c',
            color: '#0d6efd',
            type: 'column'
        },
        {
            name: 'Прогноз максимальной температуры по Фаренгейту',
            isActive: true,
            isView: true,
            nameEn: 'maxtemp_f',
            color: '#ffc107',
            type: 'line'
        },
        {
            name: 'Прогноз минимальной температуры по Фаренгейту',
            isActive: false,
            isView: true,
            nameEn: 'mintemp_f',
            color: '#dc3545',
            type: 'line'
        },
        {
            name: 'Прогноз средней температуры по Цельсию',
            isActive: true,
            isView: true,
            nameEn: 'avgtemp_c',
            color: '#dc3545',
            type: 'line'
        },
        {
            name: 'Прогноз средней температуры по Фаренгейту',
            isActive: true,
            isView: true,
            nameEn: 'avgtemp_f',
            color: '#dc3545',
            type: 'line'
        },
        {
            name: 'Прогноз максимальной скорости ветра миль/час',
            isActive: true,
            isView: true,
            nameEn: 'maxwind_mph',
            color: '#dc3545',
            type: 'line'
        },
        {
            name: 'Прогноз максимальной скорости ветра километров/час',
            isActive: true,
            isView: true,
            nameEn: 'maxwind_kph',
            color: '#dc3545',
            type: 'line'
        },
    ],
    id: 1,
    newData: []
}

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA__CONTENT:
            return {
                ...state,
                data: action.data.forecast.forecastday.map(item => item.day)
            }
        case TOGGLE__LIST__ACTIVE:
            return {
                ...state,
                chartList: state.chartList.map((item, i) => {
                    if (i === action.index) {
                        item.isActive = !item.isActive
                    }
                    return item
                })
            }
        case TOGGLE__VIEW__ACCORDION:
            return {
                ...state,
                chartList: state.chartList.map((item, i) => {
                    if (i === action.index) {
                        item.isView = !item.isView
                    }
                    return item
                })
            }
        case SET__NEW__CHART:
            let newProp = `newProp${state.id}`;
            return {
                ...state,
                chartList: [...state.chartList, {
                    name: action.name,
                    isActive: true,
                    isView: true,
                    nameEn: newProp,
                    color: action.color,
                    type: action.t
                }],
                id: state.id + 1,
                data: state.data.map((item, index) => {
                    if (!Number.isNaN(+action.data[index])) {
                        item[newProp] = +action.data[index];
                    }
                    return item;
                }),
                newData: [...state.newData, {
                    nameEn: newProp,
                    data: [...state.data.map(item => item[newProp])]
                }]
            }
        case DELETE__CHART:
            return {
                ...state,
                chartList: [...state.chartList.slice(0, action.id), ...state.chartList.slice(action.id + 1, state.chartList.length)]
            }
        case EDIT__CHART:
            return {
                ...state,
                chartList: state.chartList.map((item, i) => {
                    if (i === +action.id) {
                        item.color = action.color;
                        item.name = action.name;
                        item.type = action.t;
                    }
                    return item;
                }),
                data: state.data.map((item, i) => {
                    item[state.chartList[action.id].nameEn] = +action.data[i]
                    return item;
                })
            }
        case UPDATE__CHART:
            let days = action.data.forecast.forecastday.map(item => item.day);
            return {
                ...state,
                data: days.map((item, index) => {
                    if (state.newData.length) {
                        state.newData.map(i => {
                            return item[i.nameEn] = i.data[index]
                        })
                    }
                    return item
                })
            }
        default:
            return state;
    }
}

export default contentReducer;