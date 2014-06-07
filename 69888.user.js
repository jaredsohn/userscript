// ==UserScript==
// @name		World Select Ar
// @author		WTF
// @history		Modificado para servers de Argentina por Jorgitoh
// @include		http://ar.ikariam.com/
// ==/UserScript==

// NUMERO DE MUNDO
var id = 1;
var country = "ar";

// CODIGO DEL SCRIPT
var text = document.getElementById('universe');
text.innerHTML = text.innerHTML.replace('<option value="s' + id + '.' + country + '.ikariam.' + 'com">','<option value="s' + id + '.' +country + '.ikariam.' + 'com" selected="selected">');