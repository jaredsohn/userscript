// ==UserScript==
// @name        Dota 2 Lounge title notifications & autorefresh
// @namespace   http://userscripts.org/users/WernieBert
// @description (1) Dota 2 Lounge - My Trades
// @include     http://dota2lounge.com*
// @version     1
// @grant       none
// ==/UserScript==

//***********************************************
// REFRESH DELAY (SECONDS)
// Change this variable to whatever refresh time you desire 

var refreshTime = 360;

//***********************************************

function ref()
{
    location.reload();
}

var nots = document.getElementsByClassName('notification');
var totalnots = 0;
for (var i = 0; i < nots.length; i++)
{
    var x = parseInt(nots[i].innerHTML);
    if (!isNaN(x) && nots[i].innerHTML.length < 5)
        totalnots += x;
}

if (totalnots == 0)
    var notificationText = '';
else
    var notificationText = '(' + totalnots.toString() + ')';

document.title = notificationText + ' ' + document.title;


//---------------------------------------
// Refreshing the page:
if (document.URL != 'http://dota2lounge.com/addtrade') // don't refresh the page if you are adding a trade because it will reset the trade that you were making
{
    window.setTimeout(ref,refreshTime * 1000);
    
    var divs = document.getElementsByTagName('div');
    var text=document.createElement("H3");
    var t=document.createTextNode('Refreshing page every ' + refreshTime.toString() + ' seconds.');
    text.appendChild(t);
    divs[5].appendChild(text);
}

