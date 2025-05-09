
    $(document).ready(function(){
      
      $("#response-date").datepicker({
        dateFormat: "dd/mm/yy",
        minDate: 0, 
        maxDate: "+1M", 
        showAnim: "slideDown",
        firstDay: 1, 
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
      });
    
      
      $("#contact-form").validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: false,
            phoneUS: true
          },
          message: {
            required: true,
            minlength: 10
          }
        },
        messages: {
          name: {
            required: "Please enter your name",
            minlength: "Your name must be at least 2 characters long"
          },
          email: {
            required: "Please enter your email address",
            email: "Please enter a valid email address"
          },
          phone: {
            phoneUS: "Please enter a valid phone number (e.g., 555-123-4567)"
          },
          message: {
            required: "Please enter your message",
            minlength: "Your message must be at least 10 characters long"
          }
        },
        errorPlacement: function(error, element) {
          var id = element.attr("id");
          $("#" + id + "-error").html(error);
        },
        highlight: function(element, errorClass) {
          $(element).addClass('error');
        },
        unhighlight: function(element, errorClass) {
          $(element).removeClass('error');
        },
        submitHandler: function(form) {
         
          $("#submit-btn").prop("disabled", true).text("Sending...");
          
          const name = $("#name").val().trim();
          const email = $("#email").val().trim();
          const phone = $("#phone").val().trim();
          const responseDate = $("#response-date").val().trim();
          const message = $("#message").val().trim();
          const date = new Date().toLocaleString();
          const id = Date.now(); 

        
          const messageObj = {
            id,
            name,
            email,
            phone,
            responseDate,
            message,
            date,
            isRead: false 
          };

       
          saveMessage(messageObj);

          
          showFeedbackModal(name);
          
         
          setTimeout(function() {
            form.reset();
            $("#response-date").datepicker("setDate", null);
            $("#submit-btn").prop("disabled", false).text("Send");
          }, 1000);
        }
      });
      
      
      function saveMessage(messageObj) {
        try {
          
          let messages = [];
          try {
            messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
          } catch (error) {
            console.error("Error parsing messages:", error);
            messages = [];
          }
          
         
          messages.unshift(messageObj);
          
          
          localStorage.setItem("contactMessages", JSON.stringify(messages));
          
          console.log("Message saved successfully:", messageObj);
          return true;
        } catch (error) {
          console.error("Error saving message:", error);
          return false;
        }
      }
      
     
      function showFeedbackModal(name) {
       
        $('.feedback-detail').text(`Dear ${name}, your message has been received successfully. We will get back to you as soon as possible.`);
        
        
        $('#feedback-container').css('display', 'flex').hide().fadeIn(500);
        
       
        $('#feedback-close-btn').on('click', function() {
          $('#feedback-container').fadeOut(500);
        });
        
        
        setTimeout(function() {
          $('#feedback-container').fadeOut(500);
        }, 10000);
      }

    
      $.validator.addMethod("phoneUS", function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, "");
        return this.optional(element) || phone_number.length > 9 &&
          phone_number.match(/^(\+90|0)?\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/);
      }, "Please enter a valid phone number");
    });
