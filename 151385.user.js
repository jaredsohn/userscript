// nCore Spooky Hunter 2012.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Created by Sas Sam, 2012.
//
// ==UserScript==
// @name          nCore Spooky Hunter 2012.
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   Catches ALL pumpkins
// @include       https://ncore.cc/*
// @exclude       https://ncore.cc/profile.php*
// ==/UserScript==

spookyHunterResponse=document.createElement('h2');
document.body.insertBefore(spookyHunterResponse, document.getElementById("container"));
spookyHunterResponse.innerHTML="Listening...<br/>";

pushstream.onmessage = spookyHunter;

function spookyHunter(text, id, channel) {
    if(channel=='live_torrents'){
        var d=$.parseJSON(decodeURIComponent(text));
        var pid = d.id;
        var pcat = d.cat;
        var pname = stripslashes(d.name);
        pname = pname.replace(/\+/g," ",pname);
        if($.inArray(pcat, myCats)>=0){
            $("#ape-container").prepend('<div id="apeT'+pid+'" class="ape-popup"><span class="comment">Új torrent!</span><span onclick="$(\'#apeT'+pid+'\').fadeOut(\'slow\', function(){$(\'#apeT'+pid+'\').remove()});" class="ape-close">X</span><br /><a href="/torrents.php?action=details&id='+pid+'">' + pname + '</a><br /><span class="comment">' + catsName[pcat] + '</span></div>');
            setInterval("$(\'#apeT"+pid+"\').fadeOut(\'slow\', function(){$(\'#apeT"+pid+"\').remove()});", 15000);
        }
    } else if(channel=='spooky'){
        var d=$.parseJSON(decodeURIComponent(text));
        var sid = d.sid;
        var salt = d.salt;
        var pic = d.pic;
        var today=new Date();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        var min = 1000;
        var max = 11000;
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        if (pic != 'spooky10') {
            spookyHunterResponse.innerHTML+="["+h+":"+m+":"+s+"] ";
            setTimeout(function() {
                $.post(
                    "spooky.php?action=ajax", 
                    { salt: salt }, 
                    function(data){
                        //console.log(data);
                        spookyHunterResponse.innerHTML+=data+" ("+random+")<br />";
                    }
                );
            },random);
        }
    }
};
