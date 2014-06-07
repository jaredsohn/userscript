// ==UserScript==
// @name            MonsterWorld Link klicker Plus
// @namespace       MonsterWorld Link klicker Plus
// @description     Öffnet automatisch MonsterWorld Links aus Facebook-Gruppen
// @include         http*://*.facebook.com/*
// @include         http://handysurfer.blogspot.*/*
// @exclude         http*://*.facebook.com/dialog/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
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
// @version         0921
// @license         http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// @grant           GM_log
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           unsafeWindow
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))





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
        de:{
            buttons:{
                stop:'Anhalten',
                reset:'Fertig',
                options:'Einstellungen',
                save:'Speichern',
                abbort:'Abbrechen',
                help:'Hilfe',
                go:'ok'
            },
            options:{
                options:'Optionen',
                searchFBID:'Facebook-ID suchen',
                windowpos:'Position',
                usewindows:'Gleichzeitige Anfragen',
                delay:'Wartezeit nach Link-klick',
                delayLike:'Wartezeit nach "Gefällt mir"',
                writeemail:'email schreiben',
                lkuserscripts:'Link Klicker auf userscripts.org',
                language:'Sprache',
                dbmax:'Stoppe DB-Modus nach ',
                stopafterlimreach:'Nach erreichen des Tageslimits anhalten',
                usestore:'Local Storage nutzen'
            },
            tag:{
                windowpos:'"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
                usewindows:'"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
                delay:'"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
                delaylike:'"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
                dbmax:'"Automatisch Anhalten nach x abgearbeiteten Links aus der WGC-Datenbank"'
            },
            error:{
                valueoutofrange:'Wert außerhalb des Zulässigen Bereiches',
                error:'Fehleingabe',
                cantreadcontent:'kann nicht ausgelesen werden. Format ist unbekannt.',
                linkintogame:'Dieser Link führt ins Spiel',
                cantfindkey:'signed_request-Key konnte nicht gefunden werden. Bei Facebook eingelogt?',
                onerror_fb:'Der Facebook-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
                onerror_wooga:'Der Monser World-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
                timeout:'Die Anfrage für diesen Link wurde nicht in der vorgegebenen Zeit beantwortet.',
                statuserr:'meldet einen Verbindungsfehler',
                linkisold:'Diser Link wurde bereits von dir geklickt'
            },
            string:{
                like:'Gefällt mir',
                starsdbbonus:'Geschlossene Gruppe. Nur für Betatester.',
                starsdbwoogo:'WoGartenCenter ist ein Datenbank für Woogoo- und Pflanzenlinks.\nStell deine Links ein und klick die der Anderen.\nJeder Monster World Spieler ist willkommen.\n(Anmeldung erforderlich)\n\nhttps://wogartencenter.de',
                insertlinks:'Kopiere deine Links in dieses Feld, dann drücke START\n\nTip:\nDu kannst auch unsinnigen Text mit in dieses Fenster einfügen.\nDie Links werden herausgefiltert.',
                lrready:'Monster World Link Klicker ist gestartet',
                running:'läuft',
                end:'beendet',
                woogo:"Woogoo",
                plants:"Pflanzen",
                ignored:"Verworfen",
                found:"Gefunden",
                stars:"Sterne",
                time:'Zeit'
            },
            mode:{
                mode1:'Facebook (mit like)',
                mode2:'Facebook (ohne like)',
                mode3:'WoGartenCenter - DB',
                mode4:'Alle Links dieser Seite',
                mode5:'Links von Hand einfügen',
                mode6:'WGC - Testarea',
                mode7:'Markierungsmodus',
                mode8:'Fetch and Hide'
            },
            message:{
                message102:'Links vom Server empfangen. Starte Vorgang.',
                message104:'Empfang der Daten wurde vom Server bestätigt',
                message1041:'Loop-Modus | Neue Anfrage wird gestartet',
                askforlinks:'Frage Server nach Links. Bitte warten ...',
                searchforfb:'Suche nach Facebook-Login ...',
                cantfindfb:'Facebook-ID konnte nicht ermittelt werden',
                foundfb:'Facebook-ID gefunden',
                preparestart:'Bereite Start vor',
                requested:'Anfrage an Server gestellt...',
                nonewlinks:'Keine neuen Links vorhanden',
                waitforlike:'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
                from:'von',
                klicklike:'Klicke "Gefällt mir"',
                linkscalled:'Links aufgerufen',
                ok:'ok',
                expired:'Abgelaufen',
                unknown:'Unbekannt',
                intogame:'geht ins Spiel',
                pagelet_wall:"Private-Pinnwand gefunden",
                pagelet_group_mall:"Gruppen-Pinnwand gefunden",
                pagelet_home_stream:"Eigene-Pinnwand gefunden",
                pagelet_notfound:"Keine Facebook Pinnwand gefunden",
                startsearch:"Beginne Suche nach Links",
                dnotfoundlnk:"Keine MW Links gefunden",
                dnotfoundfhlnk:'Keine Links für Fetch and Hide gefunden',
                serverconerr:"Bei der Kommunikation mit dem Server ist ein Fehler aufgetreten",
                senddata:'Übermittle Ergebnisse an den Server. Bitte warten ...',
                userabbord:'Abbruch durch Benutzer',
                msgfrommw:'Nachricht von Monster World: '
            },
            prompt:{
                imonfb:'Du startest den Klicker außerhalb von Facebook. Stell sicher, dass du bei FB eingelogt bis.\nWeiter machen?',
                linksinqueue:'x "Gefällt mir" in der Warteschlange'
            }
        },
        nl:{
            buttons:{
                stop:'Stoppen',
                searchFBID:'Facebook-ID suchen',
                reset:'Klaar',
                options:'Instellungen',
                save:'Opslaan',
                abbort:'Annuleren',
                help:'Help',
                go:'ok'
            },
            options:{
                options:'Opties',
                windowpos:'Vensterpositie',
                usewindows:'Gelijktijdige aanvragen',
                delay:'Vertraging',
                delayLike:'Wachttijd - Like',
                writeemail:'Email sturen',
                lkuserscripts:'Link Klicker op userscripts.org',
                language:'Taal',
                dbmax:'Stoppe DB-Modus nach ',
                stopafterlimreach:'Na het bereiken van de dagelijkse aanslag',
                usestore:'Local Storage nutzen'
            },
            tag:{
                windowpos:'"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
                usewindows:'"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
                delay:'"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
                delaylike:'"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
                dbmax:'"Automatisch Anhalten nach x abgearbeiteten Links aus der WGC-Datenbank"'
            },
            error:{
                valueoutofrange:'Waarde ligt buiten het toelaatbare bereik',
                error:'error',
                cantreadcontent:' kan niet uitgelezen worden. Gaat wellicht naar het spel ',
                linkintogame:'Dieser Link führt ins Spiel',
                cantfindkey:'signed_request-Key niet gevonden. Bij Facebook aangemeld?',
                onerror_fb:'De Facebook-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
                onerror_wooga:'De Monster World-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
                timeout:'Aanvraag kan niet binnen de tijd verwerkt worden.',
                statuserr:'meldet einen Verbindungsfehler',
                linkisold:'Diser Link wurde bereits von dir geklickt'
            },
            string:{
                like:'Vind ik leuk',
                starsdbbonus:'Gesloten groep. Alleen Betatesters.',
                starsdbwoogo:'WoGartenCenter is een Databank voor Woogoo- en plantenlinks.\nVoeg je eigen links toe en klik die van anderen.\nIedere Monster World Speler is welkom.\n(Aanmelding verplicht)\n\nhttps://wogartencenter.de',
                insertlinks:'Plak hier je links en druk op start\n\nTip:\nEr mag ook onzin bij staan.\nDe Links worden eruit gefiltert.',
                lrready:'Monster World Link Klicker werd gestart',
                running:'loopt',
                end:'beëindigt',
                woogo:"Woogoo",
                plants:"planten",
                ignored:"genegeerd",
                found:"gevonden",
                stars:"Sterren",
                time:'Zeit'
            },
            mode:{
                mode1:'Facebook (klik Vind ik leuk)',
                mode2:'Facebook (zonder vind ik leuk)',
                mode3:'WoGartenCenter - DB',
                mode4:'Alle Links van deze pagina',
                mode5:'Links handmatig invoeren',
                mode6:'WGC - Testarea',
                mode7:'Markeermodule',
                mode8:'Fetch and Hide'
            },
            message:{
                message102:'Links van de Server ontvangen. Het feest kan beginnen.',
                message104:'DAta ontvangst door server bevestigd',
                message1041:'Loop-modus | Nieuwe aanvraag wordt gestart',
                askforlinks:'Vraagt server om links. Eventjes geduld aub ...',
                searchforfb:'Zoekt Facebook-Login ...',
                cantfindfb:'Facebook-ID kan niet gevonden worden',
                foundfb:'Facebook-ID gevonden',
                preparestart:'Bereite Start vor',
                requested:'Aanvraag bij server gedaan...',
                nonewlinks:'Geen nieuwe links gevonden',
                waitforlike:'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
                from:'van:',
                klicklike:'Klik "Vind ik leuk"',
                linkscalled:'Links opgeroepen',
                ok:'ok',
                expired:'Afgelopen',
                unknown:'Onbekend',
                intogame:'geht ins Spiel',
                pagelet_wall:"Privé prikbord gevonden",
                pagelet_group_mall:"Groepen prikbord gevonden",
                pagelet_home_stream:"Eigen prikbord gevonden",
                pagelet_notfound:"Geen Facebook Prikbord gevonden",
                startsearch:"Start de zoektocht naar links",
                dnotfoundlnk:"Geen MW Links gevonden",
                dnotfoundfhlnk:'Keine Links für Fetch and Hide gefunden',
                serverconerr:"Tijdens de communicatie met de server is een fout opgetreden",
                senddata:'Resultaten worden nu doorgestuurd naar de Server. Eventjes geduld ...',
                userabbord:'Geannuleerd door gebruiker',
                msgfrommw:'Bericht van Monster World: '
            },
            prompt:{
                imonfb:'Je start de Klikker buiten Facebook. Let op dat je bij facebook ingelogt bent.\nVerder gaan?',
                linksinqueue:'x "vind ik leuk" in de wacht'
            }
        },
        fr:{
            buttons:{
                stop:'Arrêt',
                searchFBID:'Facebook-ID suchen',
                reset:'Terminé',
                options:'Paramètres',
                save:'Sauvegarder',
                abbort:'Annuler',
                help:'Aide',
                go:'ok'
            },
            options:{
                options:'Options',
                windowpos:'Position',
                usewindows:'Demandes simultanées',
                delay:'Délai entre clics de liens',
                delayLike:'Délai entre j"aime',
                writeemail:'Envoyer email',
                lkuserscripts:'Link Klicker sur userscripts.org ',
                language:'Langue',
                dbmax:'Stoppe DB-Modus nach ',
                stopafterlimreach:'Après avoir atteint la limite quotidienne d arrêt',
                usestore:'Local Storage nutzen'
            },
            tag:{
                windowpos:'"Position du cliqueur sur l"écran. Origine en haut à droite."',
                usewindows:'"Nombre de liens ouverts simultanement"',
                delay:'"Délai de pause entre ouvertures de liens - Recommandation : 0"',
                delaylike:'"Attente minimale entre les clics sur -J"aime-."',
                dbmax:'"Automatisch Anhalten nach x abgearbeiteten Links aus der WGC-Datenbank"'
            },
            error:{
                valueoutofrange:'Valeur hors limites',
                error:'Erreur',
                cantreadcontent:'Contenu illisible. Format inconnu.',
                linkintogame:'Lien dirigé vers le jeu.',
                cantfindkey:'Mot de passe introuvable. Etes-vous connecté ?',
                onerror_fb:'Le serveur Facebook signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
                onerror_wooga:'Le serveur Wooga-MW signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
                timeout:'La demande pour ce lien a dépassé le délai d"attente normal.',
                statuserr:'Erreur de connexion signalée',
                linkisold:'Diser Link wurde bereits von dir geklickt'
            },
            string:{
                like:'J"aime',
                starsdbbonus:'Groupe restreint. Pour les Betatesteurs seulement',
                starsdbwoogo:'WoGartenCenter est une base de liens de Woogoo et de plantes.\nMettez-y vos liens et cliquez ceux des autres.\nTout joueur de MonsterWorld est bienvenu.\n(Inscription obligatoire)\n\nhttps:// wogartencenter.de ',
                insertlinks:'Insérez vos liens ici, puis cliquez OK\n\nAstuce :\nVous pouvez mettre du texte avec vos liens dans cette fenêtre.\nLes Liens seront filtrés et sélectionnés.',
                lrready:'Monster World Link Klicker démarré',
                running:'En cours',
                end:'Fin',
                woogo:"Woogoo",
                plants:"Plantes",
                ignored:"Ignorés",
                found:"Trouvés",
                stars:"Etoiles",
                time:'Zeit'
            },
            mode:{
                mode1:'Facebook (avec J aime)',
                mode2:'Facebook (sans J aime)',
                mode3:'WoGartenCenter - DB',
                mode4:'Tous les liens de cette page',
                mode5:'Insertion manuelle',
                mode6:'WGC - Zone de test',
                mode7:'Mode marquage',
                mode8:'Fetch and Hide'
            },
            message:{
                message102:'Liens reçus du Serveur. Processus démarré.',
                message104:'Réception des données depuis le serveur confirmée',
                message1041:'Mode-boucle | Une nouvelle demande va commencer',
                askforlinks:'Demande de liens au serveur. Patientez SVP...',
                searchforfb:'Recherche identifiant Facebook...',
                cantfindfb:'Identifiant Facebook introuvable',
                foundfb:'Identifiant Facebook trouvé',
                preparestart:'Préparation avant démarrage',
                requested:'Demande envoyée au serveur...',
                nonewlinks:'Aucun nouveau lien trouvé',
                waitforlike:'Attente jusqu"à ce que tous les clics sur "J"aime" soient faits',
                from:'de la part de :',
                klicklike:'Clic sur "J"aime"',
                linkscalled:'Liens ouverts',
                ok:'ok',
                expired:'expiré',
                unknown:'inconnu',
                intogame:'dirigé vers le jeu',
                pagelet_wall:"Page privée trouvée",
                pagelet_group_mall:"Page de groupe trouvée",
                pagelet_home_stream:"Page personnelle trouvée",
                pagelet_notfound:"Aucune page Facebook trouvée",
                startsearch:"Recherche de liens commencée",
                dnotfoundlnk:"Aucun lien MW trouvé",
                dnotfoundfhlnk:'Keine Links für Fetch and Hide gefunden',
                serverconerr:'Une erreur s"est produite dans la communication avec le serveur',
                senddata:'Transmission des résultats au serveur. Patientez SVP...',
                userabbord:'Annulé par l"utilisateur',
                msgfrommw:'Message de Monster World: '
            },
            prompt:{
                imonfb:'Vous lancez Link klicker hors de Facebook. Connectez-vous sur FB avant\nContinuer ?',
                linksinqueue:'x "J"aime" en attente'
            }
        },
        it:{
            buttons:{
                stop:'Stop',
                searchFBID:'Facebook-ID suchen',
                reset:'Reset',
                options:'Opzioni',
                save:'Salva',
                abbort:'Esci',
                help:'Help',
                go:'Vai'
            },
            options:{
                options:'Opzioni',
                windowpos:'Posizione',
                usewindows:'Richieste simultanee',
                delay:'Intervallo di attesa',
                delayLike:'Intervallo "Mi piace"',
                writeemail:'Scrivi e-mail',
                lkuserscripts:'Link Klicker @ userscripts.org',
                language:'Lingua',
                dbmax:'Stoppa il DB dopo',
                stopafterlimreach:'Dopo aver raggiunto la fermata limite giornaliero',
                usestore:'Local Storage nutzen'
            },
            tag:{
                windowpos:'"Posizione all interno del menu. 0 e in alto a destra"',
                usewindows:'"Numero di richieste simultanee al server"',
                delay:'"Tempo di attesa dopo l\'aperura di un link - Default e\': 0"',
                delaylike:'"Tempo di attesa per un - Mi piace - Click, poi attende fino al prossimo."',
                dbmax:'"Arresta automaticamente dopo X links elaborati dal database WGC"'
            },
            error:{
                valueoutofrange:'Valore al di fuori del range consentito',
                error:'Errore',
                cantreadcontent:'Non posso leggere il contenuto. Formato sconosciuto.',
                linkintogame:'Collegamento algioco',
                cantfindkey:'ID Facebook non trovato. Si e\' connessi a Facebook?',
                onerror_fb:'Il server di Facebook restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
                onerror_wooga:'Il server di Monster World restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
                timeout:'La richiesta di questo collegamento non è stata risolta nel tempo assegnato.',
                statuserr:'Segnala un errore di connessione',
                linkisold:'Diser Link wurde bereits von dir geklickt'
            },
            string:{
                like:'Mi piace',
                starsdbbonus:'Gruppo chiuso. Solo per i beta tester.',
                starsdbwoogo:'WoGartenCenter e\' un database di piante e collegamenti Woogoo.\nI giocatori di Monster World sono ibenvenuti.\n(E\' richiesta la registrazione)\n\nhttps://wogartencenter.de',
                insertlinks:'Copia e incolla i link inquesto box, quindi premi START \ n \ nSuggerimento: \ nPuoi inserire anche altro testo (anche senza senzo) \ nI collegamenti sono filtrati.',
                lrready:'Monster World Link Klicker in avvio',
                running:'In corso',
                end:'Fine',
                woogo:"Woogoo",
                plants:"Piante",
                ignored:"Ignorato",
                found:"Trovato",
                stars:"Stelle"
            },
            mode:{
                mode1:'Facebook (con "Mi piace")',
                mode2:'Facebook (senza "Mi piace")',
                mode3:'WoGartenCenter - DB',
                mode4:'Tutti i link del sito corrente',
                mode5:'Inserimento manuale dei link',
                mode6:'WGC - Testarea',
                mode7:'Selezione modalità',
                mode8:'Recupera e nascondi'
            },
            message:{
                message102:'Links dal Server ricevuti. Avviare il processo.',
                message104:'Ricezione dei dati confermata dal server',
                message1041:'Modalita Loop | Avvio nuova richiesta',
                askforlinks:'Richiesta del link al Server. Prego attendere ...',
                searchforfb:'Ricerca Login di Facebook ...',
                cantfindfb:'Facebook-ID non trovato',
                foundfb:'Facebook-ID trovato',
                preparestart:'Preparazione per inizio',
                requested:'Richiesta fatta al server...',
                nonewlinks:'Nessun nuovo Link trovato',
                waitforlike:'Attendere fino a che tutti i "Mi piace" siano cliccati',
                from:'Da',
                klicklike:'Click "Mi piace"',
                linkscalled:'Links chiamato',
                ok:'Ok',
                expired:'Scaduti',
                unknown:'Sconosciuti',
                intogame:'Link al gioco',
                pagelet_wall:"Trovata richiesta privata",
                pagelet_group_mall:"Trovata Bacheca del gruppo",
                pagelet_home_stream:"Trovata la mia bacheca",
                pagelet_notfound:"Nessuna bacheca trovata",
                startsearch:"Inizia la ricerca per i collegamenti",
                dnotfoundlnk:"Nessun link trovato",
                dnotfoundfhlnk:'Nessun link trovato per "Recupera e Nascondi"',
                serverconerr:"Errore di comunicazione col server",
                senddata:'Invio dei risultati al server... attendere prego',
                userabbord:'Annullata dall\' utente',
                msgfrommw:'Messaggio del Mondo Monster: '
            },
            prompt:{
                imonfb:'Si avvia il clicker al di fuori di Facebook. Assicurarsi di essere connessi a FB. \ Vai?',
                linksinqueue:'x "Mi piace" in coda'
            }
        },
        en:{
            buttons:{
                stop:'Stop',
                searchFBID:'Search for Facebook-ID',
                reset:'Finished',
                options:'Settings',
                save:'Save',
                abbort:'Cancel',
                help:'Help',
                go:'ok'
            },
            options:{
                options:'Options',
                windowpos:'Position',
                usewindows:'Concurrent requests',
                delay:'Wait after Link-Click',
                delayLike:'Wait after "I like"',
                writeemail:'wite e-mail',
                lkuserscripts:'Link Klicker on userscripts.org',
                language:'Language',
                dbmax:'Stop DB-mode after ',
                stopafterlimreach:'Stop after reach Daylimit',
                usestore:'Use Local Storage'
            },
            tag:{
                windowpos:'"Position of the menu on-screen. Zero is upper right corner."',
                usewindows:'"Amount of concurrent requests to the server"',
                delay:'"Time to wait after clicking - recommendation: 0"',
                delaylike:'"Time to wait after -I like- click before the next one occurs."',
                dbmax:'"Stop automatically after clicking x links from the WGC-database"'
            },
            error:{
                valueoutofrange:'Out of range',
                error:'Input error',
                cantreadcontent:'cannot read, format is unknown.',
                linkintogame:'Link goint straight to the game',
                cantfindkey:'signed_request-Key not found - logged in in Facebook??',
                onerror_fb:'The Facebook-server reports an error. Link is skipped, next one following in a few seconds.',
                onerror_wooga:'The MonsterWorld-server reports an error. Link is skipped, next one following in a few seconds.',
                timeout:'The request was not honoured in the given time.',
                statuserr:'reports connection-error.',
                linkisold:'Diser Link wurde bereits von dir geklickt'
            },
            string:{
                like:'I like',
                starsdbbonus:'Closed group. Only for Betatesters.',
                starsdbwoogo:'WoGartenCenter is a database for Woogoo- and Plants-links.\nEnter your links and click the links of others.\nEvery MonsterWorld player is welcome.\n(Registration required)\n\nhttps://wogartencenter.de',
                insertlinks:'Paste your links in this field, then press START\n\nTip:\nYou can also enter random text in this field.\nLinks get filtered out.',
                lrready:'Monster World Link Klicker is starting',
                running:'running',
                end:'finished',
                woogo:"Woogoo",
                plants:"Plants",
                ignored:"Skipped",
                found:"Found",
                stars:"Stars",
                time:'Time'
            },
            mode:{
                mode1:'Facebook (with like)',
                mode2:'Facebook (without like)',
                mode3:'WoGartenCenter - DB',
                mode4:'All Links from this page',
                mode5:'Enter links manually',
                mode6:'WGC - Testarea',
                mode7:'Marking mode',
                mode8:'Fetch and Hide'
            },
            message:{
                message102:'Links from server recieved - Starting processing.',
                message104:'Recieved data aknowledged by server',
                message1041:'Loop-Mode | New request being started',
                askforlinks:'Asking server for links. Please wait...',
                searchforfb:'Search for Facebook-Login ...',
                cantfindfb:'Facebook-ID not available',
                foundfb:'Facebook-ID found',
                preparestart:'Preparing for start',
                requested:'Request sent...',
                nonewlinks:'No new links available',
                waitforlike:'Waiting until all "I like" clicks are finished',
                from:'by',
                klicklike:'Click "I like"',
                linkscalled:'Links called',
                ok:'ok',
                expired:'expired',
                unknown:'unknown',
                intogame:'going in game',
                pagelet_wall:"Private-Wall found",
                pagelet_group_mall:"Group-Wall found",
                pagelet_home_stream:"Own Wall found",
                pagelet_notfound:"No Facebook-wall found",
                startsearch:"Start searching for links",
                dnotfoundlnk:"No MW links found",
                dnotfoundfhlnk:'No links found for Fetch and Hide',
                serverconerr:"Error communicating with server",
                senddata:'Sending results to server, please wait...',
                userabbord:'User aborted',
                msgfrommw:'Message from Monster World: '
            },
            prompt:{
                imonfb:'You try to start Klicker outside of Facebook. Ensure that you are logged in in Facebook.\nContinue?',
                linksinqueue:'x "I like" in Queue'
            }
        }
    };

    eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('5y={83:[10,11,13,14],7G:[21],9i:[8],7D:[8,10,11,13,14,21]};B 1g=N 2o(3,1,2,4,5,6,\'1r\',\'1z\');B 82=N 2o(1,2,3,4,5,6,\'26\');B 5r=N 2o(3,\'26\');B 7B=N 2o(0,8,10,11,13,14,21);B 3C;B 3c;B 39=3i.39;B 2B=D;B 3r=E;B 1s;B 3j;B 4a;B 4f;B 7z;B 54;B 5f;B e={G:{4Q:\'aC\',7F:\'4c://a1.a0.9X.9Y.1B/aa?\',7q:M.6x.6R+\'//2z.2f.1B/2u-2x/?\',81:\'4c://79.3Z/9J.73\',1L:U,4h:10,66:10,3H:60,1S:5,4q:0,9F:0,7y:D,7U:D,9H:E,1N:E},5E:{aA:"4c://"+M.6x.aL,aw:au.ap.aq("7i")>-1?D:E,5s:E},n:{2r:U,2s:U,l:\'3Z\',5h:E}};g 8z(){2y=3i.4r("t");2y.p="2y";39.4w(2y);$(2y).1p({3v:\'4m\',2S:e.n.2r+\'1i\',2g:e.n.2s+\'1i\',2G:\'1w\'}).1W(\'4v\')}g 8a(){$(\'#2y\').1d(\'<t p="4o"></t>\');$(\'#4o\').1p({2S:\'1v\',1s:\'1v 38 #3I\',2W:\'9c\',1u:\'74\',6t:\'1v 1v 1j 1j\',W:\'#2j\',3L:\'#3I\',1A:\'1Z 6C 1Z 1X\',9e:\'0.5\',2G:\'1w\'}).1T("9h 9g 9y - v"+e.G.4Q+" <3k 3u=\\"1s:1Z 38 #2j;1A:1j 1v 1Z 1v;34:1j 1j 1j 6C;6k:2S\\">x</3k> <3k 3u=\\"1s:1Z 38 #2j;1A:1j 1v 1Z 1v;6k:2S\\">9A</3k>").9u().1p(\'5U\',\'9o\').67(g(){j(3c)4Y(3c);45(D)},g(){3c=M.1O(g(){45(E)},6P)})};g 7S(){5M=9p;5K=9l;2H=3i.4r("t");2H.p="2H";39.4w(2H);$(2H).1p({3v:\'4m\',2g:\'50%\',2S:\'50%\',5w:-(5M/2)+\'1i\',65:-(5K/2)+\'1i\',2G:\'4e\'}).1W(\'4v\');$(2H).1d(\'<95 p="35" F="4z"></95>\').1c();$(\'#35\').1p({2W:5M+\'1i\',1u:5K+\'1i\',1A:\'6l\',6i:\'4P\',4l:\'9C\',9z:\'9k\'}).4M(\'<br><19 1l="3C" 2R="5l" p="5l" F="3h" 1b="\'+o[e.n.l].2h.9w+\'"></19>\');$(\'#5l\').1m(g(){5N(E);2p();e.G.2O=E;2m=5;3g(D);j(3b(2)){2U();2L()}$(35).T(\'\')});35=$(\'#35\')}g 7Z(){5L=9j;5O=9v;x=3X.5A-6W;y=3X.5D-3t;e.G.2c?5t=\'3M="3M"\':5t=\'\';e.G.1N?6m=\'3M="3M"\':6m=\'\';2J=3i.4r("t");2J.p="2J";39.4w(2J);$(2J).1p({3v:\'4m\',2g:\'50%\',2S:\'50%\',5w:-(5L/2)+\'1i\',65:-(5O/2)+\'1i\',2G:\'4e\'}).1W(\'4v\');$(2J).1d(\'<t p="90" F="4z"></t>\').1c();$(\'#90\').1p({2W:5L+\'1i\',1u:5O+\'1i\',1A:\'6l\',6i:\'4P\'}).1T(\'<t p="6A">\'+\'<6b><2Z>\'+o[e.n.l].1x.1x+\'</2Z></6b>\'+\'<1o>\'+\'<1K>\'+o[e.n.l].1x.6f+\'</1K>\'+\'<t F="2d" 15=\'+o[e.n.l].32.6f+\'>X:</t><19 p="2r" 1b=\'+e.n.2r+\' 2Y="3" 1l="V"> (2 - \'+x+\')<br />\'+\'<t F="2d" 15=\'+o[e.n.l].32.6f+\'>Y:</t><19 p="2s" 1b=\'+e.n.2s+\' 2Y="3" 1l="V"> (25 - \'+y+\')\'+\'</1o>\'+\'<1o 15=\'+o[e.n.l].32.5H+\'>\'+\'<1K>\'+o[e.n.l].1x.5H+\'</1K>\'+\'<t F="2d">\'+o[e.n.l].1x.5H+\':</t><19 p="1S" 1b=\'+e.G.1S+\' 2Y="3" "1l="V"> (3O 5)<br />\'+\'</1o>\'+\'</1o>\'+\'<1o 15="">\'+\'<1K>9n</1K>\'+\'<t F="2d" 15=\'+o[e.n.l].32.4C+\'>\'+o[e.n.l].1x.9s+\':</t><19 p="4C" 1b=\'+e.G.4h+\' 2Y="3" "1l="V"> 8Y<br />\'+\'<t F="2d" 15=\'+o[e.n.l].32.1L+\'>\'+o[e.n.l].1x.1L+\':</t><19 p="1L" 1b=\'+e.G.1L+\' 2Y="3" "1l="V"> 8Y<br />\'+\'</1o>\'+\'</1o>\'+\'<1o 15="">\'+\'<1K>9r</1K>\'+\'<t F="2d" 15=\'+o[e.n.l].32.1J+\'>\'+o[e.n.l].1x.1J+\':</t><19 p="1J" 1b=\'+e.G.1J+\' 2Y="3" "1l="V"> 9q<br />\'+\'<t F="2d" 15=\'+o[e.n.l].32.1J+\'>\'+o[e.n.l].1x.2c+\':</t><19 p="2c" 1b="D" 1l="7W" \'+5t+\'/><br />\'+\'</1o>\'+\'</1o>\'+\'<1o 15="">\'+\'<1K>9B</1K>\'+\'<t F="2d" 15="">\'+o[e.n.l].1x.1N+\':</t><19 p="1N" 1b="D" 1l="7W" \'+6m+\'/><br />\'+\'</1o>\'+\'</1o>\'+\'<1o 15="">\'+\'<1K>\'+o[e.n.l].1x.l+\'</1K>\'+\'<t F="2d" 15=""></t><5Y p="l">\'+\'<2l 1b="3Z">9D</2l>\'+\'<2l 1b="99">9f</2l>\'+\'<2l 1b="9a">9d</2l>\'+\'<2l 1b="9m">aN</2l>\'+\'<2l 1b="ao">ar</2l>\'+\'</5Y><br>\'+\'</1o>\'+\'<br><br>\'+\'<2Z><a 1Q=an:ah@ag.3Z>\'+o[e.n.l].1x.af+\'</a> | <a 1Q="4c://ai.8v/aj/3y/al">5S ak 9E av.8v</a><br><br>\'+\'<6I aH="27://4p.aG.1B/aJ-aM/aF" 3J="aE"><19 1l="7P" 2R="az" 1b="ay-ax"><19 1l="7P" 2R="aB" 1b="aD"><19 p="7f" 1l="ae" 8O="27://4p.8N.1B/8M/ad/i/9Q/9P.8L" 1s="0" 2R="9S" 8I="9M 9L, 9K 9V 9W a8 a7 â�� a6 a9."><ac 8I="" 1s="0" 8O="27://4p.8N.1B/8M/i/ab/a5.8L" 1u="1" 2W="1"></6I>\'+\'</b><br>\'+\'</t>\').4M(\'<19 1l="3C" 2R="5V" p="5V" F="3h" 1b="\'+o[e.n.l].2h.a4+\'"></19><19 1l="3C" 2R="5T" p="5T" F="3h" 1b="\'+o[e.n.l].2h.9Z+\'"></19>\');4O=$(\'#2r\');4K=$(\'#2s\');4j=$(\'#1S\');4n=$(\'#4C\');4x=$(\'#1L\');4b=$(\'#1J\');8D=$(\'#2c\');8X=$(\'#1N\');$(\'#5V\').1m(g(){1U("2r",$(4O).T());1U("2s",$(4K).T());1U("1S",$(4j).T());1U("8H",$(4n).T());1U("1L",$(4x).T());1U("l",$(\'#l\').T());1U("1J",$(4b).T());e.G.2c=$(8D).1q("3M")?D:E;1U("2c",e.G.2c);e.G.1N=$(8X).1q("3M")?D:E;1U("1N",e.G.1N);e.G.1S=$(4j).T();e.G.4h=$(4n).T();e.G.1J=$(4b).T();4Z(E)});$(\'#5T\').1m(g(){4Z(E)});$(\'#2r, #2s, #1S, #4C, #1L, #1J\').a2(g(){B x=$(4O).T();B y=$(4K).T();B f=$(4j).T();B d=$(4x).T();B 4R=$(4n).T();B 3O=$(4b).T();j(3O>a3||3S(2F(3O))){3O=1w;$(4b).T(3O)}j(x<2||x>3X.5A-6W||3S(2F(x))){x=2;$(4O).T(x)}j(y<25||y>3X.5D-3t||3S(2F(y))){y=40;$(4K).T(y)}j(f>5||(3S(2F(f)))){f=1;$(4j).T(f)}j((3S(2F(4R)))){4R=30;$(4n).T(4R)}j((3S(2F(d)))){d=30;$(4x).T(d)}2y.3u.2S=x+\'1i\';2y.3u.2g=y+\'1i\'})}g 80(){1V=3i.4r("t");1V.p="1V";39.4w(1V);$(\'#1V\').1p({3L:\'#3U\',1u:3X.5A+\'1i\',2W:3X.5D+\'1i\',3v:\'4m\',2g:\'0\',5d:\'0\',2G:\'9I\'}).1c()}g 87(){6q=3t;6G=9G;2w=3i.4r("t");2w.p="2w";39.4w(2w);$(\'#2w\').1p({3v:\'4m\',2g:\'50%\',2S:\'50%\',5w:-(6q/2)+\'1i\',65:-(6G/2)+\'1i\',2G:\'4e\'}).1W(\'4v\');$(\'#2w\').1d(\'<t p="6z" F="4U"></t>\');$(\'#6z\').1p({3L:\'2X\',W:\'#3U\'}).1c();$(\'#2w\').1d(\'<t p="36" F="4U"></t>\');$(\'#36\').1c();$(\'#2w\').1d(\'<t p="3D" F="4U"></t>\');$(\'#3D\').1T(\'<7I 3u="V-48:2Z" 9N="9T"  1u="9U%" 9R="4" F="7C"><4T><2i>\'+o[e.n.l].L.7o+\'</2i><2i>\'+o[e.n.l].L.7p+\'</2i><2i>\'+o[e.n.l].L.55+\'</2i><2i>\'+o[e.n.l].L.7u+\'</2i><2i>\'+o[e.n.l].2N.9O+\'</2i></4T>\'+\'<4T><2b p="8m">0</2b><2b p="8i">0</2b><2b p="8h">0</2b><2b p="8d">0</2b><2b p="8e">0</2b></4T></7I>\').1c();$(\'#2w\').1d(\'<t p="2k" F="4z"></t>\');$(\'#2k\').1p({2W:6q+\'1i\',1u:6G+\'1i\',6t:\'43\',1A:\'1X\',6i:\'4P\',2G:\'4e\'}).1c();$(\'#2k\').4M(\'<19 1l="3C" 2R="3W" p="3W" F="3h" 1b="\'+o[e.n.l].2h.2p+\'"></19>\');$(\'#3W\').1m(g(){3g(E);2p()}).1c();$(\'#2k\').4M(\'<19 1l="3C" 2R="4N" p="4N" F="3h" 1b="\'+o[e.n.l].2h.aI+\'"></19>\');$(\'#4N\').1m(g(){2B=E;$(O).1D(\'Q\',0.2)}).1c();1s=$(\'#4o\');3j=$(\'#2k\');4a=$(\'#36\');4f=$(\'#6z\');7z=$(\'#3D\');54=$(\'#3W\');5f=$(\'#4N\')}g 88(){$(\'#2y\').1d(\'<t p="1Y"></t>\');$(\'#1Y\').1p({3v:\'am\',1u:\'at\',2g:\'as\',6t:\'1j 1j 1v 1v\',1s:\'1Z 38 #3I\',3L:\'#2j\',2G:\'5R\'}).1c();$(\'#1Y\').67(g(){j(3c)4Y(3c);45(D)},g(){3c=M.1O(g(){45(E)},6P)});$(\'#1Y\').1d(\'<t p="R"></t>\');$(\'#R\').1p({W:\'#3U\',9b:\'2Z\',1A:\'1X\',1u:\'74\'});$(\'#R\').1d(\'<t F="R" p="69">\'+o[e.n.l].1n.92+\'</t>\');$(\'#69\').1m(g(){$(\'#1Y\').3T(\'Q\',g(){5F()})}).1c();$(\'#R\').1d(\'<t F="R" p="68">\'+o[e.n.l].1n.7O+\'</t>\');$(\'#68\').1m(g(){$(\'#1Y\').3T(\'Q\',g(){5k()})}).1c();$(\'#R\').1d(\'<t F="R" p="63">\'+o[e.n.l].1n.91+\'</t>\');$(\'#63\').1m(g(){5j()}).1c();$(\'#R\').1d(\'<t F="R" p="7e">\'+o[e.n.l].1n.7w+\'</t>\');$(\'#7e\').1m(g(){$(\'#1Y\').3T(\'Q\',g(){5n()})});$(\'#R\').1d(\'<t F="R" p="6U">\'+o[e.n.l].1n.7A+\'</t>\');$(\'#6U\').1m(g(){6d()});$(\'#R\').1d(\'<t F="R" p="62">\'+o[e.n.l].1n.93+\'</t>\');$(\'#62\').1m(g(){5o()}).1c();$(\'#R\').1d(\'<t F="R" p="61">\'+o[e.n.l].1n.5p+\'</t>\');$(\'#61\').1m(g(){$(\'#1Y\').3T(\'Q\',g(){5i()})}).1c();$(\'#R\').1d(\'<t F="R" p="64">\'+o[e.n.l].1n.6Y+\'</t>\');$(\'#64\').1m(g(){$(\'#1Y\').3T(\'Q\',g(){6Q()})}).1c();$(\'#R\').1d(\'<t F="R" p="6a">\'+o[e.n.l].1x.98+\'</t>\');$(\'#6a\').1m(g(){6N()});$(\'#R\').1d(\'<9x><t F="R" p="7E">\'+o[e.n.l].2h.1x+\'</t>\');$(\'#7E\').1m(g(){6u()});$(\'#R\').1d(\'<t F="R" p="7r">\'+o[e.n.l].2h.7s+\'</t>\');$(\'#7r\').1m(g(){6h()});$(\'.R\').67(g(){$(O).1p({5U:\'3o\',3L:\'#9t\'})},g(){$(O).1p({5U:\'6S\',3L:\'#2j\'})}).1p({34:\'1v\',1A:\'1X\',4L:\'6S aK% "7V 8s",8q,8p,8u,8w-8l\'})}g 5F(){29();2p();17.2C=N 1h();2O=D;2m=1;57()}g 5k(){29();2p();17.2C=N 1h();e.G.2O=E;2m=2;57()}g 5j(){29();17.2C=N 1h();17.2C=N 1h();56(3)}g 5n(){29();2p();17.2C=N 1h();3g(D);e.G.2O=E;2m=4;j(3b(1)){2U();2L()}}g 6d(){29();17.2C=N 1h();5N(D)}g 5o(){29();17.2C=N 1h();56(6)}g 5i(){29();2m=7;57(D);1I(o[e.n.l].1n.5p);$(\'#3W\').3y()}g 6Q(){29();2m=8;2B=E;3g(D);j(7m()){2U();4J=D;18(B i=0;i<k.1z.C;i++)5q(i);1E[0]=2m;6E()}1I(o[e.n.l].1n.6Y);$(\'#3W\').3y()}g 6u(){4Z(D);M.1O(g(){$(\'#7f\').7c({1u:"+=10%"},1w,g(){$(O).7c({1u:"-=10%"},1w)})},1w)}g 6h(){6v("4c://cA.79.3Z")}g 3g(2D){j(2D==D){$(1V).1D(\'Q\',0.8);$(\'#36, #2k, #3D\').3N(\'Q\');$(5f).3N().1D(\'cB\',1)}J{$(\'.3h, #36, #2k, #3D\').3P(\'Q\');$(\'#1V\').1D(\'Q\',0).1c()}}g 4Z(2D){j(2D==D){$(1V).1D(\'Q\',0.8);$(2J).3N(\'Q\')}J{$(1V).1D(\'Q\',0).1c();$(2J).3P(\'Q\')}}g 5N(2D){j(2D==D){$(1V).1D(\'Q\',0.8);$(2H).3N(\'Q\');$(\'#35\').5Y().cC()}J{$(1V).1D(\'Q\',0).1c();$(2H).3P(\'Q\')}}g 45(2D){j(2D==D){$(\'#4o\').1D(\'Q\',1);$(\'#1Y\').cz(\'Q\')}j(2D==E){$(\'#4o\').1D(\'Q\',0.5);$(\'#1Y\').3T(\'Q\')}}g 57(2I){3g(D);1C=7l();4s(1C){Z 1:K(o[e.n.l][\'L\'][\'7k\']);j(3b()){j(!2I)4V();4i();42();2U();j(!2I)2L()}P;Z 2:K(o[e.n.l][\'L\'][\'7h\']);j(3b()){j(!2I)4V();4i();42();2U();j(!2I)2L()}P;Z 3:K(o[e.n.l][\'L\'][\'7v\']);j(3b()){j(!2I)4V();4i();42();2U();j(!2I)2L()}P;3o:j(3b(1)){4i();42();2U();j(!2I)2L()}P}}g 7l(){1C=U;j($(\'t[p="7k"]\').C)1C=1;J j($(\'t[p="7h"]\').C)1C=2;J j($(\'t[p="7v"]\').C)1C=3;1F 1C}g 3b(5v){K(o[e.n.l][\'L\'][\'cy\']);B H=0;B 1R=0;j(5v==1)$(\'a:6o(1Q,^27?:\\/\\/2z.2f.1B\\/2u-2x\\/)\').3d(g(){B 3s=$(O).1q(\'1Q\');j(3s){1e=3s.2a(/27?:\\/\\/2z.2f.1B\\/2u-2x\\/\\?.*3x=([0-9]{1,2}).*&3z=([0-9]{1,2}).*&u=([a-3Y-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3p=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){18(q=0;q<1e.C;q++){j(!k[q])k[q]=N 2o();k[q][H]=1e[q]}k.1r[H]=$(O);k[\'1z\'][H]=H;k[\'I\'][H]=U;H++}}});J j(5v==2){5e=$(\'#35\').T().2a(/27?:\\/\\/2z.2f.1B\\/2u-2x\\/\\?.*3x=([0-9]{1,2}).*&3z=([0-9]{1,2}).*&u=([a-3Y-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3p=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/cv);j(5e!=U){18(H=0;H<5e.C;H++){1e=5e[H].2a(/27?:\\/\\/2z.2f.1B\\/2u-2x\\/\\?.*3x=([0-9]{1,2}).*&3z=([0-9]{1,2}).*&u=([a-3Y-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3p=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){18(B q=0;q<1e.C;q++){j(!k[q])k[q]=N 2o();k[q][H]=1e[q]}k.1r[H]=$(O);k[\'1z\'][H]=H;k[\'I\'][H]=U}}}}J $(\'7H[F~="7J"]\').3d(g(){I[1R]=$(O);6j[1R]=$(O).1t(\'a:6o(1Q,^27?:\\/\\/2z.2f.1B\\/2u-2x\\/)[F!="7L"]\').7K(\'[F~="7M"]\').3d(g(){B 3s=$(O).1q(\'1Q\');j(3s){1e=3s.2a(/27?:\\/\\/2z.2f.1B\\/2u-2x\\/\\?.*3x=([0-9]{1,2}).*&3z=([0-9]{1,2}).*&u=([a-3Y-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3p=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U){18(B q=0;q<1e.C;q++){j(!k[q])k[q]=N 2o();k[q][H]=1e[q]}k.1r[H]=$(O);k[\'1z\'][H]=H;k[\'I\'][H]=1R;H++}}});1R++});j(k.1z.C)6y();J{K(o[e.n.l][\'L\'][\'7j\'],1);1I(o[e.n.l][\'L\'][\'7j\'],"2X");2M(D)}1F k.1z.C}g 7m(){$(\'7H[F~="7J"]\').3d(g(){I[1R]=$(O);6j[1R]=$(O).1t(\'a:6o(1Q,^27?:\\/\\/2z.2f.1B\\/2u-2x\\/)\').7K(\'[F~="7M"][F!="7L"]\').3d(g(){1e=$(O).1q(\'1Q\').2a(/27?:\\/\\/2z.2f.1B\\/2u-2x\\/\\?.*3x=([0-9]{1,2}).*&3z=([0-9]{1,2}).*&u=([a-3Y-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3p=([A-S-9]{8}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{4}\\-[A-S-9]{12})/i);j(1e!=U&&1e[5]==41&&84.5z(6F(1e[1]),5y.7D)>-1)$(I[1R]).1t(\'a[6X*="70"]\').3d(g(){4t.6c([$(O),I[1R]]);j(1e!=U){18(q=0;q<1e.C;q++){j(!k[q])k[q]=N 2o();k[q][H]=1e[q]}k.1r[H]=$(O);k[\'1z\'][H]=H;k[\'I\'][H]=1R;H++}})});1R++});j(k.1z.C)6y();J{K(o[e.n.l][\'L\'][\'7N\'],1);1I(o[e.n.l][\'L\'][\'7N\'],"2X");2M(D)}1F k.1z.C}g 6y(){75(k[3],k[1],k[2],k[4],k[5],k[\'1r\'],k[\'1z\'],k[\'I\']);k[1g.C+1]=N 2o();j(k[1g[0]].C>1){k[1g.C+1][0]=D;18(u=1;u<=(k[1g[0]].C-1);u++){j(k[1g[0]][u]==k[1g[0]][u-1]){k[1g.C+1][u]=E;$(k[\'1r\'][u]).1p("2e-W","#cw")}J k[1g.C+1][u]=D}}J k[1g.C+1][0]=D;75(k[\'1z\'],k[3],k[1],k[2],k[4],k[5],k[\'1r\'],k[\'I\'],k[1g.C+1])}g 8x(){18(B 3w=0;3w<4t.C;3w++){B cx=3w;B 28=$(4t[3w][0]).1q("6X");B 6V=28.2a(/71=(\\d+)&/i)[1];B 4D=28.2a(/4D=(\\d+)&/i)[1];B 4y=28.2a(/4y=(\\d+)&/i)[1];B 4B=28.2a(/4B=(.+)&/i)[1];4F({3J:"5x",28:M.6x.6R+"//4p.2f.1B/cD/cE.73?cK=1",2V:"71="+6V+"&4y="+4y+"&4D="+4D+"&4B="+4B+"&77="+37.2Q.77+"&7b="+37.2Q.7b+"&cL="+37.2Q.4I+"&cM=cJ"+"&cI=70"+"&cF=0",4H:g(r){}});$(4t[3w][1]).3P(\'cG\',g(){$(O).cH()})}}g 4i(){j(41!=U)18(i=0;i<k[1g.C+1].C;i++)j(k[5][i]==41)k[1g.C+1][i]=E}g 42(){j(3Q.4X&&e.G.1N){B 3R=3Q.94();18(i=0;i<k[1g.C+1].C;i++){18(B s=0;s<3R.C;s++){j(k[6][i]==3R[s][0]){k[1g.C+1][i]=E;3a(i,3)}}}}}g 4V(){18(i=0;i<k[1].C;i++){j($(I[k.I[i]]).1t(\'a[F~="8Q"][2V-8F="{\\"8G\\":\\"?\\"}"]\').C){33("cu ct");k[1g.C+1][i]=E;$(I[k.I[i]]).1D(\'Q\',0.4)}}}g 2U(){18(i 7X 7B){w[i]=0}j(e.G.7y)3F=6B=6w=D;J 3F=6B=6w=E;18(B i=0;i<k[1].C;i++){4s(2F(k[1][i])){Z 8:j(6w)$(k[\'1r\'][i]).1W(\'8f\');w[1]++;P;Z 10:j(3F)$(k[\'1r\'][i]).1W(\'4k\');w[2]++;P;Z 11:j(3F)$(k[\'1r\'][i]).1W(\'4k\');w[2]++;P;Z 13:j(3F)$(k[\'1r\'][i]).1W(\'4k\');w[2]++;P;Z 14:j(3F)$(k[\'1r\'][i]).1W(\'4k\');w[2]++;P;Z 21:j(6B)$(k[\'1r\'][i]).1W(\'8o\');w[3]++;P;3o:w[0]++;P}j(k[1g.C+1][i]==E)w[\'6s\']++;J w[\'44\']++}w.4u=w.44;K(o[e.n.l][\'2N\'][\'cg\']+": "+k[1].C+" | "+o[e.n.l][\'2N\'][\'ch\']+": "+w[\'6s\']+" | "+o[e.n.l][\'2N\'][\'7G\']+": "+w[3]+" | "+o[e.n.l][\'2N\'][\'ci\']+": "+w[1]+" | "+o[e.n.l][\'2N\'][\'cf\']+": "+w[2])}g 2p(){1k=[E,E];1f=[];I=[];6j=[];1E=[];3H=[];4t=[];H=0;1R=0;1C=U;4J=E;2n=0;2O=E;1s="";2B=D;46=E;w={22:0,3n:U,4u:0,6s:0,44:0,5a:0,ce:0,ca:0,3f:0,4g:0,cb:U,6g:0,3A:0,3B:0,3G:0,3e:0,7x:0,1E:0};k={1r:[],1z:[],I:[],3V:[],8J:[],26:[]};j(!3r)j($(\'#2k\').C)$(\'#2k\').1T("");j($(\'#36\').C)$(\'#36\').1T("- - -")}g 29(){17={w:0,cc:0,3A:0,3B:0,3G:0,3e:0,2C:U}}g 2L(){51(D);1I(o[e.n.l].L.cd,"8g");1E[0]=2m;7x=k[1].C;8k(e.G.1S);18(i=0;i<1f.C;i++){2T(i)}};g 2T(p){j(!2n){cj(!k[1g.C+1][w.22]&&w.22<k[1g.C+1].C){w.22++}}j(2O)j((k.I[w.22]>w.3n||w.22==k.I.C)&&w.3n!=U){5P(w.3n);w.3n=k.I[w.22]}J w.3n=k.I[w.22];j(w.22<k[1].C&&!(!2n&&!2B)&&!46){1f[p][1]=N 1h();1f[p][2]=D;7t(w.22,"5m",p);w.22++;w.5a++}J{}j(1f[p][2]!=D||w.4u==0)w.4g++;j(w.4g==1f.C){V=o[e.n.l].L.7o+": "+w.6g+" --- "+o[e.n.l].L.7p+": "+w.3A+" --- "+o[e.n.l].L.55+": "+w.3B+" --- "+o[e.n.l].L.7u+": "+w.3G+" --- "+o[e.n.l].L.ck+": "+w.3e;K(V);6E();51(E);2M(D)}};g 7t(1a,cO,p){2K(p,1);4F({3J:\'cr\',28:e.G.7q+6H(1a),85:{\'cs-cp\':\'co/5.0 (cl cm 6.1; cn; cN:10.0.2) cP/d4 7i/10.0.2\',\'d3\':\'V/1T,6D/d2+7n,6D/7n;q=0.9,*/*;q=0.8\'},6O:g(r){2K(p,2);K(o[e.n.l].1y.d6,2);w.3f++;1f[p][2]=E;M.1O(g(){2T(p)},(e.G.66*1w),p)},4H:g(r){2K(p,2);j(r.6p==3t){1f[p][3]=N 1h();B 49=r.2P.2a(/3V\\" 1b\\=\\"([a-cT-3Y-cR\\-.]+)\\"/i);j(!49){K(o[e.n.l].1y.cX,2);w.3f++;2T(p)}k[\'3V\'][1a]=49[1];5m(1a,p)}J{K("cW "+o[e.n.l].1y.7d+": "+r.7a);w.3f++;1f[p][2]=E;M.1O(g(){2T(p)},(e.G.1L*1w),p)}}})};g 5m(H,p){B 1a=H;w.6g++;17.w++;2K(p,1);4F({3J:"5x",28:e.G.7F+6H(H)+"&3V="+k.3V[H],6O:g(r){2K(p,2);K(o[e.n.l].1y.d0,2);w.3f++;1f[p][2]=E;M.1O(g(){2T(p)},(e.G.66*1w),p)},4H:g(r){2K(p,2);B 3l="";B 3K;B 5X=N 1h().2v()-1f[p][1].2v();B 5Q=N 1h().2v()-1f[p][3].2v();B 5W=1f[p][3].2v()-1f[p][1].2v();B 49=r.2P.2a(/\\<15\\>(.+)\\<\\/15\\>/i);B cQ=$(r.2P).1t(\'15\');B 6T=$(r.2P).1t(\'#2h\');B 4d=$(r.2P).1t(\'3k\');B 5Z=$(r.2P).1t(\'#V\');B 5I=5Z.1t(\'6b\').V();B 5J=5Z.1t(\'d9\').V();B 76=$(4d).dc(\'da\');!1C?3K=U:3K=$(I[k.I[H]]).1t(\'t[F~=3K]\').V();3K?3l=" "+o[e.n.l].L.d8+": "+3K:3l="";j(r.6p==3t){j(6T.C){j(4d.C){K(5I+": ( "+5J+" ) - ( "+5Q+" | "+5W+" | "+5X+" ) "+3l+\' | \'+$(4d).V(),1);3a(1a,1);k.26[1a]=1;w.3B++;17.3B++}J{K(5I+": ( "+5J+" ) - ( "+5Q+" | "+5W+" | "+5X+" ) "+3l,0);3a(1a,0);k.26[1a]=0;w.3A++;17.3A++}}J j(76){K($(4d).V(),2);k.26[1a]=4;w.72++;17.72++;j(e.G.2c||2n){46=D;2B=E}}J j(49[1]){K("5S "+3l+" | "+o[e.n.l].1y.6M,2);3a(1a,2);k.26[1a]=2;w.3G++;17.3G++}J{K("5S "+3l+" "+o[e.n.l].1y.cU,2);3a(1a,2);k.26[1a]=3;w.3e++;17.3e++}j(3Q.4X&&e.G.1N)3Q.8A(1a)}J{K("cV "+o[e.n.l].1y.7d+": "+r.7a);3a(1a,2);k.26[1a]=3;w.3e++;17.3e++};5q(1a);1f[p][2]=E;M.1O(g(){2T(p)},(e.G.1L*1w),p);1I(w.3f+" / "+w.4u+" ( "+o[e.n.l].2N.cZ+" )");w.3f++}})};g 2K(p,4E){j(4E==1){3H[p]=M.1O(g(){2K(p,3)},(e.G.3H*1w),p)}J j(4E==2){4Y(3H[p])}J j(4E==3){K(o[e.n.l].1y.3H,2);2T(p)}}g 86(){e.G.1S=1G("1S",1);e.n.2r=1G("2r","2");e.n.2s=1G("2s","40");e.n.l=1G("l","3Z");e.5E.5s=1G("cY",E);e.G.4h=1G("8H",30);e.G.1L=1G("1L",0);e.G.4q=1G("cS",0);e.G.4S=1G("4S",0);d1=1G("4Q",0);e.G.1J=1G("1J",1w);e.G.2c=1G("2c",D);e.G.1N=1G("1N",E);j(e.G.1S>5)e.G.1S=5};g 5P(c){j(c!=U)1k.6c(c);j(1k[0]==E){K("< "+o[e.n.l].L.2O+" >");$(I[1k[2]]).1t(\'a[F~="8Q"][2V-8F="{\\"8G\\":\\">\\"}"]\').3d(g(){O.1m()});1k.8V(2,1);1k[0]=D}j(1k.C>2&&1k[1]==E){1k[1]=D;d7=M.1O(g(){1k[0]=E;1k[1]=E;5P()},e.G.4h*1w)}j(1k.C>2&&1k[0]==D&&1k[1]==D){$(4f).3N();$(4f).1T((1k.C-2)+\' \'+o[e.n.l].d5.cq)}J{$(4f).3P();2M(D)}}g 6N(){33("c8 2Q...");j(37.2Q){33("... 96. bf bg. bh-aO: "+37.2Q.4I);6e=$().be({3J:\'bd\',ba:37.2Q.4I});$("#6a").3P();41=37.2Q.4I;e.G.4q=6e;1U("4q",6e);$(\'#69, #68, #63, #62, #61, #64\').3N(\'Q\');K(o[e.n.l].L.bb+": "+41);d=N 1h().2v();j(e.G.4S<d-60*60*24){52();1U("4S",d.bc())}j(!e.n.5h){2E(o[e.n.l].1n.92,g(){5F()});2E(o[e.n.l].1n.7O,g(){5k()});2E(o[e.n.l].1n.91,g(){5j()});2E(o[e.n.l].1n.93,g(){5o()});2E(o[e.n.l].1n.5p,g(){5i()});e.n.5h=D}}J{33("... bi 96.");41=U;K(o[e.n.l].L.c9)}}g bj(3m){3q=5r;K("bp: "+3m.C,1);18(2A=0;2A<3m.C;2A++){K("3m[2A]: "+3m[2A]+" | 2A: "+2A,3);j($.5z(3m[2A],3q)==-1)3m.8V(2A,1)}}g 8b(2q){2q.1r=[];2q.3V=[];2q.I=[];2q.8J=[];2q.1z=[];2q.26=[];2q[0]=[];1F 2q}g 5q(H){j((!2n&&84.5z(6F(k[1][H]),5y.83)>-1&&k.26[H]==0)||4J)3q=82;J j(2n)3q=5r;J 1F;18(B 31=0;31<3q.C;31++){j(!1E[31+1])1E[31+1]=[];1E[31+1][w.1E]=k[3q[31]][H]}w.1E++}g 52(){4F({3J:"5x",28:e.G.81,85:{"bq-1l":"6D/x-4p-6I-bs"},2V:"2V="+59.8K(1E)+"&bo="+e.G.4q+"&v="+e.G.4Q,4H:g(r){7R(r)},6O:g(r){j(2n)K(o[e.n.l].L.bn,2)}})};g 7R(r){j(r.2P=="")1F;3r=E;bk{B 7Y=M.bl(r.2P)}bm(b9){};B 1M=59.8R(7Y);4s(6F(1M.6p)){Z b8:18(6r 7X 1M.2V){1U(6r,1M.2V[6r])}P;Z aV:K(o[e.n.l].L.aW);w.44=w.4u=1M[1].C;k=8b(1M);2L();P;Z aX:K(1M.47);6v(1M.2V);1I(\'\');2M(D);P;Z aU:K(o[e.n.l].L.aT);j(2B){K(o[e.n.l].L.8t);1I(o[e.n.l].L.8t,"2X");56(1M.47)}J j(2m==8){8x()}J 2M(D);P;Z 3t:3E();K(1M.47);2M(D);P;Z 5R:3E("8S");K(1M.47,1);aP(1M.47);P;3o:P}};g 6E(){j(!1E[1]||!1E[1].C)1F;j((2n&&!46)||4J){K(o[e.n.l].L.8n,3);1I(o[e.n.l].L.8n,"2X");3r=D;j(17.w>=e.G.1J)2B=E}52()}g 6v(28){B aQ=M.aR(28,"",\'2W=aS,1u=aY,aZ=b5\')}g K(o,W){j(W==U)$(3j).1T($(3j).1T()+5C()+": "+o+"<br>");J{4s(W){Z 0:23="#b6";P;Z 1:23="#b7";P;Z 2:23="#b4";P;3o:23="#3U";P}$(3j).1T($(3j).1T()+\'<3k 3u="W:\'+23+\'">\'+5C()+": "+o+"</3k><br>")}$(3j).b3(3i.b0("2k").b1)}g 7Q(){$(1s).1D(\'Q\',1,g(){$(O).1D(\'Q\',0.5)})}g 1I(o,23){j(23)3E(23);$(4a).1T(o)}g 8k(8j){1f=[];18(i=0;i<8j;i++){1f[i]=N 2o()}};g 6H(H){1F 1e="3x="+k[1][H]+"&3z="+k[2][H]+"&u="+k[3][H]+"&l="+k[4][H]+"&s="+k[5][H]+"&3p="+k[6][H]}g 2M(3y){j(3y){j((w.4g==1f.C&&3r==E&&1k[1]==E)||46){$(54).3y();$(5f).1c();3E();j(w.5a>0)1I(w.5a+" / "+w.44+" ( "+o[e.n.l].2N.b2+" )");j(!2B)K(o[e.n.l].L.bt);1k=[E,E];29()}J j(w.4g==1f.C&&!2n&&e.G.2O){3E("2X");1I(o[e.n.l].L.bu)}}J $(54).1c()}g 51(8r){$(\'#8m\').V(17.w);$(\'#8i\').V(17.3A);$(\'#8h\').V(17.3B);$(\'#8d\').V(17.3G);$(\'#8e\').V(bV.bW((N 1h().2v()-17.2C.2v())/1w));j(8r){8c=M.1O(g(){51(D)},1w)}J 4Y(8c)}g 3E(23){$(4a).bX("8W 8C 6Z");j(23)$(4a).1W("bU"+23)}g 3a(1H,7T){j(e.G.7U&&1C!=U){4s(7T){Z 0:j(1C==1)$(I[k.I[1H]]).53(\':4W\').1q(\'F\',\'6L\');J $(I[k.I[1H]]).1t(\'a[1Q*="\'+k[3][1H]+\'"]\').58().4l(\'<t F="6L"></t>\');P;Z 1:j(1C==1)$(I[k.I[1H]]).53(\':4W\').1q(\'F\',\'5u\').1q(\'15\',o[e.n.l].1y.55);J $(I[k.I[1H]]).1t(\'a[1Q*="\'+k[3][1H]+\'"]\').58().4l(\'<t F="5u"></t>\').1q(\'15\',o[e.n.l].1y.55);P;Z 2:j(1C==1)$(I[k.I[1H]]).53(\':4W\').1q(\'F\',\'6J\').1q(\'15\',o[e.n.l].1y.6M);J $(I[k.I[1H]]).1t(\'a[1Q*="\'+k[3][1H]+\'"]\').58().4l(\'<t F="6J"></t>\').1q(\'15\',o[e.n.l].1y.6M);Z 3:j(1C==1)$(I[k.I[1H]]).53(\':4W\').1q(\'F\',\'6n\').1q(\'15\',o[e.n.l].1y.89);J $(I[k.I[1H]]).1t(\'a[1Q*="\'+k[3][1H]+\'"]\').58().4l(\'<t F="6n"></t>\').1q(\'15\',o[e.n.l].1y.89);P;3o:P}}}g 56(db){3r=D;2p();1E[0]=2m=db;2n=D;1I(o[e.n.l].L.8y,"2X");3g(D);K(o[e.n.l].L.8y);52()}g 5C(a){j(a!=U){B s=N 1h().5g()-a.5g();B m=N 1h().5G()-a.5G();B h=N 1h().5B()-a.5B()}J{B d=N 1h;B h=d.5B();B m=d.5G();B s=d.5g()}h=5c(h);m=5c(m);s=5c(s);1F h+":"+m+":"+s}g 5c(i){j(i<10)i="0"+i;1F i}B 3Q={1P:"5b",2t:M.20.8E("5b:2t"),4X:E,78:g(){j(bT(bQ)!=="bR"){O.4X=D}},94:g(){j(M.20.C-1){B 3R=[];B w=0;18(i=0;i<M.20.C;i++){1P=M.20.1P(i);j(/5b:\\d+/.8T(1P)){3R.6c(59.8R(M.20.8E(1P)));w++}}}1F 3R},8A:g(1a){8Z=[k[6][1a],k[3][1a],2F(N 1h())];j(O.2t>5R){O.2t=0};M.20.8B(O.1P+":"+O.2t,59.8K(8Z));M.20.8B(O.1P+":2t",++O.2t)},bS:g(){},bY:g(){B w=0;18(i=0;i<M.20.C;i++){1P=M.20.1P(i);j(/5b:\\d+/.8T(1P)){M.20.97(1P);w++}}M.20.97(O.1P+":2t");33(w+" bZÃ¤c5 c6Ã¶c7")}};g 8P(){j(M.2g!=M.c4){33("c3 c0. c1");1F}J{33("c2 bP");86();j(e.5E.5s)1F;2p();29();8z();8a();88();87();80();7Z();7S();M.1O(g(){7Q()},6P);M.1O(g(){6N()},bO);bB(\'.4v{W:#3U;4L: bC "7V 8s",8q,8p,8u,8w-8l}.3h{1s:1Z 38 #2j;1u:bD;1s-6K:43;W:#2j;2e-W:#3I;1A:1Z;34:1X;}.bA{W:#bz}.6J{4G-4A: 1j 1j 1X #bv;1A: 1v}.5u{4G-4A: 1j 1j 1X #bw;1A: 1v}.6L{4G-4A: 1j 1j 1X #bx;1A: 1v}.6n{4G-4A: 1j 1j 1X #by;1A: 1v}.8f{2e-W:#bE}.8o{2e-W:#bF}.4k{2e-W:#bL}.4U{V-48: 2Z; 1s: 1Z 38 #3I;2W-bM: 7g;1s-6K:43;2e-W: #2j;1A: 1X;1u:4P; bN-48: bK; z-2t: 4e; 34:0 0 1X 0;4L-2Y:1.8U;bJ-bG:0.8U}.8C{2e-W:8S;W:#2j}.8W{2e-W:8g;W:#2j}.6Z{2e-W:2X;W:#3U}.4z{1s-6K:43;2e-W:#bH;1s:1Z 38 #3I}#3D{4L-2Y:7g}.7C 2b{V-48:2Z} #6A t.2d {6k: 5d;1u: bI;34-5d: 6l;V-48: 5d;34-2g: 43;}#6A 1o {34-2g: 6C;}\');2E(o[e.n.l].2h.1x,g(){6u()});2E(o[e.n.l].2h.7s,g(){6h()});2E(o[e.n.l].1n.7w,g(){5n()});2E(o[e.n.l].1n.7A,g(){6d()})}}3Q.78();8P();',62,819,'||||||||||||||setings||function|||if|linklist|language||UI|txt|id||||div|||counter|||||var|length|true|false|class|script|ii|element|else|printtext|message|window|new|this|break|slow|lk_menu|Z0|val|null|text|color|||case||||||title||gb|for|input|iit|value|hide|append|query|myWindows|matchorder|Date|px|0px|likeBatch|type|click|mode|fieldset|css|attr|linkobj|border|find|width|2px|1000|options|error|order|padding|com|wall_type|fadeTo|gather|return|GM_getValue|this_ii|printtext_small|dbmax|legend|delay|jsonObj|usestore|setTimeout|key|href|ei|fenster|html|GM_setValue|lk_overlay|addClass|5px|lk_pulldown|1px|localStorage||aCounter|colour|||linkstatus|https|url|reset_global|match|td|stopafterlimreach|label|background|facebook|top|buttons|th|FFF|lk_infobox|option|opmode|dbmode|Array|reset|thisarray|positionX|positionY|index|monster|getTime|lk_infobox_container|world|lk_container|apps|ref|zycle|starttime|stat|GM_registerMenuCommand|Number|zIndex|lk_text_container|simulation|lk_op_container|watchdog|kickAss|reset_btn|string|klicklike|responseText|Env|name|right|bouncer|count_mw_obj|data|height|yellow|size|center||res|tag|GM_log|margin|lk_textarea|lk_small_infobox|unsafeWindow|solid|body|marklnk|scan_page|pulldown_timer|each|lnk3|BounceCounter|show_infobox|lk_btn|document|infobox|span|actor|myarray|liCounter|default|w_accept|glistorder|clock|link|200|style|position|eit|st1|show|st2|lnk0|lnk1|button|lk_small_statbox|small_info_col|paint_stars|lnk2|timeout|673569|method|actorName|backgroundColor|checked|fadeIn|max|fadeOut|store|list|isNaN|slideUp|111|signed_request|lk_btn_ok|screen|z0|de||FBid|filter_old|4px|valid|show_menu|fstop|msg|align|grab|small_infobox|op_max|http|ebt|1002|small_likebox|ThreadsDone|likeDelay|filter_own|op_f|lk_stars|wrap|fixed|op_dl|lk_border|www|ClientHash|createElement|switch|fhtable|LinksToOpen|lk_con|appendChild|op_d|profile_fbid|lk_frame|shadow|story_id|delaylike|story_type|op|GM_xmlhttpRequest|box|onload|user|fhmode|op_y|font|after|lk_btn_stop|op_x|auto|version|dl|update|tr|lk_info|fadeOld|parent|aktiv|clearTimeout|show_options||update_statbox|connect|filter|btn_ok|expired|kdbm|run_mode|first|JSON|klicks|LK_MW|checkTime|left|pices|btn_stop|getSeconds|menuloaded|run_mode7|run_mode3|run_mode2|lk_btn_go|getWooga|run_mode4|run_mode6|mode7|sort_data|wlistorder|lock|check|lk_markexpired|modi|marginTop|POST|mwliste|inArray|availWidth|getHours|getMyTime|availHeight|system|run_mode1|getMinutes|usewindows|rih1|rih2|textarea_width|options_height|textarea_height|show_textarea|options_width|clickLike|elapsedTimeWo|999|Link|lk_btn_opabbort|cursor|lk_btn_opsave|elapsedTimeFB|elapsedTime|select|ri||lk_mode7|lk_mode6|lk_mode3|lk_mode8|marginRight|errordelay|hover|lk_mode2|lk_mode1|lk_getfbid|h1|push|run_mode5|myhash|windowpos|lnk|run_help|overflow|attachment|float|10px|check_store|lk_markold|regex|status|infobox_height|set|duplicate|borderRadius|run_options|referer|paint_plant|location|sort_arrays|lk_small_likebox|menu|paint_woogo|3px|application|recall|parseInt|infobox_width|assemble_query|form|lk_markbad|radius|lk_markok|linkintogame|getFBid|onerror|500|run_mode8|protocol|normal|eb|lk_mode5|story_key|230|ajaxify|mode8|lk_yellow|remove_content|ministory_key|lnk4|php|198px|sortIt|lim|post_form_id|init|wogartencenter|statusText|fb_dtsg|animate|statuserr|lk_mode4|ppbtn|1em|pagelet_group_mall|Firefox|dnotfoundlnk|pagelet_wall|detect_type|fetchhide|xml|linkscalled|ok|FBurl|lk_help|help|getFB|intogame|pagelet_home_stream|mode4|arraylength|paintme|small_statbox|mode5|counter_vals|overview|white|lk_option|woogaUrl|woogo|li|table|uiStreamStory|not|uiLinkLightBlue|UIImageBlock_Image|dnotfoundfhlnk|mode2|hidden|ui_blink|serverResponse|make_textarea|marker|markbad|lucida|checkbox|in|inc|make_options|make_overlay|serverurl|slistorder|bonus|jQuery|headers|loadOptions|make_infobox|make_pulldown|linkisold|make_border|fit_array|statbox_timer|gblnk2|elatime|lk_plant|green|gblnk1|gblnk0|number|setWindowsArray|serif|gbcounter|senddata|lk_woogo|verdana|tahoma|run|grande|message1041|arial|org|sans|del_stream|askforlinks|make_container|Add|setItem|lk_red|op_stop|getItem|ft|tn|likedelay|alt|actorsDescription|stringify|gif|de_DE|paypalobjects|src|launcher|UFILikeLink|parse|red|test|3em|splice|lk_green|op_store|sec|entry|lk_options|mode3|mode1|mode6|Get|textarea|gefunden|removeItem|searchFBID|en|nl|textAlign|16px|Nederlands|opacity|English|World|Monster|plant|510|none|750|fr|Zeiten|pointer|600|Links|Limits|delayLike|E6E6E6|mouseover|400|go|hr|Linkklicker|resize|_|LocalStorage|off|Deutsch|auf|lastupdate|800|connected|1001|connect9|schnell|einfach|Jetzt|rules|time|btn_donate_SM|btn|cellpadding|submit|all|100|und|sicher|monsters|wooga|abbort|live|lp|change|10000|save|pixel|mit|bezahlen|online|PayPal|accept|scr|img|DE|image|writeemail|linkklicker|anaximelis|userscripts|scripts|Klicker|113866|absolute|mailto|it|userAgent|search|Italian|21px|208px|navigator|juserscripts|isFirefox|xclick|_s|cmd|myHost|hosted_button_id|0921|7EYPUVHHHMJJY|post|webscr|paypal|action|stop|cgi|125|hostname|bin|France|ID|alert|lkwindow|open|720|message104|104|102|message102|103|1024|scrollbars|getElementById|scrollHeight|end|scrollTop|FF0000|yes|009E00|EB7500|101|err|source|foundfb|toString|md5|crypt|Setze|Hash|FB|nicht|strip_data|try|atob|catch|serverconerr|cid|stripdata|Content||urlencoded|userabbord|waitforlike|FF0A0A|FF8000|00FF00|6699FF|FF3366|lk_bad|GM_addStyle|11px|100px|9AFF9A|C7FFFF|spacing|FFFFFF|180px|letter|middle|EAEA5D|min|vertical|5000|gestartet|Storage|undefined|Remove|typeof|lk_|Math|round|removeClass|Clear|Eintr|erkannt|Stop|LK|iframe|self|ge|gel|scht|Suche|cantfindfb|MonsterLinks|StartTime|stopafter|preparestart|ValidMonsterLinks|stars|found|ignored|plants|while|unknown|Windows|NT|WOW64|Mozilla|Agent|linksinqueue|GET|User|old|Fade|ig|FFC8C8|el|startsearch|slideDown|forum|fast|focus|ajax|minifeed|ban_user|3000|remove|action_key|AsyncRequest|__a|__user|post_form_id_source|rv|callback|Gecko|mw|9_|clienthash|zA|cantreadcontent|Wooga|Facebook|cantfindkey|syslog|running|onerror_wooga|thisversion|xhtml|Accept|20100101|prompt|onerror_fb|LikeTimer|from|h2|limit_msg||hasClass'.split('|'),0,{}))
})();