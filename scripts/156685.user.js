// ==UserScript==
// @name           AvaxHome Hide It
// @namespace      HabDichLieb
// @description    Hides content matching a keyword and a URL
// @version        0.1
// @license        Public Domain
// @include        http://avaxhome.ws/*
// @include        http://avaxsearch.com/*
// @include        http://www.avaxhome.ws/*
// @include        http://avaxhome.org/
// ==/UserScript==
//
// Todo:
// - Hide already visited news entries
// - Hide news of certain authors
// - Editor
// - Store lists in local cookies

GM_log("Hostname: " + window.location.hostname);
GM_log("URL: " + window.location.href);

var hide_blacklisted_users = [
  "xxxxx"
];

var hide_titles_music = [
  "Joe Lovano", "The Doobie Brothers", "Dean Martin", "Eddie Money", "Stanley Black",
  "Warren Bernhardt", "Céline Bonacina Trio", "Beggars Opera", "The Moody Blues",
  "Echobrain", "The Modern Jazz Quartet", "Mutiny Within", "Split Point", "Joan Guinjoan",
  "Chick Corea", "Nino Portelli", "Holy Soldier", "The Stan Getz Quartet", "Stryper",
  "Fen", "Luz Casal", "Steve Winwood", "Kevin Toney 3", "The Michael Schenker Group",
  "Jimmy Scott", "Steve Hackett", "Steven Wilson", "Lake Of Tears", "Edge Of Sanity",
  "Palais Schaumburg", "Goombay Dance Band", "Newsted", "Vandroya", "Zodiac", "Ourobiguous",
  "Masada", "Jon Eardley", "Joe Pass", "Miles Davis", "Sarah Vaughan", "Kaotik"
];

var hide_titles_ebooks = [
  "Sexual Abuse", "Motorhead", "Русская армия", "Вермахт", "Blitzkrieg", "Adolf Hitler",
  "Waffen-SS", "Drupal", "video2brain - OS X 10.8", "Alexander the Great", "video2brain - Aperture"
];

// (Windows/MacOSX), | MacOSX |
var hide_titles_software = [
  "Learn Japanese", "Learn Korean", "Learn Kantonese", "ConvertXtoDVD", "JamVOX", "Learn Thai",
  "Xilisoft HD Video Converter", "Xilisoft DVD Ripper Ultimate", "Xilisoft Video Converter Ultimate",
  "Aimersoft Video Converter Ultimate", "iSkysoft iMedia Converter Deluxe", "Symantec Encryption Desktop",
  "MagicRar Studio", "Raise Data Recovery", "Learn Spanish", "ArcSoft TotalMedia Extreme",
  "Coollector Movie Database", "Lazesoft Recovery Suite"
];

