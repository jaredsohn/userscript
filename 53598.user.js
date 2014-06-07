// ==UserScript==
// @name           Twitter Fix Web Replies
// @namespace      http://userscripts.org/people/336
// @description    Shows the tweet you're replying to, and optionally preserves in_reply_to data when replies do not begin with the @mention (e.g. for #fixreplies).
// @source         http://userscripts.org/scripts/show/53598
// @identifier     http://userscripts.org/scripts/source/53598.user.js
// @version        0.4.2
// @date           2010-06-09
// @creator        Richard Gibson <@gmail.com>; http://twitter.com/gibson042
// @contributor    DyNama
// @include        http://twitter.com/*
// @include        https://twitter.com/*
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
// 0.4.2 (2010-06-09)
// 	Improved: short-URL links include protocol (http:) when possible
// 	Improved: protected reference tweets should show a preview
// 0.4.1 (2010-06-01)
// 	New: short-URL link to insert a TweaK.tk link to the referenced tweet (suggestion: DyNama)
// 0.4 (2010-05-29)
// 	Updated: Since Twitter decided to hide *all* actual replies, I made the in-reply-to preservation an option, default false
// 0.3.5 (2010-05-03)
// 	New: reply-all link to preserve @-mentions (suggestion: DyNama)
// 	Fixed: retweet link works correctly with tweets containing "$"
// 0.3.2 (2010-04-03)
// 	New: retweet link to quote referenced text (suggestion: DyNama)
// 0.3.1 (2010-03-20)
// 	Fixed: hashtag search recursion
// 0.3 (2010-02-03)
// 	New: automatic updates
// 	New: referenced tweet preview
// 0.2 (2009-07-26)
// 	Fixed: recursive init
// 	Fixed: showError $-dependence
// 0.1 (2009-07-12)
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
	 name: "Twitter Fix Web Replies"
	,namespace: "http://userscripts.org/people/336"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/53598"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/53598.user.js"
	,version: "0.4.2"                     // version
	,date: "2010-06-09"                   // update date
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
			return this.HttpRequest({method: 'GET', url: this.SCRIPT.identifier, onload: function(r){
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
var IMG_SPINNER = 'http://s3.amazonaws.com/twitter_production/a/1265242857/images/spinner.gif';
var MAX_LENGTH = 140;
var URL_API_STATUS = ('https:' || location.protocol) + '//twitter.com/statuses/show/';
var URL_STATUS = {toString: function(strUser, strId){ return '/' + strUser + '/status/' + strId; }};

// global variables
var gblnPreserveLink = false;
var gblnPreserveReplyData = false; try{ gblnPreserveReplyData =
		GM_getValue('preserveReplyData', gblnPreserveReplyData); }catch(x){}
var gstrReplyPrefix = '.'; try{ gstrReplyPrefix =
		GM_getValue('replyPrefix', gstrReplyPrefix); }catch(x){}
var gstrRetweetPrefix = 'RT';
var gstrReferencedId = '';
var gstrReferencedName = '';
var gstrReferencedShortUrl = '';
var gstrReferencedText = '';
var gelReferencedLoading = null;
var gelReferencedName = null;
var gelReferencedText = null;
var gelReferencedTweet = null;
var gelReplyAll = null;
var gelRetweet = null;
var gelReferencedContainer = null;
var gelReferencedLinks = null;
var gelShortLink = null;
var gurlShortener = 'http://api.dot.tk/tweak/shorten?long=%u';
var gfnShortener = function(blnSuccess,objRequest,strResponse){ return strResponse.split('\n')[0]; };
var gstrShortenerPrefix = '\u21B7';	// semicircle arrow	[\u2190-\u21EA\u2794-\u27BE\uFFE9-\uFFEC]
var gblnShortLinkReplacesPrefix = true; try{ gblnShortLinkReplacesPrefix =
		GM_getValue('shortLinkReplacesPrefix', gblnShortLinkReplacesPrefix); }catch(x){}
var g$status = null;
var gfnStatusBoxVal = function(){};

// user settings
try {
	GM_registerMenuCommand(SCRIPT.name + ": Preserve reply data?", function(){try{
		GM_setValue('preserveReplyData', gblnPreserveReplyData =
				confirm('Preserve reply data? (makes prefixed replies private)'));
	}catch(x){}});
	GM_registerMenuCommand(SCRIPT.name + ": Set reply prefix", function(){try{
		var newVal = prompt('#fixreplies reply prefix:', gstrReplyPrefix);
		if (newVal !== null){ GM_setValue('replyPrefix', gstrReplyPrefix = newVal); }
	}catch(x){}});
	GM_registerMenuCommand(SCRIPT.name + ": Short link position", function(){try{
		GM_setValue('shortLinkReplacesPrefix', gblnShortLinkReplacesPrefix =
				confirm('Replace prefix "' + gstrReplyPrefix + '" with short link (when requested)?'));
	}catch(x){}});
} catch (x) {}

// "real" functions
function init (intTry) {
	var global = getUnsafeWindow(), $, $fn_init, $ajax;
	if (!global.$ && !(intTry >= 15)) {
		var objThis = this, fnThis = arguments.callee;
		window.setTimeout(function(){fnThis.call(objThis, (intTry || 0) + 1);}, 2000);
		return;
	}
	try {
		$ = global.$; $();	// ensure that $ is a function

		UPDATE.check(showUpdate);

		// user-friendly status box
		try {
			var elStatus = document.getElementById('status');
				// setup referenced tweet display
			gelReferencedLoading = $E('img', {style: 'float:left;display:none;', src: IMG_SPINNER});
			gelReferencedName = $E('a',
					{'class': 'tweet-url screen-name', style: 'font-weight:bold;'}, ['']);
			gelReferencedText = $E('span', {'class': 'entry-content'}, ['']);
			gelReferencedTweet = $E('span', {}, gelReferencedName, ' ', gelReferencedText);
			gelRetweet = attachEventListener(
				 $E('a', {href: '#', title: 'quote this for retweet with comments'}, ['[rt]'])
				,'click', retweetClick, false
			);
			gelReplyAll = attachEventListener(
				 $E('a', {href: '#', title: 'reply to all mentioned users'}, ['[ra]'])
				,'click', replyAllClick, false
			);
			gelShortLink = attachEventListener(
				 $E('a', {href: '#', title: 'insert a TweaK.tk short URL link to this tweet'}, ['[sl]'])
				,'click', replyLinkClick, false
			);
			gelReferencedLinks = $E('div',
					{style: 'float:right;margin-bottom:-2px;font-weight:bold;font-variant:small-caps;'},
					gelReplyAll, '\u2002', gelRetweet, '\u2002', gelShortLink);
			gelReferencedContainer = $E('span',
					{'class': 'status-body minor-notification',
							style: 'display:none;margin-right:12px;min-height:1.2em;'},
					gelReferencedLoading, gelReferencedTweet, ' ', gelReferencedLinks,
					$E('div', {style: 'clear:both;height:0px;'}, ['\u00A0']));
			elStatus.parentNode.insertBefore(gelReferencedContainer, elStatus.nextSibling);
				// override $('#status').val
			$fn_init = $.fn.init;
			$.fn.init = function(C, E) {
				var obj = $fn_init.apply(this, arguments);
				var strC = ('string' == (typeof C) || C instanceof String) ? C : undefined;
				if (strC == '#status' || C === elStatus) {	// status box
					if (obj.val !== statusBoxVal) {
						gfnStatusBoxVal = obj.val;
						obj.val = statusBoxVal;
					}
				}
				return obj;
			};
			$.fn.init.constructor = $fn_init.constructor;
			$.fn.init.prototype = $fn_init.prototype;
				// handle initial value
			g$status = $('#status');
			if ($("#in_reply_to").val() && $("#in_reply_to_status_id").val()) {
				g$status.val(g$status.val());
			}
		}
		catch (x) {
			if ($fn_init){ $.fn.init = $fn_init; }
			showError(x+'');
		}
		
		// user-friendly update
		try {
			$ajax = $.ajax;
			$.ajax = function(P) {
				try {
					if (P && P.url == "/status/update") {
						gelReferencedContainer.style.display = 'none';	// hide the referenced tweet
							// add in_reply_to data for embedded @mentions
						var L = $("#in_reply_to_status_id").val();
						var re = new RegExp('(^|\\W)@' + $("#in_reply_to").val() + '(\\W|$)', 'i');
						if (gblnPreserveReplyData && L && re.test($("#status").val())) {
							P.data.in_reply_to_status_id = L;
						}
					}
					return $ajax.apply(this, arguments);
				} catch (x) { showError(x+''); }
			};
			$.ajax.constructor = $ajax.constructor;
			$.ajax.prototype = $ajax.prototype;
		}
		catch (x) {
			if ($ajax){ $.ajax = $ajax; }
			showError(x+'');
		}
	}
	catch (x) {
		showError(x+'');
	}
}

function statusBoxVal (v) {
	var strScreenName = (/^@(\w+)/.exec(v) || [])[1];
	if (strScreenName && !gblnPreserveLink) {	// we've got a new reply!
		gstrReferencedName = strScreenName;
		gstrReferencedShortUrl = '';
		arguments[0] = gstrReplyPrefix + v;	// prefix the @mention (#fixreplies)
		setTimeout(function(){checkForReferencedTweet(strScreenName);}, 0);	// show the reference
	}
	return gfnStatusBoxVal.apply(this, arguments);
};

function checkForReferencedTweet (strScreenName) {
	var $ = getUnsafeWindow().jQuery;
	gstrReferencedId = $("#in_reply_to_status_id").val();
	if (gstrReferencedId) {
		gelReferencedLoading.style.display = '';
		gelReferencedContainer.style.display = 'block';
		gelReferencedLinks.style.display = 'none';
		gelRetweet.href = gelReplyAll.href = gelShortLink.href =
				URL_STATUS.toString(strScreenName, gstrReferencedId);
		gelReferencedName.lastChild.nodeValue = gelReferencedText.lastChild.nodeValue = '';
		//$.getJSON(URL_API_STATUS + gstrReferencedId + '.json',
		//		function(r){showReferencedTweet(r, strScreenName);});
		httpRequest({method: 'GET', url: URL_API_STATUS + gstrReferencedId + '.json'
			,onload: function(o){
				try {
					showReferencedTweet(parseJSON(o.responseText), strScreenName);
				}
				catch(x) {
					this.onerror();
				}
			}
			,onerror: function(){
				showReferencedTweet({user: {screen_name: strScreenName}, error: 'Could not load tweet.'});
			}
		});
	}
	else {
		showReferencedTweet({user: {screen_name: strScreenName}, error: 'Could not find tweet.'});
	}
}

function showReferencedTweet (objResponse, strScreenName) {
	try {
		if(objResponse.user){ gstrReferencedName = strScreenName = objResponse.user.screen_name; }
		gstrReferencedText = objResponse.text;
		gelReferencedName.lastChild.nodeValue = strScreenName;
		gelReferencedName.setAttribute('href', '/' + strScreenName);
		gelReferencedText.lastChild.nodeValue = gstrReferencedText || objResponse.error;
		gelReferencedText.style.fontStyle = (objResponse.error ? 'italic' : '');
		gelReferencedLinks.style.display = '';
		gelReferencedContainer.style.display = 'block';
		gelReferencedLoading.style.display = 'none';
	}catch(x){}
}

function retweetClick (e) {
	var strValue = g$status.val();
	var strRT = [gstrRetweetPrefix, '@' + gstrReferencedName, gstrReferencedText].join(' ');
	if (strValue.substring(0, gstrReplyPrefix.length) == gstrReplyPrefix) {	// prefixed reply
		strValue = strValue.substring(gstrReplyPrefix.length);	// strip prefix
	}
	if (-1 == strValue.indexOf('@' + gstrReferencedName)) {	// no @-mention
		strValue = [g$status.val(), strRT].join(' ');	// append retweet
	}
	else if (-1 == strValue.indexOf(strRT)) {	// mention but no retweet
		// move reply text before mention and add retweet sugar
		strValue = strValue.replace(/(@\w+)\s*(.*)/,
				['$2', gstrRetweetPrefix.replace(/\$/g,'$$$$'), '$1',
				gstrReferencedText.replace(/\$/g,'$$$$')].join(' '));
	}
	else {	// already a valid retweet
		strValue = '';
	}
	if (strValue) {	// changes required
		gblnPreserveLink = true; g$status.val(strValue); gblnPreserveLink = false;
		focusStart(g$status[0]);
	}
	e.preventDefault();
	e.returnValue = false;
	return false;
}

function replyAllClick (e) {
	var strValue = g$status.val(), reMention = /@(\w+)/g;

	// force mention
	if (!reMention.test(strValue)) {
		strValue = '@' + gstrReferencedName + ' ' + strValue;
	}

	// insert mentions from reference tweet
	var mentions = ['@' + gstrReferencedName], match;
	reMention.lastIndex = 0;
	while(match = reMention.exec(gstrReferencedText)){ mentions.push(match[0]); }
	strValue = strValue.replace(/(@\w+[\s,;/]*)+/, mentions.join(' ') + ' ');

	// force prefix
	if (strValue.substring(0, gstrReplyPrefix.length) != gstrReplyPrefix) {
		strValue = gstrReplyPrefix + strValue;
	}

	// set new value
	gblnPreserveLink = true; g$status.val(strValue); gblnPreserveLink = false;
	focusEnd(g$status[0]);

	// prevent default behavior
	e.preventDefault();
	e.returnValue = false;
	return false;
}

function replyLinkClick (evt) {
	var $ = getUnsafeWindow().jQuery, strValue = g$status.val(), blnLeading = false;
	if (gblnShortLinkReplacesPrefix && startsWith(strValue, gstrReplyPrefix)
			&& (!startsWith(gstrShortenerPrefix, gstrReplyPrefix)
					|| startsWith(strValue, gstrReplyPrefix + '@'))) {
		strValue = strValue.substring(gstrReplyPrefix.length).replace(/^(\S)/, ' $1');	// de-prefix
		blnLeading = true;
	}
	else if (!/\s$/.test(strValue)) {
		strValue += ' ';
	}
	var setValue = function(){
		var fullLength = strValue.length + gstrShortenerPrefix.length + gstrReferencedShortUrl.length;
		arrValue = [strValue, gstrShortenerPrefix + (fullLength <= MAX_LENGTH
				? gstrReferencedShortUrl : gstrReferencedShortUrl.replace(/^.*?:[/]*/,''))];
		if(blnLeading){ arrValue.reverse(); }
		gblnPreserveLink = true; g$status.val(arrValue.join('')); gblnPreserveLink = false;
		focusEnd(g$status[0]);
	}
	
	if (gstrReferencedShortUrl) {
		setValue();
	}
	else {
		var arrPreserve = [];
		g$status.each(function(){
			arrPreserve.push([this.disabled, $(this).css('cssText')]);
			this.disabled = true;
			this.style.background = "url('" + IMG_SPINNER + "') no-repeat center #f0f0f0";
		});
		var onComplete = function(){
			g$status.each(function(){
				var state = arrPreserve.shift();
				this.disabled = state[0];
				$(this).css('cssText', state[1]);
			});
		};
		httpRequest({method: 'GET'
			,url: gurlShortener.replace(/%(.)/g, function(m0,m1){return (m1 == 'u'
				? encodeURIComponent(location.href.replace(/^(.*?:[/]*.*?)([/].*|$)/, '$1')
						+ URL_STATUS.toString(gstrReferencedName, gstrReferencedId))
				: m1
			);})
			,onload: function(objResponse){
				gstrReferencedShortUrl = gfnShortener.call(getUnsafeWindow(), true, this,
						objResponse.responseText);
				setValue();
				onComplete();
			}
			,onerror: function(objResponse){
				showNotification(gfnShortener.call(getUnsafeWindow(), false, this,
						objResponse.responseText));
				onComplete();
			}
		});
	}

	// prevent default behavior
	evt.preventDefault();
	evt.returnValue = false;
	return false;
}

function showUpdate(objUpdate, objScript) {
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var elPrevious = getUnsafeWindow().$('label.doing')[0];
	try {
		elPrevious.style.paddingRight = '1ex';
	}
	catch (x) {
		elPrevious = getUnsafeWindow().$('#status')[0];
	}
	elPrevious.parentNode.insertBefore($E('div', {title: title, style: 'display:inline;font-size:smaller;'}
		,$E('a', {href: objScript.source}, objScript.name + ' ')
		,$E('a', {href: objScript.identifier, style: 'color:red;'}, 'updated!')
	), elPrevious.nextSibling);
}

// helper functions
function showNotification (str) {
	try {
		(new getUnsafeWindow().InfoNotification()).setMessage(str).show();
	}
	catch(x) {
		alert(str);
	}
}

function showError (strErr) {
	var c, info;
	try {
		c = getUnsafeWindow().$('#content').find('.wrapper')[0];
		info = getUnsafeWindow().$('#content').find('.bulletin.info')[0];
	} catch (x) {}
	if (!info){
		info = c ? c.appendChild(document.createElement('div')) : document.body.insertBefore(document.createElement('div'), document.body.firstChild);
		info.className = 'bulletin info';
		info.parentNode.insertBefore(info, info.parentNode.firstChild);
	}
	info.appendChild(document.createElement('span')).innerHTML = [
		 '<a href="'
		,SCRIPT.source
		,'">'
		,SCRIPT.name
		,'</a> error. <a href="mailto:'
		,['richard','.','gibson','@','gm','ail','.','com'].join('')
		,'?subject='
		,encodeURIComponent(SCRIPT.name + ' ' + SCRIPT.version)
		,'+error&amp;body='
		,encodeURIComponent(strErr)
		,'">Click to notify author</a>.'
	].join('');
}

function parseJSON (strJson) {
	return ((typeof JSON) != 'undefined' ? JSON.parse(strJson) : eval('(' + strJson + ')'));
}

var httpRequest;
try {
	httpRequest = GM_xmlhttpRequest;
}
catch (x) {	// adapted from http://jibbering.com/2002/4/httprequest.html
	httpRequest = function(objDetails) {
		var request = null;
		/*@cc_on @*/	// JScript (Internet Explorer) conditional compilation
		/*@if (@_jscript_version >= 5)
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (x) {
			try{ request = new ActiveXObject("Microsoft.XMLHTTP"); }catch(x){}
		}
		@end @*/
		try{ request = request || new XMLHttpRequest(); }catch(x){}

		try {
			request.open(objDetails.method, objDetails.url, true);

			try { for (var h in objDetails.headers) {
				try{ request.setRequestHeader(h, objDetails.headers[h]); }catch(x){}
			} }catch(x){}
			request.onreadystatechange = function(){
				var	details = {readyState: request.readyState,
						responseHeaders: request.getAllResponseHeaders(),
						responseText: request.responseText,
						status: request.status,
						statusText: request.statusText};
				try{ objDetails.onreadystatechange.call(request, details); }catch(x){}
				if(request.readyState != 4){ return; }
				try {
					objDetails[request.status >= 200 && request.status < 400
							? "onload" : "onerror"].call(request, details);
				}catch(x){}
			};

			request.send(objDetails.data || null);
		}catch(x){}

		return request;
	};
}

function focusStart (el) {	// see twitter.js:isReplyable and focusEnd
	try {
		el.setSelectionRange(0, 0);	// move cursor to position 0
		el.focus();
	}
	catch(x) {
		try {
			el.focus();
			var tr = el.createTextRange();
			tr.collapse(true);	// select the beginning of the range
			tr.select();
		}catch(x){}
	}
}

function focusEnd (el) {	// see twitter.js:isReplyable and focusEnd
	try {
		el.setSelectionRange(el.value.length, el.value.length);	// move cursor to end
		el.focus();
	}
	catch(x) {
		try {
			el.focus();
			var tr = el.createTextRange();
			tr.collapse(false);	// select the end of the range
			tr.select();
		}catch(x){}
	}
}

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

function startsWith (str, strPrefix) {
	return (str.substring(0, strPrefix.length) == strPrefix);
}

function getUnsafeWindow () {
	try {
		return unsafeWindow;
	}
	catch (x) {
		return (function(){return this;})();
	}
}

window.addEventListener("load", init, true);

})();
