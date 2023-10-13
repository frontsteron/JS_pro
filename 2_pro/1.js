"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books.
2. Реализуйте геттер allBooks, который возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
   #books;
 
   constructor(initialBooks) {
     // Проверка на наличие дубликатов в начальном массиве книг
     if (new Set(initialBooks).size !== initialBooks.length) {
       throw new Error('Начальный список книг содержит дубликаты.');
     }
     this.#books = initialBooks;
   }
 
   get allBooks() {
     return this.#books;
   }
 
   addBook(title) {
     if (this.#books.includes(title)) {
       throw new Error('Книга с таким названием уже существует в списке.');
     }
     this.#books.push(title);
   }
 
   removeBook(title) {
     const index = this.#books.indexOf(title);
     if (index === -1) {
       throw new Error('Книги с таким названием нет в списке.');
     }
     this.#books.splice(index, 1);
   }
 
   hasBook(title) {
     return this.#books.includes(title);
   }
 }
 
 // Пример использования
 const library = new Library(['Book 1', 'Book 2', 'Book 3']);
 
 console.log(library.allBooks); // ['Book 1', 'Book 2', 'Book 3']
 
 library.addBook('Book 4');
 console.log(library.allBooks); // ['Book 1', 'Book 2', 'Book 3', 'Book 4']
 
 library.removeBook('Book 2');
 console.log(library.allBooks); // ['Book 1', 'Book 3', 'Book 4']
 
 console.log(library.hasBook('Book 1')); // true
 console.log(library.hasBook('Book 2')); // false
 