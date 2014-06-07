// Copyright (C) 2005, hatena.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Contributor(s): SHIMODA Hiroshi <piro@p.club.ne.jp>
//                 takef <metallicmonkey@gmail.com>
//
// ==UserScript==
// @name          Hatena Diary KeywordPopup
// @namespace     http://www.hatena.ne.jp
// @include       http://d.hatena.ne.jp/*
// @include       http://*.g.hatena.ne.jp/*
// @include       http://anond.hatelabo.jp/*
// ==/UserScript==

(function () {
	var popupTimerID = null;
	var fadeInIntervalID = null;
	var fadeOutIntervalID = null;
	var xpos = 0;
	var ypos = 0;
	var keywordCache = new Array();
	var popupTargetKeyword = null;
	
	function createPopup() {
		var popup = document.createElement('div');
		with(popup.style) {
			visibility = 'hidden';
			fontSize = '10pt';
			fontFamily = 'sans-serif';
			textAlign = 'left';
			lineHeight = '110%';
			color = '#333333';
			paddingLeft = '5px';
			paddingRight = '5px';
			backgroundColor = 'cornsilk';
			border = '1px solid #333333';
			opacity = '0';
			
			position = 'absolute';
			left = xpos;
			top = ypos+25;
			width = '200';
		}
		if (popupTargetKeyword) {
			popup.addEventListener('mouseover', function() {
				window.clearTimeout(popupTargetKeyword.hidePopupTimer);
			}, false);
			popup.addEventListener('mouseout', hidePopup, false);
			popup.addEventListener('dblclick', function(aEvent) {
				switch (aEvent.button)
				{
					case 0:
						location.href = popupTargetKeyword.href;
						break;
					default:
						break;
				}
			}, false);
			popup.addEventListener('click', function(aEvent) {
				switch (aEvent.button)
				{
					case 1:
						window.open(popupTargetKeyword.href);
						break;
					default:
						break;
				}
			}, false);
			popup.title = '\u30af\u30ea\u30c3\u30af\u3067\u8a73\u7d30\u3092\u8868\u793a';
		}
		popup.id = "popup";
		return popup;
	}
	function fadeOutPopup() {
		var popup = document.getElementById('popup');
		if (popup) {
			var op = parseFloat(popup.style.opacity);
			var newop = op-0.1;
			if (newop<=0) {
				document.body.removeChild(popup);
				clearInterval(fadeOutIntervalID);
			} else
				popup.style.opacity = newop;
		} else {
			clearInterval(fadeOutIntervalID);
		}
	}
	function fadeInPopup() {
		var popup = document.getElementById('popup');
		if (popup) {
			var op = parseFloat(popup.style.opacity);
			var newop = op+0.1;
			if (newop>=1) {
				popup.style.opacity = 0.99;
				clearInterval(fadeInIntervalID);
			} else {
				popup.style.opacity = newop;
			}
		} else {
			clearInterval(fadeInIntervalID);
		}
	}
	
	var xmlns = new Namespace("http://purl.org/rss/1.0/");
	function appendPopup(xml) {
		var popup = document.getElementById('popup');
		if (popup) {
			clearInterval(fadeOutIntervalID);
			document.body.removeChild(popup);
		}
		var keywordTitle = "";
		var popupDiv = createPopup();
		var items = xml..xmlns::item;
		for (var i=0; i<items.length(); i++) {
			var item = items[i];
			if (i == 0) {
				var titleDiv = document.createElement('div');
				keywordTitle = titleDiv.textContent = item.xmlns::title;
				with(titleDiv.style) {
					paddingTop = '5px';
					fontWeight = 'bold';
					fontSize = '11pt';
				}
				popupDiv.appendChild(titleDiv);
			}
			
			var kwdDiv = document.createElement('div');
			kwdDiv.textContent = item.xmlns::description;
			with(kwdDiv.style) {
				marginBottom = '0px';
				paddingTop = '5px';
				paddingBottom = '5px';
				if (i != items.length()-1)
					borderBottom = '1px dashed #333333';
			}
			popupDiv.appendChild(kwdDiv);
		}
		if (! keywordCache[keywordTitle])
			keywordCache[keywordTitle] = xml;
		
		popup = document.body.appendChild(popupDiv);
		
		var r = popup.offsetLeft + popup.offsetWidth;
		if (r > window.scrollX+document.body.clientWidth) {
			popup.style.left = window.scrollX+document.body.clientWidth - popup.offsetWidth -10;
		}
		var b = popup.offsetTop + popup.offsetHeight;
		if (b > window.scrollY+document.body.clientHeight) {
			var t = window.scrollY + document.body.clientHeight - popup.offsetHeight - 10;
			if (t<window.scrollY)
				t = window.scrollY+10;
			popup.style.top = t;
		}
		popup.style.visibility = 'visible';
		fadeInIntervalID = setInterval(fadeInPopup, 30);
	}
	function onLoadKeyword(r) {
		appendPopup(new XML(r.responseText.replace(/^<\?.*?\?>/,'')));
	}
	function loadKeyword(rssurl, word) {
		if (keywordCache[word]) {
			var popup = document.getElementById('popup');
			if (popup) {
				clearInterval(fadeOutIntervalID);
				document.body.removeChild(popup);
			}
			appendPopup(keywordCache[word]);
			return true;
		}
		GM_xmlhttpRequest({ method: 'GET', url: rssurl, onload: onLoadKeyword });
	}
	function showPopup(e) {
		var aTag   = e.target;
		var url    = aTag.href.replace(/^http:\/\/anond\.hatelabo\.jp/, 'http://d.hatena.ne.jp');
		var rssurl = url+"?mode=rss";
		xpos = e.pageX;
		ypos = e.pageY;
		popupTargetKeyword = aTag;
		document.addEventListener('mousemove', setPos, false);
		popupTimerID = setTimeout(loadKeyword, 600, rssurl, aTag.innerHTML);
		if (aTag.hidePopupTimer)
			window.clearTimeout(aTag.hidePopupTimer);
	}
	function hidePopup(e) {
		clearTimeout(popupTimerID);
		popupTargetKeyword.hidePopupTimer = window.setTimeout(delayedHidePopup, 250);
	}
	function delayedHidePopup() {
		document.removeEventListener('mousemove', setPos, false);
		var popup = document.getElementById('popup');
		if (popup) {
			clearInterval(fadeInIntervalID);
			clearInterval(fadeOutIntervalID);
			fadeOutIntervalID = setInterval(fadeOutPopup, 30);
		}
	}
	function addKeywordEvents() {
		var aTags = document.evaluate('//A[@class="keyword"]|//A[@class="okeyword"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, len = aTags.snapshotLength; i < len; i++) {
			var a = aTags.snapshotItem(i);
			a.addEventListener('mouseover', showPopup, false);
			a.addEventListener('mouseout', hidePopup, false);
		}
	}
	function setPos(e) {
		xpos = e.pageX;
		ypos = e.pageY;
	}
	addKeywordEvents();
	document.captureEvents(Event.MOUSEMOVE);
})();
