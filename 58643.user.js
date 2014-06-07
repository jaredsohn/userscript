// ==UserScript==
// @name           Full Allegro Archive
// @namespace      www.horacy.art.pl / horacy007@gmail.com
// @description    Skrypt dodaje w serwisie Allegro.pl linki do Publicznego Archiwum Allegro, umozliwiajac przegladanie starych aukcji, niedostepnych publicznie
// @include        http://allegro.pl/show_user.php?uid=*
// @include        http://allegro.pl/show_item.php?item=*
// @include        http://www.allegro.pl/show_user.php?search=*
// @include        http://allegro.pl/show_item.php?search=*
// @include        http://www.allegro.pl/show_user.php?uid=*
// @include        http://www.allegro.pl/show_item.php?item=*
// @include        http://www.allegro.pl/item*
// @include        http://allegro.pl/item*
// History:
// v. 777 - 2009.01.09
// - przy nazwach loginĂłw uĹźytkownikĂłw dodaje link do DETEKTYWA serwisu paa.pl, dziÄ?ki czemu jednym klikniÄ?ciem moĹźna przeĹ?ledziÄ? historiÄ? transakcji uĹźytkownika i otrzymanych za nie komentarzy - w przejrzystej tabelce z tytuĹ?ami aukcji, obrazkami, etc.
// v. 666 - 2009.01.08 :
// - na stronach uĹźytkownika podmienia â??numeryâ?? niedostÄ?pnych dla zwykĹ?ych uĹźytkownikĂłw aukcji, na odpowiednie linki prowadzÄ?ce do serwisu Publiczne Archiwum Allegro.
// - na stronach nieistniejÄ?cych aukcji wyĹ?wietla stosowny link wraz z informacjÄ? o moĹźliwoĹ?ci obejrzenia tej aukcji w zewnÄ?trznym serwisie


// ==/UserScript==
(function()
{
// DODAWANIE LINKU DO STRONY UĹťYTKOWNIKA
	zleAukcjeUserPage = document.evaluate(
	"//div[@title='Aukcja jest juĹź w archiwum i nie ma moĹźliwoĹ?ci jej obejrzenia']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
	
	for (var i = 0; i < zleAukcjeUserPage.snapshotLength; i++)
	{
		
    	thisAukcja = zleAukcjeUserPage.snapshotItem(i);
		var aukcja = zleAukcjeUserPage.snapshotItem(i).innerHTML;
		

		var info = document.createElement('p');
		
		// Zamiana numeru aukcji na odpowiedni link
		thisAukcja.innerHTML = '<a href="http://paa.pl/szukaj/?itemid='+aukcja+'">'+aukcja+'</a>';
		// (c)
		info.innerHTML = '<a href="http://www.horacy.art.pl" style="font-size:0.8em; text-decoration:none;">Powered by Full Allegro Archive + paa.pl</a>';

		thisAukcja.appendChild(info);
	}

// DODAWANIE LINKU DO STRONY NIEZNALEZIONEJ AUKCJI
	zleAukcjeNormalPage = document.evaluate(
	"//span[@class='msg']/b",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	for (var i = 0; i < zleAukcjeNormalPage.snapshotLength; i++)
		{
		thisMsg = zleAukcjeNormalPage.snapshotItem(i);
		var info = document.createElement('p');
		
		thisMsg.innerHTML = '<a href="http://paa.pl/szukaj/?itemid='+document.location.href+'">Strona przedmiotu zostaĹ?a przeniesiona do archiwum - kliknij, aby jÄ? zobaczyÄ?.</a>';
		info.innerHTML = '<a href="http://www.horacy.art.pl" style="text-decoration:none;">Powered by Full Allegro Archive + paa.pl</a>';
		thisMsg.appendChild(info);
		}
// DODAWANIE DETEKTYWA
	
	detektywUser = document.evaluate(
	"//span[@class='uname']/a",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

	for (var i = 0; i < detektywUser.snapshotLength; i++)
	{
		
    	thisAukcja = detektywUser.snapshotItem(i);
		var user = detektywUser.snapshotItem(i).innerHTML;
		

		var info = document.createElement('b');
		info.innerHTML = ' - <a href="http://paa.pl/detektyw?search='+user+'" style="font-size:0.8em; text-decoration:none; color:black;">Detektyw</a>';
	spanUser = document.evaluate(
	"//span[@class='uname']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);
		spanUser.snapshotItem(i).appendChild(info);
	}
	

}) ();
