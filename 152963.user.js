// ==UserScript==
// @name        Change marktplaats prijstype
// @namespace   Bezoeker 
// @include     https://vernieuwd.marktplaats.nl/syi/plaatsAdvertentie.html
// @version     1
// @grant       none
// ==/UserScript==

var prijs_links = document.querySelectorAll("#syi-price-tabs a");
for (var cpt_count=0; cpt_count<prijs_links.length; cpt_count++){
  if (prijs_links[cpt_count].textContent == "Kies ander prijstype"){
    // Click the "Kies ander prijstype" link
    prijs_links[cpt_count].click();
    // Click "Bieden" in the hidden unordered list
    var prijs_listitems = document.querySelectorAll("#syi-price-type ul li");
    for (cpt_count=0; cpt_count<prijs_listitems.length; cpt_count++){
      if (prijs_listitems[cpt_count].textContent == "Bieden"){
        prijs_listitems[cpt_count].click();
        break;
      }
    }
    break;
  }
}