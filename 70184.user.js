// ==UserScript==
// @id             neogaf-image-scaler-ad3894bc-e561-4ddb-9c7a-c32ddbf93215@hr
// @name           NeoGAF : Image Scaling Lite
// @version        4.5
// @namespace      hateradio)))
// @author         hateradio
// @description    Fixes the issue with image links (prevents them from opening a new page when clicked) and makes quoted images a bit larger.
// @icon           data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpCQjgyQUQ5M0VFNENFMjExOUIzN0RGOTZFQzU2Qjc1MSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyNkQ4NzkyMzRENUYxMUUyODJENzg2RDYzOEJCMDczOSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyNkQ4NzkyMjRENUYxMUUyODJENzg2RDYzOEJCMDczOSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyM0U0RTlGNTY0REUyMTE4NDg2RURCOTA3Q0QxMzZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJCODJBRDkzRUU0Q0UyMTE5QjM3REY5NkVDNTZCNzUxIi8+IDwvcmRmOkRlc2NyaXB0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

// @include        http://*neogaf.com/forum/showthread.php*
// @include        http://*neogaf.com/forum/showpost.php*
// @include        http://*neogaf.net/forum/showthread.php*
// @include        http://*neogaf.net/forum/showpost.php*
// @match          http://*.neogaf.com/forum/showthread.php*
// @match          http://*.neogaf.com/forum/showpost.php*
// @match          http://*.neogaf.net/forum/showthread.php*
// @match          http://*.neogaf.net/forum/showpost.php*

// @homepage       https://userscripts.org/scripts/show/70184
// @updateURL      https://userscripts.org/scripts/source/70184.meta.js

// @updated        15 Jul 2013
// @since          28 Feb 2010

// @run-at         document-end
// ==/UserScript==

(function () {
	'use strict';

	var pix = {
		width: 720, // px
		height: 560,
		init: function () {
			this.fn.screen();
			this.fn.css('img[data-gmscale] { cursor: pointer; -moz-box-shadow:0px 0px 5px #646464; -webkit-box-shadow:0px 0px 5px #646464; box-shadow:0px 0px 5px #646464 } img[data-gmscale]:hover { -moz-box-shadow:0px 0px 4px #888; -webkit-box-shadow:0px 0px 4px #888; box-shadow:0px 0px 4px #888 } .post img:not([class*="full-image"]):not(.inlineimg) { max-width:' + this.width + 'px !important; max-height: ' + this.height + 'px !important } .gm_scale_link { position: relative; display:compact; padding-bottom: 3px; } .quote .gm_scale_link {display:inline-block} .gm_scale_link:after { content:"External Link"; border: 1px solid #EAEAEA; bottom: 13px; left: 10px; position: absolute; background:white; padding: 1px 5px; color: #333; z-index:2; opacity: .9 } a.gm_scale_link:hover:after {opacity:.6}');
			this.fn.select('.post a[href] img', this.fn.procA);
			this.fn.select('.post img', this.fn.procImg);
		},
		evt: {
			capture: function (e) {
				if (e.target.tagName !== 'A') {
					e.preventDefault();
				}
			}
		},
		fn: {
			invalid: function (img) {
				return !img.hasAttribute('data-gmscale')
					&& (img.naturalWidth > pix.width || img.naturalHeight > pix.height);
			},
			screen: function () {
				try {
					pix.width = Math.round(getComputedStyle(document.querySelector('.post'), null).getPropertyValue('width').slice(0, -2) * 0.9);
					pix.height = Math.round(window.innerHeight * 0.8);
					// console.log(pix.width, pix.height);
				} catch (e) { /* console.error(e); */ }
			},
			select: function (selector, cb) {
				var s = document.querySelectorAll(selector), i = s.length;
				while (i--) {
					if (cb(s[i], i, s) === false) {
						break;
					}
				}
			},
			parent: function (el, search) {
				if (el.tagName.toLowerCase() === search.toLowerCase()) {
					return el;
				}
				if (el.parentElement) {
					return this.parent(el.parentElement, search);
				}
				return false;
			},
			procA: function (img) {
				if (pix.fn.invalid(img)) {
					var a = pix.fn.parent(img.parentElement, 'a'); // a = img.parentElement;
					if (a && !a.hasAttribute('data-gmscale')) { // a.tagName === 'A'
						a.setAttribute('data-gmscale', true);
						a.className += ' gm_scale_link';
						a.title = 'Click to open';
						a.addEventListener('click', pix.evt.capture, true);
						img.title = '[Middle click to open new page.] ';
					}
					pix.fn.procImg(img, true);
				}
			},
			procImg: function (img, force) {
				if (force === true || pix.fn.invalid(img)) {
					img.title += 'Image: ' + (img.naturalWidth) + 'x' + (img.naturalHeight);
					img.setAttribute('data-gmscale', true);
				}
			},
			css: function (css) {
				var e = document.createElement('style');
				e.textContent = css;
				document.body.appendChild(e);
			}
		}
	};

	pix.init();
}());