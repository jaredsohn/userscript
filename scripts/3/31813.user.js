// ==UserScript==
// @name           BiteFight_CazaAutomatica_Flukke
// @namespace      Caza automatica para bitefight entre otras cosas, incluye: caza automatica de humanos,
// reemplazados links para mostar mercado mercader y cementerio en el menu izquierdo, y algunas tareas
// automaticas en las misiones... en fin, esta mas que alpha, y el codigo super cochino, estubo en
// desarrollo continuo hace un tiempo, mi primer script xD, quizas si tiene buen recibimiento en la comunidad
// siga desarrollandolo ;D
// saludos!!
// http://s29.bitefight.es/bite/uebersicht.php


// @include        http://*.bitefight.es/bite/*
// ==/UserScript==


Utils = new Object();
if (document.getElementsByClassName) {
  /* Firefox 3: native implementation */
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    return node.getElementsByClassName(classname);
  }
} else {
  Utils.getElementsByClassName = function(classname, node) {
    if (!node) node = document;
    var xpathExpression;
    var returnElements = new Array();
    xpathExpression = ".//*[contains(concat(' ', @class, ' '), ' " + classname + " ')]";
    var xpathResult = document.evaluate(xpathExpression, node, null, XPathResult.ANY_TYPE, null);

    while (node = xpathResult.iterateNext()) {
      returnElements.push(node);
    }
  }
}
Utils.getElementsByXPath = function(expression, node) {
  if (!node) 
        node = document;
  var result = new Array();
  var xpathResult;
  xpathResult = document.evaluate(expression, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()) {
    result.push(node);
  }

  return result;
}
Utils.getFromTo = function(texto, primer, ultimo){
	if(primer) primer = texto.indexOf(primer)+1;
	else primer = 0;
	if(ultimo)  ultimo = texto.indexOf(ultimo);
	else ultimo = texto.length;

	return texto.substring(primer, ultimo);
}

function Jugador(niv, fue, def, des, res, car){
	this.nivel = niv;
	this.fuerza = fue;
	this.defens = def;
	this.destre = des;
	this.resist = res;
	this.carism = car;
	this.experi = 100;
	this.salud = 100;
}

var menu = document.getElementById("menu");
var LINK_MENSAJES = menu.childNodes[3];
var LINK_VODOO = menu.childNodes[12];
var LINK_CLAN  = menu.childNodes[14];
var LINK_AMIGOS = menu.childNodes[16];
var LINK_NOTAS = menu.childNodes[18];

LINK_MENSAJES.href = "msgshow.php?o=0";
menu.removeChild(LINK_VODOO);
LINK_CLAN.textContent = "MERCADER";
LINK_CLAN.href = "shop.php?goin=1";
LINK_AMIGOS.textContent = "MERCADO";
LINK_AMIGOS.href = "market.php?goin=1";
LINK_NOTAS.textContent = "CEMENTERIO";
LINK_NOTAS.href = "city.php?typ=2&goin=1";

var player = eval( GM_getValue("FLUKKE", '({})') );
var mensaje = "nada";

//mensaje de alguna cazeria
var fin = Utils.getElementsByXPath("//INPUT[@value='Fin del enigma']", cont)[0];
if(fin)  fin.click();
var fin = Utils.getElementsByXPath("//INPUT[@value='Continuar']", cont)[0];
if(fin)  fin.click();
var fin = Utils.getElementsByXPath("//INPUT[@value='Investigar la zona']", cont)[0];
if(fin)  fin.click();

