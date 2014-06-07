/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @package: Kokos oceny
* @authors: StarExterminator
*/

// ==UserScript==
// @name        Kokos oceny
// @namespace   StarExterminator
// @description Prywatne oceny PB dla kokosa
// @include     http*://kokos.pl/aukcje*
// @version     3.2
// @build       21
// ==/UserScript==

(function() {

// @name          GM_ApiBrowserCheck
// @author        GIJoe
// @license       http://creativecommons.org/licenses/by-nc-sa/3.0/

var gvar=function() {} // Global variables
function GM_ApiBrowserCheck() {
	const GMSTORAGE_PATH = 'GM_kokos_oceny_'; // You can change it to avoid conflict with others scripts
	if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
	if(typeof(GM_log)=='undefined') { GM_log=function(msg) { try { unsafeWindow.console.log('GM_log: '+msg); } catch(e) {} }; }
	GM_clog=function(msg) { if(arguments.callee.counter) { arguments.callee.counter++; } else { arguments.callee.counter=1; } GM_log('('+arguments.callee.counter+') '+msg); }
	GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
		var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
		var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
		if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
		return sel;
	}
	var needApiUpgrade=false;
	if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') {
		needApiUpgrade=true; gvar.isOpera=true; GM_log=window.opera.postError; GM_log('Opera detected...');
	}
	if(typeof(GM_setValue)!='undefined') {
		var gsv; try { gsv=GM_setValue.toString(); } catch(e) { gsv='staticArgs'; }
		if(gsv.indexOf('staticArgs')>0) { gvar.isGreaseMonkey=true; GM_log('GreaseMonkey Api detected...'); } // test GM_hitch
		else if(gsv.match(/not\s+supported/)) { needApiUpgrade=true; gvar.isBuggedChrome=true; GM_log('Bugged Chrome GM Api detected...'); }
	} else { needApiUpgrade=true; GM_log('No GM Api detected...'); }

	if(needApiUpgrade) {
		GM_log('Try to recreate needed GM Api...');
		var ws=null; try { ws=typeof(unsafeWindow.localStorage); unsafeWindow.localStorage.length; } catch(e) { ws=null; } // Catch Security error
		if(ws=='object') {
			GM_log('Using localStorage for GM Api.');
			GM_getValue=function(name,defValue) { var value=unsafeWindow.localStorage.getItem(GMSTORAGE_PATH+name); if(value==null) { return defValue; } else { switch(value.substr(0,2)) { case 'S]': return value.substr(2); case 'N]': return parseInt(value.substr(2)); case 'B]': return value.substr(2)=='true'; } } return value; }
			GM_setValue=function(name,value) { switch (typeof(value)) { case 'string': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'S]'+value); break; case 'number': if(value.toString().indexOf('.')<0) { unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'N]'+value); } break; case 'boolean': unsafeWindow.localStorage.setItem(GMSTORAGE_PATH+name,'B]'+value); break; } }
			GM_deleteValue=function(name) { unsafeWindow.localStorage.removeItem(GMSTORAGE_PATH+name); }
		} else if(!gvar.isOpera || typeof(GM_setValue)=='undefined') {
			GM_log('Using temporarilyStorage for GM Api.'); gvar.temporarilyStorage=new Array();
			GM_getValue=function(name,defValue) { if(typeof(gvar.temporarilyStorage[GMSTORAGE_PATH+name])=='undefined') { return defValue; } else { return gvar.temporarilyStorage[GMSTORAGE_PATH+name]; } }
			GM_setValue=function(name,value) { switch (typeof(value)) { case "string": case "boolean": case "number": gvar.temporarilyStorage[GMSTORAGE_PATH+name]=value; } }
			GM_deleteValue=function(name) { delete gvar.temporarilyStorage[GMSTORAGE_PATH+name]; };
		}
		if(typeof(GM_openInTab)=='undefined') { GM_openInTab=function(url) { unsafeWindow.open(url,""); } }
		if(typeof(GM_registerMenuCommand)=='undefined') { GM_registerMenuCommand=function(name,cmd) { GM_log("Notice: GM_registerMenuCommand is not supported."); } } // Dummy
		if(!gvar.isOpera || typeof(GM_xmlhttpRequest)=='undefined') {
			GM_log('Using XMLHttpRequest for GM Api.');
			GM_xmlhttpRequest=function(obj) {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
	} } }
}
GM_ApiBrowserCheck();

/*
* A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
* Digest Algorithm, as defined in RFC 1321.
* Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
* Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
* Distributed under the BSD License
* See http://pajhome.org.uk/crypt/md5 for more info.
*/

/*
* Configurable variables. You may need to tweak these to be compatible with
* the server-side, but the defaults work in most cases.
*/
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
* These are the functions you'll usually want to call
* They take string arguments and return either hex or base-64 encoded strings
*/
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
* Perform a simple self-test to see if the VM is working
*/
function md5_vm_test()
{
	return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
* Calculate the MD5 of an array of little-endian words, and a bit length
*/
function core_md5(x, len)
{
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a =  1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =  271733878;

	for(var i = 0; i < x.length; i += 16)
	{
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

		a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
		b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
		b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}
	return Array(a, b, c, d);

}

/*
* These functions implement the four basic operations the algorithm uses.
*/
function md5_cmn(q, a, b, x, s, t)
{
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
* Calculate the HMAC-MD5, of a key and some data
*/
function core_hmac_md5(key, data)
{
	var bkey = str2binl(key);
	if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

	var ipad = Array(16), opad = Array(16);
	for(var i = 0; i < 16; i++)
	{
		ipad[i] = bkey[i] ^ 0x36363636;
		opad[i] = bkey[i] ^ 0x5C5C5C5C;
	}

	var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
	return core_md5(opad.concat(hash), 512 + 128);
}

/*
* Add integers, wrapping at 2^32. This uses 16-bit operations internally
* to work around bugs in some JS interpreters.
*/
function safe_add(x, y)
{
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
* Bitwise rotate a 32-bit number to the left.
*/
function bit_rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt));
}

/*
* Convert a string to an array of little-endian words
* If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
*/
function str2binl(str)
{
	var bin = Array();
	var mask = (1 << chrsz) - 1;
	for(var i = 0; i < str.length * chrsz; i += chrsz)
		bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
	return bin;
}

/*
* Convert an array of little-endian words to a string
*/
function binl2str(bin)
{
	var str = "";
	var mask = (1 << chrsz) - 1;
	for(var i = 0; i < bin.length * 32; i += chrsz)
		str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
	return str;
}

/*
* Convert an array of little-endian words to a hex string.
*/
function binl2hex(binarray)
{
	var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
	var str = "";
	for(var i = 0; i < binarray.length * 4; i++)
	{
		str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
					hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
	}
	return str;
}

