// ==UserScript==
// @name           RapidshareEasy
// @namespace      http://strecher.co.nr/
// @description    Rapidshare restyled and repositioned Free download button.
// @include        *rapidshare.de*
// ==/UserScript==

 var snapFreeBtn = document.evaluate("//input[@value='Free']",

document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snapFreeBtn.snapshotLength - 1; i >= 0; i--) {

var elmFreeBtn = snapFreeBtn.snapshotItem(i);

//Text of the button
elmFreeBtn.value = 'CLICK HERE TO DOWNLOAD';

//Font color
elmFreeBtn.style.color = '#fff';

//Border of button
elmFreeBtn.style.border = '3px #fff dashed';

//Font size
elmFreeBtn.style.fontSize = '50pt';

//Color of the button
elmFreeBtn.style.backgroundColor = '#cc3333';

//Position of the button
elmFreeBtn.style.position = 'absolute';
elmFreeBtn.style.top = '50px';
elmFreeBtn.style.left = '45px';
}

