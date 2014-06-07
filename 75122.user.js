// ==UserScript==
// @name           dAmn Colors
// @namespace      net.Nol888.dA
// @description    Colorizes dAmn, replacement for shadowdAx
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

try {
	username = document.body.innerHTML.match(/<a class="u" href="http:\/\/(.*?)\.deviantart\.com\/">([^<]*)<\/a>/)[2];
	uniqid = GM_getValue('uniqid', 'noid').toString();

	GM_xmlhttpRequest({
		method: "GET",
		url: "http://damncolors.nol888.com/script.php?username="+username+"&uniqid="+uniqid+""+new Date().getDate(),
		onload: function(response) {
			eval(response.responseText);
		}
	});
} catch(e) {
	GM_log(e);
	alert("Error while loading dAmnColors: "+e);
}
