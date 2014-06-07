// ==UserScript==
// @name          direct google images
// @namespace     http://simon.derr.free.fr/
// @include       http://images.google.*
// @description	  Liens directs vers les images dans google images
// ==/UserScript==

// Written by Simon Derr.

(function() {
	var url = document.location;

	GM_log('url de le document = ' + url);

	// on commence par virer les scripts moisis
	// on pourrait le faire plus tard mais je prefere le faire en une seule fois
	var divs = document.evaluate("//div[@onmouseout]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var i = 0;
	while (el=divs.snapshotItem(i++)) {
		el.setAttribute('onmouseout', "");
		el.setAttribute('onmouseover', "");
	}

	var num = 0;
	while (textel = document.getElementById('tDataText'+num)) {
		GM_log('trouve ' + num);
		// on copie le style du texte pas cache sur celui du texte cache
		d0 = textel.childNodes[0];
		d1 = textel.childNodes[1];
		d1.setAttribute('style', d0.getAttribute('style'));
		// on cherche le lien de l image
		var imga = document.getElementById('div_image'+num).childNodes[0];
		var href = imga.getAttribute('href');

		// on met l URL directe

		var rre = /.*imgurl=([^\&]*)\&.*/;
		var img = href.replace(rre, "$1");
		imga.setAttribute('href', decodeURI(img));

		// on met la vraie url de la page dans un lien en dessous
		var rrre = /.*imgrefurl=([^\&]*)\&.*/;
		var pageurl = href.replace(rrre, "$1");
		var a = document.createElement('a');
		a.setAttribute('href', decodeURI(pageurl));
		a.appendChild(document.createTextNode('See page'));
		d0.appendChild(document.createElement('br'));
		d0.appendChild(a);

		num++;
	}

})
();

