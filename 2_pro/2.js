"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для 
отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако 
если длина введенного отзыва менее 50 или более 500 символов, функция должна 
генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.
*/

const reviewsContainer = document.getElementById('reviewsContainer');
const reviewInput = document.getElementById('reviewInput');
const addReviewButton = document.getElementById('addReview');

const initialData = [
  'Отзыв 1: Первый отзыв отзыв.',
  'Отзыв 2: Второй отзыв отзыв.',
];

// Загрузка начальных данных
initialData.forEach(review => {
  addReviewToContainer(review);
});

addReviewButton.addEventListener('click', () => {
  const reviewText = reviewInput.value;
  
  try {
    validateReviewLength(reviewText);
    addReviewToContainer(`Новый отзыв: ${reviewText}`);
    reviewInput.value = ''; // Очистить текстовое поле
  } catch (error) {
    alert(error.message);
  }
});

function validateReviewLength(text) {
  if (text.length < 50 || text.length > 500) {
    throw new Error('Отзыв должен содержать от 50 до 500 символов.');
  }
}

function addReviewToContainer(reviewText) {
  const newReview = document.createElement('div');
  newReview.textContent = reviewText;
  reviewsContainer.appendChild(newReview);
}
