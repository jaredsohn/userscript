// ==UserScript==
// @name        ThePirateBay Popup Remover
// @namespace   PutterPlace
// @description Removes the annoying, but inevitable, popup advertisement from ThePirateBay.
// @include     http://www.thepiratebay.se/*
// @include     http://thepiratebay.se/*
// @include     https://www.thepiratebay.se/*
// @include     https://thepiratebay.se/*
// @version     1.0
// ==/UserScript==

// <script type="text/javascript" src="http://delivery.thepiratebay.se/custom/pp.php" async="async"></script></body>
// <div id="trcr" style="width: 25px; height: 25px; position: absolute; top: 438px; left: 427px; ">
var adScript = document.evaluate('/html/body/script[contains(@src, "http://delivery.thepiratebay.se/custom/pp.php")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if(adScript) {
    adScript.parentNode.removeChild(adScript);
}            
var adOverlay = document.getElementById("trcr");
if (adOverlay) {
    adOverlay.parentNode.removeChild(adOverlay);
}