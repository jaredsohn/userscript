// ==UserScript==
// @name           GLB Check For Open Builds
// @namespace      GLB
// @description    Checks for Open builds and returns a window with complete list and links
// @include        http://goallineblitz.com/game/home.pl
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==
$(document).ready(function(){

    
    function startcheck(){
        $('#tab_openbuilds').hide();
        $('tr[class*="alternating_color1"], tr[class*="alternating_color2"], div[class*="player_box_vet"]', $('#players')).each(function(q){
            var playerid = $('a[href*="/game/player.pl?player_id="]',$(this)).attr('href');
            runcheck(playerid);
        })
    }
    
    function runcheck(playerlink){
    
        $.get('http://goallineblitz.com' + playerlink,function(returned){
            var selvalue = $('select[name="allow_manager_view"]',returned).attr('value');
            var playername = $('div[class*="big_head"]:first', returned).text();
            var foundone = 0;
            switch (selvalue){
            case '0':
                buildslist[0].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
            case '1':
                buildslist[1].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
            case '2':
                buildslist[2].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
            case '3':
                buildslist[3].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
            case '4':
                buildslist[4].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
            case '5':
                buildslist[5].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
                foundone=1;
                break;
    
            };
            if (foundone==0) {
                 buildslist[0].push('<a href="http://goallineblitz.com' + playerlink + '" target="_blank">' + playername + '</a>');
            }
             totalcount = totalcount -1;
             if (totalcount == 0) {
                 var newwindow2 = window.open('',"Builds Viewing List", "width=600,height=1200,scrollbars=yes,resizable=yes,toolbar=no,location=no,menubar=no");
                 if (!newwindow2.opener) newwindow2.opener = self;
                 newwindow2.document.write('<font size=4><b>');
                 newwindow2.document.write('Builds found:<br>');
                 for (var t=0;t<buildslist.length;t++) {
                     switch(t){
                     case 0:
                         newwindow2.document.write('<br><i><u>Hidden from all:</i></u><br>');
                         break;
                     case 1:
                         newwindow2.document.write('<br><i><u>Owner can view:</i></u><br>');
                         break;
                     case 2:
                         newwindow2.document.write('<br><i><u>All Team members can view:</i></u><br>');
                         break;
                     case 3:
                         newwindow2.document.write('<br><i><u>Everyone can view:</i></u><br>');
                         break;
                     case 4:
                         newwindow2.document.write('<br><i><u>Team owner/coord can view</i></u><br>');
                         break;
                     case 5:
                         newwindow2.document.write('<br><i><u>All Team GMs can view</i></u><br>');
                         break;
                     }
    
                     for (var z=0; z<buildslist[t].length;z++) {
                         newwindow2.document.write(buildslist[t][z] + '<br>');
                     }
    
                 }
                 newwindow2.document.write('</font></b>');
                 }
    
        })
    }
    
    
    
    var loadcheck = document.createElement('div');
    loadcheck.setAttribute('id', 'tab_openbuilds');
    loadcheck.setAttribute('class', 'subtab_off');
    var buildclick = document.createElement('a');
    buildclick.innerHTML = 'Open Builds';
    buildclick.addEventListener('click', startcheck, false);
    loadcheck.appendChild(buildclick);
    $('ul[id="tabs"]').append(loadcheck);
    var totalcount = 0;
    var buildslist = new Array;
    buildslist[0] = new Array;
    buildslist[1] = new Array;
    buildslist[2] = new Array;
    buildslist[3] = new Array;
    buildslist[4] = new Array;
    buildslist[5] = new Array;
    
    var openbuilds = new Array;
    var totalcount = $('tr[class*="alternating_color1"], tr[class*="alternating_color2"], div[class*="player_box_vet"]', $('#players')).size();


})
