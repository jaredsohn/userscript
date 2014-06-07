// ==UserScript==
// @name        D2L Regis SlimNav
// @namespace   https://userscripts.org/users/512367
// @include     https://worldclass.regis.edu/*
// @version     2
// ==/UserScript==

// Function to append navigation bar source list items to destination list
function appendNavListItems(srcList, destList) {
        // Get source list items
		var srcListItems = srcList.children;
		// Get length of source list
		var len = srcListItems.length;
		// Clear special class from first item of source list
		srcListItems[0].className = "";
		// Append source list items to destination list
		for (var i = 0; i < len; i++) {
		    destList.appendChild(srcListItems[0]);
		}
} // End function appendNavListItems

// Function to remove text descriptions/caption from beside icons in navigation bar list
function removeNavListText(navList) {
    // Get length of list
	var len = navList.children.length;
	// Variable for span element with text description
	var textSpan = "";
	// Remove text from each item, moving it to icon img title attribute for mouseOver reference
	for (var i = 0; i < len; i++) {
	    textSpan = navList.children[i].children[0].children[0].children[1];
		navList.children[i].children[0].children[0].title = textSpan.textContent;
		textSpan.parentNode.removeChild(textSpan);
		}
} // End function removeNavListText

// Function to remove navigation bar div
function removeNavBarDiv(navBarDivClassName) {
	var navBarDiv = document.getElementsByClassName(navBarDivClassName)[0];
	navBarDiv.parentElement.removeChild(navBarDiv);
} // End function removeNavBarDiv

// Function to remove navigation bar list item (with text removed)
function removeNavBarListItem(navList, itemName) {
    // Get list length
    var len = navList.children.length;
    // Loop through list and delete item if name matches
    for (var i = 0; i < len; i++) {
        if (navList.children[i].children[0].children[0].title == itemName) {
            navList.removeChild(navList.children[i]);
            return;
        }
    }
} // End function removeNavBarListItem

// Function to remove navigation bar list item (use this if text hasn't been removed)
function removeNavBarListItemWithText(navList, itemName) {
    // Get list length
    var len = navList.children.length;
    // Loop through list and delete item if name matches
    for (var i = 0; i < len; i++) {
        if (navList.children[i].children[0].children[0].children[1].textContent == itemName) {
            navList.removeChild(navList.children[i]);
            return;
        }
        
    }
} // End function removeNavBarListItemWithText


// Assign top-left navbar list as destination list
var destList = document.getElementsByClassName("d_nb_p1")[0].getElementsByTagName("ul")[0];
    
// Assign top-right navbar list as source list and append to top-left
var srcList = document.getElementsByClassName("d_nb_p2")[0].getElementsByTagName("ul")[0];
appendNavListItems(srcList, destList);

// Assign bottom-left navbar list as source list (if it exists) and append to top-left
var srcList  = document.getElementsByClassName("d_nb_p3")[0].getElementsByTagName("ul")[0];
if (srcList) {
        appendNavListItems(srcList, destList);
}
    
// Assign bottom-right navbar list as source list (if it exists) and append to top-left
var srcList  = document.getElementsByClassName("d_nb_p4")[0].getElementsByTagName("ul")[0];
if (srcList) {
        appendNavListItems(srcList, destList);
}
    
// Remove text descriptions from navigation bar
removeNavListText(destList);

// Remove banner	
removeNavBarDiv("d_nb_c3");

// Remove bottom navigation bar
removeNavBarDiv("d_nb_c4");

// Remove list items (add and remove as you like - these are just my initial preferences)
removeNavBarListItem(destList, "Calendar");
removeNavBarListItem(destList, "Help");
removeNavBarListItem(destList, "Chat");
removeNavBarListItem(destList, "Surveys");
removeNavBarListItem(destList, "Groups");

// Remove list items with text (use this if you choose not to use function removeNavListText)
//removeNavBarListItemWithText(destList, "Calendar");