// ==UserScript==
// @name Better Sidebar
// @description Removes the ads, and reorder the elements for a better facebook.
// @namespace Better Sidebar
// @include http://*facebook.com/*
// @version 0.1
// @author Germanaz0
// ==/UserScript==


 function getElementsByClass(node,searchClass,tag) {
    var classElements = new Array();
        if ( node == null )
            node = document;
        if ( tag == null )
            tag = '*';
    var els = node.getElementsByTagName(tag); // use "*" for all elements
    var elsLen = els.length;
    var pattern = new RegExp("\\b"+searchClass+"\\b");
    for (i = 0, j = 0; i < elsLen; i++) {
         if ( pattern.test(els[i].className) ) {
         classElements[j] = els[i];
         j++;
         }
    }
    return classElements;
  }

  function hideByClass(theClass) {
    var el = getElementsByClass(document,theClass);
    var elLength = el.length;
    for (i = 0; i < elLength; i++ ){
        el[i].style.display = "none";
    };
  }
  function showByClass(theClass) {
    var el = getElementsByClass(document,theClass);
    var elLength = el.length;
    for (i = 0; i < elLength; i++ ){
        el[i].style.display = "block";
    };
  }

hideByClass('emu_sponsor');
hideByClass('UIHomeBox_Sponsored UIHomeBox UITitledBox');

//-------------------------
// FROM Facebook Reorder Sidebar
// LINK http://userscripts.org/scripts/review/50396
// Thanks to philfreo for the SCRIPT
//-------------------------

function insertAfter(referenceNode, newNode){
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var sidebar = document.getElementById('home_sidebar');

var parts = sidebar.childNodes;
var newSidebar = document.createElement("DIV");
var newOrder = [0, 4, 1, 3, 2, 5]; // desired order of divs in sidebar (originally is [0, 1, 2, 3, 4, 5])

for (var i = 0; i < newOrder.length; i++) {
    var newDiv = parts[newOrder[i]].cloneNode(true);
    newSidebar.appendChild(newDiv);
}

sidebar.parentNode.insertBefore(newSidebar, sidebar);
sidebar.parentNode.removeChild(sidebar);
newSidebar.id = "home_sidebar";

//*-*-*-*-*-


