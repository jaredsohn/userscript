// ==UserScript==
// @name           Mesajları Sakla
// @namespace      script.betterday.co.uk
// @description    Size gelen mesajları saklama v.1
// @include        http://s*.ikariam.*/*
// @exclude        http://support.ikariam.*/*
// ==/UserScript==

/* script version 0.1 */

/* author : Nick Sewell <script@betterday.co.uk> (aka CactiFantastico, BagBag) */

/* this script may NOT be re-packaged or bundled without prior WRITTEN consent from the author */

var scriptStart = (new Date()).getTime();

var game = function () { 
	var host = document.location.host.split(".");
	switch (host.length) {
	case 3:
		return { server: host[2], world: host[0], key: host[2]+"."+host[0], view: document.getElementsByTagName("body")[0].id };
		break;
	case 4:
		return { server: host[1], world: host[0], key: host[1]+"."+host[0], view: document.getElementsByTagName("body")[0].id };
		break;
	case 5:
		return { server: host[3], world: host[0], key: host[3]+"."+host[0], view: document.getElementsByTagName("body")[0].id };
		break;
	default:
		return false;
	}
}();

var list = function(key, delimiter) {
	var _local = "";
	var _key = key;
	var _delimiter = delimiter;
	var _save = true;
	this.load = function() { _local = GM_getValue(_key, ""); };
	this.save = function() { window.setTimeout(GM_setValue, 0, _key, _local); };
	this.exist = function(item) {
		var exist = new RegExp("(^|"+_delimiter+")"+item+"("+_delimiter+"|$)", "i");
		return exist.test(_local);
	};
	this.add = function(item) {
		if (!this.exist(item)) {
			_local += (_local.length === 0?item:_delimiter+item);
			if (_save) { this.save(); }
			return true;
		}
		return false;
	};
	this.remove = function(item) {
		var find = new RegExp("(^|"+_delimiter+")("+item+")("+_delimiter+"|$)","i");
		if (this.exist(item)) {
			_local = _local.replace(find, function(match, a,b,c) { if (a && c) { return _delimiter; } if ( (a && !c) || (!a && c) ) { return ""; } if ( !a && !c ) { return ""; } });
			if (_save) { this.save(); }
			return true;
		}
		return false;
	};
	this.load();
};

var button_down = function() {
	this.setAttribute("class", "button down");
};

var button_up = function() {
	this.setAttribute("class", "button");
};

var messageManager = function(filter, playerid) {
	var _this = this;
	var _list = [];
	var _player = playerid;
	var _filter = filter;
	this.add = function(container, messageid) {
		var subject;
		button = document.createElement("div");
		button.setAttribute("id", "filter_toggle"+messageid);
		button.setAttribute("class", "button");
		button.addEventListener("mousedown", button_down, false);
		button.addEventListener("mouseout", button_up, false);
		button.addEventListener("mouseup", button_up, false);
		button.addEventListener("click", this.toggleIgnore, false);
		if (_filter.exist(_player)) {
			button.innerHTML = "Mesajı Gizleme";
			subject = document.evaluate("//tr[@id='message"+messageid+"']/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			subject.innerHTML = "<b>"+subject.innerHTML+"</b>";
		} else {
			button.innerHTML = "Block User";
		}
		container.appendChild(button);
		_list.push(messageid);
	};
	this.hide = function() {
		var item;
		for (item in _list) {
			document.getElementById("message"+_list[item]).setAttribute("style", "display: none;");
			document.getElementById("tbl_mail"+_list[item]).setAttribute("style", "display: none;");
			document.getElementById("tbl_reply"+_list[item]).setAttribute("style", "display: none;");
		}
	};
	this.show = function() {
		var item;
		for (item in _list) {
			document.getElementById("message"+_list[item]).removeAttribute("style");
		}
	}
	this.count = function() {
		return _list.length;
	};
	this.toggleIgnore = function() {
		var item, subject;
		if (_filter.exist(_player)) {
			_filter.remove(_player);
			for (item in _list) {
				subject = document.evaluate("//tr[@id='message"+_list[item]+"']/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				subject.innerHTML = subject.innerHTML.replace(/<b>|<\/b>/g, "");
				document.getElementById("filter_toggle"+_list[item]).innerHTML = "Mesajı Gizle";
			}
		} else {
			_filter.add(_player);
			for (item in _list) {
				subject = document.evaluate("//tr[@id='message"+_list[item]+"']/td[4]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				subject.innerHTML = "<b>"+subject.innerHTML+"</b>";
				document.getElementById("filter_toggle"+_list[item]).innerHTML = "Mesajı Gizleme !";
			}
			if (hide === true) { _this.hide(); }
		}
	};
	this.player = function() { 
		return _player;
	}
};

if (game) {

	if (game.view === "diplomacyAdvisor") {
		var filter = new list(game.key+".filter", ",");
		var menu, button, sender, messages = { }, hide = true;

		var data, expression = /[\?&]receiverId=([^&#]*)&replyTo=([^&#]*)/;

		var xpathItem, xpathResult = document.evaluate("//table[id('messages')]/tbody/tr/td[@class='reply']/span[1]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null), xpathIndex = xpathResult.snapshotLength - 1;

		do {
			xpathItem = xpathResult.snapshotItem(xpathIndex);
			data = expression.exec(xpathItem.getElementsByTagName("a")[0].href);
			if (messages.hasOwnProperty("player"+data[1])) {
				messages["player"+data[1]].add(xpathItem, String(data[2]));
			} else {
				messages["player"+data[1]] = new messageManager(filter, data[1]);
				messages["player"+data[1]].add(xpathItem, String(data[2]));
			}
		} while (xpathIndex--);

		for (sender in messages) {
			if (messages.hasOwnProperty(sender)) {
				if  (filter.exist(messages[sender].player())) {
					messages[sender].hide();
				}
			}
		}

		xpathItem = document.evaluate("//div[id('container2')]/div[@class='dynamic'][last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		menu = document.createElement("div");
		menu.setAttribute("class", "dynamic");
		menu.innerHTML = "<h3 class=\"header\">Mesajı Gizle/Göster</h3><div class=\"content\"><div class=\"centerButton\"><div><div id=\"messageBlock_toggle\" filtered=\"true\" title=\"www.ikariam.forumm.biz\" class=\"button\"><b>Show Blocked Mail</b></div></div></div></div><div class=\"footer\"></div>";
		xpathItem.parentNode.insertBefore(menu, xpathItem.nextSibling);
		
		button = document.getElementById("messageBlock_toggle");
		button.addEventListener("mousedown", button_down, false);
		button.addEventListener("mouseout", button_up, false);
		button.addEventListener("mouseup", button_up, false);
		button.addEventListener("click", function() { 
			if (this.getAttribute("filtered") === "true") {
				this.setAttribute("filtered", "false");
				this.innerHTML = "Seçili Mesajı Gizle";
				hide = false;
				for (sender in messages) {
					if (messages[sender].player) {
						messages[sender].show();
					}
				}
			}
			else {
				this.innerHTML = "Gizli Mesajları Göster";
				this.setAttribute("filtered", "true");
				hide = true;
				for (sender in messages) {
					if (messages[sender].player) {
						if (filter.exist(messages[sender].player())) {
							messages[sender].hide();
						}
					}
				}
			}
		}, false);
		
	}
};