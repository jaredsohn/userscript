// ==UserScript==
// @name           Welinux new comments navigation
// @namespace      leprosorium.ru
// @include        http://welinux.ru/post/*
// ==/UserScript==


function findPos(obj) {
	var curtop = 0;

	if (obj.offsetParent) {
		do {
			curtop += obj.offsetTop;
		}
		while (obj = obj.offsetParent);
		return [curtop];
	}
}

function drawBorder(){
	var cmt = newComms[index].parentNode;

	cmt.style.border = "1px solid black";
	cmt.style.borderWidth = "1px 1px 1px 1px";
}

function removeBorder() {
	var cmt = newComms[index].parentNode;

	cmt.style.border = "";
	cmt.style.borderWidth = "";
}

function ScrollToNextNewComment() {
	if(index !== -1){
		removeBorder();
	}
	index++;
	index %= newComms.length;
	drawBorder();
	window.scroll(0, findPos(newComms[index]));
}

function ScrollToPrevNewComment() {
	if(index !== -1){
		removeBorder();
	}
	index--;
	index %= newComms.length;
	if (index < 0) {
		index += newComms.length;
	}
	drawBorder();
	window.scroll(0, findPos(newComms[index]));
}

function keyDownHandler(e) {
	if (e.keyIdentifier == "U+004A" || e.which == e.DOM_VK_J) {
		ScrollToNextNewComment();
	} else if (e.keyIdentifier == "U+004B" || e.which == e.DOM_VK_K) {
		ScrollToPrevNewComment();
	}
}

var newComms = document.querySelectorAll(".cntop");
var index = -1;

if(newComms.length > 0){
	document.addEventListener('keydown', keyDownHandler, false);
}
