// ==UserScript==
// @name            NukeZone Auto-login
// @namespace       NZ
// @author          Slewey
// @description     Auto-login at Nukezone.nu homepage, access denied page and GU page
// @include         http://*nukezone.nu/*
// @include         http://*nukezone.nu/accessdenied.asp?* 
// ==/UserScript==

var btns = document.getElementsByTagName('input');
var links = document.getElementsByTagName('a');

for(i=0;i<btns.length;i++)
{
    if(btns[i].tabindex==3)
    {
       btns[i].click();
    }
    if(btns[i].value=="Continue to NukeZone")
    {
       btns[i].click();
    }
}

for(i=0;i<links.length;i++)
{
    if(links[i].text=="Please login.")
    {
       window.location = link.href;
    }
}