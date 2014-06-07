// ==UserScript==
// @name           Change default button
// @namespace      http://userscripts.org/users/102549
// @description    Changes the default form submit button in the DicingDanger Chat page to Clan by reording the buttons. Can be easily edited to work on other forms by changing the xpath strings and includes.
// @include        http://92.48.103.52/fantasy/game.php?*screen=CHAT*
// ==/UserScript==

// This script works by removing the element with the value of newDefault and inserting it before oldDefault
// The first submit button is the default for the form, so changing the order changes the default.
var oldDefault = "Help";
var newDefault = "Clan";

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var oldB = xpath("//input[@value='"+oldDefault+"']").snapshotItem(0);//finds the input tag with a value attribute set to oldDefault
var newB = xpath("//input[@value='"+newDefault+"']").snapshotItem(0);//finds the input tag with a value attribute set to newDefault

newB.parentNode.removeChild(newB); //remove the newB node from its current spot
oldB.parentNode.insertBefore(newB, oldB); //add it back before the oldB default
