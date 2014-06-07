// ==UserScript==
// @name       Время передачи артефактов
// @namespace  http://heroeswm.ru/
// @version    0.1
// @include     http://www.heroeswm.ru/art_transfer.php*
// @copyright  johniek_comp (http://www.heroeswm.ru/pl_info.php?id=1305405)
// ==/UserScript==

var url = document.location.pathname;

var node = document.getElementById("ar")

var elem = document.createElement("select");
elem.id = "calch"
elem.onchange = function(object){
	document.forms[0].dtime.value = ( 1 / 24 ) * parseInt(document.getElementById('calch').value) + ( 1 / 1440 ) * parseInt(document.getElementById('calcm').value);
}

var elem1 = document.createElement("select");
elem1.id = "calcm"
elem1.onchange = function(object){
	document.forms[0].dtime.value = ( 1 / 1440 ) * parseInt(document.getElementById('calcm').value) +  ( 1 / 24 ) * parseInt(document.getElementById('calch').value);
}

for (var i = 0;i <= 24; i++) {
	var option = document.createElement("option");
	option.text = i;
	option.value = i;
	elem.appendChild(option);	
};

for (var i = 0;i <= 60; i++) {
	var option = document.createElement("option");
	option.text = i;
	option.value = i;
	elem1.appendChild(option);	
};


var elem2 = document.createElement("b");
elem2.innerHTML = "часов";

var elem3 = document.createElement("b");
elem3.innerHTML = "минут";
node.appendChild(elem);
node.appendChild(elem2);
node.appendChild(elem1);
node.appendChild(elem3);
