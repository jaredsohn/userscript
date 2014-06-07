// ==UserScript==
// @name           Facebook Reorder Sidebar
// @namespace      http://philfreo.com/
// @description    On the Facebook home page, reorders sidebar so Events/Birthdays are higher up, and ads are lower down
// @include        http://www.facebook.com/home.php*
// @include        https://www.facebook.com/home.php*
// ==/UserScript==

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