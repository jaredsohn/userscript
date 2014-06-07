// ==UserScript==
// @name           ArmorGames Auto Fullscreen
// @namespace      Vainqueur (William Bixler)
// @description    ...
// @include        *.armorgames.com/play/*
// ==/UserScript==

var newDiv = document.createElement("div");
newDiv.id = "fullscreenButton";
newDiv.setAttribute("align", "left");
newDiv.setAttribute("onClick", "var x  = document.getElementsByName('movie'); window.location = x[0].value;");
newDiv.setAttribute("onmouseover", "this.style.background = 'black'");
newDiv.setAttribute("onmouseout", "this.style.background = 'grey'");
newDiv.style.width = "100px";
newDiv.style.height = "50px";
newDiv.style.position = "absolute";
newDiv.style.top = "700px";
newDiv.style.left = "100px";
newDiv.style.margin = "0px auto";
newDiv.style.background = "grey";
newDiv.innerHTML = "<h1 style='color:white'><center>Click this box to go to FULLSCREEN!</center></h1>";

document.body.appendChild(newDiv);