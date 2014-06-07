// ==UserScript==
// @name        Facebook Homepage Cleaner
// @namespace   thisIsAPointlessNamespace
// @include     https://www.facebook.com/
// @include		https://www.facebook.com/?ref=logo
// @version     1
// ==/UserScript==

GM_addStyle("body { display: none; } img { border: 0; }");
//mainFunc();
addEventListener('DOMContentLoaded', mainFunc, false);

function mainFunc() {
	//get ad pagelet
	var PageletEgoPane = document.getElementById('pagelet_ego_pane_w');
	//remove ad pagelet
	PageletEgoPane.parentNode.removeChild(PageletEgoPane);

	//get links from right footer area
	var footerAreaLinks = document.getElementsByClassName('fsm fwn fcg')[0];

	//get right footer area
	var RightColumnFooter = document.getElementById('pagelet_rhc_footer');

	//remove right footer area
	RightColumnFooter.parentNode.removeChild(RightColumnFooter);

	var name = document.getElementsByClassName('fbxWelcomeBoxName')[0];
	
	var extraSpan = document.createElement('span');
	extraSpan.innerHTML = ' is gay.';
	
	name.appendChild(extraSpan);
	
	GM_addStyle("body { display:inline; } img { }");
}