let password = document.getElementById('password')
let button = document.getElementById('show-hide')

button.addEventListener('click', function() {
  if (password.type === "password") {
      button.innerHTML = "<i class='fas fa-eye-slash'></i>"
      password.type = "text"
  } else {
      button.innerHTML = "<i class='fas fa-eye'></i>"
      password.type = "password"
  }
})