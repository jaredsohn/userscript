// ==UserScript==
// @name       A Lot of Reddit Karma
// @namespace  http://*.reddit.com/*
// @version    0.1
// @description  Huge comment and link karma gains
// @match      http://*.reddit.com/*
// @include    http://*.reddit.com/*
// @copyright  2012+,
// ==/UserScript==
a=document.getElementsByTagName('a');
for (i=0;i<703;i++)
{
    if (a[i].title=='link karma')
        a[i].innerHTML=Math.floor((Math.random()*1000000)+100000);
    else if (a[i].title=='comment karma')
        a[i].innerHTML=Math.floor((Math.random()*1000000)+100000);
}