// ==UserScript==
// @name          HTML Ruby
// @version       6.00.4
// @description   render ruby annotation markup
// @author        kailapis
// @namespace     http://my.opera.com/kailapis/
// @homepage      http://my.opera.com/kailapis/blog/html-ruby
// @download      http://files.myopera.com/kailapis/userjs/ruby.js
// ==/UserScript==

// Copyright (c) 2010, kailapis
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

"use strict";
document.addEventListener('DOMContentLoaded', function() {
function RubyData(ruby) {
	this.calculateWidths = function() {
		var ruby = this.ruby,
			rtcs = ruby.querySelectorAll('rtc'),
			rtcsCount = rtcs.length,
			i, rt;
		if (rtcsCount) {
			var rts = rtcs[0].querySelectorAll('span'),
				rbs = ruby.querySelectorAll('rb span'),
				rbCount = rbs.length,
				rtWidths = new Array(rbCount),
				rbWidths = new Array(rbCount);
			for (i=0; i<rbCount; i++) {
				rt = rts[i];
				if (rt) {
					rtWidths[i] = rt.clientWidth;
					if (rt.parentNode.hasAttribute('rbspan')) {
						i += Number(rt.parentNode.getAttribute('rbspan')) - 1;
					}
				}
			}
			if (rtcsCount > 1) {
				var rts2 = rtcs[1].querySelectorAll('span'),
					rtWidths2 = new Array(rbCount);
				for (i=0; i<rbCount; i++) {
					rt = rts2[i];
					if (rt) {
						rtWidths2[i] = rt.clientWidth;
						if (rt.parentNode.hasAttribute('rbspan')) {
							i += Number(rt.parentNode.getAttribute('rbspan')) - 1;
						}
					}
				}
				this.rts2 = rts2;
				this.rtWidths2 = rtWidths2;
			}
			for (i=rbCount; i--; ) {
				rbWidths[i] = rbs[i].clientWidth;
			}
			this.rtWidths = rtWidths;
			this.rbWidths = rbWidths;
			this.rts = rts;
			this.rbs = rbs;
		} else {
			var rb = ruby.querySelector('rb');
			rt = ruby.querySelector('rt span');
			this.rts = rt;
			this.rbs = rb;
			this.rtWidths = rt.clientWidth;
			this.rbWidths = rb.clientWidth;
		}
	};
	this.ruby = ruby;
}
function process(rubys) {
	var start = (new Date()).getTime(),
		count = rubys.length,
		queue = new Array(count);
	if (count < 1) {
		return queue;
	}
	for (var i=0; i<count; i++) {
		var ruby = rubys[i],
			rtcs = ruby.querySelectorAll('rtc'),
			rtcsCount = rtcs.length,
			j, rt, rb, range, span;
		if (rtcsCount > 0) {
			var rts = ruby.querySelectorAll('rt[rbspan]'),
				rtsCount = rts.length;
			for (j=rtsCount; j--; ) {
				rt = rts[j];
				if (rt.hasAttribute('rbspan')) {
					rt.setAttribute('colspan', rt.getAttribute('rbspan'));
				}
			}
			if (spaceRubyText) {
				for (j=rtcsCount; j--; ) {
					var rtc = rtcs[j];
					rts = rtc.querySelectorAll('rt');
					rtsCount = rts.length;
					for (var k=rtsCount; k--; ) {
						rt = rts[k];
						range = document.createRange();
						span = document.createElement('span');
						range.selectNodeContents(rt);
						span.appendChild(range.extractContents());
						rt.appendChild(span);
					}
				}
				var rbs = ruby.querySelectorAll('rb'),
					rbsCount = rbs.length;
				for (j=rbsCount; j--; ) {
					rb = rbs[j];
					range = document.createRange();
					span = document.createElement('span');
					range.selectNodeContents(rb);
					span.appendChild(range.extractContents());
					rb.appendChild(span);
				}
				queue[i] = new RubyData(ruby);
			}
		} else if (spaceRubyText) {
			var rps = ruby.querySelectorAll('rp'),
				rpsCount = rps.length;
			rb = ruby.querySelector('rb');
			rt = ruby.querySelector('rt');
			if (!rt) {
				continue;
			}
			for (j=rpsCount; j--; ) {
				var rp = rps[j];
				rp.parentNode.removeChild(rp);
			}
			if (!rb) {
				range = document.createRange();
				range.setStart(ruby.firstChild, 0);
				range.setEndBefore(rt);
				rb = document.createElement('rb');
				rb.appendChild(range.extractContents());
				ruby.insertBefore(rb, rt);
			}
			range = document.createRange();
			span = document.createElement('span');
			range.selectNodeContents(rt);
			span.appendChild(range.extractContents());
			rt.appendChild(span);
			queue[i] = new RubyData(ruby);
		}
	}
	if (showNotice) {
		opera.postError('HTML Ruby: [notice] processed ' + count + ' rubies in ' + ((new Date()).getTime() - start) + 'ms');
	}
	return queue;
}
function space(queue) {
	function apply(elem, diff) {
		var text = elem.textContent.trim(),
			len = text.length;
		if (!len) {
			return null;
		}
		var perChar, wordCount;
		if (text.charCodeAt(0) <= 128) {
			wordCount = text.split(' ').length;
			if (wordCount > 1) {
				perChar = diff / wordCount;
				elem.style.cssText = 'word-spacing:' + perChar + 'px';
			}
		} else {
			perChar = diff / len;
			elem.style.cssText = 'letter-spacing:' + perChar + 'px;right:-' + perChar/2 + 'px;position:relative';
		}
	}
	var start = (new Date()).getTime(),
		block = queue.splice(0, 250),
		count = block.length;
	if (!count) {
		return null;
	}
	var i, data;
	for (i=count; i--; ) {
		data = block[i];
		if (!data) {
			continue;
		}
		data.calculateWidths();
	}
	for (i=count; i--; ) {
		data = block[i];
		if (!data) {
			continue;
		}
		var rb, rt, diff;
		if (typeof data.rbWidths == 'number') {
			rb = data.rbs;
			rt = data.rts;
			diff = data.rbWidths - data.rtWidths;
			if (diff > 0) {
				apply(rt, diff);
			} else {
				apply(rb, Math.abs(diff));
			}
		} else {
			var rbWidths = data.rbWidths,
				rtWidths = data.rtWidths,
				rbs = data.rbs,
				rts = data.rts,
				rbCount = rbs.length,
				j, rbWidth, rtWidth;
			for (j=rbCount; j--; ) {
				rb = rbs[j];
				rt = rts[j];
				rbWidth = rbWidths[j];
				rtWidth = rtWidths[j];
				diff = rbWidth - rtWidth;
				if (rt === undefined) {
					rbWidths[j-1] += rbWidth;
					continue;
				}
				if (diff > 0) {
					apply(rt, diff);
				} else {
					apply(rb, Math.abs(diff));
				}
			}
			if (data.rts2 && data.rts2.length) {
				var rts2 = data.rts2,
					rtWidths2 = data.rtWidths2;
				rbWidths = data.rbWidths;
				for (j=rbCount; j--; ) {
					rb = rbs[j];
					rt = rts2[j];
					rbWidth = rbWidths[j];
					rtWidth = rtWidths2[j];
					diff = rbWidth - rtWidth;
					if (rt === undefined) {
						rbWidths[j-1] += rbWidth;
						continue;
					}
					if (diff > 0) {
						apply(rt, diff);
					}
				}
			}
		}
	}
	if (showNotice) {
		opera.postError('HTML Ruby: [notice] spaced ' + count + ' rubies in ' + ((new Date()).getTime() - start) + 'ms, ' + queue.length + ' rubies remaining');
	}
	setTimeout(space, 50, queue);
}
function clean() {
	var start = (new Date()).getTime(),
		request = new XMLHttpRequest();
	request.overrideMimeType('text/html; charset=' + document.characterSet);
	request.open('GET', document.documentURI, false);
	request.send(null);
	var response = request.responseText.replace(/[\s\S]*<body[^<>]*>/im, ''),
		end = response.lastIndexOf('</body>');
	if (end < 0) {
		end = response.lastIndexOf('</BODY>');
	}
	if (end > 0) {
		response = response.substring(0, end);
	}
	response = response.replace(/<(r[btp])(?=([^<>]*?))\2>([^<>]*)/gim, '<$1$2>$3</$1>');
	response = response.replace(/<(?=(r[btp]))\1[^<>]*?><\/\1>/gim, '');
	response = response.replace(/<\/(?=(r[btp]))\1><\/\1>/gim, '</$1>');
	response = response.replace(/<ruby(?!.{1,50}<rt)/gim, '</ruby');
	response = response.replace(/<ruby/gim, '</ruby><ruby');
	document.body.innerHTML = response.replace(/<\/rt>/gim, '</rt></ruby>');
	if (showNotice) {
		opera.postError('HTML Ruby: [notice] cleaned page in ' + ((new Date()).getTime() - start) + 'ms');
	}
}
//================================================================================================
var rubyTextSize = '.55em', // relative size of the ruby text
	maxPageLength = -1, // maximum size to perform tag closing for performance purposes; -1 to enable at all sizes
	spaceRubyText = true, // spaces out ruby text
	processDynamicContent = false, // processes dynamically inserted ruby tags
	showNotice = false; // uses opera.postError to output messages
if (typeof(HtmlRubySettings) !== 'undefined') {
	rubyTextSize = HtmlRubySettings.rubyTextSize;
	maxPageLength = HtmlRubySettings.maxPageLength;
	spaceRubyText = HtmlRubySettings.spaceRubyText;
	processDynamicContent = HtmlRubySettings.processDynamicContent;
	showNotice = HtmlRubySettings.showNotice;
}
//================================================================================================
var body = document.body;
if (!body.querySelector('ruby')) {
	if (!processDynamicContent) {
		return null;
	}
} else {
	if (body.querySelector('ruby ruby') || body.querySelector('rt rp') || body.querySelector('rp rt') || body.querySelector('rb rt')) {
		if (body.innerHTML.length < maxPageLength || maxPageLength == -1) {
			clean();
			if (body.querySelector('ruby ruby') || body.querySelector('rt rp') || body.querySelector('rp rt')) {
				opera.postError('HTML Ruby: [notice] not cleaned, cleaning failed, abort');
				return null;
			}
		} else {
			opera.postError('HTML Ruby: [notice] not cleaned, page length is greater than maximum cleaning length, abort');
			return null;
		}
	}
}
//================================================================================================
(function() {
	var style = document.createElement('style'),
		head = document.getElementsByTagName('head')[0];
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode('ruby,ruby *{white-space:nowrap;text-align:center;line-height:1.2em;border-style:hidden;border-collapse:collapse;margin:0px;padding:0px;text-indent:0px}rt{font-size:' + rubyTextSize + '}ruby{display:inline-table;-o-table-baseline:2;line-height:1em}ruby rt,rbc,rtc{display:table-row}rtc rt,rbc rb{display:table-cell}rt,rp{display:none}rbc+rtc,ruby>rt{display:table-header-group}'));
	if (!head) {
		head = document.createElement('head');
		document.insertBefore(head, document.body);
	}
	head.appendChild(style);
}());
(function() {
	var body = document.body,
		range = document.createRange();
	range.selectNodeContents(body);
	var fragment = range.extractContents(),
		queue = process(fragment.querySelectorAll('ruby'));
	body.appendChild(fragment);
	if (spaceRubyText) {
		setTimeout(space, 50, queue);
	}
}());
(function() {
	if (spaceRubyText && processDynamicContent) {
		document.body.addEventListener('DOMNodeInserted', function(e) {
			var elem = e.target;
			if (elem.nodeType !== Node.ELEMENT_NODE) {
				return null;
			}
			var queue;
			if (elem.tagName == 'ruby' ||elem.tagName == 'RUBY') {
				queue = process([elem]);
			} else {
				queue = process(elem.querySelectorAll('ruby'));
			}
			if (spaceRubyText) {
				space(queue);
			}
		}, false);
	}
}());
}, false);