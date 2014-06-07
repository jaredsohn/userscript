// ==UserScript==
// @name           MonsterWorld Link klicker
// @namespace      MonsterWorld Link klicker
// @description    Öffnet automatisch MonsterWorld Links aus Facebook-Gruppen
// @include        http*://www.facebook.com/groups/*
// @include        http*://www.facebook.com/*
// @include        http://handysurfer.blogspot.com/*
// @exclude        http*://www.facebook.com/plugins/*
// @exclude        http*://www.facebook.com/dialog/*
// @require        http://sizzlemctwizzle.com/updater.php?id=113866&days=1
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @noframes          
// @author         Anaximelis
// @version        0.8.21
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/deed.de
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

var txt = {
        de: {
		      buttons: {
            addlinks:'Links hinzuf.',
            bstart:'Start',
            pause:'Pause',
            continue:'Weiter',
            reset:'Zurücksetzen',
            options:'Optionen',
            save:'Speichern',
            abbort:'Abbrechen',
          },
          options: {
            options:'Optionen',
            window:'Fenster',
            windowpos:'Fensterposition',
            usewindows:'Gleichzeitige Anfragen',
            delay:'Nachhaltezeit',
            delayLike: 'Wartezeit - Like',
            writeemail:'email schreiben',
            lkuserscripts:'Link Klicker auf userscripts.org',
            language:'Sprache',
            loglvl: 'Log level',
          },
          error: {
            valueoutofrange:'Wert außerhalb des Zulässigen Bereiches',
            error:'Fehleingabe',
            cantreadcontent: ' kann nicht ausgelesen werden. Geht möglicherweise ins Spiel.',
            expired: ' --- Abgelaufen ---',
            cantfindkey: 'signed_request-Key konnte nicht gefunden werden. Bei Facebook eingelogt?',
          },
          message: {
            message102: 'Daten vom Server empfangen. Starte Vorgang.',
            searchforfb: 'Suche nach Facebook-Login ...',
            cantfindfb: 'Facebook-ID konnte nicht ermittelt werden',
            foundfb: 'Facebook-ID gefunden',
            requested: 'Anfrage an Server gestellt...',
            nonewlinks: 'Keine neuen Links vorhanden',
            from: 'von:',
            klicklike: 'Klicke "Gefällt mir"',
            linkscalled: 'Links aufgerufen',
            ok: 'ok',
            expired: 'Abgelaufen',
            unknown: 'Unbekannt'            
          },
          prompt: {
            loadready:'Neue Seite von Facebook wird angefordert',
            lastrun:'Zeit der letzten Anforderung',
            linkstoopen:'Monster-World links vorgemerkt. Wieviele öffnen?',
            imonfb:'Du startest den Klicker außerhalb von Facebook. Stell sicher, dass du bei FB eingelogt bis.\nWeiter machen?',
            linksinqueue: 'x "Gefällt mir" in der Warteschlange',
            dontclose: 'Webseite nicht wechseln / schließen / nachladen bis dieses Fenster verschwindet.',          
          },
          string: {
            like: 'Gefällt mir',
            starsdbbonus: 'Geschlossene Gruppe. Nur für Betatester.',
            starsdbwoogo: 'WoGartenCenter ist ein Datenbank für Woogoo- und Pflanzenlinks.\nStell deine Links ein und klick die der Anderen.\nJeder Monster World Spieler ist willkommen.\n(Anmeldung erforderlich)\n\nhttps://wogartencenter.de',
            insertlinks: 'Kopiere deine Links in dieses Feld, dann drücke START\n\nTip:\nDu kannst auch unsinnigen Text mit in dieses Fenster einfügen.\nDie Links werden herausgefiltert.',
            lrready: 'Monster World Link Klicker ist gestartet',
            running: 'läuft',
            end: 'beendet',
          },
          tag: {
            windowpos: '"Position des Menus auf dem Bildschirm"',
            usewindows: '"Anzahl der Fenster, welche genutzt werden, um Links zu öffnen"',
            delay: '"Wartezeit nach dem Fertigladen eines Fensters - Empfehlung ist: 0"',
            delaylike: '"Mindestabstand zwischen -Gefällt mir- Klicks"',
            mode1: '"Öffnet Links aus Beiträgen die noch kein -Gefällt mir- von dir haben. Setzt unter jeden fertigen Beitrag ein -Gefällt mir-"',
            mode2: '"Öffnet Links aus Beiträgen die noch kein -Gefällt mir- von dir haben."',
            mode3: '"Holt Woogoo und Pflanzenlinks aus der WoGartenCenter-Datenbank"',
            mode4: '"Öffnet alle HTML Links auf der Seite"',
            mode5: '"Öffnet alle Links die du in das Fenster kopierst"',
            mode6: '"Holt Links aus der geschlossenen Gruppe"',
          },
          mode: {
            mode1: 'Facebook (mit like)',
            mode2: 'Facebook (ohne like)',
            mode3: 'WoGartenCenter - DB',
            mode4: 'Alle Links dieser Seite',
            mode5: 'Links von Hand einfügen',
            mode6: 'WGC - Testarea',
          },
       },
        en: {
		      buttons: {
            addlinks:'Add link',
            bstart:'Start',
            pause:'Pause',
            continue:'Resume',
            reset:'Reset',
            options:'Options',
            save:'Save',
            abbort:'Abbort',
          },
          options: {
            options:'Options',
            window:'Window',
            windowpos:'Windowposition',
            usewindows:'simultan requests',
            delay:'Delay',
            delayLike: 'Delay - Like',
            writeemail:'write email',
            lkuserscripts:'Link Klicker on userscripts.org',
            language:'Language',
            loglvl: 'Log level',
          },
          error: {
            valueoutofrange:'Value out of Range',
            error:'Error',
            cantreadcontent: ' cant read content. possibly redirekt into the game.',
            expired: ' --- expired ---',
            cantfindkey: 'cant find signed_request-Key. A you logged in??',
          },
          message: {
            message102: 'Received links from Server. Start process.',
            searchforfb: 'Search for facebook-login ...',
            cantfindfb: 'Could not find Facebook-ID',
            foundfb: 'Facebook-ID found',
            requested: 'Request send to server...',
            nonewlinks: 'No new links',
            from: 'from:',
            klicklike: 'Klicke "Gefällt mir"',
            linkscalled: 'Links aufgerufen',
            ok: 'ok',
            expired: 'Abgelaufen',
            unknown: 'Unbekannt'
          },
          prompt: {
            loadready:'Request new Site from Facebook',
            lastrun:'Time since last request',
            linkstoopen:'Monster-World links marked. How many open?',
            imonfb:'You starts Link klicker outside Facebook. Beware you logged in on FB\nContinue?',
            linksinqueue: 'x "like" in Queue',
            dontclose: 'Dont change / close / reload page until this windows disappears.',            
          },
          string: {
            like: 'like',
            starsdbwoogo: 'WoGartenCenter ist ein Datenbank für Woogoo- und Pflanzenlinks.\nStell deine Links ein und klick die der Anderen.\nJeder Monster World Spieler ist willkommen.\n(Anmeldung erforderlich)\n\nhttps://wogartencenter.de',
            starsdbbonus: 'Closed Gruppe. For Betatester only.',
            insertlinks: 'Insert your links here, then klick START',
            lrready: 'Monster World Link Klicker started',
            running: 'running',
            end: 'end'
          },
          tag: {
            windowpos: '"Position des Menus auf dem Bildschirm"',
            usewindows: '"Anzahl der Fenster, welche genutzt werden, um Links zu öffnen"',
            delay: '"Wartezeit nach dem Fertigladen eines Fensters - Empfehlung ist: 0"',
            delaylike: '"Mindestabstand zwischen -Gefällt mir- Klicks"',
            mode1: '"Öffnet Links aus Beiträgen die noch kein -Gefällt mir- von dir haben. Setzt unter jeden fertigen Beitrag ein -Gefällt mir-"',
            mode2: '"Öffnet Links aus Beiträgen die noch kein -Gefällt mir- von dir haben."',
            mode3: '"Holt Woogoo und Pflanzenlinks aus der WoGartenCenter-Datenbank"',
            mode4: '"Öffnet alle HTML Links auf der Seite"',
            mode5: '"Öffnet alle Links die du in das Fenster kopierst"',
            mode6: '"WGC - Testarea"',
          },
          mode: {
            mode1: 'Facebook (with like)',
            mode2: 'Facebook (without like)',
            mode3: 'WoGartenCenter - DB',
            mode4: 'All links on this site',
            mode5: 'Insert by hand',
            mode6: 'WGC - Testarea',
          },
       },
        nl: {
            buttons: {
              addlinks:'Links toevoegen',
              bstart:'Start',
              pause:'Pauze',
              continue:'verder',
              reset:'reset',
              options:'Opties',
              save:'Opslaan',
              abbort:'Annuleren',
            },
            options: {
              options:'Opties',
              window:'Venster',
              windowpos:'Vensterpositie',
              usewindows:'Gelijktijdige aanvragen',
              delay:'Vertraging',
              delayLike: 'Wachttijd - Vind ik leuk',
              writeemail:'email sturen',
              lkuserscripts:'Link Klicker op userscripts.org',
              language:'Taal',
              loglvl: 'Log level',
            },
            error: {
              valueoutofrange:'waarde buiten bereik',
              error:'error',
              cantreadcontent: ' kan niet uitgelezen worden. Gaat wellicht naar het spel',
              expired: ' --- Afgelopen ---',
              cantfindkey: 'signed_request-Key kan niet gevonden worden. Ben je ingelogt?',
            },
            message: {
              message102: 'Data van Server ontvangen. Starten.',
              searchforfb: 'Zoekt naar Facebook-Login ...',
              cantfindfb: 'Facebook-ID kan niet gevonden worden',
              foundfb: 'Facebook-ID gevonden',
              requested: 'Aangevraagd bij server...',
              nonewlinks: 'Geen nieuwe links gevonden',
              from: 'van:',
              klicklike: 'Klicke "Gefällt mir"',
              linkscalled: 'Links aufgerufen',
              ok: 'ok',
              expired: 'Abgelaufen',
              unknown: 'Unbekannt'
            },
            prompt: {
              loadready:'Nieuwe pagina van Facebook is opgevraagd',
              lastrun:'Laatste akties ondernomen',
              linkstoopen:'Monster-World links gevonden. Hoeveel openen?',
              imonfb:'Je start de Klicker buiten Facebook. Controleer of je bij FB ingelogt bent.\nverder gaan?',
              linksinqueue: 'x "Vind ik leuk" in de wachtrij',
              dontclose: 'Site niet wisselen / sluiten / herladen tot dit venster verdwijnt.',
            },
            string: {
              like: 'Vind ik leuk',
              starsdbbonus: 'Gesloten groep. Aleen voor Betatesters.',
              starsdbwoogo: 'https://WoGartenCenter.de/',
              insertlinks: 'Plak hier je links, en druk op Start\n\nTip:\nEr mag ook onzin bijstaan.\nDe links worden eruitgefiltert.',
              lrready: 'Monster World Link Klicker is klaar voor gebruik',
              running: 'running',
              end: 'end',
            },
            tag: {
              windowpos: '"Positie van het menu op het beeldscherm"',
              usewindows: '"Aantal vensters welke gebruikt worden om links te openen"',
              delay: '"Wachttijd na het laden van een venster - Aanbevolen wordt: 0"',
              delaylike: '"Tijd tussen -Vind ik leuk- aanklikken"',
              mode1: '"Opent links uit bijdragen die nog geen -Vind ik leuk- van jou hebben. Plaatst onder elke afgewerkte post een -Vind ik leuk-"',
              mode2: '"Opent links uit bijdragen die nog geen -Vind ik leuk- van jou hebben."',
              mode3: '"Opent Woogo links uit de databank"',
              mode4: '"Opent alle HTML links op de pagina"',
              mode5: '"Opent alle links die je in het venster plakt"',
              mode6: '"WGC - Testarea"',
            },
            mode: {
              mode1: 'Facebook (met vind ik leuk)',
              mode2: 'Facebook (zonder vind ik leuk)',
              mode3: 'WoGartenCenter - DB',
              mode4: 'Alle links van deze pagina',
              mode5: 'Links zelf invoeren',
              mode6: 'WGC - Testarea',
            },
        },
        fr: { 
             buttons: { 
             addlinks:'Ajouter des liens', 
             bstart:'Démarrer', 
             pause:'Pause', 
             continue:'Continuer', 
             reset:'Réinitialiser', 
             options:'Options', 
             save:'Enregistrer', 
             abbort:'Annuler', 
           }, 
           options: { 
             options:'Options', 
             window:'Fenêtre', 
             windowpos:'Position du cliqueur', 
             usewindows:'Demandes simultanées', 
             delay:'Délai', 
             delayLike: 'Délai des J aime', 
             writeemail:'Ecrire email', 
             lkuserscripts:'Link Klicker sur userscripts.org ', 
             language:'Langue', 
             loglvl: 'Log level', 
           }, 
           error: { 
             valueoutofrange:'Valeur hors limites', 
             error:'Erreur', 
             cantreadcontent: 'Contenu illisible. Probablement dirigé vers le jeu.', 
             expired: ' --- expiré ---', 
             cantfindkey: 'Mot de passe introuvable. Etes-vous connecté ?', 
           }, 
           message: { 
             message102: 'Liens recus du Serveur. Processus démarré.', 
             searchforfb: 'Recherche identifiant Facebook...', 
             cantfindfb: 'Identifiant Facebook introuvable', 
             foundfb: 'Identifiant Facebook trouvé', 
             requested: 'Demande envoyee au serveur...', 
             nonewlinks: 'Aucun nouveau lien', 
             from: 'de la part de :',
             klicklike: 'Klicke "Gefällt mir"',
             linkscalled: 'Links aufgerufen',
             ok: 'ok',
             expired: 'Abgelaufen',
             unknown: 'Unbekannt' 
           }, 
           prompt: { 
             loadready:'Demande de nouvelle page Facebook', 
             lastrun:'Temps depuis dernière demande', 
             linkstoopen:'liens MonsterWorld trouvés. En ouvrir combien ?', 
             imonfb:'Vous lancez Link klicker hors de Facebook. Connectez-vous sur FB avant\nContinuer ?', 
             linksinqueue: 'x "J aime" en attente', 
             dontclose: 'Ne changer/fermer/recharger pas la page avant la disparition de cette fenêtre',             
           }, 
           string: { 
             like: 'J aime', 
             starsdbwoogo: 'WoGartenCenter est une base de liens de Woogoo et de plantes.\nMettez-y vos liens et cliquez ceux des autres.\nTout joueur de MonsterWorld est bienvenu.\n(Inscription obligatoire)\n\nhttps:// wogartencenter.de ', 
             starsdbbonus: 'Groupe restreint. Pour les Betatesteurs seulement', 
             insertlinks: 'Insérez vos liens ici, puis cliquez DEMARRER', 
             lrready: 'Monster World Link Klicker démarré', 
             running: 'en cours', 
             end: 'fin' 
           }, 
           tag: { 
             windowpos: '"Position du cliqueur sur la page"', 
             usewindows: '"Nombre de liens ouverts simultanément"', 
             delay: '"Délai de pause entre les ouvertures de liens - Recommandation : 0"', 
             delaylike: '"Attente minimale entre les clics sur -J aime-"', 
             mode1: '"Ouvre tous les liens des posts sans -J aime- déjà cliqué. Puis clique sur -J aime-"', 
             mode2: '"Ouvre tous les liens des posts sans -J aime- déjà cliqué."', 
             mode3: '"Obtient des liens de Woogoo et Plantes depuis le WoGartenCenter"', 
             mode4: '"Ouvre tous les liens dans la page"', 
             mode5: '"Ouvre tous les liens collés dans la fenêtre"', 
             mode6: '"WGC - Zone de test"', 
           }, 
           mode: { 
             mode1: 'Facebook (avec J aime)', 
             mode2: 'Facebook (sans J aime)', 
             mode3: 'WoGartenCenter - DB', 
             mode4: 'Tous les liens de cette page', 
             mode5: 'Insertion manuelle', 
             mode6: 'WGC - Zone de test', 
           }, 
        },
      };
      
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('A 1H;A 7={G:{2m:\'7S\',73:\'1L://7T.7U.7V.7R.26/7Q?\',6N:\'2C://5U.3a.26/5V-68/\',1q:D,4w:D,1V:D,1W:0,7M:0,5e:1,5b:2,},3b:{5C:"1L://"+1Q.4S.6v,6r:7N.7O.7P("7W")>-1?S:R,5c:R,},8:{2a:D,24:D,3o:R,o:D,27:S,3o:R,z:{P:D,42:D,7X:D,Z:D,84:D,O:D,},},};A j={2g:0,1y:0,1e:0,2h:0,47:0,47:0,23:0,B:0,1D:0,48:0,78:D,4a:0,3O:0,41:0,3L:0,};A 1l={2f:R,4j:0,O:0,2v:R,5d:D,};A k={B:17 1m(),12:17 1m(R,R),1z:17 1m(),};A 3n=17 1m(10,11,13,14);A 4n=(2);A 2S=H.2S;A 2T=D;t 5i(){1j=H.1G("1B");1j.p.2k="4i";1j.85="86";1j.p.2w=7.8.24+\'1d\';1j.p.1N=7.8.2a+\'1d\';1j.p.15="87";1j.p.1g="+83";1j.p.4v="3v";2S.1I(1j);2B(\'1B#1j{ 1u-1t:1h; 1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I; }\')}t 5k(){x=3C.6F-54;y=3C.6k-6h;P=H.1G("1B");A 1g=82;A 15=5D;P.E="P";P.p.2k="4i";P.p.7Y="50%";P.p.1N="50%";P.p.15=15+\'1d\';P.p.1g=1g+\'1d\';P.p.65=-(1g/2)+\'1d\';P.p.69=-(15/2)+\'1d\';P.p.W="3U 1U #7Z";P.p.2R="1h";P.p.3D="4B";P.p.4v="3v";2S.1I(P);P.1a=\'<b>\'+\'<4g><3t>\'+q[7.8.o].1F.1F+\'</3t></4g>\'+\'<2Y/>\'+\'<5B 39="80" 15="81%" 7L="2" 7K="0" W="0">\'+\'<1r>\'+\'<Q p="15:7u" 1S=\'+q[7.8.o].1J.5g+\'>\'+q[7.8.o].1F.5g+\' :</Q>\'+\'<Q>X: </Q><Q><1X E="2a" w=\'+7.8.2a+\' 1t="3" 1i="1v"> (2 - \'+x+\')</Q>\'+\'</1r><1r>\'+\'<Q></Q><Q>Y: </Q><Q 7v="30%"><1X E="24" w=\'+7.8.24+\' 1t="3" 1i="1v"> (25 - \'+y+\')</Q>\'+\'</1r><1r>\'+\'<Q 3w="3"><2Y/><Q>\'+\'</1r><1r>\'+\'<Q 3w="2" p="15:4V" 1S=\'+q[7.8.o].1J.5m+\'>\'+q[7.8.o].1F.5m+\' :</Q><Q><1X E="1V" w=\'+7.G.1V+\' 1t="3" "1i="1v"> (7w 5)</Q>\'+\'</1r><1r>\'+\'<Q 3w="3"><2Y/><Q>\'+\'</1r><1r>\'+\'<Q 3w="2" p="15:4V" 1S=\'+q[7.8.o].1J.4D+\'>\'+q[7.8.o].1F.7x+\' :</Q><Q><1X E="4D" w=\'+7.G.3F+\' 1t="3" "1i="1v"> 5o</1r>\'+\'<Q 3w="2" p="15:4V" 1S=\'+q[7.8.o].1J.1q+\'>\'+q[7.8.o].1F.1q+\' :</Q><Q><1X E="1q" w=\'+7.G.1q+\' 1t="3" "1i="1v"> 5o</1r>\'+\'</Q>\'+\'</5B><2Y/><br>\'+q[7.8.o].1F.o+\': <2J E="o">\'+\'<19 w="2P">7t</19>\'+\'<19 w="7s">7o</19>\'+\'<19 w="7n">7p</19>\'+\'<19 w="7q">7r</19>\'+\'</2J><br>\'+\'<br><br>\'+\'<3t><a 34=7y:7z@7G.2P>\'+q[7.8.o].1F.7H+\'</a> | <a 34="1L://7I.4G/7J/7F/7E">55 7A 7B 7C.4G</a><br><br>\'+\'<4P 7D="2C://2p.88.26/89-8F/8G" 3A="8H"><1X 1i="U" 3V="21" w="8I-8E"><1X 1i="U" 3V="8D" w="8z"><1X 1i="8A" 6u="2C://2p.6t.26/6j/8B/i/8C/8J.6i" W="0" 3V="8K" 6E="8R 8S, 8T 5S 8U 8Q 8P â�� 7b 8L."><8M 6E="" W="0" 6u="2C://2p.6t.26/6j/i/8N/8O.6i" 15="1" 1g="1"></4P>\'+\'</b><br>\'+\'<40>v \'+7.G.2m+\'<br>\'+7.G.1W+\'</40></3t>\';71=2A("8y","8x",P,q[7.8.o].1c.8h,"3Y","1h","2b");72=2A("8i","8j",P,q[7.8.o].1c.8k,"3Y","8g","2b");72.1K(\'1Y\',t(){45()});71.1K(\'1Y\',t(){6y()});x=H.18(\'2a\');y=H.18(\'24\');x.1K(\'4d\',t(){1j.p.1N=x.w+\'1d\'});y.1K(\'4d\',t(){1j.p.2w=y.w+\'1d\'});P.U="U";7.8.z.P=P;2B(\'1B#P{1u-1t:1h;6W-3N:#6V;-2X-W-1O: 16 16 16 16;-2W-W-1O: 16;3f:2b 1P 1h 1P;2R:1h;W:#3j 1A 1U;1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I;}#1k{-2W-W-1O: 3d 1A 1A 3d;-2X-W-1O: 3d 1A 1A 3d;}\')}t 5n(){1k=H.1G("1B");1k.E="1k";1k.p.2k="3s";1k.p.1N="+3U";1k.p.3D="#7m";1k.p.2R="1A";1k.p.1g="+6Y";1k.p.15="+3d";1k.p.2w="8b";1k.p.4v="3v";1j.1I(1k);1k.1K(\'1Y\',66)};t 5w(){L=H.1G("1B");L.E="L";L.p.2k="3s";L.p.1N="+16";L.p.3D="4B";L.p.5J="1N";L.p.15="6Y";L.p.1g="+6D";6L="8a 8c | 8d 8e<br>> ";L.1a=6L;1j.1I(L);2B(\'1B#L{1u-1t:1h;6W-3N:#6V;-2X-W-1O: 16 16 16 16;-2W-W-1O: 16;3f:2b 1P 1h 1P;2R:1h;W:#3j 1A 1U;1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I;}\');7.8.z.42=H.1G("h");L.1I(7.8.z.42);22=H.1G("1B");22.E="22";22.p.2k="3s";22.p.1N="2b";22.p.2w="8l";22.6T="6T";22.1a=\'\'+\'<2J E="O" 1t=6 p="15:8m">\'+\'<19 E="8t" w="1" 1S=\'+q[7.8.o].1J.5s+\' 5u="5u" >\'+q[7.8.o].2G.5s+\'</19>\'+\'<19 E="8u" w="2" 1S=\'+q[7.8.o].1J.5q+\'>\'+q[7.8.o].2G.5q+\'</19>\'+\'<19 E="5Y" w="3" I="I" 1S=\'+q[7.8.o].1J.5v+\'>\'+q[7.8.o].2G.5v+\'</19>\'+\'<19 E="8v" w="4" 1S=\'+q[7.8.o].1J.5A+\'>\'+q[7.8.o].2G.5A+\'</19>\'+\'<19 E="8w" w="5" 1S=\'+q[7.8.o].1J.5y+\'>\'+q[7.8.o].2G.5y+\'</19>\'+\'<19 E="5H" w="6" I="I" 1S=\'+q[7.8.o].1J.63+\'>\'+q[7.8.o].2G.63+\'</19>\'+\'</2J>\';L.1I(22);2B(\'2J#O{1u-1t:1h;3f:2b 1P 1h 1P;1g:8s;W:#3j 1A 1U;1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I;5R:5N;}\');7.8.z.L=L;7.8.z.O=H.18(\'O\');7.8.z.O.1K(\'4d\',t(){6b()})};t 5a(1v,4H){9("/* T: ",2);T=7.8.z.T;e(2S!=D){e(H.18(\'3r\')==D){T=H.1G("1B");A 15=5D;A 1g=60;T.E="3r";T.p.2k="4i";T.p.15=15+\'1d\';T.p.1g=1g+\'1d\';T.p.65=-(1g/2)+\'1d\';T.p.69=-(15/2)+\'1d\';T.p.2w="50%";T.p.1N="50%";T.p.3D="4B";T.p.W="4b 1U "+4H;T.p.2R="8r";T.p.5J="3t";T.1a=1v;2S.1I(T);2B(\'1B#3r{1u-1t:8n;-2X-W-1O: 16 16 16 16;-2W-W-1O: 16;3f:2b 1P 1h 1P;1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I;}\')}2r{T=H.18(\'3r\');T.1a=1v;T.p.W="4b 1U "+4H}e(1v=="6P"){T.1a="";T.U="U"}}};t 6q(){8o=H.18(\'1k\');1H=H.1G("32");1H.E="32";1H.p.2k="3s";1H.p.1N="+8p";1H.p.2w="-8q";1H.1a=q[7.8.o].2o.4U;1H.p.5R="5N";1H.8V="7c";1H.3u=S;1j.1I(1H);7.8.z.Z=H.18(\'32\');2B(\'32#32{1u-1t:1h;-2X-W-1O: 16 16 16 16;-2W-W-1O: 16;3f:2b 1P 1h 1P;2R:1h;1g:6D;15:7d;W:#3j 1A 1U;1u-2O:"1w 2Q 2L", "1w 2M", 2E-2I;7k:7i;}\')}t 5W(){2l=2A("7h","b1",L,q[7.8.o].1c.7f,"3Y","4b","62");1M=2A("7g","b2",L,q[7.8.o].1c.4X,"64","5T","62");3e=2A("7j","b3",L,q[7.8.o].1c.7e,"3Y","4b","3U");2D=2A("7l","b4",L,q[7.8.o].1c.1F,"64","5T","3U");2l.1K(\'1Y\',t(){3m()});1M.1K(\'1Y\',t(){3S()});3e.1K(\'1Y\',t(){1f(0)});2D.1K(\'1Y\',t(){45()});2l.U="U"};t 2A(1C,5G,67,5E,5F,x,y){1C=H.1G("1X");1C.p.2k="3s";1C.p.2w=y;1C.p.1N=x;1C.1i="2u";1C.E=5G;1C.p.15=5F;1C.w=5E;67.1I(1C);V 1C};t 66(){2j(7.8.27){N 0:2K(1);7.8.27=1;J;N 1:2K(2);7.8.27=2;J;N 2:2K(0);7.8.27=0;J;3x:2K(0);7.8.27=0;J}1s("L",7.8.27)}t 2K(s){e(s==0)7.8.z.L.U="",7.8.z.Z.U="";e(s==2)7.8.z.L.U="",7.8.z.Z.U="U";e(s==1)7.8.z.L.U="U",7.8.z.Z.U="U"}t 45(){2j(7.8.3o){N S:7.8.z.P.U="U";7.8.3o=R;J;N R:7.8.z.P.U="";7.8.3o=S;J}}t 6b(){9(7.8.z.O.w,1);2j(7.8.z.O.w){N"5":7.8.z.Z.2J();7.8.z.Z.b6();7.8.z.Z.w=q[7.8.o].2o.bt;7.8.z.Z.3u=R;J;N"3":7.8.z.Z.w=q[7.8.o].2o.bk;7.8.z.Z.3u=S;J;N"6":7.8.z.Z.w=q[7.8.o].2o.aW;7.8.z.Z.3u=S;J;3x:7.8.z.Z.w=q[7.8.o].2o.4U;7.8.z.Z.3u=S;J}}t ay(){6m();e(7.3b.5c==1)V;1Q.3y(t(){6e()},ax);6d();2K(7.8.27);9(q[7.8.o].1x.aq,1,S);6B()};t 6d(){5i();5n();5k();5w();5W();6q()};t 2z(x,r,g,b){L.p.aV="0 0 "+x+"1d aP("+r+","+g+","+b+", 1)"}t 1f(4T){1l.4j=4T;2j(4T){N 0:2l.I="";1M.I="";3e.I="";2D.I="";1M.w=q[7.8.o].1c.4X;7.8.z.O.I="";2z(0,0,0,0);1Z("");4c();1l.2f=R;7.8.z.Z.w=q[7.8.o].2o.4U;aO(5d);5a("6P");N 1:2l.I="";1M.I="";3e.I="";2D.I="";1M.w=q[7.8.o].1c.4X;7.8.z.O.I="";2z(0,0,0,0);1Z("");4c();1l.2f=R;J;N 2:9("1f 77: 5j",2);2l.I="I";2D.I="I";1l.2f=S;1M.w=q[7.8.o].1c.aJ;7.8.z.O.I="I";2z(5,0,35,0);j.78=17 2s();5h();J;N 3:9("1f 77: 4t",1);2l.I="";1M.I="";3e.I="";2D.I="";1l.2f=R;1M.w=q[7.8.o].1c.61;7.8.z.O.I="I";2z(5,0,0,35);1Z(1D+" / "+j.1e+"  ( 4t )");J;N 4:2l.I="I";1M.I="I";7.8.z.O.I="I";2z(5,35,0,0);J;N 5:1Z("44 6Z 74");9("44 6Z 74 3z");2z(20,35,35,0,1);1Q.3y(t(){1f(0)},aH)}};t 6m(){9("aK aC aM aN",2);7.8.27=1n("L",S);7.G.1V=1n("1V",5);7.8.2a=1n("2a","2");7.8.24=1n("24","25");7.8.o=1n("o","2P");7.3b.5c=1n("aL",R);7.G.3F=1n("4w",10);7.G.1q=1n("1q",0);7.G.1W=1n("1W",0);7.G.2t=1n("2t",\'1L://56.2P\');6z=1n("2m",0);e(6z!=7.G.2m)7.G.2t="1L://56.2P";7.G.2t="1L://56.2P";3n=1n("3n",\'\').2c(",");4n=1n("4n",\'\').2c(",")};t 6y(){x=H.18(\'2a\').w;y=H.18(\'24\').w;f=H.18(\'1V\').w;l=H.18(\'o\').w;x.49(/1d/i,"");y.49(/1d/i,"");2V=H.18(\'4D\').w;7.G.1q=H.18(\'1q\').w;e(x<2||x>3C.6F-54||3l(3k(x))){2n("X "+q[7.8.o].28.6g);x=2;V}e(y<25||y>3C.6k-6h||3l(3k(y))){2n("Y "+q[7.8.o].28.6g);y=25;V}e(f>5||(f=="")||(3l(3k(f)))){2n(q[7.8.o].28.28+" "+q[7.8.o].1F.1Q);f=1;V}e((3l(3k(2V)))){2n(q[7.8.o].28.28+" "+q[7.8.o].1F.1q);2V=10;V}3p(k.1z);4A(f);1s("2a",x);1s("24",y);1s("1V",f);1s("2m",7.G.2m);1s("2t",7.G.2t);1s("4w",2V);1s("1q",7.G.1q);e(l!=7.8.o)1s("o",l);7.G.1V=f;7.G.3F=2V;45()}t 3m(aT){9("/* 3m()",2);9("O: "+7.8.z.O.w,2);3p(k.B);k.12;j.B=0;j.2h=0;A 2e;A 2d=0;e(7.8.z.O.w<3){A 3E=H.18(\'aS\');A 3G=H.18(\'aQ\');A 3H=H.18(\'aR\');e(3E!=D)A 3J=3E;e(3G!=D)A 3J=3G;e(3H!=D)A 3J=3H;e(3E==D&&3G==D&&3H==D){2n("44 5Z 3z");1f(4);V}9("5Z 3z",3);A 1T=3J.1E(\'C\');9("1T.F=="+1T.F,3);1o(l=0;l<1T.F;l++){9("5L 1T: "+l+"/"+1T.F,3);A 3T=1T[l].1E(\'1B\');1o(d=0;d<3T.F;d++){A 4q=3T[d].36("39");e(4q!=D&&4q.3R("aG")>=0){A 5P=3T[d].1E(\'a\');2e=5P[0].1a}}A 4l=1T[l].36("39");e(4l!=D&&4l.3R("aF")>=0){1c=1T[l].1E("2u");1o(b=0;b<1c.F;b++){4p=1c[b].36("39");e(4p!=D&&4p.3R("aw")>=0&&1c[b].36("3V")=="au"){9("8W at a ar",3);A 3B=1T[l].1E(\'a\');2U(3B,2d,1c[b],2e);e(k.B[2d][1][0]!=D)2d++}}}}}9("2d: "+2d,3);e(7.8.z.O.w==4){9("4m: 5L aD aE",3);A 3B=H.1E(\'a\');2U(3B,2d)}e(7.8.z.O.w==5){a=7.8.z.Z.w.2c(/\\n/43);2U(a,2d);7.8.z.Z.w=""}j.23=j.B-j.2h;1Z(j.2h+" 5I 5K");9(j.2h+" 5I 5K",3);9("*/ 3m()",2)};t 2U(K,C,2u,2e){A M=0;e(K[0]=="aX"){6U(K[1]);V};k.B[C]=17 1m();k.B[C][0]=17 1m();k.B[C][1]=17 1m();k.B[C][2]=17 1m();e(2u!=D)k.B[C]["2u"]=2u;1o(a=0;a<K.F;a++){c=K[a].34;e(K[a].34==D)c=K[a];e(c.46(/2C:\\/\\/5U.3a.26\\/5V-68\\/\\?(aB|4M=az)[\\/?a-4r-aA-4K=&-;]*/)){k.B[C][1][k.B[C][1].F]=17 1m();k.B[C][2][k.B[C][2].F]=17 1m();A 6a=17 aY("\\\\?([^\\\\?]*)(?:\\\\?(.*))?","43");A 3X=c.46(6a);3X=3X.4C().49("?","");4x=3X.4C().2c(\'&\');1o(i=0;i<4x.F;i++){1R=4x[i].2c(\'=\');e(1R[0]=="76"&&1R[1]==2)9("bu: "+1R[0]+"="+1R[1],1);e(1R[0]=="4E"){9("4E="+1R[0],3);1o(x=0;x<3n.F;x++){e(3n[x]==1R[1]){k.B[C][1][M].6X=S}}}k.B[C][2][M][1R[0]]=1R[1]}c=c.49(/2C/bm,"1L");9("bl 6A 1m: k.B["+C+"][1]["+M+"].1p: "+c,3);k.B[C][1][M].1p=c;k.B[C][0]["2e"]=2e;e(2T!=D)e(k.B[C][2][M][\'s\']==2T){k.B[C][1].2q(M,1);k.B[C][2].2q(M,1);9("bi bo. 5QÃ¶5O",3);61}M++;j.B++}}3M(k.B,C)}t 3S(){9("/* 3S()",2);9("1l.bp="+1l.2f+" 2v="+1l.2v,3);2j(1l.4j){N 0:e(7.8.z.O.w==3){9("4m: 5z 4O",3);9(q[7.8.o].1x.5f,1);2H("51");J}e(7.8.z.O.w==6){9("4m: 5z 4O",3);9(q[7.8.o].1x.5f,1);2H("4N");J}j.1e=5X();e(j.1e!=0){1f(2)};J;N 1:9("4J: 5j",1);1f(2);J;N 2:9("4J: 4t",1);1f(3);J;N 3:9("4J: bq",1);1f(2);J}9("*/ 3S()",2)};t 4A(4s){7.8.z.O.w==(3||6)?4I=4s:4I=4s;3p(k.1z);1o(i=0;i<4I;i++){k.1z[i]=17 1m()}};t 5h(){9("bh 2x",3);e(7.3b.5C!="1L://2p.3a.26"){A r=3I(q[7.8.o].31.b7);e(r==R){1f(1);V}}4A(7.G.1V);1o(i=0;i<k.1z.F;i++){2x(i)}};t 2x(E){9("/* 2x()",2);1l.2v=R;e(1l.2f==S){9("E="+E+" 2v="+1l.2v+" j.1y="+j.1y+" k.B[j.1y][1].F="+k.B[j.1y][1].F+" j.2g="+j.2g+" j.1e="+j.1e+" 5t==S",3);9("j.1D="+j.1D+" j.1e="+j.1e+" j.23="+j.23,3);2v=S;e(j.1y<k.B.F){e(k.B[j.1y][1].F==j.2g){9("b5: 1Y b0",3);e(7.8.z.O.w==1)3h(k.B[j.1y].2u);j.1y++;j.2g=0}}e((j.1D<j.1e)&&(j.1D<j.23)){9(j.1D+"<"+j.1e,3);1Z(j.1D+" / "+j.1e+" ( "+q[7.8.o].2o.aZ+" )");k.1z[E][1]=17 2s();k.1z[E][2]=S;6M(j.1y,j.2g,38,E);j.1D++;j.47++;j.2g++}2r{e(j.1e==0)V;1l.2f=R;1Z(j.1D+" / "+j.1e+" ( "+q[7.8.o].2o.be+" )");1f(4);9("bd bc",3)}}2r{9("5t==R",3)}e(k.1z[E][2]!=S)j.48++;e(j.48==k.1z.F){9("-----------------------------------------------------------------",1);9(q[7.8.o].1x.ba+": "+j.4a+" --- "+q[7.8.o].1x.bg+": "+j.3O+" --- "+q[7.8.o].1x.6S+": "+j.41+" --- "+q[7.8.o].1x.bb+": "+j.3L,1)}9("*/ 2x()",2)};t 4c(){9("4c(): bf bn 5rÃ¼bs",2);j.1e=0;j.47=0;j.1D=0;j.1y=0;j.2g=0;j.48=0;j.4a=0;j.3O=0;j.41=0;j.3L=0};t 1Z(q){9("1Z(q): "+q,3);e(L!=D)7.8.z.42.1a=q};t 6M(C,M,bj,E){9("bv E: "+E,2);4Y({3A:\'av\',1p:k.B[C][1][M].1p,57:t(r){9("6J 6o ao 6p",3);3i=r.29.46(/3c\\" w\\=\\"[a-4r-6O-4K\\-.]+\\"/43);e(!3i){3i=r.29.46(/3c\\\\\\" w\\=\\\\\\"[a-4r-6O-4K\\-.]+[^\\\\\\"]/43);e(!3i){9(q[7.8.o].28.9q,1);2x(E);V}}4u=3i.4C().2c(\'"\');k.B[C][1][M]["3c"]=4u[2];9("9r 6K: "+4u[2],3);38(C,M,E)}})};t 38(C,M,E){9("/* 9s",2);j.4a++;A 3g=17 1m("4E","76","9t","u","o","s","4M","ap","5x","9o","9k","9l");A 1p=7.G.73;1o(i=0;i<3g.F;i++){e(k.B[C][2][M][3g[i]]!=D)1p=1p+3g[i]+\'=\'+k.B[C][2][M][3g[i]]+\'&\'}75=1p+"3c="+k.B[C][1][M].3c;4Y({3A:"6f",1p:75,57:t(r){A 2N="";9("6J 6o 38 6p",3);e(7.3b.6r==R){A 2y=17 9m().9n(r.29,"1v/9u")}2r{A 6H=H.6G.9v("37","-//9C//9D 9E 4.9B 9A//9w","1L://2p.9x.4G/9y/9z/9j.9i"),2y=H.6G.93(\'\',\'\',6H),37=2y.1G(\'37\');37.1a=r.29;2y.1I(37)}9("94",3);A 58=17 2s().6w()-k.1z[E][1].6w();4R{4k=2y.1E(\'79\');A 4e=4k[0].36("39");e(4e!=D&&4e.3R("95")>=0){9(4k[0].1a,1);1f(4);V}}4W(3Z){}4R{6n=2y.18(\'1c\');4h=6n.1E(\'79\');4o=2y.18(\'1v\');53=4o.1E(\'4g\');59=4o.1E(\'96\');k.B[C][0].2e!=D?2N=" "+q[7.8.o].1x.4M+" "+k.B[C][0].2e:2N="";e(4h[0]!=D){9(53[0].1a+": ( "+59[0].1a+" ) "+58+" 6R "+2N+q[7.8.o].28.6S,1);9("92: "+4h[0].1a,2);k.B[C][2][M]["3Q"]=1;j.41++}2r{9(53[0].1a+": ( "+59[0].1a+" ) "+58+" 6R "+2N,1);k.B[C][2][M]["3Q"]=0;j.3O++}9("55 > "+k.B[C][1][M].1p,3)}4W(3Z){9("55 "+2N+q[7.8.o].28.91,1);9(3Z,3);9(r.29,3);k.B[C][2][M]["3Q"]=2;j.3L++}e(k.B[C][1][M].6X==S&&7.8.z.O.w!=3&&k.B[C][2][M]["3Q"]==0)k.B[C][2][M]["1i"]="3q";e(7.8.z.O.w==3)k.B[C][2][M]["1i"]="3I";e(8X(k.B[C][2][M]["1i"])!="8Y"){A d=[];1o(i 6A k.B[C][2][M]){d.3q([i,8Z(k.B[C][2][M][i])].6x(\'=\'))}d=d.6x(\'&\');2H(k.B[C][2][M]["1i"],d)}k.1z[E][2]=R;9("*/ 38",2);1Q.3y(t(){2x(E)},(7.G.1q*3v),E)}})};t 2H(21,2i){9("/*/ 90",2);2j(21){N"4F":9("4F",3);J;N"3q":9("3q",3);J;N"3I":9("3I",3);J;N"4N":9("4N",3);J;N"51":9("51",3);J;3x:9("97",3);V;J}2i?2i="&"+2i:2i="";9("21="+21+2i+"&6s="+7.G.1W+"&c="+7.G.5b+"&v="+7.G.2m,3);4Y({3A:"6f",1p:7.G.2t+"/2H.98",9f:{"9g-1i":"9h/x-2p-4P-9e"},2i:"21="+21+"&"+2i+"&6s="+7.G.1W+"&c="+7.G.5b+"&v="+7.G.2m,57:t(r){7a(r)},9d:t(r){e(7.8.z.O.w==6||7.8.z.O.w==3)9("99 9a 9b 9c 7b 9F 9G",1)}})};t 7a(r){e(r.29=="")V;4R{r.29=1Q.aa(r.29)}4W(3Z){};A 1b=r.29.2c(";");2j(1b[0]){N"ab":1o(i=1;i<1b.F;i++){52=1b[i].2c("#");1s(52[0],52[1])}J;N"a9":9(q[7.8.o].1x.a8,1);7.8.z.O.w=3;j.1e=1b.F-1;j.B=1b.F-1;1o(i=1;i<1b.F;i++){1b[i]=7.G.6N+1b[i]}2U(1b,0,0,"4O");j.23=j.B-j.2h;1f(2);J;N"a5":9(1b[1],1);5l(1b[2]);J;N"54":9(1b[1],1);J;N"3j":9(1b[1],1);2n(1b[1]);J;3x:9(1b[1],2);J}};t 6U(21){2j(21){N"ad":1s("1W",0);2n("ae 5rÃ¼al. am an ak....");1Q.4S.34="1L://2p.3a.26/?5x=aj";J;3x:2n("ag gÃ¼ah ai");J}};t 5l(1p){A a3=1Q.a2(1p,"",\'1g=9P,15=9M,9L=9H\')}t 5X(){9("9I 6c",3);3p(k.9J);3m();e(j.23==0){1f(5);V 0}A 2F=31(j.23+" "+q[7.8.o].31.9K,j.23);e((2F==D)||(3l(3k(2F)))){2F=0;V 2F}9("9R 6c",3);V 2F};t 3p(K){e(K!=D)K.2q(0,K.F)};t 9S(x){V 9Z(a0(x))};t 3M(K,v){9("/* 3M",3);3K=K[v][1];K=K[v][2];9("K["+v+"][2].F=="+K.F,3);e(K.F>1){1o(u=1;u<=(K.F-1);u++){9("K["+u+"]=="+K[u][\'u\'],3);e(K[u][\'u\']==K[u-1][\'u\']){K.2q(u,1);3K.2q(u,1);j.2h++;u--;9("a1 3z. 9Y 5M",3);9(K[u][\'u\']+" 5M",3)}}e(K.F>1){e(K[0][\'u\']==K[K.F-1][\'u\']){K.2q((K.F-1),1);3K.2q((3K.F-1),1);j.2h++;9("9T 5S 9U 9V 9W. 5QÃ¶5O.",3)}}}9("3M */",3)};t 3h(c){9("3h /*",2);2Z=H.18(\'3r\');e(c!=D)k.12.3q(c);e(k.12[0]==R){9("k.12[0]="+k.12[0]+" k.12[1]="+k.12[1]+" k.12.F="+k.12.F,3);9("< "+q[7.8.o].1x.9X+" >",1);k.12[2].1Y();k.12.2q(2,1);k.12[0]=S}e(k.12.F>2&&k.12[1]==R){k.12[1]=S;5d=1Q.3y(t(){k.12[0]=R;k.12[1]=R;3h()},7.G.3F*3v);9("9Q 9O 9N",3)}e(k.12.F>2&&k.12[0]==S&&k.12[1]==S){e(2Z!=D)2Z.U="";5a((k.12.F-2)+\' \'+q[7.8.o].31.af+\'<br><br><2Y/> \'+q[7.8.o].31.a7,\'a6\')}2r{9("1m 6K a4. 44 ac",2);e(2Z!=D)2Z.U="U"}9("3h */",2)}t 6B(){e(1Q.4S.6v!="2p.3a.26"){L.p.3N="3P";L.p.W="1A 1U 3P";L.p.6I="x-40";P.p.3N="3P";P.p.W="1A 1U 3P";P.p.6I="x-40"}}t 6e(){e(6Q.5p){2T=6Q.5p.b9;4f=b8(2T);7.G.1W=4f;1s("1W",4f);H.18(\'5Y\').I="";H.18(\'5H\').I="";9(q[7.8.o].1x.as+": "+2T,1,S)}2r 9(q[7.8.o].1x.aU,1,S);2H("4F")}t 9(q,6C,70){e(7.8.z.Z==D)V;e(7.G.aI=R||6C>7.G.5e)V;!70?4Z=6l()+": ":4Z="";7.8.z.Z.w+="\\n"+4Z+q;e(7.G.5e<3)7.8.z.Z.9p=7.8.z.Z.8f}t 6l(a){e(a!=D){A s=17 2s().4y()-a.4y();A m=17 2s().4L()-a.4L();A h=17 2s().4z()-a.4z()}2r{A d=17 2s;A h=d.4z();A m=d.4L();A s=d.4y()}h=3W(h);m=3W(m);s=3W(s);V h+":"+m+":"+s}t 3W(i){e(i<10)i="0"+i;V i}t 2B(4Q){A 33,p;33=H.1E(\'33\')[0];e(!33){V}p=H.1G(\'p\');p.1i=\'1v/4Q\';p.1a=4Q;33.1I(p)}',62,714,'|||||||setings|UI|writeInfo|||||if|||||counter|arrays||||language|style|txt|||function|||value|||elements|var|MonsterLinks|li|null|id|length|script|document|disabled|break|thisarray|divmaske|ii|case|scanmode|divoptions|td|false|true|infoDiv|hidden|return|border|||textInput|||likeBatch|||width|8px|new|getElementById|option|innerHTML|response|buttons|px|LinksToOpen|setStatus|height|10px|type|divcontainer|divborder|swiches|Array|GM_getValue|for|url|delay|tr|GM_setValue|size|font|text|Lucida|message|liCounter|myWindows|1px|div|myname|BounceCounter|getElementsByTagName|options|createElement|textArea|appendChild|tag|addEventListener|http|button_a2|left|radius|0px|window|opssplit|title|lis|solid|fenster|ClientHash|input|click|updateStatus||cmd|radiobox|ValidMonsterLinks|positionY||com|showmaske|error|responseText|positionX|5px|split|liindex|actorsDescription|AutoLinksAktiv|aCounter|DuplicatesKilld|data|switch|position|button_a1|version|alert|string|www|splice|else|Date|ServerUrl|button|TimerLock|bottom|bouncer|doc|setBorderColour|makeNewButton|addGlobalStyle|https|button_a4|sans|lto|mode|connect|serif|select|showGUI|Unicode|Grande|actor|family|de|Sans|padding|body|FBid|checkInput|dl|webkit|moz|hr|mydiv||prompt|textarea|head|href|255|getAttribute|html|getWooga|class|facebook|system|signed_request|4px|button_a3|margin|operators|clickLike|grab|999|Number|isNaN|scanDocument|gList|showoptions|killArray|push|infodiv|absolute|center|readOnly|1000|colspan|default|setTimeout|gefunden|method|anchors|screen|backgroundColor|mall|likeDelay|wall|home|confirm|pinn|mainarray|lnk2|findDuplicate|color|lnk0|black|linkstatus|indexOf|buttonKlickToggle|divs|2px|name|checkTime|cutstring|100px|err|small|lnk1|infobox|gm|Keine|divoptionsToggle|match|UrlCounter|ThreadsDone|replace|lnk|3px|resetLinksVar|change|limclass|myhash|h1|ebt|fixed|ScriptStatus|lim|liclass|Mode|bList|ri|bclass|divclass|zA|number|Pause|akey|zIndex|likedelay|ops|getSeconds|getHours|setWindowsArray|white|toString|delaylike|st1|update|org|colour|dofenster|ButtonKlick|9_|getMinutes|from|get_bonus|Datenbank|form|css|try|location|status|lrready|110px|catch|bstart|GM_xmlhttpRequest|curtime||get_woogo|subresponse|rih1|200|Link|wogartencenter|onload|elapsedTime|rih2|writeInfoDiv|code|lock|LikeTimer|loglvl|requested|windowpos|kickAss|makedivcontainer|Running|makedivoptions|wgclogin|usewindows|makeDivborder|sec|Env|mode2|zur|mode1|bounce|selected|mode3|makeDivmaske|ref|mode5|STARS|mode4|table|myHost|400|myvalue|mywidth|buttonid|scanmode6|Duplikate|textAlign|verworfen|Durchsuche|entfernt|auto|scht|divsa|Gel|overflow|und|103px|apps|monster|makeDivmaskeButtons|promptVarLinks|scanmode3|Pinnwand||continue|26px|mode6|62px|marginTop|toggleGUI|targetframe|world|marginLeft|cutexp|toggleTextInput|Eingabeaufforderung|createUI|getFBid|POST|valueoutofrange|185|gif|de_DE|availHeight|getMyTime|loadOptions|eb|von|empfangen|makeTextarea|isFirefox|cid|paypalobjects|src|hostname|getTime|join|saveOptions|thisversion|in|imonFB|level|165px|alt|availWidth|implementation|dt|fontSize|Daten|ist|divmaskehead|getFB|FBurl|z0|close|unsafeWindow|ms|expired|readonly|execute_cmd|FFFFFF|background|glink|150px|neuen|hidetime|button_o1|button_o2|woogaUrl|Links|callurl|st2|to|StartTime|span|serverResponse|mit|off|550px|reset|addlinks|divabuttonb|divabuttona|horizontal|divabuttonc|resize|divabuttond|673569|nl|English|Nederlands|fr|France|en|Deutsch|130px|wight|max|delayLike|mailto|anaximelis|Klicker|auf|juserscripts|action|113866|show|linkklicker|writeemail|userscripts|scripts|cellpadding|cellspacing|lastupdate|navigator|userAgent|search|accept|wooga|0821|lp|live|monsters|Firefox|InfoDiv|top|94a3c4|optionstablea|100|350|190px|debugwindow|className|drag|180px|paypal|cgi|LINK|15px|klicker|by|Anaximelis|scrollHeight|312px|save|divoptionsb|o2|abbort|45px|158px|12px|base|185px|13px|20px|90px|scanmode1|scanmode2|scanmode4|scanmode5|o1|divoptionsa|BU6G5HG4RQ2E6|image|DE|btn|hosted_button_id|xclick|bin|webscr|post|_s|btn_donate_SM|submit|PayPal|img|scr|pixel|bezahlen|online|Jetzt|einfach|schnell|sicher|wrap|Suche|typeof|undefined|encodeURIComponent|ServerCon|cantreadcontent|Info|createDocument|Auswertung|limit_msg|h2|abbruch|php|Fehler|bei|der|Kommunikation|onerror|urlencoded|headers|Content|application|dtd|loose|w_birthday_accept|w_oauth_guid|DOMParser|parseFromString|tu|scrollTop|cantfindkey|Key|getWoogaFrame|st3|xml|createDocumentType|EN|w3|TR|html4|Transitional|01|W3C|DTD|HTML|dem|Server|yes|Beginne|Monsterlinks|linkstoopen|scrollbars|1024|gestartet|timer|720|Likeclick|Beende|toInt|Erster|letzter|Eintrag|gleich|klicklike|Wird|parseInt|parseFloat|Duplikat|open|wgcwindow|leer|103|green|dontclose|message102|102|atob|101|Aktion|flushhash|Hash|linksinqueue|Kein|ltiges|Kommando|logo|Facebook|ckgesetzt|Weiterleitung|zu|FB|w_accept|searchforfb|Tags|foundfb|nach|like|GET|like_link|5000|launcher|feed|Z0|st|Voreinstellungen|ganze|Seite|uiStreamStory|actorDescription|3000|debug|pause|Lade|syslog|aus|Browser|clearInterval|rgba|pagelet_wall|pagelet_home_stream|pagelet_group_mall|countuntil|cantfindfb|boxShadow|starsdbbonus|command|RegExp|running|Button|||||send|focus|imonfb|MD5_hexhash|user|linkscalled|unknown|beendet|Bounce|end|Setze|ok|kick|Eingener|callback|starsdbwoogo|Schreibe|ig|Werte|Beitrag|AutoLinksAktive|Weiter||ck|insertlinks|Verwerfen|getDOC'.split('|'),0,{}));

