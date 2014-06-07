/*
   (c) Ludovic Claude, ludovicc (@) users.sourceforge.net
 
   Copy, use, modify, spread as you see fit.
*/
 
// ==UserScript==
// @name            CDiscount Nettoyeur
// @namespace http://cvsgrab.sourceforge.net/greasemonkey/
// @description     Supprime les animations stupides sur CDiscount.com / Cleans animations on CDiscount.com
// @include http://*cdiscount.com*
// ==/UserScript==
 
(function() {
  var list_imgs = document.getElementsByTagName("img");
    
  for (var i=0; i<list_imgs.length; i++) {
    var current_img = list_imgs[i]; 
    var parentNode = current_img.parentNode;
    var imgSrc = current_img.src;
    var nouveauTexte = '';

    // Supprime les Drapeaux
    if (imgSrc.match(/Drapeaux/)) {
      // Garde l'info Gratuit chronopost
      if (imgSrc.match(/236933\.gif/)) {
        nouveauTexte = 'Gratuit Chronopost';
      } 
      // Sinon on vire l'image
      else {
        nouveauTexte = ' ';
      }
    }
    else if (imgSrc.match(/imagesok/i)) {
      // Remplace l'image 3xSansFrais par du texte
      if (imgSrc.match(/commun\/3xSansFrais\.gif/)) {
        nouveauTexte = 'Paiement 3 fois sans frais';
      }
      // Remplace l'image time_coutant (prix countant) par du texte
      else if (imgSrc.match(/divers\/time_coutant\.gif/)) {
        nouveauTexte = 'Prix countant';
      }
      // Remplace l'image time (vente flash) par du texte
      else if (imgSrc.match(/divers\/time\.gif/) || imgSrc.match(/ristournes\/flash\/flash_vitrine1\.gif/)) {
        nouveauTexte = 'Vente flash';
      }
    }

    // Insert le nouveau texte si necessaire
    if (nouveauTexte.length > 0) {

      var fontElem = document.createElement('font');
      fontElem.setAttribute('color', 'darkred');
      var text = document.createTextNode(nouveauTexte);
      fontElem.appendChild(text);
      fontElem.appendChild(document.createElement('br'));
      parentNode.appendChild(fontElem);
      parentNode.removeChild(current_img);
    } 
  }
 
})();


 
