// ==UserScript==
// @name        asd
// @namespace   asd
// @include     http://api.dmcloud.net/embed/*
// @version     1
// @grant       none
// ==/UserScript==
if(confirm('Download ?'))
{
    window.open(info['mp4_url'], '_blank');    
}