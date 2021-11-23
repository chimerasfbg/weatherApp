const  cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details'); 
const time = document.querySelector('.time');

const updateUI = (data)=>{
    const cityDets = data.cityDets;
    const weather = data.weather;

    //update details template

    details.innerHTML = `
        <h1 class="cityName">${cityDets.EnglishName}</h1>
            <div class="conditions">${weather.WeatherText}</div>
            <div>
                <span class="temp">${weather.Temperature.Metric.Value}</span>
                <span class="temp">&deg;C </span>
        </div>
    `;
    console.log(data);
    //remove "none " class if present
    if(card.classList.contains('none')){
        card.classList.remove('none');
    }
    let timeSrc = null;

    if(weather.IsDayTime){
        timeSrc = './day.jpg';
    }else{
        timeSrc = './night.jpeg';
    }

    time.setAttribute('src',timeSrc);
};

const updateCity = async  (city)=> {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
    cityDets: cityDets,
    weather:weather
    };
};

cityForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const  city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err))
});