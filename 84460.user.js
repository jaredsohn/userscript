// ==UserScript==
// @name           Ricopolis ::: Casino Automatizado
// @namespace      Ricopolis.com
// @description    Funciones automatizadas en el casino de Ricopolis.com
// @author         Cirik
// @includes	   *ricopolis.com/casinos.usuario.php?casino=*
// @includes	   *ricopolis.com/casinos.listado.php
// ==/UserScript==

//var ndefichas = document.getElementById("fichas");
//ndefichas.value = ndefichas.length*5;

//var apuestaAutomatica = setInterval("var elbote = document.getElementById('mbote'); if //(elbote.innerHTML <= 25.000){setTimeout('clearInterval(apuestaAutomatica)',5); //location.href='ricopolis.com/casinos.listado.php'; alert('Bote repartido\\n\\nSaliendo del //casino');}else{apostar();}; if(resultado[0] > //0)//{setTimeout('clearInterval(apuestaAutomatica)',5); //location.href='ricopolis.com/casinos.listado.php';};",10);

setInterval("apostar()",5);