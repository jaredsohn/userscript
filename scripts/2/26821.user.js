// ==UserScript==
// @name          Amazonmp3 & Projectplaylist Mashup
// @namespace     http://userscripts.org/
// @description   Cross reference songs on amazonmp3.com with playlist.com
// @include       http://www.amazon.com/*/dp/*
// @include       http://www.amazon.com/gp/product/*
// @include       http://www.amazon.com/s/*
// ==/UserScript==

// Some quick helper functions
function $(element) { return document.getElementById(element); }
function remove(element) { element.parentNode.removeChild(element); }
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}

// Get absolute position of an element
function getTop(element) {
    var oNode = element;
    var iTop = 0;

    while(oNode.tagName != 'HTML') {
        iTop += (oNode.offsetTop || 0);
        if(oNode.offsetParent) {
            oNode = oNode.offsetParent;
        } else {
            break;
        }
    }
    return iTop;
}

function getLeft(element) {
    var oNode = element;
    var iLeft = 0;
    while(oNode.tagName != 'HTML') {
        iLeft += (oNode.offsetLeft || 0);
        if(oNode.offsetParent) {
            oNode = oNode.offsetParent;
        } else {
            break;
        }
    }
    return iLeft;
}

function hexToChars (hex) {
          var a = new Array();
          var b = (hex.substr(0, 2) == '0x') ? 2 : 0;
          while (b < hex.length) {
            a.push(parseInt(hex.substr(b, 2), 16));
            b += 2;
          }
          return a;
}

function charsToStr (chars) {
          var a = '';
          var b = 0;
          while (b < chars.length) {
            a += String.fromCharCode(chars[b]);
            ++b;
          }
          return a;
}

function strToChars (str) {
          var a = new Array();
          var b = 0;
          while (b < str.length) {
            a.push(str.charCodeAt(b));
            ++b;
          }
          return a;
}

function initialize (pwd) {
          var a = 0;
          var b;
          var c = pwd.length;
          var d = 0;
          while (d <= 255) {
            mykey[d] = pwd[d % c];
            sbox[d] = d;
            ++d;
          }
          d = 0;
          while (d <= 255) {
            a = (a + sbox[d] + mykey[d]) % 256;
            b = sbox[d];
            sbox[d] = sbox[a];
            sbox[a] = b;
            ++d;
          }
}

function calculate (plaintxt, psw) {
          initialize(psw);
          var a = 0;
          var b = 0;
          var c = new Array();
          var d;
          var e;
          var f;
          var g = 0;
          while (g < plaintxt.length) {
            a = (a + 1) % 256;
            b = (b + sbox[a]) % 256;
            e = sbox[a];
            sbox[a] = this.sbox[b];
            sbox[b] = e;
            var h = (sbox[a] + sbox[b]) % 256;
            d = sbox[h];
            f = plaintxt[g] ^ d;
            c.push(f);
            ++g;
          }
          return c;
}

function decrypt  (src, key) {
          var plaintxt = hexToChars(src);
          var psw = strToChars(key);
          var chars = calculate(plaintxt, psw);
          return charsToStr(chars);
}

