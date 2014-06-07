// ==UserScript==

// @name           Fix Taringa

// @namespace      mcodina.com.ar

// @description    Pequeños hacks desarrollados para taringa

// @include        http://*taringa.net*

// @exclude        http://www.taringa.net/comunidades/

// @exclude        http://www.taringa.net/comunidades/*

// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==



/* CARGAMOS LAS OPCIONES */

var update = GM_getValue("autoUpdate", 1);

var publicidad = GM_getValue("quitarPublicidad", 1);

var clima = GM_getValue("quitarClima", 0);

var linksFlash = GM_getValue("linksFlash", 1);

var showHiddenLinks = GM_getValue("showHiddenLinks", 1);

var showPerfilData = GM_getValue("showPerfilData", 1);

var showLastPosts = GM_getValue("showLastPosts", 1);

var largeAvatars = GM_getValue("largeAvatars", 1);

var quitarPatrocinados = GM_getValue("quitarPatrocinados", 1);

var quitarPostsX = GM_getValue("quitarPostsX", 1);

var quitarComentariosX = GM_getValue("quitarComentariosX", 1);

var postsX = GM_getValue("postsX", "justin bieber");

var quitarBuscador  = GM_getValue("quitarBuscador", 1);

var quitarEstadisticas  = GM_getValue("quitarEstadisticas", 1);

var quitarJuegos = GM_getValue("quitarJuegos", 1); 



/* OPCIONES!!! */

GM_registerMenuCommand("Opciones Fix T!", show_prefs);



// Opciones en menu usuario

$('#subMenuPosts ul div').remove();

$('<li><a style="font-weight: bold;" id="showTaringaFixOpt">Taringa Fix!</a></li>').appendTo($('#subMenuPosts ul'));

$('<div class="clearBoth"></div>').appendTo('#subMenuPosts ul');

$('#showTaringaFixOpt').click(function(){

	show_prefs();

});



function show_prefs(){

	$('<div id="div_prefs"></div>').appendTo('body');

	$('#div_prefs').css("position", "fixed");

	$('#div_prefs').css("bottom", "10px");

	$('#div_prefs').css("right", "10px");

	$('#div_prefs').css("padding", "5px 10px");

	$('#div_prefs').css("background", "#888");

	$('#div_prefs').css("border", "2px solid #000");

	$('#div_prefs').css("z-index", "999999999");

	$('#div_prefs').css("color", "#FFF");

	$('<h3>Propiedades de Fix T!</h3>').appendTo('#div_prefs');

	$('<form name="fixTaringaOptions"></form>').appendTo('#div_prefs');

	$('<table style="width: 400px; border: 0px;"><tr><td colspan="2"><label for="autoUpdate">Actualizar Script</label> <input type="checkbox" name="autoUpdate" id="autoUpdate" /></td></tr><tr><td colspan="2"><b style="color: #9EB8CF;">Opciones de la p&aacute;gina principal</b></td></tr><tr><td><label for="quitarPublicidad">Quitar Publicidad</label> <input type="checkbox" name="quitarPublicidad" id="quitarPublicidad" /></td><td><label for="quitarClima">Quitar Clima</label> <input type="checkbox" name="quitarClima" id="quitarClima" /></td></tr><tr><td><label for="showPerfilData">Mostrar Perfil</label> <input type="checkbox" name="showPerfilData" id="showPerfilData" /></td><td><label for="showLastPosts">Mostrar &uacute;ltimos posts</label> <input type="checkbox" name="showLastPosts" id="showLastPosts" /></td></tr><tr><td><label for="quitarBuscador">Quitar Buscador</label> <input type="checkbox" name="quitarBuscador" id="quitarBuscador" /></td><td><label for="quitarEstadisticas">Quitar Estad&iacute;sticas</label> <input type="checkbox" name="quitarEstadisticas" id="quitarEstadisticas" /></td></tr><tr><td><label for="quitarJuegos">Quitar Juegos</label> <input type="checkbox" name="quitarJuegos" id="quitarJuegos" /></td><td><label for="quitarPatrocinados">Quitar Posts Patrocinados</label> <input type="checkbox" name="quitarPatrocinados" id="quitarPatrocinados" /></td></tr><tr><td colspan="2"><b style="color: #9EB8CF;">Eliminar Posts</b></td></tr><tr><td><label for="quitarPostsX">Eliminar Posts</label> <input type="checkbox" name="quitarPostsX" id="quitarPostsX" /></td><td><label for="quitarComentariosX">Eliminar Comentarios</label> <input type="checkbox" name="quitarComentariosX" id="quitarComentariosX" /></td></tr><tr><td colspan="2"><label for="quitarX">Que contengan en el t&iacute;tulo... (separar con comas)</label> <input type="text" name="postsX" id="postsX" /></td></tr><tr><td colspan="2"><b style="color: #9EB8CF;">Opciones de los posts</b></td></tr><tr><td><label for="linksFlash">Permite Links en SWF</label> <input type="checkbox" name="linksFlash" id="linksFlash" /></td><td><label for="showHiddenLinks">Muestra Links Ocultos</label> <input type="checkbox" name="showHiddenLinks" id="showHiddenLinks" /></td></tr><tr><td><label for="largeAvatars">Muestra avatares largos</label> <input type="checkbox" name="largeAvatars" id="largeAvatars" /></td></tr><tr><td colspan="2"><button type="button" id="guardarOpciones">Guardar </button> <button type="button" id="cancelarOpciones">Cancelar</button></td></tr></table>').appendTo('#div_prefs > form');

	$('#div_prefs input[type=checkbox]').each(function(){

		if(GM_getValue($(this).attr("id")) == 1){

			$(this).attr("checked", true);

		} else {

			$(this).attr("checked", false);

		}

	});

	$('#postsX').attr("value", postsX);

	$('#guardarOpciones').click(function(){

		$('#div_prefs input[type=checkbox]').each(function(){

			if($(this).attr("checked")==true){

				GM_setValue($(this).attr("id"), 1);

			} else {

				GM_setValue($(this).attr("id"), 0);

			}

		});

		GM_setValue('postsX', $('#postsX').val());

		window.location.reload();

	});

	$('#cancelarOpciones').click(function(){

		$('#div_prefs').remove();

	});

}







