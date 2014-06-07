// ==UserScript==
// @name       TFS Web Toolkit
// @version    0.26
// @description   Correct HTML editor height
// @include http://*/tfs/DefaultCollection/*/_workItems*
// @include https://*/tfs/DefaultCollection/*/_workItems*
// @copyright  2014+, Łukasz 'PerSOft' Malicki
// ==/UserScript==

var TIMEOUT = 250;
var MAXTIMEOUT = 5000;
var max = MAXTIMEOUT / TIMEOUT;

setTimeout(render, TIMEOUT);

function render()
{
    max--;
    var items = document.getElementsByClassName('control-cell');
    if (items.length == 0 && max > 0)
        setTimeout(render, TIMEOUT);
    else
    {
        var i = 0;
        for (i=0; i < items.length; i++)
        {
            if (items[i].innerHTML.indexOf("[Field Name: Description]") != -1)
            {
                var elements = items[i].getElementsByClassName('richeditor-container');
                elements[0].style.height = '1024px';
            }
        }
    }
}