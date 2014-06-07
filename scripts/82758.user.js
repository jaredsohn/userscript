// ==UserScript==
// @name          Redfin WalkScore Badge
// @namespace     http://mrbb.org/javascripts/
// @description   Show a property's WalkScore on Redfin.
// @include       http://*.redfin.com/*/home/*
// ==/UserScript==

// version 0.2
// 2008-01-25
// Copyright (c) 2008, Michael Roufa

// Extended:
// 2010-07-31
// Copyright (c) 2010, Michael Braiuwerman

// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Redfin Walkability", and click Uninstall.
//
// --------------------------------------------------------------------
//


function getElementText(elID) {
  var text = document.getElementById(elID).innerHTML;
  text = text.replace(/<span[^>]*>/g,"");
  text = text.replace(/<\/span>/g,"");
  text = text.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^ +/g, "").replace(/ +$/g, "");
  return text;
}

function showWalkability() {
	var add1 = getElementText('address_line_1');
	var add2 = getElementText('address_line_2');
	var addr = (add1 + ' ' + add2).replace(/ /g, "+");
	var loc = "http://www.walkscore.com/get-score.php?street=" + addr + "&go=Go";
	var div = document.createElement('div');
	var anc = document.createElement('a');
	anc.target = '_new';
	anc.href = loc;
	anc.innerHTML = "Show Walkability";
	div.appendChild(anc);
	var sibling = document.getElementById('address_line_2');

// Skip text link, snce we have graphic link to install
//	sibling.parentNode.insertBefore(div, sibling.nextSibling);
	
	var badgeDiv = document.createElement('div');
	badgeDiv.innerHTML =	'<div style="position: relative; width:100px; height: 40px; background: url(http://www2.walkscore.com/images/widget/back-yellow4.gif) top left no-repeat;overflow:hidden;border:0;outline:0;margin:0;padding:0;">  <h1 style="position: absolute; left: 43px; top: 11px;border:0;outline:0;margin:0;padding:0;text-align: left; text-decoration:none; font-style: normal; vertical-align: baseline; background: none;font:16px Geneva, Arial, Helvetica, sans-serif; font-weight: bold; color:#b14900;">73</h1>  <p style="position: absolute; left: 0; top: 27px;border:0;outline:0;margin:0;padding:0;text-align: left; text-decoration:none; font-style: normal; vertical-align: baseline; background: none;font: 10px Arial, Helvetica, sans-serif; font-weight: normal; color: #666; width: 100px; text-align:center;">Very Walkable</p>  <a href="' + loc + '" target="_blank" style="position:absolute;top:0;left:0;display:block;background:url(http://www.walkscore.com/images/fulltrans.png) 0 0 repeat;z-index:5;text-indent:-999999px;width:100px;height:40px;border:0;outline:0;margin:0;padding:0;">Walk Score</a></div>'	;
	
	sibling.parentNode.insertBefore(badgeDiv, sibling.nextSibling);
	
}

showWalkability();
