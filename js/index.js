let buttons = document.querySelectorAll('img');
let counter_box = document.querySelector('.counter');
let counter_btn = document.querySelector('.counter-btn');
let thanks = document.querySelector('.thank_u_message');
let agree_box = document.querySelector('.agree-box');
let disagree_box = document.querySelector('.disagree-box');
let agree_counter = document.querySelector('#agree-count');
let disagree_counter = document.querySelector('#disagree-count');
let result;
let counter = {
  agree: agree_counter.nextSibling.innerHTML,
  disagree: disagree_counter.nextSibling.innerHTML
};

let visited = {
  visit: false
}


//json-data fetch
fetch('/json/data.json')
  .then(res => res.json())
  .then(json => {
    agree_counter.nextSibling.innerHTML = json.agree;
    disagree_counter.nextSibling.innerHTML = json.disagree;
    counter = {
      agree: json.agree,
      disagree: json.disagree
    }
  })
  .catch(err => console.log('Request Failed', err));


  //local storage check if user visited or not
function localStorage_check() {
  if (localStorage.getItem("user_visited") === null) {
    localStorage.setItem('user_visited', JSON.stringify(visited))
    console.log("khali")
  } else {
    result = JSON.parse(localStorage.getItem('user_visited'))

    if(result['visit'] === true){
      // localStorage.setItem('user_visited', JSON.stringify(result))
      // console.log("bhar gaya")
      counter_btn.style.display = 'none'
      thanks.classList.add('active');
      counter_box.classList.add('fadeIn');
      counter_box.style.display = 'flex';
    }
  }
}
localStorage_check()



//counter increse(agree)
agree_box.addEventListener('click', () => {

  if (result === undefined) {
    counter_btn.style.display = 'none';
    visited['visit'] = true;
    localStorage.setItem('user_visited', JSON.stringify(visited))
    counter_box.classList.add('fadeIn');
    counter_box.style.display = 'flex';
    agree_count();
  }

})


//counter increse(disagree)
disagree_box.addEventListener('click', () => {

  if (result === undefined) {
    visited['visit'] = true;
    localStorage.setItem('user_visited', JSON.stringify(visited))
    counter_btn.style.display = 'none'
    counter_box.classList.add('fadeIn');
    counter_box.style.display = 'flex';
    disagree_count();
  }
})


// counter-btn
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {

    if (btn.classList == 'agree-btn' && result === undefined) {
      visited['visit'] = true;
      localStorage.setItem('user_visited', JSON.stringify(visited))
      counter_btn.style.display = 'none'
      counter_box.classList.add('fadeIn');
      counter_box.style.display = 'flex';
      agree_count();

    } else if (btn.classList == 'disagree-btn' && result === undefined) {
      visited['visit'] = true;
      localStorage.setItem('user_visited', JSON.stringify(visited))
      counter_btn.style.display = 'none'
      counter_box.style.display = 'flex';
      disagree_count();
      
    }
  }, {
    once: true
  })
});


//agree-counter
function agree_count() {
  counter.agree++;
  agree_counter.nextSibling.innerHTML = counter.agree;

  fetch('/js/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(counter)
  })
}

//disagree-counter
function disagree_count() {
  counter.disagree++;
  disagree_counter.nextSibling.innerHTML = counter.disagree;

  fetch('/js/index.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(counter)
  })
}