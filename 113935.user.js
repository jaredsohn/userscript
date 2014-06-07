// ==UserScript== 
// @name Blogger Content Warning Autoskip
// @namespace http://blogger.com/
// @description Self explain title =)
// @version 2.5
// @author Mikado, groovyskies, billysanca
// @include https://www.blogger.com/blogin.g?blogspotURL=*
// @include http://*.blogspot.com/* 
// ==/UserScript== 

var continueButton = document.getElementById('continueButton');
if (continueButton)
{ 
	var oEvent = document.createEvent("MouseEvents"); 
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
        continueButton.dispatchEvent(oEvent); 
} 