// ==UserScript==
// @name           Bitefight. Jugadores
// @namespace      Bitefight
// @include        http://s*.bitefight.es/bite/player.php?p=*
// ==/UserScript==

var contenido=document.getElementById('content');
if(contenido.getElementsByTagName('div').length>0) {
   var capa=contenido.getElementsByTagName('div')[0];
   var tabla=capa.parentNode.parentNode.parentNode;
   for(i=0;i<tabla.getElementsByTagName('tr').length;i++) {
      var tr=tabla.getElementsByTagName('tr')[i];
      if(tr.innerHTML.indexOf('Caracterización')!=-1) {
         var capa_texto=tabla.getElementsByTagName('tr')[parseInt(i)+1].childNodes[0].childNodes[0];
	 capa_texto.style.display='none';
	 //alert(capa_texto.innerHTML);
	 capa_texto.id='texto';
         var nodo=tr.childNodes[0];
	 nodo.innerHTML=nodo.innerHTML.replace('Caracterización','Caracterización&nbsp;');
         var enlace=document.createElement('a');
         enlace.innerHTML='Mostrar (+)';
	 enlace.id='id_caracterizacion';
	 enlace.href="#";
	 enlace.setAttribute("onclick","document.getElementById('texto').style.display=(document.getElementById('texto').style.display=='none')?'block':'none'");
         tr.childNodes[0].appendChild(enlace);
	 break;
      }
   }
}

