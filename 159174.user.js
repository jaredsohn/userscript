// ==UserScript==
// @name       LF Clickable Userbars
// @namespace  http://leakforums.org/
// @version    1.7
// @description  By osc-rwar
// @match      http://*leakforums.*/*
// @copyright  2013+, You
// @downloadURL http://userscripts.org/scripts/source/159174.user.js
// ==/UserScript==

var tags = document.getElementsByTagName('img');
var a = '<a href="/forumdisplay.php?fid=';
for (var i = 0; i < tags.length; i++)
{
    var b = '">'+tags[i].outerHTML+'</a>';
    var tag = tags[i].src;
    
    if (tag.indexOf("awesome") !== -1) { tags[i].outerHTML = a+'86'+b; }
    if (tag.indexOf("elite5") !== -1) { tags[i].outerHTML = a+'121'+b; }
    if (tag.indexOf("SL") !== -1) { tags[i].outerHTML = a+'234'+b; }
    if (tag.indexOf("reliance") !== -1) { tags[i].outerHTML = a+'181'+b; }
    if (tag.indexOf("pirates") !== -1) { tags[i].outerHTML = a+'157'+b; }
    if (tag.indexOf("Anime") !== -1) { tags[i].outerHTML = a+'173'+b; }
    if (tag.indexOf("Writers") !== -1) { tags[i].outerHTML = a+'158'+b; }
    if (tag.indexOf("wolves") !== -1) { tags[i].outerHTML = a+'178'+b; }
    if (tag.indexOf("VIRTUE") !== -1) { tags[i].outerHTML = a+'187'+b; }
    if (tag.indexOf("graphicmasters") !== -1) { tags[i].outerHTML = a+'238'+b; }
    if (tag.indexOf("admin") !== -1) { tags[i].outerHTML = a+'235'+b; }
    if (tag.indexOf("orgx") !== -1) { tags[i].outerHTML = a+'232'+b; }
    if (tag.indexOf("Sponsor") !== -1) { tags[i].outerHTML = a+'249'+b; }
    if (tag.indexOf("staff") !== -1) { tags[i].outerHTML = a+'117'+b; }
    if (tag.indexOf("support") !== -1) { tags[i].outerHTML = a+'117'+b; }
    if (tag.indexOf("spectrum") !== -1) { tags[i].outerHTML = a+'157'+b; }
    if (tag.indexOf("magic") !== -1) { tags[i].outerHTML = a+'252'+b; }
    if (tag.indexOf("palette") !== -1) { tags[i].outerHTML = a+'170'+b; }
    if (tag.indexOf("gamer") !== -1) { tags[i].outerHTML = a+'10'+b; }
    if (tag.indexOf("elite2") !== -1) { tags[i].outerHTML = a+'99'+b; }
    if (tag.indexOf("Monetizer") !== -1) { tags[i].outerHTML = a+'145'+b; }
    if (tag.indexOf("medal") !== -1) { tags[i].outerHTML = a+'121'+b; }
    if (tag.indexOf("Coder") !== -1) { tags[i].outerHTML = a+'261'+b; }
    if (tag.indexOf("lounge") !== -1) { tags[i].outerHTML = a+'18'+b; }
    if (tag.indexOf("random") !== -1) { tags[i].outerHTML = a+'248'+b; }
    if (tag.indexOf("sponsor") !== -1) { tags[i].outerHTML = a+'249'+b; }
    if (tag.indexOf("LFawards") !== -1) { tags[i].outerHTML = a+'288'+b; }
}