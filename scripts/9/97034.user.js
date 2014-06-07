// ==UserScript==
// @name           WoD - Gruppenaktivität
// @namespace      uptodate_userscripts
// @author		   uptodate
// @version		   1.4
// @description    Letzte Online Aktiväten der Gruppe anzeigen
// @include        http://*.world-of-dungeons.de/*
// ==/UserScript==

/*jslint evil: true, regexp: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
lastIndex, length, parse, parseJSON, prototype, push, replace, slice,
stringify, test, toJSON, toJSONString, toString, valueOf
*/


var JSON;
if (!JSON) {
    JSON = {};
}

(function () {
    "use strict";

    function f(n) {
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                this.getUTCFullYear() + '-' +
                f(this.getUTCMonth() + 1) + '-' +
                f(this.getUTCDate()) + 'T' +
                f(this.getUTCHours()) + ':' +
                f(this.getUTCMinutes()) + ':' +
                f(this.getUTCSeconds()) + 'Z' : null;
        };

        String.prototype.toJSON =
            Number.prototype.toJSON =
            Boolean.prototype.toJSON = function (key) {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = { // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string' ? c :
                '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {
        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case 'string':
            return quote(value);
        case 'number':
            return isFinite(value) ? String(value) : 'null';
        case 'boolean':
        case 'null':
            return String(value);
			
        case 'object':

            if (!value) {
                return 'null';
            }

            gap += indent;
            partial = [];
			
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }
                v = partial.length === 0 ? '[]' : gap ?
                    '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                    '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }
            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? '{}' : gap ?
                '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
                '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = '';
            indent = '';
            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }
            } else if (typeof space === 'string') {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            return str('', {'': value});
        };
    }
    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }
            throw new SyntaxError('JSON.parse');
        };
    }
    if (!Object.prototype.toJSONString) {
        Object.prototype.toJSONString = function (filter) {
            return JSON.stringify(this, filter);
        };
        Object.prototype.parseJSON = function (filter) {
            return JSON.parse(this, filter);
        };
    }
}());

Function.prototype.createDelegate = function(obj, args, appendArgs){
	var method = this;
	return function() {
		var callArgs = args || arguments;
		if (appendArgs === true){
			callArgs = Array.prototype.slice.call(arguments, 0);
			callArgs = callArgs.concat(args);
		}else if ((function(v){return typeof v === 'number' && isFinite(v);})(appendArgs)){
			callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
			var applyArgs = [appendArgs, 0].concat(args); // create method call params
			Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
		}
		return method.apply(obj || window, callArgs);
	};
};

