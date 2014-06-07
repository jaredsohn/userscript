// ==UserScript==
// @name          Boingboing Feedback Form Everywhere
// @namespace     tag:domnit.org,2006-04:gmscripts
// @description   Place the feedback form on every post page
// @include       http://boingboing.net/*
// @include       http://www.boingboing.net/*
// ==/UserScript==

/*

(C) 2006 Lenny Domnitser
Use this freely under the GNU GPL, http://www.gnu.org/licenses/gpl.html

History
-------

2006-06-30 - Started

*/

function getNode(xpath, doc) {
  if(typeof doc == 'undefined') {
    doc = document;
  }
  return doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

if(/\d{4}\/\d{2}\/\d{2}\/.*\.html$/.test(location.href)) {
  var feedbackFrame = document.createElement('iframe');
  feedbackFrame.src = '/feedback.html';
  feedbackFrame.frameBorder = 0;
  feedbackFrame.style.width = '100%';
  var otherForm = getNode('//form[contains(@action, "mt-send-entry.cgi")]');
  otherForm.parentNode.insertBefore(feedbackFrame, otherForm);
} else if(location.href == '/feedback.html' && top != self) {
  var feedbackForm = getNode('//form[contains(@action, "mailtobbs.cgi")]');
  document.body.innerHTML = '';
  document.body.appendChild(feedbackForm);
  feedbackForm.elements.namedItem('suggested_url').value = top.location.href;
  top.document.getElementsByTagName('iframe')[0].style.height = getComputedStyle(feedbackForm, '').height;
} else if(top != self) {
  if(/feedback\.html$/.test(location.href)) {
    var keeper = getNode('//form[contains(@action, "mailtobbs.cgi")]');
    keeper.elements.namedItem('suggested_url').value = top.location.href;
  } else if(/confirm\.html$/.test(location.href)) {
    var keeper = getNode('//center[.//text()="Thank you very much!"]');
  }
  document.body.innerHTML = '';
  document.body.appendChild(keeper);
  top.document.getElementsByTagName('iframe')[0].height = document.height + 50;
}