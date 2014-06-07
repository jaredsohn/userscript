// ==UserScript==
// @name            QL Mode Switcher
// @version         1.0.1
// @include         http://*.quakelive.com/*
// @exclude         http://*.quakelive.com/forum*
// @description     Script that makes QuakeLive navigation between game types faster and user friendly.
// @author          CvX
// ==/UserScript==

if (/offline/i.test(document.title)) {
  return;
}

if (window.self !== window.top) {
  return;
}

function addStyle(aContent) {
  if (Array.isArray(aContent)) aContent = aContent.join("\n");
  var s = document.createElement("style");
  s.type = "text/css";
  s.textContent = aContent;
  document.body.appendChild(s);
}

// Add style classes used in the script
addStyle("div#qlms-block {position: absolute; top: 0px; left: 260px; padding: 3px;} "+
         "div#qlms-block span {background: gray; cursor: pointer; margin-right: 5px; padding: 4px;}");

// Attach to QL function that initializes the whole page
var oldHomeShowContent = quakelive.mod_home.ShowContent;

quakelive.mod_home.ShowContent = function (v) {

  oldHomeShowContent.call(quakelive.mod_home, v);

  $('#matchlist_header').append('<div id="qlms-block"><span id="qlms-ca">Clan Arena</span><span id="qlms-duel">Duel</span></div>');

  $('#qlms-ca').click(function() {
    quakelive.mod_home.filter.filters.state = "POPULATED";
    quakelive.mod_home.filter.filters.game_type = "4";
    quakelive.mod_home.filter.game_types = [4];
    quakelive.serverManager.FlushCache();
    quakelive.mod_home.ReloadServerList();
  });

  $('#qlms-duel').click(function() {
    quakelive.mod_home.filter.filters.state = "PRE_GAME";
    quakelive.mod_home.filter.filters.game_type = "7";
    quakelive.mod_home.filter.game_types = [1];
    quakelive.serverManager.FlushCache();
    quakelive.mod_home.ReloadServerList();
  });
};