/*	Unobtrusive Flash Objects (UFO) v3.22 <http://www.bobbyvandersluis.com/ufo/>
	Copyright 2005-2007 Bobby van der Sluis
	This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
*/
location.href = "javascript:(" + encodeURI(uneval(function() { UFO = {
	req: ["movie", "width", "height", "majorversion", "build"],
	opt: ["play", "loop", "menu", "quality", "scale", "salign", "wmode", "bgcolor", "base", "flashvars", "devicefont", "allowscriptaccess", "seamlesstabbing", "allowfullscreen", "allownetworking"],
	optAtt: ["id", "name", "align"],
	optExc: ["swliveconnect"],
	ximovie: "ufo.swf",
	xiwidth: "215",
	xiheight: "138",
	ua: navigator.userAgent.toLowerCase(),
	pluginType: "",
	fv: [0,0],
	foList: [],
		
	create: function(FO, id) {
		if (!UFO.uaHas("w3cdom") || UFO.uaHas("ieMac")) return;
		UFO.getFlashVersion();
		UFO.foList[id] = UFO.updateFO(FO);
		UFO.createCSS("#" + id, "visibility:hidden;");
		UFO.domLoad(id);
	},

	updateFO: function(FO) {
		if (typeof FO.xi != "undefined" && FO.xi == "true") {
			if (typeof FO.ximovie == "undefined") FO.ximovie = UFO.ximovie;
			if (typeof FO.xiwidth == "undefined") FO.xiwidth = UFO.xiwidth;
			if (typeof FO.xiheight == "undefined") FO.xiheight = UFO.xiheight;
		}
		FO.mainCalled = false;
		return FO;
	},

	domLoad: function(id) {
		var _t = setInterval(function() {
			if ((document.getElementsByTagName("body")[0] != null || document.body != null) && document.getElementById(id) != null) {
				UFO.main(id);
				clearInterval(_t);
			}
		}, 250);
		if (typeof document.addEventListener != "undefined") {
			document.addEventListener("DOMContentLoaded", function() { UFO.main(id); clearInterval(_t); } , null); // Gecko, Opera 9+
		}
	},

	main: function(id) {
		var _fo = UFO.foList[id];
		if (_fo.mainCalled) return;
		UFO.foList[id].mainCalled = true;
		document.getElementById(id).style.visibility = "hidden";
		if (UFO.hasRequired(id)) {
			if (UFO.hasFlashVersion(parseInt(_fo.majorversion, 10), parseInt(_fo.build, 10))) {
				if (typeof _fo.setcontainercss != "undefined" && _fo.setcontainercss == "true") UFO.setContainerCSS(id);
				UFO.writeSWF(id);
			}
			else if (_fo.xi == "true" && UFO.hasFlashVersion(6, 65)) {
				UFO.createDialog(id);
			}
		}
		document.getElementById(id).style.visibility = "visible";
	},
	
	createCSS: function(selector, declaration) {
		var _h = document.getElementsByTagName("head")[0]; 
		var _s = UFO.createElement("style");
		if (!UFO.uaHas("ieWin")) _s.appendChild(document.createTextNode(selector + " {" + declaration + "}")); // bugs in IE/Win
		_s.setAttribute("type", "text/css");
		_s.setAttribute("media", "screen"); 
		_h.appendChild(_s);
		if (UFO.uaHas("ieWin") && document.styleSheets && document.styleSheets.length > 0) {
			var _ls = document.styleSheets[document.styleSheets.length - 1];
			if (typeof _ls.addRule == "object") _ls.addRule(selector, declaration);
		}
	},
	
	setContainerCSS: function(id) {
		var _fo = UFO.foList[id];
		var _w = /%/.test(_fo.width) ? "" : "px";
		var _h = /%/.test(_fo.height) ? "" : "px";
		UFO.createCSS("#" + id, "width:" + _fo.width + _w +"; height:" + _fo.height + _h +";");
		if (_fo.width == "100%") {
			UFO.createCSS("body", "margin-left:0; margin-right:0; padding-left:0; padding-right:0;");
		}
		if (_fo.height == "100%") {
			UFO.createCSS("html", "height:100%; overflow:hidden;");
			UFO.createCSS("body", "margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0; height:100%;");
		}
	},

	createElement: function(el) {
		return (UFO.uaHas("xml") && typeof document.createElementNS != "undefined") ?  document.createElementNS("http://www.w3.org/1999/xhtml", el) : document.createElement(el);
	},

	createObjParam: function(el, aName, aValue) {
		var _p = UFO.createElement("param");
		_p.setAttribute("name", aName);	
		_p.setAttribute("value", aValue);
		el.appendChild(_p);
	},

	uaHas: function(ft) {
		var _u = UFO.ua;
		switch(ft) {
			case "w3cdom":
				return (typeof document.getElementById != "undefined" && typeof document.getElementsByTagName != "undefined" && (typeof document.createElement != "undefined" || typeof document.createElementNS != "undefined"));
			case "xml":
				var _m = document.getElementsByTagName("meta");
				var _l = _m.length;
				for (var i = 0; i < _l; i++) {
					if (/content-type/i.test(_m[i].getAttribute("http-equiv")) && /xml/i.test(_m[i].getAttribute("content"))) return true;
				}
				return false;
			case "ieMac":
				return /msie/.test(_u) && !/opera/.test(_u) && /mac/.test(_u);
			case "ieWin":
				return /msie/.test(_u) && !/opera/.test(_u) && /win/.test(_u);
			case "gecko":
				return /gecko/.test(_u) && !/applewebkit/.test(_u);
			case "opera":
				return /opera/.test(_u);
			case "safari":
				return /applewebkit/.test(_u);
			default:
				return false;
		}
	},
	
	getFlashVersion: function() {
		if (UFO.fv[0] != 0) return;  
		if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
			UFO.pluginType = "npapi";
			var _d = navigator.plugins["Shockwave Flash"].description;
			if (typeof _d != "undefined") {
				_d = _d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				var _m = parseInt(_d.replace(/^(.*)\..*$/, "$1"), 10);
				var _r = /r/.test(_d) ? parseInt(_d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
				UFO.fv = [_m, _r];
			}
		}
		else if (window.ActiveXObject) {
			UFO.pluginType = "ax";
			try { // avoid fp 6 crashes
				var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			}
			catch(e) {
				try { 
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					UFO.fv = [6, 0];
					_a.AllowScriptAccess = "always"; // throws if fp < 6.47 
				}
				catch(e) {
					if (UFO.fv[0] == 6) return;
				}
				try {
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				}
				catch(e) {}
			}
			if (typeof _a == "object") {
				var _d = _a.GetVariable("$version"); // bugs in fp 6.21/6.23
				if (typeof _d != "undefined") {
					_d = _d.replace(/^\S+\s+(.*)$/, "$1").split(",");
					UFO.fv = [parseInt(_d[0], 10), parseInt(_d[2], 10)];
				}
			}
		}
	},

	hasRequired: function(id) {
		var _l = UFO.req.length;
		for (var i = 0; i < _l; i++) {
			if (typeof UFO.foList[id][UFO.req[i]] == "undefined") return false;
		}
		return true;
	},
	
	hasFlashVersion: function(major, release) {
		return (UFO.fv[0] > major || (UFO.fv[0] == major && UFO.fv[1] >= release)) ? true : false;
	},

	writeSWF: function(id) {
		var _fo = UFO.foList[id];
		var _e = document.getElementById(id);
		if (UFO.pluginType == "npapi") {
			if (UFO.uaHas("gecko") || UFO.uaHas("xml")) {
				while(_e.hasChildNodes()) {
					_e.removeChild(_e.firstChild);
				}
				var _obj = UFO.createElement("object");
				_obj.setAttribute("type", "application/x-shockwave-flash");
				_obj.setAttribute("data", _fo.movie);
				_obj.setAttribute("width", _fo.width);
				_obj.setAttribute("height", _fo.height);
				var _l = UFO.optAtt.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[UFO.optAtt[i]] != "undefined") _obj.setAttribute(UFO.optAtt[i], _fo[UFO.optAtt[i]]);
				}
				var _o = UFO.opt.concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") UFO.createObjParam(_obj, _o[i], _fo[_o[i]]);
				}
				_e.appendChild(_obj);
			}
			else {
				var _emb = "";
				var _o = UFO.opt.concat(UFO.optAtt).concat(UFO.optExc);
				var _l = _o.length;
				for (var i = 0; i < _l; i++) {
					if (typeof _fo[_o[i]] != "undefined") _emb += ' ' + _o[i] + '="' + _fo[_o[i]] + '"';
				}
				_e.innerHTML = '<embed type="application/x-shockwave-flash" src="' + _fo.movie + '" width="' + _fo.width + '" height="' + _fo.height + '" pluginspage="http://www.macromedia.com/go/getflashplayer"' + _emb + '></embed>';
			}
		}
		else if (UFO.pluginType == "ax") {
			var _objAtt = "";
			var _l = UFO.optAtt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.optAtt[i]] != "undefined") _objAtt += ' ' + UFO.optAtt[i] + '="' + _fo[UFO.optAtt[i]] + '"';
			}
			var _objPar = "";
			var _l = UFO.opt.length;
			for (var i = 0; i < _l; i++) {
				if (typeof _fo[UFO.opt[i]] != "undefined") _objPar += '<param name="' + UFO.opt[i] + '" value="' + _fo[UFO.opt[i]] + '" />';
			}
			var _p = window.location.protocol == "https:" ? "https:" : "http:";
			_e.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + _objAtt + ' width="' + _fo.width + '" height="' + _fo.height + '" codebase="' + _p + '//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + _fo.majorversion + ',0,' + _fo.build + ',0"><param name="movie" value="' + _fo.movie + '" />' + _objPar + '</object>';
		}
	},
		
	createDialog: function(id) {
		var scrollWindow = window.scroll(0,0); // DW IE bugfix to scroll to top before building the modal window
		var _fo = UFO.foList[id];
		UFO.createCSS("html", "height:100%; overflow:hidden;");
		UFO.createCSS("body", "height:100%; overflow:hidden;");
		UFO.createCSS("#xi-con", "position:absolute; left:0; top:0; z-index:1000; width:100%; height:100%; background-color:#fff; filter:alpha(opacity:75); opacity:0.75;");
		UFO.createCSS("#xi-dia", "position:absolute; left:50%; top:50%; margin-left: -" + Math.round(parseInt(_fo.xiwidth, 10) / 2) + "px; margin-top: -" + Math.round(parseInt(_fo.xiheight, 10) / 2) + "px; width:" + _fo.xiwidth + "px; height:" + _fo.xiheight + "px;");
		var _b = document.getElementsByTagName("body")[0];
		var _c = UFO.createElement("div");
		_c.setAttribute("id", "xi-con");
		var _d = UFO.createElement("div");
		_d.setAttribute("id", "xi-dia");
		_c.appendChild(_d);
		_b.appendChild(_c);
		var _mmu = window.location;
		if (UFO.uaHas("xml") && UFO.uaHas("safari")) {
			var _mmd = document.getElementsByTagName("title")[0].firstChild.nodeValue = document.getElementsByTagName("title")[0].firstChild.nodeValue.slice(0, 47) + " - Flash Player Installation";
		}
		else {
			var _mmd = document.title = document.title.slice(0, 47) + " - Flash Player Installation";
		}
		var _mmp = UFO.pluginType == "ax" ? "ActiveX" : "PlugIn";
		var _uc = typeof _fo.xiurlcancel != "undefined" ? "&xiUrlCancel=" + _fo.xiurlcancel : "";
		var _uf = typeof _fo.xiurlfailed != "undefined" ? "&xiUrlFailed=" + _fo.xiurlfailed : "";
		UFO.foList["xi-dia"] = { movie:_fo.ximovie, width:_fo.xiwidth, height:_fo.xiheight, majorversion:"6", build:"65", flashvars:"MMredirectURL=" + _mmu + "&MMplayerType=" + _mmp + "&MMdoctitle=" + _mmd + _uc + _uf };
		UFO.writeSWF("xi-dia");
	},

	expressInstallCallback: function() {
		var _b = document.getElementsByTagName("body")[0];
		var _c = document.getElementById("xi-con");
		_b.removeChild(_c);
		UFO.createCSS("body", "height:auto; overflow:auto;");
		UFO.createCSS("html", "height:auto; overflow:auto;");
	},

	cleanupIELeaks: function() {
		var _o = document.getElementsByTagName("object");
		var _l = _o.length
		for (var i = 0; i < _l; i++) {
			_o[i].style.display = "none";
			for (var x in _o[i]) {
				if (typeof _o[i][x] == "function") {
					_o[i][x] = null;
				}
			}
		}
	}

};
})) + ")();";

