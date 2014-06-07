// ==UserScript==
// @name        KeepScrollPosition
// @namespace   https://github.com/segabito/
// @description マイページでマイリストから削除したときにスクロール位置を保持するやつ
// @include     http://www.nicovideo.jp/my/mylist*
// @version     1.0.1
// @grant       none
// ==/UserScript==

// ver 1.0.1 console.log 消し忘れ

(function() {
	var monkey = (function() {

		var $ = window.jQuery, $window = $(window);

		var confirm_org = window.confirm;
		var scrollTop = null;
		window.confirm = function(msg) {
			scrollTop = null;
			if (msg !== window.messages.confirm_remove_mylist) {
				return confirm_org(msg);
			}
			var result = confirm_org(msg);
			if (result) {
				scrollTop = $window.scrollTop();
			}
			return result;
		};
		
		var remove_success = $.proxy(window.messages.remove_success, window.messages);
		window.messages.remove_success = function(params) {
			if (scrollTop !== null) {
				setTimeout(function() {
					//console.log('スクロール位置を復元: ', $window.scrollTop() , ' -> ', scrollTop)
					$window.scrollTop(scrollTop);
				}, 1000);
			}
			return remove_success(params);
		};
		
	})();

  var script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("charset", "UTF-8");
  script.appendChild(document.createTextNode("(" + monkey + ")()"));
  document.body.appendChild(script);

})();