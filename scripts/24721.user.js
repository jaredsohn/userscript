// ==UserScript==
// @name           UserScripts - Skin (old version)
// @namespace      BloodyAngel - http://www.myspace.com/bloodyangel88
// @description    Dark gray skin for UserScripts.org
// @include        http://userscripts.org/*
// ==/UserScript==

x = 'body{background-color:#272727; color: white;}';

//////////////////////////////////
//
// WARNING MESSAGE SETUP::
// If u dont want to see USO warning messages about installing new scripts
// just uncomment the next line (remove the "//" in front of "x +=")
// and u wont be annoyed with that anymore...

x += 'p.error{ visibility: hidden;}';
//
//////////////////////////////////

x += '#header{background-color:#272727; border: 2px solid #333333;}';
x += '#content{background-color:#272727; border-color: #272727;}';
x += 'table tr td.inv {background-color:#272727; color: white}';
x += 'th.la {border-color: white;}';
x += '#th {border-color: white;}';
x += 'div.stats {background-color: #272727; border: 1px solid #333333}';
x += 'h3{background-color: #333333; border: 1px solid #272727;}';
x += 'code{background-color: #555555; color: white;}';
x += 'tr.by-author td { border-color:#999 !important;}';
x += 'tr.by-author td.author { background:#999;}';
x += 'tr.by-author td.body { background:#333;}';
x += 'pre{background: #999 !important;border: 1px solid white !important;}';
x += 'p.error{ background:#333; border-color:#999;}';
x += 'a:focus,a:hover { color:#fff;}';
x += 'a { color:#666; text-decoration:underline;}';
x += '.favorite a:hover { color: #fff;}';
x += '.favorite a { color: #666; }';
x += '.flag a { color: #666; }';
x += '.flag a:hover { color: #fff; }';
x += 'blockquote{background-color: #333 !important; color: #777 !important; border-color: #fff !important;}';
x += 'blockquote a{color: #fff;}';
x += 'blockquote a:hover{color: #111 !important;}';


GM_addStyle(x);

document.images[0].src = "http://i194.photobucket.com/albums/z184/Bloody_Angel88/userscriptsorg.png"