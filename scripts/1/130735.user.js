// ==UserScript==
// @name Boring RPG Bot
// @description An automated script to push the play button on boringrpg.com
// @include http://www.boringrpg.com/game
// @Author Ian Kelly
// ==/UserScript==
     
function pushButton()
{
    var patt = /\d+:\d\d/;
    if(document.title.indexOf("now") != -1) // It's free to push the button
    {
         document.getElementsByClassName("play")[0].click();
         setTimeout(pushButton, 1000); // Grab the next time on the next loop through
    } else if(patt.test(document.title)){ // Time to wait is in the title
                result = patt.exec(document.title);
                    var tsplit = result[0].split(":");
                    var minsInt = parseInt(tsplit[0]);
                    var secsInt = parseInt(tsplit[1]);
                    setTimeout(pushButton, minsInt * 60000 + secsInt * 1000);
    } else { // Just missed it turning from 0:01 to now, wait a sec.
                    setTimeout(pushButton, 1000);
    }
}

pushButton();
