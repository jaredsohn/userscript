// ==UserScript==
// @name           Google Ctrl-Enter to I'm Feeling Lucky Search
// @namespace      dominixz.com
// @version        0.1.0
// @description    addEventListener to Ctrl-Enter to lucky search 
// @include         http://*google*
// @include         https://*google*
// ==/UserScript==

var gec = function(className) {
	return document.getElementsByClassName(className);
}

var checkKeydown = function(e) {
	if (e.ctrlKey && e.keyCode == 13) {
		 // ctrl-enter
		gec('lsb')[1].click();
	}
	else
	{
		gec('lst').value = e;
	}
};
document.addEventListener("keydown", checkKeydown, 0);