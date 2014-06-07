// ==UserScript==
// @name       Yahoo Can't Cut List Formatter
// @namespace  YahooFantasyFootball
// @author     JamesSwift
// @version    1.5
// @description  Scrapes the can't cut list on yahoo and produces a formatted list of which teams have the most players on the list.
// @match      http://football.fantasysports.yahoo.com/*/cantcutlist
// @require    http:/ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @copyright  2012+
// ==/UserScript==



  ///////////////////
 // Screen Scrape //
///////////////////

var table_rows = document.querySelectorAll("tr.odd, tr.even");
var player_name = "";
var owner_name = "";
var owned_players_dict = {};
var owned_count_dict = {};

for( var i in table_rows ) {
    try {
        player_name = table_rows[i].firstChild.firstChild.innerText.slice(0,-1); // Yahoo adds a space at the end for some reason...
        owner_name = table_rows[i].lastElementChild.innerText;
        
        // Add the player to the owned players of their respective owner
        if( owned_players_dict.hasOwnProperty(owner_name) ) {
            owned_players_dict[owner_name].push(player_name);
        } else {
            owned_players_dict[owner_name] = [player_name];
        }
        
        // Increment the count of owned players for the respective owner
        if( owned_count_dict.hasOwnProperty(owner_name) ) {
            owned_count_dict[owner_name] += 1;
        } else {
            owned_count_dict[owner_name] = 1;
        }
    } catch (e) {
        // For-in fix? For-in cycles too many times for some reason
    }
}

// Convert and sort the counts dict based on the number of owned players
sorted_owner_counts = [];
for( var owner in owned_count_dict ) {
    sorted_owner_counts.push([owner, owned_count_dict[owner]]);
}
sorted_owner_counts.sort(function(a,b){return b[1]-a[1]}); // Descending order

  /////////////////////////////////////
 // Build and insert our DOM object //
/////////////////////////////////////

var team_arr = []; // save elements for later

var results_toggle = document.createElement("div");
results_toggle.setAttribute("id", "results_toggle");
results_toggle.setAttribute("style", "color:red;");
results_toggle.textContent = "[click to toggle summary]";

var results_div = document.createElement("div");
results_div.setAttribute("id", "results_div");

for( var i in sorted_owner_counts ) {
  var team_div = document.createElement("div");
  team_div.setAttribute("id", "team_"+i);
  team_div.setAttribute("style", "line-height:1.35;");
  team_div.textContent = sorted_owner_counts[i][0] + ": " + sorted_owner_counts[i][1] + "    [show]";
  team_arr.push(team_div);
  
  results_div.appendChild(team_div);
  
  // [Example entry]
  // Jimmys Team: 6
  //     Victor Cruz
  //     Another Guy
  var players_div = document.createElement("div");
  players_div.setAttribute("id", "players_"+i);
  
  // Append the player names with <br /> tags separating them
  for( var j in owned_players_dict[sorted_owner_counts[i][0]] ) {
    var player_span = document.createElement("span");
    player_span.setAttribute("style", "position:relative; left:50px;");
    player_span.textContent = owned_players_dict[sorted_owner_counts[i][0]][j];
                                                 
    players_div.appendChild(player_span);
    players_div.appendChild(document.createElement("br"));
  }
  
  results_div.appendChild(players_div);
}

var my_wrapper = document.createElement("div");
my_wrapper.appendChild(results_toggle);
my_wrapper.appendChild(results_div);
my_wrapper.appendChild(document.createElement("br"));

var the_table = document.querySelector(".teamtable");
var yahoo_main_content_body = document.getElementById("yspmain");
yahoo_main_content_body.insertBefore(my_wrapper, the_table);

$res_div = $(results_div);
$res_div.hide();
$("div[id^='players_']").hide();

results_toggle.onclick = function(e) {
    $res_div.toggle();
};

$(team_arr).click( function(e) {
  var team_num = e.target.id.slice(5);
  $("#players_"+team_num).toggle();
});