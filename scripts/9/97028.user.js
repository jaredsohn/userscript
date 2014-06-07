// ==UserScript==
// @name           Gawker Domain Saver
// @namespace      http://userscripts.org/people/336
// @description    Maintains current domain for in-network articles.
// @source         http://userscripts.org/scripts/show/97028
// @identifier     http://userscripts.org/scripts/source/97028.user.js
// @version        0.1.4
// @date           2011-04-21
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
// @include        http://gizmodo.com/*
// @include        http://jalopnik.com/*
// @include        http://io9.com/*
// @include        http://jezebel.com/*
// @include        http://kotaku.com/*
// @include        http://deadspin.com/*
// @include        http://gawker.com/*
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
// 0.1.4 (2011-04-21)
// 	Updated: basic support for Google Chrome
// 0.1.3 (2011-03-02)
// 	Fixed: new page styles
// 0.1.2 (2011-02-24)
// 	Fixed: new page styles
// 0.1.1 (2011-02-17)
// 	Updated: update checking with meta.js
// 0.1 (2011-02-14)
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

// constants
var SCRIPT = {
	name: "Gawker Domain Saver",
	namespace: "http://userscripts.org/people/336",
	description: "Maintains current domain for in-network articles.",
	source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/97028",
	identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/97028.user.js",
	meta: "http://userscripts.org"        // metadata URL
			+ "/scripts/source/97028.meta.js",
	version: "0.1.4",                     // version
	date: "2011-04-21"                    // update date
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

// global variables
var gstrHost = location.hostname;
var gstrLocalPrefix = location.href.substring(0, location.href.indexOf(gstrHost) + gstrHost.length);
var gobjUnsafeWindow = ((typeof unsafeWindow)=='object' && unsafeWindow);
	if (!gobjUnsafeWindow || gobjUnsafeWindow === (function(){return this;})()) {
		gobjUnsafeWindow = document.createElement('a');
		gobjUnsafeWindow.setAttribute('onclick', 'return (function(){return this;})();');
		gobjUnsafeWindow = gobjUnsafeWindow.onclick();
	}

// initialization
function init () {
	var isTop = (window.parent ? window.parent === window : gobjUnsafeWindow.parent === gobjUnsafeWindow);
	try {
		isTop = isTop || (window.parent || gobjUnsafeWindow.parent).location.hostname != location.hostname;
	}
	catch(x) {
		isTop = false;
	}
	if(isTop){ UPDATE.check(showUpdate); }

	// handle click events on offset links
	if(!isTop){ return; }
	var selHref = '[href]:not([href^="' + gstrLocalPrefix + '"])';
	gobjUnsafeWindow.jQuery('.cn_link{href}, .cn_link *{href}, .headline{href}, .headline *{href}'.replace(/\{href\}/g, selHref))
			.live('click', handleOffsiteClick);
}

// offsite click handler
function handleOffsiteClick (evt) {
		var link = this, urlOffsite=this.href;	// remember original location
		this.href = this.href.replace(/^https?:[\/]*[^\/]+/, gstrLocalPrefix);	// replace with onsite equivalent
		setTimeout(function(){link.href=urlOffsite;}, 1);	// restore as soon as possible
}

// show new version information
function showUpdate(objUpdate, objScript) {
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var style = [
		 'position:absolute; position:fixed; z-index:9999;'
		,'bottom:0; right:0;'
		,'border:2px solid black; padding:2px 2px 2px 0.5ex;'
		,'color:black; background:#ccc;'
	].join(' ');
	var elNotification = $E('div', {title: title, style: style}
		,$E('a', {href: objScript.source}, objScript.name + ' ')
		,$E('a', {href: objScript.identifier, style: 'color:red;background:yellow;'}, 'updated!')
		,$E('button', {onclick: 'this.parentNode.parentNode.removeChild(this.parentNode);',
				style: 'margin-left:1ex;vertical-align:super;'}, '\u00D7')	// multiplication sign
	);
	document.body.appendChild(elNotification);
}

// element creation
var $E = function createElement(strName, objAttributes, varContent /*, varContent, ...*/) {
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

if (document.readyState == 'complete') {
	init();
}
else {
	window.addEventListener("load", init, true);
}

})();
