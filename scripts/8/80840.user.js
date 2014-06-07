// ==UserScript==
// @name           Wrzuta downloader
// @namespace      http://jaro.cba.pl
// @description    Pobieranie z wrzuty.
// @include        http://*.wrzuta.pl/*
// @include        http://wrzuta.pl/*
// ==/UserScript==

function downloadLink() {
	if (typeof unsafeWindow.flashvars=="undefined") {
		return;
	}
	var fv = unsafeWindow.flashvars;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+fv.login+'.'+fv.host+'/xml/plik/'+fv.key+'/'+fv.site+'/undefined/225500',
		onload: function(response) {
			var place = document.getElementById('file_info').getElementsByTagName('h2')[0];
			var newA = document.createElement('a');
			newA.style.color = '#ED0080';
			newA.textContent = ' (DOWNLOAD)';
			place.appendChild(newA);
			var matches = response.responseText.match(/<storeIds>\s*<fileId>\s*<!\[CDATA\[(\S+)\]\]>\s*<\/fileId>\s*<\/storeIds>/m)[1];
			//alert(matchess);
			newA.href = matches;
		}
	});
}

if (window.addEventListener) {
	window.addEventListener('load', downloadLink, false);
} else {
	window.attachEvent('onload', downloadLink);
}
