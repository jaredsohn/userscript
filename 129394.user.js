// ==UserScript==
// @name           facebook-eml
// @namespace      IndigenousTweets.com
// @description    Translates Facebook into Emiliano-Romagnolo
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.1
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-06-13
// Translations:   Federico L. G. Faroldi

/*
 *  Copyright 2012 Kevin Scannell
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
*/


var tags = new Array();
tags.push('a');      // many...
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
//divclasses.push('fsm fwn fcg');  // By:
//divclasses.push('uiImageBlockContent uiImageBlockSmallContent');  // "near"

var spanclasses = new Array();
spanclasses.push('default_message');  // Like/Dislike
spanclasses.push('saving_message');   // Like/Dislike
spanclasses.push('uiStreamSource');   // %T near %a

// Replace the search string with the translated string
function r(dd, s, t) {
    if (s == t) {
        return (dd);
    } else {
        var RegExpr = new RegExp(s, "g");
        return (dd.replace(RegExpr, t));
    }
}

function translate(x) {
  d = x;
// Translations go here
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>), (<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) piace questo elemento\.(?=($|"|<))', "$1"+"A "+"$2"+", "+"$3"+" e "+"$4"+" agh piäs.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) hanno condiviso (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" e "+"$3"+" j'an cundivis "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha commentato un[ao]? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" l'à ditt cuèl insima a "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) piace questo elemento\.(?=($|"|<))', "$1"+"A "+"$2"+" e "+"$3"+" agh piäs.");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) nei pressi di (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" vsén a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha condiviso (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" l'à miss in c'mon "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace un[ao]? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" agh piäs "+"$3"+".");
  d = r(d, '(^|="|>)Inserisci il nome di un amico o l\'indirizzo email\.(?=($|"|<))', "$1"+"Scriva 'l num ad 'n amîgh o 'n imeil");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Setenbar "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Adzenbar "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Farvèr "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Nuenbar "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Utubar "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Znèr "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avrîl "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" agh piäs "+"$3"+".");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Agust "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Märs "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mag' "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zugn "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Luj "+"$3"+" a "+"$4");
  d = r(d, '(^|="|>)A te e (<a [^>]+>[^<]+</a>) piace questo elemento\.(?=($|"|<))', "$1"+"A te e a "+"$2"+" agh piäs");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiunto una nuova foto\.(?=($|"|<))', "$1"+"$2"+" l'à miss sö'na foto.");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace questo elemento\.(?=($|"|<))', "$1"+"A "+"$2"+" agh piäs.");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace questo elemento\.(?=($|"|<))', "$1"+"A "+"$2"+" agh piäs.");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Setenbar a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Adzenbar a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Farvèr a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Nuenbar a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Utubar a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Znèr a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Avrîl a "+"$3");
  d = r(d, '(^|="|>)Mostra tutti e ([0-9,]+) i commenti(?=($|"|<))', "$1"+"Veda tutt "+"$2"+" cumént");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Agust a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Märs a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Mag' a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zugn a "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Luj a "+"$3");
  d = r(d, '(^|="|>)Vedi tutte le richieste di amicizia(?=($|"|<))', "$1"+"Veda tutt al dmandi");
  d = r(d, '(^|="|>)Persone che potresti conoscere(?=($|"|<))', "$1"+"Chi 't pudriss cugnusar");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Setenbar "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Adzenbar "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Farvèr "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Nuenbar "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Utubar "+"$3");
  d = r(d, '(^|="|>)Caricamenti dal cellulare(?=($|"|<))', "$1"+"Cargament dal telefunen");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Znèr "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Avrîl "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Agust "+"$3");
  d = r(d, '(^|="|>)([0-9,]+) amici in comune(?=($|"|<))', "$1"+"$2"+" amîgh in c'mon");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Märs "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Mag' "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Zugn "+"$3");
  d = r(d, '(^|="|>)mercoledì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Marcurdé a "+"$2");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Luj "+"$3");
  d = r(d, '(^|="|>)Invia un nuovo messaggio(?=($|"|<))', "$1"+"Manda un messag' nov");
  d = r(d, '(^|="|>)A cosa stai pensando\\?(?=($|"|<))', "$1"+"Cusa gh'èt in mént?");
  d = r(d, '(^|="|>)martedì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Martidé a "+"$2");
  d = r(d, '(^|="|>)venerdì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Vanardé a "+"$2");
  d = r(d, '(^|="|>)domenica alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Dumenica a "+"$2");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Ciciarament (mia adess)");
  d = r(d, '(^|="|>)Vedi tutte le notifiche(?=($|"|<))', "$1"+"Veda tutt j' avîs");
  d = r(d, '(^|="|>)giovedi alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Giuidé a "+"$2");
  d = r(d, '(^|="|>)Impostazioni account(?=($|"|<))', "$1"+"Impustasion dal Cont");
  d = r(d, '(^|="|>)Vedi tutti i messaggi(?=($|"|<))', "$1"+"Veda tutt i messag'");
  d = r(d, '(^|="|>)([0-9,]+) condivisioni(?=($|"|<))', "$1"+"$2"+" cundivision");
  d = r(d, '(^|="|>)Richieste di amicizia(?=($|"|<))', "$1"+"ADMANDI D'AMICISIA");
  d = r(d, '(^|="|>)Suggerimenti per le Pagine(?=($|"|<))', "$1"+"Pagini par te");
  d = r(d, '(^|="|>)lunedi alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lundé a "+"$2");
  d = r(d, '(^|="|>)Aggiungi agli amici(?=($|"|<))', "$1"+"Metta in-t-j amîgh");
  d = r(d, '(^|="|>)Amici più stretti(?=($|"|<))', "$1"+"Amîgh cül e pataja");
  d = r(d, '(^|="|>)Modifica o rimuovi(?=($|"|<))', "$1"+"Mudifica o Tiral via");
  d = r(d, '(^|="|>)Find More Pages(?=($|"|<))', "$1"+"CATA FORA D'ATAR PAGINI");
  d = r(d, '(^|="|>)Visualizza traduzione(?=($|"|<))', "$1"+"Veda la tradusion");
  d = r(d, '(^|="|>)sabato alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sabat a "+"$2");
  d = r(d, '(^|="|>)Trova i tuoi amici(?=($|"|<))', "$1"+"CATA FORA DI AMÎGH");
  d = r(d, '(^|="|>)Like This Page(?=($|"|<))', "$1"+"Am piäs cla pagina-che");
  d = r(d, '(^|="|>)Use Facebook come:(?=($|"|<))', "$1"+"Drova Facebook 'me:");
  d = r(d, '(^|="|>)([0-9,]+) NEW STORIES(?=($|"|<))', "$1"+"$2"+" CONT NÖV");
  d = r(d, '(^|="|>)Vedi dettagli amicizia(?=($|"|<))', "$1"+"Veda j'amicisi");
  d = r(d, '(^|="|>)Scrivi un commento\.\.\.(?=($|"|<))', "$1"+"Scriva cuèl");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre(?=($|"|<))', "$1"+"$2"+" Setenbar");
  d = r(d, '(^|="|>)([0-9,]+) secondi fa(?=($|"|<))', "$1"+"$2"+" sgònd fa");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre(?=($|"|<))', "$1"+"$2"+" Adzenbar");
  d = r(d, '(^|="|>)1 amico in comune(?=($|"|<))', "$1"+"1 amîgh in c'mon");
  d = r(d, '(^|="|>)Applicazioni e giochi(?=($|"|<))', "$1"+"Ferr e Bilén");
  d = r(d, '(^|="|>)([0-9,]+) minuti fa(?=($|"|<))', "$1"+"$2"+" minüd fa");
  d = r(d, '(^|="|>)Persone a cui piace(?=($|"|<))', "$1"+"A chi 'gh piäs");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio(?=($|"|<))', "$1"+"$2"+" Farvèr");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre(?=($|"|<))', "$1"+"$2"+" Nuenbar");
  d = r(d, '(^|="|>)([0-9,]+) persone(?=($|"|<))', "$1"+"$2"+" parson'ni");
  d = r(d, '(^|="|>)Non mi piace più(?=($|"|<))', "$1"+"Am piäs mia po");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre(?=($|"|<))', "$1"+"$2"+" Utubar");
  d = r(d, '(^|="|>)Ieri alle ([^<" ]+)(?=($|"|<))', "$1"+"Jér a "+"$2");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio(?=($|"|<))', "$1"+"$2"+" Znèr");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile(?=($|"|<))', "$1"+"$2"+" Avrîl");
  d = r(d, '(^|="|>)circa un\'ora fa(?=($|"|<))', "$1"+"'n urten-na fa");
  d = r(d, '(^|="|>)circa un minuto fa(?=($|"|<))', "$1"+"un minüd fa");
  d = r(d, '(^|="|>)pochi secondi fa(?=($|"|<))', "$1"+"Propria adèss");
  d = r(d, '(^|="|>)Preferiti(?=($|"|<))', "$1"+"CUL C'AT PIÄS PUSSÈ");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto(?=($|"|<))', "$1"+"$2"+" Agust");
  d = r(d, '(^|="|>)Opportunità di lavoro(?=($|"|<))', "$1"+"Mastér");
  d = r(d, '(^|="|>)Cambia copertina(?=($|"|<))', "$1"+"Müda la foto");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo(?=($|"|<))', "$1"+"$2"+" Märs");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio(?=($|"|<))', "$1"+"$2"+" Mag'");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno(?=($|"|<))', "$1"+"$2"+" Zugn");
  d = r(d, '(^|="|>)Fai la domanda(?=($|"|<))', "$1"+"Fa' 'na dmanda");
  d = r(d, '(^|="|>)Crea una Pagina(?=($|"|<))', "$1"+"Fa' na pagina");
  d = r(d, '(^|="|>)Crea gruppo\.\.\.(?=($|"|<))', "$1"+"Fa' 'n grup");
  d = r(d, '(^|="|>)([0-9,]+) ore fa(?=($|"|<))', "$1"+"$2"+" uri fa");
  d = r(d, '(^|="|>)Amici in Chat(?=($|"|<))', "$1"+"AMÎGH CICIARON");
  d = r(d, '(^|="|>)Centro assistenza(?=($|"|<))', "$1"+"DAM 'NA MAN");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio(?=($|"|<))', "$1"+"$2"+" Luj");
  d = r(d, '(^|="|>)1 condivisione(?=($|"|<))', "$1"+"1 cundivision");
  d = r(d, '(^|="|>)Visualizza altro(?=($|"|<))', "$1"+"Veda pussè");
  d = r(d, '(^|="|>)Più recenti(?=($|"|<))', "$1"+"Pussè recént");
  d = r(d, '(^|="|>)Nuovo messaggio(?=($|"|<))', "$1"+"Messag' nov");
  d = r(d, '(^|="|>)Attività recenti(?=($|"|<))', "$1"+"Apena fat");
  d = r(d, '(^|="|>)1 NEW STORY(?=($|"|<))', "$1"+"1 STORIA NÖVA");
  d = r(d, '(^|="|>)Modifica opzioni(?=($|"|<))', "$1"+"Mudifica");
  d = r(d, '(^|="|>)Altre notizie(?=($|"|<))', "$1"+"Pussè Roba");
  d = r(d, '(^|="|>)Sponsorizzate(?=($|"|<))', "$1"+"Spunsurisè");
  d = r(d, '(^|="|>)Informazioni(?=($|"|<))', "$1"+"Infurmasion");
  d = r(d, '(^|="|>)Applicazioni(?=($|"|<))', "$1"+"Applicasion");
  d = r(d, '(^|="|>)Italiano(?=($|"|<))', "$1"+"Emilian-Pramzan");
  d = r(d, '(^|="|>)New Group\.\.\.(?=($|"|<))', "$1"+"Grup nov");
  d = r(d, '(^|="|>)Anno di nascita(?=($|"|<))', "$1"+"Nassì");
  d = r(d, '(^|>)altri ([0-9,]+)(?=($|<))', "$1"+"$2"+" ätar");
  d = r(d, '(^|="|>)Mostra tutti(?=($|"|<))', "$1"+"Veda tutt");
  d = r(d, '(^|="|>)Foto bacheca(?=($|"|<))', "$1"+"Wall Foto");
  d = r(d, '(^|="|>)Conferma(?=($|"|<))', "$1"+"Dîgh ad sé");
  d = r(d, '(^|="|>)"Mi piace"(?=($|"|<))', "$1"+"Agh piäs");
  d = r(d, '(^|="|>)mercoledì(?=($|"|<))', "$1"+"Marcurdé");
  d = r(d, '(^|="|>)Pubblicità(?=($|"|<))', "$1"+"Reclàm");
  d = r(d, '(^|="|>)Non ora(?=($|"|<))', "$1"+"Miga adèss");
  d = r(d, '(^|="|>)Ti piace\.(?=($|"|<))', "$1"+"At piäs");
  d = r(d, '(^|="|>)Annulla(?=($|"|<))', "$1"+"Scansèlla");
  d = r(d, '(^|="|>)Commenta(?=($|"|<))', "$1"+"Dì cuèl");
  d = r(d, '(^|="|>)Messaggio:(?=($|"|<))', "$1"+"Messag'");
  d = r(d, '(^|="|>)settembre(?=($|"|<))', "$1"+"Setenbar");
  d = r(d, '(^|="|>)Mi piace(?=($|"|<))', "$1"+"Am piäs");
  d = r(d, '(^|="|>)dicembre(?=($|"|<))', "$1"+"Adzenbar");
  d = r(d, '(^|="|>)martedì(?=($|"|<))', "$1"+"Martidé");
  d = r(d, '(^|="|>)venerdì(?=($|"|<))', "$1"+"Vanardé");
  d = r(d, '(^|="|>)domenica(?=($|"|<))', "$1"+"Dumenica");
  d = r(d, '(^|="|>)Familiari(?=($|"|<))', "$1"+"Famija");
  d = r(d, '(^|="|>)Messaggi(?=($|"|<))', "$1"+"Messag'");
  d = r(d, '(^|="|>)Welcome(?=($|"|<))', "$1"+"Benvgnì");
  d = r(d, '(^|="|>)febbraio(?=($|"|<))', "$1"+"Farvèr");
  d = r(d, '(^|="|>)novembre(?=($|"|<))', "$1"+"Nuenbar");
  d = r(d, '(^|="|>)Mappa(?=($|"|<))', "$1"+"Carten'na");
  d = r(d, '(^|="|>)Notifiche(?=($|"|<))', "$1"+"Avîs");
  d = r(d, '(^|="|>)Profilo(?=($|"|<))', "$1"+"Prufîl");
  d = r(d, '(^|="|>)Domande(?=($|"|<))', "$1"+"Admandi");
  d = r(d, '(^|="|>)Cerca(?=($|"|<))', "$1"+"Cata fora");
  d = r(d, '(^|="|>)giovedi(?=($|"|<))', "$1"+"Giuidé");
  d = r(d, '(^|="|>)Note(?=($|"|<))', "$1"+"Scaraboc'");
  d = r(d, '(^|="|>)ottobre(?=($|"|<))', "$1"+"Utubar");
  d = r(d, '(^|="|>)Eventi(?=($|"|<))', "$1"+"Evént");
  d = r(d, '(^|="|>)Adesso(?=($|"|<))', "$1"+"Adèss");
  d = r(d, '(^|="|>)Pagine(?=($|"|<))', "$1"+"PAGINI");
  d = r(d, '(^|="|>)Diario(?=($|"|<))', "$1"+"Diäri");
  d = r(d, '(^|="|>)gennaio(?=($|"|<))', "$1"+"Znèr");
  d = r(d, '(^|="|>)aprile(?=($|"|<))', "$1"+"Avrîl");
  d = r(d, '(^|="|>)lunedi(?=($|"|<))', "$1"+"Lundé");
  d = r(d, '(^|>)un link(?=($|<))', "$1"+"un ligàm");
  d = r(d, '(^|="|>)Chiudi(?=($|"|<))', "$1"+"Sèra");
  d = r(d, '(^|="|>)Amici(?=($|"|<))', "$1"+"AMÎGH");
  d = r(d, '(^|="|>)AMICI(?=($|"|<))', "$1"+"AMÎGH");
  d = r(d, '(^|="|>)LISTS(?=($|"|<))', "$1"+"ELENCH");
  d = r(d, '(^|="|>)Esci(?=($|"|<))', "$1"+"Va fora");
  d = r(d, '(^|="|>)Altro(?=($|"|<))', "$1"+"Pussè");
  d = r(d, '(^|="|>)Altro(?=($|"|<))', "$1"+"Pussè");
  d = r(d, '(^|="|>)Music(?=($|"|<))', "$1"+"Muzica");
  d = r(d, '(^|="|>)Invia(?=($|"|<))', "$1"+"Mandal");
  d = r(d, '(^|="|>)agosto(?=($|"|<))', "$1"+"Agust");
  d = r(d, '(^|="|>)sabato(?=($|"|<))', "$1"+"Sabat");
  d = r(d, '(^|="|>)Gruppi(?=($|"|<))', "$1"+"GRUP");
  d = r(d, '(^|="|>)Links(?=($|"|<))', "$1"+"Ligam");
  d = r(d, '(^|="|>)Luoghi(?=($|"|<))', "$1"+"Sîd");
  d = r(d, '(^|="|>)marzo(?=($|"|<))', "$1"+"Märs");
  d = r(d, '(^|="|>)maggio(?=($|"|<))', "$1"+"Mag'");
  d = r(d, '(^|="|>)giugno(?=($|"|<))', "$1"+"Zugn");
  d = r(d, '(^|="|>)di:(?=($|"|<))', "$1"+"Fat da");
  d = r(d, '(^|="|>)Luogo(?=($|"|<))', "$1"+"Sîd");
  d = r(d, '(^|="|>)luglio(?=($|"|<))', "$1"+"Luj");
  d = r(d, '(^|="|>)Ieri(?=($|"|<))', "$1"+"Jér");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"CÀ");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"ligam");
  return d;
}

function translateOnInsert( node ) {

  //var logmsg = 'inserted a ' + node.nodeName + ' node; untranslated elements: ';
  for (n = 0; n < tags.length; n++) {
    var tagmatches = node.getElementsByTagName(tags[n]);
    for ( i = 0; i < tagmatches.length; i++ ) {
      // innerHTML often empty (never null)
      if (!tagmatches[i].hasAttribute('indigenous') &&
           tagmatches[i].innerHTML != '') {
        // logmsg = logmsg + tagmatches[i].nodeName + ' ';
        tagmatches[i].innerHTML = translate(tagmatches[i].innerHTML);
        tagmatches[i].setAttribute('indigenous', true);
      }
    }
  }

  var divs = node.getElementsByTagName('div');
  for (i = 0; i < divs.length; i++ ) {
    if (!divs[i].hasAttribute('indigenous')) {
      for (n = 0; n < divclasses.length; n++) {
        if (divs[i].className == divclasses[n]) {
          // logmsg = logmsg + 'DIV.' + divclasses[n] + ' ';
          divs[i].innerHTML = translate(divs[i].innerHTML);
          divs[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }

  var spans = node.getElementsByTagName('span');
  for (i = 0; i < spans.length; i++ ) {
    if (!spans[i].hasAttribute('indigenous')) {
      for (n = 0; n < spanclasses.length; n++) {
        if (spans[i].className == spanclasses[n]) {
          // logmsg = logmsg + 'SPAN.' + spanclasses[n] + ' ';
          spans[i].innerHTML = translate(spans[i].innerHTML);
          spans[i].setAttribute('indigenous', true);
          break;
        }
      }
    }
  }
  // GM_log(logmsg);
}

// This is (only) needed to handle updates to time stamps
function listen_for_change(evt)
{
  var node = evt.target;
  //GM_log('in change node, data='+node.data+'; was='+evt.prevValue);
  document.body.removeEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  node.data = translate(node.data);
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
}

function listen_for_add(evt)
{
  var node = evt.target;
  if (node.nodeType == document.ELEMENT_NODE &&
      node.nodeName != 'SCRIPT' &&
      node.nodeName != 'INPUT') {
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    translateOnInsert(node);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
