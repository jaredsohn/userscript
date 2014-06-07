// TV.nu enhancer 1.1

// ==UserScript==
// @name          TV.nu enhancer
// @namespace     http://determinist.org/greasemonkey/
// @description   Remove ads, realigns channels and more. Version 1.1

// @include       http://www.tv.nu/*

// ==/UserScript==

/*

This script removes most of the ad divs and rearranges the channels
so that no areas are blank. Use this with adblock for best results.
It also changes the favorite stars colors from yellow to blue, to
make them more distinguishable.

Changelog:

2006-08-02	1.1
* Added support for viewing next day without ads.

2006-07-01	1.0
* Public release
 
/*
 BEGIN LICENSE BLOCK
Copyright (C) 2005 Arvid Jakobsson

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://www.gnu.org/licenses/gpl.html
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK
*/

function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function xpathOne(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

function removeWithXP(query, context) {
	var els, el, i;
	
	els = xpath(query, context);
	for (i = 0; el = els.snapshotItem(i); i++)
		el.parentNode.removeChild(el);
}


//var move_link = xpathOne("//span[@id='moveLink']/a[contains(@onclick, 'showlinks')]");
//move_link.addEventListener('click', setupDragging, false);

var cur_loc = document.location.href;
if (cur_loc.match(/https?:\/\/(www.)?tv\.nu\/([0-9]{8})?$/)) {
	clearAds();
	packChans();
	switchStars();
}

/*
* Byt ut stjärnor
*/

function switchStars () {	
	var replacement_src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%03%00%00%00%BA%EC%3F%8F%00%00%003PLTE%03%00%07%8C%AD%BA%94%B3%BF%9A%B7%C3%9C%B9%C4%9E%BA%C5%A6%C0%CA%AC%C5%CE%AF%C7%D0%B3%CA%D2%B9%CE%D6%BC%D0%D8%C0%D3%DA%C5%D6%DD%CB%DB%E1%D0%DE%E45gz%CE%EB%9A%DA%00%00%00%01tRNS%00%40%E6%D8f%00%00%00%01bKGD%00%88%05%1DH%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D6%05%04%10%2F%0CH%BD%9A%83%00%00%00%3EIDATx%DA%3D%CCA%12%80%20%0CC%D1V%14%B4%20%FC%FB%9F%D62%14%B3%C8%BCE%26%22%1E%90%08%A3l%F3%E6E%E8O%D2%B9%A1%D5%FBT%B51%7D%1D!%B7Y%C8%0F%60%93%FF%99%A8%0F%88~%02%90%AF%D8%9E%0A%00%00%00%00IEND%AEB%60%82";
	
	function myMarkeraFavoriter(){
		var bilder = xpath("//img[contains(@src, 'star') or  contains(@src, 'arrow') or contains(@src, 'mov')]");
		var favoritarr = unsafeWindow.getfavoritarray();
		
		for (var i = 0; bild = bilder.snapshotItem(i); i++) {
			if (favoritarr.indexOf(bild.getAttribute('title')) >= 0) {
				bild.setAttribute('src', replacement_src);
			}
		}
	}
	
	unsafeWindow.markerafavoriter = myMarkeraFavoriter;
}
/*
* Ta bort tomma gråa ytor
*/

function clearAds() {
	removeWithXP("//div[@class='kanalContainer'][div[@title='annons']]");
	removeWithXP("//div[div[@class='listing' and div[@class='textannons']]]");
}

/*
* Komprimera listan
*/
function packChans() {
	var mc = xpathOne("//div[@id='mainContainer']/div[@class='listing']");
	var cols = xpath("//div[@class='kanalContainer']", mc);
	mc.innerHTML = '';
	
	//jobbar med vertikala block
	//blev aldrig klar eller snygg
	/*var vert_kols = new Array();
	for (var r = 0; r < 3; r++) {
		vert_kol = document.createElement('div');
		vert_kol.setAttribute('style', 'width: 30%; float: left; margin-right: 30px;');
		mc.appendChild(vert_kol);
		vert_kols.push(vert_kol);
	}
	
	var filler = document.createElement('div');
	filler.setAttribute('style', 'clear: both; height: 100px; float: none;');
	for (var j = 0; j < cols.snapshotLength; j++) {
		col = cols.snapshotItem(j);
		col.setAttribute('style', 'float: none; margin-bottom: 100px');
		vert_kols[j%3].appendChild(col);
		vert_kols[j%3].appendChild(filler.cloneNode(false));
	}*/
	
	for (var i = 0; i < cols.snapshotLength/3; i++) {	
		//jobbar som orginalet, tar under 100ms
		row = document.createElement('div');
		row.setAttribute('class', 'listing');
		for (var j = i * 3; j < (i+1)*3 && j < cols.snapshotLength; j++) {
			col = cols.snapshotItem(j);
			row.appendChild(col);
			
		}
		mc.appendChild(row);
	}
}



function setupDragging() {
	GM_log("flytta");
	var chans = xpath("//div[@class='kanalContainer']");
	for (var i = 0; chan = chans.snapshotItem(i); i++) {
		chan.addEventListener('mousedown', startDrag, true);
	}
	

}

var ghost;
var int_target;
var orig_x, orig_y;
var orig_offs_x, orig_offs_y;

function startDrag(e) {
	GM_log('startdrag');
	
	int_target = xpathOne("ancestor::div[@class='kanalContainer']", e.target);
	
	ghost = int_target.cloneNode(true);
	ghost.style.position = 'absolute';
	ghost.style.opacity = 0.5;
	
	orig_x = getPosX(int_target);
	orig_y = getPosY(int_target);
	
	orig_offs_x = e.clientX - orig_x;
	orig_offs_y = e.clientY - orig_y;
	
	ghost.style.left = orig_x + 'px';
	ghost.style.top = orig_y + 'px';
	
	document.body.appendChild(ghost);
	ghost.style.zIndex = 10000;
	
	window.addEventListener('mouseup', stopDrag, false);
	window.addEventListener('mousemove', drag, false);
	
	e.stopPropagation();
    e.preventDefault();
	
}

function drag(e) {
	//GM_log('drag');
	ghost.style.left = (e.clientX - orig_offs_x) + 'px';
	ghost.style.top = (e.clientY - orig_offs_y) + 'px';
}

function stopDrag(e) {
	GM_log('stopdrag');
	window.removeEventListener('mousemove', drag, false);
	window.removeEventListener('mouseup', stopDrag, false);
	ghost.parentNode.removeChild(ghost);
}

function getPosX(el) {
	var x = 0;
	do {
		x += el.offsetLeft;
	} while (el = el.offsetParent) 
	return x;
}
function getPosY(el) {
	var y = 0;
	do {
		y += el.offsetLeft;
	} while (el = el.offsetParent) 
	return y;
}