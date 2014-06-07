// ==UserScript==
// @name stiddari.de.TraduzioneITA
// @author mobster, mozzicone
// @description Traduce tutte le pagine del gioco dal tedesco all'italiano
// @include http://test.de.stiddari.com*
// ==/UserScript==
//




(function() {

//Riepilogo
if (location.pathname.search('overview.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Truppen)\b/g, 'Truppe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Übersicht der Einheiten)\b/g, 'Visualizza Unita');
document.body.innerHTML = document.body.innerHTML.replace(/ändern/g, 'Cambia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unita');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigung)\b/g, 'Difesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Punti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Numero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfstärke)\b/g, 'Forza di Scontro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gesamtübersicht)\b/g, 'Vista Globale');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Details)\b/g, 'Dettagli');
}

//Stanze
if ((location.pathname.search('konst.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chefbüro)\b/g, 'Ufficio del Boss');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildungsraum)\b/g, 'Campo Allenamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armeria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabbrica di Munizioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Distilleria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabbando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenlager)\b/g, 'Magazzino delle Armi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionsdepot)\b/g, 'Magazzino delle Munizioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohollager)\b/g, 'Magazzino degli Alcolici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Tresorraum)\b/g, 'Cassaforte');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Campo Addestramento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Selbstschussanlagen)\b/g, 'Torrette');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Versteckte Minen)\b/g, 'Mine');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbau Stufe)\b/g, 'Costruisci Livello');
}

//Addestramento
if ((location.pathname.search('off.php') != -1) || (location.pathname.search('stats.php') != -1)) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schläger)\b/g, 'Picchiatore');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Türsteher)\b/g, 'Buttafuori');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Messerstecher)\b/g, 'Bandito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Revolverheld)\b/g, 'Pistolero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Besetzungstruppe)\b/g, 'Truppa di Occupazione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spion)\b/g, 'Spia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Möbelpacker)\b/g, 'Imballatore');
document.body.innerHTML = document.body.innerHTML.replace(/\b(CIA Agent)\b/g, 'Agente CIA');
document.body.innerHTML = document.body.innerHTML.replace(/\b(FBI Agent)\b/g, 'Agente FBI');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trasporteur)\b/g, 'Trasportatore');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Probleml�ser)\b/g, 'Risolutore di Problemi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Scharfsch�tze)\b/g, 'Cecchino');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Profikiller)\b/g, 'Killer');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenleger)\b/g, 'Artificiere');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Söldner)\b/g, 'Mercenario');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Attentäter)\b/g, 'Flash Gordon ');

}

//Sicurezza
if (location.pathname.search('deff.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schwarzgeldarbeiter)\b/g, 'Lavoratori Clandestini');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektwache)\b/g, 'Sentinelle');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bodyguard)\b/g, 'Guardia del Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guarde)\b/g, 'Guardia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Polizist)\b/g, 'Poliziotto');

}

//Allenamento
if (location.pathname.search('forsch.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ehre)\b/g, 'Onore');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chemische Ausbildung)\b/g, 'Addestramento Chimico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Psychisches Training)\b/g, 'Allenamento Fisico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Guerillaasubildung)\b/g, 'Addestramento alla Guerriglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bombenbau)\b/g, 'Costruzione di Bombe');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schusstraining)\b/g, 'Allenamento al Tiro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kurzwaffenkampf)\b/g, 'Addestramento all Arma Bianca');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nahkampf)\b/g, 'Combattimento Corpo a Corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gruppenschutz)\b/g, 'Protezione del Gruppo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Informationsbeschaffung)\b/g, 'Raccolta Informationi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basisverwaltung)\b/g, 'Gestione del Reddito');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schutzgeldeintreibung)\b/g, 'Riscossione del Pizzo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftragsplanung)\b/g, 'Pianificazione della Missione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Routenplanung)\b/g, 'Pianificazione del Percorso');
}

