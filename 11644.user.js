// ==UserScript==
// @name           w3schools LargeView
// @namespace      redleafong
// @description    Larger content area for w3schools.com
// @include        http://www.w3schools.com/*
// @exclude        http://www.w3schools.com/*/tryit.asp
// ==/UserScript==

var leftTDWidth = 137;
var rightTDWidth = 145;
var midTDWidthMin = 490;

function resizeMidTD()
{
    var winWidth = window.innerWidth;
    var pos = document.body.childNodes.length - 2;
    var contentTbl = document.body.childNodes[pos];
    var midTD = contentTbl.childNodes[1].childNodes[0].childNodes[3];
    var searchField = document.body.childNodes[pos].childNodes[1].childNodes[0].childNodes[5].childNodes[1];
    var leftPanel = document.body.childNodes[pos].childNodes[1].childNodes[0].childNodes[1];

    leftPanel.insertBefore(searchField.cloneNode(true), leftPanel.childNodes[0]);
    document.body.childNodes[pos].childNodes[1].childNodes[0].removeChild(searchField.parentNode);
    midTD.style.width = "100%";
    contentTbl.style.width = "99%";
}
	
window.addEventListener("load", function() { resizeMidTD(); }, true);
