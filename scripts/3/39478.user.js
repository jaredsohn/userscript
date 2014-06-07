// ==UserScript==
// @name           BITEFIGHT.VN SCRIPT
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

	//Đức

	case 'bitefight.de':

		sTextoServidor="Server";

		aTextos=new Array("Händler","Friedhof","Taverne","Grotte","Marktplatz","Bibliothek","Kirche","Haus des Schmerzes");

		sTextoServidor="Server";

		break;


	//Brazil

	case 'br.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("Mercador","Cemitério","Taberna","Gruta","Mercado","Biblioteca","Igreja","Casa da Dor");

		sTextoServidor="Server";

		break;



	//Bulgaria

	case 'bg.bitefight.org': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("Търговец","Гробище","Таверна","Пещера","Пазар","Библиотека","Църква","Домът на Болката");

		sTextoServidor="Server";

		break;



	//Argentina

	//Chile

	//Colombia

	//España

	//México

	//Perú

	//Venezuela

	case 'ar.bitefight.org':

	case 'cl.bitefight.org': //ko biết đc hay ko =))

	case 'co.bitefight.org': //ko biết đc hay ko =))

	case 'bitefight.es':

	case 'bitefight.com.mx': //ko biết đc hay ko =))

	case 'bitefight.pe': //ko biết đc hay ko =))

	case 'bitefight.com.ve':

		sTextoServidor="Servidor";

		aTextos=new Array("Mercader","Cementerio","Taberna","Gruta","Mercado","Biblioteca","Iglesia","Casa del Dolor");

		break;

	

	//Mỹ

	//Ấn Độ

	//Anh

	case 'bite-fight.us': //ko biết đc hay ko =))

	case 'bitefight.in': //ko biết đc hay ko =))

	case 'bitefight.org': //ko biết đc hay ko =))

		sTextoServidor="Servidor";

		aTextos=new Array("Merchant","Graveyard","Tavern","Grotto","Market place","Library","Church","House of Pain");

		break;


	//ý

	case 'bitefight.it': //sin probar

		sTextoServidor="Servidor";

		aTextos=new Array("Mercante","Cimitero","Taverna","Grotta","Mercato","Biblioteca","Chiesa","Casa del Dolore");

		break;



	//Nhật

	case 'bitefight.jp': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("商人","墓場","酒場","洞窟","市場","図書館","教会","痛みの館");

		break;



	//Nga

	case 'bitefight.ru': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("Торговец","Кладбище","Таверна","Пещера","Рынок","Библиотека","Храм","Дом Боли");

		break;



	//Phillipines

	case 'bitefight.ph':

		sTextoServidor="Server";

		aTextos=new Array("Mangangalakal","Libingan","Taberna","Grotto","Pamilihan","Silid Aklatan","Simbahan","Bahay ng Sakit");

		break;



	//Phần Lan

	case 'fi.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("Kauppa","Hautausmaa","Taverna","Luola","Tori","Kirjasto","Kirkko","Kivun Talo");

		break;



	//Pháp

	case 'bitefight.fr':

		sTextoServidor="Server";

		aTextos=new Array("Marchand","Cimetière","Taverne","la Grotte","Place du marché","Librairie","Église","Antre de la Douleur");

		break;



	//Hungría

	case 'bitefight.hu':

		sTextoServidor="Server";

		aTextos=new Array("Kereskedő","Temető","Fogadó","Barlang","Piac","Könyvtár","Templom","Kínok Háza");

		break;



	//In đô

	case 'id.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("Saudagar","Makam","Tempat...","Gua","Pasar","Perpustakaan","Gereja","Rumah...");

		aCaption=new Array("","","Tempat minum-minum","","","","","Rumah penyiksaan");

		break;



	//Israel

	case 'bitefight.co.il':

		sTextoServidor="Server";

		aTextos=new Array("בית הסבל","כנסיה","ספריה","שוק","מערה","טברנה","בית קברות","סוחר");

		break;




	//Na Uy

	case 'bitefight.no':

		sTextoServidor="Server";

		aTextos=new Array("Kjøpmann","Kirkegård","Kro","Grotte","Markedsplass","Bibliotek","Kirken","Hus av Smerte");

		break;




	//Bồ Đào Nha

	case 'bitefight.com.pt':

		sTextoServidor="Server";

		aTextos=new Array("Mercador","Cemitério","Taberna","Gruta","Mercado","Biblioteca","Igreja","Casa do...");

		aCaption=new Array("","","","","","","","Casa do Sofrimento");

		break;




	//Rumania

	case 'bitefight.ro':

		sTextoServidor="Server";

		aTextos=new Array("Negustor","Cimitir","Taverna","Caverna","Piata","Biblioteca","Biserica","Casa Durerii");

		break;



	//Séc bi a

	case 'bitefight.rs':

		sTextoServidor="Server";

		aTextos=new Array("Трговац","Гробље","Крчма","Пећина","Пијаца","Библиотека","Црква","Кућа Бола");

		break;



	//Đài Loan

	case 'bitefight.tw':

		sTextoServidor="Server";

		aTextos=new Array("商店","墓地","酒館","洞穴","市場","藏書館","教會","苦痛刑房");

		break;





	//Việt Nam

	case 'bitefight.vn':

		sTextoServidor="Server";

		aTextos=new Array("Nhà buôn","Nghĩa trang","Quán rượu","Hang động","Khu chợ","Thư viện","Nhà thờ","Nhà đau đớn");

		aCaption=new Array("Nhà buôn","Nghĩa trang","Quán rượu","Hang động","Khu chợ","Thư viện","Nhà thờ","Ngôi nhà của sự đau đớn");

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

