// ==UserScript==
// @name          Note2be Pub Manager
// @description   Donne une dimension plus ludique aux emplacements publicitaires
// @include       http://www.note2be.com/
// ==/UserScript==

var mydiv, myelements, mynew;
myelements = document.getElementsByTagName('script');
mynew = document.createElement('div');
mynew.innerHTML = '<img src="http://farm1.static.flickr.com/128/360540163_4cc6bc47b2_m.jpg" style="margin-top:72px"/><br/><p style="text-decoration: underline">Liens utiles&nbsp;:</p><ul><li><a href="http://www.u-m-p.org/">le site des amis de Cola</a></li><li><a href="http://fr.wikipedia.org/wiki/Big_Brother">la page Big Brother</a></li><li><a href="http://contrenote2be.unblog.fr/">Contre Note2be</a></li></ul>'

for(i=0;i < myelements.length; i++) {
  if(myelements[i].getAttribute('src') == "http://pagead2.googlesyndication.com/pagead/show_ads.js") {
    mydiv = myelements[i].parentNode;
    mydiv.parentNode.replaceChild(mynew,mydiv);
  }
}

