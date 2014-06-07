// ==UserScript==
// @name           Bounty Filter
// @namespace      Demented_Clown
// @description    Removes jail, hospital and travelling entries from bounties
// @include        http://www.torncity.com/bounties.*
// @include        http://www.torn.com/bounties.*
// @include        http://torncity.com/bounties.*
// @include        http://torn.com/bounties.*



function removeXpath() {
// Search the font tag inside each TD for text we dont want
// For each instance of text we dont want we delete the parent of TD
// In this case thats the entire TR
   
    var hospital = document.evaluate("//font[(contains(text(),'Hospital'))]/parent::*/parent::*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i=0; i<hospital.snapshotLength; i++) {
        element = hospital.snapshotItem(i);
        element.parentNode.removeChild(element);
    }
    var traveling = document.evaluate("//font[(contains(text(),'Traveling'))]/parent::*/parent::*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0; i<traveling.snapshotLength; i++) {
            element = traveling.snapshotItem(i);
            element.parentNode.removeChild(element);
    }
    var jail = document.evaluate("//font[(contains(text(),'Jail'))]/parent::*/parent::*",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var i=0; i<jail.snapshotLength; i++) {
            element = jail.snapshotItem(i);
            element.parentNode.removeChild(element);
    }
}
 
document.addEventListener("DOMNodeInserted", removeXpath, false) ;

// ==/UserScript==