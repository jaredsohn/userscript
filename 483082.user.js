// ==UserScript==
// @name        AutoUzupełniacz HR 
// @namespace   12
// @include     *172.30.16.31/*
// @include     http://172.30.16.33/bug_report_page.php
// @include     http://172.30.16.33/bug_report_page.php?nr=1
// @version     1
// @grant       none
// ==/UserScript==

window.uzupelniacz = function()
{
//alert("3");
var current_date = new Date();
var delay_time1 = 60 * 60 * 1000;
var delay_time2 = 60 * 60 * 1000;
var delay_time3 = 80 * 60 * 1000;

//do testow
//var delay_time1 = 2000;
//var delay_time2 = 2000;
//var delay_time3 = 10000;

//"magazyn" zmiennych
if ((window.storeHR) == null)
{
   window.storeHR = localStorage;
}
//alert("4");
//do resetowania wartości początkowych
//storeHR.setItem('counter', 11);

//ustawienie wartości początkowych
//alert(storeHR.getItem('counter'));
if (storeHR.getItem('counter') == null) 
{
	storeHR.setItem('counter', -1);
	storeHR.setItem('last_date', ((new Date()).valueOf() - (1 * 24 * 60 * 60  * 1000 )));
	storeHR.setItem('last_time_notification', 0); 
	//alert("5");
}




if (window.location.toString() == "http://172.30.16.31/Paszportyzacja/view_all_bug_page.php?nr=1")
{
	storeHR.setItem('counter', -1);
	storeHR.setItem('last_date', (new Date()).valueOf());
	window.close();
}
/*
alert(storeHR.getItem('last_date'));
var aa = storeHR.getItem('last_date');
alert(parseInt(aa));
alert(new Date(parseInt(aa)));
alert((new Date(parseInt(storeHR.getItem('last_date')))).getDate());

alert(current_date.getDate());
alert(((new Date(parseInt(storeHR.getItem('last_date')))).getDate() !=  current_date.getDate()));
alert((storeHR.getItem('counter') == -1));
*/
//pierwszy komunikat przypominający
if ((storeHR.getItem('counter') == -1) && ((new Date(parseInt(storeHR.getItem('last_date')))).getDate() !=  current_date.getDate()))
{
	alert("Dzień dobry. Nastał nowy dzień, więc czas uzupełnić Mantis HR ;)");
	storeHR.setItem('counter', 1);
	storeHR.setItem('last_time_notification', (new Date()).valueOf());
	//alert("6");
}
//alert("6a");
//drugi komunikat przypominający

/*
alert(storeHR.getItem('counter'));
alert(storeHR.getItem('counter') == 1);
var aa = parseInt(storeHR.getItem('last_time_notification'));
alert(parseInt(storeHR.getItem('last_time_notification') + parseInt(delay_time1)));
alert((new Date()).valueOf());


alert((parseInt(storeHR.getItem('last_time_notification') + parseInt(delay_time1)) <= (new Date()).valueOf()));
*/

var last_time_notif = parseInt(storeHR.getItem('last_time_notification'));
if ((storeHR.getItem('counter') == 1) && ((last_time_notif + parseInt(delay_time1)) <=  (new Date()).valueOf()))
{
	alert("Hmmm mantis HR nadal nie uzupełniony? Proszę uzupełnij go teraz");
	storeHR.setItem('counter', 2);	
	storeHR.setItem('last_time_notification', (new Date()).valueOf());
	//alert("7");
}
//alert("7a");
//trzeci komunikat
last_time_notif = parseInt(storeHR.getItem('last_time_notification'));
if ((storeHR.getItem('counter') == 2) && ((last_time_notif  + parseInt(delay_time2)) <=  (new Date()).valueOf()))
{
	alert("Przypominam po raz ostatni o uzupełnieniu mantis HR");
	storeHR.setItem('counter', 3);
	storeHR.setItem('last_time_notification', (new Date()).valueOf());
	//alert("8");
}
//alert("8a");

//Ostatni
last_time_notif = parseInt(storeHR.getItem('last_time_notification'));
if ((storeHR.getItem('counter') == 3) && ((last_time_notif  + parseInt(delay_time3)) <=  (new Date()).valueOf()))
{
	alert("Przypominałem trzy razy i nic! Koniec tego sam sobie go uzupełnię");
	storeHR.setItem('counter', 4);
	storeHR.setItem('last_time_notification', (new Date()).valueOf());
	//alert("9");
	window.open("http://172.30.16.33/bug_report_page.php?nr=1");
}
//alert(storeHR.getItem('counter'));
//alert("9a");
if ((window.location.toString() == "http://172.30.16.33/bug_report_page.php?nr=1") || ((window.location.toString() == "http://172.30.16.33/bug_report_page.php") && (confirm('Czy wypelnic pola?'))))
{
	//alert(storeHR.getItem('counter'));
	var szef = "pbaziuk";
	var status = "Wprowadzona";
	var opis = "xxx";
	var dzial = "Dział Procesów Masowych";
	var sekcja = "Sekcja Liderów Operatorów";
	var stanowisko = "Lider Operatorów Danych";
	var godz_przyj = "08:00";
	var godz_wyj = "16:00";
	
	//część dla Rejestru Aktywności
	var kontrahent = "TDP";
	var umowa = "TAURON: Umowa z Tauron Dystrybucja S.A. z dnia 15-06-2012";
	var zlecenie = "TD_WR_Oborniki_Sl_nN";
	var rodzaj_czynnosci = "Wprowadzanie Danych";
	
	//typ dnia zmienia sie automatycznie na sobote lub niedziele - nie uwzglednia swiat i odrabianych nieobecnosci.
	var typ_dnia = "dzień roboczy";

	//1. Przypisz do 
	var elem = document.evaluate("//select[@name='handler_id']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	var text = elem.snapshotItem(0).innerHTML;
	var swap_with = szef;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace(">" + swap_with, " selected=\"selected\">" + swap_with);
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//2. Temat
	elem = document.evaluate("//span[@class='small']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	var user = elem.snapshotItem(0).innerHTML;
	var user_array = (user.replace("(","")).split(" ");
	var elem_tmp = document.evaluate("//input[@name='summary']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	elem_tmp.snapshotItem(0).value = user_array[1] + " " + user_array[0];
	elem_tmp.snapshotItem(0).style.background = "#aacc00";
	}
	
	//3. Opis
	elem = document.evaluate("//textarea[@name='description']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	elem.snapshotItem(0).innerHTML = opis;
	elem.snapshotItem(0).style.background = "#aacc00";

	//4. Osoba
	elem = document.evaluate("//span[@class='italic']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	user = elem.snapshotItem(0).innerHTML;

	elem_tmp = document.evaluate("//select[@name='custom_field_6']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	text = elem_tmp.snapshotItem(0).innerHTML;
	var compare = elem_tmp.snapshotItem(0).innerHTML;
	swap_with = ">"+ user;
	text = text.replace(" selected=\"\"", "");
	text = text.replace(" selected=\"selected\"", "");
	text = text.replace(swap_with, " selected=\"selected\"" + swap_with);

		if (text != compare)
		{
		elem_tmp.snapshotItem(0).innerHTML = text;
		elem_tmp.snapshotItem(0).style.background = "#aacc00";
		}
	}
	//5. Dzial
	elem = document.evaluate("//select[@name='custom_field_61']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = dzial;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\"" + " selected=\"selected\" ");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//6. Sekcja
	elem = document.evaluate("//select[@name='custom_field_8']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = sekcja;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\"" + " selected=\"selected\" ");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//7. Stanowisko
	elem = document.evaluate("//select[@name='custom_field_9']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = stanowisko;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\"" + " selected=\"selected\" ");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//8. Data
	current_date = new Date();
	day = current_date.getDate();
	month = current_date.getMonth() + 1;
	year = current_date.getFullYear();

    //set day
	elem = document.evaluate("//select[@name='custom_field_1_day']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = day.toString();
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//set month
	elem = document.evaluate("//select[@name='custom_field_1_month']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = month.toString();
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//25 Miesiac
	elem = document.evaluate("//select[@name='custom_field_90']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = month.toString();
	if (month.toString() <= 9)
	{
	swap_with = "0" + month.toString();
	}
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//set year
	elem = document.evaluate("//select[@name='custom_field_1_year']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = year.toString();
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//24 Rok
	elem = document.evaluate("//select[@name='custom_field_89']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = year.toString();
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//9. Godzina przyjścia
	elem = document.evaluate("//select[@name='custom_field_104']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = godz_przyj;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//10. Godzina wyjścia
	elem = document.evaluate("//select[@name='custom_field_105']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = godz_wyj;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//11. Typ dnia
	elem = document.evaluate("//select[@name='custom_field_103']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	
	
	if (current_date.getDay() == 6)
	{
		typ_dnia = "sobota";
	}
		if (current_date.getDay() == 0)
	{
		typ_dnia = "niedziela";
	}
	swap_with = typ_dnia;
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + "\" selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//część dla Rejestru Aktywności
	//20 Kontrahent
	elem = document.evaluate("//select[@name='custom_field_10']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = kontrahent + "\"";
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + " selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//21 Umowa z kontrahentem

	elem = document.evaluate("//select[@name='custom_field_60']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = umowa + "\"";
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + " selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}

	//22 Zlecenie
	elem = document.evaluate("//select[@name='custom_field_2']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = zlecenie + "\"";
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + " selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//Rodzaj czynności
	elem = document.evaluate("//select[@name='custom_field_4']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (elem.snapshotLength != 0)
	{
	text = elem.snapshotItem(0).innerHTML;
	swap_with = rodzaj_czynnosci + "\"";
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, swap_with + " selected=\"selected\"");
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	}
	
	//dodanie obiektu Stan nie działa!
	/*elem = document.evaluate("//td[@class='spacer']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	elem.snapshotItem(0).parentNode.class = "row-1";
	elem.snapshotItem(0).parentNode.innerHTML = " 	<!-- Status -->	<td class=\"category\">\		Stan	</td>\	<td bgcolor=\"#ffa0a0\">		<select name=\"status\"><option value=\"10\" selected=\"selected\">Nowa</option><option value=\"30\">Wprowadzona</option></select>	</td>	<td colspan=\"2\">&nbsp;</td>\<!-- spacer -->";

	elem = document.evaluate("//select[@name='status']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	text = elem.snapshotItem(0).innerHTML;
	swap_with = ">" + status;
	text = text.replace("selected=\"selected\"", "");
	text = text.replace("selected=\"\"", "");
	text = text.replace(swap_with, " selected=\"\"" + swap_with);
	elem.snapshotItem(0).innerHTML = text;
	elem.snapshotItem(0).style.background = "#aacc00";
	*/
	
	//alert(storeHR.getItem('counter'));
	//if (parseInt(storeHR.getItem('counter')) == 4)
	if (window.location.toString() == "http://172.30.16.33/bug_report_page.php?nr=1")
	{
		storeHR.setItem('counter', -1);
		storeHR.setItem('last_date', (new Date()).valueOf());
		//alert("aaa");
		//klikniecie "wyślij zgloszenie"
		var button = document.evaluate("//input[@value='Wyślij zgłoszenie']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		if (button.snapshotLength == 1)
		{
			//alert("bbb");
			var e = document.createEvent('MouseEvents');
			e.initEvent('click', true, false);
			//alert("vvv");
			//alert("i juz klikniete");
			window.open("http://172.30.16.31/Paszportyzacja/view_all_bug_page.php?nr=1");
			button.snapshotItem(0).dispatchEvent(e);
		}
		else
		{
			alert("Uwaga!! Jest więcej guzików \"Wyślij zgłoszenie\"");
		}
	}
	else
	{
		if (window.location.toString() == "http://172.30.16.33/bug_report_page.php")
		{
			window.open("http://172.30.16.31/Paszportyzacja/view_all_bug_page.php?nr=1");
		}
	}

	storeHR.setItem('counter', -1);
	storeHR.setItem('last_date', (new Date()).valueOf());
	
	delete szef;
	delete status;
	delete opis;
	delete dzial;
	delete sekcja;
	delete stanowisko;
	delete godz_przyj;
	delete godz_wyj;
	delete typ_dnia;
	
	//część dla Rejestru Aktywności
	delete kontrahent;
	delete umowa;
	delete zlecenie;
	delete rodzaj_czynnosci;

	delete elem;
	delete elem_tmp;
	delete compare;
	delete user;
	delete user_array;
	delete text;
	delete swap_with;
	delete current_date;
	delete last_time_notif;
}
}

window.mainFunction = function()
{
	
	//alert("1");
	//alert("aaa");
	if ((window.location.toString() != "http://172.30.16.33/bug_report_page.php?nr=1") && (window.location.toString() != "http://172.30.16.31/Paszportyzacja/view_all_bug_page.php?nr=1"))
	{	
		//odswiezanie co 5 minut by wyslac powiadomienie
		//alert("bbb");
		window.setInterval(function() {uzupelniacz();}, 5 * 60 * 1000);
		//alert("ccc");
	}
	else
	{
		//alert("ddd");
		uzupelniacz();
	}
	//uzupelniacz();
}

mainFunction();
