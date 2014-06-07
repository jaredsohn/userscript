// ==UserScript==
// @name           Real GM Forum Cleaner
// @description    Cleans up real gm 
// @include        http://www.realgm.com/boards/*
// @author         pltnz64
// ==/UserScript==

// removes big blue Real GM header
var rmHeader = document.getElementById('header');
if (rmHeader) {
    rmHeader.removeChild(rmHeader);
}

//  removes the top most Real GM header
var topHeader = document.getElementById('topmenu');
if (topHeader) {
    topHeader.removeChild(topHeader);
}

// removes the annoying large news box
var insetBox = document.getElementById('forumextras');
if (insetBox) {
    insetBox.removeChild(insetBox);
}

// gets rid of the footer
var removeFooter = document.getElementById('footer');
if (removeFooter) {
    removeFooter.removeChild(removeFooter);
}

// random ad removal
var adWrap = document.getElementById('forumadwrap');
if (adWrap) {
    adWrap.removeChild(adWrap);
}

var adSidebar = document.getElementById('adside');
if (adSidebar) {
    adSidebar.removeChild(adSidebar);
}