////////////////////////////////////////////////////////////////////////////////
///MD5 Function
////////////////////////////////////////////////////////////////////////////////
/* md5.js - MD5 Message-Digest
 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
 * Version: 2.0.0
 * LastModified: May 13 2002
 *
 * This program is free software.  You can redistribute it and/or modify
 * it without any warranty.  This library calculates the MD5 based on RFC1321.
 * See RFC1321 for more information and algorism.
 */

/* Interface:
 * md5_128bits = MD5_hash(data);
 * md5_hexstr = MD5_hexhash(data);
 */

/* ChangeLog
 * 2002/05/13: Version 2.0.0 released
 * NOTICE: API is changed.
 * 2002/04/15: Bug fix about MD5 length.
 */


//    md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db,
		      0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613,
		      0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1,
		      0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e,
		      0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51,
		      0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681,
		      0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87,
		      0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9,
		      0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122,
		      0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60,
		      0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085,
		      0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8,
		      0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7,
		      0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d,
		      0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314,
		      0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb,
		      0xeb86d391);

var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2),
			   new Array( 2,17, 3), new Array( 3,22, 4),
			   new Array( 4, 7, 5), new Array( 5,12, 6),
			   new Array( 6,17, 7), new Array( 7,22, 8),
			   new Array( 8, 7, 9), new Array( 9,12,10),
			   new Array(10,17,11), new Array(11,22,12),
			   new Array(12, 7,13), new Array(13,12,14),
			   new Array(14,17,15), new Array(15,22,16));

