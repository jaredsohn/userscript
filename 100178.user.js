// ==UserScript==
// @name           MONO-PESTAÑAS-ATIC
// @namespace      miguel_carrera@hotmail.es
// @include        https://maul.upc.es:8444/*
// ==/UserScript==


if (buscaDominio() == "UPCnet") {
	nuevaPestana("atic");
	nuevaPestana("caixaRapida");
}

/**
 * ESPECIFICACION: Esta función añade la pestaña 'ATIC', 'CAIXA RAPIDA' o 'TECNIC
 * BULL' según el nombre de la pestaña a insertar introducido como parámetro
 **/
function nuevaPestana(equipo)	{
	var pestana = document.createElement("li");
	var a = document.createElement("a");

	switch (equipo) {
		case "caixaRapida":
			if(debug == true) console.info("Pestaña Caixa Rapida");
			a.setAttribute("id", "CR");
			var textoLink = document.createTextNode("CR");
			a.href = 'https://maul.upc.es:8444/tiquets/control/tiquetsAssignatsConsulta?VIEW_SIZE=2&VIEW_INDEX=1&statusId=TIQUET_STATUS_OBERT&personaAssignada=&personaAssignadaDecorator=&equipResolutor=11140&equipResolutorDecorator=FO%20-%20Caixa%20Rapida&personaSolicitant=&producteAfectat=&dataMajorQue=&dataMenorQue=&dataMajorQueT=&dataMenorQueT=&pasId=&descripcio=&idTiquet=&tipusCerca=avancada&nomesTancats=on&client=&clientRol=ACCOUNT&clientDecorator=&productId=&productIdDecorator=&cercant=on&sensePaginacio=on&ORDER_BY=createdDate';
		break;

		case "atic":
			if(debug == true) console.info("Pestaña Atic");
			a.setAttribute("id", "AT");
			var textoLink = document.createTextNode("ATIC");
			a.href = 'https://maul.upc.es:8444/tiquets/control/tiquetsAssignatsConsulta?VIEW_SIZE=4&VIEW_INDEX=1&statusId=TIQUET_STATUS_OBERT&personaAssignada=&personaAssignadaDecorator=&equipResolutor=11112&equipResolutorDecorator=FO%20-%20ATIC&personaSolicitant=&producteAfectat=&dataMajorQue=&dataMenorQue=&dataMajorQueT=&dataMenorQueT=&pasId=&descripcio=&idTiquet=&tipusCerca=avancada&nomesTancats=on&client=&clientRol=ACCOUNT&clientDecorator=&productId=&productIdDecorator=&cercant=on&sensePaginacio=on&ORDER_BY=createdDate';
		break;
	}

	a.appendChild(textoLink); 
	pestana.appendChild(a);
	if (document.getElementById('headerboxAplicacio') != null) {
		document.getElementById('headerboxAplicacio').appendChild(pestana);
	}
}



/**
 * Esta función devuelve el nombre del dominio del gestor sobre el cual estamos
 * trabajando
 **/
function buscaDominio(){
	var dominio = "";
	var operador2 = document.getElementsByTagName('a');
	var puntero = 0;
	var cant = operador2.length;
	var nombreOperador;
	while(puntero < cant) {
		operador = operador2[puntero].getAttribute('href');

		if(operador.lastIndexOf("persones/control/vinculacionsPopup") != -1) {
			if (operador2[puntero].getAttribute('title') != null) {
				dominio = operador2[puntero].getAttribute('title');
				break;
			}
		}
		puntero++;
	}
	return dominio;
}
