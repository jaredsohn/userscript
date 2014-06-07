// ==UserScript==
// @name		Willhaben Bilderansicht
// @namespace	https://userscripts.org/users/493847
// @version		0.5
// @description	Behebt Probleme mit der Bileransicht auf Willhaben.at
// @match		http://www.willhaben.at/iad/viewimage*
// @copyright	2013 Pwnicorn
// @downloadURL	https://userscripts.org/scripts/source/163010.user.js
// @icon		http://i.imgur.com/5DJiVJ7.png
// ==/UserScript==


var imageURL = [];
var imageCaption = [];
var thumbs = document.getElementsByClassName("thumb");
var i = 0;
var n = 0;


function NextImage() {
	for (var i = 0; i < thumbs.length; i++) {
        if (thumbs[i].style.backgroundImage.slice(4, -10)+".jpg" == document.getElementsByClassName("advance-link")[0].childNodes[0].src) n = i;
    }
    if (n+2 > thumbs.length) n = -1;
    ChangeImage(imageURL[n+1], imageCaption[n+1]);
}

function PrevImage() {
	for (var i = 0; i < thumbs.length; i++) {
        if (thumbs[i].style.backgroundImage.slice(4, -10)+".jpg" == document.getElementsByClassName("advance-link")[0].childNodes[0].src) n = i;
    }
    if (n == 0) n = thumbs.length;
    ChangeImage(imageURL[n-1], imageCaption[n-1]);
}

function LinkEverythingElse() {
	document.getElementsByClassName("advance-link")[0].childNodes[0].addEventListener("click", NextImage, false);
    document.getElementsByClassName("next")[0].addEventListener("click", NextImage, false);
    document.getElementsByClassName("prev")[0].addEventListener("click", PrevImage, false);
}

function ChangeImage(url,caption) {
    document.getElementsByClassName("advance-link")[0].childNodes[0].src = url;
    document.getElementsByClassName("caption")[0].innerHTML = caption;
    document.getElementsByClassName("selected")[0].removeAttribute("class");
	for (var i = 0; i < thumbs.length; i++) {
        if (thumbs[i].style.backgroundImage.slice(4, -10)+".jpg" == url) thumbs[i].parentNode.setAttribute("class", "selected");
	}
    LinkEverythingElse();
}

function ThumbClick() {
	var n = this.href.split("#")[1]-1;
    ChangeImage(imageURL[n],imageCaption[n]);
}

function LinkThumbs() {
	for (var i = 0; i < thumbs.length; i++) {
		thumbs[i].addEventListener("click", ThumbClick, false);
	}
}

function BuildIndex() {
	for (var i = 0; i < thumbs.length; i++) {
		imageURL[i] = thumbs[i].style.backgroundImage.slice(4, -10)+".jpg";
		imageCaption[i] = thumbs[i].title;
	}
}

BuildIndex();
LinkThumbs();
LinkEverythingElse();