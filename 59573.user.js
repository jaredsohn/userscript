// ==UserScript==
// @name           Instaposter
// @version        1.2.1
// @namespace      http:/www.nantan.net/blog/
// @description    This script adds Google Reader article to Instapaper by pushing the 'h' key or clicking the Instapaper icon.
//                 Please copy value (XXXXXXXXXXXX) of KEY from the part of your Read Later bookmarklet ('http://www.instapaper.com/j/XXXXXXXXXXXX?u=').
// @include        http://www.google.com/reader/*
// @include        https://www.google.com/reader/*
// @include        http://www.google.co.jp/reader/*
// @include        https://www.google.co.jp/reader/*
// ==/UserScript==

var KEY = 'XXXXXXXXXXXX';
var TRIGGER = 'h';

function instapaper(title, url, logined) {
	try {
		var d = document, i = d.createElement('iframe'), time = new Date().getTime().toString();
		i.setAttribute('name', time);
		i.setAttribute('id', time);
		i.setAttribute('style',
			'z-index: 2147483647;\
			background-color: #fff;\
			position: fixed;\
			left: 10px;\
			top: 10px;\
			width: 168px;\
			height: 100px;\
			border: 3px solid #aaa;');
		d.body.appendChild(i);
		
		if (logined) {
			var e = unsafeWindow.getSelection,
				k = d.getSelection,
				x = d.selection,
				s = (e? e(): (k)? k(): (x? x.createRange().text: 0)),
				e = encodeURIComponent,
				h = 0,
				p = 'k=' + KEY + '&u=' + e(url) + '&t=' + e(title) + '&s=' + e(s.length < 6144 ? s : '');
			unsafeWindow[time].document.write(
				'<html><body style="color: #555; background-color: #fff; text-align: center; margin: 0px; font-family: Georgia, Times, serif; font-size: 26px;">' +
				'<img style="display: block; position: fixed; bottom: 4px; left: 72px;" src="data:image/gif;base64,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"/>' +
				'<div style="text-align: center; width: 80%; padding-bottom: 1px; margin: 0 auto 15px auto; font-size: 13px; border-bottom: 1px solid #ccc; color: #333;">Instapaper</div>' +
				'Saving...' +
				'<form action="http://www.instapaper.com/bookmarklet/post_v5" method="post" id="f">' +
				'<input type="hidden" name="p" value="'+p+'"/>' +
				'<input type="hidden" name="b" id="b" value=""/>' +
				'</form>' +
				'<scr'+'ipt>' +
				'setTimeout(function() { document.getElementById("b").value = decodeURIComponent("' + e(h) + '"); document.getElementById("f").submit() }, 1);' +
				'</scr'+'ipt>' +
				'</body></html>'
			);
			setTimeout(function() { d.body.removeChild(i) }, 2000);
		} else {
			unsafeWindow[time].document.write(
				'<html><body style="color: #555; background-color: #fff; text-align: center; margin: 0px; font-family: Georgia, Times, serif; font-size: 26px;">' +
				'<scr'+'ipt>' +
				'function openLoginWindow() { window.open("http://www.instapaper.com/user/login"); closeFrame() }' +
				'function closeFrame() { var f = parent.document.getElementById("' + time + '"); f.style.display = "none"; f.parentNode.removeChild(f) }' +
				'</scr'+'ipt>' +
				'<div style="text-align: center; width: 80%; margin: 20px auto 15px auto; font-size: 13px;">' +
				'<a href="#" onclick="openLoginWindow()">Please log in to Instapaper.</a>' +
				'<div style="margin-top: 10px"><a href="#" onclick="closeFrame()">close</a></div>' +
				'</div>' +
				'</body></html>'
			);
		}
	} catch(e) {
		//alert('Please wait until the page has loaded.');
		alert(e.message);
	}
}
function post(title, url) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.instapaper.com/j/' + KEY + '?u=&' + new Date().getTime(),
		onload: function(res) {
			var logined = true;
			if (res.responseText.indexOf('http://www.instapaper.com/user/login') >= 0) {
				logined = false;
			}
			instapaper(title, url, logined);
		}
	});
}
function isZenbunMode() {
	var mode = document.getElementById('view-cards').className;
	return mode.indexOf('link-selected') >= 0;
}
document.addEventListener('keydown', function(e) {
	if (e.target.nodeName.toLowerCase() != 'input' && !e.shiftKey && !e.altKey && !e.ctrlKey) {
		var entry = document.getElementById('current-entry');
		if (!entry) return;
		var title, url;
		if (isZenbunMode()) {
			title = entry.getElementsByTagName('h2')[0].firstChild.firstChild.data;
			url = entry.getElementsByTagName('h2')[0].firstChild.href;
		} else {
			title = entry.getElementsByTagName('h2')[0].firstChild.data;
			url = entry.getElementsByClassName('entry-original')[0].href;
		}
		if (String.fromCharCode(e.keyCode).toLowerCase() == TRIGGER.toLowerCase()) {
			post(title, url);
			e.preventDefault();
		}
	}
}, false);

