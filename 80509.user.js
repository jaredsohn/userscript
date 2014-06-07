// ==UserScript==
// @name           Auto login
// @namespace      www.solucioneslockerz.info
// @description    LLenar Datos de Login para Lockerz y Ptzplace
// @include        *ptzplace.lockerz.com*

// @include        *ptzplace.iblogger.org*

// @include        *k0st4s.org*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/

// @include        *lockerz.com*
// @exclude        *http://www.forolockerz.com/herramientas/simulador-redeem/*
// @exclude        *http://www.lockerz.com/user/update*
// @exclude        *http://www.lockerz.com/p/watch/*
// @exclude        *http://www.lockerz.com/dailies*
// @exclude        *http://www.forolockerz.com/*
// @exclude        *http://blog.lockerz.com/*
// @exclude        *http://shop.lockerz.com/*

// ==/UserScript==

var email = "E-MAIL"; // tu correo
var contra = "PASSWORD"; // tu contra
var url = document.domain; // obtener dominio
var inputs =  document.getElementsByTagName("input"); // inputs de la pag

if (url == "www.lockerz.com"){  // si url es = a lockerz.com entonces
document.forms[0].elements[0].checked = true; // recordar si "Remember me"
document.forms[0].elements[1].value = email; // asigna al primer input el correo
document.forms[0].elements[2].value = contra; // asigna la contrase?a al value (texto, lo pondra en mayusculas, no hay problema!)
document.forms[0].elements[3].value = contra; // asigna al segundo input la contrase?a 
document.forms[0].submit(); 

}else{
	// para ptzplace.lockerz
document.forms[0].elements[0].value = email; // en el  primer value asigna el email
document.forms[0].elements[1].value = contra; // en el segundo value asigna la contra
document.forms[0].submit(); 
	}

 function comprobaroigres (){  // funcion para comprobar que los value no esten vacios
if(inputs.length.value = " "){	//inputs vacios

}
 }

if (url == "http://ptzplace.lockerz.com"){  // comprobamos la url
	if(document.forms[0].elements[0].value = " " )   { // comprobamos que ptzplace no tenga el primer input vacio
		if(document.forms[0].elements[1].value = "EMAIL")   { // comprobamos que ptzplace no tenga el primer input no sea EMAIL   
        window.setTimeout(InfaliblePtzPlace, 100); // llama a InfaliblePtzPlace en 100 milisegundos
	}
	}
}

 if (url == "www.lockerz.com"){  // comprobamos la url
	if(document.forms[0].elements[1].value = " " )   { // comprobamos que lockerz no tenga el primer input vacio
		if(document.forms[0].elements[2].value = "COMBINATION")   { // comprobamos que en lockerz el segundo input no sea COMBINATION   
        window.setTimeout(InfalibleLockerz, 100); // llama a InfaliblePtzPlace 
	}
	}
}

 
 function InfalibleLockerz (){   // funcion de emergencia para lockerz
 document.getElementById("email-email").value = email; //en el id email-email le asigna el email
document.getElementById("password-password").value = contra; // en el id password-password le asigna la contra
 } 
 
 function InfaliblePtzPlace (){  // funcion de emergencia para ptzplace
document.getElementById("_email_").value = email; //en el id _email_" le asigna el email
document.getElementById("_combination_").value = contra; // en el id _combination_ le asigna la contra
 }  