var hide_titles_magazines = [
  "War Monthly", "Trasporto", "MOVIE Time Magazine", "Onze Luchtmacht", "Playboy",
  "XBIZ Premiere", "Odkrywca", "CSC Trasporti", "Penthouse", "TS IL Domani dello Sport",
  "France Football", "Le Journal de Mickey", "Femme Actuelle", "Point de Vue",
  "Harper's Bazaar", "After the Battle", "Young Animal", "Yangu Animaru", "Kicker Magazin",
  "Tattoo is Pain", "Airfix Club", "Tank Magazine", "Bikes & Beauties", "Panzer Magazine",
  "Anti-Age Magazine", "Art Actuel", "Kanwa Defense Review", "Mad Movies", "Outside",
  "Military in Scale", "Model Airplane News", "Il Giornale Delle Guidicarie", "Macchine Trattori",
  "Tatuagem Magazine", "Maxim ", "Marie France", "Guns Magazine", "Paris Capitale",
  "DSS Magazine", "FHM India", "Marie Claire", "Ici Paris", "Gala", "Young Jump",
  "Yangu Jiyanpu", "Télé 7", "L'Express", "Tele - Die TV-Illustrierte der Schweiz",
  "Lingerie", "La Settimana Enigmistica", "Inked", "Premier Guitar", "Biba", "Zoo",
  "Military History Monthly", "Il Regno", "H para Hombres", "Il Gazzettino Nuovo",
  "Fly Model", "Armor Models", "Scale Aircraft Modelling", "Tamiya Model Magazine International",
  "Aranysas", "Settimana", "Racer X Illustrated", "TMW Magazine", "La Revue du Vin de France",
  "Fashion Daily News", "Shooting Industry", "Grazia", "Hobby Historie", "Легендарные самолеты",
  "Любимая дача", "Military Modelling", "Sky Model", "American Philatelist", "Gitarre und Bass",
  "Wine Pass", "Io e il Mio Bambino", "Mac Format", "Military Illustrated Modeller",
  "Diva e Donna", "Japanimando", "MacBible", "Morze Statki i Okrety", "Gamecca Magazine",
  "MacWelt", "Ciak", "iPad Life Magazine", "Klassiker der Luftfahrt", "Моделист-Конструктор",
  "FilmTV", "Wirtschafts Blatt", "Vero TV", "Torino Affari", "Scandali", "Materia Prima",
  "L'Unione Sarda", "L'Unione Sport", "Flugzeug Classic", "Mac Life Magazine", "Cancer Cell",
  "Immunity", "MacchineMotori", "Irrésistible Auto", "Girls Gone Wild Magazine", "Foot",
  "Le Guide de Sole - Legge di stabilitá", "Oroscopissimi", "Aviation Week", "Art Croissance",
  "Le Monde du Camping Car", "L' Esperto risponde", "Le guide de Il Sole", "Modelleisenbahner",
  "MIBA Die Eisenbahn im Modell", "Le Foot Lyon", "ModelsMania", "Chiens Passion", "Girlpop",
  "Steel Masters", "Ордена Российской Империи", "Dell Horoscope", "L'Espresso", "Donna Moderna",
  "CHIP Italia", "Sound And Vision", "Plastic Planet", "Vivi Roma", "De Fil En Deco", "Pipers",
  "Classic Yacht", "Santé Revue Séniors", "Internazionale", "Star Secret", "Di Più", "Visto",
  "Атлас. Целый мир в твоих руках", "Novella 2000", "Fama Gossip e non solo", "Valka",
  "La Mia Prima Reflex", "Modell und Technik", "iCreate", "C'est Réel", "Drag Illustrated",
  "FHM Special", "World Aviation", "Мировая авиация", "Alternatives Internationales",
  "A Sua Immagine", "il Mio Computer Idea!e", "Letectvi + Kosmonautika", "Star Magazine",
  "SportWEEK", "Billboard", "Vogue", "MAXIM Russia", "Vip", "FRONT", "Model Wings", "Risk",
  "CorrierECONOMIA", "Nous Deux", "Notre Temps", "Солнечная система", "Русские танки",
  "Moto Journal", "Motor Mundial", "Generation Trail", "Boss Style", "Vanity Fair", "Us Weekly",
  "Marianne", "France Dimanche", "L'Informaticien", "Lanfeust", "Public", "FHM Spаin",
  "RadioRivista", "Model Military International", "Micro Computer", "Auto Fan", "CAPA",
  "Schweizer Illustrierte", "Triathlète", "Cosmopolitan", "Les inRocKuptibles", "OK!",
  "Le Spectacle du Monde", "Como Dios Nos Trajo Al Mundo", "Le Point", "Diez minutos",
  "TS IL Domani dello Sport", "DueRuote", "Donna Al Top", "inBici", "Il Brivido Sportivo",
  "Grimper", "L'Equipe Magazine", "Investissement Conseils", "iGo London", "Newlook",
  "Giffoni Experience", "Industria Chimica e Farmaceutica", "Il Re Degli Affari",
  "Libere, Il Quaderno", "Valeurs Actuelles", "France Japon Eco", "Фронтовая иллюстрация",
  "Panzerwaffe", "Sapervivere", "Riza Psicosomatica", "Vero Salute", "Cuore Azzurro",
  "Снайпер РККА в Осеннем Камуфляже", "AtlasOrbis", "MotorMedia", "American Handgunner",
  "La Lettura", "Xtreme RC Cars", "The New Yorker", "Oggi", "IL Mondo", "Gossip", "Gente",
  "VFV Tecnica Antincendio e Protezione Civile", "Confluenze", "il Punto", "50&Piu",
  "Escaparate", "Cosas", "Cineplex", "Select Antipolis", "Zut!", "Il Sommelier",
  "L'ordinateur individuel Hors Série", "Aviation International News", "Plus 24",
  "Il Venerdí di Repubblica", "Panorama Italia", "GQ British", "GQ Italia", "Maquinas",
  "Il Legno", "All About Space", "TS IL Domani dello Sport", "ELSIANER", "XXL ",
  "Lire", "L'Uomo Vogue Italia", "Boat International", "Susanna", "Import Tuner",
  "Science & Vie: Guerres & Histoire", "Nuts UK", "Military in Scale", "Girlys",
  "iPhone Life Magazine", "Viversani e Belli", "Télé Star", "TITANIUMGIRLZ", "Cycle Canada",
  "Quando c'è la salute", "X360 Magazine", "Moto Crampons", "Option Moto", "Wider",
  "Stanford Magazine", "Монеты и Купюры мира", "Rivista delle Tecnologie Alimentari",
  "TV Sorrisi e Canzoni", "Chopper On", "Revista Eden", "Smartshe Magazine", "EON Magazine",
  "Photographers Companion", "Guida Pratica per le Aziende", "Guida al Lavoro", "diTutto",
  "Cinema Teaser", "Conseils des Notaires", "Avions"
];

