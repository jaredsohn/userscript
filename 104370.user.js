// ==UserScript==
// @name          GN-Premium: Galascan
// @namespace     http://tuxproject.de
// @description   fügt einen Link hinzu, der alle Mitglieder einer Galaxie per einfachem Klick S/E/M/G/N-scannt.
// @include       http://www.galaxy-network.de/game/uni.*
// @include       http://galaxy-network.de/game/uni.*
// ==/UserScript==


// ----------------------------------------------------------
// SCANTYP
// ----------------------------------------------------------
// mögliche Werte: "sektor", "unit", "gscan", mili", "news",
//                 "alles"
//
// Jeweils die höchste Ausbaustufe zählt!
// Habt ihr Miliscan geforscht, tragt hier "mili" ein, und ihr
// bekommt "S-E-M" als Links, "alles" bedeutet "S-E-G-N-M".
// Klar so weit? Gut!
var meinScantyp = "alles";

// ----------------------------------------------------------
// ANZEIGE
// ----------------------------------------------------------
// mögliche Werte: "lang", "kurz", "alles"
//
// Die "lange" Anzeige erscheint als Extrazeile in der Diplo-
// ansicht, die "kurze" Anzeige erscheint in der Kopfzeile
// der "Scans"-Spalte. Diese muss dafür in eurem Profil akti-
// viert werden!
var meineScananzeige = "lang";





// ----------------------------------------------------------
// AB HIER FINGER WEG

