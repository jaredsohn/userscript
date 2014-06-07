// ==UserScript==
// @name           GLB Position and Level to EquipFund
// @namespace      GLB
// @include        http://goallineblitz.com/game/team_item_fund.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==


$(document).ready(function(){
    
    var playerslist = new Array
    $('a[href*="/game/player.pl?player_id="]','#allowances').each(function(i){
        playerslist[i] = new Array;
        playerslist[i][0] = $(this).attr('href');
        playerslist[i][0] = playerslist[i][0].substring(playerslist[i][0].indexOf('/game/player.pl?player_id=')+26);
        playerslist[i][1] = '';
        playerslist[i][2] = 0;
    })
    
    var cururl = window.location.href;
    var teamid = cururl.substring(cururl.indexOf('team_id=')+8);
    
    $.get("http://goallineblitz.com/game/roster.pl?team_id="+teamid,function(returned_data){
        $('tr[class="alternating_color1"],tr[class="alternating_color2"]',returned_data).each(function(z){
            var curplayerid = $('a[href*="/game/player.pl?player_id="]:first',$(this)).attr('href');
            curplayerid = curplayerid.substring(curplayerid.indexOf('player_id=')+10);
            for (var t=0;t<playerslist.length;t++) {
                if (playerslist[t][0]==curplayerid) {
                    playerslist[t][1] = $('td[class="player_position"]',$(this)).text();
                    playerslist[t][2] = $('td[class="player_level"]',$(this)).text();
                }
            }
        })
        $('a[href*="/game/player.pl?player_id="]','#allowances').each(function(j){
            $(this).parent().append('('+playerslist[j][1]+')('+playerslist[j][2]+')');
        })
    
    })
    

})
