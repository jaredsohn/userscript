// ==UserScript==
// @name          HWM_Iframe_at_work
// @description   HWM mod - _Iframe_at_work
// @include       http://www.rbc.ru/*
// ==/UserScript==



//alert("HWM_Iframe_at_work");




var allDivs, thisDiv;
allDivs = document.evaluate(
    "//div[@class='top10 bottom10 whiteBg']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
	
	thisDiv.innerHTML = '<iframe width="234" height="200" name="my_iframe" id="my_iframe" '+
'frameBorder="0" frameSpacing="0" marginWidth="0" marginHeight="0" scrolling="yes" src="http://www.heroeswm.ru/" ></iframe>';

}





