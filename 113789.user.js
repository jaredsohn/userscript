// ==UserScript==
// @name sectionyellow - my yellow pages
// @namespace http://www.kk.com
// @description Greasemonkey script for Firefox to copy ad of yellow pages
// @include *seccionamarilla.com.mx*


// ==/UserScript==

(function(){ 
   function textoanuncio(){
        var titulo, logo, texto, domicilio, telefono, todo,x,y,servicio,marca,otro,t;
        var id;
        id=document.URL; 
        titulo = document.getElementById("ctl00_cphBody_lblNombreCom").innerHTML;
        logo = document.getElementById("logoAnunciante").childNodes[1].src;
        texto = document.getElementById("ctl00_cphBody_lblTextolibre").innerHTML;     domicilio=document.getElementById("infocliente").childNodes[5].childNodes[1].lastElementChild.childNodes[2].textContent.replace(/\n/gi,"");
telefono=document.getElementById("infocliente").childNodes[5].childNodes[1].lastElementChild.childNodes[5].textContent.replace(/\n/gi,"");
todo = document.getElementById("infocliente").getElementsByTagName("span")[3].textContent.replace(/\n/gi,"");
t=document.getElementById("infocliente").getElementsByTagName("span")[3];
x=t.getElementsByTagName("h4");
        y = '<URL>'+id+'</URL><TITULO>'+titulo+'</TITULO><LOGO>'+logo+'</LOGO><TEXTO>'+texto+'</TEXTO><DOMICILIO>'+domicilio.replace(/^\s+|\s+$/g, "")+'</DOMICILIO><TELEFONO>'+telefono+'</TELEFONO><TODO>'+todo.replace(/^\s+|\s+$/g, "")+'</TODO>';

servicio="";
marca="";
otro="";

for(i=1;i<=x.length;i++){
  if( i==1 ){ servicio=x[0].textContent; }
  if( i==2 ){ marca=x[1].textContent; }
  if( i==3 ){ otro=x[2].textContent; } 
}
x='<SERVICIO>'+servicio+'</SERVICIO><MARCA>'+marca+'</MARCA><OTRO>'+otro+'</OTRO>';

        n = '<textarea onclick="javascript:this.select()" style="width:250px;height:600px;display:block;">'+y+x+'</textarea>';
        document.getElementById("dvVideo").innerHTML = n;
        x=document.getElementById("aspnetForm").action.lastIndexOf("=")+1;
        id=document.getElementById("aspnetForm").action.slice(x); 
        window.open("http://seccionamarilla.xaqui.com/adsa/mapapuntual/mapapuntual.aspx?action=start&pti=u&listadoid="+id,"mapa");
   }

   textoanuncio();

})();
