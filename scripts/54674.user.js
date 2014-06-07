// ==UserScript==
// @name           Focus Search
// @namespace      http://userscripts.org/people/336
// @description    Responds to Ctrl+/ by attempting to find and focus a page's search box.
// @source         http://userscripts.org/scripts/show/54674
// @identifier     http://userscripts.org/scripts/source/54674.user.js
// @version        0.1.5
// @date           2013-11-07
// @creator        Richard Gibson <@gmail.com>
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
// 0.1.5 (2013-11-07)
// 	Fixed: Google Chrome unsafe window retrieval
// 0.1.4 (2011-04-21)
// 	Updated: basic support for Google Chrome
// 0.1.3 (2011-02-21)
// 	Fixed: Firefox/Windows security bug
// 0.1.2 (2011-02-19)
// 	Updated: update checking with meta.js
// 0.1.1 (2010-07-03)
// 	improved: expanded matching id fields
// 0.1 (2009-07-28)
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
	 name: "Focus Search"
	,namespace: "http://userscripts.org/people/336"
	,description: "Responds to Ctrl+/ by attempting to find and focus a page's search box."
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/54674"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/54674.user.js"
	,meta: "http://userscripts.org"        // metadata URL
			+ "/scripts/source/54674.meta.js"
	,version: "0.1.5"                      // version
	,date: "2013-11-07"                    // update date
};
var UPDATE = {
	 SCRIPT: SCRIPT
	,defaults: {checkDays: 3, version: SCRIPT.version, date: SCRIPT.date, name: SCRIPT.name,
			lastCheck: typeof(GM_xmlhttpRequest)!='undefined' ? 0 : (new Date()).getTime()}
	,getValue: (typeof(GM_getValue)!='undefined' && GM_getValue)
	,setValue: (typeof(GM_setValue)!='undefined' && GM_setValue)
	,HttpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,init: function() {
		if (this.setValue) {
			this.setValue('_UPDATE_setValue', true);
			if(!this.getValue('_UPDATE_setValue')){ this.setValue = false; }
		}
		if (!this.setValue) {
			this.getValue = this.setValue = function(n,v){return v;};
		}
	 	for (var name in this.defaults) {
	 		if(name in this){ delete this.defaults[name]; }
	 		else{ this[name] = this.getValue('_UPDATE_' + name, this.defaults[name]); }
	 	}
	 	for (var p in {checkDays:0, lastCheck:0}) { delete this.defaults[p]; }
	 	this.init = new Function('return "already done"; //arguments.callee.replaced.apply(this, arguments);');
		this.init.replaced = arguments.callee;
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
// constants
var NAME_RE = /query|search|^for|^q$/i;
var ID_RE = /query|search|^q$/i;
var UNSAFE = ((typeof unsafeWindow)=='object' && unsafeWindow);
	if (!UNSAFE || UNSAFE === (function(){return this;})()) {
		UNSAFE = document.createElement('a');
		try {
			UNSAFE.setAttribute('onclick', 'return (function(){return this;})();');
			UNSAFE = UNSAFE.onclick();
		} catch( x ) {
			UNSAFE = document.defaultView || (function(){return this;})();
		}
	}

// globals
var gobjLastFocused = null;

// MAIN --------------------------------------------------------------------------------------------
function focusSearch () {
	var arrInputs = document.getElementsByTagName('input');
	var arrCandidates = [];
	var idxNext = 0;	// next potential index (if we've already matched)
	var objMatch = null;
	for (var i = 0; i < arrInputs.length; i++) {
		if (arrInputs[i].type == 'text') {
			arrCandidates.push(arrInputs[i]);
		}
	}

	for (var i = 0, current; i < arrCandidates.length; i++) {
		current = arrCandidates[i];
		if ((!objMatch || idxNext) && (NAME_RE.test(current.name) || ID_RE.test(current.id))) {
			// first match (or first after the previous)
			objMatch = current;
			if (!gobjLastFocused || idxNext){ break; }	// we just replaced the previous match (if any)
		}
		if (!idxNext && current.isSameNode(gobjLastFocused)){ idxNext = i + 1; }	// found the previous
	}
	if (!objMatch) {
		// use the first candidate following the previous match, looping around if necessary
		objMatch = arrCandidates[idxNext % arrCandidates.length];
	}

	if (objMatch) {
		gobjLastFocused = objMatch;
		objMatch.focus();
		objMatch.select();
	}
}

function listener (e) {
	if (e.ctrlKey && (e.which || e.keyCode) == 191) { focusSearch(); }
}

// show new version information
function showUpdate(objUpdate, objScript) {
	if(UNSAFE.self !== UNSAFE.top){ return; }
	if(!arguments.length){ return UPDATE.check(arguments.callee); }
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

// HELPERS -----------------------------------------------------------------------------------------
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

// LISTENERS ---------------------------------------------------------------------------------------
attachEventListener(window, "keydown", listener, false);
if (document.readyState == 'complete') {
	showUpdate();
}
else {
	attachEventListener(window, 'load', function(){showUpdate();}, true);
}

})();