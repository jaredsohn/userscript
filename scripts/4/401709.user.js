// ==UserScript==
// @name           GreaseAVIM 
// @description    AVIM for Greasemonkey
// @author         Dang Tran Hieu for original AVIM script. doixanh for greasemonkey modification
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.*
// @include        https://*.*
// @exclude     *.css
// @exclude     *.js

// @version        0.8
// ==/UserScript==

/*
 *  AVIM JavaScript Vietnamese Input Method Source File dated 28-07-2008
 *
 *	Copyright (C) 2004-2008 Hieu Tran Dang <lt2hieu2004 (at) users (dot) sf (dot) net
 *	Website:	http://noname00.com/hieu
 *
 *	You are allowed to use this software in any way you want providing:
 *		1. You must retain this copyright notice at all time
 *		2. You must not claim that you or any other third party is the author
 *		   of this software in any way.
*/

var AVIMGlobalConfig = {
	method: 1, //Default input method: 0=AUTO, 1=TELEX, 2=VNI
	onOff: 0, //Starting status: 0=Off, 1=On	
	exclude: ["email"], //IDs of the fields you DON'T want to let users type Vietnamese in
};

//Set to true the methods which you want to be included in the AUTO method
var AVIMAutoConfig = {
	telex: true,
	vni: true
};

var AVIMInitDone = 0;

function showAVIMstatus() {
	inputMethod = [ "AUTO", "TELEX", "VNI" ];
	
	if (AVIMGlobalConfig.onOff == 0) {
		onOffStatus = "OFF";
	}
	else {
		onOffStatus = inputMethod[AVIMGlobalConfig.method];
	}		
	document.getElementById('AVIMControl').innerHTML = "AVIM-" + onOffStatus +" (Ctrl)[F12]";	 
}

