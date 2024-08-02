const countries = document.getElementById("cards");
const weathermap = document.getElementById("weather")

async function getcountries(){
    const url = await fetch("https://restcountries.com/v3.1/all")
    const res = await url.json();
    console.log(res)
    
    res.forEach(Element=>{
        showcountry(Element)
    })
}
getcountries()

function showcountry(data){
const country = document.createElement("div")
country.setAttribute("class","country")

country.innerHTML = `<div class="card" style="width: 18rem;">
  <img src="${data.flags.png}" class="card-img-top" alt="country">
  <div class="card-body">
    <h5 class="card-title">${data.name.official}</h5>

  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Capital : ${data.capital}</li>
    <li class="list-group-item">Location : ${data.latlng}</li>
    <li class="list-group-item">Population : ${data.population}</li>
  </ul>
  <div class="card-body">
     <button href="#" class="btn btn-primary" onclick="btn(${data.latlng[0]},${data.latlng[1]})">Check for weather</button>
      </div>
</div>`
countries.appendChild(country)
}


function btn(lat,lng){
    countries.style.display = "none";
    weathermap.style.display = "flex";
    getweathermapdata(lat,lng)
}

async function getweathermapdata(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=f3a419ab7ab02bcafdccf93381e74575`)
    .then((res)=>res.json())
    .then((get)=>{
        console.log(get);
        const div = document.createElement("div")
        div.setAttribute("class","weathermapdata")
        div.innerHTML = 
        `<div class="card" style="width: 18rem;">
            <div class="card-header">
                <h5>${get.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Temp : ${get.main.temp}</li>
                <li class="list-group-item">deg : ${get.wind.deg}</li>
                <li class="list-group-item">description : ${get.weather[0].description}</li>
                <button class="card-header bg-danger"onclick="window.location.reload();">back to home </button>
            </ul>
            </div>`
            
            weathermap.appendChild(div)
    })

}
