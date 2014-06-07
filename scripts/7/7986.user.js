// ==UserScript==
// @name          Printer Friendly Redirect
// @namespace     znerp
// @description   redirects to printer friendly pages if it can find one
// @include       http://*
// ==/UserScript==

/* Set this value to false if you want a smaller printer icon.
 * If you're not bothered, it's not too offensive as it is.
**/
var largerImage = true;

/* If you still don't think it's big enough, change this value
 * to something larger!
**/
var largerSize = 17;

function doredirect() {
  var allLinks = document.links;
  if (document.location.href.match("print") == null) {
    for (var i = allLinks.length - 1; i >= 0; i--) {
      if (allLinks[i].href.match("print.html") ||
          allLinks[i].href.match("print.shtml") ||
          allLinks[i].href.match("print/") ||
          allLinks[i].href.match("/printer_friendly_story/") ||
          allLinks[i].href.match("/print?") ||
          allLinks[i].href.match("type=printable") ||
          allLinks[i].href.match("v-print/") ||
          allLinks[i].href.match("=print") ||
          allLinks[i].href.match("print=") ||
          allLinks[i].href.match("mode=PF") ||
          allLinks[i].href.match("/pf/") ||
          allLinks[i].href.match("tag=st.util.print") ||
          allLinks[i].href.match("print_friendly") ||
          allLinks[i].href.match("print.story") ||
          allLinks[i].href.match("print=1") ||
          allLinks[i].href.match("printer=1")) {
        if (GM_getValue(window.location.host) == true) {
          GM_setValue("last redirect from", document.location.href);
          document.location.replace(allLinks[i].href);
        } else /*if (GM_getValue(window.location.host) == false)*/ {
          addPrintIcon(true);
          break;
        }//if (GM_get...
      }//if (allLin...
    }//for (var i ...
  }//if (docume...
}//function doredirect()

function toggletrue () {
  GM_setValue(window.location.host, true);
  doredirect();
}//function toggletrue()

function togglefalse () {
  GM_setValue(window.location.host, false);
  document.location.replace(GM_getValue("last redirect from"));
}//function togglefalse()

function addPrintIcon (bool) {
  var topdiv = document.createElement("div");
  topdiv.setAttribute('style','position:absolute !important;');
  img = document.createElement("img");
  img.style.cursor = "pointer";
  img.setAttribute("src", "data:image/gif,GIF89a%0C%00%0C%00%D53%00%B4%CC%FE%9C%A8%FF%BB%D5%FEip%CEjq%CE%B1%C8%FF%8F%AE%F0%8D%AD%F0%"+
                          "C3%DE%FD%BF%D9%FEs%80%D7%C2%DD%FD%B8%D1%FD%8A%A7%EDt%83%D8%88%A5%EB%8B%A9%EDny%D2%7B%8E%DE%84%9D%E7y%8A%D"+
                          "C%B1%C9%FE%80%96%E3%C5%E1%FC%BC%D5%FDo%7B%D4q~%D5%FF%FF%FF%B5%CC%FE%8F%B0%F2%7C%90%E0%85%A0%E8jt%CF%90%B1"+
                          "%F2%81%98%E4%C0%DA%FE%B8%D0%FE%C2%DE%FD%B8%D1%FE%7D%93%E1%8C%AB%EF%AF%C5%FFv%85%DA%87%A3%E9ku%D0w%88%DB%8"+
                          "3%9B%E6%CA%E7%FC%E6%ED%F6%7C%91%E0CK%B1%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00"+
                          "%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%003%00%2C%00%00%00%00%0C%00%0C%00%00%06T"+
                          "%C0%D9%2CF%2C%0A%8F%C3%D7%EBR%8A!%85%B1W%60%910%1E%A3%88%91%80%01p%5E%A5%02%12%A0%E0%85%BE0%26N%25U%9E%C1"+
                          "%DE%F0%B7PF%AF%DB%EB%A1C%E3%23%F2%B4%14%11%20t%1D(%0F%13%16%12*%1A%1B%04t%06%10%2B.\'%14%0E%19%2C%03w%99t"+
                          "A%00%3B");
  img.setAttribute("title", (bool ? "R" : "Don't r") + "edirect to print-friendly page in future");
  img.setAttribute("style", "position: fixed; top: 3px; right: 3px; z-index: 1337 !important;");
  if (largerImage) img.setAttribute("width", largerSize + "px");
  img.addEventListener('click',bool ? toggletrue : togglefalse,false);
  topdiv.appendChild(img);
  document.body.insertBefore(topdiv, document.body.firstChild);
}//function addPrintIcon(bool)

doredirect();
if (GM_getValue(document.location.host)) {
  if (document.location.href.match("print")) {
    addPrintIcon(false);
  }//if (docume...
}//if (GM_get...