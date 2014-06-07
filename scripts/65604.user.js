// ==UserScript==
// @name           Preistrend Versandaddierer 0.1.4.1
// @namespace      sc8
// @include        http://www.preistrend.de/Preisvergleich_*.html
// @include        http://www.preistrend.de/preisvergleich.php?*
// ==/UserScript==

var preise = document.evaluate("/html/body/table/tbody/tr[2]/td/table[2]/tbody/tr[2]/td[2]/div/table[2]/tbody/tr[*]/td[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var versande = document.evaluate("/html/body/table/tbody/tr[2]/td/table[2]/tbody/tr[2]/td[2]/div/table[2]/tbody/tr[*]/td[4]/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (versande.snapshotLength == 0) {
  preise = document.evaluate("/html/body/table/tbody/tr[2]/td/table[2]/tbody/tr[2]/td[2]/div/table[3]/tbody/tr[*]/td[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  versande = document.evaluate("/html/body/table/tbody/tr[2]/td/table[2]/tbody/tr[2]/td[2]/div/table[3]/tbody/tr[*]/td[4]/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var alertText = "";
var preis = 0;
var versand = 0;
for (var i = preise.snapshotLength - 1; i >= 0; --i) {
  preis = parseFloat(preise.snapshotItem(i).firstChild.data.replace(/^(.*) €$/,"$1"))
  versand = versande.snapshotItem(i).firstChild.data.replace(/^(ab )?(.*) €$/,"$2").replace(/^frei!$/,"0.00")
  if (versand == "siehe Shop") {
    preise.snapshotItem(i).firstChild.data = versand
  } else {
    preise.snapshotItem(i).firstChild.data = ((preis + parseFloat(versand)).toFixed(2).replace(".",",")) + " €"
  }
  versande.snapshotItem(i).firstChild.data = "(inkl.)"
}