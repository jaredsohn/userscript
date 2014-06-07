// ==UserScript==
// @id             qlbetterprofilejumper@phob.net
// @name           Quake Live Better Profile Jumper
// @version        1.4
// @namespace      phob.net
// @author         wn
// @description    Keeps your current Profile tab when using "Jump to profile..."
// @include        http://*.quakelive.com/*
// @exclude        http://*.quakelive.com/forum*
// @run-at         document-end
// @updateURL      https://userscripts.org/scripts/source/113249.meta.js
// ==/UserScript==


if (/offline/i.test(document.title) || window.self != window.top) {
  return;
}

quakelive.mod_profile.ProfileJumpClick = function() {
  var player_name = $("#profile_jump_input").val();
  if ("undefined" == typeof player_name) return;

  player_name = $.trim(player_name);
  if (!player_name.length) return;

  var parts = [quakelive.pathParts[0], quakelive.pathParts[1], player_name];
  if (/^\d{4}(?:-\d{2}){2}$/.test(quakelive.pathParts[3])) parts.push(quakelive.pathParts[3]);

  quakelive.Goto(parts.join("/"));
  return false;
}
