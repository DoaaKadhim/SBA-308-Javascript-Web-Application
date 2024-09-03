
// import * as Carousel from "./Carousel.js";
// import axios from "axios";

// // The breed selection input element.
// const breedSelect = document.getElementById("breedSelect");
// // The information section div element.
// const infoDump = document.getElementById("infoDump");
// // The progress bar div element.
// const progressBar = document.getElementById("progressBar");
// // The get favourites button element.
// const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// // Step 0: Store your API key here for reference and easy access.
// const API_KEY =
//   "a99253b9";
// axios.defaults.baseURL = "https://www.omdbapi.com/";
// axios.defaults.headers.common["x-api-key"] = API_KEY;

// (async function initialLoad() {
//   const res = await axios("/breeds");
//   const breeds = await res.data;

//   breeds.forEach((breed) => {
//     const opt = document.createElement("option");
//     opt.value = breed.id;
//     opt.textContent = breed.name;

//     breedSelect.appendChild(opt);
//   });

//   loadCarousel();
// })();

// breedSelect.addEventListener("change", loadCarousel);
// async function loadCarousel() {
//   const val = breedSelect.value;
//   const url = `/images/search?limit=25&breed_ids=${val}`;

//   const res = await axios(url, {
//     onDownloadProgress: updateProgress
//   });

//   buildCarousel(res.data);
// }

// function buildCarousel(data, favourites) {
//   Carousel.clear();
//   infoDump.innerHTML = "";

//   data.forEach((ele) => {
//     const item = Carousel.createCarouselItem(
//       ele.url,
//       breedSelect.value,
//       ele.id
//     );
//     Carousel.appendCarousel(item);
//   });

//   if (favourites) {
//     infoDump.innerHTML = "Here are your saved favourites!";
//   } else if (data[0]) {
//     const info = data[0].breeds || null;
//     if (info && info[0].description) infoDump.innerHTML = info[0].description;
//   } else {
//     infoDump.innerHTML =
//       "<div class='text-center'>No information on this breed, sorry!</div>";
//   }

//   Carousel.start();
// }

// axios.interceptors.request.use((request) => {
//   console.log("Request Started.");
//   progressBar.style.transition = "none";
//   progressBar.style.width = "0%";
//   document.body.style.setProperty("cursor", "progress", "important");

//   request.metadata = request.metadata || {};
//   request.metadata.startTime = new Date().getTime();

//   return request;
// });

// axios.interceptors.response.use(
//   (response) => {
//     response.config.metadata.endTime = new Date().getTime();
//     response.config.metadata.durationInMS =
//       response.config.metadata.endTime - response.config.metadata.startTime;

//     console.log(
//       `Request took ${response.config.metadata.durationInMS} milliseconds.`
//     );
//     document.body.style.cursor = "default";
//     return response;
//   },
//   (error) => {
//     error.config.metadata.endTime = new Date().getTime();
//     error.config.metadata.durationInMS =
//       error.config.metadata.endTime - error.config.metadata.startTime;

//     console.log(
//       `Request took ${error.config.metadata.durationInMS} milliseconds.`
//     );
//     document.body.style.cursor = "default";
//     throw error;
//   }
// );

// function updateProgress(progressEvent) {
//   const total = progressEvent.total;
//   const current = progressEvent.loaded;
//   const percentage = Math.round((current / total) * 100);

//   progressBar.style.transition = "width ease 1s";
//   progressBar.style.width = percentage + "%";
// }

// export async function favourite(imgId) {
//   const isFavorite = await axios(`/favourites?image_id=${imgId}`);

//   if (isFavorite.data[0]) {
//     await axios.delete(`/favourites/${isFavorite.data[0].id}`);
//   } else {
//     await axios.post("/favourites", {
//       image_id: imgId
//     });
//   }
// }

// getFavouritesBtn.addEventListener("click", () => {
//   getFavourites();
// });
// async function getFavourites() {
//   const favourites = await axios(`/favourites`);

//   const formattedFavs = favourites.data.map((entry) => {
//     return entry.image;
//   });

//   buildCarousel(formattedFavs);
// // }
// import * as Carousel from "./Carousel.js";
// import axios from "axios";