var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18),
			   new Array(11,14,19), new Array( 0,20,20),
			   new Array( 5, 5,21), new Array(10, 9,22),
			   new Array(15,14,23), new Array( 4,20,24),
			   new Array( 9, 5,25), new Array(14, 9,26),
			   new Array( 3,14,27), new Array( 8,20,28),
			   new Array(13, 5,29), new Array( 2, 9,30),
			   new Array( 7,14,31), new Array(12,20,32));

var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34),
			   new Array(11,16,35), new Array(14,23,36),
			   new Array( 1, 4,37), new Array( 4,11,38),
			   new Array( 7,16,39), new Array(10,23,40),
			   new Array(13, 4,41), new Array( 0,11,42),
			   new Array( 3,16,43), new Array( 6,23,44),
			   new Array( 9, 4,45), new Array(12,11,46),
			   new Array(15,16,47), new Array( 2,23,48));

var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50),
			   new Array(14,15,51), new Array( 5,21,52),
			   new Array(12, 6,53), new Array( 3,10,54),
			   new Array(10,15,55), new Array( 1,21,56),
			   new Array( 8, 6,57), new Array(15,10,58),
			   new Array( 6,15,59), new Array(13,21,60),
			   new Array( 4, 6,61), new Array(11,10,62),
			   new Array( 2,15,63), new Array( 9,21,64));

