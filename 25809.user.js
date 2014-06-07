// ==UserScript==
// @name             Slashdot nuzak CSS
// @namespace        http://www.outshine.com/
// @description      On Slashdot, changes styles to make the site less crappy.  Seed CSS came from Slashdot member nuzak, hence the name.
// @include          *slashdot.org/*
// ==/UserScript==

/*
Script by Tony Boyd.
Authored on 2008-04-30.
Updated on 2008-05-01.
Version: 1.0.0
*/

var css = document.createElement('style');
css.setAttribute('id', 'slashdot_alternative');
document.getElementsByTagName('head')[0].appendChild(css);
var copa = document.getElementById('slashdot_alternative');

copa.sheet.insertRule('.nbutton{background: #eee !important;color:#666 !important;padding: .1em 0 !important;}', 0);
copa.sheet.insertRule('.nbutton p b a {background: #eee !important;padding: .1em 0.25em !important;color:#666 !important;}', 0);
copa.sheet.insertRule('.contain {border: 1px solid #e6e6e6 !important;border-top: none !important;}', 0);
copa.sheet.insertRule('.commentTop div.title, .commentTop div.details {margin: -1px !important;}', 0);
copa.sheet.insertRule('div.article div.title h3 span {float: right !important;font-size: 10px !important;}', 0);
copa.sheet.insertRule('div.article div.title h3 span a {text-decoration: none !important;}', 0);
copa.sheet.insertRule('div.article div.title h3 span:before {content: "::" !important;}', 0);
copa.sheet.insertRule('div.article div.title h3 span:after {content: ":" !important;}', 0);
