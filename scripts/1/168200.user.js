// ==UserScript==
// @name        Timer
// @description It's a timer.
// @include		http*://*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require		https://ajax.googleapis.com/ajax/libs/prototype/1.7.0.0/prototype.js
// ==/UserScript==

var seconds;
document.observe("dom:loaded", function() {
    seconds = 0;
	startTimer();
});

function startTimer(){
	div = document.createElement("div");
	span = document.createElement("span");
	
	div.id = "tick_holder";
	span.id = "time";
	span.innerHTML = "" + seconds;
    div.style.position = "fixed";
    div.style.right = "10px";
    div.style.border = "solid black 3px";
    div.style.padding = "10px";
	div.style.background = "-webkit-linear-gradient(top, rgb(250, 250, 250) 0%,rgb(255, 255, 255) 100%)";
	div.style.boxShadow = "box-shadow: 0px 0px 9px rgba(0,0,0,0.15)";
	
	span.style.textAlign = "center";
	span.style.display = "block";
	span.style.padding = "10px";
	
	div.appendChild(span);
	var body = document.body;
	body.insertBefore(div, body.childNodes[0]);
    timer = setInterval(startTicking, 1000);    
}
    
function startTicking(){
	seconds++;
    $("time").innerHTML = "" + seconds;
}