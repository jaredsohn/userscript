// ==UserScript==
// @name            Continue to NukeZone
// @include         http://*nukezone.nu/*
// ==/UserScript==

var btns = document.getElementsByTagName('input');

for(i=0;i<btns.length;i++)
{
    if(btns[i].value=="Continue to NukeZone")
    {
       btns[i].click();
    }
}