// pull and dynamically create info from API and add to grid layout

fetch('https://randomuser.me/api/?results=12&nat=us,au')
  .then(results => {
    return results.json();
  })
  .then(results => {
    results.results.forEach(person => {
      
      function formatDate() {
        var date = new Date(person.dob.date);
        var month = (date.getMonth() + 1);
        var day = date.getDate();
        var year = date.getFullYear();
        return month + "/" + day + "/" + year;
    }

      let name = `
      <h1 class="name">${person.name.first + " " + person.name.last}</h1>
      `;
      let pic = `
        <img class="user-image" src="${person.picture.large}">
      `;
      let email = `
        <p class="email">${person.email}</p>
      `;
      let state = `
        <p class="state">${person.location.state}</p>
      `;
      let phone = `
        <p class="phone">${person.cell}</p>
      `;
      let address = `
        <p class="address">${person.location.street.number + ' ' + person.location.street.name + ", " + person.location.city + ", " + person.location.state + " " + person.location.postcode}</p>
      `;
      let birthday = `
        <p class="birthday">${"Birthday: " + formatDate()}</p>
      `;


      $("main").append(`
      <div class="user">
        ${pic}
        <div class="user-info">${name + email + state + phone + address + birthday}</div>
      </div>
      `);

//  Cycle through created cards and add event listeners on click to create a modal and a close feature
      let cards = document.querySelectorAll('.user');

      cards.forEach(card => {
        card.addEventListener('click', (e) => {
          let modal = document.createElement('div');
          let close = document.createElement('button');
          let main = document.querySelector('main');
          modal.classList.add("modal");
          close.classList.add('close');
          close.innerHTML = "x";
          modal.innerHTML = card.innerHTML;
          modal.append(close);
          main.append(modal);
        });
      });

    });
  })
  .catch(error => {
    console.log(error);
  });

// Close modal on "x" click
document.addEventListener('click', (e) => {
  let modal = document.querySelectorAll('.modal');
  let overlay = document.querySelector('body');
  if(e.target.classList == 'close') {
    modal.forEach(mod => {
      mod.style.display = "none";
    });
    
  }

})
  
