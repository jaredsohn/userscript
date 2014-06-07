// ==UserScript==
// @version 1.90
// @author  Medej  
// @name           kingsAge Kalkulator flagi
// @description    kingsAge Kalkulator flagi
// @description    Do rozwiazania problemy moze ktos sie dolaczy do projektu ( to tylko czesc mojej calosci)
// @description    automatycznie zmieniajc kolor wiersza zapamietanego na inny kolor
// @description    odswierzanie co min wszystkich zakladek z zapisywaniem nowo powstalych
// @include           http://s*.kingsage.*/game.php*
// ==/UserScript==


//usunuecie denerwujacej reklamy po prawej stronie
var findPattern = "/html/body/div[3]/div/div";
var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
var rst=resultLinks.iterateNext();
rst.innerHTML = "";

//start kalkulatora

	var qs=new Array();
	var loc=location.search;
if (loc){loc=loc.substring(1);
	var parms=loc.split('&');
		for(var i=0;i<parms.length;i++){
			nameValue=parms[i].split('=');
			qs[nameValue[0]]=unescape(nameValue[1]);
			
		}
}

	//Kalkulator ataku
	if(qs['m'].toString()=='attacks'){
	
	var locs = window.location.toString();
	var ls = locs.slice(7,11);


	var table;
	var division;
	var links;
	var i=1;
	var j ; 
	var text;
	var temp_x;
	var temp_y;
	
	 //wyznaczanie j jezeli jest wiecej niz jedna zakladka 
	var findPattern = "/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td/b";
	var resultLinks = document.evaluate( findPattern, document, null, XPathResult.ANY_TYPE , null );
	var rst=resultLinks.iterateNext();
	
	if (!rst) j=1; 
	 else j=2 ;
	
	// szukaj tagu table (borderlist)
	table = document.getElementsByClassName("borderlist");
	if (!table) return;
	if (document.location.href.indexOf('info_village') == -1){
		// przeszukaj tabele
		for (i; i<table.length; i++){
			links = table[i].getElementsByTagName('tr');
			
			for (j; j <links.length; j++){
				
				// links.length -> kolejne kolumny  od 0-4
				division = links[j].getElementsByTagName('td');
				//alert( parseint.division[1]);
				//pobranie danych osady i 1 gracza z 2 rubryki takie rowiazanie 
				text1 = division[1].textContent;
				text2 = Number(text1.slice(-16, -13));
				text3 = Number(text1.slice(-12, -9));
				
				//pobranie danych osady 2 gracza  z 3 rubryki 
				text4 = division[2].textContent;
				text5 = Number(text4.slice(-16, -13));
				text6 = Number(text4.slice(-12, -9));
				
				//obliczanie odleglosci miedzy osadami
				temp_x = Number(text2 - text5);
				temp_y = Number(text3 - text6);
				a_odl = Math.sqrt(Math.pow(temp_x,2) + Math.pow(temp_y,2));
				
				
				b_flag = division[3].textContent;
				a_flag = division[4].textContent;
				b_sek = Number(a_flag.slice(-2));
				//alert (b_flag +':'+ b_sek);
				
				
				//pobranie czasu i przeliczenie na min  z 5-tej rubryki
				
				a_spr = a_flag.indexOf ( 'D' );
				if (  a_spr == -1 ) a_dni2 = 0;
				else a_dni2 = a_flag.substring(0,a_spr );
				a_min2 =  Number(a_flag.slice(-5, -3));
				a_godz2 = Number(a_flag.slice(-8, -6));
				a_min2 =  (a_dni2*1440) + (a_godz2*60) + a_min2 ;
				
				
				//Szpieg 9
				//Krzyżowiec 	10
				//Czarny rycerz 11
				//Wściekły wojownik,Giermek,Długi łuk 18
				//Wiejska milicja 20
				//Templariusz 	22
				//Taran ,Katapulta 30
				//Hrabia 	35
				
		 if ( a_odl - a_min2/9 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_spy.png\"/>Szpieg'; 
	else if ( a_odl - a_min2/10 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_light.png\"/>Krzyze';
	else if ( a_odl - a_min2/11 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_heavy.png\"/>Cr-y';
	else if ( a_odl - a_min2/18 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_axe.png\"/>Wsciekle'; 
	else if ( a_odl - a_min2/20 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_farmer.png\"/>Milicja'; 
	else if ( a_odl - a_min2/22 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_sword.png\"/>Tempe';   
	else if ( a_odl - a_min2/30 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_kata.png\"/>Tarany'; 
	else if ( a_odl - a_min2/35 > 0 ) k = '<img src=\"http://s1.kingsage.org/img/units/unit_snob.png\"/><b>GRUBY</b>';
	//wpisujemy k do pierwszej kratki
	
	division[0].innerHTML = k;
					
			}
		}
	}
}