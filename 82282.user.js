// ==UserScript==
// @name          Schulterglatze - Kleine Statusbox
// @namespace     http://userstyles.org
// @description          Macht die Statusbox kleiner.
// @author        schweinebagge
// @homepage      http://userstyles.org/styles/34063
// @include       http://www.schulterglatze.de/*
// ==/UserScript==
(function() {
var css = ".logout{\n        float: none !important;\n        width: 105px;\n        margin: 0px 0px 0 0 !important;\n        background:url(http://image.schulterglatze.de/img/logout.png) no-repeat;\n}";
if (typeof GM_addStyle != "undefined") {
        GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
        addStyle(css);
} else {
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node);
        }
}
})();
var dienstgrad = document.getElementsByTagName("div")[3].firstChild.data;
var name = document.getElementsByTagName("span")[0].firstChild.data;
var geld = document.getElementsByTagName("div")[6].firstChild.data;
var punkte = document.getElementsByTagName("div")[7].firstChild.data;
var rang = document.getElementsByTagName("div")[8].firstChild.data;
var moral = document.getElementsByTagName("div")[9].firstChild.data;
var dienstzeit = document.getElementsByTagName("script")[7].firstChild.data;
var dienstende = document.getElementsByTagName("span")[3].firstChild.data;
var ausbildungszeit = document.getElementsByTagName("script")[8].firstChild.data;
var ausbildungsende = document.getElementsByTagName("span")[6].firstChild.data;
var angriffszeit = document.getElementsByTagName("script")[9].firstChild.data;
var angriffsende = document.getElementsByTagName("span")[9].firstChild.data;
var spenden = document.getElementsByTagName("div")[18].firstChild.data;
var inhalt = document.getElementById('content');
if (inhalt) {
    //Tabelle erstellen
    var tabelle = document.createElement('table');
    var tabellenreihe = document.createElement('tr');
    inhalt.parentNode.insertBefore(tabelle, inhalt);
    tabelle.appendChild(tabellenreihe);
    //Geld
    var geldzelle = document.createElement('td');
    var geldpic = document.createElement('img');
    var geldquelle = document.createAttribute("src");
    var geldtext = document.createTextNode(geld);
    geldquelle.nodeValue = "http://image.schulterglatze.de/img/content/preis.png";
    tabellenreihe.appendChild(geldzelle);
    geldzelle.appendChild(geldpic);
    geldpic.setAttributeNode(geldquelle);
    geldzelle.appendChild(geldtext);
    //Punkte
    var punktezelle = document.createElement('td');
    var punktepic = document.createElement('img');
    var punktequelle = document.createAttribute("src");
    var punktetext = document.createTextNode(punkte);
    punktequelle.nodeValue = "http://image.schulterglatze.de/img/content/punkte.png";
    tabellenreihe.appendChild(punktezelle);
    punktezelle.appendChild(punktepic);
    punktepic.setAttributeNode(punktequelle);
    punktezelle.appendChild(punktetext);
    //Rang
    var rangzelle = document.createElement('td');
    var rangpic = document.createElement('img');
    var rangquelle = document.createAttribute("src");
    var rangtext = document.createTextNode(rang);
    rangquelle.nodeValue = "http://image.schulterglatze.de/img/content/rang.png";
    tabellenreihe.appendChild(rangzelle);
    rangzelle.appendChild(rangpic);
    rangpic.setAttributeNode(rangquelle);
    rangzelle.appendChild(rangtext);
    //Moral
    var moralzelle = document.createElement('td');
    var moralpic = document.createElement('img');
    var moralquelle = document.createAttribute("src");
    var moraltext = document.createTextNode(moral);
    moralquelle.nodeValue = "http://image.schulterglatze.de/img/content/moral.png";
    tabellenreihe.appendChild(moralzelle);
    moralzelle.appendChild(moralpic);
    moralpic.setAttributeNode(moralquelle);
    moralzelle.appendChild(moraltext);
    //Dienst
    var dienstzelle = document.createElement('td');
    var dienstpic = document.createElement('img');
    var dienstquelle = document.createAttribute("src");
    var diensttext = document.createTextNode(dienstende);
    dienstquelle.nodeValue = "http://image.schulterglatze.de/img/content/dienst.png";
    tabellenreihe.appendChild(dienstzelle);
    dienstzelle.appendChild(dienstpic);
    dienstpic.setAttributeNode(dienstquelle);
    dienstzelle.appendChild(diensttext);
    /*Dienstcountdown
    var dienstjs = document.createElement('script');
    var dienstjstyp = document.createAttribute("type");
    dienstjstyp.nodeValue = "text/javascript";
    var diensttext = document.createTextNode(dienstzeit);
    dienstzelle.appendChild(dienstjs);
    dienstjs.setAttributeNode(dienstjstyp);
    dienstjs.appendChild(diensttext);*/
    //Ausbildung
    var ausbildungszelle = document.createElement('td');
    var ausbildungspic = document.createElement('img');
    var ausbildungsquelle = document.createAttribute("src");
    var ausbildungstext = document.createTextNode(ausbildungsende);
    ausbildungsquelle.nodeValue = "http://image.schulterglatze.de/img/content/ausbildung.png";
    tabellenreihe.appendChild(ausbildungszelle);
    ausbildungszelle.appendChild(ausbildungspic);
    ausbildungspic.setAttributeNode(ausbildungsquelle);
    ausbildungszelle.appendChild(ausbildungstext);
    //Angriff
    var angriffszelle = document.createElement('td');
    var angriffspic = document.createElement('img');
    var angriffsquelle = document.createAttribute("src");
    var angriffstext = document.createTextNode(angriffsende);
    angriffsquelle.nodeValue = "http://image.schulterglatze.de/img/content/angriff.png";
    tabellenreihe.appendChild(angriffszelle);
    angriffszelle.appendChild(angriffspic);
    angriffspic.setAttributeNode(angriffsquelle);
    angriffszelle.appendChild(angriffstext);
    //Spenden
    var spendenzelle = document.createElement('td');
    var spendenpic = document.createElement('img');
    var spendenquelle = document.createAttribute("src");
    var spendentext = document.createTextNode(spenden);
    spendenquelle.nodeValue = "http://image.schulterglatze.de/img/content/spende.png";
    tabellenreihe.appendChild(spendenzelle);
    spendenzelle.appendChild(spendenpic);
    spendenpic.setAttributeNode(spendenquelle);
    spendenzelle.appendChild(spendentext);
    //Logout
    var logoutzelle = document.createElement('td');
    var logoutpic = document.createElement('img');
    var logoutquelle = document.createAttribute("src");
    logoutquelle.nodeValue = "http://image.schulterglatze.de/img/logout.png";
    tabellenreihe.appendChild(logoutzelle);
    spendenzelle.appendChild(logoutpic);
    spendenpic.setAttributeNode(logoutquelle);
    //Header entfernen
    /*var header = document.getElementById('header_content_2');
    if (header) {
         header.parentNode.removeChild(header);
    }*/
}
//alert("Dienstgrad: "+spenden+"| Name: "+angriffsende)
