// ==UserScript==
// @name            Gaydar Show Unrated/Red pics
// @namespace       uninvisible.co.uk
// @description     Enables the user to click on x rated and unrated user pics on Gaydar profile pages
// @include         http://www.gaydar.co.uk/scripts/ndisplay.asp?userid=*
// ==/UserScript==


var allDivs, thisDiv, url, newUrl, newHref;
allDivs = document.evaluate("//div[@class='thumbnail']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    if(thisDiv.style.backgroundImage) {
		url = (thisDiv.style.backgroundImage).toString();
		newUrl = url.substring(4,url.length - 7) + '.jpg';
		newHref = 'ShowPicture(\' ' + newUrl + '\' , \'secThumb' + i + '\' , \'\') ';
		thisDiv.innerHTML = '<a href="javascript:' + newHref + '" onclick="' + newHref + ';returnfalse;"><img id="" src=' + newUrl + 'height="60px" width="60px" border="0" alt="" title="Secondary Picture ' + i + '"></a>';
	}
}