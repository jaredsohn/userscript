// ==UserScript==
// @name           Spacier Yahoo Neo
// @namespace      sarathonline
// @author         sarathonline (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://www.sarathonline.com/scripts/
// @version        1.1
// @icon http://img534.imageshack.us/img534/5500/71816248.png
// @description    Removes unnecessary top header in yahoo mail beta (neo).
// @include        http://*.mail.yahoo.com/neo/*
// @match         http://*.mail.yahoo.com/neo/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first version
//
// ==/UserScript==

(function(){

var d=document,sid='__sar__yneo', fn='http://www.sarathonline.com/dyn/sfs/userscripts/ymail/yneo.css';
if(d.getElementById(sid)) return;
  var s=document.createElement("link")
  s.setAttribute("rel", "stylesheet")
  s.setAttribute("type", "text/css")
  s.setAttribute("href", fn)
s.id=sid
d.getElementsByTagName("head")[0].appendChild(s);
})();