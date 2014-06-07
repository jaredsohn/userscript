// ==UserScript==
// @name Gizmodo
// @namespace BLAH
// @description Fixes shit
// @include http://gizmodo.com*
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
addGlobalStyle('#container { background-color: #e9e9e9;}');
addGlobalStyle('#rightcontainer { background-color: #eeeeee;}');
addGlobalStyle('#main-container.container { background-color: #CC3232:}');
var u = document.createElement("div");
u.setAttribute("style", "font-family: Tahoma,Verdana,Arial,sans-serif; line-height: normal; font-size: 110%; padding: 4px 8px; font-weight: bold; position: fixed; z-index: 1; top: 0; left: 0;");
u.innerHTML = "<a href=\"http://gizmodo.com/#!tips/forum\">#tips</a> <br /> <a href=\"http://gizmodo.com/#!whitenoise/forum\">#whitenoise</a><br /> <a href=\"http://gizmodo.com/#!broken/forum\">#broken</a><br /> <a href=\"http://gizmodo.com/#!lifechanger/forum\">#lifechanger</a>";
document.body.insertBefore(u, document.body.firstChild);