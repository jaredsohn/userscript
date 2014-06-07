// ==UserScript==
// @name            Clubic.com sans pub
// @namespace       http://www.neirrek.com
// @description     Supprime les pubs Flash du site Clubic.com
// @include         http://www.clubic.com*
// ==/UserScript==

(function() {
  var scripts = document.getElementsByTagName('script');
  for (var i = 0; i < scripts.length; i++) {
  	if (scripts[i].parentNode.tagName.toUpperCase()=='DIV') {
  		scripts[i].parentNode.removeChild(scripts[i].nextSibling);
  	} else if (scripts[i].firstChild != null
  			&& (scripts[i].firstChild.nodeValue.match('/ads\//')
  				|| scripts[i].firstChild.nodeValue.match('/array_pub/')
  				|| scripts[i].firstChild.nodeValue.match('/strFlash/'))) {
  		scripts[i].parentNode.removeChild(scripts[i]);
  		scripts[i].parentNode.removeChild(scripts[i].nextSibling);
  	}
  }
  var objects = document.getElementsByTagName('object');
  for (var i = 0; i < objects.length; i++) {
  	objects[i].parentNode.removeChild(objects[i]);
  }
})();