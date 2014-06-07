// ==UserScript==
// @name           Content Function Test
// @namespace      lwburk
// @include        http://talentsearch.yogajournal.com/view/386
// ==/UserScript==

function voteyo ()
{
   var loginOptions = document.getElementsByName("submission-386-rating"); 
   if (!loginOptions.length) alert ('Sorry Kevin you suck.  Script broke.'); 

   loginOptions[0].checked = false;
   loginOptions[1].checked = false;
   loginOptions[2].checked = false;
   loginOptions[3].checked = false;
   loginOptions[4].checked = true;

   unsafeWindow.rateSubmission ('386');

   window.location.reload ();
}

alert ('vote');