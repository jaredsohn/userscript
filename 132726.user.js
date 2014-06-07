// ==UserScript==
// @name           ASSASSIN
// @namespace      Mana
// @description    Only show yellow threads on jeuxvideo.com forums
// @version        1.0.2
// @include        http://www.jeuxvideo.com/forums/0-*
// @copyright      2012 Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// @resource       licence   http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

(function () {
	"use strict";
	var assassin;
	
	assassin = {};
	assassin.init = function init() {
		var table, tr, self;
		table = document.getElementById("liste_topics");	// Thread table
		if (table) {
			tr = table.getElementsByTagName("tr");	// Threads list
		}
		if (tr) {
			this.ref = tr[0];	// Title line
		}
		if (this.ref) {
			this.url = location.href;
			this.delay = 1000;	// 1 seconds before each refresh
			this.aim(tr);
			self = this;
			setInterval(function () {return self.done();}, self.delay);
		}
	};
	assassin.analysis = function analysis(url) {
		if (new RegExp("forums/([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([A-Za-z0-9]+)-([0-9]+)-([0-9]+)-(.+)\\.htm$").test(url)) {
			if (RegExp.$1 === "0") {
				if (RegExp.$7 === "4") {
					url = RegExp.leftContext + "forums/";
					url += [0, RegExp.$2, RegExp.$3, RegExp.$4, RegExp.$5, (parseInt(RegExp.$6, 10) + 25), RegExp.$7, RegExp.$8].join("-");
					url += ".htm";
				}
				return url;
			}
		}
		return "";
	};
	assassin.aim = function aim(trlist) {
		var i, img, url, last, list;
		if (trlist.length > 1) {
			this.url = this.analysis(this.url);
			list = [];
			for (i = 1; i < trlist.length; i += 1) {
				img = trlist[i].getElementsByTagName("img")[0];
				if (img) {
					url = img.src.split("/").pop();
					last = url.toLowerCase();	// Message search : same as thread
				}
				switch (last) {
				case "topic_marque_off.gif":
				case "topic_marque_on.gif":
				case "topic_dossier1.gif":
					list.push(trlist[i]);
					break;
				case "topic_dossier2.gif":
				case "topic_cadenas.gif":
					this.append(trlist[i], false);
					break;
				}
			}
			while (list.length > 0) {
				this.append(list.shift(), true);
			}
			this.ref.parentNode.insertBefore(this.ref, this.ref.parentNode.firstChild);	// Set back the title line at top
		}
	};
	assassin.append = function append(tr, bool) {
		var id, a, prec;
		// Prevent having twice the same thread by giving them a unique id
		a = tr.getElementsByTagName("a");
		if (a.length > 0) {
			a = a[a.length - 1];
			if (a) {
				a.target = "_blank";
				id = a.name;	// Creation of unique id with the thread unique name
			}
		}
		if (id) {
			prec = document.getElementById(id);
			if (prec) {
				if (this.url === location.href) {
					prec.parentNode.removeChild(prec);	// Removing previous occurence
				} else {
					bool = false;
				}
			}
			tr.id = id;
		}
		if (bool) {
			if (this.url === location.href) {
				this.ref.parentNode.insertBefore(tr, this.ref);	// Append the thread to the list;
			} else {
				this.ref.parentNode.appendChild(tr);
			}
		} else {
			tr.style.display = "none";
		}
	};
	assassin.done = function done() {
		var self, xhr;
		self = this;
		xhr = this.xhr;
		if (xhr && xhr.readyState < 4) {
			return ;
		}
		xhr = new XMLHttpRequest();
		this.xhr = xhr;
		xhr.open("GET", self.url, true);
		xhr.onreadystatechange = function onreadystatechange() {
			var dummy, tri, tr;
			if (this.readyState === 4) {
				if (this.status === 200) {
					dummy = document.createElement("div");
					dummy.innerHTML = this.responseText;
					tri = dummy.getElementsByClassName("tr1")[0];
					if (tri) {
						tr = tri.parentNode.getElementsByTagName("tr");
						self.aim(tr);
						dummy.innerHTML = "";
						return;
					}
				}
			}
		};
		xhr.send();
	};
	assassin.init();
}());

