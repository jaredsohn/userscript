// ==UserScript==
// @name           GR Message SessionCheck
// @namespace      http://gr-tools.justlep.net/
// @description    Prüft beim Drücken des "Senden"-Buttons die Gültigkeit der Session, bevor da Formular verschickt wird.
// @include        http*://www.planetromeo.com*/msg/?*id=*
// @include        http*://www.gayromeo.com*/msg/?*id=*
// @include        http*://83.98.143.20*/msg/?*id=*
// @author         LeP <gr-tools@justlep.net>
// @version        $Revision: 1.2 $
// ==/UserScript==


(function(){

	var saveURL = '',
		submitButton = 0,

	xpath = function(xpath, refNode) {
		var n = [],
			res = (refNode.ownerDocument||refNode).evaluate(xpath, refNode, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null),
			r = res.iterateNext();
		while (r!=null) {
			n[n.length] = r;
			r = res.iterateNext();
		}
		return n;
	},

	// form submit button click handler..
	check = function(e) {
		var req = new XMLHttpRequest();
		req.open('GET', saveURL, false);	// sync request
		req.send(null);  

		// session valid? => just return & let form get submitted..
		if (req.responseText.indexOf('Unerlaubter Zugriff')<0) return;	

		e.preventDefault();
		e.stopPropagation();
		alert("Session scheint ungültig!\nBitte im Hauptfenster nochmal einloggen!");
	};

	saveLink = xpath('//a[contains(.,"Profil speichern")]', document);
	submitButton = document.getElementById('id_submit');

	if (!saveLink.length || !submitButton) return;
	saveURL = saveLink[0].href;
	submitButton.addEventListener('click', check, false);

})();