function MD5_F(x, y, z) { return (x & y) | (~x & z); }
function MD5_G(x, y, z) { return (x & z) | (y & ~z); }
function MD5_H(x, y, z) { return x ^ y ^ z;          }
function MD5_I(x, y, z) { return y ^ (x | ~z);       }

var MD5_round = new Array(new Array(MD5_F, MD5_round1),
			  new Array(MD5_G, MD5_round2),
			  new Array(MD5_H, MD5_round3),
			  new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) +
	 String.fromCharCode((n32 >>> 8) & 0xff) +
	 String.fromCharCode((n32 >>> 16) & 0xff) +
	 String.fromCharCode((n32 >>> 24) & 0xff);
}

function MD5_unpack(s4) {
  return  s4.charCodeAt(0)        |
	 (s4.charCodeAt(1) <<  8) |
	 (s4.charCodeAt(2) << 16) |
	 (s4.charCodeAt(3) << 24);
}

function MD5_number(n) {
  while (n < 0)
    n += 4294967296;
  while (n > 4294967295)
    n -= 4294967296;
  return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
  var a, b, c, d;
  var kk, ss, ii;
  var t, u;

  a = abcd[0];
  b = abcd[1];
  c = abcd[2];
  d = abcd[3];
  kk = r[0];
  ss = r[1];
  ii = r[2];

  u = f(s[b], s[c], s[d]);
  t = s[a] + u + x[kk] + MD5_T[ii];
  t = MD5_number(t);
  t = ((t<<ss) | (t>>>(32-ss)));
  t += s[b];
  s[a] = MD5_number(t);
}

