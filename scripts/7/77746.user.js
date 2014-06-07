// ==UserScript==
// @name           MapWheel
// @namespace      http://userscripts.org/people/336
// @description    Enables mousewheel zooming on all Google Maps
// @source         http://userscripts.org/scripts/show/77746
// @identifier     http://userscripts.org/scripts/source/77746.user.js
// @version        0.1.3
// @date           2011-02-21
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
// @include        *
// ==/UserScript==
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
// 0.1.3 (2011-02-21)
// 	Fixed: Firefox/Windows security bug
// 0.1.2 (2011-02-19)
// 	UPDATED: update checking with meta.js
// 0.1 (2010-05-27)
// 	original release
//
// -------------------------------------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts, select this script,
// and click Uninstall.
//
// -------------------------------------------------------------------------------------------------

(function(){

// AUTOMATIC UPDATES -------------------------------------------------------------------------------
var SCRIPT = {
	 name: "MapWheel"
	,namespace: "http://userscripts.org/people/336"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/77746"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/77746.user.js"
	,meta: "http://userscripts.org"        // metadata URL
			+ "/scripts/source/77746.meta.js"
	,version: "0.1.3"                      // version
	,date: "2011-02-21"                    // update date
};
var UPDATE = {
	 SCRIPT: SCRIPT
	,defaults: {checkDays: 3, version: SCRIPT.version, date: SCRIPT.date, name: SCRIPT.name,
			lastCheck: typeof(GM_xmlhttpRequest)!='undefined' ? 0 : (new Date()).getTime()}
	,getValue: (typeof(GM_getValue)!='undefined' && GM_getValue) || function(n,d){return d;}
	,setValue: (typeof(GM_setValue)!='undefined' && GM_setValue) || function(n,v){return v;}
	,HttpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,init: function() {
	 	for (var name in this.defaults) {
	 		if(name in this){ delete this.defaults[name]; }
	 		else{ this[name] = this.getValue('_UPDATE_' + name, this.defaults[name]); }
	 	}
	 	for (var p in {checkDays:0, lastCheck:0}) { delete this.defaults[p]; }
	 	this.init = new Function('return "already done";\n' + arguments.callee.toString());
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


// BEGIN SCRIPT ------------------------------------------------------------------------------------
var unsafe = ((typeof unsafeWindow) != 'undefined'
	? unsafeWindow
	: ((typeof window) != 'undefined'
		? window
		: (function(){return this;})()
	)
);
var strConstructor = 'GMap2', objConstructor = unsafe[strConstructor];

// take over references to strConstructor
delete unsafe[strConstructor];
unsafe.__defineSetter__(strConstructor, function(v){
	objConstructor = v;
	syncNewConstructor();
});
unsafe.__defineGetter__(strConstructor, function(){
	return ('function' == (typeof objConstructor) ? newConstructor : objConstructor);
});
syncNewConstructor();

// constructor replacement functions
function newConstructor () {
	objConstructor.apply(this, arguments);	// defer to real function
	if (this !== unsafe) {	// new GMap2(...)
		// enable scrollwheel zoom on load
		try {
			// add listener for load
			var listener = unsafe.GEvent.addListener(this, 'load', function(){
				unsafe.GEvent.removeListener(listener);	// cleanup
				try{ delete listener; }catch(x){}	// cleanup
				try{ this.enableScrollWheelZoom(); }catch(x){}
			});
		}
		catch(x) {
			// could not add listener; try polling
			var objThis = this, timeout = setInterval(function(){
				try {
					if(objThis.isLoaded()){ throw {}; }
				}
				catch(x){	// either we could not determine if the map is loaded, or it is
					clearInterval(timeout);	// cleanup
					try{ objThis.enableScrollWheelZoom(); }catch(x){}
					objThis = undefined;	// cleanup
				}
			}, 200);
		}
	}
}

function syncNewConstructor () {
	// try our hardest to make newConstructor look like the real deal
	for (var a = ['__proto__', 'prototype', 'constructor'], i = 0, p; p = a[i]; i++) {
		try{ newConstructor[p] = objConstructor[p]; }catch(x){}
	}
}

// generic helper functions
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

function attachEventListener (el, strEvent, fnListener, blnUseCapture) {
	try {
		el.addEventListener(strEvent, fnListener, blnUseCapture ? true : false);
	}
	catch (x) { try {
		el.attachEvent('on' + strEvent, fnListener);
	}
	catch (x) {} }
	return el;
}

// automatic updates
attachEventListener(window, 'load', showUpdate, true);
function showUpdate(objUpdate, objScript) {
	if(unsafe.self !== unsafe.top){ return; }
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

})();
