// ==UserScript==
// @name	Double Click to Look up in Oxford Advanced Learner's Dictionary online
// @namespace	http://www.lixiaolai.com
// @description	as the name indicates
// @include	*
// ==/UserScript==

function add-dcd() {
var dclick = document.createElement("script");
dclick.innerHTML = '<script type="text/javascript" src="http://www.lixiaolai.com/doubleclick_newwindow_dictionary.js"></script>';
document.head.insertBefore(dclick, document.head.firstChild);
};

add-dcd();