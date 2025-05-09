$(document).ready(function() {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
  
    
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
        window.location.href = "login.html";
        return;
    }
  
 
    $("#start-btn").on("click", function() {
        console.log("Butona tıklandı!");
        
       
        if (typeof window.questions === 'undefined' || !window.questions.length) {
            console.error("Sorular yüklenemedi!");
            alert("Sorular yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
            return;
        }
        
      
        questions = [...window.questions];
        
        
        $("#start-quiz").hide();
        $("#question-box").show();
        $("#options").show();
        $("#next-btn").show();
        $("#current-score").text("0"); 
        displayQuestion();
    });
  
   
    function displayQuestion() {
        if (currentQuestionIndex < questions.length) {
            let q = questions[currentQuestionIndex];
            $("#question").text(q.question);
            $("#options").empty();
            $("#current-score").text(score); 
            q.options.forEach(function(option, index) {
                let btn = $("<button></button>")
                    .text(option)
                    .attr("data-index", index);
                btn.on("click", function() {
                    $("#options button").removeClass("selected");
                    $(this).addClass("selected");
                    $("#next-btn").prop("disabled", false);
                });
                $("#options").append(btn);
            });
        } else {
           
            $("#quiz-container").html(`
              <div class="quiz-result">
                <h2>Quiz Tamamlandı!</h2>
                <p class="final-score">Toplam Puanınız: ${score} / ${questions.length}</p>
                <div class="result-buttons">
                  <button onclick="window.location.href='score.html'">Skor Tablosunu Gör</button>
                  <button onclick="location.reload()">Tekrar Dene</button>
                </div>
              </div>
            `);
            saveScore(currentUser, score, questions.length);
        }
    }
  
   
    $("#next-btn").on("click", function() {
        let selected = $("#options button.selected");
        if (selected.length === 0) {
            alert("Lütfen bir seçenek seçin!");
            return;
        }
        let selectedIndex = parseInt(selected.attr("data-index"));
        let correctIndex = questions[currentQuestionIndex].answer;
      
        if (selectedIndex === correctIndex) {
            score++;  
            $("#current-score").text(score); 
            $("#dialog-message").text("Doğru cevap! Puanınız: " + score);
        } else {
            $("#dialog-message").text("Yanlış cevap. Doğru cevap: " + questions[currentQuestionIndex].options[correctIndex]);
        }
      
        $("#dialog").dialog({
            modal: true,
            buttons: {
                "Devam Et": function() {
                    $(this).dialog("close");
                    currentQuestionIndex++;
                    $("#next-btn").prop("disabled", true);
                    displayQuestion();
                }
            }
        });
    });
  
    
    function saveScore(username, userScore, totalQuestions) {

        console.warn("Warning: Using deprecated saveScore function from script.js. Use the one in quiz.html instead.");
        

        return;
        
       
    }
});
