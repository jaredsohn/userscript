// Swedvdr - Bookmark in torrent browser 1.3a

// ==UserScript==
// @name          Swedvdr - Bookmark in torrent browser
// @namespace     http://determinist.org/greasemonkey/
// @description   Bookmark directly with GM_xhr in the torrent browser. Version 1.3a

// @include       http://swedvdr.org/req.php*
// @include       http://swedvdr.org/browse.php*

// @include       http://www.swedvdr.org/req.php*
// @include       http://www.swedvdr.org/browse.php*

// ==/UserScript==

/*

Bookmark directly with GM_xhr in the torrent browser, so you
don't have to view the torrentdetails to bookmark it.


Changelog:

2007-03-19	1.3a
	* Fixed the remove bookmarks code

2006-12-04	1.3
	* Fixed some stupid bugs
	* Now uses bookmark_backend.php instead of addbookmark.php

2006-07-09	1.2
	* No more caching. More reliable this way.

2006-07-05  1.1
	* Removed border around imdb icon

2006-07-01	1.0
	* Public release
	
*/

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

var spinner = "data:image/gif,GIF89a%10%00%10%00%E6%00%00%FF%FF%FF%FE%FE%FE%A3%A3%A3%FD%FD%FD%E9%E9%E9%B5%B5%B5%F9%F9%F9%FA%FA%FA%F5%F5%F5%FC%FC%FC%AB%AB%AB%ED%ED%ED%C0%C0%C0%B1%B1%B1%C7%C7%C7%E5%E5%E5%F4%F4%F4%B4%B4%B4%F7%F7%F7%C1%C1%C1%CF%CF%CF%E6%E6%E6%03%03%03%E4%E4%E4%DF%DF%DF%C4%C4%C4%EE%EE%EE%9A%9A%9A%C2%C2%C2%D4%D4%D4%E2%E2%E2%3C%3C%3C%A8%A8%A8%B0%B0%B0%F2%F2%F2%AD%AD%AD%B2%B2%B2%DB%DB%DB%AA%AA%AA%D9%D9%D9%D7%D7%D7%BB%BB%BB%26%26%26%CD%CD%CD%D8%D8%D8%B9%B9%B9%9E%9E%9E%CB%CB%CB%AE%AE%AE%FB%FB%FB%EC%EC%ECRRR%EA%EA%EA%85%85%85%F6%F6%F6JJJ%DC%DC%DC%0C%0C%0C%D1%D1%D1%A4%A4%A4)))%E7%E7%E7%5D%5D%5D%BD%BD%BD%A7%A7%A7%CC%CC%CC%B7%B7%B7%F1%F1%F1%D0%D0%D0YYYfff%CA%CA%CA%A6%A6%A6%F0%F0%F0%E0%E0%E0%B8%B8%B8%BF%BF%BF%E8%E8%E8%F3%F3%F3%C8%C8%C8zzz%A5%A5%A5%BE%BE%BENNN%C3%C3%C3%C6%C6%C6%C5%C5%C5%14%14%14jjj%DD%DD%DD%F8%F8%F8%D6%D6%D6%BA%BA%BA%BC%BC%BC%90%90%90nnn%1C%1C%1C%DE%DE%DE%96%96%96%82%82%82%8C%8C%8C%89%89%89aaatttTTT%87%87%87%93%93%93FFF%8E%8E%8EWWW%7F%7F%7F222www%DA%DA%DA%7C%7C%7C666qqqAAAlll%94%94%94xxx%A1%A1%A1%A2%A2%A2---%23%23%23%80%80%80%D2%D2%D2%AC%AC%AC!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%10%00%00%07%C8%80%00%82%00%03%82-h%09%83%8A%82%15_%1D%00%1BW%09%07-%25%8B%00Mo%3E%00j%60%00%14%02%3D%8A%15%04%00%11%3C%3Fe%7C%2B%3B%2F%00%07%04%01%03cE%3F%08%3E%5E%3A%05Q!6%15%11%20%12%00%1853p6Z%82%93O%02%05%17%8A%2FQ%85%8A%1D%2C%83)%3BQ%20%1E%97%10%0E%13%0CG%40l%5Eba%97%22-%24%0DR%83%17%3A%01%8B%18%CF%83%12%19%1B%7F1%8B%3F%02T%22%00%01%96%08%08%E2%AD%03%84!J%BA%20%60%01%C4%84%01%00%25*%00%20%20%E0%C4%8B%02%0F%04l%01%90%E4%C44%00%06HD%08%90a%04%00%2BQ4%5C%22%A0%E0%01%00%0E%0A%02%20%80%81%E2R%00a%00V%A4%88g%20%91%A0%40%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%0D%00%0B%00%00%07o%80%00%82%00%03%82%1Bt%85%83%82%17p8%00_s%03Z7L%832%3En%00g%1F%00w%16%0E%00%0F%1A%00%1Ch%1CP7'%16t%84bcA%12r.%3A%0C%20*2%15%00%15%02rb%12%07%82%07%22K%02%83%5B%5C%01%8A%00%1D%2CA%3FB%05%3D%CA%00%10%0E%13%0D%0D%05M%D3%22-%83%0Ba%C9%8A%18%17%00%06%14H!1%CA%3F%02%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%10%00%08%00%00%07d%80%00%82%00%03%82%0Ad%85%83%8A%00%3Db%0F%00ef%03N%3E%5D%8B%00Ic.%00lF%9C%3CT%8A%04N%00DP%1D%1BX(%3C5%00%06Y%01%03%11%20q%06%1B%5C%18A%0Dk2%1DE9%1A%00%1A%0C%02%11%061%82%09%10r%16o%05%01%83%17D%D0%8Aiw%83%2B%0C%13U%0B%97M%1BL%0CG%81%00!%F9%04%04%05%00%00%00%2C%03%00%00%00%0D%00%0A%00%00%07g%80%00%01%00%00R%40%03%84%89%002%05%04%00Hi%03%08cD%89%08%26%05%00%20e%00%02S%3A%8A%18z(%23d83.%00%10%18%018%07%5CT%17(Lv2VSu6%02B1%09%84%09%08n%3C3%3F%01%17D%83%8A%1B%40%89U%0B%8A%84%17idb0%05M%D0%008%1F%3C*S%0Ba%C9%89!%5D%89%81%00!%F9%04%04%05%00%00%00%2C%05%00%00%00%0B%00%0E%00%00%07y%80%00%00%3AL%01%82%87%00%0B%00%1C%26%01%12.%1D%87)%00%19%40%00-P8%87%02%1E%0Ey%17r%05%006%1E%01%5C%1428A%5EI%14_%3E61%09%82%03Zb3gA%01%86%88%23%A2%88%88Mc_Xd%C0%00%1EE7k_%BC%87%24%0E%871%88%017%7Cy%8A%0E%1D%10C%2CF%17wWmZ%02'%2F%05%0FzR%00%5B%1B%09%11%01%19%23%00VQ%8A%82%81%00!%F9%04%04%05%00%00%00%2C%08%00%01%00%08%00%0F%00%00%07b%80%0A%01%07-%25%00%87%23%00%14%02%15%87%00!2%3B%2F%00Z%17%01%0FY!Nqjc6%00%03%06%23Pb%2C%8E%00%1CO%A7%87%0B%1Be5.%8E%3DP_ve%8E%05V%AB%01f*gJ%00%17%26m%04%02oo6dK%16%05%00q%24%03%89%3E%7C%04%8E%82%17%60%CD%87)%01%00%22%09%8E%81%00!%F9%04%04%05%00%00%00%2C%06%00%02%00%0A%00%0E%00%00%07m%80%00%19%23%00%14%02%3D%00%89%1E%0E!2%3B%2F%00%07%04%01%142%0FY!6%15%11%20%12%09%89%03%07O%02!%18%89%A7%00G%90%A8%A7%1A%23H%3B%05%AC2%1B%5E%5EH%AC%1C%2B%AC%89%01c3d%0F%00%3BJqBf%04%05EfZ!_m%0E*.%00%1EG%03%03%3ES%00g%3C(%A8hS%01%15kR%A8Pp%03%00%9E%A7%81%00!%F9%04%04%05%00%00%00%2C%03%00%05%00%0D%00%0B%00%00%07r%80%02B1%09%00%00%03%07O%02%05%17%00%17D%01%86%92%1D%2C%92U%0B%92%92%10%0E%13%0CG%05M%99%86%1A%26%0A!R%0B%2C%91%99D(%92Hm%08%99%01zP%202%00-%1EFb%17%18%19n%1AG%7D5Z%00%13%60%11ch%2B3!%00%04D%03%1A%3Cp%03gu%00j3a%96%1F8%00_s%032FU%92%03%B2%00%5EX%85Z%85%86%81%00!%F9%04%04%05%00%00%00%2C%00%00%08%00%10%00%08%00%00%07e%80%13%0D%0D%40(%00%87%88%22-%24%0DR%88%14%02%03%88%87%18%17%93CP9%7B6%93%00)%02T%22%00%09%1F9%1B%04P%1B4%3D%1D%1B%22(%40%26%06%00KY%00G*%0A%1Bg'P%1C%00I'%92%87C7S%03%5Ef%00%23r%15%9D%00%1Ds%13%00d%3E%01Ie%2F%CF%01%10%87%3Bc%92Z%09%88%81%00!%F9%04%04%05%00%00%00%2C%00%00%06%00%0D%00%0A%00%00%07d%80%00%82V%1B%03%82%87%1D%2CP33fA%87%87%10%0E%7DEmE%19%90%82%22-%87%2C%24%86%90%18%17%00Cd%7Bu%12%99%3F%02%03F%7Ce%3Db%7F%0B2(%5D%08%2C%00G%98%1D3K!j%25y%5B%90%10_t%01%20e%00%3FQ%1A%87%17F%2B%00H5%01%220(%87%01%A9%00).%86%06%09%81%00!%F9%04%04%05%00%00%00%2C%00%00%03%00%0B%00%0D%00%00%07r%80%00O%18%00%3A%02%1E%0E!2%3B%03%3EW.%22X%192%0FY!%00Ml%7CsN1%00%00%03%07%9F%00%0Ed%03%A3%9F%5EX_p%1D%A8%9Fxk7hG%AF%A8%25%0C%A7%AF%10HmF%06%AF%03nS.%0B%0D%0CCCJ%5D%00%14%14%00%18P%0EL%05%0F%02%A36%5Ej%01%3F%23%00V%A3%0F5'%00%13%0A%01%08%A3%01%12%9F%2B)%01%00%81%00!%F9%04%04%05%00%00%00%2C%00%00%00%00%08%00%0F%00%00%07a%80%00%82%00%09%82%3A%838o%87%1C%83C%7Cu%00%19%00(%1E%00U%16!%0D%033s%0A%08hP'%93X*h%08%07%83%00%1C%5E%03%82%3Bedj%25%83dXXg(%A9%82%17D%01%83%12)ne%A8%00%03%1BP%05I%19%1D%10%00~q%00%3D%02'%2F%83%06%24%11%01%92%82%04%0A%0F%AA%81%00%3B";

