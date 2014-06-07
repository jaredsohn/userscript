// ==UserScript==
// @name          McAnimet Remover Firma
// @version       1.0
// @namespace     zack0zack@gmail.com
// @description   Saca las Firma de los usuarios en los Foros de McAnimet.net
// @include	  http://www.mcanime.net/foro/viewtopic.php?t=*
// @copyright     zack0zack@gmail.com
// ==/UserScript==



var i, v = document.getElementsByTagName('div');
for(i= v.length-1;i >= 1; i-- ) {
  if (v[i].className == 'signature' ){
    v[i].parentNode.removeChild( v[i] );
  }
}
