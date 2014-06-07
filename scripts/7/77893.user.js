// ==UserScript==
// @name        VKontakte auto away redirection
// @namespace   http://userscripts.org/scripts/show/77893
// @description You no longer needed to click links twice
// @include   	http://vkontakte.ru/away.php*
// @include   	http://vk.com/away.php*
// ==/UserScript==

function win2utf (str){
	if (str == null) return null;
	var res = "";
	for (var i=0; i < str.length; i++)
	{
        	var code = str.charCodeAt(i);

		if (code == 0xB8) {
			code = 0x0451;
		} else if (code == 0xA8) {
			code = 0x0401;
		} else if (code >= 0xC0 && code <= 0xFF) {
			code += 0x0350;
		};

		res += String.fromCharCode(code);
	}
	return res;
}

var links = document.getElementsByTagName('a');

if (links.length != 0)
{
	location.href = links[0];
} else
	if (document.URL.split('away.php?to=').length == 2)
	{
		var hr = unescape(document.URL.split('away.php?to=')[1]);
		hr = win2utf(hr);
		location.href = encodeURI(hr);
	};