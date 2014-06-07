// ==UserScript==
// @name           YELLOW.user.js
// @namespace      http://userscripts.org
// @description    YELLOW
// @include        http://www.facebook.com/
// ==/UserScript==

<html>
<head>
document.body.style.background = "#f3e7a3";
function addCss(cssString) {
	var head = document.getElementsByTagName('head')[0];
	return unless head;
	var newCss = document.createElement('style');
	newCss.type = "text/css";
	newCss.innerHTML = cssString;
	head.appendChild(newCss);
}
addCss (
	'* { background-color: #f3e7a3 ! important; }'
);
</head>
</html>