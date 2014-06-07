// ==UserScript==
// @name LinkMe script
// @namespace http://poradnik-webmastera.com/projekty/linkme_script/
// @description LinkMe helper script
// @include http://www.linkme.pl/*
// @author Daniel Fruzynski
// @version 0.0.2
// ==/UserScript==

var loc = window.location.href;
if (loc.match(/http:\/\/(www\.)?linkme\.pl\/panel-(links|sites)\d?(-\d+)?\.html/g))
{
	// strona z lista stron lub linkow - wyciag url strony lub anchor linku z title i wyswietl go
	var allElements, thisElement;
	allElements = document.evaluate(
		'//div[@class=\'prawe\']/table//a[@title]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allElements.snapshotLength; i++)
	{
		thisElement = allElements.snapshotItem(i);
		
		var brElement = document.createElement('br');
		thisElement.parentNode.insertBefore(brElement, thisElement.nextSibling);

		var spanElement = document.createElement('span');
		spanElement.textContent = ' ' + thisElement.title;
		brElement.parentNode.insertBefore(spanElement, brElement.nextSibling);
	}
}
else if (loc.match(/http:\/\/(www\.)?linkme\.pl\/panel-backword-links-\d+-\d+.html/g))
{
	// strona z lista linkujacych stron - sprawdzaczka linkow
	var allElements = null;
	var allElementsIndex = null;
	var destUrl;
	
	// wysylanie requesta i analiza wynikow
	var process_url = function(url, response)
	{
		var send_request = function(u)
		{
			GM_xmlhttpRequest({
				method: 'GET',
				url: u,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/html,text/plain,*/*',
					'Referer': 'http://ebooki.dexi.pl/',
					},
				onload: function(response) { process_url(u, response); },
				onerror: function(response) { process_url(u, response); }
			});
		}

		// przyszla odpowiedz
		if (response)
		{
			// sprawdz status strony
			var ok = true;
			var msg = 'OK';
			
			if (response.status == 200)
			{
				// sprawdz czy link jest na stronie i wyciagnij anchor
				var u = destUrl;
				u = "href=\"" + u + "\"";
				u = u.replace(/\./g, "\\.").replace(/\//g, "\\/");
				var sRx = u + "[^>]*>((?:<[^>]+>)?[^<]+(?:<\/[^>]+>)?)<\/a>";
				//alert(sRx);
				var rx = new RegExp(sRx);
				var r = response.responseText.match(rx);
				if (!r)
				{
					ok = false;
					msg = "Brak linku na stronie";
				}
				else
				{
					msg = r[1];
					
					// wyciagnij kodowanie ze strony
					sRx = "content\s*=\s*['\"]?text\/html\s*;\s*charset\s*=\s*([a-z0-9\-]+)";
					rx = new RegExp(sRx);
					r = response.responseText.match(rx, 'i');
					if (r)
					{
						msg += '; ' + r[1];
					}
				}
			}
			else
			{
				ok = false;
				msg = "Blad HTTP: " + response.status + " " + response.statusText;
			}
			
			// znajdz element do uaktualnienia
			var aElements = document.evaluate(
				'//div[@class=\'prawe\']/table//tr/td[2]/a[@href=\"' + url + '\"]',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);
			
			var aElement = aElements.snapshotItem(i);
			
			if (aElement)
			{
				// wyswietl status
				aElement.style.fontStyle = "normal";
				aElement.style.color = ok ? "green" : "red";
				
				var brElement = document.createElement('br');
				aElement.parentNode.insertBefore(brElement, aElement.nextSibling);
				
				var aElement = document.createElement(ok ? 'a' : 'span');
				aElement.textContent = msg;
				if (ok)
				{
					aElement.href = 'http://www.google.pl/search?hl=pl&q=' + encodeURIComponent(msg);
					aElement.target = '_blank';
				}
				brElement.parentNode.insertBefore(aElement, brElement.nextSibling);
			}
		}
		
		// wyslij zadanie
		if (allElementsIndex < allElements.snapshotLength)
		{
			for (n = 0; (n < 5) && (allElementsIndex < allElements.snapshotLength); ++n, ++allElementsIndex)
			{
				thisElement = allElements.snapshotItem(allElementsIndex);
				var u = thisElement.href;
				
				thisElement.style.color = "blue";
				thisElement.style.fontStyle = "italic";
				
				send_request(u);
			}
		}
	}
	
	// funkcja uruchamiajaca sprawdzanie (podpieta do menu)
	var check_fun = function()
	{
		if (!allElements)
		{
			allElements = document.evaluate(
				'//div[@class=\'prawe\']/table//tr/td[2]/a',
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

			allElementsIndex = 0;
		}
		process_url(null, null);
	};
	
	// inicjalizacja
	
	// sprawdz dostepnosc potrzebnych funkcji
	if (!GM_xmlhttpRequest)
	{
		alert('Zainstaluj najnowsza wersje Greasemonkey (brak funkcji GM_xmlhttpRequest)');
	}
	else
	{
		// odczytaj url linkowanej strony
		var h1Elements, h1Element;
		h1Elements = document.evaluate(
			'//div[@class=\'prawe\']/h1[1]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		h1Element = h1Elements.snapshotItem(i);
		destUrl = h1Element.textContent;
		destUrl = destUrl.match(/:\s+(.+)/)[1];
		destUrl = "http://" + destUrl;
		
		// dodat atrybut target="_blank" do formularza abuse
		var formElements, formElement;
		h1Elements = document.evaluate(
			'//div[@class=\'prawe\']//form[@name="not"]',
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		
		formElement = h1Elements.snapshotItem(i);
		formElement.target = "_blank";
		
		// Dodaj przycisk do formularza
		var buttonElement = document.createElement('button');
		buttonElement.textContent = "Sprawdz linki";
		buttonElement.style.marginBottom = "5px";
		buttonElement.addEventListener('click', check_fun, true);
		h1Element.parentNode.insertBefore(buttonElement, h1Element.nextSibling);
	}
}
