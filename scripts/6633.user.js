// ==UserScript==
// @name OGame: Incremento de estadisticas
// @author Lord Mokuba (Modified by warbird)
// @description Muestra los cambios en la vision de estadisticas
// @include http://uni*.ogame.it/game/*
// @include http://ogame*.de/game/*
// ==/UserScript==


(function(){
	if (location.pathname.search('stat.php') != -1 ) {
		// Intenta activar la conexion
		var pagina = document.getElementsByTagName ('th');
		//for (var i = pagina.length - 1; i >= 0; i--) {
		for (var i = 0; i < pagina.length; i++) {
			evento = pagina[i].innerHTML;
			if (evento.substr(0,2) != '<t'){
				//divide jugadores de alianzas
				pos=evento.search('this.T_WIDTH=30;return escape');
				if (pos != -1){
					pos=evento.search('\">');
					if(pos != -1 ) {
						mystring = evento.substr(pos+3,10);
						pos = mystring.search('<');
						if (pos != -1){
							mystring=mystring.substr(0,pos);
							mystring2 = pagina[i].childNodes[1].firstChild.innerHTML;
							ch = mystring2.substr(mystring2.length-1, 1);
							mystring2 = mystring2.substr(0, mystring2.length-1);
							if (ch=="+"){
							  ch2="&uarr;";
							}else
							{
							  ch2="&darr;";
							};
							pagina[i].childNodes[1].firstChild.innerHTML = mystring2+ch2+mystring;
						}
					}
				}
			}
		}
	}

}) ();



