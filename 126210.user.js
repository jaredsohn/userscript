// ==UserScript==
// @author         fenuks
// @name           FilmWeb Tweaks
// @namespace      filmweb
// @description    various improvements for filmweb.pl webpage
// @include        *.filmweb.pl/*
// @version 0.2
// ==/UserScript==
var tag, tags, url, counter;
var h=GM_getValue('hide_rate', false);
//automatyczne przekierowanie ze strony z reklamą, pomysł zaczerpnięto z https://userscripts.org/scripts/show/93610
tag = document.getElementById('goToLink');
if (tag) {
    document.location.href = tag.href;
}
url=document.location.href;
if (url.match('/serial/') && !url.match('discussion'))
{
	tag = document.evaluate("//div[@class='seriesBar']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (tag) {
		tag=tag.firstChild;
		newElement = document.createElement('button');
		newElement.type="button" ;
		newElement.id="gbutton";
		newElement.addEventListener('click', function(){
															tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															tag1 = document.evaluate("//div[@class='popularity se_popularity']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															but=document.getElementById('gbutton');
															if (!h)
															{
																tag.style.visibility= "hidden";
																tag1.style.visibility= "hidden";
																but.innerHTML='Pokaż ocenę'
																h=true;
																GM_setValue('hide_rate', h);
															}
															else
															{
																tag.style.visibility= "visible";
																tag1.style.visibility= "visible";
																but.innerHTML='Ukryj ocenę';
																h=false;
																GM_setValue('hide_rate', h);
															}	
															});
		if (!h)
		{													
			newElement.innerHTML='Ukryj ocenę';
			tag.parentNode.insertBefore(newElement, tag.previousSibling);
		}
		else
		{
			newElement.innerHTML='Pokaż ocenę';
			tag.parentNode.insertBefore(newElement, tag.previousSibling);
			tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			tag1 = document.evaluate("//div[@class='popularity se_popularity']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			tag.style.visibility= "hidden";
			tag1.style.visibility= "hidden";
			newElement.innerHTML='Pokaż ocenę';
		}
		
	}
}
else if (url.match('/film/') && !url.match('discussion'))
{
	tag = document.evaluate("//div[@class='basic-info']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (tag) {
		tag=tag.firstChild;
		newElement = document.createElement('button');
		newElement.type="button" ;
		newElement.id="gbutton";
		newElement.addEventListener('click', function(){
															tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															tag1 = document.evaluate("//div[@class='popularity']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															but=document.getElementById('gbutton');
															if (!h)
															{
																tag.style.visibility= "hidden";
																tag1.style.visibility= "hidden";
																but.innerHTML='Pokaż ocenę'
																h=true;
																GM_setValue('hide_rate', h);
															}
															else
															{
																tag.style.visibility= "visible";
																tag1.style.visibility= "visible";
																but.innerHTML='Ukryj ocenę';
																h=false;
																GM_setValue('hide_rate', h);
															}	
															});
		if (!h)
		{													
			newElement.innerHTML='Ukryj ocenę';
			tag.parentNode.insertBefore(newElement, tag);
		}
		else
		{
			newElement.innerHTML='Pokaż ocenę';
			tag.parentNode.insertBefore(newElement, tag);
			tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			tag1 = document.evaluate("//div[@class='popularity se_popularity']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
			tag.style.visibility= "hidden";
			tag1.style.visibility= "hidden";
			newElement.innerHTML='Pokaż ocenę';
		}
		
	}
}
else if (url.match('/person/') && !url.match('discussion'))
{
	tag = document.evaluate("//div[@class='personInfoBoxContent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (tag) {
		newElement = document.createElement('button');
		newElement.type="button" ;
		newElement.id="gbutton";
		newElement.addEventListener('click', function(){
															tag = document.evaluate("//div[@class='personInfoBoxContent']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															but=document.getElementById('gbutton');
															if (!h)
															{
																tag.style.visibility= "hidden";
																but.innerHTML='Pokaż ocenę'
																h=true;
																GM_setValue('hide_rate', h);
															}
															else
															{
																tag.style.visibility= "visible";
																but.innerHTML='Ukryj ocenę';
																h=false;
																GM_setValue('hide_rate', h);
															}	
															});
		if (!h)
		{													
			newElement.innerHTML='Ukryj ocenę';
			tag.parentNode.insertBefore(newElement, tag.parentNode.firstChild);
		}
		else
		{
			newElement.innerHTML='Pokaż ocenę';
			tag.parentNode.insertBefore(newElement, tag.parentNode.firstChild);
			tag.style.visibility= "hidden";
			newElement.innerHTML='Pokaż ocenę'
		}
		
	}
}
else if (url.match('/videogame/') && !url.match('discussion'))
{
	tag = document.evaluate("//div[@class='gameInfoBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (tag) {
		tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		tag1 = document.evaluate("//div[@class='gameInfo']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		newElement = document.createElement('button');
		newElement.type="button" ;
		newElement.id="gbutton";
		newElement.addEventListener('click', function(){
															tag = document.evaluate("//div[@class='rates']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
															but=document.getElementById('gbutton');
															if (!h)
															{
																tag.style.visibility= "hidden";
																but.innerHTML='Pokaż ocenę'
																h=true;
																GM_setValue('hide_rate', h);
															}
															else
															{
																tag.style.visibility= "visible";
																but.innerHTML='Ukryj ocenę';
																h=false;
																GM_setValue('hide_rate', h);
															}	
															});
		if (!h)
		{													
			newElement.innerHTML='Ukryj ocenę';
			tag1.insertBefore(newElement, tag1.firstChild);
		}
		else
		{
			newElement.innerHTML='Pokaż ocenę';
			tag1.insertBefore(newElement, tag1.firstChild);
			tag.style.visibility= "hidden";
			newElement.innerHTML='Pokaż ocenę'
		}
		
	}
}
if ((url.match('/serial/') || url.match('/film/') || url.match('/videogame/')))
{
	//usuwanie górnej belki do połączenia konta
	tags = document.evaluate("//button[@class='whiteClose']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.click();
	}
	//usunięcie boxu z ocenami znajomych
	tags = document.evaluate("//div[@class='commonToggleBox filmActivityToggleBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	//usunięcie boxu z odnośnikami do dodawania treści'
	tags = document.evaluate("//div[@class='needed-content local-box createThisPage']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	//usunięcie boxu z informacjami na temat osób tworzących daną stronę'
	tags = document.evaluate("//div[@class='user-content local-box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie górnej belki z premierą
	tag = document.getElementById('menuBar-pl_PL');
	if (tag) {
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie przycisku 'Lubię to'
	tags = document.evaluate("//div[@class='placeForFBIframe']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie ramki z facebookowymi 'fanami'
	tag = document.getElementById('sidebarFilmwebLike');
	if (tag) {
		tag.parentNode.removeChild(tag);
	}
	
	/*//usunięcie odnośników na górze strony do premier'
	tags = document.evaluate("//div[@class='repertoryAndPremieres']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
	tag = tags.snapshotItem(i);
	tag.parentNode.removeChild(tag);
	}
	*/
}
else if (url.match('/person/'))
{
	//usunięcie boxu z ocenami znajomych
	tags = document.evaluate("//div[@class='commonToggleBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie boxu z odnośnikami do dodawania treści'
	tags = document.evaluate("//div[@class='user-content local-box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie boxu z informacjami na temat osób tworzących daną stronę'
	tags = document.evaluate("//div[@class='needed-content local-box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
}
else if (url.match('search?'))
{
	//usunięcie boxu po prawej stronie'
	tags = document.evaluate("//div[@class='searchSidebar']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
}
else if (url.match('/user/'))
{
	//usunięcie boxu do wyszukania znajomych w google i facebooku'
	tags = document.evaluate("//div[@class='votesContainer userInfoCloud']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
}
else
{
	//usuwanie górnej belki do połączenia konta
	tags = document.evaluate("//button[@class='whiteClose']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.click();
	}
	//usunięcie boxu z ocenami znajomych
	tags = document.evaluate("//div[@class='commonToggleBox filmActivityToggleBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	//usunięcie boxu z odnośnikami do dodawania treści'
	tags = document.evaluate("//div[@class='needed-content local-box createThisPage']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	//usunięcie boxu z informacjami na temat osób tworzących daną stronę'
	tags = document.evaluate("//div[@class='user-content local-box']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie górnej belki z premierą
	tag = document.getElementById('menuBar-pl_PL');
	if (tag) {
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie przycisku 'Lubię to'
	tags = document.evaluate("//div[@class='placeForFBIframe']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		tag.parentNode.removeChild(tag);
	}
	
	//usunięcie ramki z facebookowymi 'fanami'
	tag = document.getElementById('sidebarFilmwebLike');
	if (tag) {
		tag.parentNode.removeChild(tag);
	}
}
if (url.match('discussion'))
{
	//usunięcie jednopostowych 'dyskusji', przez niektórych nazywanych spamem idiotów, którzy nie maja nic lepszego do robienia niż zaczynanie dennych tematów, których nikt nie chce czytać, nie mówiąc już o odpowiadaniu na nie
	tags = document.evaluate("//div[@class='fltReplies']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	counter=0;
	for (var i = 0; i < tags.snapshotLength; i++) {
		tag = tags.snapshotItem(i);
		str=tag.innerHTML.replace(/[\n\t]/g,''); 
		if (str=="0")
		{
			if (counter<3)
				counter++;
			else
			{
				rem=tag.parentNode.parentNode;
				rem.parentNode.removeChild(rem);
			}
		}
	}
}
//usunięcie boxu z odnośnikami do dodawania na górze strony'
tags = document.evaluate("//ul[@class='addMenu']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < tags.snapshotLength; i++) {
	tag = tags.snapshotItem(i);
	tag.parentNode.removeChild(tag);
}
//usunięcie odnośników do dodawania treści
tags = document.evaluate("//a[@class='add-button']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < tags.snapshotLength; i++) {
	tag = tags.snapshotItem(i);
	tag.parentNode.removeChild(tag);
}
//zamknięcie ramek informujących o danej podstronie
tag = document.getElementById('closeBoxButton');
if (tag) {
	tag.click();
}
//usunięcie stopki
tag = document.getElementById('footer');
if (tag) {
	tag.parentNode.removeChild(tag);
}
//zaznaczenie pola wyszukiwania pomysł zaczerpnięto z https://userscripts.org/scripts/show/93611
tag = document.getElementById('mainSearchInput');
if (tag) {
	tag.focus();
}
//usunięcie przycisku +1
tag = document.getElementById('placeForGPlus');
if (tag) {
	tag.parentNode.removeChild(tag);
}

 /*
  GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.filmweb.pl/serial/%C5%BBona+idealna-2009-501262",
  onload: function(response) {
    alert(response.responseText);
  }
});
// */
