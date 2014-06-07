// ==UserScript==
// @name       CoS forums: better unread posts link
// @namespace  Sk8er Of Bodom
// @version    0.1
// @description  Replaces the "Show unread posts since last visit." link with a link to all unread posts (not only since last visit), provided by our dear Levest.
// @include      http://forum.cityofsteam.com/*
// ==/UserScript==

var links = document.getElementById('upper_section').getElementsByTagName('A');

for (var i = 0; i < links.length; i++)
{
    if (links[i].href == 'http://forum.cityofsteam.com/index.php?action=unread')
    {
        links[i].href = 'http://forum.cityofsteam.com/index.php?action=unread;all;start=0';
        links[i].innerHTML = 'Show unread posts.';
    }
}