// ==UserScript==
// @name        Extabit
// @namespace   oneclickhoster
// @description Skips the annoying waiting time at Extabit.com and focuses on the captcha field.
// @include     http://extabit.com/file/*
// @include     http://*.extabit.com/file/*
// @version     2012-10-14
// ==/UserScript==

// tested with firefox 16.0.1 and greasemonkey 1.4

// create a mouse click event
var clickEvent = document.createEvent("MouseEvents");
clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

window.addEventListener( 'load', function() {

  // click on the free download button
  genericXPathAction(
    "//a[@class='btn-download-free']",
    "object.dispatchEvent(clickEvent)");

  // display google captcha
  genericXPathAction(
    "//div[@class='b-right']",
    "object.style.display='block'");

  // hide count down
  genericXPathAction(
    "//div[@class='b-wait']",
    "object.style.display='none'");

  // put the cursor into the input field
  genericXPathAction(
    "//input[@id='recaptcha_response_field']",
    "object.focus()");

}, false);

// second page with download link
// automatically download
linkNode = document.evaluate("//tr[@id='linker']/td[2]/h3/a", document, null, 9, null).singleNodeValue;
if (linkNode) {
  window.location = linkNode.href;
}

// a generic function for xpath actions
function genericXPathAction(xpathExpression, xpathAction) {
  var objects = document.evaluate(
    xpathExpression, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (var i = 0; i < objects.snapshotLength; i++) {
    object = objects.snapshotItem(i);
    eval(xpathAction);
  }
}
