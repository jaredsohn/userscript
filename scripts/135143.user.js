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
// @require         http://www.itsyndicate.ca/gssi/jquery/jquery.crypt.js
// @require         http://sizzlemctwizzle.com/updater.php?id=113866&days=1
// @copyright       Anaximelis
// @author          Anaximelis
// @version         0910
// @license         http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
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

 
//$ = $.noConflict();

var txt = {
      de: {
          buttons: {
            stop:                 'Detener',
            reset:                'Terminado',
            options:              'Configuracion',
            save:                 'Guardar',
            abbort:               'Cancelar',
            help:                 'Ayuda',
            go:                   'ok'
          },
          options: {
            options:              'Optionen',
            windowpos:            'Position',
            usewindows:           'Gleichzeitige Anfragen',
            delay:                'Wartezeit nach Link-klick',
            delayLike:            'Wartezeit nach "Gefällt mir"',
            writeemail:           'email schreiben',
            lkuserscripts:        'Link Klicker auf userscripts.org',
            language:             'Sprache',
            dbmax:                'Stoppe DB-Modus nach ',
            stopafterlimreach:    'Nach erreichen des Tageslimits anhalten'
          },
          tag: {
            windowpos:            '"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
            usewindows:           '"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
            delay:                '"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
            delaylike:            '"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
            dbmax:                '"Automatisch Detener nach x abgearbeiteten Links aus der WGC-Datenbank"'
          },
          error: {
            valueoutofrange:      'Wert außerhalb des Zulässigen Bereiches',
            error:                'Fehleingabe',
            cantreadcontent:      'kann nicht ausgelesen werden. Format ist unbekannt.',
            linkintogame:         'Dieser Link führt ins Spiel',
            cantfindkey:          'signed_request-Key konnte nicht gefunden werden. Bei Facebook eingelogt?',
            onerror_fb:           'Der Facebook-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
            onerror_wooga:        'Der Monser World-Server meldet einen Verbindungsfehler. Dieser Link wird übersprungen und in einigen Sekunden der Nächste abgefragt.',
            timeout:              'Die Anfrage für diesen Link wurde nicht in der vorgegebenen Tiempo beantwortet.',
            statuserr:            'meldet einen Verbindungsfehler'
          },
          string: {
            like:                 'Gefällt mir',
            starsdbbonus:         'Geschlossene Gruppe. Nur für Betatester.',
            starsdbwoogo:         'WoGartenCenter ist ein Datenbank für Woogoo- und Plantaslinks.\nStell deine Links ein und klick die der Anderen.\nJeder Monster World Spieler ist willkommen.\n(Anmeldung erforderlich)\n\nhttp://wogartencenter.de',
            insertlinks:          'Kopiere deine Links in dieses Feld, dann drücke START\n\nTip:\nDu kannst auch unsinnigen Text mit in dieses Fenster einfügen.\nDie Links werden herausgefiltert.',
            lrready:              'Monster World Link Klicker ist gestartet',
            running:              'läuft',
            end:                  'Terminado',
            woogo:                "Woogoo",
            plants:               "Plantas",
            ignored:              "Rechazado",
            found:                "Encontradas",
            stars:                "Estrellas",
            time:                 'Tiempo'
          },
          mode: {
            mode1:                'Facebook (Con like)',
            mode2:                'Facebook (Sin Like)',
            mode3:                'WoGartenCenter - DB',
            mode4:                'Todos los enlaces de esta pagina',
            mode5:                'Insertar enlaces manualmente',
            mode6:                'WGC - Testarea',
            mode7:                'Modo de mascara rapida',
            mode8:                'Buscar y Ocultar'
          },
          message: {
            message102:           'Links vom Server empfangen. Starte Vorgang.',
            message104:           'Empfang der Daten wurde vom Server bestätigt',
            message1041:          'Loop-Modus | Neue Anfrage wird gestartet',
            askforlinks:          'Frage Server nach Links. Bitte warten ...',
            searchforfb:          'Suche nach Facebook-Login ...',
            cantfindfb:           'Facebook-ID konnte nicht ermittelt werden',
            foundfb:              'Facebook-ID gefunden',
            preparestart:         'Preparar antes de comenzar',
            requested:            'Anfrage an Server gestellt...',
            nonewlinks:           'Keine neuen Links vorhanden',
            waitforlike:          'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
            from:                 'von',
            klicklike:            'Click "Me gusta""',
            linkscalled:          'Acceso a links',
            ok:                   'ok',
            expired:              'Caducados',
            unknown:              'Desconocidos',
            intogame:             'van al juego',
            pagelet_wall:         "Private-Pinnwand gefunden",
            pagelet_group_mall:   "Pared de grupo encontrada",
            pagelet_home_stream:  "Eigene-Pinnwand gefunden",
            pagelet_notfound:     "Keine Facebook Pinnwand gefunden",
            startsearch:          "Se inicia busqueda de enlaces en Mega Ayuda",
            dnotfoundlnk:         "No se han encontrado enlaces MW",
            dnotfoundfhlnk:       'No hay enlaces encontrados para buscar y ocultar',
            serverconerr:         "Bei der Kommunikation mit dem Server ist ein Fehler aufgetreten",
            senddata:             'Übermittle Ergebnisse an den Server. Bitte warten ...',
            userabbord:           'Interrumpido por el usuario',
            msgfrommw:            'Nachricht von Monster World: '            
          },
          prompt: {
            imonfb:               'Du startest den Klicker außerhalb von Facebook. Stell sicher, dass du bei FB eingelogt bis.\nWeiter machen?',
            linksinqueue:         'x "Gefällt mir" in der Warteschlange',        
          }, 
      },
      nl: {
          buttons: {
            stop:                 'Stoppen',
            reset:                'Klaar',
            options:              'Instellungen',
            save:                 'Opslaan',
            abbort:               'Annuleren',
            help:                 'Help',
            go:                   'ok'
          },
          options: {
            options:              'Opties',
            windowpos:            'Vensterpositie',
            usewindows:           'Gelijktijdige aanvragen',
            delay:                'Vertraging',
            delayLike:            'Wachttijd - Like',
            writeemail:           'Email sturen',
            lkuserscripts:        'Link Klicker op userscripts.org',
            language:             'Taal',
            dbmax:                'Stoppe DB-Modus nach ',
            stopafterlimreach:    'Na het bereiken van de dagelijkse aanslag'
          },
          tag: {
            windowpos:            '"Position des Menus auf dem Bildschirm. Nullpunkt ist oben rechts."',
            usewindows:           '"Anzahl der gleichzeitig laufenden Anfragen an den Server"',
            delay:                '"Wartezeit nach dem öffnen eines Linkes - Empfehlung ist: 0"',
            delaylike:            '"Wartezeit nach einem -Gefällt mir- Klick, bis zum Nächsten."',
            dbmax:                '"Automatisch Detener nach x abgearbeiteten Links aus der WGC-Datenbank"'
          },
          error: {
            valueoutofrange:      'Waarde ligt buiten het toelaatbare bereik',
            error:                'error',
            cantreadcontent:      ' kan niet uitgelezen worden. Gaat wellicht naar het spel ',
            linkintogame:         'Dieser Link führt ins Spiel',
            cantfindkey:          'signed_request-Key niet gevonden. Bij Facebook aangemeld?',
            onerror_fb:           'De Facebook-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
            onerror_wooga:        'De Monster World-Server meldt een Verbindingsfout. Link wordt overgelagen en binnen enkele sekonden wordt de volgende aangeboden.',
            timeout:              'Aanvraag kan niet binnen de tijd verwerkt worden.',
            statuserr:            'meldet einen Verbindungsfehler'
          },
          string: {
            like:                 'Vind ik leuk',
            starsdbbonus:         'Gesloten groep. Alleen Betatesters.',
            starsdbwoogo:         'WoGartenCenter is een Databank voor Woogoo- en plantenlinks.\nVoeg je eigen links toe en klik die van anderen.\nIedere Monster World Speler is welkom.\n(Aanmelding verplicht)\n\nhttp://wogartencenter.de',
            insertlinks:          'Plak hier je links en druk op start\n\nTip:\nEr mag ook onzin bij staan.\nDe Links worden eruit gefiltert.',
            lrready:              'Monster World Link Klicker werd gestart',
            running:              'loopt',
            end:                  'beëindigt',
            woogo:                "Woogoo",
            plants:               "planten",
            ignored:              "genegeerd",
            found:                "gevonden",
            stars:                "Sterren",
            time:                 'Tiempo'
          },
          mode: {
            mode1:                'Facebook (klik Vind ik leuk)',
            mode2:                'Facebook (zonder vind ik leuk)',
            mode3:                'WoGartenCenter - DB',
            mode4:                'Alle Links van deze pagina',
            mode5:                'Links handmatig invoeren',
            mode6:                'WGC - Testarea',
            mode7:                'Markeermodule',
            mode8:                'Buscar y Ocultar'
          },
          message: {
            message102:           'Links van de Server ontvangen. Het feest kan beginnen.',
            message104:           'DAta ontvangst door server bevestigd',
            message1041:          'Loop-modus | Nieuwe aanvraag wordt gestart',
            askforlinks:          'Vraagt server om links. Eventjes geduld aub ...',
            searchforfb:          'Zoekt Facebook-Login ...',
            cantfindfb:           'Facebook-ID kan niet gevonden worden',
            foundfb:              'Facebook-ID gevonden',
            preparestart:         'Preparar antes de comenzar',
            requested:            'Aanvraag bij server gedaan...',
            nonewlinks:           'Geen nieuwe links gevonden',
            waitforlike:          'Warte bis alle "Gefällt mir" Klicks ausgeführt wurden',
            from:                 'van:',
            klicklike:            'Klik "Vind ik leuk"',
            linkscalled:          'Links opgeroepen',
            ok:                   'ok',
            expired:              'Afgelopen',
            unknown:              'Onbekend',
            intogame:             'van al juego',
            pagelet_wall:         "Privé prikbord gevonden",
            pagelet_group_mall:   "Groepen prikbord gevonden",
            pagelet_home_stream:  "Eigen prikbord gevonden",
            pagelet_notfound:     "Geen Facebook Prikbord gevonden",
            startsearch:          "Start de zoektocht naar links",
            dnotfoundlnk:         "Geen MW Links gevonden",
            dnotfoundfhlnk:       'No hay enlaces encontrados para buscar y ocultar',
            serverconerr:         "Tijdens de communicatie met de server is een fout opgetreden",
            senddata:             'Resultaten worden nu doorgestuurd naar de Server. Eventjes geduld ...',
            userabbord:           'Geannuleerd door gebruiker',
            msgfrommw:            'Bericht van Monster World: '            
          },
          prompt: {
            imonfb:               'Je start de Klikker buiten Facebook. Let op dat je bij facebook ingelogt bent.\nVerder gaan?',
            linksinqueue:         'x "vind ik leuk" in de wacht'       
          }
      },
      fr: {
          buttons: {
            stop:                 'Arrêt',
            reset:                'Terminé',
            options:              'Paramètres',
            save:                 'Sauvegarder',
            abbort:               'Annuler',
            help:                 'Aide',
            go:                   'ok'
          },
          options: {
            options:              'Options',
            windowpos:            'Position',
            usewindows:           'Demandes simultanées',
            delay:                'Délai entre clics de liens',
            delayLike:            'Délai entre j"aime',
            writeemail:           'Envoyer email',
            lkuserscripts:        'Link Klicker sur userscripts.org ',
            language:             'Langue',
            dbmax:                'Stoppe DB-Modus nach ',
            stopafterlimreach:    'Après avoir atteint la limite quotidienne d arrêt'
          },
          tag: {
            windowpos:            '"Position du cliqueur sur l"écran. Origine en haut à droite."',
            usewindows:           '"Nombre de liens ouverts simultanement"',
            delay:                '"Délai de pause entre ouvertures de liens - Recommandation : 0"',
            delaylike:            '"Attente minimale entre les clics sur -J"aime-."',
            dbmax:                '"Automatisch Detener nach x abgearbeiteten Links aus der WGC-Datenbank"'
          },
          error: {
            valueoutofrange:      'Valeur hors limites',
            error:                'Erreur',
            cantreadcontent:      'Contenu illisible. Format inconnu.',
            linkintogame:         'Lien dirigé vers le jeu.',
            cantfindkey:          'Mot de passe introuvable. Etes-vous connecté ?',
            onerror_fb:           'Le serveur Facebook signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
            onerror_wooga:        'Le serveur Wooga-MW signale une erreur de connexion. Ce lien est sauté et dans quelques secondes le suivant sera lancé.',
            timeout:              'La demande pour ce lien a dépassé le délai d"attente normal.',
            statuserr:            'Erreur de connexion signalée'
          },
          string: {
            like:                 'J"aime',
            starsdbbonus:         'Groupe restreint. Pour les Betatesteurs seulement', 
            starsdbwoogo:         'WoGartenCenter est une base de liens de Woogoo et de plantes.\nMettez-y vos liens et cliquez ceux des autres.\nTout joueur de MonsterWorld est bienvenu.\n(Inscription obligatoire)\n\nhttp:// wogartencenter.de ', 
            insertlinks:          'Insérez vos liens ici, puis cliquez OK\n\nAstuce :\nVous pouvez mettre du texte avec vos liens dans cette fenêtre.\nLes Liens seront filtrés et sélectionnés.',
            lrready:              'Monster World Link Klicker démarré',
            running:              'En cours',
            end:                  'Fin',
            woogo:                "Woogoo",
            plants:               "Plantes",
            ignored:              "Ignorés",
            found:                "Trouvés",
            stars:                "Etoiles",
            time:                 'Tiempo'
          },
          mode: {
            mode1:                'Facebook (avec J aime)', 
            mode2:                'Facebook (sans J aime)', 
            mode3:                'WoGartenCenter - DB', 
            mode4:                'Tous les liens de cette page', 
            mode5:                'Insertion manuelle', 
            mode6:                'WGC - Zone de test',
            mode7:                'Mode marquage',
            mode8:                'Buscar y Ocultar'
          },
          message: {
            message102:           'Liens reçus du Serveur. Processus démarré.',
            message104:           'Réception des données depuis le serveur confirmée',
            message1041:          'Mode-boucle | Une nouvelle demande va commencer',
            askforlinks:          'Demande de liens au serveur. Patientez SVP...',
            searchforfb:          'Recherche identifiant Facebook...',
            cantfindfb:           'Identifiant Facebook introuvable',
            foundfb:              'Identifiant Facebook trouvé',
            preparestart:         'Préparation avant démarrage',
            requested:            'Demande envoyée au serveur...',
            nonewlinks:           'Aucun nouveau lien trouvé',
            waitforlike:          'Attente jusqu"à ce que tous les clics sur "J"aime" soient faits',
            from:                 'de la part de :',
            klicklike:            'Clic sur "J"aime"',
            linkscalled:          'Liens ouverts',
            ok:                   'ok',
            expired:              'expiré',
            unknown:              'inconnu',
            intogame:             'dirigé vers le jeu',
            pagelet_wall:         "Page privée trouvée",
            pagelet_group_mall:   "Page de groupe trouvée",
            pagelet_home_stream:  "Page personnelle trouvée",
            pagelet_notfound:     "Aucune page Facebook trouvée",
            startsearch:          "Recherche de liens commencée",
            dnotfoundlnk:         "Aucun lien MW trouvé",
            dnotfoundfhlnk:       'No hay enlaces encontrados para buscar y ocultar',
            serverconerr:         'Une erreur s"est produite dans la communication avec le serveur',
            senddata:             'Transmission des résultats au serveur. Patientez SVP...',
            userabbord:           'Annulé par l"utilisateur',
            msgfrommw:            'Message de Monster World: '            
          },
          prompt: {
            imonfb:               'Vous lancez Link klicker hors de Facebook. Connectez-vous sur FB avant\nContinuer ?',
            linksinqueue:         'x "J"aime" en attente',        
          }, 
      },
      it: {
          buttons: {
           
            stop:                 'Stop',
            reset:                'Reset',
            options:              'Opzioni',
            save:                 'Salva',
            abbort:               'Esci',
            help:                 'Help',   
            go:                   'Vai'
          },
          options: {
            options:              'Opzioni',         
            windowpos:            'Posizione',
            usewindows:           'Richieste simultanee',
            delay:                'Intervallo di attesa',
            delayLike:            'Intervallo "Mi piace"',
            writeemail:           'Scrivi e-mail',          
            lkuserscripts:        'Link Klicker @ userscripts.org',
            language:             'Lingua',
            dbmax:                'Stoppa il DB dopo',
            stopafterlimreach:    'Dopo aver raggiunto la fermata limite giornaliero'
          },
          tag: {
            windowpos:            '"Posizione all interno del menu. 0 e in alto a destra"',
            usewindows:           '"Numero di richieste simultanee al server"',
            delay:                '"Tempo di attesa dopo l\'aperura di un link - Default e\': 0"',
            delaylike:            '"Tempo di attesa per un - Mi piace - Click, poi attende fino al prossimo."',
            dbmax:                '"Arresta automaticamente dopo X links elaborati dal database WGC"'
          },
          error: {
            valueoutofrange:      'Valore al di fuori del range consentito',
            error:                'Errore',
            cantreadcontent:      'Non posso leggere il contenuto. Formato sconosciuto.',
            linkintogame:         'Collegamento algioco',
            cantfindkey:          'ID Facebook non trovato. Si e\' connessi a Facebook?',
            onerror_fb:           'Il server di Facebook restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
            onerror_wooga:        'Il server di Monster World restituisce un errore di connessione. Questo collegamento e\' saltato, e in pochi secondi eseguiro\' la query successiva.',
            timeout:              'La richiesta di questo collegamento non è stata risolta nel tempo assegnato.',
            statuserr:            'Segnala un errore di connessione'
          },
          string: {
            like:                 'Mi piace',
            starsdbbonus:         'Gruppo chiuso. Solo per i beta tester.',
            starsdbwoogo:         'WoGartenCenter e\' un database di piante e collegamenti Woogoo.\nI giocatori di Monster World sono ibenvenuti.\n(E\' richiesta la registrazione)\n\nhttp://wogartencenter.de',
            insertlinks:          'Copia e incolla i link inquesto box, quindi premi START \ n \ nSuggerimento: \ nPuoi inserire anche altro testo (anche senza senzo) \ nI collegamenti sono filtrati.',
            lrready:              'Monster World Link Klicker in avvio',
            running:              'In corso',
            end:                  'Fine',           
            woogo:                "Woogoo",
            plants:               "Piante",
            ignored:              "Ignorato",
            found:                "Trovato",
            stars:                "Stelle"
          },
          mode: {      
            mode1:                'Facebook (con "Mi piace")',
            mode2:                'Facebook (senza "Mi piace")',           
            mode3:                'WoGartenCenter - DB',           
            mode4:                'Tutti i link del sito corrente',           
            mode5:                'Inserimento manuale dei link',           
            mode6:                'WGC - Testarea',           
            mode7:                'Selezione modalità',           
            mode8:                'Recupera e nascondi'
          },
         message: {
            message102:           'Links dal Server ricevuti. Avviare il processo.',
            message104:           'Ricezione dei dati confermata dal server',           
            message1041:          'Modalita Loop | Avvio nuova richiesta',
            askforlinks:          'Richiesta del link al Server. Prego attendere ...',
            searchforfb:          'Ricerca Login di Facebook ...',
            cantfindfb:           'Facebook-ID non trovato',
            foundfb:              'Facebook-ID trovato',
            preparestart:         'Preparazione per inizio',
            requested:            'Richiesta fatta al server...',
            nonewlinks:           'Nessun nuovo Link trovato',
            waitforlike:          'Attendere fino a che tutti i "Mi piace" siano cliccati',
            from:                 'Da',
            klicklike:            'Click "Mi piace"',           
            linkscalled:          'Links chiamato',           
            ok:                   'Ok',
            expired:              'Scaduti',
            unknown:              'Sconosciuti',
            intogame:             'Link al gioco',           
            pagelet_wall:         "Trovata richiesta privata",           
            pagelet_group_mall:   "Trovata Bacheca del gruppo",           
            pagelet_home_stream:  "Trovata la mia bacheca",           
            pagelet_notfound:     "Nessuna bacheca trovata",
            startsearch:          "Inizia la ricerca per i collegamenti",
            dnotfoundlnk:         "Nessun link trovato",           
            dnotfoundfhlnk:       'Nessun link trovato per "Recupera e Nascondi"',
            serverconerr:         "Errore di comunicazione col server",
            senddata:             'Invio dei risultati al server... attendere prego',
            userabbord:           'Annullata dall\' utente',
            msgfrommw:            'Messaggio del Mondo Monster: '            
          },
          prompt: {           
            imonfb:               'Si avvia il clicker al di fuori di Facebook. Assicurarsi di essere connessi a FB. \ Vai?',
            linksinqueue:         'x "Mi piace" in coda',       
          },
        en: {
          buttons: {
            stop:                 'Stop',
            reset:                'Finished',
            options:              'Settings',
            save:                 'Save',
            abbort:               'Cancel',
            help:                 'Help',
            go:                   'ok'
          },
          options: {
            options:              'Options',
            windowpos:            'Position',
            usewindows:           'Concurrent requests',
            delay:                'Wait after Link-Click',
            delayLike:            'Wait after "I like"',
            writeemail:           'wite e-mail',
            lkuserscripts:        'Link Klicker on userscripts.org',
            language:             'Language',
            dbmax:                'Stop DB-mode after ',
            stopafterlimreach:    'Stop after reach Daylimit'
          },
          tag: {
            windowpos:            '"Position of the menu on-screen. Zero is upper right corner."',
            usewindows:           '"Amount of concurrent requests to the server"',
            delay:                '"Time to wait after clicking - recommendation: 0"',
            delaylike:            '"Time to wait after -I like- click before the next one occurs."',
            dbmax:                '"Stop automatically after clicking x links from the WGC-database"'
          },
          error: {
            valueoutofrange:      'Out of range',
            error:                'Input error',
            cantreadcontent:      'cannot read, format is unknown.',
            linkintogame:         'Link goint straight to the game',
            cantfindkey:          'signed_request-Key not found - logged in in Facebook??',
            onerror_fb:           'The Facebook-server reports an error. Link is skipped, next one following in a few seconds.',
            onerror_wooga:        'The MonsterWorld-server reports an error. Link is skipped, next one following in a few seconds.',
            timeout:              'The request was not honoured in the given time.',
            statuserr:            'reports connection-error.'
          },
          string: {
            like:                 'I like',
            starsdbbonus:         'Closed group. Only for Betatesters.',
            starsdbwoogo:         'WoGartenCenter is a database for Woogoo- and Plants-links.\nEnter your links and click the links of others.\nEvery MonsterWorld player is welcome.\n(Registration required)\n\nhttp://wogartencenter.de',
            insertlinks:          'Paste your links in this field, then press START\n\nTip:\nYou can also enter random text in this field.\nLinks get filtered out.',
            lrready:              'Monster World Link Klicker is starting',
            running:              'running',
            end:                  'finished',
            woogo:                "Woogoo",
            plants:               "Plants",
            ignored:              "Skipped",
            found:                "Found",
            stars:                "Stars",
            time:                 'Time'
          },
          mode: {
            mode1:                'Facebook (with like)',
            mode2:                'Facebook (without like)',
            mode3:                'WoGartenCenter - DB',
            mode4:                'All Links from this page',
            mode5:                'Enter links manually',
            mode6:                'WGC - Testarea',
            mode7:                'Marking mode',
            mode8:                'Buscar y Ocultar'
          },
          message: {
            message102:           'Links from server recieved - Starting processing.',
            message104:           'Recieved data aknowledged by server',
            message1041:          'Loop-Mode | New request being started',
            askforlinks:          'Asking server for links. Please wait...',
            searchforfb:          'Search for Facebook-Login ...',
            cantfindfb:           'Facebook-ID not available',
            foundfb:              'Facebook-ID found',
            preparestart:         'Preparing for start',
            requested:            'Request sent...',
            nonewlinks:           'No new links available',
            waitforlike:          'Waiting until all "I like" clicks are finished',
            from:                 'by',
            klicklike:            'Click "I like"',
            linkscalled:          'Links called',
            ok:                   'ok',
            expired:              'expired',
            unknown:              'unknown',
            intogame:             'going in game',
            pagelet_wall:         "Private-Wall found",
            pagelet_group_mall:   "Group-Wall found",
            pagelet_home_stream:  "Own Wall found",
            pagelet_notfound:     "No Facebook-wall found",
            startsearch:          "Start searching for links",
            dnotfoundlnk:         "No MW links found",
            dnotfoundfhlnk:       'No links found for Buscar y Ocultar',
            serverconerr:         "Error communicating with server",
            senddata:             'Sending results to server, please wait...',
            userabbord:           'User aborted',
            msgfrommw:            'Message from Monster World: '            
          },
          prompt: {
            imonfb:               'You try to start Klicker outside of Facebook. Ensure that you are logged in in Facebook.\nContinue?',
            linksinqueue:         'x "I like" in Queue',        
          } 
        }
    }
}

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('6k={8B:[10,11,13,14],6O:[21],98:[8],76:[8,10,11,13,14,21]};w 1l=N 2f(3,1,2,4,5,6,\'1s\',\'1v\');w 8u=N 2f(1,2,3,4,5,6,\'26\');w 6u=N 2f(3,\'26\');w 6M=N 2f(0,8,10,11,13,14,21);w 2S;w 34;w 3c=2o.3c;w 2x=D;w 3T=F;w 1b;w 31;w 49;w 4d;w 7a;w 4Z;w 4W;w e={H:{4x:\'9b\',8D:\'44://9l.9m.9n.9i.1w/9d?\',6D:4c.5Q.6F+\'//2s.28.1w/2r-2w/?\',8q:\'44://7i.3Q/9f.6K\',1K:T,4j:10,5u:10,3W:60,1O:5,4q:0,8Z:0,74:D,6S:D,9g:F},6g:{9h:"44://"+4c.5Q.8K,8X:8R.9c.a1("8s")>-1?D:F,68:F,},n:{2z:T,2B:T,l:\'3Q\',}};g 6A(){2q=2o.3q("C");2q.p="2q";3c.3L(2q);$(2q).1a({3F:\'4i\',2R:e.n.2z+\'1h\',33:e.n.2B+\'1h\',2D:\'1I\'}).1Z(\'4g\')}g 6w(){$(\'#2q\').1f(\'<C p="4n"></C>\');$(\'#4n\').1a({2R:\'1x\',1b:\'1x 36 #3G\',2N:\'9U\',1e:\'7l\',5m:\'1x 1x Z Z\',W:\'#2g\',3B:\'#3G\',1D:\'1V 73 1V 1F\',aa:\'0.5\',2D:\'1I\'}).1H("9R 9Q 9y - v"+e.H.4x+" <2W 1i=\\"1b:1V 36 #2g;1D:Z 1x 1V 1x;4Q:Z Z Z 73;6W:2R\\">x</2W> <2W 1i=\\"1b:1V 36 #2g;1D:Z 1x 1V 1x;6W:2R\\">9w</2W>").9s().1a(\'5j\',\'9C\').5k(g(){j(34)54(34);41(D)},g(){34=1r.1W(g(){41(F)},6a)})};g 6E(){6t=9L;6l=9O;2F=2o.3q("C");2F.p="2F";3c.3L(2F);$(2F).1a({3F:\'4i\',33:\'50%\',2R:\'50%\',5z:-(6t/2)+\'1h\',5A:-(6l/2)+\'1h\',2D:\'3Y\'}).1Z(\'4g\');$(2F).1f(\'<6Y p="3b" I="4M"></6Y>\').15();$(\'#3b\').1a({2N:6t+\'1h\',1e:6l+\'1h\',1D:\'83\',5T:\'4S\',4G:\'9H\',9G:\'9P\'}).4T(\'<br><1d 1m="2S" 2a="64" p="64" I="2V" 1c="\'+o[e.n.l].29.9N+\'"></1d>\');$(\'#64\').1t(g(){5r(F);2v();e.H.2I=F;2b=5;2T(D);j(3d(2)){2Q();2C()}$(3b).S(\'\')});3b=$(\'#3b\')}g 6G(){6i=8E;6d=8E;x=3P.5C-70;y=3P.5B-3S;e.H.2m?69=\'4X="4X"\':69=\'\';2M=2o.3q("C");2M.p="2M";3c.3L(2M);$(2M).1a({3F:\'4i\',33:\'50%\',2R:\'50%\',5z:-(6i/2)+\'1h\',5A:-(6d/2)+\'1h\',2D:\'3Y\'}).1Z(\'4g\');$(2M).1f(\'<C p="8o" I="4M"></C>\').15();$(\'#8o\').1a({2N:6i+\'1h\',1e:6d+\'1h\',1D:\'83\',5T:\'4S\',}).1H(\'<5s><35>\'+o[e.n.l].1G.1G+\'</35></5s>\'+\'<3E/>\'+\'<4C I="a9" 1e="6z%" a8="2" 6C="0" 1b="0">\'+\'<U>\'+\'<E 1i="1e:ab" 1C=\'+o[e.n.l].3U.7Y+\'>\'+o[e.n.l].1G.7Y+\' :</E>\'+\'<E>X: </E><E><1d p="2z" 1c=\'+e.n.2z+\' 2H="3" 1m="R"> (2 - \'+x+\')</E>\'+\'</U><U>\'+\'<E></E><E>Y: </E><E ac="30%"><1d p="2B" 1c=\'+e.n.2B+\' 2H="3" 1m="R"> (25 - \'+y+\')</E>\'+\'</U><U>\'+\'<E 2G="3"><3E/><E>\'+\'</U><U>\'+\'<E 2G="2" 1i="1e:4f" 1C=\'+o[e.n.l].3U.81+\'>\'+o[e.n.l].1G.81+\' :</E><E><1d p="1O" 1c=\'+e.H.1O+\' 2H="3" "1m="R"> (3g 5)</E>\'+\'</U><U>\'+\'<E 2G="3"><3E/><E>\'+\'</U><U>\'+\'<E 2G="2" 1i="1e:4f" 1C=\'+o[e.n.l].3U.51+\'>\'+o[e.n.l].1G.ah+\' :</E><E><1d p="51" 1c=\'+e.H.4j+\' 2H="3" "1m="R"> 8b</U>\'+\'<E 2G="2" 1i="1e:4f" 1C=\'+o[e.n.l].3U.1K+\'>\'+o[e.n.l].1G.1K+\' :</E><E><1d p="1K" 1c=\'+e.H.1K+\' 2H="3" "1m="R"> 8b</U>\'+\'</U><U>\'+\'<E 2G="3"><3E/><E>\'+\'</U><U>\'+\'<E 2G="2" 1i="1e:4f" 1C=\'+o[e.n.l].3U.1L+\'>\'+o[e.n.l].1G.1L+\' :</E><E><1d p="1L" 1c=\'+e.H.1L+\' 2H="3" "1m="R"> ae</U>\'+\'</E>\'+\'<E 2G="2" 1i="1e:4f" 1C=\'+o[e.n.l].3U.1L+\'>\'+o[e.n.l].1G.2m+\' :</E><E><1d p="2m" 1c="D" 1m="a4" \'+69+\'/></U>\'+\'</4C><3E/><br>\'+o[e.n.l].1G.l+\': <5h p="l">\'+\'<2i 1c="3Q">9p</2i>\'+\'<2i 1c="9X">a2</2i>\'+\'<2i 1c="9Z">ai</2i>\'+\'<2i 1c="8Q">8O</2i>\'+\'<2i 1c="8T">8S</2i>\'+\'</5h><br>\'+\'<br><br>\'+\'<35><a 20=8P:93@90.3Q>\'+o[e.n.l].1G.91+\'</a> | <a 20="44://95.8w/9a/2Z/97">5b 99 8L 9o.8w</a><br><br>\'+\'<6q 9e="22://45.9k.1w/94-96/8Y" 3t="8W"><1d 1m="8d" 2a="8M" 1c="8U-8N"><1d 1m="8d" 2a="a0" 1c="a3"><1d 1m="9Y" 8r="22://45.8y.1w/8x/9T/i/9S/9W.8v" 1b="0" 2a="a5" 8t="af ag, 9x 9z 9A 9B 9t â�� 9u 9D."><9M 8t="" 1b="0" 8r="22://45.8y.1w/8x/i/9K/9J.8v" 1e="1" 2N="1"></6q>\'+\'</b><br>\').4T(\'<1d 1m="2S" 2a="5I" p="5I" I="2V" 1c="\'+o[e.n.l].29.9F+\'"></1d><1d 1m="2S" 2a="5G" p="5G" I="2V" 1c="\'+o[e.n.l].29.9E+\'"></1d>\');53=$(\'#2z\');52=$(\'#2B\');42=$(\'#1O\');4m=$(\'#51\');4E=$(\'#1K\');4l=$(\'#1L\');5y=$(\'#2m\');$(\'#5I\').1t(g(){1X("2z",$(53).S());1X("2B",$(52).S());1X("1O",$(42).S());1X("8n",$(4m).S());1X("1K",$(4E).S());1X("l",$(\'#l\').S());1X("1L",$(4l).S());1X("2m",$(5y).1E("4X")?D:F);e.H.1O=$(42).S();e.H.4j=$(4m).S();e.H.1L=$(4l).S();e.H.2m=$(5y).1E("4X")?D:F;4P(F)});$(\'#5G\').1t(g(){4P(F)});$(\'#2z, #2B, #1O, #51, #1K, #1L\').9V(g(){w x=$(53).S();w y=$(52).S();w f=$(42).S();w d=$(4E).S();w 4F=$(4m).S();w 3g=$(4l).S();j(3g>9I||3V(3a(3g))){3g=1I;$(4l).S(3g)}j(x<2||x>3P.5C-70||3V(3a(x))){x=2;$(53).S(x)}j(y<25||y>3P.5B-3S||3V(3a(y))){y=40;$(52).S(y)}j(f>5||(3V(3a(f)))){f=1;$(42).S(f)}j((3V(3a(4F)))){4F=30;$(4m).S(4F)}j((3V(3a(d)))){d=30;$(4E).S(d)}2q.1i.2R=x+\'1h\';2q.1i.33=y+\'1h\'})}g 6H(){1U=2o.3q("C");1U.p="1U";3c.3L(1U);$(\'#1U\').1a({3B:\'#3I\',1e:3P.5C+\'1h\',2N:3P.5B+\'1h\',3F:\'4i\',33:\'0\',9q:\'0\',2D:\'9r\'}).15()}g 6L(){5S=3S;5O=9v;2A=2o.3q("C");2A.p="2A";3c.3L(2A);$(\'#2A\').1a({3F:\'4i\',33:\'50%\',2R:\'50%\',5z:-(5S/2)+\'1h\',5A:-(5O/2)+\'1h\',2D:\'3Y\'}).1Z(\'4g\');$(\'#2A\').1f(\'<C p="5t" I="4R"></C>\');$(\'#5t\').1a({3B:\'2L\',W:\'#3I\'}).15();$(\'#2A\').1f(\'<C p="2U" I="4R"></C>\');$(\'#2U\').15();$(\'#2A\').1f(\'<C p="3C" I="4R"></C>\');$(\'#3C\').1H(\'<4C 1i="R-4O:35" a6="a7"  1e="6z%" 6C="4" I="7t"><U><2c>\'+o[e.n.l].M.7X+\'</2c><2c>\'+o[e.n.l].M.72+\'</2c><2c>\'+o[e.n.l].M.4U+\'</2c><2c>\'+o[e.n.l].M.71+\'</2c><2c>\'+o[e.n.l].2K.ad+\'</2c></U>\'+\'<U><E p="8J">0</E><E p="8F">0</E><E p="8G">0</E><E p="7D">0</E><E p="75">0</E></U></4C>\').15();$(\'#2A\').1f(\'<C p="2d" I="4M"></C>\');$(\'#2d\').1a({2N:5S+\'1h\',1e:5O+\'1h\',5m:\'32\',1D:\'1F\',5T:\'4S\',2D:\'3Y\'}).15();$(\'#2d\').4T(\'<1d 1m="2S" 2a="3A" p="3A" I="2V" 1c="\'+o[e.n.l].29.2v+\'"></1d>\');$(\'#3A\').1t(g(){2T(F);2v()}).15();$(\'#2d\').4T(\'<1d 1m="2S" 2a="4L" p="4L" I="2V" 1c="\'+o[e.n.l].29.9j+\'"></1d>\');$(\'#4L\').1t(g(){2x=F;$(1o).1y(\'Q\',0.2)}).15();1b=$(\'#4n\');31=$(\'#2d\');49=$(\'#2U\');4d=$(\'#5t\');7a=$(\'#3C\');4Z=$(\'#3A\');4W=$(\'#4L\')}g 6v(){$(\'#2q\').1f(\'<C p="27"></C>\');$(\'#27\').1a({3F:\'8V\',1e:\'92\',33:\'aQ\',5m:\'Z Z 1x 1x\',1b:\'1V 36 #3G\',3B:\'#2g\',2D:\'8j\'}).15();$(\'#27\').5k(g(){j(34)54(34);41(D)},g(){34=1r.1W(g(){41(F)},6a)});$(\'#27\').1f(\'<C p="V"></C>\');$(\'#V\').1a({W:\'#3I\',bP:\'35\',1D:\'1F\',1e:\'7l\'});$(\'#V\').1f(\'<C I="V" p="5K">\'+o[e.n.l].1q.88+\'</C>\');$(\'#5K\').1t(g(){$(\'#27\').3r(\'Q\',g(){5d()})}).15();$(\'#V\').1f(\'<C I="V" p="5L">\'+o[e.n.l].1q.87+\'</C>\');$(\'#5L\').1t(g(){$(\'#27\').3r(\'Q\',g(){5e()})}).15();$(\'#V\').1f(\'<C I="V" p="5M">\'+o[e.n.l].1q.86+\'</C>\');$(\'#5M\').1t(g(){56()}).15();$(\'#V\').1f(\'<C I="V" p="7m">\'+o[e.n.l].1q.7n+\'</C>\');$(\'#7m\').1t(g(){$(\'#27\').3r(\'Q\',g(){6s()})});$(\'#V\').1f(\'<C I="V" p="7q">\'+o[e.n.l].1q.7o+\'</C>\');$(\'#7q\').1t(g(){6m()});$(\'#V\').1f(\'<C I="V" p="58">\'+o[e.n.l].1q.8A+\'</C>\');$(\'#58\').1t(g(){57()}).15();$(\'#V\').1f(\'<C I="V" p="5f">\'+o[e.n.l].1q.5a+\'</C>\');$(\'#5f\').1t(g(){$(\'#27\').3r(\'Q\',g(){5c()})}).15();$(\'#V\').1f(\'<C I="V" p="5g">\'+o[e.n.l].1q.77+\'</C>\');$(\'#5g\').1t(g(){$(\'#27\').3r(\'Q\',g(){79()})}).15();$(\'#V\').1f(\'<3E><C I="V" p="7r">\'+o[e.n.l].29.1G+\'</C>\');$(\'#7r\').1t(g(){6j()});$(\'#V\').1f(\'<C I="V" p="7u">\'+o[e.n.l].29.7v+\'</C>\');$(\'#7u\').1t(g(){6n()});$(\'.V\').5k(g(){$(1o).1a({5j:\'3O\',3B:\'#bQ\'})},g(){$(1o).1a({5j:\'7j\',3B:\'#2g\'})}).1a({4Q:\'1x\',1D:\'1F\',4N:\'7j bO% "7z 7y",7A,7B,7C,7J-7K\'})}g 5d(){1Y();2v();17.2l=N 1j();2I=D;2b=1;4K()}g 5e(){1Y();2v();17.2l=N 1j();e.H.2I=F;2b=2;4K()}g 56(){1Y();17.2l=N 1j();17.2l=N 1j();4H(3)}g 6s(){1Y();2v();17.2l=N 1j();2T(D);e.H.2I=F;2b=4;j(3d(1)){2Q();2C()}}g 6m(){1Y();17.2l=N 1j();5r(D)}g 57(){1Y();17.2l=N 1j();4H(6)}g 5c(){1Y();2b=7;4K(D);1z(o[e.n.l].1q.5a);$(\'#3A\').2Z()}g 79(){1Y();2b=8;2x=F;2T(D);j(7Q()){2Q();4t=D;1p(w i=0;i<k.1v.B;i++)5E(i);1B[0]=2b;6b()}1z(o[e.n.l].1q.77);$(\'#3A\').2Z()}g 6j(){4P(D)}g 6n(){5Z("44://bN.7i.3Q")}g 2T(2u){j(2u==D){$(1U).1y(\'Q\',0.8);$(\'#2U, #2d, #3C\').4k(\'Q\');$(4W).4k().1y(\'bL\',1)}J{$(\'.2V, #2U, #2d, #3C\').4e(\'Q\');$(\'#1U\').1y(\'Q\',0).15()}}g 4P(2u){j(2u==D){$(1U).1y(\'Q\',0.8);$(2M).4k(\'Q\')}J{$(1U).1y(\'Q\',0).15();$(2M).4e(\'Q\')}}g 5r(2u){j(2u==D){$(1U).1y(\'Q\',0.8);$(2F).4k(\'Q\');$(\'#3b\').5h().bM()}J{$(1U).1y(\'Q\',0).15();$(2F).4e(\'Q\')}}g 41(2u){j(2u==D){$(\'#4n\').1y(\'Q\',1);$(\'#27\').bR(\'Q\')}j(2u==F){$(\'#4n\').1y(\'Q\',0.5);$(\'#27\').3r(\'Q\')}}g 4K(2J){2T(D);1A=7f();3X(1A){18 1:L(o[e.n.l][\'M\'][\'7w\']);j(3d()){j(!2J)4z();4b();2Q();j(!2J)2C()}O;18 2:L(o[e.n.l][\'M\'][\'7x\']);j(3d()){j(!2J)4z();4b();2Q();j(!2J)2C()}O;18 3:L(o[e.n.l][\'M\'][\'7P\']);j(3d()){j(!2J)4z();4b();2Q();j(!2J)2C()}O;3O:j(3d(1)){4b();2Q();j(!2J)2C()}O}}g 7f(){1A=T;j($(\'C[p="7w"]\').B)1A=1;J j($(\'C[p="7x"]\').B)1A=2;J j($(\'C[p="7P"]\').B)1A=3;1Q 1A}g 3d(5J){L(o[e.n.l][\'M\'][\'bS\']);w G=0;w 1M=0;j(5J==1)$(\'a[20^="22://2s.28.1w/2r-2w/"]\').3y(g(){w 3M=$(1o).1E(\'20\');j(3M){19=3M.1S(/22:\\/\\/2s.28.1w\\/2r-2w\\/\\?.*3m=([0-9]{1,2}).*&3l=([0-9]{1,2}).*&u=([a-3n-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3j=([A-P-9]{8}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{12})/i);j(19!=T){1p(q=0;q<19.B;q++){j(!k[q])k[q]=N 2f();k[q][G]=19[q]}k.1s[G]=$(1o);k[\'1v\'][G]=G;k[\'K\'][G]=T;G++}}});J j(5J==2){4J=$(\'#3b\').S().1S(/22:\\/\\/2s.28.1w\\/2r-2w\\/\\?.*3m=([0-9]{1,2}).*&3l=([0-9]{1,2}).*&u=([a-3n-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3j=([A-P-9]{8}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{12})/bX);j(4J!=T){1p(G=0;G<4J.B;G++){19=4J[G].1S(/22:\\/\\/2s.28.1w\\/2r-2w\\/\\?.*3m=([0-9]{1,2}).*&3l=([0-9]{1,2}).*&u=([a-3n-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3j=([A-P-9]{8}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{12})/i);j(19!=T){1p(w q=0;q<19.B;q++){j(!k[q])k[q]=N 2f();k[q][G]=19[q]}k.1s[G]=$(1o);k[\'1v\'][G]=G;k[\'K\'][G]=T}}}}J $(\'7R[I~="7V"]\').3y(g(){K[1M]=$(1o);5F[1M]=$(1o).1u(\'a[20^="22://2s.28.1w/2r-2w/"][I!="7S"]\').7U(\'[I~="7T"]\').3y(g(){w 3M=$(1o).1E(\'20\');j(3M){19=3M.1S(/22:\\/\\/2s.28.1w\\/2r-2w\\/\\?.*3m=([0-9]{1,2}).*&3l=([0-9]{1,2}).*&u=([a-3n-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3j=([A-P-9]{8}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{12})/i);j(19!=T){1p(w q=0;q<19.B;q++){j(!k[q])k[q]=N 2f();k[q][G]=19[q]}k.1s[G]=$(1o);k[\'1v\'][G]=G;k[\'K\'][G]=1M;G++}}});1M++});j(k.1v.B)5R();J{L(o[e.n.l][\'M\'][\'7M\'],1);1z(o[e.n.l][\'M\'][\'7M\'],"2L");2O(D)}1Q k.1v.B}g 7Q(){$(\'7R[I~="7V"]\').3y(g(){K[1M]=$(1o);5F[1M]=$(1o).1u(\'a[20^="22://2s.28.1w/2r-2w/"]\').7U(\'[I~="7T"][I!="7S"]\').3y(g(){19=$(1o).1E(\'20\').1S(/22:\\/\\/2s.28.1w\\/2r-2w\\/\\?.*3m=([0-9]{1,2}).*&3l=([0-9]{1,2}).*&u=([a-3n-9]{16})&l=([a-z]{1,4})&s=([0-9]+).*&3j=([A-P-9]{8}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{4}\\-[A-P-9]{12})/i);j(19!=T&&19[5]==3s&&6V.6r(67(19[1]),6k.76)>-1)$(K[1M]).1u(\'a[7F*="6B"]\').3y(g(){46.8c([$(1o),K[1M]]);j(19!=T){1p(q=0;q<19.B;q++){j(!k[q])k[q]=N 2f();k[q][G]=19[q]}k.1s[G]=$(1o);k[\'1v\'][G]=G;k[\'K\'][G]=1M;G++}})});1M++});j(k.1v.B)5R();J{L(o[e.n.l][\'M\'][\'7E\'],1);1z(o[e.n.l][\'M\'][\'7E\'],"2L");2O(D)}1Q k.1v.B}g 5R(){7G(k[3],k[1],k[2],k[4],k[5],k[\'1s\'],k[\'1v\'],k[\'K\']);k[1l.B+1]=N 2f();j(k[1l[0]].B>1){k[1l.B+1][0]=D;1p(u=1;u<=(k[1l[0]].B-1);u++){j(k[1l[0]][u]==k[1l[0]][u-1]){k[1l.B+1][u]=F;$(k[\'1s\'][u]).1a("2j-W","#bY")}J k[1l.B+1][u]=D}}J k[1l.B+1][0]=D;7G(k[\'1v\'],k[3],k[1],k[2],k[4],k[5],k[\'1s\'],k[\'K\'],k[1l.B+1])}g 8l(){1p(w 3x=0;3x<46.B;3x++){w bW=3x;w 23=$(46[3x][0]).1E("7F");w 6I=23.1S(/6J=(\\d+)&/i)[1];w 4A=23.1S(/4A=(\\d+)&/i)[1];w 4B=23.1S(/4B=(\\d+)&/i)[1];w 4V=23.1S(/4V=(.+)&/i)[1];4w({3t:"6o",23:4c.5Q.6F+"//45.28.1w/bV/bT.6K?bU=1",3R:"6J="+6I+"&4B="+4B+"&4A="+4A+"&4V="+4V+"&6x="+1r.3z.6x+"&6y="+1r.3z.6y+"&bK="+1r.3z.5N+"&bJ=bz"+"&bA=6B"+"&by=0",4v:g(r){}});$(46[3x][1]).4e(\'bx\',g(){$(1o).bu})}}g 4b(){j(3s!=T)1p(i=0;i<k[1l.B+1].B;i++)j(k[5][i]==3s)k[1l.B+1][i]=F}g 4z(){1p(i=0;i<k[1].B;i++){j(!$(K[k.K[i]]).1u(\'2S[I~=8e][2a=8g]\').B){k[1l.B+1][i]=F;$(K[k.K[i]]).1y(\'Q\',0.4)}}}g 2Q(){1p(i 8f 6M){t[i]=0}j(e.H.74)3N=5x=5w=D;J 3N=5x=5w=F;1p(w i=0;i<k[1].B;i++){3X(3a(k[1][i])){18 8:j(5w)$(k[\'1s\'][i]).1Z(\'7e\');t[1]++;O;18 10:j(3N)$(k[\'1s\'][i]).1Z(\'4r\');t[2]++;O;18 11:j(3N)$(k[\'1s\'][i]).1Z(\'4r\');t[2]++;O;18 13:j(3N)$(k[\'1s\'][i]).1Z(\'4r\');t[2]++;O;18 14:j(3N)$(k[\'1s\'][i]).1Z(\'4r\');t[2]++;O;18 21:j(5x)$(k[\'1s\'][i]).1Z(\'7g\');t[3]++;O;3O:t[0]++;O}j(k[1l.B+1][i]==F)t[\'5D\']++;J t[\'4a\']++}t.4o=t.4a;L(o[e.n.l][\'2K\'][\'c0\']+": "+k[1].B+" | "+o[e.n.l][\'2K\'][\'bw\']+": "+t[\'5D\']+" | "+o[e.n.l][\'2K\'][\'6O\']+": "+t[3]+" | "+o[e.n.l][\'2K\'][\'bB\']+": "+t[1]+" | "+o[e.n.l][\'2K\'][\'bC\']+": "+t[2])}g 2v(){1n=[F,F],1g=[];K=[];5F=[];1B=[];3W=[];46=[];G=0;1M=0;1A=T;4t=F;2k=0;2I=F;1b="";2x=D;3Z=F;t={1R:0,3k:T,4o:0,5D:0,4a:0,4Y:0,bH:0,bI:0,39:0,4p:0,bG:T,59:0,3o:0,3e:0,3f:0,37:0,6U:0,1B:0};k={1s:[],1v:[],K:[],3D:[],8H:[],26:[],};j(!3T)j($(\'#2d\').B)$(\'#2d\').1H("");j($(\'#2U\').B)$(\'#2U\').1H("- - -")}g 1Y(){17={t:0,bF:0,3o:0,3e:0,3f:0,37:0,2l:T}}g 2C(){55(D);1z(o[e.n.l].M.bD,"7b");1B[0]=2b;6U=k[1].B;8p(e.H.1O);1p(i=0;i<1g.B;i++){2P(i)}};g 2P(p){j(!2k){bE(!k[1l.B+1][t.1R]&&t.1R<k[1l.B+1].B){t.1R++}}j(2I)j((k.K[t.1R]>t.3k||t.1R==k.K.B)&&t.3k!=T){5P(t.3k);t.3k=k.K[t.1R]}J t.3k=k.K[t.1R];j(t.1R<k[1].B&&!(!2k&&!2x)&&!3Z){1g[p][1]=N 1j();1g[p][2]=D;6X(t.1R,"5p",p);t.1R++;t.4Y++}J{}j(1g[p][2]!=D||t.4o==0)t.4p++;j(t.4p==1g.B){R=o[e.n.l].M.7X+": "+t.59+" --- "+o[e.n.l].M.72+": "+t.3o+" --- "+o[e.n.l].M.4U+": "+t.3e+" --- "+o[e.n.l].M.71+": "+t.3f+" --- "+o[e.n.l].M.bZ+": "+t.37;L(R);6b();55(F);2O(D)}};g 6X(1k,ca,p){2E(p,1);4w({3t:\'ck\',23:e.H.6D+5W(1k),8I:{\'cj-ci\':\'ce/5.0 (cl cm 6.1; cc; c5:10.0.2) c1/c2 8s/10.0.2\',\'c9\':\'R/1H,6p/c8+8z,6p/8z;q=0.9,*/*;q=0.8\'},5U:g(r){2E(p,2);L(o[e.n.l].1J.cb,2);t.39++;1g[p][2]=F;1r.1W(g(){2P(p)},(e.H.5u*1I),p)},4v:g(r){2E(p,2);j(r.6e==3S){1g[p][3]=N 1j();w 43=r.2e.1S(/3D\\" 1c\\=\\"([a-c7-3n-c6\\-.]+)\\"/i);j(!43){L(o[e.n.l].1J.c3,2);t.39++;2P(p)}k[\'3D\'][1k]=43[1];5p(1k,p)}J{L("cd "+o[e.n.l].1J.82+": "+r.8a);t.39++;1g[p][2]=F;1r.1W(g(){2P(p)},(e.H.1K*1I),p)}}})};g 5p(G,p){w 1k=G;t.59++;17.t++;2E(p,1);4w({3t:"6o",23:e.H.8D+5W(G)+"&3D="+k.3D[G],5U:g(r){2E(p,2);L(o[e.n.l].1J.c4,2);t.39++;1g[p][2]=F;1r.1W(g(){2P(p)},(e.H.5u*1I),p)},4v:g(r){2E(p,2);w 38="";w 3h;w 5q=N 1j().2p()-1g[p][1].2p();w 5i=N 1j().2p()-1g[p][3].2p();w 5o=1g[p][3].2p()-1g[p][1].2p();w 43=r.2e.1S(/\\<1C\\>(.+)\\<\\/1C\\>/i);w cg=$(r.2e).1u(\'1C\');w 84=$(r.2e).1u(\'#29\');w 47=$(r.2e).1u(\'2W\');w 5n=$(r.2e).1u(\'#R\');w 5H=5n.1u(\'5s\').R();w 5l=5n.1u(\'ch\').R();w 7Z=$(47).cf(\'bv\');!1A?3h=T:3h=$(K[k.K[G]]).1u(\'C[I~=3h]\').R();3h?38=" "+o[e.n.l].M.bs+": "+3h:38="";j(r.6e==3S)j(84.B){j(47.B){L(5H+": ( "+5l+" ) - ( "+5i+" | "+5o+" | "+5q+" ) "+38+\' | \'+$(47).R(),1);3i(1k,1);k.26[1k]=1;t.3e++;17.3e++}J{L(5H+": ( "+5l+" ) - ( "+5i+" | "+5o+" | "+5q+" ) "+38,0);3i(1k,0);k.26[1k]=0;t.3o++;17.3o++}}J j(7Z){L($(47).R(),2);k.26[1k]=4;t.80++;17.80++;j(e.H.2m||2k){3Z=D;2x=F}}J j(43[1]){L("5b "+38+" | "+o[e.n.l].1J.63,2);3i(1k,2);k.26[1k]=2;t.3f++;17.3f++}J{L("5b "+38+" "+o[e.n.l].1J.aH,2);3i(1k,2);k.26[1k]=3;t.37++;17.37++}J{L("aI "+o[e.n.l].1J.82+": "+r.8a);3i(1k,2);k.26[1k]=3;t.37++;17.37++};5E(1k);1g[p][2]=F;1r.1W(g(){2P(p)},(e.H.1K*1I),p);1z(t.39+" / "+t.4o+" ( "+o[e.n.l].2K.aG+" )");t.39++}})};g 2E(p,4u){j(4u==1){3W[p]=1r.1W(g(){2E(p,3)},(e.H.3W*1I),p)}J j(4u==2){54(3W[p])}J j(4u==3){L(o[e.n.l].1J.3W,2);2P(p)}}g 6Z(){e.H.1O=1P("1O",1);e.n.2z=1P("2z","2");e.n.2B=1P("2B","40");e.n.l=1P("l","3Q");e.6g.68=1P("aF",F);e.H.4j=1P("8n",30);e.H.1K=1P("1K",0);e.H.4q=1P("aC",0);e.H.4s=1P("4s",0);aj=1P("4x",0);e.H.1L=1P("1L",1I);e.H.2m=1P("2m",D);j(e.H.1O>5)e.H.1O=5};g 5P(c){j(c!=T)1n.8c(c);j(1n[0]==F){L("< "+o[e.n.l].M.2I+" >");$(K[1n[2]]).1u(\'2S[I~=8e][2a=8g]\').4y().1t();1n.8C(2,1);1n[0]=D}j(1n.B>2&&1n[1]==F){1n[1]=D;aE=1r.1W(g(){1n[0]=F;1n[1]=F;5P()},e.H.4j*1I)}j(1n.B>2&&1n[0]==D&&1n[1]==D){$(4d).4k();$(4d).1H((1n.B-2)+\' \'+o[e.n.l].aJ.aK)}J{$(4d).4e();2O(D)}}g 7H(){j(1r.3z){5v=$().bt({3t:\'aR\',aP:1r.3z.5N});3s=1r.3z.5N;e.H.4q=5v;1X("4q",5v);$(\'#5K, #5L, #5M, #58, #5f, #5g\').2Z();L(o[e.n.l].M.aO+": "+3s);2n(o[e.n.l].1q.88,g(){5d()});2n(o[e.n.l].1q.87,g(){5e()});2n(o[e.n.l].1q.86,g(){56()});2n(o[e.n.l].1q.8A,g(){57()});2n(o[e.n.l].1q.5a,g(){5c()});d=N 1j().2p();j(e.H.4s<d-60*60*24){4I();1X("4s",d.aL())}}J{3s=T;L(o[e.n.l].M.aM)}}g aN(2X){3u=6u;L("aB: "+2X.B,1);1p(2t=0;2t<2X.B;2t++){L("2X[2t]: "+2X[2t]+" | 2t: "+2t,3);j($.6r(2X[2t],3u)==-1)2X.8C(2t,1)}}g 8h(2y){2y.1s=[];2y.3D=[];2y.K=[];2y.8H=[];2y.1v=[];2y.26=[];2y[0]=[];1Q 2y}g 5E(G){j((!2k&&6V.6r(67(k[1][G]),6k.8B)>-1&&k.26[G]==0)||4t)3u=8u;J j(2k)3u=6u;J 1Q;1p(w 2Y=0;2Y<3u.B;2Y++){j(!1B[2Y+1])1B[2Y+1]=[];1B[2Y+1][t.1B]=k[3u[2Y]][G]}t.1B++}g 4I(){4w({3t:"6o",23:e.H.8q,8I:{"aA-1m":"6p/x-45-6q-ap"},3R:"3R="+8i.aq(1B)+"&ao="+e.H.4q+"&v="+e.H.4x,4v:g(r){89(r)},5U:g(r){j(2k)L(o[e.n.l].M.an,2)}})};g 89(r){j(r.2e=="")1Q;3T=F;ak{r.2e=4c.al(r.2e)}am(ar){};w 1N=8i.as(r.2e);3X(67(1N.6e)){18 ay:1p(6c 8f 1N.3R){1X(6c,1N.3R[6c])}O;18 az:L(o[e.n.l].M.ax);t.4a=t.4o=1N[1].B;k=8h(1N);2C();O;18 aw:L(1N.48);5Z(1N.3R);1z(\'\');2O(D);O;18 at:L(o[e.n.l].M.au);j(2x){L(o[e.n.l].M.8m);1z(o[e.n.l].M.8m,"2L");4H(1N.48)}J j(2b==8){8l()}J 2O(D);O;18 3S:3p();L(1N.48);2O(D);O;18 8j:3p("7c");L(1N.48,1);av(1N.48);O;3O:O}};g 6b(){j(!1B[1]||!1B[1].B)1Q;j((2k&&!3Z)||4t){L(o[e.n.l].M.8k,3);1z(o[e.n.l].M.8k,"2L");3T=D;j(17.t>=e.H.1L)2x=F}4I()}g 5Z(23){w aS=4c.aT(23,"",\'2N=bh,1e=bi,bg=bf\')}g L(o,W){j(W==T)$(31).1H($(31).1H()+65()+": "+o+"<br>");J{3X(W){18 0:1T="#bc";O;18 1:1T="#bd";O;18 2:1T="#be";O;3O:1T="#3I";O}$(31).1H($(31).1H()+\'<2W 1i="W:\'+1T+\'">\'+65()+": "+o+"</2W><br>")}$(31).bj(2o.bk("2d").bp)}g 7W(){$(1b).1y(\'Q\',1,g(){$(1o).1y(\'Q\',0.5)})}g 1z(o,1T){j(1T)3p(1T);$(49).1H(o)}g 8p(85){1g=[];1p(i=0;i<85;i++){1g[i]=N 2f()}};g 5W(G){1Q 19="3m="+k[1][G]+"&3l="+k[2][G]+"&u="+k[3][G]+"&l="+k[4][G]+"&s="+k[5][G]+"&3j="+k[6][G]}g 2O(2Z){j(2Z){j((t.4p==1g.B&&3T==F&&1n[1]==F)||3Z){$(4Z).2Z();$(4W).15();3p();j(t.4Y>0)1z(t.4Y+" / "+t.4a+" ( "+o[e.n.l].2K.bq+" )");j(!2x)L(o[e.n.l].M.bo);1n=[F,F];1Y()}J j(t.4p==1g.B&&!2k&&e.H.2I){3p("2L");1z(o[e.n.l].M.bn)}}J $(4Z).15()}g 55(6P){$(\'#8J\').R(17.t);$(\'#8F\').R(17.3o);$(\'#8G\').R(17.3e);$(\'#7D\').R(17.3f);$(\'#75\').R(bl.bm((N 1j().2p()-17.2l.2p())/1I));j(6P){6Q=1r.1W(g(){55(D)},1I)}J 54(6Q)}g 3p(1T){$(49).bb("78 7d 7k");j(1T)$(49).1Z("ba"+1T)}g 3i(2h,6T){j(e.H.6S&&1A!=T){3X(6T){18 0:j(1A==1)$(K[k.K[2h]]).6h(\':62\').1E(\'I\',\'5Y\');J $(K[k.K[2h]]).1u(\'a[20*="\'+k[3][2h]+\'"]\').4y().4G(\'<C I="5Y"></C>\');O;18 1:j(1A==1)$(K[k.K[2h]]).6h(\':62\').1E(\'I\',\'66\').1E(\'1C\',o[e.n.l].1J.4U);J $(K[k.K[2h]]).1u(\'a[20*="\'+k[3][2h]+\'"]\').4y().4G(\'<C I="66"></C>\').1E(\'1C\',o[e.n.l].1J.4U);O;18 2:j(1A==1)$(K[k.K[2h]]).6h(\':62\').1E(\'I\',\'6f\').1E(\'1C\',o[e.n.l].1J.63);J $(K[k.K[2h]]).1u(\'a[20*="\'+k[3][2h]+\'"]\').4y().4G(\'<C I="6f"></C>\').1E(\'1C\',o[e.n.l].1J.63);O;3O:O}}}g 4H(6R){3T=D;2v();1B[0]=2b=6R;2k=D;1z(o[e.n.l].M.6N,"2L");2T(D);L(o[e.n.l].M.6N);4I()}g 65(a){j(a!=T){w s=N 1j().5X()-a.5X();w m=N 1j().5V()-a.5V();w h=N 1j().61()-a.61()}J{w d=N 1j;w h=d.61();w m=d.5V();w s=d.5X()}h=4D(h);m=4D(m);s=4D(s);1Q h+":"+m+":"+s}g 4D(i){j(i<10)i="0"+i;1Q i}g 7I(1a){w 4h,1i;4h=2o.aZ(\'4h\')[0];j(!4h){1Q}1i=2o.3q(\'1i\');1i.1m=\'R/1a\';1i.b0=1a;4h.3L(1i)}g 7p(){6Z();j(e.6g.68)1Q;2v();1Y();6A();6w();6v();6L();6H();6G();6E();1r.1W(g(){7W()},6a);7H();7I(\'.4g{W:#3I;4N: aY "7z 7y",7A,7B,7C,7J-7K}.2V{1b:1V 36 #2g;1e:aX;-3J-1b-3H:32;-3K-1b-3H:32;W:#2g;2j-W:#3G;1D:1V;4Q:1F;}.aU{W:#aV}.6f{-3J-3w-3v: Z Z 1F #7L;-3K-3w-3v: Z Z 1F #7L;1D: 1x}.66{-3J-3w-3v: Z Z 1F #7N;-3K-3w-3v: Z Z 1F #7N ;1D: 1x}.5Y{-3J-3w-3v: Z Z 1F #7O;-3K-3w-3v: Z Z 1F #7O ;1D: 1x}.7e{2j-W:#aW}.7g{2j-W:#b1}.4r{2j-W:#b2}.4R{R-4O: 35; 1b: 1V 36 #3G;2N-b8: 7s;-3J-1b-3H:32;-3K-1b-3H:32; 2j-W: #2g;1D: 1F;1e:4S; b9-4O: b7; z-b6: 3Y; 4Q:0 0 1F 0;4N-2H:1.7h;b3-b4:0.7h}.7d{2j-W:7c;W:#2g}.78{2j-W:7b;W:#2g}.7k{2j-W:2L;W:#3I}.4M{-3J-1b-3H:32;-3K-1b-3H:32;2j-W:#b5;1b:1V 36 #3G}#3C{4N-2H:7s}.7t E{R-4O:35})\');2n(o[e.n.l].29.1G,g(){6j()});2n(o[e.n.l].29.7v,g(){6n()});2n(o[e.n.l].1q.7n,g(){6s()});2n(o[e.n.l].1q.7o,g(){6m()})}1r.1W(g(){7p()},aD);',62,767,'||||||||||||||setings||function|||if|linklist|language||UI|txt|id||||counter|||var|||||length|div|true|td|false|ii|script|class|else|element|printtext|message|new|break|Z0|slow|text|val|null|tr|lk_menu|color|||0px||||||hide||gb|case|query|css|border|value|input|width|append|myWindows|px|style|Date|iit|matchorder|type|likeBatch|this|for|mode|unsafeWindow|linkobj|click|find|order|com|2px|fadeTo|printtext_small|wall_type|gather|title|padding|attr|5px|options|html|1000|error|delay|dbmax|ei|jsonObj|fenster|GM_getValue|return|aCounter|match|colour|lk_overlay|1px|setTimeout|GM_setValue|reset_global|addClass|href||http|url|||linkstatus|lk_pulldown|facebook|buttons|name|opmode|th|lk_infobox|responseText|Array|FFF|this_ii|option|background|dbmode|starttime|stopafterlimreach|GM_registerMenuCommand|document|getTime|lk_container|monster|apps|ref|stat|reset|world|zycle|thisarray|positionX|lk_infobox_container|positionY|kickAss|zIndex|watchdog|lk_text_container|colspan|size|klicklike|simulation|string|yellow|lk_op_container|height|reset_btn|bouncer|count_mw_obj|right|button|show_infobox|lk_small_infobox|lk_btn|span|myarray|res|show||infobox|4px|top|pulldown_timer|center|solid|lnk3|actor|BounceCounter|Number|lk_textarea|body|scan_page|lnk1|lnk2|max|actorName|marklnk|w_accept|liCounter|st2|st1|z0|lnk0|small_info_col|createElement|slideUp|FBid|method|glistorder|shadow|box|eit|each|Env|lk_btn_ok|backgroundColor|lk_small_statbox|signed_request|hr|position|673569|radius|111|moz|webkit|appendChild|link|paint_stars|default|screen|de|data|200|clock|tag|isNaN|timeout|switch|1002|fstop||show_menu|op_f|grab|http|www|fhtable|ebt|msg|small_infobox|valid|filter_own|window|small_likebox|fadeOut|110px|lk_con|head|fixed|likeDelay|fadeIn|op_max|op_dl|lk_border|LinksToOpen|ThreadsDone|ClientHash|lk_stars|update|fhmode|op|onload|GM_xmlhttpRequest|version|first|fadeOld|story_type|profile_fbid|table|checkTime|op_d|dl|wrap|kdbm|connect|pices|run_mode|lk_btn_stop|lk_frame|font|align|show_options|margin|lk_info|auto|after|expired|story_id|btn_stop|checked|klicks|btn_ok||delaylike|op_y|op_x|clearTimeout|update_statbox|run_mode3|run_mode6|lk_mode6|lnk|mode7|Link|run_mode7|run_mode1|run_mode2|lk_mode7|lk_mode8|select|elapsedTimeWo|cursor|hover|rih2|borderRadius|ri|elapsedTimeFB|getWooga|elapsedTime|show_textarea|h1|lk_small_likebox|errordelay|myhash|paint_plant|paint_woogo|op_stop|marginTop|marginRight|availHeight|availWidth|duplicate|sort_data|attachment|lk_btn_opabbort|rih1|lk_btn_opsave|modi|lk_mode1|lk_mode2|lk_mode3|user|infobox_width|clickLike|location|sort_arrays|infobox_height|overflow|onerror|getMinutes|assemble_query|getSeconds|lk_markok|referer||getHours|parent|linkintogame|lk_btn_go|getMyTime|lk_markexpired|parseInt|lock|check|500|recall|set|options_width|status|lk_markbad|system|filter|options_height|run_options|mwliste|textarea_width|run_mode5|run_help|POST|application|form|inArray|run_mode4|textarea_height|wlistorder|make_pulldown|make_border|post_form_id|fb_dtsg|100|make_container|remove_content|cellpadding|FBurl|make_textarea|protocol|make_options|make_overlay|story_key|ministory_key|php|make_infobox|counter_vals|askforlinks|woogo|run|statbox_timer|db|markbad|marker|arraylength|jQuery|float|getFB|textarea|loadOptions|230|intogame|ok|3px|paintme|elatime|white|mode8|lk_green|run_mode8|small_statbox|green|red|lk_red|lk_plant|detect_type|lk_woogo|3em|wogartencenter|normal|lk_yellow|198px|lk_mode4|mode4|mode5|launcher|lk_mode5|lk_option|1em|overview|lk_help|help|pagelet_wall|pagelet_group_mall|grande|lucida|tahoma|verdana|arial|gblnk2|dnotfoundfhlnk|ajaxify|sortIt|getFBid|addGlobalStyle|sans|serif|FF0A0A|dnotfoundlnk|FF8000|00FF00|pagelet_home_stream|fetchhide|li|uiLinkLightBlue|UIImageBlock_Image|not|uiStreamStory|ui_blink|linkscalled|windowpos|lim|lnk4|usewindows|statuserr|10px|eb|number|mode3|mode2|mode1|serverResponse|statusText|sec|push|hidden|like_link|in|like|fit_array|JSON|999|senddata|del_stream|message1041|likedelay|lk_options|setWindowsArray|serverurl|src|Firefox|alt|slistorder|gif|org|de_DE|paypalobjects|xml|mode6|bonus|splice|woogaUrl|400|gblnk0|gblnk1|actorsDescription|headers|gbcounter|hostname|auf|cmd|xclick|France|mailto|fr|navigator|Italian|it|_s|absolute|post|isFirefox|webscr|lastupdate|linkklicker|writeemail|208px|anaximelis|cgi|userscripts|bin|113866|plant|Klicker|scripts|0910|userAgent|accept|action|connect9|connected|myHost|wooga|stop|paypal|lp|live|monsters|juserscripts|Deutsch|left|1001|mouseover|bezahlen|mit|800|_|schnell|Linkklicker|und|sicher|online|pointer|PayPal|abbort|save|resize|off|10000|pixel|scr|600|img|go|750|none|World|Monster|btn|DE|16px|change|btn_donate_SM|en|image|nl|hosted_button_id|search|English|7EYPUVHHHMJJY|checkbox|submit|rules|all|cellspacing|optionstablea|opacity|160px|wight|time|Links|Jetzt|einfach|delayLike|Nederlands|thisversion|try|atob|catch|serverconerr|cid|urlencoded|stringify|err|parse|104|message104|alert|103|message102|101|102|Content|stripdata|clienthash|5000|LikeTimer|syslog|running|cantreadcontent|Wooga|prompt|linksinqueue|toString|cantfindfb|strip_data|foundfb|source|21px|md5|lkwindow|open|lk_bad|FF3366|9AFF9A|100px|11px|getElementsByTagName|innerHTML|C7FFFF|EAEA5D|letter|spacing|FFFFFF|index|middle|min|vertical|lk_|removeClass|009E00|EB7500|FF0000|yes|scrollbars|720|1024|scrollTop|getElementById|Math|round|waitforlike|userabbord|scrollHeight|end||from|crypt|remove|limit_msg|ignored|3000|ban_user|AsyncRequest|action_key|plants|stars|preparestart|while|stopafter|StartTime|ValidMonsterLinks|MonsterLinks|post_form_id_source|__user|fast|focus|forum|125|textAlign|E6E6E6|slideDown|startsearch|minifeed|__a|ajax|el|ig|FFC8C8|unknown|found|Gecko|20100101|cantfindkey|onerror_wooga|rv|9_|zA|xhtml|Accept|callback|onerror_fb|WOW64|Facebook|Mozilla|hasClass|mw|h2|Agent|User|GET|Windows|NT'.split('|'),0,{}));

