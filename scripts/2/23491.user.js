// ==UserScript==
// @name           OGame.es Alianzas
// @author         elpeter (Modificado por dark bishop)
// @date           02-03-2008
// @version        0.1.4
// @namespace      http://userscripts.org/scripts/show/22614
// @description    Mejora la accesibilidad a links de suma utilidad de cualquier fundador de alianza. 
// @include				 http://uni*.ogame.com.es/*
// ==/UserScript==


//********************************************//
if (document.URL.indexOf("game/index.php") > -1)
{
	//variables generales
        var Admin_text = 'Admin. Alianza';
	var MemberList_text = 'Miembros x puntos';//MemberList
        var MemberAdmin_text = 'Admin. Miembros';
	var SendCM_text = 'Enviar CC';//Enviar CC
	var Ticket_text = 'OTickets';//OTickets
	var Pranger_text = 'Baneos';//Pranger
	
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
        var Admin_text = 'Admin. Alianza';
	var MemberList_text = 'Miembros x puntos';
        var MemberAdmin_text = 'Admin. Miembros';
	var SendCM_text = 'Enviar CC';
	var Ticket_text = 'OTickets';
	var Pranger_text = 'Baneos';
	}

	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.es/') > -1) && cur_a.parentNode.tagName == 'FONT' && cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
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
			var ali_tr6 = document.createElement('tr');
			var ali_td6 = document.createElement('td');						

//Imagen del titulo de la tabla (se suprimio el link en la imagen del titulo de la tabla)
//pueden reemplazar la imagen por una personalizada, solamente subiendo una con las mismas caracteristicas y  cambiando la URL
//			ali_td.innerHTML = '<div align="center"><a href="index.php?page=allianzen&session=' + Session + '"><img src="http://darkbishop.iespana.es/tmp/42b821cf6c.png" height="19" width="110"></a></div>\n';
			ali_td.innerHTML = '<img src="http://darkbishop.iespana.es/tmp/42b821cf6c.png" height="19" width="110"></a></div>\n';
			ali_tr.appendChild(ali_td);
			menu_table.appendChild(ali_tr);

//Lista de miembros ordenada
                        ali_td2.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=4&sort1=3&sort2=1">'+MemberList_text+'</a></font></div>\n';
                        ali_tr2.appendChild(ali_td2);
                        menu_table.appendChild(ali_tr2);
            
//Enviar CC
                        ali_td1.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17">'+SendCM_text+'</a></font></</div>';
                        ali_tr1.appendChild(ali_td1);
                        menu_table.appendChild(ali_tr1);
            
//Administrar alianza (desabilitado para que este script lo pueda usar toda la alianza)
//                        ali_td3.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=5">'+Admin_text+'</a></font></div>\n';
//                        ali_tr3.appendChild(ali_td3);
//                        menu_table.appendChild(ali_tr3);

//O'Tickets
                        ali_td6.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://support.ogame.com.es/">' + Ticket_text + '</a></font></div>\n';
                        ali_tr6.appendChild(ali_td6);
                        menu_table.appendChild(ali_tr6);


//Administrar miembros ordenada (desabilitado para que este script lo pueda usar toda la alianza)
//                        ali_td4.innerHTML = '<div align="center"><font color="#FF0000"><a href="index.php?page=allianzen&session=' + Session + '&a=7&sort1=3&sort2=1">'+MemberAdmin_text+'</a></font></div>\n';
//                        ali_tr4.appendChild(ali_td4);
//                        menu_table.appendChild(ali_tr4);

//pranger
                        ali_td5.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://' + ServerName + '/game/pranger.php?from=00">' + Pranger_text + ' UNI ' + Universe + '</a></font></div>';
                        ali_tr5.appendChild(ali_td5);
                        menu_table.appendChild(ali_tr5);

			break;
		}
	}
}