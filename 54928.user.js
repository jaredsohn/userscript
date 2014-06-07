// ==UserScript==
// @name           Mexican Broadcasting System for eRepublik
// @namespace      www.erepublik.com
// @description    Mexican Broadcasting System for eRepublik by Isidro Spencer
// @version        1.10
// @include        http://www.erepublik.com/en
// @include	   http://www.erepublik.com/es
// @include	   http://www.erepublik.com/*
// ==/UserScript==


// Este script ha sido diseñado para eMexico en eRepublik
// Su finalidad es tener un sistema de Noticias+Ordenes militares
// Gracias a eUS, eGermany, eCanada por la iniciativa en este tipo de Scripts
// Version 1.10
// Programado por Isidro Spencer
// Se aceptan donaciones ;) al perfil http://www.erepublik.com/en/citizen/profile/1493879


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://spencersoftware.freejoomlas.com/index.php',

	onload:function(response){

            //Retrieve and truncate string
            var order_string = response.responseText.match('class="order".*?#');
            order_string = order_string.join("");   //Array->string
            order_string = order_string.substring(order_string.indexOf('>')+1,order_string.length-1)

		        var tags = order_string.split('|');
			var orders = tags[0];
			var region = tags[1];
			var link = tags[2];
			var date_issued = tags[3];

			latest=document.getElementById('latestnews');

			title_el = document.createElement("h3");
			title_el.textContent = 'ORDENES MILITARES';

			params_el = document.createElement("h3");
			params_el.textContent = orders + ' ' + region;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = 'Link: '+link;

			updated_el=document.createElement("h2")
			updated_el.textContent ='Fecha: ' + date_issued;

            //Insert elements on page
            if(order_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(title_el, latest);
		latest.parentNode.insertBefore(params_el, latest);
                latest.parentNode.insertBefore(updated_el, latest);	
                latest.parentNode.insertBefore(link_el, latest);
            }

	}
	}
	);

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://spencersoftware.freejoomlas.com/index.php',

	onload:function(response){

            //Retrieve and truncate string
            var news_string = response.responseText.match('class="noticia".*?#');
            news_string = news_string.join("");   //Array->string
            news_string = news_string.substring(news_string.indexOf('>')+1,news_string.length-1)

		        var tags = news_string.split('|');
			var accion = tags[0];
			var noticia = tags[1];
			var link = tags[2];
			var date_issued = tags[3];

			latest=document.getElementById('shouts');

			title_el = document.createElement("h3");
			title_el.textContent = 'NOTICIAS OFICIALES';
			
			params_el = document.createElement("h3");
			params_el.textContent = accion + ' ' + noticia;

			link_el = document.createElement("a"); 
			link_el.setAttribute('href',link);
			link_el.innerHTML = 'Link: '+link;

			updated_el=document.createElement("h2")
			updated_el.textContent ='Fecha: ' + date_issued;

            //Insert elements on page
            if(news_string.length) {   //Only insert if string is uncommented
                latest.parentNode.insertBefore(title_el, latest);
		latest.parentNode.insertBefore(params_el, latest);
                latest.parentNode.insertBefore(updated_el, latest);	
                latest.parentNode.insertBefore(link_el, latest);
            }

	}
	}
	);