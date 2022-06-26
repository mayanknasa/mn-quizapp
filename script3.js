axios
  .get("https://opentdb.com/api.php?amount=15&category=18&type=multiple")
  .then((res) => {
    function displayQuestion(object) {
      const optionArray = [object.correct_answer, ...object.incorrect_answers];
      console.log(optionArray);
      document.querySelector("#question_box").innerHTML = object.question;

      const chooseRandom = (arr) => {
        const res2 = [];
        for (let i = 0; i < arr.length;) {
          const random = Math.floor(Math.random() * arr.length);
          if (res2.indexOf(arr[random]) !== -1) {
            continue;
          }
          res2.push(arr[random]);
          i++;
        }
        return res2;
      };

      const randomOptionArray = chooseRandom(optionArray);
      console.log(randomOptionArray);
      for (let i = 0; i < optionArray.length;) {
        document.querySelector(`#btn${i + 1}label`).innerText =
          randomOptionArray[i];
        document
          .querySelector(`#btnradio${i + 1}`)
          .setAttribute("value", randomOptionArray[i]);
        // console.log(randomOptionArray[i]);
        // console.log("option changed");
        i++;
      }
      // FUNCTIONALITY ADDING
      let check_answer = document.querySelector("#check_answer");
      const correctAnswerValue=object.correct_answer;
      check_answer.addEventListener("click", () => {
        const userOutput = document.querySelector(
          "input[type=radio][name=btnradio]:checked"
        ).value;
        console.log(userOutput);
        console.log(correctAnswerValue);        
        if (userOutput === correctAnswerValue) {  
          let right_scoreText=0;  
          right_scoreText++    
          document.querySelector("#check_answer").disabled = true;
          document.querySelector("#clear_response").disabled = true;
          document.querySelector('#right_score').textContent=right_scoreText;
          document.querySelectorAll(".btn-check").forEach(function (userItem) {
            userItem.disabled = true;
          });
          document.querySelector("#answer_teller_right").innerText =
            "CORRECT ANSWER!";
        } else { 
          let wrong_scoreText=0;        
          wrong_scoreText++
          document.querySelector("#check_answer").disabled = true;
          document.querySelector("#clear_response").disabled = true;
          document.querySelector('#wrong_score').innerText=wrong_scoreText;
          document.querySelectorAll(".btn-check").forEach(function (userItem) {
            userItem.disabled = true;
          });
          document.querySelector(
            "#answer_teller_wrong"
          ).innerHTML = `INCORRECT ANSWER!<br> <p style="font-size:20px; color:blue;">Correct Answer is : <span style="color:rgb(44, 170, 44);">${object.correct_answer}</span></p>`;
        }
        return [userOutput,correctAnswerValue];
      },{once:true});
      console.log("yeahh");
    }
    const allQuestionArray = res.data.results;
    const next_question = document.querySelector("#next_question");
    const clear_response = document.querySelector("#clear_response");
    const question_number=document.querySelector("#question_number")
    displayQuestion(allQuestionArray[0])
    allRadioButtonArray=[]
    for(a=0;a<4;a++){
      allRadioButtonArray.push( document
        .querySelector(`#btnradio${a + 1}`))
    }
    console.log(allRadioButtonArray)
    let m = 1;
    next_question.addEventListener("click", () => {
      if (m <= 15) {
        displayQuestion(allQuestionArray[m]);
        document.querySelector("#question_number").innerText=m+1;
        m++;
      }
      document.querySelector("#check_answer").disabled = false;
      document.querySelector("#clear_response").disabled = false;
      document.querySelector("#answer_teller_wrong").innerHTML = "";
      document.querySelector("#answer_teller_right").innerHTML = "";
      document.querySelectorAll(".btn-check").forEach(function (userItem) {
        userItem.checked = false;
        userItem.disabled = false;
      });
    });
    clear_response
      .addEventListener("click", () => {
        document.querySelectorAll(".btn-check").forEach(function (userItem) {
          userItem.checked = false;
        });
      })
  })
  .catch((e) => {
  console.log("Opps error occured:", e);
  document.querySelector("#question_box").innerText =
    "Opps! Please Refresh the Page";
  for (let t = 0; t < 5;t++) {
    document.querySelector(`#btn${t + 1}label`).innerText =
      "Please Refresh the Page";
  }
});
