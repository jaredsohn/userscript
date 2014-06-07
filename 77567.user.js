// ==UserScript==
// @name           Google Translate link mini
// @namespace      http://userscripts.org/users/86496
// @description    Replace long Google Translate links in search results with icons.
// @include        http://www.google.com/search?*
// @version        1.0.3a
// ==/UserScript==

(function() {

linkmod();
window.addEventListener('AutoPagerize_DOMNodeInserted', linkmod, false);

function linkmod() {
	var lig = getElementsByClassName('g', 'li');
	for (var l = 0; l < lig.length; l++) {
		var spstd = getElementsByClassName('std nobr', 'span', lig[l]);
		if (spstd.length == 0) continue;
		var tlinks = getElementsByClassName('fl', 'a', spstd[0]);

		for (var i = 0; i < tlinks.length; i++) {
			var mlink = getElementsByClassName('l', 'a', lig[l])[0];
			mlink.parentNode.appendChild(document.createTextNode('-'));
			mlink.parentNode.appendChild(tlinks[i]);
			tlinks[i].title = tlinks[i].innerHTML
			tlinks[i].innerHTML = '';
			var img = tlinks[i].appendChild(document.createElement("img"));
			img.setAttribute("style", 'border: 1px solid #AACCFF;margin: 0.3em');
			img.align = "absmiddle";
			img.src = "data:image/gif;base64,R0lGODdhEAAQAN0AAP36+vwAAKmoqP4pKZCQkP5YWI+Li/3T07nKyv9SUv9MTP7NzdDQ0P5jY/4PD9zc3Oro6P9GRqGhoayysusXF/8bG+3u7uLi4s7OzvslJciDg/r19f89Pf9+fvEdHeQ5Oe11df+OjunDw7vExP+6uv/AwLvMzOXo6O7r67fT09fX15qamsGamv+UlI+Xl/6enputrf+0tPHx8ZmqqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAEAAQAAAGf0BALMEZKBIRY+IAaDZbgUjDEag0MoGFs9lxbACDQAGwCJS2ANKriVVAUCCRBYIGnCiBz4wAm0gIDGgXeAUmBgIAMoBoFh5iCIdNGA91YQWQiHVOlpiam48EmZ5hDSmRniFUFRouonUHsAssoZ5oIwQTtU4QfysXugAPkwwqW0EAOw==";
		}
		spstd[0].parentNode.removeChild(spstd[0]);
	}
}

/** Get elements by className
* @function getElementsByClassName
* @param string className
* @param optional string tag restrict to specified tag
* @param optional node restrict to childNodes of specified node
* @return Array of nodes
* @author Jonathan Snook, http://www.snook.ca/jonathan
* @author Robert Nyman, http://www.robertnyman.com
*/
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
		returnElements.push(current);
		}
	}
	return returnElements;
}
})();