// ==UserScript==
// @name           Veikkaus LastToFirst
// @namespace      maeki.org
// @description    Show last game result on top of the page
// @include        https://www.veikkaus.fi/fi/omatpelit
// @require        https://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==

var done = "false";

function doChanges() {
  GM_log("doChanges()");
  var seeker = $('div.specificInfo')[0];
  seeker = seeker.previousSibling;
  while(seeker.nodeName != "H4" || seeker.className != "")
    seeker = seeker.previousSibling;
  newNode = document.createElement("div");
  while (seeker.className != "nextDrawSeparator") {
    $(seeker).clone(true).appendTo(newNode);
    seeker = seeker.nextSibling;
  }
  $(newNode).prependTo($("h4")[0]);
}

function process(evt) {
  if($("div.accordionItemContentBg")[0].style["display"] == "none") {
    GM_log("process()");
    GM_log(done);
    if(done == "false") {
      setTimeout(doChanges, 1000);
    }
    }
    done = "true";
  }
}

window.addEventListener("DOMAttrModified", process, false);
