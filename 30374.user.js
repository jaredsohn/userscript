// ==UserScript==
// @name       Nekomimi Useful Script For DollarHunter
// @namespace  thank older script writer 
// @email          
// @description    My useful script
// @version        
// @include        http://*view*.php*
// @include        *adclick*
// ==/UserScript==

var i, v = document.getElementsByTagName('iframe');
  for(i= v.length-1;i >= 1; i-- ) {
    v[i].parentNode.removeChild( v[i] );
}

{unsafeWindow.x = 1;}

var i, v = document.getElementById("x").value = '1';

var i, v = setTimeout("x").value = '1';

