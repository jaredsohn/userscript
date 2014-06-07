// ==UserScript==
// @name           Sexy Source at us.o
// @namespace      http://jtymes.net
// @description    Adds [src] links next to the script link on the main page to see the source with highlighting.
// @include        http://userscripts.org/
// ==/UserScript==
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
var els = getElementsByClassName('script-meat');
for(var i = 0; i < els.length; i++) {
	var link = els[i].getElementsByTagName('a')[0].href;
	var id = link.replace("http://userscripts.org/scripts/show/", "");
	var srcLink = document.createElement('a');
	srcLink.href = "http://userscripts.org/scripts/review/"+id;
	srcLink.innerHTML = "[src]";
	srcLink.style.margin = "0 0 0 5px";
	els[i].insertBefore(srcLink, els[i].childNodes[2]);
}