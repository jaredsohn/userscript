// ==UserScript==
// @name PC^2 Scoreboard auto highlight
// @author DarkKnight
// @include http://acm.kaist.ac.kr/2010/html/summary.html

o = document.body.firstElementChild.firstElementChild;
for (var i in o.children) {
  if (i < 2) continue;
  if (o.children[i].children[1].firstChild.data == 'nekonekosoft (National Taiwan U)')
    o.children[i].bgColor = '#C0F0C0';

}

// ==/UserScript==
