    $(document).ready(function(){
    
      $('.carousel-container').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1
            }
          }
        ]
      });
      
      
      $(".carousel-item img").on("click", function(){
        var imgSrc = $(this).attr("src");
        var imgAlt = $(this).attr("alt");
        var img = $("<img>").attr("src", imgSrc).css({
          "width": "auto",
          "height": "auto",
          "max-width": "100%",
          "max-height": "400px"
        });
        $("<div>").append(img).dialog({
          modal: true,
          title: imgAlt,
          width: 500, 
          close: function(){
            $(this).dialog("destroy").remove();
          }
        });
      });
      
     
      $(".tech-card").hide();
      
      $(".tech-toggle").on("click", function() {
        var targetId = $(this).data("target");
        $("#" + targetId).slideToggle(500);
        
        // Change arrow direction
        var arrow = $(this).find(".toggle-arrow");
        if (arrow.html() === "▼") {
          arrow.html("▲");
        } else {
          arrow.html("▼");
        }
      });
      
   
      $("#html-tech").slideDown();
    });

    // Harici API'den kullanıcı çekme (about.html sayfası için)
$(document).ready(function () {
  if (window.location.pathname.includes("about.html")) {
    $.ajax({
      url: "https://jsonplaceholder.typicode.com/users",
      method: "GET",
      success: function (users) {
        let html = "<h3>Example Users from API:</h3><ul>";
        users.slice(0, 5).forEach(function (user) {
          html += `<li><strong>${user.name}</strong> - ${user.email}</li>`;
        });
        html += "</ul>";
        $("#api-user-list").html(html);
      },
      error: function () {
        $("#api-user-list").html("<p>Failed to load external users.</p>");
      }
    });
  }
});
