// ==UserScript==
// @name        Ich will die Kameraden zurück!
// @namespace   ferdefaen_*
// @include     http://www.howrse.de/elevage/fiche/*
// @include     http://www.howrse.de/elevage/chevaux/*
// @version     1.1
// ==/UserScript==

if (!document.getElementById("compagnonBoite") && !document.getElementById("widget-module-2")) {


var KameradenNamenFR = new Array();
KNFR = KameradenNamenFR.push("girafe");
KNFR = KameradenNamenFR.push("gazelle");
KNFR = KameradenNamenFR.push("ours");
KNFR = KameradenNamenFR.push("hibou");
KNFR = KameradenNamenFR.push("coccinelle");
KNFR = KameradenNamenFR.push("ecureuil");
KNFR = KameradenNamenFR.push("singe");
KNFR = KameradenNamenFR.push("pingouin");
KNFR = KameradenNamenFR.push("chat");
KNFR = KameradenNamenFR.push("lapin");
KNFR = KameradenNamenFR.push("zebre");
KNFR = KameradenNamenFR.push("griffon");
KNFR = KameradenNamenFR.push("chevre");
KNFR = KameradenNamenFR.push("grenouille");
KNFR = KameradenNamenFR.push("abeille");
KNFR = KameradenNamenFR.push("poule");
KNFR = KameradenNamenFR.push("papillon");
KNFR = KameradenNamenFR.push("kangourou");
KNFR = KameradenNamenFR.push("chameau");
KNFR = KameradenNamenFR.push("tortue");
KNFR = KameradenNamenFR.push("mouton");

KNFR = KameradenNamenFR.push("dragon-1");
KNFR = KameradenNamenFR.push("dragon-2");
KNFR = KameradenNamenFR.push("dragon-3");
KNFR = KameradenNamenFR.push("dragon-4");
KNFR = KameradenNamenFR.push("");

var KameradenNamenDE = new Array();
KNDE = KameradenNamenDE.push("Giraffe");
KNDE = KameradenNamenDE.push("Gazelle");
KNDE = KameradenNamenDE.push("Bär");
KNDE = KameradenNamenDE.push("Eule");
KNDE = KameradenNamenDE.push("Marienk&auml;fer");
KNDE = KameradenNamenDE.push("Eichh&ouml;rnchen");
KNDE = KameradenNamenDE.push("Affe");
KNDE = KameradenNamenDE.push("Pinguin");
KNDE = KameradenNamenDE.push("Katze");
KNDE = KameradenNamenDE.push("Kaninchen");
KNDE = KameradenNamenDE.push("Zebra");
KNDE = KameradenNamenDE.push("Greif");
KNDE = KameradenNamenDE.push("Ziege");
KNDE = KameradenNamenDE.push("Frosch");
KNDE = KameradenNamenDE.push("Honigbiene");
KNDE = KameradenNamenDE.push("Huhn");
KNDE = KameradenNamenDE.push("Schmetterling");
KNDE = KameradenNamenDE.push("K&auml;nguru");
KNDE = KameradenNamenDE.push("Kamel");
KNDE = KameradenNamenDE.push("Schildkr&ouml;te");
KNDE = KameradenNamenDE.push("Schaf");

KNDE = KameradenNamenDE.push("Drache");
KNDE = KameradenNamenDE.push("Drache");
KNDE = KameradenNamenDE.push("Drache");
KNDE = KameradenNamenDE.push("Drache");
KNDE = KameradenNamenDE.push("");

var KameradenBox;
KameradenBox = document.createElement("div");
KameradenBox.setAttribute("id", "compagnonBoite");

var AdressPruefung1 = document.location.href.indexOf("&");
var AdressPruefung2 = document.location.href.indexOf("#");
if (AdressPruefung1 != -1) {
var PferdNr = document.location.href.substr(AdressPruefung1 - 5, 5);
}
else if (AdressPruefung2 != -1) {
var PferdNr = document.location.href.substr(AdressPruefung2 - 5, 5);
}
else {
var PferdNr = document.location.href.substr(document.location.href.length-5,document.location.href.length);
}

var KNum = PferdNr % (KameradenNamenFR.length - 1);


var KameradenBoxCP1 = '<table class="module module-style-6" style="" id="widget-module-12"' +
' _theme="6"><thead class="module-thead-6">' +
'<tr><th class="left corner"><div></div></th><td class="border"><div></div></td><th class="right ' +
'corner"><div></div></th></tr></thead><tfoot><tr><th class="left corner"><div></div></th>' +
'<td id="widget-widget-module-12-block-13-foot-content" class="border"></td><th class="right corner">' +
'<div></div></th></tr></tfoot><tbody class="module-item first" id="widget-widget-module-12-block-13">' +
'<tr _theme="0" style="" class="module-row-head row-1 thead" id="widget-widget-module-12-block-13-head">' +
'<th class="left border"><div></div></th><td class="caption"><div class="title-content"';

var KameradenBoxCP2 = 'id="widget-widget-module-12-block-13-head-title' +
'">' + KameradenNamenDE[KNum] + '</div></td><th class="right border">' +
'<div></div></th></tr><tr style="" _theme="6" class="module-row-body row-2 top" id' +
'="widget-widget-module-12-block-13-body">' +
'<th class="left border col-0"><div></div></th><td class="content col-1"><div class="wrapper">' +
'<div id="widget-widget-module-12-block-13-body-content" class="content">' +
'</div><div style="font-size:12px; text-align:center;">Kameraden-Script by Ferdef&auml;n</div></div>' +
'</td><th class="right border col-2"><div></div></th></tr></tbody></table>';

KameradenBox.innerHTML = KameradenBoxCP1 + KameradenBoxCP2;

var KameradenBildDiv = document.createElement("div");
KameradenBildDiv.setAttribute("class", "module-style-compagnon");

var KameradenBild = document.createElement("img");

if (PferdNr % 2 == 1) {
KameradenBild.setAttribute("style", "margin-top:-163px;");
}

KameradenBild.setAttribute("src", "http://www.howrse.de/media/equideo/image/compagnons/" + KameradenNamenFR[KNum] + ".jpg");

if (document.getElementById("rankingsBoite")) {
document.getElementById("col-left").insertBefore(KameradenBox,document.getElementById("rankingsBoite"));
} else if (document.getElementById("module-history")) {
document.getElementById("col-left").insertBefore(KameradenBox,document.getElementById("module-history").parentNode);
} else {
document.getElementById("col-left").appendChild(KameradenBox); 
}

document.getElementById("widget-widget-module-12-block-13-body-content").appendChild(KameradenBildDiv);
KameradenBildDiv.appendChild(KameradenBild);

}