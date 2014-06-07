// ==UserScript==
// @name           Remove Title Prefixes and Suffixes 1.0.0
// @description    Removes title prefixes and suffixes from various web sites to make things clearer.
// @include        http://*.*.*/*
// @version        1.0.1
// ==/UserScript==

{

document.title = document.title.replace('UG Community @ Ultimate-Guitar.Com - ', '')
document.title = document.title.replace('Amazon.com: ', '')
document.title = document.title.replace('Bank of America | ', '')
document.title = document.title.replace('Cyanide & Happiness ', '')
document.title = document.title.replace(' - Explosm.net', '')
document.title = document.title.replace('Explosm.net - ', '')
document.title = document.title.replace(' - [H]ard|Forum', '')
document.title = document.title.replace(' - Powered by vBulletin', '')
document.title = document.title.replace(' | I Am Bored', '')
document.title = document.title.replace('NG BBS — ', '')
document.title = document.title.replace(' on SoundCloud - Create, record and share your sounds for free', '')
document.title = document.title.replace(' - StumbleUpon', '')
document.title = document.title.replace(' - TalkBass Forums', '')
document.title = document.title.replace(' - YouTube', '')
document.title = document.title.replace('Newegg.com - ', '')

}