// fucntion to embed the player
location.href = "javascript:(" + encodeURI(uneval(function() { window.loadPlayer = function(params,location,img,dims) {
	if(typeof(params) == 'string') {
		cleanparams = params;
	} else {
		var cleanparams = '';
		//build the flashvars string
		for(i in params) {
			cleanparams += i +'='+ encodeURIComponent(params[i]) + '&';
		}
	}
	//and initialize the flash object
	var FO = { movie:"http://static.pplaylist.com/players/button_ppl.swf",
		id:"mediaplayer",
		width:dims,
		height:dims,
		majorversion:8,
		build:"0",
		bgcolor:"#FFFFFF",
		flashvars:cleanparams + "enablejs=true&autoplay=true",
		wmode:"transparent",
		xi:"true",
		ximovie:"http://static.pplaylist.com/players/ufo.swf"};
	var parent = document.getElementById(location);
	var test = window.UFO.create(FO, location);
		
	//Project Playlist requires Flash 8.0 and higher to play music
	if(window.UFO.fv[0] >= 8) {
		if(parent)parent.style.display = 'block';	
		if(img) {
			img.style.display = 'none';
		}
	}
}
})) + ")();";

// Format the searchstring
function encodeSearchURL(param) {
	param = param.replace(/\((\S|\s)*\)/g,'').replace(/\[(\S|\s)*\]/g,'').replace(/^\s+/, '').replace(/\s+$/, '').replace(/\./g,'_').replace(/-/g,'--').replace(/ /g,'-');
	return  encodeURIComponent(encodeURIComponent(param));
    }
