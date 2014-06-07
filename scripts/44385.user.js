// ==UserScript== 
// @name Blogger Content Warning Autoskip II
// @namespace http://blogger.com/ 
// @include https://www.blogger.com/blogin.g?blogspotURL=* 
// ==/UserScript== 

var continueButton = document.getElementById('continueButton');
if (continueButton)
{ 
	var oEvent = document.createEvent("MouseEvents"); 
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
        continueButton.dispatchEvent(oEvent); 
} 