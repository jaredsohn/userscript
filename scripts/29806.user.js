// ==UserScript==
// @name Experts Exchange Remove Ads
// @namespace All
// @description Remove Ads From Expert Exchange
// @include http://experts-exchange.com/*
// @include http://www.experts-exchange.com/*
// ==/UserScript==

var a = 0;
window.addEventListener("load", function(e) {
  var elements = document.evaluate("//div[contains(@id, 'minWidth')] | //iframe[contains(@id, 'minimizeFrame')] | //noscript | //img[contains(@name, 's_i_eexchangeprod')] | //div[contains(@id, 'tf_AdDiv')] | //img[contains(@onload, 'endEETimer()')] | //script[contains(@type, 'text/javascript')] | //script[contains(@language, 'JavaScript')] | //script[contains(@src, 'http://ctxt.tribalfusion.com/ctxt/textlinks.js')] | //link[contains(@href, 'http://ctxt.tribalfusion.com/ctxt/textlinks.css')] | //div[contains(@class, 'lightImage light20 freeInProg')] | //div[contains(@class, 'answers')] | //div[contains(@class, 'ontopBanner')] | //div[contains(@class, 'adSense')] | //a[contains(@class, 'squareSignUp squareSignUpWide')] | //a[contains(@class, 'startFreeTrial')] | //div[contains(@class, 'lightImage light20 freePAQ')] | //div[contains(@class, 'qStats')] | //div[contains(@class, 's sectionFour shFFF5 sgray expGray allZonesMain taSearchRow')] | //div[@id='announce'] | //div[contains(@id, 'relatedSolutions20X6')]  |  //div[contains(@id, 'sponsor')] | //div[contains(@id, 'pageRight')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) 
  {
    var thisElement = elements.snapshotItem(i);
	if ((thisElement.className == 'answers') && (a == 0))
	{
	a = a +1;
	thisElement.parentNode.removeChild(thisElement);
	}
	else if(thisElement.className == 'answers')
	{
	//real answers
	}
	else
	{
    thisElement.parentNode.removeChild(thisElement);
	}
  }
}, false);