// Style to display results
var css = "#minisearch {"+
	"position: absolute;"+
	"z-index: 1;"+
	"width: 40em;"+
	"background-color: white;"+
	"border: solid #8CAFDF 1px;"+
	"font-size: 0.8em;"+
	"display: none;"+
	"padding:10px;"+
"}"+
"#minisearch_summary {"+
	"margin-top: 1em;"+
	"clear: both;"+
	"padding: 1em;"+
	"overflow: auto;"+
	"height: 16em;"+
"}"+
"#minisearch_results {"+
	"padding: 0;"+
	"margin: 0;"+
	"list-style-type: none;"+
"}"+
"#minisearch_results li {"+
	"line-height: 1.2em;"+
	"vertical-align: middle;"+
	"padding: 0.5em 0;"+
"}"+
"#minisearch_results img {"+
	"width: 16px;"+
	"height: 16px;"+
	"vertical-align: middle;"+
"}"+
"#minisearch_resc {"+
	"display: none;"+
	"padding: 0.5em 0 0 0;"+
"}"+
"#minisearch_resc p {"+
	"margin: 0;"+
"}"+
"#minisearch .loc {"+
	"margin: 0;"+
	"color: #000000;"+
	"font-size: 0.8em;"+
"}"+
"#minisearch_close {"+
	"float: right;"+
	"width:2em;"+
	"background: #000000;"+
	"border:0;"+
	"color: #ffffff;"+
