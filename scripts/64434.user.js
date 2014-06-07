// ==UserScript==
// @name           Falconeame Naranja
// @namespace      http://twitter.com/urko
// @description    Mejoras de meneame
// @include        http://meneame.net/*
// @author         Urko Joseba de Lucas Beaumont
// @email          urko1982@gmail.com
// ==/UserScript==

/*
Versión 1.0.3 de Falconéame Naranja
   - Arreglado bug gracias a JRMora (error url en twitter)

*/

/*
Versión 1.0.2 de Falconéame Naranja
   - Se autocarga de comentarios al posar sobre un texto, sin tener que pasar de página.
   - Se autocarga de noticias de portada
   - Se autocarga de noticias para menear
   - Se autocarga de notas


*/

/*
Versión 1.0.1 de Falconéame Naranja
   - Traduce cualquier idioma
   - Busca información sobre las etiquetas
   - Abre en nueva pestaña los enlaces añadidos
   - Eliminado bug al escribir comentario
   - Eliminado bug al loguearte
*/

/*
Versión 1.0.0 de Falconéame Naranja
Este script simplemente añade la siguientes funciones:
   - Por defecto, están ordenados por karma los comentarios
   - No se ven noticias con karma negativo (excepto en descartadas)
   - Traduce página de destino (de momento inglés-español)
   - Envía noticia a twitter, facebook y joneame desde portada (no hay que entrar en la noticia)
   - Por defecto se ven los comentarios ocultos
*/

/*   
Si tiene algún comentario, sugerencia o duda puede contactar conmigo a través del siguiente correo: urko1982@gmail.com (por favor, indique en asunto falconeame)

Los motivos de hacer este script son para repasar javascript y aprender a usar greasemonkey. Además no ha llevado más que poco tiempo.

Iré añadiendo nuevas funcionalidades

Se permite su modificación si se cita al autor original (Urko Joseba de Lucas Beaumont), si no hay ánimo de lucro, se conserva la licencia y se me comunica por correo (esto último para colaborar en lo posible)
*/


