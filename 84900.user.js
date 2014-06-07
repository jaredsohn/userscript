// ==UserScript==
// @name           QuoteSelected
// @namespace      http://userscripts.org/people/336
// @description    Limits forum quotes to selected text for replies.
// @source         http://userscripts.org/scripts/show/84900
// @identifier     http://userscripts.org/scripts/source/84900.user.js
// @version        0.1.5
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
// 0.1.5 (2011-02-21)
// 	Fixed: Firefox/Windows security bug
// 0.1.4 (2011-02-19)
// 	Updated: update checking with meta.js
// 0.1.3 (2010-09-12)
// 	Improved: ajax_indicator and #quickreply navigation
// 0.1 (2010-08-29)
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
	 name: "QuoteSelected"
	,namespace: "http://userscripts.org/people/336"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/84900"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/84900.user.js"
	,meta: "http://userscripts.org"        // metadata URL
			+ "/scripts/source/84900.meta.js"
	,version: "0.1.5"                      // version
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
// constants
var UPDATE_CHECK_DAYS = 2.5;
var UNSAFE = unsafeWindow || window || (function(){return this;})();

// globals
var gblnRange = false;
	try{ gblnRange = document.implementation.hasFeature('Range','2.0'); }catch(x){}

// MAIN --------------------------------------------------------------------------------------------
function init (intTry) {
	showUpdate();

	if (!gblnRange){ return; }

	// SMF 1.x
	if (UNSAFE.smf_scripturl
		&& /Powered by SMF 1\./.test(xpathEvaluate(document
			,"//div[@id='footerarea']//span[contains(concat(' ',@class,' '), ' smalltext ')]"
			,'STRING'
		))
	) {
		UNSAFE.doQuote = SMF_doQuote(UNSAFE.doQuote);
		UNSAFE.insertQuoteFast = SMF_insertQuoteFast(UNSAFE.insertQuoteFast);
	}
}

function SMF_doQuote (fnOriginal) {
	return preserveToString(function(messageid, cur_session_id) {
		try {
			if(UNSAFE.quickReplyCollapsed){ throw {}; }

			// bail out if there is no selection
			try{ UNSAFE.ajax_indicator(true); }catch(x){}
			var selection = getSelectionInElement(xpathEvaluate(
				document.getElementsByName('msg' + messageid)[0]
				,"(descendant-or-self::*|following::*)"
						+ "[contains(concat(' ',@class,' '), ' post ')][1]"
				,'FIRST_ORDERED_NODE'
			));
			if(!(selection.rangeCount > 0)){ ajax_indicator(false); throw {}; }

			// get the post and filter to the selection
			UNSAFE.getXMLDocument(
				 [UNSAFE.smf_scripturl, "?action=quotefast;quote=", messageid, ";sesc=",
						cur_session_id, ";xml"].join('')
				,SMF_onDocReceived(UNSAFE.onDocReceived, selection)
			);

			// navigate
			location.assign('#quickreply');
		}
		catch(x) {
			return fnOriginal.apply(this, arguments);
		}
	}, fnOriginal, SCRIPT.name);
}

function SMF_insertQuoteFast (fnOriginal) {
	return preserveToString(function(messageid) {
		try {
			// bail out if there is no selection
			try{ ajax_indicator(true); }catch(x){}
			var selection = getSelectionInElement(xpathEvaluate(
				document.getElementById('msg' + messageid)
				,"(descendant-or-self::*|following::*)"
						+ "[contains(concat(' ',@class,' '), ' post ')][1]"
				,'FIRST_ORDERED_NODE'
			));
			if(!(selection.rangeCount > 0)){ ajax_indicator(false); throw {}; }

			// get the post and filter to the selection
			var cur_session_id = xpathEvaluate(document,
					"//form[translate(@method,'POST','post')='post']"
				+ "/input[@type='hidden' and @name='sc']/@value",
			'STRING');
			UNSAFE.getXMLDocument(
				 [UNSAFE.smf_scripturl, "?action=quotefast;quote=", messageid, ";sesc=",
						cur_session_id, ";xml"].join('')
				,SMF_onDocReceived(UNSAFE.onDocReceived, selection)
			);
			return true;
		}
		catch(x) {
			return fnOriginal.apply(this, arguments);
		}
	}, fnOriginal, SCRIPT.name);
}

