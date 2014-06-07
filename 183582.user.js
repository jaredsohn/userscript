// ==UserScript== 
// @name Blogger Content Warning Autoskip
// @namespace http://userscripts.org/scripts/show/183582
// @description Auto-click through Blogger's annoying adult content warning on NSFW blogs.
// @version 2.7
// @history 2.7 blogger broke the script in late 2013, this version fixes it. Also changed this script to work with international blogger domains not only .com. Will now also work if you do not include www. (which is optional)
// @history 2.6 version by brainwave http://userscripts.org/scripts/show/126180
// @author Mikado, groovyskies, billysanca, brainwave, MrTTAO
// @include https://*.blogger.*/blogin.g?blogspotURL=*
// @include http://*.blogspot.*
// ==/UserScript== 

//alert('starting script');
var continueButton = document.getElementsByClassName("maia-button maia-button-primary")[0];
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