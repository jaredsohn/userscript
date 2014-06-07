// ==UserScript==
// @name       SlashdotOpenInTabs
// @version    0.1
// @description  Open all slashdot links in new tab
// @match      http://slashdot.org/*
// @copyright  2012+, Andy Ward
// ==/UserScript==
function ConvertAnchor(Anchor)
{
    if(Anchor.href) {
        Anchor.target="_blank";
    }
}
function ConvertAnchors(Parent)
{
    var Anchors = document.getElementsByTagName("a");
    for (var a=0; a<Anchors.length; a++) {
        ConvertAnchor(Anchors[a]);
    }
}
function onNodeInsert(event)
{
    if (event && event.target && event.target.className){
        ConvertAnchors(event.target);
    }
}
var scope = document.getElementsByClassName("fhroot");
if (scope.length == 1) { scope = scope[0]; } else { scope = document; }
scope.addEventListener('DOMNodeInserted', onNodeInsert, false);
ConvertAnchors(document);
