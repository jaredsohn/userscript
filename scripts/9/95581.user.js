// ==UserScript==
// @name           Channel4 remove top panel
// @namespace      http://userscripts.org/users/lorriman
// @description    removes the top panel from the channel4.com program pages
// @include        http://www.channel4.com/programmes/*
// @version .1
// ==/UserScript==

document.getElementById('globalHeaderSpace').style.display='none';
document.getElementById('c4nav').style.display='none';
document.getElementById('c4ad-Top-parent').style.display='none';
newDiv=document.createElement('div');
document.body.insertBefore(newDiv,document.body.firstChild);
newDiv.appendChild(aTag=document.createElement('a'));
aTag.appendChild(document.createTextNode('show main menu'));

aTag.addEventListener("click", function(){
	document.getElementById('globalHeaderSpace').style.display='block';
	document.getElementById('c4nav').style.display='block';
	newDiv.style.display='none';
}, false);


