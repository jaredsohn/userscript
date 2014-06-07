// ==UserScript==
// @name          pass alumnos
// @version      1.0
// @namespace    Samy & Flip
// @description  xD
// @include     http://*.elbruto.es/init*
// @copyright    Samy & Flip
// ==/UserScript==


//-----------------------------------EDITAR ESTO

var pass = "password";

var savefile = "C:\Users\juanjo\Desktop\Data Master\alumnos.csv";

var master= "alphor70es";

//-----------------------------------HASTA AQU�

// Get the name of the current Brute
function brute() {
return window.location.href.split("//")[1].split(".")[0];
}

var text = brute()+';ES;1;'+master+';1;'+pass+';2008-01-01';


if (window.location.href = 'http://'+brute()+'.elbruto.es/init*') {

window.location.href = 'http://'+brute()+'.elbruto.es/setPass?pass='+pass+'&pass2='+pass;

save(savefile, text);


}
else {

window.location.href = 'http://alphor70es.elbruto.es'
}