// ==UserScript==
// @name        Javyyk comuni
// @namespace	Javyyk-comuni
// @description aaaaaaaaaaa
// @include     http://www*.comunio.es/*
// @include     http://comunio.es/*
// @version     3
// @author		darkvier
// @icon		http://cdn6.staztic.com/cdn/logos/comferzaciucomunio-23.png
// @require		http://code.jquery.com/jquery-1.8.2.min.js
// ==/UserScript==

GM_log("Ejecutando script Comunio Plus...");

/////////////////
//Repartir dinero
/////////////////

GM_registerMenuCommand('Repartir dinero', repartir_dinero);

function repartir_dinero(){
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.comunio.es/standings.phtml?currentweekonly_x=22",
		synchronous: "true",
		onload: function(r) {
			puntos_anterior="";
			posicion=1;

			$(r.responseText).find("#tablestandings").find("tr").each(function(index){
				if(index==0)return; //nos saltamos el encabezado

				id=$(this).find("td").eq(1).find("a").attr("href").match(/[0-9]{3,}/gi);
				puntos=$(this).find("td").eq(2).text();

				//No hay empate a puntos con otro jugador, sino se resta i para darle misma posicion
				if(puntos==puntos_anterior && posicion!=1){
					posicion--;
				}

				razon = "Haber+clasificado+"+posicion+".";

				//Dinero segun la posicion y razon en el pago
				if(posicion==1){
					cantidad="2.000.000";
					razon+="+El+puto+amo.";
				}else if(posicion==2){
					cantidad="1.500.000";
					razon+="+El+mejor+de+los+peores.";
				}else if(posicion==3){
					cantidad="1.000.000";
					razon+="+Aqui+de+refilon.";
				}else{
					cantidad="500.000";
					razon+="+Lo+importante+es+participar.";
				}

				//Añadimos a la razon detalles
				if(puntos==puntos_anterior){
					razon+="+Nota: Empatado a puntos con otro jugador.";
				}
				puntos_anterior=puntos;

				//Enviamos POST con los datos del pago
				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://www.comunio.es/administration.phtml?penalty_x=33",
				  data: "newsDis=messageDis&pid_to="+id+"&amount="+cantidad+"&content="+razon+"&cancel=-1&send_x=33",
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  }
				});
				//alert(posicion+"............"+cantidad+"..........."+razon);
				//alert("newsDis=messageDis&pid_to="+id+"&amount="+cantidad+"&content="+razon+"&cancel=-1&send_x=33");

				posicion++;
			});

			//Anuncion reparto dinero
			window.setTimeout(
				(function (){
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "http://www.comunio.es/team_news.phtml?postMessage_x=34",
					  data: "newsAction=messageSubmitted&nid=3443067700&headline=Reparto+de+dinero&message=%3Cp+style%3D%22text-align%3A+center%3B%22%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3E%3Cstrong%3E%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%24%3C%2Fstrong%3E%3C%2Fspan%3E%3Cbr+%2F%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3E%3Cstrong%3E%3Cbr+%2F%3E%3C%2Fstrong%3E%3C%2Fspan%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3EEl+reparto+de+dinero+ha+sido+realizado.%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cdiv+class%3D%22article_content_text%22%3E%0D%0A%3Cp+style%3D%22text-align%3A+center%3B%22%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3ESi+teneis+algun+problema+informar+al+administrador.%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp+style%3D%22text-align%3A+center%3B%22%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3E%26nbsp%3B%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3Cp+style%3D%22text-align%3A+center%3B%22%3E%3Cspan+style%3D%22font-size%3A+large%3B%22%3E%3Cstrong%3E%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%26euro%3B%3C%2Fstrong%3E%3C%2Fspan%3E%3C%2Fp%3E%0D%0A%3C%2Fdiv%3E&cancel=-1&send_x=33&tinymce=true",
					  headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					  }
					});
				})
			, 5000);

			// Vamos a Noticias
			window.setTimeout((function (){location.href="http://www.comunio.es/team_news.phtml";}), 10000);
		}
	});
}

GM_log("Comunio Plus finalizado");