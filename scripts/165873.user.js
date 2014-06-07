// ==UserScript==
// @name        Scholar Menu Item
// @namespace   eu.foxmoore
// @description Adds a Google Scholar link to the Google "More.." Menu
// @author 		Ben Fox-Moore
// @include     *.google.*/*
// @version     2
// @date 		2013-04-26
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
	var menu = document.getElementById("hdtb_more_mn");
	var element = document.createElement('div');
	element.classList.add('hdtb_mitem');
	var anchor = document.createElement('a');
	anchor.classList.add('q');
	anchor.classList.add('qs');
	anchor.setAttribute('href', 'https://scholar.google.com/scholar?hl=en&q='+search);
	anchor.innerHTML = 'Scholar';
	element.appendChild(anchor);
	menu.appendChild(element);
};

var runScript = function() {
	if (document.getElementById("hdtb_more_mn") !== null) {
		var query = getUrlParameter('q');
		createScholarLink(query);
	}

}

if(window.attachEvent) {
    window.attachEvent('onload', runScript);
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            runScript();
        };
        window.onload = newonload;
    } else {
        window.onload = runScript;
    }
}