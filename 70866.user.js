// ==UserScript==
// @name           jQueryWatch
// @namespace      http://userscripts.org/people/336
// @description    See method calls on an object inside a jQuery wrapper (requires Greasemonkey)
// @include        *
// @source         http://userscripts.org/scripts/show/70866
// @identifier     http://userscripts.org/scripts/source/70866.user.js
// @version        0.1
// @date           2010-03-08
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
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
// 0.1 (2010-03-08)
// 	original release

(function jQueryWatch(){

var global = unsafeWindow, slice = Array.prototype.slice;

var reTwitter = /(^|\.)twitter\.com$/;
function getWatchFunction(jQuery, args$, blnElement) {
	if (blnElement) {	// jQuery is a member element
			// profile_tab and children
		if (reTwitter.test(global.location.host)) {
			var profileTab = jQuery;
			while (profileTab && profileTab.id != 'profile_tab' && profileTab.nodeName != 'LI') {
				profileTab = profileTab.parentNode;
			}
			if (profileTab && profileTab.id == 'profile_tab') {
				var watched = global.watched = global.watched || {};
				var fn = getArrayLogger(watched[profileTab.id] = watched[profileTab.id] || []);
				fn.watchName = profileTab.id;
				return fn;
/*javascript:(function(){ var b=document.body,h,t=$('li.active'),m={page:page,twttr:twttr};
 t.each(function(){$(this).removeClass('active');}); h=b.innerHTML; b.innerHTML='';
 t=document.createElement('script'); t.type='text/javascript';
 t.src='https://s3.amazonaws.com/twitter_production/a/1267643725/javascripts/twitter-https.js';
 document.getElementsByTagName('head')[0].appendChild(t); setTimeout(function(r,rr){
 var page=window.page,twttr=window.twttr,$=window.$;
 for(var p in {user_screenname:0,user_fullname:0,controller_name:0,action_name:0})
 page[p]=m.page[p]; $.ajaxSetup({data:{
 authenticity_token:(twttr.form_authenticity_token=m.twttr.form_authenticity_token)}});
 twttr.statusKinds={UPDATE:1,SHARE:2}; twttr.ListPerUserLimit=m.twttr.ListPerUserLimit;
 setTimeout(function(){if(!r){return setTimeout(arguments.callee,1000);} $('.user').isUser();
 initializePage();
 setTimeout(function(){try{alert(window.watched['profile_tab'].join('\n'));}
 catch(x){alert(x);}},1000);},1000); b.innerHTML=h; r=true; }, 1500); })(); void(0);
*/
			}
		}
			// default
		return null;
	}
	// return the union of all watch functions of member elements
	var arrWatch = [], arrWatchNames = [];
	for (var i = 0, fn; i < jQuery.length; i++) {
		fn = getWatchFunction(jQuery[i], args$, true);
		if (fn && (!fn.watchName || -1 == arrWatchNames.indexOf(fn.watchName))) {
			arrWatch.push(fn);
			arrWatchNames.push(fn.watchName);
		}
	}
	switch (arrWatch.length) {
		case 0: return null;
		case 1: return arrWatch[0];
		default: return getFunctionsApplier(arrWatch);
	}
}

var tsStop = new Date((new Date()).getTime() + 60000);
function jQW_init() {
	try {
		var $ = global.jQuery; $();	// ensure that $ is a function
		var $fn_init = $.fn.init;

		$.fn.init = function jQW_$fnInit(varSelector, objContext) {
			var obj = $fn_init.apply(this, arguments);
			var fnWatch = getWatchFunction(obj, arguments);
			if (fnWatch) {
				var proto = obj.__proto__, base = {};
				obj.__proto__ = base;
				for (var p in base) { try {
					if(proto[p] === base[p]){ continue; }
					base[p] = proto[p];
					if (isFunction(proto[p])) {
						base[p] = function(){return this.__noSuchMethod__(p,slice.call(arguments));};
						copyProperties(proto[p], base[p]);
					}
				}catch(x){} }
				if(!('get' in base)){ base.get = function(i){return obj[i];}; }
				obj.__noSuchMethod__ = function jQW_noSuchMethod(strMethod, arrArgs) {
					return fnWatch(proto[strMethod].apply(this, arrArgs), obj, strMethod, arrArgs, arguments);
				};
			}
			return obj;
		};
		copyProperties($fn_init, $.fn.init);
	}
	catch (x) {
		if((new Date()) < tsStop){ setTimeout(arguments.callee, 0); }
	}
}

function getArrayLogger (arrLog) {
	return function jQW_logToArray(objDefault, jQuery, strMethod, arrArgs, objContext) {
		var now = new Date(), log = {
			 method: strMethod
			,args: arrArgs
			,context: objContext
			,stack: []
			,stackArguments: []
			,selector: jQuery.selector
			,tag: (jQuery[0] || {}).nodeName
			,time: now
			,toString: function jQW_log_toString(){
				var r = [this.time.getSeconds(), this.time.getMilliseconds()].join(':') + ' '
						+ (this.selector ? JSON.stringify(this.selector) : this.tag) + ' ' + this.method + '(';
				for(var a=this.args,i=0; i<a.length; i++){ r+=(i?', ':'')+(JSON.stringify(a[i]) || a[i]); }
				r += ')';
				if (this.stack.length) {
					var stack = [];
					for (var i=0,a,p; a=this.stackArguments[i]; i++) {
						var p = [];
						for(var j=0; j<a.length; j++) {
							p.push(isFunction(a[j]) ? getFunctionName(a[j], 40) : a[j]);
						}
						stack.push(getFunctionName(this.stack[i], 60) + '(' + p.join(',') + ')');
					}
					r += ' in ' + stack.join('; ');
				}
				return r;
			}
		};
		var caller = objContext.callee.caller;
		while (caller) {
			log.stack.push(caller);
			log.stackArguments.push(slice.call(caller.arguments || []));
			caller = caller.caller;
			if(-1 != log.stack.indexOf(caller)){ caller = '[recurse ' + getFunctionName(caller) + ']'; }
		}
		var hash = [now.getSeconds(), now.getMilliseconds()].join(':'), d = 0;
		while(hash in arrLog){ d += 1; hash = hash.replace(/(#.*)?$/, '#' + d); }
		arrLog.push(arrLog[hash] = log);
		return objDefault;
	};
}

function getFunctionsApplier (arrFunctions) {
	return function jQW_applyFunctions() {
		for (var i = 0; i < arrFunctions.length; i++) {
			try{ arguments[0] = arrFunctions[i].apply(this,arguments); }catch(x){}
		}
		return arguments[0];
	};
}

function copyProperties (from, to) {
	try {
		for (var p in from) {
			try {
				if (from.hasOwnProperty(p)) {
					to[p] = from[p];
				}
			}catch(x){}
		}
	}catch(x){}
	for (var a = ['__proto__', 'prototype', 'constructor'], i = 0, p; p = a[i]; i++) {
		try{ to[p] = from[p]; }catch(x){}
	}
}

function getFunctionName (fn, intTruncateAnonymous) {
	return (fn && fn.name) || (''+fn).replace(/\n/g,'').replace(/\s{2,}/gm,' ').replace(
			new RegExp('^(.{' + ((intTruncateAnonymous || Infinity) - 1) + '}).*'), '$1\u2026');
}

function isFunction (varVar) {
	return ('function' == (typeof varVar) || varVar instanceof Function);
}

jQW_init();

})();
