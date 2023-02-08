const inputWord = document.getElementById("word");
const validateBtn = document.getElementById("validate");
const validityMsg = document.getElementById("validity");
const wordInTeX = document.getElementById("wordInTex");

let word;
const re = /^\s*([ab](\^\{-?[1-9]\d*\})?\s*)*$/;
validateBtn.addEventListener("click", () => {
  if (re.test(inputWord.value)) {
    word = inputWord.value.trim();
    validityMsg.textContent = "Your input: ";
    wordInTeX.textContent =
      word != "" ? `g = ${word}` : `g = \\mathrm{identity}`;
  } else {
    validityMsg.textContent = "Invalid input!";
    wordInTeX.textContent = "";
  }
});
