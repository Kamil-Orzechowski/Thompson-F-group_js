import { writeDyadic } from "./fraction-converter.mjs";
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
    plotBtn.setAttribute("disabled", "true");
  }
});

const plotBtn = document.getElementById("plot");
const chart = document.getElementById("chart");
const commonFrBtn = document.getElementById("commonFr");
const decimalBtn = document.getElementById("decimalFr");

let option = "common";
for (const button of [commonFrBtn, decimalBtn]) {
  button.addEventListener("change", (event) => {
    option = event.target.value;
  });
}

plotBtn.addEventListener("click", () => {
  plotElement(word, option);
});

function plotElement(string, opt) {
  let vertices = getVertices(string);
  let data = {
    x: vertices.map((v) => v[0]),
    y: vertices.map((v) => v[1]),
    type: "scatter",
    mode: "lines+markers",
  };

  if (opt == "common") {
    data.text = vertices.map(
      (v) => `(${writeDyadic(v[0])}, ${writeDyadic(v[1])})`
    );
    data.hovertemplate = "%{text}<extra></extra>";
  }
  if ((opt = "decimal")) {
    data.hoverinfo = "x+y";
  }

  const layout = {
    title: "Graph of g",
    xaxis: {
      title: "argument",
      hoverformat: ".12~e",
    },
    yaxis: {
      title: "value",
      hoverformat: ".12~e",
    },
    hovermode: "closest",
  };

  Plotly.newPlot(chart, [data], layout);
}
