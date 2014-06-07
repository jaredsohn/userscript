/* The Amazing ASSTR Onan-O-Matic Autoscroller! 
 * Original by BitBard!
 * Revisions by "Michael the ASSTR Guy" (code@asstr.org)! 
 * Revised by Vinnie Tesla (vinnie@vinnietesla.com) January 2003,
 * Greasemonkified by Vinnie Tesla December 2006!
 *
 * THIS CODE IS HEREBY PLACED INTO THE PUBLIC DOMAIN, authorized for any use
 * by any person or entity for any purpose.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See http://www.asstr.org/terms.html for more details.
 */

// ==UserScript==
// @name          Autoscroller 0.1
// @namespace     http://vinnietesla.com/toys/
// @description   The Amazing ASSTR Onan-o-Matic Autoscroller: Greasemonkey version.
// ==/UserScript==
// hit ALT-SHIFT-O to invoke in FF2.0, ALT-O in other Mozillae.


var y=0;
var lasty=0;
var visibility=0;
var hop = 0;
var scratch;
var workInterval = 0;
var scrollInterval = -2;

function scroller() {
	   y = window.pageYOffset + 1;
	top.scroll(0,y);
	return true;
}

// This function actually creates the scrollbar. 

function runScroller() {

  var scrollbar =  document.createElement("div");
 scrollbar.innerHTML= '<DIV ID="floatScroll" style="position: fixed; left: 0; top:0; visibility: hidden;">' +
	'<table border=0>' +
	'<tr><td>' +
	'<FORM name="speedy" id="speedy">' +
	'<select name="ss" id="ss"> ' +
	'<option value="10">Scroll Very Fast' +
	'<option value="25">Fast Scroll' +
	'<option value="50">Medium Scroll' +
	'<option value="100">Slow Scroll' +
	'<option value="150" selected>Very Slow Scroll' +
	'<option value="200">Even Slower' +
	'<option value="500">Slowest' +
	'<option value="999">Info on the auto-scroller' +
	'<input type=button id="pause" name=pause value=Start>' +
	'<input type=button id="hide" name=hide value=Hide accesskey="o">' +
	'</FORM>' +
	'</td><td>' +
	'</td><td>' +
	'</td>' +
	'</table>' +
	'<br>' +
   '</DIV>';
  document.body.insertBefore(scrollbar, document.body.firstChild);
	return true;
}

function getScrollRate(){
  var speed = document.forms.namedItem("speedy");
  var spelect = speed.elements.namedItem("ss");

		return spelect.value;
}

function hide(){
  if (visibility == 0){
  document.getElementById("floatScroll").style.visibility = "visible";
  visibility = 1;
  return false;
  } else {
       	document.getElementById("floatScroll").style.visibility = "hidden";
	visibility = 0;
	clearInterval( workInterval );
	return false;
  }
}

function pause(){
	if( getScrollRate() == 0 ){
		return;
	}
	if( hop == 0 ){
		unpause();
	} else {
		dopause();
	}
	return true;
}

function dopause(){
	if( scrollInterval != -2 ){
		clearInterval( scrollInterval );
	}
	hop = 0;
		document.getElementById("pause").value = "Start";

}

function unpause(){
	if( scrollInterval != -2 ){
		clearInterval( scrollInterval );
	}
	hop = 1;

		document.getElementById("pause").value = "Stop";
		scrollInterval = setInterval( scroller, getScrollRate() );
}

runScroller();
var pausebutton = document.getElementById('pause');
pausebutton.addEventListener("click", pause, true);
var hidebutton = document.getElementById('hide');
hidebutton.addEventListener("click", hide, true);
var speed = document.forms.namedItem("speedy");
speed.addEventListener("change", unpause, true);
speed.addEventListener("focus", show, true);