// Lista Edifici
if (location.pathname.search('camps.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici/Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Stanze');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Punti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Restdauer)\b/g, 'Tempo Restante');
document.body.innerHTML = document.body.innerHTML.replace(/\b(auflösen)\b/g, 'Elimina');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Änderungen speichern)\b/g, 'Salva le modifiche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Name)\b/g, 'Nome');
}

// Cerca
if (location.pathname.search('suche.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Cerca');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Stanze');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Punti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Cerca');
}

// Target List - Lista farm
if (location.pathname.search('targetlist.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Los!)\b/g, 'Via!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici/Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielname)\b/g, 'Nome Obiettivo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Elimina');
}

// Taglia
if (location.pathname.search('bounty*') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld Vergeben)\b/g, 'Assegna Taglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Topf Ausbezahlen)\b/g, 'Ritira Premio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Top 50 Kopfgelder)\b/g, 'Taglie Top 50');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoff)\b/g, 'Risorsa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Pott)\b/g, 'Quantita in Palio');
document.body.innerHTML = document.body.innerHTML.replace(/Auszahlen/gi, 'Ritira');
document.body.innerHTML = document.body.innerHTML.replace(/\b(erarbeitetes Kopfgeld)\b/g, 'Taglia Guadagnata');
document.body.innerHTML = document.body.innerHTML.replace(/\b(zahl mich aus!)\b/g, 'dammi il premio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suchen)\b/g, 'Cerca');

}

// Famiglia
if (location.pathname.search('ally.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Diplomatie)\b/g, 'Diplomazia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglied)\b/g, 'Membro');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mitglieder)\b/g, 'Membri');
document.body.innerHTML = document.body.innerHTML.replace(/\b(senden)\b/g, 'invia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Scrivi Messaggio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz verlassen)\b/g, 'Abbandona Famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzbeschreibung)\b/g, 'Descrizione di Famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Beschreibung)\b/g, 'nessuna descrizione');
}

// Risorse
if (location.pathname.search('res.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Grundeinkommen)\b/g, 'Produzione di Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Lagerkapazität)\b/g, 'Capacita Magazzini');
document.body.innerHTML = document.body.innerHTML.replace(/\b(davon sicher untergebracht)\b/g, 'di cui non rubabile');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffenkammer)\b/g, 'Armeria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionskammer)\b/g, 'Fabbrica di Munizioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Brauerei)\b/g, 'Distilleria');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kneipe)\b/g, 'Bar');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Schmuggel)\b/g, 'Contrabbando');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stunde)\b/g, '(Ora)');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificio');
}

// Missioni
if (location.pathname.search('unit.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Geschwindigkeit)\b/g, 'velocita');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Neuen Einsatz planen)\b/g, 'Pianifica Missione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielcamp)\b/g, 'Edificio Bersaglio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Auftrag)\b/g, 'Missione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angreifen)\b/g, 'Attacca');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten stationieren)\b/g, 'Staziona');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe Transportieren)\b/g, 'Trasporta Risorse');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude besetzen)\b/g, 'Occupa Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nur bei Transport und Stationieren)\b/g, 'Solo Trasporto e Stazionamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktualisieren)\b/g, 'Refresh');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Entfernung)\b/g, 'Distanza');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzkosten)\b/g, 'Stipendi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ladekapazität)\b/g, 'Capacità di carico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsatzzeit)\b/g, 'Durata missione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ankunft)\b/g, 'Arrivo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauschleife)\b/g, 'Coda di Addestramento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Keine Einheiten)\b/g, 'Nessuna Unita');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unita');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Numero');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffswert)\b/g, 'Valore di Attacco');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungswert)\b/g, 'Valore di Difesa');
}

// Mappa
if (location.pathname.search('map.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadt)\b/g, 'Citta');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtteil)\b/g, 'Quartiere');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Infos)\b/g, 'Informazioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici/Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Punti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianz)\b/g, 'Famiglia');
}


