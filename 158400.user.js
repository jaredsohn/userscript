// ==UserScript==
// @name        ProfitClickingSkipper
// @namespace   http://userscripts.org/users/158400
// @description Skip automatically Ads (ProfitClicking)
// @include      http://www.profitclicking.com/traffic-exchange/?ViewAdsInit=true
// @version     0.1
// @grant 		none
// ==/UserScript==

unsafeWindow.areYouReallySure=true;
var lien;
function checkpub() {
	if(document.getElementById('SubmitButton')) document.getElementById('SubmitButton').click();
}
setInterval(checkpub,2000);