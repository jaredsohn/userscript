// ==UserScript==
// @name Dlinquent
// @namespace http://greasemonkey.willglynn.com/
// @description Work around HTTP/HTML problems with certain D-Link switches
// @include http://*
// ==/UserScript==

// Some switches (e.g. DGS-1224T) send back pages that look like:
//   <meta http-equiv='Page-Exit' content='blendTrans(Duration=0.0)'>
//   <html><body bgcolor='rgb(204,220,226)' onload="location.href='smartwizard.htm'"></body>
//   </html>
//
// These are sent with no headers, and the HTML5 content sniffing rules don't
// recognize this as HTML. Instead, they're seen as text/plain, which in Chrome
// looks like a <pre> containing this code.

var
  // So, look at at the first <pre>,
  pre = document.getElementsByTagName('pre')[0],
  // make sure it's directly descended from <html><body>,
  is_alone = pre &&
    pre.parentElement.tagName == "BODY" &&
    pre.parentElement.parentElement.tagName == "HTML",
  // extract its text,
  pre_text = is_alone && pre.innerText,
  // make sure it's sensibly-sized,
  sane = pre_text && pre_text.length < 250,
  // make sure it begins with a <meta tag,
  is_meta = sane && pre_text.match(/^<meta/)
  // see if it has anload redirect,
  matched = is_meta && pre_text.match(/onload="location.href='([^']+)'"/),
  // and if so, grab the address
  redirect = matched && matched[1];

// If after all that we have a redirect,
if (redirect) {
  // follow it.
  document.location = redirect;
}
