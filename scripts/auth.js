
(function() {
 
  const currentPage = window.location.pathname.split('/').pop();
  
 
  if (currentPage === 'register.html' || currentPage === 'login.html') {
    return;
  }
  
 
  const currentUser = localStorage.getItem("currentUser");
  if (!currentUser) {
   
    window.location.href = "login.html";
  }
})(); 