scr_meta=<><![CDATA[
// ==UserScript==
// @name	Baixa Todas as Fotos do Perfil do orkut. Get All Photos from Orkut.
// @version	1.1
// @author	Planet
// @namespace	Planet
// @description Este script baixa todas as foto do perfil do orkut. 
//								Pode ser baixado todas as fotos do perfil ou todas as fotos de um determinado album.
//								O orkut deve estar configurado na versão ANTIGA para funcionar.
//								Version 1.1: correção de bug. O script não tava indo nas outras páginas do album.
// @include     http://*.orkut.*/*AlbumZoom.aspx?*uid=*
// @include     http://www.orkut.com.br/AlbumList*
// @include     http://www.orkut.com.br/Profile*
// ==/UserScript==
]]></>;
var isDebug = false;
var searchAlbunListLink = "Main#AlbumList?uid=";
var searchAlbumLink = "/Main#Album?uid=";
var searchPaginaFotoLink = "/Main#AlbumZoom?uid=";
var searchFotoLink = "http://images.orkut.com/orkut/photos/"

var linksPage = document.links;

function getXMLHttp(){
var xmlhttp;

try{
	//mozilla
	xmlhttp = new XMLHttpRequest();
}catch(e){
	//IE
	var XMLHTTP_IDS = new Array('MSXML2.XMLHTTP.5.0',
				'MSXML2.XMLHTTP.4.0',
				'MSXML2.XMLHTTP.3.0',
				'MSXML2.XMLHTTP',
				'Microsoft.XMLHTTP');
	var success = false;
	for (var i=0; i <= XMLHTTP_IDS.length && !success; i++){
		try{
			xmlhttp = new ActiveXObject(XMLHTTP_IDS[i]);
			success = true;
		}catch(e2){}
	}
	if (!success){
		throw new Error('Unable to create XMLHttpRequest.');
	}
}
return xmlhttp;
}


function img(n) {
	return document.getElementsByTagName('img')[n].getAttribute("src");
}

function criarLinkNosAlbuns(){
	for (i=0;i<linksPage.length;i++)
	{
		var href = linksPage[i].href;
		if (href.indexOf(searchAlbumLink)>-1)
		{
			
			//Encontrei link de album
			var elementoAnterior = linksPage[i].parentNode;
			var linkAbrirTodasFotos=document.createElement("a");
			linkAbrirTodasFotos.href="javascript:;";
			linkAbrirTodasFotos.id=href.toString();
			//linkAbrirTodasFotos.target="_blank";
			linkAbrirTodasFotos.innerHTML="&nbsp;|&nbsp;Abrir todas as fotos!";
			linkAbrirTodasFotos.title="Open all photos in new window!";				
			linkAbrirTodasFotos.addEventListener("click", abrirTodasFotosNovaJanela, true);
			elementoAnterior.appendChild(linkAbrirTodasFotos);
			

		}
	}
}

function criarLinkParaTodosOsAlbuns(){
	for (i=0;i<linksPage.length;i++)
	{
		var href = linksPage[i].href;
		if (href.indexOf(searchAlbunListLink)>-1)
		{
			
			//Encontrei link de album
			var elementoAnterior = linksPage[i].parentNode;
			var linkAbrirTodasFotos=document.createElement("a");
			linkAbrirTodasFotos.href="javascript:;";
			linkAbrirTodasFotos.id=href.toString();
			//linkAbrirTodasFotos.target="_blank";
			linkAbrirTodasFotos.innerHTML="&nbsp;|&nbsp;Abrir todos os albuns!";
			linkAbrirTodasFotos.title="Open all photos from all albums!";				
			linkAbrirTodasFotos.addEventListener("click", abrirTodasFotosDeTodosAlbunsNovaJanela, true);
			elementoAnterior.appendChild(linkAbrirTodasFotos);
			

		}
	}
}


