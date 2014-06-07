// ==UserScript==
// @name          HP Forums - Links in blank page
// @namespace     hpforums
// @description   Hyperlinks in HP forums can be open in a blank page/tab
// @copyright     2010+, Devether (http://userscripts.org/users/179320)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.1.1
// @include http://forums*.itrc.hp.com/*
// ==/UserScript==

var href;
var textNodes = document.getElementsByClassName('Text');
var spanTextNodes = Array.filter( textNodes, function(elem){
   return elem.nodeName == 'SPAN';
});
for (var i = 0; i < spanTextNodes.length; i++) { 
    //console.log(spanTextNodes[i]);
	var links = spanTextNodes[i].getElementsByTagName("A");
	for (var j = 0; j < links.length; j++) { 
		//alert(links[j].href);
		//javascript:openExternal('
		var search='/javascript:openExternal(\'/i';
		href = links[j].getAttribute("href");
		href = href.replace("javascript:openExternal('", "");
		href = href.replace("')", "");
		links[j].setAttribute("href", href);
		links[j].setAttribute("target", "_blank");
		console.log(href);
	}
}




