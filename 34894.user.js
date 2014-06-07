// ==UserScript==
// @name          GN-Kommunikationssystem
// @namespace     http://tuxproject.de
// @description   verbessert das Kommunikationssystem von Galaxy Network
// @include       http://www.galaxy-network.net/game/comsys.*
// @include       http://galaxy-network.net/game/comsys.*
// @include       http://www.galaxy-network.net/game/gala-b2.*
// @include       http://galaxy-network.net/game/gala-b2.*
// @include       http://www.galaxy-network.net/game/alli-b2.*
// @include       http://galaxy-network.net/game/alli-b2.*
// @include       http://www.galaxy-network.net/game/alli-i.*
// @include       http://galaxy-network.net/game/alli-i.*
// @include       http://www.galaxy-network.net/game/gala-taktik.*
// @include       http://galaxy-network.net/game/gala-taktik.*
// ==/UserScript==

var allTDs, allAs, tablespace, DoAction, HTMLString, RegEx, fid, FrameRegEx, FrameFid, tempString, tempXPath, tempRegEx, tempFid;
function XPath(Params) { return document.evaluate(Params, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }

FrameRegEx = /([\w-]*)\.php/;
FrameFid = FrameRegEx.exec(window.location);

// == 1. "Kategorie leeren"-Verweise ==

if (FrameFid[1] == "comsys") {
    allTDs = XPath("//td[@colspan='2']");
    for (var i = 0; i < allTDs.snapshotLength; i++) {
//--> 1) Postein- und Ausgang
        RegEx = /\Wfolderid=(\d*)/;
        fid = RegEx.exec(allTDs.snapshotItem(i).innerHTML);
        if (fid != null) { if (fid[1]) { DoAction = "delallmsgs"; } }
        else {
//--> 2) Neuigkeiten & Logbuch
            RegEx = /\Wnewsfolderid=(\d*)/;
            fid = RegEx.exec(allTDs.snapshotItem(i).innerHTML);
            if (fid != null) {
                if (fid[1] == "7") { continue; } // zusammenfassende KB kann man nicht löschen
                if (fid[1]) { DoAction = "delallnews"; }
            }
            else { continue; } // "Kontakte" und "Einstellungen" sind irrelevant!
        }
        allTDs.snapshotItem(i).innerHTML += " <span style=\"font-size:smaller\">[<a style=\"font-size:smaller;font-weight:bold\" title=\"Alle Nachrichten löschen\" href=\"comsys.php?action=" + DoAction + "&folder_id=" + fid[1] + "\">X</a>]</span>";
    }
}

// == 2. Gala- und Allyboard-Seitennummerierung ==

if (FrameFid[1] == "gala-b2" || FrameFid[1] == "alli-b2") {
    allTDs = XPath("//td[@class='r3']");
    
    RegEx = /Seiten: /;
    fid = RegEx.exec(allTDs.snapshotItem(0).innerHTML);
    if (fid != null) { // verarbeite nur mehrseitige Threads
        if (allTDs.snapshotLength > 0) {
            tablespace = XPath("//div[@class='tablespace']/table");
            
            HTMLString = document.createElement("span"); // bessere Lösungen sind erwünscht... :/
            HTMLString.innerHTML = "<table width=\"100%\" cellspacing=\"1\" cellpadding=\"2\" align=\"center\"><tbody><tr><td align=\"right\" class=\"r3\">" + allTDs.snapshotItem(0).innerHTML + "</td></tr></tbody></table>";
            tablespace.snapshotItem(1).parentNode.insertBefore(HTMLString, tablespace.snapshotItem(1).nextSibling);
        }
    }
}

// == 3. PN-Felder vergrößern ==

if (FrameFid[1] == "alli-i" || FrameFid[1] == "comsys") {
    allTDs = XPath("//textarea[@name='text']");
    if (allTDs.snapshotItem(0) != null) {
        allTDs.snapshotItem(0).style.width = "100%";
        allTDs.snapshotItem(0).style.height = "200px";
    }
}

// == 4. Gala-/Allyboard-Felder vergrößern ==

if (FrameFid[1] == "gala-b2" || FrameFid[1] == "alli-b2") {
//--> 1) enthaltende Tabelle verbreitern
    allTDs = XPath("//table[@cellpadding='1']");
    if (allTDs.snapshotItem(0) != null) {
        allTDs.snapshotItem(0).style.width = "100%";
    }
//--> 2) Textfeld verbreitern
    allTDs = XPath("//textarea[@name='text']");
    if (allTDs.snapshotItem(0) != null) {
        allTDs.snapshotItem(0).style.width = "100%";
        allTDs.snapshotItem(0).style.height = "200px";
    }
}

// == 5. "Zusammenfassende Kampfberichte" umbenennen ==

if (FrameFid[1] == "comsys") {
    allTDs = XPath("//td[@colspan='2']");
    if (allTDs.snapshotLength > 0) {
        for (var i = 0; i < allTDs.snapshotLength; i++) {
            RegEx = /\Wnewsfolderid=(\d*)/;
            fid = RegEx.exec(allTDs.snapshotItem(i).innerHTML);
            if (fid && fid[1] == "7") {
                tempString = allTDs.snapshotItem(i).innerHTML;
                allTDs.snapshotItem(i).innerHTML = tempString.replace(/Zusammenfassende Kampfberichte/, "Zusammenfassende KB");
            }
        }
    }
}

// == 6. "Nachricht an die Galaxie" konsequent einsetzen ==

if (FrameFid[1] == "gala-taktik") {
    tempXPath = "//td[@colspan='10']";
    allTDs = XPath(tempXPath);
    if (allTDs.snapshotLength > 0) {
        allAs = XPath(tempXPath + "/a");
        for (var i = 0; i < allAs.snapshotLength; i++) {
            var galaPNLink;
            galaPNLink = allAs.snapshotItem(i).parentNode.innerHTML.replace(/0">/, "0&title=Nachricht%20an%20die%20Galaxie\">");

            allAs.snapshotItem(i).parentNode.innerHTML = galaPNLink;
        }
    }
}
else if (FrameFid[1] == "comsys") {
    tempXPath = "//input[@name='title']";
    if (XPath(tempXPath).snapshotLength > 0) {
        if (XPath("//input[@name='toid2']").snapshotItem(0).value.length == 0) {
            // "Re: Nachricht an die Galaxie" ohne "Re: " ;-)
            tempString = XPath(tempXPath).snapshotItem(0).value.replace(/Re: /, "");
            XPath(tempXPath).snapshotItem(0).value = tempString;
        }
    }
}