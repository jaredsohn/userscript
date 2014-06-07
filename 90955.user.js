// ==UserScript==
// @name           NYT Video
// @namespace      http://www.userscripts.org
// @include        http://video.nytimes.com/video/*
// ==/UserScript==

function do_reformat() {
cCol = document.getElementById('cColumn');
cCol.setAttribute('style','width: 400px;');

abCol = document.getElementById('abColumns');
abCol.setAttribute('style','height: 1000px;');

plWell = document.getElementById('playerWell');
plWell.setAttribute('style','width: 1200px;');

plWellDiv1 = document.evaluate('//*[@id="playerWell"]/div', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue
plWellDiv1.setAttribute('style','height: 850px');

myExp = document.getElementById('myExperience');
myExp.setAttribute('style','height: 850px; width: 1200px;');
// myExp.setAttribute('FlashVars','height=800&width=1200');

myExp.innerHTML = myExp.innerHTML.replace(/FFFFFF/,"999999");
myExp.data = myExp.data.replace(/FFFFFF/,"999999");

// All of the commented-out code represents attempts to get Flash to scale correctly without further intervention.
//  Since it doesn't work, right-click in the gray area outside the embedded player, and select Show All.

// myExp.innerHTML = myExp.innerHTML.replace(/334/,"800");
// myExp.innerHTML = myExp.innerHTML.replace(/500/,"1200");
// myExp.data = myExp.data.replace(/334/,"800");
// myExp.data = myExp.data.replace(/500/,"1200");
// myExp.width = "1200px";
// myExp.height = "850px";

// new_element = window.document.createElement("param");
// new_element.name = "scale";
// new_element.value = "showAll";
// document.evaluate('//*[@id="myExperience"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.insertBefore(new_element,document.evaluate('//*[@id="myExperience"]/param', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

}; // Ends do_reformat;


window.addEventListener("load", function() { do_reformat() }, false);

