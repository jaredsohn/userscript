// ==UserScript==
// @name			Restore Context Menu
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		Fixes pages that disable context menus.
// ==/UserScript==
var newURL ='javascript:(function()%20{%20function%20R(a){ona%20=%20"on"+a;%20if(window.addEventListener)%20window.addEventListener(a,%20function%20(e)%20{%20for(var%20n=e.originalTarget;%20n;%20n=n.parentNode)%20n[ona]=null;%20},%20true);%20window[ona]=null;%20document[ona]=null;%20if(document.body)%20document.body[ona]=null;%20}%20R("contextmenu");%20R("click");%20R("mousedown");%20R("mouseup");%20})()';
content.document.location.replace(newURL);