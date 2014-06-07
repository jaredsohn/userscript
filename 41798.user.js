// ==UserScript==
// @name Infocompte poland translation
// @description Infocompte poland translation by m4rko for ogame.pl
// @include        http://*.ogame.*game/index.php?page=b_building*
// @include        http://*.ogame.*game/index.php?page=buildings*
// @include        http://*.ogame.*game/index.php?page=overview*
// @include        http://*.ogame.*game/index.php?page=options*
// @include        http://*.ogame.*game/index.php?page=flotten1*
// ==/UserScript==
/* ******************************Poland********************************/
if (Langue=='pl')
{
var Mines='Kopalnie';
	var Other_structure='Inne budynki';
	var Structure = 'Budynki';
	var Technology='Technologia';
	var Fleet ='Flota';
	var Defense = 'Obrona';
	var Progression = 'Postęp' ;
	var Moyenne = 'Średnica';
	var Production = 'Produkcja';
	var Indestructible = 'Niezniszczalne';
	
	var Depuis = 'od';
	var Points = 'Punkty';
	
	var nom_def = new Array('Wyrzutnia rakiet',"Lekkie działo laserowe","Ciężkie działo laserowe","Działo Gaussa","Działo jonowe","Wyrzutnia plazmy","Przeciwrakieta","Rakieta międzyplanetarna","Mała powłoka ochronna","Duża powłoka ochronna");
	var nom_tech = new Array('Technologia szpiegowska',"Technologia komputerowa","Technologia bojowa","Technologia ochronna","Opancerzenie","Technologia energetyczna","Technologia nadprzestrzenna","Napęd spalinowy","Napęd impulsowy","Napęd nadprzestrzenny","Technologia laserowa","Technologia jonowa","Technologia plazmowa","Międzygalaktyczna Sieć Badań Naukowych","Technologia Ekspedycji");
	var nom_bat = new Array('Kopalnia metalu',"Kopalnia kryształu","Ekstraktor deuteru","Elektrownia słoneczna","Elektrownia fuzyjna","Fabryka robotów","Fabryka nanitów","Stocznia","Magazyn metalu","Magazyn kryształu","Zbiornik deuteru","Laboratorium badawcze","Terraformer","Silos rakietowy","Depozyt sojuszniczy","Stacja księżycowa","Falanga czujników","Teleporter");
	var nom_flotte = new Array("Mały transporter","Duży transporter","Lekki myśliwiec","Ciężki myśliwiec",'Krążownik',"Okręt wojenny","Statek kolonizacyjny","Recykler","Sonda szpiegowska","Bombowiec","Niszczyciel","Gwiazda Śmierci","Pancernik");
	var construction_time = 'Czas ukończenia:';
	var level = 'Poziom';
	var dispo = 'wybudowano';
	var rank= 'Miejsce';	
	var Planet= 'Planeta';
	
	var soit = 'to są';
	this_Planet='ta planeta';
	var Pointdetails="Szczegóły punktów";
	
	var BBcode_debut="[quote][center][size=22][b]"+Pointdetails+":[/b][/size]\n\n[size=16]Wszystkie punkty :";
	var BBcode_mine="Punkty w kopalniach: ";
	var BBcode_bat="Punkty w innych budynkach: ";
	var BBcode_batT="Punkty we wszystkich budynkach: ";
	var BBcode_fin1 = "Punkty w technologii : ";
	var	Bcode_fin2 = "Punkty we flocie : ";
	var	BBcode_fin3 = "Punkty w obronie : ";
	var	BBcode_fin4 = "Twoje konto posiada ";
	var	BBcode_fin5 = "Niezniszczalne punkty";	
	var	BBcode_fin6 = "Średni postęp : ";
	var Point_day = "Punkty na dzień";
	
	var sur_lune='na księżycu';
	var en_vol='w locie';
	var Avertissement ='Czy napewno chcesz zresetować postęp';
	var restart = 'Kliknij aby zresetować postęp';
	var AffBBcode = 'Kliknij tutaj po BBcode';
	
	var done ='Gotowe! Odswież stronę!';
	var ICoption = 'opcje InfoCompte';
	
	var option1 ='<tr><th>Kolory (wypełnij jak chcesz)';
	var option2 ='<tr><th >Pokoaż punkty wszystkich budynków';
	var option3 ='<tr><th>Pokoaż punkty niezniszczalne';
	var option4 ='<tr><th>Pokoaż punkty technologii';
	var option5 ='<tr><th>Pokoaż punkty floty';
	var option6 ='<tr><th>Pokoaż punkty obrony';
	var option7 ='<tr><th>Pokoaż procent floty w locie';
	var option8 ='<tr><th>Pokoaż punkty księżyca';
	var option9 ='<tr><th>Pokoaż w jednej lini(dla ruchu flot i  punkty księżyca)';
	var option10 ='<tr><th>Pokoaż postęp';
	var option11 ='<tr><th>Zaznacz jeżeli jest wiecej niż jedna osoba na tym komputerze i universum';
	var option12 ='<tr><th>Pokoaż postęp w kolorze';
	var option13 ='<tr><th>Pokoaż postęp na dzień';
	var option14 ='<tr><th>Pokoaż punkty zyskane z kopalnii';
	var option15 ='<tr><td class="c" colspan="2">Anuluj / Zapisz dokonane modyfikacje  :';
	option16='<tr><th>Pokoaż szczegóły na każdej stronie';
	
	var Save='Zapisz zmiany';
	var valeurdefaut = 'ustawienia fabryczne';
	var speeduniX2 = new Array(50,60);