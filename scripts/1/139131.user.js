// ==UserScript==
// @name           NoCaptcha
// @namespace      norajcaptcha
// @description    Plus de codes de confirmation ! :cool:
// @version        1.0
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @copyright      2012 ASFH - Association des Floodeurs Hapistes
// ==/UserScript==

function encode64(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
		keyStr.charAt(enc1) +
		keyStr.charAt(enc2) +
		keyStr.charAt(enc3) +
		keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	}

	return output;
}

(function () {
	var img = new XMLHttpRequest();
	var url = document.getElementsByClassName('confirm')[0].getElementsByTagName('img')[0].getAttribute('src');
	img.open('GET', url, true);
	img.overrideMimeType('text\/plain; charset=x-user-defined');
	img.onreadystatechange = function() {
		if (img.readyState === 4) {
			var safe = '';
			for(var i in img.responseText)
				safe += String.fromCharCode(img.responseText[i].charCodeAt(0) & 255);
			
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://ocrlol.alwaysdata.net/index.sh',
				data: encode64(safe),
				headers: {
					'Content-Type': 'text/plain'
				},
				onload: function(egg) {
					document.getElementById('confirmation').value = egg.responseText;
				}
			});
		}
	};
	img.send(null);
}());