//Visto en http://joanpiedra.com/jquery/greasemonkey/
// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
 
 	//Modifica la capa de indexación de páginas
	$(".pages-margin").css("background-color","#ffffff");
	$(".pages-margin").css("height","40px");
	$(".pages-margin").css("border-style","solid");
	$(".pages-margin").css("border-color","#ff0000");
	$(".pages-margin").css("text-align","center");
	$(".pages-margin").css("font-size","24px");
	document.getElementsByClassName("pages-margin")[0].innerHTML="Leer más";
	
	$(".pages-margin").mouseover(
		function(){
			loadPage();
		}
	);

		
	$(".pages-margin").mouseout(
		function(){
			add_on();
		}
	);
	
	add_on();
	
    }
    
    
    function loadPage(){
    	
    	    	 
    	// Variable para contabilizar la página que hay que cargar
    	var page = 0;  
    	
    	// Tipo de página a cargar
    	var class_page = 0;
 
 		// Página visitada
    	var url_loc = window.location.href;
    	
    	
    	
    	
    	// Noticias que han sido portada
    	
		if(url_loc.indexOf("http://meneame.net/?page=")>-1) {
			class_page = 1;
			page = document.getElementsByClassName("news-summary").length/15 + parseInt(url_loc.substr(25));
		}
		if(url_loc.length == 19) {
			class_page = 1;
			page = 1 + document.getElementsByClassName("news-summary").length/15;			
		}
		
		
		// Noticias para jonear
		
		if(url_loc.indexOf("http://meneame.net/shakeit.php?page=")>-1) {
			class_page = 2;
			page = document.getElementsByClassName("news-summary").length/40 + parseInt(window.location.href.substr(36));
		}
		
		if(url_loc.length == 30 && url_loc.indexOf("http://meneame.net/shakeit.php")>-1) {
			class_page = 2;
			page = 1 + document.getElementsByClassName("news-summary").length/40;
		}	
		
				
		// Noticias top
		
		var range = 0;
		var page_top = 1;
		
		if(url_loc.indexOf("range")>-1){
			
			range=url_loc.substr(url_loc.indexOf("range")+6);	
		}		
		
		if(url_loc.indexOf("?page=")!=-1) {
		
			page_top = url_loc.substr(url_loc.indexOf("?page=")+6);
			var aux = page_top.indexOf("&");
			page_top = page_top.substr(0,aux);
			
		}
		
		page_top = parseInt(page_top) + document.getElementsByClassName("news-summary").length/20;
		
		if(url_loc.indexOf("topstories.php")>-1) {
			class_page = 3;
			url_page = "http://meneame.net/topstories.php?range="+range+"&page="+page_top+" .news-summary";
		}
				

		// Notame
		var nota_user ="";
		var nota_page = 0;
				
		// Por si entra a http://meneame.net/notame sin barra al final
		if(window.location.href.indexOf("http://meneame.net/notame")>-1&&window.location.href.indexOf("http://meneame.net/notame/")==-1) {
			class_page = 10;
			page = $(".comments-list").length; //Hay uno extra
			url_page = "http://meneame.net/notame/?page="+page+" .comments-list:last";			
		}
		
		if(window.location.href.indexOf("http://meneame.net/notame/")>-1) {
			class_page = 10;
			nota_user = window.location.href.substr(26);
			if(nota_user.indexOf("?")>-1) {
				nota_page = parseInt(window.location.href.substr(window.location.href.indexOf("=")+1));
				nota_user = nota_user.substr(0,nota_user.length - nota_user.indexOf("?")-2);
			}
			if(nota_user.indexOf("?")==-1) {
				nota_page = 1;
			}
			
			page = nota_page + $(".comments-list").length - 1; //Hay uno extra
			url_page = "http://meneame.net/notame/"+nota_user+"?page="+page+" .comments-list:last";
		}
		
		
		div_aux = "<div id='aux"+page+"'></div";
		
		//Capa donde se cargan las noticias
		if(class_page <= 3) $(".pages-margin").before(div_aux);
		if(class_page == 10) $(".comments-list:last").after(div_aux);
		
		
	
		//Página de destino
		if(class_page == 1) url_page = "http://meneame.net/?page=";
		if(class_page == 2) url_page = "http://meneame.net/shakeit.php?page=";
				
		if(class_page <= 2) url_page += page + " .news-summary";
	
	
		//Cargamos página
		$("#aux"+page).load(url_page);
		
		
    }
    
    
    //Al cargar
    function add_on(){
    	
		if(location.href.indexOf("/story/")==-1){
	
			// A los enlaces les añade /best-comments
			story = document.getElementsByTagName("a");
			for( i=0; i<story.length; i++){
				if(story[i].href.indexOf("/story/")>-1) story[i].href+='/best-comments';
			}
	
			newssummary = document.getElementsByClassName("news-summary");


			for(i=0; i<newssummary.length; i++){		
	
				newsbody = newssummary[i].getElementsByClassName("news-body")[0];
		
				//No se ven las noticias con karma negativo (excepto en descartadas)
				if(window.location.href.indexOf('discarded')<0 && newsbody.getElementsByClassName("tool")[2].getElementsByTagName("span")[0].innerHTML<=0) newssummary[i].style.display='none';


				aux_url = newsbody.getElementsByTagName("h1")[0].getElementsByTagName("a")[0].href;	
				//Traduce la página destino
				aux =  "<span class='tool'><a href='http://translate.google.com/translate?u=";
				aux += aux_url;
				aux += "&sl=en&tl=es&hl=&ie=UTF-8'><img width='16' height='16' src='http://img10.yfrog.com/img10/4614/flagiconspain.png'></a></span>";
				
		
				//Envía a twitter
				aux += "<span class='tool'><a href=http://twitter.com/home?status="+aux_url;
				//api bit.ly no funciona 
				//aux += "<span class='tool'><a href='http://api.bit.ly/shorten?version=latest&longUrl="+aux_url+"&login=USERXXXXX&apiKey=";
				//aux += "API_KEYXXXXXXXXXXXXXXXXXX";
				aux += "><img src='http://mnmstatic.net/img/favicons/twitter.gif'></a></span>";
		
		
				//Envía a facebook
				aux +=  "<span class='tool'><a href='http://www.facebook.com/share.php?u=";
				aux += aux_url;
				aux += "'><img src='http://mnmstatic.net/img/favicons/fb.gif'></a></span>";
		
		
				//Envía a jnm
				aux +=  "<span class='tool'><a href='http://joneame.net/nueva_historia.php?url=";
				aux += aux_url;
				aux += "'><img src='http://joneame.net/img/favicons/favicon4.ico'></a></span>";
			
				if(newsbody.getElementsByClassName("news-details main")[0].innerHTML.indexOf("img10.yfrog.com/img10/4614/")==-1)
				newsbody.getElementsByClassName("news-details main")[0].innerHTML += aux;
				
				
		
		}	
	
	}

//Dentro de una noticia
if(location.href.indexOf("/story/")!=-1) {
	
	comments = document.getElementsByTagName("a");
	for( i=0; i<comments.length; i++){
	if(comments[i].href.indexOf("javascript:get_votes('get_comment.php")>-1) {
			 location.href=comments[i].href;
		}
	}
	
	//Ampliar noticia en google
	
	etiquetas = document.getElementsByClassName("news-details")[1].getElementsByTagName("a");
	google_url ="http://www.google.es/search?q=";
	for(var i=0; i<etiquetas.length; i++){
		google_url += etiquetas[i].innerHTML+"+";
	}
	google_url += "&ie=utf-8";
	tool = document.getElementsByClassName("tool")[4];
	aux = "  <a target='_blank' href='";
	aux += google_url;
	aux += "'><img src='http://www.google.com/favicon.ico'/></a>";
	tool.innerHTML += aux;

}
    }