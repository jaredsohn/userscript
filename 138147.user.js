// ==UserScript==
//
// @name           Scroll Up
//
// @description    Adds a scroll up button 
//
// @include        http://*
// @include        https://*
// @grannt 		   none
//
// @require        http://code.jquery.com/jquery-1.3.2.min.js
//
// ==/UserScript==

var hovered = false;

function main() {
	var divup = document.createElement('div');
	divup.id = 'divup';
	divup.style.backgroundImage = "url(http://s.gullipics.com/image/j/i/o/4o7qgy-j9dcux-swzu/up.png)";
	$(divup).css({position:'fixed',top:5,right:5, width:30, height:30, opacity:0});
	divup.style.zIndex = 10000;
	document.body.appendChild(divup);

	window.onscroll = onscroll;
	divup.onclick = divclick;
	divup.onmouseover = onmouseover; 
	divup.onmouseout = onmouseleave;

	onscroll();
	setopacity(0.3);
}

function onscroll() {
	setopacity(0.3);
}

function onmouseover() {	
	if (window.pageYOffset < 300) return;
	$('#divup').animate({ opacity: 0.6 },100);
	hovered = true;
}

function onmouseleave() {
	$('#divup').animate({ opacity: getopacity() * 0.3},100, function() { hovered = false; });
}

function setopacity(max) {	
	if (hovered) return;
	var divup = document.getElementById('divup').style.opacity = getopacity() * max;
}

function getopacity() {
	var scroll = window.pageYOffset;

	var hidelength = 1000;
	var animationlength = 2000;

	if (scroll < hidelength) return 0;
	else if (scroll > hidelength + animationlength) return 1;
	else return ((scroll - hidelength) / animationlength); 
}

function divclick() {
	if (window.pageYOffset < 300) return;
	$("html, body").animate({ scrollTop: 0 }, "slow", function() { $('#divup').animate({ opacity:0 },400);});
}

main(); 