// obtenemos la URL

var page = checkUrl();



/* CONTROLAMOS VERSION!! */

// version                     1.0 17 ago 2010

if(update == 1){

	var local_version = new Number(1.1);



	//alert("Actualizar");

	GM_xmlhttpRequest({

		method: "GET",

		url: 'https://docs.google.com/Doc?docid=0Ac34gGCiSVRGZGNqNmt3OG5fMjNna3FiNnFucQ',

		headers:{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type':'application/x-www-form-urlencoded'},

		data:'',

		onload:function(result) {

			var res = result.responseText;

			var start_pos = res.indexOf("*Version");

			var stop_pos = res.indexOf("*", start_pos + 1);

			var server_version = new Number(0);

			server_version = res.substr(start_pos + 8, (stop_pos - start_pos - 8 ));

			if (server_version > local_version){

				alert("Hay una nueva version del script, ahora se le actualizara. Disculpe las molestias");

				location.replace("http://userscripts.org/scripts/source/49267.user.js");

			}

		}

	});

}

// FIN CONTROL DE VERSIÓN!!



/* AGREGAMOS LOS LINKS A LOS SWF */

if(page == "post" && linksFlash == 1){

	$("div.post-contenido  span[property|=dc:content] embed").each(function(){

		var p = $(this).parent();

		var src = $(this).attr("src");

		var width = $(this).attr("width");

		var height = $(this).attr("height");



		p.html('<embed width="' + width + '" height="' + height + '" wmode="transparent" allowscriptaccess="always" allownetworking="all" type="application/x-shockwave-flash" quality="high" src="' + src + '">');

	});

}



/* QUITAMOS LA PUBLICIDAD Y CLIMA */

if(page == "normal" && publicidad == 1){

	if(clima == 1){

		$("#derecha").html("");

	} else {

		$("#derecha div").slice(10).remove();

	}

	$("#head #banner").html('<form action="http://buscar.taringa.net/posts" class="buscador-h" name="top_search_box"><div class="search-in"><a onclick="search_set(this, \'web\')" class="">Web</a> - <a class="search_active" onclick="search_set(this, \'posts\')">Posts</a> - <a onclick="search_set(this, \'comunidades\')" class="">Comunidades</a></div><div style="clear: both;"><img src="http://o1.t26.net/images/mini_InputSleft_2.gif" class="mini_leftIbuscador"><input type="text" id="ibuscadorq" name="q" onkeypress="ibuscador_intro(event)" onfocus="onfocus_input(this)" onblur="onblur_input(this)" value="Buscar" title="Buscar" class="mini_ibuscador onblur_effect"><input type="submit" vspace="2" hspace="10" align="top" value="" alt="Buscar" class="mini_bbuscador" title="Buscar"> </div></form>');

} else {

	if(clima == 1 && page == "normal") {

		$(".climaHome").remove();

	}

}



/* QUITAMOS EL BUSCADOR */

if(page == "normal" && quitarBuscador == 1){

	$('#centro div.bar-options').parent().remove();

}



/* QUITAMOS LAS ESTADISTICAS */

if(page == "normal" && quitarEstadisticas == 1){

	$('#estadisticasBox').remove();

}



/* QUITAMOS LOS JUEGOS */

if(page == "normal" && quitarJuegos == 1){

	$('#juegosBox > div').slice(0,2).remove();

	$('#juegosBox > br').slice(0,1).remove();

}



/* QUITAMOS LOS PATROCINADOS */

if(quitarPatrocinados == 1 && page == "normal"){

	$('#izquierda li').each(function(){

		if($(this).attr("class") == "categoriaPost sticky patrocinado"){

			$(this).remove();

		}

	});

}



/* QUITAMOS LOS POSTS QUE TENGAN X COSA EN EL TITULO */

if(quitarPostsX == 1 && page == "normal"){

	var arrayCensurar = postsX.split(",");

	var i;

	var cant = arrayCensurar.length;

	$('#izquierda li a').each(function(){

		for(i=0; i<cant; i++){

			if($(this).text().toLowerCase().indexOf($.trim(arrayCensurar[i])) != "-1"){

				$(this).parent().remove();

			}

		}

	});

}



/* QUITAMOS LOS COMENTARIOS DE LOS POSTS QUE TENGAN X COSA EN EL TITULO */

if(quitarComentariosX == 1 && page == "normal"){

	var arrayCensurar = postsX.split(",");

	var i;

	var cant = arrayCensurar.length;

	$('#ult_comm li a').each(function(){

		for(i=0; i<cant; i++){

			if($(this).text().toLowerCase().indexOf($.trim(arrayCensurar[i])) != "-1"){

				$(this).parent().remove();

			}

		}

	});

}



/* MOSTRAMOS LINKS OCULTOS EN LOS POSTS */

if(page == "post" && showHiddenLinks == 1){

	$("div.post-contenido  span[property|=dc:content] a").each(function(){

		if(isDD($(this).attr("href")) == true){

			$(this).html($(this).attr("href"));

		}

	});

}



/* MOSTRAMOS INFORMACION DEL PERFIL */

if(showPerfilData == 1 && page == "normal"){

	$('<div id="miPerfil"></div>').appendTo('#derecha');

	$('<div class="box_title"><span class="box_txt">Mi Perfil</span></div>').appendTo('#miPerfil');

	$('<div class="box_cuerpo"></div>').appendTo('#miPerfil');

	$('<img src="http://i988.photobucket.com/albums/af7/matcod86/ajax-loader.gif" alt="Cargando..." />').appendTo('#miPerfil > div.box_cuerpo');

	if($('a.username').html() == null){

		$('#miPerfil > div.box_cuerpo').html("<b>Debes estar logueado...</b>");

	} else {

		GM_xmlhttpRequest({

			method: "GET",

			url: 'http://www.taringa.net/api/fedab7f373edb6a4cc77fdbc583980d7/xml/Users-GetUserData/' + $('a.username').html(),

			data:'',

			onload:function(result) {

				var xml = str2xml( result.responseText );

				$('#miPerfil > div.box_cuerpo').html("");

				// $('<ul id="miPerfil"></ul>').appendTo('#ultimosPosts > div.box_cuerpo');

				var i=0;

				$('<b>' + $('root', xml).children('profile').children('nick').text() + '</b>').appendTo('#miPerfil > div.box_cuerpo');

				$('<p style="text-align: center;"><img src="' + $('root', xml).children('profile').children('avatar').text() + '" alt="Avatar" /></p>').appendTo('#miPerfil > div.box_cuerpo');

				$('<ul id="miPerfilDatos"></ul>').appendTo('#miPerfil > div.box_cuerpo');

				$('<li><b>Level:</b> ' + $('root', xml).children('profile').children('userlevel').text() + '</li>').appendTo('#miPerfilDatos');

				$('<li><b>Posts:</b> ' + $('root', xml).children('profile').children('total-posts').text() + '</li>').appendTo('#miPerfilDatos');

				$('<li><b>Puntos:</b> ' + $('root', xml).children('profile').children('score').text() + '</li>').appendTo('#miPerfilDatos');

				$('<li><b>Comentarios:</b> ' + $('root', xml).children('profile').children('total-comments').text() + '</li>').appendTo('#miPerfilDatos');

			}

		});

	}

	

}



/* MOSTRAMOS ULTIMOS POSTS */

if(showLastPosts == 1 && page == "normal"){

	$('<div id="ultimosPosts"></div>').appendTo('#derecha');

	$('<br class="space" />').appendTo('#ultimosPosts');

	$('<div class="box_title"><span class="box_txt">&Uacute;ltimos Posts</span></div>').appendTo('#ultimosPosts');

	$('<div class="box_cuerpo"></div>').appendTo('#ultimosPosts');

	$('<img src="http://i988.photobucket.com/albums/af7/matcod86/ajax-loader.gif" alt="Cargando..." />').appendTo('#ultimosPosts > div.box_cuerpo');

	if($('a.username').html() == null){

		$('#ultimosPosts > div.box_cuerpo').html("<b>Debes estar logueado...</b>");

	} else {

		GM_xmlhttpRequest({

			method: "GET",

			url: 'http://www.taringa.net/api/fedab7f373edb6a4cc77fdbc583980d7/xml/Users-GetPostsList/' + $('a.username').html(),

			data:'',

			onload:function(result) {

				var xml = str2xml( result.responseText );

				$('#ultimosPosts > div.box_cuerpo').html("");

				$('<ul id="listaUltimosPosts"></ul>').appendTo('#ultimosPosts > div.box_cuerpo');

				var i=0;

				$('root', xml).children().each(function() {

					i++;

					if(i<=10){

						$('<li class="categoriaPost ' + getCatName($(this).children('cat-id').text()) + '"><a href="' + $(this).children('url').text() + '">' +  $(this).children('title').text() + '</a></li>').appendTo('#listaUltimosPosts');

					}

				});

			}

		});

	}

	

}



/* MOSTRAMOS LOS AVATARES LARGOS */

if(page == "post" && largeAvatars == "1"){

	$("div.avatarBox").height('auto');

}





/* -------------------------- FUNCIONES ------------------------------ */

// Vemos donde pertenece la URL

function checkUrl(url) {

	if(document.location.host.substr(-11)=="taringa.net"){

		if($('.post-wrapper').html() == null){

			return "normal";

		} else {

			return "post";

		}

	}

}

function isDD(url){

	var d = url.match(/:\/\/(www\.)?(.[^/:]+)/)[2];

	if(d!=null && d.substr(0,3)=="www"){

		d = d.substr(4);

	}

	if(d == "rapidshare.de" || d == "rapidshare.com" || d == "megaupload.com" || d == "megashares.com" || d == "mediafire.com" || d == "gigasize.com" || d == "4shared.com" || d == "filefactory.com" || d == "adrive.com" || d == "badongo.com" || d == "filefront.com" || d == "depositfiles.com" || d == "uploading.com" || d == "hotfile.com" || d == "uploaded.to" || d == "egoshare.com" || d == "freakshare.net" || d == "fileserve.com" || d == "shareflare.net") {

		return true;

	} else {

		return false;

	}

}

function str2xml(strXML) {

    var objDOMParser = new DOMParser();

    var objDoc = objDOMParser.parseFromString(strXML, "text/xml");

    return objDoc;

}

function getCatName(id){

	var array = {

		'7': 'animaciones',

		'18': 'apuntes-y-monografias',

		'4': 'arte',

		'25': 'autos-motos',

		'17': 'celulares',

		'33': 'ciencia-educacion',

		'19': 'comics',

		'16': 'deportes',

		'9': 'downloads',

		'23': 'ebooks-tutoriales',

		'34': 'ecologia',

		'29': 'economia-negocios',

		'24': 'femme',

		'35': 'hazlo-tu-mismo',

		'26': 'humor',

		'1i': 'magenes',

		'12': 'info',

		'0': 'juegos',

		'2': 'links',

		'15': 'linux',

		'22': 'mac',

		'32': 'manga-anime',

		'30': 'mascotas',

		'8': 'musica',

		'10': 'noticias',

		'5': 'offtopic',

		'21': 'recetas-y-cocina',

		'27': 'salud-bienestar',

		'20': 'solidaridad',

		'28': 'taringa',

		'31': 'turismo',

		'13': 'tv-peliculas-series',

		'3': 'videos'

	}

	return array[id];

}

