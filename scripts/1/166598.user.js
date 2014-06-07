// ==UserScript==
// @name            MonsterWorld Link klicker
// @namespace       MonsterWorld Link klicker
// @description     Öffnet automatisch MonsterWorld Links aus Facebook-Gruppen
// @include         http*://*.facebook.com/*
// @include         http://handysurfer.blogspot.*/*
// @exclude         http*://*.facebook.com/dialog/*
// @exclude         http*://*.facebook.com/plugins/*
// @exclude         http*://*.facebook.com/widgets/*
// @exclude         http*://*.facebook.com/connect/*
// @exclude         http*://apps.facebook.com/*
// @exclude         http*://*.ak.facebook.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require         http://wogartencenter.de/js/hilfsfunktionen.js
// @require         http://wogartencenter.de/js/jquery.crypt.js
// @copyright       Anaximelis
// @author          Anaximelis
// @run-at 			document-end
// @noframes
// @version         0927
// @license         http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @grant           GM_log
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           unsafeWindow
// ==/UserScript==

///////////////////////////////////////////////////////////////////////////////
// Dieses Werk bzw. dieser Inhalt darf nicht bearbeitet, abgewandelt
// oder in anderer Weise verändert werden.
//
// This work and this content must not be processed, modified or 
// altered in any way.
//
// email: anaximelis(at)linkklicker(dot)de
///////////////////////////////////////////////////////////////////////////////


