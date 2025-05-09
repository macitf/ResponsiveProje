
$(document).ready(function(){
  $("#login-form").on("submit", function(e){
    e.preventDefault();
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

   
    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      $("#login-message")
        .text("Login successful! Redirecting...")
        .removeClass("error-message")
        .addClass("success-message");

      localStorage.setItem("currentUser", username);
      
      setTimeout(() => {
        window.location.href = "quiz.html";
      }, 2000);
    } else {
      $("#login-message")
        .text("Invalid username or password!")
        .addClass("error-message")
        .removeClass("success-message");
    }
  });
});
