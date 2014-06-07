// ==UserScript==
// @name        Kasi-time
// @namespace   https://twitter.com/akameco
// @description 不可能を可能にする
// @include     http://www.kasi-time.com/*
// @version     1.00
// @grant       none
// ==/UserScript==

// enable focus text
function enableCopyText() {
  for (let i=0; i < document.body.attributes.length; ++i) {
    document.body.setAttribute(document.body.attributes[i].name,"return true");
  }
  document.getElementById("center").setAttribute("onmousedown","return true");
}

// select all textarea
function selectText() {
  let element= document.querySelector(".mainkashi");
  // create range
  let rng = document.createRange();
  rng.selectNodeContents(element);
  // add range for the selected regions
  window.getSelection().addRange(rng);
}

// create new button
function createCopyButton() {
  let button = document.createElement("button");
  // set text 
  button.innerHTML = "選択";
  button.style.margin = "0px 0px 10px 0px";
  button.style.borderTop = "1px solid #ccc";
  button.style.borderRight = "1px solid #999";
  button.style.borderBottom = "1px solid #999"; 
  button.style.borderLeft = "1px solid #ccc";
  button.style.padding = "3px 12px";
  button.style.cursor = "pointer";
  button.style.color = "#666";
  button.addEventListener("click",function(){selectText()},false);
  let frame = document.querySelector("#kashi_flame");
  frame.appendChild(button);
  console.log(button.parentNode);
  // swap elements
  button.parentNode.insertBefore(button,button.parentNode.firstChild);

}

window.onload = function () {
  setTimeout(function() {
    enableCopyText(); 
    createCopyButton();
  }, 10);
} 
