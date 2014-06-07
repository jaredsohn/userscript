/*
 * Title: PayPal print css
 * Description: Cleans up paypal screens when printing transaction details pages
 * Author: Aubergine10
 *
 */

// ==UserScript==
// @name PayPal print css
// @description Cleans up printed history pages
// @include *://history.paypal.com/*

// ==/UserScript==


(function() {

 function addGlobalStyle(css) {
  var head,style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.media = 'print';
  style.innerHTML = css;
  head.appendChild(style);
 }

 // shrink h1 size
 var shrinkH1 = 'body h1 {font-size:10px !important;}'
 addGlobalStyle(shrinkH1);

 // remove header links (logo, logout, help, etc)
 var removeHeaderLinks = 'div#header {display:none;visibility:hidden;}'
 addGlobalStyle(removeHeaderLinks);

 // remove primary nav links (tabs)
 var removeNavPrimary = 'div#navPrimary {display:none;visibility:hidden;}'
 addGlobalStyle(removeNavPrimary);

 // remove secondary nav links (under tabs)
 var removeNavSecondary = 'div#navSecondary {display:none;visibility:hidden;}'
 addGlobalStyle(removeNavSecondary);

 // remove separation lines
 var removeSeparationLines = 'td.separationLine {display:none;visibility:hidden;}'
 addGlobalStyle(removeSeparationLines);

 // remove global buttons (eg. return to log)
 var removeGlobalButtons = 'td.globalButtons {display:none;visibility:hidden;}'
 addGlobalStyle(removeGlobalButtons);

 // remove footer (lots of links and other crap)
 var removeFooter = 'div#footer {display:none;visibility:hidden;}'
 addGlobalStyle(removeFooter);

 // ### remove other useless table bits ###
 // I had to use XPath for these as I couldn't find any decent way to do it via CSS

 // the hr line below main page heading
 var s0 = "/html/body/div[@id='xptContentMain']/table[@id='xptContentContainer']/tbody/tr[2]/td/div[@id='xptTitle']/table/tbody/tr[3]";
 var s0r = document.evaluate(s0, document, null, XPathResult.ANY_TYPE, null);
 s0r.iterateNext().innerHTML = "";


 // the line showing some extra links
 var s1 = "/html/body/div[@id='xptContentMain']/table[@id='xptContentContainer']/tbody/tr[3]/td/table/tbody/tr[40]";
 var s1r = document.evaluate(s1, document, null, XPathResult.ANY_TYPE, null);
 s1r.iterateNext().innerHTML = "";

 // the dotted line above it
 var s2 = "/html/body/div[@id='xptContentMain']/table[@id='xptContentContainer']/tbody/tr[3]/td/table/tbody/tr[38]";
 var s2r = document.evaluate(s2, document, null, XPathResult.ANY_TYPE, null);
 s2r.iterateNext().innerHTML = "";

 // refund line
 var s3 = "/html/body/div[@id='xptContentMain']/table[@id='xptContentContainer']/tbody/tr[3]/td/table/tbody/tr[46]";
 var s3r = document.evaluate(s3, document, null, XPathResult.ANY_TYPE, null);
 s3r.iterateNext().innerHTML = "";

 // the dotted line above it
 var s4 = "/html/body/div[@id='xptContentMain']/table[@id='xptContentContainer']/tbody/tr[3]/td/table/tbody/tr[44]/td";
 var s4r = document.evaluate(s4, document, null, XPathResult.ANY_TYPE, null);
 s4r.iterateNext().innerHTML = "";

})()