// ==UserScript==
// @name           Cecil Infinite Session
// @namespace      http://cecil.auckland.ac.nz/
// @description    Gets rid of the annoying pop-up to renew your Cecil session (University of Auckland)
// @include        http://cecil.auckland.ac.nz/*
// @include        https://cecil.auckland.ac.nz/*
// @grant          none
// @source         http://userscripts.org/scripts/show/126529
// ==/UserScript==

function setUpSessionReset() {
  //50 min timer. Cecil warning is at 55 mins.
  var timeout = 50;
  var timeToExpireInMin = 1000 * 60 * timeout;
  //Protect against Chrome's sneaky tricks
  if (typeof(SessionAlert) === 'undefined') return;
  //Create the timer
  var mytimer = window.setTimeout(dontAlertUser, timeToExpireInMin);
  this.resetAlert = sessionAlert.resetAlert;
  this.ResetSession = sessionAlert.ResetSession;
  //Function to NOT prompt the user to renew the session
  function dontAlertUser() {
    ResetSession(true);
    resetAlert();
    setUpSessionReset();
  }
}
var callFunction = 'setUpSessionReset();';
var scriptElem = document.createElement('script');
scriptElem.setAttribute('type', 'text/javascript');
scriptElem.innerHTML = setUpSessionReset + callFunction;
document.head.appendChild(scriptElem);