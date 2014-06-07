// ==UserScript==
// @name           Winfuture AdBlock
// @namespace      winfuture
// @description    Entfernt Werbefelder aus der Rechten Spalte sowie aus der Navigation
// @include        http://winfuture.de/*
// @include        http://www.winfuture.de/*
// ==/UserScript==

function isKnownTable(tab, headGrafikContent){
    var size = tab.getAttribute('width');
    if (size < 160 || size > 164){ // Grösse muss im Bereich der "rechten"-Spalte sein
        return false;
    }
    
    var img = tab.getElementsByTagName('img');
    if (img.length < 1){
        return false; // Tabelle muss Bilder enthalten
    }
    
    var src = img[0].getAttribute('src');
    var pos = src.indexOf(headGrafikContent, 0);
    if (pos == -1){ // die erste Grafik der Tabelle muss das Suchwort enthalten
        return false 
    }
    
    return true;
}


function hasAttribute(element, attribute, sollWert){
    if (element == null){
        return false;
    }
    
    var attrib = element.getAttribute(attribute);
    if (attrib == null){
        return false;
    }
    
    if (attrib != sollWert){
        return false;
    }
    
    return true;
}


function containsImage(element, alt){
    if (element == null){
        return false;
    }
    
    var img = element.getElementsByTagName('img');
    if (img == null){
        return false;
    }
    
    if (img.length != 1){
        return false;
    }
    
    if (!hasAttribute(img[0], "alt", alt)){
        return false;
    }
    
    return true;
}


function deleteBlock(element){
    if (element != null){
        element.innerHTML = "";
        element.style.visibility = "hidden";
        element.style.width = "0";
        element.style.height = "0";
    }
}


// Entfernt Links zwischen NewsZumThema & Kommentare
function doNewsLinkCleanup(table){ 
    var freeCells = new Array();
    function getNewsLink(td, text){ // findet Links
        var imgs = td.getElementsByTagName("img");
        if (imgs.length>0){
            if (hasAttribute(imgs[0], "alt", text)){
                return true;
            }
        }else if(td.innerHTML == text){
            return true;
        }
        return false;
    }
    
    var tds = table.getElementsByTagName('td');
    for(c=0; c<tds.length; c++){
        function deleteLink(text){ // löscht beliebigen Link
            if (getNewsLink(tds[c], text)){
                freeCells.push(c); // speichert freie table-cell
                tds[c].innerHTML = "";
                c++;
                tds[c].innerHTML = "";
            }
        }
        function switchPosition(search){ // platziert Cells Links -> Rechts
            if (getNewsLink(tds[c], search)){
                if (freeCells.length != 0){
                    freeCells.sort();
                    freeSpace = freeCells.pop();
                    tds[freeSpace].innerHTML=tds[c].innerHTML;
                    deleteBlock(tds[c]);
                    tds[freeSpace+1].innerHTML=tds[c+1].innerHTML;
                    deleteBlock(tds[c+1]);
                }
            }
        }
        deleteLink("RSS Feed"); 
        deleteLink("Artikel verlinken");
        deleteLink("szwidget");
        deleteLink("HTML-Code:");
        deleteLink("Foren-Code:");
        switchPosition("Drucken!");
        switchPosition("Kommentar abgeben!");
    } 
}


// Löscht ungewünschte Tabellen auf der rechten Seite:
deleteBlock(document.getElementById("telerechner_boxed"));
deleteBlock(document.getElementById("skyscraper"));

var tbl = document.getElementsByTagName('table');
for(i=0; i<tbl.length;i++){
    curTable = tbl[i];
    
    if (isKnownTable(curTable, "kauftipp")){
        deleteBlock(curTable); continue;
    }
    
    if (isKnownTable(curTable, "newsletter")){
        deleteBlock(curTable); continue;
    }
    
    if (isKnownTable(curTable, "hosting")){
        deleteBlock(curTable); continue;
    }
    
    if (isKnownTable(curTable, "telerechner")){
        deleteBlock(curTable); continue;
    }
    
    // Löscht download-Box in der Mitte:
    var tds = curTable.getElementsByTagName("td");
    if (tds.length > 0){
        if (tds[0].innerHTML == "Neueste Downloads"){
            deleteBlock(curTable); continue;
        }
    }
    
    // Verkleinert Main-Table (Ad-space freigeben):
    if (hasAttribute(curTable, "width", 955)){
        curTable.width = "790"; continue;
    }
    
    // Mitte (News-Links cleanup):
    if (hasAttribute(curTable, "width", 434)){
        if(hasAttribute(curTable, "style", "margin: 0pt 0pt 10px;")){
            doNewsLinkCleanup(curTable); continue;
        }else {
            tblImg = curTable.getElementsByTagName('img');
            if (tblImg.length == 2){
                //7-Tage News & Top Downloads (Startseite) entfernen:
                deleteBlock(curTable); continue;
            }
        }
    }
    
}


// Löscht weitere (nur Link + Bild) Inhalte Rechts:
var links = document.getElementsByTagName('a');
for(i=0; i<links.length; i++){
    curLink = links[i];
    
    if (containsImage(curLink, "WinFuture bei Twitter")){
        curLink.innerHTML = ""; continue;
    }
    
    if (containsImage(curLink, "WinFuture Update Pack für Windows XP und Vista")){
        curLink.innerHTML = ""; continue;
    }
    
    if (containsImage(curLink, "WinFuture Windows XP ISO Builder")){
        curLink.innerHTML = ""; continue;
    }
    
}


// Löscht unerwünschte Navigationseinträge:
var div = document.getElementsByTagName('div');
for (i=0; i<div.length; i++){
    curDiv = div[i];
    
    if (hasAttribute(curDiv,"class","navigation")){
        var pos = curDiv.innerHTML.indexOf('<div class="no_link">Service</div>',0);
        if (pos > 0){ // lösche alle Menüs von Service bis Ende der Navigation:
            curDiv.innerHTML = curDiv.innerHTML.substr(0,pos);
        }
        continue;
    }
    
    if (hasAttribute(curDiv,"class","partner seperator")){
        deleteBlock(curDiv); continue;
    }
    
    if (hasAttribute(curDiv,"class","szwidget")){
        deleteBlock(curDiv); continue;
    }
    
    if (hasAttribute(curDiv,"class","google_ca-news_container")){
        deleteBlock(curDiv); continue;
    }
    
    if (hasAttribute(curDiv,"class","newscharts")){
        deleteBlock(curDiv); continue;
    }
    
}