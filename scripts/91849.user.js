// ==UserScript==
// @name           Total War Auto-Attacker
// @author         Lapoon
// @namespace      Auto attacks user every 50 seconds
// @datecreated   2010-12-04
// @lastupdated   2011-02-01
// @version       0.4
// @include        http://world.lightwavepc.com/app_world/?p=player&f=view&params=uid*
// ==/UserScript==


setTimeout( function(){  

var qs = unescape(window.location);

var a = qs.indexOf('uid:')+4;
var b = qs.indexOf('&',a);
var uid = qs.substring(a,b);

var f = unsafeWindow.document.getElementById("button_"+uid).onclick;

unsafeWindow.setTimeout(f,5000);
unsafeWindow.setInterval(f, 50000);

}, 5000 );
