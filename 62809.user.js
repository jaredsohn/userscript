// ==UserScript==
// @name           Aviso Armas
// @namespace      avisoarmas
// @description    Avisa cuando se llega a un nivel de ATT que proporciona una arma para comprar
// @include        http://*mendigogame.es/overview/*
// ==/UserScript==

GM_xmlhttpRequest(
{
	method: 'GET',
   	url: 'http://www.mendigogame.es/skills/',
    onload: function(responseDetails) 
    {
       	var content = responseDetails.responseText;
		var text = content.split('<td width="210"><div class="processbar_bg">&nbsp;&infin;</div></td><td width="108">')[1];
		var nivel = parseInt(text.split('<span class="style9">/&infin;</span></td>')[0]);
				
		var arma = '-';
		
		if ((nivel == 1) || (nivel<81 && nivel%4 == 0) || (nivel>80 && nivel !=95 && nivel<101 && (nivel%5 == 0)))
		{			
			arma = getArma(nivel);
		}
				
		var span = document.createElement("span");
		span.setAttribute('style', 'color:yellow;');	
				
		if (arma != '-')
		{
			span.innerHTML = '<b>Nivel: ' + nivel + ' Arma: <blink>' + arma + '</blink></b>&nbsp;';
			
			var fbutton = document.createElement("input");
			fbutton.type = 'button';
			fbutton.value = 'Comprar';
			fbutton.addEventListener('click', fclick, false);
		}
		else
		{
			var sup = '-';
			if (nivel < 81 && nivel > 4)
			{
				sup = nivel + (4 - (nivel % 4));
			}
			else if (nivel > 80 && nivel != 95)
			{
				sup = nivel + (5 - (nivel % 5));
			}
			else if (nivel == 95)
			{
				sup = 100;
			}
			span.innerHTML = '<b>Nivel Actual: ' + nivel + ' Próximo: ' + sup + '</b>';
		}
		
		var mydiv = document.createElement("div");		
		mydiv.setAttribute('style', 'float: right;');
		mydiv.appendChild(span);
		
		var br1 = document.createElement("br");		
		br1.setAttribute('clear', 'all');
		
		var br2 = document.createElement("br");		
		br2.setAttribute('clear', 'all');
				
		if (arma != '-')
		{
			mydiv.appendChild(fbutton);
		}
		
		var summary = document.getElementById('summary');
		var div = summary.getElementsByTagName('div')[1];
		
		summary.insertBefore(mydiv, div);
		summary.insertBefore(br1, div);
		summary.insertBefore(br2, div);
	}
});


	
function fclick(ev) 
{
	top.location.href= '/city/weapon_store/';	
}

function getArma(nivel)
{
	switch (nivel)
	{
		case 1: return 'Palillos (ATT: +1)';
		case 4: return 'Abanico (ATT: +3)';
		case 8: return 'Botella rota (ATT: +6)';
		case 12: return 'Bombas de agua (ATT: +9)';
		case 16: return 'Petardos (ATT: +12)';
		case 20: return 'Latas de spray (ATT: +15)';
		case 24: return 'Cinturón (ATT: +18)';
		case 28: return 'Porra (ATT: +21)';
		case 32: return 'Tapa de la alcantarilla (ATT: +25)';
		case 36: return 'Candado de cadenas (ATT: +28)';
		case 40: return 'Puño americano (ATT: +31)';
		case 44: return 'La lanza (ATT: +34)';
		case 48: return 'Spray de pimienta (ATT: +37)';
		case 52: return 'Pistola de electroshock (ATT: +41)';
		case 56: return 'Espada (ATT: +44)';
		case 60: return 'Pistola vieja (ATT: +47)';
		case 64: return 'Navaja (ATT: +50)';
		case 68: return 'Metralleta (ATT: +54)';
		case 72: return 'Escopeta de Cañones Recortados (ATT: +58)';
		case 76: return 'Cañón Gigante (ATT: +62)';
		case 80: return 'Tanque Grandote (ATT: +66)';
		case 85: return 'Martillo (ATT: +70)';
		case 90: return 'Bomba Atómica (ATT: +75)';
		case 100: return 'Agujero Negro (ATT: +80)';		
		default: return 'Arma Nueva';
	}
}