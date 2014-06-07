// ==UserScript==
// @name        Google Crap Killer
// @version	3.0.6
// @namespace   http://userscripts.org/scripts/show/110554   
// @description  Annihilates Preview, Plus One and some scripts
// @include	http://google.tld/*
// @include	http://www.google.tld/*
// @include	http://groups.google.tld/*
// @include	http://encrypted.google.tld/*
// @include	https://google.tld/*
// @include	https://www.google.tld/*
// @include	https://groups.google.tld/*
// @include	https://encrypted.google.tld/*

// ==/UserScript==

//	Remove PlusOne, Preview, Ads, most scripts
		var shareClasses = ['esw eswd eswh','esw eswd esws','esw eswd','eswd','mbEnd','rhsa','tads','vspb','vspi','vspib','xjsc','xjsd','xjsi','vsc vsta','c rhsvw'];
		for (var i=0;i<shareClasses.length;i++) 
			{
			var googlegarbage = document.evaluate('//*[contains(@class, "'+shareClasses[i]+'")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var j = 0; j < googlegarbage.snapshotLength; j++) {
				googlegarbage.snapshotItem(j).parentNode.removeChild(googlegarbage.snapshotItem(j));
			}
		}