// // The movie selection input element.
// const movieSelect = document.getElementById("movieSelect");
// // The information section div element.
// const infoDump = document.getElementById("infoDump");
// // The progress bar div element.
// const progressBar = document.getElementById("progressBar");
// // The get favourites button element.
// const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// // Step 0: Store your API key here for reference and easy access.
// const API_KEY = "a99253b9";
// axios.defaults.baseURL = "https://www.omdbapi.com/";
// axios.defaults.headers.common["x-api-key"] = API_KEY;

// (async function initialLoad() {
//   const res = await axios("/movies");
//   const movies = await res.data;

//   movies.forEach((movie) => {
//     const opt = document.createElement("option");
//     opt.value = movie.id;
//     opt.textContent = movie.name;

//     movieSelect.appendChild(opt);
//   });

//   loadCarousel();
// })();

// movieSelect.addEventListener("change", loadCarousel);
// async function loadCarousel() {
//   const val = movieSelect.value;
//   const url = `/images/search?limit=25&movie_ids=${val}`;

//   const res = await axios(url, {
//     onDownloadProgress: updateProgress
//   });

//   buildCarousel(res.data);
// }

// function buildCarousel(data, favourites) {
//   Carousel.clear();
//   infoDump.innerHTML = "";

//   data.forEach((ele) => {
//     const item = Carousel.createCarouselItem(
//       ele.url,
//       movieSelect.value,
//       ele.id
//     );
//     Carousel.appendCarousel(item);
//   });

//   if (favourites) {
//     infoDump.innerHTML = "Here are your saved favourites!";
//   } else if (data[0]) {
//     const info = data[0].movies || null;
//     if (info && info[0].description) infoDump.innerHTML = info[0].description;
//   } else {
//     infoDump.innerHTML =
//       "<div class='text-center'>No information on this movie, sorry!</div>";
//   }

//   Carousel.start();
// }

axios.interceptors.request.use((request) => {
    console.log("Request Started.");
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
    document.body.style.setProperty("cursor", "progress", "important");
  
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime();
  
    return request;
  });
  
  axios.interceptors.response.use(
    (response) => {
      response.config.metadata.endTime = new Date().getTime();
      response.config.metadata.durationInMS =
        response.config.metadata.endTime - response.config.metadata.startTime;
  
      console.log(
        `Request took ${response.config.metadata.durationInMS} milliseconds.`
      );
      document.body.style.cursor = "default";
      return response;
    },
    (error) => {
      error.config.metadata.endTime = new Date().getTime();
      error.config.metadata.durationInMS =
        error.config.metadata.endTime - error.config.metadata.startTime;
  
      console.log(
        `Request took ${error.config.metadata.durationInMS} milliseconds.`
      );
      document.body.style.cursor = "default";
      throw error;
    }
  );
  function buildCarousel(data, favourites) {
    Carousel.clear();
    infoDump.innerHTML = "";
  
    data.forEach((ele) => {
      const item = Carousel.createCarouselItem(
        ele.url, // Ensure `ele` has the right properties
        movieSelect.value,
        ele.id
      );
      Carousel.appendCarousel(item);
    });
  
    if (favourites) {
      infoDump.innerHTML = "Here are your saved favourites!";
    } else if (data[0]) {
      const info = data[0].movies || null;
      if (info && info[0].description) infoDump.innerHTML = info[0].description;
    } else {
      infoDump.innerHTML = "<div class='text-center'>No information on this movie, sorry!</div>";
    }
  
    Carousel.start();
  }
  
  function updateProgress(progressEvent) {
    const total = progressEvent.total;
    const current = progressEvent.loaded;
    const percentage = Math.round((current / total) * 100);
  
    progressBar.style.transition = "width ease 1s";
    progressBar.style.width = percentage + "%";
  }
  
  export async function favourite(imgId) {
    const isFavorite = await axios(`/favourites?image_id=${imgId}`);
  
    if (isFavorite.data[0]) {
      await axios.delete(`/favourites/${isFavorite.data[0].id}`);
    } else {
      await axios.post("/favourites", {
        image_id: imgId
      });
    }
  }
  async function getFavourites() {
    try {
      const favourites = await axios(`/favourites`);
      console.log(favourites.data); // Debugging output
      const formattedFavs = favourites.data.map((entry) => entry.image);
      buildCarousel(formattedFavs, true);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  }