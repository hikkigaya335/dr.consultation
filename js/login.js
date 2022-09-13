let user_name = document.getElementById("user_name");
let password = document.getElementById("password");
let counter_box = document.getElementsByClassName("counter")[0];
let error_comment = document.querySelector(".login h1");
let input = document.querySelectorAll("input");
let agree_counter = document.querySelector('#agree-count');
let disagree_counter = document.querySelector('#disagree-count');
let login_btn = document.getElementById("login_btn");
let logout_btn = document.getElementById("log-out");


login_btn.addEventListener('click', user_checking);
logout_btn.addEventListener('click', ()=>{
    window.location.reload();
})

function user_checking(e){
    e.preventDefault();
    if(user_name.value === 'akhil' && password.value === '12345'){
        counter_box.classList.add('active');
        fetch_json_data();
        logout_btn.classList.add('active');
    }else{
        error_comment.classList.add('active');
    }
}

input.forEach(value =>{
 
    value.addEventListener('focus', ()=>{
        error_comment.classList.remove('active');
    })
})


function fetch_json_data(){
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
}