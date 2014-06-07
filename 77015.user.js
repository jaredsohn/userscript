// ==UserScript==
// @name          facebook.com create page link
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Adds a "create page" link next to the home button
// @include       http://*facebook.*
// ==/UserScript==

// Get the link list
var linkList = document.getElementById('pageNav');

// Create a new list item
var listItem = document.createElement("li");

// Create a new link
var link = document.createElement("a");
link.href = "http://www.facebook.com/pages/create.php";
link.innerHTML = "Create a new page";

// Append the link to the list item
listItem.appendChild(link);

// Add the list item to the list
linkList.insertBefore(listItem, linkList.firstChild);