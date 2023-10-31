const accessKey = 'APY-KEY';
const apiUrl = 'https://api.unsplash.com/photos/random/?client_id=' + accessKey;
const historyKey = 'photoHistory';

const randomImage = document.getElementById('randomImage');
const photographerName = document.getElementById('photographerName');
const photographerUsername = document.getElementById('photographerUsername');
const likeButton = document.getElementById('likeButton');
const likeCount = document.getElementById('likeCount');
const prevButton = document.getElementById('prevButton');

let likes = 0;
let photoHistory = [];

// Функция для загрузки случайного изображения и информации о фотографе
async function fetchRandomImage() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographer = data.user;

        // Добавляем текущее изображение в историю просмотров
        photoHistory.push({
            imageUrl,
            photographerName: photographer.name,
            photographerUsername: photographer.username,
        });

        // Обновляем изображение
        randomImage.src = imageUrl;

        // Отображаем информацию о фотографе
        photographerName.textContent = photographer.name;
        photographerUsername.textContent = photographer.username;
    } catch (error) {
        console.error('Ошибка при загрузке изображения: ', error);
    }
}

// Функция для обработки нажатия кнопки "Лайк"
function handleLike() {
    likes++;
    likeCount.textContent = likes;
}

// Функция для обработки нажатия кнопки "Предыдущее фото"
function showPreviousPhoto() {
    if (photoHistory.length > 1) {
        photoHistory.pop();

        const previousPhoto = photoHistory[photoHistory.length - 1];

        randomImage.src = previousPhoto.imageUrl;
        photographerName.textContent = previousPhoto.photographerName;
        photographerUsername.textContent = previousPhoto.photographerUsername;
    }
}

fetchRandomImage();

// Загружаем случайное изображение и информацию о фотографе при загрузке страницы
fetchRandomImage();

// Восстанавливаем количество лайков из локального хранилища
const storedLikes = localStorage.getItem('likes');
if (storedLikes !== null) {
    likes = parseInt(storedLikes);
    likeCount.textContent = likes;
}

// Добавляем обработчики событий для кнопок "Лайк" и "Предыдущее фото"
likeButton.addEventListener('click', handleLike);
prevButton.addEventListener('click', showPreviousPhoto);

// Автоматически меняем изображение каждые 5 секунд
setInterval(fetchRandomImage, 5000);  // Добавьте эту строку