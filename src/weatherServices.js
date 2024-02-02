const apiKey = '5fa957a6cbd2c5e398e28868eded2766';


const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`;





const getFormattedWeatherData = async (cityName, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    const data = await fetch(URL)
    .then( (res) => res.json())
    .then( (data) => data)
    
    

    // console.log(data);

    const {
        weather,
        main : {temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind : { speed },
        sys :  { country },
        name,

    } = data;

    const { description , icon} = weather[0];

    return {
        description,
        iconURL : makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export {getFormattedWeatherData};