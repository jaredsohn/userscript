// ==UserScript==
// @name          Guardian Title Goodifier
// @namespace     http://interglacial.com/~sburke/pub/
// @description	  tidies up the titles on Guardian.co.uk
// @version       0.0.2
// @include       http://*.guardian.co.uk/*
// ==/UserScript==
/*					Time-stamp: "2006-11-10 17:31:01 AKST"

		"Guardian Title Goodifier"

This Greasemonkey user script changes Guardian.co.uk titles from their
occasional format that looks so bad in the history panel, like this:
    "Guardian Unlimited | Special reports | Global warming rate discovered"
into this much nicer format:
    "Global warming rate discovered | Special reports | Guardian Unlimited"
That's it!

(Newer pages on the Guardian site are already in the changed format, so we
leave them alone.)

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and re-visit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Guardian Title Goodifier", and click Uninstall.

*/

var tit = document.title;
if( tit == undefined || tit.length == 0 ) return;
var bits = tit.split( /\s*\|\s*/ );
if( 0 == bits[0].indexOf("Guardian Unlimited") )
  document.title = bits.reverse().join(" | ");
return;	
