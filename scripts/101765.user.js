// ==UserScript==
// @name           Musica
// @namespace      Mcat
// @description    Musica
// @include        http://www.habbo.es/me
// ==/UserScript==
//================================================================================//
function makeSoundDiv(nombre,newInnerHTML) {
    var oDiv = document.createElement ("DIV");
    oDiv.id = nombre;
 		oDiv.style.position = "absolute";
	
    oDiv.innerHTML=newInnerHTML;
    document.body.appendChild (oDiv);
    delete oDiv; }
//==================================Musica========================================//
function play(archivo) {
	var buff='';
		buff+='<object type="application/x-mplayer2" ';
			buff+=' pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" ';
			buff+=' Name="obj_'+archivo+'" src='+archivo+' AutoStart='+true+' ShowStatusBar=1 volume=-1 loop='+false+' >';
  		    buff+=' </object> ';
		    makeSoundDiv(archivo+"_buffer",buff);
}
var sonido = prompt("Introduze la cancion a reproducir","")
   play(sonido)