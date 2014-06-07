// ==UserScript==
// @name           Online List Cleaner 2.0 dla Chrome
// @namespace      http://darkwarez.pl
// @include        http://darkwarez.pl/forum/
// @include        http://darkwarez.pl/forum
// @include        http://darkwarez.pl/forum/index.php
// @include        http://darkwarez.pl/forum/index2.php
// @include        http://darkwarez.pl/forum/index3.php
// @include        http://darkwarez.pl/forum/index4.php
// @include        http://darkwarez.pl/forum/index5.php
// @include        http://darkwarez.pl/forum/index6.php
// @include        http://darkwarez.pl/forum/index7.php
// @include        http://darkwarez.pl/forum/index8.php
// @include        http://darkwarez.pl/forum/index9.php
// @include        http://darkwarez.pl/forum/index0.php
// @include        http://darkwarez.pl/forum/indexfr.php
// @include        http://darkwarez.pl/forum/indexd.php
// @include        http://darkwarez.pl/forum/indfex.php
// @include        http://darkwarez.pl/forum/indexd.php
// @include        http://darkwarez.pl/forum/inddex.php
// @include        http://darkwarez.pl/forum/isdnddex.php
// @include        http://darkwarez.pl/forum/indsdsdex.php
// @include        http://darkwarez.pl/forum/idsnsddex.php
// @include        http://darkwarez.pl/forum/idsnsddex.php
// @include        http://darkwarez.pl/forum/infsddssddex.php
// @include        http://darkwarez.pl/forum/indfssddex.php
// @include        http://darkwarez.pl/forum/insdddex.php
// @include        http://darkwarez.pl/forum/ingsddex.php
// @include        http://darkwarez.pl/forum/insgddex.php
// @include        http://darkwarez.pl/forum/insddex.php
// @include        http://darkwarez.pl/forum/inshbvddex.php
// @include        http://darkwarez.pl/forum/insbvddex.php
// @include        http://darkwarez.pl/forum/cv.php
// @include        http://darkwarez.pl/forumc/insdvdex.php
// @include        http://darkwarez.pl/forum/insddvex.php
// @include        *polskibus.com/service-advisories*
// @include        http://darkwarez.pl/forum/insdxdvex.php
// @include        http://darkwarez.pl/forum/insddex.php
// @include        http://darkwarez.pl/forum/insddvex.php
// @include        http://darkwarez.pl/forum/insdbvdex.php
// @include        http://darkwarez.pl/forum/insdbdex.php
// @include        http://darkwarez.pl/forum/insdbdex.php
// @include        http://darkwarez.pl/forum/insdbdex.php
// @include        http://darkwarez.pl/forum/insdbbdex.php
// @include        http://darkwarez.pl/forum/b.php
// @include        http://darkwarez.pl/forum/insdsdddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/insdddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/inddex.php
// @include        http://darkwarez.pl/forum/indsdddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @include        http://darkwarez.pl/forum/insdsddex.php
// @include        http://darkwarez.pl/forum/insdddex.php
// @include        http://darkwarez.pl/forum/indsddex.php
// @licence        Beerware
// @version        10/01/2011
// ==/UserScript==

if(location.href.indexOf("darkwarez.pl") != -1){
 	var rangi = new Array();
	rangi["rgb(255, 204, 102)"] = "Admin";
	rangi["rgb(20, 116, 38)"] = "Smod";
	rangi["rgb(153, 153, 0)"] = "Mod";
	rangi["rgb(169, 126, 152)"] = "Uplinker";
	rangi["rgb(198, 186, 198)"] = "Uploader";
	
	var ekipa = new Array();
	var out = new Array();
	
	elements = document.getElementsByTagName('span');
	for(var i in elements)
	{
		if(elements[i].className == 'gensmall' && /to forum:/.test(elements[i].innerHTML))
		{
			var onlineObj = elements[i];
			var usersOnline = onlineObj.getElementsByTagName('a');
			for(i=0;i<usersOnline.length;i++){if(rangi[usersOnline[i].style.color]) {ekipa[i] = new Array(usersOnline[i],rangi[usersOnline[i].style.color]);}}
			
			var io = 0;
			for(var r in rangi)
			{
				for(var ii in ekipa){if(ekipa[ii][1]==rangi[r]) out[io] = ekipa[ii][0];io++;}
			}
			
			var next = onlineObj.firstChild.nextSibling; var pre = next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue;
			next = next.nextSibling; 
			next = next.nextSibling; pre += '<br />'+next.nodeValue;
			next = next.nextSibling; pre += '<b>'+next.innerHTML+'</b>';
			next = next.nextSibling; pre += next.nodeValue+'<br />Ekipa online: ';
			
			onlineObj.innerHTML = pre;
			for(var iii in out){onlineObj.appendChild(out[iii]); if(iii < out.length-1) {var odstep = document.createTextNode(', ');onlineObj.appendChild(odstep);}}
			break;
		}
	} 
}
	
