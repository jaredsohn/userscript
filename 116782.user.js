// ==UserScript==
// @name           yahoo football pickem live updates
// @namespace      football.fantasysports.yahoo.com
// @description    Don't wait til the action is (completely) over
// @include        http://football.fantasysports.yahoo.com/pickem/*/weeklyperformance
// @author         Jim Halberg
// ==/UserScript==

var YahooFootballPickemLiveUpdates = {
  update_player_score: function(url_for_player_page, stats_cells_for_player){
    var request = new XMLHttpRequest();
    request.open('GET', url_for_player_page, true);
    request.onreadystatechange = function (an_event){
      if(request.readyState == 4){
        if(request.status == 200){
          var score_regex = /<td class="score".*>(\d+)/
          var score_result = score_regex.exec(request.responseText);

          var current_week_regex = /<li class="selected"><a.*><span>(\d+)/
          var current_week_result = current_week_regex.exec(request.responseText);

          var current_week = parseInt(current_week_result[1]);
          var cell_for_current_score = stats_cells_for_player[current_week - 1];

          cell_for_current_score.style.fontWeight = "bold";
          cell_for_current_score.style.backgroundColor = "#C0C9EC";
          cell_for_current_score.style.color = "black";
          cell_for_current_score.style.fontStyle = "italic";
          cell_for_current_score.style.fontSize = "1.1em";
          cell_for_current_score.style.paddingLeft = '2px'
          cell_for_current_score.innerHTML = score_result[1];
        }
      }
    };
    request.send(null);
  }
}

var player_rows = document.getElementById("ysf-weeklyperformance").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
for(var x = 0; x < player_rows.length; x++){
  var player_row = player_rows[x];
  var players_weekly_page = player_row.getElementsByClassName("team")[0].getElementsByTagName("a")[0].href;

  YahooFootballPickemLiveUpdates.update_player_score(players_weekly_page, player_row.getElementsByClassName("stat"));
}