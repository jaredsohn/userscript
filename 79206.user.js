// ==UserScript==
// @name           Alfabank simple login
// @namespace      http://localhost
// @description    hide password2 in alfabank controller frame
// @include        https://click.alfabank.ru/ALFAIBSR/ControllerServlet*
// author: 93
// ==/UserScript==

function doc_onload (){
 //alert('doc_onload: ' +this.location);
 var f=document.getElementById('simpleForm');
 for (var j = 0; j < f.childNodes.length; j++) {
  if (f.elements[j].name == 'password2' ){
   var p2=f.elements[j];
   if(p2){
    var p=p2.parentNode;
    if(p){
     if(p) p.removeChild(p2);
    }
   }
  } 
 }
 this.removeEventListener( 'load', arguments.callee, true );
}

this.addEventListener( 'load', doc_onload, true );

//var p2 = false;
//p2=this.getElementsByName('password2')[0];
