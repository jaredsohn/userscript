// ==UserScript==
// @name           vatera antipatopal 1.0
// @namespace      http://www.vatera.hu
// @description    Hülye módja a terheléselosztásnak js rnd alapján eldönteni, melyik tükörről húzza le a képet - főleg ha hetek óta döglött az egyik. A szkript a képek forrásában cseréli a döglött n2.vatera.hu-t a még működő n1.vatera.hu-ra.
// @include        http://www.vatera.hu/*
// ==/UserScript==

for(var img=0;img<document.images.length;img++){
  document.images[img].src = document.images[img].src.replace("n2.vatera.hu","n1.vatera.hu");
}
