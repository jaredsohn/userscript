// ==UserScript==
// @name           Moar Labeller
// @version        1.3.37.2
// @include        http://*.forumwarz.com/characters/me
// @include        http://forumwarz.com/characters/me
// ==/UserScript==

$ = unsafeWindow["window"].$;
$$ = unsafeWindow["window"].$$;
$H = unsafeWindow["window"].$H;
Element = unsafeWindow["window"].Element;

function showMoarID() {
  var filenameTH = $$("#moar_files th")[0];
  if (!filenameTH) return false;
  var idTH = Element("th").update("ID");
  filenameTH.insert({ "before": idTH });
  $$("#moar_files td").each(function(row) {
    var match = /extract_(\d+)/gi.exec(row.id);
    if (!match) return false;
    var moarID = parseInt(match[1]);
    var newRow = Element("td").update(moarID);
    if (moarID > 260) newRow.setStyle({ "backgroundColor": "#ffff00" });
    row.up().insert({ "top": newRow });
  });
  return false;
}

var moarLink = Element("a", { "href": "#" }).update("moar");
moarLink.onclick = showMoarID;
var vag = Element("div", { "style": "font-size: 14px; font-weight: bold; padding: 5px 0 2px 25px" });
vag.insert({ "top": moarLink });
var peen = $$("div.peen")[0];
peen.up().insert({ "bottom": vag });
