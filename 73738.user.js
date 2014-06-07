// ==UserScript==
// @name           Omelete
// @author         Geva
// @version        2011-10-11
// @namespace      http://gevaspm.wordpress.com/omelete
// @description    Make links to download images of a gallery 
// @include        http://omelete.uol.com.br/*
// ==/UserScript==

function evalNodes(path) {
	return document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var galeria = evalNodes("//div[contains(@class,'thumbs-destaque')]").snapshotItem(0);

while(galeria.firstChild) {
    galeria.removeChild(galeria.firstChild);
}

var mLink = evalNodes('//a[contains(@href,"slug_conteudo")]').snapshotItem(0);

GM_xmlhttpRequest({
	method: "GET",
	url: mLink.href,
	onload: function(response) {			
		var images = response.responseText.match(/\/images\/galerias\/[a-zA-Z0-9_() \-]+\/[a-zA-Z0-9_() \-]+\.jpg/gi);
		for (i in images) {
			a = document.createElement('a');
			a.innerHTML = "<img width='300' src='http://www.omelete.com.br"+images[i].replace('tb_','')+"'/>";
			a.href = "http://www.omelete.com.br"+images[i].replace('tb_','');
			galeria.appendChild(a);
		}
	}
});