/*
* Convert an array of little-endian words to a base-64 string
*/
function binl2b64(binarray)
{
	var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	var str = "";
	for(var i = 0; i < binarray.length * 4; i += 3)
	{
		var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
								| (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
								|  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
		for(var j = 0; j < 4; j++)
		{
			if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
			else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
		}
	}
	return str;
}

// jso
function jso_gI(a,b){
	b=b||document;
	return b.getElementById(a)
}
function jso_gT(a,b,i){
	b=b||document;
	b=b.getElementsByTagName(a)
	a=[]
	for(i=0;i<b.length;i++)a[a.length]=b[i];
	return a
}
function jso_gAV(a,b,c,d,i){
	a=a||"*";
	b=b||document;
	if(!c)return false;
	b=b.getElementsByTagName(a)
	a=[]
	for(i=0;i<b.length;i++)if(b[i][c]&&(!d||(b[i][c].match(new RegExp("(^| )"+d+"($| )","gi"))!=null)))a[a.length]=b[i];;
	return a
}
function jso_cE(a,b,c,d,e,i){
	a=document.createElement(a)
	if(b)for(i in b)a[i]=b[i];;
	if(c)for(i in c)if(typeof c[i] != "function")a.appendChild(c[i].nodeType?c[i]:document.createTextNode(c[i]));;
	if(e)for(i in e)jso_aE(a,i,e[i]);;
	if(d)d.appendChild(a);
	return a
}
function jso_gE(x){
	x=x||window.event;
	x=x.target||x.srcElement;
	if(x.nodeType==3)x=x.parentNode;
	return x
}
function jso_aE(O,E,F){
	return(O.x=O.addEventListener)?O.x(E,F,0):(O.x=O.attachEvent)?O.x("on"+E,F):!1;
}
function jso_rE(O,E,F){
	return(O.x=O.removeEventListener)?O.x(E,F,0):(O.x=O.detachEvent)?O.x("on"+E,F):!1;
}
function jso_sE(e){
	e = e||event
	if(e.preventDefault)
		e.preventDefault();
	e.returnValue=false
	return false
}
// Główna funkcja
function kb()
{
	var T = this;
	this.settings = {};

	if(!this.getHash())
	{
		return;
	}
	this.id = this.getID(document.location.href);
	if(this.id)
	{
		// Widok aukcji

		this.domConteiner = jso_cE("div",{className:"kb_main"},
		[
			this.domConteinerLeft = jso_cE("div",{className:"kb_main_col kb_col"}),
			this.domConteinerRight = jso_cE("div",{className:"kb_main_col kb_col"})
		]);
		this.grade = new this.gradeStars(this.domConteinerLeft,this,this.id,0);
		this.note = new this.noteForm(this.domConteinerLeft,this,this.id,"");
		this.other = new this.otherForm(this.domConteinerLeft,this,this.id,false,false);
		this.seed = new this.seedList(this.domConteinerRight,this,false);
		this.list = new this.listAll(this.domConteinerRight,this);
		this.settingsForm = new this.settingsEdit(this.domConteinerRight,this);
		this.group = new this.groupAdmin(this.domConteinerRight,this);
		this.csv = new this.csvSupport(this.domConteinerRight,this);
		this.getAuction();
		var domElement = jso_gI("dane_pozyczkobiorcy");
		if(!domElement)
		{
			domElement = jso_gAV("div",jso_gI("aukcja_pozyczkobiorca"),"className","box2_content")[1].firstChild;
		}
		if(domElement)
		{
			domElement.parentNode.insertBefore(this.domConteiner, domElement);
		}
	}
	else
	{
		// Widok listy aukcji
		this.multi = {}
		this.items = {}
		var domTable = jso_gI("aukcje_lista_glowna"),i=1,row,id,ids=[];
		if(domTable)
		{
			for(;i<domTable.rows.length;i++)
			{
				row = domTable.rows[i];
				id = jso_gAV("a",row,"className","link_aukcja")[0];
				if(id)
				{
					id = this.getID(id.href)
					this.items[id] = row;
					ids.push(id);
				}
			}
			this.request
			(
				{
					data:"action=multi&auctions="+ids.join(","),
					onload:function(ajax)
					{
						T.parseMulti.call(T,ajax.responseText);
					}
				}
			)
		}
	}
}
// Adres serwera
if(GM_getValue("secure",false))
{
	kb.prototype.server = "https://starexterminator.rootnode.net/";
}
else
{
	kb.prototype.server = "http://starexterminator.rootnode.net/";
}
// nagłówki
kb.prototype.headers = {
	"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
	"User-Agent": "Prywatne oceny PB dla kokosa wersja 3.2",
	"Origin": "https://kokos.pl"
};
kb.prototype.images =
{
	star_empty:"/standard/star_empty_small.gif",
	star_red:"/standard/star_red_small.gif",
	star_green:"/standard/star_full_small.gif",
	header:"data:image/gif;base64,R0lGODlh2gA5AOfHABwzAB00AB41AB42AB83AiA3AyE4BCI5BSM6BiM7ByQ8CCY+Cic/CypABStBBixCBy1DCC1ECS5FCi9GCzFHDTNJDzRKEDVLETZMEjdNEzhOFDpQFjpRFztSGD1TGT9VG0BWHEFXHUNYF0RZGEVaGUZbGkdcG0hdHEleHUpfHktgH0xhIE1iIU5jIU9jIlBkI1FlJFJmJVNnJlRoJ1VpKFVqKVZrKldsK1htLFluLVpvLVtwLlxxL19yKmBzK15zMWF0LGJ1LWN2LmR3L2V4L2Z5MGd6MWh7Mml8M2t+NWx/Nm+COXCDOnKFPHOGPXSHPnWIP3aJQHeKQHiLQXmMQnqNQ3uORH2PP36QQH+RQXuTQoGSQnyUQ4OURH+XRYWWRoaXR4eYSIiZSYucS4ydTI2eTYigTYmhToqiT4ujUIykUY2lUpOlU4+nVJCoVZGpVpSqUZmqWJasU5iuVaCvV5qxV6GwWJyzWZ20Wp61W5+2XKG3XaK4XqO5X6S6YKW7Yaa8Yqe9Y6i+ZKnAZbC/ZqrBZrHAZ63CYKvCZ7PBYbLBaLDBbq7DYazDaLXCYrHEW7PCaa/EYq7EabbDY7TDarDFY6/FarfEZLPGXbHGZLDGa7XFa7TFcbLHZbHHbLbGbLXIX7PIZrrGev++AP+/APvBAP/AALvKcLrLd/7DAL3QZ7zPgb/ShMnXkMzYi8vbmtLco9fiqNjmsuDpvN/vreHsxubxtuzvyu/yuuz1tOr1u+j1wev2vOn2wu701e33ve72yev5xPH32PT9vPb/5vz/+/7//P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAP8ALAAAAADaADkAAAj+AP/9IwbM1rBcvxIqXMiwocOHECNKnEixosWLGDNK7JWwF0eGHxsG+6WrFzBhxAQOpNVKVChFizZd2kSzps2bOHPq3Mmzp8+fQIMKHUpU56VMSDNVWpqpU6dMlmROmkpJEaVP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",
	minus:"data:image/gif;base64,R0lGODlhDwAPAIQQAAABAMQAAEEpAB00AMwAAtAAAG0eAN4BALUOAPIAAOoEAixFGExhOF1tSqaxn9Tb0P///////////////////////////////////////////////////////////////yH5BAEKABAALAAAAAAPAA8AAAVnICRCTrMMS+OM48MMBnIgxsA87SIESd8HggUOwhAcfMiDgEEa8JDIwKBkgFoNJkRCUSB4vQVFAnE6HgDoNMCM0nK/YDG5UbUisQ6n/TclGu1KTBAPOk8+QEItLzEzNTcsIiUnKSsjIQA7",
	plus:"data:image/gif;base64,R0lGODlhDwAPAIQQAB0zACxFGDROAkxhOE9sBV1tSn6bAYOfAIepB5CxAJa2AJ28BKaxn6LHAKjMANTb0P///////////////////////////////////////////////////////////////yH5BAEKABAALAAAAAAPAA8AAAV5ICRCTBEAQcGM4zMAxLEcBDA8bSAgTt8jggAOMhAseo1Fo7cQDEgAXk8BUPgQgBLB50gAElyC6eBoKBIGgCGhWB5OxwVgTq865AGyGa1mu1NbPl4JSz1iDFE+VFY/WURGSG1MTiIPOlJXQUMQLjAyNDabIyUnKSsjIQA7",
	up:"data:image/gif;base64,R0lGODlhBQADAIABAAAAAP///yH5BAEKAAEALAAAAAAFAAMAAAIFTGAHuF0AOw==",
	down:"data:image/gif;base64,R0lGODlhBQADAIABAAAAAP///yH5BAEKAAEALAAAAAAFAAMAAAIFhB0XC1sAOw==",
	note:"data:image/gif;base64,R0lGODlhBQAYAIABAKjKBP///ywAAAAABQAYAAACGgx+Fgpr6FaTzE2U4pR4R5tsGTOCEIUqHFIAADs=",
	minus_disabled:"data:image/gif;base64,R0lGODlhDwAPAOMIAHV3dJOHdoSMdcp3d6SEeNt2d5KbisXJwv///////////////////////////////yH5BAEKAAgALAAAAAAPAA8AAARPEEl0jBH2zFkFGcVAYJpUBWChhoFRGsEqqy0lpLM6CBWRzwRLakAsDi8rgHIJWGGGRqLO4vutgoebNcRDwLY1Cgyna5XEHpCItDFZMK5NBAA7"
}
kb.prototype.requests = 0;
kb.prototype.request = function(params)
{
	var T = this,params = params;
	this.requests++;
	this.wait.call(T);
	params.method = "POST";
	params.url = this.server;
	params.headers = this.headers;
	params.data += "&hash="+this.hash;
	if(params.onload)
	{
		var ONLOAD = params.onload;
	}
	params.onload = function(ajax)
	{
		T.requests--;
		T.wait.call(T);
		if(ONLOAD)
		{
			ONLOAD(ajax);
		}
	}
	params.onerror = function()
	{
		T.requests--;
		T.wait.call(T);
	}
	GM_xmlhttpRequest(params);
}
kb.prototype.wait = function()
{
	if(this.requests <= 0)
	{
		jso_gT("html")[0].className = "";
	}
	else
	{
		jso_gT("html")[0].className = "kb_wait";
	}
}
// Zwraca (i tworzy) identyfikator użytkownika
kb.prototype.getHash = function()
{
	this.hash = GM_getValue("hash","");
	if(this.hash)
	{
		return true;
	}
	else
	{
		var domTmp = jso_gI("top_up_logged");
		if(domTmp)
		{
			domTmp = jso_gT("p",domTmp)[0]
			if(domTmp && domTmp.firstChild)
			{
				this.hash = /[^	 ]+@[^ 	]+/.exec(domTmp.firstChild.nodeValue)[0];
			}
		}
		if(this.hash)
		{
			var password = window.prompt("Podaj hasło-śmietek poprawiający bezpieczeństwo:");
			if(password !== null)
			{
				this.hash = hex_md5(this.hash+password);
				GM_setValue("hash",this.hash);
				return true;
			}
		}
	}
	return false;
}
// Wydobywa id aukcji ze stringa
kb.prototype.getID = function(text)
{
	var id = /id=([0-9]+)/.exec(text);
	return id ? id[1] : false;
}
// Parsuje wynik zapytania AJAX/JSON
kb.prototype.parseResponse = function(text)
{
	var o = eval("("+text+")");
	if(o.error)
	{
		alert(o.error);
	}
	/*
	if(o.info)
	{
		alert(o.info);
	}
	*/
	if(o.settings)
	{
		this.settings = o.settings;
	}
	return o;
}
// Obsługa listy aukcji
kb.prototype.parseMulti = function(text)
{
	var id,domRowTop,domRowBottom,domCeil,login,domTop;
	this.multi = this.parseResponse(text).multi || {};
	for(id in this.items)
	{
		domRowTop = this.items[id];
// 		login = domRowTop.cells[10] ? true : false;
		domRowTop.className += " kb_row";
		if(!this.multi[id])
		{
			this.multi[id] = {}
		}
		domRowBottom = jso_cE("tr",{className:domRowTop.className+"_kb"});
		domCeil = jso_cE("td",{colSpan:6,className:"kb_ceil"},0,domRowBottom);
		domTop = jso_cE("div",{className:"kb_ceil_top"},0,domCeil)
		new this.noteForm(domCeil,this,id,this.multi[id].note);
		new this.gradeStars(domTop,this,id,this.multi[id].grade);
		if(this.settings.seed && this.multi[id].seed)
		{
			new this.seedList(domTop,this,this.multi[id].seed)
			domTop.className += " kb_ceil_seed"
		}
		// jso_cE("p",0,[this.multi[id].note || ""],domCeil);
		domRowTop.cells[0].rowSpan=2
		domRowTop.cells[1].rowSpan=2
		domRowTop.cells[2].rowSpan=2
		domRowTop.cells[9].rowSpan=2
		domRowTop.cells[10].rowSpan=2
		if(domRowTop.nextSibling)
		{
			domRowTop.parentNode.insertBefore(domRowBottom,domRowTop.nextSibling)
		}
		else
		{
			domRowTop.parentNode.appendChild(domRowBottom)
		}
	}
}
// Pobierz dane pojedyńczej aukcji
kb.prototype.getAuction = function()
{
	var T = this;
	this.request
	(
		{
			data:"action=check&auction_id="+this.id,
			onload:function(ajax)
			{
				T.update.call(T,T.parseResponse.call(T,ajax.responseText))
			}
		}
	)
}
// Aktualizuje obiekty
kb.prototype.update = function(o)
{
	if(this.grade && o.grade !== undefined)
	{
		this.grade.generate.call(this.grade,o.grade)
	}
	if(this.other && o.share !== undefined && o.send !== undefined)
	{
		this.other.generate.call(this.other,o.share,o.send)
	}
	if(this.note && o.note !== undefined)
	{
		this.note.generate.call(this.note,o.note)
	}
	if(this.seed && o.seed !== undefined)
	{
		this.seed.generate.call(this.seed,o.seed)
	}
	if(this.settingsForm)
	{
		this.settingsForm.generate.call(this.settingsForm)
	}
	if(this.group)
	{
		this.group.generate.call(this.group)
	}
	if(this.list.domRSS)
	{
		this.list.domRSS.href = this.server+"?action=rss&hash="+this.settings.rss_hash
	}
	if(this.list.domTable)
	{
		this.list.update.call(this.list)
	}
}
// Obsługa gwiazdek
kb.prototype.gradeStars = function(domConteiner,kb,id,grade)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.id = id;
	this.stars = [];
	this.generate(grade);
}
// Generowanie gwiazdek
kb.prototype.gradeStars.prototype.generate = function(value)
{
	var T = this,i = 1;
	this.grade = isNaN(value * 1) ? 0 : value * 1;
	if(this.domGrade)
	{
		for(;i<=5;i++)
		{
			this.stars[i].src = this.getSRC(i);
		}
	}
	else
	{
		this.domGrade = jso_cE("p",{className:"kb_gradestars"},0,this.domConteiner)
		jso_cE("b",0,[jso_cE("img",{src:this.kb.images.minus,title:"Zmniejsz ranking PB"})],this.domGrade,{click:function(){T.update.call(T,-1)}})
		for(;i<=5;i++)
		{
			this.stars[i] = jso_cE("img",{src:this.getSRC(i)},0,this.domGrade);
		}
		jso_cE("b",0,[jso_cE("img",{src:this.kb.images.plus,title:"Zwiększ ranking PB"})],this.domGrade,{click:function(){T.update.call(T,1)}})
	}
}
// Aktualizacja gwiazdek
kb.prototype.gradeStars.prototype.update = function(value)
{
	if((this.grade + value) < 6 && (this.grade + value) > -6 )
	{
		var T = this,note = "";
		if(this.kb.note && this.kb.note.parseNote)
		{
			note = "&note=" + this.kb.note.parseNote(this.kb.note.domTextarea.value);
		}
		this.kb.request.call
		(
			this.kb,
			{
				data:"action=update&auction_id="+this.id+"&grade="+(this.grade+value)+note,
				onload:function(ajax)
				{
					if(T.kb.grade)
					{
						T.kb.update.call(T.kb,T.kb.parseResponse.call(T.kb,ajax.responseText))
					}
					else
					{
						T.generate.call(T,T.kb.parseResponse.call(T.kb,ajax.responseText).grade);
					}
				}
			}
		)
	}
}
// Wybiera odpowiedni src
kb.prototype.gradeStars.prototype.getSRC = function(i)
{
	return Math.abs(this.grade) < i ? this.kb.images.star_empty : (this.grade < 0 ? this.kb.images.star_red : this.kb.images.star_green);
}
// Obsługa notatek
kb.prototype.noteForm = function(domConteiner,kb,id,note)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.id = id;
	this.generate(note);
}
// Generowanie formularza edycji notki
kb.prototype.noteForm.prototype.generate = function(value)
{
	this.note = value || "";
	if(this.domNote)
	{
		this.domTextarea.value = this.note;
	}
	else
	{
		var T = this;
		this.domNote = jso_cE("p",{className:"kb_noteform"},
		[
			jso_cE("label",0,
			[
				jso_cE("span",0,["Notka (max 255 znaków):"]),
				(this.domTextarea = jso_cE("textarea",0,[this.note]))
			]),
			jso_cE("input",{type:"button",value:"ZAPISZ"},0,0,{click:function(){T.update.call(T,T.domTextarea.value)}})
		],this.domConteiner)
	}
}
// usuwa śmietki
kb.prototype.noteForm.prototype.parseNote = function(value)
{
	return value.replace(/\n/gi," ").replace(/ {2,99}/gi," ").replace(/%/g,"%25").replace(/&/g,"%26");
}
// Aktualizacja notki
kb.prototype.noteForm.prototype.update = function(value)
{
	var T = this;
	this.kb.request.call
	(
		this.kb,
		{
			data:"action=update&auction_id="+this.id+"&note="+this.parseNote(value),
			onload:function(ajax)
			{
				if(T.kb.note)
				{
					T.kb.update.call(T.kb,T.kb.parseResponse.call(T.kb,ajax.responseText));
				}
				else
				{
					T.generate.call(T,T.kb.parseResponse.call(T.kb,ajax.responseText).note);
				}
			}
		}
	)
}
// Obsługa udostępniania i powiadomień
kb.prototype.otherForm = function(domConteiner,kb,id,note,share,send)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.id = id;
	this.generate(share,send);
}
// Generowanie formularza edycji
kb.prototype.otherForm.prototype.generate = function(share,send)
{
	this.share = share*1;
	this.send = send*1;
	var T = this;
	var domOther = jso_cE("p",{className:"kb_other"},[
			(
				this.domShareLabel = jso_cE("label",0,[
					"Puliczna:",
					(this.domShare = jso_cE("input",{type:"checkbox",checked:this.share?"checked":""},0,0,{click:function(e){T.update.call(T,"share")}}))
				])
			),
			(
				this.domSendLabel = jso_cE("label",0,[
					"Powiadom:",
					(this.domSend = jso_cE("input",{type:"checkbox",checked:this.send?"checked":""},0,0,{click:function(e){T.update.call(T,"send")}}))
				])
			)
		]
	);
	if(this.kb.settings.share != "some" && this.kb.settings.share != "some_group")
	{
		this.domShareLabel.style.display = "none";
	}
	if(this.kb.settings.send != "some")
	{
		this.domSendLabel.style.display = "none";
	}
	if(this.kb.settings.share != "some" && this.kb.settings.share != "some_group" && this.kb.settings.send != "some")
	{
		domOther.style.display = "none";
	}
	if(this.domOther)
	{
		this.domConteiner.replaceChild(domOther,this.domOther);
	}
	else
	{
		this.domConteiner.appendChild(domOther);
	}
	this.domOther = domOther;
}
// Aktualizacja wpisu
kb.prototype.otherForm.prototype.update = function(action)
{
	var T = this;
	this.kb.request.call
	(
		this.kb,
		{
			data:"action=update&auction_id="+this.id+"&"+action+"="+(this["dom"+action.slice(0,1).toUpperCase()+action.slice(1)].checked?"1":"0"),
			onload:function(ajax)
			{
				T.kb.update.call(T.kb,T.kb.parseResponse.call(T.kb,ajax.responseText));
			}
		}
	)
}
// Obsługa udostępnionych ocen
kb.prototype.seedList = function(domConteiner,kb,list)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.domSeed = jso_cE("div",{className:"kb_seed"},0,this.domConteiner);
	this.domSeed.style.display = "none";
	if(list)
	{
		this.generate(list);
	}
}
kb.prototype.seedList.prototype.generate = function(list)
{
	this.list = list;
	if(this.list && this.list.length > 0 && this.kb.settings.seed)
	{
		var T = this,domList = jso_cE("ul"),i=0,suma=0;
		for(;i<this.list.length;i++)
		{
			jso_cE("li",0,[
				(this.list[i].group_nick?jso_cE("strong",0,["["+this.list[i].group_nick+"]"]):""),
				jso_cE("strong",0,["["+this.list[i].grade+"]"]),
				": ",
				(this.list[i].note||"brak notki")
			],domList);
			suma += this.list[i].grade*1;
		}
		var domP = jso_cE("p",0,[
			jso_cE("b",0,["OCENY INNYCH"],0,{click:function(){T.domList.style.display = T.domList.style.display?"":"none"}}),
			" ( suma: ",
			jso_cE("strong",0,[this.list.length+""]),
			", śr.: ",
			jso_cE("strong",0,[(Math.round(suma/this.list.length*10)/10)+""]),
			" )"
		]);
		if(this.domP)
		{
			this.domSeed.replaceChild(domP,this.domP);
		}
		else
		{
			this.domSeed.appendChild(domP);
		}
		this.domP = domP;
		if(this.domList)
		{
			domList.style.display = this.domList.style.display;
			this.domSeed.replaceChild(domList,this.domList);
		}
		else
		{
			domList.style.display = "none";
			this.domSeed.appendChild(domList);
		}
		this.domList = domList;
		this.domSeed.style.display = "";
	}
	else
	{
		this.domSeed.style.display = "none";
	}
}
// Obsługa CSV
kb.prototype.csvSupport = function(domConteiner,kb)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.submit = false;
	var T = this;
	this.domCSV = jso_cE("div",{className:"kb_csvsupport"},[
		jso_cE("p",0,
		[
			"CSV: ",
			jso_cE("a",{href:this.kb.server+"?action=csv_list&hash="+this.kb.hash},["POBIERZ"]),
			", ",
			jso_cE("b",0,["WYŚLIJ"],0,{click:function(){T.domForm.style.display = T.domForm.style.display?"":"none"}}),
		])
	],this.domConteiner)
	this.domForm = jso_cE
	(
		"form",
		{
			action:this.kb.server,
			method:"post",
			target:"kb_iframe",
			enctype:"multipart/form-data"
		},
		[
			jso_cE("iframe",{width:0,height:0,name:"kb_iframe",id:"kb_iframe",src:"about:blanc"},0,0,{load:function(){T.kb.getAuction.call(T.kb)}}),
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Plik CSV (NickPB;Notka;Rating):",
					jso_cE("input",{type:"file",name:"csv",size:11})
				])
			]),
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Aktualizuj notki:",
					jso_cE("input",{type:"checkbox",name:"notes"})
				])
			]),
			jso_cE("p",0,[
				jso_cE("input",{type:"submit",value:"WYŚLIJ"}),
				jso_cE("input",{type:"hidden",name:"action",value:"csv"}),
				jso_cE("input",{type:"hidden",name:"hash",value:this.kb.hash})
			])
		],
		this.domCSV
	);
	this.domForm.style.display = "none";
}
// edycja ustawień
kb.prototype.settingsEdit = function(domConteiner,kb)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.remove = false;
	var T = this;
	this.domSettings = jso_cE("div",{className:"kb_settings"},[jso_cE("p",0,
	[
		"USTAWIENIA: ",
		jso_cE("b",0,["EDYCJA"],0,{click:function(){T.domForm.style.display = T.domForm.style.display?"":"none"}}),
	])],this.domConteiner)
	this.domForm = jso_cE
	(
		"form",
		{
			action:"javascript:return false;",
			method:"post"
		},
		[
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Udostępnianie ocen:",
					this.domShare = jso_cE("select",0,[
						jso_cE("option",{value:"none"},["Niczego nie udostępniaj"]),
						jso_cE("option",{value:"some"},["Wybrane oceny"]),
						jso_cE("option",{value:"all"},["Wszystkie oceny"]),
						jso_cE("option",{value:"some_group"},["Wybrane oceny członkom grupy"]),
						jso_cE("option",{value:"all_group"},["Wszystkie oceny członkom grupy"])
					])
				])
			]),
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Wyświetlanie udostępnionych ocen:",
					this.domSeed = jso_cE("select",0,[
						jso_cE("option",{value:"none"},["Nie wyświetlaj"]),
						jso_cE("option",{value:"all"},["Wyświetlaj wszyskie"]),
						jso_cE("option",{value:"group"},["Tylko oceny członków grupy"])
					])
				])
			]),
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Powiadomienia o nowych aukcjach:",
					this.domSend = jso_cE("select",0,[
						jso_cE("option",{value:"none"},["Brak powiadomień"]),
						jso_cE("option",{value:"some"},["Wybranych ręcznie"]),
						jso_cE("option",{value:"-5"},["Wszystkich"]),
						jso_cE("option",{value:"5"},["Od +5 gwiazdek"]),
						jso_cE("option",{value:"4"},["Od +4 gwiazdek"]),
						jso_cE("option",{value:"3"},["Od +3 gwiazdek"]),
						jso_cE("option",{value:"2"},["Od +2 gwiazdek"]),
						jso_cE("option",{value:"1"},["Od +1 gwiazdek"]),
						jso_cE("option",{value:"0"},["Od 0 gwiazdek"]),
						jso_cE("option",{value:"-1"},["Od -1 gwiazdek"]),
						jso_cE("option",{value:"-2"},["Od -2 gwiazdek"]),
						jso_cE("option",{value:"-3"},["Od -3 gwiazdek"]),
						jso_cE("option",{value:"-4"},["Od -4 gwiazdek"])
					])
				])
			]),
			jso_cE("p",0,
			[
				jso_cE("label",0,[
					"Adres e-mail:",
					this.domEmail = jso_cE("input",{type:"text",size:20},0,0,{focus:function(e){e=jso_gE(e);if(e.value!==undefined){if(e.value==T.status[T.kb.settings.email]){e.value="";}}}})
				])
			]),
			jso_cE("p",0,[jso_cE("label",0,["Grupa inwestorów:",this.domGroup = jso_cE("input",{type:"text",size:20})])]),
			jso_cE("p",0,[jso_cE("label",0,["Nick w grupie:",this.domGroupNick = jso_cE("input",{type:"text",size:20})])]),
			jso_cE("p",0,[jso_cE("label",0,["Używaj protokołu HTTPS:",this.domHTTPS = jso_cE("input",{type:"checkbox"})])]),
			jso_cE("p",0,[jso_cE("label",0,["Usuń moje konto:",this.domDelete = jso_cE("input",{type:"checkbox"})])]),
			jso_cE("p",0,[jso_cE("input",{type:"submit",value:"ZMIEŃ"})])
		],
		this.domSettings,
		{submit:function(e){jso_sE(e);T.update.call(T);return false;}}
	);
	this.domForm.style.display = "none";
	this.generate();
}
kb.prototype.settingsEdit.prototype.status = {on:'AKTYWNY',off:'NIEAKTYWNY',none:'BRAK'}
kb.prototype.settingsEdit.prototype.generate = function()
{
	var selects = {domShare:'share',domSeed:'seed',domSend:'send'},i,j,domElement;
	for(i in selects)
	{
		for(j=0;j<this[i].options.length;j++)
		{
			domElement = this[i].options[j]
			domElement.selected = domElement.value == this.kb.settings[selects[i]] ? "selected" : "";
		}
	}
	this.domGroup.value = this.kb.settings.group_name;
	this.domGroupNick.value = this.kb.settings.group_nick;
	this.domEmail.value = this.status[this.kb.settings.email];
	this.domHTTPS.checked = GM_getValue("secure",false)?"checked":"";
	this.domDelete.checked = "";
}
kb.prototype.settingsEdit.prototype.update = function()
{
	var T = this,settings = [],selects = {domShare:'share',domSeed:'seed',domSend:'send'},i;
	GM_setValue("secure",(this.domHTTPS.checked?true:false));
	if(this.domDelete.checked && window.confirm("Czy na pewno chcesz usunąć swoje konto?\n"))
	{
		settings.push("remove=1");
		this.remove = true;
	}
	if(this.domGroup.value != this.kb.settings.group_name)
	{
		settings.push("group_name="+this.domGroup.value);
	}
	if(this.domGroupNick.value != this.kb.settings.group_nick)
	{
		settings.push("group_nick="+this.domGroupNick.value);
	}
	if(this.domEmail.value.match(/^[ 	]*$/gi))
	{
		if(this.kb.settings.email != "none" && window.confirm("Czy checsz usunąc " + this.status[this.kb.settings.email] + " adres e-mail?"))
		{
			settings.push("email=");
		}
	}
	else if(this.domEmail.value != this.status[this.kb.settings.email])
	{
		this.domEmail.value = this.domEmail.value.replace(/([ 	]*)/gi,"");
		if(this.domEmail.value.match(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/))
		{
			settings.push("email="+this.domEmail.value);
		}
		else
		{
			var email = window.prompt("Podany adres e-mail jest nieprawidłowy!\nPopraw go lub anuluj zmiany?",this.domEmail.value);
			if(email !== null)
			{
				this.domEmail.value = email;
				this.update();
			}
			return;
		}
	}
	for(i in selects)
	{
		if(this.kb.settings[selects[i]] != this[i].options[this[i].selectedIndex].value)
		{
			settings.push(selects[i]+"="+this[i].options[this[i].selectedIndex].value);
		}
	}
	if(settings.length)
	{
		this.kb.request.call
		(
			this.kb,
			{
				data:"action=settings&"+settings.join("&"),
				onload:function(ajax)
				{
					if(T.remove)
					{
						GM_deleteValue("hash");
						unsafeWindow.location.reload(true);
						return;
					}
					T.kb.getAuction.call(T.kb);
				}
			}
		)
	}
}
// Zarządzanie grupą
kb.prototype.groupAdmin = function(domConteiner,kb)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	var T = this;
	this.active = false;
	this.group_active = false;
	this.group_admin = false;
	this.list = [];
	this.domGroup = jso_cE("div",{className:"kb_list"},[jso_cE("p",0,[
		"GRUPA: ",
		(this.domButtonList = jso_cE("b",0,["CZŁONKOWIE"],0,{click:function(){T.show.call(T,"List")}})),
		", ",
		(this.domButtonName = jso_cE("b",0,["NAZWA"],0,{click:function(){T.show.call(T,"Name")}}))
	])],this.domConteiner);
	this.domGroup.style.display = "none";
}
kb.prototype.groupAdmin.prototype.readSettings = function()
{
	this.group_active = this.kb.settings.group_active * 1;
	this.group_admin = this.kb.settings.group_admin * 1;
}
kb.prototype.groupAdmin.prototype.show = function(active)
{
	if(this.active && this["dom"+this.active])
	{
		this["dom"+this.active].style.display = "none";
	}
	if(this.active != active)
	{
		this.active = active;
		if(this["dom"+this.active])
		{
			this["dom"+this.active].style.display = "";
		}
		else
		{
			this["update"+this.active]();
		}
	}
	else
	{
		this.active = false;
	}
}
kb.prototype.groupAdmin.prototype.generate = function()
{
	this.readSettings();
	if(this.group_active && this.kb.settings.group_name)
	{
		this.domButtonName.style.display = this.group_admin?"":"none";
		this.domGroup.style.display = "";
		if(this.domList)
		{
			this.updateList();
		}
		if(this.domName)
		{
			this.updateName();
		}
	}
	else
	{
		this.domGroup.style.display = "none";
	}
}
kb.prototype.groupAdmin.prototype.updateName = function()
{
	this.readSettings();
	if(this.group_admin)
	{
		this.generateName();
		this.domNameInput.value = this.kb.settings.group_name;
	}
}
kb.prototype.groupAdmin.prototype.generateName = function()
{
	if(!this.domName)
	{
		var T = this;
		this.domName = jso_cE("form",{action:"javascript:return false;",method:"post"},[
			jso_cE("p",0,[
				jso_cE("label",0,[
					"Nazwa grupy:",
					(this.domNameInput = jso_cE("input",{type:"text"}))
				]),
				jso_cE("input",{type:"button",value:"ZAPISZ"},0,0,{click:function(){if(T.group_admin){T.edit.call(T,"name",T.domNameInput.value)}}})
			])
		],this.domGroup)
	}
	this.domName.style.display = (this.active == "Name"?"":"none");
}
kb.prototype.groupAdmin.prototype.updateList = function()
{
	if(!this.ajax)
	{
		var T = this;
		this.ajax = true;
		this.kb.request.call
		(
			this.kb,
			{
				data:"action=group&list=1",
				onload:function(ajax)
				{
					T.ajax = false;
					T.generateList.call(T,T.kb.parseResponse.call(T.kb,ajax.responseText).members);
				}
			}
		)
	}
}
kb.prototype.groupAdmin.prototype.generateList = function(list)
{
	this.list = list || [];
	this.readSettings();
	var T=this,i=0,pb,j,auctions;
	if(!this.domList)
	{
		this.domList = jso_cE("table",0,
		[
			(
				this.domTHead = jso_cE("thead",0,
				[
					jso_cE("tr",0,
					[
						jso_cE("th",{className:""},["Nick"]),
						jso_cE("th",{className:"kb_col_center kb_col_title",title:"Aktywny"},["A"]),
						jso_cE("th",{className:"kb_col_center kb_col_title",title:"Administrator (root)"},["R"]),
						jso_cE("th",{className:"kb_col_center kb_col_title",title:"Usuń z grupy"},["U"])
					])
				])
			)
		],this.domGroup);
	}
	if(this.domTBody)
	{
		this.domList.removeChild(this.domTBody);
	}
	this.domTBody = jso_cE("tbody",0,0,this.domList)
	if(this.list.length)
	{
		for(;i<this.list.length;i++)
		{
			pd = this.list[i];
			pd.group_admin *= 1;
			pd.group_active *= 1;
			jso_cE("tr",{className:(i%2?"kb_row_dark":"")+(pd.group_admin?" kb_row_green":(pd.group_active?"":" kb_row_red"))},
			[
				jso_cE("td",0,[pd.group_nick]),
				jso_cE("td",{className:"kb_col_center"},[
					jso_cE("input",{type:"checkbox",disabled:(this.group_admin?"":"disabled"),checked:(pd.group_active?"checked":""),title:"Zmień status "+pd.group_nick},0,0,{click:function(e){if(T.group_admin){T.edit.call(T,"active",jso_gE(e).title.replace("Zmień status ",""),jso_gE(e).checked)}}})
				]),
				jso_cE("td",{className:"kb_col_center"},[
					jso_cE("input",{type:"checkbox",disabled:(this.group_admin?"":"disabled"),checked:(pd.group_admin?"checked":""),title:"Zmień status "+pd.group_nick},0,0,{click:function(e){if(T.group_admin){T.edit.call(T,"admin",jso_gE(e).title.replace("Zmień status ",""),jso_gE(e).checked)}}})
				]),
				jso_cE("td",{className:"kb_col_center"},[
					jso_cE("b",{title:"Usuń z grupy "+pd.group_nick},[
						jso_cE("img",{src:(this.group_admin?this.kb.images.minus:this.kb.images.minus_disabled)})
					],0,{click:function(e){if(T.group_admin){e=jso_gE(e).title||jso_gE(e).parentNode.title;T.edit.call(T,"delete",e.replace("Usuń z grupy ",""),1)}}})
				])
			],this.domTBody);
		}
	}
	else
	{
		jso_cE("tr",{className:"kb_row_red"},[jso_cE("td",{colSpan:4},["Jesteś tu zupełnie sam!"])],this.domTBody);
	}
	this.domList.style.display = (this.active == "List"?"":"none");
}
// Zmień opcje lub usuń ocenę
kb.prototype.groupAdmin.prototype.edit = function(action,nick,check)
{
	if(this.group_admin)
	{
		var T = this,url = "";
		nick = nick.replace(/%/g,"%25").replace(/&/g,"%26");
		if(action == "name")
		{
			url = "&name="+nick;
		}
		else
		{
			url = "&nick="+nick+"&"+action+"="+(check?"1":"0");
		}
		this.kb.request.call
		(
			this.kb,
			{
				data:"action=group"+url,
				onload:function(ajax)
				{
					T.kb.parseResponse.call(T.kb,ajax.responseText)
					T.kb.getAuction.call(T.kb);
				}
			}
		)
	}
}
// Lista ocen
kb.prototype.listAll = function(domConteiner,kb)
{
	this.domConteiner = domConteiner;
	this.kb = kb;
	this.visible = false;
	var T = this;
	this.domList = jso_cE("div",{className:"kb_list"},[jso_cE("p",0,[
		"LISTA OCEN: ",
		(this.domButton = jso_cE("b",0,["POKAŻ"],0,{click:function(){T.show.call(T)}})),
		", ",
		(this.domRSS = jso_cE("a",0,["RSS"]))
	])],this.domConteiner)
}
// Pokaż / ukryj listę ocen
kb.prototype.listAll.prototype.show = function()
{
	if(this.domTable)
	{
		this.visible = !this.visible;
		this.domTable.style.display = this.visible ? "" : "none";
	}
	else
	{
		this.visible = true;
		this.update();
	}
	this.domButton.firstChild.nodeValue = this.visible ? "UKRYJ" : "POKAŻ";
}
// Aktualizuj listę ocen
kb.prototype.listAll.prototype.update = function()
{
	if(!this.ajax)
	{
		var T = this;
		this.ajax = true;
		this.kb.request.call
		(
			this.kb,
			{
				data:"action=list",
				onload:function(ajax)
				{
					T.ajax = false;
					T.generate.call(T,T.kb.parseResponse.call(T.kb,ajax.responseText).list);
				}
			}
		)
	}
}
// Generowanie listy ocen
kb.prototype.listAll.prototype.generate = function(list)
{
	this.list = list;
	var T=this,i=0,pb,j,auctions;
	var share = this.kb.settings.share == 'some';
	var send = this.kb.settings.send == 'some';
	if(!this.domTable)
	{
		this.domTable = jso_cE("table",0,
		[
			(
			this.domTHead = jso_cE("thead",0,
			[
				jso_cE("tr",0,
				[
					jso_cE("th",{className:"kb_col_sort_name kb_col_click"},["Nick"],0,{click:function(){T.order.call(T,"name")}}),
					jso_cE("th",{className:"kb_col_sort_grade kb_col_center kb_col_click",title:"Ocena"},["O"],0,{click:function(){T.order.call(T,"grade")}}),
					jso_cE("th",{className:"kb_col_sort_share kb_col_center kb_col_click",title:"Publiczna"},["P"],0,{click:function(){T.order.call(T,"share")}}),
					jso_cE("th",{className:"kb_col_sort_send kb_col_center kb_col_click",title:"Powiadomienia e-mail"},["E"],0,{click:function(){T.order.call(T,"send")}}),
					jso_cE("th",{className:"kb_col_center kb_col_title",title:"Usuń"},["U"])
				])
			])
			)
		],this.domList);
	}
	this.domTHead.className = "kb_col_sort_"+this.kb.settings.order+(share?"":" kb_col_hide_share")+(send?"":" kb_col_hide_send");
	if(this.domTBody)
	{
		this.domTable.removeChild(this.domTBody)
	}
	this.domTBody = jso_cE("tbody",0,0,this.domTable)
	if(this.list.length)
	{
		for(;i<this.list.length;i++)
		{
			pb = this.list[i];
			auctions = [];
			for(j=0;j<pb.auctions.length;j++)
			{
				auctions.push
				(
					jso_cE("li",0,[
						jso_cE("a",{href:"/aukcje.php?id="+pb.auctions[j]},[pb.auctions[j]])
					])
				)
			}
			pb.share *= 1;
			pb.send *= 1;
			jso_cE("tr",{className:(i%2?"kb_row_dark":"")+(pb.grade*1<0?" kb_row_red":(pb.grade*1>0?" kb_row_green":""))},
			[
				jso_cE("td",0,[
					jso_cE("span",{title:pb.note},[pb.name],0,{click:function(e){
						var domList = jso_gT("div",jso_gE(e).parentNode)[0]
						domList.className = domList.className == "kb_list_details" ? "kb_list_details_active" : "kb_list_details";
					}}),
					jso_cE("div",{className:"kb_list_details"},[
						jso_cE("p",0,[pb.note]),
						jso_cE("ul",0,auctions)
					])
				]),
				jso_cE("td",{className:"kb_col_center"},[pb.grade]),
				(share?jso_cE("td",{className:"kb_col_center"},[jso_cE("input",{type:"checkbox",checked:(pb.share?"checked":""),title:"Opublikuj "+pb.name},0,0,{click:function(e){T.edit.call(T,"share",jso_gE(e).title.replace("Opublikuj ",""),jso_gE(e).checked)}})]):''),
				(send?jso_cE("td",{className:"kb_col_center"},[jso_cE("input",{type:"checkbox",checked:(pb.send?"checked":""),title:"Powiadamiaj o aukcjach "+pb.name},0,0,{click:function(e){T.edit.call(T,"send",jso_gE(e).title.replace("Powiadamiaj o aukcjach ",""),jso_gE(e).checked)}})]):''),
				jso_cE("td",{className:"kb_col_center"},[
					jso_cE("b",{title:"Usuń "+pb.name},[
						jso_cE("img",{src:this.kb.images.minus})
					],0,{click:function(e){e=jso_gE(e).title||jso_gE(e).parentNode.title;T.edit.call(T,"delete",e.replace("Usuń ",""))}})
				])
			],this.domTBody);
		}
	}
	else
	{
		jso_cE("tr",{className:"kb_row_red"},[jso_cE("td",{colSpan:3+(share?1:0)+(send?1:0)},["Twoja lista ocen jest pusta"])],this.domTBody);
	}
}
// Sortowanie tabeli
kb.prototype.listAll.prototype.order = function(order)
{
	var T=this;
	this.kb.request.call
	(
		this.kb,
		{
			data:"action=settings&order="+order,
			onload:function(ajax)
			{
				T.kb.parseResponse.call(T.kb,ajax.responseText)
				T.kb.getAuction.call(T.kb);
			}
		}
	)
}
// Zmień opcje lub usuń ocenę
kb.prototype.listAll.prototype.edit = function(action,nick,check)
{
	var T = this,url = "";
	nick = nick.replace(/%/g,"%25").replace(/&/g,"%26");
	if(action == "send" || action == "share")
	{
		url = "&"+action+"="+(check?"1":"0");
		action = "update";
	}
	this.kb.request.call
	(
		this.kb,
		{
			data:"action="+action+"&pb_nick="+nick+url,
			onload:function(ajax)
			{
				T.kb.parseResponse.call(T.kb,ajax.responseText)
				T.kb.getAuction.call(T.kb);
			}
		}
	)
}
// Reguły CSS
var css = [
".kb_main{margin-bottom:10px;border:1px solid #e2ebba;background:#fff;-moz-border-radius:5px;-webkit-border-radius:5px;overflow:hidden}",
".kb_main .menu_aukcje_pokaz_4_up{background-image:url('"+kb.prototype.images.header+"')}",
".kb_main_col{width:206px;float:left;margin:10px 0;}",
".kb_main_col:first-child{border-right:1px solid #e2ebba;margin-right:-1px}",
".kb_col p{font-weight:bold;margin:2px 0!important;}",
".kb_main .kb_col > *{margin:5px 10px 5px 10px!important;overflow:hidden;padding-bottom:5px;border-bottom:1px solid #B2C367}",
".kb_main .kb_col > *:last-child{border-bottom:0;padding-bottom:0;margin-bottom:0!important}",
".kb_col hr.zielony_box{margin-top:5px}",
".kb_col > * > form p,.kb_col > * > table{border-top:1px dotted #B2C367;padding-top:5px;margin-top:5px}",
".kb_col .kb_noteform textarea,.kb_col select,.kb_col input[type='text'],.kb_col input[type='file']{width:180px;display:block;margin:2px 0;border:1px solid #B2C367;padding:2px;}",
".kb_col select{width:186px;}",
".kb_col .kb_noteform textarea{display:block;margin:5px 0;height:90px}",
".kb_col input[type=button],.kb_col input[type=submit]{display:block;float:right;font-weight:bold;color:#000;background:transparent;border:0;margin:0 0 0 10px;padding:0;cursor:pointer}",
".kb_col input[type=checkbox]{vertical-align:middle}",
".kb_ceil{padding-bottom:3px;height:60px!important;border-bottom:1px solid #95BC01!important}",
".kb_ceil_top{margin:0 auto;background:#fff;border:solid #B2C367;border-width:1px 1px 0 1px;-moz-border-radius:5px 5px 0 0;-webkit-border-top-left-radius:5px;-webkit-border-top-right-radius:5px;width:360px;overflow:hidden}",
".kb_ceil .kb_noteform{margin:0 auto!important;background:#fff url('" + kb.prototype.images.note + "') no-repeat 2px center;border:1px solid #B2C367;-moz-border-radius:0 0 5px 5px;-webkit-border-bottom-left-radius:5px;-webkit-border-bottom-right-radius:5px;padding-left:10px;width:350px;overflow:hidden}",
".kb_ceil .kb_noteform *{display:block;float:left;border:0;margin:0}",
".kb_ceil .kb_noteform label span{display:none!important}",
".kb_ceil .kb_noteform input[type=button]{height:30px;width:60px;padding:0;font-weight:bold;color:#fff;background:#a8ca04;cursor:pointer;}",
".kb_ceil .kb_noteform textarea{height:26px;overflow:auto;font-size:10px;padding:2px 5px 2px 0;width:285px;}",
".kb_ceil .kb_gradestars{padding:3px 5px;}",
".kb_ceil_seed .kb_gradestars{width:120px;float:left;}",
".kb_ceil_seed .kb_seed{width:225px;float:right;border-left:1px solid #B2C367}",
".kb_ceil_seed .kb_seed p{padding:5px 0}",
".kb_ceil_seed .kb_seed p b{cursor:pointer}",
".kb_seed ul{text-align:left;margin:5px 0 0 0;padding:5px 0 5px 15px;border-top:1px dotted #B2C367}",
".kb_ceil_seed .kb_seed ul{padding:5px 5px 5px 20px}",
".kb_col b,.kb_col a{cursor:pointer;color:#000!important;text-decoration:none!important;font-weight:bold!important}",
".kb_gradestars{text-align:center}",
".kb_gradestars *{vertical-align:middle}",
".kb_col_click{cursor:pointer;color:#000}",
".kb_col_hide_share .kb_col_sort_share,.kb_col_hide_send .kb_col_sort_send{display:none}",
".kb_col_hide_share .kb_col_sort_share,.kb_col_hide_send .kb_col_sort_send{display:none}",
".kb_col_sort_name_asc .kb_col_sort_name,.kb_col_sort_grade_asc .kb_col_sort_grade,.kb_col_sort_share_asc .kb_col_sort_share,.kb_col_sort_send_asc .kb_col_sort_send{background:url('"+kb.prototype.images.down+"') no-repeat center 90%;padding-bottom:5px!important}",
".kb_col_sort_name_desc .kb_col_sort_name,.kb_col_sort_grade_desc .kb_col_sort_grade,.kb_col_sort_share_desc .kb_col_sort_share,.kb_col_sort_send_desc .kb_col_sort_send{background:url('"+kb.prototype.images.up+"') no-repeat center 90%;padding-bottom:5px!important}",
".kb_col_sort_name_asc .kb_col_sort_name,.kb_col_sort_name_desc .kb_col_sort_name{background-position:3px 90%;}",
"p.kb_gradestars b{margin:0 2px;cursor:pointer}",
".kb_list table{border-collapse:collapse;width:186px}",
".kb_list td,.kb_list th{border-bottom:1px solid #B2C367;padding:1px;vertical-align:top}",
".kb_list tr:hover td{background:#eee;}",
".kb_list td input{margin:0;cursor:pointer}",
".kb_list td span{cursor:pointer}",
".kb_col_center{text-align:center!important;width:1em}",
".kb_row_dark td{background:#eee}",
".kb_row_red td{background:#fee}",
".kb_row_green td{background:#efe}",
".kb_row_dark.kb_row_red td{background:#edd}",
".kb_row_dark.kb_row_green td{background:#ded}",
".kb_col_title{cursor:help}",
".kb_list_details{display:none}",
".kb_list_details_active{display:block}",
".kb_list_details_active ul,.kb_list_details_active p{font-weight:normal;margin:0;padding:0}",
".kb_list_details_active li{display:inline;list-style:none}",
".kb_list_details_active li:after{content:', '}",
".kb_list_details_active li:last-child:after{content:'.'}",
".kb_list_details_active li:first-child:before{content:'Aukcje: '}",
"iframe#kb_iframe{position:fixed;top:0;left:0}",
"tr.kb_row{height:40px!important}",
"tr.kb_row_kb{height:60px!important}",
"tr.kb_row_kb td.kb_ceil{border-bottom:1px solid #95BC01;font-size:12px;font-weight:bold;text-align:center;font-weight:normal!important}",
"tr.kb_row_kb td.kb_ceil p{margin:0}",
"tr.kb_row td.a_kwota,tr.kb_row td.a_procenty,tr.kb_row td.a_okres,tr.kb_row td.a_ofert,tr.kb_row td.a_pytan,tr.kb_row td.a_do_konca,tr.kb_row td.a_inwestuj{border-bottom:0!important}",
"html.kb_wait *{cursor:wait!important}",
"body table#aukcje_lista_glowna tr td {border-bottom:0;height:40px;}",
"body table#aukcje_lista_glowna tr td[rowSpan='2']{border-bottom:1px solid #95BC01;height:100px;}"
];
jso_cE("style",{type:"text/css"},[css.join("\n")],jso_gT("head")[0]);
// START
new kb();
})();