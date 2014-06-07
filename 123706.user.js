// ==UserScript==
// @id             qlrostersorter@phob.net
// @name           Quake Live Roster Sorter
// @version        0.37
// @namespace      phob.net
// @author         wn
// @description    Keep "Quake Live Chat" sorted by player name.
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/123706.meta.js
// ==/UserScript==

/**
 * Evaluate code in the page context.
 * Source: http://wiki.greasespot.net/Content_Script_Injection
 */
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval(function() {
  alert("Roster sorting has been corrected on quakelive.com.\n"
        "Please disable/remove Quake Live Roster Sorter.");
  return;

  // RosterItem's UI_PlaceInGroup always appends the new item to the list,
  // so we grab the last item and find its proper position by comparing the
  // player names (the text node under ".player_name").
  quakelive.mod_friends.UI_SortRoster = function(groupType) {
    var $items = $("#im-" + groupType + " > div.itemlist > div.rosteritem")
      , $newItem
      , newName;

    if ($items.length < 2) {
      return;
    }

    $newItem = $items.last();
    newName = $newItem.find("span.rosteritem-name > span.player_name").contents().filter(function(){return this.nodeType == 3}).text().toLowerCase();

    $items.each(function() {
      if (newName < $(this).find("span.rosteritem-name > span.player_name").contents().filter(function(){return this.nodeType == 3}).text().toLowerCase()) {
        $newItem.insertBefore($(this));
        return false;
      }
    });
  }
});
