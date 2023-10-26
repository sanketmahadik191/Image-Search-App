const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const fotmElement = document.querySelector("form");
const searchElement = document.getElementById("search-input");
const searchOutputElement = document.querySelector(".search-results");
const searchMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchElement.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchOutputElement.innerHTML = "";
    }

    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchOutputElement.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        searchMoreButton.style.display = "block";
    }
}

fotmElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

searchMoreButton.addEventListener("click", () => {
    searchImages();
});