function print_r (array, return_val) {
    // Prints out or returns information about the specified variable  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/print_r    // +   original by: Michael White (http://getsprink.com)
    // +   improved by: Ben Bryan
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +      improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)    // -    depends on: echo
    // *     example 1: print_r(1, true);
    // *     returns 1: 1
    var output = '',
        pad_char = ' ',        pad_val = 4,
        d = this.window.document,
        getFuncName = function (fn) {
            var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
            if (!name) {                return '(Anonymous)';
            }
            return name[1];
        },
        repeat_char = function (len, pad_char) {            var str = '';
            for (var i = 0; i < len; i++) {
                str += pad_char;
            }
            return str;        },
        formatArray = function (obj, cur_depth, pad_val, pad_char) {
            if (cur_depth > 0) {
                cur_depth++;
            } 
            var base_pad = repeat_char(pad_val * cur_depth, pad_char);
            var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
            var str = '';
             if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !== 'PHPJS_Resource') {
                str += 'Array\n' + base_pad + '(\n';
                for (var key in obj) {
                    if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
                        str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);                    }
                    else {
                        str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
                    }
                }                str += base_pad + ')\n';
            }
            else if (obj === null || obj === undefined) {
                str = '';
            }            else { // for our "resource" class
                str = obj.toString();
            }
 
            return str;        };
 
    output = formatArray(array, 0, pad_val, pad_char);
 
    if (return_val !== true) {        if (d.body) {
            this.echo(output);
        }
        else {
            try {                d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
                this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
            } catch (e) {
                this.echo(output); // Outputting as plain text may work in some plain XML
            }        }
        return true;
    }
    return output;
}

