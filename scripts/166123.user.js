// ==UserScript==
// @name           hwm_exit_from_war
// @namespace      Demin
// @description    HWM mod - Ssylka "vernut'sja v igru" na fleshke boja (by Demin)
// @homepage       http://userscripts.org/users/263230/scripts
// @version        1.2
// @include        http://*heroeswm.ru/war*
// @include        http://178.248.235.15/war*
// @include        http://209.200.152.144/war*
// @include        http://*.lordswm.com/war*
// @include        http://*герои.рф/?15091
// ==/UserScript==

// (c) 2013, demin  ( http://www.heroeswm.ru/pl_info.php?id=15091 )

var version = '1.2';


if (top != self) {

var div = document.createElement('div');
div.setAttribute('style', 'position: absolute; background-color: #ffffff; border: 1px solid #999;');
div.innerHTML = '<b><a href="home.php" style="text-decoration: none;">&nbsp;Home&nbsp;</a></b>';
document.body.appendChild(div);

if ( document.querySelector("embed[src*='combat']") ) { update_div(div); } else { update_div2(div); }

}


function update_div(div) {
	var flash_war = getOffset( document.querySelector("embed[src*='combat']") );

	div.style.fontSize = Math.round( document.querySelector("object[id*='combat']").width / 60 ) + "px";

	div.style.left = flash_war.left + 'px';
	div.style.top = flash_war.top + 'px';

	setTimeout(function() { update_div(div); }, 999);
}

function update_div2(div) {
	var cl_w = ClientWidth();
	var cl_h = ClientHeight();

	if ( cl_w < 600 ) { cl_w = 600; }
	if ( cl_h < 366 ) { cl_h = 366; }

	if ( cl_w > cl_h*600/366 ) {
		div.style.fontSize = Math.round( cl_h / 37 ) + "px";

		div.style.left = Math.round( (cl_w-cl_h*600/366)/2 ) + 'px';
		div.style.top = '0px';
	} else {
		div.style.fontSize = Math.round( cl_w / 60 ) + "px";

		div.style.left = '0px';
		div.style.top = Math.round( (cl_h-cl_w*366/600)/2 ) + 'px';
	}

	setTimeout(function() { update_div2(div); }, 999);
}

function ClientWidth() {
	return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function ClientHeight() {
	return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function getOffset(elem) {
	if (elem.getBoundingClientRect) {
	// pravilnyj

	// (1)
	var box = elem.getBoundingClientRect()

	// (2)
	var body = document.body
	var docElem = document.documentElement

	// (3)
	var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
	var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

	// (4)
	var clientTop = docElem.clientTop || body.clientTop || 0
	var clientLeft = docElem.clientLeft || body.clientLeft || 0

	// (5)
	var top  = box.top + scrollTop - clientTop
	var left = box.left + scrollLeft - clientLeft

	return { top: Math.round(top), left: Math.round(left) }

	} else {
	// hot kak to

	var top=0, left=0
	while(elem) {
		top = top + parseInt(elem.offsetTop)
		left = left + parseInt(elem.offsetLeft)
		elem = elem.offsetParent
	}

	return {top: top, left: left}
	}
}
