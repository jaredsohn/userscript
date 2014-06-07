// ==UserScript==
// @name           Gmail Title Changer
// @author         Kubeł Śmieci
// @version        2.0
// @namespace      https://github.com/kubelsmieci
// @description    Modify Gmail title: Unread messages count - Folder - Gmail - ~~~~~~~~~~ Account
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @match          http://mail.google.com/*
// @match          https://mail.google.com/*
// ==/UserScript==

(function() {

	var ignoreNextChange = false;

	function changeTitle() {
		if (ignoreNextChange) {
			ignoreNextChange = false;
			return;
		}

		document.title = transformTitle(String(document.title));
	}
	
	function transformTitle(title) {
		if( !title || !title.length ) return title;
		if( title.indexOf('~~~~~~~~~~') > 0 ) return title;	// already changed
		
		var parts = title.split(' - ');
		var folderAndMaybeCount = parts[0];
		var account = parts[1];
		var gmail = parts[2];
		var folder, count;
		if( folderAndMaybeCount ) {
			parts = folderAndMaybeCount.split(' (');
			var folder = parts[0];
			if( parts[1] ) {
				count = parts[1];
				count = count.trim();
				count = count.substr(0,count.length-1);	// without last ')'
			}
		}
		parts = [];
		count && (count=count.trim()) && parts.push(count);
		folder && (folder=folder.trim()) && parts.push(folder);
		gmail && (gmail=gmail.trim()) && parts.push(gmail);
		account && (account=account.trim()) && parts.push('~~~~~~~~~~ ' + account);
		title = parts.join(' - ');
		return title;
	}

	function main() {
		var titleEl = document.getElementsByTagName("title")[0];
		var docEl = document.documentElement;
		if (docEl && docEl.addEventListener) {
			docEl.addEventListener("DOMSubtreeModified", function(evt) {
				var t = evt.target;
				if (t === titleEl || (t.parentNode && t.parentNode === titleEl)) {
					changeTitle();
				}
			}, false);
		} else {
			document.onpropertychange = function() {
				if (window.event.propertyName == "title") {
					changeTitle();
				}
			};
		}
		changeTitle();
	}

	main();

})();