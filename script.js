
document.documentElement.style.setProperty(
    "overflow", "auto");

function fixOrient(){
const metaViewport = document.querySelector("meta[name=viewport]");
metaViewport.setAttribute("content", "height=" + window.innerHeight + "px, width="+ window.innerWidth + "px,  initial-scale=1.0");
}

const button = document.getElementById("submit");
    const weather = {

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
        const { temp, app_temp, city_name, aqi, pres, wind_spd, rh, country_code } = data.data[0];
        const { description, icon } = data.data[0].weather;
        document.querySelector('img').src = `./icons/${icon}.svg`;
        document.getElementById("Temp").innerHTML = temp + "&degC";
        document.getElementById("aqi").innerHTML = "AQI: " + aqi;
        document.getElementById("desc").innerHTML = description;
        document.getElementById("location").innerHTML = city_name + ", " + country_code;
        document.getElementById("Other").innerHTML = `
                Real Feel: ${app_temp}&degC<br>
                Wind Speed: ${wind_spd.toFixed(2)} m/s<br>
                Pressure: ${pres} mb
        `;
        document.getElementsByClassName("wrap")[0].style.display = "block";
    }
}


button.addEventListener("click", () => {
    let city = document.getElementById("search").value;
    weather.get_weather(city);
});

document.getElementById("search").addEventListener("keydown", (event) => {
    let city = document.getElementById("search").value;
    if (event.code === "Enter" || event.key == "Enter") {
        weather.get_weather(city);
    }
});

const ham = document.querySelector(".ham");
ham.addEventListener('click', ()=>{
    document.querySelector(".nav-links").classList.toggle("open");
})

document.addEventListener("click", (e)=>{
    if(e.target.id !== "navbar" && e.target.id !== "bars"){
        console.log(e);
        document.querySelector(".nav-links").classList.remove("open")
    }
})