// ==UserScript==
// ==UserScript==
// @name           VARIAS AYUDAS OGAME
// @author        RECOPILACION DE VARIOS SCRIP  PUESTOS A MI MANERA
// @date          1/5/08
// @description    ENLACES A LINK COMO AMI ME GUSTAN 
// @include				 http://*ogame*

//http://img525.imageshack.us/img525/838/accesosln7.png
// ==/UserScript==

//********************************************//
if (document.URL.indexOf("game/index.php") > -1)
{
	
	
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
			var ali_tr6 = document.createElement('tr');
			var ali_td6 = document.createElement('td');
			var ali_tr7 = document.createElement('tr');
			var ali_td7 = document.createElement('td');	
			var ali_tr8 = document.createElement('tr');
			var ali_td8 = document.createElement('td');
			var ali_tr9 = document.createElement('tr');
			var ali_td9= document.createElement('td');
			var ali_tr10 = document.createElement('tr');
			var ali_td10 = document.createElement('td');


// Barra separadora
			ali_td.innerHTML = '<div align="center"><font color="FFFFFE">-------------------------</font></a></div>\n';
			ali_tr.appendChild(ali_td);
			menu_table.appendChild(ali_tr);

// Enviar CC

			ali_td1.innerHTML = '<div align=center><font color="CC0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17" title="Enviar CC" alt="Enviar CC"> ENVIAR CIRCULAR</font></a></div>\n';
			ali_tr1.appendChild(ali_td1);
			menu_table.appendChild(ali_tr1);
//  COMPACTAR  BATALLAS
//
		ali_td2.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://www.mecahost.com/OGame/batallasOGame.php" title="http://www.mecahost.com/OGame/batallasOGame.php" alt="BATALLAS">C.BATALLAS</font></a>\n';
			ali_tr2.appendChild(ali_td2);
			menu_table.appendChild(ali_tr2);

//  COMPACTAR  ESPIONAJES
//
		ali_td3.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://www.mecahost.com/OGame/espionajeOGame.php" title="http://www.mecahost.com/OGame/espionajeOGame.php" alt="ESPIONAJES">C.ESPIONAJES</font></a>\n';
			ali_tr3.appendChild(ali_td3);
			menu_table.appendChild(ali_tr3);	
//  DRAGO-SIM
//
		ali_td4.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://drago-sim.com/index.php?lang=spanish" title="http://drago-sim.com/index.php?lang=spanish" alt="DRAGO-SIM">DRAGO-SIM</font></a>\n';
			ali_tr4.appendChild(ali_td4);
			menu_table.appendChild(ali_tr4);
			
// O'Tickets
//
			ali_td5.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://es.oticket.org/" title="O Tickets" alt="O Tickets"> O-TICKET </font></a></div>\n';
			ali_tr1.appendChild(ali_td5);
			menu_table.appendChild(ali_tr5);
// Pranger

			ali_td6.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://' + ServerName + '/game/pranger.php?from=00" title="Pranger UNI ' + Universe + '" alt="Pranger UNI ' + Universe + '"> BANEADOS</font></a></div>\n';
			ali_tr2.appendChild(ali_td6);
			menu_table.appendChild(ali_tr6);
//OGAME-WORD

			ali_td7.innerHTML = '<div align=center><font color="CC0000"><a href="index.php?page=allianzen&session=' + Session + '&a=17" title="OGAME-WORD" alt="Enviar CC"> OGAME-WORD</font></a></div>\n';
			ali_tr3.appendChild(ali_td7);
			menu_table.appendChild(ali_tr7);

//  SPEEDSIM
//
		ali_td8.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://websim.speedsim.net/index.php?lang=sp" title="http://websim.speedsim.net/index.php?lang=sp" alt="SPEEDSIM">SPEEDSIM</font></a>\n';
			ali_tr4.appendChild(ali_td8);
			menu_table.appendChild(ali_tr8);
//  O-CALC
//
		ali_td9.innerHTML = '<div align="center"><font color="CC0000"><a target="_blank" href="http://www.o-calc.com/?sec=_grav&lang=es" title="http://www.o-calc.com/?sec=_grav&lang=es" alt="O-CALC">O-CALC</font></a>\n';
			ali_tr1.appendChild(ali_td9);
			menu_table.appendChild(ali_tr9);








			break;
		}
	}
}
//if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	//agregua el SPEEDSIM al Menu
	var tgs = document.getElementsByTagName('a');

	for (var i = tgs.length - 1; i >= 0; i--) {
		                 if(tgs[i].href.indexOf('http://board.ogame.com.es/thread.php?threadid') != -1){
			tgs[i].target = '_blank';
			tgs[i].href="http://www.ogame-world.com/es";
			tgs[i].innerHTML = '<div align="center"><font color="#FF0000"><a>OGAME-WORD</a></font></div>';
		}
	}	
	

