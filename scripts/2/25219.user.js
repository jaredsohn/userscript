// ==UserScript==
// ==UserScript==
// @name           OGame - Menu Enhanced (Vers. 0.2.0)
// @author         elpeter (Modificado por Mnemonic)
// @date           08-03-2008
// @version        0.1.4
// @namespace      http://userscripts.org/scripts/show/23693
// @description    Mejora la accesibilidad a links de suma utilidad de cualquier Ogamer. 
// @include				 http://*ogame*
// ==/UserScript==
//
// Vers. 0.1.1
// Script Multi-language
//
// Vers. 0.1.2
// Turkish Added - Thanks Samet ^^
//
// Vers 0.1.3
// Added Top Alliances Link / Agregado link para Top de Alianzas
//(NO FUNCIONA YA QUE MUESTRA UNA PAGINA DE ESTADISTICAS DE ALIANZA DE LA VIEJA VERSION DE OGAME Y DA ERRORES)
//
// Vers 0.1.4
// Modificacion introducida por Mnemonic .
// Se reemplazaron links y se corrigio el orden de la lista de miembros.
//
// Vers 0.2.0
// Ahora cuenta con 2 columnas de 5 botones graficos "10 botones, 11 contando el titulo" (un total de 11 links si utilizan tambien el del titulo).
// Se volvio a agregar el link a las estadisticas de alianzas y se agrego tambien un link al salto cuantico.
// Se incorporo tooltips para todos los botones, si dejan el mouse sobre el boton tiene que aparecer una etiqueta informativa.
//
// Basado en 2 userscripts de elpeter:
// http://userscripts.org/scripts/show/18914 OGame - Administrar Alianza/Manage Alliance.
// http://userscripts.org/scripts/show/19566 OGame - Lista Baneados/Banned players.
// si vas a usar este script tenes que saber que el autor original es ELPETER.
// yo Mnemonic solamente lo modifique de acuerdo a las necesidades mias y de mi alianza.
// pero vos tambien lo podes hacer, deje varias ayudas adicionales a las que dejo ELPETER para hacer mas entendible el script.
// y por ultimo si lo modificas recuerda siempre hacer que lo revise el encargado de verificar la legalidad de los scripts, para evitar que te baneen.
// Espero que alguien mas tenga ideas para seguir mejorando este script, ya que me parece bastante util.
//
//********************************************//
if (document.URL.indexOf("game/index.php") > -1)
{
	//variables generales
	var MemberList_text = 'Member List';//MemberList
	var SendCM_text = 'Send C.M.';//Enviar CC
	var Foro_text = 'Foro MAF';//ForoAlianza
	var Ticket_text = 'OTickets';//OTickets
	var Pranger_text = 'Pranger';//Pranger
	
	// Funcion para obtener el servidor	
	var sentenceIni = window.location.href;
	var sentence1 = "http://";
	var sentence2 = "/game/";
	var pos1 = sentenceIni.indexOf(sentence1,0);
	if (pos1 >= 0 ){
		var pos2 = sentenceIni.indexOf(sentence2,pos1+sentence1.length);
		ServerName = sentenceIni.substring(pos1+sentence1.length,pos2);
	}

	//Funcion para obtener el universo
	var UsentenceIni = window.document.URL;
	var Usentence1 = "http://uni";
	var Usentence2 = ".ogame";
	var Upos1 = UsentenceIni.indexOf(Usentence1,0);

	if (Upos1 >= 0 ){
		var Upos2 = UsentenceIni.indexOf(Usentence2,Upos1+Usentence1.length);
		Universe = UsentenceIni.substring(Upos1+Usentence1.length,Upos2);
	}	
	
	//Detectamos el idioma del servidor
	var notdetected = false;
	
	var ogtitle = window.location.href;
	var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
	if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }
	var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
	if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }

