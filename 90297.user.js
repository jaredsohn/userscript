// ==UserScript==
// @name           Multifecht más rápido Megaupload 
// @namespace      MFMU
// @description    Subida Semiatumática a Mu por Multifetch. SemiAutomatic Upload to MU from Multifetch
// @version        1.0
// @include        http://www.megaupload.com/?c=multifetch*
// @include        http://www.megaupload.com/?c=multifetch&s=transferstatus
// @include        http://www.megaupload.com/*
// @exclude        *#iframe*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.0+, Chrome 4+, Flock 2.0+
// ==/UserScript==


try{                                      

  document.getElementById('fetchurl').value='';
  document.getElementById('description').value='Descripción de la subida';
  document.getElementById('fetchurl').focus();

}catch(e){
 
}
if(window.location=='http://www.megaupload.com/?c=multifetch&s=transferstatus') {
    window.location='http://www.megaupload.com/?c=multifetch';
}

var all =document.getElementsByTagName('*');

for(var k=0, element; element=all[k++];)
{
  if(element.id== 'fetchurl'){
    element.addEventListener('keyup',alertas,false);
    //element.addEventListener('focusout',alertas,false);

  }
}
var madremia=0;
function alertas(){
    if(document.getElementById('fetchurl').value!='' && madremia==0){
        document.getElementById('fetchfrm').submit();
        madremia=1;
      }
}
function noNumbers(e){
  var keynum;
  var keychar;
  var numcheck;
  
  if(window.event) // IE
      {
      keynum = e.keyCode;
      }
  else if(event.which) // Netscape/Firefox/Opera
      {
      keynum = event.which;
      }
  keychar = String.fromCharCode(keynum);
  numcheck = /\d/;
    if(event.keyCode==13){
         return postfetch();
    }
}

function validar(){
  if(document.getElementById('fetchurl').value!=''){
    postfetch();
  }
} 