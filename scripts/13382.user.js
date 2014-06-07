// ==UserScript==
// @name           UserScripts - Skin
// @namespace      BloodyAngel - http://www.myspace.com/stojshic
// @description    Black skin for UserScripts.org, Version 2.4
// @include        http://userscripts.org/*
// ==/UserScript==



x = 'body{background-image: url("http://i194.photobucket.com/albums/z184/Bloody_Angel88/bg.png"); background-position:center; background-repeat: repeat-y; background-color: black; color: white; font-family:segoe ui, arial, tahoma; font-size:10pt; font-style: italic;}';

//////////////////////////////////
//
// Settings ::
// If u dont want to see USO warning messages about installing new scripts
// just uncomment the next line (remove the "//" in front of "x +=")
// and u wont be annoyed with that anymore...

x += 'p.error{ display:none;}';

//
//////////////////////////////////


x += '#header{background-color:#262626; border: 2px solid #333;}';
x += '.container{width:750px;}';
x += '#content{background-color:transparent; border:2px solid #eee; border-width:0 1px 0 0; width:60%; margin-left:55px; }';
x += '#right{margin-left:1%}';
x += 'table tr td.inv {background-color:transparent; color: white}';
x += 'th.la {border-color: white;}';
x += '#th {border-color: white;}';
x += 'div.stats {background-color: #272727; border: 1px solid #333}';
x += 'h3{background-color: #333; border: 1px solid #272727;}';
x += 'code{background-color: #555; color: white;}';
x += 'tr.by-author td { border-color:#999 !important;}';
x += 'tr.by-author td.author { background:#999;}';
x += 'tr.by-author td.body { background:#222;}';
x += 'pre{background: #999 !important;border: 1px solid white !important;}';
x += 'p.error{ background:#333; border-color:#999;}';
x += 'a:focus,a:hover { color:#61FF2F !important;}';
x += 'a { color:#FFF; text-decoration:underline;}';
x += '.favorite a:hover { color: #61FF2F;}';
x += '.favorite a { color: #fff; }';
x += '.flag a { color: #fff; }';
x += '.flag a:hover { color:#9B0800; }';
x += 'blockquote{background-color: #333 !important; color: #777 !important; border-color: #fff !important;}';
x += 'blockquote a{color: #fff;}';
x += 'blockquote a:hover{color: #111 !important;}';
x += '#footer {display:none;}';
x += 'textarea {width: 90% !important;}';
x += '.span-7 {width:200px;}';
x += '.span-8 {width:200px;}';
x += 'h1,h2,h3,h4,h5,h6 { color: #61FF2F}';
x += 'p.topic { background:#999 !important;}';
x += '#feedBody{background-color: #262626 !important;}';
x += '#feedHandler{background-color: #000 !important;}';
x += '#q {font-size: 10px !important; border-color: white !important; background-color: transparent; color: white !important; width: 130px !important; value: testing !important;}';
x += '#q_label {font-size: 120% !important; }';
x += 'form.search input { border-bottom: 1px solid #555; }';
x += 'a#uservoice-feedback-tab { background-color: #000 !important; border: outset 1px #61ff2c !important; border-left: none !important; }';
x += 'a#uservoice-feedback-tab:hover { background-color: #555 !important; border: outset 1px #000 !important; border-left: none !important; }';

GM_addStyle(x);

document.images[0].src = "http://i194.photobucket.com/albums/z184/Bloody_Angel88/userscriptsorg.png"