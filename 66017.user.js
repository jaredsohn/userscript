// ==UserScript==
// @name           Rapidshare Auto Pick Premium
// @namespace      RS Auto Premium
// @include        http://*rapidshare.com/*
// @include        http://www.rapidshare.com/*
// @exclude        http://rapidshare.com/
// @exclude        http://www.rapidshare.com/
// ==/UserScript==
/*
function contentEval(source) {
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
var a_iv = setInterval(a, 2000);
var b = true;
function a() {
	clearInterval(a_iv);
	if (b) {
		b = false;
		contentEval("RSPage[\"CDownloadPage\"].vxChangeSSL($(\"js_ssldownload\").checked");
	}
}
*/
var a_iv = setInterval(f, 2000);
var b = true;
function f() {
	var a = document.getElementById("js_prem_downloadlink");
	clearInterval(a_iv);
	if (b) {
		b = false;
		window.location.href = a.href;
	}
}