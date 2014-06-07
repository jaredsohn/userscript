// ==UserScript==
// @name           Show Card Pictures in MKM
// @namespace      MagicKartenMarkt
// @description    Shows the Cards with Infos on MKM
// @include        https://www.magickartenmarkt.de/*
// ==/UserScript==


ShowPreview();

// Save all viewable Cards in a table and remove the old table (Search mode)
function ShowPreview() {

    var allElements, thisElement;
    allElements = document.evaluate("//table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var lastCont;
    var cont;
    var searchSite = contains(self.location.href.toLowerCase(), "search");
    // needed, because we just want to let that happens in searches
    var change = false;

    for(var i = 0; i < allElements.snapshotLength; i++) {
        thisElement = allElements.snapshotItem(i);

        if(contains(thisElement.innerHTML, "Englischer Name")) {
            lastCont = cont;
            cont = thisElement;
        }
    }

    var innerHTML = "" + cont.innerHTML;
    var splits = innerHTML.split("<tr");

    var table = document.createElement("table");
    table.setAttribute("rules", "none");
    table.setAttribute("frame", "void");
    var maxCards = 5;
    var counter = -1;
    var tr = document.createElement("tr");

    for(var i = splits.length - 1; i > 1; i--) {
        counter++;

        if(counter == maxCards) {
            table.appendChild(tr);
            tr = document.createElement("tr");
            counter = 0;
        }

        var td = document.createElement("td");
        if(counter == 0) {
            td.setAttribute("align", "right");
        } else if(counter == maxCards - 1) {
            td.setAttribute("align", "left");
        } else {
            td.setAttribute("align", "center");
        }

        var tds = splits[i].split("<td");
        var card = document.createElement("a");
        var info = '';

        for(var j = 0; j < tds.length; j++) {
            if(contains(tds[j], "cardThumbnail")) {
                link = tds[j].split("'")[1];
                img = document.createElement("img");
                img.setAttribute("src", link);
                img.setAttribute("height", 300);
                card.appendChild(img);
                change = true;
            } else if(contains(tds[j], "expansionIcon")) {
                text = tds[j].split("'")[1];
                info += "Expansion: " + text + "<br>";
            } else if(contains(tds[j], "cardrarityicons")) {
                text = tds[j].split("'")[1];
                info += "Rarity: " + text + "<br>";
            } else if(contains(tds[j], "href")) {
                var links = tds[j].split("\"");
                for(var k = 0; k < links.length; k++) {
                    if(contains(links[k], "prod")) {
                        var text = "http://www.magickartenmarkt.de/" + links[k];
                        card.setAttribute("href", text);
                        text = tds[j].split(">")[2].split("<")[0];

                        var index = searchSite ? 4 : 3;
                        info += j == index ? "Englischer Name: " : "Deutscher Name: ";
                        info += text + "<br>";
                        break;
                    }
                }
            }
            text = tds[j].split(">")[1].split("<")[0];
            text = text == " " || text == "" ? "0" : text;

            if(searchSite) {
                if(j == 6) {
                    info += "Typ: " + text + "<br>";
                } else if(j == 7) {
                    info += "Verfügbar: " + text + "<br>";
                } else if(j == 8) {
                    info += "Ab: " + text + "<br>";
                }
            } else {
                if(j == 7) {
                    info += "Verfügbar: " + text + "<br>";
                } else if(j == 8) {
                    info += "Ab: " + text + "<br>";
                }
            }
        }
        card.setAttribute("onmouseover", "showMsgBox(\"" + info + "\")");
        card.setAttribute("onmouseout", "hideMsgBox()");
        td.appendChild(card);
        tr.appendChild(td);

    }

    if(!change)
        return;

    cont.parentNode.insertBefore(table, cont.nextSibling);
    cont.parentNode.removeChild(cont);
}

function contains(str, content) {
    return str.indexOf(content) != -1;
}