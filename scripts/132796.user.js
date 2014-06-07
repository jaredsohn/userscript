// ==UserScript==
// @name           Pricecolor
// @namespace      eba
// @description    Färbt den Preis nach Grenzwerten
// @include        http://*.eatenbyants.de/shop.php?cat=99
// ==/UserScript==
// limits in form "<ant>: [<yellowLimit>,<redLimit>]"
const limits = {
  "Camponotus ligniperda": [5.71,6.28],
  "Formica fusca": [3.95,4.35],
  "Lasius flavus": [2.2,2.42],
  "Lasius niger": [1.32,1.46],
  "Myrmica rubra": [2.73,3],
  "Crematogaster scutellaris": [9.22,10.14],
  "Messor barbarus": [7.46,8.21],
  "Pheidole pallidula": [10.97,12.07],
  "Camponotus substitutus": [21.5,23.65],
  "Polyrhachis dives": [39.05,42.96],
  "Acromyrmex spec.": [44.32,48.75]
}
const rows = document.getElementsByClassName("liste")[0]
                     .getElementsByTagName("tr");
for (var i=0; i<rows.length; i++) {
  const row = rows[i];
  const cols = row.getElementsByTagName("td");
  const ant = cols[0].textContent;
  const price = parseFloat(cols[1].textContent.replace(/,/, "."));
  if (limits[ant][1]<=price) {
    row.style.color="red";
  } else if (limits[ant][0]<=price) {
    row.style.color="yellow";
  }
}
