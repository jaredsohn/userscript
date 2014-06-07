// ==UserScript==
// @name           Gmail Quick Filter
// @description    A filter assistant for Gmail.
// @author         1nfected
// @version        0.3.5
// @namespace      1nfected
// @license        CC by-nc-sa http://creativecommons.org/licenses/by-nc-sa/3.0/

// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// @require        http://www.betawarriors.com/bin/gm/57756user.js

// @history        0.3.5 Fix for changes in Gmail.
// @history        0.3.5 New Feature: Smart filter verifier.
// @history        0.3.2 Changed @require for updater to point to the betawarriors domain.
// ==/UserScript==


(function() {

var scriptid = 87667;
var version = '0.3.5';

testGM();

try { if(self != window.top) return; }
catch(e) { return; }

// Test for Greasemonkey API & adapt accordingly
function testGM() {
	const LOG_PREFIX = 'Gmail Quick Filter: ';
	const LOG = true; // Enable logging
	const DEBUG = false; // Set Debugging ON/OFF
	isGM = typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined';
	log = isGM ? function(msg) { if(LOG) GM_log(msg) } : window.opera ? function(msg) { if(LOG) opera.postError(LOG_PREFIX+msg); } : function(msg) { try { if(LOG) console.log(LOG_PREFIX+msg); } catch(e) {} }
	debug = function(msg) { if(LOG && DEBUG) log('** Debug: '+msg+' **') }
	addStyle = function(css,root) { var head = $('head',root)[0]; if(!head) return; var style = $c('style',{type:'text/css',innerHTML:css}); head.appendChild(style); }
}

// ----------------- HELPER FUNCTIONS ----------------- //

// All in one function to get elements
function $(q,root,single,context) {
	root = root || document;
	context = context || root;
	if(q[0] == '#') return root.getElementById(q.substr(1));
	if(q.match(/^[\/*]|^\.[\/\.]/)) {
		if(single) return root.evaluate(q,context,null,9,null).singleNodeValue;
		var arr = []; var xpr = root.evaluate(q,context,null,7,null);
		for(var i = 0, len = xpr.snapshotLength; i < len; i++) arr.push(xpr.snapshotItem(i));
		return arr;
	}
	if(q[0] == '.') {
		if(single) return root.getElementsByClassName(q.substr(1))[0];
		return root.getElementsByClassName(q.substr(1));
	}
	if(single) return root.getElementsByTagName(q)[0];
	return root.getElementsByTagName(q);
}

// Function to create an Element
function $c(type,props) {
	var node = document.createElement(type);
	if(props && typeof props == 'object') { for(prop in props) if(prop) node[prop] = props[prop]; }
	return node;
}

// Check & restore reference to canvas_frame
function checkiFrame() {
	if(gmail.URL == 'about:blank')  {
		debug('Lost canvas_frame...');
		gmail = canvas.contentDocument;
	}
}

// --------------- END HELPER FUNCTIONS --------------- //


var canvas = $('#canvas_frame');
if(canvas && canvas.contentDocument) {
	var gmail = canvas.contentDocument;
	new GmailQuickFilter();
}


function GmailQuickFilter() {
	var self = this;
	var inbox = null;
	this.construct = function() {
		this.waitforInbox(1);
		// Check for update [Uses PhasmaExMachina's Script Updater]
		if(typeof ScriptUpdater == 'object') ScriptUpdater.check(scriptid, version);
	}
	
	this.insertIcons = function() {
		var rows = $('.//td[contains(@class,"yX")]//div[not(.//img[@class="quickfilter"])]',gmail,false,inbox);
		for(var i = 0, l = rows.length; i < l; i++) {
			var row = rows[i];
			if($('.quickfilter',row)[0]) continue;
			var email = $('.yP',row)[0] || $('.zF',row)[0];
			if(!email) continue;
			email.parentNode.insertBefore(self.createFilterButton(email.getAttribute('email')),email.parentNode.firstChild);
		}
	}

	this.createFilterButton = function(email) {
		var filterButton = $c('img',{className:'quickfilter',title:'Create a filter for: '+email,src:'images/cleardot.gif'});
		filterButton.setAttribute('from',email);
		filterButton.addEventListener('mousedown', function(e) {
			e = e || window.event;
			e.preventDefault();
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			var from = this.getAttribute('from');
			self.populateFilterForm(from, e.shiftKey ? true : false, e.ctrlKey ? true : false);
		}, true);
		return filterButton;
	}

	this.populateFilterForm = function(from, domain, append) {
		var fromField = $('//div[@class="Bc Bd"]//input[contains(@class,"nr")]',gmail,true);
		if(!fromField) {
			var createFilterBtn = $('//td[@class="GcwpPb-Pkt3ef GcwpPb-txTtjf"]/span[2]',gmail,true);
			if(!createFilterBtn) { log('Unable to open Filter Form.'); return; }
			var evt = document.createEvent('MouseEvents');
			evt.initEvent('click', true, true);
			createFilterBtn.dispatchEvent(evt);
			window.setTimeout(self.populateFilterForm,100,from,domain,append);
			return;
		}
		// Append check is necessary... THINK!
		var val = fromField.value;
		if(append && verify()) return;
		if(domain) from = '*@'+from.split('@')[1];
		fromField.value = (append ? val + '|' + from : from).replace(/^\|/,'');
		
		function verify() {
			var fromd = '*@'+from.split('@')[1];
			var fromdE = val.indexOf(fromd) > -1;
			var fromE = val.indexOf(from) > -1;
			if(fromdE) {
				log('From field already contains a domain filter for: '+fromd);
				return true;
			}
			else if(domain) {
				// Remove all entries of same domain if any.
				var filters = val.split('|');
				var newFilters = [];
				for(var i = 0; i < filters.length; i++) {
					var pattern = new RegExp(fromd.substr(1).replace('.','\\.')+'$');
					var filter = filters[i];
					if(!pattern.test(filter))
						newFilters.push(filter);
					else log('Removing filter: '+filter+', as '+fromd+' matches it.');
				}
				if(filters.length != newFilters.length) {
					fromField.value = newFilters.join('|');
					val = fromField.value;
				}
			}
			else if(!domain && fromE) {
				log('From field already contains a filter for: '+from);
				return true;
			}
			return false;
		}
	}

	this.waitforInbox = function(t) {
		if(t > 20) { log('Unable to start Gmail Quick Filter.'); return; }
		checkiFrame();
		inbox = $('//table[@class="Bs nH"]/tr/td[@class="Bu"][2]//div[@class="diLZtc"]',gmail,true)
				|| $('//div[contains(@class,"cS")]/following-sibling::div[@class="nH"]/div/div[2]//div[@class="diLZtc"]',gmail,true);
		if(!inbox) { debug('Retry Gmail Quick Filter hook...'); window.setTimeout(self.waitforInbox,t*100,++t); return; }
		self.insertIcons();
		inbox.addEventListener('DOMNodeInserted', function(e) {
			//if(e.target.parentNode.className.indexOf('Cp') > -1)
				self.insertIcons();
		},false);
		addStyle('.quickfilter:hover{opacity:1!important}.quickfilter{opacity:0.4;vertical-align:middle;width:16px;height:16px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAA+klEQVR42tWSPU7DQBBGH47FjyJRISFFQjRIINlUHIQKjkEJp0gNJ+AanCCicmJBkSBTxARD/myyXq+HAjsSgYiELl8zmp15rxgtrHzWiir/Ze2ya/gBtZ1tqlsbVDfXiQZjwrcx76OEUaLo9WOG8YRmu8vN1fnUYhXVPTna47Ufk+qMD5ViciHNDACZydGZodUJS9idFXiAe3xQIxrEpNpgV75GShuUNvhPL1xfnpWwNyuYSg73d4mGCQB2xSLPhWa7S/3i9Ac8Lw4gj0FPWp1Q6rd3UhzZWebCDiANP/gTtua8ewATpb/1ywgAuH94Xvgj/RZZcG/V8wkJB2s1ilAbYwAAAABJRU5ErkJggg==) no-repeat center}',gmail);
		log('Gmail Quick Filter started.');
	}

	return this.construct();
}

})();