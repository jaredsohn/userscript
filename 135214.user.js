// ==UserScript==
// @name     Add new options at select points
// @include  http://play.pokemonshowdown.com/*
// @include  *pokemonshowdown.com*
// @include  http://play.pokemonshowdown.com/~~fearon-ps.herokuapp.com:80/lobby
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var selectNode  = $("#lobby-format");

selectNode  .find ("option[value='nu']")
            .after ('<option value="pu">PU (unrated)</option>');

selectNode  .find ("option[value='lc']")
            .after ('<option value="bwcup">BW Cup (unrated)</option>');