function abrirTodasFotosDeTodosAlbunsNovaJanela(evt){
 var link = "http://www.orkut.com.br/AlbumList?uid=17957453013047528860"; //Debug
(typeof window.event!="undefined")? link=event.srcElement.id : link=evt.target.id;


//Pulando FRAME
link = link.replace(searchAlbunListLink, "AlbumList?uid=");

//alert(link);
 var windowFotos=window.open('','_blank');
 windowFotos.document.writeln(
  '<html><head><title>Todos os albuns</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
   +'<b>Aguarde! Consultando os albuns do perfil...</b><br/>'
 ); 
 var arrAlbuns = extrairLinksDosAlbuns(link,windowFotos); 
  windowFotos.document.writeln(
  '<p><b>Iniciando a consulta das fotos de cada album encontrado...</b><p/>'
 );	
 
 //Pra cada album, procura as fotos dele.
 for (var i=0;i < arrAlbuns.length; i++){
	  windowFotos.document.writeln(
	  '<p><b>Consultando fotos do album ' + i + ': </b>'+ arrAlbuns[i] +'<p/>'
	 );	 	
	 var arrPaginasFotos = extrairLinksDasPaginasDeFoto(arrAlbuns[i],windowFotos);
	 windowFotos.document.writeln(
	  '<p><b>Consultando os links direto pras fotos...</b><p/>'
	 );	
	 var arrLinkFotos = extrairLinksDasFotos(arrPaginasFotos, windowFotos);	 
   arrPaginasFotos = null; //Limpando memoria
   arrLinkFotos = null;//Limpando memoria
 }
 
 arrAlbuns = null; //Limpando memoria
 windowFotos.document.writeln('Terminou!! </body></html>');
 
 windowFotos.document.close()	
 windowFotos.focus();
}

function abrirTodasFotosNovaJanela(evt){
 var link = "http://www.orkut.com.br/Album?uid=8276165804752054684&aid=1"; //Debug
(typeof window.event!="undefined")? link=event.srcElement.id : link=evt.target.id;

//Pulando FRAME
link = link.replace(searchAlbumLink, "/Album?uid=");
 
 //alert(link);
 var windowFotos=window.open('','_blank');
 windowFotos.document.writeln(
  '<html><head><title>Fotos do Album</title></head>'
   +'<body bgcolor=white onLoad="self.focus()">'
   +'Aguarde! Consultando todas as páginas do album...<br/>'
 );
 
 var arrPaginasFotos = extrairLinksDasPaginasDeFoto(link, windowFotos);
 windowFotos.document.writeln(
  '<p>Consultando os links direto pras fotos...<p/>'
 );	
 var arrLinkFotos = extrairLinksDasFotos(arrPaginasFotos, windowFotos);
 arrPaginasFotos = null;
 arrLinkFotos = null;
 
 
 windowFotos.document.writeln('Terminou!! </body></html>');
 
 windowFotos.document.close()	
 windowFotos.focus();
}



function extrairLinksDosAlbuns(link, windowFotos){
	
	  var arrAlbuns = new Array();
	  var iarrAlbuns = 0;
    // try to connect to the server
    try
    {
    	if (isDebug)
    		alert("Link da pagina corrente do album: " + link);
			var xmlHttp = getXMLHttp();
			xmlHttp.open("GET",link, false);
			xmlHttp.send(null);
			
			var response = xmlHttp.responseText;  
			if (isDebug)
				alert("HTML da pagina de albuns:" + response);
			//Pegando links das pagina de foto da Page atual.
			arrAlbuns = extrairLinksDosAlbuns_doHTML(response,windowFotos);
			if (isDebug)
			  alert("Qtd de link de de albuns na pagina: " + arrAlbuns.length);			  
    }
    // display an error in case of failure
    catch (e)
    {
      alert("ERRO! Não foi possível conectar no servidor:\n" + e.toString());
    }	
    return arrAlbuns;
}

