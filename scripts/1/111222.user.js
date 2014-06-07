// ==UserScript==
// @name           Dealsucker Concatenation Script
// @namespace      kryptonite
// @description    Concatenates Dealsucker's page to be all on one page
// @version        1.0
// @include        http://www.dealsucker.com/
// ==/UserScript==

(function() {
var scriptNumber = 111222;

function main($) {
	var max = 0, $pages = $('a').filter(function() {
			return /^\d*$/.test(this.innerHTML) && (max < this.innerHTML && (max = this.innerHTML))
		}), pathToBr = 'body > center > div > table > tbody > tr > td > div > br';

	(function addNextPage() {
		if (!$pages.length) return $('table[width=775]').remove();
		$.ajax($pages[0].href, {success: function(data) {
			var $data = $(data);

			$data.find('[id=tit]').first().nextUntil('div').last().nextUntil('table')
				.insertAfter( $('#tit').nextUntil('div').last().nextUntil('table').last() );

			$pages = $pages.eq(0).remove().end().slice(1);
			addNextPage();
		}});
	})();
}

(function() {
	var head = document.getElementsByTagName('head')[0] || document.documentElement,
			scriptJQ = document.createElement('script'), scriptInject = document.createElement('script');

	if (window.top != window.self) return;
	if (typeof unsafeWindow === "undefined")  return window.jQuery ? main(window.jQuery) : jQueryWait(); // injected iteration
	else if (typeof unsafeWindow.jQuery === 'undefined') {
		scriptJQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js?';
		scriptJQ.type = 'text/javascript';
		head.appendChild(scriptJQ);
	}
	scriptInject.src = 'http://userscripts.org/scripts/source/' + scriptNumber + '.user.js?' + (new Date()).getTime();
	scriptInject.type = 'text/javascript';
	head.appendChild(scriptInject);
})();

function jQueryWait() {
	if (!window.jQuery)
		setTimeout(jQueryWait, 13)
	else
		main(window.jQuery);
}

})();