//Messaggi
if (location.pathname.search('msg.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bauabschluss)\b/g, 'Costruzioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielernachrichten)\b/g, 'Messaggi Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kampfberichte)\b/g, 'Combat Report');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Scrivi Messaggio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(von)\b/g, 'di');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Datum)\b/g, 'Data');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Markierte Nachrichten löschen)\b/g, 'Elimina Messaggi Evidenziati');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Betreff)\b/g, 'Contenuto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfänger)\b/g, 'Destinatario');

}

// Classifica
if (location.pathname.search('score.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte)\b/g, 'Punti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Allenamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einheiten)\b/g, 'Unità');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl Gebäude)\b/g, 'Num.Edifici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Titel)\b/g, 'Grado');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 7 Tage inaktiv)\b/g, 'Player inattivo da 7 gg');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler 14 Tage inaktiv)\b/g, 'Player inattivo da 14 gg');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler im Urlaub)\b/g, 'Player in mod.vacanza');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler gesperrt)\b/g, 'Player bloccato');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Mächtige Leibwache)\b/g, 'Potente Guardia del corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kämpferische Leibwache)\b/g, 'Combattiva guardia del corpo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Leibwache)\b/g, 'Guardia del corpo');

}

// Amici
if (location.pathname.search('buddy.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler hinzufügen)\b/g, 'Aggiungi Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anfragen von Spielern)\b/g, 'Richieste da altri Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(löschen)\b/g, 'Elimina');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Online werden alle Freunde angezeigt, welche in den letzten 15 Minuten mindestens eine Aktion)\b/g, 'Vengono mostrati Online, tutti gli amici risultanti attivi negli ultimi 15 minuti.');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast noch keine bestätigten Freunde!)\b/g, 'Al momento non hai Amici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Als Freund einladen.)\b/g, 'Invita come amico');

}

// Statistiche
if (location.pathname.search('stats.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Höchste Stufe)\b/g, 'Record');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stufe)\b/g, 'Livello');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Raum)\b/g, 'Stanze');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Allenamenti');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Die meisten Einheiten)\b/g, 'Unità in un edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Anzahl)\b/g, 'Numero');
}

// Chat
if (location.pathname.search('chat.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Flüstern)\b/g, 'Flüstern');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Messaggio');
document.body.innerHTML = document.body.innerHTML.replace(/Sagen!/g, 'Condividi!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Unsichtbare)\b/g, 'Invisibili');
document.body.innerHTML = document.body.innerHTML.replace(/\b(online Anzeige)\b/g, 'Annuncio online');
document.body.innerHTML = document.body.innerHTML.replace(/\"\/on\" in den Chat schreiben/g, 'scrivi \"/ON\" in chat (Unsichtbare --> player invisibili in chat)');
}

// Configurazione - Opzione
if (location.pathname.search('config.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Empfohlen: Alle Einstellungen auf "an" lassen)\b/g, 'Consigliato tenere attivate tutte le opzioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(weitere Einstellungen)\b/g, 'Impostazioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(allgemeine)\b/g, 'Generali');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Sharing melden)\b/g, 'Segnala IP-Sharing');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spielername)\b/g, 'Nome in Game');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du kannst erst wieder in)\b/g, 'Solo tra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(deinen Namen ändern.)\b/g, 'puoi cambiare il tuo nome.');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen Accountsicherheit)\b/g, 'Impostazioni di Sicurezza');
document.body.innerHTML = document.body.innerHTML.replace(/\b(IP-Bindung)\b/g, 'Blocca IP');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Cookie-Bindung)\b/g, 'Blocca Cookies');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Autologout)\b/g, 'Logout Automatico');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aus)\b/g, 'disattivato');
document.body.innerHTML = document.body.innerHTML.replace(/\b(an)\b/g, 'attivato');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht)\b/g, 'Messaggio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Chat Einstellungen)\b/g, 'Impostazioni Chat');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Angriff)\b/g, 'Attacco');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Stationieren)\b/g, 'Stazionamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Transport)\b/g, 'Trasporto');
document.body.innerHTML = document.body.innerHTML.replace(/\b(bei Campgründung)\b/g, 'Edificio Occupato');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allgemeine Einstellungen)\b/g, 'Impostazioni Generali');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sichtbar in Useronlineliste)\b/g, 'Visibile nella lista utenti online');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortierung der Camps)\b/g, 'Ordine Edifici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sortiermethode)\b/g, 'Ordina per');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gründung)\b/g, 'Occupazione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Koordinaten)\b/g, 'Coordinate');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aufsteigend)\b/g, 'Crescente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Absteigend)\b/g, 'Decrescente');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus)\b/g, 'Modalita Vacanza');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Urlaubsmodus aktivieren)\b/g, 'Attiva Modalita Vacanza');

}

