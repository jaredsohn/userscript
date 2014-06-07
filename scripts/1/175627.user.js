// ==UserScript==
// @name         Graph Players and Tribe
// @version   1.0
// @include       http://ae*tribalwars.ae/*screen=info_player
// @author         Edited by Aywac
// ==/UserScript==

if(game_data.screen!="info_player"&&game_data.screen!="info_ally"){
    alert("you should go to the profile of a player or tribe to view the statistics");
    stop()
}
var id=$(location).attr("href").match(/id=([0-9]+)/)[1];
var mode=game_data.screen=="info_player"?"player":"tribe";
if($("#stats").length==0)$("h2").append("<table class=vis id=stats>\
<tr><th>Points</th><th>ODA</th><th>ODD</th></tr>\
<tr><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/hd_"+mode+"/"+id+"></td><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/oda_"+mode+"/"+id+"></td><td><img src=http://"+game_data.world+".tribalwarsmap.com/"+game_data.market+"/graph/odd_"+mode+"/"+id+"></td></tr>\
</table>");