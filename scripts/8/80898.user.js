// ==UserScript== 
// @name          NetBookEol
// @version       1.0.2
// @namespace     http://www.elotrolado.net 
// @description   Eol para NetBooks.
// @include       http://www.elotrolado.net/*
// @match http://www.elotrolado.net/*
// @run-at document-start
// @exclude              
// ==/UserScript== 

/* Initialization */
function Activar(){ // Funcion usada para Alternar la interfaz. Se guarda en el Navegador
	var c_estado = localStorage.getItem("InterfazNetBook_Activada");
	if (c_estado=='Desactivada'){
		localStorage.setItem("InterfazNetBook_Activada",'Activada');
		location.reload();
	}
	else{
		localStorage.setItem("InterfazNetBook_Activada",'Desactivada');
		location.reload();
	}
}

///////////////////// INIT /////////////////////

var Estado = localStorage.getItem("InterfazNetBook_Activada"); //Obtenemos el estado del navegador

// Modificamos el menú de eol para poder poner nuevos apartados
var menu = document.getElementById('nav').innerHTML ='<li><a href="./main.php">Noticias</a><ul><li><a href="./main.php">Portada</a></li><li><a href="./main.php?opcion=juegos">EOL-Juegos</a></li><li><a href="./foro_el-buffer_157">El Buffer</a></li></ul></li><li><a href="./index.php">Comunidad</a><ul><li><a class="daddy" href="./index.php">Índice de Foros</a><ul><li><a href="./foro_playstation-3_160">PlayStation 3</a></li><li><a href="./foro_wii_154">Wii</a></li><li><a href="./foro_xbox-360_137">Xbox 360</a></li><li><a href="./foro_psp_131">PSP</a></li> <li><a href="./foro_nds_132">NDS</a></li><li><a href="./foro_playstation-2_39">PlayStation 2</a></li><li><a href="./foro_gamecube_85">GameCube</a></li><li><a href="./foro_xbox_78">Xbox</a></li><li><a href="./foro_otras-consolas_40">Otras Consolas</a></li><li><a href="./foro_pc_36">PC</a></li><li><a href="./foro_generales_37">Generales</a></li><li><a href="./foro_generales_96">Compra-Venta</a></li><li><a href="./foro_off-topic_58">Off-Topic</a></li></ul></li><li><a href="./ucp.php?i=pm">Mensajes Privados</a></li><li><a href="./ucp.php">Panel de Control</a></li><li><a href="./memberlist.php">Miembros</a></li> <li><a href="./gallery.php">Genteol</a></li><li><a href="http://colecciones.elotrolado.net/">Colecciones</a></li><li><a href="./search.php">Búsqueda Avanzada</a></li><li><a href="./faq.php">Ayuda</a></li><li><a href="./hilo_recordatorio-de-las-principales-normas_1014288">Normas</a></li></ul></li><li><a href="./wiki">Wiki</a><ul><li><a href="./wiki">Portada</a></li><li><a href="./wiki/Categor%C3%ADa:Art%C3%ADculos">Categorías</a></li>  <li><a href="./wiki/Especial:Recentchanges">Cambios Recientes</a></li><li><a href="./wiki/Especial:Random">Página Aleatoria</a></li><li><a href="./wiki/Ayuda:Contenidos_de_la_ayuda">Ayuda</a></li><li><a href="./wiki/Categor%C3%ADa:ElOtroLado:Pol%C3%ADticas_del_wiki">Políticas</a></li><li><a href="./wiki/Especial:Preferences">Preferencias</a></li><li><a href="./wiki/Especial:Watchlist">Seguimiento</a></li><li><a href="./wiki/Especial:Specialpages">Páginas Especiales</a></li><li><a href="./wiki/Especial:Search">Búsqueda</a></li></ul></li><li><a href="#">Enlaces</a><ul><li><a class="daddy" href="#">In</a><ul><li><a target="_blank" href="http://www.cineol.net">CINeol</a></li><li><a target="_blank" href="http://www.deporteol.net">DeportEOL</a></li><li><a target="_blank" href="http://empalados.elotrolado.net">Empalados</a></li></ul></li><li><a class="daddy" href="#">Out</a><ul><li><a target="_blank" href="http://www.coveralia.com">Letras de canciones</a></li><li><a target="_blank" href="http://foro.elhacker.net">elhacker</a></li><li><a target="_blank" href="http://www.cucharete.com">Restaurantes en Madrid</a></li><li><a target="_blank" href="http://tuexperto.com">Tuexperto.com</a></li><li><a target="_blank" href="http://www.adslzone.net%20">ADSL</a></li><li><a target="_blank" href="http://bandaancha.eu">Internet móvil</a></li><li><a target="_blank" href="http://www.tarifas24.es/seguros-coche/correduria-seguros">Correduría de seguros</a></li><li><a target="_blank" href="http://www.cinemaspop.net">Cinemaspop</a></li><li><a target="_blank" href="http://www.blogdemotor.com">Blog de Motor</a></li><li><a target="_blank" href="http://www.playconsola.com">Play Consola</a></li><li><a target="_blank" href="http://www.fashcinados.com">Fashcinados</a></li></ul></li></ul></li><li><a href="#">Configurar Estilo</a><ul><li><a href="#" class="daddy">Visualización</a><ul><li><a href="./rpc.php?mode=forcemobile&amp;sid=8892dcc9dbf2f2f576db47ae7fab64cf" title="Versión ligera">Versión Móvil</a></li><li><a onclick="StyleSwitch(); return false;" href="#">Eol Classic / Eol V2</a></li><li><a title="Cambiar tamaño de fuentes" onclick="fontsizeup(); return false;" href="#">A+</a></li></ul></li><li><a href="#" class="daddy">Estado de Interfaz</a><ul><li><a id="Estado" href="#">'+Estado+'</a></li></ul></li></ul></li>';

