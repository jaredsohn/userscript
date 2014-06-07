// ==UserScript==
// @name          PunchComment
// @description	  Punches YouTube Commenters in the Face
// @author        Kiri-chan!
// @version       1.0
// @include       http://www.youtube.com/*
// @include       https://www.youtube.com/*
// ==/UserScript==

var random = true;

function swapText() {
    var t = this.getAttribute("data-old-text");
    this.setAttribute("data-old-text", this.innerHTML);
    this.innerHTML = t;
}

function modComment(div) {
    div.setAttribute("data-old-text", div.innerHTML);
	var txt = div.innerHTML;
	var newtxt = "";
	txt = txt.split(' ');
	
	if(random){
		for(var i = 0; i < Math.floor(Math.random() * txt.length); ++i) {
			if(i != 0) {
				newtxt += ' ';
			}
			newtxt += txt[i];
		}
		newtxt += "... Oh god my face!";
	} else{
		if(txt.length > 4) {
			newtxt = txt[0] + ' ' + txt[1] + ' ' + txt[2] + ' ' + txt[3] + ' ' + txt[4] + "... Oh god my face!";
		} else{
			for(var i = 0;i < txt.length - 1; ++i) {
				if(i != 0) {
					newtxt += ' ';
				}
				newtxt += txt[i];
			}
			newtxt += "... Oh god my face!";
		}
	}
	div.innerHTML = newtxt;
    div.onclick = swapText;
}

([]).slice.call(document.querySelectorAll(".comment-text p")).forEach(modComment);