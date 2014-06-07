// ==UserScript==
// @name           Siries Tweaker 2
// @namespace      Milan Miljkovic (willand_87@yahoo.com)
// @description    removes ads from yourtvseries.eu
// @match        http://yourtvseri.es/*
// @version		   1.0.1
// @attribution    ""
// ==/UserScript==

function removeElement(element) {
    element.style.display = "none";
}

function expandElement(element, dimension) {
    switch (dimension) {
        case "width": element.style.width = "100%"; break;
        case "height": element.style.height = "100%"; break;
        case "both": element.style.height = "100%"; element.style.width = "100%"; break;
    }
}

function returnIdElement(name) {
    return document.getElementById(name);
}

function returnClassElement(name, id) {
    return document.getElementsByClassName(name)[id];
}

//------------------------------------//

removeElement(returnIdElement("watch-sidebar"));
removeElement(returnIdElement("watch-advertising"));
removeElement(returnIdElement("disqus_thread"));
removeElement(returnClassElement("advertising-728 mbl mtl clear", 0));
expandElement(returnClassElement("eightcol mrl", 0), "both");

returnClassElement("modal-body", 0).style.overflowY = "visible";
returnClassElement("modal-body", 0).style.minHeight = "none";

