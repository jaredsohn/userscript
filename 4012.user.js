/* -*-mode:JavaScript;coding:latin-1;-*- Time-stamp: "2006-09-02 00:14:30 AKDT"
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name          Amazon2ISBNnu
// @namespace     http://interglacial.com/
// @description	  Make every Amazon book page link to its ISBN.nu page
// @version       0.0.3
// @include       http://*.amazon.*
// @author        sburke@cpan.org
// ==/UserScript==
/*
			   "Amazon2ISBN.nu"

Whenever you visit the Amazon page for a book, this script will add a
link on that page to the ISBN.nu page for that book, so you can
compare prices, etc.

This script is based indirectly on jmills's "Amazon PDX Linky" script.
*/

var DEBUG = 10;

if (
 document.documentElement.tagName == "HTML"
 && document.contentType == "text/html"
 && document.body    // Basic sanity
) {
  run();
}

function trace (level,msg) { if(DEBUG >= level) GM_log(msg); return; }

function getpref (prefname, defaulty) {
  var gotten = GM_getValue(prefname, null);
  if(gotten == null) {
    GM_setValue(prefname, defaulty);
    return defaulty;
  } else {
    return gotten;
  }
}

function my_link (a, isbn) {
  a.setAttribute('href', 'http://isbn.nu/' + isbn);
  a.setAttribute('accesskey','i');
  a.setAttribute('title',"[alt-i]  Look this up at ISBN.nu");
  a.appendChild( document.createTextNode( "\xBBISBN.nu" )); //\u2192
  a.style.color = '#666699';
  a.style.backgroundColor = '#99ccff';
  return a;
}

function run () {
  trace(6, "Considering this Amazon page");
  var mainmatch = window.content.location.href.match( /\/(\d{9}[\d|Xx])(\/|$)/ );
  if(!mainmatch) { trace(5, "No ISBN seen"); return; }
  var a = document.createElement('a');
  a = my_link(a, mainmatch[1]);
  common_link_style(a);
  do_insertion(a);
  return;
}

function common_link_style (link) {
  link.style.padding  = '4px';
  link.style.border   = '2px #000000 solid;';
  link.style.MozBorderRadius = '7px';
  link.style.fontWeight = 'bold';
  return;
}

function do_insertion (link) {
  if( false == getpref( "cornery", true ) ) {
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
 Test URLs:
   Positives:
	http://www.amazon.com/exec/obidos/tg/detail/-/1400033802/
	http://www.amazon.com/gp/product/1400033802/
	http://www.amazon.com/gp/reader/1841491527/
        http://www.amazon.co.uk/exec/obidos/ASIN/1852862920/
        http://www.amazon.co.uk/exec/obidos/ASIN/087286250x/
        http://www.amazon.co.uk/exec/obidos/ASIN/087286250X/
   Negatives:
	http://www.amazon.com/gp/product/B000E33W0I
	http://www.amazon.com/gp/product/B0009PJVO2
	http://amazon.com/gp/pdp/profile/AFXFDLFL1MJTH
   False positives:
	http://www.amazon.com/gp/product/1573306975
*/

// End
