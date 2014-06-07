// ==UserScript==
// @name           Facebook - Reject All Friend Suggestions
// @namespace      http://userscripts.org/users/filius
// @include        http://www.facebook.com/find-friends/*
// @include        http://www.facebook.com/friends/?filter=ffp
// @include        http://www.facebook.com/friends/?ref=tn#/friends/?filter=ffp
// ==/UserScript==


function clickLink(linkobj) {
	if (linkobj.getAttribute('onclick')) document.location = 'javascript:' + linkobj.getAttribute('onclick').replace('return false;',''); //a very inelegant way of pressing the buttons but .onclick() doesn't work
}

function goRejectAll () {

	var suggestionDiv = document.getElementById('pymk_ajax_grid');
	
	if (!suggestionDiv) {
		alert('Suggestions not found');
		
	} else {
		
		var toClick = new Array;
		var links = suggestionDiv.getElementsByTagName("a"); 
		
		for (a in links) {
			
			if (links[a].innerHTML === "X") {
				toClick.push(links[a]);
			}
		} 
		
		for (b in toClick) {
			clickLink(toClick[b]);
		}
	}

}

GM_registerMenuCommand("Reject all friend suggestions", goRejectAll);