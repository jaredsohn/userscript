// ==UserScript==
// @name        Polska nakładka językowa na schulterglatze.de
// @namespace   krzysiek-w1983@tlen.pl
// @author      JohnRambo & PERKOZ
// @include     http://schulterglatze.de/*
// @include     http://www.schulterglatze.de/*
// @include     http://*.schulterglatze.de/*
// @include     http://www.*.schulterglatze.de/*
// @include     http://*schulterglatze-gamesgroup-musiktv.myvideo.de/
// @exclude     http://wiki.schulterglatze.de/*
// @exclude     http://www.wiki.schulterglatze.de/*
// @version     1.5.2
// @grant       none
// ==/UserScript==

var textnodes, node, s;
   
textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < textnodes.snapshotLength; i++) {
   node = textnodes.snapshotItem(i);
   s = node.data;
   
   //-----//-----//----- Toolbar //-----//-----//-----
   
   s = s.replace('Stammakte', 'Moje akta');
   s = s.replace('Übersicht', 'Widok główny');
   s = s.replace('Mein Profil', 'Mój profil');
   s = s.replace('Kameraden', 'Koledzy');
   s = s.replace('Nervensägen', 'Czarna lista');
   s = s.replace('Historie', 'Historia');
   s = s.replace('Einstellungen', 'Ustawienia');
   s = s.replace('Ausbildung', 'Szkolenie');
   s = s.replace('Lehrgänge', 'Kursy');
   s = s.replace('Truppenübungsplatz', 'Plac ćwiczeń');
   s = s.replace('Dienst', 'Służba');
   s = s.replace('Ausrüstung', 'Wyposażenie');
   s = s.replace('Inventar', 'Ekwipunek');
   s = s.replace('Waffenkammer', 'Magazyn broni');
   s = s.replace('Gefecht', 'Walki');
   s = s.replace('Kopfgeld', 'Nagroda za gł.');
   s = s.replace('Schießplatz', 'Strzelnica');
   s = s.replace('Truppe', 'Oddział');
   s = s.replace('Mitglieder', 'Członkowie');
   s = s.replace('Pinnwand', 'Tablica');
   s = s.replace('Bündnisse', 'Sojusze');
   s = s.replace('Oddziałnchat', 'Czat');
   s = s.replace('Kasse', 'Kasa');
   s = s.replace('Manöver', 'Manewry');
   s = s.replace('Nachtwache', 'Nocna sł. wart.');
   s = s.replace('Stützpunkt', 'Baza');
   s = s.replace('Tauschplatz', 'Plac wymiany');
   s = s.replace('Poststelle', 'Poczta');
   s = s.replace('Orden', 'Ordery');
   s = s.replace('Beteiligung', 'Udział');
   s = s.replace('Rohstoffe', 'Surowce');
   s = s.replace('Kaserne', 'Koszary');
   s = s.replace('Geschäftszimmer', 'Pokój służbowy');
   s = s.replace('Oddziałnarzt', 'Lekarz oddziałowy');
   s = s.replace('Gemeinschaftsdusche', 'Wspólny prysznic');
   s = s.replace('Soldatenlotto', 'Żołnierski totolotek');
   s = s.replace('Postfach', 'Poczta');
   s = s.replace('Eingang', 'Przychodząca');
   s = s.replace('Ausgang', 'Wychodząca');
   s = s.replace('Schreiben', 'Napisz');
   s = s.replace('Archiv', 'Archiwum');
   s = s.replace('Soldaten', 'Żołnierze');
   s = s.replace('Oddziałn', 'Oddziały');
   s = s.replace('Standorte', 'Lokalizacje');
   s = s.replace('Teilstreitkräfte', 'Siły zbrojne');
   s = s.replace('Oddziałygattung', 'Rodzaj wojsk');
   s = s.replace('Suche', 'Wyszukaj');
   
   
   //-----//-----//----- Stopnie wojskowe //-----//-----//-----
         /* UWAGA: stopnie wojskowe zostały dosłownie zastąpine stopniami z polskiej wersji supersoldier.pl
            mogą one nie mieć prawidłowego odzwierciedlenia, ale ułatwi to grę na serwerach niemieckich polskim graczom.
            Stopień Schulterglatze odpowiednik polskiego stopnia Kot nie został przetłumaczony ze względu
            na to iż jest to nazwa własna gry i występuje często w innych jej aspektach  */
   
   s = s.replace('Gefreiter', 'Szeregowy');
   s = s.replace('Obergefreiter', 'Starzszy Szeregowy');
   s = s.replace('Hauptgefreiter', 'Kapral');
   s = s.replace('Stabsgefreiter', 'Starszy Kapral');
   s = s.replace('Oberstabsgefreiter', 'Plutonowy');
   s = s.replace('Unteroffizier', 'Sierżant');
   s = s.replace('Stabsunteroffizier', 'Starszy Sierżant');
   s = s.replace('Feldwebel', 'Młodszy Chorąży');
   s = s.replace('Oberfeldwebel', 'Chorąży');
   s = s.replace('Hauptfeldwebel', 'Starszy Chorąży');
   s = s.replace('Stabsfeldwebel', 'St. Chorąży Szt.');
   s = s.replace('Oberstabsfeldwebel', 'Podporucznik');
   s = s.replace('Leutnant', 'Porucznik');
   s = s.replace('Oberleutnant', 'Kapitan');
   s = s.replace('Major', 'Podpułkownik');
   s = s.replace('Hauptmann', 'Major');
   s = s.replace('Oberstleutnant', 'Pułkownik');
   s = s.replace('Oberst', 'Generał Brygady');
   s = s.replace('Brigadegeneral', 'Generał Dywizji');
   s = s.replace('Generalmajor', 'Generał Broni');
   s = s.replace('Generalleutnant', 'Generał');
   s = s.replace('General', 'Marszałek DDR');
   
   
   //-----//-----//----- Szkolenia //-----//-----//-----
   
   s = s.replace('Waffenausbildung', 'Szkolenie Strzeleckie');
   s = s.replace('Wachausbildung','Szkolenie na wartownika');
   s = s.replace('Arschkriechen','Nauka wazeliny');
   s = s.replace('Sportausbildung','Szkolenie sportowe');
   s = s.replace('Formaldienst','Szkółka marszu');
   s = s.replace('Sanitätsausbildung','Szkolenie na sanitariusza');
   s = s.replace('Walkisausbildung','Nauka przetrwania');
   s = s.replace('Politische Bildung','Szkolenie Polityczne');
   s = s.replace('Einsatzausbildung','Misja i jej zagadki');
   s = s.replace('Feuerkampf','Walka pod ostrzałem');
   s = s.replace('Täuschen & Verpissen','Zmylić & spierniczać');
   s = s.replace('Plündern','Plądrowanie');
   s = s.replace('Beförderung','Awans');
   s = s.replace('Spezialausbildung','Szkolenie specjalne');
   s = s.replace('Oddziałnausbildung','Szkolenie oddziału');
   s = s.replace('Zum Służbagrad Hauptgefreiter befördern','Przedstaw do awansu na stopień');
   s = s.replace('Ordonnanz','Ordynans');
   s = s.replace('Karte und Kompass','Mapa i kompas');
   s = s.replace('ABC','Alarm o skażeniach');
   s = s.replace('Scharfschütze','Snajper');
   s = s.replace('Feldküche','Kuchnia polowa');
   s = s.replace('Hindernisbahn','Tor przeszkód');
   s = s.replace('Spionage','Kurs szpicla');
   s = s.replace('GeZi-Mockel','Biurowy ogier');
   s = s.replace('Bundestagspraktikum','Praktyka w sejmie');
   s = s.replace('Tarnen','Maskowanie i kamuflaż');
   s = s.replace('Einzelkämpfer','Walka w pojedynkę');
   s = s.replace('Freifallobst','Spady');
   s = s.replace('Blitzkrieg','Wojna błyskawiczna');
   s = s.replace('Marsch mit Gesang','Maszerowanie ze śpiewem');
   
   
   //-----//-----//----- Oddział //-----//-----//-----
   
   s = s.replace('Walkisstand', 'Kartoteka oddziałowa');
   s = s.replace('Soldaten Bonus','Bonus żołnierzy');
   s = s.replace('Oddziałn Bonus','Bonus oddziału');
   s = s.replace('Grundausbildung','Szkolenie podstawowe');
   s = s.replace('Schwerer Infanterist','Grenadier');
   s = s.replace('Pionier','Saper');
   s = s.replace('Sanitäter','Sanitariusz');
   s = s.replace('Aufklärer','Zwiadowca');
   s = s.replace('Nachschieber','Zaopatrzeniowiec');
   s = s.replace('Militärseelsorger','Kapelan')
   s = s.replace('Verdienst','Wynagrodzenia')
   s = s.replace('Moral','Morale')
   s = s.replace('Oddziałygründung:','Data założenia:')
   s = s.replace('Anzahl Członkowie:','Liczba żołnierzy:')
   s = s.replace('Geld:','Kasa:')
   s = s.replace('Ausbaustufen:','Poziom bazy:')
   s = s.replace('Teilnahme','Twój status')
   s = s.replace('INAKTIV','OBIBOK')
   s = s.replace('AKTIV','AKTYWNY')
   s = s.replace('Restzeit Anmeldung:','Pozostały czas zameldowania się:')
   s = s.replace('Ihr habt', 'Rozbudowaliście');
   s = s.replace('ausgebaut und erhaltet:', 'i otrzymujecie:');
   s = s.replace('Anzahl', 'Liczba');
   s = s.replace('Lebenspunkte:', 'Punkty życia');
   s = s.replace('Schaden:', 'Szkody');
   s = s.replace('Blockwert:', 'Blokowanie');
   s = s.replace('Heilung:', 'Gojenie');
   s = s.replace('Frontbericht', 'Raport z pola walki:');
   s = s.replace('Oberführungskommando', 'Dowództwo');
   s = s.replace('Ich habe gerade ein Manewry in der Liga', 'Rozpocząłem manewry w lidze');
   s = s.replace('gestartet!', '!');
   s = s.replace('Wir haben einen Angriff in der Liga', 'Atak w lidze');
   s = s.replace('gewonnen.', 'zakończył(a) się zwysięstwem!');
   s = s.replace('verloren.', 'zakończył(a) się porażką!');
   s = s.replace('Wir haben eine Verteidigung in der Liga', 'Obrona w lidze');
   s = s.replace('Zum Manewry', 'Szczegóły manewru');
   s = s.replace('Aktive Manewry:', 'Aktywne manewry w lidze:');
   s = s.replace('Ackerschnacker', 'Telefon polowy');
   s = s.replace('Czat in neuem Fenster öffnen (Beta)', 'Otwórz czat w nowym oknie');
   s = s.replace('Surowce einzahlen', 'Stan surowców:');
   s = s.replace('Schießbahn', 'Strzelnica');
   s = s.replace('Feldlager', 'Obóz');
   s = s.replace('Lazarett', 'Szpital');
   s = s.replace('Funkraum', 'Radiokabina');
   s = s.replace('Munitionsbunker', 'Bunkier z amunicją');
   s = s.replace('Kapelle', 'Kaplica');
   s = s.replace('Restzeit des Manewrys', 'Czas do końca manewru:');
   s = s.replace('Typ des Manewrys', 'Typ manewru:');
   s = s.replace('Angriff', 'ATAK');
   s = s.replace('Verteidigung', 'OBRONA');
   s = s.replace('Teilnehmer:', 'Liczba uczestników:');
   s = s.replace('Bezeichnung', 'Specjalizacja');
   s = s.replace('Du hast dich erfolgreich zum Manewry angemeldet.', 'Bierzesz udział w manewrach');

   
   
   //-----//-----//----- Ogólne //-----//-----//-----
   
   s = s.replace('Der momentane Służba wurde abgebrochen', 'Obecna służba została przerwana');
   s = s.replace('Służbabeginn', 'Początek służby');
   s = s.replace('Die Szkolenie wurde gestartet.', 'Szkolenie zostało rozpoczęte');
   s = s.replace('Spende abholen!','Odbierz dietę!');
   s = s.replace('Du bist','Jesteś');
   s = s.replace('von:','od:');
   s = s.replace('und erhältst:','i otrzymujesz:');
   s = s.replace('Stufe','Na poziomie');
   s = s.replace('Nächste Na poziomie','Następny poziom');
   s = s.replace('Na poziomien im Baza', 'poziomów bazy');
   s = s.replace('Spezialisierung','Specjalizacja');
   s = s.replace('Position','Pozycja');
   s = s.replace('Registriert seit','Zarejestrowany od');
   s = s.replace('Versicherungsbetrag','Kwota ubezpieczenia');
   s = s.replace('Jetzt deine Soldatenspende abholen!','Odbierz teraz żołnierską dietę!');
   s = s.replace('Heutige Spenden','Dzisiejsze datki');
   s = s.replace('Schwarzes Brett','Tablica Ogłoszeń');
   s = s.replace('Kompanieantreten - sei auch morgen wieder dabei und hole dir deine Belohnung!','Zbiórka kompanii – bądź z nami każdego dnia i odbierz swoją nagrodę!');
   s = s.replace('Kreiswehrersatzamt - Einberufungsbescheid verschicken und neue Koledzy einladen!','Okręgowa Wojskowa Komenda Uzupełnień – wyślij swoim znajomym powołanie do wojska!');
   s = s.replace('Anzeige','ogłoszenia');
   s = s.replace('Verliehene Ordery','Przyznane Ordery');
   s = s.replace('So könnte deine Tablica aussehen','Edytuj tablicę wewnętrzną');
   s = s.replace('Tablica anpassen','Dostosuj tablice');
   s = s.replace('Sichtbarkeit anpassen','Dostosuj ustawienia widzialności');
   s = s.replace('Noch keine Ordery verliehen oder z dir ausgeblendet.','Nie przyznano jeszcze żadnych orderów');
   s = s.replace('Vorname','Imię');
   s = s.replace('Nachname','Nazwisko');
   s = s.replace('Geschlecht','Płeć');
   s = s.replace('Wohnort','Miejsce zamieszkania');
   s = s.replace('Standort','Lokalizacja');
   s = s.replace('Teilstreitkraft','Rodzaj sił zbrojnych');
   s = s.replace('Oddziałngattung','Rodzaj wojsk');
   s = s.replace('Homepage','Witryna internetowa');
   s = s.replace('Datum','Data');
   s = s.replace('Gegner','Przeciwnik');
   s = s.replace('Punkte','Punkty');
   s = s.replace('Beute','Zdobycz :D');
   s = s.replace('Beenden','Zakończ');
   s = s.replace('Rang','Ranga');
   s = s.replace('Feldpost','Poczta polowa');
   s = s.replace('Alle Walkie','Wszystkie walki');
   s = s.replace('Name','Imię');
   s = s.replace('Deine ignorierten User','Ignorowani przez ciebie użytkownicy');
   s = s.replace('noch keine User','na razie brak użytkowników');
   s = s.replace('Uvd','Służba podoficera');
   s = s.replace('Einsätze','Misje');
   s = s.replace('Einladungen','Zaproszenia');
   s = s.replace('Dusche','Prysznic');
   s = s.replace('Dein Soldatenprofil','Twój profil żołnierza');
   s = s.replace('Służba schieben','Pełnienie służby');
   s = s.replace('Auslandseinsatz','Misja zagraniczna');
   s = s.replace('UvD Służba','Służba podoficera dyżurnego');
   s = s.replace('Koszarynhof aufräumen','Posprzątaj koszary');
   s = s.replace('Deine','Twoje');
   s = s.replace('Informationen','Informacje');
   s = s.replace('Absender','Nadawca');
   s = s.replace('Nachricht','Wiadomość');
   s = s.replace('Soldaten','Żołnierze');
   s = s.replace('Suche','Wyszukaj');
   s = s.replace('Teilstreitkräfte','Siły zbrojne');
   s = s.replace('Lokalizacjae','Lokalizacja');
   s = s.replace('Oddziałn','Oddział');
   s = s.replace('Wiadomość beantworten','Odpowiedz na wiadomość');
   s = s.replace('Wiadomość archivieren','Przenieść wiadomość do archiwum');
   s = s.replace('Wiadomość löschen','Usuń wiadomość');
   s = s.replace('Der Eintrag wurde erfolgreich gespeichert.','Wpis został dodany');
   s = s.replace('Schulterglatze Musik-TV','Eska Rock :)');
   s = s.replace('Die Wiadomość wurde gesendet.', 'Wiadomość została wysłana.');
   s = s.replace('Einträge', 'wpisów');
   s = s.replace('Aktuelle Szkolenieen', 'Aktualne szkolenia');
   s = s.replace('1 Szkolenieen', '1 szkolenie');
   s = s.replace('Szkolenieen', 'szkolenia');
   s = s.replace('Warteschlange', 'Aktualna kolejka szkoleń:');
   s = s.replace('Szkolenie 30% verkürzen?', 'Skrócić szkolenie o 30%?');
   s = s.replace('Ende:', 'Koniec o:');
   s = s.replace('wartet ...', 'oczekujące...');
   s = s.replace('Jetzt Szkolenie verkürzen!', 'Skróć teraz szkolenie!');
   s = s.replace('Oddziałyausbildung', 'Zmiana specjalizacji');
   s = s.replace('Zusätzliche Szkolenie in die Aktualna kolejka szkoleń: packen ...', 'Wstaw dodatkowe szkolenie do kolejki oczekujących ...');
   s = s.replace('Kosten:', 'Koszty:');
   s = s.replace('zzgl. 5 Patronen, wenn Szkolenie mit Credits gestartet wird!', 'z doliczeniem 5 nabojów, jeśli szkolenie zostanie rozpoczęte za pomocą credits!');
   s = s.replace('Neue Oddziałyausbildung:', 'Nowa specjalizacja:');
   s = s.replace('Patronen', 'Pestek');
   s = s.replace('kostenfrei!', 'Gratis!');
   s = s.replace('Szkolenie starten', 'Rozpoczęcie szkolenia');
   s = s.replace('Personalstammblatt', 'Kartoteka personalna');
   s = s.replace('Jetzt deine Żołnierzespende abholen!', 'Odbierz swoją dietę');
   s = s.replace('Tag', 'Dzień');
   s = s.replace('Manewry Informacje', 'Informacje:');
   s = s.replace('Achtung, Feind in Sicht', 'Uwaga wróg na horyzoncie w lidze');
   s = s.replace('Achtung, Mobilmachung', 'Uwaga, mobilizacja w lidze');
   s = s.replace('Wiadomośćen', 'wiadomości');
   s = s.replace('von ', 'z ');
   s = s.replace('Oddział Profilansicht', 'Profil oddziału');
   s = s.replace('TablicaBesucher:', 'Liczba wyświetleń');
   s = s.replace('Eingetreten', 'Wstąpiono:');
   s = s.replace('[Na poziomie] Klasse', '[Poziom] Specjalizacja');
   s = s.replace('Członkowie der Oddział', 'Członkowie oddziału');
   s = s.replace('interne Tablica', 'Dostosuj tablice');
   s = s.replace('Eure aktiven Sojusze der Oddział', 'Sojusznicy naszego oddziału');
   s = s.replace('Oddziałybündnisinfo', 'Informacje o sojuszach');
   s = s.replace('Oddziałyprofil', 'Profil oddziału');
   s = s.replace('externe Tablica editieren', 'Edytor profilu oddziału');
   s = s.replace('Dostosuj tablice editieren', 'Edytor tablicy oddziałowej');
   s = s.replace('Oddziałybild ändern', 'Zmień logo oddziału');
   s = s.replace('Passwort ändern', 'Zmiana hasła do oddziału');
   s = s.replace('Passwort zurücksetzen', 'Reset hasła do oddziału');
   s = s.replace('Oddział verlassen', 'Opuść oddział');
   s = s.replace('Oddziałyführung übertragen', 'Przekazanie dowództwa');
   s = s.replace('Oddział auflösen', 'Rozwiązanie oddziału');
   s = s.replace('Lottoziehung vom', 'Losowanie totka z dnia');
   s = s.replace('Glückwunsch, du hast die Zielscheibe zerschossen.', 'Gratulujemy! Rozstrzelałeś tarczę w drobny mak.');
   s = s.replace('Du hast dich erfolgreich zur Nocna sł. wart. angemeldet.', 'Zameldowałeś się na nocną wartę.');
   s = s.replace('Die Nocna sł. wart.', 'Nocna służba wartownicza');
   s = s.replace('Wachsoldaten', 'wartowników');
   s = s.replace('Aktive Manewry', 'Aktywne manewry');
   s = s.replace('Angreifbare Oddziały', 'Jednostki możliwe do zaatakowania');
   s = s.replace('Twoje Feindesliste', 'Wasi wrogowie');
   s = s.replace('Feinde', 'wrogich oddziałów');
   s = s.replace('Die letzten 10 Manewry', '10 ostatnich manewrów');
   s = s.replace('Alle Manewry anzeigen', 'Wszystkie wasze manewry');
   s = s.replace('gesamt', 'łącznie');
   s = s.replace('Geld', 'Kasa');
   s = s.replace('Surowce tauschen', 'Wymień surowce');
   s = s.replace('Wähle einen Rohstoff:', 'Wybierz surowiec do wymiany:');
   s = s.replace('Wähle einen Tauschrohstoff:', 'Wybierz surowiec na który wymieniasz:');
   s = s.replace('Transaktionen', 'Transakcje');
   s = s.replace('Zement', 'Cement');
   s = s.replace('Panzertape', 'Taśma klejąca');
   s = s.replace('Holz', 'Drewno');
   s = s.replace('Zielscheibe', 'Tarcze strzeleckie');
   s = s.replace('Infusion', 'Infuzja');
   s = s.replace('Antenne', 'Antena');
   s = s.replace('Munitionskiste', 'Skrzynia z amunicją');
   s = s.replace('Rosenkranz', 'Różaniec');
   s = s.replace('Spaten', 'Łopata');
   s = s.replace('Schokolade', 'Czekolada');
   s = s.replace('Rohstoff', 'Surowiec');
   s = s.replace('sofort', 'natychmiast');
   s = s.replace('Nur ein Wynagrodzenia zur selben Zeit möglich', ' Możliwe jest tylko jedno wynagrodzenie');
   s = s.replace('Nächster UvD möglich am', 'Następny termin służby podoficera dyżurnego możliwy w dniu');
   s = s.replace('Gesamtverdienst:', 'Całość wynagrodzenia:');
   s = s.replace('daz Anwartschaft:', 'z tego do skarpety wpadnie:');
   s = s.replace('Auszahlungsbetrag:', 'Kwota do wypłaty:');
   s = s.replace('Wöchentliches Kontingent:', 'Tygodniowy kontyngent:');
   s = s.replace('Wynagrodzenia bei ', 'Wynagrodzenia za ');
   s = s.replace('Stunden', 'h ');
   s = s.replace('Kisten', 'skrzynek');
   s = s.replace('Nächster Einsatz möglich am', 'Następny termin wyjazdu na misję zagraniczną');
   s = s.replace('Wynagrodzenia UvD:', 'Wynagrodzenia służpa podoficera:');
   s = s.replace('Gesammelte skrzynek:', 'Liczba zebranych skrzyek:');
   s = s.replace('Zug', 'Pluton');
   s = s.replace('Strzelnica wurde erfolgreich in Na poziomie', 'Strzelnica została rozbudowana na poziomie');
   s = s.replace('ausgebaut.', '.');
   s = s.replace('Szpital wurde erfolgreich in Na poziomie', 'Szpital został rozbudowany na poziomie');
   s = s.replace('Radiokabina wurde erfolgreich in Na poziomie', 'Radiokabina została rozbudowana na poziomie');
   s = s.replace('Kaplica wurde erfolgreich in Na poziomie', 'Kaplica została rozbudowana na poziomie');
   s = s.replace('Endgegner:', 'BigBoss:');
   s = s.replace('Der Endgegner verschwindet in:', 'BigBoss znika za:');
   s = s.replace('Belohnung:', 'Nagroda:');
   s = s.replace('Kosten für ATAK:', 'Koszty wykonania ataku:');
   s = s.replace('4 Ausdauer', '4 Wytrzymałości');
   s = s.replace('Besiegte BigBoss', 'Pokonani Wielcy Szefowie');
   s = s.replace('Schnellsuche', 'Wyszukiwanie');
   s = s.replace('Soldat', 'Żołnierz');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
   s = s.replace('', '');
  
  
   
   node.data = s;
}


    //-----//-----//----- Muzyka //-----//-----//-----
    /* Tu możecie dodaś swoją ulubioną stację czy co kolowiek chcecie, wystarczy zmienić link
       http://www.eskago.pl/radio/eska-rock na inny ;) */
       
    var regExp = /schulterglatze-gamesgroup-musiktv\.myvideo.de\//i;
    if (regExp.test(window.location.href))
    window.location.href = "http://www.eskago.pl/radio/eska-rock";

		