// ==UserScript==
// @name           NUMA Comment Links
// @namespace      www.nmaps.net
// @include        http://www.nmaps.net/*
// ==/UserScript==

commenthead = document.getElementsByClassName("commenthead");

for (i=0;i<commenthead.length;i++) {
    link = commenthead[i].getElementsByTagName("a")[0];
    link.innerHTML += ( link.innerHTML ? ' ' : '' ) + "<a style='font-size:7px;' href='#" + link.name + "'>[#" + link.name + "]</a>";
}