// ==UserScript==
// @name           Avanturist.org.VOTEB_PATCH
// @description    Avanturist.org forum votebuttons PATCH
// @version        0.3.0
// @include        http://avanturist.org*
// @include        http://www.avanturist.org*
// @include        https://avanturist.org*
// @include        https://www.avanturist.org*
// @include        http://glav.su*
// @include        http://www.glav.su*
// @include        https://glav.su*
// @include        https://www.glav.su*
// ==/UserScript==

var i,j;
var w;
var e;

e=document.getElementsByClassName('tableCell');
for (i=0; i<e.length; i++) {
	w=e[i].style.width;
	if (w=='150px'){
		e[i].style.width='300px';
	};
};

e=document.getElementsByClassName('blueButton userexpertvote_badVoteButton');
for (i=0; i<e.length; i++) {
	e[i].style.width='80px';
};

e=document.getElementsByClassName('blueButton userexpertvote_goodVoteButton');

for (i=0; i<e.length; i++) {
	e[i].style.width='80px';
};

e=document.getElementsByClassName('rightColumn');
for (i=0; i<e.length; i++) {
	e[i].style.display='none';
};