// version 0.3
// 2007/09/17


// ==UserScript==
// @name              OGame - Actualización automática de datos
// @author            aNTRaX - Modificado por FryGuy
// @description       Recorre la galaxia automáicamente exportando los datos al Galaxy Tool. 
// @include           http://*.ogame.com.es/*
// ==/UserScript==

var Time_min = 2000;   //MINIMUM TIMER IN MILISECONDS
var Time_max = 5000;   //MAXIMUM TIMER IN MILISECONDS

function galaxy() {
	var galaxia = document.getElementsByName('galaxy')[0];
	var sistema = document.getElementsByName('system')[0];
	
	//alert(galaxia.value + sistema.value);
	
	if(galaxia.value == 9 && sistema.value == 499){
	
		alert('Universo procesado');
		clearInterval(id);
		return;
		
	} else if (sistema.value < 499){
	
		document.getElementById('auto').name = 'systemRight';
		
	} else {
	
		sistema.value = 1;
		document.getElementById('auto').name = 'galaxyRight';
		
	}

	document.getElementById('galaxy_form').submit();

	setTimeout(galaxy,(Math.random() * (Time_max - Time_min)) + Time_min);
}

function mstats() {
  var lista = document.getElementsByName('start')[0];
  var x;
  
  //alert(lista.value.length);
  if (lista.value.length == 1) {
    lista.value = '101';
  } else if (lista.value.length == 3) {
    x = lista.value.substring(0, 1);
    x++;
    lista.value = x + '01';
  } else {
    x = lista.value.substring(0, 2);
    x++;
    if (x != 43) {
      lista.value = x + '01';
    } else {
      alert('Estadísticas procesadas');
  		clearInterval(id);
  		return;
		}
  }
  
  //alert(lista.value);
  document.forms[0].submit();
  setTimeout(mstats,(Math.random() * (Time_max - Time_min)) + Time_min + 5000);
};

(function(){
  if (location.href.search('=galaxy') != -1 ) 
    var id = setInterval(galaxy,(Math.random() * (Time_max - Time_min)) + Time_min);
  if (location.href.search('=stat') != -1 ) 
    var id = setInterval(mstats,(Math.random() * (Time_max - Time_min)) + Time_min);
})();