// ==UserScript==
// @name        Dota 2 Lounge title notifications 
// @namespace   http://userscripts.org/users/WernieBert
// @description (1) Dota 2 Lounge - My Trades
// @include     http://dota2lounge.com*
// @version     1
// @grant       none
// ==/UserScript==


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