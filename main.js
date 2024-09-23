const today_date=document.getElementById("today_date");
// const day=document.getElementById("day");
const datahide=document.querySelector(".middle_layer");

const submitbtn = document.getElementById("submitbtn");
const cityname = document.getElementById("cityname");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");

const getinfo = async (event) => {
  event.preventDefault();
  let cityval = cityname.value;

  if (cityval === "") {
    city_name.innerText = "Please write the name of the city";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=7fbdd8fd295b9b572a8aa78f87b394e4`;
      const res = await fetch(url);

      // Check if the response is not ok (status code not 200)
      if (!res.ok) {
        throw new Error("City not found");
      }
      const date=new Date();
      today_date.innerText= date.toDateString();
      const data = await res.json(); // Object conversion
      const arrdata = [data];
      city_name.innerText = `${arrdata[0].name}, ${arrdata[0].sys.country}`;
      temp_real_val.innerText = ((arrdata[0].main.temp)-273.15).toFixed(2);
      temp_status.innerText = arrdata[0].weather[0].main;

      const tempmood = arrdata[0].weather[0].main;

      // Update icon based on the weather mood
      if (tempmood === "Clear") {
        temp_status.innerHTML =
          "<i class='fa-sharp fa-solid fa-sun-bright' style='color:#eccc68;'></i>";
      } else if (tempmood === "Clouds") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud' style='color:#f1f2f6;'></i>";
      } else if (tempmood === "Rain") {
        temp_status.innerHTML =
          "<i class='fa-solid fa-cloud-rain' style='color:#a4bobe;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fa-sharp fa-solid fa-sun-bright' style='color:#eccc68;'></i>";
      }
      datahide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = "Please enter the city name properly";
      console.log(error); 
      datahide.classList.add("data_hide");
    }
  }
};

submitbtn.addEventListener("click", getinfo);
