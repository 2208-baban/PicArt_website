document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".container");
  const loadMoreButton = document.querySelector("#load-more");
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const itemsPerPage = 9;
  let currentPage = 1;
  let currentQuery = "";

  function fetchUnsplashPhotos(query) {
    const apiKey = "22hIUXy7Iu3wWtMLJHrFjsjBV0rtMScEeW3drXSXlu0";
    const apiUrl = `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=${itemsPerPage}&query=${query}&client_id=${apiKey}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => data.results)
      .catch((error) => {
        console.error("Error fetching photos:", error);
        return [];
      });
  }

  function renderPhotos(photos) {
    photos.forEach((photo) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = photo.description;

      const h2 = document.createElement("h2");
      h2.textContent = photo.alt_description || "Untitled";

      const p = document.createElement("p");
      p.textContent = photo.description || "No description available";

      card.appendChild(img);
      card.appendChild(h2);
      card.appendChild(p);

      container.appendChild(card);
    });
  }

  function loadMore() {
    currentPage++;
    if (currentQuery) {
      fetchUnsplashPhotos(currentQuery).then((photos) => renderPhotos(photos));
    }
  }

  function searchPhotos() {
    currentPage = 1;
    currentQuery = searchInput.value.trim();
    container.innerHTML = ""; // Clear the existing content
    if (currentQuery) {
      fetchUnsplashPhotos(currentQuery).then((photos) => renderPhotos(photos));
    }
  }

  loadMoreButton.addEventListener("click", loadMore);
  searchButton.addEventListener("click", searchPhotos);

  // Initial load (show some random photos)
  const initialQuery = "random"; // Change this to your default query
  searchInput.value = initialQuery;
  searchPhotos();
});
