let password1 = document.getElementById('password1')
let button1 = document.getElementById('show-hide1')

button1.addEventListener('click', function() {
  if (password1.type === "password") {
      button1.innerHTML = "<i class='fas fa-eye-slash'></i>"
      password1.type = "text"
  } else {
      button1.innerHTML = "<i class='fas fa-eye'></i>"
      password1.type = "password"
  }
})

let password2 = document.getElementById('password2')
let button2 = document.getElementById('show-hide2')

button2.addEventListener('click', function() {
  if (password2.type === "password") {
      button2.innerHTML = "<i class='fas fa-eye-slash'></i>"
      password2.type = "text"
  } else {
      button2.innerHTML = "<i class='fas fa-eye'></i>"
      password2.type = "password"
  }
})