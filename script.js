const apiKey = 'f99c3031e706cc81e8935f988dca6115';
const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const clearButton = document.querySelector('.clear-button');

const fetchPhotos = (query) => {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${encodeURIComponent(query)}&per_page=30&format=json&nojsoncallback=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayPhotos(data.photos.photo);
        })
        .catch(error => console.error('Error fetching photos:', error));
};

const displayPhotos = (photos) => {
    gallery.innerHTML = '';
    photos.slice(0, 12).forEach(photo => {
        const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
        
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('image-container');
        
        const imgElement = document.createElement('img');
        imgElement.src = imgUrl;
        imgElement.alt = photo.title;
        
        imgContainer.appendChild(imgElement);
        gallery.appendChild(imgContainer);
    });
};

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchPhotos(query);
    }
});

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            fetchPhotos(query);
        }
    }
});

clearButton.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
});

searchInput.addEventListener('input', () => {
    clearButton.style.display = searchInput.value ? 'block' : 'none';
});


fetchPhotos('butterfly');