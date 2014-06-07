// ==UserScript==
// @name                        Kronos related
// @namespace                   Lord Script
// @description                 Based on Kronos.
// @author                      Lord1982
// ==/UserScript==

revision("$Revision$");

function augmentIkaFight() {
  if (location.hostname != "ikariamlibrary.com") return;
  css("@import url('http://hacks.ecmanaut.googlepages.com/IkaFight9.css');");
  var specs = (location.hash||"#").slice(1);
  if (window != top) {
    document.body.style.background = "none";
    if (specs)
      window.name = specs;
    else
      specs = window.name;
  }
  var args = urlParse(null, specs);
  for (var n in args) {
    if (integer(n) == n) {
      var stats = args[n].split(".");
      location.href = "javascript:void ikaFightAPI_updateAttackerUnit("+ n +","+
        (stats.slice(0,3).join(",")) + ")";
      if (stats.length < 4) continue;
      location.href = "javascript:void ikaFightAPI_updateDefenderUnit("+ n +","+
        (stats.slice(3,6).join(",")) + ")";
    }
  }
  location.href = "javascript:void ikaFightAPI_updateTownDetails(" +
    (args.spy || "0") +","+ (args.breech || "0") +","+
    (args.town || "0") +","+ (args.wall || "0") +");";
  scrollWheelable($x('//input[@type="text"]'));
}
