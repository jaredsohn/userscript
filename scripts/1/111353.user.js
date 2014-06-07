// ==UserScript==
// @name				Shadow Tools v.01
// @namespace		http://therealmsbeyond.com/koc/
// @description	One Ring to Rule them All
// @include			http://*.kingdomsofcamelot.com/fb/e2/src/main_src.php*
// @require			jquery-1.6.4.js
// @require			json.js
// ==/UserScript==

if(document.location.toString().match('src/main_src.php')){
	function custom_setValue(k, v) {
		GM_setValue(k, v);
	}
	function custom_getValue(k, dv) {
		return (GM_getValue(k, dv));
	}
	function custom_deleteValue(k) {
		GM_deleteValue(k);
	}
	function getSavedInfo() {
		return (custom_getValue('ajaxparams', null));
	}
	function getSavedServerId() {
		return (custom_getValue('sid'));
	}
	function getSavedCityId(sid) {
		var k = sid + '_cities';
		var saved = custom_getValue(k, null);
		return (saved.split(','));
	}
	function send() {
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://therealmsbeyond.com/koc/index.php",
			data: "username=johndoe&password=xyz123",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				if (response.responseText.indexOf("Logged in as") > -1) {
					location.href = "http://www.example.net/dashboard";
				}
			}
		});
	}
	document.write(getSavedInfo());
}