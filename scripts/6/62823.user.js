// ==UserScript==
// @name           Nighthawks Staff Season 13
// @namespace      GLB
// @include        http://goallineblitz.com/game/forum*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-ui.googlecode.com/svn/tags/latest/ui/ui.core.js
// ==/UserScript==

$(document).ready(function(){



    var playerid = new Array;
    var playertitle = new Array;
    playerid.push('319236');        // GiantsFan23
    playertitle.push('Team Owner');

    playerid.push('4974');   // RyanReese
    playertitle.push('Co-Owner');

    playerid.push('317104');   // Big Jason
    playertitle.push('Offensive Coordinator');
    playerid.push('211384');   // Rebel4eva18
    playertitle.push('Defensive Coordinator');
    playerid.push('200343');   // Qia
    playertitle.push('Special Teams Coach');
    playerid.push('140629');    // EkimFlow
    playertitle.push('Head of Finances');
    playerid.push('243624');    // Nike0h
    playertitle.push('Blacklist Member');
    playerid.push('181858');    // Mr. Robards
    playertitle.push('Head Coach');


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
