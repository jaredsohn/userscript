// ==UserScript==
// @name           Kevin Vote
// @namespace      lwburk
// @include        http://talentsearch.yogajournal.com/view/386
// ==/UserScript==


alert ('vote');

var loginOptions = document.getElementsByName("submission-386-rating"); 
   if (!loginOptions.length) alert ('Sorry Kevin you suck.  Script broke.'); 

loginOptions[0].checked = false;
loginOptions[1].checked = false;
loginOptions[2].checked = false;
loginOptions[3].checked = false;
loginOptions[4].checked = true;

unsafeWindow.rateSubmission ('386');

window.location.href=window.location.href;