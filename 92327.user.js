// ==UserScript==
// @name         Paste And Go
// @namespace    http://www.xuldev.org/
// @description  Adds 'Paste and Go' menu to the context menu in Location bar.
// @include      main
// @author       Gomita
// @version      1.0.20081010
// @homepage     http://www.xuldev.org/misc/ucjs.php
// ==/UserScript==

document.getElementById("urlbar").addEventListener("popupshowing", function(event) {
const eltID = "pasteandgo-menuitem";
var menupopup = event.originalTarget;
var refChild = menupopup.getElementsByAttribute("cmd", "cmd_paste")[0];
var canPaste = refChild.getAttribute("disabled") == "true";
var menuitem = document.getElementById(eltID);
if (!menuitem) {
var pasteAndGo = function(event) {
goDoCommand("cmd_paste");
if (typeof(handleURLBarCommand) == "undefined") {
  gURLBar.handleCommand(event); //Firefox 3.1+
    }
    else{
  handleURLBarCommand(event);
  }
menupopup.hidePopup();
};
menuitem = document.createElement("menuitem");
menuitem.id = eltID;
menuitem.setAttribute("label", "\u7C98\u8D34\u5E76\u8F6C\u5230");
menuitem.setAttribute("accesskey", "G");
menuitem.addEventListener("command", pasteAndGo, false);
menupopup.insertBefore(menuitem, refChild.nextSibling);
}
menuitem.setAttribute("disabled", canPaste.toString());
}, false);
