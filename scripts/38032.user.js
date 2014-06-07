//
// ==UserScript==
// @description  removes page timeouts and submits
// @name         driversed.com cruise control 
// @include      https://driversed.com/trafficschool/courseware/html/*
// ==/UserScript==
//

(function(input){
  if(input){
    input.removeAttribute('onclick');
    input.click();
  }
})(document.evaluate('//input[@alt="Continue"]', document, null, XPathResult.UNORDERED_NOTE_SNAPSHOT_TYPE, null).iterateNext());	