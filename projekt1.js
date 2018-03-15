var app = document.getElementById('grid-wrap');

var container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.punkapi.com/v2/beers?page=2&per_page=25 ', true);

request.onload = function () {

  // Ovdje kreće preuzimanje podataka
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(beer => {
      var card = document.createElement('div');
      card.setAttribute('class', 'card');

      var h1 = document.createElement('h1');
      beer.name = beer.name.substring(0, 10);
      h1.textContent = beer.name;

      var img = document.createElement('img'); 
      img.classList.add("img"); 
      img.src = beer.image_url;

      var p = document.createElement('p');
      p.textContent = "ABV: " + beer.abv;

      var span = document.createElement('span');
      span.textContent = "IBU: " + beer.ibu;

      var modal = document.createElement('div');
      modal.classList.add("modal");
      modal.textContent = beer.description;
      
      var btn = document.createElement('button');
      btn.innerHTML = "Close";
  

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(img);
      card.appendChild(p);
      card.appendChild(span);
      card.appendChild(modal); 
      modal.appendChild(btn);
    
       
      
      card.addEventListener("click", function () {
        var modali = this.parentElement.querySelectorAll('.modal');
        for (i = 0; i < modali.length; i++) {
          modali[i].classList.remove('show');
        }
        this.querySelector('.modal').classList.add('show');
      });
      // event delegation
      document.querySelector(".container").addEventListener("click", function (e) {
        e.target.parentElement.classList.remove("show");
      });
    });


  } else {
    const errorMessage = document.createElement('string');
    errorMessage.textContent = `Ne radi batac`;
    app.appendChild(errorMessage);
  }
}

request.send();

// LOAD MORE

 //function handler(){
 // var crd = document.getElementById('grid-wrap');
 // var visina = crd.offsetHeight;  //visina
 // var scrol = window.pageYOffset; //scroll
//  var y = scrol + window.innerHeight;
////  if(y = visina){
 //   crd.innerHTML += document.getElementsByClassName('.card');
//  }
//}
//window.onscroll= handler;

// FAVORITES

var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// dodajemo klasu za svaki fav
favorites.forEach(function(favorite) {
  document.getElementById(favorite).className='fav' ;
}); 
 // register click

 document.querySelector('.container').addEventListener('click', function(e) {
   var id = e.target.id,
   item = e.target,
   index = favorites.indexOf(id);

   if (!id) return;

   if (index == -1) {
     favorites.push(id);
     item.className ='';
   }

   localStorage.setItem('favorites', JSON.stringify(favorites));
 })

