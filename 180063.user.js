// ==UserScript==
// @name lenta-comments
// @description Enable disabled comments on lenta.ru
// @namespace  thealienscripts
// @match  http://lenta.ru/*
// @include  http://google.ru/*
// ==/UserScript==
(function (window, undefined) {
	if (window.location.host != 'lenta.ru') { return; }
	
	var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        run();
        clearInterval(readyStateCheckInterval);
    }
	}, 50);

	function run () {
		var pathname = window.location.pathname;
		var isPost = /^\/(news|articles)\/\d+\/\d+\/\d+/.test(pathname);
		var isComments = /^\/comments\/(news|articles)\/\d+\/\d+\/\d+/.test(pathname);
		if (isPost) {
			var socials = $('#socials');
			if (!$('a.comments', socials).length) {
				socials.append($('<a class="comments" href="/comments'+pathname+'">Обсудить</a>'))
			}
		} else if(isComments) {
			var dis = $('.comments .disabled:first');
			if (dis.length) {
				dis.replaceWith($('<div id="hypercomments_widget">'));
				_hcwp = window._hcwp || [];
				_hcwp.push({ widget: "Stream", widget_id: 5270, xid: window.location+'', social: "vk,facebook,twitter,google,mailru,odnoklassniki,openid", comment_length: 2000, realtime: false });
				(function() {
					if("HC_LOAD_INIT" in window)return;
					HC_LOAD_INIT = true;
					var lang = 'ru';
					var hcc = document.createElement("script"); hcc.type = "text/javascript"; hcc.async = true;
					hcc.src = ("https:" == document.location.protocol ? "https" : "http")+"://w.hypercomments.com/widget/hc/5270/"+lang+"/widget.js";
					var s = document.getElementsByTagName("script")[0];
					s.parentNode.insertBefore(hcc, s.nextSibling);
				})();
			}
		}
	}
})(window);