// Buscamos el elemento "Buscador" y lo pasamos a tratar
var buscador = document.getElementById('search-box')
buscador.style.marginLeft= '120px';

// Ponemos un interprete de eventos en el elemento "Estado" Esto nos permitira cambiar de apariencia
var a_add = document.getElementById('Estado');
a_add.addEventListener("click", function(){
         Activar();         
      }, false);

// Comprovaciones rutinarias para cargar una interfaz o otra.
if (Estado==null){
	localStorage.setItem("InterfazNetBook_Activada",'Desactivada');
	var retVal = confirm("Quieres activar la interfaz limpia de EOL?");
   	if( retVal == true ){
	  localStorage.setItem("InterfazNetBook_Activada",'Activada');
	  location.reload();
   }
   else{
     localStorage.setItem("InterfazNetBook_Activada",'Desactivada');
   }

}
else if(Estado=='Activada'){
	buscador.style.top = '4px';
	
	// Dinamismo del marco de la publicidad
	var menu2 = document.getElementById("leftcontent");
	menu2.style.marginLeft = '-105px';
	menu2.addEventListener("mouseover", function(){
	var slidingDiv = document.getElementById("leftcontent");
	slidingDiv.style.marginLeft = "0px";
	document.getElementById("rightcontent").style.marginLeft='120px';        
      }, false);

	menu2.addEventListener("mouseout", function(){   
	var slidingDiv = document.getElementById("leftcontent");
	slidingDiv.style.marginLeft = "-105px";
	document.getElementById("rightcontent").style.marginLeft='10px';       
      }, false);
	
	// Buscamos y anulamos los componentes que ocupan mas en pantalla
	document.getElementById('site-description').innerHTML = '';
	document.getElementById('banner_top').innerHTML = '';
	//document.getElementById('leftcontent').innerHTML = '';
	document.getElementById('page-footer').style.marginLeft = '0em';
	var logo2 = document.getElementById('rightcontent');
	logo2.style.marginLeft = '10px';
	var head = document.body.style.fontSize = '10px';
	
	// Modificamos y quitamos tamaño a la cabezera
	var menu = document.getElementById('wrap');
	menu.getElementsByTagName('div')[0].style.height = '0px';
	
	try{ // Ejecutamos si podemos. Cambiamos de posicion los elementos del login y Buscador.
	document.getElementById('cuadrologin_conectado').style.top = '0px';
	document.getElementById('ucp_cuadrologin').style.marginBottom = '0em';
	document.getElementById('ucp_cuadrologin').style.lineHeight = '1em';
	document.getElementById('ucp_cuadrologin').getElementsByTagName('a')[0].style.color = 'black';
	document.getElementById('logout_cuadrologin').getElementsByTagName('a')[0].style.color = 'black';
	
	// Vamos a buscar los elementos de panel de control, para cambiar de color y distingirlos
	var elements = new Array();
	elements = document.getElementById('ucp_cuadrologin').getElementsByTagName('a');
	for (i=0;i<elements.length;i++){
		elements[i].style.color = 'black';
	}
	}
	catch(e){
		// Esto ocurrira, si el usuario no esta logueado
	document.getElementById('loginheader').style.top = '5px';
	document.getElementById('loginheader_links').innerHTML='';
	document.getElementById('username_mini').style.backgroundColor = 'white';
	document.getElementById('password_mini').style.backgroundColor = 'white';
	}
}