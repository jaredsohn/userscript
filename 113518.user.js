// ==UserScript==
// @author         Luke (Gaming4JC)
// Special thanks to barmaley-exe on #javascript and Ventero on #greasemonkey IRC-Freenode for help
// Change Log: v1.0 initial release.
// v1.1 - Added support for neotraps and fixed a dead server.
// v1.2 - Added support for skipping Yahoo security traps and another dead server removed.
// v1.3 - HTTPS Detection/redirection (for HTTPS Everywhere), Dead Server Removed, and Grant added.
// v1.3.1 - Dead Server fix.
// v1.4 - Yahoo killed the redirect. Found an alternate route. Now tries to opt-out!
// v1.5 - Major Re-write to accomodate new YMail upgrade. Requires user to help downgrade.
// v1.6 - Bug Fix for users that have SSL turned on. Cleaned up Neo-Trap Opt-Out. Implemented auto-Logout if too many refreshes is reached.
// v1.6.1 - Quick redirect fix for when neo-trap doesn't let you opt-out.
// v1.7 - Yahoo killed a bunch of servers off. I finally found a way to click ya through to classic. :)
// v1.8 - Final. Yahoo closed down all classic servers for good. :(
// @name           YMail! Classic Redirector
// @description    Forces you back into Yahoo Mail classic for those of us with slow internets or love retro technology.
// @namespace	   http://www.g4jc.geek/wordpress
// @include     http://*.mail.yahoo.com/neo/b/launch*
// @include     https://*.mail.yahoo.com/neo/b/launch*
// @include     http://*.mail.yahoo.com/neo/trap*
// @include     https://*.mail.yahoo.com/neo/trap*
// @include     http://*.mail.yahoo.com/neo/launch*
// @include     https://*.mail.yahoo.com/neo/launch*
// @grant	none
// @version        1.7
// ==/UserScript==
if(window.location.href.indexOf("yahoo.com/neo/") > -1) {
alert('YMail Classic Redirector: As of July 9th, 2013 the last known YMail Classic server was turned offline. You may either uninstall this Greasemonkey Script or proceed to be redirected to Yahoo Mail Mobile. Thanks for all the good times!');
window.location = 'http://m.yahoo.com/w/ygo-mail';
} else {
}
//Original last-working code below for research purposes. It was a lot of fun tweaking just to get back to the old servers before they died... RIP Yahoo Classic. We will never be the same without you. 1997-2013
//if(window.location.href.indexOf("yahoo.com/neo/launch?reason=no_js_enabled_mig_fresh") > -1) { //Try to Pause the redirect and Prompt the user to click the NoJS Version so we can opt-out
//var crumbly = document.getElementById("main").getElementsByTagName("A")[2].outerHTML.match(/ncrumb=([^&]+)/)[1];
//var newURLc = window.location.protocol + "//" + window.location.host + '/neo/optOut?rs=1&ncrumb='+crumbly;
//window.location = newURLc;
//}
//else if(window.location.href.indexOf("yahoo.com/neo/launch?retry_ssl=1") > -1) { //Messy Fix for YMail if retry_ssl is true
//alert('Woah there! I bet you checked the "Turn on SSL" option in YMail? Good idea, but it makes monkey sad. Try again with this disabled. We can try to redirect you again, but no promises! - And you might get an "Untrusted" SSL Error or two you have to allow.');
//var newURL = window.location.protocol + "//" + window.location.host + '/neo/launch?reason=no_js_enabled_mig_fresh';
//window.location = newURL;
//}
//else if(window.location.href.indexOf("yahoo.com/neo/b/launch?") > -1) {
// Opt-Out! Working June 18, 2013.
//var getyourbreadcrumb = location.search.match(/ncrumb=([^&]+)/)[1]
//window.location = 'http://us.mg5.mail.yahoo.com/neo/optOut?rs=1&ncrumb='+getyourbreadcrumb
//}
//else if(window.location.href.indexOf("yahoo.com/neo/b/launch") > -1){ //Yay we can go to classic server now
//var urls = ["http://us.mc1608.mail.yahoo.com/mc/welcome?", "http://us.mc1618.mail.yahoo.com/mc/welcome?","http://us.mc1205.mail.yahoo.com/mc/welcome?","http://us.mc1424.mail.yahoo.com/mc/welcome?","http://us.mc1800.mail.yahoo.com/mc/welcome?","http://us.mc1646.mail.yahoo.com/mc/welcome?"];
//window.location = urls[Math.floor(urls.length*Math.random())];
//}
//else if(window.location.href.indexOf("yahoo.com/neo/launch") > -1) { //If on the new server send you to one of 3 known non-js severs and go to top of this script
//alert('YMail Classic Redirector: We are going to try and downgrade you to YMail Classic! Please note if SSL is enabled it will likely throw a certificate warning. The old servers are not signed.');
//var newURL1 = window.location.protocol + "//" + window.location.host + '/neo/launch?reason=no_js_enabled_mig_fresh';
//window.location = newURL1;
//var urls = ["http://us-mg4.mail.yahoo.com/neo/launch?reason=no_js_enabled", "http://us-mg5.mail.yahoo.com/neo/launch?reason=no_js_enabled","http://us-mg6.mail.yahoo.com/neo/launch?reason=no_js_enabled"];
//window.location = urls[Math.floor(urls.length*Math.random())];
//}
//else if(window.location.href.indexOf("yahoo.com/neo/trap") > -1) { //Bypass the neotrap by clicking the small link on the page.
//var donttrapme = document.getElementById('remind-me-later');
//if (donttrapme > 15) { // Sometimes neo-traps don't have the remind-me-later option at all! So this is a quick work-around and classic redirect.
//window.location = donttrapme;
//}
//else {
//var crumbly = location.search.match(/ncrumb=([^&]+)/)[1]
//var newURLc = window.location.protocol + "//" + window.location.host + '/neo/optOut?rs=1&ncrumb='+crumbly;
//window.location = newURLc;
// Legacy Code Below - can still be used for old accounts which have not upgraded for protection from "upgrade now neo/traps" or for finding old servers still up.
//Randomly chooses list of hardcoded known classic servers to redirect to. Feel free to add new ones or remove these as they become obsolete.
//--window.location = 'http://us.mg5.mail.yahoo.com/neo/optOut?rs=1&ncrumb='+getyourbreadcrumb
//--var urls = ["http://us.mc1800.mail.yahoo.com/mc/welcome?","http://us.mc1646.mail.yahoo.com/mc/welcome?"];
//--window.location = urls[Math.floor(urls.length*Math.random())];
//}
//} else {
//alert("YMail Redirector: Something broke, you might want to report which page you were on and leave some feedback about it."); //Unkown error?
//}