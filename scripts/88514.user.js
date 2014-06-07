// ==UserScript==
// @name           bad site blocker 
// @author         konhollow
// @version        1.0
// @description    this script will protect you if you come across bad site. modified from http://userscripts.org/scripts/show/35436 i add some feature
// @include        http://*moldymen.com/*
// @include        http://*infoslash.net/*
// @include        http://*meatrolled.com/*
// @include        http://*nobrain.dk/*
// @include        http://*sourmath.com/*
// @include        http://*smouch.net/*
// @include        http://*porkspin.com/*
// @include        http://*meatspin.com/*
// @include        http://*members.tele2.nl/*
// @include        http://*classpc.nl/*
// @include        http://*subang.co.tv/*
// @include        http://*d1gdo.com/*
// @include        http://*killerjo.net/*
// @include        http://*gamemarkas.co.cc/*
// @include        http://*sukatoro.com/*
// @include        http://*luna-maya.com/*
// @include        http://*hurr-durr.com/*
// @include        http://*scatmen.com/*
// @include        http://*gemintang.com/*
// @include        http://*1227.com/*
// @include        http://*esc-creation.com/scream
// @include        http://*maniacworld.com/*
// @include        http://*urangsunda.50webs.com/*
// @include        http://*kombre.co.cc/*
// @include        http://*nickyiseng.co.cc/*
// @include        http://*mylazysundays.com/*
// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='BAD SITE BLOCKER v.1.0 | SITE BLOCKED | ANTI JEBAKAN BETMEN ';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>You\'ve been led to disgusting site!!!!\n Don\'t worry though! You are now safe :) Click the page to escape, or close this window<p> klik halaman ini dimana saja untuk keluar dari website terkutuk ini</p><br>Modified By konhollow<br><img src=\"http://i52.tinypic.com/29na32w.jpg\" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://badsiteblocker.blogspot.com'");
}
document.body.appendChild(s);