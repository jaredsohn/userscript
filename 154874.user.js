// ==UserScript==
// @name       CzescVI
// @description  Testo boge
// @include    http://*.vichan.net/*
// @version    1.2
// @author     Jan Papies
// ==/UserScript==
var xd = document.styleSheets[0];
xd.insertRule(".boardlist:first-child { display: block; border-bottom: 1px black solid !important; background: rgba(255,255,255,0.85) !important; padding: 2px !important; font-size: 14px !important; }", 0);
xd.insertRule(".boardlist { display: none }", 0);
xd.insertRule(".sub { display: inline !important; background: none !important; padding-right: 2px; border-right: 1px black dotted; margin-right: 2px; }", 0);
xd.insertRule(".sub .sub { border-right: 0 !important; margin-right: 0 !important; padding-right: 0 !important; }", 0);
xd.insertRule(".boardlist a:hover { background: rgba(255,255,255,0.7); text-decoration: none !important; border: 0 !important; }", 0);
xd.insertRule(".boardlist a { padding-left: 3px; color: black !important; text-shadow: white 0px 0px 3px !important; text-decoration: none; border: 0; }", 0);
divy = document.getElementsByTagName("div");
pasek = divy[0];
pasek.innerHTML = pasek.innerHTML.split('[').join(' ').split(']').join(' ').split(' / ').join(' ');
pasek.innerHTML = pasek.innerHTML.replace('torrent</a>', 'torrent</a> <a href="/trv/">trv</a>');