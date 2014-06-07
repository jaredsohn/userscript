// ==UserScript==
// @name           OGame - Menu Enhanced
// @author         elpeter (Modificado por Roda)
// @date           16-04-2008
// @namespace      http://userscripts.org/scripts/show/23693
// @description    Mejora la accesibilidad a links de suma utilidad de cualquier Ogamer. 
// @include				 http://*ogame*
// ==/UserScript==
//
// 
// Script hecho a base de una recopilación de un par de scripts que ví con las mismas funciones más o menos, 
// está lo más útil recogido y puesto de una forma más elegante que con imágenes
// Si este script lo editáis recordar hablar con Pyros para que os lo legalize ;)
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

// Barra separadora
			ali_td.innerHTML = '<div align="center"><font color="FFFFFE">-------------------------</font></a></div>\n';
			ali_tr.appendChild(ali_td);
			menu_table.appendChild(ali_tr);

// Enviar CC

			ali_td1.innerHTML = '<div align=center><font color="CC0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17" title="Enviar CC" alt="Enviar CC"> Enviar Circular</font></a></div>\n';
			ali_tr1.appendChild(ali_td1);
			menu_table.appendChild(ali_tr1);
	
// Pranger

			ali_td2.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://' + ServerName + '/game/pranger.php?from=00" title="Pranger UNI ' + Universe + '" alt="Pranger UNI ' + Universe + '"> Lista de Baneados</font></a></div>\n';
			ali_tr2.appendChild(ali_td2);
			menu_table.appendChild(ali_tr2);
			
// O'Tickets
//
			ali_td3.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://support.ogame.com.es/" title="O Tickets" alt="O Tickets"> O-Ticket </font></a></div>\n';
			ali_tr3.appendChild(ali_td3);
			menu_table.appendChild(ali_tr3);

//  Salto cuántico
//
		ali_td4.innerHTML = '<div align="center"><font color="CC0000"><a href="index.php?page=infos&session=' + Session + '&gid=43" title="Salto Cuantico" alt="Salto Cuantico">Salto Cuántico</font></a>\n';
			ali_tr4.appendChild(ali_td4);
			menu_table.appendChild(ali_tr4);


			break;
		}
	}
}

