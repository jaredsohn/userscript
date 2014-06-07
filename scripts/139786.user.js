// ==UserScript==
// @name          Fussballcup Einkauf
// @namespace     akk
// @description   Fuellt automatisch alle Bestellfenster mit der maximalen Anzahl
// @version       0.1
// @include       http://fussballcup.de/index.php?w=301&area=user&module=shop&action=index
// @exclude       
// ==/UserScript==

// Fanshop
document.getElementById('amount[1]').value = document.getElementById('amount[1]').getAttribute('amount');
document.getElementById('amount[2]').value = document.getElementById('amount[2]').getAttribute('amount');
document.getElementById('amount[3]').value = document.getElementById('amount[3]').getAttribute('amount');
document.getElementById('amount[5]').value = document.getElementById('amount[5]').getAttribute('amount');
document.getElementById('amount[8]').value = document.getElementById('amount[8]').getAttribute('amount');
document.getElementById('amount[9]').value = document.getElementById('amount[9]').getAttribute('amount');
document.getElementById('amount[11]').value = document.getElementById('amount[11]').getAttribute('amount');
document.getElementById('amount[12]').value = document.getElementById('amount[12]').getAttribute('amount');


// Restaurant
document.getElementById('amount[13]').value = document.getElementById('amount[13]').getAttribute('amount');
document.getElementById('amount[14]').value = document.getElementById('amount[14]').getAttribute('amount');
document.getElementById('amount[15]').value = document.getElementById('amount[15]').getAttribute('amount');
document.getElementById('amount[16]').value = document.getElementById('amount[16]').getAttribute('amount');
document.getElementById('amount[17]').value = document.getElementById('amount[17]').getAttribute('amount');
document.getElementById('amount[18]').value = document.getElementById('amount[18]').getAttribute('amount');
document.getElementById('amount[21]').value = document.getElementById('amount[21]').getAttribute('amount');
document.getElementById('amount[22]').value = document.getElementById('amount[22]').getAttribute('amount');
