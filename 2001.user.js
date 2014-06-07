
// This Greasemonkey user script presents a score 0-90 for progress
// in Halma games on the gaming site itsyourturn.com (IYT).
//
// As a Halma beginner, I couldn't tell if I was winning during a game
// so I wrote this script to help out.
//
// The score is determined by numbering the rows after home base diagonally 1-11.
// Pieces in the home base count 0. Pieces in the first row outside
// home base count as one. This continues diagonally to the corner of
// the goal base which is 11. All pieces in the home base is 90 pts which is, 
// therefore, the goal score i.e. player with higher score is winning.
//
// I'd enjoy hearing feedback. Email me as Oogly via the IYT site's internal mail.
// If you have any ideas for a more accurate method of scoring or have ideas
// for other IYT greasemonkey scripts, please let me know.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          IYT Halma Score
// @description   Score progress in Halma on Itsyourturn.com
// @include       http://itsyourturn.com/*
// @include       http://www.itsyourturn.com/*
// ==/UserScript==

var w = 0
var  b = 0
if (prefix == "hm/haa"){
for (var i = 0; i <=63; i++)
{
//alert("B " +  b + "   W " +  w +"    bs " +  boardstr.slice(i,i+1)  +  "    i"+  i)
switch(i){
case 0: 
	if ( boardstr.slice(i,i+1)=="b")
		 {b+= 11};
	continue;
case 1:
case 8: 
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 10};
	continue;
case 2:
case 9: 
case 16:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b +=  9};
	continue;
case 3:
case 10: 
case 17:
case 24:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 8};
	continue;
case 4:
case 11: 
case 18:
case 25:
case 32:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b += 7};
	 if ( boardstr.slice(i,i+1)=="w") 
		{w += 1};
	continue;
case 5:
case 12: 
case 19:
case 26:
case 33:
case 40:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b += 6};
	 if ( boardstr.slice(i,i+1)=="w") 
		{w += 2};
	continue;
case 6:
case 13: 
case 20:
case 27:
case 34:
case 41:
case 48:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 5};
	 if ( boardstr.slice(i,i+1)=="w") 
		{ w += 3};
	continue;
case 7:
case 14: 
case 21:
case 28:
case 35:
case 42:
case 49:
case 56:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 4};
	 if ( boardstr.slice(i,i+1)=="w") 
		{ w += 4};
	continue;
case 15: 
case 22:
case 29:
case 36:
case 43:
case 50:
case 57:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 3};
	 if ( boardstr.slice(i,i+1)=="w") 
		{ w += 5};
	continue;
case 23:
case 30:
case 37:
case 44:
case 51:
case 58:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 2};
	 if ( boardstr.slice(i,i+1)=="w") 
		{ w += 6};
	continue;
case 31:
case 38:
case 45:
case 52:
case 59:
	 if ( boardstr.slice(i,i+1)=="b") 
		{ b+= 1};
	 if ( boardstr.slice(i,i+1)=="w") 
		{ w += 7};
	continue;
case 39:
case 46:
case 53:
case 60:
	if ( boardstr.slice(i,i+1)=="w") 
		{ w += 8};
	continue;
case 47:
case 54:
case 61:
	if ( boardstr.slice(i,i+1)=="w") 
		{ w += 9};
	continue;
case 55:
case 62:
	if ( boardstr.slice(i,i+1)=="w") 
		{ w += 10};
	continue;
case 63:
	if ( boardstr.slice(i,i+1)=="w") 
		{ w += 11};
	continue;
default:
	alert("default error" +  i)
	continue;
}
}

var msg = "B " + b + "  W " + w + " of 90"
var logo = document.createElement("div");
logo.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    msg +
    '</p></div>';
document.body.insertBefore(logo, document.body.firstChild);
}