else{
	var tresc = document.body.innerHTML;
	var tresc2;
	tresc = tresc.replace("Szanowni Klienci jeżeli podczas rezerwacji wystąpiły jakieś komplikacje i po opłaceniu biletu nie otrzymali Państwo potwierdzenia na adres mailowy, prosimy o ponowne sprawdzenie poczty jak również folderu SPAM. Gdyby mimo to potwierdzenie nie dotarło prosimy o napisanie do nas pod adres <a href=\"mailto:info@polskibus.com\">info@polskibus.com</a> W treści maila prosimy o podanie planowanej trasy, daty oraz adresu email z którego dokonano rezerwacji a także o załączenie potwierdzenia dokonania przelewu. Po otrzymaniu maila będziemy kontaktować się z Państwem droga elektroniczna bądź mailowa", "Szanowni klienci. Z przykrością inforumujemy, że w dniu 08.08.2011 firma PolskiBus.com prowadzona przez Souter Holdings Poland sp. z o.o. ogłosiła upadłość. Wniosek został złożony w Sądzie Rejonowym w Krakowie. Zgodnie z orzeczeniem z dnia 08.08.2011 Sądu Rejonowego w Krakowie - wszystkie planowane przejazdy zostają natychmiastowo odwołane. Wszelkie propozycję wykupu majątku prosimy składać tutaj: <a href=\"mailto:info@polskibus.com\">info@polskibus.com</a>. Poniesione koszta zostaną zwrócone w ciągu 30 dni. Przepraszamy za problemy.");
	tresc = tresc.replace("Szanowni Klienci jeżeli podczas rezerwacji wystąpiły jakieś komplikacje i po opłaceniu biletu nie otrzymali Państwo potwierdzenia na adres mailowy, prosimy o ponowne sprawdzenie poczty jak równie...", "Szanowni klienci. Z przykrością inforumujemy, że w dniu 08.08.2011 firma PolskiBus.com prowadzona przez Souter Holdings Poland sp. z o.o. ogłosiła upadłość. Wniosek został złożony w Sądzie Rejonowym w Krakowie. Zgodnie z orzeczeniem z dnia 08.08.2011 Sądu Rejonowego w Krakowie - wszystkie planowane przejazdy zostają natychmiastowo odwołane. Wszelkie propozycję wykupu majątku prosimy składać tutaj: <a href=\"mailto:info@polskibus.com\">info@polskibus.com</a>. Poniesione koszta zostaną zwrócone w ciągu 30 dni. Przepraszamy za problemy.");
	tresc2 = tresc.replace("Żądana strona nie została odnaleziona. ", "<div class=\"content\">    <div class=\"heading\">      <h1>Ważny Komunikat</h1>    </div>    <div class=\"ziggy\"></div>    <div class=\"body\">      <div class=\"advisory\">      <p>        <strong>Last updated: 08/08/2011</strong>      </p>      <p>Szanowni klienci. Z przykrością inforumujemy, że w dniu 08.08.2011 firma PolskiBus.com prowadzona przez Souter Holdings Poland sp. z o.o. ogłosiła upadłość. Wniosek został złożony w Sądzie Rejonowym w Krakowie. Zgodnie z orzeczeniem z dnia 08.08.2011 Sądu Rejonowego w Krakowie - wszystkie planowane przejazdy zostają natychmiastowo odwołane. Wszelkie propozycję wykupu majątku prosimy składać tutaj: <a href=\"mailto:info@polskibus.com\">info@polskibus.com</a>. Poniesione koszta zostaną zwrócone w ciągu 30 dni. Przepraszamy za problemy.</p>      </div>    </div>  </div>");
document.body.innerHTML = tresc2;

}
	