/****************************** IMPORTANT NOTE OMFG *********************************
*   This script is now completely, utterly, embarassingly obsolete, thanks to the   *
*   folks at http://www.customizegoogle.com. So don't waste your time.              *
************************************************************************************/

/*
	By Aanand Prasad (aanand.prasad@gDELETETHISBITRIGHTHEREYESTHISBITmail.com).
	
	Do what you want with it; I'd appreciate it if you dropped me a line if you
	use it for something just so I can feel good about myself.
	
	Any horrific problems with it, feel free to email me and I'll cut your face off.
*/

// ==UserScript==
// @name            Hide Gmail Ads
// @namespace       http://www.statelovesyou.com/aanand/greasemonkey/
// @description     (2005-04-03) Hides Gmail content-sensitive ads.
// @include         http://gmail.google.com/*
// @include         https://gmail.google.com/*
// ==/UserScript==

(function() {

    var RemoveGmailAds =
    {
        checkPage: function()
        {
			var a = document.getElementById("ad");

			if (!a) {
				return;
			}

			a.setAttribute("style", a.getAttribute("style") + "; display:none");
		}
	}

	RemoveGmailAds.checkPage();

})();