// ==UserScript==
// @name       Jira user icons
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://jira.intranet.com/*
// @copyright  2013+, Dylan Thorne
// ==/UserScript==
function fix() {
	var i=0;
	var x = document.querySelectorAll('.user-icon > a > img');
	for (i = 0; i < x.length; i++) {
        var p = x[i].src.indexOf('s=');
        if (p > 0) {
        	x[i].src=x[i].src.substr(0, p-1);
        }
    }
}
function assign() {
    var x = document.getElementById('assign-to-me-trigger');
    if (x) {
        x.click();
        var btn = document.getElementById('issue-workflow-transition-submit');
        if (btn.value == 'Start Progress') {btn.click();}
    }
}
setTimeout(fix,500);
setInterval(assign,200);