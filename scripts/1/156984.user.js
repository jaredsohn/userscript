// ==UserScript==
// @name           Youtube Auto Proxy Player (uses Opensurf.info)
// @description    When you receive the "is not available in your country" message on Youtube, this script automatically loads a player from a proxy.
//
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        http://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// ==/UserScript==
var not_avail_warning = document.getElementById("unavailable-message");
var content_container = document.getElementById("body-container");
var element = document.getElementById("watch7-playlist-container");
element.innerHTML = "";

// Source Code is from (https://userscripts.org/scripts/show/98840)
if(not_avail_warning != null) {
    not_avail_warning.innerHTML = "<small><br>Please wait a few seconds while the proxy player loads :)</small>";
	GM_xmlhttpRequest({
		method: 'POST',
		url: 'http://opensurf.info/proxy/includes/process.php?action=update',
		data: 'u=' + encodeURIComponent(window.location.href),
		headers: {
			'User-agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0',
			'Accept': 'application/xml,text/xml',
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(responseDetails) {
      		
			var res = responseDetails.responseText;
            var p_content = res.match(/<div id="body-container">([\S\s]*)<\/body><\/html>/m);
            p_content = p_content[0].replace(/((href|src)=")\//g, "$1"+"http://opensurf.info/");
            content_container.innerHTML = p_content;

		}
	});
}
