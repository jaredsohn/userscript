// ==UserScript==
// @name           Esdao Empire Status Report
// @namespace      esdao
// @description    Reports on the status of all known players
// @include        http://www.esdao.com/games/*/turn/*
// ==/UserScript==

//Assumes JQuery

var game;
var industries = new Array();
var fleet = new Array();
var empire = new Array();
var $;

function report(hexes) {
  for(var i=0; i<hexes.length; i++) {
    var hex = hexes[i];
    if (typeof hex == 'undefined' || !hex) continue;
    if (!industries[hex.player_id]) {
      industries[hex.player_id] = 0;
    }
    industries[hex.player_id] = industries[hex.player_id] + hex.ind;
    if (!fleet[hex.player_id]) {
      fleet[hex.player_id] = 0;
    }
    fleet[hex.player_id] = fleet[hex.player_id] + hex.base_ships;
    if (!empire[hex.player_id]) {
      empire[hex.player_id] = 0;
    }
    empire[hex.player_id] += 1;
  }
  
  var galaxy_report = "Lord Vader, <br/>";
  for(var i=0; i<industries.length; i++) {
    if (typeof fleet[i] == 'undefined') {
      galaxy_report = galaxy_report + game.players[i].username + " - Nothing is known";
    } else {
      galaxy_report = galaxy_report + game.players[i].username + " has " + fleet[i] + " ships and " + industries[i] + " industries in " + empire[i] + " hexes";
    }
    galaxy_report = galaxy_report + "<br/>";
  }

  $('#user_nav').after('<div id="galaxy_report" style="width: 460px;float:right;height:200px;overflow:scroll;position:relative;top:-60px;right:0px;background-color:#f99; padding: 5px 10px;">' + galaxy_report + "</div>");
  $dismiss_link = $('<a href="#">Dismiss</a>').click(function() {$('#galaxy_report').hide()});
  $('#galaxy_report').append($dismiss_link);
//  $('#galaxy_report').css('opacity', 0.6);
};

function gameOn() {
  if (typeof unsafeWindow.game == 'undefined') { window.setTimeout(gameOn, 100); }
  else {
    game_game = unsafeWindow.game;
    if (typeof game_game.hexes == 'undefined' || game_game.hexes.length < 1) { window.setTimeout(gameOn, 100); }
    else {
      $ = unsafeWindow.jQuery;
      game = game_game
      report(game.hexes);
    }
  }
}
gameOn();