// Immagini
if (location.pathname.search('img.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Bildern)\b/g, 'Immagini');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Durchsuchen)\b/g, 'Sfoglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(hochladen)\b/g, 'Carica');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Hochgeladene Bilder)\b/g, 'Immagini Caricate');

}

// Giocatore - info click su player
if (location.pathname.search('player.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Spieler)\b/g, 'Player');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte Camps)\b/g, 'Punti Edificio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte Forschung)\b/g, 'Punti Allenamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Punkte Einheiten)\b/g, 'Punti Unità');
document.body.innerHTML = document.body.innerHTML.replace(/\b(aussetzen)\b/g, 'mostra');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachricht schreiben)\b/g, 'Invia messaggio');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Taglia');
}

// Descrizione unità
if (location.pathname.search('info.php') != -1) {
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verbrauch)\b/g, 'Costo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Basis)\b/g, 'Di Base');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Aktuell)\b/g, 'Attuale');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Voraussetzung)\b/g, 'Necessita di');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Angriffsbonus)\b/g, 'Bonus di Attacco');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Verteidigungsbonus)\b/g, 'Bonus di Difesa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Beschreibung)\b/g, 'Descrizione');
}

//Menù
document.body.innerHTML = document.body.innerHTML.replace(/Übersicht/g, 'Riepilogo');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume im Ausbau)\b/g, 'Stanze in Costruzione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Räume)\b/g, 'Stanze');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Trainingslager)\b/g, 'Addestramento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Objektschutz)\b/g, 'Sicurezza');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Ausbildung)\b/g, 'Allenamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Gebäude)\b/g, 'Edifici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Suche)\b/g, 'Cerca');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Zielliste)\b/g, 'Lista Farm');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Kopfgeld)\b/g, 'Vista Taglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Technik)\b/g, 'Tecniche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Allianzen)\b/g, 'Famiglia');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Rohstoffe)\b/g, 'Risorse');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einsätze)\b/g, 'Missioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Stadtkarte)\b/g, 'Vista Mappa');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Nachrichten)\b/g, 'Messaggi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Highscore)\b/g, 'Classifica');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Freunde)\b/g, 'Amici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Statistiken)\b/g, 'Statistiche');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Regeln)\b/g, 'Regolamento');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Einstellungen)\b/g, 'Opzioni');
document.body.innerHTML = document.body.innerHTML.replace(/Bilder Upload/g, 'Carica Immagine');
document.body.innerHTML = document.body.innerHTML.replace(/Spenden/g, 'Offerte');

//Menu alto risorse
document.body.innerHTML = document.body.innerHTML.replace(/\b(Serverzeit)\b/g, 'Ora Server');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Waffen)\b/g, 'Armi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munitionen)\b/g, 'Munizioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Munition)\b/g, 'Munizioni');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Alkohol)\b/g, 'Alcolici');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Dollar)\b/g, 'Dollari');

// Varie ed eventuali
document.body.innerHTML = document.body.innerHTML.replace(/\b(Fehler!)\b/g, 'Errore!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Seitenaufbau in)\b/g, 'Caricamento Pagina in');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Sekunden)\b/g, 'Secondi');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Du hast hier kein)\b/g, 'Non possiedi:');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Produktion)\b/g, 'Produzione');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Erfolgreich!)\b/g, 'Successo!');
document.body.innerHTML = document.body.innerHTML.replace(/\b(Deine Unita machen sich auf den Weg.)\b/g, 'Le tue unità si stanno avviando verso il suo edificio!');




})();