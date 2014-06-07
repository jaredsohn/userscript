// ==UserScript==

// @name           Bitefight. Menus

// @namespace      Bitefight

// @include         http://*.bitefight.*/*

// @include         http://*.bite-fight.*/*

// @version        1.1.9

// ==/UserScript==





//Obtenemos el servidor de la url

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





//Ahora cambiamos los menús de la izquierda

var aEnlaces=new Array("/city/shop","/city/graveyard","/city/taverne","/city/grotte","/city/market","/city/counterfeiter","/city/church","/city/arena");

var aTextos=new Array();

var aCaption=new Array();

var sTextoServidor="Servidor";



switch (dominio_pais)

{

	//Alemania

	case 'bitefight.de':

		sTextoServidor="Server";

		aTextos=new Array("Händler","Friedhof","Taverne","Grotte","Marktplatz","Bibliothek","Kirche","Haus des Schmerzes");

		sTextoServidor="Server";

		break;



	//Bielorrusia

	case 'bitefight.by':

		sTextoServidor="Server";

		aTextos=new Array("Гандляр","Могільнік","Карчма","Пячора","Рынак","Бібліятэка","Храм","Хата Болю");

		sTextoServidor="Server";

		break;



	//Brasil

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



	//Emiratos árabes unidos

	case 'ae.bitefight.org': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("التاجر","المقبرة","الحانة","الكهف","السوق","المكتبة","المستشفى","رسالة للعشيرة");

		sTextoServidor="Server";

		break;



	//Eslovenia

	case 'bitefight.si': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("Trgovina","Groblje","Taverna","Groto","Market","Knjižnica","Crkva","Kuća boli");

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

	case 'cl.bitefight.org': //sin probar

	case 'co.bitefight.org': //sin probar

	case 'bitefight.es':

	case 'bitefight.com.mx': //sin probar

	case 'bitefight.pe': //sin probar

	case 'bitefight.com.ve':

		sTextoServidor="Servidor";

		aTextos=new Array("Mercader","Cementerio","Taberna","Gruta","Mercado","Biblioteca","Iglesia","Casa del Dolor");

		break;

	

	//Estados Unidos de América

	//India

	//Reino Unido

	case 'bite-fight.us': //sin probar

	case 'bitefight.in': //sin probar

	case 'bitefight.org': //sin probar

		sTextoServidor="Servidor";

		aTextos=new Array("Merchant","Graveyard","Tavern","Grotto","Market place","Library","Church","House of Pain");

		break;



	//Estonia

	case 'ee.bitefight.org': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("Kaupmees","Surnuaed","Kõrts","Koobas","Turg","Raamatukogu","Kirik","Valude maja");

		break;



	//Grecia

	case 'bitefight.gr': //sin probar

		sTextoServidor="Servidor";

		aTextos=new Array("Έμπορος","Νεκροταφείο","Ταβέρνα","Κατακόμβες","Αγορά","Βιβλιοθήκη","Εκκλησία","Οίκος της Οδύνης");

		break;



	//Italia

	case 'bitefight.it': //sin probar

		sTextoServidor="Servidor";

		aTextos=new Array("Mercante","Cimitero","Taverna","Grotta","Mercato","Biblioteca","Chiesa","Casa del Dolore");

		break;



	//Japón

	case 'bitefight.jp': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("商人","墓場","酒場","洞窟","市場","図書館","教会","痛みの館");

		break;



	//Rusia

	case 'bitefight.ru': //sin probar

		sTextoServidor="Server";

		aTextos=new Array("Торговец","Кладбище","Таверна","Пещера","Рынок","Библиотека","Храм","Дом Боли");

		break;



	//Dinamarca

	case 'bitefight.dk':

		sTextoServidor="Server";

		aTextos=new Array("Købmand","Kirkegård","Værtshus","Grotte","Markedsplads","Bibliotek","Kirke","Smertens hus");

		break;



	//Eslovaquia

	case 'bitefight.sk':

		sTextoServidor="Server";

		aTextos=new Array("Obchodník","Cintorín","Krčma","Jaskyňa","Trhovisko","Knižnica","Kostol","Dom Bolesti");

		break;



	//Filipinas

	case 'bitefight.ph':

		sTextoServidor="Server";

		aTextos=new Array("Mangangalakal","Libingan","Taberna","Grotto","Pamilihan","Silid Aklatan","Simbahan","Bahay ng Sakit");

		break;



	//Finlandia

	case 'fi.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("Kauppa","Hautausmaa","Taverna","Luola","Tori","Kirjasto","Kirkko","Kivun Talo");

		break;



	//Francia

	case 'bitefight.fr':

		sTextoServidor="Server";

		aTextos=new Array("Marchand","Cimetière","Taverne","la Grotte","Place du marché","Librairie","Église","Antre de la Douleur");

		break;



	//Hungría

	case 'bitefight.hu':

		sTextoServidor="Server";

		aTextos=new Array("Kereskedő","Temető","Fogadó","Barlang","Piac","Könyvtár","Templom","Kínok Háza");

		break;



	//Indonesia

	case 'id.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("Saudagar","Makam","Tempat...","Gua","Pasar","Perpustakaan","Gereja","Rumah...");

		aCaption=new Array("","","Tempat minum-minum","","","","","Rumah penyiksaan");

		break;



	//Iran

	case 'bitefight.ir':

		sTextoServidor="Server";

		aTextos=new Array("خانه دردکشیده ها","کلیس","کتابخانه","بازار","غار","قهوه خانه","قبرستان","بازرگان");

		break;



	//Israel

	case 'bitefight.co.il':

		sTextoServidor="Server";

		aTextos=new Array("בית הסבל","כנסיה","ספריה","שוק","מערה","טברנה","בית קברות","סוחר");

		break;



	//Letonia

	case 'bitefight.lv':

		sTextoServidor="Server";

		aTextos=new Array("Lieltirgotājs","Kapsēta","Dzertuve","Grota","Tirgus","Bibliotēka","Baznīca","Sāpju Nams");

		break;



	//Lituania

	case 'bitefight.lt':

		sTextoServidor="Server";

		aTextos=new Array("Prekiautojas","Kapinės","Taverna","Grota","Turgus","Biblioteka","Bažnyčia","Skausmo namai");

		break;



	//Noruega

	case 'bitefight.no':

		sTextoServidor="Server";

		aTextos=new Array("Kjøpmann","Kirkegård","Kro","Grotte","Markedsplass","Bibliotek","Kirken","Hus av Smerte");

		break;



	//Países Bajos

	case 'bitefight.nl':

		sTextoServidor="Server";

		aTextos=new Array("Handelaar","Kerkhof","Herberg","Grot","Marktplaats","Bibliotheek","Kerk","Huis van Pijn");

		break;



	//Paquistán

	case 'bitefight.pk':

		sTextoServidor="Server";

		aTextos=new Array("دکھون کا گھر","ہسپتال","لائیبریری","منڈی بازار","قبر","چھو ٹا ہو ٹل","قبرستان","سوداگر");

		break;



	//Polonia

	case 'bitefight.pl':

		sTextoServidor="Server";

		aTextos=new Array("Kupiec","Cmentarz","Tawerna","Grota","Targowisko","Biblioteka","Kościół","Dom Cierpienia");

		break;



	//Portugal

	case 'bitefight.com.pt':

		sTextoServidor="Server";

		aTextos=new Array("Mercador","Cemitério","Taberna","Gruta","Mercado","Biblioteca","Igreja","Casa do...");

		aCaption=new Array("","","","","","","","Casa do Sofrimento");

		break;



	//República Checa

	case 'bitefight.cz':

		sTextoServidor="Server";

		aTextos=new Array("Obchodník","Hřbitov","Hospoda","Jeskyně","Tržiště","Knihovna","Kostel","Dům bolesti");

		break;



	//Rumania

	case 'bitefight.ro':

		sTextoServidor="Server";

		aTextos=new Array("Negustor","Cimitir","Taverna","Caverna","Piata","Biblioteca","Biserica","Casa Durerii");

		break;



	//Serbia

	case 'bitefight.rs':

		sTextoServidor="Server";

		aTextos=new Array("Трговац","Гробље","Крчма","Пећина","Пијаца","Библиотека","Црква","Кућа Бола");

		break;



	//Sudafrica

	case 'bitefight.co.za':

		sTextoServidor="Server";

		aTextos=new Array("Handelaar","Begraafplaas","Taverne","Grot","Markplein","Biblioteek","Kerk","Die Pyn-Huis");

		break;



	//Suecia

	case 'bitefight.se':

		sTextoServidor="Server";

		aTextos=new Array("Butik","Kyrkogård","Värdshus","Grottan","Marknadsplats","Bibliotek","Kyrka","Smärtans Hus");

		break;



	//Tailandia

	case 'th.bitefight.org':

		sTextoServidor="Server";

		aTextos=new Array("พ่อค้า","สุสาน","ร้านเหล้า","ห้องลับ","ตลาดนัด","ห้องสมุด","โบสถ์","บ้านแห่งความเจ็บปวด");

		break;



	//Taiwán

	case 'bitefight.tw':

		sTextoServidor="Server";

		aTextos=new Array("商店","墓地","酒館","洞穴","市場","藏書館","教會","苦痛刑房");

		break;



	//Turquía

	case 'bitefight.net':

		sTextoServidor="Server";

		aTextos=new Array("Tüccar","Mezarlik","Taverna","Magara","Pazar","Kütüphane","Kutsal yer","Acılar Evi");

		break;



	//Ucrania

	case 'bitefight.com.ua':

		sTextoServidor="Server";

		aTextos=new Array("Торговець","Кладовище","Таверна","Підземелля","Ринок","Бібліотека","Церквa","Будинок Болі");

		break;



	//Vietnam

	case 'bitefight.vn':

		sTextoServidor="Server";

		aTextos=new Array("Nhà buôn","Nghĩa trang","Quán rượu","Hang động","Khu chợ","Thư viện","Nhà thờ","Ngôi nhà...");

		aCaption=new Array("","","","","","","","Ngôi nhà của sự đau đớn");

		break;


	//Servidores nuevos
	//Chile

	case 'bitefight.cl':

		sTextoServidor="";

		aTextos=new Array("Mercader","Cementerio","Taberna","Gruta","Mercado","Biblioteca","Iglesia","Casa del Dolor");

		break;



	default:

		sTextoServidor="Servidor";

		aTextos=new Array("Mercader","Cementerio","Taberna","Gruta","Mercado","Biblioteca","Iglesia","Casa del Dolor");

		break;

		

}



//Si aTextos no tiene nada es que no ha coincidido con ninguno de los dominios controlados

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

		//contenido.parentNode.insertBefore(capa_servidor,contenido);

	}



	var menu = document.getElementById('menu');

	var menu2=document.createElement('div');



	//Copiado del script "http://userscripts.org/scripts/show/41896"

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

