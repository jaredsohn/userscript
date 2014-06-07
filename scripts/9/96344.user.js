//If your jira path isn't jira.*.*, you need to fix the includes
// 
// ==UserScript==
// @name           JIRA-IN-TABS
// @namespace      JIRATABS
// @include        https://jira.*.*/plugins/servlet/*
// @include        http://jira.*.*/plugins/servlet/*
// ==/UserScript==

document.addEventListener('click', function(event){
	var urle = new String(event.target);
	var beginString = urle.substr(0,4);
	beginString = beginString.toUpperCase();
	//Only redirect issues
	if (beginString == "HTTP"){
		//Only open in a new window if 
		if (event.ctrlKey == false){

			event.preventDefault();

			window.open(urle);
		}
	}
}, true);