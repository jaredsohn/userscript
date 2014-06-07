// Annoying Popup Links
// User script for Greasemonkey
// 
// License:
// 
// GNU General Public License v2
// http://www.gnu.org/licenses/gpl.html
// 
// ==UserScript==
// @name            Annoying Popup Links
// @description     Fixes (many) evil javascript popup links: you can bookmark them and you can preview the destination in the status bar (popup function is kept)
// @include         *
// ==/UserScript==

// some regular expressions that are used later on

var regexHttp   = /(?:https?|ftp):\/\/[^\s"'<>]+/i;
var regexExt    = /['"]\s*([^'"\s<>]+?\.(?:html?|php[^'"]?|[^'"]sp|jpe?g|gif|png|as[hp]x|cgi)[^\s"'<>]*)\s*['"]/i;
var regexGen    = /['"]\s*([^'"\s<>]*?\/[^'"\s<>]*)\s*['"]/i;

// get all links on page

var allLinks = document.evaluate(
       '//a[@href]',
       document,
       null,
       XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
       null);

// examine each link

for (var i = 0, lcand; lcand = allLinks.snapshotItem(i); i++) {
    
    var lhref    = lcand.getAttribute("href");
    var lonClick = lcand.getAttribute("onClick");
    var ltarget  = lcand.getAttribute("target");
    
    // Case 1
    // handle links with "#", "javascript:;" or "javascript:void(0)" as href
    // then try to find URI strings inside the onClick attribute and move them to href
    // wrap commands inside onClick in an anonymous wrapper function to ensure that "false" is returned
    // (avoids loading the link twice, once in the current window and once in a popup)
    
    if (lhref == "#" || lhref.match(/^javascript:;$/i) || lhref.match(/^javascript:\s?void\s?\((?:''|""|0|null)?\)\s?;?$/i)) {
       if (lonClick && !lonClick.match(/swapimage/i)) {
          if (regexHttp.exec(lonClick)) {
             lcand.setAttribute("href", RegExp.lastMatch);
             lcand.setAttribute("onClick", "(function(){" + lonClick + "})(); return false;");
             continue;
          }
          if (regexExt.exec(lonClick)) {
             lcand.setAttribute("href", RegExp.$1);
             lcand.setAttribute("onClick", "(function(){" + lonClick + "})(); return false;");
             continue;
          }
          if (regexGen.exec(lonClick)) {
             lcand.setAttribute("href", RegExp.$1);
             lcand.setAttribute("onClick", "(function(){" + lonClick + "})(); return false;");
             continue;
          }
       }
       continue;
    }
    
    // Case 2
    // handle links with "javascript:foobar(...URI...)" as href
    // try to isolate URI string and set it as new href
    // move the javascript stuff to the onclick attribute
    
    if (lhref.match(/^javascript:/i) && !lhref.match(/swapimage/i)) {
       if (regexHttp.exec(lhref)) {
          lcand.setAttribute("href", RegExp.lastMatch);
          lcand.setAttribute("onClick", "(function(){" + lhref.slice(11) + "})(); return false;");
          continue;
       }
       if (regexExt.exec(lhref)) {
          lcand.setAttribute("href", RegExp.$1);
          lcand.setAttribute("onClick", "(function(){" + lhref.slice(11) + "})(); return false;");
          continue;
       }
       if (regexGen.exec(lhref)) {
          lcand.setAttribute("href", RegExp.$1);
          lcand.setAttribute("onClick", "(function(){" + lhref.slice(11) + "})(); return false;");
          continue;
       }
    }
}

