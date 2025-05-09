    
    function parseTurkishDate(dateStr) {
      try {
        if (!dateStr) return new Date(0);
        
        console.log("Parsing date:", dateStr);
        
        // Standart JavaScript Date ayrıştırma denemesi
        const jsDate = new Date(dateStr);
        if (!isNaN(jsDate.getTime())) {
          console.log("Parsed as standard JS date:", jsDate);
          return jsDate;
        }
        
        // Slash veya noktalı formatları deneme
        if (dateStr.includes('/') || dateStr.includes('.')) {
          const [datePart, timePart] = dateStr.split(' ');
          
          let day, month, year;
          if (dateStr.includes('/')) {
           
            const parts = datePart.split('/');
            month = parseInt(parts[0], 10) - 1;
            day = parseInt(parts[1], 10);
            year = parseInt(parts[2], 10);
          } else {
      
            const parts = datePart.split('.');
            day = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            year = parseInt(parts[2], 10);
          }
          
    
          let hour = 0, minute = 0, second = 0;
          if (timePart) {
            const timeParts = timePart.split(':');
            hour = parseInt(timeParts[0], 10);
            minute = timeParts.length > 1 ? parseInt(timeParts[1], 10) : 0;
            second = timeParts.length > 2 ? parseInt(timeParts[2], 10) : 0;
          }
          
          const result = new Date(year, month, day, hour, minute, second);
          console.log("Parsed using custom logic:", result);
          return result;
        }
        
     
        console.log("Could not parse date, using current time");
        return new Date();
      } catch (e) {
        console.error("Error parsing date:", e);
        return new Date();
      }
    }

    $(document).ready(function() {
      const currentUser = localStorage.getItem("currentUser");
      
  
      console.log("Current user:", currentUser);
      
      try {
        const rawScores = localStorage.getItem("scores");
        console.log("Raw scores from localStorage:", rawScores);
        
        const parsedScores = rawScores ? JSON.parse(rawScores) : [];
        console.log("Parsed scores count:", parsedScores.length);
        if (parsedScores.length > 0) {
          console.log("First score entry:", parsedScores[0]);
        }
      } catch (error) {
        console.error("Error checking scores:", error);
      }
      
      $("#logout-btn").on("click", function() {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
      });
      
    
      displayScores('all');

      
      const filterContainer = $(`
        <div class="filter-options" style="margin: 20px 0; text-align: center;">
          <button class="filter-btn active" data-filter="all" style="padding: 8px 15px; margin: 0 5px; border: 1px solid #ddd; background-color: #4CAF50; color: white; border-radius: 20px; cursor: pointer;">All Scores</button>
          ${currentUser ? `<button class="filter-btn" data-filter="me" style="padding: 8px 15px; margin: 0 5px; border: 1px solid #ddd; background-color: #f5f5f5; border-radius: 20px; cursor: pointer;">My Scores</button>` : ''}
        </div>
      `);
      
      // Filter butonları varsa, silelim ve yenisini ekleyelim
      $(".filter-options").remove();
      $(".table-container").before(filterContainer);
      
      // Filtreleme butonlarına tıklama olayı ekle
      $(".filter-btn").on("click", function() {
        $(".filter-btn").removeClass("active").css({
          "background-color": "#f5f5f5", 
          "color": "#333"
        });
        
        $(this).addClass("active").css({
          "background-color": "#4CAF50", 
          "color": "white"
        });
        
        const filter = $(this).data("filter");
        displayScores(filter);
      });

  
      $("#refresh-btn").on("click", function() {
   
        try {
          console.log("===== REFRESH BUTTON CLICKED =====");
          
      
          const rawScores = localStorage.getItem("scores");
          console.log("Raw scores from localStorage:", rawScores);
          
          if (!rawScores) {
            console.log("No scores found in localStorage");
            alert("No scores found. Quiz scores will appear here after completing a quiz.");
            return;
          }
          
          try {
         
            const parsedScores = JSON.parse(rawScores);
            
            if (!Array.isArray(parsedScores)) {
              console.error("Scores is not an array, resetting to empty array");
              localStorage.setItem("scores", JSON.stringify([]));
              displayScores('all');
              return;
            }
            
            console.log("Successfully refreshed scores. Count:", parsedScores.length);
            console.log("Score data:", parsedScores);
            
            // Aktif filtre ile skorları göster
            const activeFilter = $(".filter-btn.active").data("filter") || 'all';
            displayScores(activeFilter);
            alert(`Scores refreshed! Found ${parsedScores.length} score entries.`);
          } catch (error) {
            console.error("Error parsing scores during refresh:", error);
            alert("Error refreshing scores: " + error.message);
          }
        } catch (error) {
          console.error("Refresh error:", error);
          alert("An error occurred while refreshing: " + error.message);
        }
      });
      
   
      $("#debug-btn").on("click", function() {
        try {
          console.log("===== DEBUG BUTTON CLICKED =====");
          
        
          console.log("All localStorage keys:");
          Object.keys(localStorage).forEach(key => {
            console.log(`- ${key}: ${localStorage.getItem(key)?.length || 0} chars`);
          });
          
        
          const rawScores = localStorage.getItem("scores");
          console.log("Raw scores data:", rawScores);
          
          if (!rawScores) {
            console.log("No scores found, creating test data");
           
            const testScores = [
              {
                username: currentUser || "test_user",
                score: 3,
                total: 4,
                date: new Date().toLocaleString()
              }
            ];
            
          
            localStorage.removeItem("scores");
            localStorage.setItem("scores", JSON.stringify(testScores));
            console.log("Added test score to localStorage");
            alert("No scores found. Added a test score. Click refresh to see it!");
            return;
          }
          
       
          let scores;
          try {
            scores = JSON.parse(rawScores);
            console.log("Successfully parsed scores:", scores);
            
            if (!Array.isArray(scores)) {
              console.warn("Scores is not an array:", scores);
              alert("Scores data is not an array! Resetting...");
              scores = [];
              localStorage.setItem("scores", JSON.stringify(scores));
              return;
            }
          } catch (error) {
            console.error("Parse error:", error);
            alert("Error parsing scores JSON: " + error.message);
            return;
          }
          
          if (scores.length === 0) {
            console.log("Scores array is empty, adding test score");
            alert("Scores array is empty! Adding a test score.");
            scores.push({
              username: currentUser || "test_user",
              score: 3,
              total: 4,
              date: new Date().toLocaleString()
            });
            localStorage.setItem("scores", JSON.stringify(scores));
            alert("Test score added. Click refresh to see it!");
            return;
          }
          
     
          let tableHTML = "<h3>Debug: Scores in localStorage</h3><table border='1' style='width:100%; margin-top:20px;'>";
          tableHTML += "<tr><th>Username</th><th>Score</th><th>Total</th><th>Date</th></tr>";
          
          scores.forEach(score => {
            tableHTML += `<tr>
              <td>${score.username || 'N/A'}</td>
              <td>${score.score || 0}</td>
              <td>${score.total || 0}</td>
              <td>${score.date || 'N/A'}</td>
            </tr>`;
          });
          
          tableHTML += "</table>";
          
        
          const debugDiv = $("<div id='debug-results' style='margin:20px 0; padding:10px; background:#f5f5f5; border:1px solid #ddd;'></div>");
          debugDiv.html(tableHTML);
          
          
          $("#debug-results").remove();
          $(".table-container").after(debugDiv);
          
          alert(`Found ${scores.length} scores in localStorage!`);
        } catch (error) {
          console.error("Debug error:", error);
          alert("Error debugging scores: " + error.message);
        }
      });
      
      function displayScores(filter = 'all') {
        try {
          console.log("===== DISPLAY SCORES =====");
          console.log("Filter:", filter);
          console.log("Current User:", currentUser);
          
       
          console.log("All localStorage keys:");
          Object.keys(localStorage).forEach(key => {
            console.log(`- ${key}: ${localStorage.getItem(key)?.length || 0} chars`);
          });
          
        
          let rawScoresData = localStorage.getItem("scores");
          console.log("Raw scores from localStorage:", rawScoresData);
          
      
          if (!rawScoresData) {
            console.log("No scores data found in localStorage");
            $(".table-container").html(`
              <div class="alert" style="padding: 15px; background-color: #f8f9fa; border: 1px solid #ddd; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0;">No scores found</h3>
                <p>There are no quiz scores recorded yet. Take a quiz to see your score here!</p>
                <a href="quiz.html" class="btn" style="margin-top: 10px;">Take a Quiz</a>
              </div>
            `);
            return;
          }
          

          let allScores = [];
          try {
            allScores = JSON.parse(rawScoresData);
            console.log("Successfully parsed scores data:", allScores);
            
            if (!Array.isArray(allScores)) {
              console.error("Scores data is not an array:", allScores);
              throw new Error("Invalid scores data format - not an array");
            }
          } catch (error) {
            console.error("Error parsing scores:", error);
            $(".table-container").html(`
              <div class="alert" style="padding: 15px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #721c24;">Error loading scores</h3>
                <p>There was an error loading the score data. The data may be corrupted.</p>
                <p>Technical details: ${error.message}</p>
                <button id="reset-scores" class="btn" style="background-color: #dc3545; color: white; margin-top: 10px;">Reset Scores</button>
              </div>
            `);
            
          
            $("#reset-scores").on("click", function() {
              localStorage.removeItem("scores");
              localStorage.setItem("scores", JSON.stringify([]));
              alert("Scores have been reset. Refreshing page...");
              location.reload();
            });
            
            return;
          }
          
          console.log("Parsed scores:", allScores);
          console.log("Total scores found:", allScores.length);
          
       
          let filteredScores = [...allScores];
          
          if (filter === 'me' && currentUser) {
            filteredScores = allScores.filter(score => score.username === currentUser);
            console.log("Filtered scores for user:", currentUser, filteredScores.length);
          }

          filteredScores = filteredScores.filter(score => score.total !== 4);
          console.log("After filtering incorrect entries:", filteredScores.length);
          
        
          filteredScores.sort((a, b) => {
          
            if (a.score !== b.score) {
              return b.score - a.score;
            }
            
         
            try {
         
              return new Date(b.date) - new Date(a.date);
            } catch (e) {
             
              return 0;
            }
          });
          

          const tableContainer = $(".table-container");
          tableContainer.empty();
          
   
          let tableHTML = `
            <table class="score-table" style="width:100%; border-collapse:collapse; margin-top:20px;">
              <thead>
                <tr style="background-color:#f8f9fa;">
                  <th style="padding:12px; text-align:left; border-bottom:2px solid #ddd;">Username</th>
                  <th style="padding:12px; text-align:left; border-bottom:2px solid #ddd;">Score</th>
                  <th style="padding:12px; text-align:left; border-bottom:2px solid #ddd;">Date</th>
                </tr>
              </thead>
              <tbody>
          `;
          
          if (filteredScores.length === 0) {
            tableHTML += `
              <tr>
                <td colspan="3" style="padding:15px; text-align:center; border-bottom:1px solid #eee;">
                  No scores found with the current filter. ${filter === 'me' ? 'Take a quiz to see your scores here!' : ''}
                </td>
              </tr>
            `;
          } else {
            filteredScores.forEach((score, index) => {
              const isCurrentUser = score.username === currentUser;
              const rowStyle = isCurrentUser ? 'background-color:#e8f4f8;' : (index % 2 === 0 ? 'background-color:#f9f9f9;' : '');
              
              tableHTML += `
                <tr style="${rowStyle}">
                  <td style="padding:10px; border-bottom:1px solid #eee;">
                    ${isCurrentUser ? '<strong>' : ''}
                    ${score.username || 'Unknown'}
                    ${isCurrentUser ? '</strong>' : ''}
                  </td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">
                    ${score.score || 0}/${score.total || 0}
                  </td>
                  <td style="padding:10px; border-bottom:1px solid #eee;">
                    ${score.date || 'N/A'}
                  </td>
                </tr>
              `;
            });
          }
          
          tableHTML += `
              </tbody>
            </table>
          `;
 
          tableContainer.html(tableHTML);
          
          console.log("Table rendered successfully with", filteredScores.length, "scores");
          
        } catch (error) {
          console.error("Fatal error in displayScores:", error);
          $(".table-container").html(`
            <div class="alert" style="padding: 15px; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #721c24;">Error</h3>
              <p>An unexpected error occurred while displaying scores.</p>
              <p>Technical details: ${error.message}</p>
            </div>
          `);
        }
      }
    });
