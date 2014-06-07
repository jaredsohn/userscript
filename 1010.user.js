// ==UserScript==
// @name          about.com micro-cleaner
// @namespace     http://www-personal.engin.umich.edu/~csmuda
// @description	  cleans up about.com pages slightly
// @include       *about.com*
// ==/UserScript==

(function (){
	contenttable = document.getElementById("mdT");
	newcontent = contenttable.cloneNode(true);
	if(contenttable != null){
		while(document.body.childNodes.length > 0){
		document.body.removeChild(document.body.childNodes[0]);
		}
		document.body.appendChild(contenttable);
	}
	
})();