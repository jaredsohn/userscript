scr_meta=<><![CDATA[
// ==UserScript==
// TV-Player

//
// ==UserScript==
// @name		RAI-TV-Player
// @namespace	http://userscripts.org/scripts/source/61782.user.js
// @description	Permette di guardare i canali/video in streaming di Rai e Mediaset attraverso VLC Multimedia Plugin, mplayerplug-in  o qualsiasi lettore esterno al browser ( Copyright (c) 2009 Riccardo Cioncolini )
// @author		mitm[ITA]
// @version		2.5.7
// @include		http://*rai.*
// ==/UserScript==
]]></>.toString();

// Script auto update
// Another Auto Update Script - http://userscripts.org/scripts/show/38017 - By sizzlemctwizzle
CheckScriptForUpdate = {
 id: '61782',
 days: 1,
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
          url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
          onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('the page you requested doesn\'t exist')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('Una nuova versione dello script '+this.xname+' e\' disponibile. Vuoi eseguire l\'update?')) ) {
      GM_setValue('updated', this.time);
      var dl_url = window.open('http://userscripts.org/scripts/source/'+this.id+'.user.js', "Script updater by mitm (mitm@hotmail.it)");
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
      if(confirm('Vuoi disabilitare l\'aggiornamento automatico per questo script?')) {
        GM_setValue('updated', 'off');
        GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
        alert('Puoi abilitare nuovamente l\'aggiornamento automatico per questo script dal sottomenu\' Comandi Script Utente.');
      } else {
        GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('Nessun aggiornamento disponibile per '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Abilita Agg.Automatici per "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true)
;});
    } else {
      GM_registerMenuCommand("Controlla Aggiornamenti per "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();
GM_log(CheckScriptForUpdate.name + ' (' + CheckScriptForUpdate.version + ')');

// Disable meta refresh
// No Meta Refresh - http://userscripts.org/scripts/show/3587 - By Pirateshark
var refresh = document.evaluate("//meta[@http-equiv='Refresh']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
GM_log("refresh: "+refresh.snapshotItem(0));
if(refresh.snapshotItem(0) != null){
	var content = refresh.snapshotItem(0).getAttribute("content");
	var stopTimer = window.setTimeout("window.stop();",
		(content-1)*1000); // in case load hasn't finished when the refresh fires
	window.addEventListener("load", function(){
		try { window.clearTimeout(stopTimer); } catch(ex) {}
		window.stop();
	}, true);
	GM_log("stopped meta-refresh");
} else {
	GM_log("no meta-refresh found");
}

// RAI-TV-Player
// powered by mitm (mitm@hotmail.it)

var canale = new Array();
var url = new Array();

canale[0] = 'Rai1';
// url[0] = 'mms://95.154.227.148/liveencoder16';
url[0] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=180090';

canale[1] = 'Rai2';
url[1] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=180116';

canale[2] = 'Rai3';
url[2] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=180117';

canale[3] = 'Rai4';
url[3] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=72386';

canale[4] = 'News24';
url[4] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=1';

canale[5] = 'Sport 1';
url[5] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=4145';

canale[6] = 'Edu';
url[6] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=24268';

canale[7] = 'Storia';
url[7] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=24269';

canale[8] = 'Gulp';
url[8] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=4119';

canale[9] = 'Extra';
url[9] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=72382';

canale[10] = 'Premium';
url[10] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=72916';

canale[11] = 'Cinema';
url[11] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=72381';

canale[12] = 'YoYo';
url[12] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=72918';

canale[13] = 'ArcoirisTV';
url[13] = 'mms://193.41.7.40/vive-adsl';

canale[14] = 'Sat2000';
url[14] = 'mms://89.119.94.130/Sat2000';

canale[15] = 'Mediaset';
url[15] = 'mms://video.farm.mediaset.it/mediaset_cm_lq_source4';

canale[16] = 'NRK1';
url[16] = 'mms://mms-icanal-live.online.no/nrk_tv_webvid03_l';

canale[17] = 'NRK2';
url[17] = 'mms://mms-icanal-live.online.no/nrk_tv_webvid05_h';

canale[18] = 'NRK.';
url[18] = 'mms://straumV.nrk.no/nrk_tv_rogaland_247_mbr';

canale[19] = 'AllMusic';
url[19] = 'mms://live.mediaserver.kataweb.it/retea?MSWMExt=.asf';

canale[20] = 'Antena1';
url[20] = 'mms://81.196.2.232/pp1';

canale[21] = 'France24';
url[21] = 'mms://stream1.france24.yacast.net/f24_liveen';

canale[22] = 'eTVsat';
url[22] = 'mms://streaming.e-tv.it/etvsatellite';

canale[23] = 'Scuola';
url[23] = 'http://mediapolis.rai.it/relinker/relinkerServlet.htm?cont=24268';

canale[24] = 'Channel1';
url[24] = 'mms://84.233.254.2/3Channel';

canale[25] = 'SportITA';
url[25] = 'mms://mms.cdn-tiscali.com/sportitalia';

canale[26] = 'RTL';
url[26] = 'mms://151.1.245.36/rtl102.5vs';

canale[27] = 'Tg1';
url[27] = 'http://link.rai.it/x/vod/ue/wmx/ultimo_tg1.asx';

canale[28] = 'Tg2';
url[28] = 'http://link.rai.it/x/vod/ue/wmx/ultimo_tg2.asx';

canale[29] = 'Tg3';
url[29] = 'http://link.rai.it/x/vod/ue/wmx/ultimo_tg3.asx';

canale[30] = 'Palinuro';
url[30] = 'http://gfcserver.game-server.cc:7000/palinuroradio';

canale[31] = 'Rai Sport 2';
url[31] = 'http://mediapolis.rainet.it/relinker/relinkerServlet.htm?cont=179975';

canale[32] = 'Canale_5 [n/a]';
// url[32] = 'mms://live.mediashopping.it/enc2-c1';
// url[32] = 'mms://live.mediashopping.it/enc1-c1';
// url[32] = 'mms://95.154.193.121/Liveencoder09';
url[32] = 'mms://live.wm.p1.str3.com/003000_bc_v365_mediashopping_mi';

canale[33] = 'Italia_1';
url[33] = 'mms://live.mediashopping.it/enc2-c2';
// url[33] = 'mms://live.mediashopping.it/enc1-c2';
// url[33] = 'mms://95.154.193.121/Liveencoder12';
// url[33] = 'mms://95.154.227.148/liveencoder12';

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

function encode1(tokenstring){
	var ch = "";
	var encoded = "";
	var rnd = rand(1, 9);
	// var rnd  = 1;
	for(var i = 0; i < tokenstring.length; i++){
		ch = tokenstring.substr(i, 1);
		encoded += chr(ord(ch)^rnd);
	}
	encoded += ";" + rnd;
	return encoded;
}
function encode2(tokenstring, chiave){
        var encoded = "";
        var i = tokenstring.length - 1;
        var j = 0;
        while (i >= 0){
                ch1 = tokenstring.substr(i, 1);
                if(j > chiave.length){
                        j = 0;
                }
                ch2 = chiave.substr(j, 1);
                enc = chr(ord(ch1)^ord(ch2));
                encoded = enc + encoded;
                i--;
                j++;
        }
        return encoded;
}

function encode3(tokenstring){
	var encoded = "";
	encoded = Base64.encode(Base64._utf8_decode(Base64._utf8_encode(tokenstring)));
	return encoded;
}

function rand (min, max) {
	var argc = arguments.length;	
	if (argc === 0) {
		min = 0;
		max = 2147483647;
	} else if (argc === 1) {
		throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
function chr (codePt) {
	if (codePt > 0xFFFF) {
		codePt -= 0x10000;
		return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
	} else {
		return String.fromCharCode(codePt);

	}
}

function ord (string) {
	var str = string + '';
	var code = str.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF) {
		var hi = code;
		if (str.length === 1) {
			return code;
		}
		var low = str.charCodeAt(1);
		if (!low) {
			return code;
		}
	        var low = str.charCodeAt(1);
	        if (!low) {
		}
		return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
	}
	if (0xDC00 <= code && code <= 0xDFFF) {
		return code;
	}
	return code;
}

var charArray = new Array(
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';',
	'<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
	'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
	't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~');

function chr2(n)
{
	if(n < 32 || n > 127) return " ";
	return charArray[n-48];
}

function ord2(c)
{
	var i;
	for(i=0; i < charArray.length; i++) {
		if(c == charArray[i]) return i+48;
	}
	return 0;
}

function parseData(data, url, id, write){
	if(url.search('videowall') == -1) var chan_id = url.match(/.*=([0-9]*)/)[1];
	var day = data.substr(0, 2);
	var month = data.substr(3, 2);
	var year = data.substr(6, 4);
	var hour = data.substr(11, 2);
	var min = data.substr(14, 2);
	var sec = data.substr(17, 2);
	var rnd1 = rand(0, 1234);
	var rnd2 = rand(0, 1234);
	var tokenstring = year + ';' + chan_id + ';' + day + '-' + month + '-' + rnd1 + '-' + hour + '-' + min + '-' + sec + '-' + rnd2;
	ttauth = encode3(encode2(encode1(tokenstring), 'hMrxuE2T8V0WRW0VmHaKMoFwy1XRc+hK7eBX2tTLVTw='));
	httpReq(url, ttauth, url, id, write);
}

function httpReq(url, ttauth, vurl, id, write){
	GM_xmlhttpRequest({
	      method: 'GET',
		url: url,
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml',
			'Accept-Language': 'it-it,it;q=0.8,en-us;q=0.5,en;q=0.3',
			'Accept-Encoding': 'gzip,deflate',
			'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
			'Keep-Alive': '300',
			'Connection': 'keep-alive',
			'Content-Length': '0',
			'ttauth' : ttauth,
			'viaurl' : 'www.rai.tv',
		},
		onload : function(responseDetails){
			if(responseDetails.status==200){
				if(responseDetails.responseText){
					if(ttauth == ""){
						parseData(responseDetails.responseText, vurl, id, write);
					} else {
						parseXML(responseDetails.responseText, url, id, write);
					}
				}
			}
		}
	});

}

function parseXML(xml, url, id, write){
		// var vurl = xml.match(/HREF=\"([^\"]+)\"/)[1];
		xml = xml.replace(/&/g, '&amp;');
		var parser = new DOMParser();
		var dom = parser.parseFromString(xml.toString(), "application/xml");
		var links  = dom.evaluate('ASX/ENTRY/REF', dom, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var vurl = links.snapshotItem(0).getAttribute('HREF');
		if (links.snapshotLength > 1 && links.snapshotItem(0).getAttribute('HREF').indexOf('rai.it') == -1) {
			vurl = links.snapshotItem(1).getAttribute('HREF').replace('http://', 'mms://');	// viewtv.co.uk fix
		}
		if(vurl) {
			write?writePlayer(vurl, id):addLink(url, vurl);
		} else {
			alert('Impossibile ricavare URL del canale');
		}
}

function getXML(url, id, write){
	/*
	if(url.indexOf('mediapolis.rainet.it') != -1){
		var disclaimer = "DISCLAIMER: Utilizzando l\'applicazione DICHIARI DI ESSERE UN ABBONATO RAI RESIDENTE IN TERRITORIO ITALIANO E DI FARNE USO PERSONALE SENZA FINI DI LUCRO. Lo staff di RAI-TV-Player non ÃÂ¨ in alcun modo responsabile di eventuali illeciti derivanti da un utilizzo improprio della stessa: a questo scopo tiene traccia di tutti gli accessi effettuati all\'applicazione e si impegna a renderli disponibili alle autorita\' competenti nell\'ipotesi di accertamento di reati annessi(conseguenti) al suo utilizzo. Ricordiamo che RAI-TV-Player nasce SENZA FINI DI LUCRO AL SOLO SCOPO DI ESTENDERE LA FRUIBILITA\' DEI CONTENUTI RAI AGLI ABBONATI CHE TROVANO DIFFICOLTA\' AD UTILIZZARE LE TECNOLOGIE PROPRIETARIE IN USO SUL PORTALE rai.tv";
		if(confirm(disclaimer)) {
			var vurl = "http://acab.servebeer.com/tv-player/mitm/tvplayer_lite.php?client=GM_61782&url=" + url;
			GM_xmlhttpRequest({
			      method: 'GET',
				url: vurl,
				onload : function(responseDetails){
					if(responseDetails.status==200){
						if(responseDetails.responseText){
							write?writePlayer(responseDetails.responseText, id):addLink(url, responseDetails.responseText);
						}
					}
				}
			});
		}
	} else if(url.search('relinkerServlet') != -1 || url.search('link.rai.it') != -1 || url.search('prostream') != -1 || url.search('viewtv.co.uk') != -1 ){
	*/
	if(url.indexOf('mediapolis.rainet.it') != -1){
		var srvntp = "http://videowall.rai.it/cgi-bin/date?" + rand(100000, 999999);
		httpReq(srvntp, "", url, id, write);
		/*
		GM_xmlhttpRequest({
		      method: 'GET',
			url: url,
			headers: {
				'Accept': 'text/html,application/xhtml+xml,application/xml',
				'Accept-Language': 'it-it,it;q=0.8,en-us;q=0.5,en;q=0.3',
				'Accept-Encoding': 'gzip,deflate',
				'Accept-Charset': 'ISO-8859-2,utf-8;q=0.7,*;q=0.7',
				'Keep-Alive': '300',
				'Connection': 'keep-alive',
				'Content-Length': '0',
	 			'viaurl' : 'www.rai.tv',
			},
			onload : function(responseDetails){
				if(responseDetails.status==200){
					if(responseDetails.responseText){
						parseXML(responseDetails.responseText, url, id, write);
					}
				}
			}
		});
		*/
	} else {
		write?writePlayer(url, id):addLink(url, url);
	}
}

function writePlayer(url, id){
	url = url.toString();
	if(url.indexOf('http') != -1 && (url.indexOf('V001') != -1 || url.indexOf('rai.it') != -1 || url.indexOf('VODPlatformViewTV') != -1)) {
		url = url.replace('http', 'mms');
	}
	var embedded = "<div>";
	embedded += "<embed id='mitm-player' name='mitm-player' src=\"" + url + "\" type='"+prefmimetype+"' width='400' height='300' pluginspage='http://www.videolan.org' version='VideoLAN.VLCPlugin.2' loop='no'></embed>";
	if (!mplayer) { 
		embedded += ctrls();
	} else {
		embedded += '<div></div>';
	}
	var nome_canale = (id != null)?id:"video";
	embedded += "<font color=#F88530>Apri " + nome_canale + " con un <a name=" + nome_canale + " id=mitm-ext href=\"" + url + "\">Lettore Esterno&nbsp;&nbsp;&nbsp;<img src=http://codex.gallery2.org/skins/monobook/external.png alt='| |'></img></a></font></div>";
	var ancora = document.getElementsByTagName("div");
	for (var i = 0; i < ancora.length; i++){
		if(ancora[i].getAttribute('class') == 'bloccoSx' || ancora[i].getAttribute('id') == 'Player' || ancora[i].getAttribute('id') == 'boxvideoWall') {
			ancora[i].innerHTML = embedded;
			var ancora = document.getElementById('mitm-ext');
			if (ancora.getAttribute('name').indexOf('Palinuro') != -1) ancora.setAttribute('target', '_blank');
		}
	}
}

function addLink(id, url){
	url = url.toString();
	var tuner = document.getElementById(id);
	if(url.indexOf('http') != -1 && (url.indexOf('V001') != -1 || url.indexOf('rai.it') != -1 || url.indexOf('VODPlatformViewTV') != -1)) {
		url = url.replace('http', 'mms');
	}
	tuner.setAttribute('href', url);
}

function nav_menu(last){
	var start = 0;
	var max = canale.length/2;
	if(last) {
		start = max;
		max = canale.length;
		var more = '<td bgcolor=#F88530><center><input type=button name="' + !last + '" id="mitm_switcher" value="&nbsp;<<&nbsp;"></center></td>';
	} else {
		var more = '<td bgcolor=#F88530><center><input type=button name="' + !last + '" id="mitm_switcher" value="&nbsp;>>&nbsp;"></center></td>';
	}

	var ancora = document.getElementsByTagName("div");
	for(var c = 0; c < ancora.length; c++){
		if(ancora[c].getAttribute('class') == 'barraInterno' || ancora[c].getAttribute('name') == 'mitm-div' ) var ind = c;
	}

	var html = '<div align=center name=mitm-div class=box_TopHeaderInterno>';
	html += "<table width='100%' border='0' cellpadding='0' cellspacing='1'>";
	html += "<tr><td bgcolor=black>&nbsp;</td>";
	for(var i = start; i < max; i++){
		html += "<td bgcolor=#F88530><a style=\"cursor: pointer;\" id='" + canale[i] + "' name=\"" + url[i] + "\">&nbsp;" + canale[i] + "</a></td><td bgcolor=#F88530><a style=\"cursor: pointer;\" name='" + canale[i] + "' id=\"" + url[i] + "\"><img src=http://codex.gallery2.org/skins/monobook/external.png alt='=>'></img></a></td><td bgcolor=black>&nbsp;</td>";
	}
	html += more;
	html += '<td bgcolor=black>&nbsp;</td><td bgcolor=#F88530>&nbsp;&nbsp;RAI-TV-Player &nbsp;&nbsp;powered&nbsp;by&nbsp;<a href=mailto:mitm@hotmail.it>mitm</a>&nbsp;</td><td bgcolor=black>&nbsp;</td>';
	html += "</tr>";
	html += "</table></div>";
	ancora[ind-1].innerHTML = html;

	for(var i = start; i < max; i++){
		if(canale[i]){
			var tuner = document.getElementById(url[i]);
			tuner.addEventListener("mouseover", function (event) {
				// if(!this.href) getXML(this.id, null, false);
				getXML(this.id, null, false);
			}, false);
			if (canale[i].toString().indexOf('Palinuro') != -1) tuner.setAttribute('target', '_blank');
			var tuner = document.getElementById(canale[i]);
			tuner.addEventListener("click", function (event) {
				getXML(this.name, this.id, true);
				var ancora = document.getElementsByTagName("div");
				for (var i = 0; i < ancora.length; i++){
					if(ancora[i].getAttribute('class') == 'bloccoDx' || ancora[i].getAttribute('class') == 'banner' || ancora[i].getAttribute('class') == 'inboxBanner') ancora[i].innerHTML = '';
				}
			}, false);
		}
	}
	var tuner = document.getElementById('mitm_switcher');
	tuner.addEventListener("click", function (event) {
		nav_menu(!last);
	}, false);
}

function ctrls(){
	var html = "<div><table width='80%' border='0' cellpadding='0' cellspacing='1'>";
	html += "<tr>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").playlist.play();'>Play</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").playlist.stop();'>Stop</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").audio.toggleMute();'>Mute</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").audio.volume=0;'>Vol 0</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").audio.volume=100;'>Vol 100</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").audio.volume=200;'>Vol 200</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"1:1\";'>1:1</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"4:3\";'>4:3</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"16:9\";'>16:9</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"16:10\";'>16:10</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"221:100\";'>221:100</td>";
	html += "<td bgcolor=#F88530 onmouseover=\"bgColor=\'red\'\" onmouseout=\"bgColor=\'#F88530\'\" onClick='document.getElementById(\"mitm-player\").video.aspectRatio=\"5:4\";'>5:4</td>";
	html += "</tr>";
	html += "</table></div>";
	return(html);
}

function advStuff(url) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
		'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.6) Gecko/2009020911 Ubuntu/8.10 (intrepid) Firefox/3.0.6',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload : function(responseDetails){
			if(responseDetails.status==200){
				if(responseDetails.responseText){
					var base_url = 'http://mediapolis.rai.it/relinker/';
					var vurl = responseDetails.responseText.match(/relinkerServlet.*?eeqqEEqual/i);
					if (vurl && vurl[0].indexOf('mp4') != -1) {
						vurl[0] += '&contenttype=wmv';
					}
					if(vurl) {
						getXML(base_url + vurl[0], null, true);
					} else {
						var scripts = document.getElementById('silverlightControlHost');
						var vurl = scripts.innerHTML.match(/http.*?html/i);
						var block = scripts.innerHTML.match(/PublishingBlock.*?[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/i);
						(vurl && block)?advParse(vurl[0], block[0]):scripts.innerHTML = '<div><b>Per accedere a questi contenuti utilizza la barra di navigazione in alto</b></div>';
					}
				}
			}
		}
	});
}