function extrairLinksDosAlbuns_doHTML(html,windowFotos){
	var arrLink = new Array();
	var iArrLink = 0;
	var iFoundLink = 0;
	var iFinal = 0;
	
	//Verificar se encontrou o link e já joga o index para iInicial
	while ((iFoundLink = html.indexOf(searchAlbumLink,iFoundLink)) > -1){
		
		iFinal = html.indexOf('"',iFoundLink);
		if (iFinal > -1) {
			//Encontrou um link de pagina de foto
			var linkEncontrado = html.substring(iFoundLink,iFinal);
			
			//Pulando FRAME
			linkEncontrado = linkEncontrado.replace(searchAlbumLink,"http://www.orkut.com.br/Album?uid=");
			
				//Só adiciona se ainda não existe.
				if (!arrLink.contains(linkEncontrado)){
				//linkEncontrado = linkEncontrado.replaceAll("&amp;", "&");
				//linkEncontrado = Encoder.htmlDecode(linkEncontrado);
				windowFotos.document.writeln(linkEncontrado+"</br>");	
				arrLink[iArrLink++] = linkEncontrado;
			}
		}
		++iFoundLink; // para procurar daqui em diante.
	}
	return arrLink;
}



function extrairLinksDasFotos(arrayPaginasFotos, windowFotos){

	var arrLinksFotos = new Array();
	var iarrLinksFotos = 0;
	
	for (var i=0; i < arrayPaginasFotos.length; i++){
		  var link = arrayPaginasFotos[i];
    	if (isDebug)
    		alert("Link da pagina corrente da foto: " + link);
			var xmlHttp = getXMLHttp();
			xmlHttp.open("GET",link, false);
			xmlHttp.send(null);
			
			var response = xmlHttp.responseText; 
			//alert(response);
			arrLinksFotos[iarrLinksFotos++] = extrairLinkDaFoto_doHTML(response);
			windowFotos.document.writeln("<img src='"+arrLinksFotos[iarrLinksFotos-1]+"' border='0'/></br>");	
			windowFotos.document.writeln(arrLinksFotos[iarrLinksFotos-1]+"</br>");	
	}
	return arrLinksFotos;
}

function extrairLinkDaFoto_doHTML(html){
	//http://images.orkut.com/orkut/photos/OgAAAN0jrjkzV8lTxgAmCKZfxHQ7hvRQuhJVULHfcGG0ovQFyUh5mwdGaP9hHe5H2KHbW-dksenTQQ46SSfB_EPKUn8Am1T1UBW7i9awxv2aROM0jTtUYX4y72bI.jpg
	var iFoundLink = 0;
	var iFinal = 0;
	
	//Verificar se encontrou o link e já joga o index para iInicial
	while ((iFoundLink = html.indexOf(searchFotoLink,iFoundLink)) > -1){
		iFinal = html.indexOf('"',iFoundLink);
		if (isDebug && !confirm(iFoundLink + ' ... ' + iFinal +  ". Este é o index do Link da foto. Deseja continuar?")){
			return null;
		}
		
		if (iFinal > -1){
			//Encontrou um suposto link			
			var linkEncontrado = html.substring(iFoundLink,iFinal);
			//linkEncontrado = Encoder.htmlDecode(linkEncontrado);
			//alert(linkEncontrado);
			return linkEncontrado;
		}

		++iFoundLink; // para procurar daqui em diante.
	}
	return null;
}

function extrairLinksDasPaginasDeFoto(link, windowFotos){
	
	  var arrPaginasFotos = new Array();
	  var iarrPaginasFotos = 0;
    // try to connect to the server
    try
    {
    	if (isDebug)
    		alert("Link da pagina corrente do album: " + link);
			var xmlHttp = getXMLHttp();
			xmlHttp.open("GET",link, false);
			xmlHttp.send(null);
			
			var response = xmlHttp.responseText;  
			if (isDebug)
				alert("HTML da pagina corrente do album:" + response);
			//Pegando links das pagina de foto da Page atual.
			var arrLinkFotosDestaPagina = extrairLinksDasPaginasDeFoto_doHTML(response);
			if (isDebug)
			  alert("Qtd de link de fotos na pagina do album: " + arrLinkFotosDestaPagina.length);
			  
			for (var i=0; i < arrLinkFotosDestaPagina.length; i++){
				arrPaginasFotos[iarrPaginasFotos++] = arrLinkFotosDestaPagina[i];
				windowFotos.document.writeln(arrPaginasFotos[i]+"</br>");					
			}
			arrLinkFotosDestaPagina = null;
			
			var linkProximaPagina = extrairLinkProximaPaginaDoAlbum_doHTML(response);
			if (linkProximaPagina != null){
					var arrLinkFotosDestaPaginaSeguinte = extrairLinksDasPaginasDeFoto(linkProximaPagina, windowFotos);
					for (i=0; i < arrLinkFotosDestaPaginaSeguinte.length; i++){
						arrPaginasFotos[iarrPaginasFotos++] = arrLinkFotosDestaPaginaSeguinte[i];
					}		
					arrLinkFotosDestaPaginaSeguinte = null; //Limpando memoria.								
			}
    }
    // display an error in case of failure
    catch (e)
    {
      alert("ERRO! Não foi possível conectar no servidor:\n" + e.toString());
      return null;
    }	
    return arrPaginasFotos;
}

