// ==UserScript==
// @name WEB+DB Press Prev/Next Navigation
// @namespace http://calmize.net/
// @description add navigation to prev/next on a back number's index page of "WEB+DB PRESS".
// @include http://gihyo.jp/magazine/wdpress/archive/*
// @license public domain
// @author calmize
// @version 0.2
// @published 2012-04-26
// ==/UserScript==

(function(){
	var DEBUG = false;
	var ASYNC = false;

	window.addEventListener('DOMContentLoaded', setPrevNext, false);

	function setPrevNext() {
		var func = function() {
			try {
				var navibar = getNaviBar();
				if (navibar == null) return;

				navibar.id = "custom_navibar";
				document.getElementById('toc').appendChild( navibar );
			} catch(e) {
				log(e);
			}
		};
		if (ASYNC) {
			log("exec async.")
			setTimeout(func, 0);
		} else {
			log("exec sync.")
			func();
		}
	}

	function getNaviBar() {
		var nxt = getNext();
		var prv = getPrev();

		var navi = document.createElement('div');
		navi.style.width = "100%";
		navi.style.height = "2em";
		navi.style.textAlign = "center";

		if (prv == null && nxt == null) return null;
		if (prv) {
			navi.appendChild( prv );
			prv.style.styleFloat = "right";
		}
		if (nxt) {
			navi.appendChild( nxt );
			nxt.style.styleFloat = "left";
		}

		return navi;
	}

	function getNext() {
		var nxt = getNavi("< Vol.{vol}", 1);
		if (nxt) nxt.id = "custom_nxt";
		return nxt;
	}

	function getPrev() {
		var prv = getNavi("Vol.{vol} >", -1);
		if (prv) prv.id = "custom_prv";
		return prv;
	}

	function getNavi(text, direction) {
		var data = getAnchorData(direction);
		if (data == null) return null;
		log("found: " + data.url);
		var anchor = document.createElement('a');
		anchor.innerText = text.replace("{vol}", data.vol);
		anchor.href = data.url;
		anchor.style.fontSize = "130%";
		anchor.style.fontWeight = "bold";

		var div = document.createElement('div');
		div.style.width = "49%";
		div.style.position = "relative";
		div.style.textAlign = "center";
		div.style.cursor = "pointer";
		div.style.backgroundColor = "#99CCFF";

		var func = function() {
			var _a = anchor;
			return function() {
				_a.click();
			};
		};
		div.onclick = func();

		div.appendChild(anchor);

		return div;
	}

	function getAnchorData(direction) {
		var pathname_array = location.pathname.split('/')
		var vol = pathname_array.pop().substr(3);
		vol = parseInt(vol) + direction;
		var year = pathname_array.pop();

		var common_url = location.protocol + "//" + location.hostname;
		common_url += pathname_array.join("/");
		var urls = [
			common_url + "/" + year + "/vol" + vol,
			common_url + "/" + (parseInt(year) + direction)  + "/vol" + vol
		];

		var req = new XMLHttpRequest();
		for (var i = 0; i < urls.length; i++) {
			var url = urls[i];
			req.open('GET', url, false);
			req.send(null);
			if (req.status == 200) {
				return {"url": url + "#toc", "vol": vol};
			}
		}

		return null;
	}

	function log(message) {
		if(!DEBUG) return;
		if(console) {
			console.log(message);
		} else if (!!window.opera) {
			opera.postError(message);
		}
	}
})();
