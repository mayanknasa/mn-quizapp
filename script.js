const QuotesArray = [
  "Real knowledge is to know the extent of one’s ignorance.",
  "Knowledge has a beginning but no end.",
  "The good life is one inspired by love and guided by knowledge.",
  "A people without the knowledge of their past history, origin and culture is like a tree without roots.” Marcus Garvey",
  "Be a lifelong student. The more you learn, the more you earn and more self-confidence you will have.",
  "Human behavior flows from three main sources: desire, emotion, and knowledge.",
  "Knowledge is the treasure of a wise man.",
  "Knowledge is power. And you need power in this world. You need as many advantages as you can get.",
  "Any fool can know. The point is to understand.",
  "An investment in knowledge pays the best interest.",
];
const randomIndexFromQuotesArray = Math.floor(
  Math.random() * QuotesArray.length
);
document.querySelector(
  ".quote"
).innerHTML = `<b>Quote of the Day</b><br><i>"${QuotesArray[randomIndexFromQuotesArray]}"</i>`;
axios
  .get("https://opentdb.com/api.php?amount=15&category=18&type=multiple")
  .then((res) => {
    function displayQuestion(object) {
      const optionArray = [object.correct_answer, ...object.incorrect_answers];
      document.querySelector("#question_box").innerHTML = object.question;
      const chooseRandom = (arr) => {
        const res2 = [];
        for (let i = 0; i < arr.length; ) {
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
      for (let i = 0; i < optionArray.length; ) {
        document.querySelector(`#btn${i + 1}label`).innerText =
          randomOptionArray[i];
        document
          .querySelector(`#btnradio${i + 1}`)
          .setAttribute("value", randomOptionArray[i]);
        i++;
      }
      // FUNCTIONALITY ADDING
      let check_answer = document.querySelector("#check_answer");
      const correctAnswerValue = object.correct_answer;
      check_answer.addEventListener(
        "click",
        () => {
          const userOutput = document.querySelector(
            "input[type=radio][name=btnradio]:checked"
          ).value;
          if (userOutput === correctAnswerValue) {
            right_answer_array.push(userOutput);
            document.querySelector("#check_answer").disabled = true;
            document.querySelector("#clear_response").disabled = true;
            document.querySelector("#right_score").textContent =
              right_answer_array.length;
            document
              .querySelectorAll(".btn-check")
              .forEach(function (userItem) {
                userItem.disabled = true;
              });
            document.querySelector("#answer_teller_right").innerText =
              "CORRECT ANSWER!";
          } else {
            wrong_answer_array.push(userOutput);
            document.querySelector("#check_answer").disabled = true;
            document.querySelector("#clear_response").disabled = true;
            document.querySelector("#wrong_score").innerText =
              wrong_answer_array.length;
            document
              .querySelectorAll(".btn-check")
              .forEach(function (userItem) {
                userItem.disabled = true;
              });
            document.querySelector(
              "#answer_teller_wrong"
            ).innerHTML = `INCORRECT ANSWER!<br> <p style="font-size:1.1rem; color:#82c5f5;">Correct Answer is : <span style="color:yellowgreen; font-size:1.1rem;">${object.correct_answer}</span></p>`;
          }
        },
        { once: true }
      );
    }
    let right_answer_array = [];
    let wrong_answer_array = [];
    const allQuestionArray = res.data.results;
    const next_question = document.querySelector("#next_question");
    const clear_response = document.querySelector("#clear_response");
    const question_number = document.querySelector("#question_number");
    displayQuestion(allQuestionArray[0]);
    allRadioButtonArray = [];
    for (a = 0; a < 4; a++) {
      allRadioButtonArray.push(document.querySelector(`#btnradio${a + 1}`));
    }
    let m = 0;
    next_question.addEventListener("click", () => {
      m++;
      if (m <= 14) {
        displayQuestion(allQuestionArray[m]);
        document.querySelector("#question_number").innerText = m + 1;
      }
      if (m === 15) {
        const percentage = (
          right_answer_array.length / allQuestionArray.length
        ).toFixed(2);
        document.querySelector("#percentage_score").innerText = `${
          percentage * 100
        }%`;
        document.querySelectorAll(".btn-check").forEach(function (userItem) {
          userItem.checked = true;
        });
        document.querySelector("#next_question").disabled = true;
        document.querySelector("#check_answer").disabled = true;
        document.querySelector("#clear_response").disabled = true;
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
    clear_response.addEventListener("click", () => {
      document.querySelectorAll(".btn-check").forEach(function (userItem) {
        userItem.checked = false;
      });
    });
  })
  .catch((e) => {
    console.log("Opps error occured:", e);
    document.querySelector("#question_box").innerText =
      "Opps! Please Refresh the Page";
    for (let t = 0; t < 5; t++) {
      document.querySelector(`#btn${t + 1}label`).innerText =
        "Please Refresh the Page";
    }
  });
