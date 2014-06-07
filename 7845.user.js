// ==UserScript==
// @name          GWikii
// @namespace     http://jeffpalm.com/gwiki
// @description   Provides google links for wikipedia terms with no entries
// @include       http://*wikipedia.org/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.2;

// --------------------------------------------------
// misc
// --------------------------------------------------

// ====================================================================
//       URLEncode and URLDecode functions
//
// Copyright Albion Research Ltd. 2002
// http://www.albionresearch.com/
//
// You may copy these functions providing that 
// (a) you leave this copyright notice intact, and 
// (b) if you use these functions on a publicly accessible
//     web site you include a credit somewhere on the web site 
//     with a link back to http://www.albionresarch.com/
//
// If you find or fix any bugs, please let us know at albionresearch.com
//
// SpecialThanks to Neelesh Thakur for being the first to
// report a bug in URLDecode() - now fixed 2003-02-19.
// ====================================================================
function urlencode( plaintext )
{
  // The Javascript escape and unescape functions do not correspond
  // with what browsers actually do...
  var SAFECHARS = "0123456789" +          // Numeric
          "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  // Alphabetic
          "abcdefghijklmnopqrstuvwxyz" +
          "-_.!~*'()";          // RFC2396 Mark characters
  var HEX = "0123456789ABCDEF";

  var encoded = "";
  for (var i = 0; i < plaintext.length; i++ ) {
    var ch = plaintext.charAt(i);
      if (ch == " ") {
        encoded += "+";        // x-www-urlencoded, rather than %20
    } else if (SAFECHARS.indexOf(ch) != -1) {
        encoded += ch;
    } else {
        var charCode = ch.charCodeAt(0);
      if (charCode > 255) {
          alert( "Unicode Character '" 
                        + ch 
                        + "' cannot be encoded using standard URL encoding.\n" +
                  "(URL encoding only supports 8-bit characters.)\n" +
              "A space (+) will be substituted." );
        encoded += "+";
      } else {
        encoded += "%";
        encoded += HEX.charAt((charCode >> 4) & 0xF);
        encoded += HEX.charAt(charCode & 0xF);
      }
    }
  } // for

  return encoded;
};

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

function insertAfter(target,n) {
  par = target.parentNode;
  if (!par) return;
  if (target.nextSibling) {
    par.insertBefore(n,target.nextSibling);
  } else {
    par.appendChild(n);
  }
}

// --------------------------------------------------
// main
// --------------------------------------------------

function main() {

  // Find all the links with class 'new' and create a new little
  // google link right after it
  as = document.getElementsByTagName("a");
  if (!as) return;
  for (i=0; i<as.length; i++) {
    a  = as[i];
    if (!a || !a.className || a.className != "new") continue;
    html = a.innerHTML;
    s = $n("span");
    s.style.fontSize = ".8em";
    s.style.fontStyle = "normal";
    $t(" [",s);
    newA = $n("a",s);
    newA.href = "http://google.com/search?q=" + urlencode(html);
    newA.target = "_";
    newA.innerHTML = "google";
    $t("]",s);
    try {insertAfter(a,s);} catch (e) {}
  }
}

try {main();} catch (e) {}
