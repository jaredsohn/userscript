// ==UserScript==
// @name    VGMPF <audio> tag
// @namespace    http://www.linkmauve.fr/dev/greasemonkey/
// @description    Replaces the Cortado Java player with the <audio> tag on VGMPF.
// @include    http://www.thealmightyguru.com/VGMPF/*
// @version    0.1
// ==/UserScript==

var i, j, buttons;

for (j = 0; j < 42; j++) // Hack to get it working
{
    buttons = document.getElementsByTagName('button');
    for (var i = 0; i<buttons.length; i++)
    {
        buttons[i].parentNode.innerHTML = '<a href="'
        + buttons[i].nextSibling.href + '">'
        + buttons[i].nextSibling.innerHTML
        + '</a><audio style="float:right;height:28px" controls=""'
        + ' src="' + buttons[i].nextSibling.href + '" />';
    }
}

document.getElementsByTagName('applet')[0].parentNode.innerHTML = '';
