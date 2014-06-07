// ==UserScript==
// @name        JVCfirst
// @namespace   http://userscripts.org
// @description Highlight 0 reply threads
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @version     1
// @grant       none
// ==/UserScript==


    var tr1 = document.getElementsByClassName('tr1');
    var tr2 = document.getElementsByClassName('tr2');
    first(tr1);
    first(tr2);

function first(tr)
{
    for (i = 0; i < tr.length; i++)
    {

        var replies = tr[i].childNodes[7].childNodes[0].textContent;

        var cell = tr[i].childNodes[3];

        if (replies == 0)
            cell.style.background = "rgb(150, 255, 255)";
    }
}
