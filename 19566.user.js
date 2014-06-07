// ==UserScript==
// @name           OGame - Lista Baneados/Banned players
// @author         elpeter
// @date           09-01-2008
// @version        0.1
// @namespace      http://userscripts.org/scripts/show/19566
// @description    Agrega un link al menú que muestra la lista de baneados del universo actual
// @include				 http://*ogame*
// ==/UserScript==

if (document.URL.indexOf("game/index.php") > -1)
{

	var Banned_text = 'Banned';

	//Detectamos el idioma del servidor
	var notdetected = false;
	
	var ogtitle = window.location.href;
	var ogserver = /http\:\/\/([\-\.0-9a-zA-Z]+)\//.exec(ogtitle);
	if(ogserver != null){ ogserver = RegExp.$1; } else { ogserver = "0"; }
	var langstr = /http\:\/\/[\-\.0-9a-zA-Z]+\.([a-z]+)\//.exec(ogtitle);
	if(langstr != null){ langstr = RegExp.$1; } else { langstr = checker((ogserver+"langstr"),"not"); notdetected = true; }

	//Modificamos los textos con referencia al idioma del servidor
	if (langstr=='es'){
	var Banned_text = 'Baneados';
	}
	if (langstr=='org'){
	var Banned_text = 'Banned';
	}
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


	var as = document.getElementsByTagName('a');
	for (var i = 0; i < as.length; i ++)
	{
		var cur_a = as[i];
		if ((cur_a.href.indexOf('http://impressum.gameforge.de/') > -1 || cur_a.href.indexOf('http://ogame.com.tw/portal/') > -1) && cur_a.parentNode.tagName == 'FONT' &&
			cur_a.parentNode.parentNode.tagName == 'DIV' && cur_a.parentNode.parentNode.parentNode.tagName == 'TD')
		{
			var msg_tr = cur_a.parentNode.parentNode.parentNode.parentNode;
			var menu_table = msg_tr.parentNode;

			var ban_tr = document.createElement('tr');
			var ban_td = document.createElement('td');
			ban_td.innerHTML = '<div align="center"><font color="#FF0000"><a target="_blank" href="http://' + ServerName + '/game/pranger.php?from=00">' + Banned_text + ' UNI ' + Universe + '</a></font></div>';
			ban_tr.appendChild(ban_td);
			menu_table.appendChild(ban_tr);
			//menu_table.insertBefore(ban_tr, msg_tr);

			break;
		}
	}
}