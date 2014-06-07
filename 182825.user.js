// ==UserScript==
// @name        construir edificios
// @namespace   antonigalileo@gmail.com
// @description construye edificios automáticamente
// @include     http://www.ricopolis.com/edificios.php
// @version     1
// @grant       none
// ==/UserScript==



var i=1;

if(i) {
aumentar=prompt("Introduzca el número del edificio a aumentar, de arriba a abajo y de izquierda a derecha, ej: 1 para Estanco, 10 para Industria ", "0");
i=0;



 
 
 
 while(aumentar == 1){
 var edificio = 'el Estanco';

	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(1)",500);
 }
 while(aumentar == 2){ 
 var edificio = 'la Librería';
  
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(2)",500);
 }
 while(aumentar == 3){ 
 var edificio = 'la Tienda de ropa';
  
	alert ("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(3)",500);
 }
 while(aumentar == 4){ 
 var edificio = 'la Discoteca';
  
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(4)",500);
 }
 while(aumentar == 5){ 
 var edificio = 'la Joyería';
 
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(5)",500);
 }
 while(aumentar == 6){ 
 var edificio = 'el Supermercado';
 
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(6)",500);
 }
 while(aumentar == 7){ 
 var edificio = 'el Banco';
 
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(7)",500);
 }
 while(aumentar == 8){ 
 var edificio = 'la Gasolinera';
 
	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(8)",500);
 }
 while(aumentar == 9){ 
 var edificio = 'el Centro comercial';

	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(9)",500);
 }
 while(aumentar == 10){ 
 var edificio = 'la Industria';

	alert("se está aumentando " +edificio+ ", cuanto más espere, más se aumentará");
 setInterval("construir(10)",500);
 }
 if(aumentar != 1 || 0 || 3 || 4 || 5 || 6 || 7 || 8 || 9 || 10){ alert ('Debe elegir un número');}

}

	

