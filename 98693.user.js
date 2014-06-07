// ==UserScript==
// @id             GAF-QQRE
// @name           NeoGAF: Quick Quote, Reply, and Edit
// @namespace      hateradio)))
// @author         hateradio
// @version        7.4.1
// @description    This script adds the ability to quickly quote, reply, and edit posts on NeoGAF. Just click and go.
// @homepage       https://userscripts.org/scripts/show/98693
// @updateURL      https://userscripts.org/scripts/source/98693.meta.js
// @downloadURL    https://userscripts.org/scripts/source/98693.user.js
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAdCAYAAADLnm6HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RTg0MTY2RDg3REExMUUwOUMzQUFFNzdDQ0Q3NjA5RiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RTg0MTY2Qzg3REExMUUwOUMzQUFFNzdDQ0Q3NjA5RiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjgyRDgxNkQ5ODdFMDExOTI4RUREM0QyQUUxREY5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqI3Q0YAAAVpSURBVHjavFfbbxRVHP7OZbd77WXbQqFFUBqgKMEHqFwMPBgx0Tc1vJiIvpmYGP8F4oMhatBEo/HyQELigzzLAxqNYhCMKBeBEsECpZTtZbe3nd2dmXP8zsyWixgtScskkzl75pzf9/1u35wVpW8EbPqlHVDr98nqyEPWhgEW6RJCyoROeEd+uvDpnr1H9k9W/FCUfnj+GW06PxDFU73wxiVgsZiXSKStyLR7ew8OvrXv0OC7WlSX7hfFY2sxfp7YwR344o5t9l/m8I/3Yh7o1jEQKl/KbludfiPTpA5rOztcwOyERRAImDAyJKSCVHwKN2VhjIWKYuPGgOI742wJZ9Mi5JzgeyVlxMM2+Lp9UjLFnHBrLX9bOmlrHsK6znFxj4ZP1IA7fLdFQijFRQkMjwpUahbLOhSyTQbFkoGz35oTuD5m0ZaXqHOPVzNY1i7BbGKoaFBnEFubFQISL7RIjI2F0Iok6VtShSjkyJZ41ncuQOkoesbdBOfAqgROnLUYummgtcDA5QA7n8jg+OkKupcqpFYl8P3xCnb0p/DnYC1yPZdrwtETHipVy7GityHJWXR3KQxcCtC/MYPT5zys7BboXEMHw9tZkTE4bzJXQuHKDYELgyG2b8pjy8YsyuUQo2P0tGLoWRLlKRF5kE4loncteY2TZ3zU6xa7tmexa1sOmaTEZNnHwEUPj/dl0NWZxIzHiHBtBB42MG8RaExIKFwaMsjmEujpSESLmQWMlQPMMtSFZo2JMiOTkghJYsozJC1wdaSG3lVptDMtxjeYmAlxk3tYVVjdnUJpIoBHW/km4tQdno0xrcMMY+/dU/BZ8oAKxwEBz16uItmk0KSZb+ZYWpfnANmMhjcb0o5Eit56dRFFwFQZqRmDyWmDnq40yhXg+kgdmubXsNyy0sDUTYzXiEBcA46E7wiFWFFI4MtTAYpfT6I4FWLP1jxa0wJ/eQKffDsNnwZe3prGyGSA4arAEhZlc6vCV79WcPSyxup25n0S2L05g8GzFXw3UEU6ycJlurascE1iETGaIxAQnMUJyaKpM3xblyu0pRM4ed2iVLG4OlrDhnUar2xiZ0xZPNKhsTLrQ9RCPLtOotnW8FyfJLBGxRdY0QJ0cn9vc4DdGxTKnmtBi/WtAtoP2L6GUoC44x0BF6Zmhj3FCCjSMkEdfTmNxx7VuLGCncG8BNM+1rFr+3g7A7Upg+U00lMQ8GeBDHu9vz3WDacBvRkLn8XzcIpz6YYOuPj6cccHxPPqsXzpa2UgOw7kZljZ0rL1mFu2qLE+ElpG6lXy7N2qN6c0IjYesj5C1gd5cA8J8W7SNqo3WBFtcVGYcVEOJaZJYHQmNqMPXQJ+PgYMXUMkFrGgmoa4xgp2C/AeAbZ3jOIxpQOf7QB2rWIHuWKmM06B3z8NfHwuVuy2AiOejUtPe6zIMqkWvduFce83YP5XWxJYmQGqtcYEbb79G/DOmdtrwjRQaGrogAsbpR0u2gtxbWwDltA4M4g0+X905m5wJ+cOS4o5IVrg66kuV5RAC+vg8wvA3t//e/2CEqAmYVsnu0oBXxD8zROx6D0wAmvzwJNMwYGLwOu/UNvmUUILSuDppcDhYeA1gtfN/PYsGAFnaJzd9CrBq2b++/RCEXDRPnjl/3O+aBGwuH/wRWnD+yYghBAPHlZgDlVKJVUioXkWVQ8EWvF4nUxqAsvoQ6ZvjIz+mM9nXujsaEWlUuVR2iye3zzApniWbGnOYnqmMhqGZkJk0qme5cva30smEy/War4Mw8Uj4D487q5W68PF0dKBuh98KDb39+P8uT9aqtXqTkaEhyb+KVi8/2cu84EJzRAB+I3Etb8FGABNVHc2OcfDSwAAAABJRU5ErkJggg==
// @icon64         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1NzUyNDZBRTg3RDkxMUUwQkE0Q0QyRjcyMEQwQUNDOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1NzUyNDZBRDg3RDkxMUUwQkE0Q0QyRjcyMEQwQUNDOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RTgyRDgxNkQ5ODdFMDExOTI4RUREM0QyQUUxREY5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIvPiA8L3JkZjpEZXNjcmlwdGlv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
// @screenshot     https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/qqre/qqre.png

// @include        http://*neogaf.com/forum/showthread.php?*
// @include        http://*neogaf.com/forum/newreply.php*
// @include        http://*neogaf.com/forum/editpost.php*
// @include        http://*neogaf.com/forum/newthread.php*
// @include        http://*neogaf.net/forum/showthread.php?*
// @include        http://*neogaf.net/forum/newreply.php*
// @include        http://*neogaf.net/forum/editpost.php*
// @include        http://*neogaf.net/forum/newthread.php*

// @match          http://*.neogaf.com/forum/showthread.php?*
// @match          http://*.neogaf.com/forum/newreply.php*
// @match          http://*.neogaf.com/forum/editpost.php*
// @match          http://*.neogaf.com/forum/newthread.php*
// @match          http://*.neogaf.net/forum/showthread.php?*
// @match          http://*.neogaf.net/forum/newreply.php*
// @match          http://*.neogaf.net/forum/editpost.php*
// @match          http://*.neogaf.net/forum/newthread.php*

// @updated        07 SEP 2013
// @since          30 OCT 2010
// @grant GM_xmlhttpRequest
// (c) 2010+, hateradio
// ==/UserScript==

