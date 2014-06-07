// ==UserScript==
// @name            buglogger
// @namespace       jack
// @description     Quickly log bugs
// @version         0.0
// @author          jack
// @license         Private
// @include         *cheetah*
// @include         *puma*
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


window.addEventListener("load", function(e) {

$("uservoice-feedback-custom").style.text-indent = "0";
$("uservoice-feedback-custom").style.background-color = "#555555";
$("uservoice-feedback-custom").style.width = "50px";
$("uservoice-feedback-custom").style.height = "50px";
$("uservoice-feedback-custom").innerHTML = "<a href = 'http://cqjavaweb.pgdev.sap.corp:1080/cqweb/login'>Log a Bug</a>";







}, false);


