// ==UserScript==
// @name           Tiempo Guepart
// @namespace      TiempoGuepart
// @include        http://guepart/TelefonoGuardia*/*
// ==/UserScript==


GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://guepart/Atencion Tecnicos/AnadirInstalacion.php',
   onload: function(responseDetails) {
  
		var content = responseDetails.responseText;
		//obtenemos hora guepart
		var horaguepartnoparcheada = responseDetails.responseText.split('alue')[62].split('" sty')[0];
		//document.getElementsByTagName("h1")[0].innerHTML = "Tecnicos Encolados<div name=putahora id=putahora width=0 heigth=0 style='visibility:hidden'>"+ responseDetails.responseText.split('alue')[62].split('" sty')[0]+"</div>"
		//document.getElementsByTagName("h1")[0].innerHTML = horaguepartnoparcheada

		//sacamos horas individuales de la hora de guepart
		var gueparthora = horaguepartnoparcheada.substring(2,4);
		var guepartminutos = horaguepartnoparcheada.substring(5,7);
		var guepartsegundos = horaguepartnoparcheada.substring(8,10);
		//document.getElementsByTagName("h1")[0].innerHTML = gueparthora+":"+guepartminutos+":"+guepartsegundos
			

		var cantidad = document.evaluate("count(//input[contains(@name,'bAtender')])",document,null,0,null).numberValue;
		var tr = 4;
		for (var x = 0; x < cantidad; x++) {

			//OBTENER FECHA DE CADA TABLA HORAS
			var obtenerfecha = document.getElementsByTagName("tr")[tr].innerHTML.split('center"')[8].split('<')[0];
			var obtenerfechacompleta = obtenerfecha.substring(1,9);
			var obtenerhorafecha = obtenerfecha.substring(1,3);
			var obtenerminutosfecha = obtenerfecha.substring(4,6);
			var obtenersegundosfecha = obtenerfecha.substring(7,9);

			//document.getElementsByTagName("h1")[0].innerHTML = guepartsegundos

			//obtener hora actual
			var ahora = new Date();
			ahora.setHours(gueparthora,guepartminutos,guepartsegundos);

			//fecha del formulario completa
			var fechacompleta = new Date();
			fechacompleta.setHours(obtenerhorafecha,obtenerminutosfecha,obtenersegundosfecha);

			//Obtener difeerencia
			var diferencia = ahora.getTime() - fechacompleta.getTime();

			//PASA DE SEGUNDOS A HORAS
			//VISTO EN http://www.webtaller.com/construccion/lenguajes/javascript/lecciones/conversion_de_tiempo_en_javascript.php
			var difsec = Math.floor(diferencia / 1000);
			var difhrs = Math.floor(difsec/3600);
			var difmin = Math.floor((difsec%3600)/60);
			difsec = difsec % 60;
			if(difsec<10) difsec = "0" + difsec;
			if(difmin<10) difmin = "0" + difmin;
			if(difhrs<10) difhrs = "0" + difhrs;
			var diftotal = difhrs + ":" + difmin + ":" + difsec;

			//MUESTRA EL CONTENIDO
			if (difmin >=2 & difsec >=30) {
				document.getElementsByTagName("tr")[tr].getElementsByTagName("td")[7].innerHTML = obtenerfechacompleta+" <font color=red><strong>"+diftotal+"</strong></color>";
			} else {
				document.getElementsByTagName("tr")[tr].getElementsByTagName("td")[7].innerHTML = obtenerfechacompleta+" <font color=green>"+diftotal+"</color>";
			}

			//sumar al tr
			tr=tr+1;
		}
	
//PARENTESIS DEL GM_xmlhttpRequest
	}
})

