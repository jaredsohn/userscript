// ==UserScript==
// @name           OGame - Menu Enhanced
// @author         elpeter (Modificado por Mnemonic)
// @date           10-02-2008
// @version        0.1.4
// @namespace      http://userscripts.org/scripts/show/22614
// @description    Mejora la accesibilidad a links de suma utilidad de cualquier ogamer. 
// @include				 http://*ogame*
// ==/UserScript==

// Vers. 0.1.1
// Script Multi-language
// Vers. 0.1.2
// Turkish Added - Thanks Samet ^^
// Vers 0.1.3
// Added Top Alliances Link / Agregado link para Top de Alianzas
// Vers 0.1.4
//Modificacion introducida por Mnemonic (se reemplasaron links y se corrigio el orden de la lista de miembros)
//Basado en 2 userscripts de elpeter:
//http://userscripts.org/scripts/show/18914 OGame - Administrar Alianza/Manage Alliance
//http://userscripts.org/scripts/show/19566 OGame - Lista Baneados/Banned players
//si vas a usar este script tenes que saber que el autor original es ELPETER.
//yo Mnemonic solamente lo modifique de acuerdo a las necesidades mias y de mi alianza
//pero vos tambien lo podes hacer, deje varias ayudas adicionales a las que dejo ELPETER para hacer mas entendible el script.
//y por ultimo si lo modificas recuerda siempre hacer que lo revise el encargado de verificar la legalidad de los scripts, para evitar que te baneen

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

//Imagen del titulo de la tabla (se suprimio el link en la imagen del titulo de la tabla)
//pueden reemplazar la imagen por una personalizada, solamente subiendo una con las mismas caracteristicas y  cambiando la URL
//			ali_td.innerHTML = '<div align="center"><a href="index.php?page=allianzen&session=' + Session + '"><img src="http://img99.imageshack.us/img99/4518/alianzavp2.png" height="19" width="110"></a></div>\n';
			ali_td.innerHTML = '<img src="http://usuarios.lycos.es/mnemonic/IMG/alianzavp2.png" height="19" width="110"></a></div>\n';
			ali_tr.appendChild(ali_td);
			menu_table.appendChild(ali_tr);

//Lista de miembros ordenada
			ali_td1.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=4&sort1=3&sort2=1">'+MemberList_text+'</a></font></div>\n';
			ali_tr1.appendChild(ali_td1);
			menu_table.appendChild(ali_tr1);
			
//Enviar CC
			ali_td2.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17">'+SendCM_text+'</a></font></</div>';
			ali_tr2.appendChild(ali_td2);
			menu_table.appendChild(ali_tr2);
			
//Foro de la alianza (en este caso la mia)
//pueden reemplazar la URL por la del foro de su alianza
//recuerden reemplazar el valor de la variable 'Foro_text'
			ali_td3.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://minerosafull.foroportal.es/foro/index.php">' + Foro_text + '</a></font></div>';
			ali_tr3.appendChild(ali_td3);
			menu_table.appendChild(ali_tr3);

//Administrar alianza (desabilitado para que este script lo pueda usar toda la alianza)
//			ali_td3.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=5">'+Admin_text+'</a></font></div>\n';
//			ali_tr3.appendChild(ali_td3);
//			menu_table.appendChild(ali_tr3);

//O'Tickets
			ali_td4.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://es.oticket.org/">' + Ticket_text + '</a></font></div>\n';
			ali_tr4.appendChild(ali_td4);
			menu_table.appendChild(ali_tr4);


//Administrar miembros ordenada (desabilitado para que este script lo pueda usar toda la alianza)
//			ali_td4.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=7&sort1=3&sort2=1">'+MemberAdmin_text+'</a></font></div>\n';
//			ali_tr4.appendChild(ali_td4);
//			menu_table.appendChild(ali_tr4);

//pranger
			ali_td5.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://' + ServerName + '/game/pranger.php?from=00">' + Pranger_text + ' UNI ' + Universe + '</a></font></div>';
			ali_tr5.appendChild(ali_td5);
			menu_table.appendChild(ali_tr5);

//ranking de alianzas (desabilitado porque no funciona, es posible que se deba al nuevo menu de estadisticas)
//			ali_td5.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=stat&session=' + Session + '&start=0&who=ally">'+AllyTop_text+'</a></font></</div>';
//			ali_tr5.appendChild(ali_td5);
//			menu_table.appendChild(ali_tr5);

			break;
		}
	}
}