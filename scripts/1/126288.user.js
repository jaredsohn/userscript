// RedFin Walk Score 2012
// version 0.1 
// 2012-02-20
// Copyright (c) 2012, Kenji Matsuoka
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a user script.  To install in Google Chrome, just drag 
// the file into the browser and click through the prompts.
//
// To disable or uninstall, go to chrome://extensions. 
//
// This scripts is just a slight modification of one created by rouftop. 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RedFin Walk Score 2012
// @namespace     http://kenjimatsuoka.blogspot.com/
// @description   Links to a property's WalkScore on RedFin.
// @include       http://www.redfin.com/*
// ==/UserScript==

function getElementText(elID) {
    return document.getElementById(elID).textContent.replace(/[^a-zA-Z0-9 ]/g, "").replace(/^ +/g, "").replace(/ +$/g, "");
}
    
function showWalkability() {
    var add1 = getElementText('address_line_1');
    var add2 = getElementText('address_line_2');
    var addr = (add1 + ' ' + add2).replace(/ /, "+");
    var loc = "http://www.walkscore.com/get-score.php?street=" + addr + "&go=Go";
    var div = document.createElement('div');
    var anc = document.createElement('a');
    anc.target = '_new';
    anc.href = loc;
    anc.innerHTML = "Show Walk Score";
    div.appendChild(anc);
    var sibling = document.getElementById('address_line_2');
    sibling.parentNode.insertBefore(div, sibling.nextSibling);
}

showWalkability();
