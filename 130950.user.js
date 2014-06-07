// ==UserScript==
// @name           OneMoreLevel auto Fullscreen
// @namespace      Vainqueur (William Bixler)
// @description    ...
// @include        http://onemorelevel.com/game/*
// ==/UserScript==

var newDiv = document.createElement("div");
newDiv.id = "fullscreenButton";
newDiv.setAttribute("align", "left");
newDiv.setAttribute("onClick", "var x  = document.getElementsByName('movie'); window.location = x[0].value;");
newDiv.setAttribute("onmouseover", "this.style.background = 'black'");
newDiv.setAttribute("onmouseout", "this.style.background = 'grey'");
newDiv.style.width = "150px";
newDiv.style.height = "80px";
newDiv.style.position = "absolute";
newDiv.style.top = "450px";
newDiv.style.left = "150px";
newDiv.style.margin = "0px auto";
newDiv.style.background = "grey";
newDiv.innerHTML = "<h2 style='color:white'><center>Click this box to go to FULLSCREEN!</center></h2>";

document.body.appendChild(newDiv);