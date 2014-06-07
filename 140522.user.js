// ==UserScript==
// @name	greasemonkey kata basics
// @namespace	net.niebes.greasemonkey.template
// @include	http://*/*
// @version	1
// @require http://code.jquery.com/jquery-1.7.2.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/xregexp/2.0.0/xregexp-min.js
// ==/UserScript==

var mywindow = (typeof (unsafeWindow) !== 'undefined') ? unsafeWindow : window,
	$jq = jQuery.noConflict();

String.prototype.trim = function () { "use strict"; return this.replace(/^\s+|\s+$/g, ''); };
String.prototype.ltrim = function () { "use strict"; return this.replace(/^\s+/, ''); };
String.prototype.rtrim = function () { "use strict"; return this.replace(/\s+$/, ''); };
String.prototype.untag = function () { "use strict"; return this.replace(/<[^>]*>/g, ''); }; //removes all tags
String.prototype.clean = function () { "use strict"; return this.replace(/<\/?[^>]+(>|$)/g, ''); }; //similar to untag, should also delete script and css values
String.prototype.replaceNonDigit = function () { "use strict"; return this.replace(/[^0-9]/g, ''); };
String.prototype.contains = function (s) { "use strict"; return (this.search(s) !== -1); };
Object.prototype.equals = function(x) // copied from http://stackoverflow.com/a/1144249
{
  var p;
  for(p in this) {
      if(typeof(x[p])=='undefined') {return false;}
  }
  for(p in this) {
      if (this[p]) {
          switch(typeof(this[p])) {
              case 'object':
                  if (!this[p].equals(x[p])) { return false; } break;
              case 'function':
                  if (typeof(x[p])=='undefined' ||
                      (p != 'equals' && this[p].toString() != x[p].toString()))
                      return false;
                  break;
              default:
                  if (this[p] != x[p]) { return false; }
          }
      } else {
          if (x[p])
              return false;
      }
  }
  for(p in x) {
      if(typeof(this[p])=='undefined') {return false;}
  }
  return true;
};
Array.prototype.unique = function () { //copied from... dont know
	var a = [ ],
		l = this.length,
		i, j;
	for (i = 0; i < l; ++i) {
		for (j = i + 1; j < l; ++j) {
			if (this[ i ] === this[ j ]){
				j = ++i;
			}
		}
		a.push(this[ i ]);
	}
	return a;
};
function empty (mixed_var) { // copied from http://phpjs.org/functions/empty:392
	var key;
	if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || typeof mixed_var === 'undefined') {
		return true;
	}
	if (typeof mixed_var == 'object') {
		for (key in mixed_var) {
			return false;
		}
		return true;
	} 
	return false;
}
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (Object.prototype.toString.call(value) == '[object Array]') {
                s = 'array';
            } //else object
        } else {
            s = 'null';
        }
    }
    return s;
}
if (typeof(console) === 'undefined') {
	console = { log: function () {}, info: function () {}, warn: function () {}, error: function () {} };
}
if (typeof(JSON) === 'undefined') {
	JSON = { parse: function () {}, stringify: function () {} };
}

var DEBUG = {
	debuglevel: 3, //off (0), error(1), warn(2), info (3), debug(4)
	GM_log: function(str){
		if (typeof (GM_log) === 'function') GM_log(str);
	},
	error: function(errormsg){
		if (this.debuglevel >= 1){
			console.error(errormsg);
			this.GM_log(errormsg);
		}
	},
	warn: function(warning){
		if (this.debuglevel >= 2){
			console.warn(warning);
			this.GM_log(warning);
		}
	},
	info: function(info){
		if (this.debuglevel >= 3){
			console.info(info);
			this.GM_log(info);
		}
	},
	debug: function(debug){
		if (this.debuglevel >= 4){
			console.log(debug);
			this.GM_log(debug);
		}
	},
	setDebugLvl: function(nr){
		if (typeof(nr) === 'number') { this.debuglevel = nr;}
		if (typeof(nr) === 'string') { 
			switch(new String(nr).toLowerCase()){
			case 'off':
				this.debuglevel = 0;
				break;
			case 'error':
				this.debuglevel = 1;
				break;
			case 'warn':
				this.debuglevel = 2;
				break;
			case 'info':
				this.debuglevel = 3;
				break;
			case 'debug':
				this.debuglevel = 4;
				break;
			default:
				return false;
			}
		}
		return false; 
	}
};
var registry = {
	getValue: function(key, def, type){
		switch (type) {
		case 'GM':
			return GM_getValue(key, def);
			break;
		case 'localStorage':
		default:
			return mywindow.localStorage[ key ] || def;
		break;
		}
	},
	setValue: function(key, value, type){
		switch (type) {
		case 'GM':
			return GM_setValue(key,value);
			break;
		case 'localStorage':
		default:
			mywindow.localStorage[ key ] = value;
		return mywindow.localStorage[ key ];
		break;
		}
		
	},
	deleteValue: function(key, type){
		switch (type) {
		case 'GM':
			return GM_deleteValue( key );
			break;
		case 'localStorage':
		default:
			return delete mywindow.localStorage[ key ];
		break;
		}
	}
};


