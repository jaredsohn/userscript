// ==UserScript==
// @name           Argyle Highlanders Staff Season 13
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==

$(document).ready(function(){



    var playerid = new Array;
    var playertitle = new Array;
    playerid.push('184633');        // Maristfan
    playertitle.push('Team Owner');

    playerid.push('');   // Co-Owner
    playertitle.push('Co-Owner');

    playerid.push('288978');   // Flipp
    playertitle.push('Offensive Coordinator');
    playerid.push('101532');   // Adamaz 80
    playertitle.push('Defensive Coordinator');
    playerid.push('332130');   // Recnep
    playertitle.push('Special Teams Coach');
    playerid.push('184633');    // Maristfan
    playertitle.push('Head of Finances');
    playerid.push('');    // Blacklist Member
    playertitle.push('Blacklist Member');
    playerid.push('');    // Head Coach
    playertitle.push('Head Coach');
    playerid.push('267273');   // massd78
    playertitle.push('Recruiter');
    playerid.push('363304');   // Herky1
    playertitle.push('Scout');

    $('div[class="post_user"]').each(function(i){
        for (var q=0;q<playerid.length;q++) {
            var querysize = $('a[href="/game/home.pl?user_id='+playerid[q]+'"]', $(this)).size()
            if (querysize > 0) {
                var newdiv = document.createElement('div');
                newdiv.setAttribute('class','user_name');
                var newtext = document.createTextNode(playertitle[q]);
                newdiv.appendChild(newtext);
                newdiv.innerHTML = '<b>' + newdiv.innerHTML + '</b>';
                $('div[class="user_name"]',$(this)).before(newdiv);
                break;
            }
        }
    })

})