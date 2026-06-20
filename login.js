// login.js
let loginAttempts = 0;


//grabs elements from the html file
const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");
const username = document.getElementById("username");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");


// runs when the login form is submitted
form.addEventListener("submit", e => {
e.preventDefault();
//get values entered by the user
const user = username.value;
const pass = password.value;
const remember = rememberMe.checked;


//check if the username and password are correct
if (user === "admin" && pass === "school123") {
  localStorage.setItem("isAdminLoggedIn", "true");
  if (remember) localStorage.setItem("adminUsername", user); else localStorage.removeItem("adminUsername");
 //send to index.html
  window.location.href = "./home.html";
  console.log("Login Succesful");
} else if (user === "guest" && pass === "guest") {
  localStorage.setItem("isAdminLoggedIn", "true");
  if (remember) localStorage.setItem("adminUsername", user); else localStorage.removeItem("adminUsername");
 //send to index1.html
  window.location.href = "./home1.html";
  console.log("Login Succesful");
} else {
  loginAttempts++;
  errorBox.classList.add("show");
  //if too many requests
  if(loginAttempts>=3){ alert("Too many failed attempts"); loginAttempts=0; }
}
});


document.getElementById("forgotPassword").onclick = e => { e.preventDefault(); alert("Contact system administrator."); };

//when the page loads check if username is saved
window.onload = () => {
const saved = localStorage.getItem("adminUsername");
if(saved){ username.value=saved; rememberMe.checked=true; }
};