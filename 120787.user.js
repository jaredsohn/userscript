// ==UserScript==
// @name           Youtube video organicer 
// @namespace      YoutubeVideoOrganicer
// @description    Organice your youtube videos
// @include        http://*.youtube.com/*
// @version        0.11.12.24
// @notify         true
// ==/UserScript==






// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQueryGreasemonkey(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.7.1.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
    var scriptb = document.createElement("script");
  scriptb.setAttribute("src", "https://raw.github.com/andris9/jStorage/master/jstorage.js");
  scriptb.addEventListener('load', function() {
    var scriptb = document.createElement("script");
    scriptb.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(scriptb);
  }, false);
  document.body.appendChild(scriptb);  
  
}



// the guts of this userscript
function code() {
	
	function firstTime(){
		$.jStorage.set("first", $.jStorage.get("first"));
		var info = $.jStorage.get("first");	
		if (info == null){
			alert("Bienvenido a Youtube Video Organicer (v.11.12.23).\nSi tiene dudas o encuentra algún bug puede ponerse en contacto conmigo en: \ntm07081995@gmail.com \nUn saludo, tomymolina. ");
			$.jStorage.set("first", "tomymolina");	
	} };	
	

	

	//Variables relacionadas con la capa del boton de cerrar
	var a1 = $('img#button-delete-video');	
	//Definimos el array y el localStorage
	var Lista=new Array();
	
	function defineStorage(){
	var miValor = $.jStorage.get("ocultosa");
	//Comprobamos si hay valores en la key para que no nos de errores al hacer click
	if ($(miValor).length){
		$.jStorage.set("ocultosa", $.jStorage.get("ocultosa")); 	
	} else {
		$.jStorage.set("ocultosa", "tomymolina");		
	} 
	Lista = $.jStorage.get("ocultosa");
	}
	
	defineStorage();
	
	    

	
	//La funccion que hace que se oculte la capa y se añada el video al localStorage para ocultarlo posteriormente
	$(a1).live("click",function(event){

		//Nos vamos al enlace desde .time-created
		var youtubeLink = $(this).parent().parent().parent().children(".feed-item-visual").children(".feed-item-visual-thumb").children().attr("href");	
		event.preventDefault();//Evitamos cualquier otro comportamiento del enlace
		var youtubeCode = youtubeLink.substr(9,11);	//Generamos un código de identificacion de nuestro vídeo más corto
		$.jStorage.set("ocultosa", $.merge([youtubeCode], Lista ));
		$(this).parent().parent().parent().parent().parent().remove();//Eliminamos nuestra capa
		defineStorage();
	});


	//Creamos la funccion que pasa cuando cargamos más vídeos
	function addButton(){	
	//Recorremos los .time-created	
		$("span.time-created").each(function() {
		//Comprobamos si existe el boton
        	if ($(this).children().length){	
			} else {
				//Sino existe el boton lo añadimos
				$('<img id="button-delete-video" style="float:right; margin-top:0.16cm;" src="http://spain.angloinfo.com/wp-content/themes/ai-v2/images/close_icon.gif">').appendTo(this);
			}
    	});
	}
	
	//Cargamos addButton cuando se carga la página
	addButton();

	
	//Recuperamos el array del localStorage
	var todosVideos = $.jStorage.get("ocultosa");
	//Creamos una funccion comprobar que elimine los videos que estan en el array recuperador por jStorage
	function comprobar(){	
    $( 'a.title' ).each(function(){
    	var a = $(this);
        var url = a.attr('href').substr(9,11);
        $.each($(todosVideos), function(){
        	if( url == this ) a.parent().parent().parent().parent().parent().remove();
         });
  	});
	};
	comprobar();


	//Definimos el boton
	var boton = $("div.feed-load-more-container");
	
	//Al hacer click en "boton" esperamos dos segundos y ejecutamos addButton() - no activa por problemas segun la conexion
	/*$(boton).click(function(){
		setTimeout(function(){
			addButton();
			comprobar();
		},2000);
	});*/
	
	//hacemos un interval que ejecute todo el tiempo las funciones (diminuye el rendimiento)
	setInterval(function(){
		comprobar();
		addButton();
	
	}, 200);
	
	//Añadimos un enlace para hacer flush a los datos locales de los videos ocultos
	$('<p class="metadata"><a id="flushVideos" href="#">Mostrar videos ocultos<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="see-more-arrow"></a></p>').appendTo("div.feed-header-details");
	
	//usamos delegate() para poder usar el evento click a un elemento que vamso añadir al DOM en lugar de live() 
	$('#flushVideos').live('click', function(event){
		event.preventDefault();
		location.reload();
		$.jStorage.set("ocultosa","null")
	});
	
	firstTime(); 


		
		
	
	

	
	
	
};



// load jQuery and execute the main function
addJQueryGreasemonkey(code);
