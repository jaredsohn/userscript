// coding: utf-8
// ==UserScript==
// @name           AutomatedTradeRoutes
// @namespace      DefaultNamespace
// @version        7
// @require        http://userscripts.org/scripts/source/74144.user.js
// @description    Free automated trade routes
// @include        http://s*.*.ikariam.com/index.php*
// @include        http://s666.ikariam.org/index.php*
// @exclude        http://board.*.ikariam.com/*
// ==/UserScript==

try {
  ScriptUpdater.check(77956, "7");
} catch(e) {};

language = document.location.host.split("\.")[1];
if (language == "ae") { //arabic translation
  texts = {
    "activate"     : "تفعيل",
    "extend"       : "تمديد",
    "notactive"    : "غير مُفعل",
    "delete"       : "حذف"
  };
} else if (language == "es") { //spanish translation
  texts = {
    "activate"     : "activar",
    "extend"       : "extender",
    "notactive"    : "Sin activar",
    "delete"       : "Eliminar"
  };
} else if (language == "de") { //german translation
  texts = {
    "activate"     : "aktivieren",
    "extend"       : "verlängern",
    "notactive"    : "Nicht aktiv",
    "delete"       : "Löschen"
  };
} else if (language == "fr") { //french translation
  texts = {
    "activate"     : "Activer",
    "extend"       : "Étendre",
    "notactive"    : "Non actif",
    "delete"       : "Supprimer"
  };
} else if (language == "lv") { //latvian translation
  texts = {
    "activate"     : "aktivizēt",
    "extend"       : "paplašināt",
    "notactive"    : "Neaktīvs",
    "delete"       : "Dzēst"
  };
} else if (language == "pl") { //polish translation
  texts = {
    "activate"     : "aktywuj",
    "extend"       : "przedłuż",
    "notactive"    : "Nieaktywne",
    "delete"       : "Skasuj"
  };
} else if (language == "ru") { //russian translation
  texts = {
    "activate"     : "активировать",
    "extend"       : "доступно",
    "notactive"    : "Не активен",
    "delete"       : "Удалить"
  };
} else if (language == "tr") { //turkish translation
  texts = {
    "activate"     : "aktive et",
    "extend"       : "uzat",
    "notactive"    : "Aktif değil",
    "delete"       : "sil"
  };
} else { //english translation
  texts = {
    "activate"     : "activate",
    "extend"       : "extend",
    "notactive"    : "Not active",
    "delete"       : "Delete"
  };
}

var searchLi = document.evaluate("//form[@id='tradeRouteForm0']//li[@class='delete']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var searchHash = document.evaluate("//form[@id='tradeRouteForm0']//input[@name='actionRequest']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var a = document.createElement("a");
a.title = texts['delete'];
a.href = "?action=Premium&function=deleteTradeRoute&position=1&actionRequest="+searchHash.snapshotItem(0).value;
searchLi.snapshotItem(0).appendChild(a);

var premiumCosts = document.evaluate("//li[@class='premiumCost']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = premiumCosts.snapshotLength - 1; i >= 0; i--) {
  var toDel = premiumCosts.snapshotItem(i);
  while(toDel.firstChild) {
    toDel.removeChild(toDel.firstChild);
  }
}

var notEnough = document.evaluate("//a[@class='notenough']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = notEnough.snapshotLength - 1; i >= 0; i--) {
  var toDel = notEnough.snapshotItem(i);
  toDel.parentNode.removeChild(toDel);
}

for(var i = 1; i < 20; i++) {
  var renew = document.evaluate("//form[@id='tradeRouteForm"+i+"']//li[@class='renew']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var status = document.evaluate("//form[@id='tradeRouteForm"+i+"']//li[@class='status']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var newa = document.createElement("a");
  var newimg = document.createElement("img");
  var newtext = null;
  newimg.setAttribute("vspace", "1");
  newimg.setAttribute("hspace", "0");
  newimg.setAttribute("height", "13");
  newimg.setAttribute("align", "left");
  if (status.snapshotItem(0).childNodes[1].childNodes[0].data == texts['notactive']) {
    newimg.setAttribute("src", "skin/smilies/ecstatic_x25.gif");
    newtext = document.createTextNode(texts['activate']);
  } else {
    newimg.setAttribute("src", "skin/smilies/outraged_x25.gif");
    newtext = document.createTextNode(texts['extend']);
  }
  newa.appendChild(newimg);
  newa.appendChild(newtext);
  newa.setAttribute("class", "button");
  newa.setAttribute("style", "margin: 0px;");
  newa.setAttribute("name", "renew");
  newa.setAttribute("id", "colonizeBtn");
  newa.setAttribute("onclick", "Dom.get('renew"+i+"').value=1;Dom.get('tradeRouteForm"+i+"').submit();");
  renew.snapshotItem(0).appendChild(newa);
}