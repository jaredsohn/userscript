// ==UserScript==
// @name        ARCHITECT
// @namespace   Mana
// @include     http://www.jeuxvideo.com/forums/0-*
// @version     1
// ==/UserScript==

(function () {
	var architect;
	
	architect = {};
	architect.parseUrl = function parseUrl(url) {
		if (new RegExp("http://.+.jeuxvideo.com/forums/1-([0-9]+)-([0-9]+)-.+-.+-.+-.+-.+.htm.*").test(url)) {
			return [RegExp.$1, RegExp.$2];
		}
	};
	architect.writeFormUrl = function writeFormUrl(forum, topic) {
		return "http://www.jeuxvideo.com/forums/3-" + forum + "-" + topic + "-1-0-1-0-0.htm#form_post";
	};
	architect.formLink = function formLink() {
		var bloc_date, data, link;
		bloc_date = this.parse("bloc_date");
		if (bloc_date) {
			data = this.parseUrl(this.parse("link"));
			if (data) {
				link = document.createElement("a");
				link.href = this.writeFormUrl(data.shift(), data.shift());
				while (bloc_date.childNodes.length > 0) {
					link.appendChild(bloc_date.firstChild);
				}
				link.style.color = "#000000";
				link.style.fontWeight = "normal";
				link.style.fontSize = "x-small";
				bloc_date.appendChild(link);
			}
		}
	};
	architect.parse = function parse(key, redo) {
		var temp, value;
		if (!this.data.hasOwnProperty(key) || redo) {
			switch (key) {
			case "link":
				temp = this.parse("bloc_sujet");
				if (temp) {
					temp = temp.getElementsByTagName("a")[0];
					if (temp) {
						value = temp.href;
					}
				}
				break;
			case "bloc_sujet":
			case "bloc_date":
				temp = this.parse("tr");
				if (temp) {
					temp = temp.getElementsByTagName("td");
					if (temp.length > 4) {
						this.data.bloc_sujet = temp[temp.length - 4];
						this.data.bloc_date = temp[temp.length - 1];
					}
					value = this.data[key];
				}
				break;
			}
			this.data[key] = value;
		}
		return this.data[key];
	};
	architect.treat = function treat(tr, i) {
		this.data = {tr: tr, i: i};
		this.formLink();
		delete this.data;
	};
	architect.launch = function launch() {
		var table, liste, i;
		table = document.getElementById("liste_topics");
		if (table) {
			liste = table.getElementsByTagName("tr");
			for (i = 1; i < liste.length; i++) {
				this.treat(liste[i], i);
			}
		}
		delete this;
	};
	
	architect.launch();
}());