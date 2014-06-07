// ==UserScript==
// @name           Joneame v 2.1
// @namespace      Urko
// @description    Nuevas opciones
// @include        http://joneame.net/*
// @author         Urko Joseba de Lucas Beaumont
// @email          urko1982@gmail.com
// ==/UserScript==

/*
Integrarlo en el código de jonéame no habría mucho problema. Pero hay que quitar cosillas
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
 	if(window.location.href.indexOf('/mafioso/')==-1 && window.location.href.indexOf('/historia/')==-1){
 		
		$(".pages-margin").css("background-color","#ffffff");
		$(".pages-margin").css("height","40px");
		$(".pages-margin").css("border-style","solid");
		$(".pages-margin").css("border-color","#ff0000");
		$(".pages-margin").css("text-align","center");
		$(".pages-margin").css("font-size","24px");
		document.getElementsByClassName("pages-margin")[0].innerHTML="Leer más, simplemente posar, no es necesario hacer click";
		
		$(".pages-margin").mouseover(
			function(){
				loadPage();
			}
		);

		// Cuando se ha terminado de cargar el nuevo texto, activa add_on()	
		$(".pages-margin").mouseout(
			function(){
				add_on2();
			}
		);
 	}
 	
 	else{
 		
 		if( $(".pages").length>1) $(".pages:first").remove();
 		
		//Modifica la capa de indexación de páginas
		$(".pages:last").css("background-color","#ffffff");
		$(".pages:last").css("height","40px");
		$(".pages:last").css("border-style","solid");
		$(".pages:last").css("border-color","#ff0000");
		$(".pages:last").css("text-align","center");
		$(".pages:last").css("font-size","24px");
		$(".pages:last").html("Leer más");
		
		$(".pages").mouseover(
			function(){
				loadPage();
				add_on2();
			}
		);

		// Cuando se ha terminado de cargar el nuevo texto, activa add_on()	
		$(".pages").mouseout(
			function(){
				add_on2();
			}
		);
 	}

 	
	//Por defecto
	//add_on2();

	
    }
    
    function add_on2(){
    	
		var url_loc = window.location.href;

     	if(url_loc.indexOf('/mafioso/')==-1){	
    	//bug si estamos en la ultima página y contiene exactamente 20 noticiaas o 27 según el caso. prioridad 0
    	if(url_loc.indexOf("las_mejores.php")>-1 && document.getElementsByClassName("news-summary").length%20!=0)
    		$(".pages-margin").remove();
    		
    	if(url_loc.indexOf("http://joneame.net/?page=")>-1 && document.getElementsByClassName("news-summary").length%27!=0)
    		$(".pages-margin").remove();
    	
    	if(url_loc.indexOf("jonealas.php")>-1 && document.getElementsByClassName("news-summary").length%40!=0)
    		$(".pages-margin").remove();
     	
     	//if(url_loc.indexOf("/historia/")>-1 && url_loc.indexOf("/mejores-chorradas")==-1 && url_loc.indexOf("/trackbacks")==-1)
    	//	$(".pages").remove();
     	}
     	
     	
     	else {
     		//Puta mierda porque no tiene class el singlewrap y la seccion de comments no está agrupada :s
     		if( $(".tabmain").length>1 )   $(".tabmain:last").remove();    		
     		var rss_div = document.getElementsByClassName("barra redondo herramientas");
     		for (i=1; i<rss_div.length; i++) {
     			document.getElementsByClassName("barra redondo herramientas")[i].style.display="none";
     		}
     		if($(".pages").length>1) $(".pages:first").remove();
     	}
     	

    }
    
    
    
    function loadPage(){

    	    	 
    	// Variable para contabilizar la página que hay que cargar
    	var page = 0;  
    	
 		// Página visitada
    	var url_loc = window.location.href;

		// Página de destino
		var url_page = "";
		
		var b = 0;
		
		

    	//////////////    SECCION PORTADA   ///////////
    	
    	// Noticias que han sido portada
		if(url_loc.indexOf("http://joneame.net/?page=")>-1) {
			page = document.getElementsByClassName("news-summary").length/27 + parseInt(url_loc.substr(25));
			url_page = "http://joneame.net/?page="+ page + " .news-summary";
		}
		if(url_loc == "http://joneame.net/") {
			page = 1 + document.getElementsByClassName("news-summary").length/27;
			url_page = "http://joneame.net/?page="+ page + " .news-summary";
		}
		
		
    	//////////////    SECCION TOP   ///////////
				
		if(url_loc.indexOf("las_mejores.php")>-1) {		
			
			// Variables auxiliares
			var range = 0;
			page = 1;
		
			if(url_loc.indexOf("range")>-1){
				range=url_loc.substr(url_loc.indexOf("range")+6);	
			}
			if(url_loc.indexOf("?page=")!=-1) {
				page = url_loc.substr(url_loc.indexOf("?page=")+6);
				var aux = page.indexOf("&");
				page = page.substr(0,aux);
			}
		
			page = parseInt(page) + document.getElementsByClassName("news-summary").length/20;

			if(document.getElementsByClassName("news-summary").length%20==0)
				url_page = "http://joneame.net/las_mejores.php?range="+range+"&page="+page+" .news-summary";

		}
		
		
    	//////////////    SECCION JONEAR   ///////////
		
		if(url_loc.indexOf("jonealas.php")>-1) {		
			if(url_loc.indexOf("?page=")!=-1) {
				page = document.getElementsByClassName("news-summary").length/40 + parseInt(url_loc.substr(37));
			}
			else 1 + document.getElementsByClassName("news-summary").length/40;
			
			url_page = "http://joneame.net/jonealas.php?page="+page+" .news-summary";
		}
		
		
    	//////////////    SECCION NOTITAS   ///////////
		


		if(url_loc.indexOf("http://joneame.net/notitas/")>-1 && url_loc.indexOf("_geo")==-1) {
		
			// Variables auxiliares
			var nota_user ="";
			var nota_page = 0;
			b = 1;
			
			nota_user = url_loc.substr(27);
			if(nota_user.indexOf("?")>-1) {
				nota_page = parseInt( url_loc.substr( url_loc.indexOf("=")+1));
				nota_user = nota_user.substr(0,nota_user.length - nota_user.indexOf("?")-2);
			}
			if(nota_user.indexOf("?")==-1) {
				nota_page = 1;
			}
			page = nota_page + $(".notitas-list").length - 1; //Hay uno extra
			url_page = "http://joneame.net/notitas/"+nota_user+"?page="+page+" .notitas-list:last";
		}
		
		
		//////////////    SECCION MEJORES NOTITAS   ///////////
		


		if(url_loc.indexOf("http://joneame.net/mejores_notitas.php")>-1) {
			
			b = 1;
			
			// Variables auxiliares
			var nota_user ="";
			var nota_page = 0;	
			
			var range = 0;
			page = 1;
		
			if(url_loc.indexOf("range")>-1){
				range=url_loc.substr(url_loc.indexOf("range")+6);	
			}
			if(url_loc.indexOf("?page=")!=-1) {
				page = url_loc.substr(url_loc.indexOf("?page=")+6);
				var aux = page.indexOf("&");
				page = page.substr(0,aux);
			}
		
			page = parseInt(page) + $(".notitas-list").length - 1;
			
			url_page = "http://joneame.net/mejores_notitas.php?page="+page+"&range="+range+" .notitas-list:last";
		}
		
		
		//////////////    SECCION MAFIOSO   /////////// 
		
		//(en pag 1 se carga 30 en pag 2 32 en pag 3 33 WTF????
		
		if(url_loc.indexOf("/mafioso/")>-1 && url_loc.indexOf("/conversacion")>-1) {
			
			b = 2;
			
			// Variables auxiliares
			var user ="";
			var izda = $(".izquierda").length;
			var aux = 0;
			
			
			user = url_loc.substr(url_loc.indexOf('mafioso/')+8);
			user = user.substr(0, user.indexOf("/"));
			
			if(url_loc.indexOf("?")>-1) {
				page = parseInt(url_loc.substr( url_loc.indexOf("=")+1));
				while(izda>0){
					izda = izda-page-30-aux;
					aux++;
				}
				page = aux + 2;
			}
			
			else {
				page = 1;
				while(izda>0){
					izda = izda-30-page;
					page++;
				}
			}
			
			url_page = "http://joneame.net/mafioso/"+user+"/conversacion?page="+page+" #singlewrap";

		}
		
		
		//////////////    SECCION HISTORIA   /////////// 
				
		/*if(url_loc.indexOf("/historia/")>-1 && url_loc.indexOf("/mejores-chorradas")==-1 && url_loc.indexOf("/trackbacks")==-1) {

			b = 3;			
			page = 1;
			if(url_loc.substr(url_loc.length-2,1)=="/") page = url_loc.substr(url_loc.length-1);
			else url_page += "/";
			page += $(".comments-list");
			url_page = url_loc + page +" #singlewrap";

		}
		*/
		
		//alert(url_page);

		
		
		// Capa de carga
		var div_aux = "<div id='aux";
		div_aux += page+"'></div>";
		
		if(b==0) $(".pages-margin").before(div_aux);
		if(b==1) $(".notitas-list:last").after(div_aux);
		if(b==2) $(".pages:last").before(div_aux);
		if(b==3) $(".commentform").before(div_aux);
		
		//Cargamos página
		$("#aux"+page).load(url_page);

		
    }
