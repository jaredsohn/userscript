// ==UserScript==
// @name		Anti Google Tracking
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.0.3
// @description		Googleの検索結果ページでリダイレクトのリンクではなく本来のURIをコピーできます。 / You can copy not the redirecting links but original URIs in Google search results.
// @include		http://www.google.*
// ==/UserScript==

/* ****************************************************************

	Related Article:
		http://jankokutou.blog133.fc2.com/blog-entry-16.html

	Last Update:
		2010-12-19

	* Google-supported domains are based on "Google Supported Domains".
		http://www.google.com/supported_domains

**************************************************************** */

(function () {

var removeTracking, fake;
var insert_event_type, function_type;

if ((unsafeWindow.clk || unsafeWindow.rwt) && /^www\.google\.(?:co\.(?:ao|bw|ck|cr|id|il|in|jp|ke|kr|ls|ma|mz|nz|th|tz|ug|uk|uz|ve|vi|za|zm|zw)|com(?:\.(?:af|ag|ai|ar|au|bd|bh|bn|bo|br|by|bz|co|cu|do|ec|eg|et|fj|gh|gi|gt|hk|jm|kh|kw|lb|ly|mt|mx|my|na|nf|ng|ni|np|om|pa|pe|ph|pk|pr|py|qa|sa|sb|sg|sl|sv|tj|tr|tw|ua|uy|vc|vn))?|it\.ao|cat|ad|ae|am|as|at|az|ba|be|bf|bg|bi|bj|bs|by|ca|cd|cf|cg|ch|ci|cl|cm|cn|cz|de|dj|dk|dm|dz|ee|es|fi|fm|fr|ga|ge|gg|gl|gm|gp|gr|gy|hn|hr|ht|hu|ie|im|is|it|je|jo|kg|ki|kz|la|li|lk|lt|lu|lv|md|me|mg|mk|ml|mn|ms|mu|mv|mw|ne|nl|no|nr|nu|pl|pn|ps|pt|ro|rs|ru|rw|sc|se|sh|si|sk|sm|sn|st|td|tg|tk|tl|tm|to|tt|vg|vu|ws)$/.test(location.hostname)) {
	insert_event_type = "DOMNodeInserted";
	function_type = typeof Function();
	fake = eval("(function () {return true;})", unsafeWindow);
	removeTracking = function (event) {
			if (event && event.type != insert_event_type) {
				window.removeEventListener(event.type, removeTracking, false);
			}
			if (unsafeWindow.rwt && typeof unsafeWindow.rwt == function_type) {
				unsafeWindow.rwt = fake;
			}
			if (unsafeWindow.clk && typeof unsafeWindow.clk == function_type) {
				unsafeWindow.clk = fake;
			}
		};
	removeTracking();
	window.addEventListener("DOMContentLoaded", removeTracking, false);
	window.addEventListener(insert_event_type, removeTracking, false);
	window.addEventListener("load", removeTracking, false);
}

})();