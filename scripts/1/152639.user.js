// ==UserScript==
// @name	MobileStoneage autobot
// @namespace	net.gfsrv.mobilestoneage.bot
// @include	http://live.mobilestoneage.gfsrv.net/*
// @version	6
// @grand GM_getValue
// @grand GM_setValue
// @grand GM_deleteValue
// @grand GM_log
// @require http://code.jquery.com/jquery-1.7.2.min.js
// @require http://cdnjs.cloudflare.com/ajax/libs/xregexp/2.0.0/xregexp-min.js
// ==/UserScript==
// testet with app version v1.11.19
/**
 * codes = [];
    store = JSON.parse(localStorage[ "stoneagegameallycodes" ]);
    for (code in store) {
		if (store[code].s == "self" ){
			codes.push(store[code].c.toUpperCase());
		}
	}
	for (code in store) {
		if (store[code].s == "c" ){
			codes.push(store[code].c.toUpperCase());
		}
	}
console.log("klancodes_import = [\""+codes.toString().split(",").join("\", \"")+"\"]",codes.length);
 */
var codetoadds_string = "";

var mywindow = (typeof (unsafeWindow) === 'undefined') ? window : unsafeWindow;
var $jq = jQuery.noConflict();
mywindow.$jq = mywindow.jQuery = $jq;
mywindow.XRegExp = XRegExp;

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
	console = { assert: function () {}, clear: function () {}, count: function () {}, debug: function () {}, dir: function () {}, dirxml: function () {}, error: function () {}, exception: function () {}, group: function () {}, groupCollapsed: function () {}, groupEnd: function () {}, info: function () {}, log: function () {}, profile: function () {}, profileEnd: function () {}, table: function () {},time: function () {}, timeEnd: function () {}, timeStamp: function () {}, trace: function () {}, warn: function () {} };
}
if (typeof(JSON) === 'undefined') {
	JSON = { parse: function () {}, stringify: function () {} };
}

try {
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
				if (typeof(nr) === 'number') { 
					return this.debuglevel = nr;
				}
				if (typeof(nr) === 'string') { 
					switch(new String(nr).toLowerCase()){
					case 'off':
						return this.debuglevel = 0;
						break;
					case 'error':
						return this.debuglevel = 1;
						break;
					case 'warn':
						return this.debuglevel = 2;
						break;
					case 'info':
						return this.debuglevel = 3;
						break;
					case 'debug':
						return this.debuglevel = 4;
						break;
					default:
						return false;
					}
				}
				return false; 
			}
	};
	mywindow.DEBUG =DEBUG;
	var registry = {
			getValue: function(key, def, type){
//				DEBUG.debug(key+", "+ def+", "+type+", "+registry.getValue.caller);
				switch (type) {
				case 'localStorage':
					return mywindow.localStorage[ key ] || def;
					break;
				default:
				case 'GM':
					return GM_getValue(key, def);
					break;
				}
			},
			setValue: function(key, value, type){
//				DEBUG.debug(key+", "+ value+", "+type+", "+registry.setValue.caller);
				switch (type) {
				case 'localStorage':
					mywindow.localStorage[ key ] = value;
					return mywindow.localStorage[ key ];
					break;
				case 'GM':
				default:
					return GM_setValue(key,value);
					break;
				}
				
			},
			deleteValue: function(key, type){
				DEBUG.debug(key+", "+type+", "+registry.deleteValue.caller);
				switch (type) {
				
				case 'localStorage':
					return delete mywindow.localStorage[ key ];
					break;
				default:
				case 'GM':
					return GM_deleteValue( key );
					break;
					
				}
				
			}
			
	};
	
	mywindow.registry=registry;
//}
	
	
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
	mywindow.kata = kata;
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
	mywindow.dateUtil=dateUtil;
	
	var utils = {
			refresh: function(url, seconds){
				try {
					if (url==="") url = window.location.href; //self
					if (typeof(seconds) !== "number") seconds = 0; //instant
					DEBUG.info("click on '"+url+"' in "+seconds+" s");
					setTimeout('window.location="'+ url +'"', seconds*1000); // reload to url every x minutes
				} catch (e) {
					DEBUG.warn(e);
				}
				
			},
			click: function(target, seconds) {
				try {
					if (!target) return false;
					if (typeof(seconds) !== "number") seconds = 0; //instant
					DEBUG.info("click on '"+target+"' in "+seconds+" s");
					setTimeout('$("'+target+'").trigger("click")', seconds*1000);
				} catch (e) {
					DEBUG.warn(e);
				}
				
			}
	};
