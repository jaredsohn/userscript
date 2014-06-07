// ==UserScript==
// @name        LolKing Enhanced
// @namespace   http://userscripts.org/users/SuperGouge
// @description Improvements for lolking.net
// @include     http://www.lolking.net/summoner/*/*
// @version     1.0.2
// @grant       none
// @updateURL   https://userscripts.org/scripts/source/391233.meta.js
// @downloadURL https://userscripts.org/scripts/source/391233.user.js
// ==/UserScript==

var tabsHeader = document.querySelector(".tabs3");
var rankedStatsTab = tabsHeader.querySelector("li:nth-child(3)>a");
var rankedStatsSeasonTabs = document.querySelectorAll(".ranked_stats_season_tabs>a");

window.addEventListener("load", main, false);
if (rankedStatsTab) loadStats();

function main() {
    for (var i = 0; i < rankedStatsSeasonTabs.length; i++) {
        rankedStatsSeasonTabs[i].addEventListener("click", switchStats, false);
    }
    if (rankedStatsTab) {
        rankedStatsTab.addEventListener("click", switchStats, false);
        switchStats();
    }
}

function loadStats() {
    var rankedStatsDiv = document.getElementById("ranked_stats").parentNode;
    var rankedStatsTables = rankedStatsDiv.getElementsByTagName("table");

    for (var i = 0; i < rankedStatsTables.length; i++) {
        var table = rankedStatsTables[i];
        var rows = table.querySelectorAll("tbody>tr");
        var stats = getStats(rows);
        var wins, losses, total;
        var season = rankedStatsTables[i].className.replace(/.*\bseason_(\d+)_ranked_stats\b/, "$1");
        
        if (season < 3) {
            wins = "Unknown";
            losses = "Unknown";
            total = stats[0];
        }
        else {
            wins = stats[0];
            losses = stats[1];
            total = wins + losses;
        }
        
        var seasonOverall = document.createElement("div");
        var seasonTotal = document.createElement("div");
        var seasonWinsLosses = document.createElement("div");
        
        seasonTotal.innerHTML = "<span style='font-size: 18px; color: #FFDB4C; height: 28px; text-shadow: 0 0 1px #000;'>" + total + "</span> Matches";
        seasonWinsLosses.innerHTML = "<span style='font-size: 18px; color: #6C0; height: 28px; text-shadow: 0 0 1px #000;'>" + wins + "</span> Wins";
        seasonWinsLosses.innerHTML += "&nbsp;<span style='font-size: 18px; color: #D20; height: 28px; text-shadow: 0 0 1px #000;'>" + losses + "</span> Losses";
        
        seasonOverall.className = "overall_stats";
        seasonOverall.id = "season_" + season + "_overall_stats";
        seasonOverall.style = "text-align: center; margin: 10px 0; display: none;";
        
        seasonOverall.appendChild(seasonTotal);
        seasonOverall.appendChild(seasonWinsLosses);
        
        rankedStatsDiv.parentNode.insertBefore(seasonOverall, rankedStatsDiv);
    }
}

function switchStats() {
    var selectedSeasonTab = document.querySelector(".ranked_stats_season_tabs>.selected");
    var selectedSeason = selectedSeasonTab.innerHTML.replace("Season ", "");
    var seasonOverallDivs = document.getElementsByClassName("overall_stats");
    
    for (var i = 0; i < seasonOverallDivs.length; i++) {
        var div = seasonOverallDivs[i];
        var season = div.id.replace(/season_(\d+)_overall_stats/, "$1");
        
        if (season == selectedSeason)
            div.style.display = "block";
        else
            div.style.display = "none";
    }
}

function getStats(rows) {
    var stats = [0,0];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        stats[0] += parseInt(cells[1].dataset.sortval);
        stats[1] += parseInt(cells[2].dataset.sortval);
    }
    return stats;
}