function SMF_onDocReceived (fnOriginal, objSelection) {
	return preserveToString(function(XMLDoc){
		try {
			// get the BBCode corresponding to each range in objSelection
			var strFull = XMLDoc.getElementsByTagName('quote')[0].textContent, pieces = [];
			var intPrefix = /^\[quote author=.*? link=topic=\d+.*? date=\d+\]/
					.exec(strFull)[0].length;
			var strContent = strFull.substring(intPrefix);
			for (var i = 0, match; i < objSelection.rangeCount; i++) {
				match = (new RegExp(SMF_rangeToRegExp(objSelection.getRangeAt(i)))).exec(strContent);
				pieces.push(match
					? SMF_enclose(strFull, intPrefix + match.index, intPrefix + match.index + match[0].length)
					: strFull
				);
			}

			// update arguments for the original function
			arguments[0].getElementsByTagName('quote')[0].textContent = pieces.join('\n\n');
		}catch(x){}
		try{ ajax_indicator(false); }catch(x){}
		return fnOriginal.apply(this, arguments);
	}, fnOriginal, SCRIPT.name);
}

function SMF_enclose (strFull, idxStart, idxEnd) {
	var strPrefix = strFull.substring(0, idxStart);
	var strWorking = strFull.substring(idxStart, idxEnd);
	var strSuffix = strFull.substring(idxEnd);

	// remove internally-closed tags from strPrefix and strSuffix
	var reStrip = /((?:.|\n)*)\[(\w+)(?:.|\n)*?\](?:.|\n)*?\[\/\2\]/g;
	while(reStrip.test(strPrefix)){ strPrefix = strPrefix.replace(reStrip, '$1'); }
	while(reStrip.test(strSuffix)){ strSuffix = strSuffix.replace(reStrip, '$1'); }

	// remove inter-tag text from strPrefix and strSuffix
	reStrip = /(^|\])(?:[^[]|\n)+?(\[|$)/g;
	strPrefix = ([' ', strPrefix, ' '].join('')).replace(reStrip, '$1$2');
	strSuffix = ([' ', strSuffix, ' '].join('')).replace(reStrip, '$1$2');

	// return
	return [strPrefix, strWorking, strSuffix].join('');
}

function SMF_rangeToRegExp (rng) {
	return SMF_nodeToRegExp(rng.cloneContents(), true);
}

function SMF_nodeToRegExp (frg, blnFirst) {
	var precedingTags = (blnFirst ? '' : '(?:\\[.*?\\]\\s*)*');
	if (frg.nodeType == (Node.TEXT_NODE || frg.TEXT_NODE || 3)) {
		return precedingTags + regexEscape(frg.nodeValue);
	}
	if (/^br$/i.test(frg.nodeName)) {
		return precedingTags + '\\r?\\n';
	}
	if (/^img$/i.test(frg.nodeName)) {
		return precedingTags + '(?:\\[img.*?\\]' + regexEscape(frg.getAttribute('src'))
				+ '\\[img\\]|.{2,9})';
	}
	if (/(^|\s)quoteheader(\s|$)/.test(frg.className)) {
		return '';
	}
	var re = [], firstPending = blnFirst;
	for (var i = 0, append; i < frg.childNodes.length; i++) {
		append = arguments.callee(frg.childNodes[i], firstPending);
		firstPending = firstPending && !append;
		re.push(append);
	}
	return re.join('');
}

function regexEscape (str) {
	return str.replace(/([^a-z_0-9])/igm, '[$1]').replace(/\[\\\]/g, '\\\\')
			.replace(/\[([\.^])\]/g, '\\$1').replace(/\[\u00a0\]/g, '[ \\u00a0]')
			.replace(/\[[\r\n]\]/g, '\\r?\\n');
}

function getSelectionInElement (elParent) {
	var windowSelection = window.getSelection(), selection = [], rngParent = document.createRange();
		rngParent.selectNodeContents(elParent || document.body);
	var blnComparePoint = ('comparePoint' in rngParent);

	for (var i = 0, rng; i < windowSelection.rangeCount; i++) {
		rng = windowSelection.getRangeAt(i).cloneRange();
		if (blnComparePoint
			? rngParent.comparePoint(rng.startContainer, rng.startOffest) > 0
			: rngParent.compareBoundaryPoints(Range.START_TO_END, rng) <= 0
		) {	//alert("starts too late");
			continue;
		}
		if (blnComparePoint
			? rngParent.comparePoint(rng.endContainer, rng.endOffest) < 0
			: rngParent.compareBoundaryPoints(Range.END_TO_START, rng) >= 0
		) {	//alert("ends too soon");
			continue;
		}
		if (blnComparePoint
			? rngParent.comparePoint(rng.startContainer, rng.startOffest) < 0
			: rngParent.compareBoundaryPoints(Range.START_TO_START, rng) > 0
		) {	//alert("starts too soon")
			rng.setStart(rngParent.startContainer, rngParent.startOffset);
		}
		if (blnComparePoint
			? rngParent.comparePoint(rng.endContainer, rng.endOffest) > 0
			: rngParent.compareBoundaryPoints(Range.END_TO_END, rng) < 0
		) {	//alert("ends too late")
			rng.setEnd(rngParent.endContainer, rngParent.endOffset);
		}
		selection.push(rng);
	}
	selection.rangeCount = selection.length;
	selection.getRangeAt = new Function("i", "return this[i];");
	return selection;
}

// automatic updates
function showUpdate (objUpdate, objScript){
	if(UNSAFE.self !== UNSAFE.top){ return; }
	if (!arguments.length) {
		return UPDATE.check(arguments.callee);
	}

	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var notify = document.body.appendChild(
		$E('div', {style: 'position:absolute;position:fixed;right:0;bottom:0;border:1px solid black;'
				+ 'border-width:1px 0 0 1px;padding:0 0 0.1em 0.3em;background:#dddddd;'
				+ 'font-weight:bold;font-size:small;'}
			,$E('a', {href: objScript.source, title: title, style: 'color:blue;'},
					objScript.name + ' ')
			,$E('a', {href: objScript.identifier, title: title, style: 'color:red;'}, 'updated!')
			,attachEventListener($E('button',
					{style: 'margin-left:1em;padding:0;font-size:50%;vertical-align:super;'}, '\u2573')
				,'click'
				,function(evt){
					notify.parentNode.removeChild(notify);
					try{ evt.preventDefault(); }catch(x){}
					return false;
				}
			)
		)
	);
}

// HELPERS -----------------------------------------------------------------------------------------
function xpathEvaluate (nContext, strExpression, strResultType) {
	nContext = nContext || document;
	var resultType = ((strResultType + '_TYPE') in XPathResult
		? XPathResult[strResultType + '_TYPE']
		: XPathResult.ORDERED_NODE_SNAPSHOT_TYPE
	);
	var doc = nContext.ownerDocument || nContext, strProperty = '', result;
	switch (resultType) {
		case XPathResult.NUMBER_TYPE:
			strProperty = 'numberValue';
			break;
		case XPathResult.STRING_TYPE:
			strProperty = 'stringValue';
			break;
		case XPathResult.BOOLEAN_TYPE:
			strProperty = 'booleanValue';
			break;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE:
			strProperty = 'singleNodeValue';
			break;
	}
	result = doc.evaluate(strExpression, nContext, null, resultType, null);
	return (strProperty ? result[strProperty] : result);
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

function preserveToString(varReal, varPretend, strReplacedBy) {
	try {
		varReal.toString = function(){
			return varPretend + (strReplacedBy ? ' /*replaced by ' + strReplacedBy + '*/' : '');
		};
	}catch(x){}
	return varReal;
}

if (document.readyState == 'complete') {
	init();
}
else {
	attachEventListener(window, 'load', init, true);
}

})();