if (typeof String.prototype.contains === 'undefined') {
  String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }

// Helpers.

function getId(id, parent) {
  if (! parent)
    return document.getElementById(id);

  return parent.getElementById(id);      
}

function getTag(name, parent) {
  if (! parent)
    return document.getElementsByTagName(name);

  return parent.getElementsByTagName(name);
}

// Get selected text.

function getSelection() {
  if (window.getSelection)
    return window.getSelection();

  if (document.getSelection)
    return document.getSelection();

  if (document.selection)
    return document.selection.createRange().text;

  return null;
}

function stringMatchesArrayElement(a, str) {
  for (var i=0; i<a.length; i++) {
    str = str.replace(/&amp;/g, '&'); 
    if (str.toLowerCase().contains(a[i].toLowerCase())) {
      return true;
    }
  }

  return false;
}

function convertArrayToLowerCase(arr) {

  return false;
}

// Hide news entries if they match a given keyword.

function hideNewsEntryIfListed(arr) {
  var news = document.getElementsByClassName('news');
  if (news.length > 0) {
    for (var i=0; i<news.length; i++) {
      var links = document.evaluate('div[@class="title"]/h1/a', news[i], null,
                             XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if (links.snapshotLength > 0) {
        var link = links.snapshotItem(0);

        GM_log("link.html = " + link.innerHTML);
        GM_log("link.href = " + link.href);

        if (stringMatchesArrayElement(arr, link.innerHTML)) {
          news[i].innerHTML = "Hidden: <a style=\"color: #999999\" href=\"" +
                              link.href + "\">" + link.innerHTML + "</a><br><br>";
          GM_log("-> hidden");
        }
      }
    }
  } else {
    GM_log("No news entries!");
    return false;
  }

  return true;
}

// Removes all horizontal rules (hr tags between news entries).
// <div class='hr'></div> before news entry or banner.

function removeAllHorizontalRules() {
  //var hrs = document.getElementsByClassName('hr');
  //if (hrs.length > 0) {
  //  //alert(hrs.length);
  //  for (var i=0; i<hrs.length; i++) {
  //    //hrs[i].parentNode.removeChild(hrs[i]);
  //  }
  //}

  var hrs = document.evaluate('div[@class="hr"]',
                            document.getElementById("main-info-container"), null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  GM_log("hr divs found: " + hrs.snapshotLength);
  if (hrs.snapshotLength > 0) {
    for (var i=0; i<hrs.snapshotLength; i++) {
      var hrDiv = hrs.snapshotItem(i);
      hrDiv.parentNode.removeChild(hrDiv);
      GM_log("hr div removed");
    }
  }
}

function removeBannersInContentArea() {

/*
<center>
<table cellspacing="15" cellpadding="0" border="0">
<tbody><tr>
<td><div style="" class="banner"><!-- BEGIN STANDARD TAG - 300 x 250 - Avaxhome.ws: 300*250_ALL - DO NOT MODIFY -->

<iframe width="300" scrolling="NO" height="250" frameborder="0" src="http://creative.xtendmedia.com/proxy/matomymediaproxy.html?ad_type=ad&amp;ad_size=300x250&amp;section=3730953" marginheight="0" marginwidth="0" class="htrrbufejjqopwylrthf"/>

<!-- END TAG --></div></td>
<td><div style="" class="banner"><!-- BEGIN JS TAG - [mng - Avaxhome.ws] - ALL - RS 70/30 < - DO NOT MODIFY -->
<script type="text/javascript" src="http://an.z5x.net/ttj?id=1116946&amp;size=300x250"/>
<!-- END TAG --></div></td>
</tr>
</tbody></table>
</center>
*/

  var bannerNode = document.evaluate('./center/table[@cellspacing="15"]/' +
                                     'tbody/tr/td/div[@class="banner"]',
                                     document.getElementById("main-info-container"), null,
                                     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (bannerNode.snapshotLength > 0) {
    bannerNode = bannerNode.snapshotItem(0); // div
    bannerNode = bannerNode.parentNode;      // td
    bannerNode = bannerNode.parentNode;      // tr
    bannerNode = bannerNode.parentNode;      // tbody
    bannerNode = bannerNode.parentNode;      // table
    bannerNode = bannerNode.parentNode;      // center
    //GM_log("banner: " + bannerNode);
    //GM_log("banner.html: " + bannerNode.innerHTML);
    //GM_log("banner.parent: " + bannerNode.parentNode);

    var par = bannerNode.parentNode;
    var prev;

    while (true) {                                    // Also remove all br tags before the table (center tag).
      prev = bannerNode.previousElementSibling;
      if (prev.nodeName == "BR")
        par.removeChild(prev);
      else
        break;
    }

    par.removeChild(bannerNode);

    GM_log("banner removed");
  }
  else {
    GM_log("banner missing");
  }

// Remove content above table with banner.

  //<div class="hr"/>
  //<div align="left">
  //<strong>Best Internet Links</strong>
  //<br/>
  //...

  var bestinternetlinks = document.evaluate('div[@align="left"]//strong',
                            document.getElementById("main-info-container"), null,
                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (bestinternetlinks.snapshotLength > 0) {
    var bestilink = bestinternetlinks.snapshotItem(0);

    if (bestilink.innerHTML == "Best Internet Links") {
      var divNode = bestilink.parentNode;
      divNode.parentNode.removeChild(divNode);

      GM_log("best internet links removed");
    }
  }
  else {
    GM_log("best internet links missing");
  }
}


if ( (location.pathname.contains("/music/pages/")) ||
     (location.pathname == "/music/") ||                   // Not "contains": single articles use same prefix.
     (location.pathname == "/music") ) {
  GM_log("MUSIC section");

  removeBannersInContentArea();
  removeAllHorizontalRules();
  hideNewsEntryIfListed(hide_titles_music);

} // End: MUSIC section.


if ( (location.pathname.contains("/software/pages/")) ||
     (location.pathname == "/software/") ||                // Not "contains": single articles use same prefix.
     (location.pathname == "/software") ) {
  GM_log("SOFTWARE section");

  removeBannersInContentArea();
  removeAllHorizontalRules();
  hideNewsEntryIfListed(hide_titles_software);

} // End: SOFTWARE section.

if ( (location.pathname.contains("/ebooks/pages/")) ||
     (location.pathname == "/ebooks/") ||                  // Not "contains": single articles use same prefix.
     (location.pathname == "/ebooks") ) {
  GM_log("EBOOKS section");

  removeBannersInContentArea();
  removeAllHorizontalRules();
  hideNewsEntryIfListed(hide_titles_ebooks);

} // End: EBOOKS section.


if ( (location.pathname.contains("/magazines/pages/")) ||
     (location.pathname == "/magazines/") ||               // Not "contains": single articles use same prefix.
     (location.pathname == "/magazines") ) {
  GM_log("MAGAZINES section");

  removeBannersInContentArea();
  removeAllHorizontalRules();
  hideNewsEntryIfListed(hide_titles_magazines);

} // End: MAGAZINES section.

