// ==UserScript==
// @name        Display Updated Time Jira
// @namespace   Jira
// @include     
// @version     1
// ==/UserScript==

window.onload = function() {
    window.setTimeout(go, 800);
}
function go() {
    var el = document.getElementsByTagName('time');
    
	if (el.length) {     
		for(i = 0; i <= el.length; i++) {
		   var time = document.getElementsByTagName('time')[i].parentNode.title;
		   time = time.replace(" ", '<br /><span style="color: silver;">');
		   document.getElementsByTagName('time')[i].parentNode.innerHTML = time + "</span>";
		}
	}
}
