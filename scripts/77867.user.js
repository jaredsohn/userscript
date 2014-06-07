// ==UserScript==
// @name           (DEMO)Numbers in scouting report
// @namespace      goallineblitz.com
// @description    This script will put numbers in the scouting report.
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @copyright      2010, garrettFoster
// @version        2010.05.28
// ==/UserScript==

window.setTimeout(main,10); //starting script

function main(){
    console.log('Scouting report script started');
    
    const barLocation = document.getElementsByClassName('rating_bar_fill');
    for(var i=0;i<barLocation.length-2;i++){
        var number = barLocation[i].style.width.split('%')[0];
        barLocation[i].innerHTML = number;
    }
}
