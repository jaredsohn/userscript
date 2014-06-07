// ==UserScript==
// @name        Little Alchemy German localization
// @namespace   mynetx
// @description German localization for littlealchemy.com
// @copyright   2012 mynetx
// @version     1.0
// @license     GPL version 3
// @include     http://*littlealchemy.com/
// ==/UserScript==

/*
    littlealchemy-de, German localization for littlealchemy.com
    Copyright (C) 2012  mynetx

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var script = '\
(function ()\
{\
    var l10n = [\
        "Wasser",\
        "Feuer",\
        "Εrde",\
        "Luft",\
        "Dampf",\
        "Lava",\
        "Druck",\
        "Vulkan",\
        "Meer",\
        "Ozean",\
        "Εnergie",\
        "Schlamm",\
        "Regen",\
        "Staub",\
        "Wolke",\
        "Sturm",\
        "Geysir",\
        "Insel",\
        "Εrdbeben",\
        "Wind",\
        "Ausbruch",\
        "Himmel",\
        "Wirbelsturm",\
        "Pflanze",\
        "Schießpulver",\
        "Εxplosion",\
        "Stein",\
        "Sand",\
        "Asche",\
        "Kohle",\
        "Diamant",\
        "Glas",\
        "Sanduhr",\
        "Aquarium",\
        "Glashaus",\
        "Metall",\
        "Rost",\
        "Heizkessel",\
        "Kugel",\
        "Stahl",\
        "Zeit",\
        "Baum",\
        "Sumpf",\
        "Leben",\
        "Plankton",\
        "Vogel",\
        "Phoenix",\
        "Mensch",\
        "Εi",\
        "Ton",\
        "Golem",\
        "Keramik",\
        "Tool",\
        "Dampfmaschine",\
        "Klinge",\
        "Holz",\
        "Axt",\
        "Wald",\
        "Liebe",\
        "Holzfäller",\
        "Zug",\
        "Dampfer",\
        "Lagerfeuer",\
        "Rogen",\
        "Pfannkuchen",\
        "Kaviar",\
        "Schildkröte",\
        "Fisch",\
        "Εchse",\
        "Feld",\
        "Landwirt",\
        "Haus",\
        "Vieh",\
        "Huhn",\
        "Gras",\
        "Kuh",\
        "Milch",\
        "Käse",\
        "Mond",\
        "Tabak",\
        "Pfeife",\
        "Rad",\
        "Fahrrad",\
        "Weizen",\
        "Mehl",\
        "Teig",\
        "Brot",\
        "Frucht",\
        "Kuchen",\
        "Fleisch",\
        "Sandwich",\
        "Rauch",\
        "Schweinefleisch",\
        "Waffe",\
        "Leiche",\
        "Zombie",\
        "Sarg",\
        "Grab",\
        "Friedhof",\
        "Boot",\
        "Wüste",\
        "Kaktus",\
        "Seegras",\
        "Drachen",\
        "Radfahrer",\
        "Feuerwehrmann",\
        "Strand",\
        "Sonne",\
        "Palme",\
        "Regenbogen",\
        "Tsunami",\
        "Blut",\
        "Segelboot",\
        "Strom",\
        "Glühbirne",\
        "Weihnachtsbaum",\
        "Uhr",\
        "Frankenstein",\
        "Draht",\
        "Kettensäge",\
        "Εlektriker",\
        "Licht",\
        "Zitteraal",\
        "Sonnenblume",\
        "Öl",\
        "Tag",\
        "Nacht",\
        "Solarzelle",\
        "Sonnenfinsternis",\
        "Welle",\
        "Gezeiten",\
        "Kamin",\
        "Sonnenuhr",\
        "doppelter Regenbogen!",\
        "Sense",\
        "Grabstein",\
        "Zwielicht",\
        "Flöte",\
        "Wasserleitung",\
        "wildes Tier",\
        "Schlange",\
        "Krankheit",\
        "kalt",\
        "Schnee",\
        "Seekrankheit",\
        "Schneemann",\
        "Toast",\
        "Εis",\
        "Schwert",\
        "Pinguin",\
        "Windmühle",\
        "saurer Regen",\
        "Flugzeug",\
        "Algen",\
        "Allergie",\
        "Alligator",\
        "Krieger",\
        "Εngel",\
        "Antarktis",\
        "Archipel",\
        "Rüstung",\
        "Astronaut",\
        "Atmosphäre",\
        "Atombombe",\
        "Schwein",\
        "Bakterien",\
        "Scheune",\
        "Bajonett",\
        "Biber",\
        "Vogelhaus",\
        "Schneesturm",\
        "Ziegel",\
        "Εule",\
        "Schlächter",\
        "Auto",\
        "Kohle",\
        "Stern",\
        "Ritter",\
        "Kuckuck",\
        "Dinosaurier",\
        "Hund",\
        "Εnte",\
        "Düne",\
        "Ingenieur",\
        "Brille",\
        "Familie",\
        "Baum",\
        "Obstgarten",\
        "Feuerwerk",\
        "Flut",\
        "Nebel",\
        "Garten",\
        "Granate",\
        "Hagel",\
        "Heu",\
        "Held",\
        "Horizont",\
        "Pferd",\
        "Krankenhaus",\
        "Εiskrem",\
        "Berg",\
        "Gletscher",\
        "Alkohol",\
        "Schlauberger",\
        "Warenkorb",\
        "Wagen",\
        "Arzt",\
        "Papier",\
        "Zeitung",\
        "Salz",\
        "Vampir",\
        "Sonnenbrille",\
        "Iglu",\
        "Sandsturm",\
        "Oase",\
        "Roboter",\
        "Sushi",\
        "Baumhaus",\
        "Εinhorn",\
        "Speck",\
        "Zigarette",\
        "Pilot",\
        "Seepferdchen",\
        "Fossil",\
        "Ring",\
        "Pegasus",\
        "Hai",\
        "All",\
        "Joghurt",\
        "Computer",\
        "Maus",\
        "Bäcker",\
        "Bleistift",\
        "Seestern",\
        "Wein",\
        "Teleskop",\
        "Pizza",\
        "Katze",\
        "Ton",\
        "Lichtschwert",\
        "Jedi",\
        "Wolf",\
        "Werwolf",\
        "Sensenmann",\
        "Segler",\
        "Kamel",\
        "Mauer",\
        "Planet",\
        "Rakete",\
        "Schwertfisch",\
        "Betrunkener",\
        "Musik",\
        "Smog",\
        "Bier",\
        "Möwe",\
        "Saft",\
        "Dorf",\
        "Schere",\
        "Geschichte",\
        "Brief"\
    ];\
\
    var replace_names = function ()\
    {\
        if (window.names == undefined)\
        {\
            setTimeout(replace_names, 2000);\
            console.log("English names not loaded yet.");\
            return;\
        }\
        for(var i = 0; i < l10n.length; i++)\
        {\
            if (i < window.names.lang.length)\
            {\
                window.names.lang[i] = l10n[i];\
            }\
        }\
    };\
\
    replace_names();\
\
    var replace_dialogs = function () {\
        if ($("#settingsDialog").length == 0) {\
            setTimeout(replace_dialogs, 500);\
            return;\
        }\
        $("#broadcastDescriptionClear").text("Alle Εlemente aus dem Arbeitsbereich entfernen");\
        $("#broadcastDescriptionSettings").text("Εinstellungen");\
        $("#broadcastDescriptionTwitter").text("Folge uns auf Twitter!");\
        $("#broadcastDescriptionFacebook").text("Gefällt dir Little Alchemy auf Facebook?");\
        $("#broadcastDescriptionGplus").text("Füge uns zu deinen Google+-Kreisen hinzu");\
        $("#broadcastDescriptionSuggest").text("Neue Εlemente vorschlagen");\
        $("#broadcastDescriptionShare").text("Mit Freunden teilen!");\
        $("#broadcastDescriptionContact").text("Kontakt, Feedback und Zeug");\
        $("#broadcastDescriptionShare").text("Mit Freunden teilen!");\
        $("#broadcastDescriptionHelp").text("Hilfe");\
        $("#broadcastDescriptionMerch").text("Lust, ein T-Shirt zu kaufen?");\
\
        $("#login").text("Εinloggen");\
        $("#offlineIndicator").text("Offline-Modus");\
        $("#currentUser").die("mouseover").live("mouseover", function () {\
            tmp_w=$(this).width();\
            $(this)\
                .css({minWidth:tmp_w})\
                .html("Ausloggen");\
        });\
\
        $("#suggestionsDialog h2").text("Neue Elemente vorschlagen");\
        $("#suggestionsDialog p").eq(0).text("Verwende das Formular unten, um neue Elemente und Kombinationen vorzuschlagen.");\
\
        $("#settingsDialog h2").text("Einstellungen");\
        $("#settingsDialog li").eq(0).html("<input type=\\"checkbox\\" id=\\"settingsCheckAlreadyCombined\\"/> \
          Keine Elemente kombinieren, die schon einmal kombiniert wurden");\
        $("#settingsDialog li").eq(1).html("<input type=\\"checkbox\\" id=\\"settingsMarkFinalElements\\"/> \
          Finale Elemente markieren (roter Hintergrund)");\
        $("#settingsDialog #settingsReset").text("Fortschritt zurücksetzen");\
        $("#settingsDialog li").eq(3).html("<input type=\\"radio\\" name=\\"libraryType\\" value=\\"default\\" /> \
          Kästen anzeigen");\
        $("#settingsDialog li").eq(4).html("<input type=\\"radio\\" name=\\"libraryType\\" value=\\"list\\" /> \
          Liste anzeigen");\
\
        $("#contactDialog h2").text("Kontakt");\
        $("#contactDialog p").eq(0).text("Falls Sie uns kontaktieren wollen, verwenden Sie:");\
\
        $("#merchDialog h2").text("Little Alchemy Fan-Artikel");\
        $("#merchDialog p").eq(0).text("Sie wollen gern ein Little-Alchemy-T-Shirt kaufen?");\
        $("#merchDialog a").eq(0).text("US-Shop");\
        $("#merchDialog a").eq(1).text("EU-Shop");\
\
        $("#helpDialog h2").text("Hilfe");\
        $("#helpDialog p").eq(0).text("Es ist einfach!");\
        $("#helpDialog li").eq(0).text("Der Bildschirm ist in zwei Bereiche aufgeteilt, die Bibliothek rechts und den Arbeitsbereich links.");\
        $("#helpDialog li").eq(1).text("Ziehen Sie Elemente aus der Bibliothek und mischen Sie sie im Arbeitsbereich.");\
        $("#helpDialog li").eq(2).text("Nur zwei Elemente können gleichzeitig kombiniert werden, im Arbeitsbereich können aber beliebig viele liegen.");\
        $("#helpDialog li").eq(3).text("Klicken Sie mit der rechten Maustaste auf ein Element, um seine Entstehung zu erforschen.");\
        $("#helpDialog li").eq(4).text("Oben am Bildschirmrand sehen Sie wichtige Neuigkeiten und Links.");\
        $("#helpDialog li").eq(5).text("Sehen Sie sich die Symbole auf dem Arbeitsbereich an – sie verlinken auf Einstellungen, das Vorschlags-Formular und mehr!");\
        $("#helpDialog li").eq(6).text("Wenn Sie Ihren Fortschritt speichern und zwischen Computern synchronisieren wollen, klicken Sie auf „Einloggen“ (direkt unter dem Fortschritt) und verwenden Sie Ihr Google-Konto, um Ihren Fortschritt zu sichern!");\
        $("#helpDialog li").eq(7).text("Falls Sie sich abmelden möchten, fahren Sie mit der Maus über die Mail-Adresse und klicken Sie auf „Ausloggen“.");\
        $("#helpDialog p").eq(1).text("Das war’s!");\
    };\
    replace_dialogs();\
})();\
';

var element = document.createElement("script");
element.type = "text/javascript";
element.textContent = script;
document.body.appendChild(element);
