// ==UserScript==
// @name           Kalkulator ataku
// @description    Kalkulator ataku
// @description    Do rozwiazania problemy
// @description    rozwiazanie multikart czyli wiekszej ilosci atakow    nie rozpoznaje dodatkowego wiersza TR j=1 dla atakow ponizej 50 j=2 powyzej 50
// @description    zapisywanie do 2k atakow do pliku jako znacznik  wiersza to czas przybycia  jako wiadomosc  ktora bedzie usuwana po uplynieciu czasu przybycia
// @description    automatycznie zmieniajc kolor wiersza zapamietanego na inny kolor
// @description    odswierzanie co min wszystkich zakladek z zapisywaniem nowo powstalych
// @description    ignorowanie atakow w jednej sekundzie na jednego usera z wyswietleniem ilosci w jednym wierszu
//
// @include           http://s*.kingsage.*/game.php*attacks*
// ==/UserScript==
// !!!! Zmienić tę wartość, jeśli chcesz zmienić czas potrzebny na inne wojska, podróży jedno pole !!!!


(function (){
	var table;
	var division;
	var links;
	var i;
	var j=2;     // jezeli jest ponizej 52 atakow jedna zakladka j=1 wsystko do dopracowania
	var text;
	var temp_x;
	var temp_y;
	const speed = 9;
	
	// szukaj tagu table (borderlist)
	table = document.getElementsByClassName('borderlist');
	if (!table) return;
	
	//jezeli jest szukaj w linku "info_village
	if (document.location.href.indexOf('info_village') == -1){
	
		// przeszukaj tabele
		for (i=0; i<table.length; i++){
			// przejdz do wiersza 
			links = table[i].getElementsByTagName('tr');
			
			for (j; j<links.length; j++){
			
			// links.length -> kolejne kolumny  od 0-4
				division = links[j].getElementsByTagName('td');
			//pobranie danych osady i 1gracza z 2 rubryki takie rowiazanie 
				text1 = division[1].textContent;
				text2 = Number(text1.slice(-16, -13));
				text3 = Number(text1.slice(-12, -9));
			
			//pobranie danych osady 2 gracza  z 3 rubryki 
				text4 = division[2].textContent;
				text5 = Number(text4.slice(-16, -13));
				text6 = Number(text4.slice(-12, -9));
				
				text = division[0].textContent;
				temp_x = Number(text2 - text5);
				temp_y = Number(text3 - text6);
				a_odl = Math.sqrt(Math.pow(temp_x,2) + Math.pow(temp_y,2));
			
			//pobranie czasu i przeliczenie na min  z 5-tej rubryki
				a_flag = division[4].textContent;
				a_spr = a_flag.indexOf ( 'D' );
				if (  a_spr == -1 ) a_dni2 = 0;
				else a_dni2 = a_flag.substring(0,a_spr );
				a_min2 =  Number(a_flag.slice(-5, -3));
				a_godz2 = Number(a_flag.slice(-8, -6));
				a_min2 =  (a_dni2*1440) + (a_godz2*60) + a_min2 ;
			
			// przeliczanie czasu miedzy osadami dla szpiega speed zmienic dla innego woja
				a_all = speed*a_odl;
				a_min = a_all%60;
				a_godz = a_all/60;
				a_dni = Math.floor(a_godz/24);
				a_godz = Math.floor(a_godz-a_dni*24);
				a_min = Math.floor( a_all - a_dni*1440 - a_godz*60);
				odleglosc1 = Math.floor( a_odl - a_min2/9);
				
				
			//Szpieg 							9
			//Krzyżowiec 						10
			//Czarny rycerz 					11
			//Wściekły wojownik,Giermek,Długi łuk 		18
			//Wiejska milicja 					20
			//Templariusz 						22
			//Taran ,Katapulta 					30
			//Hrabia 							35
			
					 if ( a_odl - a_min2/ 9 > 0 ) odleglosc2 = 'Szpieg_'; 
				else if ( a_odl - a_min2/10 > 0 ) odleglosc2 = 'Krzyz_';  
				else if ( a_odl - a_min2/18 > 0 ) odleglosc2 = 'Wsciek_'; 
				else if ( a_odl - a_min2/20 > 0 ) odleglosc2 = 'Milic_';  
				else if ( a_odl - a_min2/22 > 0 ) odleglosc2 = 'Temp_';   
				else if ( a_odl - a_min2/30 > 0 ) odleglosc2 = 'Taran_';  
				else if ( a_odl - a_min2/35 > 0 ) odleglosc2 = 'Gruby_'; 
				// 
				//else odleglosc2 = odleglosc1;
				
				else odleglosc2 = Math.floor(a_odl - a_min2/35) ;
				if(a_godz < 10) a_godz = '0'+a_godz;
				if(a_min < 10)  a_min = '0'+ a_min;
			
				// wpisanie wynuku do 1 rubryki  division[0]
				division[0].textContent = odleglosc2;

			}
		}
	}
})()