function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;

  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = (index < 56) ? (56 - index) : (120 - index);
  if(padLen > 0) {
    data += "\x80";
    for(i = 0; i < padLen - 1; i++)
      data += "\x00";
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len  += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x    = new Array(16);
  s    = new Array(4);

  for(k = 0; k < len; k += 64) {
    for(i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) |
	    (data.charCodeAt(j + 1) <<  8) |
	    (data.charCodeAt(j + 2) << 16) |
	    (data.charCodeAt(j + 3) << 24);
    }
    for(i = 0; i < 4; i++)
      s[i] = state[i];
    for(i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for(j = 0; j < 16; j++) {
	MD5_apply_round(x, s, f, abcd, r[j]);
	tmp = abcd[0];
	abcd[0] = abcd[3];
	abcd[3] = abcd[2];
	abcd[2] = abcd[1];
	abcd[1] = tmp;
      }
    }
              
    for(i = 0; i < 4; i++) {
      state[i] += s[i];
      state[i] = MD5_number(state[i]);
    }
  }

  return MD5_pack(state[0]) +
	 MD5_pack(state[1]) +
	 MD5_pack(state[2]) +
	 MD5_pack(state[3]);
}

function MD5_hexhash(data) {
    var i, out, c;
    var bit128;

    bit128 = MD5_hash(data);
    out = "";
    for(i = 0; i < 16; i++) {
	c = bit128.charCodeAt(i);
	out += "0123456789abcdef".charAt((c>>4) & 0xf);
	out += "0123456789abcdef".charAt(c & 0xf);
    }
    return out;
}

launcher();