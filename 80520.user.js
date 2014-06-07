// ==UserScript==
// @name           Remove hsbc.fi.cr keyboard block.
// @namespace      http://carlosz.com
// @include        https://www.hsbc.fi.cr/hsbcenlinea/login.asp
// ==/UserScript==

function removeHandlers() {
  var pageBody = document.getElementsByTagName("body")[0];
  if (pageBody.getAttribute("onkeypress")) {
    pageBody.setAttribute("onkeypress", null);
  }
  // Can't use document.setAttribute("<event_name>", null) because the document object doesn't
  // have a setAttribute function.
  unsafeWindow.document.onmousedown = null;
  unsafeWindow.document.onmouseup = null;
  unsafeWindow.document.oncontextmenu = null;
  unsafeWindow.document.onclick = null;
}

window.setTimeout(removeHandlers, 1000);