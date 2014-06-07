// Suomen Postin lahetyksenseuranta linkitys
// Version: 0.01
// Release: 01.31.2006
// Contact: timo dot taskinen at iki dot fi
// License: http://creativecommons.org/licenses/by-sa/2.0/
//
// This script is based on UPS/FedEx Tracking Linkify script
// by Justin J. Novack, released unser Creative Commons Share Alike.
//
// Changes: JJFI99999999999999999
//      to: http://www.verkkoposti.com/e3/TrackinternetServlet?lang=fi&LOTUS_hae=Hae&LOTUS_trackId=JJFI99999999999999999&LOTUS_hae=Hae
//
// Changelog:
//  0.01 - 01/31/2006
//         Initial version
//
// Originally Stolen from:
// UPS Tracking Linkify (http://plutor.org/projects/greasemonkey_scripts/) by Logan Ingalls <log at plutor dot org>
//
// ==UserScript==
// @name           Suomen Postin lahetyksenseuranta linkitys
// @namespace      http://www.herneli.org
// @description    (v0.01) Etsii sivulta Suomen Postin lahetyksenseurantatunnuksia, jotka eivat ole jo linkkeja, ja linkittaa ne lahetyksenseurantasivulle.
// @include        *
// ==/UserScript==

// SuomenPosti:
//  JJFI99999999999999999
// Link to http://www.verkkoposti.com/e3/TrackinternetServlet?lang=fi&LOTUS_hae=Hae&LOTUS_trackId=JJFI99999999999999999&LOTUS_hae=Hae

(function () {
       const PostiRegex = /\b(JJFI\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d\d?)\b/ig;

       function PostiUrl(t) {
               return "http://www.verkkoposti.com/e3/TrackinternetServlet?lang=fi&LOTUS_hae=Hae&LOTUS_trackId=" + String(t).replace(/ /g, "") + "&LOTUS_hae=Hae";
       }

   // tags we will scan looking for un-hyperlinked urls
   var allowedParents = [
       "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
       "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em",
       "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
       "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike",
       "s", "strong", "sub", "sup", "td", "th", "tt", "u", "var"
       ];

   var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
                               //" and contains(translate(., 'HTTP', 'http'), 'http')" +
                               "]";

   var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   //var t0 = new Date().getTime();
   for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

       // Suomen Posti linkitys
       if (PostiRegex.test(cand.nodeValue)) {
               var span = document.createElement("span");
               var source = cand.nodeValue;

               cand.parentNode.replaceChild(span, cand);

               PostiRegex.lastIndex = 0;
               for (var match = null, lastLastIndex = 0; (match = PostiRegex.exec(source)); ) {
                       span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                       var a = document.createElement("a");
                       a.setAttribute("href", PostiUrl(match[0]));
                       a.setAttribute("title", 'Linkified to Suomen Posti');
                       a.appendChild(document.createTextNode(match[0]));
                       span.appendChild(a);

                       lastLastIndex = PostiRegex.lastIndex;
               }

               span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
               span.normalize();
       }

       }

   //var t1 = new Date().getTime();
   //alert("Suomen Posti lahetyksenseuranta linkitys took " + ((t1 - t0) / 1000) + " seconds");

})();
