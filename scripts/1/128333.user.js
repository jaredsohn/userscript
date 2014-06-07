// ==UserScript==
// @name           HTMLダイアログ無効化
// @version        2.0.0
// @namespace      http://userscripts.org/users/347021
// @id             block-new-window-347021
// @description    JavaScriptによるリンクを新しいウィンドウではなく新しいタブで開く / Always opens JavaScript links in new tab in current window instead of new window
// @include        *
// @grant          unsafeWindow
// @grant          GM_info
// @run-at         document-start
// @updateURL      https://userscripts.org/scripts/source/128333.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function(){
'use strict';

if (typeof GM_deleteValue === 'undefined') {
	// Google Chromeの拡張機能としてインストールされていた場合
	if (!('securityPolicy' in document) || document.securityPolicy.allowsInlineScript) {
		// インラインスクリプトが許可されているかどうかわからない場合、またはインラインスクリプトが許可されている場合
		new MutationObserver(function (mutations, observer) {
			var head = mutations[0].addedNodes[0], script;
			if (head.localName === 'head') {
				observer.disconnect();
				script = document.createElement('script');
				script.text = 'javascript:(' + main.toString() + ')(Window);';
				head.appendChild(script);
			}
		}).observe(document, {
			childList: true,
			subtree: true,
		});
	}
} else {
	main(unsafeWindow.Window);
}

function main(WindowInterface) {
	var WindowPrototype = WindowInterface.prototype, _open = WindowPrototype.open;

	WindowPrototype.open = function () {
		delete arguments[2];
		return _open.apply(this, arguments);
	};

	WindowPrototype.showModalDialog = function (url) {
		var newTab = _open.call(this, url);
		newTab.dialogArguments = arguments[1];
	};
}

})();
