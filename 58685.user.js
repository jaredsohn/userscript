// ==UserScript==
// @author         Chris
// @name           Neopets - User Shop Aber Project
// @include        http://www.neopets.com*
// ==/UserScript==

var strHTML = document.body.innerHTML;
var strLink = location.href;
if(location.href.match('browseshop.phtml'))
{
var strID = GetBetween(strLink, "buy_obj_info_id=", "&")
var strOwner = GetBetween(strLink, "?owner=", "&")
}
	var links = document.evaluate("//a[@href]", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; ++i)
{
    item = links.snapshotItem(i);

		if(item.href.match('browseshop.phtml'))
    {
	document.location=item.href;
    }
	
		if(item.href.match('buy_item.phtml'))
    {
	document.location=item.href
	return;
	
    }
	
}
	
	
	function GetBetween(zStr, zStart, zEnd){
	var zStr = zStr; var zStart = zStart; var zEnd = zEnd;
	var z1 = zStr.indexOf(zStart); var z2 = zStr.indexOf(zEnd, z1);
	if(z2 > z1 && z1 > -1){
		return zStr.substring(z1 + zStart.length,z2);
	}else{
		return "";
	}
}