var chrome = document.getElementById('chrome');
if (chrome) {
	var instaIcon = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA'+
			'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAE2SURBVHjalJO9TsMw'+
			'FIW/VpGoKII2NIJKjEhMSGUIb8BTwF7BC/AKPAGEHebuPEHVJYgRiQkkQAxNfwm2gxnStE4pIT2L'+
			'Zfvo87n3ygXX8y+BU5bXVafZOMP1fN0OtW51tXY9X2fJ9Xzd6mrdDqdeLICXMTz1Z+jD63sAOs3G'+
			'r2cfexDp2b4IoBTIKF9uGcX+RFYCEHJ2uOjlREKmAcWEKkS+BEKk01oAUsYXdceZ1r9IdceJAXIO'+
			'MBxrgkFIzbap2XZmgmDwybBUmkugFM+vbwT93r8lVNY32KvupAFCKYJ+L7N55oiF2k43Mco7w4lM'+
			'vwXwZRyYTfwrkemPE0TfKcNauZqdwPAXAXY3V1KGg/pqJsD0F/Yv7m5KFed42a8YBh+3D+dHJwWg'+
			'DGxN1rwaAe9a69HPAFJnrBBEkjKJAAAAAElFTkSuQmCC';
	function makeClickHandler(entry) {
		var mode = document.getElementById('view-cards').className;
		var title, url;
		if (mode.indexOf('link-selected') >= 0) {
			title = entry.getElementsByTagName('h2')[0].firstChild.firstChild.data;
			url = entry.getElementsByTagName('h2')[0].firstChild.href;
		} else {
			title = entry.getElementsByTagName('h2')[0].firstChild.data;
			url = entry.getElementsByClassName('entry-original')[0].href;
		}
		return function(e) {
			post(title, url);
			e.stopPropagation();
		}
	}
	function setTrigger(e) {;
		if (e.target.className.split(' ').indexOf('entry') < 0) return;
		var profile = document.getElementsByClassName('entry-profile-nested-image');
		var single = document.getElementsByClassName('single-source');
		var nodes;
		if (profile.length > 0) {
			if (isZenbunMode()) {
				nodes = e.target.getElementsByClassName('entry-title');
			} else {
				nodes = e.target.getElementsByClassName('entry-secondary');
			}
		} else if (single.length == 0 && !isZenbunMode()) {
			nodes = e.target.getElementsByClassName('entry-source-title');
		} else {
			nodes = e.target.getElementsByClassName('entry-secondary');
		}
		if (nodes.length == 0) {
			nodes = e.target.getElementsByClassName('entry-title');
		}
		
		if (nodes.length > 0) {
			var img = document.createElement('img');
			img.width = 15;
			img.height = 15;
			img.style.marginRight = '9px';
			img.style.cursor = 'pointer';
			img.style.verticalAlign = 'top';
			img.src = instaIcon;
			img.addEventListener('click', makeClickHandler(e.target), false);
			nodes[0].insertBefore(img, nodes[0].firstChild);
		}
	}
	function setup(e) {
		var entries = document.getElementById('entries');
		if (entries) {
			chrome.removeEventListener('DOMNodeInserted', setup, false);
			entries.addEventListener('DOMNodeInserted', setTrigger, false);
			setTrigger(e);
		}
	}
	chrome.addEventListener('DOMNodeInserted', setup, false);
}
