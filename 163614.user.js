// ==UserScript==
// @name        Scholar adder
// @namespace   net.arusahni
// @description Adds a Google Scholar link to the Google Sandbar
// @author 		Aru Sahni
// @include     *.google.com/*
// @version     2
// @date 		2013-04-02
// @grant		none
// ==/UserScript==

var getUrlParameter = function(key) {
	var name = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp(regexS);  
	var results = regex.exec(window.location.href); 
 	if (results == null) {
 		return "";
	}
	return results[1];
};

var createScholarLink = function(search) {
	var sandbar = document.querySelector('#gbzc');
	var overflowElement = document.querySelector('#gbzc .gbt:last-child');
	var element = document.createElement('li');
	element.classList.add('gbt');
	var anchor = document.createElement('a');
	anchor.classList.add('gbzt');
	anchor.setAttribute('href', 'https://scholar.google.com/scholar?hl=en&q=' 
		+ search);
	anchor.innerHTML = '<span class="gbtb2"></span><span class="gbts">Scholar</span>';
	element.appendChild(anchor);
	sandbar.insertBefore(element, overflowElement);
};

if (document.querySelector('#gbzc') !== null) {
	var query = getUrlParameter('q');
	createScholarLink(query);
}