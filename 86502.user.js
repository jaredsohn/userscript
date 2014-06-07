// ==UserScript==
// @name           delete event handlers in tweets
// @revision       2
// @author         KID a.k.a. blueberrystream
// @description    onMouseOverやらstyleやらで遊んでるpostをアレします。
// @namespace      http://kid0725.usamimi.info
// @include        http*://twitter.com/*
// ==/UserScript==

void(function() {


var deleteFunction = function() {
  var i, j, k, as, className, entryContents = document.getElementsByClassName("entry-content"), eventHandlerNames;

  eventHandlerNames = ["onload", "onunload", "onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onmousemove", "ondblclick", "onmousewheel", "onkeypress", "onkeydown", "onkeyup", "onfocus", "onblur", "onselect", "onchange", "onready", "oncut", "oncopy", "onpaste", "style"];

  for (i = 0; i < entryContents.length; i++) {
    as = entryContents[i].getElementsByTagName("a");
    if (as == null || as == undefined || as.length == 0) {
      continue;
    } else {
      for (j = 0; j < as.length; j++) {
        for (k = 0; k < eventHandlerNames.length; k++) {
          as[j].setAttribute(eventHandlerNames[k], "");
        }
        className = as[j].getAttribute("class").split("modal-overlay").join("");
        as[j].setAttribute("class", className);
      }
    }
  }
};
setInterval(deleteFunction, 100);

})();
