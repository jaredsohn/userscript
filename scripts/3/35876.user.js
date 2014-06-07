// ==UserScript==
// @name           Big Evo
// @namespace      hackhalotwo@gmail.com
// @description    Custom Layout |-|@><0R
// @include        http://playevo.com/*
// @version				 1.2
// ==/UserScript==

//init the values
main = document.getElementById("main"); //get the main page layout
footer = document.getElementById("footer"); //get the footer layout

//get the stored values
if(!GM_getValue('width')) { //if the varible 'width' isn't set within Firefox
	GM_setValue('width', '80%');
}
if(!GM_getValue('font_size')) { //if the varible 'font_size' isn't set within Firefox
	GM_setValue('font_size', '11pt');
}
if(!GM_getValue('font_family')) { //if the varible 'font_size' isn't set within Firefox
	GM_setValue('font_family', 'Lucida Sans Unicode');
}

//Set up the User Interface
GM_registerMenuCommand("Configure Width", setWidth, null, null, 'W');
GM_registerMenuCommand("Configure Font Size (buggy)", setFontSize, null, null, 'F');
GM_registerMenuCommand("Configure Font Family (buggy)", setFontFamily, null, null, 'a');

//Set up the functions
function setWidth() { //updated for idiot proofing
	var n = prompt("Please set the width you want Ev5 to be (numbers only)");
	if(n != null) {
	 if(n > 0) {
	  if(n <= 60) { if(alert("Using this number may cause layout problems. Click OK to continue")) { GM_setValue('width', n+'%'); } }
	  else {
	   if(n <= 100) { GM_setValue('width', n+'%'); } //percents
	   else {
	    if(n <= 799) { alert("Using this number (in pixels) will cause layout problems. Please try again using a number between 800 and 1200"); return; } //kill it for idiot proofing issues
	    else { if(n <= 1199) { GM_setValue('width', n+'px'); } } //pixels
		 }
		} 
	 }
	 else { alert("your value must be a number greater than 0"); return; } //error
	}
	else { alert("you must input a number you nub :P"); return; }
	alert("Please reload your browser for the changes to take effect");
}
function setFontSize() {
	n = prompt("Please set the font size you want the font to be (numbers only)");
	if(n != null) { GM_setValue('font_size', n+"pt" ); } //set it as points
	alert("Please reload your browser for the changes to take effect");
}
function setFontFamily() {
	n = prompt("Please set the font family you want the font to be (letters only)\nONLY USE THIS FUNCTION IF YOU KNOW A FONT TYPE,\nAS IT WILL BREAK THIS USERSCRIPT");
	if(n != null) { GM_setValue('font_family', n ); } //set it
	else { return; }
	alert("Please reload your browser for the changes to take effect");
}

//expand the page
main.style.width=GM_getValue('width');
footer.style.width=GM_getValue('width');

main.style.fontSize=GM_getValue('font_size');//set the font size

main.style.fontFamily=GM_getValue('font_family'); //set the font family