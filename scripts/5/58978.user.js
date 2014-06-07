// ==UserScript==
// @name           CuentaChatarra 
// @namespace     
// @description    Calcula la chatarra a vender según el dinero que necesites
// @include        http://*mendigogame.es/stock/bottle/*

// ==/UserScript==

var maximal = parseInt(document.getElementById("max").value);
var my_kurs_x = document.getElementById('wirkung').innerHTML.split('0,');
var my_kurs_2 = my_kurs_x[1].substr(0, 2)/100;

var table = document.getElementsByClassName('listshop')[0].getElementsByTagName('table')[0];
var tbody = table.getElementsByTagName('tbody')[0];
var tr = tbody.getElementsByTagName('tr');
var table_2 = document.getElementById('infoscreen').getElementsByTagName('ul')[0];
var cash = table_2.getElementsByTagName('li')[1].innerHTML;
cash = cash.split(unescape("%u20AC"));
cash = cash[1].replace(/\./g, "");
cash = cash.replace(/,/, ".");



var newtr = new Array();
for (x = 0; x <= 4; x++){
		newtr[x] = document.createElement('tr');
		tbody.appendChild(newtr[x]);
	}

document.getElementById('menge_verkauf').setAttribute('onkeyup', 'document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * document.getElementById(\'Kurs\').value*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * document.getElementById(\'Kurs\').value + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / document.getElementById(\'Kurs\').value);}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );
table.getElementsByTagName('input')[3].setAttribute('onclick', 'max_flaschen();document.getElementById("summe").value = Math.round(document.getElementById("menge_verkauf").value * document.getElementById(\'Kurs\').value*100)/100 ; document.getElementById("all").value = Math.round((document.getElementById("menge_verkauf").value * document.getElementById(\'Kurs\').value + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / document.getElementById(\'Kurs\').value);}else{document.getElementById(\'all\').style.backgroundColor = \'\';};' );

tr[1].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe"></td><td>Dinero deseado:</td><td><input id="summe" type="text" size="3" name="summe" value="' + my_kurs_2 + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / document.getElementById(\'Kurs\').value); document.getElementById(\'all\').value = Math.round((Number(document.getElementById(\'summe\').value) + '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}; if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000; document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / document.getElementById(\'Kurs\').value);}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';


tr[2].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe2"></td><td>Total contando el bolsillo:</td><td><input id="all" type="text" size="3" name="all" value="' + (Math.round((Number(cash) + Number(my_kurs_2))*100)/100) + '" onKeyup="document.getElementById(\'menge_verkauf\').value = Math.ceil((document.getElementById(\'all\').value - '+ cash +') / document.getElementById(\'Kurs\').value); document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; if(document.getElementById(\'all\').value.length > 6){document.getElementById(\'all\').size = document.getElementById(\'all\').value.length;document.getElementById(\'summe\').size = document.getElementById(\'summe\').value.length;document.getElementById(\'menge_verkauf\').size = document.getElementById(\'menge_verkauf\').value.length;}if(document.getElementById(\'all\').value >1000000){document.getElementById(\'all\').style.backgroundColor = \'#CC0000\'; document.getElementById(\'all\').value = 1000000;document.getElementById(\'summe\').value = Math.round((document.getElementById(\'all\').value - '+ cash +')*100)/100; document.getElementById(\'menge_verkauf\').value = Math.ceil(document.getElementById(\'summe\').value / document.getElementById(\'Kurs\').value);}else{document.getElementById(\'all\').style.backgroundColor = \'\';};"/>&nbsp;&euro;</td>';

if(document.getElementById('all').value.length > 6){
	document.getElementById('all').size = document.getElementById('all').value.length;
}

tr[3].innerHTML = '<td><img src="http://media.pennergame.de/img/cash.png" alt="summe"></td><td>Cent Actual:</td><td><input type="text" id="Kurs" size="3" value="' + my_kurs_2 + '" onKeyup="document.getElementById(\'all\').value = Math.round((Number(' + cash + ') + Number(this.value))*100)/100; document.getElementById(\'menge_verkauf\').value = 1; document.getElementById(\'summe\').value = this.value;">&nbsp;&euro;</td>';

//Copyright by NewMan - Adaptado y traducido por muertet