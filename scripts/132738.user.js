// ==UserScript==
// @name           SHIRYU
// @namespace      Mana
// @description    Ignore some persons on jeuxvideo.com forums
// @version        1.0.0
// @include        http://www.jeuxvideo.com/forums/*
// @copyright      2012 Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// @resource       licence   http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

(function () {
	"use strict";
	var shiryu;
	
	shiryu = {data:{}};
	shiryu.eyes = function eyes() {
		var i;
		//
		this.add("shasha");
		this.add("shashacal");
		this.add("shashahugs1995");
		for (i = 10; i < 100; i += 1) this.add("shasha" + i);
		for (i = 10; i < 100; i += 1) this.add("shashaa" + i);
		for (i = 10; i < 100; i += 1) this.add("shashaaaa" + i);
	};
	shiryu.add = function add(pseudo) {
		this.data[pseudo.toLowerCase()] = true;
	};
	shiryu.init = function init() {
		var mode = this.analysis(location.href);
		if (this.hasOwnProperty("mode_" + mode)) {
			this.eyes();
			this["mode_" + mode].shield();
		}
	};
	shiryu.analysis = function analysis(url) {
		if (new RegExp("forums/([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([A-Za-z0-9]+)-([0-9]+)-([0-9]+)-(.+)\\.htm$").test(url)) {
			return RegExp.$1;
		}
		return "";
	};
	shiryu.drake = function drake(elem) {
		elem.style.display = "none";
	};
	shiryu.detect = function detect(pseudo) {
		return this.data.hasOwnProperty(pseudo.toLowerCase());
	};
	shiryu.mode_0 = {_:shiryu};
	shiryu.mode_0.shield = function shield() {
		var liste, tr, i, td, bloc;
		liste = document.getElementById("liste_topics");
		if (liste) {
			tr = liste.getElementsByTagName("tr");
		} else {
			tr = [];
		}
		for (i = 0; i < tr.length; i += 1) {
			td = tr[i].getElementsByTagName("td");
			if (td.length > 3) {
				bloc = td[td.length - 3];
				if (bloc && bloc.childNodes.length === 1) {
					if (this._.detect(bloc.firstChild.nodeValue)) {
						this._.drake(tr[i]);
					}
				}
			}
		}
	};
	shiryu.mode_1 = {_:shiryu};
	shiryu.mode_1.shield = function shield() {
		var ul, i, strong;
		ul = document.getElementsByTagName("ul");
		for (i = 0; i < ul.length; i += 1) {
			strong = ul[i].getElementsByTagName("strong")[0];
			if (strong && strong.childNodes.length === 1) {
				if (this._.detect(strong.firstChild.nodeValue)) {
					this._.drake(ul[i].parentNode);
				}
			}
		}
	};
	shiryu.mode_3 = shiryu.mode_1;
	shiryu.init();
}());