function AVIM()	{
	this.attached = [];
	this.changed = false;
	this.agt = navigator.userAgent.toLowerCase();
	this.alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM\ ";
	this.support = true;
	this.ver = 0;
	this.specialChange = false;
	this.is_ie = ((this.agt.indexOf("msie") != -1) && (this.agt.indexOf("opera") == -1));
	this.is_opera = false;
	this.isKHTML = false;
	this.kl = 0;
	this.skey = [97,226,259,101,234,105,111,244,417,117,432,121,65,194,258,69,202,73,79,212,416,85,431,89];
	this.fID = document.getElementsByTagName("iframe");
	this.range = null;
	this.whit = false;
	this.db1 = [273,272];
	this.ds1 = ['d','D'];
	this.os1 = "o,O,ơ,Ơ,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(",");
	this.ob1 = "ô,Ô,ô,Ô,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",");
	this.mocs1 = "o,O,ô,Ô,u,U,ó,Ó,ò,Ò,ọ,Ọ,ỏ,Ỏ,õ,Õ,ú,Ú,ù,Ù,ụ,Ụ,ủ,Ủ,ũ,Ũ,ố,Ố,ồ,Ồ,ộ,Ộ,ổ,Ổ,ỗ,Ỗ".split(",");
	this.mocb1 = "ơ,Ơ,ơ,Ơ,ư,Ư,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ,ứ,Ứ,ừ,Ừ,ự,Ự,ử,Ử,ữ,Ữ,ớ,Ớ,ờ,Ờ,ợ,Ợ,ở,Ở,ỡ,Ỡ".split(",");
	this.trangs1 = "a,A,â,Â,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ".split(",");
	this.trangb1 = "ă,Ă,ă,Ă,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ".split(",");
	this.as1 = "a,A,ă,Ă,á,Á,à,À,ạ,Ạ,ả,Ả,ã,Ã,ắ,Ắ,ằ,Ằ,ặ,Ặ,ẳ,Ẳ,ẵ,Ẵ,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",");
	this.ab1 = "â,Â,â,Â,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,ấ,Ấ,ầ,Ầ,ậ,Ậ,ẩ,Ẩ,ẫ,Ẫ,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",");
	this.es1 = "e,E,é,É,è,È,ẹ,Ẹ,ẻ,Ẻ,ẽ,Ẽ".split(",");
	this.eb1 = "ê,Ê,ế,Ế,ề,Ề,ệ,Ệ,ể,Ể,ễ,Ễ".split(",");
	this.english = "ĐÂĂƠƯÊÔ";
	this.lowen = "đâăơưêô";
	this.arA = "á,à,ả,ã,ạ,a,Á,À,Ả,Ã,Ạ,A".split(',');
	this.mocrA = "ó,ò,ỏ,õ,ọ,o,ú,ù,ủ,ũ,ụ,u,Ó,Ò,Ỏ,Õ,Ọ,O,Ú,Ù,Ủ,Ũ,Ụ,U".split(',');
	this.erA = "é,è,ẻ,ẽ,ẹ,e,É,È,Ẻ,Ẽ,Ẹ,E".split(',');
	this.orA = "ó,ò,ỏ,õ,ọ,o,Ó,Ò,Ỏ,Õ,Ọ,O".split(',');
	this.aA = "ấ,ầ,ẩ,ẫ,ậ,â,Ấ,Ầ,Ẩ,Ẫ,Ậ,Â".split(',');
	this.oA = "ố,ồ,ổ,ỗ,ộ,ô,Ố,Ồ,Ổ,Ỗ,Ộ,Ô".split(',');
	this.mocA = "ớ,ờ,ở,ỡ,ợ,ơ,ứ,ừ,ử,ữ,ự,ư,Ớ,Ờ,Ở,Ỡ,Ợ,Ơ,Ứ,Ừ,Ử,Ữ,Ự,Ư".split(',');
	this.trangA = "ắ,ằ,ẳ,ẵ,ặ,ă,Ắ,Ằ,Ẳ,Ẵ,Ặ,Ă".split(',');
	this.eA = "ế,ề,ể,ễ,ệ,ê,Ế,Ề,Ể,Ễ,Ệ,Ê".split(',');
	this.oA = "ố,ồ,ổ,ỗ,ộ,ô,Ố,Ồ,Ổ,Ỗ,Ộ,Ô".split(',');
	this.skey2 = "a,a,a,e,e,i,o,o,o,u,u,y,A,A,A,E,E,I,O,O,O,U,U,Y".split(',');
	
	this.fcc = function(x) {
		return String.fromCharCode(x);
	}
	
	this.getEL = function(id) {
		return document.getElementById(id);
	}
	
	this.getSF = function() {
		var sf = [], x;
		for(x = 0; x < this.skey.length; x++) {
			sf[sf.length] = this.fcc(this.skey[x]);
		}
		return sf;
	}
	
	// create tiny panel
	panel = document.createElement('a');
	panel.setAttribute('id', 'AVIMControl');
	panel.setAttribute('style', "float: right; position: fixed; bottom: 3px; left: 3px; ; color: #b62727; font-family: Verdana; font-size: 10px; xfont-weight: bold;");
	panel.addEventListener("click", panelClick, false);
	panel.innerHTML='AVIM';
	document.body.appendChild(panel);	 

	if(!this.is_ie) {
		if(this.agt.indexOf("opera") >= 0) {
			this.operaV = this.agt.split(" ");
			this.operaVersion = parseInt(this.operaV[this.operaV.length - 1]);
			if(this.operaVersion >= 8) {
				this.is_opera = true;
			} else {
				this.operaV = this.operaV[0].split("/");
				this.operaVersion = parseInt(this.operaV[1]);
				if(this.operaVersion >= 8) this.is_opera = true;
			}
		} else if(this.agt.indexOf("khtml") >= 0) {
			this.isKHTML = true;
		} else {
			this.ver = this.agt.substr(this.agt.indexOf("rv:") + 3);
			this.ver = parseFloat(this.ver.substr(0, this.ver.indexOf(" ")));
			if(this.agt.indexOf("mozilla") < 0) this.ver = 0;
		}
	}
	
	this.saveSettings = function() {
		// console.log("Going to save " + JSON.stringify(AVIMGlobalConfig));
		
		localStorage.setItem("AVIM_onOff", AVIMGlobalConfig.onOff + "");
		localStorage.setItem("AVIM_method", AVIMGlobalConfig.method + "");
	
		/// console.log("Reload AVIM_onOff " + localStorage["AVIM_onOff"]);	
	}
	
	this.loadSettings = function() {
		// default values
		AVIMGlobalConfig.onOff = 0;
		AVIMGlobalConfig.method = 1;
			
		/*if (localStorage.getItem("AVIM_onOff") != null) {
			//console.log("- Found AVIM_onOff=" + localStorage.getItem("AVIM_onOff"));
			AVIMGlobalConfig.onOff = parseInt(localStorage.getItem("AVIM_onOff"));
		}*/
		if (localStorage.getItem("AVIM_method") != null) {
			//console.log("- Found AVIM_method=" + localStorage.getItem("AVIM_method"));
			AVIMGlobalConfig.method = parseInt(localStorage.getItem("AVIM_method"));
		}
		// console.log("Loaded from local storage " + JSON.stringify(AVIMGlobalConfig));
	}
	
	this.setMethod = function(m) {
		if(m == -1) {
			AVIMGlobalConfig.onOff = 0;
		} else {
			AVIMGlobalConfig.onOff = 1;
			AVIMGlobalConfig.method = m;
		}	
		this.saveSettings();
		showAVIMstatus();
	}

	if(this.is_ie || (this.ver >= 1.3) || this.is_opera || this.isKHTML) {
		this.loadSettings();
		if(AVIMGlobalConfig.onOff == 0) this.setMethod(-1);
		else this.setMethod(AVIMGlobalConfig.method);
	} else {
		this.support = false;
	}
	
	this.mozGetText = function(obj) {
		var v, pos, w = "", g = 1;
		v = (obj.data) ? obj.data : obj.value;
		if(v.length <= 0) {
			return false;
		}
		if(!obj.data) {
			if(!obj.setSelectionRange) {
				return false;
			}
			pos = obj.selectionStart;
		} else {
			pos = obj.pos;
		}
		if(obj.selectionStart != obj.selectionEnd) {
			return ["", pos];
		}
		while(1) {
			if(pos - g < 0) {
				break;
			} else if(this.notWord(v.substr(pos - g, 1))) {
				if(v.substr(pos - g, 1) == "\\") {
					w = v.substr(pos - g, 1) + w;
				}
				break;
			} else {
				w = v.substr(pos - g, 1) + w;
			}
			g++;
		}
		return [w, pos];
	}
	
	this.ieGetText = function(obj) {
		var caret = obj.document.selection.createRange(), w="";
		if(caret.text) {
			caret.text = "";
		} else {
			while(1) {
				caret.moveStart("character", -1);
				if(w.length == caret.text.length) {
					break;
				}
				w = caret.text;
				if(this.notWord(w.charAt(0))) {
					if(w.charCodeAt(0) == 13) {
						w=w.substr(2);
					} else if(w.charAt(0) != "\\") {
						w=w.substr(1);
					}
					break;
				}
			}
		}
		if(w.length) {
			caret.collapse(false);
			caret.moveStart("character", -w.length);
			obj.cW = caret.duplicate();
			return obj;
		} else {
			return false;
		}
	}
	
	this.start = function(obj, key) {
		var w = "", method = AVIMGlobalConfig.method, dockspell = 0, uni, uni2 = false;
		this.oc=obj;
		var telex = "D,A,E,O,W,W".split(','), vni = "9,6,6,6,7,8".split(','), a, noNormC;
		if(method == 0) {
			var arr = [], check = [AVIMAutoConfig.telex, AVIMAutoConfig.vni];
			var value1 = [telex, vni], uniA = [uni, uni2], D2A = ["DAWEO", "6789"];
			for(a = 0; a < check.length; a++) {
				if(check[a]) {
					arr[arr.length] = value1[a];
				} else {
					D2A[a] = "";
				}
			}
			for(a = 0; a < arr.length; a++) {
				uniA[a] = arr[a];
			}
			uni = uniA[0];
			uni2 = uniA[1];
			this.D2 = D2A.join();
			if(!uni) {
				return;
			}
		} else if(method == 1) {
			uni = telex;
			this.D2 = "DAWEO";
		}
		else if(method == 2) {
			uni = vni;
			this.D2 = "6789";
		}
		if(!this.is_ie) {
			key = this.fcc(key.which);
			w = this.mozGetText(obj);
			if(!w || obj.sel) {
				return;
			}
			if(this.D2.indexOf(this.up(key)) >= 0) {
				noNormC = true;
			} else {
				noNormC = false;
			}
			this.main(w[0], key, w[1], uni, noNormC);
			if(!dockspell) {
				w = this.mozGetText(obj);
			}
			if(w && uni2 && !this.changed) {
				this.main(w[0], key, w[1], uni2, noNormC);
			}
		} else {
			obj = this.ieGetText(obj);
			if(obj) {
				var sT = obj.cW.text;
				w = this.main(sT, key, 0, uni, false);
				if(uni2 && ((w == sT) || (typeof(w) == 'undefined'))) {
					w = this.main(sT, key, 0, uni2, false);
				}
				if(w) {
					obj.cW.text = w;
				}
			}
		}
		if(this.D2.indexOf(this.up(key)) >= 0) {
			if(!this.is_ie) {
				w = this.mozGetText(obj);
				if(!w) {
					return;
				}
				this.normC(w[0], key, w[1]);
			} else if(typeof(obj) == "object") {
				obj = this.ieGetText(obj);
				if(obj) {
					w = obj.cW.text;
					if(!this.changed) {
						w += key;
						this.changed = true;
					}
					obj.cW.text = w;
					w = this.normC(w, key, 0);
					if(w) {
						obj = this.ieGetText(obj);
						obj.cW.text = w;
					}
				}
			}
		}
	}
	
	this.findC = function(w, k, sf) {
		var method = AVIMGlobalConfig.method;
		var str = "", res, cc = "", pc = "", tE = "", vowA = [], s = "ÂĂÊÔƠƯêâăơôư", c = 0, dn = false, uw = this.up(w), tv, g;
		var DAWEOFA = this.up(this.aA.join() + this.eA.join() + this.mocA.join() + this.trangA.join() + this.oA.join() + this.english), h, uc;
		for(g = 0; g < sf.length; g++) {
			if(this.nan(sf[g])) {
				str += sf[g];
			} else {
				str += this.fcc(sf[g]);
			}
		}
		var uk = this.up(k), uni_array = this.repSign(k), w2 = this.up(this.unV2(this.unV(w))), dont = "ƯA,ƯU".split(',');
		if (this.DAWEO.indexOf(uk) >= 0) {
			if(uk == this.moc) {
				if((w2.indexOf("UU") >= 0) && (this.tw5 != dont[1])) {
					if(w2.indexOf("UU") == (w.length - 2)) {
						res=2;
					} else {
						return false;
					}
				} else if(w2.indexOf("UOU") >= 0) {
					if(w2.indexOf("UOU") == (w.length-3)) {
						res=2;
					} else {
						return false;
					}
				}
			}
			if(!res) {
				for(g = 1; g <= w.length; g++) {
					cc = w.substr(w.length - g, 1);
					pc = this.up(w.substr(w.length - g - 1, 1));
					uc = this.up(cc);
					for(h = 0; h < dont.length; h++) {
						if((this.tw5 == dont[h]) && (this.tw5 == this.unV(pc + uc))) {
							dn = true;
						}
					}
					if(dn) {
						dn = false;
						continue;
					}
					if(str.indexOf(uc) >= 0) {
						if(((uk == this.moc) && (this.unV(uc) == "U") && (this.up(this.unV(w.substr(w.length - g + 1, 1))) == "A")) || ((uk == this.trang) && (this.unV(uc) == 'A') && (this.unV(pc) == 'U'))) {
							if(this.unV(uc) == "U") {
								tv=1;
							} else {
								tv=2;
							}
							var ccc = this.up(w.substr(w.length - g - tv, 1));
							if(ccc != "Q") {
								res = g + tv - 1;
							} else if(uk == this.trang) {
								res = g;
							} else if(this.moc != this.trang) {
								return false;
							}
						} else {
							res = g;
						}
						if(!this.whit || (uw.indexOf("Ư") < 0) || (uw.indexOf("W") < 0)) {
							break;
						}
					} else if(DAWEOFA.indexOf(uc) >= 0) {
						if(uk == this.D) {
							if(cc == "đ") {
								res = [g, 'd'];
							} else if(cc == "Đ") {
								res = [g, 'D'];
							}
						} else {
							res = this.DAWEOF(cc, uk, g);
						}
						if(res) break;
					}
				}
			}
		}
		if((uk != this.Z) && (this.DAWEO.indexOf(uk) < 0)) {
			var tEC = this.retKC(uk);
			for(g = 0;g < tEC.length; g++) {
				tE += this.fcc(tEC[g]);
			}
		}
		for(g = 1; g <= w.length; g++) {
			if(this.DAWEO.indexOf(uk) < 0) {
				cc = this.up(w.substr(w.length - g, 1));
				pc = this.up(w.substr(w.length - g - 1, 1));
				if(str.indexOf(cc) >= 0) {
					if(cc == 'U') {
						if(pc != 'Q') {
							c++;
							vowA[vowA.length] = g;
						}
					} else if(cc == 'I') {
						if((pc != 'G') || (c <= 0)) {
							c++;
							vowA[vowA.length] = g;
						}
					} else {
						c++;
						vowA[vowA.length] = g;
					}
				} else if(uk != this.Z) {
					for(h = 0; h < uni_array.length; h++) if(uni_array[h] == w.charCodeAt(w.length - g)) {
						return [g, tEC[h % 24]];
					}
					for(h = 0; h < tEC.length; h++) {
						if(tEC[h] == w.charCodeAt(w.length - g)) {
							return [g, this.fcc(this.skey[h])];
						}
					}
				}
			}
		}
		if(this.DAWEO.indexOf(uk) < 0) {
			for(g = 1; g <= w.length; g++) {
				if((uk != this.Z) && (s.indexOf(w.substr(w.length - g, 1)) >= 0)) {
					return g;
				} else if(tE.indexOf(w.substr(w.length - g, 1)) >= 0) {
					for(h = 0; h < tEC.length; h++) {
						if(w.substr(w.length - g, 1).charCodeAt(0) == tEC[h]) {
							return [g, this.fcc(this.skey[h])];
						}
					}
				}
			}
		}
		if(res) {
			return res;
		}
		if((c == 1) || (uk == this.Z)) {
			return vowA[0];
		} else if(c == 2) {
			var v = 2;
			if(w.substr(w.length - 1) == " ") {
				v = 3;
			}
			var ttt = this.up(w.substr(w.length - v, 2));
			if((ttt == "UY") || (ttt == "OA") || (ttt == "OE")) {
				return vowA[0];
			}
			var c2 = 0, fdconsonant, sc = "BCD" + this.fcc(272) + "GHKLMNPQRSTVX", dc = "CH,GI,KH,NGH,GH,NG,NH,PH,QU,TH,TR".split(',');
			for(h = 1; h <= w.length; h++) {
				fdconsonant=false;
				for(g = 0; g < dc.length; g++) {
					if(this.up(w.substr(w.length - h - dc[g].length + 1, dc[g].length)).indexOf(dc[g])>=0) {
						c2++;
						fdconsonant = true;
						if(dc[g] != 'NGH') {
							h++;
						} else {
							h+=2;
						}
					}
				}
				if(!fdconsonant) {
					if(sc.indexOf(this.up(w.substr(w.length - h, 1))) >= 0) {
						c2++;
					} else { 
						break;
					}
				}
			}
			if((c2 == 1) || (c2 == 2)) {
				return vowA[0];
			} else {
				return vowA[1];
			}
		} else if(c == 3) {
			return vowA[1];
		} else return false;
	}
	
	this.ie_replaceChar = function(w, pos, c) {
		var r = "", uc = 0;
		if(isNaN(c)) uc = this.up(c);
		if(this.whit && (this.up(w.substr(w.length - pos - 1, 1)) == 'U') && (pos != 1) && (this.up(w.substr(w.length - pos - 2, 1)) != 'Q')) {
			this.whit = false;
			if((this.up(this.unV(this.fcc(c))) == "Ơ") || (uc == "O")) {
				if(w.substr(w.length - pos - 1, 1) == 'u') r = this.fcc(432);
				else r = this.fcc(431);
			}
			if(uc == "O") {
				if(c == "o") {
					c = 417;
				} else {
					c = 416;
				}
			}
		}
		if(!isNaN(c)) {
			this.changed = true;
			r += this.fcc(c);
			return w.substr(0, w.length - pos - r.length + 1) + r + w.substr(w.length - pos + 1);
		} else {
			return w.substr(0, w.length - pos) + c + w.substr(w.length - pos + 1);
		}
	}
	
	this.replaceChar = function(o, pos, c) {
		var bb = false;
		if(!this.nan(c)) {
			var replaceBy = this.fcc(c), wfix = this.up(this.unV(this.fcc(c)));
			this.changed = true;
		} else {
			var replaceBy = c;
			if((this.up(c) == "O") && this.whit) {
				bb=true;
			}
		}
		if(!o.data) {
			var savePos = o.selectionStart, sst = o.scrollTop;
			if ((this.up(o.value.substr(pos - 1, 1)) == 'U') && (pos < savePos - 1) && (this.up(o.value.substr(pos - 2, 1)) != 'Q')) {
				if((wfix == "Ơ") || bb) {
					if (o.value.substr(pos-1,1) == 'u') {
						var r = this.fcc(432);
					} else {
						var r = this.fcc(431);
					}
				}
				if(bb) {
					this.changed = true;
					if(c == "o") {
						replaceBy = "ơ";
					} else {
						replaceBy = "Ơ";
					}
				}
			}
			o.value = o.value.substr(0, pos) + replaceBy + o.value.substr(pos + 1);
			if(r) o.value = o.value.substr(0, pos - 1) + r + o.value.substr(pos);
			o.setSelectionRange(savePos, savePos);
			o.scrollTop = sst;
		} else {
			if ((this.up(o.data.substr(pos - 1, 1)) == 'U') && (pos < o.pos - 1)) {
				if((wfix == "Ơ") || bb) {
					if (o.data.substr(pos - 1, 1) == 'u') {
						var r = this.fcc(432);
					} else {
						var r = this.fcc(431);
					}
				}
				if(bb) {
					this.changed = true;
					if(c == "o") {
						replaceBy = "ơ";
					} else {
						replaceBy = "Ơ";
					}
				}
			}
			o.deleteData(pos, 1);
			o.insertData(pos, replaceBy);
			if(r) {
				o.deleteData(pos - 1, 1);
				o.insertData(pos - 1, r);
			}
		}
		if(this.whit) {
			this.whit=false;
		}
	}
	
	this.tr = function(k, w, by, sf, i) {
		var r, pos = this.findC(w, k, sf), g;
		if(pos) {
			if(pos[1]) {
				if(this.is_ie) {
					return this.ie_replaceChar(w, pos[0], pos[1]);
				} else {
					return this.replaceChar(this.oc, i-pos[0], pos[1]);
				}
			} else {
				var c, pC = w.substr(w.length - pos, 1), cmp;
				r = sf;
				for(g = 0; g < r.length; g++) {
					if(this.nan(r[g]) || (r[g] == "e")) {
						cmp = pC;
					} else {
						cmp = pC.charCodeAt(0);
					}
					if(cmp == r[g]) {
						if(!this.nan(by[g])) {
							c = by[g];
						} else {
							c = by[g].charCodeAt(0);
						}
						if(this.is_ie) {
							return this.ie_replaceChar(w, pos, c);
						} else {
							return this.replaceChar(this.oc, i - pos, c);
						}
					}
				}
			}
		}
		return false;
	}
	
	this.main = function(w, k, i, a, noNormC) {
		var uk = this.up(k), bya = [this.db1, this.ab1, this.eb1, this.ob1, this.mocb1, this.trangb1], got = false, t = "d,D,a,A,a,A,o,O,u,U,e,E,o,O".split(",");
		var sfa = [this.ds1, this.as1, this.es1, this.os1, this.mocs1, this.trangs1], by = [], sf = [], method = AVIMGlobalConfig.method, h, g;
		if((method == 2) || ((method == 0) && (a[0] == "9"))) {
			this.DAWEO = "6789";
			this.SFJRX = "12534";
			this.S = "1";
			this.F = "2";
			this.J = "5";
			this.R = "3";
			this.X = "4";
			this.Z = "0";
			this.D = "9";
			this.FRX = "234";
			this.AEO = "6";
			this.moc = "7";
			this.trang = "8";
			this.them = "678";
			this.A = "^";
			this.E = "^";
			this.O = "^";
		} else if((method == 1) || ((method == 0) && (a[0] == "D"))) {
			this.SFJRX = "SFJRX";
			this.DAWEO = "DAWEO";
			this.D = 'D';
			this.S = 'S';
			this.F = 'F';
			this.J = 'J';
			this.R = 'R';
			this.X = 'X';
			this.Z = 'Z';
			this.FRX = "FRX";
			this.them = "AOEW";
			this.trang = "W";
			this.moc = "W";
			this.A = "A";
			this.E = "E";
			this.O = "O";
		}
		if(this.SFJRX.indexOf(uk) >= 0) {
			var ret = this.sr(w,k,i);
			got=true;
			if(ret) {
				return ret;
			}
		} else if(uk == this.Z) {
			sf = this.repSign(null);
			for(h = 0; h < this.english.length; h++) {
				sf[sf.length] = this.lowen.charCodeAt(h);
				sf[sf.length] = this.english.charCodeAt(h);
			}
			for(h = 0; h < 5; h++) {
				for(g = 0; g < this.skey.length; g++) {
					by[by.length] = this.skey[g];
				}
			}
			for(h = 0; h < t.length; h++) {
				by[by.length] = t[h];
			}
			got = true;
		} else {
			for(h = 0; h < a.length; h++) {
				if(a[h] == uk) {
					got = true;
					by = by.concat(bya[h]);
					sf = sf.concat(sfa[h]);
				}
			}
		}
		if(uk == this.moc) {
			this.whit = true;
		}
		if(!got) {
			if(noNormC) {
				return;
			} else {
				return this.normC(w, k, i);
			}
		}
		return this.DAWEOZ(k, w, by, sf, i, uk);
	}
	this.DAWEOZ = function(k, w, by, sf, i, uk) {
		if((this.DAWEO.indexOf(uk) >= 0) || (this.Z.indexOf(uk) >= 0)) {
			return this.tr(k, w, by, sf, i);
		}
	}
	this.normC = function(w, k, i) {
		var uk = this.up(k), u = this.repSign(null), fS, c, j, h, space = (k.charCodeAt(0) == 32) ? true : false;
		if(!this.is_ie && space) {
			return;
		}
		for(j = 1; j <= w.length; j++) {
			for(h = 0; h < u.length; h++) {
				if(u[h] == w.charCodeAt(w.length - j)) {
					if(h <= 23) {
						fS = this.S;
					} else if(h <= 47) {
						fS = this.F;
					} else if(h <= 71) {
						fS = this.J;
					} else if(h <= 95) {
						fS = this.R;
					} else {
						fS = this.X;
					}
					c = this.skey[h % 24];
					if((this.alphabet.indexOf(uk) < 0) && (this.D2.indexOf(uk) < 0)) {
						return w;
					}
					w = this.unV(w);
					if(!space && !this.changed) {
						w += k;
					}
					if(!this.is_ie) {
						var sp = this.oc.selectionStart, pos = sp;
						if(!this.changed) {
							var sst = this.oc.scrollTop;
							pos += k.length;
							if(!this.oc.data) {
								this.oc.value = this.oc.value.substr(0, sp) + k + this.oc.value.substr(this.oc.selectionEnd);
								this.changed = true;
								this.oc.scrollTop = sst;
							} else {
								this.oc.insertData(this.oc.pos, k);
								this.oc.pos++;
								this.range.setEnd(this.oc, this.oc.pos);
								this.specialChange = true;
							}
						}
						if(!this.oc.data) {
							this.oc.setSelectionRange(pos, pos);
						}
					} else {
						var ret = this.sr(w, fS, 0);
						if(space && ret) {
							ret += this.fcc(32);
						}
						if(ret) {
							return ret;
						}
					}
				}
			}
		}
	}
	
	this.DAWEOF = function(cc, k, g) {
		var ret = [g], kA = [this.A, this.moc, this.trang, this.E, this.O], z, a;
		var ccA = [this.aA, this.mocA, this.trangA, this.eA, this.oA], ccrA = [this.arA, this.mocrA, this.arA, this.erA, this.orA];
		for(a = 0; a < kA.length; a++) {
			if(k == kA[a]) {
				for(z = 0; z < ccA[a].length; z++) {
					if(cc == ccA[a][z]) {
						ret[1] = ccrA[a][z];
					}
				}
			}
		}
		if(ret[1]) {
			return ret;
		} else {
			return false;
		}
	}
	
	this.retKC = function(k) {
		if(k == this.S) {
			return [225,7845,7855,233,7871,237,243,7889,7899,250,7913,253,193,7844,7854,201,7870,205,211,7888,7898,218,7912,221];
		}
		if(k == this.F) {
			return [224,7847,7857,232,7873,236,242,7891,7901,249,7915,7923,192,7846,7856,200,7872,204,210,7890,7900,217,7914,7922];
		}
		if(k == this.J) {
			return [7841,7853,7863,7865,7879,7883,7885,7897,7907,7909,7921,7925,7840,7852,7862,7864,7878,7882,7884,7896,7906,7908,7920,7924];
		}
		if(k == this.R) {
			return [7843,7849,7859,7867,7875,7881,7887,7893,7903,7911,7917,7927,7842,7848,7858,7866,7874,7880,7886,7892,7902,7910,7916,7926];
		}
		if(k == this.X) {
			return [227,7851,7861,7869,7877,297,245,7895,7905,361,7919,7929,195,7850,7860,7868,7876,296,213,7894,7904,360,7918,7928];
		}
	}
	
	this.unV = function(w) {
		var u = this.repSign(null), b, a;
		for(a = 1; a <= w.length; a++) {
			for(b = 0; b < u.length; b++) {
				if(u[b] == w.charCodeAt(w.length - a)) {
					w = w.substr(0, w.length - a) + this.fcc(this.skey[b % 24]) + w.substr(w.length - a + 1);
				}
			}
		}
		return w;
	}
	
	this.unV2 = function(w) {
		var a, b;
		for(a = 1; a <= w.length; a++) {
			for(b = 0; b < this.skey.length; b++) {
				if(this.skey[b] == w.charCodeAt(w.length - a)) {
					w = w.substr(0, w.length - a) + this.skey2[b] + w.substr(w.length - a + 1);
				}
			}
		}
		return w;
	}
	
	this.repSign = function(k) {
		var t = [], u = [], a, b;
		for(a = 0; a < 5; a++) {
			if((k == null)||(this.SFJRX.substr(a, 1) != this.up(k))) {
				t = this.retKC(this.SFJRX.substr(a, 1));
				for(b = 0; b < t.length; b++) u[u.length] = t[b];
			}
		}
		return u;
	}
	
	this.sr = function(w, k, i) {
		var sf = this.getSF(), pos = this.findC(w, k, sf);
		if(pos) {
			if(pos[1]) {
				if(!this.is_ie) {
					this.replaceChar(this.oc, i-pos[0], pos[1]);
				} else {
					return this.ie_replaceChar(w, pos[0], pos[1]);
				}
			} else {
				var c = this.retUni(w, k, pos);
				if (!this.is_ie) {
					this.replaceChar(this.oc, i-pos, c);
				} else {
					return this.ie_replaceChar(w, pos, c);
				}
			}
		}
		return false;
	}
	
	this.retUni = function(w, k, pos) {
		var u = this.retKC(this.up(k)), uC, lC, c = w.charCodeAt(w.length - pos), a, t = this.fcc(c);
		for(a = 0; a < this.skey.length; a++) {
			if(this.skey[a] == c) {
				if(a < 12) {
					lC=a;
					uC=a+12;
				} else {
					lC = a - 12;
					uC=a;
				}
				if(t != this.up(t)) {
					return u[lC];
				}
				return u[uC];
			}
		}
	}
	
	this.ifInit = function(w) {
		var sel = w.getSelection();
		this.range = sel ? sel.getRangeAt(0) : document.createRange();
	}
	
	this.ifMoz = function(e) {
		var code = e.which, avim = this.AVIM, cwi = e.target.parentNode.wi;
		if(typeof(cwi) == "undefined") cwi = e.target.parentNode.parentNode.wi;
		if(e.ctrlKey || (e.altKey && (code != 92) && (code != 126))) return;
		avim.ifInit(cwi);
		var node = avim.range.endContainer, newPos;
		avim.sk = avim.fcc(code);
		avim.saveStr = "";
		if(avim.checkCode(code) || !avim.range.startOffset || (typeof(node.data) == 'undefined')) return;
		node.sel = false;
		if(node.data) {
			avim.saveStr = node.data.substr(avim.range.endOffset);
			if(avim.range.startOffset != avim.range.endOffset) {
				node.sel=true;
			}
			node.deleteData(avim.range.startOffset, node.data.length);
		}
		avim.range.setEnd(node, avim.range.endOffset);
		avim.range.setStart(node, 0);
		if(!node.data) {
			return;
		}
		node.value = node.data;
		node.pos = node.data.length;
		node.which=code;
		avim.start(node, e);
		node.insertData(node.data.length, avim.saveStr);
		newPos = node.data.length - avim.saveStr.length + avim.kl;
		avim.range.setEnd(node, newPos);
		avim.range.setStart(node, newPos);
		avim.kl = 0;
		if(avim.specialChange) {
			avim.specialChange = false;
			avim.changed = false;
			node.deleteData(node.pos - 1, 1);
		}
		if(avim.changed) {
			avim.changed = false;
			e.preventDefault();
		}
	}
	
	this.FKeyPress = function() {
		var obj = this.findF();
		this.sk = this.fcc(obj.event.keyCode);
		if(this.checkCode(obj.event.keyCode) || (obj.event.ctrlKey && (obj.event.keyCode != 92) && (obj.event.keyCode != 126))) {
			return;
		}
		this.start(obj, this.sk);
	}
	
	this.checkCode = function(code) {
		if(((AVIMGlobalConfig.onOff == 0) || ((code < 45) && (code != 42) && (code != 32) && (code != 39) && (code != 40) && (code != 43)) || (code == 145) || (code == 255))) {
			return true;
		}
	}
	
	this.notWord = function(w) {
		var str = "\ \r\n#,\\;.:-_()<>+-*/=?!\"$%{}[]\'~|^\@\&\t" + this.fcc(160);
		return (str.indexOf(w) >= 0);
	}
	
	this.nan = function(w) {
		if (isNaN(w) || (w == 'e')) {
			return true;
		} else {
			return false;
		}
	}
	
	this.up = function(w) {
		w = w.toUpperCase();
		if(this.isKHTML) {
			var str = "êôơâăưếốớấắứềồờầằừễỗỡẫẵữệộợậặự", rep="ÊÔƠÂĂƯẾỐỚẤẮỨỀỒỜẦẰỪỄỖỠẪẴỮỆỘỢẶỰ", z, io;
			for(z = 0; z < w.length; z++) {
				io = str.indexOf(w.substr(z, 1));
				if(io >= 0) {
					w = w.substr(0, z) + rep.substr(io, 1) + w.substr(z + 1);
				}
			}
		}
		return w;
	}
	
	this.findIgnore = function(el) {
		var va = AVIMGlobalConfig.exclude, i;
		for(i = 0; i < va.length; i++) {
			if((el.id == va[i]) && (va[i].length > 0)) {
				return true;
			}
		}
	}
	
	this.findF = function() {
		var g;
		for(g = 0; g < this.fID.length; g++) {
			if(this.findIgnore(this.fID[g])) return;
			this.frame = this.fID[g];
			if(typeof(this.frame) != "undefined") {
				try {
					if (this.frame.contentWindow.document && this.frame.contentWindow.event) {
						return this.frame.contentWindow;
					}
				} catch(e) {
					if (this.frame.document && this.frame.event) {
						return this.frame;
					}
				}
			}
		}
	}
	
	this.keyPressHandler = function(e) {
		if(!this.support) {
			return;
		}
		if(!this.is_ie) {
			var el = e.target, code = e.which;
			if(e.ctrlKey) {
				return;
			}
			if(e.altKey && (code != 92) && (code != 126)) {
				return;
			}
		} else {
			var el = window.event.srcElement, code = window.event.keyCode;
			if(window.event.ctrlKey && (code != 92) && (code != 126)) {
				return;
			}
		}
		if(((el.type != 'textarea') && (el.type != 'text')) || this.checkCode(code)) {
			return;
		}
		this.sk = this.fcc(code);
		if(this.findIgnore(el)) {
			return;
		}
		if(!this.is_ie) {
			this.start(el, e);
		} else {
			this.start(el, this.sk);
		}
		if(this.changed) {
			this.changed = false;
			return false;
		}
		return true;
	}
	
	this.attachEvt = function(obj, evt, handle, capture) {
		if(this.is_ie) {
			obj.attachEvent("on" + evt, handle);
		} else {
			obj.addEventListener(evt, handle, capture);
		}
	}
	
	this.keyDownHandler = function(e) {
		AVIMInit(AVIMObj);
		if(e == "iframe") {
			this.frame = this.findF();
			var key = this.frame.event.keyCode;
		} else {
			var key = (!this.is_ie) ? e.which : window.event.keyCode;
		}
		if (key == 123) {
			if (e.ctrlKey) {
				if (AVIMGlobalConfig.onOff == 1) {
					AVIMGlobalConfig.method ++;
					if (AVIMGlobalConfig.method == 3) {
						AVIMGlobalConfig.onOff = 0;
					}
				}
				else {
					AVIMGlobalConfig.onOff = 1;
					AVIMGlobalConfig.method = 0;
				}
			}
			else {
				AVIMGlobalConfig.onOff = 1 - AVIMGlobalConfig.onOff;
			}
			
			AVIMObj.saveSettings();
			showAVIMstatus();			
		}
	}
}

