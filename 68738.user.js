// ==UserScript==
// @name           Overall Stat Number on team page/Update
// @namespace      DDCUnderground - Greasemonkey
// @description    
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==




$(document).ready( function() {

    var teamids = new Array;
    var teamcomplete = new Array;
    var curteamid = $('a:first','#tab_profile').attr('href');
    curteamid = curteamid.substring(curteamid.indexOf('team_id=')+8)
    
    $('table[class="schedule_content"]').each(function(i){
        // set header row info
        var headcell = document.createElement('td');
        //headcell.setAttribute('class','schedule_score');
        headcell.innerHTML='Spread';
        $('td[class="schedule_opponent"]').removeClass("schedule_opponent");
        $('tr[class="nonalternating_color"]', $(this)).each(function(t){
            $('td[class="schedule_score"]:first',$(this)).before(headcell);
        })
        // get each game link
        $('a[href*="/game/team.pl?team_id="]', $(this)).each(function(z){
            var teamlink = $(this).attr('href');
            teamids.push(teamlink.substring(teamlink.indexOf('team_id=')+8));
            teamcomplete.push('0');
        })
        // get matchup info
        var countdown = teamids.length;
        for (var zz=0;zz<teamids.length;zz++) {
            $.get("http://goallineblitz.com/game/compare_teams.pl?team1=" + curteamid + "&team2=" + teamids[zz], function(returned_data){
                var team1 = 0;
                var team2 = 0;
                var team2id = 0;
                $('div[class="team_content"]',returned_data).each(function(z){
                   if (z==0) {
                       team1=$('div[class*="rating_bar_fill"]:first',$(this)).text();
                   }else{
                       team2=$('div[class*="rating_bar_fill"]:first',$(this)).text();
                       team2id = $('a[href*="/game/team.pl?team_id="]',$(this)).attr('href');
                       team2id = team2id.substring(team2id.indexOf("/game/team.pl?team_id=")+22);
                   }
                })
                var spreadcell = document.createElement('td');
                var spreaditem = parseInt(team1) - parseInt(team2);
                if (spreaditem>0) {
                    spreaditem = '+'+spreaditem;
                }
                for (var jj=0;jj<teamids.length;jj++) {
                    if (teamids[jj]==team2id) {
                        if (teamcomplete[jj]=='0') {
                            // insert into table
                            teamcomplete[jj]='1';
                            spreadcell.innerHTML = '(' + team2 + ')(' + spreaditem + ')';
                            var parobj = $('a[href="/game/team.pl?team_id=' + team2id + '"]:first').parent().text();
                            if (parobj.indexOf(' (R)')==-1) {
                                $('a[href="/game/team.pl?team_id=' + team2id + '"]:first').parent().after(spreadcell);
                            }else{
                                $('a[href="/game/team.pl?team_id=' + team2id + '"]:first').parent().parent().after(spreadcell);
                            }
                        }
                    }
                }
            })
        }

    })
})