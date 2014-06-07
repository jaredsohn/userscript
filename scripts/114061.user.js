// ==UserScript==
// @name mapssectionyellow - my yellow pages
// @namespace http://www.kk.com
// @description Greasemonkey script for Firefox to copy ad of yellow pages
// @include *seccionamarilla.xaqui.com*


// ==/UserScript==

(function(){ 
   function getpos(){
      var x,y,z,n;
      x=document.body.attributes["onload"].value.slice(5);
      z=x.split(",",3);

      y = '<LATITUD>'+z[0].replace(/'/gi,"")+'</LATITUD><LONGITUD>'+z[1].replace(/'/gi,"")+'</LONGITUD>';

        n = '<textarea onclick="javascript:this.select()" style="width:250px;height:600px;display:block;">'+y+'</textarea>';
        document.body.innerHTML = n;
   }

   getpos();

})();
