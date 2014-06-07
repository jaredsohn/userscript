// ==UserScript==
// @name           Twitter Text for Typograffit
// @namespace      http://d.hatena.ne.jp/jazzanova/
// @include        http://twitter.com/
// @include        http://twitter.com/home*
// @include        http://twitter.com/replies
// @include        https://twitter.com/
// @include        https://twitter.com/home*
// @include        https://twitter.com/replies
// ==/UserScript==

(function() {
    var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
    var submit = w.document.getElementById('update-submit');
    var status = document.getElementById('status');
    var form = document.getElementById('status_update_form');

    var typograffit = function(callback) {
	GM_xmlhttpRequest({
	    method : "GET",
	    url : "http://typograffit.com/rest_json/posts/generate/body:" + status.value,
	    onload : function(response) {
		var res = eval("(" + response.responseText + ")");
		var image_url = "http://typograffit.com/posts/compose/" + res.post_id;
		status.value = image_url;
		callback();
	    }
	});
    };

    submit.addEventListener('click', function(e) {
	typograffit(function() {
	    var evt = document.createEvent('HTMLEvents');
	    evt.initEvent('submit', true, true);
	    evt.element = function (){ return evt.target; };
	    form.dispatchEvent(evt);
	});
	e.preventDefault();
    }, false);
})();