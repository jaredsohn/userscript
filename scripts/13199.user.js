// ==UserScript==
// @name           GameFAQs Ad/CNET stuff Remover
// @namespace      Awesome
// @include        http://*.gamefaqs.com/*
// ==/UserScript==

function remElem(elem,attr,val) {
  var allElems, thisElem;
  allElems = document.evaluate(
   '//'+elem+'[@'+attr+'=\''+val+'\']',
   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElems.snapshotLength; i++) {
    thisElem = allElems.snapshotItem(i);
    thisElem.parentNode.removeChild(thisElem);
}}

remElem('div','id','gne_nav'); //top cnet thing
remElem('div','class','rubics_netxp1_main'); //techrepublic ad
remElem('div','class','ad'); //various ads
remElem('div','class','gs features'); //Now On GameSpot
remElem('div','class','pod gs'); //GameSpot side things
remElem('div','id','footer'); //GameSpot/CNET footer

remElem('div','id','sponsored_links');
remElem('iframe','align','top');