function extrairLinksDasPaginasDeFoto_doHTML(html){
	var arrLink = new Array();
	var iArrLink = 0;
	var iFoundLink = 0;
	var iFinal = 0;
	
	//Verificar se encontrou o link e já joga o index para iInicial
	while ((iFoundLink = html.indexOf(searchPaginaFotoLink,iFoundLink)) > -1){
		
		iFinal = html.indexOf('"',iFoundLink);
		//if (isDebug && !confirm(iFoundLink + ' a ' + iFinal + ". Este é o index do Link das AlbumZoom. Deseja continuar?")){
		//	return arrLink;
		//}
		if (iFinal > -1) {
			//Encontrou um link de pagina de foto
			var linkEncontrado = html.substring(iFoundLink,iFinal);
			
			//Verificando se é o link da IMAGE não da descricao (para não duplicar).
			if (linkEncontrado.indexOf("&p=") == -1) {
			
				//Pulando FRAME
				linkEncontrado = linkEncontrado.replace(searchPaginaFotoLink,"http://www.orkut.com.br/AlbumZoom?uid=");
				//linkEncontrado = linkEncontrado.replaceAll("&amp;", "&");
				//linkEncontrado = Encoder.htmlDecode(linkEncontrado);
				arrLink[iArrLink++] = linkEncontrado;
			}
		}
		++iFoundLink; // para procurar daqui em diante.
	}
	return arrLink;
}

function extrairLinkProximaPaginaDoAlbum_doHTML(html){
	var iFoundLink = 0;
	var iInicial = 0;
	
	//Verificar se encontrou o link e já joga o index para iInicial
	while ((iFoundLink = html.indexOf('">próxima',iFoundLink)) > -1){
		iInicial = html.lastIndexOf('"',iFoundLink -1);
		if (isDebug && !confirm(iInicial + ' ... ' + iFoundLink +  ". Este é o index do Link da próxima pagina. Deseja continuar?")){
			return null;
		}
		
		if (iInicial > -1) {
			//Encontrou um suposto link			
			var linkEncontrado = html.substring(iInicial+1,iFoundLink);
			//alert(linkEncontrado);
			//Verificando se é um link de página de album
			if (linkEncontrado.indexOf(searchAlbumLink) > -1) {
				//Pulando o FRAME
				linkEncontrado = linkEncontrado.replace(searchAlbumLink,"http://www.orkut.com.br/Album?uid=");				
				linkEncontrado = linkEncontrado.replace("&amp;", "&");
				//alert(linkEncontrado);
				//linkEncontrado = Encoder.htmlDecode(linkEncontrado);
				return linkEncontrado;
			}
		}
		++iFoundLink; // para procurar daqui em diante.
	}
	return null;
}

//Metodo CONTAIN do Array
Array.prototype.contains = function (element) {
for (var i = 0; i < this.length; i++) {
if (this[i] == element) {
return true;
}
}
return false;
}


//MAIN
criarLinkParaTodosOsAlbuns();
criarLinkNosAlbuns();


//COMPONENTE EXTRAIDO DE http://www.strictly-software.com/htmlencode

/////////////////
//Auto Updater//
///////////////
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '55030', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
//if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();