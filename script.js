let viewport = document.querySelector("meta[name=viewport]")
viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0")

document.documentElement.style.setProperty(
    "overflow", "auto");
const metaViewport = document.querySelector("meta[name=viewport]");
metaViewport.setAttribute("content", "height=" + window.innerHeight + "px, width=device-width, initial-scale=1.0");
const button = document.getElementById("submit");


    const weather = {
        Array: ["clear","drizzle","hail","overcast","partly cloudy","rain","raindrops","thunderstorm","wind","rainy", "fog", "mist", "dust", "cloudy", "haze"],

    api_key: "a208be024f2841ee971ae642b79334f7",

    get_weather: function (city) {
        console.log("City:" + city);
        fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${this.api_key}`)
            .then(a => a.json())
            .then((data) => {
                this.display_weather(data);
            })
    },

    display_weather: function (data) {
        console.log(data);
        const { temp, app_temp, city_name, aqi, precip, wind_spd, rh } = data.data[0];
        const { description, icon } = data.data[0].weather;
        const matches = this.Array.filter(s => description.toLowerCase().includes(s));
        console.log(matches);
        document.querySelector('img').src = `./icons/${matches[0]}.svg`;
        document.getElementById("Temp").innerHTML = temp + "&degC";
        document.getElementById("aqi").innerHTML = "AQI:" + aqi;
        document.getElementById("desc").innerHTML = description;
        document.getElementById("location").innerHTML = city_name;
        document.getElementById("Other").innerHTML = `
                Feels Like: ${app_temp}&degC<br>
                Wind Speed: ${wind_spd}<br>
        `;
        document.getElementsByClassName("wrap")[0].style.display = "block";
    }
}


button.addEventListener("click", () => {
    let city = document.getElementById("search").value;
    weather.get_weather(city);
});

document.getElementById("search").addEventListener("keypress", (event) => {
    let city = document.getElementById("search").value;
    if (event.key === "Enter") {
        console.log(event);
        weather.get_weather(city);
    }
});

    
