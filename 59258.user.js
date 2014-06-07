// ==UserScript==
// @name           Experts-Exchange Answers
// @namespace      http://khopis.com/scripts
// @description    Hack Experts-Exchange to show answers
// @include        http://www.experts-exchange.com/*.html
// @include        http://experts-exchange.com/*.html
// @include        http://*/search?*q=*cache:http:/*.experts-exchange.com/*.html
// @include        http://*/search?*q=*cache:http://experts-exchange.com/*.html
// @scripthome     http://userscripts.org/scripts/show/59258
// @author         Adam Katz <scriptsATkhopiscom>
// @version        0.8
// @copyright      2009-10 by Adam Katz
// @license        AGPL v3
// @licstart       The following is the entire license notice for this script.
/* 
 * Copyright (C) 2009-10  Adam Katz
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or (at your
 * option) any later version.  This program is distributed in the hope that
 * it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */ 
// @licend         The above is the entire license notice for this script.
// ==/UserScript==


// The secret is that they present Google with this layout:
//   * Question
//   * Mocked up answer section with no content
//   * Really big menu consuming lots of vertical space (for Google only)
//   * The real answer section (Google only, so the answer is searchable)
// All we have to do is remove the mock-up and slide the menu to the bottom.

pageMain = document.getElementById("pageMain");

function getCorrectedPageMain(scope) {
  var answers = scope.getElementsByClassName("answers");
  if (answers.length >= 2) {
    // Kill the mock-up.  It has no usable content.
    answers[0].innerHTML = '';
    answers[0].style.display = "none";
  
    var zones = scope.getElementsByClassName("allZonesMain");
    if (zones) {
      zones[0].innerHTML = ''
      zones[0].style.display = "none";
      zones[0].parentNode.className += "khopPageMain";
      /*
      // Move the super-long menu to the bottom of the page.
      // (If you place an already-placed object, it gets moved instead.)
      zones[0].parentNode.appendChild(zones[0]);
      zones[0].getElementsByTagName("td")[1].innerHTML=
        '<h1 class="khopZoneHeader">Experts-Exchange Categories</h1>';
      GM_addStyle(  // shrink it down, too
          ".allZonesMain div.allZones { display:none; }\n"
        + ".allZonesMain:hover div.allZones { display:inherit; }\n"
        + ".khopZoneHeader { padding-left:1em; font-size:1.25em;\n"
        + "    background:url(/xp/images/rootTAHeaderMiddle.png) repeat-x;}\n"
      );
      */
    }
  }
  try      { return scope.getElementsByClassName("khopPageMain")[0].innerHTML; }
  catch(e) { alert("Error:\n" + e); return ''; }
}

if ( location.host.match(/\bexperts-exchange\.com$/) ) {

  if ( document.getElementsByClassName("answers").length > 0 ) {
    // Here's how I did it before using xmlhttpRequest to fetch as if Google:
    // location.href = "http://www.google.com/search?q=cache:" + location.href;

    function insertAnswers (response) {
      var ee4google = document.createElement("html");
      ee4google.innerHTML = response.responseText;
      var newcontent = getCorrectedPageMain(ee4google);

      if ( newcontent.match(/\sclass="(\S*\s+)?answers("|\s)/) ) {
        pageMain.innerHTML = newcontent;
      } else { alert("Experts-Exchange appears to have changed their format"); }
    }

    var uaString = "Googlebot/2.1 (+http://www.googlebot.com/bot.html)";
    GM_xmlhttpRequest({
      method:'GET',
      url:location.href,
      headers: {'User-Agent': uaString},
      onload:insertAnswers
    });
  }

} else {	// cache served by Google already has the data in it

  pageMain.innerHTML = getCorrectedPageMain(document);

  /* Back before using xmlhttpRequest, we hid the "This is Google's cache" box:
  var googCache = document.getElementsByTagName("div");
  if (googCache && googCache[0].innerHTML.match(/This is Google's cache of/) ) {
    googCache[0].style.display = "none";
  }
  */

}


// getFontSizeByClass(string) -> string  // output is float too
// given a class name, return a font size in pixels
function getFontSizeByClass(objClass) {
  objClass = document.getElementsByClassName(objClass);
  try {  // I just don't trust getComputedStyle
    // and rightfully so:  looks like they finally got around to the security
    // issue caused by this with respect to a:visited ... by removing it.
    if (objClass) {
      return getComputedStyle(objClass[0],'').fontSize.match(/[0-9.]+/);
    }
  } catch(e) { /* GM_log("Error:\n" + e); */ }
  return 12.0;  // default to 12px
}

fontFix = 100 * getFontSizeByClass("qBody") / getFontSizeByClass("answerBody");
// NoScript apparently makes getFontSizeByClass fail ...
if ( fontFix == 100 ) { fontFix = 144; }

function hbg(type, color, adj, extra, extra2) {
  var css = ''
  if (extra)  { css += '.s .' + extra  + ' .h td:nth-child(2), ' }
  if (extra2) { css += '.s .' + extra2 + ' .h td:nth-child(2), ' }
  css += '.s .' + type + ' .h td:nth-child(2) { background:' + color
      + ' url(http://images.experts-exchange.com/00181/xp/images/hMids.gif) 0 '
      + adj + 'px repeat-x!important; }\n';
  return css;
}

// kill some ads that adblock misses, reduce massive zone menu size
GM_addStyle( ""
  + ".answers { font-size:" + fontFix + "%; }\n"
  // + 'a[href^="javascript:signUp"], ' // (this one goes too far)
  + ( navigator.userAgent.match(/^Googlebot\//) ? ".vqpsdBlurredAnswers," : '')
  + '*[id^="compSignUp"], .ontopBanner, .freePAQ { display:none!important; }\n'
  + hbg("askerHeader", "#ccc", 0, "askerClosingHeader", "expGray")
  + hbg("expBlue", "#6bf", -441, "expLightBlue", "expExpBlue")
  + hbg("expGreen", "#bd6", -28, "expDarkGreen")
  + hbg("expDarkOrange", "#fb6", -113, "askerClosingHeader")
  + '.s .answers div .h td.l { -moz-border-radius:15px 0 0 0; }\n'
  + '.s .answers div .h td.r { -moz-border-radius:0 15px 0 0; }\n'
);