function advParse(url, block){
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		headers: {
		'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.6) Gecko/2009020911 Ubuntu/8.10 (intrepid) Firefox/3.0.6',
		'Accept': 'application/xml,text/xml',
		},
		onload : function(responseDetails){
			if(responseDetails.status==200){
				if(responseDetails.responseText){
					var xml = responseDetails.responseText;
					xml = xml.replace(/&/g, '&amp;');
					var parser = new DOMParser();
					var dom = parser.parseFromString(xml.toString(), "application/xml");
					var infos  = dom.evaluate('block/sets/set', dom, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					for (var c = 0; c < infos.snapshotLength; c++){
						if(infos.snapshotItem(c).getAttribute('uniquename') == block) {
							var uniquename = block;
							var name = infos.snapshotItem(c).getAttribute('name');
							var channels = infos.snapshotItem(c).childNodes[1].getElementsByTagName('videoUnit');
							var vurl = channels[0].childNodes[1].textContent;
							if (vurl.indexOf('mp4') != -1) {
								vurl += '&contenttype=wmv';
							}
							getXML(vurl, null, true);
						}
					}
				}
			}
		}
	});	
}

var agente = 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.6) Gecko/2009020911 Ubuntu/8.10 (intrepid) Firefox/3.0.6';
var mplayer = true;
var prefmimetype = "application/x-mplayer2";
navigator.plugins.refresh(false);
var numPlugins = navigator.plugins.length;
var pluginfound, plugin, mimetype;
if (numPlugins > 0) {
	for (var i = 0; i < numPlugins; i++) {
		plugin = navigator.plugins[i];
		for (var j = 0; j < plugin.length; j++) {
			mimetype = plugin[j];
			if (mimetype.type == prefmimetype) {
				pluginfound = true;
				if (mimetype.enabledPlugin) {
					if (pluginfound && plugin.name.indexOf('VLC Multimedia Plug-in') != -1) mplayer = false;
					// VLC Multimedia Plugin => requires controls
					// Windows Media Player Plug-in Dynamic Link Library / mplayerplug-in => controls not needed
				}
			}
		}
	}
}

