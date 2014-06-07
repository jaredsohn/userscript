// ==UserScript==
// @name           tleech improve screen estate (javascript part)
// @namespace      http://www.torrentleech.org/
// @include        http://www.torrentleech.org/*
// @description    Removes annoying tags and categories boxes
// ==/UserScript==

$(document).ready(
function(){
    $("#facets").hide()
    $("#facetButton").next().removeClass("ui-state-active")
    $("#filtertorrents").hide()
    $("#categoryButton").next().removeClass("ui-state-active")
});