(function () {
    var txt = {
        de: {
            buttons: {
                stop: 'Anhalten',
                reset: 'Fertig',
                options: 'Einstellungen',
                save: 'Speichern',
                abbort: 'Abbrechen',
                help: 'Hilfe',
                go: 'ok'
            },
            options: {
                options: 'Optionen',
                searchFBID: 'Facebook-ID suchen',
                windowpos: 'Position',
                usewindows: 'Gleichzeitige Anfragen',
                delay: 'Wartezeit nach Link-klick',
                delayLike: 'Wartezeit nach "Gefällt mir"',
                writeemail: 'email schreiben',
                lkuserscripts: 'Link Klicker auf userscripts.org',
                language: 'Sprache',
                dbmax: 'Stoppe DB-Modus nach ',
                stopafterlimreach: 'Nach erreichen des Tageslimits anhalten',
                usestore: 'Local Storage nutzen'
            },
            tag: {
                windowpos: '"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
                usewindows: '"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
                delay: '"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
                delaylike: '"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
                dbmax: '"Automatisch Anhalten nach x abgearbeiteten Links aus der WGC-Datenbank"'
            },
            error: {
                valueoutofrange: 'Wert außerhalb des Zulässigen Bereiches',
                error: 'Fehleingabe',
                cantreadcontent: 'kann nicht ausgelesen werden. Format ist unbekannt.',
                linkintogame: 'Dieser Link führt ins Spiel',
                cantfindkey: 'signed_request-Key konnte nicht gefunden werden. Bei Facebook eingelogt?',
                onerror_fb: 'Der Facebook-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
                onerror_wooga: 'Der Monser World-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
                timeout: 'Die Anfrage für diesen Link wurde nicht in der vorgegebenen Zeit beantwortet.',
                statuserr: 'meldet einen Verbindungsfehler',
                linkisold: 'Diser Link wurde bereits von dir geklickt'
            },
            string: {
                like: 'Gefällt mir',
                starsdbbonus: 'Geschlossene Gruppe. Nur für Betatester.',
                starsdbwoogo: 'WoGartenCenter ist ein Datenbank für Woogoo- und Pflanzenlinks.\nStell deine Links ein und klick die der Anderen.\nJeder Monster World Spieler ist willkommen.\n(Anmeldung erforderlich)\n\nhttps://wogartencenter.de',
                insertlinks: 'Kopiere deine Links in dieses Feld, dann drücke START\n\nTip:\nDu kannst auch unsinnigen Text mit in dieses Fenster einfügen.\nDie Links werden herausgefiltert.',
                lrready: 'Monster World Link Klicker ist gestartet',
                running: 'läuft',
                end: 'beendet',
                woogo: "Woogoo",
                plants: "Pflanzen",
                ignored: "Verworfen",
                found: "Gefunden",
                stars: "Sterne",
                time: 'Zeit'
            },
            mode: {
                mode1: 'Facebook (mit like)',
                mode2: 'Facebook (ohne like)',
                mode3: 'WoGartenCenter - DB',
                mode4: 'Alle Links dieser Seite',
                mode5: 'Links von Hand einfügen',
                mode6: 'WGC - Testarea',
                mode7: 'Markierungsmodus',
                mode8: 'Fetch and Hide'
            },
            message: {
                message102: 'Links vom Server empfangen. Starte Vorgang.',
                message104: 'Empfang der Daten wurde vom Server bestätigt',
                message1041: 'Loop-Modus | Neue Anfrage wird gestartet',
                askforlinks: 'Frage Server nach Links. Bitte warten ...',
                searchforfb: 'Suche nach Facebook-Login ...',
                cantfindfb: 'Facebook-ID konnte nicht ermittelt werden',
                foundfb: 'Facebook-ID gefunden',
                preparestart: 'Bereite Start vor',
                requested: 'Anfrage an Server gestellt...',
                nonewlinks: 'Keine neuen Links vorhanden',
                waitforlike: 'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
                from: 'von',
                klicklike: 'Klicke "Gefällt mir"',
                linkscalled: 'Links aufgerufen',
                ok: 'ok',
                expired: 'Abgelaufen',
                unknown: 'Unbekannt',
                intogame: 'geht ins Spiel',
                pagelet_wall: "Private-Pinnwand gefunden",
                pagelet_group_mall: "Gruppen-Pinnwand gefunden",
                pagelet_home_stream: "Eigene-Pinnwand gefunden",
                pagelet_notfound: "Keine Facebook Pinnwand gefunden",
                startsearch: "Beginne Suche nach Links",
                dnotfoundlnk: "Keine MW Links gefunden",
                dnotfoundfhlnk: 'Keine Links für Fetch and Hide gefunden',
                serverconerr: "Bei der Kommunikation mit dem Server ist ein Fehler aufgetreten",
                senddata: 'Übermittle Ergebnisse an den Server. Bitte warten ...',
                userabbord: 'Abbruch durch Benutzer',
                msgfrommw: 'Nachricht von Monster World: '
            },
            prompt: {
                imonfb: 'Du startest den Klicker außerhalb von Facebook. Stell sicher, dass du bei FB eingelogt bis.\nWeiter machen?',
                linksinqueue: 'x "Gefällt mir" in der Warteschlange'
            }
        },
        nl: {
            buttons: {
                stop: 'Stoppen',
                searchFBID: 'Facebook-ID suchen',
                reset: 'Klaar',
                options: 'Instellungen',
                save: 'Opslaan',
                abbort: 'Annuleren',
                help: 'Help',
                go: 'ok'
            },
            options: {
                options: 'Opties',
                windowpos: 'Vensterpositie',
                usewindows: 'Gelijktijdige aanvragen',
                delay: 'Vertraging',
                delayLike: 'Wachttijd - Like',
                writeemail: 'Email sturen',
                lkuserscripts: 'Link Klicker op userscripts.org',
                language: 'Taal',
                dbmax: 'Stoppe DB-Modus nach ',
                stopafterlimreach: 'Na het bereiken van de dagelijkse aanslag',
                usestore: 'Local Storage nutzen'
            },
            tag: {
                windowpos: '"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
                usewindows: '"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
                delay: '"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
                delaylike: '"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
                dbmax: '"Automatisch Anhalten nach x abgearbeiteten Links aus der WGC-Datenbank"'
            },
            error: {
                valueoutofrange: 'Waarde ligt buiten het toelaatbare bereik',
                error: 'error',
                cantreadcontent: ' kan niet uitgelezen worden. Gaat wellicht naar het spel ',
                linkintogame: 'Dieser Link führt ins Spiel',
                cantfindkey: 'signed_request-Key niet gevonden. Bij Facebook aangemeld?',
                onerror_fb: 'De Facebook-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
                onerror_wooga: 'De Monster World-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
                timeout: 'Aanvraag kan niet binnen de tijd verwerkt worden.',
                statuserr: 'meldet einen Verbindungsfehler',
                linkisold: 'Diser Link wurde bereits von dir geklickt'
            },
            string: {
                like: 'Vind ik leuk',
                starsdbbonus: 'Gesloten groep. Alleen Betatesters.',
                starsdbwoogo: 'WoGartenCenter is een Databank voor Woogoo- en plantenlinks.\nVoeg je eigen links toe en klik die van anderen.\nIedere Monster World Speler is welkom.\n(Aanmelding verplicht)\n\nhttps://wogartencenter.de',
                insertlinks: 'Plak hier je links en druk op start\n\nTip:\nEr mag ook onzin bij staan.\nDe Links worden eruit gefiltert.',
                lrready: 'Monster World Link Klicker werd gestart',
                running: 'loopt',
                end: 'beëindigt',
                woogo: "Woogoo",
                plants: "planten",
                ignored: "genegeerd",
                found: "gevonden",
                stars: "Sterren",
                time: 'Zeit'
            },
            mode: {
                mode1: 'Facebook (klik Vind ik leuk)',
                mode2: 'Facebook (zonder vind ik leuk)',
                mode3: 'WoGartenCenter - DB',
                mode4: 'Alle Links van deze pagina',
                mode5: 'Links handmatig invoeren',
                mode6: 'WGC - Testarea',
                mode7: 'Markeermodule',
                mode8: 'Fetch and Hide'
            },
            message: {
                message102: 'Links van de Server ontvangen. Het feest kan beginnen.',
                message104: 'DAta ontvangst door server bevestigd',
                message1041: 'Loop-modus | Nieuwe aanvraag wordt gestart',
                askforlinks: 'Vraagt server om links. Eventjes geduld aub ...',
                searchforfb: 'Zoekt Facebook-Login ...',
                cantfindfb: 'Facebook-ID kan niet gevonden worden',
                foundfb: 'Facebook-ID gevonden',
                preparestart: 'Bereite Start vor',
                requested: 'Aanvraag bij server gedaan...',
                nonewlinks: 'Geen nieuwe links gevonden',
                waitforlike: 'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
                from: 'van:',
                klicklike: 'Klik "Vind ik leuk"',
                linkscalled: 'Links opgeroepen',
                ok: 'ok',
                expired: 'Afgelopen',
                unknown: 'Onbekend',
                intogame: 'geht ins Spiel',
                pagelet_wall: "Privé prikbord gevonden",
                pagelet_group_mall: "Groepen prikbord gevonden",
                pagelet_home_stream: "Eigen prikbord gevonden",
                pagelet_notfound: "Geen Facebook Prikbord gevonden",
                startsearch: "Start de zoektocht naar links",
                dnotfoundlnk: "Geen MW Links gevonden",
                dnotfoundfhlnk: 'Keine Links für Fetch and Hide gefunden',
                serverconerr: "Tijdens de communicatie met de server is een fout opgetreden",
                senddata: 'Resultaten worden nu doorgestuurd naar de Server. Eventjes geduld ...',
                userabbord: 'Geannuleerd door gebruiker',
                msgfrommw: 'Bericht van Monster World: '
            },
            prompt: {
                imonfb: 'Je start de Klikker buiten Facebook. Let op dat je bij facebook ingelogt bent.\nVerder gaan?',
                linksinqueue: 'x "vind ik leuk" in de wacht'
            }
        },
        fr: {
            buttons: {
                stop: 'Arrêt',
                searchFBID: 'recherche identifiant FB',
                reset: 'Terminé',
                options: 'Paramètres',
                save: 'Sauvegarder',
                abbort: 'Annuler',
                help: 'Aide',
                go: 'ok'
            },
            options: {
                options: 'Options',
                windowpos: 'Position',
                usewindows: 'Demandes simultanées',
                delay: 'Délai entre clics de liens',
                delayLike: 'Délai entre j"aime',
                writeemail: 'Envoyer email',
                lkuserscripts: 'Link Klicker sur userscripts.org ',
                language: 'Langue',
                dbmax: 'Stopper le mode-DB après',
                stopafterlimreach: 'Avoir atteint la limite quotidienne d''arrêt',
                usestore: 'Utiliser stockage local'
            },
            tag: {
                windowpos: '"Position du cliqueur sur l"écran. Origine en haut à droite."',
                usewindows: '"Nombre de liens ouverts simultanément"',
                delay: '"Délai de pause entre ouvertures de liens - Recommandation : 0"',
                delaylike: '"Attente minimale entre les clics sur -J"aime-."',
                dbmax: '"Arrêt automatique après x liens de la WGC-DB"'
            },
            error: {
                valueoutofrange: 'Valeur hors limites',
                error: 'Erreur',
                cantreadcontent: 'Contenu illisible. Format inconnu.',
                linkintogame: 'Lien dirigé vers le jeu.',
                cantfindkey: 'Mot de passe introuvable. Etes-vous connecté ?',
                onerror_fb: 'Le serveur Facebook signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
                onerror_wooga: 'Le serveur Wooga-MW signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
                timeout: 'La demande pour ce lien a dépassé le délai d"attente normal.',
                statuserr: 'Erreur de connexion signalée',
                linkisold: 'Vous avez déjà cliqué sur ce lien'
            },
            string: {
                like: 'J"aime',
                starsdbbonus: 'Groupe restreint. Pour les Betatesteurs seulement',
                starsdbwoogo: 'WoGartenCenter est une base de liens de Woogoo et de plantes.\nMettez-y vos liens et cliquez ceux des autres.\nTout joueur de MonsterWorld est bienvenu.\n(Inscription obligatoire)\n\nhttps:// wogartencenter.de ',
                insertlinks: 'Insérez vos liens ici, puis cliquez OK\n\nAstuce :\nVous pouvez mettre du texte avec vos liens dans cette fenêtre.\nLes Liens seront filtrés et sélectionnés.',
                lrready: 'Monster World Link Klicker démarré',
                running: 'En cours',
                end: 'Fin',
                woogo: "Woogoo",
                plants: "Plantes",
                ignored: "Ignorés",
                found: "Trouvés",
                stars: "Etoiles",
                time: 'Durée'
            },
            mode: {
                mode1: 'Facebook (avec J''aime)',
                mode2: 'Facebook (sans J''aime)',
                mode3: 'WGC - DB',
                mode4: 'Tous les liens de cette page',
                mode5: 'Insertion manuelle',
                mode6: 'WGC - Zone de test',
                mode7: 'Mode marquage',
                mode8: 'Rechercher et masquer'
            },
            message: {
                message102: 'Liens reçus du Serveur. Processus démarré.',
                message104: 'Réception des données depuis le serveur confirmée',
                message1041: 'Mode-boucle | Une nouvelle demande va commencer',
                askforlinks: 'Demande de liens au serveur. Patientez SVP...',
                searchforfb: 'Recherche identifiant Facebook...',
                cantfindfb: 'Identifiant Facebook introuvable',
                foundfb: 'Identifiant Facebook trouvé',
                preparestart: 'Préparation avant démarrage',
                requested: 'Demande envoyée au serveur...',
                nonewlinks: 'Aucun nouveau lien trouvé',
                waitforlike: 'Attente jusqu"à ce que tous les clics sur "J"aime" soient faits',
                from: 'de la part de :',
                klicklike: 'Clic sur "J"aime"',
                linkscalled: 'Liens ouverts',
                ok: 'ok',
                expired: 'expiré',
                unknown: 'inconnu',
                intogame: 'dirigé vers le jeu',
                pagelet_wall: "Page privée trouvée",
                pagelet_group_mall: "Page de groupe trouvée",
                pagelet_home_stream: "Page personnelle trouvée",
                pagelet_notfound: "Aucune page Facebook trouvée",
                startsearch: "Recherche de liens commencée",
                dnotfoundlnk: "Aucun lien MW trouvé",
                dnotfoundfhlnk: 'Aucun lien trouvé pour la recherche-masquage',
                serverconerr: 'Une erreur s"est produite dans la communication avec le serveur',
                senddata: 'Transmission des résultats au serveur. Patientez SVP...',
                userabbord: 'Annulé par l"utilisateur',
                msgfrommw: 'Message de Monster World: '
            },
            prompt: {
                imonfb: 'Vous lancez Link klicker hors de Facebook. Connectez-vous sur FB avant\nContinuer ?',
                linksinqueue: 'x "J"aime" en attente'
            }
        },
        it: {
            buttons: {
                stop: 'Stop',
                searchFBID: 'Facebook-ID suchen',
                reset: 'Reset',
                options: 'Opzioni',
                save: 'Salva',
                abbort: 'Esci',
                help: 'Help',
                go: 'Vai'
            },
            options: {
                options: 'Opzioni',
                windowpos: 'Posizione',
                usewindows: 'Richieste simultanee',
                delay: 'Intervallo di attesa',
                delayLike: 'Intervallo "Mi piace"',
                writeemail: 'Scrivi e-mail',
                lkuserscripts: 'Link Klicker @ userscripts.org',
                language: 'Lingua',
                dbmax: 'Stoppa il DB dopo',
                stopafterlimreach: 'Dopo aver raggiunto la fermata limite giornaliero',
                usestore: 'Local Storage nutzen'
            },
            tag: {
                windowpos: '"Posizione all interno del menu. 0 e in alto a destra"',
                usewindows: '"Numero di richieste simultanee al server"',
                delay: '"Tempo di attesa dopo l\'aperura di un link - Default e\': 0"',
                delaylike: '"Tempo di attesa per un - Mi piace - Click, poi attende fino al prossimo."',
                dbmax: '"Arresta automaticamente dopo X links elaborati dal database WGC"'
            },
            error: {
                valueoutofrange: 'Valore al di fuori del range consentito',
                error: 'Errore',
                cantreadcontent: 'Non posso leggere il contenuto. Formato sconosciuto.',
                linkintogame: 'Collegamento algioco',
                cantfindkey: 'ID Facebook non trovato. Si e\' connessi a Facebook?',
                onerror_fb: 'Il server di Facebook restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
                onerror_wooga: 'Il server di Monster World restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
                timeout: 'La richiesta di questo collegamento non è stata risolta nel tempo assegnato.',
                statuserr: 'Segnala un errore di connessione',
                linkisold: 'Diser Link wurde bereits von dir geklickt'
            },
            string: {
                like: 'Mi piace',
                starsdbbonus: 'Gruppo chiuso. Solo per i beta tester.',
                starsdbwoogo: 'WoGartenCenter e\' un database di piante e collegamenti Woogoo.\nI giocatori di Monster World sono ibenvenuti.\n(E\' richiesta la registrazione)\n\nhttps://wogartencenter.de',
                insertlinks: 'Copia e incolla i link inquesto box, quindi premi START \ n \ nSuggerimento: \ nPuoi inserire anche altro testo (anche senza senzo) \ nI collegamenti sono filtrati.',
                lrready: 'Monster World Link Klicker in avvio',
                running: 'In corso',
                end: 'Fine',
                woogo: "Woogoo",
                plants: "Piante",
                ignored: "Ignorato",
                found: "Trovato",
                stars: "Stelle"
            },
            mode: {
                mode1: 'Facebook (con "Mi piace")',
                mode2: 'Facebook (senza "Mi piace")',
                mode3: 'WoGartenCenter - DB',
                mode4: 'Tutti i link del sito corrente',
                mode5: 'Inserimento manuale dei link',
                mode6: 'WGC - Testarea',
                mode7: 'Selezione modalità',
                mode8: 'Recupera e nascondi'
            },
            message: {
                message102: 'Links dal Server ricevuti. Avviare il processo.',
                message104: 'Ricezione dei dati confermata dal server',
                message1041: 'Modalita Loop | Avvio nuova richiesta',
                askforlinks: 'Richiesta del link al Server. Prego attendere ...',
                searchforfb: 'Ricerca Login di Facebook ...',
                cantfindfb: 'Facebook-ID non trovato',
                foundfb: 'Facebook-ID trovato',
                preparestart: 'Preparazione per inizio',
                requested: 'Richiesta fatta al server...',
                nonewlinks: 'Nessun nuovo Link trovato',
                waitforlike: 'Attendere fino a che tutti i "Mi piace" siano cliccati',
                from: 'Da',
                klicklike: 'Click "Mi piace"',
                linkscalled: 'Links chiamato',
                ok: 'Ok',
                expired: 'Scaduti',
                unknown: 'Sconosciuti',
                intogame: 'Link al gioco',
                pagelet_wall: "Trovata richiesta privata",
                pagelet_group_mall: "Trovata Bacheca del gruppo",
                pagelet_home_stream: "Trovata la mia bacheca",
                pagelet_notfound: "Nessuna bacheca trovata",
                startsearch: "Inizia la ricerca per i collegamenti",
                dnotfoundlnk: "Nessun link trovato",
                dnotfoundfhlnk: 'Nessun link trovato per "Recupera e Nascondi"',
                serverconerr: "Errore di comunicazione col server",
                senddata: 'Invio dei risultati al server... attendere prego',
                userabbord: 'Annullata dall\' utente',
                msgfrommw: 'Messaggio del Mondo Monster: '
            },
            prompt: {
                imonfb: 'Si avvia il clicker al di fuori di Facebook. Assicurarsi di essere connessi a FB. \ Vai?',
                linksinqueue: 'x "Mi piace" in coda'
            }
        },
        en: {
            buttons: {
                stop: 'Stop',
                searchFBID: 'Search for Facebook-ID',
                reset: 'Finished',
                options: 'Settings',
                save: 'Save',
                abbort: 'Cancel',
                help: 'Help',
                go: 'ok'
            },
            options: {
                options: 'Options',
                windowpos: 'Position',
                usewindows: 'Concurrent requests',
                delay: 'Wait after Link-Click',
                delayLike: 'Wait after "I like"',
                writeemail: 'wite e-mail',
                lkuserscripts: 'Link Klicker on userscripts.org',
                language: 'Language',
                dbmax: 'Stop DB-mode after ',
                stopafterlimreach: 'Stop after reach Daylimit',
                usestore: 'Use Local Storage'
            },
            tag: {
                windowpos: '"Position of the menu on-screen. Zero is upper right corner."',
                usewindows: '"Amount of concurrent requests to the server"',
                delay: '"Time to wait after clicking - recommendation: 0"',
                delaylike: '"Time to wait after -I like- click before the next one occurs."',
                dbmax: '"Stop automatically after clicking x links from the WGC-database"'
            },
            error: {
                valueoutofrange: 'Out of range',
                error: 'Input error',
                cantreadcontent: 'cannot read, format is unknown.',
                linkintogame: 'Link goint straight to the game',
                cantfindkey: 'signed_request-Key not found - logged in in Facebook??',
                onerror_fb: 'The Facebook-server reports an error. Link is skipped, next one following in a few seconds.',
                onerror_wooga: 'The MonsterWorld-server reports an error. Link is skipped, next one following in a few seconds.',
                timeout: 'The request was not honoured in the given time.',
                statuserr: 'reports connection-error.',
                linkisold: 'Diser Link wurde bereits von dir geklickt'
            },
            string: {
                like: 'I like',
                starsdbbonus: 'Closed group. Only for Betatesters.',
                starsdbwoogo: 'WoGartenCenter is a database for Woogoo- and Plants-links.\nEnter your links and click the links of others.\nEvery MonsterWorld player is welcome.\n(Registration required)\n\nhttps://wogartencenter.de',
                insertlinks: 'Paste your links in this field, then press START\n\nTip:\nYou can also enter random text in this field.\nLinks get filtered out.',
                lrready: 'Monster World Link Klicker is starting',
                running: 'running',
                end: 'finished',
                woogo: "Woogoo",
                plants: "Plants",
                ignored: "Skipped",
                found: "Found",
                stars: "Stars",
                time: 'Time'
            },
            mode: {
                mode1: 'Facebook (with like)',
                mode2: 'Facebook (without like)',
                mode3: 'WoGartenCenter - DB',
                mode4: 'All Links from this page',
                mode5: 'Enter links manually',
                mode6: 'WGC - Testarea',
                mode7: 'Marking mode',
                mode8: 'Fetch and Hide'
            },
            message: {
                message102: 'Links from server recieved - Starting processing.',
                message104: 'Recieved data aknowledged by server',
                message1041: 'Loop-Mode | New request being started',
                askforlinks: 'Asking server for links. Please wait...',
                searchforfb: 'Search for Facebook-Login ...',
                cantfindfb: 'Facebook-ID not available',
                foundfb: 'Facebook-ID found',
                preparestart: 'Preparing for start',
                requested: 'Request sent...',
                nonewlinks: 'No new links available',
                waitforlike: 'Waiting until all "I like" clicks are finished',
                from: 'by',
                klicklike: 'Click "I like"',
                linkscalled: 'Links called',
                ok: 'ok',
                expired: 'expired',
                unknown: 'unknown',
                intogame: 'going in game',
                pagelet_wall: "Private-Wall found",
                pagelet_group_mall: "Group-Wall found",
                pagelet_home_stream: "Own Wall found",
                pagelet_notfound: "No Facebook-wall found",
                startsearch: "Start searching for links",
                dnotfoundlnk: "No MW links found",
                dnotfoundfhlnk: 'No links found for Fetch and Hide',
                serverconerr: "Error communicating with server",
                senddata: 'Sending results to server, please wait...',
                userabbord: 'User aborted',
                msgfrommw: 'Message from Monster World: '
            },
            prompt: {
                imonfb: 'You try to start Klicker outside of Facebook. Ensure that you are logged in in Facebook.\nContinue?',
                linksinqueue: 'x "I like" in Queue'
            }
        }
    };

    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5l={8x:[10,11,13,14],7g:[21],99:[8],6R:[8,10,11,13,14,21]};B 1g=N 2s(3,1,2,4,5,6,\'1q\',\'1y\');B 82=N 2s(1,2,3,4,5,6,\'20\');B 5j=N 2s(3,\'20\');B 7h=N 2s(0,8,10,11,13,14,21);B 3n;B 33;B 3i=2M.3i;B 2r=D;B 3t=E;B 1r;B 31;B 4t;B 4j;B 78;B 5c;B 5a;B e={F:{4z:\'aA\',7B:\'3Z://a0.9Z.9W.9X.1C/9K?\',7D:M.5D.7z+\'//2t.2e.1C/2v-2u/?\',81:\'3Z://7u.de/9I.7v\',1Q:U,46:10,5F:10,3T:60,1S:5,4g:0,9F:0,7b:D,7X:D,9G:E,1O:E},67:{ay:"3Z://"+M.5D.aG,au:at.an.ap("77")>-1?D:E,5e:E},n:{2A:U,2z:U,l:\'de\',66:E}};g 85(){2q=2M.4e("t");2q.p="2q";3i.4f(2q);$(2q).1m({3w:\'4d\',2N:e.n.2A+\'1i\',2m:e.n.2z+\'1i\',2S:\'1w\'}).1Z(\'4p\')}g 8y(){$(\'#2q\').1d(\'<t p="4r"></t>\');$(\'#4r\').1m({2N:\'1u\',1r:\'1u 3g #3m\',2Y:\'9c\',1v:\'7l\',6q:\'1u 1u 1n 1n\',W:\'#2d\',3O:\'#3m\',1z:\'22 6F 22 23\',9j:\'0.5\',2S:\'1w\'}).1K("9k 9e 9r - v"+e.F.4z+" <39 3x=\\"1r:22 3g #2d;1z:1n 1u 22 1u;32:1n 1n 1n 6F;6m:2N\\">x</39> <39 3x=\\"1r:22 3g #2d;1z:1n 1u 22 1u;6m:2N\\">9n</39>").9o().1m(\'5Y\',\'9C\').5t(g(){j(33)58(33);4u(D)},g(){33=M.1R(g(){4u(E)},6L)})};g 7R(){6I=9f;5g=9B;2J=2M.4e("t");2J.p="2J";3i.4f(2J);$(2J).1m({3w:\'4d\',2m:\'50%\',2N:\'50%\',5A:-(6I/2)+\'1i\',5v:-(5g/2)+\'1i\',2S:\'4k\'}).1Z(\'4p\');$(2J).1d(\'<90 p="38" G="54"></90>\').19();$(\'#38\').1m({2Y:6I+\'1i\',1v:5g+\'1i\',1z:\'5i\',6N:\'4Z\',4q:\'9s\',9t:\'9q\'}).4B(\'<br><18 1p="3n" 2U="5I" p="5I" G="2Z" 17="\'+o[e.n.l].2n.9w+\'"></18>\');$(\'#5I\').1l(g(){6C(E);2w();e.F.2P=E;2h=5;37(D);j(36(2)){2R();2G()}$(38).T(\'\')});38=$(\'#38\')}g 7Z(){5o=9h;5B=9y;x=3U.5T-71;y=3U.5C-3o;e.F.2l?5x=\'3R="3R"\':5x=\'\';e.F.1O?5W=\'3R="3R"\':5W=\'\';2H=2M.4e("t");2H.p="2H";3i.4f(2H);$(2H).1m({3w:\'4d\',2m:\'50%\',2N:\'50%\',5A:-(5o/2)+\'1i\',5v:-(5B/2)+\'1i\',2S:\'4k\'}).1Z(\'4p\');$(2H).1d(\'<t p="8J" G="54"></t>\').19();$(\'#8J\').1m({2Y:5o+\'1i\',1v:5B+\'1i\',1z:\'5i\',6N:\'4Z\'}).1K(\'<t p="6p">\'+\'<5E><3k>\'+o[e.n.l].1x.1x+\'</3k></5E>\'+\'<1o>\'+\'<1L>\'+o[e.n.l].1x.6j+\'</1L>\'+\'<t G="2c" Z=\'+o[e.n.l].3j.6j+\'>X:</t><18 p="2A" 17=\'+e.n.2A+\' 2W="3" 1p="V"> (2 - \'+x+\')<br />\'+\'<t G="2c" Z=\'+o[e.n.l].3j.6j+\'>Y:</t><18 p="2z" 17=\'+e.n.2z+\' 2W="3" 1p="V"> (25 - \'+y+\')\'+\'</1o>\'+\'<1o Z=\'+o[e.n.l].3j.6b+\'>\'+\'<1L>\'+o[e.n.l].1x.6b+\'</1L>\'+\'<t G="2c">\'+o[e.n.l].1x.6b+\':</t><18 p="1S" 17=\'+e.F.1S+\' 2W="3" "1p="V"> (3Q 5)<br />\'+\'</1o>\'+\'</1o>\'+\'<1o Z="">\'+\'<1L>9u</1L>\'+\'<t G="2c" Z=\'+o[e.n.l].3j.4T+\'>\'+o[e.n.l].1x.9x+\':</t><18 p="4T" 17=\'+e.F.46+\' 2W="3" "1p="V"> 92<br />\'+\'<t G="2c" Z=\'+o[e.n.l].3j.1Q+\'>\'+o[e.n.l].1x.1Q+\':</t><18 p="1Q" 17=\'+e.F.1Q+\' 2W="3" "1p="V"> 92<br />\'+\'</1o>\'+\'</1o>\'+\'<1o Z="">\'+\'<1L>9a</1L>\'+\'<t G="2c" Z=\'+o[e.n.l].3j.1J+\'>\'+o[e.n.l].1x.1J+\':</t><18 p="1J" 17=\'+e.F.1J+\' 2W="3" "1p="V"> 9l<br />\'+\'<t G="2c" Z=\'+o[e.n.l].3j.1J+\'>\'+o[e.n.l].1x.2l+\':</t><18 p="2l" 17="D" 1p="7W" \'+5x+\'/><br />\'+\'</1o>\'+\'</1o>\'+\'<1o Z="">\'+\'<1L>9z</1L>\'+\'<t G="2c" Z="">\'+o[e.n.l].1x.1O+\':</t><18 p="1O" 17="D" 1p="7W" \'+5W+\'/><br />\'+\'</1o>\'+\'</1o>\'+\'<1o Z="">\'+\'<1L>\'+o[e.n.l].1x.l+\'</1L>\'+\'<t G="2c" Z=""></t><6u p="l">\'+\'<2k 17="de">9m</2k>\'+\'<2k 17="9d">9i</2k>\'+\'<2k 17="9g">9b</2k>\'+\'<2k 17="9A">aM</2k>\'+\'<2k 17="aq">ar</2k>\'+\'</6u><br>\'+\'</1o>\'+\'<br><br>\'+\'<3k><a 1P=al:ag@af.de>\'+o[e.n.l].1x.ah+\'</a> | <a 1P="3Z://ai.8t/ak/3C/aj">6w 9D av aH.8t</a><br><br>\'+\'<5r aI="27://4a.aJ.1C/aL-aK/aE" 3v="aD"><18 1p="7P" 2U="ax" 17="aw-az"><18 1p="7P" 2U="aC" 17="aB"><18 p="6W" 1p="ad" 8H="27://4a.8I.1C/8W/ac/i/9P/9O.8B" 1r="0" 2U="9N" 8G="9L 9J, 9U 9V a7 a6 a5 â�� a8 a9."><ab 8G="" 1r="0" 8H="27://4a.8I.1C/8W/i/aa/a4.8B" 1v="1" 2Y="1"></5r>\'+\'</b><br>\'+\'</t>\').4B(\'<18 1p="3n" 2U="6E" p="6E" G="2Z" 17="\'+o[e.n.l].2n.a3+\'"></18><18 1p="3n" 2U="6s" p="6s" G="2Z" 17="\'+o[e.n.l].2n.9Y+\'"></18>\');4O=$(\'#2A\');4U=$(\'#2z\');49=$(\'#1S\');4b=$(\'#4T\');51=$(\'#1Q\');43=$(\'#1J\');8T=$(\'#2l\');8P=$(\'#1O\');$(\'#6E\').1l(g(){1U("2A",$(4O).T());1U("2z",$(4U).T());1U("1S",$(49).T());1U("8M",$(4b).T());1U("1Q",$(51).T());1U("l",$(\'#l\').T());1U("1J",$(43).T());e.F.2l=$(8T).1t("3R")?D:E;1U("2l",e.F.2l);e.F.1O=$(8P).1t("3R")?D:E;1U("1O",e.F.1O);e.F.1S=$(49).T();e.F.46=$(4b).T();e.F.1J=$(43).T();4X(E)});$(\'#6s\').1l(g(){4X(E)});$(\'#2A, #2z, #1S, #4T, #1Q, #1J\').a2(g(){B x=$(4O).T();B y=$(4U).T();B f=$(49).T();B d=$(51).T();B 53=$(4b).T();B 3Q=$(43).T();j(3Q>a1||3S(2K(3Q))){3Q=1w;$(43).T(3Q)}j(x<2||x>3U.5T-71||3S(2K(x))){x=2;$(4O).T(x)}j(y<25||y>3U.5C-3o||3S(2K(y))){y=40;$(4U).T(y)}j(f>5||(3S(2K(f)))){f=1;$(49).T(f)}j((3S(2K(53)))){53=30;$(4b).T(53)}j((3S(2K(d)))){d=30;$(51).T(d)}2q.3x.2N=x+\'1i\';2q.3x.2m=y+\'1i\'})}g 86(){28=2M.4e("t");28.p="28";3i.4f(28);$(\'#28\').1m({3O:\'#3I\',1v:3U.5T+\'1i\',2Y:3U.5C+\'1i\',3w:\'4d\',2m:\'0\',59:\'0\',2S:\'9H\'}).19()}g 87(){6z=3o;6A=9E;2C=2M.4e("t");2C.p="2C";3i.4f(2C);$(\'#2C\').1m({3w:\'4d\',2m:\'50%\',2N:\'50%\',5A:-(6z/2)+\'1i\',5v:-(6A/2)+\'1i\',2S:\'4k\'}).1Z(\'4p\');$(\'#2C\').1d(\'<t p="69" G="4x"></t>\');$(\'#69\').1m({3O:\'2X\',W:\'#3I\'}).19();$(\'#2C\').1d(\'<t p="3a" G="4x"></t>\');$(\'#3a\').19();$(\'#2C\').1d(\'<t p="3l" G="4x"></t>\');$(\'#3l\').1K(\'<7H 3x="V-44:3k" 9M="9S"  1v="9T%" 9R="4" G="7a"><4y><2j>\'+o[e.n.l].L.7G+\'</2j><2j>\'+o[e.n.l].L.7F+\'</2j><2j>\'+o[e.n.l].L.4E+\'</2j><2j>\'+o[e.n.l].L.7E+\'</2j><2j>\'+o[e.n.l].2I.9Q+\'</2j></4y>\'+\'<4y><26 p="8h">0</26><26 p="8g">0</26><26 p="8c">0</26><26 p="8d">0</26><26 p="8e">0</26></4y></7H>\').19();$(\'#2C\').1d(\'<t p="2f" G="54"></t>\');$(\'#2f\').1m({2Y:6z+\'1i\',1v:6A+\'1i\',6q:\'4c\',1z:\'23\',6N:\'4Z\',2S:\'4k\'}).19();$(\'#2f\').4B(\'<18 1p="3n" 2U="3W" p="3W" G="2Z" 17="\'+o[e.n.l].2n.2w+\'"></18>\');$(\'#3W\').1l(g(){37(E);2w()}).19();$(\'#2f\').4B(\'<18 1p="3n" 2U="4G" p="4G" G="2Z" 17="\'+o[e.n.l].2n.aF+\'"></18>\');$(\'#4G\').1l(g(){2r=E;$(O).1D(\'P\',0.2)}).19();1r=$(\'#4r\');31=$(\'#2f\');4t=$(\'#3a\');4j=$(\'#69\');78=$(\'#3l\');5c=$(\'#3W\');5a=$(\'#4G\')}g 88(){$(\'#2q\').1d(\'<t p="29"></t>\');$(\'#29\').1m({3w:\'ae\',1v:\'am\',2m:\'as\',6q:\'1n 1n 1u 1u\',1r:\'22 3g #3m\',3O:\'#2d\',2S:\'6f\'}).19();$(\'#29\').5t(g(){j(33)58(33);4u(D)},g(){33=M.1R(g(){4u(E)},6L)});$(\'#29\').1d(\'<t p="R"></t>\');$(\'#R\').1m({W:\'#3I\',ao:\'3k\',1z:\'23\',1v:\'7l\'});$(\'#R\').1d(\'<t G="R" p="6J">\'+o[e.n.l].1j.96+\'</t>\');$(\'#6J\').1l(g(){$(\'#29\').3M(\'P\',g(){5G()})}).19();$(\'#R\').1d(\'<t G="R" p="5M">\'+o[e.n.l].1j.7N+\'</t>\');$(\'#5M\').1l(g(){$(\'#29\').3M(\'P\',g(){5H()})}).19();$(\'#R\').1d(\'<t G="R" p="5L">\'+o[e.n.l].1j.94+\'</t>\');$(\'#5L\').1l(g(){5S()}).19();$(\'#R\').1d(\'<t G="R" p="7m">\'+o[e.n.l].1j.6U+\'</t>\');$(\'#7m\').1l(g(){$(\'#29\').3M(\'P\',g(){6g()})});$(\'#R\').1d(\'<t G="R" p="7w">\'+o[e.n.l].1j.6S+\'</t>\');$(\'#7w\').1l(g(){5V()});$(\'#R\').1d(\'<t G="R" p="5N">\'+o[e.n.l].1j.8Z+\'</t>\');$(\'#5N\').1l(g(){62()}).19();$(\'#R\').1d(\'<t G="R" p="5O">\'+o[e.n.l].1j.64+\'</t>\');$(\'#5O\').1l(g(){$(\'#29\').3M(\'P\',g(){65()})}).19();$(\'#R\').1d(\'<t G="R" p="5Q">\'+o[e.n.l].1j.8a+\'</t>\');$(\'#5Q\').1l(g(){$(\'#29\').3M(\'P\',g(){7x()})}).19();$(\'#R\').1d(\'<t G="R" p="63">\'+o[e.n.l].1x.98+\'</t>\');$(\'#63\').1l(g(){6v()});$(\'#R\').1d(\'<97><t G="R" p="76">\'+o[e.n.l].2n.1x+\'</t>\');$(\'#76\').1l(g(){6O()});$(\'#R\').1d(\'<t G="R" p="6Q">\'+o[e.n.l].2n.7o+\'</t>\');$(\'#6Q\').1l(g(){5w()});$(\'.R\').5t(g(){$(O).1m({5Y:\'3u\',3O:\'#9v\'})},g(){$(O).1m({5Y:\'7n\',3O:\'#2d\'})}).1m({32:\'1u\',1z:\'23\',4K:\'7n 9p% "7U 8r",8s,8w,8n,8m-8l\'})}g 5G(){1X();2w();1c.2x=N 1h();2P=D;2h=1;4P()}g 5H(){1X();2w();1c.2x=N 1h();e.F.2P=E;2h=2;4P()}g 5S(){1X();1c.2x=N 1h();1c.2x=N 1h();4W(3)}g 6g(){1X();2w();1c.2x=N 1h();37(D);e.F.2P=E;2h=4;j(36(1)){2R();2G()}}g 5V(){1X();1c.2x=N 1h();6C(D)}g 62(){1X();1c.2x=N 1h();4W(6)}g 65(){1X();2h=7;4P(D);1G(o[e.n.l].1j.64);$(\'#3W\').3C()}g 7x(){1X();2h=8;2r=E;37(D);j(7s()){2R();4J=D;1b(B i=0;i<k.1y.C;i++)5m(i);1I[0]=2h;6d()}1G(o[e.n.l].1j.8a);$(\'#3W\').3C()}g 6O(){4X(D);M.1R(g(){$(\'#6W\').6X({1v:"+=10%"},1w,g(){$(O).6X({1v:"-=10%"},1w)})},1w)}g 5w(){6a("3Z://bi.7u.de")}g 37(2p){j(2p==D){$(28).1D(\'P\',0.8);$(\'#3a, #2f, #3l\').3K(\'P\');$(5a).3K().1D(\'cA\',1)}J{$(\'.2Z, #3a, #2f, #3l\').3X(\'P\');$(\'#28\').1D(\'P\',0).19()}}g 4X(2p){j(2p==D){$(28).1D(\'P\',0.8);$(2H).3K(\'P\')}J{$(28).1D(\'P\',0).19();$(2H).3X(\'P\')}}g 6C(2p){j(2p==D){$(28).1D(\'P\',0.8);$(2J).3K(\'P\');$(\'#38\').6u().cB()}J{$(28).1D(\'P\',0).19();$(2J).3X(\'P\')}}g 4u(2p){j(2p==D){$(\'#4r\').1D(\'P\',1);$(\'#29\').cC(\'P\')}j(2p==E){$(\'#4r\').1D(\'P\',0.5);$(\'#29\').3M(\'P\')}}g 4P(2L){37(D);1B=6Y();4s(1B){15 1:K(o[e.n.l][\'L\'][\'6T\']);j(36()){j(!2L)4D();4n();4i();2R();j(!2L)2G()}Q;15 2:K(o[e.n.l][\'L\'][\'7A\']);j(36()){j(!2L)4D();4n();4i();2R();j(!2L)2G()}Q;15 3:K(o[e.n.l][\'L\'][\'7y\']);j(36()){j(!2L)4D();4n();4i();2R();j(!2L)2G()}Q;3u:j(36(1)){4n();4i();2R();j(!2L)2G()}Q}}g 6Y(){B 1B=U;j($(\'t[p="6T"]\').C)1B=1;J j($(\'t[p="7A"]\').C)1B=2;J j($(\'t[p="7y"]\').C)1B=3;1E 1B}g 36(5h){K(o[e.n.l][\'L\'][\'cz\']);B H=0,1N=0;j(5h==1)$(\'a:6k(1P,^27?:\\/\\/2t.2e.1C\\/2v-2u\\/)\').3e(g(){B 3r=$(O).1t(\'1P\');j(3r){1e=3r.1T(/27?:\\/\\/2t.2e.1C\\/2v-2u\\/\\?.*3G=([0-9]{1,2}).*&3H=([0-9]{1,2}).*&u=([a-3P-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3D=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){1b(q=0;q<1e.C;q++){j(!k[q])k[q]=[];k[q][H]=1e[q]}k.1q[H]=$(O);k[\'1y\'][H]=H;k[\'I\'][H]=U;H++}}});J j(5h==2){4I=$(\'#38\').T().1T(/27?:\\/\\/2t.2e.1C\\/2v-2u\\/\\?.*3G=([0-9]{1,2}).*&3H=([0-9]{1,2}).*&u=([a-3P-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3D=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/cy);j(4I!=U){1b(H=0;H<4I.C;H++){1e=4I[H].1T(/27?:\\/\\/2t.2e.1C\\/2v-2u\\/\\?.*3G=([0-9]{1,2}).*&3H=([0-9]{1,2}).*&u=([a-3P-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3D=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){1b(B q=0;q<1e.C;q++){j(!k[q])k[q]=N 2s();k[q][H]=1e[q]}k.1q[H]=$(O);k[\'1y\'][H]=H;k[\'I\'][H]=U}}}}J $(\'7e[G~="7f"]\').3e(g(){I[1N]=$(O);6y[1N]=$(O).1s(\'a:6k(1P,^27?:\\/\\/2t.2e.1C\\/2v-2u\\/)[G!="7k"]\').7p(\'[G~="7q"]\').3e(g(){B 3r=$(O).1t(\'1P\');j(3r){1e=3r.1T(/27?:\\/\\/2t.2e.1C\\/2v-2u\\/\\?.*3G=([0-9]{1,2}).*&3H=([0-9]{1,2}).*&u=([a-3P-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3D=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){1b(B q=0;q<1e.C;q++){j(!k[q])k[q]=N 2s();k[q][H]=1e[q]}k.1q[H]=$(O);k[\'1y\'][H]=H;k[\'I\'][H]=1N;H++}}});1N++});j(k.1y.C)6r();J{K(o[e.n.l][\'L\'][\'7L\'],1);1G(o[e.n.l][\'L\'][\'7L\'],"2X");2O(D)}1E k.1y.C}g 7s(){$(\'7e[G~="7f"]\').3e(g(){I[1N]=$(O);6y[1N]=$(O).1s(\'a:6k(1P,^27?:\\/\\/2t.2e.1C\\/2v-2u\\/)\').7p(\'[G~="7q"][G!="7k"]\').3e(g(){1e=$(O).1t(\'1P\').1T(/27?:\\/\\/2t.2e.1C\\/2v-2u\\/\\?.*3G=([0-9]{1,2}).*&3H=([0-9]{1,2}).*&u=([a-3P-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3D=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U&&1e[5]==3Y&&8E.5k(6B(1e[1]),5l.6R)>-1)$(I[1N]).1s(\'a[7M*="7j"]\').3e(g(){4l.6e([$(O),I[1N]]);j(1e!=U){1b(q=0;q<1e.C;q++){j(!k[q])k[q]=N 2s();k[q][H]=1e[q]}k.1q[H]=$(O);k[\'1y\'][H]=H;k[\'I\'][H]=1N;H++}})});1N++});j(k.1y.C)6r();J{K(o[e.n.l][\'L\'][\'73\'],1);1G(o[e.n.l][\'L\'][\'73\'],"2X");2O(D)}1E k.1y.C}g 6r(){70(k[3],k[1],k[2],k[4],k[5],k[\'1q\'],k[\'1y\'],k[\'I\']);k[1g.C+1]=N 2s();j(k[1g[0]].C>1){k[1g.C+1][0]=D;1b(u=1;u<=(k[1g[0]].C-1);u++){j(k[1g[0]][u]==k[1g[0]][u-1]){k[1g.C+1][u]=E;$(k[\'1q\'][u]).1m("2i-W","#cv")}J k[1g.C+1][u]=D}}J k[1g.C+1][0]=D;70(k[\'1y\'],k[3],k[1],k[2],k[4],k[5],k[\'1q\'],k[\'I\'],k[1g.C+1])}g 8o(){1b(B 3E=0;3E<4l.C;3E++){B cw=3E;B 2a=$(4l[3E][0]).1t("7M");B 7K=2a.1T(/7J=(\\d+)&/i)[1];B 57=2a.1T(/57=(\\d+)&/i)[1];B 5d=2a.1T(/5d=(\\d+)&/i)[1];B 5b=2a.1T(/5b=(.+)&/i)[1];4L({3v:"5y",2a:M.5D.7z+"//4a.2e.1C/cx/cD.7v?cE=1",2V:"7J="+7K+"&5d="+5d+"&57="+57+"&5b="+5b+"&7c="+5f.4N.7c+"&79="+5f.4N.79+"&cK="+5f.4N.cL+"&cM=cJ"+"&cI=7j"+"&cF=0",55:g(r){}});$(4l[3E][1]).3X(\'cG\',g(){$(O).cH})}}g 4n(){j(3Y!=U)1b(i=0;i<k[1g.C+1].C;i++)j(k[5][i]==3Y)k[1g.C+1][i]=E}g 4i(){j(3F.4Q&&e.F.1O){B 3V=3F.95();1b(i=0;i<k[1g.C+1].C;i++){1b(B s=0;s<3V.C;s++){j(k[6][i]==3V[s][0]){k[1g.C+1][i]=E;34(i,3)}}}}}g 4D(){1b(i=0;i<k[1].C;i++){j($(I[k.I[i]]).1s(\'a[G~="8S"][2V-8R="{\\"8K\\":\\"?\\"}"]\').C){35("cu ct");k[1g.C+1][i]=E;$(I[k.I[i]]).1D(\'P\',0.4)}}}g 2R(){1b(i 7T 7h){w[i]=0}j(e.F.7b)3p=6i=6c=D;J 3p=6i=6c=E;1b(B i=0;i<k[1].C;i++){4s(2K(k[1][i])){15 8:j(6c)$(k[\'1q\'][i]).1Z(\'8k\');w[1]++;Q;15 10:j(3p)$(k[\'1q\'][i]).1Z(\'4m\');w[2]++;Q;15 11:j(3p)$(k[\'1q\'][i]).1Z(\'4m\');w[2]++;Q;15 13:j(3p)$(k[\'1q\'][i]).1Z(\'4m\');w[2]++;Q;15 14:j(3p)$(k[\'1q\'][i]).1Z(\'4m\');w[2]++;Q;15 21:j(6i)$(k[\'1q\'][i]).1Z(\'8u\');w[3]++;Q;3u:w[0]++;Q}j(k[1g.C+1][i]==E)w[\'6K\']++;J w[\'42\']++}w.4h=w.42;K(o[e.n.l][\'2I\'][\'cg\']+": "+k[1].C+" | "+o[e.n.l][\'2I\'][\'ch\']+": "+w[\'6K\']+" | "+o[e.n.l][\'2I\'][\'7g\']+": "+w[3]+" | "+o[e.n.l][\'2I\'][\'ci\']+": "+w[1]+" | "+o[e.n.l][\'2I\'][\'cf\']+": "+w[2])}g 2w(){1k=[E,E],1f=[];I=[];6y=[];1I=[];3T=[];4l=[];H=0;1N=0;1B=U;4J=E;2g=0;2P=E;1r="";2r=D;47=E;w={2b:0,3q:U,4h:0,6K:0,42:0,56:0,ce:0,cb:0,3d:0,45:0,cc:U,61:0,3y:0,3z:0,3B:0,3c:0,7r:0,1I:0};k={1q:[],1y:[],I:[],3s:[],93:[],20:[]};j(!3t)j($(\'#2f\').C)$(\'#2f\').1K("");j($(\'#3a\').C)$(\'#3a\').1K("- - -")}g 1X(){1c={w:0,cd:0,3y:0,3z:0,3B:0,3c:0,2x:U}}g 2G(){4A(D);1G(o[e.n.l].L.cj,"7i");1I[0]=2h;7r=k[1].C;8j(e.F.1S);1b(i=0;i<1f.C;i++){2T(i)}};g 2T(p){j(!2g){ck(!k[1g.C+1][w.2b]&&w.2b<k[1g.C+1].C){w.2b++}}j(2P)j((k.I[w.2b]>w.3q||w.2b==k.I.C)&&w.3q!=U){6D(w.3q);w.3q=k.I[w.2b]}J w.3q=k.I[w.2b];j(w.2b<k[1].C&&!(!2g&&!2r)&&!47){1f[p][1]=N 1h();1f[p][2]=D;7I(w.2b,"5Z",p);w.2b++;w.56++}J{}j(1f[p][2]!=D||w.4h==0)w.45++;j(w.45==1f.C){V=o[e.n.l].L.7G+": "+w.61+" --- "+o[e.n.l].L.7F+": "+w.3y+" --- "+o[e.n.l].L.4E+": "+w.3z+" --- "+o[e.n.l].L.7E+": "+w.3B+" --- "+o[e.n.l].L.cO+": "+w.3c;K(V);6d();4A(E);2O(D)}};g 7I(1a,cq,p){2Q(p,1);4L({3v:\'cr\',2a:e.F.7D+6l(1a),80:{\'cs-cp\':\'co/5.0 (cl cm 6.1; cn; cN:10.0.2) d6/d5 77/10.0.2\',\'d4\':\'V/1K,5q/d3+7t,5q/7t;q=0.9,*/*;q=0.8\'},6G:g(r){2Q(p,2);K(o[e.n.l].1A.d1,2);w.3d++;1f[p][2]=E;M.1R(g(){2T(p)},(e.F.5F*1w),p)},55:g(r){2Q(p,2);j(r.6x==3o){1f[p][3]=N 1h();B 48=r.2F.1T(/3s\\" 17\\=\\"([a-d0-3P-cS\\-.]+)\\"/i);j(!48){K(o[e.n.l].1A.cR,2);w.3d++;2T(p)}k[\'3s\'][1a]=48[1];5Z(1a,p)}J{K("da "+o[e.n.l].1A.75+": "+r.74);w.3d++;1f[p][2]=E;M.1R(g(){2T(p)},(e.F.1Q*1w),p)}}})};g 5Z(H,p){B 1a=H;w.61++;1c.w++;2Q(p,1);4L({3v:"5y",2a:e.F.7B+6l(H)+"&3s="+k.3s[H],6G:g(r){2Q(p,2);K(o[e.n.l].1A.cT,2);w.3d++;1f[p][2]=E;M.1R(g(){2T(p)},(e.F.5F*1w),p)},55:g(r){2Q(p,2);B 3b="";B 3L;B 6H=N 1h().2y()-1f[p][1].2y();B 5p=N 1h().2y()-1f[p][3].2y();B 5X=1f[p][3].2y()-1f[p][1].2y();B 48=r.2F.1T(/\\<Z\\>(.+)\\<\\/Z\\>/i);B d2=$(r.2F).1s(\'Z\');B 72=$(r.2F).1s(\'#2n\');B 41=$(r.2F).1s(\'39\');B 5J=$(r.2F).1s(\'#V\');B 5z=5J.1s(\'5E\').V();B 5u=5J.1s(\'cV\').V();B 6V=$(41).d9(\'d8\');!1B?3L=U:3L=$(I[k.I[H]]).1s(\'t[G~=3L]\').V();3L?3b=" "+o[e.n.l].L.cQ+": "+3L:3b="";j(r.6x==3o){j(72.C){j(41.C){K(5z+": ( "+5u+" ) - ( "+5p+" | "+5X+" | "+6H+" ) "+3b+\' | \'+$(41).V(),1);34(1a,1);k.20[1a]=1;w.3z++;1c.3z++}J{K(5z+": ( "+5u+" ) - ( "+5p+" | "+5X+" | "+6H+" ) "+3b,0);34(1a,0);k.20[1a]=0;w.3y++;1c.3y++}}J j(6V){K($(41).V(),2);k.20[1a]=4;w.6Z++;1c.6Z++;j(e.F.2l||2g){47=D;2r=E}}J j(48[1]){K("6w "+3b+" | "+o[e.n.l].1A.6t,2);34(1a,2);k.20[1a]=2;w.3B++;1c.3B++}J{K("6w "+3b+" "+o[e.n.l].1A.cU,2);34(1a,2);k.20[1a]=3;w.3c++;1c.3c++}j(3F.4Q&&e.F.1O)3F.8F(1a)}J{K("cY "+o[e.n.l].1A.75+": "+r.74);34(1a,2);k.20[1a]=3;w.3c++;1c.3c++};5m(1a);1f[p][2]=E;M.1R(g(){2T(p)},(e.F.1Q*1w),p);1G(w.3d+" / "+w.4h+" ( "+o[e.n.l].2I.cW+" )");w.3d++}})};g 2Q(p,4R){j(4R==1){3T[p]=M.1R(g(){2Q(p,3)},(e.F.3T*1w),p)}J j(4R==2){58(3T[p])}J j(4R==3){K(o[e.n.l].1A.3T,2);2T(p)}}g 84(){e.F.1S=1F("1S",1);e.n.2A=1F("2A","2");e.n.2z=1F("2z","40");e.n.l=1F("l","de");e.67.5e=1F("cX",E);e.F.46=1F("8M",30);e.F.1Q=1F("1Q",0);e.F.4g=1F("cZ",0);e.F.52=1F("52",0);cP=1F("4z",0);e.F.1J=1F("1J",1w);e.F.2l=1F("2l",D);e.F.1O=1F("1O",E);j(e.F.1S>5)e.F.1S=5};g 6D(c){j(c!=U)1k.6e(c);j(1k[0]==E){K("< "+o[e.n.l].L.2P+" >");$(I[1k[2]]).1s(\'a[G~="8S"][2V-8R="{\\"8K\\":\\">\\"}"]\').3e(g(){O.1l()});1k.91(2,1);1k[0]=D}j(1k.C>2&&1k[1]==E){1k[1]=D;dc=M.1R(g(){1k[0]=E;1k[1]=E;6D()},e.F.46*1w)}j(1k.C>2&&1k[0]==D&&1k[1]==D){$(4j).3K();$(4j).1K((1k.C-2)+\' \'+o[e.n.l].dd.d7)}J{$(4j).3X();2O(D)}}g 6v(){35("c9 4N...");B 3N=2M.bf.1T(/3N=(\\d+)/)[1];j(3N){35("... 8X. aN bg. bh-be: "+3N);5K=$().bd({3v:\'b9\',ba:3N});$("#63").3X();3Y=3N;e.F.4g=5K;1U("4g",5K);$(\'#6J, #5M, #5L, #5N, #5O, #5Q\').3K(\'P\');K(o[e.n.l].L.bb+": "+3Y);d=N 1h().2y();j(e.F.52<d-60*60*24){4V();1U("52",d.bc())}j(!e.n.66){2o(o[e.n.l].1j.96,g(){5G()});2o(o[e.n.l].1j.7N,g(){5H()});2o(o[e.n.l].1j.94,g(){5S()});2o(o[e.n.l].1j.8Z,g(){62()});2o(o[e.n.l].1j.64,g(){65()});e.n.66=D}}J{35("... ca 8X.");3Y=U;K(o[e.n.l].L.bj)}}g bp(3f){3J=5j;K("bq: "+3f.C,1);1b(2E=0;2E<3f.C;2E++){K("3f[2E]: "+3f[2E]+" | 2E: "+2E,3);j($.5k(3f[2E],3J)==-1)3f.91(2E,1)}}g 7V(2D){2D.1q=[];2D.3s=[];2D.I=[];2D.93=[];2D.1y=[];2D.20=[];2D[0]=[];1E 2D}g 5m(H){j((!2g&&8E.5k(6B(k[1][H]),5l.8x)>-1&&k.20[H]==0)||4J)3J=82;J j(2g)3J=5j;J 1E;1b(B 3h=0;3h<3J.C;3h++){j(!1I[3h+1])1I[3h+1]=[];1I[3h+1][w.1I]=k[3J[3h]][H]}w.1I++}g 4V(){4L({3v:"5y",2a:e.F.81,80:{"bs-1p":"5q/x-4a-5r-bo"},2V:"2V="+4w.8D(1I)+"&bn="+e.F.4g+"&v="+e.F.4z,55:g(r){7Y(r)},6G:g(r){j(2g)K(o[e.n.l].L.bk,2)}})};g 7Y(r){j(r.2F=="")1E;3t=E;bl{B 7O=M.bm(r.2F)}b8(b7){};B 1V=4w.8Y(7O);4s(6B(1V.6x)){15 aU:1b(6M 7T 1V.2V){1U(6M,1V.2V[6M])}Q;15 aV:K(o[e.n.l].L.aW);w.42=w.4h=1V[1].C;k=7V(1V);2G();Q;15 aT:K(1V.4o);6a(1V.2V);1G(\'\');2O(D);Q;15 aS:K(o[e.n.l].L.aO);j(2r){K(o[e.n.l].L.8q);1G(o[e.n.l].L.8q,"2X");4W(1V.4o)}J j(2h==8){8o()}J 2O(D);Q;15 3o:3A();K(1V.4o);2O(D);Q;15 6f:3A("8O");K(1V.4o,1);aP(1V.4o);Q;3u:Q}};g 6d(){j(!1I[1]||!1I[1].C)1E;j((2g&&!47)||4J){K(o[e.n.l].L.8v,3);1G(o[e.n.l].L.8v,"2X");3t=D;j(1c.w>=e.F.1J)2r=E}4V()}g 6a(2a){B aQ=M.aR(2a,"",\'2Y=aX,1v=aY,b4=b5\')}g K(o,W){j(W==U)$(31).1K($(31).1K()+5P()+": "+o+"<br>");J{4s(W){15 0:1Y="#b6";Q;15 1:1Y="#b3";Q;15 2:1Y="#b2";Q;3u:1Y="#3I";Q}$(31).1K($(31).1K()+\'<39 3x="W:\'+1Y+\'">\'+5P()+": "+o+"</39><br>")}$(31).aZ(2M.b0("2f").b1)}g 7Q(){$(1r).1D(\'P\',1,g(){$(O).1D(\'P\',0.5)})}g 1G(o,1Y){j(1Y)3A(1Y);$(4t).1K(o)}g 8j(8i){1f=[];1b(i=0;i<8i;i++){1f[i]=N 2s()}};g 6l(H){1E 1e="3G="+k[1][H]+"&3H="+k[2][H]+"&u="+k[3][H]+"&l="+k[4][H]+"&s="+k[5][H]+"&3D="+k[6][H]}g 2O(3C){j(3C){j((w.45==1f.C&&3t==E&&1k[1]==E)||47){$(5c).3C();$(5a).19();3A();j(w.56>0)1G(w.56+" / "+w.42+" ( "+o[e.n.l].2I.bt+" )");j(!2r)K(o[e.n.l].L.bu);1k=[E,E];1X()}J j(w.45==1f.C&&!2g&&e.F.2P){3A("2X");1G(o[e.n.l].L.bW)}}J $(5c).19()}g 4A(8p){$(\'#8h\').V(1c.w);$(\'#8g\').V(1c.3y);$(\'#8c\').V(1c.3z);$(\'#8d\').V(1c.3B);$(\'#8e\').V(bX.bY((N 1h().2y()-1c.2x.2y())/1w));j(8p){8b=M.1R(g(){4A(D)},1w)}J 58(8b)}g 3A(1Y){$(4t).bV("8f 8L 6P");j(1Y)$(4t).1Z("bU"+1Y)}g 34(1H,7S){j(e.F.7X&&1B!=U){4s(7S){15 0:j(1B==1)$(I[k.I[1H]]).4H(\':4C\').1t(\'G\',\'6n\');J $(I[k.I[1H]]).1s(\'a[1P*="\'+k[3][1H]+\'"]\').4v().4q(\'<t G="6n"></t>\');Q;15 1:j(1B==1)$(I[k.I[1H]]).4H(\':4C\').1t(\'G\',\'6h\').1t(\'Z\',o[e.n.l].1A.4E);J $(I[k.I[1H]]).1s(\'a[1P*="\'+k[3][1H]+\'"]\').4v().4q(\'<t G="6h"></t>\').1t(\'Z\',o[e.n.l].1A.4E);Q;15 2:j(1B==1)$(I[k.I[1H]]).4H(\':4C\').1t(\'G\',\'68\').1t(\'Z\',o[e.n.l].1A.6t);J $(I[k.I[1H]]).1s(\'a[1P*="\'+k[3][1H]+\'"]\').4v().4q(\'<t G="68"></t>\').1t(\'Z\',o[e.n.l].1A.6t);15 3:j(1B==1)$(I[k.I[1H]]).4H(\':4C\').1t(\'G\',\'6o\').1t(\'Z\',o[e.n.l].1A.89);J $(I[k.I[1H]]).1s(\'a[1P*="\'+k[3][1H]+\'"]\').4v().4q(\'<t G="6o"></t>\').1t(\'Z\',o[e.n.l].1A.89);Q;3u:Q}}}g 4W(db){3t=D;2w();1I[0]=2h=db;2g=D;1G(o[e.n.l].L.83,"2X");37(D);K(o[e.n.l].L.83);4V()}g 5P(a){j(a!=U){B s=N 1h().5n()-a.5n();B m=N 1h().5U()-a.5U();B h=N 1h().5R()-a.5R()}J{B d=N 1h;B h=d.5R();B m=d.5U();B s=d.5n()}h=4M(h);m=4M(m);s=4M(s);1E h+":"+m+":"+s}g 4M(i){j(i<10)i="0"+i;1E i}B 3F={1M:"4S",2B:M.1W.8V("4S:2B"),4Q:E,7C:g(){j(bQ(bR)!=="bS"){O.4Q=D}},95:g(){j(M.1W.C-1){B 3V=[];B w=0;1b(i=0;i<M.1W.C;i++){1M=M.1W.1M(i);j(/4S:\\d+/.8N(1M)){3V.6e(4w.8Y(M.1W.8V(1M)));w++}}}1E 3V},8F:g(1a){8A=[k[6][1a],k[3][1a],2K(N 1h())];j(O.2B>6f){O.2B=0};M.1W.8C(O.1M+":"+O.2B,4w.8D(8A));M.1W.8C(O.1M+":2B",++O.2B)},bT:g(){},bZ:g(){B w=0;1b(i=0;i<M.1W.C;i++){1M=M.1W.1M(i);j(/4S:\\d+/.8N(1M)){M.1W.8U(1M);w++}}M.1W.8U(O.1M+":2B");35(w+" c0Ã¤c6 c7Ã¶c8")}};g 8z(){j(M.2m!=M.c5){35("c4 c1. c2");1E}J{35("c3 bP");84();j(e.67.5e)1E;2w();1X();85();8y();88();87();86();7Z();7R();M.1R(g(){7Q()},6L);M.1R(g(){6v()},bO);bB(\'.4p{W:#3I;4K: bC "7U 8r",8s,8w,8n,8m-8l}.2Z{1r:22 3g #2d;1v:bD;1r-5s:4c;W:#2d;2i-W:#3m;1z:22;32:23;}.bA{W:#bz}.68{4Y-4F: 1n 1n 23 #bv;1z: 1u}.6h{4Y-4F: 1n 1n 23 #bw;1z: 1u}.6n{4Y-4F: 1n 1n 23 #bx;1z: 1u}.6o{4Y-4F: 1n 1n 23 #by;1z: 1u}.8k{2i-W:#bE}.8u{2i-W:#bF}.4m{2i-W:#bL}.4x{V-44: 3k; 1r: 22 3g #3m;2Y-bM: 7d;1r-5s:4c;2i-W: #2d;1z: 23;1v:4Z; bN-44: bK; z-2B: 4k; 32:0 0 23 0;4K-2W:1.8Q;bJ-bG:0.8Q}.8L{2i-W:8O;W:#2d}.8f{2i-W:7i;W:#2d}.6P{2i-W:2X;W:#3I}.54{1r-5s:4c;2i-W:#bH;1r:22 3g #3m}#3l{4K-2W:7d}.7a 26{V-44:3k} #6p t.2c {6m: 59;1v: bI;32-59: 5i;V-44: 59;32-2m: 4c;}#6p 1o {32-2m: 6F;}\');2o(o[e.n.l].2n.1x,g(){6O()});2o(o[e.n.l].2n.7o,g(){5w()});2o(o[e.n.l].1j.6U,g(){6g()});2o(o[e.n.l].1j.6S,g(){5V()})}}3F.7C();8z();',62,821,'||||||||||||||setings||function|||if|linklist|language||UI|txt|id||||div|||counter|||||var|length|true|false|script|class|ii|element|else|printtext|message|window|new|this|slow|break|lk_menu|Z0|val|null|text|color|||title||||||case||value|input|hide|iit|for|gb|append|query|myWindows|matchorder|Date|px|mode|likeBatch|click|css|0px|fieldset|type|linkobj|border|find|attr|2px|width|1000|options|order|padding|error|wall_type|com|fadeTo|return|GM_getValue|printtext_small|this_ii|gather|dbmax|html|legend|key|ei|usestore|href|delay|setTimeout|fenster|match|GM_setValue|jsonObj|localStorage|reset_global|colour|addClass|linkstatus||1px|5px|||td|https|lk_overlay|lk_pulldown|url|aCounter|label|FFF|facebook|lk_infobox|dbmode|opmode|background|th|option|stopafterlimreach|top|buttons|GM_registerMenuCommand|stat|lk_container|zycle|Array|apps|world|monster|reset|starttime|getTime|positionY|positionX|index|lk_infobox_container|thisarray|ref|responseText|kickAss|lk_op_container|string|lk_text_container|Number|simulation|document|right|reset_btn|klicklike|watchdog|count_mw_obj|zIndex|bouncer|name|data|size|yellow|height|lk_btn||infobox|margin|pulldown_timer|marklnk|GM_log|scan_page|show_infobox|lk_textarea|span|lk_small_infobox|actor|lnk3|BounceCounter|each|myarray|solid|res|body|tag|center|lk_small_statbox|673569|button|200|paint_stars|liCounter|link|signed_request|clock|default|method|position|style|lnk0|lnk1|small_info_col|lnk2|show|w_accept|eit|store|st1|st2|111|glistorder|fadeIn|actorName|slideUp|c_user|backgroundColor|z0|max|checked|isNaN|timeout|screen|list|lk_btn_ok|fadeOut|FBid|http||ebt|valid|op_max|align|ThreadsDone|likeDelay|fstop|grab|op_f|www|op_dl|4px|fixed|createElement|appendChild|ClientHash|LinksToOpen|filter_old|small_likebox|1002|fhtable|lk_stars|filter_own|msg|lk_con|wrap|lk_border|switch|small_infobox|show_menu|first|JSON|lk_info|tr|version|update_statbox|after|parent|fadeOld|expired|shadow|lk_btn_stop|filter|pices|fhmode|font|GM_xmlhttpRequest|checkTime|Env|op_x|run_mode|aktiv|op|LK_MW|delaylike|op_y|connect|kdbm|show_options|box|auto||op_d|update|dl|lk_frame|onload|klicks|story_type|clearTimeout|left|btn_stop|story_id|btn_ok|profile_fbid|lock|unsafeWindow|textarea_width|modi|10px|wlistorder|inArray|mwliste|sort_data|getSeconds|options_height|elapsedTimeWo|application|form|radius|hover|rih2|marginRight|run_help|check|POST|rih1|marginTop|options_width|availHeight|location|h1|errordelay|run_mode1|run_mode2|lk_btn_go|ri|myhash|lk_mode3|lk_mode2|lk_mode6|lk_mode7|getMyTime|lk_mode8|getHours|run_mode3|availWidth|getMinutes|run_mode5|check_store|elapsedTimeFB|cursor|getWooga||lnk|run_mode6|lk_getfbid|mode7|run_mode7|menuloaded|system|lk_markbad|lk_small_likebox|referer|usewindows|paint_plant|recall|push|999|run_mode4|lk_markexpired|paint_woogo|windowpos|regex|assemble_query|float|lk_markok|lk_markold|menu|borderRadius|sort_arrays|lk_btn_opabbort|linkintogame|select|getFBid|Link|status|attachment|infobox_height|infobox_width|parseInt|show_textarea|clickLike|lk_btn_opsave|3px|onerror|elapsedTime|textarea_height|lk_mode1|duplicate|500|set|overflow|run_options|lk_yellow|lk_help|white|mode5|pagelet_wall|mode4|lim|ppbtn|animate|detect_type|lnk4|sortIt|230|eb|dnotfoundfhlnk|statusText|statuserr|lk_option|Firefox|small_statbox|fb_dtsg|overview|paintme|post_form_id|1em|li|uiStreamStory|woogo|counter_vals|green|remove_content|uiLinkLightBlue|198px|lk_mode4|normal|help|not|UIImageBlock_Image|arraylength|fetchhide|xml|wogartencenter|php|lk_mode5|run_mode8|pagelet_home_stream|protocol|pagelet_group_mall|woogaUrl|init|FBurl|intogame|ok|linkscalled|table|getFB|ministory_key|story_key|dnotfoundlnk|ajaxify|mode2|inc|hidden|ui_blink|make_textarea|marker|in|lucida|fit_array|checkbox|markbad|serverResponse|make_options|headers|serverurl|slistorder|askforlinks|loadOptions|make_container|make_overlay|make_infobox|make_pulldown|linkisold|mode8|statbox_timer|gblnk1|gblnk2|elatime|lk_green|gblnk0|gbcounter|number|setWindowsArray|lk_plant|serif|sans|arial|del_stream|run|message1041|grande|tahoma|org|lk_woogo|senddata|verdana|bonus|make_border|launcher|entry|gif|setItem|stringify|jQuery|Add|alt|src|paypalobjects|lk_options|tn|lk_red|likedelay|test|red|op_store|3em|ft|UFILikeLink|op_stop|removeItem|getItem|de_DE|gefunden|parse|mode6|textarea|splice|sec|actorsDescription|mode3|Get|mode1|hr|searchFBID|plant|Limits|Nederlands|16px|en|World|600|nl|510|English|opacity|Monster|Links|Deutsch|_|mouseover|125|none|Linkklicker|off|resize|Zeiten|E6E6E6|go|delayLike|400|LocalStorage|fr|750|pointer|Klicker|800|lastupdate|connected|1001|connect9|einfach|accept|Jetzt|rules|submit|btn_donate_SM|btn|time|cellpadding|all|100|schnell|und|monsters|wooga|abbort|live|lp|10000|change|save|pixel|bezahlen|online|sicher|mit|PayPal|scr|img|DE|image|absolute|linkklicker|anaximelis|writeemail|userscripts|113866|scripts|mailto|208px|userAgent|textAlign|search|it|Italian|21px|navigator|isFirefox|auf|_s|cmd|myHost|xclick|0923|7EYPUVHHHMJJY|hosted_button_id|post|webscr|stop|hostname|juserscripts|action|paypal|bin|cgi|France|Setze|message104|alert|lkwindow|open|104|103|101|102|message102|720|1024|scrollTop|getElementById|scrollHeight|FF0000|EB7500|scrollbars|yes|009E00|err|catch|md5|source|foundfb|toString|crypt|ID|cookie|Hash|FB|forum|cantfindfb|serverconerr|try|atob|cid|urlencoded|strip_data|stripdata||Content|end|userabbord|FF0A0A|FF8000|00FF00|6699FF|FF3366|lk_bad|GM_addStyle|11px|100px|9AFF9A|C7FFFF|spacing|FFFFFF|180px|letter|middle|EAEA5D|min|vertical|5000|gestartet|typeof|Storage|undefined|Remove|lk_|removeClass|waitforlike|Math|round|Clear|Eintr|erkannt|Stop|LK|iframe|self|ge|gel|scht|Suche|nicht|MonsterLinks|StartTime|stopafter|ValidMonsterLinks|stars|found|ignored|plants|preparestart|while|Windows|NT|WOW64|Mozilla|Agent|callback|GET|User|old|Fade|FFC8C8|el|ajax|ig|startsearch|fast|focus|slideDown|minifeed|__a|ban_user|3000|remove|action_key|AsyncRequest|__user|user|post_form_id_source|rv|unknown|thisversion|from|cantfindkey|9_|onerror_wooga|cantreadcontent|h2|running|syslog|Wooga|clienthash|zA|onerror_fb|mw|xhtml|Accept|20100101|Gecko|linksinqueue|limit_msg|hasClass|Facebook||LikeTimer|prompt|'.split('|'),0,{}))
})(); 