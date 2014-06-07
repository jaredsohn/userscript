// ==UserScript==
// @name        Quake Live QLStats Race Leader Boards
// @id          465415
// @version     1.1
// @author      PredatH0r
// @contributors Rulex
// @description	Show separate leader boards for PQL/VQL with/without weapons and option to list all maps for a specific user
// @include     http://*.quakelive.com/*
// @exclude     http://*.quakelive.com/forum*
// ==/UserScript==

/*

This script modifies the "Community / Race Leaders" page inside the Quake Live UI and adds links to alternative leader boards for 
- PQL with weapons
- PQL strafe only
- VQL with weapons
- VQL strafe only
and provides an overview of a player's top-scores on all maps.

Data is taken from Rulex' QLStats database hosted on http://ql.leeto.fi/
Big thanks to Rulex for providing the data and making the necessary API changes to enable the race leader boards.

Version 1.1
- added leader and top score to "All maps" view

Version 1.0
- first public release

*/

(function () {
  var API_URL = "http://ql.leeto.fi/";
  //var API_URL = "http://127.0.0.1:8585/";

  var oldShowBoard;
  var mode = -2;
  var updateBusy = false;

  function init() {
    addStyle(
      "#raceBoardLinks { color: white; padding: 3px 10px; font-size: 14px; }",
      "#raceBoardLinks a { color: white; font-size: 14px; text-decoration: underline; }",
      "#raceBoardLinks a.active { color: #FF4422; }",
      "#raceBoardLinks input { margin-left: 15px; margin-right: 4px; margin-top: 1px; }",
      "#raceBoardUpdate { float: right; margin-right: 10px; }",
      "#raceBoardUpdate input[type=text] { height: 22px; width: 150px; padding: 0 4px; }",
      "#raceBoardUpdate input[type=button] { height: 22px; width: 100px; margin-left: 5px; cursor: pointer; }",
      ".raceBoardYourScore { font-size: 18pt; font-weight: normal; text-align: right; padding-right: 10px; margin-top: 5px; }", 
      ".raceBoardYourScoreSmall { font-size: 14pt; font-weight: normal; text-align: right; padding-right: 10px; }",
      ".raceBoardLeaderScore { font-size: 10pt; font-weight: normal; text-align: right; padding-right: 10px; }"
    );

    oldShowBoard = quakelive.mod_race.ShowBoard;
    quakelive.mod_race.ShowBoard = showOfficialBoard;
    quakelive.AddHook("OnContentLoaded", onContentLoaded);
    onContentLoaded();
  }

  function addStyle(/*...*/) {
    var css = "";
    for (var i = 0; i < arguments.length; i++)
      css += "\n" + arguments[i];
    $("head").append("<style>" + css + "\n</style>");
  }

  function onContentLoaded() {
    var $racedesc = $("#mod_race #header .racedesc");
    $racedesc.css("padding-bottom", "7px");
    $racedesc.after("<div id='raceBoardLinks'>" +
      "<a href='javascript:void(0)' data-mode='-1' class='active'>Official QL Ranking</a> | QLStats: " +
      "<a href='javascript:void(0)' data-mode='0'>PQL Weapons</a> | " +
      "<a href='javascript:void(0)' data-mode='1'>PQL Strafe</a> | " +
      "<a href='javascript:void(0)' data-mode='2'>VQL Weapons</a> | " +
      "<a href='javascript:void(0)' data-mode='3'>VQL Strafe</a> " +
      "<input type='checkbox' id='raceBoardJustMe'><label for='raceBoardJustMe'>All maps</label>" +
      "</div>");
    $("#mapchooser").parent().prepend(
      "<div id='raceBoardUpdate'>Force update of QLStats database:" +
      "<br><input type='text' id='raceBoardUpdateNickname' value='" + quakelive.username + "'><input type='button' id='raceBoardUpdateButton' value='Update player'></div>");
    $("#raceBoardLinks a").click(function () {
      mode = $(this).data("mode");
      updateHighlight();
      if (mode == -1)
        $("#raceBoardJustMe").attr("checked", false);
      showQlstatsBoard(mode);
    });
    $("#raceBoardLinks input").click(showQlstatsBoard);
    $("#raceBoardUpdate input:button").click(updateQlstats);
    $("#mod_race .scores").data("fill-height", "350"); // enable auto-sizing through extraQL
  }

  function updateHighlight() {
    $("#raceBoardLinks a.active").removeClass("active");
    if (mode >= -1)
      $("#raceBoardLinks a:eq(" + (mode + 1) + ")").addClass("active");
  }

  function updateQlstats() {
    if (updateBusy)
      return;
    var player = $("#raceBoardUpdateNickname").val();
    if (!player)
      return;
    updateBusy = true;
    $("#raceBoardUpdateButton").val("Updating...").attr("disabled", true);
    $.ajax({
      url: API_URL + "api/players/" + encodeURIComponent(player) + "/update",
      dataType: "jsonp",
      success: function () {
        $("#raceBoardUpdateButton").val("Update player").attr("disabled", false);
         showQlstatsBoard();
      },
      error: function() {
        $("#raceBoardUpdateButton").val("Update failed").attr("disabled", false);
      },
      complete: function() {
        updateBusy = false;
      }
    });
  }

  function showOfficialBoard(map) {
    oldShowBoard.call(quakelive.mod_race, map);
    mode = -1;
    updateHighlight();
    $("#raceBoardJustMe").attr("checked", false);
  }

  function showQlstatsBoard() {
    var justMe = $("#raceBoardJustMe").attr("checked");
    if (justMe && mode < 0) {
      mode = 0;
      updateHighlight();
    }
    if (mode == -1) {
      $("#mapchooser").trigger("change");
      return;
    }
    var map = $("#mapchooser").val();
    var url = API_URL;
    url += justMe ? "api/race/players/" + quakelive.username : "api/race/maps/" + map;
    url += "?ruleset=" + ((mode & 2) ? "vql" : "pql");
    url += "&weapons=" + ((mode & 1) ? "off" : "on");
    url += "&limit=100";
    url += "&player=" + quakelive.username;
    $.ajax({
      url: url,
      dataType: "jsonp",
      success: function(data) { fillBoard(data, justMe); },
      error: function() { fillBoard(); }
    });
  }

  function fillBoard(data, justMe) {
    var $scores = $("#mod_race .scores");
    $scores.empty();

    if (!data || !data.data || !data.data.scores) {
      $scores.text("Could not load data");
      return;
    }

    var playerIndex = -1;
    var html = "";
    $.each(data.data.scores, function (i, pb) {
      html += renderScore(pb, false, justMe);
      if (pb.PLAYER_NICK == quakelive.username)
        playerIndex = i;
    });
    $scores.append(html);

    html = "";
    var $pb = $("#mod_race .personalbest");
    $pb.empty();
    if (playerIndex >= 0 && !justMe)
      html += renderScore(data.data.scores[playerIndex], true, justMe);
    $pb.append(html);
  }
  
  function renderScore(pb, personal, justMe) {
    var medal = personal ? " personalscore" : pb.RANK == 1 ? " gold" : pb.RANK == 2 ? " silver" : pb.RANK == 3 ? " bronze" : "";
    var html = "";
    var descr;
    var leaderInfo = "";
    var scoreStyle = "raceBoardYourScore";
    if (justMe) {
      html += "<a href='/#!race/" + pb.MAP + "/" + pb.PUBLIC_ID + "/race/1'>";
      descr = pb.MAP;
      if (pb.LEADER_SCORE)
        leaderInfo = "    <div class='datetime raceBoardLeaderScore'>" + pb.LEADER_NICK + ": " + formatScore(pb.LEADER_SCORE) + "</div>";
      scoreStyle = "raceBoardYourScoreSmall";
    } else {
      html += "<a href='/#!profile/summary/" + pb.PLAYER_NICK + "/" + pb.PUBLIC_ID + "/race/1'>";
      descr = pb.PLAYER_NICK;
    }
    html += "<div class='racer" + medal + "'>";
    html += "  <div class='playericon'></div>";
    html += "  <div class='name'>" + pb.RANK + ". <span class='clan'></span> " + descr + " ";
    html += "    <div class='datetime'>" + window.formatDate(new Date(pb.GAME_TIMESTAMP), 'yyyy-MM-dd HH:mm') + "</div>";
    html += "  </div>";
    html += "  <div class='name fr'>";
    html += "    <div class='" + scoreStyle + "'>" + formatScore(pb.SCORE) + "</div>";
    html += leaderInfo;
    html += "  </div>";
    html += "</div>";
    html += "</a>";
    return html;
  }

  function formatScore(score) {
    if (!score) return "";
    if (!score.substring) score = score.toString();
    return score.substring(0, score.length - 3) + "." + score.slice(-3);
  }

  init();
})();