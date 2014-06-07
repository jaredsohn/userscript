// ==UserScript==
// @name          Text_size_defaulter_dammit
// @namespace     http://interglacial.com/~sburke/pub/
// @description	  Puts all text in the default size
// @version       0.0.6
// @include       *
// ==/UserScript==
/*					Time-stamp: "2005-12-30 17:51:46 AST"

		"Text size defaulter dammit"

  Many poorly-designed web sites inadvertently make their content
unreadable by having CSS rules like 'font-size: 11px'. 

  That happens to make a jolly good text size for the particular
combination of the designer's usual posture and eyesight and his
monitor's size and current resolution -- but which comes out as
unreadable little squiggles for others.

  So I wrote this script to override such rules.  This script 
restores all web-page text to your browser's default text size.  This
will be especially useful to people with vision problems (who don't
want their large font size settings overridden by incompetent web
design), or people whose monitors run at extremely high resolution
(e.g., CAD designers).

  The default "include" setting for this script is "*" (everything).
You may chose to change that to just some particular sites, with
include expressions like: http://blogging.la/*

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

 This is a Greasemonkey user script.
 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/

*/



if (
    document.documentElement.tagName == "HTML"
    && document.contentType == "text/html"
) {
  var NodeFilter = Components.interfaces.nsIDOMNodeFilter
  if(!NodeFilter) throw "No NodeFilter?!";
  if(NodeFilter.SHOW_ELEMENT == undefined) throw "No NodeFilter.SHOW_ELEMENT?!";

  var traversal = document.createTreeWalker(
   document.documentElement, NodeFilter.SHOW_ELEMENT, null, false
  );
  var el;
  var count = 0;
  while( 1 ) {
    el = traversal.nextNode();
    if(!el) break;
    if(el.style.cssText) {
       el.style.cssText +=
        ';font-size: medium !important; line-height: normal !important;';
    } else {
       el.style.fontSize   = 'medium !important;';
       el.style.lineHeight = 'normal; !important;';
    }
  }
}

// End