function XPath(Params) { return document.evaluate(Params, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

var offeneGalaxie = false;
var tableID = 0;

if (meineScananzeige != "kurz") {
    // Langanzeige geht bei offenen Galaxien nicht, danke an Bautram für den Hinweis
    if (!XPath("//td[@width='160']").snapshotItem(0)) {
        // alert("offene Galaxie");
        meineScananzeige = "kurz";
        offeneGalaxie = true;
    }
}

if (offeneGalaxie)
    tableID = 1;
else
    tableID = XPath("//form[@name='vG']/center[2]/table/tbody/tr/td/div/div/table/tbody/tr/td/div/table[2]/tbody/tr[2]/td/img").snapshotItem(0) ? 3 : 2;

var XPathSpielerliste = "//form[@name='vG']/center[2]/table/tbody/tr/td/div/div/table/tbody/tr/td/div/table[" + tableID + "]/tbody/tr";
var XPathDiplozeile = "//form[@name='vG']/center[2]/table/tbody/tr/td/div/div/table/tbody/tr/td/div/table[1]/tbody/tr[4]";
var XPathAntibot = "//form[@name='bildabfrage']";

if (meineScananzeige != "lang") {
    var scanspalte = XPath(XPathSpielerliste + "/td[6]"); // Spalte "Scans"
    if (!scanspalte.snapshotItem(0) && !XPath(XPathAntibot).snapshotItem(0)) {
        if (!offeneGalaxie) {
            alert("Du musst die Scananzeige in der Galaxieansicht aktivieren!\nSchalte um auf Langformat...");
            meineScananzeige = "lang";
        }
        else {
            // Langanzeige geht nicht, Kurzanzeige geht nicht. Brich ab.
            return false;
        }
    }
}

// Bau HTML-Code für Links:
var Gesamtscanlinks = "";
var Einzelscanlinks_lang = "";
var Einzelscanlinks_kurz = "";

var Scanlinks_S = "";
var Scanlinks_E = "";
var Scanlinks_G = "";
var Scanlinks_N = "";
var Scanlinks_M = "";

for (var i = 2; i <= XPath(XPathSpielerliste).snapshotLength; i++) {
    // beginne mit Zeile 2, Zeile 1 enthält die Überschriften
    
    thisElement = XPath(XPathSpielerliste + "[" + i + "]/td[1]");
    if (thisElement.snapshotItem(0)) {
        var koords = thisElement.snapshotItem(0).innerHTML;
        var regexGalanummer = /(\d{1,4}):/;
        var regexPlanet     = /<a href="[^"]+">(\d{1,2})/;
        var galanummer = regexGalanummer.exec(koords)[1];
        var planet     = regexPlanet.exec(koords)[1];

        Scanlinks_S += "window.open('http://www.galaxy-network.de/game/waves.php?action=Scannen&c1="+galanummer+"&c2="+planet+"&typ=sektor');";

        if (meinScantyp == "unit" || meinScantyp == "mili" || meinScantyp == "alles") {
            Scanlinks_E += "window.open('http://www.galaxy-network.de/game/waves.php?action=Scannen&c1="+galanummer+"&c2="+planet+"&typ=einheit');";
        }
        if (meinScantyp == "gscan" || meinScantyp == "news" || meinScantyp == "alles") {
            Scanlinks_G += "window.open('http://www.galaxy-network.de/game/waves.php?action=Scannen&c1="+galanummer+"&c2="+planet+"&typ=gesch');";
        }
        if (meinScantyp == "news" || meinScantyp == "alles") {
            Scanlinks_N += "window.open('http://www.galaxy-network.de/game/waves.php?action=Scannen&c1="+galanummer+"&c2="+planet+"&typ=news&news_kampf=1&news_scan=1&news_spenden=1&news_galaxy=1&news_allianz=1&news_tausch=1');";
        }
        if (meinScantyp == "mili" || meinScantyp == "alles") {
            Scanlinks_M += "window.open('http://www.galaxy-network.de/game/waves.php?action=Scannen&c1="+galanummer+"&c2="+planet+"&typ=mili');";
        }
    }
}

Gesamtscanlinks = Scanlinks_S + Scanlinks_E + Scanlinks_G + Scanlinks_N + Scanlinks_M;
Einzelscanlinks_lang += "<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_S + "return false;\">Sektor</a>";
Einzelscanlinks_kurz += "<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_S + "return false;\">S</a>";

if (meinScantyp == "unit" || meinScantyp == "mili" || meinScantyp == "alles") {
    Einzelscanlinks_lang += " | <a style=\"cursor:pointer\" onclick=\"" + Scanlinks_E + "return false;\">Einheiten</a>";
    Einzelscanlinks_kurz += "-<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_E + "return false;\">E</a>";
}
if (meinScantyp == "gscan" || meinScantyp == "news" || meinScantyp == "alles") {
    Einzelscanlinks_lang += " | <a style=\"cursor:pointer\" onclick=\"" + Scanlinks_G + "return false;\">Geschütze</a>";
    Einzelscanlinks_kurz += "-<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_G + "return false;\">G</a>";
}
if (meinScantyp == "news" || meinScantyp == "alles") {
    Einzelscanlinks_lang += " | <a style=\"cursor:pointer\" onclick=\"" + Scanlinks_N + "return false;\">Nachrichten</a>";
    Einzelscanlinks_kurz += "-<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_N + "return false;\">N</a>";
}
if (meinScantyp == "mili" || meinScantyp == "alles") {
    Einzelscanlinks_lang += " | <a style=\"cursor:pointer\" onclick=\"" + Scanlinks_M + "return false;\">Militär</a>";
    Einzelscanlinks_kurz += "-<a style=\"cursor:pointer\" onclick=\"" + Scanlinks_M + "return false;\">M</a>";
}

// Einbauen in die Seite :-)

if (meineScananzeige != "kurz") {
    var ScanzeileLangHTMLString  = '<TD WIDTH="160" VALIGN="top" CLASS="r2">Galaxie scannen:</TD><TD CLASS="r">';
        ScanzeileLangHTMLString += Einzelscanlinks_lang + " | <a style=\"cursor:pointer\" onclick=\"" + Gesamtscanlinks + "return false;\">alles</a>";
        ScanzeileLangHTMLString += "</TD>";

    var ScanzeileLangHTMLElement = document.createElement("TR");
    ScanzeileLangHTMLElement.innerHTML = ScanzeileLangHTMLString;

    XPath(XPathDiplozeile).snapshotItem(0).parentNode.insertBefore(ScanzeileLangHTMLElement, XPath(XPathDiplozeile).snapshotItem(0).nextSibling);
}

if (meineScananzeige != "lang") {
    var scanspaltenheader = XPath(XPathSpielerliste + "/td[6]").snapshotItem(0);
    scanspaltenheader.innerHTML = "Scans | " + Einzelscanlinks_kurz +  " | <a style=\"cursor:pointer\" onclick=\"" + Gesamtscanlinks + "return false;\">alles</a>";
}