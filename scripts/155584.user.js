// ==UserScript==
// @name       Identi ShowLinks
// @version    1.0
// @description  Identi Ads ByPass
// @namespace   http://jhonjhon123.co
// @include   htt*://*.identi.li/index.php?topic=*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require	http://www.identi.li/js/aes.js
// @author 		Jhonjhon_123
// @grant 		none
// ==/UserScript==

(function(){
	if (typeof _decrypt != "undefined") {
		$("#decrypt").remove();
		var _fregfrgrt = $("#hide").find("#hide");
		var _t549ynm6hv = Aes.Ctr.decrypt(_fregfrgrt.html(), _decrypt.hash, 256);
		_t549ynm6hv = _t549ynm6hv.replace(/&nbsp;/g, ' ');
		_t549ynm6hv = linkify(_t549ynm6hv);
		_fregfrgrt.html(_t549ynm6hv);
		_fregfrgrt.attr('style', '');
	}
})();