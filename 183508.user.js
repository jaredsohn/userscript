// ==UserScript==
// @name        Flame extinguisher
// @namespace   zx.pk.ru
// @include     http://zx.pk.ru/*
// @include     http://zx-pk.ru/*
// @include     http://www.zx-pk.ru/*
// @version     3
// @grant       none
// ==/UserScript==

var toExclude = "Флейм";
var newMessagesRus = "Новые сообщения";
var newMessagesEng = "New Posts";
var flameUrl = "http://zx.pk.ru/forumdisplay.php?f=19";
var rus = 1;

if (/.*searchid/.test(window.location))
{
    var threadslist = document.getElementById('threadslist');
    var tbody = threadslist.getElementsByTagName('tbody');
    var tableRoot, trItems;
    if (tbody.length > 0)
        tableRoot = tbody[0];
    else
        tableRoot = threadslist;
    
    trItems = tableRoot.getElementsByTagName('tr');
    
    var newMessagesSpan = null;
    var spans = trItems[0].getElementsByTagName('span');
    for (var i = 0; i < spans.length; i++)
    {
        if (spans[i].innerHTML.indexOf(newMessagesRus) > 0)
        {
            newMessagesSpan = spans[i];
            break;
        }
        if (spans[i].innerHTML.indexOf(newMessagesEng) > 0)
        {
            newMessagesSpan = spans[i];
            rus = 0;
            break;
        }
    }
    
    if (newMessagesSpan == null) // This is not the "New Messages" search
        return;
    
    var hiddenCount = 0;
    
    for (var i = trItems.length - 1; i >= 0; i--)
    {
        var tr = trItems[i];
        var tds = tr.getElementsByTagName('td');

        if (tds.length >= 7)
        {
            var as = tds[6].getElementsByTagName('a');
            if (as.length > 0 && as[0].innerHTML == toExclude)
            {
                tableRoot.removeChild(tr);
                hiddenCount++;
            }
        }
    }
    
    if (hiddenCount > 0)
        newMessagesSpan.innerHTML = (rus == 1 ? newMessagesRus : newMessagesEng) + 
            " (<a href='" + flameUrl + "'>" + hiddenCount +
            (rus == 1 ? (" тем" + (hiddenCount > 1 ? (hiddenCount > 4 ? " скрыто" : "ы скрыто") : "а скрыта")) : " thread(s) hidden") +
            "</a>)";
}