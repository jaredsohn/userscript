// ==UserScript==
// @name			Google Reader next/prev unread subscription kb shortcut
// @sourcescript	http://userscripts.org/scripts/review/114745
// @include			http*://www.google.*/reader/*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @downloadURL		https://userscripts.org/scripts/source/127330.user.js
// @version			1.0
// ==/UserScript==

jQuery.noConflict();

(function() {
	var shiftN = document.createEvent('KeyEvents');
	shiftN.initKeyEvent('keypress', true, true, null, false, false, true, false, 78, 0);
	var shiftP = document.createEvent('KeyEvents');
	shiftP.initKeyEvent('keypress', true, true, null, false, false, true, false, 80, 0);
	var regex = /unread/;

	function walk(x) {
	    for (;;) {
	    	document.dispatchEvent(x);
		    if (jQuery('#sub-tree-item-0-main').find('a.cursor').parent().is('.unread')) return;
	    }
	}

	function nextUntilUnread(elm) {
		elm = elm.nextSibling;
		while (elm) {
			if (elm.nodeType == 1 && elm.className.search(regex) != -1) {
				return true;
			}
			elm = elm.nextSibling;
		}
		return false;
	}

	function prevUntilUnread(elm) {
		elm = elm.previousSibling;
		while (elm) {
			if (elm.nodeType == 1 && elm.className.search(regex) != -1) {
				return true;
			}
			elm = elm.previousSibling;
		}
		return false;
	}

	function goNext() {
		if (!jQuery('#reading-list-unread-count:not(.hidden)').text()) return;
		var item = jQuery('#sub-tree-item-0-main').find('a.cursor');
		if (!item.length) {
			item = jQuery('#sub-tree-item-0-main').find('a.tree-link-selected');
		}

		if (!item.length) {
			walk(shiftN);
		}
		else {
			var itemParent = item.parent();
			if (itemParent.is('.folder.expanded')) {	// item is an expanded folder
				if (itemParent.is('.unread') || nextUntilUnread(itemParent[0])) {
					walk(shiftN);
				}
			} else if (itemParent.is('.folder.collapsed') || itemParent.parent().parent().is('#sub-tree-item-0-main')) {	// item is a collapsed folder or an item that's not in a folder
				if (nextUntilUnread(itemParent[0])) {
					walk(shiftN);
				}
			} else {	// item is in folder
				if (nextUntilUnread(itemParent[0]) || nextUntilUnread(itemParent.parent().parent()[0])) {
					walk(shiftN);
				}
			}

		}
	}

	function goPrev() {
		if (!jQuery('#reading-list-unread-count:not(.hidden)').text()) return;
		var item = jQuery('#sub-tree-item-0-main').find('a.cursor');
		if (!item.length) {
			item = jQuery('#sub-tree-item-0-main').find('a.tree-link-selected');
			if (!item.length) return;
		}

		var itemParent = item.parent();
		var itemP3x = itemParent.parent().parent();

		if (itemP3x.parent().parent().is('#sub-tree-item-0-main')) {		// item is in folder
			if (itemP3x.is('.unread') || prevUntilUnread(itemP3x[0])) {
				walk(shiftP);
			}
		} else {
			if (prevUntilUnread(itemParent[0])) {
				walk(shiftP);
			}
		}
	}

	jQuery(document).keydown(function (e) {
		element = e.target;
		if (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;//if cursor on a textarea or input, disable hotkey
		tecla = String.fromCharCode(e.which).toLowerCase();
		if (tecla == "n" && e.altKey && e.shiftKey) { goNext(); }
		else if (tecla == "p" && e.altKey && e.shiftKey) { goPrev(); }
	});

})();
