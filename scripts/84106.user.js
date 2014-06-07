// ==UserScript==
// @name           JIRA Developers
// @namespace      level-studios
// @description    Automatically sets the "Viewable By" field to "jira-developers"
// @include        http://jira.*.com/*
// @author         Jesse Bilsten (jesse at bilsten dot net)
// ==/UserScript==

(function(){
	document.getElementById('commentLevel').value = "group:jira-developers";
})();
