// ==UserScript== 
// @name Blogger Content Warning Autoskip
// @namespace http://blogger.com/
// @description Auto-click through Blogger's annoying adult content warning on NSFW blogs.
// @version 2.6
// @author Mikado, groovyskies, billysanca, brainwave
// @include https://www.blogger.com/blogin.g?blogspotURL=*
// @include http://*.blogspot.com/* 
// ==/UserScript== 

//alert('starting script');
var continueButton = document.getElementsByClassName("kd-button-red")[0];
if (continueButton)
{
	//alert('Found the button');
	var oEvent = document.createEvent("MouseEvents"); 
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null);
        continueButton.dispatchEvent(oEvent); 
}
//else
//{
	//alert('could not find the button');
	//console.log("could not find the button\n");
//} 