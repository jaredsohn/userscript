// ==UserScript==
// @name           Anonymouse Google And Ad Remover
// @namespace      http://ddmusica.com @description    Add an Anonymouse (http://Anonymouse.org) link to the google results and remove ad in Anonymouse.org.
// @include        *.google.*/search* 
// @include        *anonymouse.org/*
// ==/UserScript==


(function(){
		getLinks = function() {
	links = document.getElementsByTagName('a');
	out = Array();
	for(var i=0; i<links.length; i++){
		if(links[i].className == 'l') {
			out.push(links[i]);	
		}
	}
	return out;
};

addAnonymouse = function() {
	anonymouse = document.createElement('a');
	anoText = document.createTextNode('[Anonymouse]');
	sp = document.createTextNode(' ');
	anonymouse.appendChild(anoText); 
	anonymouse.setAttribute('style', 'color:green;');
	links = getLinks();
	for(var i=0; i<links.length; i++) {
		a = anonymouse.cloneNode(true);
		s = sp.cloneNode(true);
		var link = links[i];
		a.href = 'http://anonymouse.org/cgi-bin/anon-www.cgi/'+link.href;
		link.parentNode.appendChild(s);
		link.parentNode.appendChild(a);
	}
}();

})();

(function() {
	document.getElementById('mouselayer').style.display="none";
})();