//if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	//agregua el SALTO CUANTICO al Menu
	var tgs = document.getElementsByTagName('a');

	for (var i = tgs.length - 1; i >= 0; i--) {
		if(tgs[i].href.indexOf('http://impressum.gameforge.de/index.php?lang=es&art=impress&special=&&f_text=b1daf2&f_text_hover=ffffff&f_text_h=061229&f_text_hr=061229&f_text_hrbg=061229&f_text_hrborder=9EBDE4&f_text_font=arial%2C+arial%2C+arial%2C+sans-serif&f_bg=000000') != -1){
			tgs[i].href = './index.php?page=infos&session=' + session + '&gid=43';
			tgs[i].target = '_top';
			tgs[i].innerHTML = 'SALTO CUANTICO';
		}
	}
	
	
function noShips()
{if(document.getElementsByName(id)[0]){document.getElementsByName(id)[0].value=0}}
if(document.baseURI.indexOf("&gid=43")!=-1){var cantidad=0;var ninguna="";var nombre="";var texto="";var todas="";
var objetivo=document.evaluate("//div[@id='content']/center/form/table/tbody",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
objetivo.parentNode.setAttribute("border","0");
objetivo.parentNode.setAttribute("cellpadding","0");
objetivo.parentNode.setAttribute("cellspacing","1");
objetivo.parentNode.setAttribute("width","519");
objetivo.rows[0].setAttribute("height","20");
objetivo.rows[0].innerHTML="<th>Luna de origen:</th><th>"+objetivo.rows[0].cells[1].innerHTML+"</th>";
objetivo.rows[1].innerHTML="<th>Luna de destino:</th><th>"+objetivo.rows[1].cells[1].innerHTML+"</th>";
objetivo.rows[1].cells[1].getElementsByTagName("select")[0].setAttribute("size","6");
objetivo.rows[1].cells[1].getElementsByTagName("select")[0].setAttribute("style","width:330");
var nodo=objetivo.rows[0].cloneNode(true);
objetivo.insertBefore(nodo,objetivo.rows[0]);

nodo.innerHTML="<td class='c' colspan='2'>Seleccione la luna de destino:</td>";
var filaID=document.evaluate("//div[@id='content']/center/table/tbody/tr[2]/th/table/tbody/tr/td",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.firstChild;filaID.setAttribute("src","");
objetivo.parentNode.parentNode.setAttribute("name","salto");
var flota=document.evaluate("//div[@id='content']/center/form/table[2]/tbody",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
flota.rows[0].cells[0].setAttribute("colspan","4");flota.rows[flota.rows.length-1].cells[0].setAttribute("colspan","4");
flota.rows[0].setAttribute("height","20");
var nodo=flota.rows[0].cloneNode(true);
flota.insertBefore(nodo,flota.rows[1]);
nodo.innerHTML="<th>Naves</th><th>Disponibles</th><th>-</th><th>-</th>";
flota.parentNode.setAttribute("border","0");flota.parentNode.setAttribute("cellpadding","0");
flota.parentNode.setAttribute("cellspacing","1");
for(var i=2;
i<flota.rows.length-1;i++){cantidad=flota.rows[i].cells[0].innerHTML.match(/\((\d+)/)[1];
texto=flota.rows[i].cells[0].innerHTML.replace(/\(\d+\s\w+\s\)/,"");
nombre=flota.rows[i].cells[1].firstChild.name;flota.rows[i].cells[0].innerHTML=texto;
nodo=document.createElement("th");
flota.rows[i].insertBefore(nodo,flota.rows[i].cells[flota.rows[i].cells.length-1]);
nodo.innerHTML=cantidad;nodo=document.createElement("th");
flota.rows[i].insertBefore(nodo,flota.rows[i].cells[flota.rows[i].cells.length-1]);
nodo.innerHTML="<a href=\"javascript:void();\" onclick=\"salto."+nombre+".value='"+cantidad+"';\" >m&aacute;x</a>";

todas=todas+"salto."+nombre+".value='"+cantidad+"';";
ninguna=ninguna+"salto."+nombre+".value='0';"}nodo=flota.rows[0].cloneNode(true);
flota.insertBefore(nodo,flota.rows[flota.rows.length-1]);
nodo.innerHTML="<th colspan='2'><a href=\"javascript:void();\" onclick=\""+ninguna+"\">Ninguna nave</a></th><th colspan='2'><a href=\"javascript:void();\" onclick=\""+todas+"\">Todas las naves</a></th>";
var remover=document.evaluate("//div[@id='content']/center/table",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
remover.parentNode.removeChild(remover);
remover=document.evaluate("//div[@id='content']/center/table[last()]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
remover.parentNode.removeChild(remover)}

	
	
	
//}
//ogameccmenu.user.js