// ==UserScript==
// @name           facebook-lij
// @namespace      IndigenousTweets.com
// @description    Translate Facebook into Ligurian
// @include        http*://*.facebook.com/*
// @include        http*://facebook.com/*
// @author         Kevin Scannell
// @run-at         document-start
// @version        1.0.3
// @icon           http://indigenoustweets.com/resources/gm.png
// ==/UserScript==

// Last updated:   2012-10-11
// Translations:   Alessio Gastaldi

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
tags.push('h3');     // Friend Requests, Notifications, ...
tags.push('h4');     // Sponsored, Ticker, ...
tags.push('h5');     // new in Sept 2012 for "was tagged in...", "added %d new photos", etc.
tags.push('h6');     // %a commented on %a.
tags.push('label');  // Comment
tags.push('a');      // many... (should do last for "context sensitive" stuff)

var divclasses = new Array();
divclasses.push('innerWrap');  // Write a comment... <textarea>
//divclasses.push('UIImageBlock_Content UIImageBlock_ICON_Content');  // 2 people like this
divclasses.push('_8m _8u'); // 2 people like this (etc.)
//divclasses.push('_29j _29k'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent -cx-PRIVATE-uiImageBlockDeprecated__content'); // 2 people like this (etc.)
//divclasses.push('-cx-PRIVATE-uiImageBlockDeprecated__iconContent _29j -cx-PRIVATE-uiImageBlockDeprecated__content _29k'); // 2 people like this (etc.)
//divclasses.push('commentActions fsm fwn fcg'); // time stamps on comments
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
  d = r(d, '(^|="|>)<span[^>]+>A te e </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"A ti e-a "+"$2"+" o ghe piâxe");
  d = r(d, '(^|="|>)<span[^>]+>A te, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> e </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"A ti, "+"$2"+" e a âtri "+"$3"+" o ghe piâxe");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+>, </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> e </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"A "+"$2"+", "+"$3"+" e-a âtri "+"$4"+" o ghe piâxe. ");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiunto una nuova foto\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à azónto 'na nêuva föto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiunto ([0-9,]+) nuove foto\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à azónto "+"$3"+" nêuve föto.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiunto una nuova foto all\'album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+"1 o l'à azónto 'na nêuva föto a l'àlbom "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiunto ([0-9,]+) nuove foto all\'album (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+"1 o l'à azónto "+"$3"+" nêuve föto a l'àlbom "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" e "+"$3");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) piace (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" e "+"$3"+" ghe piâxe "+"$4"+".");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> e </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"a "+"$2"+" e-a "+"$3"+" ghe piâxe.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) hanno condiviso (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" e "+"$3"+" àn condivîzo "+"$4"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>) hanno condiviso i?la? (<a [^>]+>[^<]+</a>) d[ai] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" e "+"$3"+" àn condivîzo "+"$5"+" de "+"$4"+".");
  d = r(d, '(^|="|>)Informazioni(?=($|"|<))', "$1"+"Informaçioìn");
  d = r(d, '(^|="|>)circa un\'ora fa(?=($|"|<))', "$1"+"Ciù ò mêno 'n'ôa fa");
  d = r(d, '(^|="|>)circa un minuto fa(?=($|"|<))', "$1"+"Ciù ò mêno 'n menûto fa");
  d = r(d, '(^|="|>)Impostazioni account(?=($|"|<))', "$1"+"Inpostaçioìn de l'Account");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha cambiato la sua immagine del profilo\.(?=($|"|<))', "$1"+"A "+"$2"+" a l'à cangiòu a seu föto do profî");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha cambiato la sua immagine del profilo\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à cangiòu a seu föto do profî");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha commentato un[ao]? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à comentòu "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha commentato i?la? su[ao] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"A "+"$2"+" a l'à comentòu a seu "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha commentato i?la? su[ao] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à comentòu a seu "+"$3");
  d = r(d, '(^|="|>)Registro attività(?=($|"|<))', "$1"+"Regìstro de ativitæ");
  d = r(d, '(^|="|>)Aggiungi agli amici(?=($|"|<))', "$1"+"Azónzi Amîgo");
  d = r(d, '(^|="|>)Aggiungi interessi\.\.\.(?=($|"|<))', "$1"+"Azónzi interésse");
  d = r(d, '(^|="|>)Foto/video(?=($|"|<))', "$1"+"Azónzi Föto / Vìdeo");
  d = r(d, '(^|="|>)Pubblicità(?=($|"|<))', "$1"+"Averténse");
  d = r(d, '(^|="|>)pochi secondi fa(?=($|"|<))', "$1"+"quàrche segóndo fa");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"a "+"$2"+" ghe piâxe "+"$3");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace un[ao]? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"a "+"$2"+" o ghe piâxe un "+"$3");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piace i?la? (<a [^>]+>[^<]+</a>) d[ai] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ghe piâxe o/a "+"$4"+" de "+"$3"+".");
  d = r(d, '(^|="|>)A (<a [^>]+>[^<]+</a>) piacciono (<a [^>]+>[^<]+</a>) e (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" ghe piâxe "+"$3"+" e "+"$4"+".");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"a "+"$2"+" o ghe piâxe.");
  d = r(d, '(^|="|>)<span[^>]+>A </span>(<a [^>]+>(?:<span[^>]+>)?[^<]+(?:</span>)?</a>)<span[^>]+> piace questo elemento\.</span>(?=($|"|<))', "$1"+"a "+"$2"+" o ghe piâxe.");
  d = r(d, '(^|>)un link(?=($|<))', "$1"+"un colegaménto");
  d = r(d, '(^|="|>)Applicazioni(?=($|"|<))', "$1"+"APPS");
  d = r(d, '(^|="|>)Applicazioni e giochi(?=($|"|<))', "$1"+"Apps e Zéughi");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha condiviso (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o l'à condivîzo "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha condiviso i?l[a\']? ?(<a [^>]+>[^<]+</a>) d[ai] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o l'à condivîzo o "+"$3"+" de "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha condiviso la propria (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" a l'à condivîzo o/a seu "+"$3");
  d = r(d, '(^|="|>)Fai una domanda(?=($|"|<))', "$1"+"Fànni 'na domànda");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) took a photo with (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o se fæto 'na föto co-o "+"$3"+".");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) è stat[ao] taggat[ao] presso (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o l'é stæto identificòu a "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) è stat[ao] taggat[ao] nell[ae] (<a [^>]+>[^<]+</a>) d[ai] (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o l'é stæto identificòu inta "+"$3"+" de "+"$4");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) è stat[ao] taggat[ao] in un[ao]? (<a [^>]+>[^<]+</a>)\.(?=($|"|<))', "$1"+"$2"+" o l'é stæto identificòu into "+"$3");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiornato la sua immagine di copertina\.(?=($|"|<))', "$1"+"A "+"$2"+" a l'à agiornòu a seu föto da covertìnn-a.");
  d = r(d, '(^|="|>)(<a [^>]+>[^<]+</a>) ha aggiornato la sua immagine di copertina\.(?=($|"|<))', "$1"+"O "+"$2"+" o l'à agiornòu a seu föto da covertìnn-a");
  d = r(d, '(^|="|>)Anno di nascita(?=($|"|<))', "$1"+"Nasciûo/a");
  d = r(d, '(^|="|>)di:(?=($|"|<))', "$1"+"De:");
  d = r(d, '(^|="|>)Annulla(?=($|"|<))', "$1"+"Anùlla");
  d = r(d, '(^|="|>)Opportunità di lavoro(?=($|"|<))', "$1"+"Cariêra");
  d = r(d, '(^|="|>)Cambia copertina(?=($|"|<))', "$1"+"Càngia covertìnn-a");
  d = r(d, '(^|="|>)Chat \\(Offline\\)(?=($|"|<))', "$1"+"Ciæti (Fêua lìnea)");
  d = r(d, '(^|="|>)Chiudi(?=($|"|<))', "$1"+"Særa");
  d = r(d, '(^|="|>)Amici più stretti(?=($|"|<))', "$1"+"Amîxi ciù câi");
  d = r(d, '(^|="|>)Commenta(?=($|"|<))', "$1"+"Coménta");
  d = r(d, '(^|="|>)Cookie(?=($|"|<))', "$1"+"Bescheutìn (cookie)");
  d = r(d, '(^|="|>)Conferma(?=($|"|<))', "$1"+"Confèrma");
  d = r(d, '(^|="|>)Crea un\'inserzione(?=($|"|<))', "$1"+"Crêa 'n Ad");
  d = r(d, '(^|="|>)Crea una Pagina(?=($|"|<))', "$1"+"Crêa 'na pàgina");
  d = r(d, '(^|="|>)Crea gruppo\.\.\.(?=($|"|<))', "$1"+"Crêa 'n grùppo");
  d = r(d, '(^|="|>)Crea gruppo(?=($|"|<))', "$1"+"Crêa 'n grùppo");
  d = r(d, '(^|="|>)Sviluppatori(?=($|"|<))', "$1"+"Svilopatoî");
  d = r(d, '(^|="|>)1 hour ago(?=($|"|<))', "$1"+"Ciù o mêno 'n'ôa fa");
  d = r(d, '(^|="|>)([0-9,]+) ore fa(?=($|"|<))', "$1"+"$2"+" ôe fa");
  d = r(d, '(^|="|>)1 minute ago(?=($|"|<))', "$1"+"Ciù o mêno 'n menûto fa");
  d = r(d, '(^|="|>)([0-9,]+) minuti fa(?=($|"|<))', "$1"+"$2"+" menûti fa");
  d = r(d, '(^|="|>)1 amico in comune(?=($|"|<))', "$1"+"1 amîgo in comûne");
  d = r(d, '(^|="|>)([0-9,]+) amici in comune(?=($|"|<))', "$1"+"$2"+" amîxi in comûne");
  d = r(d, '(^|>)1 other(?=($|<))', "$1"+"Un âtro");
  d = r(d, '(^|>)altri ([0-9,]+)(?=($|<))', "$1"+"$2"+" âtri");
  d = r(d, '(^|>)1 other page(?=($|<))', "$1"+"'n'âtra pàgina");
  d = r(d, '(^|>)altre ([0-9,]+) Pagine(?=($|<))', "$1"+"$2"+" âtre pàgine");
  d = r(d, '(^|="|>)1 person(?=($|"|<))', "$1"+"1 persónn-a");
  d = r(d, '(^|="|>)([0-9,]+) persone(?=($|"|<))', "$1"+"$2"+" persónn-e");
  d = r(d, '(^|="|>)1 second ago(?=($|"|<))', "$1"+"Un segóndo fa");
  d = r(d, '(^|="|>)([0-9,]+) secondi fa(?=($|"|<))', "$1"+"$2"+" segóndi fa");
  d = r(d, '(^|="|>)1 condivisione(?=($|"|<))', "$1"+"1 condivixión");
  d = r(d, '(^|="|>)([0-9,]+) condivisioni(?=($|"|<))', "$1"+"Condivîzo "+"$2"+" vòtte");
  d = r(d, '(^|="|>)Modifica opzioni(?=($|"|<))', "$1"+"Càngia inpostaçioìn");
  d = r(d, '(^|="|>)Modifica o rimuovi(?=($|"|<))', "$1"+"Càngia ò Scancélla");
  d = r(d, '(^|="|>)Italiano(?=($|"|<))', "$1"+"Lìgure");
  d = r(d, '(^|="|>)Inserisci il nome di un amico o l\'indirizzo email\.(?=($|"|<))', "$1"+"Scrîvi un nómme o indirìsso email de 'n'amîgo");
  d = r(d, '(^|="|>)Eventi(?=($|"|<))', "$1"+"Evénti");
  d = r(d, '(^|="|>)Familiari(?=($|"|<))', "$1"+"Famìggia");
  d = r(d, '(^|="|>)Preferiti(?=($|"|<))', "$1"+"PREFERÎI");
  d = r(d, '(^|="|>)Trova i tuoi amici(?=($|"|<))', "$1"+"Trêuva amîxi");
  d = r(d, '(^|="|>)Trova altre Pagine(?=($|"|<))', "$1"+"Trêuva ciù amîxi");
  d = r(d, '(^|="|>)Segui post(?=($|"|<))', "$1"+"Ségoi o Post");
  d = r(d, '(^|="|>)Amici in Chat(?=($|"|<))', "$1"+"Amîxi che ciatézan");
  d = r(d, '(^|="|>)Richieste di amicizia(?=($|"|<))', "$1"+"Amicìçia Domandâ");
  d = r(d, '(^|="|>)Amici(?=($|"|<))', "$1"+"Amîxi");
  d = r(d, '(^|="|>)AMICI(?=($|"|<))', "$1"+"AMÎXI");
  d = r(d, '(^|="|>)Gruppi(?=($|"|<))', "$1"+"GRÙPPI");
  d = r(d, '(^|="|>)Centro assistenza(?=($|"|<))', "$1"+"Agiùtto");
  d = r(d, '(^|="|>)Home(?=($|"|<))', "$1"+"Câza");
  d = r(d, '(^|="|>)Interessi(?=($|"|<))', "$1"+"INTERÉSSI");
  d = r(d, '(^|="|>)Avvenimento importante(?=($|"|<))', "$1"+"Evénti");
  d = r(d, '(^|="|>)Mi piace(?=($|"|<))', "$1"+"Me piâxe");
  d = r(d, '(^|="|>)"Mi piace"(?=($|"|<))', "$1"+"Ghe piâxe");
  d = r(d, '(^|="|>)Di\' che ti piace questa Pagina(?=($|"|<))', "$1"+"Ghe piâxe sta pàgina");
  d = r(d, '(^|="|>)Esci(?=($|"|<))', "$1"+"Sciòrti");
  d = r(d, '(^|="|>)Mappa(?=($|"|<))', "$1"+"Màppa");
  d = r(d, '(^|="|>)Messaggio(?=($|"|<))', "$1"+"Mesàggio");
  d = r(d, '(^|="|>)Messaggio:(?=($|"|<))', "$1"+"Mesàggio:");
  d = r(d, '(^|="|>)Messaggi(?=($|"|<))', "$1"+"Mesàggi:");
  d = r(d, '(^|="|>)Caricamenti dal cellulare(?=($|"|<))', "$1"+"Caregæ dò-u telefonìn");
  d = r(d, '(^|="|>)Altro(?=($|"|<))', "$1"+"Ciù");
  d = r(d, '(^|="|>)Altro(?=($|"|<))', "$1"+"CIÙ");
  d = r(d, '(^|="|>)Altre notizie(?=($|"|<))', "$1"+"Ciù stöie");
  d = r(d, '(^|="|>)Più recenti(?=($|"|<))', "$1"+"Ciù nêuvi");
  d = r(d, '(^|="|>)Nuovo messaggio(?=($|"|<))', "$1"+"Nêuvo Mesàggio");
  d = r(d, '(^|="|>)Notizie(?=($|"|<))', "$1"+"Ùrtime notìçie");
  d = r(d, '(^|="|>)Note(?=($|"|<))', "$1"+"Nòtte");
  d = r(d, '(^|="|>)Notifiche(?=($|"|<))', "$1"+"Notìçie");
  d = r(d, '(^|="|>)Non ora(?=($|"|<))', "$1"+"No òua");
  d = r(d, '(^|="|>)Adesso(?=($|"|<))', "$1"+"Òua");
  d = r(d, '(^|="|>)Pagine(?=($|"|<))', "$1"+"PÀGINE");
  d = r(d, '(^|="|>)Persone a cui piace(?=($|"|<))', "$1"+"Persónn-e ch'o ghe piâxe");
  d = r(d, '(^|="|>)Persone che potresti conoscere(?=($|"|<))', "$1"+"Persónn-e che ti poriêsci conósce");
  d = r(d, '(^|="|>)Foto(?=($|"|<))', "$1"+"Föto");
  d = r(d, '(^|="|>)Foto(?=($|"|<))', "$1"+"Föto");
  d = r(d, '(^|="|>)Luogo(?=($|"|<))', "$1"+"Pòsto");
  d = r(d, '(^|="|>)Luoghi(?=($|"|<))', "$1"+"Pòsti");
  d = r(d, '(^|="|>)Poke(?=($|"|<))', "$1"+"Pokes");
  d = r(d, '(^|="|>)Impostazioni sulla privacy(?=($|"|<))', "$1"+"Inpostaçioìn da Privacy");
  d = r(d, '(^|="|>)Profilo(?=($|"|<))', "$1"+"Profî");
  d = r(d, '(^|="|>)Domande(?=($|"|<))', "$1"+"Domànde");
  d = r(d, '(^|="|>)Attività recenti(?=($|"|<))', "$1"+"Ativitæ reçénti");
  d = r(d, '(^|="|>)Suggerimenti per le Pagine(?=($|"|<))', "$1"+"Pàgine consegiæ");
  d = r(d, '(^|="|>)Rimuovi anteprima(?=($|"|<))', "$1"+"Scancélla l'anteprìmma");
  d = r(d, '(^|="|>)([^<"]+), aggiungi un commento\.\.\.(?=($|"|<))', "$1"+"$2"+", scrîvi 'n coménto...");
  d = r(d, '(^|="|>)Cerca(?=($|"|<))', "$1"+"Çèrca");
  d = r(d, '(^|="|>)Cerca persone, luoghi e oggetti(?=($|"|<))', "$1"+"Çèrca génte, pòsti e cöse");
  d = r(d, '(^|="|>)Mostra tutti(?=($|"|<))', "$1"+"Véddili tùtti");
  d = r(d, '(^|="|>)Vedi tutte le richieste di amicizia(?=($|"|<))', "$1"+"Védde tùtte e domànde d'amicìçia");
  d = r(d, '(^|="|>)Vedi tutti i messaggi(?=($|"|<))', "$1"+"Véddi tùtti i mesàggi");
  d = r(d, '(^|="|>)Vedi tutte le notifiche(?=($|"|<))', "$1"+"Véddi tùtte e notìçie");
  d = r(d, '(^|="|>)Vedi dettagli amicizia(?=($|"|<))', "$1"+"Detàlli de l'amicìçia");
  d = r(d, '(^|="|>)Visualizza altro(?=($|"|<))', "$1"+"Véddi de ciù");
  d = r(d, '(^|="|>)Visualizza traduzione(?=($|"|<))', "$1"+"Véddi a traduçión");
  d = r(d, '(^|="|>)Invia(?=($|"|<))', "$1"+"Mànda");
  d = r(d, '(^|="|>)Invia un nuovo messaggio(?=($|"|<))', "$1"+"Mànda 'n mesàggio");
  d = r(d, '(^|="|>)Condividi(?=($|"|<))', "$1"+"Condivìddi");
  d = r(d, '(^|="|>)ORDINA(?=($|"|<))', "$1"+"ÓRDINA");
  d = r(d, '(^|="|>)Sponsorizzate(?=($|"|<))', "$1"+"Publiçitæ");
  d = r(d, '(^|="|>)Stato(?=($|"|<))', "$1"+"Stæto");
  d = r(d, '(^|="|>)Iscriviti alla Pagina(?=($|"|<))', "$1"+"Iscrîvite a-a Pàgina");
  d = r(d, '(^|="|>)Aggiornamenti(?=($|"|<))', "$1"+"Iscriçioìn");
  d = r(d, '(^|="|>)Gruppi suggeriti(?=($|"|<))', "$1"+"Grùppi Sugerîi");
  d = r(d, '(^|="|>)Tagga amici(?=($|"|<))', "$1"+"Identìfica i amîxi");
  d = r(d, '(^|="|>)Condizioni(?=($|"|<))', "$1"+"Tèrmini");
  d = r(d, '(^|="|>)Diario(?=($|"|<))', "$1"+"Lìnia do ténpo");
  d = r(d, '(^|="|>)(<a [^>]+><abbr [^>]+>[^<]+</abbr></a>) nei pressi di (<a [^>]+>[^<]+</a>)(?=($|"|<))', "$1"+"$2"+" vexìn a "+"$3");
  d = r(d, '(^|="|>)Notizie principali(?=($|"|<))', "$1"+"Stöie ciù bélle");
  d = r(d, '(^|="|>)Non seguire più il post(?=($|"|<))', "$1"+"No segoî ciù o Post");
  d = r(d, '(^|="|>)Non mi piace più(?=($|"|<))', "$1"+"No me piâxe ciù");
  d = r(d, '(^|="|>)Aggiorna informazioni(?=($|"|<))', "$1"+"Agiórna e informaçioìn");
  d = r(d, '(^|="|>)Stato(?=($|"|<))', "$1"+"Agiórna o Stæto");
  d = r(d, '(^|="|>)Use Facebook come:(?=($|"|<))', "$1"+"Adêuvia Facebook cómme:");
  d = r(d, '(^|="|>)View 1 comment(?=($|"|<))', "$1"+"Véddi 1 coménto");
  d = r(d, '(^|="|>)Mostra tutti e ([0-9,]+) i commenti(?=($|"|<))', "$1"+"Véddi tùtti i "+"$2"+" coménti");
  d = r(d, '(^|="|>)Foto bacheca(?=($|"|<))', "$1"+"Föto da Miâgia");
  d = r(d, '(^|="|>)A cosa stai pensando\\?(?=($|"|<))', "$1"+"E cöse ti gh'æ in quélla tésta?");
  d = r(d, '(^|="|>)Scrivi un commento\.\.\.(?=($|"|<))', "$1"+"Scrîvi 'n  coménto...");
  d = r(d, '(^|="|>)Ieri(?=($|"|<))', "$1"+"Vêi");
  d = r(d, '(^|="|>)Ieri alle ([^<"]+)(?=($|"|<))', "$1"+"Vêi a-e "+"$2");
  d = r(d, '(^|="|>)<span[^>]+>Ti piace\.</span>(?=($|"|<))', "$1"+"Te piâxe quésto.");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio(?=($|"|<))', "$1"+"$2"+" Zenâ");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zenâ a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zenâ "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)gennaio(?=($|"|<))', "$1"+"Zenâ");
  d = r(d, '(^|="|>)([0-9]{1,2}) gennaio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Zenâ "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio(?=($|"|<))', "$1"+"$2"+" Frevâ");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Frevâ a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Frevâ "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)febbraio(?=($|"|<))', "$1"+"Frevâ");
  d = r(d, '(^|="|>)([0-9]{1,2}) febbraio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Frevâ "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo(?=($|"|<))', "$1"+"$2"+" Màrso");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Màrso a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Màrso "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)marzo(?=($|"|<))', "$1"+"Màrso");
  d = r(d, '(^|="|>)([0-9]{1,2}) marzo ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Màrso "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile(?=($|"|<))', "$1"+"$2"+" Arvî");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Arvî a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Arvî "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)aprile(?=($|"|<))', "$1"+"Arvî");
  d = r(d, '(^|="|>)([0-9]{1,2}) aprile ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Arvî "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio(?=($|"|<))', "$1"+"$2"+" Màzzo");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Màzzo a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Màzzo "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)maggio(?=($|"|<))', "$1"+"Màzzo");
  d = r(d, '(^|="|>)([0-9]{1,2}) maggio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Màzzo "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno(?=($|"|<))', "$1"+"$2"+" Zùgno");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zùgno a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Zùgno "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)giugno(?=($|"|<))', "$1"+"Zùgno");
  d = r(d, '(^|="|>)([0-9]{1,2}) giugno ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Zùgno "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio(?=($|"|<))', "$1"+"$2"+" Lùggio");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Lùggio a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Lùggio "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)luglio(?=($|"|<))', "$1"+"Lùggio");
  d = r(d, '(^|="|>)([0-9]{1,2}) luglio ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Lùggio "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto(?=($|"|<))', "$1"+"$2"+" Agòsto");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Agòsto a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Agòsto "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)agosto(?=($|"|<))', "$1"+"Agòsto");
  d = r(d, '(^|="|>)([0-9]{1,2}) agosto ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Agòsto "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre(?=($|"|<))', "$1"+"$2"+" Setémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Setémbre a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Setémbre "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)settembre(?=($|"|<))', "$1"+"Setémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) settembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Setémbre "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre(?=($|"|<))', "$1"+"$2"+" Òtôbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Òtôbre a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Òtôbre "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)ottobre(?=($|"|<))', "$1"+"Òtôbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) ottobre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Òtôbre "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre(?=($|"|<))', "$1"+"$2"+" Novémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novémbre a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Novémbre "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)novembre(?=($|"|<))', "$1"+"Novémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) novembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Novémbre "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre(?=($|"|<))', "$1"+"$2"+" Dexémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Dexémbre a-e "+"$3");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre ([0-9]{4}) alle ore ([0-9:.apm]+)(?=($|"|<))', "$1"+"$2"+" Dexémbre "+"$3"+" a-e "+"$4");
  d = r(d, '(^|="|>)dicembre(?=($|"|<))', "$1"+"Dexémbre");
  d = r(d, '(^|="|>)([0-9]{1,2}) dicembre ([0-9]{4})(?=($|"|<))', "$1"+"$2"+" Dexémbre "+"$3");
  d = r(d, '(^|="|>)lunedi alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Lunedì a-e "+"$2");
  d = r(d, '(^|="|>)lunedi(?=($|"|<))', "$1"+"Lunedì");
  d = r(d, '(^|="|>)martedì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Martedì a-e "+"$2");
  d = r(d, '(^|="|>)martedì(?=($|"|<))', "$1"+"Martedì");
  d = r(d, '(^|="|>)mercoledì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Mercoledì a-e "+"$2");
  d = r(d, '(^|="|>)mercoledì(?=($|"|<))', "$1"+"Mercoledì");
  d = r(d, '(^|="|>)giovedi alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Zéuggia a-e "+"$2");
  d = r(d, '(^|="|>)giovedi(?=($|"|<))', "$1"+"Zéuggia");
  d = r(d, '(^|="|>)venerdì alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Venerdì a-e "+"$2");
  d = r(d, '(^|="|>)venerdì(?=($|"|<))', "$1"+"Venerdì");
  d = r(d, '(^|="|>)sabato alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Sàbbo a-e "+"$2");
  d = r(d, '(^|="|>)sabato(?=($|"|<))', "$1"+"Sàbbo");
  d = r(d, '(^|="|>)domenica alle ([0-9:.apm]+)(?=($|"|<))', "$1"+"Doménega a-e "+"$2");
  d = r(d, '(^|="|>)domenica(?=($|"|<))', "$1"+"Doménega");
  d = r(d, '(^|>)link(?=($|<))', "$1"+"'n colegaménto");
  d = r(d, '(^|>)foto(?=($|<))', "$1"+"'na föto");
  d = r(d, '(^|>)post pubblicato(?=($|<))', "$1"+"'na diciaraçión");
  d = r(d, '(^|>)stato(?=($|<))', "$1"+"'n stæto");
  d = r(d, '(^|>)aggiornamento di stato(?=($|<))', "$1"+"agiornaménto do stæto");
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

// This was (only) needed to handle updates to time stamps
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
  else if (node.nodeType == document.TEXT_NODE) { // time stamps only
    document.body.removeEventListener( 'DOMNodeInserted', listen_for_add, false );
    node.data = translate(node.data);
    document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  }
}

function initme()
{
  document.body.addEventListener( 'DOMNodeInserted', listen_for_add, false );
  // document.body.addEventListener( 'DOMCharacterDataModified', listen_for_change, false );
  document.body.innerHTML = translate(document.body.innerHTML);
}

document.addEventListener( "DOMContentLoaded", initme, false);