//Modificamos los textos con referencia al idioma del servidor
	//variables para el idioma español
	if (langstr=='es'){
	var MemberList_text = 'Miembros';
	var SendCM_text = 'Enviar CC';
	var Foro_text = 'Foro MAF';
	var Ticket_text = 'OTickets';
	var Pranger_text = 'Pranger';
	}
	//variables para el idioma ingles
	if (langstr=='org'){
	var MemberList_text = 'Member List';
	var SendCM_text = 'Send C.M.';
	var Foro_text = 'Foro MAF';
	var Ticket_text = 'OTickets';
	var Pranger_text = 'Pranger';
	}
	//variables para el idioma turco
	if (langstr=='tr'){ //thanks Samet ;)
	var MemberList_text = 'Üye Listesi';
	var SendCM_text = 'Sirküler Mesaj Gönder';
	var Foro_text = 'Foro MAF';
	var Ticket_text = 'OTickets';
	var Pranger_text = 'Pranger';
	}

	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' && cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
		{
			var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
			var menu_table = msg_tr.parentNode;
			
			var ali_tr = document.createElement('tr');
			var ali_td = document.createElement('td');
					
			var ali_tr1 = document.createElement('tr');
			var ali_td1 = document.createElement('td');
			var ali_tr2 = document.createElement('tr');
			var ali_td2 = document.createElement('td');
			var ali_tr3 = document.createElement('tr');
			var ali_td3 = document.createElement('td');
			var ali_tr4 = document.createElement('tr');
			var ali_td4 = document.createElement('td');
			var ali_tr5 = document.createElement('tr');
			var ali_td5 = document.createElement('td');						

// 00) Imagen del titulo de la tabla
			ali_td.innerHTML = '<div align="center"><img src="http://usuarios.lycos.es/nessito/archivos/devolution/gfx/menu.jpg" height="19" width="110"></a></div>\n';
			ali_tr.appendChild(ali_td);
			menu_table.appendChild(ali_tr);

// 01) Lista de miembros ordenada + 02) Enviar CC
//los valores de "title" y de "alt" cuando los editen ponganles a ambos el mismo valor porque de lo contrario no se muestra el infotip
//las imagenes tambien las pueden cambiar por alguna que hagan ustedes, las que yo puse, son bien feas para que les de ganas de hacer las suyas, lo que si les reomiendo hacerlas bien livianas para que se carguen rapido
			ali_td1.innerHTML = '<div><a href="index.php?page=allianzen&session=' + Session + '&a=17" title="Enviar CC" alt="Enviar CC"><img src="http://usuarios.lycos.es/nessito/archivos/devolution/gfx/enviar_cc.jpg" height="19" width="110"></a></div>\n';
			ali_tr1.appendChild(ali_td1);
			menu_table.appendChild(ali_tr1);
	
// 03)Estadisticas de alianza + 04) Salto Cuantico
//los valores de "title" y de "alt" cuando los editen ponganles a ambos el mismo valor porque de lo contrario no se muestra el infotip
//las imagenes tambien las pueden cambiar por alguna que hagan ustedes, las que yo puse, son bien feas para que les de ganas de hacer las suyas, lo que si les reomiendo hacerlas bien livianas para que se carguen rapido
			ali_td2.innerHTML = '<div><a href="index.php?page=infos&session=' + Session + '&gid=43" title="Salto Cuantico" alt="Salto Cuantico"><img src="http://usuarios.lycos.es/nessito/archivos/devolution/gfx/salto.jpg" height="19" width="110"></a></div>\n';
			ali_tr2.appendChild(ali_td2);
			menu_table.appendChild(ali_tr2);
			
// 04) Pranger + 05) O'Tickets
//los valores de "title" y de "alt" cuando los editen ponganles a ambos el mismo valor porque de lo contrario no se muestra el infotip
//las imagenes tambien las pueden cambiar por alguna que hagan ustedes, las que yo puse, son bien feas para que les de ganas de hacer las suyas, lo que si les reomiendo hacerlas bien livianas para que se carguen rapido
			ali_td3.innerHTML = '<div><a target="_blank" href="http://es.oticket.org/" title="O Tickets" alt="O Tickets"><img src="http://usuarios.lycos.es/nessito/archivos/devolution/gfx/oticket.jpg" height="19" width="110"></a></div>\n';
			ali_tr3.appendChild(ali_td3);
			menu_table.appendChild(ali_tr3);



// 09) SpeedSim Online + 10) Calculadora de comercio
//los valores de "title" y de "alt" cuando los editen ponganles a ambos el mismo valor porque de lo contrario no se muestra el infotip
//las imagenes tambien las pueden cambiar por alguna que hagan ustedes, las que yo puse, son bien feas para que les de ganas de hacer las suyas, lo que si les reomiendo hacerlas bien livianas para que se carguen rapido
			ali_td5.innerHTML = '<div><a target="_blank" href="http://drago-sim.com/index.php?lang=spanish" title="Drago-Sim" alt="SpeedSim Online"><img src="http://usuarios.lycos.es/nessito/archivos/devolution/gfx/simulador.jpg" height="19" width="110"></a></div>\n';
			ali_tr5.appendChild(ali_td5);
			menu_table.appendChild(ali_tr5);

			break;
		}
	}
}