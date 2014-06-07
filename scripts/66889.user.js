// ==UserScript==
// @name          No more Mr. Plus Tab
// @namespace     
// @description   Removes the + tab.
// @include       http://www.forumwarz.com/*
// @include       http://forumwarz.com/*
// @exclude       http://www.forumwarz.com/forums/battle/*
// @exclude       http://forumwarz.com/forums/battle/*
// @exclude       http://www.forumwarz.com/help/*
// @exclude       http://forumwarz.com/help/*
// ==/UserScript==

// Call style function
addGlobalStyle();
// Add general links
removeTab();

// Update stylesheet
function addGlobalStyle() {
	

    var head, style;
    head = document.getElementsByTagName('head')[0];
    
    if (!head) { return; }
    
    style = document.createElement('style');
    style.type = 'text/css';
    
    head.appendChild(style);
}

// Add links to navigation bar
function removeTab() {

        var plusTab = document.getElementById('__tab');
    if (plusTab) {
	plusTab.parentNode.removeChild(plusTab); }

}