document.addEventListener('DOMContentLoaded', () => {
   const productInput = document.getElementById('productInput');
   const reviewInput = document.getElementById('reviewInput');
   const addReviewButton = document.getElementById('addReviewButton');
   const productsList = document.getElementById('products');
   const productReviews = document.getElementById('productReviews');

   addReviewButton.addEventListener('click', () => {
       const productName = productInput.value.trim();
       const review = reviewInput.value.trim();

       if (productName && review) {
           addReviewToStorage(productName, review);
           productInput.value = '';
           reviewInput.value = '';
       } else {
           alert('Пожалуйста, введите название продукта и отзыв.');
       }
   });

   productsList.addEventListener('click', (event) => {
       if (event.target.tagName === 'LI') {
           const productName = event.target.textContent;
           showReviews(productName);
       }
   });

   productReviews.addEventListener('click', (event) => {
       if (event.target.classList.contains('delete-button')) {
           const reviewText = event.target.getAttribute('data-review');
           const productName = event.target.getAttribute('data-product');
           deleteReviewFromStorage(productName, reviewText);
           showReviews(productName);
       }
   });

   loadProducts();
});

function addReviewToStorage(product, review) {
   let products = JSON.parse(localStorage.getItem('products')) || {};
   if (!products[product]) {
       products[product] = [];
   }
   products[product].push(review);
   localStorage.setItem('products', JSON.stringify(products));
   loadProducts();
}

function deleteReviewFromStorage(product, review) {
   let products = JSON.parse(localStorage.getItem('products')) || {};
   if (products[product]) {
       products[product] = products[product].filter(r => r !== review);
       localStorage.setItem('products', JSON.stringify(products));
   }
}

function loadProducts() {
   const products = JSON.parse(localStorage.getItem('products')) || {};
   const productsList = document.getElementById('products');
   productsList.innerHTML = '';

   for (const product in products) {
       const li = document.createElement('li');
       li.textContent = product;
       productsList.appendChild(li);
   }
}

function showReviews(product) {
   const products = JSON.parse(localStorage.getItem('products')) || {};
   const reviews = products[product] || [];

   const productReviews = document.getElementById('productReviews');
   productReviews.innerHTML = '';

   if (reviews.length === 0) {
       const noReviews = document.createElement('p');
       noReviews.textContent = 'Пока нет отзывов для этого продукта.';
       productReviews.appendChild(noReviews);
   } else {
       reviews.forEach((review, index) => {
           const reviewDiv = document.createElement('div');
           reviewDiv.textContent = review;
           const deleteButton = document.createElement('button');
           deleteButton.textContent = 'Удалить';
           deleteButton.classList.add('delete-button');
           deleteButton.setAttribute('data-product', product);
           deleteButton.setAttribute('data-review', review);
           reviewDiv.appendChild(deleteButton);
           productReviews.appendChild(reviewDiv);
       });
   }
}
