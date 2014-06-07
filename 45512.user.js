// ==UserScript==
// @name           Badisch
// @namespace      Lucas
// @description    Badisch fürs SVZ
// @include        *schuelervz.net/*
// ==/UserScript==
///////////////////////////////////
//erstellt von Crixu
//TGI Rules
//Gaggenau for Ever
//falls jemand sagt das wäre sein Script:
//Den script habe ich persönlich geschrieben, bzw. aus einer Hilfhomepage rauskopiert.
///////////////////////////////////
function main()
{
	
	

	setText('//ul[@id="Grid-Navigation-Main"]/li[1]/a', 'Mei Startseit');
	setText('//ul[@id="Grid-Navigation-Main"]/li[2]/a', 'Mei Seit');
	setText('//ul[@id="Grid-Navigation-Main"]/li[3]/a', 'Meine Kumpels');
	setText('//ul[@id="Grid-Navigation-Main"]/li[4]/a', 'Fotos');
	setText('//ul[@id="Grid-Navigation-Main"]/li[5]/a', 'Meine Gruppe');
	setText('//ul[@id="Grid-Navigation-Main"]/li[6]/a', 'Mei Nachrichte');
	setText('//ul[@id="Grid-Navigation-Main"]/li[7]/a', 'Mei Date');
	setText('//ul[@id="Grid-Navigation-Main"]/li[8]/a', 'Mei Bereich');
	
	setText('//div[@id="Grid-Page-Center-Footer"]/ul/li[1]/a', 'Fürd Schüla');
	setText('//div[@id="Grid-Page-Center-Footer"]/ul/li[2]/a', 'Fürd Eltern');
	setText('//div[@id="Grid-Page-Center-Footer"]/ul/li[3]/a', 'Fürd Press');
	setText('//div[@id="Grid-Page-Center-Footer"]/ul/li[4]/a', 'MASSIV');
	
	setText('//div[@id="Grid-Page-Center-Top-Navigation"]/ul/li[1]/a', 'Leut suche');
	setText('//div[@id="Grid-Page-Center-Top-Navigation"]/ul/li[2]/a', 'Klortext');	
	setText('//div[@id="Grid-Page-Center-Top-Navigation"]/ul/li[3]/a', 'Leut eilade');
	setText('//div[@id="Grid-Page-Center-Top-Navigation"]/ul/li[4]/a', 'oins,oins,null');
	setText('//div[@id="Grid-Page-Center-Top-Navigation"]/ul/li[5]/a', 'Bis dann');


	setValue('//input[@id="searchfieldAutosuggest"]', 'Such jemand');
	
	
	var replacements = new Array();
	
	var item = new Object();
	item.search = 'Freundes';
	item.replacement = 'Kumpels';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Alle sehen';
	item.replacement = 'zeigs ma alle';
	replacements.push(item);


	var item = new Object();
	item.search = 'verlinkt';
	item.replacement = 'druf';
	replacements.push(item);

	var item = new Object();
	item.search = 'Freunde';
	item.replacement = 'Kumpels';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Freund';
	item.replacement = 'Kumpel';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Meine Fotos';
	item.replacement = 'Mei Fotos';
	replacements.push(item);

	var item = new Object();
	item.search = 'Alle anzeigen';
	item.replacement = 'zeig ma alles';
	replacements.push(item);


	var item = new Object();
	item.search = 'Das bist du';
	item.replacement = 'Erkenns dich selba net';
	replacements.push(item);

	var item = new Object();
	item.search = 'Schulen';
	item.replacement = 'Schule';
	replacements.push(item);

	var item = new Object();
	item.search = 'gleiche Schule';
	item.replacement = 'gleich Schul';
	replacements.push(item);

	var item = new Object();
	item.search = 'Ich bin gerade ... ';
	item.replacement = 'Des mach ich grad';
	replacements.push(item);

	var item = new Object();
	item.search = '[Nachricht schicken]';
	item.replacement = '[Dem was soge]';
	replacements.push(item);

	var item = new Object();
	item.search = 'zeigen';
	item.replacement = 'zeige';
	replacements.push(item);

	var item = new Object();
	item.search = 'Gruppen';
	item.replacement = 'Gruppe';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Gruppe';
	item.replacement = 'Gruppe';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Plaudern';
	item.replacement = 'Plapern';
	replacements.push(item);

	var item = new Object();
	item.search = 'Plauderkasten';
	item.replacement = 'Plaperkasten';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Gruscheln';
	item.replacement = 'Gruschln';
	replacements.push(item);

	var item = new Object();
	item.search = 'ausblenden';
	item.replacement = 'hau weg';
	replacements.push(item);

	var item = new Object();
	item.search = 'Meine Fotoalben';
	item.replacement = 'Mei Fotos';
	replacements.push(item);
	
	var item = new Object();
	item.search = 'Meine Verlinkungen';
	item.replacement = 'Da bin ich druf';
	replacements.push(item);

	var item = new Object();
	item.search = 'Fotoalben meiner Kumpels';
	item.replacement = 'Fotos von Kumpels';
	replacements.push(item);

	var item = new Object();
	item.search = 'Neues Album';
	item.replacement = 'Neue Fotos nei stelle';
	replacements.push(item);




	multiReplaceInEl('//div[@id="Grid-Page-Center"]', replacements);
	
	
	setText('//a[@id="Chat_Box_Link"]', 'Plaperkasten');
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Start', 'i')))
	{
		
		document.title = 'schuelerVZ | Mei Startseit';
		
		
		setText('//div[@id="pvzWebSlice"]//div[@class="teaserbox"]//div[@class="text"]/p', 'Des is dei Startseit. Hier kanns du sehe wer Geburtstag hat oder wer dei Seit angschaut hat.');
		
		
		setText('//div[@id="Kds"]/h2', 'Die Leut kennsch vielleicht:');
		
		
		replaceInEl('//div[@id="Visitors"]/div[@class="text"]/h2', 'angesehen', 'angschaut');
		replaceInEl('//div[@id="Visitors"]//div[@class="visitorsCounter"]', 'Besucher', 'Bsucher');
		
	}
	
	
	if (document.URL == 'http://www.schuelervz.net/Visitors/LongList')
	{
		
		replaceInEl('//div[@id="Grid-Page-Center-Header"]/h1', 'angesehen', 'angschaut');
	}

	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Profile/', 'i')))
	{

		setText('//div[@id="Mod-Pinboard-Snipplet"]/h2/span', 'Leute die was sage wollte:');
		setText('//div[@id="Mod-Pinboard-Snipplet"]//a[@class="showForm"]', 'was sage');
		
		
		var element = find('//div[@class="write-panel pinboard-write"]');
		
		
		var items = findAll('//a[@class="pinboard_DeleteItemLink"]');
		
		for each (var item in items)
		{
			item.innerHTML = "[gsagtes net so meine]";
		
		}
	}
	
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Pinboard/', 'i')))
	{
		replaceInEl('//ul[@class="obj-comment-list"]', 'Eintrag', 'Eitrag');
		setText('//div[@id="Pinboard_List"]//a[@class="showForm"]', 'Was sage');
	}
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Friends/All/', 'i')))
	{
		
		document.title = 'schuelerVZ | Meine Kumpels';
		
		
		setText('//div[@id="Grid-Page-Center-Header"]/h1', 'Alle Kumpels');
		
		
		setValue('//input[@id="Friends_name"]', 'Kumpel suche');
		
		
		setText('//label[@for="onlineOnly"]', 'Nur Kumpels die am Rechner sin anzeige');
	}
	
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Friends/Delete/', 'i')))
	{
		
		setValue('//form[@name="deleteFriend"]/input[@type="submit"]', 'Arschloch');
		setText('//form[@name="deleteFriend"]/a', 'Doch net');
	}

	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Groups/Leave/', 'i')))
	{
		setValue('//form[@name="leaveGroup"]/input[@type="submit"]', 'Scheiß auf die Gruppe!');
		setText('//form[@name="leaveGroup"]/a', 'Doch net');
	}
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Photos', 'i')))
	{
		
		document.title = 'schuelerVZ | Fotos';
		
		
		
	}

	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Groups($|/$|/tid)', 'i')))
	{
		
		document.title = 'schuelerVZ | Mei Gruppe';
		
		
		setText('//div[@id="Grid-Page-Center-Header"]/h1', 'Mei Gruppe');
		setValue('//div[@class="findGroupBox"]/input[@class="button"]', 'Gruppe suche');
	}
	
	
	if (document.URL.match(new RegExp('^http://www.schuelervz.net/Privacy', 'i')))
	{
		alert('Willkomme in deinem Bereich');
		document.title = 'schuelerVZ | Mei Bereich';
		
		
		setText('//div[@id="Grid-Page-Center-Header"]/h1', 'Mei Bereich');
	}
}


