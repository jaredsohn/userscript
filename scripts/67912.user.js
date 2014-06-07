// ==UserScript==
// @name           コソアン レスポップアップ
// @description    アンカーにマウスオーバーでポップアップ
// @include        http://find.2ch.net/enq/result.php/*
// @namespace      http://twitter.com/xulapp
// @author         xulapp
// @license        MIT License
// @version        2011/05/28 21:20 +09:00
// ==/UserScript==


(function() {
	GM_addStyle('' + <><![CDATA[
		.tooltip {
			position: absolute !important;
			max-width: 640px !important;
			padding: 4px !important;
			border: 1px solid #000000 !important;
			background-color: #ffffe1 !important;
			color: #000000 !important;
			font-size: small !important;
		}
		.tooltip dt.mes {
			margin-left: 0 !important;
			white-space: nowrap !important;
		}
		.tooltip dd.mes {
			margin-left: 2em !important;
		}
		.tooltip dd.mes:not(:last-child) {
			margin-bottom: 2em !important;
		}
	]]></>);

	document.addEventListener('mouseover', function RPU_onMouseOver(event) {
		var anchor = event.target;
		if (anchor.tagName.toLowerCase() !== 'a') return;

		var num = getRelNumber(anchor.textContent);
		if (!num) return;

		var popup = createResPopup(num);
		if (!popup) return;

		popup.addEventListener('mouseout', RPU_popup_onMouseOut, false);
		anchor.parentNode.insertBefore(popup, anchor);
		popup.style.marginTop = '-' + (popup.offsetHeight - 1) + 'px';

		anchor.addEventListener('mouseout', function RPU_anchor_onMouseOut(event) {
			this.removeEventListener('mouseout', RPU_anchor_onMouseOut, false);
			RPU_popup_onMouseOut.call(popup, event);
		}, false);
	}, true);

	function RPU_popup_onMouseOut(event) {
		var related = event.relatedTarget;
		while (related && related != this)
			related = related.parentNode;

		if (related) return;

		this.removeEventListener('mouseout', RPU_popup_onMouseOut, false);
		this.parentNode.removeChild(this);
	}
	function getRelNumber(text) {
		var a = /^>>(\d+)$/.exec(text);
		return a ? +a[1] : null;
	}
	function createResPopup(num) {
		var nobr = xpath('//nobr[dt[@class="mes" and text()="' + num + ' :"]]');
		if (!nobr) return null;

		var dt = nobr.firstChild.cloneNode(true);
		var dd = nobr.nextSibling.cloneNode(true);
		var wrapper = document.createElement('dl');
		wrapper.className = 'tooltip';
		wrapper.appendChild(dt);
		wrapper.appendChild(dd);
		return wrapper;
	}
	function xpath(exp, context) {
		return document.evaluate(exp, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
})();
