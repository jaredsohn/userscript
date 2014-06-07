// ==UserScript==
// @name           TwitterRTonNonEN
// @namespace      http://kataho.net/
// @description    Enables Retweet (official) on non-English configurations.
// @include        http://twitter.com/*
// ==/UserScript==

(function () {
	var addRetweetButton = function(root) {
		var uls = root.getElementsByTagName('ul');
		for (var i = 0; i < uls.length; ++i) {
			var ul = uls[i];
			if (ul['changed']) {
				continue;
			}
			if (ul.className.indexOf('actions-hover') < 0) {
				continue;
			}
			if (ul.getElementsByClassName('retweet-link').length > 0) {
				continue;
			}
			if (ul.parentNode.getElementsByClassName('lock-icon').length > 0) {
				continue;
			}
			var li = document.createElement('li');
			li.className = 'retweet-link';
			var outerSpan = document.createElement('span');
			outerSpan.className = 'retweet-link';
			var iconSpan = document.createElement('span');
			iconSpan.className = 'retweet-icon icon';
			var a = document.createElement('a');
			a.herf = '#';
			a.title = 'Retweet';
			a.appendChild(document.createTextNode('Retweet'));
			outerSpan.appendChild(iconSpan);
			outerSpan.appendChild(a);
			li.appendChild(outerSpan);
			ul.appendChild(li);
			ul['changed'] = true;
		}
	};

	var addRetweetButtonOnNodeInsertion = function(event) {
		addRetweetButton(event.target);
	};

	addRetweetButton(document);
	document.addEventListener('DOMNodeInserted', addRetweetButtonOnNodeInsertion, false);
})();
