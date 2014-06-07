// ==UserScript==
// @name           Darkside: Clique para ampliar
// @namespace      http://shogunbr.blogspot.com/
// @description    Clique para ampliar imagens no http://forum.darkside.com.br/
// @include        http://forum.darkside.com.br/vb/showthread.php*
// ==/UserScript==

var maxHeight = 800;
var maxWidth = 800;


addEventListener ('click', function(event) {
  var target = event.target;
  if (target.alt == "Imagem diminuida") {
      if (event.which == 1) {
           target.removeAttribute("width");
           target.removeAttribute("height");
           target.removeAttribute("onclick");
           target.alt = "100%";
           return;
      }
  }
  if (target.alt == "100%"); {
    if (event.which == 1) { //codigo do jeep
        if (target.height > maxHeight)
                {
                 final=target.width /(target.height/maxHeight)
                 target.height = maxHeight
                 target.width = final
                 target.alt='Imagem diminuida'
                }

        if (target.width > maxWidth)
                {
                 final=target.height /(target.width/maxWidth)
                 target.width = maxWidth
                 target.height = final
                 target.alt='Imagem diminuida'
                }
   }
 }

}, true);
