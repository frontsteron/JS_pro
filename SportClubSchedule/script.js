const scheduleData = [
   {
       "name": "Занятие 1",
       "time": "10:00 AM",
       "maxParticipants": 20,
       "currentParticipants": 10,
   },
   {
       "name": "Занятие 2",
       "time": "2:00 PM",
       "maxParticipants": 15,
       "currentParticipants": 12,
   },
   {
       "name": "Занятие 3",
       "time": "3:30 PM",
       "maxParticipants": 18,
       "currentParticipants": 6,
   },
   {
       "name": "Занятие 4",
       "time": "5:00 PM",
       "maxParticipants": 25,
       "currentParticipants": 14,
   },
   {
       "name": "Занятие 5",
       "time": "7:30 PM",
       "maxParticipants": 12,
       "currentParticipants": 8,
   },
];

// Функция для отображения занятий на странице
function displaySchedule() {
   const scheduleElement = document.getElementById("schedule");

   for (const item of scheduleData) {
       const card = document.createElement("div");
       card.className = "col-md-4 mb-3";

       const isFull = item.currentParticipants >= item.maxParticipants;

       const cardHtml = `
           <div class="card">
               <div class="card-body">
                   <h5 class="card-title">${item.name}</h5>
                   <p class="card-text">Время: ${item.time}</p>
                   <p class="card-text">Макс. участников: ${item.maxParticipants}</p>
                   <p class="card-text">Записано: ${item.currentParticipants}</p>
                   <button class="btn btn-primary registerBtn" data-id="${item.name}" ${isFull ? 'disabled' : ''}>Записаться</button>
                   <button class="btn btn-danger cancelBtn" data-id="${item.name}">Отменить запись</button>
               </div>
           </div>
       `;

       card.innerHTML = cardHtml;
       scheduleElement.appendChild(card);
   }
}

// Функция для обработки нажатий на кнопки "Записаться" и "Отменить запись"
function handleButtonClick(event) {
   const target = event.target;

   if (target.classList.contains("registerBtn")) {
       const itemName = target.getAttribute("data-id");
       const item = scheduleData.find((data) => data.name === itemName);

       if (item.currentParticipants < item.maxParticipants) {
           item.currentParticipants++;
           target.parentElement.querySelector(".card-text:last-child").textContent = `Записано: ${item.currentParticipants}`;

           if (item.currentParticipants >= item.maxParticipants) {
               target.setAttribute('disabled', 'true');
           }
       }
   } else if (target.classList.contains("cancelBtn")) {
       const itemName = target.getAttribute("data-id");
       const item = scheduleData.find((data) => data.name === itemName);

       if (item.currentParticipants > 0) {
           item.currentParticipants--;
           target.parentElement.querySelector(".card-text:last-child").textContent = `Записано: ${item.currentParticipants}`;

           const registerButton = target.parentElement.querySelector('.registerBtn');
           if (item.currentParticipants < item.maxParticipants) {
               registerButton.removeAttribute('disabled');
           }
       }
   }
}

// Ожидание загрузки страницы перед отображением данных и привязкой обработчиков событий
document.addEventListener("DOMContentLoaded", function () {
   displaySchedule();
   document.getElementById("schedule").addEventListener("click", handleButtonClick);
});

document.body.style.overflowX = "hidden";