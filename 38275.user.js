// ==UserScript==
// @name           FantLab 2 Lib.Rus.Ec
// @namespace      http://userscripts.org/users/74499
// @description	Adds lib.rus.ec link to fantlab.ru site
// @include        http://fantlab.ru/*
// ==/UserScript==

function AsUTF8(string) {
	string = string.replace(/\r\n/g,"\n");
	var utftext = "";

	for (var n = 0; n < string.length; n++) {

		var c = string.charCodeAt(n);

		if (c < 128) {
			utftext += String.fromCharCode(c);
		}
		else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		}
		else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}

	}

	return utftext;
}

	
function EncodeURL(s)
{
	var r = s.split('');

	for (var i in r)
	{
		var c = r[i].charCodeAt(0);

		if((c >= 1040 && c <= 1103) || c == 32 || (c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122)) 
			continue;
		
		r[i] = ' ';
	}
	
	return escape(AsUTF8(r.join('')));
}

function GetLibRusEcIcon()
{
	return	'data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAEgAAABIAA' + 
			'AAAAAAAAAAAABoYWGAd3WPh4abk5SgmZuhmpyknJylnZ6lnZ%2BlnZ6gmZqim52el5iVjpCCfHxtZ2eBeHaMhISgmZynoKK' +
			'up6mwp6mxqaq0rK2zqq2zrK20ra6wqaqtpKSlnZ6Wj5F3c3SNhoijnJ%2BtpqivqKq0ra%2B1rq%2Bzq6uzq6uyqqqyqqqz' + 
			'qqu2sLG1ra%2BmoKKOio9ranCXkZWqpKezrbCtpKeilpanmpmzqaisoaCwp6ewo6Kom5qxpaOooqWTj5N1dHpOUFiclZmtp' + 
			'6u0rbBaWmaMh4g%2FOj8%2FQEno5uT39vWUh4NhV1UyNDnz8%2FXBxMgjO2QMGE50bHBtZWkwM0fb1dP7%2BfgbGyLCvrrK' +
			'x8TAvr0oKS0OEBI7PkBydHgcLVoFCTAMFlhiYGheXW0bHS28tbGQjo0zO01cXmlwb3eDfX9nZWhKRkkfJCwIEDAICzQTJXc' +
			'cQbXp5uT18%2FILESEjKD%2BQlaecn7CbnauPj5l7en8%2FQUkJDxkHEUQJE0ASKIQhRbo2ZMvAurifmZZVW26AhZaAgY9l' +
			'a30uPlYdMlAOGzMGEDEGDzQRIVsOKYIhSbpDeNdFfNcODyJeZHc1O08dJj8VIDgLGjYKGFwJFU0HE0YPI2EbPJIWNpsza8t' +
			'Ig9pKf9tMhd0rMEUqPpIRHlkUHUQVIjkTJEgHFV8JGFIbOowlS6gcQKU3bMVGhdhPjN9Qi99Nht1GU34OFjUdHyfGxsawsb' +
			'EQGzsKGEUTLHwnTaYXNpozY75KhthPkN9cmuZTj%2BJSjOErQJQxMzcAAAACAgWioqIMFCgMGTgQKGMbOY0qU7JAcchJfdZ' +
			'Lgtk1XZoHDRQAAAAVJW%2FX19cAAABlZWYAAAALEykVM3IfQYcnT5UvXaIODQo1NTVSUlKpqalJSUkAAAAQH3UoKCkAAAAA' +
			'AAC3uLgaOn08ZMFFd8lCd8kVFxsPDg4XFxeBgYFaWlr6%2BvoAAAASJ3gPG1wXHTEfIigZKGIjRrIkUbgSHjUOEBY4VpgxR' +
			'XYPDw1nZ2aDg4MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAQAAKAEA' +
			'ADABAAAAAwAA';
}

function ProcessPage()
{
	var allLinks, link;

	allLinks = document.evaluate(
		'//a[@href]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
		
	for (var i = 0; i < allLinks.snapshotLength; i++) 
	{
		link = allLinks.snapshotItem(i);
		
		if (link.innerHTML == null || link.innerHTML.length == 0)
			continue;
			
		if (
			/.*work\d+$/.test(link.href))
		{
			if (link.innerHTML.indexOf("img") != -1)
				continue;
		
			var lnk = document.createElement("a");		
			lnk.href = "http://lib.rus.ec/booksearch?ask=" + EncodeURL(link.textContent);
			lnk.innerHTML = '<img src="' + GetLibRusEcIcon() + '" />';
			
			link.parentNode.insertBefore(lnk, link);
		}
	}
}

// Install it
window.addEventListener(
    "load",
	ProcessPage,
    true);