window.addEventListener("load", function() { main() }, false);

function find(xPath)
{
	var element = document.evaluate(xPath, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	return element.wrappedJSObject;
}


function findAll(xPath)
{
	var iterator;
	
	try
	{
		iterator = document.evaluate(xPath, document.body, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null );
	}
	catch (err)
	{
		//alert(xPath + err);
	}
	
	var elements = new Array();
	
	
	try {
	  var thisNode = iterator.wrappedJSObject.iterateNext();
	  
	  while (thisNode) {
	    elements.push(thisNode);
		thisNode = iterator.wrappedJSObject.iterateNext();
	  }	
	}
	catch (e) {
	  alert( 'Error: Document tree modified during iteration ' + e );
	}

	
	
	return elements;
}


function setText(xPath, text)
{	try
	{
		var element = find(xPath);

		element.innerHTML = text;
	}
	catch (err)
	{
		//alert(xPath + err);
	}

	
	
}


function setValue(xPath, text)
{
	var element = find(xPath);

	element.value = text;
}


function replaceInEl(xPath, search, replacement)
{
	var obj = new Object();
	obj.search = search;
	obj.replacement = replacement;
	
	multiReplaceInEl(xPath, new Array(obj));
}

function multiReplaceInEl(xPath, replacements)
{
	
		
	var element = find(xPath);
	
	multiReplaceInElRecursive(element, replacements);
}

function multiReplaceInElRecursive(element, replacements)
{
	if (element.nodeType == 3) {
		for each (var replacement in replacements)
			element.data = element.data.replace(replacement.search, replacement.replacement);
	}
	else if (element.hasChildNodes())
	{
		for (var i = 0; i < element.childNodes.length; ++i) {
			var subElement = element.childNodes[i];
			multiReplaceInElRecursive(subElement, replacements);
		}
	}
}