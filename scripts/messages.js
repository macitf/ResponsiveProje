    $(document).ready(function() {
      let messagesTable;
      
      // Initialize DataTable
      function initMessagesTable() {
        if ($.fn.DataTable.isDataTable('#messages-table')) {
          messagesTable.destroy();
        }
        
        messagesTable = $('#messages-table').DataTable({
          responsive: true,
          order: [[0, 'desc']], // Sort by date descending
          language: {
            search: "Search:",
            lengthMenu: "Show _MENU_ messages",
            info: "Showing _START_ to _END_ of _TOTAL_ messages",
            infoEmpty: "No messages available",
            infoFiltered: "(filtered from _MAX_ total messages)",
            emptyTable: "No messages found",
            paginate: {
              first: "First",
              last: "Last",
              next: "Next",
              previous: "Previous"
            }
          }
        });
      }
      
      
      function loadMessages() {
        let messages = [];
        try {
          messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        } catch (error) {
          console.error("Error loading messages:", error);
          messages = [];
        }
        
        const messagesList = $("#messages-list");
        messagesList.empty();
        
        if (messages.length === 0) {
          messagesList.html('<tr><td colspan="5" class="empty-message">No messages found.</td></tr>');
          return;
        }
        
        messages.forEach(function(msg) {
          
          const messagePreview = msg.message.length > 50 ? 
            msg.message.substring(0, 50) + "..." : 
            msg.message;
          
         
          const rowClass = msg.isRead ? '' : 'unread';
          const row = $(`
            <tr class="${rowClass}" data-id="${msg.id}">
              <td>${msg.date}</td>
              <td>${msg.name}</td>
              <td>${msg.email}</td>
              <td>${messagePreview}</td>
              <td class="action-buttons">
                <button class="btn view-btn" data-id="${msg.id}">View</button>
                <button class="btn delete-btn" data-id="${msg.id}">Delete</button>
              </td>
            </tr>
          `);
          
          messagesList.append(row);
        });
        
        initMessagesTable();
        
       
        $(".view-btn").on("click", function() {
          const messageId = $(this).data("id");
          viewMessage(messageId);
        });
        
        $(".delete-btn").on("click", function() {
          const messageId = $(this).data("id");
          deleteMessage(messageId);
        });
      }
      
      
      function viewMessage(messageId) {
        let messages = [];
        try {
          messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        } catch (error) {
          console.error("Error loading messages:", error);
          return;
        }
        
        const message = messages.find(msg => msg.id == messageId);
        if (!message) {
          alert("Message not found!");
          return;
        }
        
      
        if (!message.isRead) {
          message.isRead = true;
          
          localStorage.setItem("contactMessages", JSON.stringify(messages));
         
          $(`tr[data-id="${messageId}"]`).removeClass("unread");
        }
        
        
        $("#modal-name").text(message.name);
        $("#modal-email").text(message.email);
        $("#modal-phone").text(message.phone || "Not provided");
        $("#modal-date").text(message.date);
        $("#modal-response-date").text(message.responseDate || "Not specified");
        $("#modal-message").text(message.message);
        
     
        $("#message-modal").css("display", "block");
      }
      
      
      function deleteMessage(messageId) {
        if (!confirm("Are you sure you want to delete this message?")) {
          return;
        }
        
        let messages = [];
        try {
          messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
        } catch (error) {
          console.error("Error loading messages:", error);
          return;
        }
        
        const updatedMessages = messages.filter(msg => msg.id != messageId);
        localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
        
      
        loadMessages();
      }
      
     
      $("#clear-all-btn").on("click", function() {
        if (!confirm("Are you sure you want to delete ALL messages? This action cannot be undone.")) {
          return;
        }
        
        localStorage.removeItem("contactMessages");
        loadMessages();
      });
      
    
      $("#refresh-btn").on("click", function() {
        loadMessages();
      });
      
     
      $(".close-modal").on("click", function() {
        $("#message-modal").css("display", "none");
      });
      
      
      $(window).on("click", function(event) {
        if (event.target == document.getElementById("message-modal")) {
          $("#message-modal").css("display", "none");
        }
      });
      
      
      loadMessages();
    });
