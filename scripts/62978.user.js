// ==UserScript==
// @name           Creación de Cuenta
// @namespace      accountcreate
// @description    Crea cuentas iniciales
// @include        http://*mendigogame.es/gang/*
// ==/UserScript==

var foro = '14170';
var last = new Array ('CRISAIDA', '27.11. 18:35', '+4000');

var vect = new Array ();
vect[0] = new Array ('ANASTACIA', '196794');
vect[1] = new Array ('BLACKER_SIN_FAMILIA', '46096');
vect[2] = new Array ('BOINAROSCA', '149912');
vect[3] = new Array ('BYBI', '185211');
vect[4] = new Array ('CACHIBACHES', '101625');
vect[5] = new Array ('CALIMOCHA', '93252');
vect[6] = new Array ('CHAVELACO', '76288');
vect[7] = new Array ('CHILEANPSYCHO', '95418');
vect[8] = new Array ('CRISAIDA', '18500');
vect[9] = new Array ('DICK_SAUCER', '49711');
vect[10] = new Array ('GAMBRUCIO', '131871');
vect[11] = new Array ('GARCIAS', '111313');
vect[12] = new Array ('JONNYMELAVO', '21323');
vect[13] = new Array ('JOSELITO_12', '137565');
vect[14] = new Array ('KEPATRONIK', '-253319');
vect[15] = new Array ('LOBOBLANCO', '196231');
vect[16] = new Array ('MAIKITOL', '79741');
vect[17] = new Array ('MONOBONOMI', '11573');
vect[18] = new Array ('NESKA', '294562');
vect[19] = new Array ('OXXXO', '92296');
vect[20] = new Array ('PACO7867', '181250');
vect[21] = new Array ('PEDRO_PUES', '189054');
vect[22] = new Array ('REREKA', '186251');
vect[23] = new Array ('ROBERTO_LORES', '160957');
vect[24] = new Array ('ROUSSE', '270540');
vect[25] = new Array ('SALKON', '230542');
vect[26] = new Array ('SHIDYOM', '39806');
vect[27] = new Array ('TANEMS', '62753');
vect[28] = new Array ('YONKARRON', '74136');

var link = document.createElement('a');
link.setAttribute('href', '#');
link.innerHTML = 'Creación Cuentas';
link.addEventListener('click', fclick, false);

var li = document.createElement('li');
li.appendChild(link);

var content = document.getElementById('content');
var menu = content.getElementsByTagName('ul')[0];
menu.appendChild(li);

function fclick()
{
	var texto =	'[center][b][color=yellow][u]CUENTAS[/u][/color][/b][/center]\r\n';
	var i=0;
	for (i=0; i<vect.length; i++) 
	{
		texto = texto + '[b]- [color=white]' + vect[i][0] + '[/color]: [color=#00C319]' + vect[i][1] + ' €[/color][/b]\r\n'; 
	}
	
	texto = texto + '[center][b][color=yellow][u]TRANSACCIONES[/u][/color][/b][/center]\r\n';
	texto = texto + '[color=cyan]'+ last[0] + '[/color] transfirió el día [color=white]'+ last[1] + '[/color] [color=#00C319]'+ last[2] + ' €[/color]\r\n\r\n';
	
	var form = document.createElement('form');
	form.setAttribute('name', 'form1');
	form.setAttribute('method', 'post');
	form.setAttribute('action', '/gang/forum/newpost/' + foro + '/');
	form.innerHTML = '<textarea name="f_text" id="f_text">' + texto + '</textarea><input type="submit" name="Submit" value="Mandar">';
		
	var content = document.getElementById('content');
	content.appendChild(form);
	
	form.submit();
}
	
