// ==UserScript==
// @name           Youtube Lister
// @namespace      YoutubeLister
// @description    List your Youtube feed!
// @include        http://*.youtube.com/*
// @version        1.12.2.16
// @notify         true
// ==/UserScript==




var boton = '';

	 

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function GS(callback) {
  var scripta = document.createElement("script");
  scripta.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  scripta.addEventListener('load', function() {
	  
    var scripta = document.createElement("script");
    scripta.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(scripta);
  }, false);
    document.body.appendChild(scripta); 

}

var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!$.getElementById(cssId))
{
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/flick/jquery-ui.css';
    link.media = 'all';
    head.appendChild(link);
}




// the guts of this userscript
function maincode() {
	
	
	 $.getScript("http://www.jstorage.info/static/jstorage.js",function(){
		 
	 $.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js",function(){
		 

	var version = "1.12.2.16";
	var versionOld = "1.12.2.12";
	var newInfo = '<div><h2>Bienvenidos a Youtube User Lister '+version+',la extensión que te permite organizar en temas o categorías tus suscripciones.</h2><br><p><b>Nuevo en esta versión:</b></p><ul><li>Pequeña actualización para hacerla usable con la nueva interfaz de Youtube</li><li>Mejoradas las notificaciones pero con diversos errores conocidos</li></ul><br><p><b>Cualquier bug o duda puede ponerse en contacto conmigo en:</b><ul><li>Google+:<a target="_blank" href="http://gplus.to/tomymolina" target="_blank">gplus.to/tomymolina</a></li><li>Twitter:<a target="_blank" href="http://www.twitter.com/tomy_molina">twitter.com/tomy_molina</a></li><li>Email:<a href="mailto:tm07081995@gmail.com">tm07081995@gmail.com</a></li></ul></p></div>';


	//Definimos las storages

	function firstTimeYTUL(){

		$.jStorage.set("firstYTUL"+version, $.jStorage.get("firstYTUL"+version));
		var infoa = $.jStorage.get("firstYTUL"+version);	
		if (infoa == null){

			$(newInfo).dialog({
			height: 340,
			width:340,
			show: "puff",
			hide: "puff",
			modal: true
							});
							
			$.jStorage.set("firstYTUL"+version, "no");	
		} 
	};	

	var oldArr = $.jStorage.get("firstYTUL"+versionOld);
	if (oldArr == "null"){	
		$.jStorage.deleteKey("firstYTUL"+versionOld);
	}






	

      	


/*

                                      Definimos el array donde se alamacenan las listas y cargamos el listasStorage

*/
	var Listas=new Array();
	var youtubeAccount = $('.masthead-user-username').text();
	
	var miValor = $.jStorage.get("listasStorage"+youtubeAccount);
	//Comprobamos si hay valores en la key para que no nos de errores al hacer click
	if ($(miValor).length){
		$.jStorage.set("listasStorage"+youtubeAccount, $.jStorage.get("listasStorage"+youtubeAccount)); 	
	} else {
		$.jStorage.set("listasStorage"+youtubeAccount, $.merge(Listas,["Default"]));		
	} 
	Listas = $.jStorage.get("listasStorage"+youtubeAccount);
	
	
	var Iconos=new Array();

	var miValorIcon = $.jStorage.get("listasIconos"+youtubeAccount);
	//Comprobamos si hay valores en la key para que no nos de errores al hacer click
	if ($(miValorIcon).length){
		$.jStorage.set("listasIconos"+youtubeAccount, $.jStorage.get("listasIconos"+youtubeAccount)); 	
	} else {
		$.jStorage.set("listasIconos"+youtubeAccount, $.merge(Iconos,["http://i44.tinypic.com/2vc9hkk.jpg"]));		
	} 
	Iconos = $.jStorage.get("listasIconos"+youtubeAccount);
	
	
	var Ultimo=new Array();

	var miUltimoVideo = $.jStorage.get("ultimoVideo"+youtubeAccount);
	//Comprobamos si hay valores en la key para que no nos de errores al hacer click
	if ($(miUltimoVideo).length){
		$.jStorage.set("ultimoVideo"+youtubeAccount, $.jStorage.get("ultimoVideo"+youtubeAccount)); 	
	} else {
		$.jStorage.set("ultimoVideo"+youtubeAccount, $.merge(Ultimo,["nZVi6ypi0HI"]));		
	} 
	Ultimo = $.jStorage.get("ultimoVideo"+youtubeAccount);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                        A partir de aqui añadimos nos encargamos de de mostrar los elementos											   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	

	$("#video-sidebar").prepend('<div id="videos-lists"><ul id="panel-user-lists"></ul></div>');
	$("#video-sidebar").prepend('<div><h3 style="margin-top:2px;">Listas de usuarios</h3><a style="float:right;position:absolute;top:0px;right:0px;" id="button-open-dialog-edit" href="#"><img style="height:16px;width:16px;" src="http://cdn4.iconfinder.com/data/icons/brightmix/128/monotone_cog_settings_gear.png"></a></div>');
	$("#button-open-dialog-edit").live("click",function(event){
		event.preventDefault();
		
		var adminBox = $("#ListsAdminDiv");
   		adminBox.dialog({
			autoOpen: false,
			height: 500,
			resizable: false,
			width: 600,
			modal: true,
			title: "Configurar mis listas",
			show: "explode",
   			hide: "explode"
		});
		
		$(adminBox).dialog( "open" );
			
	});

	//
	// Actualizaciones
	//

	$('<div id="update-div"></div>').appendTo("#videos-lists").hide();
	
	$("#update-div").load("/playlist?list=PLA724F9A8554A244E .playlist-description", function(){

	
		var serverVersion = $.trim($("#update-div").text());
		if (serverVersion != version){
			$("#videos-lists").prepend('<div class="ui-state-highlight ui-corner-all" style="margin: 7px; padding: 3px"><p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>Nueva versión <strong>'+serverVersion+'</strong> disponible. <a target="_blank" href="http://userscripts.org/scripts/show/121941">Actualizar.</a></p> </div>');

		} 

	});


	
	var SidebarContent = $("#videos-lists");
	
	$($(".feed-item-owner").children()).click(function(event){
		event.preventDefault();
	});
	

	

	
	$("#enlaceTodos").live("click",function(event){
		event.preventDefault();
		MostrarTodos();
	});
	
	//Creamos una funcion que nos muestre un panel en la sidebar con enlace a cada lista	
	function imprimirListasSidebar(){
		$("#panel-user-lists").html("");
		
		$('<li id="list-header" class="video-list-item recommended-video-item"><a id="enlaceTodos" href="#" class="video-list-item-link yt-uix-sessionlink"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><span class="clip-inner"><img src="http://i44.tinypic.com/2vc9hkk.jpg" alt="Miniatura"><span class="vertical-align"></span></span></span></span></span><span dir="ltr" class="title" title="Todas las suscripciones">Todas las suscripciones</span></a></li>').appendTo("#panel-user-lists");
		$(Listas).each(function(index) {
			var thisLista = $(this);
			Iconos = $.jStorage.get("listasIconos"+youtubeAccount);
			$('<li id="list-header" class="video-list-item recommended-video-item"><a id="enlaceLista" href="'+this+'" class="video-list-item-link yt-uix-sessionlink"><span class="ux-thumb-wrap contains-addto "><span class="video-thumb ux-thumb ux-thumb-110 "><span class="clip"><span class="clip-inner"><img src="'+Iconos[index]+'" alt="Miniatura"><span class="vertical-align"></span></span></span></span></span><span dir="ltr" class="title" id="list-title" title="'+this+'">'+this+'</span><span  id="video-list-number" class="stat view-count">X videos</span></a></li>').appendTo("#panel-user-lists");			
			     
    	});
	};
	



	
	var itemsVideo = $(".feed-item-container").size();
	function videosLista(laLista,listPosition){
		
		var arrayVideosLista = new Array();
		var videoslaLista = $.jStorage.get(laLista+youtubeAccount);
		$(".feed-item-owner").each(function(index){

			

			var thisUserFeed = $(this);
			$(videoslaLista).each(function(index){
				if ($(thisUserFeed).text() == this){
					//Simplemente añadimos al array cada video de esa lista	
					arrayVideosLista = $.merge( $.merge([],arrayVideosLista), [$(thisUserFeed).parent().parent().children(".feed-item-visual-description").children("h4").children().attr("href").substr(9,11)]);
					
				}
			});
			if (index == itemsVideo + 1){
				return false;
			}
		});

		

		return arrayVideosLista;	
	};
	
	imprimirListasSidebar();
	//Ponemos el número de vídeos que hay en cada lista
	
	function videosEnLista(){
		$(Listas).each(function(index){
			var misVideos = videosLista(this);
			$("span#video-list-number").eq(index).text(misVideos.length + " vídeos en el feed");
		});	
	}
	
	videosEnLista();
	
	
	





	

	//Añadimos la capa correspondiente a la administracion 
	$('<div id="ListsAdminDiv"></div>').appendTo(SidebarContent);
	//Le añadimos unos estilos
	$("#ListsAdminDiv").hide();
	$("#ListsAdminDiv").css("background-color","#FFF");
	$("#ListsAdminDiv").css("padding-top","15px")
	$("#ListsAdminDiv").css("padding-bottom","25px");
	$("#ListsAdminDiv").css("padding","5px");

	

	//Añadimos el panel para crear nuevas Listas
	$('<h2>Crear Listas</h2>').appendTo("#ListsAdminDiv");
	$('<h3>Nombre de la lista</h3><input type="text" class="compose_input yt-uix-form-input-text" id="newListInput" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"><h3>Url del icono de la lista (en blanco para default)</h3><input type="text" class="compose_input yt-uix-form-input-text" id="newListInputIcon" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"><button type="button" id="newListButton" style="height:32px" class="yt-uix-button yt-uix-button-default" role="button"><span class="yt-uix-button-content">Crear lista </span></button>').appendTo("#ListsAdminDiv");
	
	
	
	//Le añadimos unos estilos
	$("#newListInput").css("padding-bottom","9px");
	$("#newListInput").css("padding-top","5px");
	$("#newListInputIcon").css("padding-bottom","9px");
	$("#newListInputIcon").css("padding-top","5px");
		
	//Añadimos el panel para administrar listas
	$('<h2>Administrar Listas</h2>').appendTo("#ListsAdminDiv");
	$('<div id="manageLists"></div>').appendTo("#ListsAdminDiv");
	
 	//Los estilos CSS
	$("#manageLists").css("padding","5px");
	//Añadimos la capa donde se encuentran las listas
	$('<table width="98%" frameborder="0"><tr valign="top"><td width="50%"><ul id="manageListsGeneral"></ul></td><td><div id="usersInAList"></div></td></tr></table>').appendTo("#manageLists");
	
	//Añadimos las listas a la parte general de la administracion
	function ListarElementosCapaSuprimir(){
		$("#manageListsGeneral").html("");
		$(Listas).each(function(index){
				$('<li style="margin:4px;" id="sortable-list" class="feed-item-title"><span style="padding-top:7px; padding-bottom:7px;" id="ListaManageMain" class="feed-item-author"><a class="yt-user-photo "><span class="video-thumb ux-thumb ux-thumb-profile-24"><span class="clip"><span class="profile-centering-wrap"><img src="'+Iconos[index]+'"   data-group-key="thumb-group-0"></span></span></span></a></span><span class="feed-item-ownera"><a id="alertUsersInList" class="yt-user-name " dir="ltr">'+this+'</a></span><a><img style="margin-top: 0.12cm;float:right;margin-left:3px;" id="deleteList" src="http://icons.iconarchive.com/icons/awicons/vista-artistic/16/delete-icon.png"> </a> <a> <img style="margin-top: 0.12cm;float:right;" id="editList" src="http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/16/Actions-document-edit-icon.png"></a><span class="time-created"> (ver lista)</span></li>').appendTo("#manageListsGeneral");

		});

	};	
	




	//Ejecutamos la funcion para mostrar los eliminar
	ListarElementosCapaSuprimir();
	
	
	//Añadimos la capa donde van aparecer los usuarios de una lista
	

	
		
	
		

	
	
	
	$("#usersInAList").css("background-color","#f1f1f1")
		.css("margin","5px")
		.css("padding","5px")
		.css("padding-top","2px")
		.css("width","100%")
		.hide();
	//Añadimos el titulo de la lista donde estan los usuarios
	$('<div id="usersInAListTitle"></div>').appendTo("#usersInAList");
	//Añadimos el cuerpo 
	$('<ul id="usersInAListBody"></li>').appendTo("#usersInAList");	
	
	
	//Muestra los ususarios de una determinada lista
	function mostrarEnDivUsersLista(laLista){
		//Primero mostramos la capa
		$("#usersInAList").fadeIn();
		//Almacenamos en una variable el contenido que hay en la base HTML5 que obtenemos por array
		var usersDeLista = $.jStorage.get(laLista+youtubeAccount);
		//Comprobamos si tiene contenido
		if (usersDeLista != null){
			$("#usersInAListBody").html("");
			$("#usersInAListTitle").html('<h2>Usuarios de la Lista: <img id="fadeOutUsersListIcon" src="http://s3.amazonaws.com/satisfaction-production/s3_images/110930/minimize_icon_inline.png" style="float:right;"> <span id="ListNameInManageBox">'+laLista+'</span></h2>');
			$($.jStorage.get(laLista+youtubeAccount)).each(function(index) {
				$('<li style="background-color:#fff; padding:4px; padding-top:7px; padding-bottom:7px; margin-top:4px;margin-bottom:4px;" id="list-manage-li" class="SingleUserManageDiv"><a target="_blank" href="'+this+'"><span id="SingleUserSpan">'+this+'</span></a><a alt="Eliminar este usuario" id="buttonIDSingleUserDelete"><img style="margin-top:0.02cm;float:right;" src="http://www.coloredcanvas.nl/themeforest/admincloud/assets/img/icons/icon-close.png"></a></li>').appendTo("#usersInAListBody");
			});				
		} else {
			$("#usersInAListBody").html("");
			$("#usersInAListTitle").html('<h2>Usuarios de la Lista: <img id="fadeOutUsersListIcon" src="http://s3.amazonaws.com/satisfaction-production/s3_images/110930/minimize_icon_inline.png" style="float:right;"><span id="ListNameInManageBox">'+laLista+'</span></h2>');
			$("#usersInAListBody").html('<li style="background-color:#fff; padding:4px; padding-top:7px; padding-bottom:7px; margin-top:4px;margin-bottom:4px;">Esta lista no tiene usuarios</li>');
		}
	
	};
	

	



		
	
	$("#SingleUserManageDiv").css("background-color","#FFF")
							.css("padding","4px")
							.css("padding-top","7px")
							.css("padding-bottom","7px")
							.css("margin-top","4px")
							.css("margin-bottom","4px");

	//Añadimos la capa donde estará el formulario para añadir gente a las listas
	$('<div id="formAdd" style="background-color:#fff; padding:4px; padding-top:3px; padding-bottom:3px; margin-top:4px;margin-bottom:4px;"></div>').appendTo("#usersInAList");
	//Añadimos el select donde estarán los usuarios
	$('<input name="q" id="formAddInput">').appendTo("#formAdd");
	$("#formAddInput").css("width","75%");
	

	
	//Nos encargamos de obtener tdas nuestras suscripciones
	$('<div  id="divSelectUser"></div>').appendTo("#formAdd");
	$('#divSelectUser').hide();
	 
	//Cargamos una página externa donde estan todas las subscripciones y solo obtenemos donde está los títulos
	$("#divSelectUser").load("/my_subscriptions .vm-vertical-nav li",function(){
		var allUsers = $(this).children().children();
	
		//Hacemos un callback que ejecute el siguiente código cuando acabe de cargar la página
		//Funcción que añade todos los usuarios al select

		var mostrarSuscripciones = function(listaP){
			
			//Definimos el arr con todas las suscripciones
			var myArr = new Array();
			myArr = [];
			$(allUsers).each(function(index) {
				myArr[index] = $(this).text();
			});
			
			//Cargamos a otro array los usuarios d elas listas actuales
			var userslistaP = new Array();
			userslistaP = $.jStorage.get(listaP+youtubeAccount);
			

			
			//Comprobamos si existen uusuarios
			if ($(userslistaP).length){
				
				//Recorremos la lista
				$(userslistaP).each(function(){
						var thisuserlistaP = this;
						//Eliminamos
						var thisPosition = $.inArray(thisuserlistaP,myArr);
						
						
						myArr = jQuery.grep(myArr, function(value) {
							return value != thisuserlistaP;
					  	});
				});
				
			}
			
			//Cargamos el auto complete
			$("#formAddInput").autocomplete({
				source: myArr
			});
		};
		
		//Al hacer click en el manage de una lista ejecuta la funcion de mostrarlos
		$("#alertUsersInList").live("click",function(){
		//Comprobamos en que posicion del array está el contenido del boton que clickeamos
		var myPos = $.inArray($(this).text(),Listas);
		mostrarSuscripciones(Listas[myPos]);
		
		});
		
	//Funcion que añade un usuario a una lista
	$("#formAddButton").click(function(event){	
		var array1 = new Array();
		array1 = $.jStorage.get($("#ListNameInManageBox").text());

		var elemento =  $("#formAddInput").val();
		
		if ($("#formAddInput").val() != "" && $("#ListNameInManageBox").text() != "" && $("#formAddInput").val() != "Selecciona el canal de Youtube"){
			
			if ($.inArray(elemento,array1) > -1){
				alert("El usuario ya existe en la lista seleccionada!");	
			} else {
				añadirStorage($("#ListNameInManageBox").text(),$("#formAddInput").val());
				
				//Al añadir un usuario a una lista actualizamos el feed
				//Tambien la funcion para añadirlo a la lista de users
				if ($("#spanN2").text() == $("#ListNameInManageBox").text()){					
					refrescar($("#spanN2").text());
				};
				alert("El usuario se ha añadido correctamente a la lista seleccionada.");
				
				mostrarEnDivUsersLista($("#ListNameInManageBox").text());
				ExportarListas();
				mostrarSuscripciones($("#ListNameInManageBox").text());
				$("#formAddInput").val("");
				resaltarNuevos();	
				
				
				
			};
			
		} else {
		alert("Hay campos sin completar o erróneos.");	
		};
		
	});
		

		 
		 

	});
	

	
	//Añadimos el boton
	$('<input type="button" id="formAddButton" value="Añadir">').appendTo("#formAdd");
	$('<div id="advancedOptions"><table width="100%"><tr valign="top"><td width="50%"><div id="exportLists"></div></td><td><div id="inportLists"></div></td></tr></table></div>').appendTo("#ListsAdminDiv");
	
	function ExportarListas(){
	
		//Añadimos la capa de exportar lsitas
		$("#exportLists").html("")
			.css("display","block");
		$("#exportLists").append('<h2>Exportar listas</h2> <h3>Copia el código y guárdalo</h3>');
		$("#exportLists").append('<div id="exportListsForm"></div>');
		$("#exportListsForm").append('<textarea rows="8" class="compose_input yt-uix-form-textarea" id="codeExport" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)">');
		$("#codeExport").css("height","50px").css("margin","5px").css("width","250px");
		
		$("#codeExport").val('var myExpListas =[');
		$(Listas).each(function(){
			$("#codeExport").val($("#codeExport").val() + '"'+ this + '",'); 	
		});
		$("#codeExport").val($("#codeExport").val() + '];\n');
		
		//Los iconos de cada lista
		$("#codeExport").val($("#codeExport").val()+'var myExpListasIconos =[');
		$(Iconos).each(function(){
			$("#codeExport").val($("#codeExport").val()+ '"'+ this + '",');	
		});
		$("#codeExport").val($("#codeExport").val() + '];\n');
		
		//Definimos los usuarios de cada lista	
		$("#codeExport").val($("#codeExport").val()+'var myExpListasArr = new Array();\n');
		$(Listas).each(function(index){
			$("#codeExport").val($("#codeExport").val()+'myExpListasArr['+index+'] =[');	
			
			$($.jStorage.get(Listas[index]+youtubeAccount)).each(function(){
				$("#codeExport").val($("#codeExport").val()+ '"'+this+'",');
			});
			$("#codeExport").val($("#codeExport").val()+'];\n');	
			
		});
		$("#codeExport").val($("#codeExport").val()+'var myLastVideoArr = new Array();\n');
		$("#codeExport").val($("#codeExport").val()+'myLastVideoArr = [');
		$(Ultimo).each(function(index){
			$("#codeExport").val($("#codeExport").val()+'"'+this+'",');
		});
		$("#codeExport").val($("#codeExport").val()+'];\n');
	};
	
	ExportarListas();
	
	//capa para importar
	
	$('<div id="ImGod"></div>').appendTo("#ListsAdminDiv");
	$("#ImGod").hide();
	
	
	$("#inportLists").append('<h2>Importar listas</h2> <h3>Pega el código que exportaste</h3>');
	$("#inportLists").append('<div id="inportListsForm"></div>');
	$("#inportListsForm").append('<textarea rows="8" class="compose_input yt-uix-form-textarea" id="codeInport" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)"></textarea>');
	$("#codeInport").css("height","50px").css("margin","5px").css("width","250px");
	$("#inportListsForm").append('<button style="height:32px" type="button" id="buttonImport" class="yt-uix-button yt-uix-button-default" role="button"><span class="yt-uix-button-content">Importar configuracion</span></button>');
	
	$("#buttonImport").live("click",function(){
		$("#ImGod").html('<script>	var youtubeAccount = $(".masthead-user-username").text();'+$("#codeInport").val()+' $.jStorage.set("listasStorage"+youtubeAccount,myExpListas); $.jStorage.set("listasIconos"+youtubeAccount,myExpListasIconos); $.jStorage.set("ultimoVideo"+youtubeAccount, myLastVideoArr); $(myExpListasArr).each(function(index){$.jStorage.set(myExpListas[index]+youtubeAccount,this);}); alert("Las listas se han inportado correctamente, la página se recargará"); location.reload();  </script>');	
			
	});
	
	$('<a href="#" id="openHelp">Sobre la extensión / Contacto</a>').appendTo("#ListsAdminDiv");
	$("#openHelp").live("click",function(){
		$(newInfo).dialog({
			height: 340,
			width:340,
			show: "puff",
			hide: "puff",
			modal: true
		});
	});

	
		
	//Funcion que actualiza las listas tras cargar más videos
	var Items = $(".feed-item-container").length;
	
	window.setInterval(function(){
			if (Items != $(".feed-item-container").length)
			{	
				if ($("#spanN1").text() == "Lista"){			
					var titleListH2 = $("div.feed-header-details")[0];
					list($.jStorage.get($("#spanN2").text()+youtubeAccount));	
					videosEnLista();
					Items = $(".feed-item-container").length;
				} 
			} 

	}, 10);
	
	
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                        Ejecutamos las funcciones que interactuan con los elementos											       	   //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 
	firstTimeYTUL();	

	
	//Evitamos que se filtren usuarios si no coresponde al feed principal
	$("a#social").click(function(){
		MostrarTodos();
	});
	$("a.guide-item guide-item-action").click(function(){
		MostrarTodos();
	});	
	$("a.guide-item").click(function(){
		MostrarTodos();
	});	
	$("a.guide-item guide-recommendation-item").click(function(){
		MostrarTodos();
	});
	
	//Establecemos que cada vez que se haga click en una lista se ejecute la funcion refrescar	
	$("#enlaceLista").live("click",function(event){
		event.preventDefault();
		refrescar($(this).attr("href"));		
	});
	
	
	//Decimos lo que pasa al clickar en el boton para crear una nueva lista
	$("#newListButton").live("click",function(){
		var valorInput = $("#newListInput").val();
		valorInput =  valorInput.replace(/(<([^>]+)>)/ig,"");
		var valorInputIcon = $("#newListInputIcon").val();
		valorInputIcon =  valorInputIcon.replace(/(<([^>]+)>)/ig,"");
		if (valorInput.length){
			if ($.inArray(valorInput,Listas) == -1){
				//Definimos un array con el valor del input
				var inputVal = new Array();
				inputVal[0] = valorInput;
				//Creamos la lista con el valor de la Lista más el input
				var nuevaLista = $.merge( $.merge([],Listas), inputVal);
				//Almacenamos el valor con HTML5
				$.jStorage.set("listasStorage"+youtubeAccount, nuevaLista );
				//Declaramos Listas de nuevo
				Listas = $.jStorage.get("listasStorage"+youtubeAccount);
				
				if (valorInputIcon == ""){
					var iconVal = new Array();
					iconVal[0] = "http://i44.tinypic.com/2vc9hkk.jpg";
				} else {
					var iconVal = new Array();
					iconVal[0] = valorInputIcon ;	
				}
		
				//la lista con los otros botones más el creado
				var nuevaListaIconos = $.merge( $.merge([],Iconos), iconVal);
				//Almacenamos el valor de los iconos
				$.jStorage.set("listasIconos"+youtubeAccount,nuevaListaIconos);
				//Recuperamos al array Iconos los iconos guardados
				Iconos = $.jStorage.get("listasIconos"+youtubeAccount);
				
				//Posteriormente definimos el ultimo video
				Ultimo = $.merge( Ultimo, ["nZVi6ypi0HI"]);
				//Almacenamos el valor de los iconos
				$.jStorage.set("ultimoVideo"+youtubeAccount,Ultimo);
				//Recuperamos al array Iconos los iconos guardados
				Ultimo = $.jStorage.get("ultimoVideo"+youtubeAccount);
				
	
				ListarElementosCapaSuprimir();

				imprimirListasSidebar();
				ExportarListas();
				$("#newListInput").val("");
				$("#newListInputIcon").val("");
				resaltarNuevos();	
			
			} else {
				alert("Ya existe una lista con este nombre.");	
			}
		} else {
			alert("Debes poner un nombre a la lista");	
		}
	});


	//Al hacer click en el manage de una lista ejecuta la funcion de mostrarlos
	$("#alertUsersInList").live("click",function(){
		//Comprobamos en que posicion del array está el contenido del boton que clickeamos
		var myPos = $.inArray($(this).text(),Listas);
		
		mostrarEnDivUsersLista(Listas[myPos]);
	
	});
	

	$("#fadeOutUsersListIcon").live("click",function(){
		$("#usersInAList").fadeOut("slow");		
	});
	
	function abrirEditorLista(ListaP){
			var numeral = $.inArray(ListaP,Listas);
			var caja2 = $('<div id="EditListForm"><fieldset><label for="name">Nombre de la lista</label><br><input type="text" name="name" id="nombreListaEdit" class="text ui-widget-content ui-corner-all" value="'+ListaP+'" /><input type="hidden" name="email" id="nombreListaOldEdit" value="'+ListaP+'" class="text ui-widget-content ui-corner-all" /><br><label for="password">URL del icono</label><br><input type="text" name="icons" id="urlListaEdit" value="'+Iconos[numeral]+'" class="text ui-widget-content ui-corner-all" /></fieldset></div>');
   		caja2.dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			title: "Editar lista de reproducción",
			buttons: {
				"Editar ": function() {
					if (renombrarLista($("#nombreListaEdit").val(),$("#nombreListaOldEdit").val(),$("#urlListaEdit").val())){ 
						$( this ).dialog( "close" );
						$("#EditListForm").remove();
					}else{
						alert("Ya existe una lista con este nombre, selecciona otro nombre porfavor");		
					}	
				},
				"Cancelar": function() {
					$( this ).dialog( "close" );
					$("#EditListForm").remove();
				}
			},
			show: "explode",
   			hide: "explode"
		});
		
		$(caja2).dialog( "open" );
		
		
		
		
		
	}

	
	//Hacemos aparecer el formulario cuando hagamos click en editar lista
	$("#editList").live("click",function(){
		var ListaThis = $(this).parent().parent().children("span.feed-item-ownera").children().text();
		abrirEditorLista(ListaThis);	

			

		
		
				/*$(this).parent().parent().children("span.feed-item-ownera").html('<input type="text" id="nombreListaEdit" value="'+ListaThis+'">');
				$(this).parent().parent().children("span.feed-item-ownera").append('<input type="hidden" id="nombreListaOldEdit" value="'+ListaThis+'">');
				$(this).parent().parent().children(".time-created").html('<input type="button" id="nombreListaEditButton" value="Guardar">');*/


	});	
	
	//Nos encargamos de procesar el formulario renombrar lista
	function renombrarLista(nuevoNombreLista,viejoNombreLista,nuevoIcono){

		//Buscamos la posicion del array en el que esta la lista que estamos editando	
		var OldList = viejoNombreLista.replace(/(<([^>]+)>)/ig,"");
		var NewList = nuevoNombreLista.replace(/(<([^>]+)>)/ig,"");
		var NewIcon = nuevoIcono.replace(/(<([^>]+)>)/ig,"");
		var pos = $.inArray(OldList,Listas);
		
		if ($.inArray(NewList,Listas) == pos || $.inArray(NewList,Listas) == -1){
			var usersLista = new Array();
			usersLista = $.jStorage.get(OldList+youtubeAccount);		
	
			//eliminamos la key con el nombre viejo
			$.jStorage.deleteKey(OldList+youtubeAccount);
			
			//el nuevo almacenamiento local tendrá la key con el nuevo nombre 
			$.jStorage.set(NewList+youtubeAccount,usersLista);
			
			//Ahora le cambiamos el nombre
			Listas = $.jStorage.get("listasStorage"+youtubeAccount);
			Listas[pos] = NewList;
			//Ahora establecemos el nuevo icono
			Iconos[pos] = NewIcon;
			
			$.jStorage.set("listasIconos"+youtubeAccount,Iconos);
			Iconos = $.jStorage.get("listasIconos"+youtubeAccount);
			
			
			
			$.jStorage.set("listasStorage"+youtubeAccount,Listas);
			Listas = $.jStorage.get("listasStorage"+youtubeAccount);
			
			//Cargamos las capas para refrescar el contenido y que aparezcan las nuevas listas
			ListarElementosCapaSuprimir();
			
			imprimirListasSidebar();
			ExportarListas();
			if ($("#ListNameInManageBox").text() ==  OldList){
				mostrarEnDivUsersLista(NewList);
			} 
			if ($("#spanN2").text() == $("#ListNameInManageBox").text()){					
					refrescar($("#spanN2").text());
			};
			return true;
		} else {
			return false;
		}
					
	};	
	
	//Elimina Lista
	$("#deleteList").live("click", function(event){
		var enlaceElim = this;
		var deleteConfirm = $('<div><p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>¿Estas seguro que deseas eliminar esta lista?</p></div>');
		
		$(deleteConfirm).dialog({
			resizable: false,
			height:140,
			modal: true,
			buttons: {
				"Eliminar": function() {
					
					var positionArr = $.inArray($(enlaceElim).parent().parent().children("span.feed-item-ownera").children().text(),Listas);
					//Eliminamos el almacenamiento local 
					$.jStorage.deleteKey(Listas[positionArr]+youtubeAccount);
					//Luego hacemos un preventDefault
					event.preventDefault();
					//Luego eliminamos la lista	
					delete Listas[positionArr];
					//Añadimos la nuevas Listas al almacenamiento local en que estan todas las listas
					$.jStorage.set("listasStorage"+youtubeAccount, Listas.filter(Boolean));
					//Establecemos las nuevas Listas
					Listas = $.jStorage.get("listasStorage"+youtubeAccount);
					//Eliminamos el icono del array Iconos
					delete Iconos[positionArr];
					//Establecemos el nuevo valor en el almacenamiento local
					$.jStorage.set("listasIconos"+youtubeAccount, Iconos.filter(Boolean));
					//Obtenemos de nuevo el arrray Iconos
					Iconos = $.jStorage.get("listasIconos"+youtubeAccount);
					//Eliminamos el ultimo video
					delete Ultimo[positionArr];
					//Establecemos el nuevo valor en el almacenamiento local
					$.jStorage.set("ultimoVideo", Ultimo.filter(Boolean));
					//Obtenemos de nuevo el arrray del ultimo
					Ultimo = $.jStorage.get("ultimoVideo");
					
					if ($("#spanN2").text() == $("#ListNameInManageBox").text()){					
						refrescar($("#spanN2").text());
					};
					
					//Cargamos las capas para refrescar el contenido y que aparezcan las nuevas listas
					ListarElementosCapaSuprimir();
		
					imprimirListasSidebar();
					ExportarListas();
					resaltarNuevos();
					
					$( this ).dialog( "close" );
				},
				"Cancelar": function() {
					$( this ).dialog( "close" );
				}
			}
		});
		
		
			
	});
	
	//Elimina un uauario de una lista
	$("a#buttonIDSingleUserDelete").live("click",function(){
		
		var Arr2 = $.jStorage.get($("#ListNameInManageBox").text()+youtubeAccount);
		var posArr2 = $.inArray($(this).parent().children("a").eq(0).children("span").text(),Arr2);
		//Luego eliminamos la lista	
		delete Arr2[posArr2];
		//Añadimos la nuevas Listas al almacenamiento local en que estan todas las listas
		$.jStorage.set($("#ListNameInManageBox").text()+youtubeAccount, Arr2.filter(Boolean));
		$(this).parent().remove();
		//Refrescamsos el feed tras eliminar un usuario
		if ($("#spanN2").text() == $("#SelectLists").val()){					
			list($.jStorage.get($("#spanN2").text()+youtubeAccount));
		};	
		
		
			
	});
	
	//Funcion Añadir valor
	function añadirStorage(key,valor){
		//Definimos el array y el localStorage
		var arrayLista=new Array();
	
		var valorLista = $.jStorage.get(key+youtubeAccount);
		
		//Comprobamos si hay valores en la key para que no nos de errores al hacer click
		if ($(valorLista).length){
			$.jStorage.set(key+youtubeAccount, $.jStorage.get(key+youtubeAccount)); 	
		} else {
			$.jStorage.set(key+youtubeAccount, $.merge(arrayLista,["Lexita Baca Dj XdX Mofeta"]));		
		} 
		arrayLista = $.jStorage.get(key+youtubeAccount);
		var nuevoUser = new Array();
		nuevoUser[0]=valor;


			
		var newLista = $.merge( $.merge([],arrayLista), nuevoUser);
		$.jStorage.set(key+youtubeAccount, newLista);
		arrayLista = $.jStorage.get(key+youtubeAccount);
		
		if (arrayLista[0] == "Lexita Baca Dj XdX Mofeta"){
			delete arrayLista[0];	
		};
		
		$.jStorage.set(key+youtubeAccount,arrayLista.filter(Boolean));
		arrayLista = $.jStorage.get(key+youtubeAccount);		
	};
	
	//Arriba maletin
	
	
	
	//No filtramos por listas y mostramos todos las suscripciones
	function MostrarTodos(){
		$("#feed-main-all").fadeOut(function(){
		$( '.feed-item-outer' ).each(function(){
			$(this).parent().parent().show();	
		});		
		$("div.feed-header-details").eq(0).children("h2").html('<span id="spanN1"></span> <span id="spanN2">Suscripciones</span>');
		$("#feed-main-all").fadeIn();
		});
	}	

	function comprobarNuevos(miListaZ){
		var miListaPosition = $.inArray(miListaZ,Listas);
		var UltimoSaved = Ultimo[miListaPosition];
		var VideosListaActual = videosLista(Listas[miListaPosition]);


		var UltimoActual = VideosListaActual[0];

		if (UltimoSaved == UltimoActual){
			return false;
		} else {
			/*if (UltimoActual.length){} else {
				return false;
			}*/
			return true;	
		}
	};
		
	// LLamos a la funcción que que cambia de lista en el feed princiapl
	function refrescar(miListaI){
		/*
		var videosList3 = [];
		$( 'span.feed-item-ownera' ).each(function(){
            var a13 = $(this);
			var b23 = a13.children();
            var url33 = b23.text();
			var names43 = $.trim(url33);
			var trama3 = $.jStorage.get(miListaI);
            $.each($(trama3), function(){
                if( names43 == this ) {
					var videoCode3 = $(a13).parent().parent().children(".feed-item-visual").children(".feed-item-visual-content").children(".feed-item-visual-description").children("h4").children().attr("href").substr(9,11);		
					videosList3 = $.merge([videoCode3], videosList3);
					videosList3.reverse();
				}	
            });
	   	});
		
		
		
		Ultimo[$.inArray(miListaI,Listas)] =  videosList3[0];
		$.jStorage.set("ultimoVideo",Ultimo);*/
		
		
		
		var Lista=new Array(); 
		$(Listas).each(function(index) {
			Lista = $.jStorage.get(miListaI+youtubeAccount);
		});
		$("#feed-main-all").fadeOut(function(){
		
		
		list(Lista);	
		var titleInH2 = $("div.feed-header-details")[0];
		$("div.feed-header-details").eq(0).children("h2").html('<span id="spanN1">Lista</span> <span id="spanN2">'+miListaI+'</span>');
		$("#feed-main-all").fadeIn();
		});
		
		if (comprobarNuevos(miListaI)){
			var miListaPosition = $.inArray(miListaI,Listas);
			var UltimoSaved = Ultimo[miListaPosition];
			var VideosListaActual = videosLista(Listas[miListaPosition]);
			var UltimoActual = VideosListaActual[0];
			
			Ultimo[$.inArray(miListaI,Listas)] = UltimoActual ;
			$.jStorage.set("ultimoVideo"+youtubeAccount,Ultimo);
			Ultimo = $.jStorage.get("ultimoVideo"+youtubeAccount);	
		} 
		
		resaltarNuevos();		  
		

	};
	
	

	function resaltarNuevos(){
		$(Listas).each(function(index){
			var esta = this;
			if (comprobarNuevos(Listas[index])){
				$("a#enlaceLista").eq(index).css("background-color","red");
				
				$("a#enlaceLista").eq(index).hover(function(){
					$(this).css("background-color","#FF3300");
				},function(){
					$(this).css("background-color","red");
				});
				
			} else {
				
				$("a#enlaceLista").eq(index).css("background-color","transparent");
				
				$("a#enlaceLista").eq(index).hover(function(){
					$(this).css("background-color","#fff");
				},function(){
					$(this).css("background-color","transparent");
				})
					

			}
		});
		videosEnLista();
	}
	
	resaltarNuevos();

	
	function list(ListaX){

		$( '.feed-item-outer' ).each(function(){
			$(this).parent().parent().hide();	
		});
		
		
		
	   	$( 'span.feed-item-owner' ).each(function(){
	            var a = $(this);
				var b = a.children()
	            var url = b.text();
				var names = $.trim(url);
	            $.each($(ListaX), function(){
	                if( names == this ) a.parent().parent().parent().parent().parent().parent().show();
	            });
	    });


	};
	
	
	

	

	
	
	
	


});
});
 
 
		


	

	
	
	
	
};





// load jQuery and execute the main function
GS(maincode);
// JavaScript Document