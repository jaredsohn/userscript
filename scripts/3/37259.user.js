// ==UserScript==
// @name           Am I Running Liferay?
// @namespace      http://userscripts.org/users/23423423
// @include        *
// ==/UserScript==

var createBanner = function () {
	var body = document.body;

	var banner = document.body.innerHTML += '<div style="position: fixed; top: 0; width: 100%; background: #ffc; opacity: 0.9;border-bottom: 1px solid #FFCC00; padding: 10px; font-weight: bold; z-index: 1000000">This website is running Liferay! <a href="javascript: ;" id="amILiferayHide">Hide</a> - <a href="javascript: ;" id="amILiferayDiscard">Stop showing for this domain</a></div>';
}

var cookie = document.cookie;

if (cookie.indexOf('amiliferay_greasemonkey=dontshow') == -1) {
	if (unsafeWindow.Liferay) {
		createBanner();
	}
	else {
		GM_xmlhttpRequest({
		  method:"GET",
		  url: thisPage,
		  onload:function(details) {
			var headers = details.responseHeaders;
			var isLiferay = (headers.toLowerCase().indexOf('liferay') > -1);

			if (isLiferay) {
				createBanner();
			}
		  }
		});
	}

	var hideMessage = function(el) {
		unsafeWindow.console.log(el);
		el.parentNode.removeChild(el);
	};

	// var console = unsafeWindow.console;
	document.getElementById('amILiferayHide').addEventListener('click', function(event) {
		hideMessage(this.parentNode);
	}, false)

	document.getElementById('amILiferayDiscard').addEventListener('click', function() {

		var container = this.parentNode;
		container.innerHTML = 'This website will no longer notify you (at least until you clear your cookies!)';
		container.style.backgroundColor = '#F4FDEF';
		container.style.borderColor = '#ACDFA7';
		container.style.color = '#384F34';
		container.style.opacity = 1;

		var name = 'amiliferay_greasemonkey';
		var value = 'dontshow';
		var expires = (365 * 24 * 60 * 60 * 1000);

		var date = new Date();
	    date.setTime(date.getTime() + expires);

		expires = '; expires=' + date.toGMTString();

		var path = '';
		var domain = '';
		var secure = '';

		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');

		setTimeout(
			function() {
				hideMessage(container);
			}, 5000);
	}, false);
}