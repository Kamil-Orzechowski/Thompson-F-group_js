import { getVertices } from "./group.mjs";

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
    plotBtn.removeAttribute("disabled");
  } else {
    validityMsg.textContent = "Invalid input!";
    wordInTeX.textContent = "";
    plotBtn.setAttribute("disabled", "true")
  }
});

const plotBtn = document.getElementById("plot");
const chart = document.getElementById("chart");

plotBtn.addEventListener("click", () => {
  plotElement(word);
});

function plotElement(string) {
  var vertices = getVertices(string);
  var data = [{
    x: vertices.map((v) => v[0]),
    y: vertices.map((v) => v[1]),
    type: "scatter",
    mode: "lines+markers",
    hoverinfo: "x+y"
  }];

  var layout = {
    title: 'Graph of g',
    xaxis: {
      title: 'argument',
      hoverformat: '.12~e'
    },
    yaxis: {
      title: 'value',
      hoverformat: '.12~e'
    },
    hovermode: "closest"
  };

  Plotly.newPlot(
  chart, data, layout
);
}


