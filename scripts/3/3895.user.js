// ==UserScript==
// @name          Myspace Headshrinker
// @include       *myspace.com*
// @description   Removes whitespace from headers on Myspace.com.  (For use in conjunction with Adblock.)
// ==/UserScript==

//
// Inject CSS to override fixed height header box (default is 125px)
// which keeps whitespace even after we delete the ad
//
var head, style;
head = document.getElementsByTagName('head')[0];
if (head)
{
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML =   '#header{background-color:#039;color:#FFF;' +
        'height:auto; padding:5px; padding-top:8px;}';
    head.appendChild(style);
}

//
// delete the leaderboard DIV, which puts a fixed height ad banner
// atop some Myspace pages
//
var leaderBoard = document.getElementById('leaderboardRegion');
if (leaderBoard)
{
    leaderBoard.parentNode.removeChild(leaderBoard);
}

//
// delete 96 px headers
//
allElements = document.getElementsByTagName('TD')
for (var i = 0; i < allElements.length; i++)
{
    var TD = allElements[i];
    if ( TD.height == 96 )
    {
        TD.parentNode.removeChild(TD);
        break;						// only one of these per page
    }
}