"}"+
"#minisearch_progress {"+
	"text-align: center;"+
"}"+
"#minisearch .ap_vlarge {"+
	"vertical-align: middle;"+
"}"+
".player_container_mini {"+
	"display: none;"+
	"width: 16px;"+
	"height: 16px;"+
	"float: left;"+
	"margin: 0 5px 0 0;"+
"}"+
".player_img_mini {"+
	"margin: 0 5px 0 0;"+
"}"+
".player_img_mini, .sr_add {"+
"border: none;"+
"}";

// Get and display the results of the search
function getSearch(searchstring) {
var searchurl = 'http://search.playlist.com/async/search/minisearch/' + encodeSearchURL(searchstring);
$('minisearch_term').innerHTML = searchstring;
$('minisearch_term2').innerHTML = searchstring;
$('minisearch_results').innerHTML = "";
GM_xmlhttpRequest({
    method: 'GET',
    url: searchurl,
    headers: {
        'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function (responseDetails) {
	var results = $('minisearch_results');
	switch(responseDetails.status) {
	case 200:
    var search = eval(responseDetails.responseText);
	$('minisearch_moreresults').href = 'http://search.playlist.com/tracks/' + encodeSearchURL(searchstring);
	var j = 0;
	var ln = search.body.searchresults.length;
					if(ln) {
						var res;
						for(var i=0;i<ln;i++) {
						res = search.body.searchresults[i];
						if(res.urllocation.substr(res.urllocation.length-4,res.urllocation.length) != ".mp3") {
						var key = 'sdf883jsdf22';
						sbox = new Array(255);
						mykey = new Array(255);
						res.urllocation = decrypt(res.song_url, key);
						}
						result = document.createElement('li');
						result.innerHTML = '<div class="player_container_mini" id="player'+i+'"></div>';
						result.innerHTML += '<a href="#" id="playimg'+i+'" onclick="loadPlayer(\'song_url='+res.song_url+'&trackid='+ res.trackid + '&linkid=' + res.linkid + '\',\'player'+i+'\',this,16);return false;"><img class="player_img_mini" src="http://images.playlist.com/static10/img/search/play_button.gif" alt="play"/></a>';
						result.innerHTML += '<a href="#add" onclick="window.open(\'http://www.playlist.com/playlist/additem/'+res.id+'?destination='+encodeURIComponent(document.location.href)+'\');"><img src="http://images.playlist.com/static10/img/search/ppladd.gif" alt="Add to your music playlist" class="sr_add"></a> ';
						result.innerHTML += res.title;
						result.innerHTML += ' <a href="'+res.urllocation+'">(visit site)</a>';
						result.innerHTML += '<p class="loc">'+(res.urllocation.length > 50 ? res.urllocation.substring(0,50) + '...' : res.urllocation) + '</p>';
						results.appendChild(result);
						j++;
					}
					} else {
						result = document.createElement('li');
						result.innerHTML = 'No results found for <em>'+searchstring+'</em>';
						results.appendChild(result);
					}
					$('minisearch_progress').style.display = 'none';
					$('minisearch_resc').style.display = 'block';
				break;
	case 503:
				result = document.createElement('li');
				result.innerHTML = 'Track search is currently unavailable - please check back later!';
				results.appendChild(result);
				break;
	default:
				result = document.createElement('li');
				result.innerHTML = 'An error occurred during your search - status code: ' + responseDetails.status;
				results.appendChild(result);
				break;
    }
	},
	onerror: function (responseDetails) {
				result = document.createElement('li');
				result.innerHTML = 'An error occurred while processing the search results';
				results.appendChild(result);
	}
});
}

