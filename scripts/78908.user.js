// ==UserScript==
// @name           Zhurnal2Fb
// @namespace      http://userscripts.org/users/74499
// @description	   Boo
// @include        http://zhurnal.lib.ru/*/*/*.shtml
// ==/UserScript==

function utf(string) {
	// Not required for now
	return string;
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
			var title = $('center h2').text();
			var author = $('h3').text();
			
			var s = author.split(' ');
			
			return	'  <description>\n' +
					'    <title-info>\n' +
					'      <author>\n' +
					'        <first-name>' + utf(s[1]) + '</first-name>\n' +
					'        <last-name>' + utf(s[0]) + '</last-name>\n' +
					'      </author>\n' +
					'      <book-title>' + utf(title) + '</book-title>\n' +
					'      <lang>ru</lang>\n' +
					'    </title-info>\n' +
					'  </description>\n';
		}

		function convert(e) {
			if (e.is('dd')) {
				t = e.text().trim();

				if (t == '') {
					return '<empty-line/>\n';
				} else
				{
					return '<p>' + utf(t) + '</p>\n';
				}
			}
		}
	
	
		text = '<?xml version="1.0" encoding="utf-8"?>\n<FictionBook xmlns:l="http://www.w3.org/1999/xlink" 

xmlns="http://www.gribuser.ru/xml/fictionbook/2.0">';
	
		text = text + generate_description();
	
		text = text + '<body>\n';
	
		var body = $('dd').each(function() {
			var e = $(this);			
			text = text + convert(e);
		});		

		text = text + '</body></FictionBook>';
	}

	var head = $('center h2');
	
	var dn = $('<a/>')
		.attr('href', '#')
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

	dn.appendTo(head);
}

// Install it
var loadedJQ = false;

function waitJquery() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') {
		if (!loadedJQ) {
			var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');
    
			GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
			GM_JQ.type = 'text/javascript';
			GM_JQ.async = true;
    
			GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);

			loadedJQ = true;
		}

		window.setTimeout(waitJquery, 100); 
	} else 
	{
		$ = unsafeWindow.jQuery; 
		$(function() {
			processPage(); 
			});
	}
}

if (unsafeWindow.console && unsafeWindow.console.log) {
	log = unsafeWindow.console.log;
} else
{
	log = dummyLog;
}

waitJquery();
