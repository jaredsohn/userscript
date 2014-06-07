// ==UserScript==
// @name           Winfuture Clean + Center
// @namespace      winfuture
// @include        http://winfuture.de/*
// @include        http://www.winfuture.de/*
// @include        http://winfuture-forum.de/*
// @include        http://www.winfuture-forum.de/*
// @author         Eric
// @version        1.0
// ==/UserScript==

//Sucht nach einem einzelnen Element mit XPath
function find(xPath)
{
	var element = document.evaluate(xPath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	if (element !== null) {
		return element.wrappedJSObject;
	}
	else {
		return null;
	}
}

var parent, ad;

ad = find('/html/body/table/tbody/tr[1]/td[2]');
if (ad !== null) {
	ad.parentNode.removeChild(ad); }

ad = find('//table[@id="wfv4_leaderboard"]');
if (ad !== null) {
	ad.parentNode.removeChild(ad); }

parent = find('//body/table/tbody/tr[2]');
if (parent !== null) {
	parent.removeChild(parent.lastChild); }

//Zentrieren
find('/html/body/table').style.margin = '0 auto';
find('/html/body/table/tbody/tr[1]/td/table').style.margin = '0 auto';

//Forum
if (document.URL.match(new RegExp('^http://www.winfuture-forum.de/', 'i'))) {
	find('//div[@id="wf-board-kopf"]').style.margin = '0 auto';
}