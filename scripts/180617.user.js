// ==UserScript==
// @name     Airblocks.com Kwik-Fit Click Enter
// @include  http://hotspots.airblocks.com/welcomeback.php?*
// @grant    GM_addStyle
// ==/UserScript==
/*-
 * Clicks Enter on Airblocks.com free WiFi, assuming your details are already stored. I use Chrome and Auto Refresh Plus to reload a pinned random page every 30 seconds.
 * If the portal has timed out the browser redirects to the Enter page, the script clicks it.
*/
document.getElementsByClassName('inputsubmit')[0].click();