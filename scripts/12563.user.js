// ==UserScript==
// @name           CleanTelkku
// @namespace      ct
// @author	   rasjani
// @version        1.0
// @description    Cleans  Telkku.com from unwanted adds
// @include        http://www.telkku.com/*
// ==/UserScript==


if(document.getElementById("tickerBanner")!=null)
	document.getElementById("tickerBanner").parentNode.removeChild(document.getElementById("tickerBanner"));

if(document.getElementById("alapalkki")!=null)
	document.getElementById("alapalkki").parentNode.removeChild(document.getElementById("alapalkki"));


if(document.getElementById("leftSide")!=null)
	document.getElementById("leftSide").parentNode.removeChild(document.getElementById("leftSide"));

if(document.getElementById("bannerArea")!=null)
	document.getElementById("bannerArea").parentNode.removeChild(document.getElementById("bannerArea"));

if(document.getElementById("rightSide")!=null)
	document.getElementById("rightSide").parentNode.removeChild(document.getElementById("rightSide"));

if(document.getElementById("horizontalBanner")!=null)
	document.getElementById("horizontalBanner").parentNode.removeChild(document.getElementById("horizontalBanner"));

if(document.getElementById("footerAdLeft")!=null)
	document.getElementById("footerAdLeft").parentNode.removeChild(document.getElementById("footerAdLeft"));

if(document.getElementById("footerAdRight")!=null)
	document.getElementById("footerAdRight").parentNode.removeChild(document.getElementById("footerAdRight"));

if(document.getElementById("footer")!=null)
	document.getElementById("footer").parentNode.removeChild(document.getElementById("footer"));

