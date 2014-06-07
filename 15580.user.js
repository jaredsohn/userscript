// ==UserScript==
// @name	SuperSaltoCuantico 0.7x
// @namespace	SuperSaltoCuantico 0.7x
// @description  SuperSaltoCuantico: recopilacion  de 2 scripts, creando el script para saltos cuanticos COMPLETO!
// Agradecimientos a ---BARANOWA---, creador del script que modifica la pantalla del salto.
// @include	   http://*ogame*
// @include	   http://*.ogame*/*
// @include	   http://*.gfsrv.*/
// @include http://*ogame*/game/index.php*infos*
// @exclude	   
// ==/UserScript==    

//if (self.document.URL.indexOf("leftmenu.php") != -1){
	var session = document.URL.substr(document.URL.indexOf("session=") + 8,12);
	//agregua el CC Menu
	var tgs = document.getElementsByTagName('a');

	for (var i = tgs.length - 1; i >= 0; i--) {
		if(tgs[i].href.indexOf('http://ogame.com.es/regeln.html') != -1){
			tgs[i].href = './index.php?page=infos&session=' + session + '&gid=43';
			tgs[i].target = '_top';
			tgs[i].innerHTML = 'Reglas';
		}
	}
	
	
function noShips(){if(document.getElementsByName(id)[0]){document.getElementsByName(id)[0].value=0}}if(document.baseURI.indexOf("&gid=43")!=-1){var cantidad=0;var ninguna="";var nombre="";var texto="";var todas="";var objetivo=document.evaluate("//div[@id='content']/center/form/table/tbody",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;objetivo.parentNode.setAttribute("border","0");objetivo.parentNode.setAttribute("cellpadding","0");objetivo.parentNode.setAttribute("cellspacing","1");objetivo.parentNode.setAttribute("width","519");objetivo.rows[0].setAttribute("height","20");objetivo.rows[0].innerHTML="<th>Luna de origen:</th><th>"+objetivo.rows[0].cells[1].innerHTML+"</th>";objetivo.rows[1].innerHTML="<th>Luna de destino:</th><th>"+objetivo.rows[1].cells[1].innerHTML+"</th>";objetivo.rows[1].cells[1].getElementsByTagName("select")[0].setAttribute("size","4");objetivo.rows[1].cells[1].getElementsByTagName("select")[0].setAttribute("style","width:130");var nodo=objetivo.rows[0].cloneNode(true);objetivo.insertBefore(nodo,objetivo.rows[0]);nodo.innerHTML="<td class='c' colspan='2'>Seleccione la luna de destino:</td>";var filaID=document.evaluate("//div[@id='content']/center/table/tbody/tr[2]/th/table/tbody/tr/td",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.firstChild;filaID.setAttribute("src","");objetivo.parentNode.parentNode.setAttribute("name","salto");var flota=document.evaluate("//div[@id='content']/center/form/table[2]/tbody",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;flota.rows[0].cells[0].setAttribute("colspan","4");flota.rows[flota.rows.length-1].cells[0].setAttribute("colspan","4");flota.rows[0].setAttribute("height","20");var nodo=flota.rows[0].cloneNode(true);flota.insertBefore(nodo,flota.rows[1]);nodo.innerHTML="<th>Naves</th><th>Disponibles</th><th>-</th><th>-</th>";flota.parentNode.setAttribute("border","0");flota.parentNode.setAttribute("cellpadding","0");flota.parentNode.setAttribute("cellspacing","1");for(var i=2;i<flota.rows.length-1;i++){cantidad=flota.rows[i].cells[0].innerHTML.match(/\((\d+)/)[1];texto=flota.rows[i].cells[0].innerHTML.replace(/\(\d+\s\w+\s\)/,"");nombre=flota.rows[i].cells[1].firstChild.name;flota.rows[i].cells[0].innerHTML=texto;nodo=document.createElement("th");flota.rows[i].insertBefore(nodo,flota.rows[i].cells[flota.rows[i].cells.length-1]);nodo.innerHTML=cantidad;nodo=document.createElement("th");flota.rows[i].insertBefore(nodo,flota.rows[i].cells[flota.rows[i].cells.length-1]);nodo.innerHTML="<a href=\"javascript:void();\" onclick=\"salto."+nombre+".value='"+cantidad+"';\" >m&aacute;x</a>";todas=todas+"salto."+nombre+".value='"+cantidad+"';";ninguna=ninguna+"salto."+nombre+".value='0';"}nodo=flota.rows[0].cloneNode(true);flota.insertBefore(nodo,flota.rows[flota.rows.length-1]);nodo.innerHTML="<th colspan='2'><a href=\"javascript:void();\" onclick=\""+ninguna+"\">Ninguna nave</a></th><th colspan='2'><a href=\"javascript:void();\" onclick=\""+todas+"\">Todas las naves</a></th>";var remover=document.evaluate("//div[@id='content']/center/table",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;remover.parentNode.removeChild(remover);remover=document.evaluate("//div[@id='content']/center/table[last()]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;remover.parentNode.removeChild(remover)}
	
	
	
//}
//ogameccmenu.user.js