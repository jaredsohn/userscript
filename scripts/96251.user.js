// ==UserScript==
// @name           hwm_cgame_time
// @namespace      Demin
// @description    HWM mod - Prodolzhitel'nost' kartochnogo boja (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        3.3
// @include        http://*heroeswm.ru/cgame*
// @include        http://178.248.235.15/cgame*
// @include        http://209.200.152.144/cgame*
// @include        http://*lordswm.com/cgame*
// ==/UserScript==

// (c) 2011-2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '3.3';


var time_begin = new Date().getTime();
if ( !window.sidebar ) {
setTimeout(function() { document.querySelector("object[id*='arcomag']").innerHTML += '<param name="wmode" value="opaque" />'; }, 200);
}

var div = document.createElement('div');
div.setAttribute('style', 'position: absolute; background-color: #77b5fa;');
document.body.appendChild(div);

if ( document.querySelector("embed[src*='arcomag']") ) { setTimeout(function() { update_div(div, time_begin); }, 999); } else { setTimeout(function() { update_div2(div, time_begin); }, 999); }


function update_div(div, time_begin) {
	var ct = Math.floor( ( new Date().getTime() - time_begin ) / 1000 );
	var dm = Math.floor( ct / 60 ) % 60;
	var ds = ct % 60;
	div.innerHTML = '<b>&nbsp;' + dm + ':' + ( (ds < 10) ? '0' : '' ) + ds + '&nbsp;</b>';

	var flash_war = document.querySelector("embed[src*='arcomag']").getBoundingClientRect();
	var flash_war_width = document.querySelector("object[id*='arcomag']").width;
	var flash_war_height = document.querySelector("object[id*='arcomag']").height;

	div.style.fontSize = Math.round( flash_war_width / 70 ) + 'px';

	div.style.left = flash_war.left + flash_war_width * 0.21 + 'px';
	div.style.top = flash_war.top + flash_war_height * 0.05 + 'px';

	setTimeout(function() { update_div(div, time_begin); }, 999);
}

function update_div2(div, time_begin) {
	var ct = Math.floor( ( new Date().getTime() - time_begin ) / 1000 );
	var dm = Math.floor( ct / 60 ) % 60;
	var ds = ct % 60;
	div.innerHTML = '<b>&nbsp;' + dm + ':' + ( (ds < 10) ? '0' : '' ) + ds + '&nbsp;</b>';

	var cl_w = ClientWidth();
	var cl_h = ClientHeight();

	if ( cl_w < 600 ) { cl_w = 600; }
	if ( cl_h < 366 ) { cl_h = 366; }

	if ( cl_w > ( cl_h * 600 / 366 ) ) {
		div.style.fontSize = Math.round( cl_h / 43 ) + 'px';

		div.style.left = Math.round( ( cl_w / 2 - cl_h * 600 / 366 * 0.29 ) ) + 'px';
		div.style.top = cl_h * 0.05 + 'px';
	} else {
		div.style.fontSize = Math.round( cl_w / 70 ) + 'px';

		div.style.left = cl_w * 0.21 + 'px';
		div.style.top = Math.round( ( cl_h / 2 - cl_w * 366 / 600 * 0.45 ) ) + 'px';
	}

	setTimeout(function() { update_div2(div, time_begin); }, 999);
}

function ClientHeight() {
	return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientHeight:document.body.clientHeight;
}

function ClientWidth() {
	return document.compatMode=='CSS1Compat' && document.documentElement?document.documentElement.clientWidth:document.body.clientWidth;
}
