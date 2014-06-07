/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-09-01 23:55:18 AKDT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          AmazonPermalink
// @namespace     http://interglacial.com/
// @description	  Put a permalink icon on every Amazon item's page.
// @version       1.0.2
// @include       http://*.amazon.*/*
// @include       http://amazon.*/*
// @include       https://*.amazon.*/*
// @include       https://amazon.*/*
// @author        sburke@cpan.org
// ==/UserScript==
/*
			   "Amazon Permalink"

This puts a permalink icon on every Amazon product product page.  The
URL for that icon will be much shorter than the one in the Location
bar. For example, here's a normal page URL:
  http://www.amazon.com/gp/product/B0009EZG42/qid=1148193612/sr=1-2/ref=sr_1_2/102-4270881-3507316?%5Fencoding=UTF8&s=jewelry&v=glance&n=3367581
And here's its permalink icon's URL: 
  http://amazon.com/dp/B0009EZG42
Much handier for passing around!

New in version 1.0.2: 'gp/product' changed to shorter 'dp' (Detail Page)
New in version 1.0.1: To make the link button not quite so obtrusive, I've
 changed it from saying "Permalink" to just using the permalink symbol.

*/

var Debug_level = 1 * Pref("debug_level", 0);
trace(1, "DEBUG level: " + Debug_level.toString());
if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  run();
}

function trace (level,msg) { if(level <= Debug_level) GM_log(msg); return; }

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

function my_link (a, url) {
  a.setAttribute('href', url);
  a.appendChild( document.createTextNode( "\xa0\xa7\xa0"  ));
  a.setAttribute('title',
   "rightclick and select 'Copy Link Location' to get this page's permalink URL"
  );
  a.style.color = '#996666';
  a.style.backgroundColor = '#ffcc99';
  return a;
}

function run () {
  trace(6, "Considering this Amazon page");

  var bits = site_and_asin(window.content.location.href.toString());
  if(!bits) { trace(5, "Current URL isn't permalinkable"); return; }

  var newurl = "http://" + bits[0].toLowerCase() + "/dp/" + bits[1];

  var a = document.createElement('a');
  a = my_link(a, newurl);
  common_link_style(a);
  do_insertion(a);
  return;
}

function site_and_asin (u) {
  var m;

  m = u.match(
   /^https?:\/\/(www\.)?(amazon\.[\.a-z]+)\/((gp\/product)|(exec\/obidos\/ASIN)|(exec\/obidos\/tg\/detail\/-)|(([^\/\?\&]+\/)?dp))\/([a-zA-Z0-9]+)\b/i
  );
  //if(m) alert(m.toSource());
  //if(m) alert( [m[2],m[9]].toSource());
  if(m) return [m[2],m[9]];

  return false;
}

function common_link_style (link) {
  link.style.padding  = '4px';
  link.style.border   = '2px #000000 solid;';
  link.style.MozBorderRadius = '7px';
  link.style.fontWeight = 'bold';
  return;
}

function do_insertion (link) {
  if( false == Pref( "cornery", false ) ) {
    var header = document.evaluate("//b[@class='sans']", document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
    if(header) {
      var br = document.createElement('br');
      header.parentNode.insertBefore(link, header.nextSibling);
      header.parentNode.insertBefore(link, br);

      trace(6, "Link added in page content.");
      return;
    } else {
      trace(5, "Hm, I'll have to put it in the top corner.");
    }
  }

  var p = document.body.lastChild;
  if( p && (p.className || "") == "linkybuttonbar" ) {
    trace(9, "Found existing buttonbar");
    link.style.borderLeftWidth = 0;
  } else {
    p = make_p_linky_button_bar();
  }
  p.appendChild(link);
  document.body.appendChild(p);

  trace(6, "Link added in top corner.");
  return;
}

function make_p_linky_button_bar () {
  trace(9, "Making new buttonbar");
  var p = document.createElement('p');
  p.style.position = "fixed";
  p.style.top = 0;
  p.style.right = 0;
  p.style.left  = "auto";
  p.style.width = "auto";
  p.style.marginTop = 0;
  p.style.backgroundColor = "#a0a0a0";
  p.style.fontSize = "17px";
  p.className = "linkybuttonbar"
  return p;
}

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
			     ~ Scratch Pad ~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Test URLs:
Sample Amazon URLs for permalinction:

http://www.amazon.com/gp/product/B000EULJLU
http://www.amazon.com/gp/product/B000EULJLU/ref=amb_right-2_173554101_1/102-4270881-3507316?n=5174
http://www.amazon.com/gp/product/B000E95IBI/qid=1148193599/sr=1-2/ref=sr_1_2/102-4270881-3507316?%5Fencoding=UTF8&s=apparel&v=glance&n=1036592
http://www.amazon.com/gp/product/B000ET2QUE/qid=1148193599/sr=1-1/ref=sr_1_1/102-4270881-3507316?%5Fencoding=UTF8&s=apparel&v=glance&n=1036592
http://www.amazon.com/gp/product/B0007N547O/qid=1148193608/sr=1-2/ref=sr_1_2/102-4270881-3507316?%5Fencoding=UTF8&s=jewelry&v=glance&n=3367581
http://www.amazon.com/gp/product/B000F5HWR4/qid=1148193611/sr=1-2/ref=sr_1_2/102-4270881-3507316?%5Fencoding=UTF8&s=jewelry&v=glance&n=3367581
http://www.amazon.com/gp/product/B0009EZG42/qid=1148193612/sr=1-2/ref=sr_1_2/102-4270881-3507316?%5Fencoding=UTF8&s=jewelry&v=glance&n=3367581
http://www.amazon.com/exec/obidos/tg/detail/-/1596430958

And international ones:
http://www.amazon.ca/exec/obidos/ASIN/1852862920/702-9753232-7724849
http://www.amazon.co.jp/exec/obidos/ASIN/1852862920/250-0908405-0617005
http://www.amazon.co.uk/exec/obidos/ASIN/1852862920/203-1643215-6614356
http://www.amazon.co.uk/exec/obidos/ASIN/B000A322NU/ref=amb_asin-coop-1_53619091/203-1643215-6614356
http://www.amazon.de/exec/obidos/ASIN/3764501650/028-9063405-0978103
http://www.amazon.fr/exec/obidos/ASIN/B000FIGJ3E/ref=amb_link_20938265_2/402-0304178-5236112

http://www.amazon.co.uk/exec/obidos/tg/detail/-/1596430958
http://www.amazon.co.uk/exec/obidos/tg/detail/-/1596430958/203-1643215-6614356


2006-08-30 new "dp" and infixy stuff:
http://www.amazon.com/Nazi-Seizure-Power/dp/0531056333
http://www.amazon.com/dp/0531056333


Yes, https!
https://www.amazon.co.uk/exec/obidos/ASIN/1852862920/203-1643215-6614356

Negatives:
http://www.amazon.com/gp/richpub/listmania/fullview/RPLFWQ25APB14/ref=cm_lm_pdp_title_full/102-4270881-3507316
http://www.amazon.com/gp/richpub/listmania/fullview/3FV2TK52V3F8I/ref=cm_lm_byauthor_title_full/102-4270881-3507316
http://www.amazon.com/gp/richpub/listmania/byauthor/AFXFDLFL1MJTH/ref=cm_lm_fullview_name/102-4270881-3507316

Any false negatives?

*/

// End
