// ==UserScript==
// @name           ConfermaEnablement
// @namespace      http://userscripts.org/users/lechat
// @description    Enable Finish button
// @include        https://ssl.niseurope.com/conferma/_clientPages/accomBookingWizard-summary.asp
// ==/UserScript==

function $() {
  if (arguments.length==1) {
    return document.getElementById(arguments[0]);
  }

  var result=[], i=0, el;
  while(el=document.getElementById(arguments[i++])) {
    result.push(el);
  }

  return result;
}

$("finishLink").style.visibility = "";