var kata = {
	url: mywindow.location.href,
	server: ""+mywindow.location.protocol+"//"+mywindow.location.host,
	path: mywindow.location.pathname.split('?')[ 0 ],
	view: mywindow.location.pathname.split("/")[ 1 ],
	action: mywindow.location.pathname.split("/")[ 2 ] ? location.pathname.split("/")[ 2 ] : "index", 
	parameter: function () { //returns the array of the parameter or the value of the requestet (true of no value, but parameter existing)
		if (mywindow.location.href.split('?').length <= 1 && mywindow.location.pathname.replace("/","").split("/").length <=2 )
			return false;

		var httpparams = mywindow.location.href.split('?').length >1 ? mywindow.location.href.split('?')[ 1 ].split('&') : null,
			kataparams = mywindow.location.pathname.replace("/", "").split('/'),
			res = [ ];
		for (var i in httpparams) //extract ?foo=bar&baz parameter
		{
			if (httpparams.hasOwnProperty(i))
			{
				v = httpparams[ i ].split("=");
				res[ v[ 0 ] ] = v[ 1 ] ? v[ 1 ] : true;
			}
		}
		for (var j=0; j<kataparams.length;j++)	//extract /id/asfdsadfsdf/hash/foobar parameter
		{
		  if (j<2) continue; //view/action
		  res[ kataparams[j++] ] = kataparams[j] ?  kataparams[j] : true;
		}
		return (arguments.length > 0) ? ((res.hasOwnProperty(arguments[ 0 ])) ? res[ arguments[ 0 ] ] : false) : res; //returns the value of param is given or an array of all params
	},
	title: mywindow.document.title
};
var allCookies = {//copied from https://developer.mozilla.org/en-US/docs/DOM/document.cookie
	getItem: function (sKey) {
		if (!sKey || !this.hasItem(sKey)) { return null; }
		return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
	},
	setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
		if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return; }
		var sExpires = "";
		if (vEnd) {
			switch (vEnd.constructor) {
			case Number:
				sExpires = vEnd === Infinity ? "; expires=Tue, 19 Jan 2038 03:14:07 GMT" : "; max-age=" + vEnd;
				break;
			case String:
				sExpires = "; expires=" + vEnd;
				break;
			case Date:
				sExpires = "; expires=" + vEnd.toGMTString();
				break;
			}
		}
		document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
	},
	removeItem: function (sKey, sPath) {
		if (!sKey || !this.hasItem(sKey)) { return; }
		document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
	},
	hasItem: function (sKey) {
		return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
	},
	keys: /* optional method: you can safely remove it! */ function () {
		var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
		for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
		return aKeys;
	}
};

