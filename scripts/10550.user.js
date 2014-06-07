// ==UserScript==
// @name           IWantYourSoul & Gladiatus Warner
// @description    This is a modification to "IWantYourSoul Warner" scritp, that warns you about stupid "iwantyoursoul" links that annoying people put in there signatures and similar things. This mod fixes an itsy bug and also warns about those new "gladiatus" annoying links that have become so popular lately.
// @include        *
// ==/UserScript==

var allLinks = document.evaluate(
    "//a[@href]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null) ;

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    if ((thisLink.href.indexOf("iwantyoursoul/?i_am") != -1) || 
	( (thisLink.href.indexOf(".gladiatus.") != -1) &&
		(thisLink.href.indexOf("/c.php?uid=") != -1) ) ) 
		{
		var text = document.createTextNode(" < Ovo je glup link nemoj klikati na njega!!!")
		thisLink.parentNode.insertBefore(text, thisLink.nextSibling);
    }
} 
