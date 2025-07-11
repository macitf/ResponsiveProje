    $(document).ready(function(){
      let multipleChoiceQuestions = [];
      let codingQuestions = [];
      let currentQuestionIndex = 0;
      let isMultipleChoicePhase = true;
      let score = 0;
      let timerInterval;
      let timeLeft = 20;
      
      // Oturum açmış kullanıcıyı kontrol et
      const currentUser = localStorage.getItem("currentUser");
      console.log("Current user:", currentUser); // Debug için
      
      if (!currentUser) {
        alert("You must be logged in to take the quiz!");
        window.location.href = "login.html";
        return;
      }
      
      $.ajax({
        url: "../data/questions.json",
        dataType: "json",
        success: function(response) {
          multipleChoiceQuestions = response.multipleChoice;
          codingQuestions = response.coding;
          $("#start-btn").prop("disabled", false);
          console.log("Questions loaded");
        },
        error: function(xhr, status, error) {
          console.error("Error loading questions:", status, error);
          console.error("Response:", xhr.responseText);
          alert("Error loading questions. Please refresh the page.");
        }
      });
      
     
      function startTimer() {
        timeLeft = 20;
        $("#timer-display").text("Time remaining: " + timeLeft + " seconds");
        timerInterval = setInterval(function(){
          timeLeft--;
          $("#timer-display").text("Time remaining: " + timeLeft + " seconds");
          if(timeLeft <= 0){
            clearInterval(timerInterval);
            $("#options button").prop("disabled", true);
            $("#dialog-message").text("Time's up! No points for this question. Moving to next question.");
            $("#dialog").dialog({
              modal: true,
              buttons: {
                "Continue": function(){
                  $(this).dialog("close");
                  currentQuestionIndex++;
                  $("#next-btn").prop("disabled", true);
                  displayQuestion();
                }
              }
            });
          }
        }, 1000);
      }

     
      function startCodingTimer() {
        timeLeft = 60;
        $("#timer-display").text("Time remaining: " + timeLeft + " seconds");
        timerInterval = setInterval(function(){
          timeLeft--;
          $("#timer-display").text("Time remaining: " + timeLeft + " seconds");
          if(timeLeft <= 0){
            clearInterval(timerInterval);
            $("#code-input").prop("disabled", true);
            $("#run-code").prop("disabled", true);
            $("#code-output").html('<div style="color: red;">Time\'s up! No points for this question.</div>');
            
            setTimeout(() => {
              currentQuestionIndex++;
              $("#code-input").prop("disabled", false);
              $("#run-code").prop("disabled", false);
              displayQuestion();
            }, 2000);
          }
        }, 1000);
      }
      
      
      $("#start-btn").on("click", function(){
        if (!multipleChoiceQuestions.length && !codingQuestions.length) {
          alert("Failed to load questions. Please refresh the page.");
          return;
        }
        $("#start-quiz").hide();
        $("#question-box").show();
        $("#options").show();
        $("#next-btn").show();
        $("#current-score").text("0");
        displayQuestion();
      });
      
      
      function displayQuestion(){
        clearInterval(timerInterval);
        
        if(isMultipleChoicePhase) {
          if(currentQuestionIndex < multipleChoiceQuestions.length) {
            let q = multipleChoiceQuestions[currentQuestionIndex];
            $("#question").text(q.question);
            $("#options").empty().show();
            $("#next-btn").show();
            $("#code-editor").hide();
            $("#current-score").text(score);
            startTimer();
            
            q.options.forEach(function(option, index){
              let btn = $("<button></button>")
                          .text(option)
                          .attr("data-index", index);
              btn.on("click", function(){
                clearInterval(timerInterval);
                $("#options button").removeClass("selected");
                $(this).addClass("selected");
                $("#next-btn").prop("disabled", false);
              });
              $("#options").append(btn);
            });
          } else {
            isMultipleChoicePhase = false;
            currentQuestionIndex = 0;
            $("#timer-display").show();
            displayQuestion();
            return;
          }
        } else {
          if(currentQuestionIndex < codingQuestions.length) {
            let q = codingQuestions[currentQuestionIndex];
            $("#question").text(q.question);
            $("#options").hide();
            $("#next-btn").hide();
            $("#code-editor").show();
            $("#code-input").val(q.startingCode);
            $("#code-output").empty();
            $("#timer-display").show();
            startCodingTimer();
          } else {
            $("#quiz-container").html(`
              <div class="quiz-result">
                <h2>Quiz Completed!</h2>
                <p class="final-score">Your Total Score: ${score} / ${multipleChoiceQuestions.length + codingQuestions.length}</p>
                <div class="result-buttons">
                  <button onclick="window.location.href='score.html'">View Scoreboard</button>
                  <button onclick="location.reload()">Try Again</button>
                </div>
              </div>
            `);
            saveScore(currentUser, score, multipleChoiceQuestions.length + codingQuestions.length);
          }
        }
      }
      
      
      $("#next-btn").on("click", function(){
        let selected = $("#options button.selected");
        if(selected.length === 0){
          alert("Please select an option!");
          return;
        }
        let selectedIndex = parseInt(selected.attr("data-index"));
        let correctIndex = multipleChoiceQuestions[currentQuestionIndex].answer;
        if(selectedIndex === correctIndex){
          score++;
          $("#current-score").text(score);
          $("#dialog-message").text("Correct answer! Your score: " + score);
        } else {
          $("#dialog-message").text("Wrong answer. Correct answer: " + multipleChoiceQuestions[currentQuestionIndex].options[correctIndex]);
        }
        $("#dialog").dialog({
          modal: true,
          buttons: {
            "Continue": function(){
              $(this).dialog("close");
              currentQuestionIndex++;
              $("#next-btn").prop("disabled", true);
              displayQuestion();
            }
          }
        });
      });
      
    
      $("#run-code").on("click", function() {
        clearInterval(timerInterval);
        const q = codingQuestions[currentQuestionIndex];
        let userCode = $("#code-input").val().trim();
        
        if (!userCode.endsWith("}")) {
          $("#code-output").html('<div style="color: red;">Error: Incomplete function definition. Make sure to add the closing brace "}"</div>');
          setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
          }, 2000);
          return;
        }
        
        try {
          const testFunction = new Function('return ' + userCode)();
          const testInput = JSON.parse(q.testInput);
          const result = testFunction(testInput);
          
          if(result.toString() === q.expectedOutput) {
            score++;
            $("#current-score").text(score);
            $("#code-output").html('<div style="color: green;">Correct! Moving to next question.</div>');
            $("#code-input").prop("disabled", true);
            $("#run-code").prop("disabled", true);
          } else {
            $("#code-output").html('<div style="color: red;">Wrong! Moving to next question...</div>');
          }
          
          setTimeout(() => {
            currentQuestionIndex++;
            $("#code-input").prop("disabled", false);
            $("#run-code").prop("disabled", false);
            displayQuestion();
          }, 2000);
          
        } catch(error) {
          $("#code-output").html('<div style="color: red;">Error: ' + error.message + '<br>Moving to next question...</div>');
          setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion();
          }, 2000);
        }
      });
      
     
      function saveScore(username, userScore, totalQuestions){
          console.log("===== SCORE SAVE STARTED =====");
          // Test amaçlı olarak önce localStorage'daki mevcut tüm değerleri kontrol edelim
          Object.keys(localStorage).forEach(key => {
              console.log(`localStorage key: ${key}, value length: ${localStorage.getItem(key)?.length || 0} characters`);
          });
          
          try {
              // Önce localStorage'dan mevcut skorları alalım
              let existingScores = localStorage.getItem("scores");
              console.log("Raw existing scores from localStorage:", existingScores);
              
              // Mevcut skorları ayrıştırmaya çalışalım
              let scores = [];
              if (existingScores) {
                  try {
                      scores = JSON.parse(existingScores);
                      console.log("Successfully parsed existing scores:", scores);
                      
                      // Geçerli bir dizi değilse sıfırlayalım
                      if (!Array.isArray(scores)) {
                          console.warn("Parsed scores is not an array, resetting");
                          scores = [];
                      } else {
                          console.log("Current scores count:", scores.length);
                      }
                  } catch (e) {
                      console.error("Error parsing existing scores, resetting:", e);
                      scores = [];
                  }
              } else {
                  console.log("No existing scores found, starting with empty array");
              }
              
              // Yeni skoru oluşturalım
              const newScore = {
                  username: username,
                  score: parseInt(userScore, 10),
                  total: parseInt(totalQuestions, 10),
                  date: new Date().toLocaleString('tr-TR')
              };
              console.log("New score to add:", newScore);
              
              // Total değeri 4 olan yanlış skorları kaydetme
              if (newScore.total === 4) {
                  console.log("Preventing invalid score with total=4 from being saved");
                  return;
              }
              
              // Yeni skoru ekleyelim
              scores.push(newScore);
              console.log("Updated scores array:", scores);
              console.log("New total count:", scores.length);
              
              // localStorage'a kaydedelim
              localStorage.removeItem("scores"); // Önce eski değeri temizleyelim
              localStorage.setItem("scores", JSON.stringify(scores));
              console.log("Scores saved to localStorage");
              
              // Doğrulama
              let verifyScores = localStorage.getItem("scores");
              console.log("Verification - Raw scores from localStorage:", verifyScores);
              
              try {
                  let parsedVerify = JSON.parse(verifyScores);
                  console.log("Verification - Parsed scores:", parsedVerify);
                  console.log("Verification - Scores count:", parsedVerify.length);
              } catch (e) {
                  console.error("Verification failed - could not parse scores:", e);
              }
              
              console.log("===== SCORE SAVE COMPLETED =====");
          } catch (e) {
              console.error("Fatal error during score save:", e);
              alert("Error saving your score: " + e.message);
          }
      }
    });