function AVIMInit(AVIM) {
	if (AVIMInitDone == 1) return;
	AVIMObj.attachEvt(document, "keypress", function(e) {
		var a = AVIMObj.keyPressHandler(e);
		if (a == false) {
			if (AVIMObj.is_ie) window.event.returnValue = false;
			else e.preventDefault();
		}
	}, true);

	var kkk = false;
	if(AVIM.support && !AVIM.isKHTML) {
		if(AVIM.is_opera) {
			if(AVIM.operaVersion < 9) {
				return;
			}
		}
		for(AVIM.g = 0; AVIM.g < AVIM.fID.length; AVIM.g++) {
			if(AVIM.findIgnore(AVIM.fID[AVIM.g])) {
				continue;
			}
			if(AVIM.is_ie) {
				var doc;
				try {
					AVIM.frame = AVIM.fID[AVIM.g];
					if(typeof(AVIM.frame) != "undefined") {
						if(AVIM.frame.contentWindow.document) {
							doc = AVIM.frame.contentWindow.document;
						} else if(AVIM.frame.document) {
							doc = AVIM.frame.document;
						}
					}
				} catch(e) {}
				if(doc && ((AVIM.up(doc.designMode) == "ON") || doc.body.contentEditable)) {
					for (var l = 0; l < AVIM.attached.length; l++) {
						if (doc == AVIM.attached[l]) {
							kkk = true;
							break;
						}
					}
					if (!kkk) {
						AVIM.attached[AVIM.attached.length] = doc;
						AVIM.attachEvt(doc, "keydown", function() {
							AVIM.keyDownHandler("iframe");
						}, false);
						AVIM.attachEvt(doc, "keypress", function() {
							AVIM.FKeyPress();
							if(AVIM.changed) {
								AVIM.changed = false;
								return false;
							}
						}, false);
					}
				}
			} else {
				var iframedit;
				try {
					AVIM.wi = AVIM.fID[AVIM.g].contentWindow;
					iframedit = AVIM.wi.document;
					iframedit.wi = AVIM.wi;
					if(iframedit && (AVIM.up(iframedit.designMode) == "ON")) {
						iframedit.AVIM = AVIM;
						AVIM.attachEvt(iframedit, "keypress", AVIM.ifMoz, false);
						AVIM.attachEvt(iframedit, "keydown", AVIM.keyDownHandler, false);
					}
				} catch(e) {}
			}
		}
	}
	AVIMInitDone = 1;
}

function panelClick() {
	AVIMInit(AVIMObj);
	AVIMGlobalConfig.onOff = 1 - AVIMGlobalConfig.onOff;
	AVIMObj.saveSettings();
	showAVIMstatus();
}

AVIMObj = new AVIM();
AVIMObj.attachEvt(document, "keydown", AVIMObj.keyDownHandler, true);
