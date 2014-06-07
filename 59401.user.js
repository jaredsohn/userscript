// ==UserScript==
// @name           BotonesAlcohol
// @namespace      mendigo
// @description    Pone dos botones al lado del Salir, uno para tomarse una bebida y otro para comerse algo.
// @include        http://*mendigogame.es*
// ==/UserScript==
if(document.getElementById("pfandflaschen_kurs_ajax_style")) {
	if(document.getElementById("counter2"))	{
		document.getElementById("counter2").style.position = "absolute";
		document.getElementById("pfandflaschen_kurs_ajax_style").getElementsByTagName("a")[0].innerHTML = document.getElementById("pfandflaschen_kurs_ajax_style").getElementsByTagName("a")[0].innerHTML.replace(/Cent/g, "&nbsp;");
	}
	var pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
	var alcohol = document.getElementsByTagName("li")[2].innerHTML.substr(pos - 1, 4).replace(".", "");	
	var limite = 280;
	var diferencia = limite - alcohol;	
	var cervezas = Math.floor(diferencia/35);	
	var grados = (Math.round(cervezas * 35)/100).toFixed(2)
	
	var boton1 = '<form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Bier"/><input id="Bier" type="hidden" value="0.35" /><input type="hidden" name="promille" value="35" /><input type="hidden" name="id" value="1" /><input type="hidden" id="lager_Bier" value="987" /><input id="menge_Bier" type="hidden" size="2" name="menge" value="' + cervezas + '"/><input id="drink_Bier" type="submit" value="+' + grados + '‰"/></form>';
	var boton2 = '<form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Currywurst"/><input id="Currywurst" type="hidden" value="-1.00"/><input type="hidden" name="promille" value="-100"/><input type="hidden" name="id" value="3"/><input type="hidden" id="lager_Currywurst" value="50"/><input id="menge_Currywurst" type="hidden" size="2" name="menge" value="1"/><input id="drink_Currywurst" type="submit" value="-1‰"/></form>';
	var boton3 = '<form style="display:inline;" method="post" action="/stock/foodstuffs/use/"><input type="hidden" name="item" value="Hamburger"><input id="Hamburger" type="hidden" value="-2.00"/><input type="hidden" name="promille" value="-200"/><input type="hidden" name="id" value="4"/><input type="hidden" id="lager_Hamburger" value="50"/><input id="menge_Hamburger" type="hidden" size="2" name="menge" value="1"/><input id="drink_Brot" type="submit" value="-2‰"/></form>';
	
	var codigo = '</form>';	
	if ((alcohol > limite) || (diferencia < 35)) {
		codigo = codigo + boton2 + boton3;		
	} else if (alcohol + 0 == 0) {
		codigo = codigo + boton1;
	} else if (alcohol == 200) {
		codigo = codigo + boton1 + boton3;
	} else if (alcohol <= 100) {
		codigo = codigo + boton1 + boton2;
	} else {
		codigo = codigo + boton1 + boton2 + boton3;
	}
	document.getElementsByTagName("li")[6].innerHTML = document.getElementsByTagName("li")[6].innerHTML + codigo; 
}






