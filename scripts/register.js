$(document).ready(function(){
  $("#register-form").on("submit", function(e){
    e.preventDefault();
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();

    console.log("Register attempt:", { username, password });

    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log("Current users:", users);

    if (users.some(user => user.username === username)) {
      $("#register-message")
        .text("This username is already taken!")
        .addClass("error-message")
        .removeClass("success-message");
      return;
    }

    users.push({
      username: username,
      password: password
    });

    localStorage.setItem("users", JSON.stringify(users));
    console.log("Updated users:", JSON.parse(localStorage.getItem("users")));

    $("#register-message")
      .text("Registration successful! Redirecting to login page...")
      .removeClass("error-message")
      .addClass("success-message");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 2000);
  });

  console.log("Initial users in storage:", JSON.parse(localStorage.getItem("users")));
});
