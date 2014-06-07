// ==UserScript==
// @name           Starting Lineup to Matchup Page
// @namespace      GLB
// @author         DDCUnderground
// @description    Will display starting lineups to matchup page instead of Top Players.
// @include        http://goallineblitz.com/game/compare_teams.pl?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==// 
// 


$(document).ready(function(){

// get team ids
var cururl = window.location.href;
var team1 = cururl.substring(cururl.indexOf('team1=')+6,cururl.indexOf('&'));
var team2 = cururl.substring(cururl.indexOf('team2=')+6);
// change header
$('div[class="medium_head"]').each(function(i){
    if ($(this).text()=='Top Player Threats') {
        $(this).html('Staring Lineups');
    }
})
  
$.get("http://goallineblitz.com/game/team.pl?team_id="+team1,function(returned_data){

    var newhtml = $('#starters',returned_data).html();
    $('div[class="top_players"]:first').html(newhtml);

})

$.get("http://goallineblitz.com/game/team.pl?team_id="+team2,function(returned_data){

    var newhtml = $('#starters',returned_data).html();
    $('div[class="top_players"]:last').html(newhtml);

})


})
