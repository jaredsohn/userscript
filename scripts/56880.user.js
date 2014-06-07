// ==UserScript==
// @name           GLB Replace Watch Link
// @namespace      GLB
// @description    GLB Replace Watch Link to take you straight to first play
// @include        http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


$(document).ready(function(){
    
    function PullFirstPlay(gameid){
        $.get(gameid,function(return_data){
            var firstpbp = $('td[class="pbp_replay"]:first',return_data);
            var firstlink = $('a:first',firstpbp).attr('href');
            for (var j=0;j<watchlinksarr.length;j++) {
                if (watchlinksarr[j][1] == gameid) {
                    watchlinksarr[j][2] = firstlink;
                }
            }
            loopcount = loopcount - 1;
            if (loopcount==0) {
                $('div[id*="watch_team_"],div[id*="watch_gm_"],div[id*="watch_player_"]').each(function(z){
                    var gamelink = $('a:first',(this)).attr('href');
                    for (var q=0;q<watchlinksarr.length;q++) {
                        if (watchlinksarr[q][1]==gamelink) {
                            $('a:first',(this)).attr('href',watchlinksarr[q][2]);
                        }
                    }
                })
                alert('Links Replaced Successfully.');
            }
        })
    }
    function value(a,b) {
        var ahold =a[1];
        var bhold =b[1];
        a=ahold;
        b=bhold;
        return a == b ? 0 : (a < b ? -1 : 1)
    }
    
    function startprocess(){
    
        //pull watch items by div id
        //watch_team_
        //watch_gm_
        //watch_player_
        $('#tab_watch').hide();
        $('div[id*="watch_team_"],div[id*="watch_gm_"],div[id*="watch_player_"]').each(function(i){
            watchlinksarr[i] = new Array;
            var gamelink = $('a:first',(this)).attr('href');
            watchlinksarr[i][0] = i;
            watchlinksarr[i][1] = gamelink;
            watchlinksarr[i][2] = '';
        })

        watchlinksarr.sort(value);
    
        var pulllinks = new Array;
        pullhold = '';
        for (var t=0;t<watchlinksarr.length;t++) {
            if (pullhold != watchlinksarr[t][1]){
                pulllinks.push(watchlinksarr[t][1]);
            }
            pullhold = watchlinksarr[t][1];
        }
        loopcount = pulllinks.length;
        for (var z=0;z<pulllinks.length;z++) {
            PullFirstPlay(pulllinks[z]);
        }
    // buffer all PBP into divs on hp
    // change links
    }
    
    
    
    var loadlinks = document.createElement('div');
    loadlinks.setAttribute('id', 'tab_watch');
    loadlinks.setAttribute('class', 'subtab_off');
    //loadlinks.setAttribute('style', 'display: none;');
    var watchclick = document.createElement('a');
    watchclick.setAttribute('href','javascript:;');
    linkitemtextnode = document.createTextNode('Replace Watch Link');
    watchclick.appendChild(linkitemtextnode);
    loadlinks.appendChild(watchclick);
    $('ul[id="tabs"]').append(loadlinks);
    $('#tab_watch').bind('click', startprocess, false);
    var watchlinksarr = new Array;
    var watchdivs, loopcount;

})
