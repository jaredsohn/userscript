// ==UserScript==

// @name           MySpace Home Style (Red & Black)

// @namespace      thunderchicken

// @description    This restyles your MySpace home page with a red and black scheme.

// @include        file:///C:/Documents%20and%20Settings/Micah%20Lambert/My%20Documents/My%20Toolbar/Web%20Pages/Misc/home.cfm.htm

// @include	http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

// Thanks and kudos to joeyd for giving me the idea and methods to restyle my home page.
// Some of this code is given in examples in the 'Dive into Greasemonkey' book, 
// which is available at http://www.diveintogreasemonkey.org/

x = '#header{background-color:#000000 !important;}';
x += 'a{color:#CCCCFF !important;}';
x += '#topnav{background-color:#CC3333 !important;}';
x += '.heading{background-color:#CC3333 !important;}';
x += '#home_profileInfo, #home_greybox{background-color:black !important;}';
x += '.section, .section td{background-color:black;border-color:#99CCFF;color:#99CCFF;}';
x += '.cols td{background-color:black !important;}';
x += '.mar5{color:#99CCFF !important;}';
x += '#home_bulletins, #home_bulletins .cols, #home_bulletins .cols th{background-color:#000000;border-color:#99CCFF;border-bottom:7px solid #99CCFF;}';
x += 'a.hover{color:blue !important;}';
x += '#home_friends{color:#000000;}';
x += 'body{background-color:#666666;}';
x += '#main{background-color:#666666;}';
x += '#wrap{background-color:#666666;}';
x += '#footer{background-color:#999999;}';
x += '#home_messages{background-color:#3399CC;}';
GM_addStyle(x);

a = document.getElementById('ctl00_Main_GadsA.Skin_CMS_ProfileHome_Gads_A');
b = document.getElementById('ctl00_Main_Featured.Skin_cvFeaturedFilm');
c = document.getElementById('ctl00_Main_Featured.Skin_cvFeaturedComedy');
d = document.getElementById('ctl00_Main_Featured.Skin_cvFeaturedBook');
e = document.getElementById('home_coolNewVideos');
f = document.getElementById('squareAd');
g = document.getElementById('home_featured_filmmaker');
h = document.getElementById('home_setHomePage');
if (a) {a.parentNode.removeChild(a);}
if (b) {b.parentNode.removeChild(b);}
if (c) {c.parentNode.removeChild(c);}
if (d) {d.parentNode.removeChild(d);}
if (e) {e.parentNode.removeChild(e);}
if (f) {f.parentNode.removeChild(f);}
if (g) {g.parentNode.removeChild(g);}
if (h) {h.parentNode.removeChild(h);}