if (!pluginfound) {
	var Msg = 'Attenzione: Non sono stati rilevati plug-in per la visualizzazione degli stream attraverso un lettore integrato nel browser web.\n\n';
	Msg += 'Per gli utenti windows si consiglia di utilizzare VLC Multimedia Plugin per firefox\n=> puo\' essere installato durante il setup di VLC.\n\n'
	Msg += 'Per gli utenti linux e\' consigliato utilizzare mplayerplug-in\n=> disponibile all\'indirizzo http://mplayerplug-in.sourceforge.net/ .\n\n';
	Msg += 'Per la visualizzazione dei filmati e\' comunque possibile utilizzare un lettore esterno al browser come\n';
	Msg += 'ad esempio Windows Media Player, VLC, mplayer utilizzando i links che lo script mette a disposizione.\n\n';
	Msg += 'Vi ricordo che per alcuni lettori esterni (ad esempio vlc) e\' necessario specificare come user-agent:\n' + agente + '\n\n';
	Msg += 'Procedura per VLC : Andiamo su Strumenti - Preferenze e successivamente mettiamo il segno di spunta su Mostra le impostazioni impostandolo su \'Tutto\'.\n';
	Msg += 'Adesso andiamo su Ingresso/Codificatori - Moduli di accesso - HTTP(S).\nNel campo User Agent HTTP inseriamo la seguente stringa:\n';
	Msg += agente;
	Msg += '\n\nPowered by mitm (mitm@hotmail.it)';
	alert(Msg);
}

var ancora = document.getElementsByTagName("div");
for (var i = 0; i < ancora.length; i++){
	if(ancora[i].getAttribute('class') == 'barraInterno' && document.location.href.indexOf('radio.rai.it') == -1) nav_menu(false);
	if(ancora[i].getAttribute('id') == 'silverlightControlHost'){
		var base_url = 'http://mediapolis.rainet.it/relinker/';
		var vurl = ancora[i].innerHTML.match(/relinkerServlet.*?eeqqEEqual/i);
		if(vurl) {
			if (vurl[0].indexOf('mp4') != -1) {
				vurl[0] += '&contenttype=wmv';
			}
			getXML(base_url + vurl[0], null, true);
		} else {
			advStuff(document.location.href);
		}
	}
}