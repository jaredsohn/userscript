// ==UserScript==
// @name           ASSTR New Uploads Filter & Highlighter
// @author         ElDani
// @version        1.0
// @namespace      http://www.asstr.org/
// @description    This user-script adds an author-filter and an author-highlight function to the ASSTR New Uploads pages.
// @include        http://www.asstr.org/newfiles*.*
// ==/UserScript==

/* 
 * IMPORTANT SETUP INFORMATION:
 * ============================
 * There's no easy click-able menu available. This is a script that I've written for myself and published for
 * others as is. To configure this script to your liking, a basic knowledge of JavaScript or any other scripting
 * or programming language would be preferable.
 * 
 * This script checks the link of each newly uploaded file for a match. If, for example, a link contains the
 * text "/files/Collections/nifty", then it will be removed. If you want to add more filter criteria, expand
 * the existing array called filter. It goes something like this:
 *     filter[4] = "some_other_author/";
 *
 * The highlight part of the script works exactly the same, but it uses the highlight array instead:
 *     highlight[2] = "another_favorite_author/";
 * 
 * Finally you can also do a basic configuration of the highlighted entries:
 *     highlightBold      = true;    // or false
 *     highlightForeColor = "red";   // or any other color or color-code HTML/CSS can understand
 *     highlightBackColor = "green"; // or any other color or color-code HTML/CSS can understand
 * ============================
 */

var filter = new Array();
filter[0] = "/files/Collections/nifty/";
filter[1] = "asstr.org/~pza/";
filter[2] = "asstr.org/~LS/";
filter[3] = "asstr.org/~Cordial_Knot/";

var highlight = new Array();
highlight[0] = "/Crumbly_Writer/";
highlight[1] = "some_other_author";

highlightBold = true;
highlightForeColor = "#118800";
highlightBackColor = "#ffff77";

///////////////////////////////////////////////////////////////
// DON'T CHANGE ANYTHING BEYOND THIS LINE !!
///////////////////////////////////////////////////////////////

var curLink;
var curParent;
var iMax = document.getElementsByTagName("a").length;
var doFilter = false;
var doHighlight = false;

for(var i=0; i<iMax; i++) {
  curLink = document.getElementsByTagName("a")[i];
  curParent = curLink.parentElement;
  
  if(curParent.getAttribute("class")=="left") {
	for(var j=0; j<filter.length; j++) {
	  if(curLink.href.indexOf(filter[j])>-1) {
	    doFilter = true;
	    break;
	  }
	}
	if(doFilter==false) {
	  for(var j=0; j<highlight.length; j++) {
	    if(curLink.href.indexOf(highlight[j])>-1) {
		  doHighlight = true;
		  break;
		}
	  }
	}
	if(doFilter==true) {
	  curParent.parentElement.style.display="none";
	  doFilter = false;
	}
	if(doHighlight==true) {
      if(highlightBold==true) {
	    curLink.style.fontWeight="bold";
	  }
	  if(highlightForeColor.length>0) {
	    curLink.style.color=highlightForeColor;
	  } else {
	    curLink.style.color="#118800";
	  }
	  if(highlightBackColor.length>0) {
	    curParent.parentElement.style.background=highlightBackColor;
	  } else {
	    curParent.parentElement.style.background="#ffff77";
	  }
	  doHighlight = false;
	}
  }
}