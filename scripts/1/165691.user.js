// ==UserScript==
// @name        Steamgifts-Onlycont
// @namespace   DBS
// @description Script to hide non-contributor giveaways
// @include     http://www.steamgifts.com*
// @version     0.2
// ==/UserScript==

var i;
var x = document.body.getElementsByTagName('*');
if ( x.length > 0)
{
        for ( i = 0; i<x.length; i++)
        {
            if(x[i].className == 'contributor_only green')
            {
             x[i].parentNode.parentNode.parentNode.setAttribute("style", "mepaso");
            }
            else if(x[i].className == 'post' && x[i].childNodes.className != 'contributor_only green' && x[i].parentNode.className == 'ajax_gifts')
            {
                x[i].setAttribute("style","display:none");
            }
        }
}