// ==UserScript==
// @name           Travian Messages Deleater
// @namespace      http://
// @description    
// @include        http://speed.travian.com.ar/berichte.php*
// ==/UserScript==
var toremove = 'apoya'; // Puede ser 'ataca' o 'apoya'

var allLinks, thisLink, thisLink2, box, thisBox, borrar;
toremove = '(.*)(' + toremove + ')(.*)';
var re = new RegExp(toremove, 'gi');
borrar = 'no';
allLinks = document.evaluate(
    '//div[@id="lmid2"]//tr',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    thisLink2 = allLinks.snapshotItem(i).innerHTML ;
    thisLink2 = thisLink2.replace(/\n/,"");
    thisLink2 = thisLink2.replace(/<td width=\"22\">(.*)<\/td>/,"");
    thisLink2 = thisLink2.replace(/\n/,"");
    thisLink2 = thisLink2.replace(/<td nowrap=\"nowrap\"(.*)<\/td>/,"");
    thisLink2 = thisLink2.replace(/\n/,"");
    thisLink2 = thisLink2.replace(re,"ataca");
    thisLink2 = thisLink2.replace(/\n/,"");
    if ( thisLink2 == "ataca" ) 
    {               
	box = thisLink.getElementsByTagName('input');
	for (var j = 0; j < box.length; j++) {		
		thisBox = box[j];
		thisBox.checked = 'checked';
		 borrar = 'si';
	}
    }
}

if ( borrar == 'si') {
	var allSub, thisSub;
	allSub = document.evaluate(
	'//input[@name="del"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	for (var i = 0; i < allSub.snapshotLength; i++) {
		thisSub = allSub.snapshotItem(0);
		thisSub.click();		
	}
}
