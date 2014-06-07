/* Time-stamp: "2006-07-20 21:27:19 ADT" -*-coding: latin-1;-*-             µ */
// ==UserScript==
// @name          High_Contrast
// @description   makes the background black and the text white, either in an alternate stylesheet you can select as needed, or immediately
// @include       *
// @author        sburke@cpan.org
// @version       1.0.1
// @namespace     http://interglacial.com/
// ==/UserScript==
/*

This userscript provides a stylesheet that makes the whole page into white
text on black.  Depending on the Blacken_immediately setting, that stylesheet
is either applied immediately, or (the default) is simply made
available as an option you can choose under the browser's "View"
menu's "Page Style" submenu.

This userscript has two purposes:

* Some web sites, usually thru some inept coding, make some or all of
 their text quite unreadable because of poor combinations of text
 color and background color (or background image).

* More people than you think are "low vision" users -- i.e., they
 aren't blind, but they have poor eyesight.  Making text white-on-black
 generally makes it much more readable to such readers. 

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
Note that our namespace changed between version 0.0.2 and 1.0.1.  If you've
got version 0.0.1 or 0.0.2, uninstall it manually.  Sorry for the bother!
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

 This is a Greasemonkey user script.
 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 To configure its preferences once you have run this at least once, you can
   go to about:config and filter on 'interglacial'.
*/

function Pref (prefname, defaulty) {
  var gotten = GM_getValue(prefname, null);
  if(gotten == null) {
   GM_setValue(prefname, defaulty);
   GM_log("Setting new preference value " + prefname + " to "
    + defaulty.toString() + " -- If you want to edit it, go to 'about:config'"
    + " and filter on 'interglacial'."
   );
   gotten = defaulty;
  }
  return gotten;
}

if (     // Basic sanity
 document && document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body
) {
  (
   Pref("aggressive", false) ? global_css : alternative_css 
   // true means we go right ahead and apply our stylesheet.
   // false means it's just an alternative you can select under "View: Page Style"
  )([
   'body, * {',
   '  background-color: ' + Pref('black_colorval', '#000') +' !important;',
   '  background-image: none !important;',
   '  color: '            + Pref('white_colorval', '#fff') +' !important;',
   '}',
   'a:link    { color: '  + Pref('link_colorval',  '#a0a0ff') +
    ' !important; text-decoration: underline !important; }',
   'a:visited { color: '  + Pref('vlink_colorval', 'purple') +
    ' !important; }',
   'a:active  { color: '  + Pref('alink_colorval', 'red') +
    ' !important; }'
  ].join("\n"), Pref('stylesheet_name', "White-On-Black"));
}

function global_css (cssdata) {
  GM_addStyle(cssdata); // a handy new shortcut
}

function alternative_css (cssdata,title) { // a.k.a. alternate stylesheet, etc
  var link = document.createElement("link");
  link.setAttribute("href", css2data(cssdata));
  link.setAttribute("title", title || "WhiteOnBlack");
  link.setAttribute("rel", "alternate stylesheet");
  link.setAttribute("type", 'text/css');
  link.setAttribute("media", 'screen');
  get_head().appendChild(link);
  return link;
}

function get_head () {
  var head;
  head = document.body.previousSibling;    // most common case
  if(head && head.nodeName == "HEAD") { return head; }
  head = document.getElementsByTagName("head")[0]; // slower but surer
  if(!head) throw "No head?!";
  return head;
}

function css2data (dat) {
  return 'data:text/css,' + encodeURIComponent(dat);
}

//~~~ More fun at http://interglacial.com/hoj/ for you JavaScript goons! ~~~
//End