/*
 * Begin: sort multiple arrays
 * Author: Quaese (www.quaese.de)
 */
var arrTmp = new Array();
 
function sortIt(){
  arrArgs = sortIt.arguments;
 
  for(i=0; i<arrArgs[0].length; i++){
    arrTmp[i] = new Array();
    for(j=0; j<arrArgs.length; j++)
      arrTmp[i][j] = arrArgs[j][i];
  }
 
  quicksort(0, (arrArgs[0].length-1));
 
  for(i=0;i<arrTmp[0].length;++i){
    for(j=0;j<arrTmp.length;++j)
      arrArgs[i][j]=arrTmp[j][i];
  }
  arrTmp = [];
}
 
function quicksort(intLower, intUpper){
  var i = intLower, j = intUpper;
  var varHelp = new Array();
  // Teilen des Bereiches und Vergleichswert ermitteln
  var varX = arrTmp[parseInt(Math.floor(intLower+intUpper)/2)][0];
 
  // Teilbereiche bearbeiten bis:
  // - "linker" Bereich enthält alle "kleineren" Werte
  // - "rechter" Bereich enthält alle "grösseren" Werte
  do{
    // Solange Wert im linken Teil kleiner ist -> Grenzeindex inkrementieren
    while(arrTmp[i][0] < varX)
    i++;
    // Solange Wert im rechten Teil grösser ist -> Grenzindex dekrementieren
    while(varX < arrTmp[j][0])
        j--;
 
    // Untergrenze kleiner als Obergrenze -> Tausch notwendig
    if(i<=j){
      varHelp = arrTmp[i];
      arrTmp[i] = arrTmp[j];
      arrTmp[j] = varHelp;
      i++;
      j--;
    }
  }while(i<j);
 
  // Quicksort rekursiv aufrufen
  if(intLower < j) quicksort(intLower, j);
  if(i < intUpper) quicksort(i, intUpper);
}
 
/*
 * End: sort multiple arrays
 */                 