var script = {
	version				: "1.4",
	lastUpdate			: '20.02.2011',
	develop 			: false,
	iframe				: null,
	div					: null,
	activeList			: [],
	trys 				: 0,
	defaultMail			: 1,
	mail				: this.defaultMail,
	defaultMinutes		: 10,
	lastUpdateDate		: new Date(),
	minutes				: this.defaultMinutes,
	lastChanges			: function () {
		return 	'<b>Letzte Änderungen:</b> (<i>' + this.lastUpdate + '</i>)<br/><br/>' +
'<b>Version 1.4:</b><br/>' +
				' - es ist nicht mehr möglich die Ladezeiten anzupassen</br>' +
				'<b>Version 1.3:</b><br/>' +
				' - serverschondes Ladesystem eingebaut</br>' +
				'<b>Version 1.2:</b><br/>' +
				' - Nachladeoptimierungen</br>' +
				' - sofortige Änderung bei den Einstellungen</br>' +
				' - Optische Verbesserungen</br>' +
				'<b>Version 1.1:</b><br/>' +
				' - Google Chrohme Unterstützung</br>' +
				' - Fehlerbehebung bei den Schnellnachrichten</br>' +
				'<b>Version 1.0:</b><br/>' +
				' - Schnellnachricht</br>' +
				' - Einstellungsmöglichkeiten<br/>';
	},
	getElByClsName		: function (classname, node) {  
		var a, re, els, i, j;
		if (!node) {
			node = document.getElementsByTagName("body")[0];
		}
		a = [];     
		re = new RegExp('\\b' + classname + '\\b');
		els = node.getElementsByTagName("*");     
		for (i = 0, j = els.length; i < j; i = i + 1)  {    
			if (re.test(els[i].className)) {
				a.push(els[i]);  	
			}
		}
		return a;    
	},
	getFiElByClsName	: function (classname, node) {  
		var a, re, els, i, j;
		if (!node) {
			node = document.getElementsByTagName("body")[0];
		}
		a = [];     
		re = new RegExp('\\b' + classname + '.?\\b');
		els = node.getElementsByTagName("*");     
		for (i = 0, j = els.length; i < j; i = i + 1)  {    
			if (re.test(els[i].className)) {
				a.push(els[i]);  	
			}
		}
		return a;    
	},
	log					: function (log) {
		if (typeof(unsafeWindow) !== "undefined" && this.develop === true && unsafeWindow.console) {
			unsafeWindow.console.log(log);
		}
	},
	dir					: function (log) {
		if (typeof(unsafeWindow) !== "undefined" && this.develop === true) {
			unsafeWindow.console.dir(log);
		}
	},
	getActivPlayer		: function () {
		var list = [], reg, el, entry, name, time, listEntry, i, node;
		if(this.iframe !== null) {
			node = this.iframe.contentDocument;
			reg = /(?:<span class="content_table_mainline">)(<a href=".*?".*?<\/a>)(?:.*)(<span class="hero_activity.*?<\/span>)(?:.*)/;

			el = this.getFiElByClsName('content_table_row_', node);
			
			for(i = 0; i < el.length; i = i + 1)
			{
				if (el[i].children[1].lastChild.className === "content_table_subline") {
					entry = el[i].children[1].innerHTML;
				}
				else {
					entry = el[i].children[2].innerHTML;
				}
				
				name = entry.replace(reg, '$1').replace("\n", "");
				time = entry.replace(reg, '$2').replace("\n", "");
				listEntry = {name: name , lastActiv: time};
				list.push(listEntry); 
			}
		}
		this.activeList = list;
		this.lastUpdateDate = new Date();
		
		GM_setValue("activeList", {date: this.lastUpdateDate, value: list}.toJSONString());
		this.paintDiv();
	},
	createIframe		: function () {
		var el, curBody, iframe ;
		/*
		el = this.getElByClsName('gadget medals');
		if (el.length <= 0) {
			el = this.getElByClsName('gadget hero');	
		}
		*/
		el = this.getElByClsName('gadget hero');	
		if (el.length > 0) {
			curBody = el[0];
			
			iframe = document.createElement('IFRAME');
			iframe.id = "uptodate_userscripts_iframe";
			//iframe.hidden = true;
			
			iframe.style.visibility='hidden';
			iframe.height = "1px";
			iframe.width = "1px";
			iframe.className  = "test"; 
			iframe.src = 'http://' + location.host + '/wod/spiel/dungeon/group.php?TABLE_SORT_COL=16&TABLE_SORT_DIR=ASC&TABLE_PAGE=1';
			curBody.appendChild(iframe);
			return iframe;
		}
		else 
		{
			return null;
		}
		
	},
	createDiv			: function () {
		var div, elements, parent;
		elements = this.getElByClsName('hero_full');
		if (elements.length > 0 && elements[0] !== null) {
			parent = elements[0];
			div = document.createElement('DIV');
			parent.appendChild(div);
			return div;
		}
		else {
			return null;
		}
	},
	paintDiv			: function (withReloader) {
		if (typeof(withReloader) === "undefined") {
			withReloader = true;
		}
		
		var i, html ="<table style='white-space: nowrap; font-size: 11px; font-family: monospace; z-index:5; position: absolute; width: 100%; background-color: black; border: 1px solid grey; margin-top: 15px; padding: 2px 0 2px 5px;'><tr></tr>", entry, 
		currentTime = this.lastUpdateDate,
		mailImg, mailPath, mailHtml, heroMailId, mailHtmlWithId, relImg;
		
		mailImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAAXNSR0IArs4c6QAAAAZQT' +
				'FRFEhET////9Ot6DgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gYBDgoUo' +
				'iYW0QAAAChJREFUCNdjYICB+n8MCWwMAVwMHkIMLkoMTk4MrotAbKAIUBwoCwYAnFAHAIobt+MAAAAASUVORK5CYII=';
		
		mailPath = "/wod/spiel/pm/pm_new.php?mail_to=F####&is_popup=1";		
		mailHtml = '<img src=' + mailImg + ' style="cursor:pointer" alt="@" onclick="return wo(\'' + mailPath + '\')">&nbsp;'; 
		
		for (i = 0; i < this.activeList.length; i = i + 1) {
			entry = this.activeList[i];
			
			if(entry.name.search(/.+wod\/spiel\/.+?id=(\d+).*/) != -1 && this.mail === 1){
				heroMailId = parseInt(RegExp.$1);
				
				mailHtmlWithId = mailHtml.replace("####", heroMailId + "");
			}
			else {
				mailHtmlWithId = "";
			}
			
			html += '<tr><th style="text-align: left;">' + mailHtmlWithId + entry.name + '</th><td>' + entry.lastActiv + '</td></tr>';
		}
		
		relImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z' +
				'0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAl1JREFUeNqkU0uIklEUvr/vN/hOdFMQ4ibQRYvGVRBEuG1' +
				'lKKYLtSdujFyItGlAI8xBNxNIGrhRZhEuBBcFkWgubGELDcJ34GPABz7/zv0pc4amFnPg/nDvf853v/Od7xI' +
				'kSaLzBAN/CII4cehwOB5JJJI7TCbTABcs2u32++VyGU4mk+928/DlBPXZAfB4PAdKpdLF4/EILpeLAASpVCq' +
				'Uz+cnnU7nYTwef30mgNvtttDp9H3Yv9xsNl/X6/U1tVr9QKvVcsViMcrlcuNWq3VVLpe/gBxRKBTao+1SgiI' +
				'DJBrC4fB+JBI5ikajXrj1Rq1Wm8E/ZDKZBIvF4qPZbL7JZrOvbGn8LywWiyebzZKFQoEsFotktVolXS7XF1y' +
				'7ZeD3+7mwaKeLIVE2nU45pVKJZLFYlCa45X6//207Bbvdflsmk71hMBhEMBj8MR6PO4PBoL1arQLHx8d2n89' +
				'3TyQSIRqNhtukWM9msz8AIJbRarWyR6MRms/nmslkogEABGP7DqCHsViMJxQKdQKBQAUMLsBISQ6H82ELAJt' +
				'LQBMNh0PqhnQ6vWk2m0/4fP4hiDmAlLs7rRKVSoWVyWTmWwAwDQUATBDQRjqdjtbtdpe/ik9EIBDAqs9/7yn' +
				'RwDQXG40GgoIhBpBKpdg8z51O594ph2qg1ae7Z5SRvF5vGXpt9no9L7ApGY1GHvSJyuXyHIzzCtr6BOx0oP5' +
				'9WJ5EIvH2TCvD2K6DYEd6vV6A2WAg3B6IStbr9TBY+fE/3wIOm812GabxTKFQ3MIaw3Q+w9gSqVTq4K+P6Tz' +
				'xU4ABAEUZSIXDrdS7AAAAAElFTkSuQmCC';		
		
		html += '<tr><td><br><img src="' + relImg + '" ' +
				'style="cursor:pointer" id="reloadBtn">&nbsp;Lastupdate: </td><td><br>' + this.formatDate(currentTime, 'HH:mm:ss') + '</td></tr>' +
				'<tr><td colspan="2" style="text-align:right;color: SteelBlue; font-family: Georgia;font-size: 10px;font-variant: normal;font-weight: bold;"><span id ="uptodate_version">Version '+ this.version +'</span>&nbsp;&nbsp;<a href="http://userscripts.org/users/291947" target="_blank">@uptodate</a> </td</tr>' +
				'</table>';
	
		this.div.innerHTML = html;
		
		var version = document.getElementById('uptodate_version');
		
		if (version && unsafeWindow && unsafeWindow.wodToolTip) {
			unsafeWindow.wodToolTip(version, this.lastChanges());
		}
		
		var button = document.getElementById("reloadBtn");
		
		if (button.addEventListener) {
			button.addEventListener('click', this.reloadAction.createDelegate(this), false);
		}
		else if (button.attachEvent) {
			button.attachEvent('onclick', this.reloadAction.createDelegate(this));
		}
		if (withReloader === true) {
			this.reloader();
		}
	},
	isIframeExist		: function () {
		if (document.getElementById("uptodate_userscripts_iframe")) {
			return true;
		}
		else {
			return false;
		}
	},
	isInIframe			: function () {
		if (window.top != window.self) {
			return  true;
		} 
		else {
			return false;
		}
	},
	loadFromConfig		: function () {
		var entryIntervall = GM_getValue("konfig_intervall"),
		entryMail = GM_getValue("konfig_mail");
		
		if(typeof(entryIntervall) === "number") {
			this.minutes = entryIntervall;
		}
		else {
			this.minutes = this.defaultMinutes;
		}
		
		if(typeof(entryMail) === "number") {
			this.mail = entryMail;
		}
		else {
			this.mail = this.defaultMail;
		}
	},
	parse				: function (jsonstring) {
		return jsonstring.parseJSON();
	},
	parseDate			: function (value) {
		var a;
		if (typeof value === 'string') {
			a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
			if (a) {
				return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
			}
		}
		return value;
	},
	isActiveList		: function () {
		var time = this.minutes,
			jsonString = GM_getValue("activeList"),
			object = {},
			aktDate = new Date(),
			difference,
			jsonDate;
	
		if(typeof(jsonString) === "string")
		{
			object = this.parse(jsonString);
			
			if (typeof(object) === "object" && object.date && object.value.length > 0) {
				jsonDate = this.parseDate(object.date);
				
				difference = ((aktDate - jsonDate) / 1000 / 60);
				
				if ( difference < time) {
					this.lastUpdateDate = jsonDate;
					this.activeList = object.value;
					return  true;
				}
				else {
					return false;
				}	
			}
			else {
				return false;
			}
		}
		else {
			return false;
		}	
	},
	init				: function () {
		var setTime, configTime;
		if (this.isIframeExist() === false && this.isInIframe() === false) {
			
			this.loadFromConfig();
			this.div = this.createDiv();
			
			
		//	this.isActiveList();
			if(this.isActiveList() === false)
			{
				this.iframe = this.createIframe();
				this.checkIframeIsReady();
			}
			else {
				
				configTime = 60 * this.minutes * 1000;
				setTime = new Date() - this.lastUpdateDate;
			
				this.paintDiv(false);
				setTimeout(this.reloadAction.createDelegate(this), configTime - setTime);
			}
				
			
			if (typeof(unsafeWindow) !== "undefined" && this.develop === true ) {
				unsafeWindow.script = this;
			}
		}
		else 
		{
			return;
		}
	},
	checkIframeIsReady 	: function () {
		if (this.iframe !== null) {
			var el = this.getFiElByClsName('content_table_row_', this.iframe.contentDocument);
			if ( el.length === 0 && this.trys <= 10)
			{
				this.trys = this.trys + 1;
				setTimeout(this.checkIframeIsReady.createDelegate(this), 500);
				return;
			}
			else
			{
				this.getActivPlayer();
				return;
			}
		}
		else {
			return;
		}
	},
	reloadAction		: function () {
		this.reloadIframe();
		this.trys = 0;
		this.checkIframeIsReady();
	
	},
	reloadIframe		: function () {
		if(this.iframe)
		{
			this.iframe.src = this.iframe.src;
		}
		else
		{
			this.iframe = this.createIframe();
		}
	},
	reloader			: function () {
		var time = 60 * this.minutes * 1000;
		
		setTimeout(this.reloadIframe.createDelegate(this), (time - 5000));
		setTimeout(this.getActivPlayer.createDelegate(this), time);
	},
	formatDate			: function (date, format) {
		format=format+"";
		var result="";
		var i_format=0;
		var c="";
		var token="";
		var y=date.getYear()+"";
		var M=date.getMonth()+1;
		var d=date.getDate();
		var E=date.getDay();
		var H=date.getHours();
		var m=date.getMinutes();
		var s=date.getSeconds();
		var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
		// Convert real date parts into formatted versions
		var value=new Object();
		if (y.length < 4) {y=""+(y-0+1900);}
		value["y"]=""+y;
		value["yyyy"]=y;
		value["yy"]=y.substring(2,4);
		value["M"]=M;
		value["MM"]=this.LZ(M);
		value["d"]=d;
		value["dd"]=this.LZ(d);
		value["H"]=H;
		value["HH"]=this.LZ(H);
		if (H==0){value["h"]=12;}
		else if (H>12){value["h"]=H-12;}
		else {value["h"]=H;}
		value["hh"]=this.LZ(value["h"]);
		if (H>11){value["K"]=H-12;} else {value["K"]=H;}
		value["k"]=H+1;
		value["KK"]=this.LZ(value["K"]);
		value["kk"]=this.LZ(value["k"]);
		if (H > 11) { value["a"]="PM"; }
		else { value["a"]="AM"; }
		value["m"]=m;
		value["mm"]=this.LZ(m);
		value["s"]=s;
		value["ss"]=this.LZ(s);
		while (i_format < format.length) {
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length)) {
				token += format.charAt(i_format++);
				}
			if (value[token] != null) { result=result + value[token]; }
			else { result=result + token; }
			}
		return result;
	},
	LZ 					: function (x) {
		return(x<0||x>9?"":"0")+x
	},
	setMailConfig		: function () { 
		var mail = prompt("Schnellnachricht Symbol anzeigen ? (0 = Nein, 1 = Ja):", GM_getValue("konfig_mail") ? GM_getValue("konfig_mail") : script.mail === 1 ? 1 : 0);
		if(typeof mail == "string")
		{
			mail = parseInt(mail);
			
			if(!isNaN(mail)){
				if(mail === 0 || mail === 1)
				{
					GM_setValue("konfig_mail", mail);
					script.loadFromConfig();
					script.paintDiv();
				}
				else
				{
					GM_deleteValue("konfig_mail");
					script.loadFromConfig();
					script.paintDiv();
					alert("Nur 0 oder 1 ist erlaubt, es wird der Standardwert verwendet.");	
				}
			}
			else
			{
				alert("Änderung abgebrochen. Es wurden nicht nur Ziffern eingegeben.");	
			}
		}
		else
		{
			alert("Änderung abgebrochen. Der alte Wert bleibt bestehen.");	
		}
	},
	setIntervallConfig	: function () { 
		var intervall = prompt("Bitte den Zeitintervall (in Minuten) eingeben:", GM_getValue("konfig_intervall") ? GM_getValue("konfig_intervall") : script.minutes );
		
		if(typeof intervall == "string")
		{
			intervall = parseInt(intervall);
			
			if(!isNaN(intervall)){
				if(intervall > 0)
				{
					GM_setValue("konfig_intervall", intervall);
					script.loadFromConfig();
				}
				else
				{
					GM_deleteValue("konfig_intervall");
					script.loadFromConfig();
					alert("0 Minuten sind nicht erlaubt, es wird der Standardwert verwendet.");	
				}
			}else{
				alert("Änderung des Aktualisierungsintervalls abgebrochen. Es wurden nicht nur Ziffern eingegeben.");	
			}
		}
		else
		{
			alert("Änderung des Aktualisierungsintervalls abgebrochen. Der alte Wert bleibt bestehen.");	
		}
	}
};
script.init();

GM_registerMenuCommand("WoD - Gruppenaktivität: Schnellnachricht", script.setMailConfig);
/*GM_registerMenuCommand("WoD - Gruppenaktivität: Nachladeintervall", script.setIntervallConfig);*/