/*
Changes
<strong>7.4.1</strong>
<ul>
<li>Chrome fix for greaseWindow</li>
</ul>
<strong>7.4</strong>
<ul>
<li>Fixes quotes when user has ignored others</li>
<li>Fixes for getting user key</li>
</ul>
<strong>7.3</strong>
<ul>
<li>Fixes update notification</li>
<li>Closed threads do not show the reply box</li>
<li>Changes to form to match new dark theme</li>
<li>Improves quick quote text replacements</li>
</ul>
<strong>7.1 - 7.2</strong>
<ul>
<li>Changes for Chrome extension</li>
<li>Changes to form to match new dark theme</li>
<li>Improves quick quote text replacements</li>
</ul>
<strong>7.0</strong>
<ul>
<li>Fix for new site</li>
<li>Fix for quick reply AJAX response (no more responseXML)</li>
</ul>
6.3
<ul>
<li>Chrome 27+, no more window access</li>
<li>Added message listener</li>
<li>Chanced to dropboxusercontent.com, since it's now used by dropbox</li>
</ul>
6.1.2 - 6.2
<ul><li>Chrome - button issues, again</li></ul>
6.1
<ul><li>Chrome - button issues</li></ul>

<h4>6.0</h4> 4,156
<ul>
	<li><b>Removes quick reply bar, now uses the native button to create the quick editor;</b></li>
	<li><b>The editor starts when pressing the Edit+ link</b></li>
	<li>Incorporates some of the site's native AJAX functionality</li>
	<li>[IMG] to [URL] replacement now creates "Link : Image" when an image is inside a link</li>
	<li>Fixes integration with Smilies script, data image links will be removed</li>
	<li>Updates the Extra reply button code</li>
	<li>Enhances compatibility with Opera</li>
	<li>Adds keyboad shortcut list</li>
	<li>Adds keyboard shortcut (ALT+T) for toggling "Auto-convert IMG to URL tags" checkbox</li>
</ul>
*/

