// ==UserScript==
// @name           bash, qdb szoveg normalizalo
// @namespace      psmith
// @include        http://bash.hu/*
// @include        http://qdb.hu/*
// ==/UserScript==

/**
 * A bash.hu és qdb.hu oldalakon az MSN-es formátumú szövegeket átalakítja normálisabban olvasható formátumra.
 *
 * Egy példa a működésre:
    valaki üzenete:
    ma mentünk wcbe cigizni
    valaki üzenete:
    órán megtekertem kézzel ramóét meg andorkáét
    valaki üzenete:
    sajátomat a wcbe akartam
    valaki üzenete:
    megyünk
    masvalaki üzenete:
    xd
    valaki üzenete:
    néz két csaj
    valaki ézenete:
    ilyet szólok rambónak miközbe megyünk be a wcbe:
    valaki üzenete:
    te! papírt adsz?
    masvalaki üzenete:
    ................................
    valaki üzenete:
    jah
    valaki üzenete:
    meg aztán jövünk ki
    valaki üzenete:
    így 5 perc múlva
    valaki üzenete:
    csajok még mindig ott
    valaki üzenete:
    "Na, ez jólesett"
    masvalaki üzenete:
    XXD

 A fenti szövegből ez lesz:
    valaki üzenete: ma mentünk wcbe cigizni
    valaki üzenete: órán megtekertem kézzel ramóét meg andorkáét
    valaki üzenete: sajátomat a wcbe akartam
    valaki üzenete: megyünk
    masvalaki üzenete: xd
    valaki üzenete: néz két csaj
    valaki ézenete: ilyet szólok rambónak miközbe megyünk be a wcbe:
    valaki üzenete: te! papírt adsz?
    masvalaki üzenete: ................................
    valaki üzenete: jah
    valaki üzenete: meg aztán jövünk ki
    valaki üzenete: így 5 perc múlva
    valaki üzenete: csajok még mindig ott
    valaki üzenete: "Na, ez jólesett"
    masvalaki üzenete: XXD
 */

/**
 * Version history
 * 2008.12.11 - első publikus verzió
 */
function log(msg) {
  if (console != undefined && console != null) {
    if (typeof(msg) != "object") {
      msg = "[bashhu] "+msg;
    }
    console.log(msg);
  }
}
function xpath(query) {
  try {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  } catch (e) {
    log("hiba az xpath kifejezes kietekelese kozben: "+e);
    log("  az xpath kifejezes: "+query);
  }
}
function nvl(s, ss) {
  if (s == undefined || s == null) {
    s = ss;
  }
  return s;
}

function normalizeString(s) {
  return s.replace(/[ \n\t]+$/, "").replace(/^[ \n\t]+/, "").replace(/([0-9][0-9]?):([0-9][0-9]?)/, "$1&#58;$2");
}

var res = xpath("//div[@class='qtxt']");  //bash.hu
if (res.snapshotLength == 0) {
  res = xpath("//p[@class='quotetext']"); //qdb.hu
}
for(var i = 0; i < res.snapshotLength; i++) {
  var n = res.snapshotItem(i);
  var s = n.innerHTML;
  var arr = s.split("<br>");
  var b = 0;
  s = "";
  for(var t = 0; t < arr.length; t++) {
    var ss = normalizeString(arr[t]);
    var sss = normalizeString(nvl(arr[t+1], ""));
    s += ss;
    if (b == 0) {
      if ((ss.substring(ss.length - 1) != ":") || (ss.indexOf(":") < ss.length - 1) || (ss == sss)) {
        s += "<br>\n";
      } else {
        s += " ";
        b = 1;
      }
    } else {
      s += "<br>\n";
      b--;
    }
  }
  if (n.innerHTML != s) {
    n.innerHTML = s;
  }
}
