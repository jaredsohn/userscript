// ==UserScript==
// @name         xenForo - Select Permalink
// @namespace    https://userscripts.org/people/5587
// @description  Selects whole permalink-code in xenForo-boards with one click.
// @downloadURL  https://userscripts.org/scripts/source/361015.user.js
// @grant        none
// @include      http://xenforo.com/community/threads/*
// @include      http://www.xendach.de/threads/*
// @updateURL    https://userscripts.org/scripts/source/361015.meta.js
// @version      1.0.1
// @date         2014-02-09
// @creator      Arne Dieckmann (aka "Mithrandir")
// ==/UserScript==

$( document ).on( "click", "#bb_code_link_snippet,#html_link_code", function() {
  $(this).focus();
  $(this).select();
});
