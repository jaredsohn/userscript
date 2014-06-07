// ==UserScript==
// @name          Unfocuser
// @description	  No Autofocus on Load  
// @version 04 Nov 2010. Initial Version
// ==/UserScript==

window.addEventListener("load", function(e) {
  window.setTimeout(function() {
    var d = document.createElement("input");
    d.style.position = "absolute";
    d.style.left = "-9999px";
    d.style.top = "0";
    d.style.width = "10px";
    d.style.height = "10px";
    if (document.body.firstChild) {
      document.body.insertBefore(d, document.body.firstChild);
    }
    else {
      document.body.appendChild(d);
    }

    d.focus();
    d.parentNode.removeChild(d);
  }, 100);
}, false);

