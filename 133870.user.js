// ==UserScript==
// @name        Adiversions: On Hover Spoiler FF
// @namespace   URI
// @version    0.1
// @description  Hilights a spoiler on hover
// @include     http://adiversions.stalo.com/*
// @copyright  Zoids
// ==/UserScript==

window.setTimeout(function() {
  var postSpan = document.getElementById("bodyarea").getElementsByTagName("span");
  
  for (var i = 0; i < postSpan.length; i++) {
	if(postSpan[i].className !== "smalltext") {
			if(postSpan[i].className !== "middletext") {
			postSpan[i].addEventListener("mouseover", function() {
			  this.style.color = "white";
			}, false);
			postSpan[i].addEventListener("mouseout", function() {
			  this.style.color = "black";
			}, false);
			}
	  }
  }
  
}, 1000)
