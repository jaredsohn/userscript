/*****************************************************************************\
* Copyright (C) 2011, Luthien Sofea Elanesse                                  *
*                                                                             *
*    This program is free software: you can redistribute it and/or modify     *
*    it under the terms of the GNU General Public License as published by     *
*    the Free Software Foundation, either version 3 of the License, or        *
*    (at your option) any later version.                                      *
*                                                                             *
*    This program is distributed in the hope that it will be useful,          *
*    but WITHOUT ANY WARRANTY; without even the implied warranty of           *
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
*    GNU General Public License for more details.                             *
*                                                                             *
*    You should have received a copy of the GNU General Public License        *
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.    *
\*****************************************************************************/

// ==UserScript==
// @name           [MK] Epingle
// @namespace      Mana
// @description    Colorie les épingles de jeuxvideo.com en cas de nouveau message
// @version        1.0.0
// @include        http://www.jeuxvideo.com/forums/*
// @copyright      2011, Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// @license        GPL version 3 or any later version;
// @license        http://www.gnu.org/copyleft/gpl.html
// @resource       licence  http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

(function () {
	var epingle;
	epingle = {};
	
	epingle.bleu = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEBQozIH+9AzUAAAE6SURBVCjPnZK9SwJxHMY/V3fBnUouFcoJTSI0OtjSEgXl4mS01VIETW1Be0tDCNbQ1D9hCHUQ0ZA0SItgIOFkKJmId+Jp/ZqSExWvnu378nxfHh5wCUUOCEUOCL9nQzjzkku+ODl67wcXV7s0zKwEMOVm81a8jOaRqFV71Ko9DvevUeSAcDWg26tgd8TYujwq6fwzrKfJ5c+JLB0T1GW69mCvNIoc1tNs78ySf25TLNgkkj7Sl6c0rUeU6TmAvgYjL1hZ1Whb3xQLNppHovzWRZ2JAFCppwaWTtRgPe7FMDI0rQcq9ZQ7DUqvNiUgkfRxe9MiFFxjObRJ5u6Thpll4gX3TwcA1D++iMZUojEVALPzMtQ7zkgCYHH+DK8aA6DVztEwjb54Y7Hg3xOOIb/WHbKwG/K/IP5K/gHxZnEy6Ua/KgAAAABJRU5ErkJggg==";
	epingle.jaune = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gUGCQgGvJFR9wAAAQxJREFUeNqNkz0KwkAQhb8VtRQkpo5YWnkGOy2sBME2hTbWXsGL2FnZ2Np4hwREgoJgEQQRUiisxRiDutEdGIad2fd2/lZ5noeNlEpogEoF4hiV+ovYid5sskOng05JCjYvz+dQLsP5LLpaZRn9JbjdIEny40YCx0GnOpnAbCYkrgvV6vvdogk8HMJoBGEI6zUsFtDvw+kkpTwzU7lNHAzgfhew6wqwVpPYdptNwGoKvR6Mx7Dfw/H4HTcSBIFY34flErpdaDalrDi2aOJ0KvZ6hXZbFOBy+b6rcjZRA7Ra0GiIY7eDw+F9C40E9To6ilApieNI2k+rfvbgA6wgq/mzdmMPouiVvrL8IzwApGBdiPV0C2EAAAAASUVORK5CYII=";
	epingle.month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
	epingle.where = function where(href) {
		var loc, reg;
		loc = null;
		reg = new RegExp("^http://www.jeuxvideo.com/forums/([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-").exec(href);
		if (reg !== null) {
			loc = {};
			loc.mode = parseInt(reg[1], 10);
			loc.forum = parseInt(reg[2], 10);
			loc.topic = parseInt(reg[3], 10);
			loc.page = parseInt(reg[4], 10);
		}
		return loc;
	};
	epingle.formatInt = function formatInt(val, n) {
		val = val.toString();
		while (val.length < n) {
			val = "0" + val;
		}
		return val;
	};
	epingle.inList = function inList(val, list) {
		var i;
		for (i = 0; i < list.length; i += 1) {
			if (val === list[i]) {
				return i;
			}
		}
		return list.length;
	};
	epingle.generateKey = function generateKey(loc) {
		var log;
		delete this.key;
		if (loc) {
			this.key = "EPINGLE-" + loc.forum + "#" + loc.topic;
			log = localStorage.getItem(this.key);
			this.log = null;
			if (log) {
				log = log.split("#");
				if (log.length === 2) {
					log[0] = parseInt(log[0], 10);
					log[1] = parseInt(log[1], 10);
					this.log = log;
				}
			}
			return true;
		}
		return false;
	};
	epingle.useKey = function useKey(val) {
		if (this.key) {
			if (val !== undefined) {
				localStorage.setItem(this.key, val);
			} else {
				localStorage.removeItem(this.key);
			}
		}
	};
	epingle.liste = function liste() {
		var table, tr, th, td, col, i, img, url, nb, date, status, log;
		table = document.getElementById("liste_topics");
		if (table) {
			tr = table.getElementsByTagName("tr");
			if (tr.length > 1) {
				th = tr[0].getElementsByTagName("th");
				col = {};
				for (i = 0; i < th.length; i += 1) {
					if (th[i].className === "col_moder") {
						col.mod = i;
					} else {
						switch (th[i].id) {
						case "c1" :
							col.icone = i;
							break;
						case "c2" :
							col.sujet = i;
							break;
						case "c3" :
							col.auteur = i;
							break;
						case "c4" :
							col.messages = i;
							break;
						case "c5" :
							col.date = i;
							break;
						}
					}
				}
				if (col.icone !== undefined && col.sujet !== undefined && col.messages !== undefined && col.date !== undefined) {
					for (i = 1; i < tr.length; i += 1) {
						td = tr[i].getElementsByTagName("td");
						img = td[col.icone];
						url = td[col.sujet];
						nb = td[col.messages];
						date = td[col.date];
						if (img && url && nb && date) {
							img = img.getElementsByTagName("img")[0];
							url = url.getElementsByTagName("a")[0];
							nb = parseInt(nb.childNodes[0].nodeValue, 10);
							date = date.childNodes[0].nodeValue;
							if (img !== undefined && url !== undefined && nb !== undefined && date !== undefined) {
								if (this.generateKey(this.where(url.href))) {
									status = new RegExp("/topic_marque_(on|off).gif$").exec(img.src);
									date = new RegExp("([0-9]+)/([0-9]+)/([0-9]+) ([0-9]+)h([0-9]+)").exec(date);
									if (status !== null && date !== null) {
										date = parseInt(date[3] + date[2] + date[1] + date[4] + date[5], 10);
										if (this.log) {
											//alert(this.log.join("#") + "\n" + nb + "#" + date);
											if (nb > this.log[0] || date > this.log[1]) {
												if (status[1] === "on") {
													img.src = this.bleu;
												} else {
													img.src = this.jaune;
												}
											}
										} else {
											this.useKey(nb + "#" + date);
										}
									} else {
										if (this.log) {
											this.useKey();
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	epingle.mess = function mess(loc) {
		var col, ul, li, date, nb, i;
		if (this.generateKey(loc)) {
			col = document.getElementById("col1");
			if (col) {
				ul = col.getElementsByTagName("ul");
				nb = ul.length;
				if (nb > 0) {
					while (nb-- > 0) {
						if (new RegExp("^message_[0-9]+$").test(ul[nb].parentNode.id)) {
							li = ul[nb].getElementsByTagName("li");
							nb += (loc.page - 1) * 20;
							i = 0;
							while (i < li.length && li[i].className !== "date") {
								i++;
							}
							if (i < li.length) {
								date = new RegExp("([0-9]+)e?r? ([a-zûé]+) ([0-9]+) à ([0-9]+):([0-9]+)").exec(li[i].innerHTML);
								if (date !== null) {
									i = this.formatInt(1 + this.inList(date[2], this.month), 2);
									date = parseInt(date[3] + i + this.formatInt(date[1], 2) + date[4] + date[5], 10);
									//alert(this.log.join("#") + "\n" + nb + "#" + date);
									if (nb > this.log[0] || date > this.log[1]) {
										this.useKey(nb + "#" + date);
									}
								}
							}
							nb = 0;
						}
					}
				}
			}
		}
	};
	epingle.execute = function execute() {
		var loc;
		loc = this.where(location.href);
		if (loc) {
			if (loc.mode === 0) {
				this.liste();
			}
			if (loc.mode === 1) {
				this.mess(loc);
			}
		}
	};
	epingle.execution = function execution() {
		epingle.execute();
	};

	
	setTimeout(epingle.execution, 10);
}());

