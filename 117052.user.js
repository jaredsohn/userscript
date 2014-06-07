// Google Reader+ 
// A skin to make the version of Google Reader released 10/31/2011 a little less of an eyesore.
// 2011-11-2
// Copyright (c) 2011, Doug Hamlin
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: https://addons.mozilla.org/en-US/firefox/addon/748
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "No Suggestions", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Google Reader+
// @namespace     http://doughamlin.com/projects/
// @description   A skin to make the version of Google Reader released 10/31/2011 a little less of an eyesore.
// @include       http://www.google.com/reader/view/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}




function toggleTopBar() {
	var topBar = document.getElementById('top-bar');
	var viewerHeader = document.getElementById('viewer-header');
	var addSub = document.getElementById('lhn-add-subscription-section');
	if (topBar.style.display == 'none') {
		topBar.style.display = 'block';
		viewerHeader.style.display = 'block';
		addSub.style.display = 'block';
	} else {
		topBar.style.display = 'none';
		viewerHeader.style.display = 'none';
		addSub.style.display = 'none';		
	}
}

var topBarToggle = document.createElement('a');
topBarToggle.href = '#';
topBarToggle.id = "topBarToggle";
topBarToggle.addEventListener("click", toggleTopBar, true);
topBarToggle.appendChild(document.createTextNode('Open/Close'));
var titleStatusHolder = document.getElementById('title-and-status-holder');
titleStatusHolder.parentNode.insertBefore(topBarToggle, titleStatusHolder);






//addGlobalStyle('.jfk-button { line-height: 16px; }');
//addGlobalStyle('.jfk-button-primary { background-image: none; background-color: #444; }');
//addGlobalStyle('#lhn-add-subscription { height: 16px; }');
//addGlobalStyle('#lhn-add-subscription-section { height: 2em; }');
//addGlobalStyle('#logo { margin: 7px 0 0 5px; top: 0; }');
//addGlobalStyle('#search { padding: 5px 0; }');
//addGlobalStyle('#top-bar { height: 39px; }');
//addGlobalStyle('#sections-header { height: 2em; }');
addGlobalStyle('#top-bar, #viewer-header, #lhn-add-subscription-section { display: none; }');
addGlobalStyle('#topBarToggle { display: block; margin: 0 auto; width: 100px; -webkit-border-bottom-left-radius: 5px; -webkit-border-bottom-right-radius: 5px; background: #2d2d2d; padding: 4px; color: #ccc; text-decoration: none; font: 13px/13px Arial,sans-serif; text-align: center; }');
addGlobalStyle('.scroll-tree li { background: #fcfcfc; }');
addGlobalStyle('.scroll-tree li a .name-unread { color: #303030; }');
addGlobalStyle('.scroll-tree li.folder .link, scroll-tree li.sub { height: 1.8em; }');
addGlobalStyle('#scrollable-sections-top-shadow { background-image: none; border-top: none; }');
addGlobalStyle('#current-entry .card { border-color: #6688ee; }');
addGlobalStyle('::-webkit-scrollbar-thumb { background-color: #6688ee; }');
addGlobalStyle('::-webkit-scrollbar-thumb:hover { background-color: #6688ee; }');
addGlobalStyle('.scroll-tree .icon { background-image: none; background-color: #6688ee; width: 10px; height: 10px; margin-right: 6px; margin-top: 5px; }');
addGlobalStyle('.scroll-tree .favicon { width: 10px; height: 10px; margin-right: 6px; margin-top: 5px; }');
addGlobalStyle('#scrollable-sections-bottom-shadow { display: none; }');
addGlobalStyle('.folder .folder > a > .icon { margin-left: 18px; }');
addGlobalStyle('.folder .folder .folder-toggle { margin-left: 0; }');
addGlobalStyle('.folder .sub-icon { margin-left: 34px; }');
addGlobalStyle('#scrollable-sections, #lhn-selectors, #lhn-recommendations, #lhn-subscriptions { background: #fcfcfc; }');
addGlobalStyle('.entry-container .entry-body { color: #303030; }');
addGlobalStyle('#current-entry .entry-container .entry-title a, #current-entry .entry-container a.entry-source-title, #current-entry .entry-container .entry-body a, #current-entry .entry-container a.entry-post-author-name { color: #2244bb; }');
addGlobalStyle('#viewer-container { border-left: 1px solid #ebebeb; }');
addGlobalStyle('#sub-tree-header, .folder .name.name-d-0, #lhn-selectors .selector { padding-left: 18px; color: #303030; }')
addGlobalStyle('.section-minimize { left: 0px; }')
addGlobalStyle('#lhn-selectors .lhn-section-secondary .selector.no-icon { padding-left: 39px; }')
addGlobalStyle('.folder .name-text, #reading-list-selector .label { color: #303030; }')


