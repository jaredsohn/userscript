// ==UserScript==
// @name           In-Game Western Radio by laccy
// @description    Inserts a Flash app into the menu pane that streams Western music from 8tracks
// @include http://*.the-west.*/game.php*
// @require http://8tracks.com/swf/player_v3.swf?
// ==/UserScript==

var WestWindow = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var main_container = WestWindow.document.getElementById('main_container');
var footer_infobar = WestWindow.document.getElementById('footer_infobar');

var div = document.createElement("div");
div.style.margin = '30px 0 0 -100px';
div.id = 'radio';

var object = document.createElement("object");
object.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
object.width='240';
object.height='150';
object.id='single1';
object.name='single1';

var param = document.createElement("param");
param.name='movie';
param.value='http://8tracks.com/mixes/203313/player_v3';
object.appendChild(param);

param = document.createElement("param");
param.name='allowfullscreen';
param.value='true';
object.appendChild(param);

param = document.createElement("param");
param.name='allowscriptaccess';
param.value='always';
object.appendChild(param);

param = document.createElement("param");
param.name='wmode';
param.value='transparent';
object.appendChild(param);

param = document.createElement("param");
param.name='flashvars';
param.value='file=http://8tracks.com/mixes/203313/player_v3';
object.appendChild(param);
 
var embed = "<embed type='application/x-shockwave-flash' id='single2' name='single2' src='http://8tracks.com/mixes/203313/player_v3?autoplay=true' width='240' height='150' bgcolor='undefined' allowscriptaccess='always' allowfullscreen='true' wmode='transparent' flashvars='file=http://8tracks.com/mixes/203313/player_v3&autostart=true&mute=true&shuffle=true' />";
object.innerHTML = object.innerHTML + embed;

div.appendChild(object);

main_container.insertBefore(div,footer_infobar);