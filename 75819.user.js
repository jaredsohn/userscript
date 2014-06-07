// ==UserScript==

// @name 			Eksisozluk "herzamanki gorunum" tiklayici. 

// @description 	Herzamanki gorunum tusuna sizin yerinize tıklar.. 

// @include 		http://sourtimes.org/*

// @include 		http://sozluk.sourtimes.org/*
// @include 		http://www.eksisozluk.com/*

// ==/UserScript==



var allCSS = document.evaluate('//link[@type="text/css"]',

	document,

	null,

	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

	null);

for (var i=0; i < allCSS.snapshotLength; i++) {

	var doGeneric = false;



	if (allCSS.snapshotItem(i).href.search(/\/sozluk.css/) == -1 ) {

		doGeneric = true;

		allCSS.snapshotItem(i).href = 'sozluk.css';

	}

	

	if (doGeneric) {

		GM_xmlhttpRequest({

			method: 'GET',

			url: 'http://' + document.location.hostname + '/dogenerictheme.asp'

		});

	}

}