var split = location.href.split('/');
var pagina = split[split.length-1];
switch(pagina){
	case "uebersicht.php.html":
	case "uebersicht.php":
		var skill = document.getElementById("skills");
		if(skill){
			var nivel  = Utils.getElementsByXPath(".//table/tbody/tr[1]/td[2]", skill)[0];
			nivel = nivel.innerHTML;
			var fuerza = Utils.getElementsByXPath(".//table/tbody/tr[2]/td[2]/span", skill)[0]
			fuerza = fuerza.innerHTML;
			var defens = Utils.getElementsByXPath(".//table/tbody/tr[3]/td[2]/span", skill)[0];
			defens = defens.innerHTML;
			var destre = Utils.getElementsByXPath(".//table/tbody/tr[4]/td[2]/span", skill)[0];
			destre = destre.innerHTML;
			var resist = Utils.getElementsByXPath(".//table/tbody/tr[5]/td[2]/span", skill)[0];
			resist = resist.innerHTML;
			var carism = Utils.getElementsByXPath(".//table/tbody/tr[6]/td[2]/span", skill)[0];
			carism = carism.innerHTML;
			var experi = Utils.getElementsByXPath(".//table/tbody/tr[7]/td[2]/span", skill)[0];
			var salud  = Utils.getElementsByXPath(".//table/tbody/tr[8]/td[2]/span", skill)[0];
			var p_actualizado = new Jugador(nivel, fuerza, defens, destre, resist, carism);
			if(p_actualizado.nivel==player.nivel)
				mensaje = "actualizando, con el mismo nivel.. no se hace nada (?)";
			else
				mensaje = "actualizando, cambio de nivel";
			player = p_actualizado;
			GM_setValue("FLUKKE", player.toSource());
			// actualizar y guardar la info del jugador
		}
		break;
	case "robbery.php":
		//falta: poder diferenciar cuando esta atacando de cuando no...
		var cont = document.getElementById("content");

		var b_humano = Utils.getElementsByXPath(".//DIV[2]/DIV[1]/DIV[2]/FORM/INPUT")[0];
		if(b_humano){
			b_humano.value = "HUMANO_";
			b_humano.click();
		}

		var b_vampiro = Utils.getElementsByXPath("./DIV[2]/DIV[3]/FORM/DIV/INPUT[2]", cont)[0];
		if(b_vampiro!=null)
			b_vampiro.value = "BUSCAR VAMP";
		else
			mensaje = "no puede cazar vampiro";


		var nivel  = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[11]/td[2]", cont)[0];
		var fuerza = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[12]/td[2]/span", cont)[0];
		var defens = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[13]/td[2]/span", cont)[0];
		var destre = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[14]/td[2]/span", cont)[0];
		var resist = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[15]/td[2]/span", cont)[0];
		var carism = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[16]/td[2]/span", cont)[0];
		var experi = Utils.getElementsByXPath(".//center/table/tbody/tr/td[3]/table/tbody/tr[17]/td[2]/span", cont)[0];
		var boton  = Utils.getElementsByXPath("//*[@value='Ataque']")[0];
/*
		if(boton!=null)
			mensaje = "ENEMIGO ENCONTRADO, con nivel: "+nivel.textContent;
		else
			mensaje = "en la pantalla de atake, no se encontro el boton: ";
*/
		//boton.value = "Ataka perrito!!!!!";
		// si tiene los datos, ver si se puede atakar a alguien		
		// si no, ir a la pagina a pedirlos, o, no ejecutar mas codigo
	break;
	case "highscore.php":
		var cont = document.getElementById("content");
		var razas = Utils.getElementsByXPath("./FORM/DIV/CENTER/P[2]/TABLE[1]/TBODY/TR/TH/SELECT[1]", cont)[0];
		var orden = Utils.getElementsByXPath("./FORM/DIV/CENTER/P[2]/TABLE[1]/TBODY/TR/TH/SELECT[2]", cont)[0];
		var prior = Utils.getElementsByXPath("./FORM/DIV/CENTER/P[2]/TABLE[1]/TBODY/TR/TH/SELECT[3]", cont)[0];
		var boton = Utils.getElementsByXPath("./FORM/DIV/CENTER/P[2]/TABLE[1]/TBODY/TR/TH/INPUT", cont)[0];
		if(razas && razas.value!=1 && prior.value!=20){
			razas.value = 1; // vampiros
			prior.value = 20; // 1000 ptos
			boton.value = "camboi";
			boton.click();
			mensaje = "cambiamos el orden";
		}
	break;
	case "grotte.php":
		var caza_corta = Utils.getElementsByXPath("//input[@value='Corto']")[0];
		if(caza_corta)  caza_corta.click();
	break;
		
}

// agrega el panel de info
var info = document.createElement("div");
info.innerHTML = "<table>  <caption>  Flukke's Bot: informacion  </caption>   <tfoot><tr><td>"+mensaje+"</td></tr></tfoot>    <tbody>  <tr> <td>Nivel</td>  <td>Fuerza</td>   <td>Defensa</td> <td>Destresa</td> <td>Resistencia</td>  </tr><tr><td>"+player.nivel+"</td> <td>"+player.fuerza+"</td> <td>"+player.defens+"</td> <td>"+player.destre+"</td> <td>"+player.resist+"</td></tr>  </tbody></table>";

var primero = document.body.childNodes[0]; 
document.body.insertBefore(info, primero);