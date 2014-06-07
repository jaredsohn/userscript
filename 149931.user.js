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
// @name           SHAR
// @namespace      Mana
// @description    Système Heuristique d'Armement Renforcé
// @version        1.0.8
// @include        *
// @include        http://www.jeuxvideo.com
// @include        http://www.jeuxvideo.com/*
// @copyright      2011,     Luthien Sofea Elanesse
// @copyright      <jeuxvideo.nyu@gmail.com>
// @licence        GPL version 3 or any later version
// @licence        http://www.gnu.org/copyleft/gpl.html
// @resource       licence   http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

(function () {
	"use strict";
	var shar;


	function defaultOption(code) {
		switch (code) {
		case "baseIcone":
			return "b64";
		case "lastPage":
			return true;
		case "returnToFirstIndex":
			return true;
		case "masque":
			return true;
		case "blast":
			return true;
		case "linkProtect":
			return false;
		case "epingle":
			return false;
		case "profilSujet":
			return true;
		case "tracking":
			return true;
		case "arme":
			return true;
		case "arme_links":
			return true;
		case "arme_allowLock":
			return true;
		case "arme_allowKick":
			return true;
		case "arme_viseModo":
			return false;
		case "search_in_kick_list":
			return true;
		case "track_kick":
			return true;
		case "warning":
			return true;
		case "warning-limit":
			return 6;
		case "warning-max":
			return 12;
		case "month":
			return "janvier,février,mars,avril,mai,juin,juillet,août,septembre,octobre,novembre,décembre";
		case "author":
			return "2011,	Luthien Sofea Elanesse";
		default:
			return "";
		}
	}
	function Reg(regexp, option) {
		var reg;
		if (option) {
			reg = new RegExp(regexp, option);
		} else {
			reg = new RegExp(regexp);
		}
		this.exec = function exec(exp) {
			var data = reg.exec(exp);
			if (data !== null) {
				data.push(RegExp.rightContext);
				data.push(data.shift());
				data.unshift(RegExp.leftContext);
			}
			return data;
		};
		this.test = function test(exp) {
			return (this.exec(exp) !== null);
		};
		return this;
	}
	function Url(href) {
		var reg;
		reg = new Reg("(([^:/]+:)/*)(([^:/]+)(:([^/]+))?)(/[^?#]*)?(\\?[^#]+)?(#.*)?");

		this.apply = function apply() {
			var exp, data, key;
			exp = reg.exec(href);
			if (exp !== null) {
				this.protocol = exp[2];
				this.host = exp[3];
				this.hostname = exp[4];
				this.port = exp[6];
				if (exp[7] !== undefined) {
					this.path = exp[7].split("/");
					this.path.shift();
				} else {
					this.path = [];
				}
				if (exp[8] !== undefined) {
					data = exp[8].slice(1).split("&");
					this.search = {};
					while (data.length > 0) {
						key = data.shift().split("=");
						this.search[key.shift()] = key.join("=");
					}
				} else {
					this.search = {};
				}
				this.search.toString = function toString() {
					var key, str;
					str = [];
					for (key in this) {
						if (this.hasOwnProperty(key)) {
							if (key !== "toString") {
								str.push(key + "=" + this[key]);
							}
						}
					}
					if (str.length > 0) {
						return "?" + str.join("&");
					}
					return "";
				};
				if (exp[9] !== undefined) {
					this.hash = exp[9].slice(1);
				} else {
					this.hash = "";
				}
				this.href = exp[11];
				this.local = false;
			} else {
				delete this.protocol;
				delete this.host;
				delete this.hostname;
				delete this.port;
				delete this.path;
				delete this.search;
				delete this.hash;
				this.href = href;
				delete this.local;
			}
		};
		this.toString = function toString() {
			return this.href;
		};
		this.alterAs = function alterAs(protocol, hostname, port, path, search, hash, local) {
			switch (protocol) {
			case "file:":
				protocol += "///";
				break;
			default:
				protocol += "//";
				break;
			}
			if (port !== undefined && port !== "") {
				port = ":" + port;
			} else {
				port = "";
			}
			if (path !== undefined && path.length > 0) {
				path = "/" + path.join("/");
			} else {
				path = "";
			}
			if (search !== undefined && search !== "") {
				search = search.toString();
			} else {
				search = "";
			}
			if (hash !== undefined && hash !== "") {
				hash = "#" + hash;
			} else {
				hash = "";
			}
			href = protocol + hostname + port + path + search + hash;
			this.apply();
			if (local !== undefined) {
				this.local = local;
			}
		};
		this.alterIn = function alterIn(otherUrl) {
			this.alterAs(otherUrl.protocol, otherUrl.hostname, otherUrl.port, otherUrl.path, otherUrl.search, otherUrl.hash, otherUrl.local);
		};
		this.alter = function alter() {
			this.alterIn(this);
		};
		this.alert = function alert() {
			alert([this.protocol, this.host, this.hostname, this.port, this.path.join("\n|"), this.search, this.hash, this.href, this.local].join("\n\n> "));
		};
		this.apply();
		return this;
	}
	function where(url) {
		var loc, reg, data, temp, i;
		loc = {};
		loc.url = url;
		loc.toString = function toString() {
			return "[WHERE " + this.url + "]";
		};
		loc.analyze = function analyze() {
			reg = new Reg("^(www|m)\\.jeuxvideo\\.com$");
			data = reg.exec(url.hostname.toLowerCase());
			if (data !== null) {
				loc.jvc = true;
				loc.mobile = (data[1] === "m");
				if (url.path.length === 0) {
					loc.type = "home";
				} else {
					loc.type = url.path[0].toLowerCase();
					switch (loc.type) {
					case "forums":
					case "commentaires":
						temp = [];
						for (i = 1; i < url.path.length; i += 1) {
							temp.push(url.path[i]);
						}
						reg = new Reg("^([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)-([0-9a-zA-Z]+)-([0-9]+)-([0-9]+)-(.+).htm$");
						data = reg.exec(temp.join("/"));
						if (data !== null) {
							loc.mode = parseInt(data[1], 10);
							loc.forum = parseInt(data[2], 10);
							loc.topic = parseInt(data[3], 10);
							loc.page = parseInt(data[4], 10);
							loc.hash = data[5];
							loc.index = parseInt(data[6], 10);
							loc.search = parseInt(data[7], 10);
							loc.name = data[8];
						}
						break;
					case "profil":
						reg = new Reg("^([^.]+)\\.html$");
						data = reg.exec(url.path[url.path.length - 1]);
						if (data !== null) {
							loc.pseudo = data[1];
						}
						break;
					case "cgi-bin":
						if (url.path.length === 3 && url.path[1] === "jvforums" && url.path[2] === "kick_user.cgi") {
							loc.type = "kick_user";
						}
						break;
					case "moncompte":
						break;
					case "messages-prives":
						break;
					default:
						break;
					}
				}
			}

			reg = new Reg("^sandbox$");
			data = reg.exec(url.hostname.toLowerCase());
			if (data !== null) {
				loc.sandBox = true;
			}
		};
		loc.rewrite = function rewrite() {
			if (loc.jvc) {
				switch (loc.type) {
				case "forums":
					this.url.path.pop();
					this.url.path.push([this.mode, this.forum, this.topic, this.page, this.hash, this.index, this.search, this.name].join("-") + ".htm");
					this.url.alter();
					break;
				}
			}
			this.analyze();
		};
		loc.analyze();
		return loc;
	}
	function SystemObject(saveType) {
		function SaveWithReminder(wayToSave) {
			var data = {};
			this.get = function get(id) {
				if (!data.hasOwnProperty(id)) {
					data[id] = wayToSave.get(id);
				}
				return data[id];
			};
			this.set = function set(id, value) {
				data[id] = value;
				return wayToSave.set(id, value);
			};
			this.del = function del(id) {
				delete data[id];
				return wayToSave.del(id);
			};
			this.length = function length() {
				return wayToSave.length();
			};
			this.key = function key(n) {
				return wayToSave.key(n);
			};
			this.clr = function clr() {
				return wayToSave.clr();
			};
			this.toString = function toString() {
				return "[Reminder " + wayToSave.toString() + "]";
			};
			return this;
		}
		function SaveStorage(storage) {
			this.get = function get(id) {
				return storage.getItem(id);
			};
			this.set = function set(id, value) {
				return storage.setItem(id, value);
			};
			this.del = function del(id) {
				return storage.removeItem(id);
			};
			this.length = function length() {
				return storage.length;
			};
			this.key = function key(n) {
				return storage.key(n);
			};
			this.clr = function clr() {
				return storage.clear();
			};
			this.toString = function toString() {
				return "[Storage " + storage.toString() + "]";
			};
			return this;
		}
		function getSave(saveType) {
			switch (saveType) {
			case "local":
				return new SaveWithReminder(new SaveStorage(localStorage));
			default:
				return null;
			}
		}
		this.save = getSave(saveType);
		this.longCrypt = function (length, number, alpha) {
			var max, i, r;
			max = 1;
			for (i = 0; i < length; i += 1) {
				max *= number;
				max += 1;
			}
			max -= 1;
			r = Math.floor(Math.random() * max);
			i = 0;
			max = 1;
			while (i >= 0) {
				i += 1;
				max *= number;
				if (r < max) {
					r = r.toString(number);
					while (r.length < i) {
						r = "0" + r;
					}
					i = -1;
				} else {
					r -= max;
				}
			}
			if (alpha) {
				for (i = 0; i < alpha.length && i < number; i += 1) {
					r = r.split(i.toString()).join(alpha[i]);
				}
			}
			return r;
		};
		return this;
	}
	function CreateObject(doc, option) {
		this.document = doc;
		this.text = function createText(text) {
			return doc.createTextNode(text);
		};
		this.element = function createBloc(tag) {
			return doc.createElement(tag);
		};
		this.attribute = function createAttribute(element, tag, value) {
			if (value !== undefined) {
				element.setAttribute(tag, value);
			}
		};
		this.input = function createInput(type, name, value) {
			var bloc;
			bloc = this.element("input");
			this.attribute(bloc, "type", type);
			this.attribute(bloc, "name", name);
			this.attribute(bloc, "value", value);
			return bloc;
		};
		this.style = function createStyle(content) {
			var bloc;
			bloc = this.element("style");
			bloc.type = "text/css";
			if (content !== undefined) {
				bloc.appendChild(this.text(content.toString()));
			}
			return bloc;
		};
		this.script = function createScript(content) {
			var bloc;
			bloc = this.element("script");
			bloc.type = "text/javascript";
			if (content !== undefined) {
				bloc.appendChild(this.text(content.toString()));
			}
			return bloc;
		};
		this.img = function createImg(src, alt, title) {
			var bloc;
			bloc = this.element("img");
			this.attribute(bloc, "src", src);
			this.attribute(bloc, "alt", alt);
			this.attribute(bloc, "title", title);
			return bloc;
		};
		this.icone = function createIcone(icone, title) {
			return this.img(icone[option("baseIcone")], icone.alt, title);
		};
		this.link = function createLink(href, content) {
			var a;
			a = this.element("a");
			a.href = href;
			if (content !== undefined) {
				a.appendChild(content);
			}
			return a;
		};

		return this;
	}
	function getTimerLength() {
		var userAgent, time;
		time = 10;
		userAgent = navigator.userAgent.toLowerCase();
		if (new Reg("opera").exec(userAgent) !== null) {
			return 1000;
		}
		return time;
	}
	function formatInt(val, n) {
		val = val.toString();
		while (val.length < n) {
			val = "0" + val;
		}
		return val;
	}
	function inList(val, list) {
		var i;
		for (i = 0; i < list.length; i += 1) {
			if (val === list[i]) {
				return i;
			}
		}
		return list.length;
	}

	function Reminder() {
		var list;
		list = {};
		this.add = function add(id, content) {
			list[id] = content;
		};
		this.get = function get(id) {
			return list[id];
		};
		this.list = function list() {
			var theList, key;
			theList = [];
			for (key in list) {
				if (list.hasOwnProperty(key)) {
					theList.push(key);
				}
			}
			return theList;
		};
		return this;
	}
	function Icone(id, alt, url, b64) {
		this.toString = function toString() {
			return "[Icone " + id + "]";
		};
		this.alt = alt;
		this.url = url;
		this.b64 = b64;
		return this;
	}

	function option(code) {
		switch (code) {
		case "codeName":
			return "SHAR";
		case "name":
			return "SHAR";
		case "version":
			return "1.0.8";
		default:
			return defaultOption(code);
		}
	}

	shar = {};
	shar.toString = function toString() {
		return "[" + option("name") + "]";
	};
	shar.name = function name(that) {
		return option("codeName") + "_" + that.toString();
	};

	shar.onLocalSettings = false;
	shar.system = new SystemObject("local");
	shar.create = new CreateObject(document, option);
	shar.scripts = new Reminder();
	shar.styles = new Reminder();
	shar.icones = new Reminder();
	shar.generateStandard = {};
	shar.generateStandard.initJVC = function initJVC(mother) {
		var scr, sty, ico, saveSet, saveGet, saveDel, blast;
		this.mother = mother;
		ico = true;
		scr = true;
		sty = true;
		if (ico) {
			this.mother.icones.add("MaJ", new Icone("MaJ", "[MàJ]", "[server]/icones/maj.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAARCAYAAABKFStkAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIHAkwL6gcdIQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAD5ElEQVRYw+2Yz2tcVRTHP/f9TjpJE3VhJCi0NStLBkItkqCNIkhAKvY/cJOtkC4EBetOJAG7dFkQXAlKxI2kCf5Y2DhQMIpVx4WGiLFNM53JzLz35r7nIvPu3Jl5L5mJ6GoODHNyvvec7znn/pyI+ZmlmIH0JeuFFZHoFsCZyblBV/qTOGmiBSCjYNCSPuSJx55mnqV4vbAiTtzAOD7c+UKI/3aq/yeefmXy0TzzM0uxBRBJyWEjQ/ygjOuMYBq2GpzYbWuIelAmikKFGYaN54x02U+CGYbNsDcOQLV+v4tn2BtXeckoVGM6MR0HUmN2cgEqH13vHK9ztG3hOI6p1P7ms6/e5IULV3l47AymYSOjkHv7v7G2ucylmdfZKLzfNRsvXnyDL759N3WmjsKev3CVm5vLXTbPGeHzb97uGn/5ufcYcseI4obKKRE9Z70WgIXZd6gH5WO59PrSatU51MQmDZRRQKNRA2Btc5ndvTvUgxK7e3dUon5YVo75qSvM5Rd56Zm3yA0/wsLsNebyiwqfyy+yMHvtSMw0zLZ4ADc3l3lwsJPKY1kOMgqoVHdVTonf2uYyleouDekjo4CwWQvAg4Md1by5/KLKpZNLr6+z1jSOVgOlPPxEUjltFK7z+58FNgrXlS2KIqXf/vljvr79AULYCGw8ZwzPGVe454zjOWMYwsnEmvQAuM6o0sNGkMoTRwIpJWHDz/DzVS2RVose75B7PBXT69P1LA61he+WigAc1O61LdnCTx+1/V2u/qX0p86+zLD3EK6To+rvdfnvV7YJGlV1+Kdh1fqest3dLyr9oHa3Zx7d7375D/zwACFE2xg97/3KdmZNWbrOUarsKA5T2K0lkNx2iZx7/FLbd6d47mk89zSGYaX6p92kR0lx+0sAzp+7jOPkeuZJ/Prl60dUbk++guvk2l4ERpbT6KkJLp5/jdFTE6l43S9Rre9R8/eJosa/TvLs5LMn4un0i2NJ3S9R90vKph/6R2F+UFG6EMaxuXU10BCtQ90yHFw7h2U4LTKzpW8VV/nuxw+5tXVDHdi6v65nYboteVJ8/+unSBn0zJP4JfagUePWDzfYKq4CMD11hdHcBNPNi2CruJqJJStteupVhtyx7tx++YRAu5wAxPzMUizjsHlwNtQsuE4Ow7DabLY9RBjWiGKpvc9MXLt7bOLfOpR7i40A2+qdR/k14x7eoBWiSGIIs7nlTOJY4gcVFTMLS+z6itRzS3IAMIXd3sCsl79uSztfssb28qsiLXa/PJ1xdd80n+OwzjhpHKqBAJ1NHEhvom7h9cKKMIU96MgJpG2fDf432L/8AxZ5rfnI/HiVAAAAAElFTkSuQmCC"));
			this.mother.icones.add("neutre", new Icone("neutre", ":|", "[server]/icones/neutre.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBEgEyO2MshoEAAAE3SURBVDjLhZMxa8MwEIXfyR4MGTqFjAmZO3dWl8yloNl0K4T8mhDoVjobgucs0dzZs0nG4qmDwYt1HRwJW7aaN0q8T+9Od5QqhSl9ZRn7Z6lS5J/FIWNbihE0Wnd3fVDsm+tzhGTZPU6zlwGgLXMHspD4rjnZOAAB4DpHWwoHEQDwtt0ygIFZLI7OTMkTxMM7kGxGqWIAkFKiPkcAeLKh3Hw7EN+StGWOaJ2xsK9PqjnhnkTowvy8DiDm96NL4kFdE6vCYA6BZMngOh/W+k+SOBhtcQym4jpHc+1GgbTWbBt52RPmj8L9RrA1V8LsuUWqFInPw2EwnlVhHD1krgozLkFrjdUthe3HlKrCYLVjN85kl8l+p5QSAHDZj1OsdjxaKupvY38mLKgvrTX8kmlqnaeGyzda/QHJ3o7Xk0krQAAAAABJRU5ErkJggg=="));
			this.mother.icones.add("nyu", new Icone("nyu", ":nyu:", "[server]/icones/nyu.gif", "data:image/gif;base64,R0lGODlhEAAQAOMAAAAAAAD/AMbGxs6cAM7Ozv/OAP//Y///nP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/gU6bnl1OgAh+QQFHgAPACwAAAAAEAAQAAAEVPDJCWqdWNbC+c1AZ4yGh4UWcKQFIAkpEltam94o3CJy3+coHsA3BA5sFUOqBIAdRaSRR+DsWDuuh3NgQRa4LxjgOfZkw+UWOaMdD7hvMPthEZ8fEQAh+QQFHgAPACwAAAAAEAAQAAAEHPDJSau9OOstEQLdh3kTiQGghHKpyr1wLM90fUUAIfkEBR4ADwAsAAAAABAAEAAABBzwyUmrvTjrPQFCkgdeYvhpAJVaa8i9cCzPdK1FACH5BAUeAA8ALAAAAAAQABAAAAQd8MlJq7046y0B9RsAPmKGINOJASrZcnAsz3RtVxEAOw=="));
			this.mother.icones.add("shoot", new Icone("shoot", ":shoot:", "[server]/icones/shoot.gif", "data:image/gih;base64,R0lGODlhEAAQAOMOAAAAAABqm59oAACLy9GJAACu/+CTAW3R/8DAwPvDAKnk///jHv/wfv/5zv///////yH/C05FVFNDQVBFMi4wAwEAAAAh/gY7c2hvb3QAIfkECQEADwAsAAAAABAAEAAABGjwyQlqnVjWxfnNQMIxJONhocc0DWAugIQAo+MA9g1rImy3PxNg1iMBWK2GkDgqIUmwmaFocUGHgGmnCk0Mpb2DQnHgeGVZbaFcThhiD4R0OjgkCm64bAYgBAoEAx8YcnwWCBmEhYgZEQAh+QQJAQAPACwAAAAAEAAQAAAEaPDJCWqdWNbF+c1AsjQk6WHh6ABOC5wP8jas2zYLoIlNu/oAHEDG+9kcQuKo5/MlAQYezXLLyaJLC4uUGF55B4XiwNXFAAJsgUxOGMwIWToxOCQKbrMkXiEECgQDHxhxMloIGYSFiBkRACH5BAkBAA8ALAAAAAAQABAAAARn8MkJap1Y1sX5zUCyNCTpYeEIOCzQnA8CjE3LOjOgic1qOyaAjPfDARfCFOnGfCUNvJ6F5ZRBaZYVKSG08g4KxWGriwEE18J4nDCUETJ0YnBIFNplCbxCCBQIAx8YcDJZCBmDhIcZEQAh+QQJAQAPACwAAAAAEAAQAAAEavDJCWqdWNbF+c1AwjEk42HhCDQNA5wP8i6A4zT1TWviwtg5B8AEkPVcDNaqRTOOSqwWUWY4WoakJqDauWYTRWrvoFAcOGAJlVs4nxMGgHqdGBwSBbh8gpABCAEFBAMfGH1+FggZhoeKGREAOw=="));
			this.mother.icones.add("actif", new Icone("actif", "[Actif]", "[server]/icones/actif.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBRAzGqHUey8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACp0lEQVRIx9WXO2sUURSAv3N3ZnY1T2ISoxZCfCwpApIVfCJYWIqxsLGxsfEnCTY2NhZRLC2EgC8wQUgRUmgISXBFjJuErJmdmXssMjM7iZtk1so9MHDnvOZ+95wzw0iVfqUDZYSaJGsHYPjhg46DqD55qgmIA0C93nEQw/fvUX32XEeoSQyxnTtYVbEoqiACBkFEdulhxyYImtElkrVBa79s7n1BJm9TffFKHQDZ2soFYFX5bSM2woDAKq4Reh0XTwwNtaleBDwxeMbQsBbfWqJ4wwWEojG4xuDbCNjx9a2loRZBMAJFY+gtuBSNORAk006/c1WgbiNW/W3Ks9Opfn7iBgOOy1oYMJbRAyxdvMnpT29a5pufuJH6z1y4RuXz2798apdv4RWcfBA2B0SkSi1sUJ57B8DU6Dh3v84xNjvNx3KFSwszAHwoVxhyXI6aAt0irIxfZbnhcyW2vy9XOOF6RFGU5l7LdMLLM+McdzxGXI8hx0UlwOaBMDkgrCqNwE/vi40gXW9mXgwDQchJLeCJIkCXKvUwTO3HgpBBNYRhM163mzN558scAD/PVSgFlsIhACnE0sLCoY4hyiqW0aRVVpdT27eV5rq6uIjB4CJpXBXL+YxdMXzHcjbWfV9ZSeOnpIdTGPoQNuOhP0hK6Uz8gzzSZgtkHxPFl0ExQLtf0n6EPoRiDoBETDsPyKZ8LF2Z02ha1lF+YPmF4reIkxY6s6c1nDYA2oKQPZs9kQkdRHgtvQBM6ibXdYOKruPHdcjGleLtZXV9LextHW6Vfs3zqVOUbWAz3pgLJKPZhaBAHSWIgT2gG8ED/ExcT9wq/j65ehBKbVSirZkQhBKK1yJ5UpMjMUxSOdMizuTI1W4tBCBvNf5HKSWHOEJNSnSu7Kpbp/5b/AH87g4WVzg8OAAAAABJRU5ErkJggg=="));
			this.mother.icones.add("blueK", new Icone("blueK", "[K]", "[server]/icones/bluek.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQNH+Hl/bQAAAD7SURBVCjPhdFPK4RxFMXxz2/Gn5pRFk9KbNhJEbHTlAVvQfa8IktlZ+EtyNLCwlN28goojPybZwZjrsUwTIqzu93vOZ3bTZk8/KO65QQDUKst/QkfH+dRt5xk8lhfjJ5W5+5ibaH9a87kUYJm8Z1ydXvo6KwMZiYOXN+deH5u6NX4CV9cboLpbB+MDM96bVVBCYpG/43j1R2vL6H8vqLdmtQsSiBl8giFetT6DKNpT9mUZKgLqnSTf6qStsFDbOmoC+3e7hecVI2mXXAfGzpuhPf+Gh2P3pwiDFoSWtrOJRWD5pWMSZDJo+NJaPTSCaHA22ffrAt/Gf57+webMHQzlgwMswAAAABJRU5ErkJggg=="));
			this.mother.icones.add("red", new Icone("red", "[!]", "image.jeuxvideo.com/pics/forums/bt_forum_avertirmod.gif", "data:image/gif;base64,R0lGODlhCwAMAMQAAAAAAP///94iD8ISALAQAIsNAOc+K/4nEf87Jv9PPbcqG50PAMwTAP8yHfdCLrYRAOc1Ip8fEt8sGZ4YC/9EMLwRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVAICOOIwAwSaqmzEm9QWA4r4jcsQLdYuPHEYlPdCjGJoKiaMAkFAoE5pIZWzykDOYgBsVqnd1BK9skVM6tE4kUAgA7"));
			this.mother.icones.add("redC", new Icone("redC", "[C]", "[server]/icones/redC.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAM3JQcP7PoAAADvSURBVCjPjZHBSsNQEEXPvJdKSYlEs+oXuFFasBuhBcGlPyp+gBuXzUoC6sKFC79AakDbvKbUThevaRrB6ixnDnfm3pEsQfmjBhMEIAA4H472wlk61sEECQCYfdWT+8cGmF+e0e/3yJ6e1cOu8JP0FYCbky4AVoRDa7iI2mzPwLmG2oebcxW1ObZCINBZlDWssymAdwFoWRIfKIkVRGQrEgCk7zkAlc23qeNh4YhNvS0UML8loID+CFWyBC02zc8VXOdN4u5ICAUiUxncWXUbCy9Lf78RCIHTFkSVp131pUKhsNoIfKsXSWwdAP95+xocs0geJmqJxAAAAABJRU5ErkJggg=="));
			this.mother.icones.add("blueG", new Icone("blueG", "[G]", "[server]/icones/blueg.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQGDmihBI0AAAC6SURBVCjPhdAxSkNBEMbx3z4kCA9rLyFiL3gREQsPkMoDeIRcIN5FxGPYWClEULF5Jk6KnaebFMnXDPvNf2a/3cI07NWswEE93O6jg1lJePHvxukGVcojriES/krwPIG7RDv0ONHE+Ny69Q1nOMqBoYXft+Bv/GCJgo8WfkroMuszOhHzjHWDXrfzA/70gmETrhuIeBBxn94FftsYoyZKucJr4x3iuPaqMY36ILllaGKsMEE/wuPAbq0B0Y8taKG3U2QAAAAASUVORK5CYII="));
			this.mother.icones.add("apercu", new Icone("apercu", "[Aperçu]", "image.jeuxvideo.com/pics/forums/bt_forum_apercu.gif", "data:image/gif;base64,R0lGODlhUAARALMAAAAAANbW1sXFxe/v7zMzM+bm5szMzPT09N7e3gAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAABQABEAAATe0MhJq704672BN0cojmRpnmiqpsY3vHAsz3Rt3zjeGnnv/8CapEAsGo/HoDKGbCKHzqiRQH1Rq4NrVQvjbgkDqRgqdn6z4HM3zY6dy1EJYk6v2+2Fs/5qbVOnbEZ3g3YSAoeIiYqJElQIf5AEeQR1jpEIAZmWlAGGi5+goaCNWpN/k5VXRI6ZAZuYnqKys4wGm5MFdI66lJKorZuZsbTEoaSPvZyaWq7Jc8zNBK3DxdW1Bq3Z2tvcVNydBtbiixPcGt0a44cA4eMc7xvq6+zyAhSfF/XFHuzw/v8A4UUAADs="));
			this.mother.icones.add("greenX", new Icone("greenX", "[X]", "image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif", "data:image/gif;base64,R0lGODlhCwAMAMQAAAAAAP///3O5GGGdFENsDjxiDJHdL1WJEYjPLITOJGakFUx7EJvlOojbHFuTE2mjHUl2D4TUG1iOEpLjKFKEEVmNFWGbF47iIZbkMQAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVHoCKOIwAoTKqmyokFAWLAsjjBT4In4qXDgYqFp2hEBLCDQxARDQbAAMQxcMIIBRjFYQ0UFleJU0IgSMjmlsJxdrAlXBNpHgIAOw=="));
			this.mother.icones.add("redX", new Icone("redX", "[X]", "image.jeuxvideo.com/pics/forums/bt_forum_bann_defi.gif", "data:image/gif;base64,R0lGODlhCwAMAMQAAAAAAP///8wTALAQAOc1IosNAHkLANYhDv9PPbwRAK8iFP8yHectGp4YC/YmEPdCLpcOAOc+K64bDMISAKQPALcqG4UMAP87Jp8fErYRAP4nEf9EMAAAAAAAAAAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVHoCCOIwAISKqmwrkFQfTAsnjBFYET4sLAMIyCIdI4DrCG5OAQTSbAQCEzccIsBhglYQ0YINeBc1AoDMjmliBxTrAHXBNpHgIAOw=="));
			this.mother.icones.add("redS", new Icone("redS", "[S]", "image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif", "data:image/gif;base64,R0lGODlhCwAMAMQAAAAAAP///9cyIMwTALYRAKQPAHkLAN4iD20KAP9PPf8yHcYeDZceEfc5JfYmEP9EMI8cEO8vG8ISAOc+K4sNAPdCLrAQAP87JqchE8cnF7wRAIUMAP4nEeYjDwAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVF4CCOIwAMSaqmw/m8QTxVj3hdcS40oqLEEAYmExFxOJ3c4uAQSZ4FSqygcUpysY3FSsghtFZJYWPYUFuDp8TC1lRNpHgIADs="));
			this.mother.icones.add("redA", new Icone("redA", "[A]", "[server]/icones/redA.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kKCAoeLnPhYM8AAAD/SURBVCjPhZE9TsNAFIS/XZsYBSGQLFEQWopIFKC4oADlCJyHE3CeHAFBQbEK9BFVqECxHEexvYH4UXjjnwIx3dv5dnY1T5kQoSVxk1LNWbRAAfgAo5tb7Lbko7DYbQlA4GnO9gMCT2OenyRaoHwAu1rysswYm1n7ER6jc66P+oyuLjGvb6JFYJ6kNTgZDpgMBwCMzYx5kiLZmvobNi+auM2mk27zAuSngSXPavPu/asDS54hW93A0zjlwpkPh1UN96uqlmmcEntwoB3c1qnmT/kAe61Oe6oLtD1lQiQp4bOqlxOX3J57CvqKajMmRNZld3O7TX671GPt4N0F/tEvtz9eQY1zkG4AAAAASUVORK5CYII="));
			this.mother.icones.add("citer", new Icone("citer", "[C]", "[server]/icones/citer.gif", "data:image/gif;base64,R0lGODlhCwAMAIcAAAAAACAeezg2ezo4fCcklScklikmnC4rsDcz0Do23Ts23zw35Dw45T4560E8 +EE9+UM+/kM+/0hGlUhGlktJnFVSsFxZxExH/kxH/2Vh3Whl3mxo5Wxo62pm+W9r/3Fu5XRw/nRw/3t3+Xh0/3t3/356/4J//oN//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACkALAAAAAALAAwAAAhqADEIHDgwRQoMJxKeMMHQBIaDJSKimIjigwiBJEhMlDCBQgUOAkeMmDjAgoYNHQSGCDFRQAYQIDwIjABhYoAEECJEmBnBJs6cPBlQRMHgAU8HCAgUMHCgwUMMOh0sUKCg6MODAi9ovSAwIAA7"));
			this.mother.icones.add("couleur", new Icone("couleur", "[Couleur]", "[server]/icones/couleur.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDgsLHwFT+MsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WVu28cVRTGf3fu7k4se9cp00ALhFeTUIAiGYkUQbHoEAU1JX8MJTUtL9HjgsQyBuI4fkWggIKMcWQR7+6s57Fz5x6Ku/Pc3bjeI43m3PP47v3OPXNGidHCAotqZSrXW87y+cKSEfOF5ISUGC2oz1hokS9RrUxNyHxa94lgrSCTBlQKPM/d5ovszqYQmdY9TxXrKkaOMy8v15t7KqUahL6atBlxYbNWiKKM4TAlTS1KKXzfY3m5hYgQBIY0tQC02x4rKy2UgtHIIAKdjsd47Py5rhSsrrbxfU2SZPT7KUliJyTB9zXttipsTYwkscXa9z16vTZLS7ooZKXntEi2LpKtizV3JRjckceH70tTjv/+QA721qbs+4/W5PfHZfyv27dm6ifHtyUOP5ST49sySw731y7FyOXoYE2CwR2x5m5xdjFaPEcpBEKsDRkOA1557UcAtrdu8teT9/j3n1vE8QXX39gAYPPeDTbv3QDg9Tc3ePZsWBSn3x/N1KPoAmtDouiisP3w/dtsb93kyR/vYm10KcZ337wFwKvXNxgOA6wNi7OX02zSZiJCHCdF8tWrlmvXLEoJYVjaV1dt7XajqGzTLEtm6iIxYBEZF7b1j3YBOD15hyzLLsXodEyhJ0mEiAXKVmsBZOa+SzRg0moPPnCh4nylfadGxpiDyuaHs3XzgMzUce7/pHj5Jeh2YVCpzzyM0eio0LX3GzaDvARaa7ypn5CqgoIx7l2VzLonF6+CYu18rCyjNsV6Xej1oNWqx87D+PgTl/zLz4put74vUCejFFy5Uq7P+3B6Cufn9aTBwD1l21G5/lJfWqpjPX8O47LLGAZwdjaNPw/j268dsyb52jQzCWISJI2R/n/I/i5TE+Tpn8ijnWn73kPk+Cmy97Du291BjvZnx8+SWfhNjK3NUj87RcYRxdnFaFFitFQ/PmshDCEIIE1dBXwflpedbzQqq9vpuH73fVfNIHC+TgdWVlxuEEAcg9Yurt126yRx/tzexK9ijEZM/mHuTJ7n2tP3yxvSWjNFxk0eB1z/65Zkm3al6jkvileq/k3Mw2/a8rgcK9+XygBQeas1CS2aFNNMtTKltWbRRTWHwSKT+R+3MgG1BaaY/wAAAABJRU5ErkJggg=="));
			this.mother.icones.add("cyanD", new Icone("cyanD", "[D]", "[server]/icones/cyand.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQSMx5nn8kAAADoSURBVCjPjY9PasJQEIe/96IUFaVuSk+gC6EgybYX8CA9QM9RPIA7D2EuoIsoDy1dCoKLdmuNmGgkyesi/yqI +sHALL6Z+Y3AVppb9CwBUAJ4tcyr7thWmp4lSgD7dPf86Vx6Wf5i1Bt0TZOFrbQE8HVSGc8fAwC+Wk12P994YQTARTkIgrzfOmP2rkue2YszUwBwEjKXjzuXOAyLzRtnwsaZ5IK/Xp31WzUt5Hu5KOtBPwn19g6VGkhZZM4QwxF8zuDgwUMFanVod6Ba/feRrTQHH6IIfA/iOL0roVwGw4DGYypnAzf4A6SpVH1BrU4UAAAAAElFTkSuQmCC"));
			this.mother.icones.add("danger", new Icone("danger", "/!\\", "image.jeuxvideo.com/css_img/defaut/danger.gif", "data:image/gif;base64,R0lGODlhHwAcAOYAAAAAAOXl2aWlnMZLR+UKCcsoJc7OxN6nnrmQiPn57L+/tvzv1OcZF+VcWPGEddzc0faxnud6c/Dw5M4qKOVBPu5lWryupayso8bGvN8TEfDVyvnQuf398P7+4uQlIr1sZtTUybx3cfHk2NIuK/OTg+VQS7iclO22rfb26fvfx9fXzPB0Z+QzMO+clc5FQd46NumKg+3t4ba2ovjBrOfn27qDfe1XTdwqKPWikMJVUdoaGOgpJN7e08RlX+tHP/Tm2riqou2on8zMzLm5r9UxLuqmnQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAQUAP8ALAAAAAAfABwAAAf/gByCg4SFhoeIiAktEigJiZCHQQQHARKPkZk/HgQ3GDwomZEJEQSmPQYxmKKHGqamGUAPoayGKBSmDqYDGDSrtYJFphUdFaYIIJfAgpsEDAsdCwwEIwoBtLWkpiQd3SSmH6m/ma4EOx0gACAdOwSxs9klpjMdAPYdM7u944knpjbd7AHoZuNYMn62ODFIEfBehxSmql0bVYqAg271HHbQRSCcKkgapu2A1nBgtwXtdMjCZiiBPAIQMHaQAUCGTAimcuxD5I+AD5no1AH1YcqECmWFUHAiwBCo0w4bIlpjyUEbgRVO060DusJUCHGEREx75lSgU2kEdFgANShBA1M4Vp5qffqNgE5fgnoSoPe0L75XRi+hYPGqsOHDiCWigIG4seNXNZKVeEFkQoHLmDNr3nx5gotUMQwMuSCgtOnTqFOXvjAERAwJAR6AmE27tu3btR/QQBEIADs="));
			this.mother.icones.add("darkL", new Icone("darkL", "[L]", "[server]/icones/darkl.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQ1GoYQtcAAAADeSURBVCjPlZGxSsRAEIa/mWw0YiPKdQrhinRaiU+ifV7Bh/A97mlsLOws7prrDq5Q9A4J2ThjERJZOAj+1fLtt7PDjFRl7UxkuV4IQACYnd9O+b5cLyQAmLUAPL8+AnB3/USWFYgoABdnN1Rl7drLHWbdWObj640Y9yMf7vrKHpM/Y7fnx1vU84QnbQwx7zBrMTsgf+5WCWyaLTstyLJiZKpHKP9IOAS37y/jeX71gPZDS+X55T3fzQaziGqOiCISODmeASAAVVm7WYu7YRaBv6UajkogD6e9PDyY6vkXEDhYz3BrBjcAAAAASUVORK5CYII="));
			this.mother.icones.add("edit", new Icone("edit", "[Edit]", "[server]/icones/edit.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAYAAAC8XK78AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBQ8jC5bcrcEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB5UlEQVRIx8VWvc7iMBAce50fEI9BgcQ7UEAFXRAlpOahaBCUSOmgp+NNKABRBQL+ueJkn034RHEnbqRI69Vmd3bsdcKyLDP4MoqiYNYWANDtdr/NwVgSHACUUl99Op0OrPICAKSUIT1jYEx9ZxhjNT9jzL3zU4wfa+Pb7TayLDPCKuAXl1KiqirnZ4yBiMA5d10AABEhjmMAwPP5hDEGRAStNZRSASkhBOI4BhE5Em8V0FrjdrthsVjUOpjNZlitVoFvOp2CiLBcLn+MsZjP54jj+DOB+/3u1qPRCM1mE2maBkoNh0Psdjus12uMx2Pnl1Iiz3OUZYnNZgMAmEwmaLVaSJIEUso6AT+xlc9iu90CAPI8D4j6SR6PR9BpFEUQQvwpIoRba62DWAEAx+OxtgUWvV4PjUYDQghUVeX81+vV2ZfLxdmn0wlpmgYqns9nlGUJznlQnHMO8WlghRCIoijo2D/1f4uPBOxEcM4D+XybiP4dATtyFvv93tmDwcDZh8MBANDv95EkSY2Mn+N19IJ6WZYZvxtjDJRSkFJCKeUuD8aYuwe01m5tk9sDKoQAEbkcvu+VxNszYBUgomCf7cv+6fYT+h37Od7FBvUA4FWFb4Fz/vtjVBQFex2RbyHQ5X/8G/wCvTw+p5pu/PoAAAAASUVORK5CYII="));
			this.mother.icones.add("grayC", new Icone("grayC", "[C]", "[server]/icones/grayc.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQVNbhFrDsAAADcSURBVCjPhZEtroZADABnN9tA9gBoFBrJRVAozGI4CwfAcyiOQHA4fvcJAh+IFyqbaTttlXPO8xFt2yoAA5Bl2Rfv27ZVBmBZljtbVdWLapqGNE1xznkDsK4rAHVdA1CWJQBaa8IwJI5jbo0LvmKaJpIkwVqL1hqt9Q9+agDs+44xBhFBKcW2bT+47/sXPAwD1lrCMLxzIoL+d33v8f59VeWc85fzPM90XfcCiqJARAiC4NR4jsrznHEcz05KISJEUUQQBCiAZ/fjOFjX9VY4jgMRwVp7wlfB1xv/ANJJU6cQluBaAAAAAElFTkSuQmCC"));
			this.mother.icones.add("green", new Icone("green", "[+]", "[server]/icones/green.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQFLnjid4YAAADbSURBVCjPjdG/TgJBEMfxz96djRqE0Jj4DkYFSwrfwgfwQXwpC2wpuWBrbaGFoqLHmUjiWnCH4P9fstmdmd/MfJMN8nb0l7rjABn0Or1fvYN8EHXHIYPCdFEYOQe7D0fSRiakwX7nwEU+igmUXhan1l3/RjF5XslntflKvrL6+vgS7NzvSbZSkMA0lj/yTvq3iscCBHk7KiNPbwxn4mlVOFlnM9AMHK6xnc4xwEaV/Bw3w/xdM4M00AjCWYvhjFY1tZEsLNkXyOUN1cRa86jm/k6v1d0MPlr/8e3vZHxE6s+4B4AAAAAASUVORK5CYII="));
			this.mother.icones.add("ignorer", new Icone("ignorer", "[I]", "[server]/icones/ignorer.gif", "data:image/gif;base64,R0lGODlhCwAMAIcAAAAAAFdSBVtVBWVfBWliBXFpBXdwB4+GCJSJB5ySCZ2TCaKYCaacCa+jCK+kCrClCrOoCrSpCrmtCrquCrywCcu9Cc6/CdLECtXHCtfICtjKCtnLCtrMCt3NCt3OCt/PCuLSCuXVCubWCv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACQALAAAAAALAAwAAAhsACcIHDiQBIkJIhKGWBhCxISDIECMmDiiQgcQAj98sDCxAAILHAR68JBh4oAGGS4I3LBBw0QCFDRgEBghAoSJARJAiEDTJk6dPCfUpDjigIOgNRkYECDAAAOeByM8WKBAwYIHUA9OkMBVwsCAADs="));
			this.mother.icones.add("inactif", new Icone("inactif", "[Inactif]", "[server]/icones/inactif.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBRAzM+Nm40MAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACyElEQVRIx9WXS0v7TBTGf5nJpYnfw4XgBxBXguhOd8GCItTLzs+jCFZEoZKdF3Dn2k/iwuKm2to2l/kv+k7eTDoBXfaBwEzOOTPznHPyDHHiOFYsIJIkcfTYBVhdXV1EHkoTcQHyPF84BisrK8RxrJIkcVyALMvmaSqFUrNOc5yycjiOY7XpuX5X96vH21C1NfnptQGWl5eJ41hZSSilyLKMyWQCgJRy1nuui5SSPM9Lm+/7KKVI05Q8z5FS4vt+6TedTsnzHMdxkFKW77MsMw7sui5CiLIrpJRkWVbG6vggCJBSGom1kiiKgtFoxPn5OQCHh4fc3NxwdHREFEWkacrFxQUAx8fH5HnO9fV1Gd/pdGi1WozHY7rdrrH26ekpl5eX1kp0Op3S/+DggNvb2zmfs7MzgiD4HQmdaYDhcAjA1dUV+/v7RpkHgwFJkgCws7PD4+Mj3W6XdrtNr9cDoN1uE4ZhWcmTkxO+vr64v78HYG9vj6WlJeMco9GoHO/u7hJFUflkWWaQEPrDtj0a1cXv7u4YDAblfDqdWrP68/Pzf6Zcl1arhe/7uK6L53l4nlfa6/O62Dw8PNDr9RBCoJSiKArjjC7A+/u7tZ00Pj8/DfvT05PV9vHxYX3f7/cZDocIIazr9/t9vr+/DeLV+I2NDaIowvd9hBBGFaSUs0r8Bevr6422t7c3u6D/p1I2tfoNfN+3EjDa6S8Iw5DNzU1D8jTW1taMDGmkacp4PGYymVAUxZ9JaHWyEWgkoeWsmonqOIoitre352xhGJbjIAjY2toC4PX1lZeXF56fnw0JrRNu2rMuqXPnjeNY1W9spZSh5UIIiqIw9LwoijKrOr7up+8b3UJCCDzPK+8DLRjV+6dpzyYiUsrZh91UiWpmbOXV9rqyVKHJVFvPtv5v9mysBICtGouCUp2SJHGaMrAIMGq0qP8W/wButZN61vlAZgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("listegroupe", new Icone("listegroupe", "[Liste Groupe]", "[server]/icones/Listegroupes.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAARCAYAAAArDQkmAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDgoUATfEoQEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFTklEQVRYw+2Z32tcRRTHP2dm7iapjWlVBEubTQyJsWna1L6I+BeI4IvS4osvgmhFKD7UFEEFMQiKikQRquCbQhVE8EX6JuJbbdq0TWpo0p9iEdua7G52753x4d69O3fvTdNQIS+Zl52Zs9/v+c45M3PP3ZXhyUHHRlvvJucOno87w5ODbujJoY2QrGOb/WU2TYoMTw66vif6NqKyzm3+13kAMQB1W88YnXNgk4ECEcnNAWDBORABBHDxOHMWV7CJ5Lmb9qbN99GOy/lPuHz9q/GtRUM8Ga/D7/9fmrc9vo2rv111BmCZWiYZdtkRLYYA6M0GVRJs3ZvbpHEObCXCRQ4JFCoQbMPh6hZnYzWiBCkpxAi2bnENlwqUDoW5RyNBwv1viE3sKhDUJo0IREtROt/E6S4FLra5yCGlhKsk4MAuW6LFCBc6EJBSggGixSjjR2/WiBFc6FoYQIynoRKBAwmktYbmeu9Ss+pQmQ1sABph2EpI5GjcCDnx1EkA9v60B3OvJrwVpXN7ju3Cho5TB6ZT3NgPo/z+zKnC47j72xGm9k/n5vcdH0N1aULPX7ONfjOCMsLJZ0/ncHt/3E20FDHl+d93fAyNxi5b6tcbTD2XxT328xhu2XLi6amcNnOvIbwV5jS2a9j19aOcfuFsrn83mo02+YRQ9c5X6LA3o3Rob0ZgVGau8WeDM6/OADDy+TClBwJ0l2Lvd6PU/2ow/fK51BbcH0CtxT80MUCwNSC4LyDYYqCa9Tf07gCzb85x6sA0Oz99JIczPQYcTD0/3fL/YIDpNlBxRDfCNBkjnw1jejSqU6E6FFGBn6n904x8Mcz0S7HmnZOxzzMHZ3Iawr/Dwv5daa66fEKi0GZOiPXGNrREoc3NpX3ncAYIBNEK6ZLW3dklyCbB1ryKYnwuPlHfj2Jx8Qbw/Wtvb1SjHG7PsV3pNZH6V6RcYaWFcSaet5UIlm382bR5N0XjViu40imZAPkabMMW9n2utWp23trThCyeXsxeWf+0BC7NVtIrq9lqV5fpO9zL/PsXOfvKDP3jZYKtBtFC40YLW5mrYq7XM9jyoR0EWw2qSyGBgCXjr3axlb3qhWohDgv942UuTCzc3v/MEvMfXkrHva9tb9n+qBT6rMxVMwHyNVTna4X9DNel2po0+88QCQS1aj1mXVxZeGWDMoLp1pRf3wHAhYkFbM3GlcoqTXUqVKdCtBTaMxxSjJMg9t+3mn+Jg5Jyhy37la+upUFTnSq7XlusYSVtTa7+w71x8Negub2Z1QIYVSwSRLjIF0Z8BO3a621bs4SLEaoksViVTYx/tCWQQpzopMJp9y+CGA/TyCbI59v+4kNcPnoN0XGF5PvJbCAvwH5Cfa7yoR2YHo3ZYoiWorVpXjUhkhW48FF85PvHy5mvzb0zn/b7j5QJthhESQarAoG2uSYfwODEw0hH1n7ly2S3vdGL6daFuIG3+lbwD7pL0X+kzIX3Frj4yeXWd9r4TE+89PkPLjHwdl96nSx87GHGY96m7crRaytwaXS3QSS7oe5Ecy78w5ODzidxLq6tbdViQ4eouCYXJZka3VmHC12chM7keZAIau4y1anSGj/la75sGkmPc7tdjMR3q8S7rB0nWnBR3r+oRFeiwUWJXu3xLdv4ncLEHAiokkrfXzIYX3/Cl+NqrjPZVJnY3aFm/9TlUiQiEIA2Gu3y92X2fkls0nrjbGKbuEI+2nBF/hI6HRTgbuNflEApxrECX9GtAKBLeYyIgPL4irgK1r8WzTkp7adko63TT77NKuvcwfPiP6Q22jomxR9s/Dey/u0/BgxQF71cBrEAAAAASUVORK5CYII="));
			this.mother.icones.add("orange", new Icone("orange", "[-]", "[server]/icones/orange.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQQExc/3YMAAACwSURBVCjPlZFNDsFgFEXPq6a0koqZWddA2xjZjKkNdAkdsxcxZyRNjMxtQCPxk1B8Bq0Q+sNJ3uwM7n1XogBFBV6IAOgAbn9QKkfBXHkhogOQHEplt9clClYqla8nfuF/WSVHAGS4/RLiSRvblJe8WMcA5NUcz3b4DnRazxgZ05Gw3MD+DCp7qN34zJxhGeA7cH/7vCbQrOfINQ1ss7ig5oWIZRQLl1t6QDpjulL17A/mHCzMjxYK5AAAAABJRU5ErkJggg=="));
			this.mother.icones.add("pinkO", new Icone("pinkO", "[o]", "[server]/icones/pinko.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQJHByAaQoAAAEdSURBVCjPhdGxSltxFMfxz82NQwJaUQI2g3RwqWhRk0CXPkHHTH2C0rEP0HdQnyIIeYUuFcR6tdVBEOpW6BaTkKRNc73/DlcThKK/8ZzvOXwPJ2pLgifSVI+gCPU3tUfh9pckNNWjImSDvPji7CH0/VXHfPzMznZN +1sSChBGM3C/2rJfbYGtiyW/+j+lw1tQgGyUg3vLLZNxakPD5+o1OO0e6Q16ps7ZMCCSjYOt4mvP/6xOVbJxkGbpbPPXziH4OHjnvJc4uTn0sjMHrodXzrrHIGpLwm8jA33vw9sHB36IPonFNjVUrOQaUFK2Gx344XIKx2Jr1pWUZ855o2hJxaaGTHbnWFBSFt9hEdyr/C8Tf8GCxRy+H3jq7f8ArlRftbCK5d8AAAAASUVORK5CYII="));
			this.mother.icones.add("profil", new Icone("profil", "[?]", "image.jeuxvideo.com/pics/forums/bt_forum_profil.gif", "data:image/gif;base64,R0lGODlhCwAMAMQAAAAAAP///3LEGzpYGj5qD5LkO2m1GWClF3q0PKHnVlKAIVGLE4PHO6boX5XcSkyDEm69Gn/GM4zJS1mLJJrdUj9iGWWtGFaUFJzmTVWAJkNzEJflREJjIQAAAAAAAAAAACH5BAUUAAAALAAAAAALAAwAAAVFoCCOIwAITaqmwpkkQRxIVCJisow44hYPnFiGISpEJopYRRERQQyHGIFwMTghEMtDU4VcIbGFBfu1LMTkExZ6MKRPJFIIADs="));
			this.mother.icones.add("purpleR", new Icone("purpleR", "[R]", "[server]/icones/purpler.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQbNr/P0A8AAAD3SURBVCjPhdEtSwRhEADg5z1WV1QU0SjYrtw/EBQEUSzrXxCsgtW43Wqy+Bu8ZjSYxWAwieAHiKCIuHe7d74GdT24cJNmmGeGgQmZPBoRbXmABFo2RvnYlocEKh2HcW1I7IVTqSlNqzJ5bEBPWYP1sG8rHICjuO3Vg1IBGtAfwJXCgqW6vnel8Ka+uQpF3TyPx3W+EnaNm1Tp/G++i5dD97bCpnfP+nqe3PzjwWiGVXAdz0xbkJrW+GVDOJFaDjvgIp7o+hB9gZDJY6WjVHhxC+Yt6au8eZRIzVk0aVaATB5LnypdMCYV0dMV9SXGTZj5wX8Do974DfeRT9Ogx94NAAAAAElFTkSuQmCC"));
			this.mother.icones.add("rep", new Icone("rep", "[]", "[server]/icones/rep.gif", "data:image/gif;base64,R0lGODlhCgANAOdiAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP8ALAAAAQAKAAwAAAhmAIEB+yeQ4L+DwPb5wsbPlzJdB3/tC1fOX7hi9nb966VvXz9//nThwqWLVz59/T76K/dNVyxqMGPCjNVqHr17+E7u29eKlUyZrDrJk1fPHs6TnSD9jAnJELx49OoVxWkoj9WrWAMCADs="));
			this.mother.icones.add("rep_off", new Icone("rep_off", "[|]", "[server]/icones/rep_off.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBDQ8BNusS9c8AAACoSURBVBjThc+9SkNBEMXx31y3EuwtRIs8htrlpXwtWyOmzSOIlTbWEhJBxWOzN5iLHweGObvs/M+OJVmSJKY+ibEGOMddVY5x0f0hbqqiaxjdDEcYlBne+9CiP65bconCgFJgIT5HGlqw4yOilLnyLN7wgLbpZl/ZO72ifeCsRx/0/r3gfox+9LeC9oLTfvETsbBCW+PpH+IabYuTyR9NiNeoq+mKv+gLy/s/MdZtnZAAAAAASUVORK5CYII="));
			this.mother.icones.add("retour", new Icone("retour", "[retour]", "[server]/icones/retour.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBQ8wI8KGRKkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WXz4vdVBTHPzfJSzKTTKYDHfwxLrrRFmeoTgvFQXEjIrPQghtXorgQ/ItcSsGNCCLtRl2UkWln2oIUBLUDthbEwjg+5728TCfJey/HxZ0kN+/Fdv0uXHJyzj3f7z0/7g1RHCTCLI7lUJWiA/DZYjBzMXx+kEgZiAPweAZr8VEUcOUkEAcgnVggIkhRgJxEpxTKsrTN1Jc2pRCRpv5JfpN6qDFMeWK9UqoB/0EU8NVBIroSEwEUacqw16PIMgAsz8MJQ1CK0WBQ6bEsbM9DuS6S54yzDMZjbbNtbN/HDgIQ0X7DoXbrdGq8JAERLNelyHNtd12KLKvfPQ8nirDn5qrgzTHVTjIuyA97bJ95rrHwtbu/YLkuO6svToG8vveQm2fPtJb9jQd/MYr73Hr15SfiXdr9iTsbF6fkcmz8fA9v5QXsIJiqiAWQmFOEwfFxteClr78F4Nb6Kv39/Up/9ptrrN24w/reQ7Io4sIfj1jbvl3Z17Zvs/77nyRpWgWwurXD6tZOK96g12uVS/7d8+eI45ikKBr7rSqRm+0EDI3eHrtuJWdpfXr23n8XgPOPuhBFyPw8xVFS2YulJYqlJUbGRovFxUYGMyNZw7INJ+QGf5YhIqi2drr7T7fWjEZweFi9Ptj/u5LvG6Tq6vewsgKLp6AQfRb6cWX/rR+DP9/AuhfHDfL7/X4tGzZTNvl/TY6g+y/Ydg3i+VhPu8rk04/1pq/9AGFYGxYW9HSc8kZoBzD7d1zoWTWzQV8UrT4V/3fXNX/LwbaeRqy++PKkZjYoY/lgAN0u9HtQ3lbmhpXS0/UMn1hPMxHlyLNa9v1pftthqo/+NwilGiA886zOyOZb0OnUGXrvHWTjAvLKuToI08/3ddmjBdSPu9rn8iZyeVPTbO3C8yv6CcgnH2r99Ztwenma/+03YTRurbjiIBGy1PxQQHqsMy0CrgvDoQ7O6UCWQp7rd9vW9nBBP7NU+5VZ9uc0xvFjSBKNAzoZYairlGe1rdOBINDYR0dNfsvSPJ7XrLjntwRRBlL2qFKNL2ejd0udZdXrSnupM/FMnEkfkVpvnhGT38RsBAG0BjIro7qdlkOF5zOro1mbGf23+A/Sr5o+b30eUgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("voir", new Icone("voir", "[V]", "[server]/icones/voir.gif", "data:image/gif;base64,R0lGODlhCwAMAIcAAAAAAFVQBVdSBVhSBWReBmVfBmdgBWliBWtjBWtkBXNsBoJ5BoN6BpOKCJSLCJ2TCaKYCaacCa6kCq+kCrSpCrerCbmsCbmtCrquCsS3Ccq8Ccu9CdjKCtnLCtzMCt3OCt/PCuLSCuXVCubWCv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACUALAAAAAALAAwAAAhrADEIHDiwRAkMIxKKEDFiIYaDIUKQIKFh4gYPAkGAmLhgIoMMAj98mIhgYoIKAjtwmGhg4gELFzBQoDAxwMQBDwTOhDCRhIACEHRSmNCAxAACDSYIpSDBgQIHEig8lDlzQoQJMx8eHBhzYEAAOw=="));
			this.mother.icones.add("yellowE", new Icone("yellowE", "[E]", "[server]/icones/yellowe.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQXI36ne+gAAAD7SURBVCjPhdExTsMwGIbh908ipXGahrQS4gJIHRAKIksHxo6cgZGJvbeAuQeAE8CSEQaEooqZhRNAF5KSITGDo1qUiv6LJeux9X225AWaHTPNEAAPIDs9+xfnxaOeZogHoPkCIGHxB74vj0nTlLx41R2ufoHr+QHRwMF1hWjgkE16rGNs4rqumZz0SIaC52lU+G1xq0ujxCyzqyUAbx8Jqi+IIxY/P30CcN71vLgURvsQxzA+AhVCoDq8OX4Ah2OI98D37f5WPL+xT3/3IARqC769FxYvsCohCMF1QSkTpR91lfICvaqgaaAqoW3tBW1j8iajdX9zYNe3/wDkuz+sWEgdaQAAAABJRU5ErkJggg=="));
			this.mother.icones.add("Menumessages", new Icone("Menumessages", "> MESSAGES", "[server]/icones/Menu-messages.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAAAUCAYAAAAEEYpkAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxELJRmCUasAAAC/SURBVFjD7ZfhCoAgDIRd+P6vvP4kSKSec1OI+35JzTzOzVlKhBBCCHFFvh6qqg4nigjtczQeMb1nfmt+Hdtbo8RFx5zSU7isBs9WSnmHbOyOmBN6anJIGYlIEVKPZzczKua0njDjrdVhMcgaY9HkpWd41MjDexzeeDrr1JXkVfa7NMMZr6qKNiFPoWjjRps7WgGz2b1y2chI+bXOae+jptcTorN6ZU2LP5eXKK9M39ngIr6HzucPFCGEEEL+wQ1CEsgezHaNIAAAAABJRU5ErkJggg=="));
			this.mother.icones.add("Menuprofil", new Icone("Menuprofil", "> PROFIL", "[server]/icones/Menu-profil.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxEMJCHE9/oAAACXSURBVFjD7ZZLDoAgDEQp4f5Xrhu7IQjDp0DivJXRUfHRNoZACCFkO1I6qaravFFEfiUGkfIlp3avZZFMLYdkLGfX82Pk2+KIgBEQ4ZapZZHMCpJLGQKV5JW5WkxPdXi8a4WshO48MiNm2/GmgZ5au4EOu1kJ+tIr51gr2WK9h51nuyHPzAXHUwscrYJd7cYfPEIIIffwAFWueBRfqQxfAAAAAElFTkSuQmCC"));
			this.mother.icones.add("Menupseudonyme", new Icone("Menupseudonyme", "> PSEUDONYME", "[server]/icones/Menu-pseudonymes.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAUCAYAAACpkJLNAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJEREZNlUOQAoAAAD1SURBVGje7ZjRDsMgCEWr8f9/2b3MxC4KF0S7Jvc8tStS5CJjuy5CCCGEEHKENPqw1lrVhSklpu+lIiMCz4SW1va2iJ1m057PYuhtvPFYbJB4Vt/140fS5XafPWJ6aIEjRWQptJ3xWGws7wzIj2mvZUt7AE44UjhRXwmeeLw2aDxaxwHz85zI3tMaVRxPEtWFwPxAwmet4prj/nrlNEk+TrTpbcONsK/owpTcjVJYtGpCBwLLpkbP33hqrUNYVNHMhJ7JU5C2oU2qu9rZ6iQabfMPbf+rhclXjhYm4iSsDmWW9Sfb7IlfMqPl/DOEEEIIIYSQKD5UkN4mxaH5vQAAAABJRU5ErkJggg=="));
			this.mother.icones.add("Menutopics", new Icone("Menutopics", "> TOPICS", "[server]/icones/Menu-topics.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxELGEHqHboAAACpSURBVFjD7ZZLDoAwCAWh6f2vjKsmLmh5/drENyujQOpAqyKEEEKOo95NM7MwUVV/JQaRUpMT5Zb4Wlz03ItBa6J1C2lEwAytxSFN8WKQmj0NFxHJS8fP6U5NKjJtoxPZU/OImNX0dhmRgMpKUeGS9L7+9FAcXEMrz5OVo46hh9dNEmrbGZ0gaCsVOaul7JA8e7B3f5VWvkRrCnZsE6SmF8MfPEIIIffwAGfWgCK4aKvGAAAAAElFTkSuQmCC"));
			this.mother.icones.add("Menugeneral", new Icone("Menugeneral", "> GÉNÉRAL", "[server]/icones/Menu-g%e9n%e9ral.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJEREiBzhirwgAAACzSURBVFjD7ZZLDoAgDESFcP8r44qEGKW/ASSZt4V06rSlXhchhBAUaYdorbV+JpRSWh1niamjZP+Q9HGdqjF0ZKymeyJ3ek0pjraTJa12rm2k7DXP2+HRO+3MUnxvHK9GmdL+iiJ47rx95Kw4kaKVWe+KlLjXIKsOcoIgpvbJad7Do5bJxEVbpOppF8OKrkQ+I89vWzr+TdwiEhk3q9moOEitjDIJuaB2jy9//gkhhBBi4waRyKgRBiD/MgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("yuu", new Icone("yuu", ":yuu:", "[server]/icones/yuu.gif", "data:image/gih;base64,R0lGODlhEwAQAKUiAAAAAD0AAG4AAHkAAJsAAPM6AP1MAP9ZDP9eMd5lZedwAf9iUdttbf1vAP93ENGJAP+BEf9+QuCTAf+DbP+ISM+SkvyUAP+Ghv+Rkf+tF8DAwP+3YPvDAP+9nf/Cwv/jHv/wfv/5zv///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh/ghCeSBTb2ZlYQAh+QQJDwA/ACwAAAAAEwAQAAAGhcCfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFIDeAK8IiNWTNwCrGeAKL0ekjkZwGYT73j0YXYAFg4HCIcbC4oIEXmCCg0HR3xGCBSOQmQKFmUhaR+eABmcdmQSU12oIVNsgqcSVACwYadjpkccR7VKGmQAD8DAUFG9vkcaUbbFyUEAIfkECQ8APwAsAAAAABMAEAAABo3An3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSc7SGjKIQVkxkhkEALyC9HmoCgEwGAO90AB5qYUMVAwYHBwgbCAgLCxMbdUIVAgVHG0cIFJGDk3gfISIAoKIbGx8cbD8aZBxdU69NqWMAElS1t6gSqkKsR6lGHBy7Ub4AD8jIUMXGRxpRY6ys0EEAIfkECQ8APwAsAAAAABMAEAAABo/An3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSw7QaRaIQVkzcAkAALwCtDg8rAEvmDdh0AB1pa0IeCQQGBwcbCIwLEx1Wdj8eDARHe0YIFBuRbB54HyEiAKGjG5wfHGw/ZBxdU69OqkkAElS1t00cEqtCZEa8RhzDvFEavw/JyVDGx0dGGlFjx8fSQQAh+QQJDwA/ACwAAAAAEwAQAAAGjcCfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFJztIaMohBWTGSGQQAvIL0eagKATAYA73QAHmphQxUDBgcHCBsICAsLExt1QhUCBUcbRwgUkYOTeB8hIgCgohsbHxxsPxpkHF1Tr02pYwASVLW3qBKqQqxHqUYcHLtRvgAPyMhQxcZHGlFjrKzQQQAh+QQJDwA/ACwAAAAAEwAQAAAGhcCfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFIDeAK8IiNWTNwCrGeAKL0ekjkZwGYT73j0YXYAFg4HCIcbC4oIEXmCCg0HR3xGCBSOQmQKFmUhaR+eABmcdmQSU12oIVNsgqcSVACwYadjpkccR7VKGmQAD8DAUFG9vkcaUbbFyUEAIfkECQ8APwAsAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSA+AaRaLQMbn9gABegAj+FgvJ1M8GsOnAAR17AUN4HxkRCIkLHQuJBwMedwASHBkQCEd7RgcCkT9klBkZZSFzH6UAAZ4aoFRTXa9qY5OUk66UYWOgtUYca0qsRg/Dw1BRrGRHABpRusjNQQAh+QQJDwA/ACwAAAAAEwAQAAAGi8CfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFID4IaMohAIuqR+rAAvQATAioVkN2gD6HTmABsZAB54Wx8bEQgICwsdiwcEF4VkElQZFItHFEcYlACWHxmYZSF0H6aEPxqVbmEcXVOxQ5WhYaGgVHertRy+RxJHY2QAD8bGbEqsxEcaUcPLz0EAIfkECQ8APwAsAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSA+AaRaLQMbn9gABegAj+FgvJ1M8GsOnAAR17AUN4HxkRCIkLHQuJBwMedwASHBkQCEd7RgcCkT9klBkZZSFzH6UAAZ4aoFRTXa9qY5OUk66UYWOgtUYca0qsRg/Dw1BRrGRHABpRusjNQQA7"));
			this.mother.icones.add("puppy", new Icone("puppy", ":puppy:", "[server]/icones/puppy.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFxEUBA0cMBsAAAE8SURBVDjLjVNBSsQwFH2Rbiy4c13c6gFcCfYAI4zMBTzJ4B0Edw5zgkGYC2SoKxfiZphtmeJGXAwIVWnkuUiTpknK+KCQ/37eS/p/vqgVEUOaiCBRKwqfS4aErLLAVLQ51yjxxU0BJCet+OimZ8Bqbo2MSbJXfDjuX+NzDlZZZ1IrQkpJAGSVkVVGADr+edEf2XG7qd1TKwJtEdkUsAkDYxJwjkny/LQKqi2EwH84ADiIkfqgFl+PIRczeHsV+H3YgqPUnsbZBFiswdmk467PgMV6+B0AAEepXiw3wNUpsNxoocH3Cqr80GspJU0XyjtBdQtbcQDk/XEQNwX6XXANbDt3064DXmz29QyMidtSI/BjI64VdRHPLy5F+zu2oKrcAu/jaOzOgnCn0byJPM8xBH8iRWycY4/L3NLHH8IKJjYnBhYZAAAAAElFTkSuQmCC"));
			this.mother.icones.add("v", new Icone("v", ":v:", "[server]/icones/v.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFxMHK8SmmL4AAAEYSURBVDjLjZPNTcNAEIXfWJtIIFGBpYgOEi6cQLgESkgXqSFnGnAJKWGjIA5cMBfOli1XEMlIZKXJwdn17E8S3m29ep9nZ95Qbxgp3SqKLnrDFH5T54zcziIone4kSIXmww5Q9yfz3dIDcFs6kIWoq+abV7+MfQluZw6iAODzfcvABfP0IYJ4TyiKAocdzuvva4AIELclSBFn9u9J/W58SEIZrimEyLNsYlcRcjRDH/alP4HA9L8KRKNSd6ZuhpFqrdk2sn4j5AsepyEnIoCmbjB5HgKVPT69ePHsKnJ0ZwzMXTVaqDfscmCrAIB8kR7OzwcwX41xJrtMEgIA3+vYPF/FS0VyG2UmLEhKa43wyZRa51S4QqPVEQFEkZW6PjetAAAAAElFTkSuQmCC"));
			this.mother.icones.add("Menusecrets", new Icone("Menusecrets", "> SECRETS", "[server]/icones/Menu-secrets.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJHAYCCNZa+xMAAADESURBVFjD7ZbRCsAgCEVt9P+/3J4GMdz0qsVg9zyNoZV21UQIIYSQD9O0n2OMYTq21pg+Z1I9CX1L7Jv/ZZ+xQdbw2FnxovuJiBzR5EUVnrVB/BGBZM8805fI33EJERstuIiNpeone6+4liR1RfCRdpPZK7POYQVxOc3fEfVVlWJlu6pYT4urWzfjbfqomjJKmX21CrifuyLJSJV0TyCeKYmq0ZruOwZN5QCGp39FcHMbyZQborodb2ltDz7+CSGEkL9xAm8iqDJwbyHcAAAAAElFTkSuQmCC"));
			this.mother.icones.add("ouin", new Icone("ouin", ":ouin:", "[server]/icones/ouin.gif", "data:image/gif;base64,R0lGODlhEwATANU8AP///9GJAADj/b/5/wC/1f8AALPX/8nJyWSt/5mZmWZmZu/3/97u/zAtGGuBmcHe/zArBuHv/5Gvz0hWZjAwMGZbDMHZ1dHcpfnrz2ZgMmROAFGMzycaACocAHmmz4Cxzy8lAIZYATY2NrvJ2SQkJJeXlzAAAMHTz9Hn/3Nzc73Fzf70z5CfmWYAAFQ3AJmIEjxomf/85/PUmf/0pYm15uCTAf/5zvvDAMDAwP/wfv/jHgAAAP///wAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgA8ACwAAAAAEwATAAAGeUCecMjbGY3E5NCoazaRSuHu1sxZc8/otJqzebG6XRK3q+68gDNWTNzqcmfvDmBbD8nUt9Vro9uFeFx7X388ZDV5V4qFh3l6ijo3bIaNYWWWkZOAOzU1l0yRnmOHiDempqJKOGQ7Aa6uUFGrrEc4UaOzt7q7vL2+QkEAIfkEBQoAPAAsBgAKAAYAAgAABgnAnW4n1N2KxCAAIfkEBQoAPAAsBwAKAAYAAgAABgnAnU63ExKNuyAAIfkEBQoAPAAsBgAKAAcAAgAABgpAHW/HE+6IxmIQACH5BAUKADwALAYACgAGAAIAAAYJwJ1uJ9TdisQgACH5BAUKADwALAcACgAGAAIAAAYJwJ1OtxMSjbsgACH5BAUKADwALAYACgAHAAIAAAYKQB1vxxPuiMZiEAAh+QQFCgA8ACwGAAoABgACAAAGCcCdbifU3YrEIAAh+QQFCgA8ACwHAAoABgACAAAGCcCdTrcTEo27IAAh+QQFMgA8ACwGAAoABwACAAAGCkAdb8cT7ojGYhAAIfkEBQAAPAAsDAAGAAEAAQAABgPAXRAAIfkEBQAAPAAsCwAHAAMAAgAABgfAnWHHIwYBACH5BAUAADwALAsABwADAAMAAAYJQB6AtzPsiLwgACH5BAUAADwALAsACQADAAEAAAYFwB1iFwQAIfkEBQAAPAAsDAAJAAIAAwAABgdAAw+x2/GCACH5BAUAADwALAsACgADAAMAAAYJQJ6Bt0PsiLwgACH5BAVkADwALAoACQAFAAQAAAYPwJ2BB9jtEMQdD2lQOnlBACH5BAUKADwALAYAAwAJAAsAAAYpQN6ORxwSj8hj7ghIIptO227phCJzw52Otx0ajrfhlmewFhGIb9LICwIAIfkEBQoAPAAsBgAEAAkACwAABi7AXW7H2wGIvKRyyWwubc5cI9dsxBpNiAVySxYKJoll1VmCPicMk+PZSChNEjwIACH5BAkKADwALAYABQAJAAsAAAYtwB1PSOQZj8ikMplb5jLNZGVWOe6uu4umdi0UWg6HLOliORKKJIyGSiMVcF4QACH5BAkKADwALAAAAAATABMAAAZZQJ5wSCwaj8ikcslsKne5nW0HkOaUuaxtC7Bdk1ntNqvUhc9fpM6M1pV1u/had1Pe4vjXrfbExxUhO30FhDsTgko4fhMjAAmJOJEpDxGOTgkPlI+XCZtOSEEAIfkECQoAPAAsAAAAABMAEwAABopAnnDI2xmNxOTQqGs2kUrh7tbMWXPP6PSZs9l2WN0uidtxd18AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4mLjI06N3aIkE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFrzsipWSsqCoHUUSsrCULCwC4uUkHDL/BwkPExcfIQgfPSUEAIfkEBQAAPAAsAAAAABMAEwAABnlAnnDI2xmNxOTQqGs2kUrh7tbMWXPP6PSZs9l2WN0uidtxd18AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4mLjI06N3aIkE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFr0dRpq1HOLJErLm3u7y9vrtBACH5BAUAADwALAUABwAJAAEAAAYHQAFvSOQJggAh+QQFAAA8ACwEAAcACwACAAAGC8ABb0gkDgTFpCAIACH5BAUAADwALAMACAANAAIAAAYMwAFvSCzyBgKjUhAEACH5BAUAADwALAMACQANAAIAAAYMQB6BRywWh0OjUhgEACH5BAUAADwALAMACwANAAEAAAYIQAJvSCzyCEEAIfkEBQAAPAAsAgAKAA8AAwAABhJAgoBHLBp5AgLhyCQul83iMggAIfkEBQAAPAAsAgAKAA8ABAAABhNAAW9ILBKFQqNRSFA6m00nsRkEACH5BAXIADwALAIACwAPAAQAAAYWQAFvSCwShQKCsUgQNpXL4ZMHjUp5QQA7"));
			this.mother.icones.add("skinSelectnoir", new Icone("skinSelectnoir", "", "www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACHSURBVBjTldExDoQgEIXhnwQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQSQlAAWkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tzgeZ4fwXVdLd62Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFfcEXFAAAAAASUVORK5CYII="));
			this.mother.icones.add("skinSelectds", new Icone("skinSelectds", "", "[server]/icones/skin_select_ds.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRILMmIH9SEAAACSSURBVBjTY2RgYGA4ps/wnwEPsLrIwMgAU/hnbsN/XOBPY8x/mGEsDAwMDEz3LjH8bYrFZziDiorKfxYGBgYGxiMbGZgZCAMWBgYGBgZZNfyqPlxHKP4vr4lf8WVkxbLqDAzUcAbjj6+oihmPbWZg9ElmYODiQ1X57RMDw9IuhEZiIiXuqwpCMSwc8Wm4c+cOIwDcQ0CFQtHPfwAAAABJRU5ErkJggg=="));
			this.mother.icones.add("skinSelectiphone", new Icone("skinSelectiphone", "", "[server]/icones/skin_select_iphone.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACHSURBVBjTldExDoQgEIXhnwQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQSQlAAWkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tzgeZ4fwXVdLd62Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFfcEXFAAAAAASUVORK5CYII="));
			this.mother.icones.add("skinSelectpc", new Icone("skinSelectpc", "", "[server]/icones/skin_select_pc.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHREtGpYqYKYAAACDSURBVBjTrdGxDcQgEETRj4REAVACFdCS66IDaMGSAxcBInJIB4iAi3yWg0MEN9lKbyfYFQDbtg0m8d4Lbrjv+/iVEMK4yyRArZUY46wca+2QACklViIBtNZTdF3Xg40x/2texr33N84545xDKfWCrTXO8/zOYuUpx3E8+L7jbKGUIj7FeEarOuoqbgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("skinSelectps2", new Icone("skinSelectps2", "", "[server]/icones/skin_select_ps2.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHgIMKN63lgIAAACSSURBVBjTY2RgYGBgCDn2nwEfWGPFyABT2LDlz39cIGbBn/8ww1gYGBgYLj1nYohd+Bev4SoqKv9ZGBgYGDZeZmRgYGBmIARYGBgYGNTE8Cu6/gxJsaY4fv9dRzZZXew/AzGAoDO+/mJEVbz5CiNDsiUjAx8HqsJPPxgYuvYg+IzERIrKhTgkxdBwxKfhzp07jAAxREBWokDX9wAAAABJRU5ErkJggg=="));
			this.mother.icones.add("skinSelectps3", new Icone("skinSelectps3", "", "[server]/icones/skin_select_ps3.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE5AqvoL6UAAACnSURBVBjTY2RgYGBg0F7xnwEfuBrByMDAwMDCoL3iv7tXMMOklHtY1fm3KTPcYFjxn+FqBCMLAwMDw43HTAz+bcp4DZeTk/vPwsDAwPDw4V0GYgALAwMDAwOHAn5Vn84hFMuLM+NV+/AVksnKUvgD4+FlJMWKErgVf/vFhOrmPeeYGEIdGBl4OFEVfvnOwLBmKyOcz0hMpMh9LkNSDA1HfBoePXrECACG0injH6GevgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("skinSelectpsp", new Icone("skinSelectpsp", "", "[server]/icones/skin_select_psp.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE2KPfL+rwAAACRSURBVBjTjdEhDsJAEIXh/yVrWoHHbyBcgatAMEgOgcegOAjhDlyAAGaDQdc0qaMdBDS0oss+N8k3k8mMADicjVg2c9HC7aO2oSyutbXDHMClEstbEx3uvTcHcCwEiH9xAJM8ju5dPMssHU9zIyWfNbJhUDXq41Mh1mMxcn1YvmD3/NVKeYrfrzr4e8dYQwhBbyk2QJ2aWPfbAAAAAElFTkSuQmCC"));
			this.mother.icones.add("skinSelectweb", new Icone("skinSelectweb", "", "[server]/icones/skin_select_web.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE0KMX9mD4AAACJSURBVBjTY2RgYGA4lsbwnwEPsJrFwMgAU/jvQN1/XODf+qj/MMNYGBgYGBheX2H4vyEan+EMKioq/1kYGBgYGG9tZCAGQEwWVsOv6uF1hOL/wpoEzERSzCCkRiVn/P6Gpvj2FgZGg2QGBnY+VIU/PzEwHO+CcxmJiZS4fSoIxbBwxKfhzp07jADXjD+jlgklkwAAAABJRU5ErkJggg=="));
			this.mother.icones.add("skinSelectwii", new Icone("skinSelectwii", "", "[server]/icones/skin_select_wii.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRINBPvnxz4AAACaSURBVBjTY2RgYGDYw2D4nwEPcGE4z8gAU/g7f/L/z58/Y8W/vSv/wwxjYWBgYGC+/ICBI6INn+EMSkpK/1kYGBgYvu07w0AMYGFgYGDglhbHr+rpJ4Ti/+qyBBTfRij+pyaNX/E+JGcwqOBWzPj1B6qbmbadYmCIc2Vg4ONGVfnpKwPj4j0IjcRESprSR4RiWDji03Dv3j1GAJIuQG7EaFTYAAAAAElFTkSuQmCC"));
			this.mother.icones.add("skinSelectx360", new Icone("skinSelectx360", "", "[server]/icones/skin_select_x360.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRIOEiQeIawAAACUSURBVBjTY2RgYGBgOKb/nwEfsLrIyABT2Ph77n9cIPZ303+YYSwMDAwMF5nvMcT9acZruIqKyn8WBgYGho2MR6Da8AMWBgYGBjUGWbyKrjN8QCjW/C9PQPFlhGL1/7IMxACCzvjK+ANV8WbGYwzJjD4MfAxcKAo/MXxj6GJYCuczEhMpKnFfkRRDwxGfhjt37jACAN3yQIh8WU6pAAAAAElFTkSuQmCC"));
			this.mother.icones.add("TitreModo", new Icone("TitreModo", "[Modo]", "[server]/icones/Titre-modo.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJHhcxFfba8zYAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACI0lEQVRIx9WXsU8UQRTGf7NDXEJiCAWBRCyMgcLmYoW55qAjsbcjFhaU/CE2EmkotKGh1pBYQAjNqgUxZ2EkSCzAZNF4F0732DldxuJmN3vr7t0shfFe8pK335tv572ZL7OzQkupGWI7W4oEwPQ2jADo1dWhbWZqbU3z9KHweY7QUmq9sjLMm4PY2IDHD0S3meVlht3E5mZXZoShFUFFEd+UYtJ1caXMxQFO223U5SUAruMwMzZWiLtSoqKoMFfGRgBEEFgN/hIE3N7dZb9a5d7ERFLI22aTmufxYXGRr0qx4Hk9vP1qlUnX5c7e3l/43fFx3p2fU8vhxHPYmgNAu23lyjRd8zxe+z6tVos3vp8UctxoJI28rFR4Uakk4z81GsmkT+bmet5TK+CcNJvoILCrL94ZW5nR6SThwsEBz2ZneXR0lGChUkl8y3F6JZrK3UjlflxcFHPCEITouo1pKfVvsPL3oPvZVipfB11PPW9ZxFlOHfQvy9q0lNq56umxblZr3XbV/oFduZl54LMQzKewa6n42Hhe7jQVX+/DccsWVUZmhykJfDQSOMzIYidHijsZ+aTx7304Py3rimUmtJQ6iiK77wxwYuKbZuWymDYr30ntyAwgzDhl4hgfBcICzmiJTZFSUqoZTLGYgoqw7M11ED4oZ9uMc7YUCVniwyRyJspiIuOD8EE56wNgert7jZYlrw7/5f0sDvz7MPVquP9t/gAg5PNLm8P8iQAAAABJRU5ErkJggg=="));
			this.mother.icones.add("avert", new Icone("avert", "", "[server]/icones/avert.png", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKAw4iMsQbaqIAAACRSURBVBjTjc5BDsIgEEDRXyHqfbybh/IwXsETGG2lLcIwdAMLTUB/Mrs3A0M+nzI17yB6iJ4U3mgMaBKOlzBYAG5XvjNlZjUAWFbA0UxEC7y7PowVvuQHpMBn+AvuWAK9ZK4XR4FHG2oqME+Jofe0FphWgw37JlyyAhGrcuj+URFgxKoI3hq8CABzVjwwkT8WNj2iUllbs4igAAAAAElFTkSuQmCC"));
			this.mother.icones.add("cssPagedebut", new Icone("cssPagedebut", "|<", "image.jeuxvideo.com/css_img/defaut/page_debut.gif", "data:image/gif;base64,R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MKVDK5UT6A3CyZwWBAK1IRpClscJIIggDGYKI8NA1O+t761ODEYgFEwj3ABRKBgoI9nP+ZxIi9SPxGKRRAAAOw=="));
			this.mother.icones.add("cssPageprec", new Icone("cssPageprec", "<", "image.jeuxvideo.com/css_img/defaut/page_prec.gif", "data:image/gif;base64,R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MKVDK5UT6A3CyZwWBAIVIqNQHhyCqoOpuQhMyAA9DMTNdgEXj1AwpQSIXsFAOQ6XzImNaIhKLBZJBAA7"));
			this.mother.icones.add("cssPageretour", new Icone("cssPageretour", "^", "image.jeuxvideo.com/css_img/defaut/page_retour.gif", "data:image/gif;base64,R0lGODlhDAAMALMAAP////7+/vf39/Hx8fDw8Obm5uXl5eDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAACH5BAUUAAwALAAAAAAMAAwAAAQ5kDFFK5UT6A2EypwmCAMVdmSpcMtCvIWpta1hHDJNH/iKDoMCD2EaAYUHRIJiDA4Ty8nxGZVYLJIIADs="));
			this.mother.icones.add("cssPagesuiv", new Icone("cssPagesuiv", ">", "image.jeuxvideo.com/css_img/defaut/page_suiv.gif", "data:image/gif;base64,R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MKVDK5UT6A3CyZwWBALFIR1ZHieiDuaGzMNAxN2M2Deb0gRCwTQS7IIFA6Uo4CWVE0ETaYBKLBZJBAA7"));
			this.mother.icones.add("cssPagefin", new Icone("cssPagefin", ">|", "image.jeuxvideo.com/css_img/defaut/page_fin.gif", "data:image/gif;base64,R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MKVDK5UT6A3CyZwWBAK1IRpClsepIoIwmCliDwNBA/ZN6K3ODfErmEYIHKJQMFBGsRyh6ZxEi4aqxGKRRAAAOw=="));
			this.mother.icones.add("cssPuceprec", new Icone("cssPuceprec", "<", "image.jeuxvideo.com/css_img/defaut/puce_base.gif", "data:image/gif;base64,R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUcwAmQAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAAQ+MMlJq60n6zwP+CAQHIkXfkEgZCeSCqsJIgg8sACtIwOB7zSCz/QKEgqslwAhLBgyyt7R8CzZmlSSZLO5XCIAOw=="));
			this.mother.icones.add("cssPucesuiv", new Icone("cssPucesuiv", ">", "image.jeuxvideo.com/css_img/defaut/puce_fleche_gauche.gif", "data:image/gif;base64,R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUf///wAAAAAAAAAAAAAAAAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAARAMMlJq60n6zwP+CAQHIkXfkEgZCEiqqsJIEgqCAM70/xA6Dwe4WcK0AY+QoFlQyQLhowNN4RGS7en4SrZbC6XCAA7"));
			this.mother.icones.add("cssPuceinfo", new Icone("cssPuceinfo", "(!)", "image.jeuxvideo.com/css_img/defaut/publi_info.gif", "data:image/gif;base64,R0lGODlhCgAKAMIHAAAAAJmZmWZmZszMzLOzs8DAwKampv///yH5BAEKAAcALAAAAAAKAAoAAAMfeBc1U0Ed4uogq6oaqNuO9x2WBYZlhWnkaKSGNIVSAgA7"));
			this.mother.icones.add("fish", new Icone("fish", ":fish:", "undefined", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACa0lEQVR42pWSW0hVQRSG/9mzZ6vnqEn6oCYIQUqK2UUpyYJ8yCChC6RBKUFlBPUSKGQvKmJpEJEghVAYZBG9RXR50IcoKMlL+qIFJenxlh7d5+Ju75k9zREfshQ6i2GGtWbWt/6ZWQRR2sEcst+3QKaGfe5oxCfRJOsMdKCKDDZ30+td3/ijqAFFm0nh+33y491PesfFYV4dNaA6j1y6lyLbJjiZK+gluVOWO/1fANkG79AEMqd7SWvxuDxsJAMP/eTxhRFZtQyQD7CRB5APG1mEI404SJYWkoit4iaSRRCpdBLpI34688VPx3fEiXxmy9imIK0jLUdxsjYHN+EjGTAlnKAiumrYgBMChATsJcCrSrXPs86aGZxNo9oWCmmYkDOk+xjeHsjaXbx4vAle3yC0+1cxO+AgPhMIzwExKYC1ACQwoG6SNdyedOr/vB55uhdPTtS3VTT/SMXp0iJkXNsDs28c+galYqW6ZaqDAeB8gJ16GXK6VgFqsrXa1rKtLaKiGdroB4Tbb8C2XGixQEgpMBKAJbXakriHfHTXV5sPrALkJenb+gt4H/WAWn7A/AlwDsQp6WHlu+o9PDHAUICOlY4h15YitAoQmZ5n66/K0nnpvJIqVDKo2tDVIy6t+PNAxy+9s3GBn/n7i5cB2z2ssCdDvOPEZa5HyQ2rDU1JVz/CDKVkkaDc1EuGbadnTUDEKuONy7e8zh0jVWJRVeaO6g8l31CQDst41hjm5Sog1wVE7Ign5twVJho2uSKdMImgTfDCZa+bbFkZ5s7sWl36TysnMpa2U9dKEiVSvks5+pmLNxBCrNfmvwFW0QZYI9+60AAAAABJRU5ErkJggg=="));
			this.mother.icones.add("o", new Icone("o", ":O", "undefined", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEzSURBVHjaYvz//z8DOmBkZMQQBKpjRBcDCCAWbJr+3mPCaSCyIQABxIIs+XU/MwOHPMRSRu4AFM1/722Aq4MZABBALHg1crghbAbZ+nUD2FUwAwACCO4+kEZmpX9wjUzi6yA0fwYDI4cZ2CCQPDIACCCIgUi2whT8+zgDrghkAFzsxy6wC0DqAAIII2T+vQwCY5AiuBhQ0/+f5zACESCAWBhwAIiz1yE0/ziFYiAIAAQQWPPrK/8YRBmYwE6HOQlsO5KzkfkwABBATAwkApDhPx5CohoggFhAQQ4K+geTEbbDFKFrAgGQRm7Hv+DEAhBAKH6GOR8Ul8jRAktxII0gNTAAEECMsLQNsR3iHFEd7L4BaVTI/Q9PogABxIicMWDpF2YIMgBpQk/bAAHESEmuAggwAJSzncndus58AAAAAElFTkSuQmCC"));
			this.mother.icones.add("bluePin", new Icone("bluePin", "°\\", "undefined", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEBQozIH+9AzUAAAE6SURBVCjPnZK9SwJxHMY/V3fBnUouFcoJTSI0OtjSEgXl4mS01VIETW1Be0tDCNbQ1D9hCHUQ0ZA0SItgIOFkKJmId+Jp/ZqSExWvnu378nxfHh5wCUUOCEUOCL9nQzjzkku+ODl67wcXV7s0zKwEMOVm81a8jOaRqFV71Ko9DvevUeSAcDWg26tgd8TYujwq6fwzrKfJ5c+JLB0T1GW69mCvNIoc1tNs78ySf25TLNgkkj7Sl6c0rUeU6TmAvgYjL1hZ1Whb3xQLNppHovzWRZ2JAFCppwaWTtRgPe7FMDI0rQcq9ZQ7DUqvNiUgkfRxe9MiFFxjObRJ5u6Thpll4gX3TwcA1D++iMZUojEVALPzMtQ7zkgCYHH+DK8aA6DVztEwjb54Y7Hg3xOOIb/WHbKwG/K/IP5K/gHxZnEy6Ua/KgAAAABJRU5ErkJggg=="));
			this.mother.icones.add("yellowPin", new Icone("yellowPin", "°\\", "undefined", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAOCAYAAAAmL5yKAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gUGCQgGvJFR9wAAAQxJREFUeNqNkz0KwkAQhb8VtRQkpo5YWnkGOy2sBME2hTbWXsGL2FnZ2Np4hwREgoJgEQQRUiisxRiDutEdGIad2fd2/lZ5noeNlEpogEoF4hiV+ovYid5sskOng05JCjYvz+dQLsP5LLpaZRn9JbjdIEny40YCx0GnOpnAbCYkrgvV6vvdogk8HMJoBGEI6zUsFtDvw+kkpTwzU7lNHAzgfhew6wqwVpPYdptNwGoKvR6Mx7Dfw/H4HTcSBIFY34flErpdaDalrDi2aOJ0KvZ6hXZbFOBy+b6rcjZRA7Ra0GiIY7eDw+F9C40E9To6ilApieNI2k+rfvbgA6wgq/mzdmMPouiVvrL8IzwApGBdiPV0C2EAAAAASUVORK5CYII="));
			this.mother.icones.add("cross", new Icone("cross", "+", "undefined", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gUDCCkbZRSyyAAAArdJREFUeNrt3TFP20AYh/HnLjZUHZCy0iVDmZrvUjrxMeEj8CFgCgNT1kioQqUOdx3sKKjqhgPF7/OTkMPkO98/8Vm69wySJEmSJEmSJEmSpAlKETtdIa+g/QT5F5Qz6BIUAxBk8IF5B4sEJxUeWrgHNhFD0AQMfdvBYgbnBc5msOrgqoWfwFO0i5EDBiAnmFdYNnBRYZlgHvRaxOv0ur/t5QLHAMMxr4POh0KmftsP9m7A0zbo4IcNgAyADIAMgAyAAZABkAGQAZABkAGQAZABkAGQAZABkAGQAZiYBir9H0Bt9p8NwNSd9oNd8rACeDiW06AhiLgsvFTYZLjZwlOGVYENFobEYGFI8ADsQmBpmCRJkiRJkiRJkiRJkiYp/IoggEOsCvr7HLORrvXzsHh1rDanKB192V5g/giL3G8RS4HN5xHXBf7jHHnEL1sFylhtbsbo6JcDdxS4r+Mt2mw7WBzBjwTfhhPddnA54obRbQeLZn+O45Gvy1Meqc1NlI6+kJ9hnmF5BN8BfkMqcN2OVyeRE5wk+NrA+SFuY9v+WpzwyjY3UTr6xkqFhwp3HVwd4otR4S7BA6/8VWyidPRlm2f97eRmN8/IcJvGLQ7pWrh/hMsM1weeA3TvNgn8SJOdt5wE+hTwHz8FvNVjoCRJkiRJkiRJkiRJkvQuUtSOu11s4AC4YfReE/QHoO1gMYPzAmczWHVwNWLtwYcR9ZUxOcG8wrKBiwrLtF/VjAGYuHV/68ulr2NgOOZ1wFti2JdGbfvB3g142gadD/nWsOAMgAGQAZABkAGQAZABkAGQAZABkAGQAZABkAGQAZABkAGYjKbfiLIO/9Zm/9kATN3psA1tHlYAD8dyGjAEUZeFlwqbDDfbfkv6VRl3s+gPw8KQ4IUhloYFLw2TJEmSJEmSJEmSJE3SHxW7G01Huk2SAAAAAElFTkSuQmCC"));
			this.mother.icones.add("topic_dossier1", new Icone("topic_dossier1", "", "http://image.jeuxvideo.com/pics/forums/topic_dossier1", "data:image/gif;base64,R0lGODlhEAANAMQAAP/////urf/qmf7ni//lf//kef/hbf/gZP7dV//ZRP/WNP/SIP7OD//MAPrHAPbEAPLBAOq7AOa4AOCzANarANKoAMigALyWALKOAKiGAJp7AJJ0AP///wAAAAAAAAAAACH5BAUUABwALAAAAAAQAA0AAAV1IMc1jeMEYqqOQAtExJo2gGALwDRRlGWho4Fw6GpZGCgHgQBpOiW73u9RgBSvBECGATE0bmAbQpCpRA7foXqQIFckB4hgSacrBJrK5CARFP6Afwt4FRUHFAIGiouKDIQBFT4WFxcYGZcamRsNHAQNhaChhZwhADs="));
			this.mother.icones.add("topic_cadenas", new Icone("topic_cadenas", "", "http://image.jeuxvideo.com/pics/forums/topic_cadenas", "data:image/gif;base64,R0lGODlhEAANAIcAAAAAAK+zvP9CAJRXADM3Qv+ZAEgoAP///ykwODsVBP9zAFZaZbxED2o8AP/MAMXO1QoPFf+sAJ45Df9mAP+DAExPVmFscq8/Dl00ACQNA8PH0Jc3DNXc5HYqCf+2AP9ZAE8cBhIGAcVHEGZmZv+OAIMvCv+8AP9SALq+x0cfAP+lABUYIaNSAP98ADc6QW1wec1KEGYzALZCD7a5wszQ26I7Df+ZAP9mAP/CAP9JAC4yPVpdZjg8R0tSWFg7AN7e5nssClYfBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByU2BUBqAPpVzYY6JIJRZIJThJbhAIAJBJZcAAAApJBkP1wAJEQBRJYGAAAABJY6JHuGJIJcJjkwJI+b5I+YgACCBJcKBJcAAAAuAdqfQAAEhnN8CKWkBJZegAADgAAXAAAAroAuP38AAAAABJYrP38AAAAAAgAuAAARQABJAAAuAAAAAAAAxJaNAAAABpAoBJZfAAAAAAAAAAAAP38uJIJRZIJTgDQSxJYVBJcABJblJHuGBJcKAAACBJbpJJALhpAsBJZfJHl5YEOSAAC0BJZSBJZUAAACAAADhJhLO1fWAAACQAAAAAAAAoACJI+iAACGgAAAAAAAAAAAAABAAAAABJhLAfmtwAC0AAAAAAAAAAAAQU8dQAC0AAAAAAAAQU83hJhLAAAAAAAAU5vlhJhLBJhLO1fWAABAAAACRHP0BqxoWFnAM7BVABThfmhAAAAAAAAAJHuGAABAP///5IHMpIGq5IG6wAAEgAADCKWkGQAaW8AZWMALm0AbyH5BAMAAAcALAAAAAAQAA0AAAikAA8IFDiiwo4XIwYqHNhDww8aKDS4WDhwAQcEOggQ4DFjBcUDFh4gqBgAwsIaImBckABDhowLMDZcADJQhAMcHjyoKFCAAgUFE4IMlIEDpwofBhr8BJpg4AUTJiJEKGDAJ9APAAZKyLlzgAEWChR8wFrTg9QCGAxguEpWYI2zJAwYSDFhwokcWQUyUKGCBIkWLep+yIFXYYcSiEFkCAGgcYiBAQEAOw=="));
			this.mother.icones.add("topic_marque_on", new Icone("topic_marque_on", "", "http://image.jeuxvideo.com/pics/forums/topic_marque_on", "data:image/gif;base64,R0lGODlhEAAOAIcAAAAAAP///4K1Oj9XHLPWgR4qDWaZM6LNZA8VBr3bkjNGF5LES05sI7DUfXysN1V1JozBQMvjqCo6E5vJWsLemzlQGaTOaVd4J7jZipfHUgAAAAAAAAAAAAAAAAAAAAAAAFU3rMGMJqjjy5sTOt7CWhlQOVdpztm4J1LHlwAAAAAAAAAAAAAAAAACABJWxAAAAJIFyDavoBJXkJIFUdcHGJIFbe4cOAAPoJIVlpIG6wAAABJcKBJcAAAA2wAAAAAAAAAAAwAAAAAA2wfmtwACKP//JQAAAAAAAQU8dQACKP//JQAAAQAAAAAAGP//JQAAAQAAGABmkNcAABJVQAAAARJXkJHuGNcAAP///5IG67/DydcAAAAAALIAAAAAAxJW1AAAABJXyJHuGJIFcP///5IFbb/C3tcAAAAAAL/C4+4cOAAAAhasvL/ELgAADAfoLxa2uBpCyBa2uBJmoMBclL4gcAfoLxa2uAXL5QAADu4fOAAAACCEYAAAARpC0BaswAAAAByU2BUBqAPpVzavqJIJRZIJThJbhAIAJBJZcAAAApJBkP1wAJEQBRJYGAAAABJY6JHuGJIJcJjkwJI+b5I+YgACCBJcKBJcAAAAvAdqfQAAEhnN8CJK0BJZegAADgAAXgAAAr4AvP38AAAAABJYrP38AAAAAAgAvAAARQABJAAAvAAAAAAAAxJaOAAAABpAoBJZfAAAAAAAAAAAAP38vJIJRZIJTgDQSxJYVBJcABJblJHuGBJcKAAACBJbpJJALhpAsBJZfJHl5YEOSAACKBJZSBJZUAAACAAADhJhLO1fWAAACQAAAAAAAAoACJI+iAACGgAAAAAAAAAAAAAA2wAAABJhLAfmtwACKAAAAAAAAAAAAQU8dQACKAAAAAAAAQU83hJhLAAAAAAAAU5vlhJhLBJhLO1fWAAA2wAACRHP0BqxoWFnAM7BVABThfmhAAAAAAAAAJHuGAAA2////5IHMpIGq5IG6wAAEgAADCJK0GQAaW8AZWMALm0AbyH5BAMAAAEALAAAAAAQAA4AAAh1AAMIHEgQAQIJBBMOBIChIUKFAxEsoHDgAAYEEAUCgEDRIsaEEkI6GEAgQcOPAyU4iDDBAYUBBUIqlNCAggMBFh4MyEjTJoULCgDwhMBRgIAMD2dKgNCgaQaUCgEAYGDAAIOkCSsEkCoBAFaCWoVmJCh1rMCAADs="));
			this.mother.icones.add("topic_marque_off", new Icone("topic_marque_off", "", "http://image.jeuxvideo.com/pics/forums/topic_marque_off", "data:image/gif;base64,R0lGODlhEAAOAIcAAAAAAP///8ItLXQbG95zc0APD9VOTrcqKuOKihYFBUwREYEeHuGCgswzM9hbW+miotE+Pl0WFp0kJC0KCn4dHeWUlN94eFUUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOlbWz7RohYWXS0kJB1+CpSU5VV4eAAAFAAAAAAAAAAAAAAAAAAAAAACABJWxAAAAJIFyDe/YBJXkJIFUdcHGJIFbe4cOAAPoJIVlpIG6wAAABJcKBJcAAAA2gAAAAAAAAAAAwAAAAAA2gfmtwACKP//JgAAAAAAAQU8dQACKP//JgAAAQAAAAAAGP//JgAAAQAAGABmkNcAABJVQAAAARJXkJHuGNcAAP///5IG67/DydcAAAAAALIAAAAAAxJW1AAAABJXyJHuGJIFcP///5IFbb/C3tcAAAAAAL/C4+4cOAAAAhasvL/ELgAADAfoLxa2uBpCyBa2uBJmoMBclL4gcAfoLxa2uAXL5QAADu4fOAAAACCEYAAAARpC0BaswAAAAByU2BUBqAPpVze/aJIJRZIJThJbhAIAJBJZcAAAApJBkP1wAJEQBRJYGAAAABJY6JHuGJIJcJjkwJI+b5I+YgACCBJcKBJcAAAAvgdqfQAAEhnN8CMvaBJZegAADgAAXwAAAsAAvv38AAAAABJYrP38AAAAAAgAvgAARQABJAAAvgAAAAAAAxJaOgAAABpAoBJZfAAAAAAAAAAAAP38vpIJRZIJTgDQSxJYVBJcABJblJHuGBJcKAAACBJbpJJALhpAsBJZfJHl5YEOSAACKBJZSBJZUAAACAAADhJhLO1fWAAACQAAAAAAAAoACJI+iAACGgAAAAAAAAAAAAAA2gAAABJhLAfmtwACKAAAAAAAAAAAAQU8dQACKAAAAAAAAQU83hJhLAAAAAAAAU5vlhJhLBJhLO1fWAAA2gAACRHP0BqxoWFnAM7BVABThfmhAAAAAAAAAJHuGAAA2v///5IHMpIGq5IG6wAAEgAADCMvaGQAaW8AZWMALm0AbyH5BAMAAAEALAAAAAAQAA4AAAh0AAMIHDgwQYICBBMOBMCgIUKFBSFUcOCAQQKIAgE0mFjxYsICIA9EsICgoceBBQ48MHCgQoQJIBUWIFDhgAAHFCJgnFmzwgIFAHY22ChAgIGHMgs0IMDUwEmFAAAMkCBhANKEFwJELQDgKsGsQTESjCp2YEAAOw=="));
			this.mother.icones.add("topic_dossier2", new Icone("topic_dossier2", "", "http://image.jeuxvideo.com/pics/forums/topic_dossier2", "data:image/gif;base64,R0lGODlhEAANAMQAAGwaEfH3/Ns6KvTCvaQoG+Z2a4cgFuNiVLYsHeqNg+VuYuFbTsUwIJolGed9cuBUReRqXXseFJIjGJ4mGbstHud4bOVwZNMzIt1FNqopG3EbEoshFgAAAAAAAAAAAAAAACH5BAUUAAEALAAAAAAQAA0AAAV3YBBQJJWIaDoO7JApKkoNTu0MBDFNknSOlYJQ2GJJGCeExYJoOjOZXS+BgCCKWMUgwkAcKLZw7eGINDILcGXNXmPK5wXCsazXBQ5Ng7AgOCCAgYAXeQ0NCxMOB4uMiwyFCQ09EhsbEZcRGpoaFAEKFIahooYUCiEAOw=="));
			this.mother.icones.add("", new Icone("", "<>", "undefined", ""));

		}
		if (scr) {
			this.mother.scripts.add("save-local", function saveSet(key, value) {
				return localStorage.setItem(key, value);
			});
			this.mother.scripts.add("load-local", function saveGet(key) {
				return localStorage.getItem(key);
			});
			this.mother.scripts.add("delete-local", function saveDel(key) {
				return localStorage.removeItem(key);
			});
			this.mother.scripts.add("displayer", function displayer(element, state) {
				var id, target;
				id = element.getAttribute("display_target");
				if (id) {
					target = document.getElementById(id);
					if (target !== null) {
						target.style.display = (state) ? "" : "none";
					}
				}
			});
			this.mother.scripts.add("armeAim", function armeAim(element) {
				var name, key, val, targets, i;
				name = element.getAttribute("target");
				key = element.getAttribute("key");
				val = element.getAttribute("val");
				targets = document.getElementsByName(name);
				for (i = 0; i < targets.length; i += 1) {
					if (targets[i].getAttribute(key) === val) {
						targets[i].checked = element.checked;
					}
				}
			});
			this.mother.scripts.add("shoot", function shoot(element) {
				var name, targets, i, link, win, body;
				if (confirm("Êtes-vous certain de vouloir supprimer tous les éléments sélectionnés ?\nCette action est irréversible.\n\n/!\\ ATTENTION ! : L'administration de jeuxvideo.com tiens à préciser que la suppression rapide et massive de multiples messages peut entrainer d'importants dommages aux sujets pouvant les rendre inutilisables. Cet outil est donc à n'utiliser qu'avec parcimonie. L'administration e réserve le droit de refuser toute restauration de sujets ou messages qui auraient été détruits ou rendus inutilisables après une utilisation inadéquate d'une arme de modération.")) {
					name = element.getAttribute("target");
					targets = document.getElementsByName(name);
					for (i = 0; i < targets.length; i += 1) {
						if (targets[i].checked) {
							link = targets[i].getAttribute("link");
							if (link) {
								if (blast) {
									blast(targets[i]);
								}
								win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
								body = win.document.getElementsByTagName("body")[0];
								body.setAttribute("onload", "close();");
								targets[i].removeAttribute("link");
								targets[i].checked = false;
								targets[i].disabled = true;
							}
						}
					}
				}
			});
			this.mother.scripts.add("massWarn", function massWarn(element) {
				var name, targets, i, key, max, value, pseudo;
				name = element.getAttribute("target");
				key = element.getAttribute("key");
				max = parseInt(element.getAttribute("max"), 10);
				if (name && key && max) {
					value = prompt("Avertir à quel niveau ?", "");
					if (value) {
						targets = document.getElementsByName(name);
						key = key.split("@");
						for (i = 0; i < targets.length; i += 1) {
							pseudo = targets[i].getAttribute("pseudo");
							if (pseudo && targets[i].checked) {
								pseudo = key[0] + pseudo.toLowerCase() + key[1];
								if (value > 0 && value <= max) {
									saveSet(pseudo, value);
								} else {
									saveDel(pseudo);
								}
							}
						}
					}
				}
			});
			this.mother.scripts.add("kick_sujets", function massKick(element) {
				var name, targets, i, link, motif_id, motif_bloc, motif, win, pseudo, remind, script;
				if (confirm("Êtes vous sur de vouloir kicker tous les utilisateurs sélectionnés ?")) {
					name = element.getAttribute("target");
					motif_id = element.getAttribute("motif_id");
					if (motif_id) {
						motif_bloc = document.getElementById(motif_id);
						if (motif_bloc) {
							motif = motif_bloc.value;
							if (motif) {
								targets = document.getElementsByName(name);
								remind = {};
								script = function () {
									var url, col, ul, li, i, a, win;
									url = this.location.href.split("#");
									if (url.length > 1) {
										col = this.document.getElementById(url[1]);
										if (col) {
											li = col.getElementsByTagName("li");
										}
									} else {
										col = this.document.getElementById("col1");
										if (col) {
											ul = col.getElementsByTagName("ul");
											if (ul.length > 0) {
												li = ul[0].getElementsByTagName("li");
											}
										}
									}
									if (li) {
										i = 0;
										while (i < li.length && li[i].className !== "date") {
											i += 1;
										}
										if (i < li.length) {
											a = li[i].getElementsByTagName("a");
											if (a.length > 1) {
												win = this.open(a[0].href, 'popup', 'width=640,height=480,scrollbars=no,status=no');
												win.onload = function () {
													var select, input;
													select = this.document.getElementById("motif");
													input = this.document.createElement("input");
													input.type = "hidden";
													input.name = select.name;
													input.value = motif;
													select.parentNode.appendChild(input);
													select.parentNode.removeChild(select);
													input.parentNode.parentNode.submit();
												};
											}
										}
									}
									this.close();
								};
								for (i = 0; i < targets.length; i += 1) {
									if (targets[i].checked) {
										pseudo = targets[i].getAttribute("pseudo");
										if (!remind.hasOwnProperty(pseudo)) {
											remind[pseudo] = true;
											link = targets[i].getAttribute("link_alt");
											win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
											win.onload = script;
										}
									}
								}
							}
						}
					}
				}
			});
			this.mother.scripts.add("kick_messages", function massKick(element) {
				var name, targets, i, link, motif_id, motif_bloc, motif, win, pseudo, script, remind;
				if (confirm("Êtes vous sur de vouloir kicker tous les utilisateurs sélectionnés ?")) {
					name = element.getAttribute("target");
					motif_id = element.getAttribute("motif_id");
					if (motif_id) {
						motif_bloc = document.getElementById(motif_id);
						if (motif_bloc) {
							motif = motif_bloc.value;
							if (motif) {
								targets = document.getElementsByName(name);
								script = function () {
									var select, input;
									select = this.document.getElementById("motif");
									input = this.document.createElement("input");
									input.type = "hidden";
									input.name = select.name;
									input.value = motif;
									select.parentNode.appendChild(input);
									select.parentNode.removeChild(select);
									input.parentNode.parentNode.submit();
								};
								remind = {};
								for (i = 0; i < targets.length; i += 1) {
									if (targets[i].checked) {
										pseudo = targets[i].getAttribute("pseudo");
										if (!remind.hasOwnProperty(pseudo)) {
											remind[pseudo] = true;
											link = targets[i].getAttribute("link_kick");
											win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
											win.onload = script;
										}
									}
								}
							}
						}
					}
				}
			});
			this.mother.scripts.add("ban_sujets", function massBan(element) {
				var name, targets, i, link, motif_id, motif_bloc, motif, win, pseudo, remind, script;
				if (confirm("Êtes vous sur de vouloir demander le bannissement de tous les utilisateurs sélectionnés ?")) {
					name = element.getAttribute("target");
					motif_id = element.getAttribute("motif_id");
					if (motif_id) {
						motif_bloc = document.getElementById(motif_id);
						if (motif_bloc) {
							motif = motif_bloc.value;
							if (motif) {
								targets = document.getElementsByName(name);
								remind = {};
								script = function () {
									var url, col, ul, li, i, a, win;
									url = this.location.href.split("#");
									if (url.length > 1) {
										col = this.document.getElementById(url[1]);
										if (col) {
											li = col.getElementsByTagName("li");
										}
									} else {
										col = this.document.getElementById("col1");
										if (col) {
											ul = col.getElementsByTagName("ul");
											if (ul.length > 0) {
												li = ul[0].getElementsByTagName("li");
											}
										}
									}
									if (li) {
										i = 0;
										while (i < li.length && li[i].className !== "date") {
											i += 1;
										}
										if (i < li.length) {
											a = li[i].getElementsByTagName("a");
											if (a.length > 0) {
												win = this.open(a[a.length - 1].href, 'popup', 'width=640,height=480,scrollbars=no,status=no');
												win.onload = function () {
													var select, input;
													select = this.document.getElementById("motif");
													input = this.document.createElement("input");
													input.type = "hidden";
													input.name = select.name;
													input.value = motif;
													select.parentNode.appendChild(input);
													select.parentNode.removeChild(select);
												};
											}
										}
									}
									this.close();
								};
								for (i = 0; i < targets.length; i += 1) {
									if (targets[i].checked) {
										pseudo = targets[i].getAttribute("pseudo");
										if (!remind.hasOwnProperty(pseudo)) {
											remind[pseudo] = true;
											link = targets[i].getAttribute("link_alt");
											win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
											win.onload = script;
										}
									}
								}
							}
						}
					}
				}
			});
			this.mother.scripts.add("ban_messages", function massBan(element) {
				var name, targets, i, link, motif_id, motif_bloc, motif, win, pseudo, script, remind;
				if (confirm("Êtes vous sur de vouloir demander le bannissement de tous les utilisateurs sélectionnés ?")) {
					name = element.getAttribute("target");
					motif_id = element.getAttribute("motif_id");
					if (motif_id) {
						motif_bloc = document.getElementById(motif_id);
						if (motif_bloc) {
							motif = motif_bloc.value;
							if (motif) {
								targets = document.getElementsByName(name);
								script = function () {
									var select, input;
									select = this.document.getElementById("motif");
									input = this.document.createElement("input");
									input.type = "hidden";
									input.name = select.name;
									input.value = motif;
									select.parentNode.appendChild(input);
									select.parentNode.removeChild(select);
								};
								remind = {};
								for (i = 0; i < targets.length; i += 1) {
									if (targets[i].checked) {
										pseudo = targets[i].getAttribute("pseudo");
										if (!remind.hasOwnProperty(pseudo)) {
											remind[pseudo] = true;
											link = targets[i].getAttribute("link_ban");
											win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
											win.onload = script;
										}
									}
								}
							}
						}
					}
				}
			});
			this.mother.scripts.add("lock_sujets", function massLock(element) {
				var name, targets, i, link, win, script;
				if (confirm("Êtes-vous sur de vouloir verrouiller tous les sujets sélectionnés ? \n\n/!\\ ATTENTION : Demander un nombre important de verrouillage en même temps peut causer un important lag et faire que le verrou ne s'applique pas à certains éléments. N'oubliez pas de vérifier que tous les sujets ont bel et bien été verrouillés si des fenêtres pop-up restent actives.")) {
					name = element.getAttribute("target");
					targets = document.getElementsByName(name);
					script = function () {
						var col, table, a, i;
						col = this.document.getElementById("col1");
						table = col.getElementsByTagName("table");
						if (table.length > 2) {
							a = table[2].getElementsByTagName("a");
							i = 0;
							while (i < a.length && a[i].className !== "bloquer") {
								i += 1;
							}
							if (i < a.length) {
								return (this.location.href = a[i].href);
							}
						}
						this.close();
					};
					for (i = 0; i < targets.length; i += 1) {
						if (targets[i].checked) {
							link = targets[i].getAttribute("link_alt");
							win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
							win.onload = script;
						}
					}
				}
			});
			this.mother.scripts.add("unlock_sujets", function massUnlock(element) {
				var name, targets, i, link, win, script;
				if (confirm("Êtes-vous sur de vouloir déverrouiller tous les sujets sélectionnés ? \n\n/!\\ ATTENTION : Demander un nombre important de déverrouillage en même temps peut causer un important lag et faire que la suppression du verrou ne s'applique pas à certains éléments. N'oubliez pas de vérifier que tous les sujets ont bel et bien été verrouillés si des fenêtres pop-up restent actives")) {
					name = element.getAttribute("target");
					targets = document.getElementsByName(name);
					script = function () {
						var col, table, a, i;
						col = this.document.getElementById("col1");
						table = col.getElementsByTagName("table");
						if (table.length > 2) {
							a = table[2].getElementsByTagName("a");
							i = 0;
							while (i < a.length && a[i].className !== "debloquer") {
								i += 1;
							}
							if (i < a.length) {
								return (this.location.href = a[i].href);
							}
						}
						this.close();
					};
					for (i = 0; i < targets.length; i += 1) {
						if (targets[i].checked) {
							link = targets[i].getAttribute("link_alt");
							win = window.open(link, '_blank', 'width=640,height=480,scrollbars=no,status=no');
							win.onload = script;
						}
					}
				}
			});
			this.mother.scripts.add("warning", function warning(element) {
				var key, max, value;
				key = element.getAttribute("key");
				max = parseInt(element.getAttribute("max"), 10);
				if (key) {
					value = saveGet(key);
				}
				if (!value) {
					value = "";
				}
				value = prompt("Avertir à quel niveau ?", value);
				if (value) {
					if (value > 0 && value <= max) {
						saveSet(key, value);
					} else {
						saveDel(key);
					}
				}
			});
			this.mother.scripts.add("masque", function masque(element) {
				var id, target;
				id = element.getAttribute("key");
				if (id) {
					target = document.getElementById(id);
				}
				if (target) {
					target.style.display = (target.style.display === "none") ? "" : "none";
				}
			});
			this.mother.scripts.add("alt_button", function alt_button(element) {
				var alt, key;
				key = ["src", "alt", "title"];
				while (key.length > 0) {
					alt = element.getAttribute("alt_" + key[0]);
					if (alt) {
						element.setAttribute("alt_" + key[0], element.getAttribute(key[0]));
						element.setAttribute(key[0], alt);
					}
					key.shift();
				}
			});
			this.mother.scripts.add("blast_sujets", function blast(element) {
				element.parentNode.parentNode.className = "trinv";
			});
			this.mother.scripts.add("blast_messages", function blast(element) {
				element.parentNode.parentNode.parentNode.className = "msg msg_invisible";
			});
			this.mother.scripts.add("appendSignature", function appendSignature(element) {
				var signId, signBloc, textId, textBloc, sign, text, no;
				textId = element.getAttribute("mess");
				signId = element.getAttribute("sign");
				if (textId && signId) {
					textBloc = document.getElementById(textId);
					signBloc = document.getElementById(signId);
				}
				if (signBloc && textBloc) {
					sign = signBloc.value;
					text = textBloc.value;
					if (text.slice(text.length - sign.length) !== sign) {
						textBloc.value = text + sign;
					}
				}
			});
			this.mother.scripts.add("tracking_kick_system", function tracking_kick_system(element, saveSet) {
				var key, forum, tracking;
				key = element.getAttribute("key");
				forum = element.getAttribute("forum");
				tracking = element.getAttribute("tracking");
				if (key && forum) {
					if (element.checked) {
						if (tracking) {
							if (tracking.length > 0) {
								saveSet(key, true);
								saveSet(key + "_" + forum, tracking);
								return true;
							}
						}
					}
					saveDel(key);
					saveDel(key + "_" + forum);
				}
				return false;
			});
		}
		if (sty) {
			this.mother.styles.add("button", (function () {
				return ".button {" + "\n" +
					"\tcursor:pointer;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("arme", (function () {
				return "." + option("codeName") + "_arme {" + "\n" +
					"\tposition:fixed;" + "\n" +
					"\ttop:22px;" + "\n" +
					"\tright:15px;" + "\n" +
					"\twidth:220px;" + "\n" +
					"\tmargin:2px;" + "\n" +
					"\tpadding:0px;" + "\n" +
					"\tbackground-color:#FF8800;" + "\n" +
					"\tz-index:300;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme h3 {" + "\n" +
					"\ttext-align:center;" + "\n" +
					"\tmargin:1px;" + "\n" +
					"\tpadding:1px;" + "\n" +
					"\theight:18px;" + "\n" +
					"\tcolor:#FFFF00;;" + "\n" +
					"\tbackground:url(\"http://image.jeuxvideo.com/css_img/defaut/bloc1_h3.png\") no-repeat scroll left top transparent;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme ul {" + "\n" +
					"\tbackground:transparent url(\"" + mother.icones.get("cross")[option("baseIcone")] + "\") no-repeat scroll center center;" + "\n" +
					"\tmargin:0px;" + "\n" +
					"\tpadding:2px;" + "\n" +
					"\tlist-style-type:none;" + "\n" +
					"\tlist-style-position:outside;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme li {" + "\n" +
					"\tmargin:0px;" + "\n" +
					"\tpadding:0px;" + "\n" +
					"\tlist-style-type:none;" + "\n" +
					"\tlist-style-position:outside;" + "\n" +
					"\tvertical-align:top;" + "\n" +
					"\tfont-size:x-small;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_title {" + "\n" +
					"\ttext-align:center;" + "\n" +
					"\tfont-style:italic;" + "\n" +
					"\tfont-weight:bold;" + "\n" +
					"\tpadding:3px;" + "\n" +
					"\tcolor:#880000;;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_shooter {" + "\n" +
					"\ttext-align:left;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_link {" + "\n" +
					"\ttext-align:left;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_viseur {" + "\n" +
					"\ttext-align:left;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_small, ." + option("codeName") + "_arme_small select, ." + option("codeName") + "_arme_small option {" + "\n" +
					"\tfont-size:x-small;" + "\n" +
					"\tpadding:1px;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_6" +
					", ." + option("codeName") + "_arme_count_7" +
					", ." + option("codeName") + "_arme_count_8" +
					", ." + option("codeName") + "_arme_count_9" +
					", ." + option("codeName") + "_arme_count_10" + " {" + "\n" +
					"\tcolor:#888888;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_11" +
					", ." + option("codeName") + "_arme_count_12" +
					", ." + option("codeName") + "_arme_count_13" +
					", ." + option("codeName") + "_arme_count_14" +
					", ." + option("codeName") + "_arme_count_15" + " {" + "\n" +
					"\tcolor:#FFFFFF;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_16" +
					", ." + option("codeName") + "_arme_count_17" +
					", ." + option("codeName") + "_arme_count_18" +
					", ." + option("codeName") + "_arme_count_19" +
					", ." + option("codeName") + "_arme_count_20" + " {" + "\n" +
					"\tcolor:#FFFF00;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_21" +
					", ." + option("codeName") + "_arme_count_22" +
					", ." + option("codeName") + "_arme_count_23" +
					", ." + option("codeName") + "_arme_count_24" +
					", ." + option("codeName") + "_arme_count_25" + " {" + "\n" +
					"\tcolor:#0000FF;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_2" +
					", ." + option("codeName") + "_arme_count_7" +
					", ." + option("codeName") + "_arme_count_12" +
					", ." + option("codeName") + "_arme_count_17" +
					", ." + option("codeName") + "_arme_count_22" + " {" + "\n" +
					"\ttext-decoration:underline;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_3" +
					", ." + option("codeName") + "_arme_count_8" +
					", ." + option("codeName") + "_arme_count_13" +
					", ." + option("codeName") + "_arme_count_18" +
					", ." + option("codeName") + "_arme_count_23" + " {" + "\n" +
					"\ttext-decoration:underline overline;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_4" +
					", ." + option("codeName") + "_arme_count_9" +
					", ." + option("codeName") + "_arme_count_14" +
					", ." + option("codeName") + "_arme_count_19" +
					", ." + option("codeName") + "_arme_count_24" + " {" + "\n" +
					"\ttext-decoration:underline overline;" + "\n" +
					"\tfont-style:italic;" + "\n" +
					"}" + "\n" +
					"." + option("codeName") + "_arme_count_5" +
					", ." + option("codeName") + "_arme_count_10" +
					", ." + option("codeName") + "_arme_count_15" +
					", ." + option("codeName") + "_arme_count_20" +
					", ." + option("codeName") + "_arme_count_25" + " {" + "\n" +
					"\ttext-decoration:underline overline;" + "\n" +
					"\tfont-weight:bold;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("warn_sujets", (function () {
				return ".tr_warn1 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #0000FF;" + "\n" +
					"}" + "\n" +
					".tr_warn2 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #0088FF;" + "\n" +
					"}" + "\n" +
					".tr_warn3 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #00FFFF;" + "\n" +
					"}" + "\n" +
					".tr_warn4 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #00FF88;" + "\n" +
					"}" + "\n" +
					".tr_warn5 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #00FF00;" + "\n" +
					"}" + "\n" +
					".tr_warn6 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #88FF00;" + "\n" +
					"}" + "\n" +
					".tr_warn7 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #FFFF00;" + "\n" +
					"}" + "\n" +
					".tr_warn8 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #FF8800;" + "\n" +
					"}" + "\n" +
					".tr_warn9 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #FF0000;" + "\n" +
					"}" + "\n" +
					".tr_warn10 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #FF0088;" + "\n" +
					"}" + "\n" +
					".tr_warn11 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #FF00FF;" + "\n" +
					"}" + "\n" +
					".tr_warn12 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #8800FF;" + "\n" +
					"}" + "\n" +
					".tr_warn13 {" + "\n" +
					"\tbackground: none repeat scroll 0 0 #222222;" + "\n" +
					"\tcolor: #997777;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("warn_messages", (function () {
				return ".msg_warn1 {" + "\n" +
					"\tbackground-color: #0000FF;" + "\n" +
					"\tborder: 1px solid #000088;" + "\n" +
					"}" + "\n" +
					".msg_warn2 {" + "\n" +
					"\tbackground-color: #0088FF;" + "\n" +
					"\tborder: 1px solid #004488;" + "\n" +
					"}" + "\n" +
					".msg_warn3 {" + "\n" +
					"\tbackground-color: #00FFFF;" + "\n" +
					"\tborder: 1px solid #008888;" + "\n" +
					"}" + "\n" +
					".msg_warn4 {" + "\n" +
					"\tbackground-color: #00FF88;" + "\n" +
					"\tborder: 1px solid #008844;" + "\n" +
					"}" + "\n" +
					".msg_warn5 {" + "\n" +
					"\tbackground-color: #00FF00;" + "\n" +
					"\tborder: 1px solid #008800;" + "\n" +
					"}" + "\n" +
					".msg_warn6 {" + "\n" +
					"\tbackground-color: #88FF00;" + "\n" +
					"\tborder: 1px solid #448800;" + "\n" +
					"}" + "\n" +
					".msg_warn7 {" + "\n" +
					"\tbackground-color: #FFFF00;" + "\n" +
					"\tborder: 1px solid #888800;" + "\n" +
					"}" + "\n" +
					".msg_warn8 {" + "\n" +
					"\tbackground-color: #FF8800;" + "\n" +
					"\tborder: 1px solid #884400;" + "\n" +
					"}" + "\n" +
					".msg_warn9 {" + "\n" +
					"\tbackground-color: #FF0000;" + "\n" +
					"\tborder: 1px solid #880000;" + "\n" +
					"}" + "\n" +
					".msg_warn10 {" + "\n" +
					"\tbackground-color: #FF0088;" + "\n" +
					"\tborder: 1px solid #880044;" + "\n" +
					"}" + "\n" +
					".msg_warn11 {" + "\n" +
					"\tbackground-color: #FF00FF;" + "\n" +
					"\tborder: 1px solid #880088;" + "\n" +
					"}" + "\n" +
					".msg_warn12 {" + "\n" +
					"\tbackground-color: #8800FF;" + "\n" +
					"\tborder: 1px solid #440088;" + "\n" +
					"}" + "\n" +
					".msg_warn13 {" + "\n" +
					"\tbackground-color: #222222;" + "\n" +
					"\tborder: 1px solid #111111;" + "\n" +
					"\tcolor: #997777;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("ancre", (function () {
				return ".msg_ancre {" + "\n" +
					"\tbackground-color:#F0C0C0;" + "\n" +
					"\tborder-width:3px;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("censured", (function () {
				return ".msg_censured .post {" + "\n" +
					"\tbackground-color:#888888;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("signature", (function () {
				return ".signature {" + "\n" +
					"\tdisplay:none;" + "\n" +
					"}";
			}()));
			this.mother.styles.add("profilSujet", (function () {
				return "." + mother.name("profilSujet") + " {" + "\n" +
					"\tfont-size:90% !important;" + "\n" +
					"\ttext-align:center !important;" + "\n" +
					"\tfont-weight:normal !important;" + "\n" +
					"}" + "\n" +
					
					".pseudo ." + mother.name("profilSujet") + " {" + "\n" +
					"\tcolor:#000000 !important;" + "\n" +
					"}" + "\n" +
					".pseudo ." + mother.name("profilSujet") + ":visited {" + "\n" +
					"\tcolor:#444444 !important;" + "\n" +
					"}" + "\n" +
					".pseudo ." + mother.name("profilSujet") + ":hover {" + "\n" +
					"\tcolor:#FF5500 !important;" + "\n" +
					"}" + "\n" +
					
					".topic_mod ." + mother.name("profilSujet") + " {" + "\n" +
					"\tcolor:#DD0000 !important;" + "\n" +
					"}" + "\n" +
					".topic_mod ." + mother.name("profilSujet") + ":visited {" + "\n" +
					"\tcolor:#883300 !important;" + "\n" +
					"}" + "\n" +
					".topic_mod ." + mother.name("profilSujet") + ":hover {" + "\n" +
					"\tcolor:#0055FF !important;" + "\n" +
					"}";
			}()));
		}
		this.script("save-local");
		this.script("load-local");
		this.script("delete-local");
		return;
	};
	shar.generateStandard.name = function name(type, that) {
		return this.mother.name("standard") + "_" + type + "_" + that.toString();
	};
	shar.generateStandard.script = function generateScript(id) {
		var key, script, fun;
		key = this.name("script", id);
		script = document.getElementById(key);
		if (script === null) {
			fun = this.mother.scripts.get(id);
			if (fun) {
				if (!this.mother.head) {
					this.mother.head = document.getElementsByTagName("head")[0];
				}
				script = this.mother.create.script(fun);
				script.id = key;
				this.mother.head.appendChild(script);
			}
		}
		return script;
	};
	shar.generateStandard.style = function generateStyle(id) {
		var key, style, fun;
		key = this.name("style", id);
		style = document.getElementById(key);
		if (style === null) {
			fun = this.mother.styles.get(id);
			if (fun) {
				if (!this.mother.head) {
					this.mother.head = document.getElementsByTagName("head")[0];
				}
				style = this.mother.create.style(fun);
				style.id = key;
				this.mother.head.appendChild(style);
			}
		}
		return style;
	};

	shar.falseLoc = function falseLoc(url) {
		if (url.protocol.toLowerCase() === "file:///" || url.hostname === "127.0.0.1" || url.hostname.toLowerCase() === "localhost") {
			this.onLocalSettings = true;
		}
		if (url.hostname === "127.0.0.1" && url.path.length > 1 && url.path[0].toLowerCase() === "fakeweb") {
			url.path.shift();
			url.hostname = url.path.shift();
			url.local = true;
			url.alter();
		}
		return url;
	};

	shar.sandBox = function sandBox(loc) {
		var li, input, arme, fun, i, j;
		this.body.innerHTML = "";

		arme = this.mother.arme;
		arme.init(this, this, this, loc, "Sandbox");

		arme.title("Général");
		arme.shooter("Shoot", "redS", "shoot");
		arme.title("Test");

		fun = function createSandBox(name, create, body) {
			li = create.element("li");
			body.appendChild(li);
			li.appendChild(create.text(name));
			input = create.input("checkbox", arme.key);
			li.appendChild(input);
			input.setAttribute("link", location.href + name);
			arme.aim(name, "nom", name.toLowerCase(), true, false, input);
		};
		for (i = 0; i < 25; i += 1) {
			for (j = 0; j < i + 1; j += 1) {
				fun("Toto_" + i, this.create, this.body);
			}
		}
	};

	shar.selectMotif = function selectMotif(loc, id) {
		var select, option, motifs;
		if (loc.type === "forums" || loc.type === "commentaires") {
			motifs = ["", "Flood", "Piratage", "Insulte", "Racisme / Incitation à la haine", "Lien pornographique ou choquant", "Lien de parrainage et/ou pub abusive", "Hors-sujet", "Spoiler", "Profil", "Autre"];
		} else {
			motifs = [""];
		}
		select = this.create.element("select");
		select.id = id;
		while (motifs.length > 0) {
			option = this.create.element("option");
			option.value = motifs[0];
			option.appendChild(this.create.text(motifs[0]));
			select.appendChild(option);
			motifs.shift();
		}
		return select;
	};

	shar.kick_user = {};
	shar.kick_user.init = function init(mother, loc) {
		var col, tbody, tr, i, table, div;
		this.mother = mother;
		col = this.parseColumns();
		table = document.getElementsByTagName("table")[0];
		if (table) {
			div = this.mother.create.element("div");
			div.className = "centrer";
			table.parentNode.insertBefore(div, table);
		}
		tbody = document.getElementsByTagName("tbody")[0];
		if (tbody) {
			if (option("search_in_kick_list")) {
				this.search(div, loc);
			}
			this.listing = [];
			tr = tbody.getElementsByTagName("tr");
			for (i = 0; i < tr.length; i += 1) {
				this.execute(tr[i], col);
			}
			if (div && option("track_kick")) {
				this.track(div, loc);
			}
		}
	};
	shar.kick_user.track = function track(div, loc) {
		var key, li, input, scriptId, saveSet;
		key = this.mother.name("tracking_kick_system");
		li = this.mother.create.element("li");
		div.appendChild(li);
		input = this.mother.create.input("checkbox", "", "");
		li.appendChild(input);
		li.appendChild(this.mother.create.text(" Traquer les pseudos kickés (mise en valeur + visée automatique)"));
		input.checked = this.mother.system.save.get(key);
		input.setAttribute("key", key);
		input.setAttribute("forum", loc.url.search.forum);
		input.setAttribute("tracking", this.listing.join(",").toLowerCase());
		scriptId = "tracking_kick_system";
		this.mother.generateStandard.script(scriptId);
		input.setAttribute("onclick", this.mother.scripts.get(scriptId).name + "(this, saveSet);");
		(this.mother.scripts.get(scriptId))(input, this.mother.scripts.get("save-local"));
	};
	shar.kick_user.search = function search(div, loc) {
		var li, input, button;
		li = this.mother.create.element("li");
		div.appendChild(li);
		input = this.mother.create.input("text", "", "");
		input.id = this.mother.name("search_tracked");
		li.appendChild(input);
		button = this.mother.create.input("button", "", "Rechercher le pseudo indiqué");
		button.setAttribute("target", input.id);
		button.setAttribute("onclick", "location.href = location.href.split(\"#\")[0] + \"#\" + document.getElementById(this.getAttribute(\"target\")).value.toLowerCase();");
		li.appendChild(button);

	};
	shar.kick_user.parseColumns = function parseColumns() {
		var thead, th, i, ans;
		ans = {};
		thead = document.getElementsByTagName("thead")[0];
		if (thead) {
			th = thead.getElementsByTagName("th");
			for (i = 0; i < th.length; i += 1) {
				if (th[i].className) {
					ans[th[i].className] = i;
				}
			}
		}
		return ans;
	};
	shar.kick_user.parse = function parse(key, data) {
		var value, temp;
		if (data) {
			if (!data.hasOwnProperty(key)) {
				switch (key) {
				case "pseudo":
					if (this.parse("nick", data)) {
						temp = this.parse("nick", data).childNodes[0];
						if (temp && temp.nodeType === 3) {
							value = temp.nodeValue;
						}
					}
					break;
				default:
					value = undefined;
					break;
				}
				data[key] = value;
			}
			return data[key];
		}
	};
	shar.kick_user.execute = function execute(tr, col) {
		var data, key, td;
		td = tr.getElementsByTagName("td");
		data = {};
		for (key in col) {
			if (col.hasOwnProperty(key)) {
				data[key] = td[col[key]];
			}
		}
		if (this.parse("pseudo", data)) {
			this.pseudo(data);
		}
		if (this.parse("pseudo", data) && option("search_in_kick_list")) {
			tr.id = this.parse("pseudo", data).toLowerCase();
		}
	};
	shar.kick_user.pseudo = function pseudo(data) {
		var td, a, psd;
		td = this.parse("nick", data);
		psd = this.parse("pseudo", data);
		a = this.mother.create.link("http://www.jeuxvideo.com/profil/" + psd + ".html", td.childNodes[0]);
		td.appendChild(a);
		a.target = "profil";
		a.title = "Voir le profil de " + psd;
		this.listing.push(psd.toLowerCase());
	};

	shar.commentaires = {};
	shar.commentaires.init = function init(mother, loc) {
		var commentaires, comments, i, formulaire;
		this.mother = mother;
		this.type = "commentaires";
		this.statique(loc);
		commentaires = document.getElementById("commentaires");
		if (commentaires !== null) {
			this.mother.messages.init(this.mother, this, this, loc);
			comments = commentaires.getElementsByTagName("ul");
			for (i = 0; i < comments.length; i += 1) {
				this.mother.messages.execute(i, comments[i], loc);
			}
			this.reminder(loc, comments[comments.length - 1]);
		}
		formulaire = document.getElementById("post");
		if (formulaire !== null) {
			this.mother.formulaire.init(this.mother, this, this, loc, formulaire);
		}
	};
	shar.commentaires.statique = function statique(loc) {
		var bloc, inner;
		if (loc.mode === 9) {
			bloc = document.getElementById("vdo_comment");
			if (bloc) {
				inner = bloc.innerHTML;
				bloc.innerHTML = inner;
			}
		}
	};
	shar.commentaires.reminder = function reminder(loc, ul) {

	};

	shar.forums = {};
	shar.forums.init = function init(mother, loc) {
		var child;
		this.type = "forums";
		child = this[loc.mode];
		if (child !== undefined) {
			this.mother = mother;
			child.init(mother, this, loc);
		}
	};
	shar.forums.returnToFirstIndex = function returnToFirstIndex() {
		var i, listeSujet, a, link;
		listeSujet = document.getElementsByClassName("liste");
		for (i = 0; i < listeSujet.length; i += 1) {
			a = listeSujet[i].getElementsByTagName("a");
			if (a.length > 0) {
				link = where(new Url(a[0].href));
				if (link.jvc && link.type === "forums") {
					link.mode = 0;
					link.rewrite();
					a[0].href = link.url;
				}
			}
		}
	};

	shar.arme = {};
	shar.arme.toString = function toString() {
		return "arme";
	};
	shar.arme.init = function init(mother, forums, mode, loc, titre) {
		this.mother = mother;
		this.forums = forums;
		this.mode = mode;
		this.key = mother.name("arme");
		this.titre = titre;
	};
	shar.arme.name = function name(that) {
		return this.key + "_" + that.toString();
	};
	shar.arme.createBloc = function createBloc() {
		var div, h3, ul, id;
		id = this.key;
		ul = document.getElementById(id);
		if (ul === null) {
			this.mother.generateStandard.style("arme");
			this.mother.generateStandard.script("displayer");
			div = this.mother.create.element("div");
			this.mother.body.appendChild(div);
			div.className = this.key;
			h3 = this.mother.create.element("h3");
			div.appendChild(h3);
			h3.appendChild(this.mother.create.text(this.titre));
			ul = this.mother.create.element("ul");
			div.appendChild(ul);
			ul.id = id;
			ul.style.display = "none";

			div.setAttribute("display_target", id);
			div.setAttribute("onmouseout", "displayer(this, false);");
			div.setAttribute("onmouseover", "displayer(this, true);");
		}
		return ul;
	};
	shar.arme.createLine = function createLine(className) {
		var bloc, li;
		li = this.mother.create.element("li");
		if (className) {
			li.className = this.name(className);
		}
		bloc = this.createBloc();
		bloc.appendChild(li);
		return li;
	};
	shar.arme.aim = function aim(titre, key, value, count, def, viseur) {
		var id, li, input, span, aimed;
		id = this.name(key + "_" + value);
		input = document.getElementById(id);
		if (input === null) {
			li = this.createLine("viseur");
			input = this.mother.create.input("checkbox");
			input.setAttribute("key", key);
			input.setAttribute("val", value);
			input.setAttribute("target", this.key);
			if (def) {
				input.checked = def;
			}
			if (viseur) {
				aimed = viseur.checked;
				viseur.setAttribute(key, value);
				viseur.name = this.key;
				viseur.checked = (aimed || input.checked);
			}
			this.mother.generateStandard.script("armeAim");
			input.setAttribute("onclick", "armeAim(this);");
			input.id = id;
			li.appendChild(input);
			li.appendChild(this.mother.create.text(" : " + titre));
			if (count) {
				li.appendChild(this.mother.create.text(" ("));
				span = this.mother.create.element("span");
				span.appendChild(this.mother.create.text((viseur) ? "1" : "0"));
				li.appendChild(span);
				li.appendChild(this.mother.create.text(")"));
			}
		} else {
			if (count) {
				span = input.parentNode.getElementsByTagName("span");
				if (span.length > 0 && span[0].childNodes.length > 0) {
					li = span[0].childNodes[0];
					li.nodeValue = parseInt(li.nodeValue, 10) + 1;
					span[0].className = this.name("count_" + li.nodeValue);
				}
			}
			if (viseur) {
				aimed = viseur.checked;
				viseur.setAttribute(key, value);
				viseur.name = this.key;
				viseur.checked = (aimed || input.checked);
			}
		}
		return input;
	};
	shar.arme.shooter = function shooter(action, icone, scriptId) {
		var id, li, input;
		id = this.name("_shooter_" + scriptId);
		input = document.getElementById(id);
		if (input === null) {
			li = this.createLine("shooter");
			input = this.mother.create.icone(this.mother.icones.get(icone));
			this.mother.generateStandard.style("button");
			input.className = "button";
			li.appendChild(input);
			input.id = id;
			li.appendChild(this.mother.create.text(" : " + action));
			this.mother.generateStandard.script(scriptId);
			input.setAttribute("onclick", this.mother.scripts.get(scriptId).name + "(this);");
			input.setAttribute("target", this.key);
		}
		return input;
	};
	shar.arme.title = function title(titre) {
		var li;
		li = this.createLine("title");
		li.appendChild(this.mother.create.text(titre));
		return li.childNodes[0];
	};
	shar.arme.link = function title(href, titre) {
		var li, a;
		if (titre === undefined) {
			titre = href;
		}
		li = this.createLine("link");
		a = this.mother.create.link(href, this.mother.create.text(titre));
		a.target = "arme";
		li.appendChild(a);
		return li;
	};

	shar.forums[0] = {};
	shar.forums[0].init = function init(mother, forums, loc) {
		var table, sujets, formulaire, i;
		this.mother = mother;
		this.forums = forums;
		table = document.getElementById("liste_topics");
		if (table !== null) {
			sujets = table.getElementsByTagName("tr");
			if (sujets.length > 1) {
				this.mother.sujets.init(this.mother, this.forums, this, loc, sujets[0]);
				for (i = 1; i < sujets.length; i += 1) {
					this.mother.sujets.execute(i, sujets[i], loc);
				}
			}
		}
		if (loc.search === 0) {
			formulaire = document.getElementById("post");
			if (formulaire !== null) {
				this.mother.formulaire.init(this.mother, this.forums, this, loc, formulaire);
			}
		}
	};

	shar.forums[1] = {};
	shar.forums[1].init = function init(mother, forums, loc) {
		var col, mess, i, test;
		this.mother = mother;
		this.forums = forums;
		col = document.getElementById("col1");
		if (col) {
			this.mother.messages.init(this.mother, this.forums, this, loc);
			mess = col.getElementsByTagName("ul");
			for (i = 0; i < mess.length; i += 1) {
				test = new Reg("^message_([0-9]+)$").exec(mess[i].parentNode.id);
				if (test) {
					this.mother.messages.execute(i, mess[i], loc, test[1], mess.length - 1);
				}
				if (option("returnToFirstIndex")) {
					this.forums.returnToFirstIndex();
				}
			}
		}
		this.resetData();
	};
	shar.forums[1].resetData = function resetData() {
		var revenir, i, img;
		revenir = document.getElementsByClassName("revenir");
		this.mother.generateStandard.style("button");
		img = this.mother.create.icone(this.mother.icones.get("retour"));
		img.setAttribute("onclick", "if (confirm(\"Êtes-vous sûrs de vouloir vider la mémoire ?\")) localStorage.clear();");
		img.className = "button";
		for (i = 0; i < revenir.length; i += 1) {
			revenir[i].appendChild(img.cloneNode(true));
		}
	};

	shar.forums[3] = {};
	shar.forums[3].init = function init(mother, forums, loc) {
		var col, mess, i, formulaire, test;
		this.mother = mother;
		this.forums = forums;
		col = document.getElementById("col1");
		if (col) {
			this.mother.messages.init(this.mother, this.forums, this, loc);
			mess = col.getElementsByTagName("ul");
			for (i = 0; i < mess.length; i += 1) {
				test = new Reg("^message_([0-9]+)$").exec(mess[i].parentNode.id);
				if (test) {
					this.mother.messages.execute(i, mess[i], loc, test[1], mess.length - 1);
				}
				if (option("returnToFirstIndex")) {
					this.forums.returnToFirstIndex();
				}
			}
			formulaire = document.getElementById("post");
			if (formulaire !== null) {
				this.mother.formulaire.init(this.mother, this.forums, this, loc, formulaire);
			}
		}
	};

	shar.sujets = {};
	shar.sujets.init = function init(mother, forums, mode, loc, columnsLine) {
		this.mother = mother;
		this.forums = forums;
		this.mode = mode;
		this.columns = this.parseColumns(columnsLine);
		this.executeColumns(columnsLine, loc);
	};
	shar.sujets.parseColumns = function parse(columnsLine) {
		var columns, data, i;
		data = {};
		columns = columnsLine.getElementsByTagName("th");
		for (i = 0; i < columns.length; i += 1) {
			if (columns[i].className === "col_moder") {
				data.mod = i;
			} else {
				switch (columns[i].id) {
				case "c1":
					data.icone = i;
					break;
				case "c2":
					data.sujet = i;
					break;
				case "c3":
					data.auteur = i;
					break;
				case "c4":
					data.messages = i;
					break;
				case "c5":
					data.date = i;
					break;
				}
			}
		}
		return data;
	};
	shar.sujets.executeColumns = function executeColumns(columnsLine, loc) {
		var parts, data, th, input, url, locData, li, key, id, button;
		parts = columnsLine.getElementsByTagName("th");
		data = {};
		for (key in this.columns) {
			if (this.columns.hasOwnProperty(key)) {
				data[key] = parts[this.columns[key]];
			}
		}
		if (data.mod && option("arme")) {
			th = this.mother.create.element("th");
			input = this.mother.create.input("checkbox");
			columnsLine.insertBefore(th, data.icone);
			this.mother.arme.init(this.mother, this.forums, this, loc, "Arme - Viseur");
			this.mother.arme.title(" ");
			this.mother.arme.title("Général");
			if (option("arme_links")) {
				url = new Url();
				url.alterIn(loc.url);
				locData = where(url);
				locData.mode = 0;
				locData.forum = 103;
				locData.page = 1;
				locData.index = 1;
				locData.name = "0";
				locData.rewrite();
				li = this.mother.arme.link(locData.url, " Forum des modérateurs");
				li.insertBefore(this.mother.create.icone(this.mother.icones.get("cssPagesuiv")), li.firstChild);
				url.path = ["cgi-bin", "jvforums", "kick_user.cgi"];
				url.search.forum = loc.forum;
				url.alter();
				li = this.mother.arme.link(url, " Liste des kicks");
				li.insertBefore(this.mother.create.icone(this.mother.icones.get("cssPagesuiv")), li.firstChild);
				this.mother.arme.title(" ");
			}
			th.appendChild(this.mother.arme.aim("All", "type", "checkbox", false, false, input).cloneNode(true));
			data.mod.innerHTML = "";
			data.mod.appendChild(this.mother.arme.shooter("Shoot", "redS", "shoot").cloneNode(true));
			if (option("warning")) {
				button = this.mother.arme.shooter("Avertir tous", "redA", "massWarn");
				key = this.mother.name("@.warnlevel");
				button.setAttribute("key", key);
				button.setAttribute("max", option("warning-max"));
			}
			this.mother.arme.title(" ");
			if (loc.search === 4) {
				this.mother.arme.aim("Sujets", "mess", "sujet", true, false);
				this.mother.arme.aim("Messages", "mess", "message", true, false);
				this.mother.arme.title(" ");
			} else {
				this.mother.arme.aim("Sujets", "mess", "sujet", true, false).parentNode.style.display = "none";
			}
			if (option("arme_allowKick")) {
				li = this.mother.arme.createLine("small");
				id = this.mother.arme.name("select");
				li.appendChild(this.mother.selectMotif(loc, id));
				this.mother.arme.shooter("Kick", "greenX", "kick_sujets").setAttribute("motif_id", id);
				this.mother.arme.title(" ");
			}
			if (option("arme_allowLock")) {
				this.mother.arme.shooter("Lock", "topic_cadenas", "lock_sujets");
				this.mother.arme.shooter("Unlock", "topic_dossier1", "unlock_sujets");
			}
			this.mother.arme.title("Pseudos");
		}
	};
	shar.sujets.get = function parse(key, data, i, line) {
		var value, temp;
		if (!data.hasOwnProperty(key)) {
			value = null;
			switch (key) {
			case "alive":
				temp = this.get("line", data, i, line);
				if (temp) {
					value = (new Reg("trinv").exec(temp.className)) === null;
				}
				break;
			case "ico":
				temp = this.get("icone", data, i, line);
				if (temp) {
					temp = temp.getElementsByTagName("img");
					if (temp.length > 0) {
						value = temp[0];
					}
				}
				break;
			case "icone_url":
				temp = this.get("ico", data, i, line);
				if (temp) {
					value = new Url(temp.src);
				}
				break;
			case "lien_mod":
				temp = this.get("mod", data, i, line);
				if (temp) {
					temp = temp.getElementsByTagName("a");
					if (temp.length > 0) {
						value = temp[0];
					}
				}
				break;
			case "lien_mod_url":
				temp = this.get("lien_mod", data, i, line);
				if (temp) {
					value = new Url(temp.href);
				}
				break;
			case "lien":
				temp = this.get("sujet", data, i, line);
				if (temp) {
					temp = temp.getElementsByTagName("a");
					if (temp.length > 0) {
						value = temp[0];
					}
				}
				break;
			case "lien_url":
				temp = this.get("lien", data, i, line);
				if (temp) {
					value = new Url(temp.href);
				}
				break;
			case "titre":
				temp = this.get("lien", data, i, line);
				if (temp) {
					value = temp.childNodes[0].nodeValue;
				}
				break;
			case "isMod":
				temp = this.get("auteur", data, i, line);
				if (temp) {
					value = (new Reg("topic_mod").exec(temp.className)) !== null;
				}
				break;
			case "pseudo":
				temp = this.get("auteur", data, i, line);
				if (temp) {
					value = temp.childNodes[0].nodeValue;
				}
				break;
			case "nb":
				temp = this.get("messages", data, i, line);
				if (temp) {
					value = parseInt(temp.childNodes[0].nodeValue, 10);
				}
				break;
			case "last":
				temp = this.get("date", data, i, line);
				if (temp) {
					value = temp.childNodes[0].nodeValue;
				}
				break;
			default:
				break;
			}
			data[key] = value;
		}
		return data[key];
	};
	shar.sujets.execute = function parse(i, line, loc) {
		var parts, data, key, warn;
		parts = line.getElementsByTagName("td");
		data = {};
		data.line = line;
		for (key in this.columns) {
			if (this.columns.hasOwnProperty(key)) {
				data[key] = parts[this.columns[key]];
			}
		}
		warn = 0;
		if (option("blast") && this.get("alive", data, i, line) && this.get("lien_mod", data, i, line)) {
			this.blast(data, i, line, loc);
		}
		if (this.get("alive", data, i, line) && option("warning")) {
			warn += this.warning(i, line, data, loc);
		}
		if (option("profilSujet")) {
			this.profilSujet(i, line, data);
		}
		if (option("lastPage")) {
			this.lastPage(i, line, data);
		}
		if (data.mod && option("arme")) {
			line.insertBefore(this.arme(warn, i, line, data), data.icone);
		}
		if (option("epingle")) {
			this.epingle(data, i, line, loc);
		}
	};
	shar.sujets.arme = function arme(warn, i, line, data) {
		var pseudo, td, input, link, li, key, button;
		td = this.mother.create.element("td");
		input = this.mother.create.input("checkbox");
		td.appendChild(input);
		pseudo = this.get("pseudo", data, i, line);
		if (pseudo && this.get("alive", data, i, line) && (option("arme_viseModo") || !this.get("isMod", data, i, line))) {
			link = this.get("lien_mod_url", data, i, line);
			if (link) {
				input.setAttribute("link", link);
			}
			input.setAttribute("link_alt", this.get("lien_url", data, i, line));
			li = this.mother.arme.aim(pseudo, "pseudo", pseudo.toLowerCase(), true, warn > option("warning-limit"), input);
			this.mother.arme.aim("All", "type", "checkbox", false, false, input);
			if (this.get("ico", data, i, line)) {
				this.mother.arme.aim("Sujets", "mess", "sujet", true, false, input);
			} else {
				this.mother.arme.aim("Messages", "mess", "message", true, false, input);
			}

			if (option("warning") && li.parentNode.getElementsByTagName("img").length === 0) {
				key = this.mother.name(pseudo.toLowerCase() + ".warnlevel");
				this.mother.generateStandard.style("button");
				button = this.mother.create.icone(this.mother.icones.get("redA"));
				button.className = "button";
				button.setAttribute("key", key);
				button.setAttribute("max", option("warning-max"));
				this.mother.generateStandard.script("warning");
				button.setAttribute("onclick", this.mother.scripts.get("warning").name + "(this);");
				li.parentNode.insertBefore(button, li.nextSibling);
				li.parentNode.insertBefore(this.mother.create.text(" "), li.nextSibling);
			}
		} else {
			input.disabled = true;
		}
		return td;
	};
	shar.sujets.lastPage = function lastPage(i, line, data) {
		var ico, a, nb, url, locData, link;
		ico = this.get("ico", data, i, line);
		link = this.get("lien", data, i, line);
		nb = this.get("nb", data, i, line);
		if (ico && link && nb !== null) {
			url = new Url(link.href);
			locData = where(url);
			if (locData.type === "forums") {
				locData.page = Math.floor(nb / 20) + 1;
				locData.rewrite();
				a = ico.parentNode;
				a.appendChild(this.mother.create.link(locData.url, ico));
			}
		}
	};
	shar.sujets.warning = function warning(i, line, data, loc) {
		var warn, pseudo, key, tracker, j;
		warn = 0;
		pseudo = this.get("pseudo", data, i, line);
		if (pseudo) {
			key = this.mother.name(pseudo.toLowerCase() + ".warnlevel");
			warn = this.mother.system.save.get(key);
			if (!warn) {
				warn = 0;
			}
			if (option("track_kick") && warn === 0) {
				if (this.mother.system.save.get(this.mother.name("tracking_kick_system"))) {
					tracker = this.mother.system.save.get(this.mother.name("tracking_kick_system_" + loc.forum));
				} else {
					this.mother.system.save.del(this.mother.name("tracking_kick_system_" + loc.forum));
				}
				if (tracker) {
					tracker = tracker.split(",");
					for (j = 0; warn === 0 && j < tracker.length; j += 1) {
						if (pseudo.toLowerCase() === tracker[j]) {
							warn = option("warning-max") + 1;
						}
					}
				}
			}
			if (warn > 0) {
				this.mother.generateStandard.style("warn_sujets");
				line.className = "tr_warn" + warn;
			}
		}
		return warn;
	};
	shar.sujets.blast = function blast(data, i, line, loc) {
		var tmp;
		this.mother.generateStandard.script("blast_sujets");
		tmp = this.get("mod", data, i, line).getAttribute("onclick");
		if (!tmp) {
			tmp = "";
		}
		this.get("lien_mod", data, i, line).setAttribute("onclick", "if (confirmation('')) { blast(this); } else { return false; }");
	};
	shar.sujets.epingle = function epingle(data, i, line, loc) {
		var target, ico, key, date, nb, reg, log;
		ico = this.get("icone_url", data, i, line);
		date = this.get("last", data, i, line);
		nb = this.get("nb", data, i, line);
		if (ico !== null && date !== null && nb !== null) {
			ico = ico.path[ico.path.length - 1];
			if (ico === "topic_marque_on.gif" || ico === "topic_marque_off.gif") {
				target = this.get("lien_url", data, i, line);
				if (target !== null) {
					target = where(target);
					key = this.mother.name("epingle:" + target.forum + "#" + target.topic);
					reg = new Reg("([0-9]+)/([0-9]+)/([0-9]+) ([0-9]+)h([0-9]+)").exec(date);
					if (reg !== null) {
						date = parseInt(reg[3] + reg[2] + reg[1] + reg[4] + reg[5], 10);
						log = this.mother.system.save.get(key);
						if (log) {
							log = log.split("#");
							if (log.length === 2) {
								log[0] = parseInt(log[0], 10);
								log[1] = parseInt(log[1], 10);
								if (nb > log[0] || date > log[1]) {
									if (ico === "topic_marque_on.gif") {
										this.get("ico", data, i, line).src = this.mother.icones.get("bluePin")[option("baseIcone")];
									} else {
										this.get("ico", data, i, line).src = this.mother.icones.get("yellowPin")[option("baseIcone")];
									}
								}
							}
						} else {
							this.mother.system.save.set(key, nb + "#" + date);
						}
					}
				}
			}
		}

	};
	shar.sujets.profilSujet = function profilSujet(i, line, data) {
		var auteur, pseudo, link;
		auteur = this.get("auteur", data, i, line);
		pseudo = this.get("pseudo", data, i, line);
		if (auteur && pseudo) {
			link = this.mother.create.link("http://www.jeuxvideo.com/profil/" + pseudo + ".html", this.mother.create.text(pseudo));
			this.mother.generateStandard.style("profilSujet");
			link.className = this.mother.name("profilSujet");
			auteur.innerHTML = "";
			auteur.appendChild(link);
		}
	};
	
	shar.messages = {};
	shar.messages.init = function init(mother, forums, mode, loc) {
		this.mother = mother;
		this.forums = forums;
		this.mode = mode;
	};
	shar.messages.get = function get(key, data, i, ul) {
		var temp, value;
		if (!data.hasOwnProperty(key)) {
			value = null;
			switch (key) {
			case "alive":
				temp = this.get("ul", data, i, ul);
				if (temp) {
					value = (new Reg("msg_invisible").exec(temp.parentNode.className)) === null;
				}
				break;
			case "mod":
			case "profil":
				temp = this.get("pseudo", data, i, ul);
				if (temp) {
					temp = temp.getElementsByTagName("a");
					data.profil = temp[temp.length - 1];
					data.mod = (temp.length > 1) ? temp[0] : undefined;
					value = data[key];
				}
				break;
			case "url_mod":
				temp = this.get("mod", data, i, ul);
				if (temp) {
					value = new Url(temp.href);
				}
				break;
			case "strong":
				temp = this.get("pseudo", data, i, ul);
				if (temp) {
					temp = temp.getElementsByTagName("strong");
					if (temp.length > 0) {
						value = temp[0];
					}
				}
				break;
			case "psd":
				temp = this.get("strong", data, i, ul);
				if (temp) {
					value = temp.childNodes[0].nodeValue;
				}
				break;
			case "isMod":
				temp = this.get("strong", data, i, ul);
				if (temp) {
					value = (new Reg("moderateur").exec(temp.className)) !== null;
				}
				break;
			case "kick":
			case "alert":
				temp = this.get("date", data, i, ul);
				if (temp) {
					temp = temp.getElementsByTagName("a");
					data.alert = temp[temp.length - 1];
					data.kick = (temp.length > 1) ? temp[0] : undefined;
					value = data[key];
				}
				break;
			case "kick_url":
				temp = this.get("kick", data, i, ul);
				if (temp) {
					value = new Url(temp.href);
				}
				break;
			case "alert_url":
				temp = this.get("alert", data, i, ul);
				if (temp) {
					value = new Url(temp.href);
				}
				break;
			case "pseudo":
			case "date":
			case "post":
			case "ancre":
			case "suite_sujet":
				temp = this.get("ul", data, i, ul);
				if (temp) {
					temp = temp.getElementsByTagName("li");
					for (i = 0; i < temp.length; i += 1) {
						data[temp[i].className] = temp[i];
					}
					value = data[key];
				}
				break;
			default:
				break;
			}
			data[key] = value;
		}
		return data[key];
	};
	shar.messages.execute = function execute(i, ul, loc, id, last) {
		var data, warn;
		data = {};
		data.ul = ul;
		warn = 0;
		if (option("blast") && this.get("alive", data, i, ul) && this.get("mod", data, i, ul)) {
			this.blast(data, i, ul, loc);
		}
		if (option("masque")) {
			this.masque(data, i, ul, loc);
		}
		if (option("warning") && this.get("alive", data, i, ul)) {
			warn += this.warning(data, i, ul, loc);
		}
		if (ul.parentNode.id === loc.url.hash) {
			this.mother.generateStandard.style("ancre");
			ul.parentNode.className += " msg_ancre";
		}
		if (option("arme") && this.get("mod", data, i, ul)) {
			this.arme(data, warn, i, ul, loc);
		}
		if (option("linkProtect")) {
			this.linkProtect(data, i, ul, loc);
		}
		if (option("epingle") && last === i) {
			this.epingle(data, i, ul, loc);
		}
		if (option("tracking")) {
			this.tracking(data, i, ul, loc);
		}
	};
	shar.messages.arme = function arme(data, warn, i, ul, loc) {
		var pseudo, input, link, li, url, locData, id, button, key;
		if (!this.mother.arme.key) {
			this.mother.arme.init(this.mother, this.forums, this, loc, "Arme - Viseur");
			this.mother.arme.title(" ");
			this.mother.arme.title("Général");
			if (option("arme_links")) {
				url = new Url();
				url.alterIn(loc.url);
				locData = where(url);
				locData.mode = 0;
				locData.forum = 103;
				locData.page = 1;
				locData.index = 1;
				locData.name = "0";
				locData.rewrite();
				li = this.mother.arme.link(locData.url, " Forum des modérateurs");
				li.insertBefore(this.mother.create.icone(this.mother.icones.get("cssPagesuiv")), li.firstChild);
				url.path = ["cgi-bin", "jvforums", "kick_user.cgi"];
				url.search.forum = loc.forum;
				url.alter();
				li = this.mother.arme.link(url, " Liste des kicks");
				li.insertBefore(this.mother.create.icone(this.mother.icones.get("cssPagesuiv")), li.firstChild);
				this.mother.arme.title(" ");
			}
			this.mother.arme.aim("All", "type", "checkbox", false, false, input);
			this.mother.arme.shooter("Shoot", "redS", "shoot");
			if (option("warning")) {
				button = this.mother.arme.shooter("Avertir tous", "redA", "massWarn");
				key = this.mother.name("@.warnlevel");
				button.setAttribute("key", key);
				button.setAttribute("max", option("warning-max"));
			}
			this.mother.arme.title(" ");
			if (option("arme_allowKick") && loc.mode < 4) {
				li = this.mother.arme.createLine("small");
				id = this.mother.arme.name("select");
				li.appendChild(this.mother.selectMotif(loc, id));
				this.mother.arme.shooter("Kick", "greenX", "kick_messages").setAttribute("motif_id", id);
				this.mother.arme.title(" ");
			}
			this.mother.arme.title("Pseudos");
		}
		input = this.mother.create.input("checkbox");
		li = this.get("pseudo", data, i, ul);
		li.insertBefore(input, li.firstChild);
		link = this.get("url_mod", data, i, ul);
		pseudo = this.get("psd", data, i, ul);
		if (pseudo && this.get("alive", data, i, ul) && (option("arme_viseModo") || !this.get("isMod", data, i, ul))) {
			if (i > 0 || loc.page !== 1) {
				input.setAttribute("link", link);
			}
			input.setAttribute("link_kick", this.get("kick_url", data, i, ul));
			input.setAttribute("link_ban", this.get("alert_url", data, i, ul));
			li = this.mother.arme.aim(pseudo, "pseudo", pseudo.toLowerCase(), true, warn > option("warning-limit"), input);
			this.mother.arme.aim("All", "type", "checkbox", false, false, input);

			if (option("warning") && li.parentNode.getElementsByTagName("img").length === 0) {
				key = this.mother.name(pseudo.toLowerCase() + ".warnlevel");
				this.mother.generateStandard.style("button");
				button = this.mother.create.icone(this.mother.icones.get("redA"));
				button.className = "button";
				button.setAttribute("key", key);
				button.setAttribute("max", option("warning-max"));
				this.mother.generateStandard.script("warning");
				button.setAttribute("onclick", this.mother.scripts.get("warning").name + "(this);");
				li.parentNode.insertBefore(button, li.nextSibling);
				li.parentNode.insertBefore(this.mother.create.text(" "), li.nextSibling);
			}
		} else {
			input.disabled = true;
		}
	};
	shar.messages.warning = function warning(data, i, ul, loc) {
		var warn, pseudo, key, button, tracker, j;
		warn = 0;
		pseudo = this.get("psd", data, i, ul);
		if (pseudo) {
			key = this.mother.name(pseudo.toLowerCase() + ".warnlevel");
			warn = this.mother.system.save.get(key);
			if (!warn) {
				warn = 0;
			}
			if (option("track_kick") && warn === 0) {
				if (this.mother.system.save.get(this.mother.name("tracking_kick_system"))) {
					tracker = this.mother.system.save.get(this.mother.name("tracking_kick_system_" + loc.forum));
				} else {
					this.mother.system.save.del(this.mother.name("tracking_kick_system_" + loc.forum));
				}
				if (tracker) {
					tracker = tracker.split(",");
					for (j = 0; warn === 0 && j < tracker.length; j += 1) {
						if (pseudo.toLowerCase() === tracker[j]) {
							warn = option("warning-max") + 1;
						}
					}
				}
			}
			if (warn > 0) {
				this.mother.generateStandard.style("warn_messages");
				ul.parentNode.className = "msg msg_warn" + warn;
			}

			this.mother.generateStandard.style("button");
			button = this.mother.create.icone(this.mother.icones.get("redA"));
			this.get("date", data, i, ul).insertBefore(this.mother.create.text(" "), this.get("date", data, i, ul).firstChild);
			this.get("date", data, i, ul).insertBefore(button, this.get("date", data, i, ul).firstChild);
			button.className = "button";
			button.setAttribute("key", key);
			button.setAttribute("max", option("warning-max"));

			this.mother.generateStandard.script("warning");
			button.setAttribute("onclick", this.mother.scripts.get("warning").name + "(this);");
		}
		return warn;
	};
	shar.messages.masque = function masque(data, i, ul, loc) {
		var button, alt_icone;
		if (this.get("pseudo", data, i, ul)) {
			this.mother.generateStandard.style("button");
			button = this.mother.create.icone(this.mother.icones.get("orange"), "Masquer le message ?");
			this.get("pseudo", data, i, ul).appendChild(button);
			button.className = "button";
			this.mother.generateStandard.script("masque");
			this.mother.generateStandard.script("alt_button");
			button.setAttribute("onclick", this.mother.scripts.get("alt_button").name + "(this);" + this.mother.scripts.get("masque").name + "(this);");
			this.get("post", data, i, ul).id = ul.parentNode.id + "_post";
			button.setAttribute("key", this.get("post", data, i, ul).id);

			alt_icone = this.mother.icones.get("green");
			button.setAttribute("alt_src", alt_icone[option("baseIcone")]);
			button.setAttribute("alt_alt", alt_icone.alt);
			button.setAttribute("alt_title", "Voir le message ?");
		}
	};
	shar.messages.blast = function blast(data, i, ul, loc) {
		var tmp;
		this.mother.generateStandard.script("blast_messages");
		tmp = this.get("mod", data, i, ul).getAttribute("onclick");
		if (!tmp) {
			tmp = "";
		}
		if (i === 0 && loc.page === 1) {
			this.get("mod", data, i, ul).setAttribute("onclick", "if (confirmation('')) { blast(this); } else { return false; }");
		} else {
			this.get("mod", data, i, ul).setAttribute("onclick", "blast(this);");
		}
	};
	shar.messages.linkProtect = function linkProtect(data, i, ul, loc) {
		var post, a, j, k, exp, bool, url;
		post = this.get("post", data, i, ul);
		if (post) {
			exp = [];
			a = post.getElementsByTagName("a");
			for (j = 0; j < exp.length; j += 1) {
				exp[j] = new Reg(exp[j]);
			}
			for (k = 0; k < a.length; k += 1) {
				bool = false;
				for (j = 0; j < exp.length; j += 1) {
					if (bool !== true && exp[j].exec(a[k].href.toLowerCase())) {
						bool = true;
					}
				}
				if (bool !== true) {
					url = new Url(a[k].href);
					switch (url.hostname.toLowerCase()) {
					case "www.jeuxvideo.com":
						bool = true;
						break;
					default:
						break;
					}
				}
				if (bool === true) {

				}
			}
		}
	};
	shar.messages.epingle = function epingle(data, i, ul, loc) {
		var key, month, nb, date, reg, log;
		key = this.mother.name("epingle:" + loc.forum + "#" + loc.topic);
		log = this.mother.system.save.get(key);
		if (log) {
			date = this.get("date", data, i, ul);
			if (date) {
				date = date.innerHTML;
				reg = new Reg("([0-9]+)e?r? ([a-zûé]+) ([0-9]+) à ([0-9]+):([0-9]+)").exec(date);
				if (reg !== null) {
					month = formatInt(1 + inList(reg[2], option("month").split(",")), 2);
					date = parseInt(reg[3] + month + formatInt(reg[1], 2) + reg[4] + reg[5], 10);
					nb = (loc.page - 1) * 20 + i;
					log = log.split("#");
					if (log.length === 2) {
						log[0] = parseInt(log[0], 10);
						log[1] = parseInt(log[1], 10);
						if (nb > log[0] || date > log[1]) {
							this.mother.system.save.set(key, nb + "#" + date);
						}
					}
				}
			}
		}
	};
	shar.messages.tracking = function tracking(data, i, ul, loc) {
		var auteur, icone, link, url;
		if (this.get("psd", data, i, ul)) {
			auteur = this.get("psd", data, i, ul);
			icone = this.mother.create.icone(this.mother.icones.get("topic_dossier1"), "Rechercher les sujets de " + auteur + " ?");
			url = where(new Url(loc.url));
			url.mode = 0;
			url.topic = 0;
			url.page = 1;
			url.hash = 0;
			url.index = 1;
			url.search = 1;
			url.name = auteur + " ";
			url.rewrite();
			link = this.mother.create.link(url.url, icone);
			this.get("pseudo", data, i, ul).appendChild(this.mother.create.text(" "));
			this.get("pseudo", data, i, ul).appendChild(link);
		}
	};

	shar.formulaire = {};
	shar.formulaire.init = function init(mother, forums, mode, loc, formulaire) {
		this.mother = mother;
		this.forums = forums;
		this.mode = mode;
		this.execute(formulaire);
	};
	shar.formulaire.parse = function parse(data, key) {
		var value;
		value = undefined;
		switch (key) {
		case "mess":
			value = document.getElementById("newmessage");
			break;
		default:
			value = data.form.getElementsByName(key)[0];
			break;
		}
		if (value) {
			data[key] = value;
		}
		return data[key];
	};
	shar.formulaire.execute = function execute(formulaire) {
		var data;
		data = {};
		data.form = formulaire;
		this.signature(data);
	};
	shar.formulaire.signature = function signature(data) {
		var id, paragraph, label, sign, before, i, onclick, mess;
		before = document.getElementById("boutons_repondre");
		mess = this.parse(data, "mess");
		if (mess && before) {
			paragraph = this.mother.create.element("p");
			before.parentNode.insertBefore(paragraph, before);
			this.mother.generateStandard.style("signature");
			paragraph.className = "signature";
			label = this.mother.create.element("label");
			label.appendChild(this.mother.create.text("Signature : "));
			paragraph.appendChild(label);
			sign = this.mother.create.element("textarea");
			paragraph.appendChild(sign);
			sign.id = "signature";
			sign.cols = "40";
			sign.rows = "3";
			sign.readOnly = true;
			sign.value = String.fromCharCode(32,28,31,29,30);
			this.mother.generateStandard.script("appendSignature");
			for (i = 0; i < before.childNodes.length; i += 1) {
				if (before.childNodes[i].nodeType === 1) {
					onclick = before.childNodes[i].getAttribute("onclick");
					if (!onclick) {
						onclick = "";
					}
					before.childNodes[i].setAttribute("onclick", "appendSignature(this); " + onclick);
					before.childNodes[i].setAttribute("mess", mess.id);
					before.childNodes[i].setAttribute("sign", sign.id);
				}
			}
		}
	};

	shar.profil = {};
	shar.profil.init = function init(mother, loc) {
		this.mother = mother;
		this.data = {};
		this.data.cdv = document.getElementById("global");
		this.data.pseudo = loc.url.path[loc.url.path.length - 1].split(".")[0];
		this.execute();
	};
	shar.profil.parse = function parse(key) {
		var value, temp;
		if (!this.data.hasOwnProperty(key)) {
			value = null;
			switch (key) {
			case "nothing":
				break;
			case "nothingbis":
				break;
			default:
				if (key.substring(0, 3) === "id:") {
					value = document.getElementById(key.slice(3));
				}
				break;
			}
			this.data[key] = value;
		}
		return this.data[key];
	};
	shar.profil.execute = function execute() {

	};

	shar.execute = function execute() {
		var url, loc, lock;
		this.head = document.getElementsByTagName("head")[0];
		this.body = document.getElementsByTagName("body")[0];
		url = this.falseLoc(new Url(location.href));
		loc = where(url);
		if (this.body) {
			lock = this.body.getAttribute(option("codeName"));
		}
		if (this.body && lock !== "done") {
			this.body.setAttribute(option("codeName"), "done");
			if (loc.jvc) {
				this.generateStandard.initJVC(this);
				if (this.hasOwnProperty(loc.type)) {
					this[loc.type].init(this, loc);
				}
			}
		}
	};
	shar.execution = function execution() {
		shar.execute();
		shar = undefined;
	};

	setTimeout(shar.execution, getTimerLength());
}());