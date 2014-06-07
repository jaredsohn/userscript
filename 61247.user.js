// ==UserScript==
// @name           juick-www-BL
// @namespace      http://juick.com/Rulexec
// @description    Black List on Web-Juick
// @include        http://juick.com/*
// ==/UserScript==

var bans = new Array(
"@stanis"
);

var mess = document.getElementsByTagName("li");
for (i=0;i<mess.length;i++)
{
    if(mess[i].className=='liav')
    {
        for(o=0;o<mess[i].getElementsByTagName("a").length;o++)
        {
            for(p=0;p<bans.length;p++)
            {
                if(mess[i].getElementsByTagName("a")[o].innerHTML==bans[p])
                {
                    mess[i].setAttribute('style','display:none');
                }
            }
        }
    }
}
