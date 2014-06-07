// ==UserScript==
// @name	EmolImprimeFotos
// @namespace	http://www.hardings.cl/hacking/greasemonkey/emol
// @description	Permite imprimir obviando el sistema de "protección" de fotos.
// @include	http://diario.elmercurio.com/*
// ==/UserScript==

var allImages, thisImage, hiddenURL;
allImages = document.getElementsByTagName('img');
for (var i = 0; i < allImages.length; i++) {
    thisImage = allImages[i];
    //alert('src = ' + thisImage.src + '; style = ' + thisImage.style);
      if (thisImage.src == "http://diario.elmercurio.com/images/pixel.gif") {
        hiddenURL = thisImage.style.backgroundImage.replace('url(','').replace(')','');
        //alert('Reemplazando ' + thisImage.src + ' por ' + hiddenURL);
        thisImage.src = hiddenURL;
        thisImage.style = null;
    }
}
