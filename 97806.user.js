// ==UserScript==
// @name           BiteFight.AR
// @description	   links
// @include        http://s*.Bitefight.*/*
// @translation    DarkMoon-Blue
// version         BiteFight v1.4.0
// ==/UserScript==

//We get the server url

var dominio=document.domain;

var servidor="";

if(dominio.substr(0,1)=='s') {

	var pos=dominio.indexOf('.');

	servidor=dominio.substr(1,pos-1);

}

var sUrl="http://" + dominio;

var dominio_pais=dominio.substr(pos+1);



var pagina=String(document.location);

pagina=pagina.replace(sUrl,'').substr(1);



if(pagina!='') {

	pagina=pagina.split('/')[0];

}





//Now we change the left menu

var aEnlaces=new Array("/city/shop","/city/graveyard","/city/taverne","/city/grotte","/city/market","/city/counterfeiter","/city/church","/city/arena");

var aTextos=new Array();

var aCaption=new Array();

var sTextoServidor="Servidor";



switch (dominio_pais)

{



	//Arabic

	case 'ae.bitefight.org': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("التاجر","المقبرة","الحانة","الكهف","السوق","المكتبة","مستشفى","بيت الآلام");

		break;




	
	

		

}



//Lung tung

if(aTextos.length>0) {

	var cabecera = document.getElementsByTagName("img")[0];

	var nombre_imagen = cabecera.src;

	nombre_imagen = nombre_imagen.split('/')[nombre_imagen.split('/').length-1];

	if(nombre_imagen=='header_adfree.jpg') {

		cabecera.src=sUrl+"/img/header.jpg";

	}



	if(servidor!="" && sTextoServidor!="") {

		var contenido=document.getElementById('content');

		var capa_servidor = document.createElement('div');

		capa_servidor.setAttribute('style','font-size: 30pt; position: absolute; top: 170px; left: 200px; width: 775px; height: 75px; overflow: none;');

		sTextoServidor += " " + servidor;

		if(dominio_pais=="bitefight.es")

			sTextoServidor += " - Tribu Talones Rojos";

		capa_servidor.innerHTML = sTextoServidor;

		contenido.parentNode.insertBefore(capa_servidor,contenido);

	}



	var menu = document.getElementById('menu');

	var menu2=document.createElement('div');



	//Đã đăng ký bản quyền "http://userscripts.org/scripts/show/39478"

	var city = document.evaluate("//a[contains(@href, 'city/index')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;



	if (city) {

		var elemento=menu.getElementsByTagName('a')[3];

		elemento.style.display='none';



		var separador=document.createElement("br");

		elemento.parentNode.insertBefore(separador,elemento);



		for(i=0;i<aEnlaces.length;i++) {

			var enlace = document.createElement("a");

			enlace.setAttribute("href", sUrl+aEnlaces[i]);

			enlace.innerHTML = aTextos[i];

			if(aCaption[i])

				enlace.title=aCaption[i];

			elemento.parentNode.insertBefore(enlace,elemento);

		}

	}

}