(function () {
	'use strict';
	var $, greaseWindow, strg, update, Extra, Editor, helper, bond;

	if (!String.prototype.trim) { String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); }; }

	bond = function (o, m) { return function () { return m.apply(o, arguments); }; };

	// Window | No longer works in Chrome 27+
	greaseWindow = (function (a) {
		try {
			a = unsafeWindow === window ? a : unsafeWindow;
		} finally {
			try {
				return a || (function () {
					a = document.createElement('p');
					a.setAttribute('onclick', 'return window;');
					return a.onclick();
				}());
			} catch (e) {
				return window;
			}
		}
	}());

	// console.log(greaseWindow === this);

	function scopeScript(func) {
		var script = document.createElement('script');
		script.id = 'scopeScript';
		script.type = "text/javascript";
		script.textContent = '(' + func + ')();';
		setTimeout(function () {
			document.body.appendChild(script);
			// document.body.removeChild(script);
		}, 0);
	}

	// S T O R A G E HANDLE
	strg = {
		on: (function () { try { var s = window.localStorage; if (s.getItem && s.setItem && s.removeItem) { return true; } } catch (e) { return false; } }()),
		read: function (key) { return this.on ? JSON.parse(window.localStorage.getItem(key)) : false; },
		save: function (key, dat) { return this.on ? !window.localStorage.setItem(key, JSON.stringify(dat)) : false; },
		wipe: function (key) { return this.on ? !window.localStorage.removeItem(key) : false; },
		zero: function (o) { var k; for (k in o) { if (o.hasOwnProperty(k)) { return false; } } return true; }
	};

	// U P D A T E HANDLE
	update = {
		name: 'NeoGAF: Quick Quote, Reply, and Edit',
		version: 7410,
		key: 'ujs_QQRE_UPDT',
		callback: 'qqreupdater',
		page: 'https://userscripts.org/scripts/show/98693',
		urij: 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/qqre/qqre.json',
		uric: 'https://dl.dropboxusercontent.com/u/14626536/userscripts/updt/qqre/qqre.js',
		checkchrome: true,
		interval: 5,
		day: (new Date()).getTime(),
		time: function () {return (new Date(this.day + (1000 * 60 * 60 * 24 * this.interval))).getTime(); },
		top: document.head || document.getElementsByTagName('head')[0],
		css: function (t) {
			if (!this.style) {this.style = document.createElement('style'); this.style.type = 'text/css'; this.top.appendChild(this.style); }
			this.style.appendChild(document.createTextNode(t + '\n'));
		},
		js: function (t) {
			var j = document.createElement('script');
			j.type = 'text/javascript';
			j[(/^https?\:\/\//i.test(t) ? 'src' : 'textContent')] = t;
			this.top.appendChild(j);
			return j;
		},
		notification: function (j) {
			try {
				if (this.version < j.version) {
					window.localStorage.setItem(this.key, JSON.stringify({date: this.time(), version: j.version}));
					var a = document.createElement('a');
					a.href = 'https://userscripts.org/scripts/show/98693';
					a.className = 'userscriptupdater';
					a.title = 'Update now.';
					a.textContent = 'An update for NeoGAF: Quick Quote, Reply, and Edit is available.';
					document.body.appendChild(a);
				}
			} catch (e) {}
		},
		link: function () {
			var a = document.createElement('a');
			a.href = 'https://userscripts.org/scripts/show/98693';
			a.className = 'userscriptupdater';
			a.title = 'Update now.';
			a.textContent = 'An update for NeoGAF: Quick Quote, Reply, and Edit is available.';
			document.body.appendChild(a);
		},
		check: function (opt) {
			// console.log(this.gmu, this.gmxhr);
			if (this.gmu === true || !strg.on) { return; }
			var stored = strg.read(this.key), js;
			this.csstxt();
			if (opt || strg.zero(stored) || stored.date < this.day) {
				this.page = this.page || (stored && stored.page ? stored.page : false);
				strg.save(this.key, {date: this.time(), version: this.version, page: this.page});
				if (!opt && this.gmxhr()) {
					GM_xmlhttpRequest({method: 'GET', url: update.urij, onload: function (r) { update.notification(JSON.parse(r.responseText)); }, onerror: function () { update.check(1); }});
				} else {
					// greaseWindow[this.callback] = function (json) { return update.notification(json); };
					js = this.notification.toString().replace('function', 'function ' + this.callback)
						.replace('this.version', this.version)
						.replace('this.key', "'" + this.key + "'")
						.replace('this.time()', this.time());
					this.js(js);
					this.js(this.uric);
				}
			} else if (this.version < stored.version) { this.link(); }
		},
		gmu: (function () { try { return GM_updatingEnabled; } catch (e) {} }()),
		gmxhr: function () { if (!(this.checkchrome === true && typeof (chrome) === 'object') && typeof (GM_xmlhttpRequest) === 'function') { return true; } },
		csstxt: function () {
			if (!this.pop) { this.pop = true; this.css('.userscriptupdater,.userscriptupdater:visited{-moz-box-shadow:0 0 6px #787878;-webkit-box-shadow:0 0 6px #787878;box-shadow:0 0 6px #787878;border:1px solid #777;-moz-border-radius:4px;border-radius:4px;cursor:pointer;color:#555;font-family:Arial, Verdana, sans-serif;font-size:11px;font-weight:700;text-align:justify;min-height:45px;position:fixed;z-index:999999;right:10px;top:10px;width:170px;background:#ebebeb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAACLCAYAAAD4QWAuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGN0Q1OEQyNjdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGN0Q1OEQyNTdEQzUxMUUwQThCNEE3MTU1NDU1NzY2OSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NUIzQjc3MTI4N0RFMDExOUM4QzlBNkE2NUU3NDJFNCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po6YcvQAAAQFSURBVHja7JzBSxRRHMdnp+gkiLdOgtshKGSljQVF8CK0biEErYfwFmT+BQpdA0MIBEFtTx2qSxESaAt5ioUQFDp5sjl06rbnumzfp7+VbZx5M+/Nb9wZ+f3g56wzO28//ua93/u9J/stdDodx2/P3o85llaFT8JvwlvwTfhf00a2Hv8IPO86PHYHvg//An8OfwRfg/9RfzvTZ7DBvoZXQq6p6D7MCuwT+N2I92zAB/sNO0yPO8quwxf7DasABmK+d0XTVVKHnYIvG96z1i9Ymw8ep/R2obAqNdkm41e2sFct71v1/f4BiXyOJpRpHKZ918s9527B5+FvLwJWDaoR3zmvZ/bZw2HPNyMeBOTeb/BfaXaDEuVMvx2G3QDQMkW21wZsUpkp7GbIeU9zz3TI+WXTVGYCW6XRbApb1lxbTwt2VVMltS1hVWRnuWFVqhoNudbW9NchHIpc+ToO7GDE49JFtRij/ZG4gy0O7CIVIjZWNuhiw0lhK1SA6GzI8ppxKouCjTNaOWC7qWzKFrYaNw/SQOKwNVtYk4KjyAQ7RpnHCHaeCg7ugZQon7sBj3RYM62mHdmTVAaGxbiRNVmqRM3/bUvgDQCX/CcLvZsceEOF1v82dgPTrkdVVp2iXU8Q4e9ob0IHu59gUecxdwdlMwBunusGAJ1NuPr0KLoFdYQ3GGBXAiMLWC9gBRDX2gTa9g3Wp7Rbk8TqaPfjWWRp9I0kaLARVCbiXMO/xLGwdfCd7Oa4eDGQdD0fYYcJ7z/bzXHpxbWEDRaddO1FF3aSobE6pazAawztX0H7465mXWVqB2hwqWdwFeFfGaM+Wlh4V/rkMO2fpmy3VWTf5AD0NzLLkYsfn53T7fUs21k2UPmw5jBs9qZgx/AH4Ns+VxvQwJg0rGXTMPUfnhYgj0MLmayb6+TIBFZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBVZgBTZzVrg3U+Nsz1iTo7m7c+GRFU2ONGBFkyMNWNHkSANWNDl0xqbJAZ+j1/nR5HBOv6zm/8JaPjQ5KKqiyRFVpORfk8PRf3NZq8lRrd3PhiaHc6pvcLk0ORDdfGlyAFg0OdKAPUlliG76mhyGUNaDLXOaHIjuJdXkoKVKXzU5wlJZZjU5AFyKKhErFkuVbjcoUo3Apcmhnu6Ebkcmc5oczd2dZlA3YNHkUAFwUtLkcJlWnm1a1ng94AvkbKnM1SxVTKwRMphYNDkAPNiFFU0OZuPV5NDMYiyaHOgKvJoc8CVftFk1ORRsi/FxvYR3yH9qZjYba+VGkwOTw5GCzZcmByzTmhyI6ra/kNkiz4wmByD/0+T4J8AAyDkZArebBxMAAAAASUVORK5CYII=) no-repeat 13px 15px;padding:12px 20px 10px 65px}.userscriptupdater:hover,.userscriptupdater:visited:hover{color:#55698c!important;background-position:13px -85px;border-color:#8f8d96}'); }
		}
	};
	update.check();

	// DOM/Helpers
	$ = {
		a: function (e) { var i = 1, j = arguments.length, f = document.createDocumentFragment(); for (i; i < j; i++) { f.appendChild(arguments[i]); } e.appendChild(f); return e; },
		e: function (t, o, e, p) { var a, b, c = document.createElement(t); if (typeof (o) === 'object') { for (a in o) { if (o.hasOwnProperty(a)) { b = a.charAt(0); switch (b) { case '_': c.style[a.substring(1)] = o[a]; break; case '$': c.setAttribute(a.substring(1), o[a]); break; default: c[a] = o[a]; break; } } } } if (e) { if (p) { c.appendChild(e); } else { e.appendChild(c); } } return c; },
		t: document.createElement('textarea'),
		h: function (t) { this.t.innerHTML = t; return this.t.value; },
		// return greaseWindow.vB_PHP_Emulator.prototype.urlencode(t);
		// VB Code :|
		y: function (D) {D = escape(D.toString()).replace(/\+/g, "%2B"); var A, C, B = D.match(/(%([0-9A-F]{2}))/gi); if (B) { for (C = 0; C < B.length; C++) { A = B[C].substring(1, 3); if (parseInt(A, 16) >= 128) { D = D.replace(B[C], "%u00" + A); } } } D = D.replace("%25", "%u0025"); return D; }
	};

	// Extra Reply Buttons
	Extra = (function () {
		function Extra(n, s) {
			n = n || '001';
			this.editor = 'vB_Editor_' + n;
			this.txt = document.getElementById(this.editor + '_textarea');
			if (this.txt) {
				this.custum = !!s;
				this.src = this.custum ? document.getElementById(this.editor + '_cmd_underline') : document.getElementById(this.editor + '_cmd_underline').parentNode;
				this.BB = {};
				this.add();
				this.setup();
			}
		}

		Extra.buttons = ['Spoiler', 'Highlight', 'Strike'];
		Extra.images  = ['iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMUM5MjhBNDhBMzcxMUUwOTNBNENBNUUzQjI1MDM3QSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMUM5MjhBMzhBMzcxMUUwOTNBNENBNUUzQjI1MDM3QSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QjZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmqJgXIAAADJSURBVHjaYvz//z8DtQETAw0ATQxlwRBgYWFgZGREwUxMTBhiMPz582eGv3//4jcUKYyjgJp4kMVAhiCBX0DxlUD6O0GXQoEZEC9FNww9UoHiX4DUGqLCFKiZDd31OFIJG1FhCtIMchmyIdhciq6G5NjH5lJ86ZsFlyFoYceAJ8KI9z42S3BFGEWJH0+EEeN9MIkhji0YsFmCw6X/fxET1kD+X6JdCgRngRrqgVgajy8/AvFubBKMuGKa1LAmNu+PgPKUJoYCBBgAnDJ0kFY2KIsAAAAASUVORK5CYII=', 'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozM0I5QzRFMjhBMzUxMUUwOEVEMUQ5RkU1NzlCRTAwRiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozM0I5QzRFMThBMzUxMUUwOEVEMUQ5RkU1NzlCRTAwRiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PkUW7xgAAAB/SURBVHjaYvz//z8DtQETAw3ACDeUBZfEGUX1AiDljyZ8F4iVkfkm92+mEG0oEEwA4jggNoTyFYD4IRB/A2JOIP4OxI7keP8jEvshlP6JRg9wmGIB76E0PzVjXxCKP46MxA9Kp+pA/AGKzwHxHKjcByg9B5tGxtFSagQbChBgAHoVG8AVO051AAAAAElFTkSuQmCC', 'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCRjk5MzM3NjhBMzQxMUUwOTcxNkNDQzlBQjRERDVEMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCRjk5MzM3NThBMzQxMUUwOTcxNkNDQzlBQjRERDVEMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0QTZDNkZFMTMxOEFFMDExOEQ0RTk2MjY1NjVFQUVDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpIU3swAAAEzSURBVHjaYvz//z8DtQETAw3AqKG4QVhoKIOEuHgBIyPjfhDW09PrB/LXg8TxAlDs48Ia6ur1ICXiYmIOSkpKCkD2ekFBwf+hISF49eF16ZevXx1AtLqGhoKxkdEDOzu7RCD3AyHvM6KnUycnJzj74cOH8+/du5cAYsvIyBzQ09VtfPny5Qc+fv4LMDX79u3DMJQFh2VbgNhbXl6eAYShwOH7jx8OQANh/K1A7INNMy5DwYpFhIUNvn79+uDS5csJT548yQcKgcKVwcXZOfHvv38LyIr94ydO9P/69ctAVVV1gqOjoyIwksAGAS2Sx6cPw6XIYSQrK8tw9ty5fmAkBQINfMDGynoRJM7KxnYQW1gS8j4cAF36YM/eveeBTFDkKACTVyIQHyAp9kfz/ggyFCDAAMW7jH/4BUY6AAAAAElFTkSuQmCC'];
		Extra.ctrl    = { b: 'b', i: 'i', u: 'u', s: 'Strike', h: 'Highlight', p: 'Spoiler', l: 'url', m: 'img', e: 'save', d: 'del' };

		Extra.prototype = {
			constructor: Extra,
			click : function (el) {
				var evt = document.createEvent('MouseEvents');
				evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				return !el.dispatchEvent(evt);
			},
			insert: function (evt) { // based on: http://parentnode.org/javascript/working-with-the-cursor-position/ // gecko parts only
				var t = evt.target.alt.toUpperCase(), start, end, pos, temp;
				if (this.txt.selectionStart >= 0) {
					start = this.txt.selectionStart || 0;
					end = this.txt.selectionEnd || 0;
					temp = this.txt.value.substr(0, start) + '[' + t + ']' + this.txt.value.substr(start, end - start);
					pos = temp.length;
					this.txt.value = temp + '[/' + t + ']' + this.txt.value.substr(end, this.txt.value.length);
					this.txt.focus();
					start = start + 2 + t.length;
					this.txt.setSelectionRange(start, pos);
				}
			},
			add: function () {
				var i = Extra.buttons.length, div, td;
				while (i--) {
					div = $.e('div', {className: 'imagebutton', title: 'new'});
					this.BB[Extra.buttons[i]] = $.e('img', {height: 20, width: 21, src: 'data:image/png;base64,' + Extra.images[i], alt: Extra.buttons[i], title: Extra.buttons[i]}, div);
					this.BB[Extra.buttons[i]].addEventListener('click', bond(this, this.insert), false);
					if (this.custum) {
						this.src.parentNode.insertBefore(div, this.src.nextSibling);
					} else {
						td = $.e('td', {className: 'imgbtnemu'}, div, true);
						this.src.parentNode.insertBefore(td, this.src.nextSibling);
					}
				}
			},
			keys: function (e) {
				if (e.ctrlKey) {
					var k = Extra.ctrl[String.fromCharCode(e.which).toLowerCase()];
					if (k && this.BB[k]) {
						e.preventDefault();
						if (e.type === 'keypress') { return; } // Firefox 4 workaround
						this.click(this.BB[k]);
					}
				}
			},
			setup: function () {
				if (typeof document.documentElement.style.MozAppearance !== 'string') {
					this.BB.b = document.getElementById(this.editor + '_cmd_bold');
					this.BB.i = document.getElementById(this.editor + '_cmd_italic');
					this.BB.u = document.getElementById(this.editor + '_cmd_underline');
				}
				this.BB.img = document.getElementById(this.editor + '_cmd_insertimage');
				this.BB.url = document.getElementById(this.editor + '_cmd_createlink');
				this.txt.addEventListener('keydown', bond(this, this.keys), false);
				this.txt.addEventListener('keypress', bond(this, this.keys), false);
			}
		};
		return Extra;
	}());
	update.css('td.imgbtnemu div:hover { border:1px solid #316ac5; margin: -1px; background: #c1d2ee; } td.imgbtnemu div:active { background: #98b5e2; } #vB_Editor_001_cmd_wrap0_spoiler { visibility:hidden !important }');

	// Quick Editor
	Editor = (function () {
		function Editor(el) {
			this.id = el.name.split('::')[2];
			this.show = 0;
			this.num = document.querySelector('a[href^="showpost.php?p=' + this.id + '&postcount="]').textContent; //.href.match(/(?:postcount=)(\d+)/)[1];
			this.dom(el);
		}

		Editor.toggle = {
			displays : [
				['block', 'none', 'none'],
				['none', 'block', 'inline']
			],
			spin : ['none', 'inherit']
		};

		Editor.url = {
			gets  : 'ajax.php?do=quickedit&p=',
			posts : 'editpost.php?do=updatepost&postid=undefined'
		};

		Editor.prototype = {
			constuctor: Editor,
			dom: function (el) {
				this.el = el;
				this.el.addEventListener('click', bond(this, this.clicks), false);
				this.spin = document.getElementById('progress_' + this.id);
				this.post = document.getElementById('post_message_' + this.id);
				this.div = $.e('div', {className : 'inpost'}, this.post.parentNode);
			},
			clicks: function (e) {
				e.preventDefault();
				if (this.x) {
					this.toggle();
				} else {
					this.gets();
				}
			},
			gets: function () {
				this.x = new XMLHttpRequest();
				this.x.onprogress = bond(this, this.spinner)(true);
				this.x.open('POST', Editor.url.gets + this.id, true);
				this.x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				this.x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				this.x.onload = bond(this, this.load);
				this.x.onerror = bond(this, this.error);
				this.x.send('securitytoken=' + helper.token() + '&do=quickedit&p=' + this.id + '&editorid=vB_Editor_QE_1');
			},
			buildPost: function () {
				return [
					'securitytoken=',
					helper.token(),
					'&do=updatepost&ajax=1&postid=',
					this.id,
					'&wysiwyg=0&message=',
					$.y(this.div.querySelector('textarea').value),
					'&reason=',
					$.y(this.div.querySelector('input[name="reason"]').value),
					'&postcount=',
					this.num
				].join('');
			},
			posts : function (e) {
				e.preventDefault();
				var s = this.buildPost(); //.call(this);
				this.p = new XMLHttpRequest();
				this.p.open('POST', Editor.url.posts + this.id, true);
				this.p.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				this.p.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
				this.p.setRequestHeader('Content-Length', s.length);
				this.p.onload = bond(this, this.update);
				this.p.onerror = this.error;
				this.p.send(s);
			},
			toggle : function () {
				var toggle = Editor.toggle.displays[this.show];
				this.el.style.display = toggle[2];
				this.div.style.display = toggle[0];
				this.post.style.display = toggle[1];
				helper.tmp = this.show ? helper.txt : this.text;
				this.show = Number(!this.show);
			},
			spinner : function (show) {
				this.spin.style.display = Editor.toggle.spin[Number(!!show)];
			},
			load: function () {
				var t = this.xmlhtml(this.x, 'editor', 'textarea');
				if (t && t[0]) {
					helper.doform(this.id, this.div, t[0].value, false, true, t[1]);

					this.extra = new Extra(this.id, true);
					this.text = this.div.querySelector('textarea');

					this.div.querySelector('.cancel_button').addEventListener('click', bond(this, this.toggle), false);
					document.getElementById('vB_Editor_' + this.id + '_save').addEventListener('click', bond(this, this.posts), false);

					update.js('(function () { vhook(' + this.id + '); }())');
				}
				this.spinner();
				this.toggle();
			},
			update: function () {
				var post = this.xmlhtml(this.p, 'postbit', '.post');
				try {
					this.post.innerHTML = post[0].innerHTML;
					this.toggle();
				} catch (e) {} //console.log(e);
			},
			error : function () {
				alert('Request failed.');
			},
			xmlhtml : function (attr, b, selector) { // b may be unecessary
				try {
					// console.log(attr, this[attr].responseXML);
					var div = $.e('div', {innerHTML: attr.responseText}), r = '';
					// div.innerHTML = attr.responseText;
					div = div.querySelector(b);
					try {
						r = div.querySelector('editor[reason]').getAttribute('reason');
					} catch (er) {}
					return [div.querySelector(selector), r];
				} catch (e) {}
			}
		};
		return Editor;
	}());

	helper = {
		ran: false,
		tid: null,
		pid: null,
		sub: 0, // Subscriptions /// 9999 = None // 0 = Yes // 1 = With Email // 2 = Daily Email // 3 = Weekly Email
		closed: document.querySelector('a.large-button.disabled'),
		ver: (function () {
			try {
				return '?v=' + document.querySelector('script[src*="v="]').src.split('v=')[1];
			} catch (e) { return ''; }
		}()),
		key: 'uQQR',
		S: strg.read('uQQR'),
		d: $.e('div'),
		p: document.querySelectorAll('.postbit:not(.ignored) .post'),
		u: document.querySelectorAll('.postbit:not(.ignored) .postbit-details-username a'),
		v: document.querySelectorAll('.postbit:not(.ignored) .multiquotelink') || document.querySelectorAll('.postbit:not(.ignored) .post-button'),
		main: document.querySelector('#main'),
		j: document.querySelectorAll('a[href*="editpost"]'),
		img: {
			button: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowN0ZGNkM2MERCMEUxMUUyOTQwNkExQjg0NkYxQ0M0OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowN0ZGNkM1RkRCMEUxMUUyOTQwNkExQjg0NkYxQ0M0OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMDgyRDgxNkQ5ODdFMDExOTI4RUREM0QyQUUxREY5NyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGRjg5NTBEMDYwODdFMDExQkE4RUNGOEQ3QzZENjU2MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoXp4HUAAAQmSURBVHjatJdPiBxFFMa/6q7umZ6emZ1d1EkwHmT3EKIkIkgMiLAERFZvwYPexD8n8RLQEC85JnowHr16UUEPhrgadfEiogYGMyaRkF33ICKLgpqd3Z0/3V35qrtmttMzu85mZh78mJ7urnqvvqr3qlo03nMwpBXJM2SePEIeJFPm2X9klfxMviWfk0ZfD8ICLAlIduVV8MWVCKLxzv86niNvkueJP2SwG+RDco4spyKgcxdwCoA7hQtXGA8i3h9Mnpwl18jLxN/l3Sy+aaPbnjN98b4CgighDImCjB/02yz5xEg9inG4eIM8RZ6L1RAmEINE0NfoUbJIqhif6YF8RxZILQ5CJWSnYI58Sap7kHtYqnHfAX1o52FyX8YXiXlG9nsxOdN9f0qfj5OtRAHVk+MMOZL6PykOc+RnennRON1bdL8SB5M2my4crwOvfOjCNWvZiqcgxCnimOvJE9FXhFOKa0Csn0RJKfy5hyKzo1kiUTlVdvpNOlCuhyhf3vjsurVfhgEWmI6+yjQSmdZKZaqq2L6nTDvb2u5DiO37vT40TPvIZi0K4LcDsSC32jiua4IKk1ctqWANCGBQIHEtYTv9q0cv2dZh57YArLRTg34PdpKVm0pgq4Xj4vA+7we6O5oemRhCbmWCUSkFdBBHKhHOzzfj627R63DUHXpdvGHj/VUPfsFHaaaMf5rRj/Jv4c8KIe5u0gc0OzS9ibCj5VDxY0qNjbbAxRsWTl/NoVTKo8ytIRAeWqI9K3OuUx5nlj08EyEKkinQynQ63JuN81zOBf3B83JwHQeddlCW43RetBXmym0IU2q1ApdWbLx11Y2d5/Mu18mdLnWgt8YVwGNTLfgWFzEDYCy49JuN12sOa4/DAPjLNMlM9y0ZKbXCi3vGEcCT0y1uKNxiuTq/WrXw6mUHjuvGkktpmyxSPWgrWoH6uBQ4NtNiiVP4+ncbL12m3By5lt227VQaqyR7kgDqOoClcTg/WAiw3w2x9IfEiz9Rbs51d853SbIlrdaiOcONVIrnp5tYWnPxSk3SqWVkl33FKzUFm2RRK7BOPhpVgQbT7bVfClA89eZz3ZHvWl/0oXVdPHCg2j35Xh9pO+bWFoTJAVPP+U7OHS5G3/c6laniQ81m+2a3ZOuj87ujKKDrnna8m/OUnSc342J64P770kcy7gs8sUzQqECdChybrpQ2qYBO2d4K2SInyPcTPBf+xbpzQi/AyCxGK/OCnoqnydoEnK+ZvpfvKMXpymSokSdIfcCzu6Vu+qylU7G7FwwyHaU+I7ytN7QRRt0xfRzNjrx3Ri0WvZ0a62+mb0yN0C8d3EOa6vX0AXmBfGz6SkZs2fG+kM/neFbg1/G+6tD7kP48fzbzeV4xz/7NfJ5fHPh5rj8WXYmCl0elUuGRLMRtAQYAYbshc70RBucAAAAASUVORK5CYII='
		},
		r: {
			// '<div style\\="[^]+?<table[^]+?<\\/table[^]+?<\\/div>' : '',
			'<blockquote>' : '[indent]',
			'<blockquote class\\="quote code">[^]+?<pre>([^]+?)<\\/pre>[^]+?<\\/blockquote>' : '[code]$1[/code]',
			// '<blockquote\\s+?class\\="quote[^]+?<p class="cite">[^]+?<\\/blockquote>' : '',
			// '<blockquote class="quote[^]+?<p class="cite">[^]+?<strong>([^]+?)</strong>[^]+?<\\/p>([^]+?)<\\/blockquote>'
			// '<blockquote[^]+?data-username\\="[^]+?<\\/blockquote>' : '', // inner quotes are going to get buggy
			'<\\/blockquote>' : '[/indent]',
			'<li>' : '[*]',
			'<\\/li>' : '',
			'<b>' : '[b]',
			'<\\/b>' : '[/b]',
			'<i>' : '[i]',
			'<\\/i>' : '[/i]',
			'<strike>' : '[strike]',
			'<\\/strike>' : '[/strike]',
			'<u>' : '[u]',
			'<\\/u>' : '[/u]',
			'<ul>' : '[list]',
			'<\\/ul>' : '[/list]\n',
			'<ol [^]+?>' : '[list=1]',
			'<\\/ol>' : '[/list]\n',
			'<img[^]+?src\\="data\\:image[^]+?>' : '',
			'<img[^]+?src\\="([^]+?)"[^]+?>' : '[img]$1[/img]',
			'<a href\\="mailto\\:([^]+?)">([^]+?)<\\/a>' : '[email="$1"]$2[/email]',
			// '<a[^]+?href\\="#"[^]+?>[^]+?<\\/a>' : '',
			'<a[^]+?href\\="([^]+?)"[^]+?>' : '[url="$1"]',
			'</a>' : '[/url]',
			// '<div style\\="margin[^]+?dir[^]+?">([^]+?)<\\/pre[^]+?<\\/div>' : '[code]$1[/code]\n',
			'<span style\\="color\\: #e21212">([^]+?)<\\/span>' : '$1',
			'<span class\\="?spoiler".*?>([^]+?)<\\/span>' : '[spoiler]$1[/spoiler]',
			'<span class\\="highlight">([^]+?)<\\/span>' : '[highlight]$1[/highlight]',
			'<br.?\\/?>' : '',
			'<span [^]+?<\\/span>' : '',
			'<div [^]+?<\\/div>' : '',
			'<.*?>' : '',
			'\\[I\'m an idiot\\.\\]' : 'lol'
		}, // '<img[^]+?src\\="images\\/smilies\\/laugh.gif"[^]+?\\/>' : ':lol', // '<img[^]+?src\\="images\\/smilies\\/biggrin.gif[^]+?"\\/>' : ':D',
		e: ['removeformat', 1, 'undo', 'redo', 1, 'bold', 'italic', 'underline', 1, 'insertorderedlist', 'insertunorderedlist', 'outdent', 'indent', 1, 'createlink', 'unlink', 'email', 'insertimage', 1, 'quote', 'code', 1, 2],
		token: function () { var s = greaseWindow.SECURITYTOKEN; return typeof s === 'string' ? s : ''; },
		token2: function () { try { if (!!document.querySelector('#usercptools strong')) { return document.getElementsByTagName('head')[0].textContent.match(/SECURITYTOKEN = "(.+?)"/)[1]; } return ''; } catch (e) { /*alert('Quick Quote, Reply and Edit encountered an error.'); */ } },
		store: function () {
			var i = this.usp.getElementsByTagName('input'), j = i.length, k;
			if (strg.zero(this.S)) { this.set(); }
			if (this.S.i === this.tid) { this.write(); }//console.log('This has tid:'+this.S.i+' title:'+this.S.t/* +' content:'+this.S.c */+' u:'+this.S.u+' s:'+this.S.s);
			this.iur.checked = this.S.u;
			this.sav.addEventListener('click', this.set, false);
			this.del.addEventListener('click', this.rem, false);
			this.frm.addEventListener('submit', this.rem, false);
			this.iur.addEventListener('click', this.set, false);
			while (j--) { k = i[j]; if (+k.value === +this.S.s) { k.checked = true; } k.addEventListener('click', this.set, false); }
		},
		write: function () {// console.log('write STOREd');
			this.qtl.value = this.S.t;
			this.txt.value = this.S.c;
		},
		rem: function () {
			if (this.value === 'Delete') { helper.qtl.value = helper.txt.value = ''; }
			helper.S = {i: 0, t: '', c: '', u: helper.iur.checked, s: helper.sub};
			strg.save(helper.key, helper.S);
		},
		toggleImageQuotes: function (e) {
			if (e.altKey && String.fromCharCode(e.which).toLowerCase() === 't') {
				e.preventDefault();
                Extra.prototype.click(helper.iur);
				alert('Images in quotes ' + (helper.iur.checked ? 'disabled.' : 'enabled.'));
			}
		},
		set: function (e) {
			if (e && e.target.name === 'emailupdate') { helper.sub = e.target.value; }
			helper.S = {i: helper.tid, t: helper.qtl.value, c: helper.txt.value, u: helper.iur.checked, s: helper.sub};
			strg.save(helper.key, helper.S);// console.log('i: '+helper.S.i+' t: '+helper.S.t+' u: '+helper.S.u+' s: '+helper.S.s); // console.log('c: '+helper.S.c);
		},
		buster: function () {
			update.js('function vhook(id){ return vB_Editor["vB_Editor_"+id] = new vB_Text_Editor("vB_Editor_"+id, 0, "3", "1"); } (function(){ vbphrase["enter_list_item"] = "Enter a list item."; vbphrase["message_too_short"] = "Your message is too short."; vbphrase["enter_link_url"] = "URL:"; vbphrase["enter_image_url"] = "Image URL:"; vbphrase["enter_email_link"] = "E-mail:"; }())');
			var s = $.e('script', {type: 'text/javascript', src: '/forum/clientscript/vbulletin_textedit.js' + helper.ver});
			s.addEventListener('load', function () { update.js('(function () { vhook("001"); }())'); }, false);
			document.body.appendChild(s);
		},
		ids: function () {
			try {
				this.tid = document.querySelector('.left a[href*="showthread.php?t="]').href.match(/t\=(\d+)/)[1];
				this.pid = document.querySelector('a[href^="newreply.php?do=newreply&noquote=1&p="]').href.match(/p\=(\d+)/)[1];
			} catch (e) {}
			return (this.tid && this.pid);
		},
		form: function () {
			if (!this.main || !this.ids()) { return false; }
			return this.doform('001', this.main);
		},
		doform: function (n, el, msg, title, edit, reason) {
			if (!n || !el) { return false; }
			msg = $.h(msg || '');
			title = $.h(title || '');
			reason = $.h(reason || '');
			var i = -1, j = helper.e.length, f = $.e('form', {className: 'quickreplyformp', action: n === '001' ? 'newreply.php' : 'editpost.php', name: 'vbform', method: 'post', onsubmit: 'return vB_Editor["vB_Editor_' + n + '"].prepare_submit(0, 1)'}, el), d = $.e('div', {className: n === '001' ? 'alt1 newreplybox' : 'alt2 newreplybox'}, f), p = $.e('p', false, d), v = $.e('div', {id: 'vB_Editor_' + n, className: 'vBulletin_editor'}, d), w = $.e('div', {id: 'vB_Editor_' + n + '_controls', className: 'controlbar'}, v), t = $.e('textarea', {dir: 'ltr', tabindex: 2, cols: 60, rows: 10, _width: '500px', _height: '150px', id: 'vB_Editor_' + n + '_textarea', name: 'message', value: msg}, d), r = $.e('div', {$style: 'text-align:center;margin-top:6px;clear:both'}, d), ti = $.e('input', {size: 50, name: 'title', className: 'biginput', type: 'text', tabindex: 1, value: title}, p);
			if (!edit) { $.e('small', {title: 'Optionally, set a title for your post.', _cursor: 'help', textContent: ' Title'}, p); } else { ti.parentNode.removeChild(ti); $.e('input', {className: 'biginput', type: 'text', title: 'Optional', maxlength: 125, size: 50, name: 'reason', value: reason}, p); $.e('small', {title: 'Reason for editing.', _cursor: 'help', textContent: ' Reason'}, p); }
			$.e('input', {type: 'hidden', name: 'securitytoken', id: '', value: this.token()}, r);
			$.e('input', {type: 'hidden', name: 'wysiwyg', id: '', value: 0}, r);
			$.e('input', {type: 'hidden', name: 's', value: ''}, r);
			$.e('input', {type: 'hidden', name: 'do', value: n === '001' ? 'postreply' : 'updatepost'}, r);
			$.e('input', {type: 'hidden', name: 't', value: helper.tid}, r);
			$.e('input', {type: 'hidden', name: 'p', value: n === '001' ? helper.pid : n}, r);
			$.e('input', {type: 'hidden', name: 'posthash', value: ''}, r);
			$.e('input', {type: 'hidden', name: 'poststarttime', value: ''}, r);
			$.e('input', {type: 'hidden', name: 'parseurl', value: 1}, r);
			$.e('input', {type: 'submit', name: 'sbutton', value: 'Submit', id: 'vB_Editor_' + n + '_save', className: 'large-button submit', tabindex: 3, accesskey: 's', title: 'Submit your reply.'}, r);
			if (n === '001') { this.frm = f; this.qtl = ti; this.sav = $.e('input', {type: 'button', name: 'sbutton1', value: 'Save', id: 'quicksavebutton', className: 'large-button submit', tabindex: 4, title: 'Save your reply.'}, r); this.del = $.e('input', {type: 'button', name: 'sbutton2', value: 'Delete', id: 'quickclearbutton', className: 'large-button submit', tabindex: 5, title: 'Delete your reply.'}, r); this.tmp = this.txt = t; }
			if (edit) { $.e('input', {type: 'button', name: 'cancel', value: 'Cancel', className: 'large-button submit cancel_button', tabindex: 6, accesskey: 'c', title: 'Cancel your reply.'}, r); }
			this.prevB = $.e('input', {type: 'submit', name: 'preview', value: 'Preview', className: 'large-button submit', tabindex: 7, accesskey: 'p', title: 'Preview your reply.'}, r);
			if (n === '001') {helper.usp = $.e('p', {id: 'qqre_subs', innerHTML: 'Subscribe? <label><input type="radio" name="emailupdate" value="9999" /> No</label><label><input type="radio" name="emailupdate" value="0" checked="checked" /> Yes</label><label><input type="radio" name="emailupdate" value="1" /> Instant E-mail</label><label><input type="radio" name="emailupdate" value="2" /> Daily E-mail</label><label><input type="radio" name="emailupdate" value="3" /> Weekly E-mail</label>'}, r); }
			p = $.e('label', {'for': 'qqre_img', textContent: 'When quoting, auto-convert IMG tags to URL tags (ALT+T).', title: 'Convert [IMG] to [URL]', id: 'qqre_labelimg2url'}, r);
			p = $.e('input', {type: 'checkbox', id: 'qqre_img', checked: helper.S ? helper.S.u : false}, p);
			if (!this.iur) { this.iur = p; }
			$.e('div', {innerHTML: '<p style="text-align:center" onclick="this.nextSibling.style.display = this.nextSibling.style.display === \'block\' ? \'none\' : \'block\'"><span class="qqre_shortcuts">View CTRL-Key Shortcuts</span></p><ul id="qqreshortcuts" style="display:none"><li><b>B</b>: Bold</li><li><b>I</b>: Italic</li><li><b>U</b>: Underline</li><li><b>S</b>: Strike</li><li><b>H</b>: Highlight</li><li><b>P</b>: Spoiler</li><li><b>L</b>: URL</li><li><b>M</b>: Image</li><li><b>E</b>: Save*</li><li><b>D</b>: Delete*</li><li><br />*Only for quick reply</li></ul>'}, d);
			while (++i < j) { this.imgb(n, helper.e[i], w); }
			return true;
		},
		imgb: function (n, m, el) {
			var id;
			switch (m) {
			case 1:
				$.e('img', {width: 6, height: 20, alt: '', src: 'images/neogaf/editor/separator.gif'}, $.e('div', false, el));
				break;
			case 2:
				$.a($.e('div', {className: 'imagebutton resize_merger'}, el),
					$.e('div', {className: 'imagebutton', id: 'vB_Editor_' + n + '_cmd_resize_0_100'}, $.e('img', {src: 'images/neogaf/editor/resize_0.gif', height: 9, width: 21, alt: 'Decrease Size'}), true),
					$.e('div', {className: 'imagebutton', id: 'vB_Editor_' + n + '_cmd_resize_1_100'}, $.e('img', {src: 'images/neogaf/editor/resize_1.gif', width: 21, height: 9, alt: 'Increase Size'}), true));
				break;
			case 'quote':
			case 'code':
				id = 'vB_Editor_' + n + '_cmd_wrap0_';
				break;
			default:
				id = 'vB_Editor_' + n + '_cmd_';
				break;
			}
			if (id) {
				$.e('img', {src: 'images/neogaf/editor/' + m + '.gif', width: 21, height: 20, alt: m}, $.e('div', {className: 'imagebutton', id: id + m}, el));
			}
		},
		reply: {
			put : function (post) {
				if (helper.S.u) {
					post = post.replace(/\[url\=\".+?\"\]\[img\]/ig, function ($1) {
						return $1.replace(/\[img\]/i, 'Link[/url] : [url="');
					}).replace(/\[\/img\]\[\/url/ig, '"]Image[/url').replace(/(?:\[(\/?)img\])/ig, '[$1url]');
				}
				helper.tmp.value = helper.tmp.value ? (helper.tmp.value + '\n\n' + post) : post;
				if (helper.tmp.id === helper.txt.id) { helper.set(); }
			},
			quote : function () {
				var user = this.getAttribute('data-user'), id = this.id.substring(2), pid = this.id.substring(15),
					i, re, post = helper.reply.unquote(document.getElementById(id).innerHTML), r = helper.r;
				for (i in r) {
					if (r.hasOwnProperty(i)) {
						re = new RegExp(i, 'ig');
						post = post.replace(re, r[i]);
					}
				}
				post = '[quote=' + user + ';' + pid + ']' + $.h(post).trim() + '[/quote]\n';
				helper.reply.put(post);
				this.className = 'multiquotelink quickquotes quickquoted';
			},
			unquote: function (post) {
				var div = $.e('div', {innerHTML: post}), e = div.querySelectorAll('.quote:not(.code)'), i = e.length;
				while (i--) {
					div.removeChild(e[i]);
				}
				return div.innerHTML;
			}
		},
		posts: function () {
			var i = this.p.length, v, Y;
			while (i--) {
				v = this.v[i];
				if (v && this.quickreply) {
					Y = $.e('i', {title: 'Quick Quote', '$data-user': this.u[i].textContent, id: 'q_' + this.p[i].id, className: 'multiquotelink quickquotes'});
					Y.addEventListener('click', helper.reply.quote, false);
					v.parentNode.insertBefore(Y, v.parentNode.firstElementChild);
				}
			}
		},
		go: function () {
			if (this.ran) {
				return false;
			}
			this.ran = true;
			if (document.location.href.match(/(?:\b(?:newreply|editpost|newthread)\b)/)) {
				return new Extra();
			}
			// console.log(this.token());
			if (/(?:showthread)/.test(document.location.href) && this.token()) {
				return this.processPosts();
			}
		},
		initialize: function () {
			this.quickreply = true;
			this.buster();
			this.store();
			this.ext = new Extra(false, true);
			this.ext.BB.del = this.del;
			this.ext.BB.save = this.sav;
		},
		processPosts: function () {
			var i = this.j.length, e, q;
			if (!this.closed) {
				window.addEventListener('keydown', helper.toggleImageQuotes, false);
				update.css('.quickreplyformp div.vBulletin_editor { background: transparent; border: 0; padding: 0 } #quickreplybox { position:fixed; top:0; left:0; width: 100%; background: transparent; text-align: center; } #quickreplybox span { background: #4aa4b7; color: #fff; padding: 3px; -moz-border-radius: 3px; border-radius: 3px } #quickreplybox span:hover { background: #47a947; cursor: pointer} .hide { display: none; } .newreplybox { font-family: Arial, Verdana, sans-serif; width: 95%; margin: auto; padding: 9px 8px 6px} .inpost .newreplybox { width: 90% !important; border: 1px solid #ccc} .quickreplyformp textarea { display:block; margin: auto} .newreplybox .vBulletin_editor { border: 0 none !important; } .newreplybox p { margin: 0 0 3px; text-align: center} .quickquotes, .quickquoted { cursor: pointer; background: url(' + this.img.button + ') no-repeat; -moz-background-size: 16px 16px; background-size: 16px 16px; width:16px; height:16px; margin-right:2px; -moz-transition-duration: .5s; -webkit-transition-duration: .2s; -o-transition-duration: .2s; transition-duration: .2s; } .quickquotes:hover{opacity:.8} .quickquotes:active,.quickquoted,.quickquoted:hover{opacity:.5} #quickreplyformpoff { position: fixed; z-index: 1000; top: 28px; left: 150px; } #vB_Editor_001 { border: none; background: transparent; margin: 0; padding: 0 } \n.newreplybox .imagebutton { border: 0 !important; padding: 1px !important; margin: 0 2px;} .resize_merger.imagebutton { background: transparent !important; padding: 0 !important; vertical-align: middle; } .newreplybox .imagebutton:hover img { background-color: #C1D2EE; -moz-border-radius: 2px; border-radius: 2px } .newreplybox .controlbar { text-align:center; padding: 0px; margin: 4px auto 2px auto; } .newreplybox .controlbar > div { display:inline-block } .newreplybox .large-button.submit:focus { outline: none;-moz-border-radius: 3px;border-radius: 3px; background-color:#01518E; border:0; color:#eee;} .newreplybox .large-button.submit:active{ outline: none; -moz-border-radius: 3px; border-radius: 3px; background-color:#666; border:0; color:#fff; } \n.post { min-height: 108px } .editarea .newreplybox { width: 650px; margin: 12px 6px } .editarea textarea { width: 99% !important; } .editarea textarea, .biginput { border:1px solid #bbb } #qqre_labelimg2url{display:block;font-size:11px;margin:3px 0;}.newreplybox input[type="radio"],#qqre_img{width:13px;height:13px;padding:0;margin:0 0 0 4px;vertical-align:bottom;position:relative;top:-1px;}.inpost .newreplybox{width: 94%} .qqre_shortcuts {font-weight:bold;cursor:pointer} .qqre_shortcuts:hover {text-decoration:underline}  #qqreshortcuts { margin: 5px 0; padding: 0; text-align: center; } #qqreshortcuts li {color: #333; display: inline; padding: 0 3px; } #vB_Editor_001_cmd_wrap0_spoiler { visibility:hidden !important }');
				while (i--) {
					e = this.j[i];
					e.textContent += '+';
					e.title = 'Quick Editor++';
					e.onclick = null;
					q = new Editor(e);
					// console.log(q);
				}
				q = null;
				if (this.form()) {
					this.initialize();
				}
				this.posts();
			}
		}
	};

	if (!helper.token()) {
		// console.log('Token unavailable.');
		// add messenger to this script
		window.addEventListener('message', function (event) {
			if (event.data.type && (event.data.type === 'QQRE_PAGE')) {
				greaseWindow[event.data.prop] = event.data.val;
				if (event.data.prop === 'SECURITYTOKEN') {
					helper.go();
				}
			}
		}, false);

		// send message
		scopeScript(function () {
			window.postMessage({ type: 'QQRE_PAGE', prop: 'SECURITYTOKEN', val: window.SECURITYTOKEN }, '*');
		});

		// otherwise . . .
		window.setTimeout(function () {
			if (!helper.token()) {
				helper.token = helper.token2;
				helper.go();
			}
		}, 500);
	} else {
		helper.go();
	}
}());