// Position the results and initiate the search
function mp3Search(sender, artist, song) {
minisearch = $('minisearch');
minisearch.style.top = (getTop(sender) + sender.offsetHeight) + 'px';
minisearch.style.left = (getLeft(sender) + sender.offsetWidth) + 'px';
minisearch.style.display = 'block';
$('minisearch_progress').style.display = 'block';
var searchstring = artist+' '+song;
getSearch(searchstring);
}

// Displays the results
var minisearch = document.createElement('div');
minisearch.id = 'minisearch';
minisearch.innerHTML = '<input type="button" id="minisearch_close" onclick="document.getElementById(\'minisearch\').style.display = \'none\';" value="X"/>'+
'<div class="left">Quick search results for <em id="minisearch_term">&nbsp;</em></div>'+
'<div id="minisearch_summary">'+
'<div id="minisearch_progress">'+
'<p>Now searching Project Playlist for:</p>'+
'<p><em id="minisearch_term2">&nbsp;</em></p>'+
'<img src="http://images.playlist.com/static10/img/elements/indicator_vlarge.gif" alt="AJAX Progress" class="ap_vlarge"/>'+
'</div><div id="minisearch_resc"><ul id="minisearch_results"></ul><p><a href="#" id="minisearch_moreresults">Click here for more results</a></p>'+
'</div></div>';
document.body.appendChild(minisearch);

//Append the style
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}

// Add events to the links
// This requires a lot of xpath to create an all encompassing script
var artists = new Array();
var dev = document.evaluate(
	'//td[@class="titleColEven"]/a[contains(@href,"artist-redirect")] | //td[@class="titleColOdd"]/a[contains(@href,"artist-redirect")] | //td[@class="titleCol"]/a[contains(@href,"dm_dp_adp")]',
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < dev.snapshotLength; i ++) {
artists[i] = dev.snapshotItem(i).innerHTML;
}
if (artists.length > 0) {
var dev2 = document.evaluate(
	'//td[@class="titleColEven"]/table/tbody/tr/td/a | //td[@class="titleColOdd"]/table/tbody/tr/td/a | //td[@class="titleCol"]/a[contains(@href,"dm_dp_trk")]',
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < dev2.snapshotLength; i ++) {
dev2.snapshotItem(i).setAttribute('track', i);
dev2.snapshotItem(i).href = '#';
dev2.snapshotItem(i).addEventListener('click',function (e) {mp3Search(this, artists[this.getAttribute('track')], this.innerHTML);e.preventDefault();},false)
}
} else {
var artist = document.evaluate('//div[@class="buying"]/span/a', document, null, 
XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if ($('btAsinTitle')) {
artist = $('btAsinTitle');
}
var dev = document.evaluate(
	'//td[@class="titleCol"]/a | //td[@class="titleCol"]/child::text()',
	document, 
	null, 
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < dev.snapshotLength; i ++) {
if ( (dev.snapshotItem(i).nodeType == 3) && (dev.snapshotItem(i).nodeValue.match(/\d+\./) == null) ) {
link = document.createElement('a');
link.href = '#';
link.innerHTML = dev.snapshotItem(i).nodeValue;
insertAfter(link, dev.snapshotItem(i));
remove(dev.snapshotItem(i));
link.addEventListener('click',function (e) {mp3Search(this, artist.innerHTML, this.innerHTML);e.preventDefault();},false);
} else if ( (dev.snapshotItem(i).nodeType != 3) && (dev.snapshotItem(i).href.match('dm_ap_alb') == null) && (dev.snapshotItem(i).href.match('dm_sp_adp') == null) ) {
dev.snapshotItem(i).href = '#';
dev.snapshotItem(i).addEventListener('click',function (e) {mp3Search(this, artist.innerHTML, this.innerHTML);e.preventDefault();},false);
}
}
}