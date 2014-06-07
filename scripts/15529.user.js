// ==UserScript==
// @name           userscraps.org
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        http://userscripts.org/*
// ==/UserScript==

// Last updated: 2008-02-05

document.title = document.title.replace(/cript/g, "crap");

var logo = document.evaluate("//div[@id='header']/h1/a/" +
                             "img[@alt='Userscripts.org']",
                             document, null, 9, null).singleNodeValue;

if (logo) {
  logo.src = "data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAPoAAAAkCAMAAACXBtdQAAAAB3RJTUUH1wwEEwk4bt3i\
nwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAwBQTFRF8YcFY2Nja2trdHR0fHx8jE4DjlUO\
k1IDklYNllgNmlYDnlgDm1wPl1wUnWAUm2IcjGIujmc4m2cnkWc0nWwxmm87o1sDqF4D\
pmIPrGAErGQKoGIVoWUcqmURrmoXq2sdtGUEsWUJtmgGtGgMuGcEvGkEtGwUunEYpWwn\
oG4ypnAuq3IspXIzpHY8rHUyqnc5rXg2rHo9tnYos3kxh25PiWpEj3JPi3dejnhelnJH\
m3tTkHthondCpHlFoXxPrHxBqX9Lo35Qw20Ex3AEy3IExnkZ03YE1ngE0ngI23sE3HwI\
034Vxn4k4X4FlIJsnYdsloZznZB/rIFNq4NTtYRHsIZTtIlVtYxZu41UuY5au5Fdpo1u\
o450rpBsrpNysI5lvJRjtZhzsZl8uJlyu515u6B+1oAW0IAf24IW2YUe34kfyYEoyoc2\
2Ygk144z3JM65YAF7IQF6IsY8JAa44wh448p6I8i7JQo45U145k+6po36pw+8JkuwopF\
wY1NyoxAypFNxZNX1pZH15xSwJVhxJlkwpxtypthy59pwZ1w3qFXyKV61qZq3Kxy37B1\
5pxA5p9I6Z1A7aNI7Kxd8KNF8axW4qxq4K9z6LFt4rF147R66bd57bp88bBg8bt69MB/\
hYWFioqKmpGGk5OTm5ubopOBrpyFopuSop6aqJ+Us5yAr6WZs6GKuaGEvaaKv6iLtqWQ\
sqmcu6mSvq2ZoaGhqqqqtq6lubGps7Ozu7u7x6qIxa6RyrOW0K6E2LWK1beR0rma3byT\
2b2awLSlx7yvy7qlzL2r1b6i57uF5b+RzMS52cOo08Wz1Mm82sm02s2+6cSX88OJ88yd\
4cWi4Meo5cil48qq68qh6s2p5M6y7dCs6dO38M6k89Os9dax99iy89m5+d6+w8PDy8vL\
1s7D3NLG09PT3NfS29vb5NbD5NfI5NnL6NfD6djE6tzM6N/U9N/E7OPX9+LJ8uTT8Ofd\
9unZ+ObR+ejS+u3d4+Pj6+vr9u3i+vHm/PPo8/Pz/f39A/ScqQAAAAF0Uk5TAEDm2GYA\
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\
fOKfY9GRpAAAAABJRU5ErkJggg==";
  logo.setAttribute("alt", "Userscraps.org");
}

var footer = document.getElementById("footer");
if (footer) {
  var crap = document.evaluate(".//em | .//strong",
                               footer, null, 9, null).singleNodeValue;
  crap.textContent = "Because we\'re full of craps"
}

var installer = document.getElementById("install_script");
if (installer) {
  var flag = document.evaluate("./parent::div[@id='right']/p[@class='flag']/a",
                               installer, null, 9, null).singleNodeValue;
  flag.textContent = "Flag as crap";
}


// ripped from Bush Renamer
// http://userscripts.org/scripts/show/1497
var replacements, regex, key, textnodes, node, str;
replacements = { "Script": "Scrap",
                 "script": "scrap",
                 "Scrapwright": "Script Kiddy",
                 "scrapwright": "script kiddy",
                 "Scrapwrights": "Script Kiddies",
                 "scrapwrights": "script kiddies",
                 "scrapion": "scription"};
regex = {};
for (key in replacements) { 
    regex[key] = new RegExp(key, "g");
} 
textnodes = document.evaluate(".//*//text()", document.body, null, 6, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
  node = textnodes.snapshotItem(i);
  str = node.data;
  for (key in replacements) {
    str = str.replace(regex[key], replacements[key]);
  }
  node.data = str;
}

var avatars = document.evaluate("//img[contains(@src, 'gravatar_default')]",
                                document, null, 6, null);

if (!avatars.snapshotLength) return;
for (var j = 0; j < avatars.snapshotLength; j++) {
  avatars.snapshotItem(j).src = "data:image/png;base64,\
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";
}