// ==UserScript==
// @name        Mobile Facebook Sponsored Post Remover
// @description Removes Sponsored Posts from the Mobile Facebook Home and Stories Pages
// @include     http*://m.facebook.com/home.php*
// @include     http*://m.facebook.com/
// @include     http*://m.facebook.com/?*
// @include     http*://m.facebook.com/stories.php*
// @version     1
// @grant       none
// ==/UserScript==

//script is effectively:
//hide(span("Sponsored").parent.parent.parent.parent)

var res = document.evaluate("//span", document, null, 6, null);

var snapshotLen = res.snapshotLength;
for(var i = 0; i < snapshotLen; ++i)
{
	var currentSuggestedPostDiv = res.snapshotItem(i);
	if(currentSuggestedPostDiv.innerHTML == "Sponsored")
	{
	    var grandparentDivToRemove = currentSuggestedPostDiv.parentNode.parentNode.parentNode.parentNode;
	    grandparentDivToRemove.parentNode.removeChild(grandparentDivToRemove);
	}
}