function xpath(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function foreachxp(xp, fc, context) {
	var els = xpath(xp);
	if (els) {
		for (var i = 0; el = els.snapshotItem(i); i++) {
			fc(el);
		}
	}
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

function $(id) {
	return document.getElementById(id);
}

function txtNode (txt) {
	return document.createTextNode(txt);
}

function newEl(type) {
	return document.createElement(type);
}

function bmFuncCreator(href) {
	return function (e) {
		bm(e, href)
	}
}

function bm(e, trnt_id) {
//	GM_log("Bokm�rker " + trnt_id);

	var target = e.target;
	var status_img = document.createElement('img');
	status_img.title = 'Bokm�rker...';
	status_img.src = spinner;
	
	target.parentNode.parentNode.replaceChild(status_img, target.parentNode);
	
	var href = "http://" + location.host + '/bookmark_backend.php?id=' + trnt_id;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		onload: function(responseDetails) {
			if (responseDetails.status == 200) {
				
				status_img.parentNode.removeChild(status_img);
	//			GM_log(responseDetails.responseText);
			}
			else {
				status_img.parentNode.style.backgroundColor = 'red';
				status_img.parentNode.innerHTML = ':C';
			}
			
		}
	});
	
}



function addCol() {
	var reqbrw;
	var maintbl_xpath;
	
	if (location.pathname.match(/^\/req\.php(\?|$)/)) {
		reqbrw = true;
	}
	else {
		reqbrw = false;	
	}
	
	maintbl_xpath = "//table[@class='mainouter']/tbody/tr[2]/td[@class='outer']/table[not(@class='main')]";
	maintbl = xpathOne(maintbl_xpath);
	
	if (!maintbl) {
		GM_log("fann inte maintabellen, avslutar");
	}
	else {
		var rows = xpath('./tbody/tr', maintbl);
		var thead = rows.snapshotItem(0);
		var bm_row = document.createElement('td');
		bm_row.innerHTML = '<abbr title="Bokm�rk">BM</abbr>';
		bm_row.setAttribute('class', 'colhead');
		
		thead.insertBefore(bm_row, thead.getElementsByTagName('td')[2]);
		
	
		for (var i = 1; i < rows.snapshotLength; i++) {
			var row = rows.snapshotItem(i);	
			var details_link = xpath(".//a[starts-with(@href, 'details.php')][font/b]", row);
			details_link = details_link.snapshotItem(0);
				
			var trnt_id = details_link.getAttribute('href').match(/(\?|&)id=(.*?)(&|$)/)[2];

			var bm_cell = document.createElement('td');
			bm_cell.style.textAlign = 'center';
			row.insertBefore(bm_cell, row.getElementsByTagName('td')[2]);
			
			var bm_img = document.createElement('img');
			bm_img.setAttribute('class', 'bm_link_img');
			bm_img.setAttribute('src', 'http://swedvdr.org/pic/gem2.gif');
			bm_img.setAttribute('style', 'border: 0px');		
			
			var bm_link = document.createElement('a');
			bm_link.setAttribute('href', 'javascript:;');
			bm_link.addEventListener('click', bmFuncCreator(trnt_id), true);
			
			bm_link.appendChild(bm_img);
			bm_cell.appendChild(bm_link);	
		}
		
	}
}

function getBookmarked() {
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + location.host + '/bookmarks.php',
		onload: function(responseDetails) {
			
			//<a href="details.php?id=3137&amp;hit=1"><font size="2">
			var regex = new RegExp('<a href="details\\.php\\?id=(.*?)&amp;hit=1"><font size=2', 'i');
			
			if (responseDetails.status == 200) {
				var html = responseDetails.responseText.replace(/\r\n/, '');
				var res;
				var bookmarked_torrents = new Array();
				
				while (res = regex.exec(html)) {
					bookmarked_torrents.push(res[1]);
					html = RegExp.rightContext;
				}
				
				removeBookmarked(bookmarked_torrents);
			}
		}
	});


}

function removeBookmarked(bookmarked_torrents) {
	bookmarked_torrents.forEach(function(v, i, a) {
		var gem = xpathOne("//img[@class='bm_link_img' and ancestor::tr[1]//a[contains(@href, 'id=" + v + "')] ]")
		if (gem)
			gem.parentNode.removeChild(gem);
	});
}

addCol();
getBookmarked();
