// ==UserScript==
// @name           Show free Torrent-Damage download
// @namespace      Namespace
// @description    Shows what can be downloaded before losing 1.05 ratio
// @include        http://www.torrent-damage.net/*
// ==/UserScript==

//		<ul id="userinfo_stats">
//			<li id="st_up"><em>Up: </em><span class="stat">1.46 TiB</span></li>
//			<li id="st_down"><em>Down: </em><span class="stat">1.23 TiB</span></li>
//
//			<li id="st_ratio"><em>Ratio: </em><span class="stat"><span class="r10">1.188</span></span></li>
//		</ul>

// Update: use of 1024 (greater accuracy) from Aikar@torrent-damage.net

var tmp     = '';
var myRE    = '';
var results = '';

myRE = new RegExp("<span[^>]*>([0-9]+.[0-9]+)[\\s]*([^ ]+)[\\s]*</span>", "");

tmp = document.getElementById('st_up');
tmp = tmp.innerHTML;
results = tmp.match(myRE);
var UP   = results[1];
if(results[2] == 'MiB') { UP *= 1024; }
if(results[2] == 'GiB') { UP *= 1048576; }
if(results[2] == 'TiB') { UP *= 1073741824; }

tmp = document.getElementById('st_down');
tmp = tmp.innerHTML;
results = tmp.match(myRE);
var DOWN   = results[1];
if(results[2] == 'MiB') { DOWN *= 1024; }
if(results[2] == 'GiB') { DOWN *= 1048576; }
if(results[2] == 'TiB') { DOWN *= 1073741824; }

//alert(UP+':'+DOWN);

var RATIO   = UP/DOWN;
var FREE    = (UP/1.05)-DOWN;
var DEAD    = (UP/0.95)-DOWN;

var SIGNF    = 1;
if(FREE < 0)
{
  SIGNF = -1;
  FREE *= -1;
}
var SIGND    = 1;
if(DEAD < 0)
{
  SIGND = -1;
  DEAD *= -1;
}

var F_UNITS = 'iB'; 
if(FREE >= 1024) { F_UNITS = 'MiB'; FREE /= 1024; } 
if(FREE >= 1024) { F_UNITS = 'GiB'; FREE /= 1024; } 
if(FREE >= 1024) { F_UNITS = 'TiB'; FREE /= 1024; } 
FREE *= SIGNF;

var D_UNITS = 'iB'; 
if(DEAD >= 1024) { D_UNITS = 'MiB'; DEAD /= 1024; } 
if(DEAD >= 1024) { D_UNITS = 'GiB'; DEAD /= 1024; } 
if(DEAD >= 1024) { D_UNITS = 'TiB'; DEAD /= 1024; } 
DEAD *= SIGND;

//alert( '&#9762;' + (parseInt(FREE*100)/100) + ' ' + F_UNITS + ' &#9760;' + (parseInt(DEAD*100)/100) + ' ' + D_UNITS);
//‚ò† &#9760;
//‚ò∫ &#9786;
//‚ò¢ &#9762;


var stat_obj = document.getElementById('userinfo_stats');
var string_obj = stat_obj.innerHTML;
stat_obj.innerHTML = string_obj
+'<li id=""><font style="color:#f70">&#9762;</font>&nbsp;<span class="free">'+(parseInt(FREE*100)/100) + ' ' + F_UNITS+'</span></li>'
+'<li id=""><font style="color:#f00">&#9760;</font>&nbsp;<span class="dead">'+(parseInt(DEAD*100)/100) + ' ' + D_UNITS+'</span></li>'
;