// ==UserScript==
// @name           uni
// @namespace      http://www.studentenwerk.bremen.de/files/main_info/essen/plaene/uniessen.php
// @include        http://www.studentenwerk.bremen.de/files/main_info/essen/plaene/uniessen.php
// ==/UserScript==

images = document.evaluate(
    '//img[@src]',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < images.snapshotLength; i++) {

    img = images.snapshotItem(i);
    src = img.src;
    myVar = src.substr(84, 100);
    //strange=myVar.substr(0,41);
    //if (strange=="PICTURES%5CDYNAMIC-SYMBOLS&BACKGROUNDS%5C")
	//{
	//	myVar=myVar.substr(41,1000);
	//};
img.src="http://www.studentenwerk.bremen.de/"+myVar;
}
