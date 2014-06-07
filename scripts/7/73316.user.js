// ==UserScript==
// @name           Book Dumper
// @namespace      http://userscripts.org/users/74499
// @description	   Boo
// @include        http://lib.rus.ec/b/*/read
// ==/UserScript==

function utf(string) {
	return string;

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

function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function dummyLog(p)
{
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

function processPage()
{
	var text = '';

	function generate() {
		function generate_description() {
			var title = $('a[href^=/b/]:first').text();
			var author = $('a[href^=/b/]:first ~ a[href^=/a/]:first').text();
			
			var s = author.split(' ');
			
			return	'  <description>\n' +
					'    <title-info>\n' +
					'      <author>\n' +
					'        <first-name>' + utf(s[0]) + '</first-name>\n' +
					'        <last-name>' + utf(s[s.length - 1]) + '</last-name>\n' +
					'      </author>\n' +
					'      <book-title>' + utf(title) + '</book-title>\n' +
					'      <lang>ru</lang>\n' +
					'    </title-info>\n' +
					'  </description>\n';
		}
	
		function convert_bulk(e, tag) {
			var t = '<' + tag + '>\n';
			
			$(e).children().each(function() {
				var j = $(this);
				t = t + convert(j);
			});
			
			return t + '</' + tag + '>\n';		
		}
		
		function convert(e) {
			if (e.is('br')) {
				return '<empty-line />\n';
			} else
			if (e.is('h3.book')) {
				return convert_bulk(e, 'title');
			} else
			if (e.is('h5.book')) {
				return '<subtitle>' + utf(e.text()) + '</subtitle>\n';
			} else			
			if (e.is('blockquote.epigraph')) {
				return convert_bulk(e, 'epigraph');
			} else
			if (e.is('blockquote.book') && e.children('i').length > 0) {
				return '<text-author>' + utf(e.text()) + '</text-author>\n';
			} else
			if (e.is('blockquote.book') && e.children('i').length == 0) {
				return convert_bulk(e, 'cite');
			} else			
			if (e.is('p.book')) {
				var t = e.text();
				
				if (t != '')
					return '<p>' + utf(t) + '</p>\n';
			}
			
			return '';
		}
	
		text = '<?xml version="1.0" encoding="utf-8"?>\n<FictionBook xmlns:l="http://www.w3.org/1999/xlink" xmlns="http://www.gribuser.ru/xml/fictionbook/2.0">';
	
		text = text + generate_description();
	
		text = text + '<body>\n';
	
		var gotHead = false;
	
		var body = $('div#main').children().each(function() {
			var e = $(this);
			
			if (!gotHead) {
				if (!e.is('.book'))
					return;
					
				gotHead = true;
			}

			text = text + convert(e);
		});
		
		text = text + '</body></FictionBook>';
	}
	
	var dn = $('a[href$=/download]')
		.click(function() {
			if (text == '')
			{
				generate();
				dn.attr('href', 'data:text/plain,'+encodeURIComponent(text));
			}
		});
	
	$('<img>')
		.attr('src', GetLibRusEcIcon())
		.appendTo(dn);
}

// Install it
function waitJquery() 
{
    if(typeof unsafeWindow.jQuery == 'undefined') 
	{
		window.setTimeout(waitJquery, 100); 
	} else 
	{
		$ = unsafeWindow.jQuery; 
		$(function() {
			processPage(); 
			});
	}
}

if (unsafeWindow.console) {
	log = unsafeWindow.console.log;
} else
{
	log = dummyLog;
}

waitJquery();
