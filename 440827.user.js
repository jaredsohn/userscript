// ==UserScript==
// @name       HN New Tab
// @namespace  https://news.ycombinator.com/
// @version    0.1
// @description  Makes all links to posts and users open in a new tab
// @match      https://news.ycombinator.com/*
// @grant none
// @copyright  2014+, Ry167
// ==/UserScript==
(function(){
	var elems = document.getElementsByTagName('a');
    var i = 0;
    for (i=0;i<elems.length;i++){
        var elem = elems[i];
        if (elem.id == "" && elem.parentNode.className != "pagetop" && elem.parentNode.parentNode.className != "pagetop"
            && elem.parentNode.className != "yclinks" && elem.innerText != "More" && elem.innerText != "link" && elem.innerText != "reply"){
            elem.setAttribute("target","_blank");
        }
	};
})();