//	mywindow.utils = utils;
	var loca = {
			language: null,
			languageDefault:  'DE',
			// LoCa
			'DE': {
				"info/language" : "Deutsch",
				'invite/successfullyinvited' : /Du hast (.*) in deinen Klan eingeladen./,
				'invite/alreadymember' : /(.*) ist bereits Mitglied deines Klans./,
				'invite/codenotfound' : 'Es wurde niemand mit diesen Klanglyphen gefunden.',
				'invite/cantinviteyourself' : "Du kannst dich nicht selbst in deinen Klan einladen.",
				"healer/moralrestored": "Du wurdest erfolgreich geheilt!",
				"label/next" : "n&auml;chster",
				"label/previous" : "vorheriger",
				"fight/msgBox/msgSuccess": "Sieg!", 
				"fight/msgBox/msgFail": "Niederlage ...", 
				"fight/msgBox/msgOther" : "Fehlschlag ...",
				"clan/msgBox/msgFail" : "Fehlschlag ...",
				/*<p>Du hast den Kampf verloren. Du hast <span class="icon icon_damage">(.*)</span> Gesundheit verloren und <span class="icon icon_damage">(.*)</span> Schaden an (.*) ausgeteilt.*/
				"fight/msgbox/insufficientHealth" : 'Nicht genügend Gesundheit ...',
				"fight/msgbox/insufficientHealthMsg" : "Deine Gesundheit ist zu gering zum Angreifen. Warte, bis deine Gesundheit regeneriert ist, nutze den Schamanen oder fülle sie im Shop wieder auf!",
				"fight/msgbox/insufficientRage" : "Nicht genügend Zorn ...",
				"fight/msgbox/insufficientRageMsg" : "Du hast nicht genug Zorn, um einen Gegner anzugreifen. Warte, bis neuer Zorn generiert wurde, und versuche es noch einmal.",
				"fight/msgBox/enemyDefeated" : "Dein Gegner ist besiegt und in die Flucht geschlagen. Er kann gerade nicht angegriffen werden."
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
	//__ = loca.getString;
	mywindow.loca = loca;
	/**
	 * hier ist alles drin. von spielerdaten bis hin zu spielmechanik
	 */
	var gamemeta = {
			xpcurrent: parseInt($jq('#statsBarXPlabel_value').text().split("/")[0],10),
			xpnextlevel: parseInt($jq('#statsBarXPlabel_value').text().split("/")[1],10),
			level: parseInt($jq('#statsBarLevel .statsBarValue i').text().replaceNonDigit(),10),
			skillpointsavaileable: $jq('#statsBarLevel').hasClass("pulsate"),
			premium: parseInt($jq('#statsBarPremium .statsBarValue').text().replaceNonDigit(),10),
			rage: parseInt($jq('#statsBarPvPEnergy .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
			rageMax: parseInt($jq('#statsBarPvPEnergy .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
			rageMin: 10,
			rageRegenerationTimeMax: 2*60,
			rageRegenerationTime: dateUtil.parseTime($jq('#statsBarPvPEnergy .statsBarLabel').text()),
			courage: parseInt($jq('#statsBarPvEEnergy .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
			courageMax: parseInt($jq('#statsBarPvEEnergy .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
			courageMin: 0,
			courageRegenerationTimeMax: 5*60,
			courageRegenerationTime: dateUtil.parseTime($jq('#statsBarPvEEnergy .statsBarLabel').text()),
			health: parseInt($jq('#statsBarHealth .statsBarValue .statsBarValueCurrent').text().replaceNonDigit(),10),
			healthMax: parseInt($jq('#statsBarHealth .statsBarValue .statsBarValueMax').text().replaceNonDigit(),10),
			healthMin: 25,
			healthRegenerationTimeMax: 3*60,
			healthRegenerationTimeMax:dateUtil.parseTime($jq('#statsBarHealth .statsBarLabel').text()),
			money: parseInt($jq('#statsBarBlood .statsBarValue').text().replaceNonDigit(),10),
			moneyMin: function(){
				//return 0; //TODO: in mobilestoneage not longer  needet. e.g. for the cage?
				//return 0 causes a loop between economy and fight, because minMoney*2 =0
				var healthcostfactor =1;
				if (this.level>=1) healthcostfactor = 80;
				if (this.level>=100) healthcostfactor = 190;
				return this.level *(this.healthMax) * healthcostfactor*2; //should be enough for 2 medikits
			},
			moneyRegenerationTimeMax: 60*60,
			moneyRegenerationTime: dateUtil.parseTime($jq('.statsBarLabel_netto .statsBarLabel').text()),
			msgBox: $jq('.msgBox').filter(':eq(0)'),
			msgBoxStatus: $jq('.msgBox').filter(':eq(0)').find('div div h3'),
			msgBoxMessage: $jq('.msgBox').filter(':eq(0)').find('div div p'),
			amortisationTimeMax: 1500
	};
	mywindow.gamemeta = gamemeta;
	gamemetaupdater = {
			init: mywindow.setInterval("gamemetaupdater.check()", 2*60*1000), //every 2 minutes;
			check: function(){
				DEBUG.info("updater.check for path: "+kata.path);
				stoneageheadvalues = JSON.parse(registry.getValue("stoneageheadvalues", "{}"));
				if (!stoneageheadvalues) {
					DEBUG.warn("Warning: no cachevalues availeable!");
					return;
				}
				gamemeta.xpcurrent = stoneageheadvalues.xpcurrent;
				gamemeta.xpnextlevel = stoneageheadvalues.xpnextlevel;
				gamemeta.level = stoneageheadvalues.level;
				gamemeta.skillpointsavaileable = stoneageheadvalues.skillpointsavaileable;
				gamemeta.premium = stoneageheadvalues.premium;
				gamemeta.rage = stoneageheadvalues.rage;
				gamemeta.rageMax = stoneageheadvalues.rageMax;
				gamemeta.rageRegenerationTime = stoneageheadvalues.rageRegenerationTime;
				gamemeta.courage = stoneageheadvalues.courage;
				gamemeta.courageMax = stoneageheadvalues.courageMax;
				gamemeta.courageRegenerationTime = stoneageheadvalues.courageRegenerationTime;
				gamemeta.health = stoneageheadvalues.health;
				gamemeta.healthMax = stoneageheadvalues.healthMax;
				gamemeta.healthRegenerationTimeMax = stoneageheadvalues.healthRegenerationTimeMax;
			},
			updateValues: function(){
				var cachevalues = {
						xpcurrent: gamemeta.xpcurrent,
						xpnextlevel: gamemeta.xpnextlevel,
						level: gamemeta.level,
						skillpointsavaileable: gamemeta.skillpointsavaileable,
						premium: gamemeta.premium,
						rage: gamemeta.rage,
						rageMax: gamemeta.rageMax,
						rageRegenerationTime: gamemeta.rageRegenerationTime,
						courage: gamemeta.courage,
						courageMax: gamemeta.courageMax,
						courageRegenerationTime: gamemeta.courageRegenerationTime,
						health: gamemeta.health,
						healthMax: gamemeta.healthMax,
						healthRegenerationTimeMax: gamemeta.healthRegenerationTimeMax
				};
				registry.setValue("stoneageheadvalues", JSON.stringify(cachevalues));
			}
	};
	mywindow.gamemetaupdater = gamemetaupdater;
	function Player(code, status, id){
		this.c = code;
		this.s = status; //new n (default), confirmed c, invited i(0 or 1), nonexistent non
	}
	
	var mobcodes = {
			codelist: JSON.parse(registry.getValue("stoneagegameallycodes",'{}')), //existing
			//codearraylist: new ArrayList(),
			add: function(codetoadd) { //tries to add the code if not exist and returns the success
				codetoadd = this.formatCode(codetoadd);
				if (!this.isValid(codetoadd)) {
					DEBUG.warn("preformattet code not valid: "+codetoadd);
					return false;
				}
				playerelem = new Player(codetoadd, "n");
				if (!this.has(playerelem)){
					this.codelist[ playerelem.c ] = playerelem;
					DEBUG.info("+++code added: "+ JSON.stringify(codetoadd));
					return true;
				} else {
					DEBUG.debug("---code '" +codetoadd+ "' already in codelist. status: " +this.codelist[ codetoadd ].s);
					return false; 
				}
			},
			clean: function(){
				for (var code in this.codelist){
					if (!this.codelist.hasOwnProperty(code)) continue;
					if (!this.isValid(code)) {
						console.warn(this.codelist[code]);
						delete this.codelist[code];
					}
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "non") {
						console.warn(this.codelist[code]);
						delete this.codelist[code];
					}
					if (code != code.toUpperCase()){
						DEBUG.warn("convert "+code+" to "+code.toUpperCase());
						this.codelist[code.toUpperCase()] = this.codelist[code];
						delete this.codelist[code];
					}
				}
				this.save();
			},
			isValid: function(code){
				return /([0-9a-zA-Z]{6})/.test(code);// && !/([a-zA-Z]{6})/.test(code);
			},
			has: function(hasplayer){
				return this.codelist.hasOwnProperty(hasplayer.c); //arrayindex the same as the code
			},
			getAll: function () { return this.codelist; },
			reset: function(passphrase) { 
				if (passphrase!="imsure") return "wtf do you want to do?";
				this.codelist = [ ];
				this.save();
			},
			getWithStatus: function(withstatus) {
				var array = [ ], 
				i = 0;
				for (var code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == withstatus) {
						array[ i++ ] = this.codelist[ code ];
					}
				}
				return array;
			},
			count: function(withstatus) {
				var size = 0, code;
				switch(withstatus){	
				case "all":
					for (code in this.codelist) {
						if (this.codelist.hasOwnProperty(code)) size++;
					}
					return size;
				default:
					for (code in this.codelist){
						if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == withstatus){
							size++;
						}
					}
				return size;
				}
			},
			save: function () { 
				//DEBUG.debug("save: "+JSON.stringify(this.codelist));
				registry.setValue("stoneagegameallycodes", JSON.stringify(this.codelist));
			},
			formatCode: function(code){
				code = code.toString().replace(/(\.| |,|-)/g ,"").trim().toUpperCase();
				return code;
			},
			parseAllycode: function(str) {
				if (typeof(str) != "string" || str.length === 0) return 0;
				str = " "+str.trim()+" ";
				DEBUG.debug("parseAllycode: "+str);
				var match,
				regex = XRegExp.globalize(/\b([A-Za-z0-9]{6})\b/),
				count = [ ],
				matches = [];
				count.newCode = 0;
				count.knownCode = 0;
				
				
				while (match = regex.exec(str)) {
					matches.push(match[1].toString());
				}
				matches = matches.unique(); //filter 
				for (var m in matches){
					if (matches.hasOwnProperty(m)){
						success = this.add(matches[m]);
						if (success) count.newCode++;
						else count.knownCode++;
					}
				}
				DEBUG.debug("count of found codes; new: "+ count.newCode +" known: "+ count.knownCode+" in view: "+kata.path);
				return count;
				//this.save();
			},
			getLastInvited: function () {
				for (var code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "i"){
						return this.codelist[ code ];
					}
				}
				return false;
			},
			setLastInvited: function(setLastInvitedstring){
				this.codelist[ setLastInvitedstring ].s = "i";
			},
			hasNext: function () {
				for (var code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s=="n"){
						return true;
					}
				}
				return false;
			},
			getNext: function () {
				for (var code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s == "i"){
						this.setStatus(this.codelist[ code ], "n"); //if the last i has no status - > n
					}
				}
				for (code in this.codelist){
					if (this.codelist[ code ].hasOwnProperty("s") && this.codelist[ code ].s =="n"){
						this.codelist[ code ].s = "i";
						this.save();
						return this.codelist[ code ].c; //first element with new will be returned
					}
				}
				return false;
			},
			setStatus: function(player, newstatus){
				this.codelist[ player.c ].s = newstatus;
			},
			printStatus: function(target) {
				$jq(target).append("<p >"+this.count("n")+"+"+this.count("c")+"+ ("+this.count("non")+")="+this.count("all")+"</p > ");	//needs too much time, probably because of the loop
			},
			parseBody: function () { 
				registry.setValue('parseanothersites', registry.getValue('parseanothersites',"",'GM')+" <-$-> "+mywindow.document.getElementsByTagName('body')[ 0 ].innerHTML.untag(), "GM");
			},
			searchCodes: function() {
				if (!empty(codetoadds_string)) mobcodes.parseAllycode(codetoadds_string);
				$jq('.broadcast a p').each(function(){
					mobcodes.parseAllycode($jq(this).text()); //
				});
				$jq('.comment a p').each(function(){
					mobcodes.parseAllycode($jq(this).text()); //
				});
				$jq('.commentMsg').each(function(){ 
					mobcodes.parseAllycode($jq(this).text()); //
				});
				mobcodes.save();
				mobcodes.printStatus('#statsBarXP');
				//utils.refresh(kata.path, 2*60); // reload every 30 seconds and check new (variable, because here are different views checked
			},
			/**
			 * prueft auf der seite /clan die statusboxen und ordnet sie dem letzten invite zu
			 * TODO: potentieller bug: /clan darf nicht in mehreren tabs offen sein, da lastInvited sonst falsch sein kann
			 */
			check: function () {
				try {
					statustext = ""+gamemeta.msgBoxMessage.text();
					//DEBUG.debug("statustext: "+ statustext)
					if (!statustext) return false;
					switch(true){
					case (statustext.contains(loca.getString("invite/successfullyinvited")))://existence confirmed, new for me
					case (statustext.contains(loca.getString("invite/alreadymember")))://existence confirmed, known for me
						this.setStatus(this.getLastInvited(), "c"); 
					break;
					case (statustext.contains(loca.getString("invite/codenotfound")))://nonexistent
						this.setStatus(this.getLastInvited(), "non"); 
					break;
					case (statustext.contains(loca.getString("invite/cantinviteyourself"))):// myself
						this.setStatus(this.getLastInvited(), "self");
					break;
					default:
						this.setStatus(this.getLastInvited(), statustext);
					break;
					}
					
					
				}
				catch (err) {
					DEBUG.error(err);
				}	finally {
					this.save();
				}
			}, 
			exportCodes: function(){
				codes = [];
				store = this.codelist;
				for (code in store) {
					if (store[code].s == "self" ){
						codes.push(store[code].c.toUpperCase());
					}
				}
				for (code in store) {
					if (store[code].s == "c" ){
						codes.push(store[code].c.toUpperCase());
					}
				}
				console.log("klancodes_import = [\""+codes.toString().split(",").join("\", \"")+"\"]",codes.length);
			}
	};
	mywindow.mobcodes = mobcodes;
	function AttackPlayer(){
		this.id = null;
		this.name = null;
		this.level = null;
		this.alliancecount = null;
		this.moneyloot = null;
	}
	var enemylist = { 
			attacklist: JSON.parse(registry.getValue("stoneagegamecurrentenemies",'{}')), //existingnew ArrayList(""),
			parseList: function(){
				return fight.enemylist();
			},
			add: function(player){
				this.attacklist[player.id] = player;
				this.save();
				return 
			},
			get: function(numberid){
				return (this.has(numberid) ? this.attacklist[numberid] : false); 
			},
			has: function(numberid){
				return this.attacklist.hasOwnProperty(numberid);
			},
			save: function () { 
				return registry.setValue("stoneagegamecurrentenemies",JSON.stringify(this.attacklist));
			},
			clean: function(){
				for (id in this.attacklist){
					if (!this.attacklist.hasOwnProperty(id)) continue;
					player = this.attacklist[id];
					if (!player.hasOwnProperty("lastAttack") || !player.hasOwnProperty("foundlvl") || player.id<0 && player.foundlvl<gamemeta.level){
						DEBUG.info("delete player: "+JSON.stringify(this.attacklist[id]));
						delete this.attacklist[id];
					}
				}
				this.save();
				//clean bots older than 
			}
	};
	mywindow.enemylist = enemylist;
	var fight = {
			lastEnemy: {
				wonMoney: function(){
					return (this.fightSuccessfull())
					? parseInt(gamemeta.msgBoxMessage.find('.icon_blood').text().replaceNonDigit(),10) 
							: -1;
				},
				enemyName: function(){
					str = gamemeta.msgBox.find('h5:eq(1)').text();
					xregex = XRegExp('(?<name>.*)(?:s Klan von )(?<count>\\d+)(?:.*)', '');
					xmatch = XRegExp.exec(str, xregex);
					return (xmatch != null && xmatch.hasOwnProperty('name')) ? xmatch.name : false;
				},
				enemyAlliancecount: function(){
					str = gamemeta.msgBox.find('h5:eq(1)').text();
					xregex = XRegExp('(?<name>.*)(?:s Klan von )(?<count>\\d+)(?:.*)', '');
					xmatch = XRegExp.exec(str, xregex);
					return (xmatch != null && xmatch.hasOwnProperty('count')) ? parseInt(xmatch.count, 10) : false;
				},
				enemyId: function(){
					return gamemeta.msgBox.find("form[action*='/fight/index'] input[type='hidden']").val();
				},
				fightSuccessfull: function(){
					return gamemeta.msgBoxStatus.text().contains(loca.getString("fight/msgBox/msgSuccess")) ? true : 
							(gamemeta.msgBoxStatus.text().contains(loca.getString("fight/msgBox/msgFail")) ? false : null);
				},
				logLastEnemy: function(){
					if (!gamemeta.msgBoxStatus.text().contains(loca.getString("fight/msgBox/msgSuccess")) && !gamemeta.msgBoxStatus.text().contains(loca.getString("fight/msgBox/msgFail"))) {//TODO: what about fail? key!
						return;
					}
					return enemylist.add(this.parseAttackBox());
				},
				parseAttackBox: function(){
					return {name: this.enemyName(),
						count: this.enemyAlliancecount(),
						money: this.wonMoney(),
						id: this.enemyId(),
						lastAttack: new Date().getTime(),
						foundlvl: gamemeta.level,
						lasAttackSuccessfull: this.fightSuccessfull()};
				}
			},
			attackNext:function (){
				
				if (gamemeta.msgBoxStatus.size() && gamemeta.msgBoxStatus.text().contains(loca.getString("fight/msgbox/insufficientHealth"))){
					//goto healer
					utils.click("form[action*='/healer/index'] button", 1);
					return
				}
				
				var worthToAttack = 500000;
				var enemyMostWorth = this.enemyMostworth();
				if (this.knownEnemyCountInList() == 10 && enemyMostWorth.money < worthToAttack){
					this.deleteCookie(); // erneuert die gegnerliste
				}
				// TODO: Bug: the cookie will only be deleted when the site is completly refreshed (not after a fight)
				if (gamemeta.rage > 0){
//					if (this.knownEnemyCountInList()==0){
//						utils.click(".GM_unusedEnemy", 2); // unbekannte gegner
//					}
					if (this.lastEnemy.wonMoney() > worthToAttack) {
						utils.click(".msgBox form[action*='/fight/index'] button", 2);//fight the same enemy again
					} else if (enemyMostWorth.hasOwnProperty("money") && enemyMostWorth.money > worthToAttack ){
						utils.click(".GM_mostworth", 2); //bester
					} else if ($jq('.GM_unusedEnemy').size()) {
						utils.click(".GM_unusedEnemy", 2); // unbekannte gegner
					} else if ($jq('.GM_mostworth').size()) {
						this.deleteCookie();
						utils.click(".GM_mostworth", 2); //bester
					} else {
						DEBUG.warn("probably a bug in attackNext");
						utils.click(".listView_rounded form[action*='/fight/index'] button", 2); //fallback next
					}
						
					return
				} else {
					if (gamemeta.money >= gamemeta.moneyMin()*5){
						utils.refresh("/economy", 2);
					} else {
						utils.refresh("/fight", this.getAttackAgainCountdown());
					}
					
				}
			},
			getAttackAgainCountdown: function(){ //gibt entweder die maximale taktik wartezeit oder bis die xp zum neuen level voll sind wieder
				//TODO: mut abziehen
				if ((gamemeta.xpnextlevel-gamemeta.xpcurrent)/4 < gamemeta.rageMax)
					return (gamemeta.xpnextlevel-gamemeta.xpcurrent)/4 * gamemeta.rageRegenerationTimeMax;
				else 
					return gamemeta.rageMax * gamemeta.rageRegenerationTimeMax * Math.max(Math.random(), 0.8);
			},
			enemyList: function(){
				var enemyList = [],
					row=0;
				$jq('.listView_rounded li').each(function(){
					var name = $jq(this).find('a dl dt h4').text();
					var level = $jq(this).find('a dl dd:eq(1)').text();
					var alliancecount = $jq(this).find('a dl dd:eq(2) small').text();
					var id = $jq(this).find('form[action*="/fight/index"] input[type="hidden"]').val();
					enemyList.push({name:name,
									level: level,
									alliancecount: alliancecount,
									id: id,
									isKnown: enemylist.has(id),
									enemyObj: enemylist.has(id) ? enemylist.get(id) : null,
									jqEnemy: $jq(this),
									row: row++});

				});
				return enemyList;
			},
			enemyMostworth: function(){
				var mostWorth = -1,
					obj = null,
					enemyList = fight.enemyList();
				for (var enemies in enemyList) {
					if (!enemyList.hasOwnProperty(enemies)) continue;
					var enemy = enemyList[enemies];
					if (enemy.isKnown && mostWorth <= enemy.enemyObj.money){
						mostWorth = enemy.enemyObj.money;
						obj = enemy;
					}
					
				}
				return {obj:obj,money:mostWorth};
			},
			knownEnemyCountInList: function(){
				var count=0;
				for (var enemies in enemyList) {
					if (!enemyList.hasOwnProperty(enemies)) continue;
					var enemy = enemyList[enemies];
					if (enemy.isKnown ){
						count++;
					}
					
				}
				return count;
			},
			showFightResult:function () {
				if ($jq('.fightItems').size() == 2){
					attack = 0;
					attacktimes = 0;
					defence = 0;
					defencetimes = 0;
					gamemeta.msgBox.find('.fightItems:eq(0) .fightItem').each(function () {
						offensivedata = parseInt($jq(this).data('attack').replace("Angriff: ",""));
						times = parseInt($jq(this).find("span").text().replace("× ",""), 10);
						attacktimes = attacktimes+times;
						attack = attack + parseInt(offensivedata,10)*parseInt(times, 10);
						//  DEBUG.debug(offensivedata, times, offensivedata*times)
					});
					gamemeta.msgBox.find('.fightItems:eq(1) .fightItem').each(function () {
						defencedata = parseInt($jq(this).data('defence').replace("Verteidigung: ",""), 10);
						times = parseInt($jq(this).find("span").text().replace("× ",""), 10);
						defence = defence + defencedata*times;
						defencetimes = defencetimes+times;
						//  DEBUG.debug(defencedata, times, defencedata*times)
					});
					gamemeta.msgBoxMessage.html(gamemeta.msgBoxMessage.html() + "<br> Angriffspunke: " + attack + " / Anzahl Einheiten: " + attacktimes);
					gamemeta.msgBoxMessage.html(gamemeta.msgBoxMessage.html() + "<br> Verteidigungspunkte: " + defence + " / Anzahl Einheiten: " + defencetimes);
				}
			},
			appendEnemylistInfos: function(){
				this.lastEnemy.logLastEnemy(); //to make sure the latest infos are set
				enemyList = this.enemyList();
				jqEnemyList = $jq('.listView_rounded li');
				for (var enemies in enemyList) {
					if (!enemyList.hasOwnProperty(enemies)) continue;
					var enemy = enemyList[enemies];
					
					if (enemy.isKnown) {
						enemy.jqEnemy.find('.btnFury').parent().prepend("<small id='enemyid"+enemy.id+"' class='gm_lastenemygain' style='background: none repeat scroll 0 0 #3E250A;border-radius: 11px 11px 11px 11px;display: block;font-size: 11px;font-weight: bold;position: absolute;padding:4px 10px;right: 140px;top:50%'>"+enemy.enemyObj.money+"</small>");
					} else enemy.jqEnemy.find('.btnFury').css("background-color","orange").addClass("GM_unusedEnemy");
				}
				if (this.knownEnemyCountInList()==0) return;
				var mostworth = this.enemyMostworth();
				if (mostworth.hasOwnProperty("obj")) 
					$jq(mostworth.obj.jqEnemy).find(".btnFury").addClass("GM_mostworth").css("background-color","red");
			},
			deleteCookie: function(){
				DEBUG.warn("Delete Cookie 'PHPSESSID'");
				return allCookies.setItem("PHPSESSID", "", new Date(1970, 1, 1));
				//allCookies.removeItem("PHPSESSID");
			}
	};
	mywindow.fight = fight;
	
	var economy = {
			highlightCheapestBuilding:function (){ //and click..
				if (kata.parameter("category")!="5" && kata.parameter("category")!=false )
					return; // wrong tab; Schutz instead of Infrastruktur
				var cheapest = {obj:null, amortisationtime:null, price:null};
				
				$jq('.listViewItem').each(function(){
					var income = parseInt($jq(this).find('.slaveItemValue strong').text().replaceNonDigit(),10);
					var price = parseInt($jq(this).find('button span.icon_blood:eq(0)').text().replaceNonDigit(),10);
					// Old version fix
					var amortisation = price/income;
					//DEBUG.debug(income,price,amortisation);
					if (!cheapest.amortisationtime || amortisation < cheapest.amortisationtime && price <= gamemeta.money - gamemeta.moneyMin()*4 ){//&& amortisation < gamemeta.amortisationTimeMax
						//console.log("replace previous cheapest "+cheapest.amortisationtime+" with "+price/income);
						cheapest.obj = this;
						cheapest.amortisationtime =  amortisation;
						cheapest.price =  price;
					}
				});
				if (cheapest.price <= gamemeta.money-gamemeta.moneyMin()*4) {
					$jq(cheapest.obj).find('button:eq(0)')
										.css("background-color", "red")
										.addClass('GM_mostworth');
					//$jq(cheapest.obj).find('button:eq(0) span.icon_blood:eq(0)').trigger('click');
					utils.click(".GM_mostworth", 1);
				} else {
					utils.refresh("/fight",  2);
				}
							
			}
	};
	mywindow.economy = economy;
	var quest = {
			onQuestPage: kata.view == 'quest',
			category: kata.parameter('category') ? kata.parameter('category') : 1,
			quests: function() {
				var quests = [],
					rownumber = 0;
				
				$jq('.mission').each(function(){
					percent = parseInt($jq(this).find('.listViewHeaderTopic_percent').text().replace("%",""),10);
					energyNeed = parseInt($jq(this).find('.btnEnergy span').text(),10);
					missingAbility = $jq(this).find('.missingAbility').size() ? true : false;
					questId = parseInt($jq(this).find('form[action*="quest/index"] input[name="id"]').val(),10);
					//lootPossible = $jq(this).find('.rewardLoot').size() ? true : false;
					//console.log(percent,energyNeed,missingAbility,questId);
					quests.push({	'percent':	percent,
									'percentfinished':  percent == 100,
									'energyneed': energyNeed,
									'missingAbility': missingAbility,
									'questId':	questId,
									'jq':this,
									'rownumber': rownumber++});
				});
				return quests;
			},
			getAvaileableQuests: function(){
				var quests =  this.quests(),
				availeableQuests = [];
				for (quest in quests){
					loopQuest = quests[quest];
					if (!loopQuest.percentfinished 
						&& !loopQuest.missingAbility
						&&  loopQuest.energyneed <= gamemeta.courage) {
						availeableQuests.push(loopQuest);
					}
				}
				return availeableQuests;
			},
			getBestQuest: function(){
				var availQuests = this.getAvaileableQuests(),
					bestQuest = {mission:undefined,highest:undefined};
				for (quest in availQuests) {
					loopQuest = availQuests[quest];
					if (!loopQuest.percentfinished 
						&& !loopQuest.missingAbility
						&&  loopQuest.energyneed <= gamemeta.courage) {
						if (!bestQuest.highest || loopQuest.energyNeed >= bestQuest.highest){
							bestQuest.highest = loopQuest.energyNeed;
							bestQuest.mission = loopQuest;
						}
					}
				}
				if (typeof (bestQuest.mission ) !== 'undefined') {
					return bestQuest.mission;
				} else {
					return null;
				}
			},
			doBestQuest: function(){
				var bestQuest = this.getBestQuest();
				
				if (bestQuest){
					$jq(bestQuest.jq).find('.btnEnergy').trigger('click');
					//utils.click('.mission .btnEnergy:eq('+bestQuest.rownumber+')', 2);
				}
				
			}
	};
	
	mywindow.quest = quest;
} catch (e) {
	console.error(e);
}
try  {
	// clancodes = "";
	// mobcodes.parseAllycode(clancodes);
	$jq(document).ready(function () {
		if ($jq('body > h1').text() == "Ein Fehler ist aufgetreten ..."){
			throw "Ein Fehler ist aufgetreten ...";
		}
		loca.setLanguage("DE"); //automatisieren :) zB mit navigator.language - crossbrowser?!
		//DEBUG.setDebugLvl(2);
		DEBUG.setDebugLvl(2);
		gamemetaupdater.updateValues();
		if (kata.server.contains('mobilestoneage') && !empty(kata.parameter("i")) && !empty(kata.parameter("h")) && !empty(kata.parameter("t") && kata.view != 'profile')){
			registry.setValue("sessionurl", "i/"+kata.parameter("i")+"/h/"+kata.parameter("h")+"/t/"+kata.parameter("t"), "GM");
		}
		switch (kata.view) {
		case 'home':
			mobcodes.searchCodes();
//			if (mobcodes.hasNext())
//				utils.refresh("/clan", 2);
//			 else 
				utils.refresh("/home/index/"+registry.getValue("sessionurl", "", "GM"), 2*60);
			break;
		case 'quest': 
			quest.doBestQuest();
			utils.refresh("/quest", 30*60);
			break;
		case 'fight':
			$jq('form[action^="/fight/bot/"]').each(function () {
				$jq(this).attr("action", $jq(this).attr("action").replace(/bot/g,"index"));
			});
			fight.appendEnemylistInfos();
			fight.showFightResult();
			fight.attackNext();
			enemylist.clean();
			break;
		case 'more':
			break;
		case 'enhancement':
			//utils.click(".btnFury", 0.2);
			//mywindow.setTimeout("$('.btnFury').trigger('click')",200);
			break;
		case 'profile':
			mobcodes.searchCodes();
			switch(kata.action) {
			case 'skills':
				break;
			case 'info':
				break;
			case 'comments':
				if (kata.parameter("id")!=false){
					userid = parseInt(kata.parameter("id"), 10); 
					
					$jq("ul.tabs").prepend("<li><a id='previous' href='/profile/comments/id/"+(userid-1)+"/"+registry.getValue("sessionurl", "", "GM")+"'> "+loca.getString("label/previous")+"</a> </li> ");
					$jq("ul.tabs").append("<li><a id='next' href='/profile/comments/id/"+(userid+1)+"/"+registry.getValue("sessionurl", "", "GM")+"'> "+loca.getString("label/next")+"</a> </li> ");
					if (userid > 1000 && userid < 918000){
						utils.click("#next", 2);
					}
				}
				
				break;
			}			
			break;
		case 'economy':
			economy.highlightCheapestBuilding();
			break;
		case 'bank':
			break;
		case 'healer':
			var bloodincave = parseInt($jq('#flavorContent .icon_blood:eq(0)').text().replaceNonDigit(),10);
			var bloodneedet = parseInt($jq("form[action*='/healer/index'] button .icon_blood").text().replaceNonDigit(),10);
//			console.log(bloodincave,bloodneedet);
			//DEBUG.info(bloodincave +" : "+bloodneedet);
			if (bloodincave >= bloodneedet){
				utils.click("form[action*='/healer/index'] button", 2);
			} else {
				//TODO: have to save the money in the cave
				//alert("ungenügend Zähne in der Höhle: aufladen!");
				utils.refresh(kata.view, Math.min(gamemeta.moneyRegenerationTime, 10*60)); //simple refresh in 10 minutes 
			}
				
			if (!$jq("form[action*='/healer/index'] button .icon_blood").size() || gamemeta.msgBoxMessage.text().contains(loca.getString("healer/moralrestored"))){
				utils.refresh("/fight", 2);
			}
			break;
			break;
		case 'shop':
			break;
		case 'lottery':
			break;
		case 'clan':
			
			switch(kata.action) {
			case 'invite':
				if (gamemeta.msgBoxMessage.size() > 0) mobcodes.check(); 
				//break;
			case 'index':
				mobcodes.printStatus('#tab1');
				if (mobcodes.hasNext()){
					$jq('#inviteInput_clancode').val(mobcodes.getNext());
					utils.click("form[action*='/clan/invite'] input[type='submit']", 1*Math.random()+0.5);
					//setTimeout('$(".simpleForm").submit()', 2000*Math.random()+500);
				} else {
					utils.refresh("/home/index/"+registry.getValue("sessionurl", "", "GM"), 2);
					//utils.refresh('/clan', 30*60); // reload every 30 minutes and check new
				}
				break;
			case 'myclan':
				mobcodes.printStatus('#statsBarXP');
				$jq('.contentBlock h4:first').before($jq('.pagination')[0].outerHTML); //blaetterfunktion auch ueber der tabelle
				break;
			case 'respond': //allyanfrage ablehnen/bestätigen
				utils.click(".listView_clanInvite li button", 1);
				break;
			}
			break;
			break;
		case 'highscore':
			break;
		case 'settings':
			break;
		case 'faq':
			break;
		case 'advertisement':
			break;
		case 'error': //action "sorry"
			throw "Ein Fehler ist aufgetreten ...";
		default:
			DEBUG.warn("unhandled view:"+kata.path);
			break;
			
		}
		
		$jq('a[href^="/profile/index/id/"]').each(function () {
			$jq(this).attr("href", $jq(this).attr("href").replace(/index/g,"comments"));
		});
	});
	
}
 catch (err)  {
	 console.error(err);
}
 try {
	$jq("body").removeClass("iscroll");
	//jquery bug name.replace is not a function on line 6725
	$jq('#footer').css({'bottom':'0','left':'0','position':'fixed','z-index':'400'}); //causes an jQuery bug
}
 catch (err)  {
	//console.log( err );
}
 