var dateUtil = {
	//days: [ 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
	days: [ 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
	//months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	months: ["Jan", "Feb", "M&auml;r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
	/**
	 * @param Timestamp des gewuenschten Datum und das Datumformat
	 * @return formatiertes Datum (String) 
	 */
	getFormatedDate: function (timestamp, format)  {
		var currTime = new Date();
		currTime.setTime(timestamp);
		str = format;
		str = str.replace('[d]', this.dezInt(currTime.getDate(),2));
		str = str.replace('[D]', this.days[currTime.getDay()]);
		str = str.replace('[m]', this.dezInt(currTime.getMonth()+1,2));
		str = str.replace('[M]', this.months[currTime.getMonth()]);
		str = str.replace('[j]', parseInt(currTime.getDate()));
		str = str.replace('[Y]', currTime.getFullYear());
		str = str.replace('[y]', currTime.getFullYear().toString().substr(2,4));
		str = str.replace('[G]', currTime.getHours());
		str = str.replace('[H]', this.dezInt(currTime.getHours(), 2));
		str = str.replace('[i]', this.dezInt(currTime.getMinutes(), 2));
		str = str.replace('[s]', this.dezInt(currTime.getSeconds(), 2));
		return str;
	},
	/** * adds prefix digits to a number ('2'->'02')
	 *
	 * @param int   number
	 * @param int   digits
	 * @param str   prefix, default is '0'
	 */
	dezInt: function (num, size, prefix)  {
		prefix = (prefix) ? prefix : "0";
		var minus = (num < 0) ? "-" : "",
		result = (prefix === "0") ? minus : "";
		num = Math.abs(parseInt(num,10));
		size -= ("" + num).length;
		for (var i = 1; i <= size ; i++) {
			result += "" + prefix;
		}
		result += ((prefix !== "0") ? minus : "") + num;
		return result;
	},
	/**
	 * @return gibt den aktuellen DatumString im Format [d].[m].[Y] [H]:[i] zurueck
	 */
	getDate: function () {
		formattedDate = this.getFormatedDate(new Date().getTime(), '[d].[m].[Y] [H]:[i]');
		return formattedDate; 
	},
	parseTime: function (str) {
		
		var time = str.split(":").reverse(), seconds=0;
		switch(time.length){
		case 3:
			seconds += parseInt(time.pop(),10)*60*60; //hours
		case 2:
			seconds += parseInt(time.pop(),10)*60; //minutes
		case 1:
			seconds += parseInt(time.pop(),10)*1; //seconds
			break;
		default:
			seconds = -1;
			break;
		}
		return seconds;
	}
};

var utils = {
	refresh: function(url, seconds){
		if (url==="") url = window.location.href; //self
		if (typeof(seconds) !== "number") seconds = 0; //instant
		DEBUG.info("click on '"+url+"' in "+seconds+" s");
		setTimeout('window.location="'+ url +'"', seconds*1000); // reload to url every x minutes
	},
	click: function(target, seconds) {
		if (!target) return false;
		if (typeof(seconds) !== "number") seconds = 0; //instant
		DEBUG.info("click on '"+target+"' in "+seconds+" s");
		setTimeout('$("'+target+'").trigger("click")', seconds*1000);
	}
};

var loca = {
		language: null,
		languageDefault:  'DE',
		// LoCa
		'DE': {
			"info/language" : "Deutsch"
		},
		'EN': {
			"info/language" : "english"
		},
		setLanguage: function(lang){
			this.language = lang;
		},
		getString: function (property){
			if (!property) {
				DEBUG.warn("warning: argument 'property' not set");
				return false;
			}
			if (!this.language || !this[ this.language ]){
				DEBUG.warn("warning: your language isnt set");
				this.language = this.languageDefault;
			}			
			if (this[ this.language ].hasOwnProperty(property)){
				DEBUG.debug("property '"+this.language+"':'"+property+"' = > "+this[ this.language ][ property ]);
				return this[ this.language ][ property ]; 
			}  
			if (this[ this.languageDefault ].hasOwnProperty(property)){
				DEBUG.warn("warning: property '"+ property +"' in language "+ this.language +" not availeable. fallback to default "+ this.languageDefault);
				return this[ this.languageDefault ][ property ]; 
			}

			DEBUG.warn("error: property '"+ property +"' in neither in language "+ this.language +" and defaultlang '"+ this.languageDefault +"' availeable");
			return "--UNSET('"+ property +"')";
		}
};

try  {
	$jq(document).ready(function () {
		loca.setLanguage("DE"); //automatisieren :) zB mit navigator.language - crossbrowser?!
		//DEBUG.setDebugLvl(2);
		DEBUG.setDebugLvl(3);
		switch (kata.view) {
		case 'someview':
			switch(kata.action) {
			case 'someaction':
				break;
			}
			break;
		default:
			DEBUG.warn("unhandled view:"+kata.path);
			break;
		}
	});
}
 catch (err)  {
	 console.error(err);
}