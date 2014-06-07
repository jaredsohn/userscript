// Shur Scripts SA
// GPLv2 Licensed
// http://www.gnu.org/licenses/gpl-2.0.html
//
// ==UserScript==
// @name			ShurScript
// @description		Script para ForoCoches
// @namespace		http://shurscript.es
// @version			0.07
// @author			TheBronx
// @author			xusoO
// @author			Fritanga
// @include			*forocoches.com/foro/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant	GM_log
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_deleteValue
// @grant	GM_xmlhttpRequest
// @grant	GM_registerMenuCommand
// @grant	GM_addStyle
// @history 0.00 first version.
// ==/UserScript==

/* ESTILOS NOTIFICACIONES */
GM_addStyle(".notifications {cursor: pointer; text-align: center; padding: 7px 15px; width: 35px; background: #CECECE; color: gray; font-size: 24pt;}");
GM_addStyle(".notifications.unread {background: #CC3300; color: white;}");
GM_addStyle(".notifications sup {font-size: 10px;}");
GM_addStyle("#notificationsBox { background: white; border: 1px solid #CC3300; overflow: auto; position: absolute; width: 340px; display: none;max-height:400px; min-height:83px; box-shadow: 0 2px 4px -2px; right: 5px;}");
GM_addStyle(".notificationRow {height: 70px; overflow: visible; padding: 6px; font-size: 9pt; color: #444;border-bottom:1px solid lightgray;}");
GM_addStyle(".notificationRow > div {margin-top: 2px;}");
GM_addStyle(".notificationRow.read {color: #AAA !important;}");
GM_addStyle(".notificationRow.read a {color: #888 !important;}");
GM_addStyle(".notificationRow:hover {background: #eee;}");
GM_addStyle("#noNotificationsMessage {text-align: center; line-height: 83px; font-size: 12pt; color: #646464;}");
GM_addStyle("#markAllAsReadRow {background: #CC3300;color: white;cursor: pointer;font-size: 10pt;height: 30px;line-height: 27px;text-align: center;}");
/* ESTILOS FAVORITOS */
GM_addStyle(".favorite>td:nth-child(3) {background-color:#D5E6EE; border-right: 4px solid #528BC6}");
GM_addStyle(".fav img {display:none;} .fav {cursor: pointer; background-repeat:no-repeat; background-position: center; background-image:url('http://salvatorelab.es/images/star.png');}");
GM_addStyle(".not_fav img {display:none;} .not_fav {cursor: pointer; background-repeat:no-repeat; background-position: center; background-image:url('http://salvatorelab.es/images/nostar.png');}");


/**
 * Página actual (sin http://forocoches.com/foro ni parámetros php)
 */
var page;
var username;
var userid;
var currentStatus = "QUERY"; //QUERY - Obteniendo datos, OK - Datos obtenidos, ERROR - Error al obtener los datos
var notificationsUrl;
var interval = 1 * 60 * 1000; //1 minuto

var lastUpdate; //Ultima actualizacion - Config. guardada en el navegador
var lastReadQuote;
var lastQuotesJSON; //Lista de notificaciones no leidas en formato JSON - Config. guardada en el navegador

var arrayQuotes;
var notificationsCount;
var notificationsBox;

var favorites; //hilos favoritos

jQuery(document).ready(function(){
	if (window.top != window) { // [xusoO] Evitar que se ejecute dentro de los iframes
		return;
	}
	initialize();
	run();
});

function initialize() {
	//inicializamos variables
	page = location.pathname.replace("/foro","");
	username = jQuery("a[href*='member.php']").first().text();
	userid = jQuery("a[href*='member.php']").first().attr("href").replace("member.php?u=", "");
	//variables para notificaciones
	notificationsUrl = "http://www.forocoches.com/foro/search.php?do=process&query=" + escape(username) + "&titleonly=0&showposts=1";
	lastUpdate  = GM_getValue("FC_LAST_QUOTES_UPDATE_" + userid);
	lastReadQuote = GM_getValue("FC_LAST_READ_QUOTE_" + userid);
	lastQuotesJSON = GM_getValue("FC_LAST_QUOTES_" + userid);
	arrayQuotes = new Array();
	if (lastQuotesJSON) {
	    try {
		    arrayQuotes = JSON.parse(lastQuotesJSON);
	    } catch(e){
		    console.log("Error parsing JSON");
		    GM_deleteValue("FC_LAST_QUOTES_" + userid);
	    }
	}
	
	//variables para hilos favoritos
    favorites = jQuery.parseJSON( GM_getValue("FC_FAVORITE_THREADS_" + userid,"[]") );
}

function run() {
	createNotificationsBox();
	showNotifications();
	if (page=="/showthread.php" || page=="/newreply.php") {
		//copiamos navegación a la parte inferior del foro
		bradcrumbToBot();
	}
	if (page=="/newreply.php") {
		//nestedQuotes(); //TODO activar cuando funcione
	}
	if (page=="/forumdisplay.php") {
        favoriteThreads();
    }
}

/**
 * Copiamos la tabla con la navegación en la parte inferior del foro
 */
function bradcrumbToBot() {
	jQuery('#qrform').before( '<table width="100%" cellspacing="1" cellpadding="5" border="0" align="center" class="tborder navigation-bot">'+
        jQuery('.page>div>table').html()+'</table><br>' );
	//borramos las notificaciones de la barra de abajo
	jQuery('.navigation-bot .notifications').parent().remove();
}

/**
 * Mostramos el contador de notificaciones
 */
function showNotifications() {
	//creamos la celda de notificaciones
	jQuery(".page table td.alt2[nowrap]").first().parent().append('<td style="padding: 0px;" class="alt2"><div class="notifications">0</div></td>');
	jQuery('.notifications').click(function() {
		if (status == "ERROR" || (!lastUpdate || Date.now() - parseFloat(lastUpdate) > interval)) {
			updateNotifications();			
		}
		showNotificationsBox();
	});

	//comprobamos (si procede) nuevas notificaciones
	if (!lastUpdate || Date.now() - parseFloat(lastUpdate) > interval) {
		//Han pasado más de 1 minuto, volvemos a actualizar
	    updateNotifications(true);
	} else {
		//Hace menos de 1 minutos desde la ultima actualización, 
		//usamos las ultimas citas guardadas	    
	    populateNotificationsBox(arrayQuotes);
		setNotificationsCount(arrayQuotes.length);
	    
	    currentStatus = "OK";
	}
}

function updateNotifications(firstLoad) {
	firstLoad = typeof firstLoad !== 'undefined' ? firstLoad : false;
	
	jQuery('.notifications').html("...");
    currentStatus = "QUERY";
    GM_xmlhttpRequest({
      method: "GET",
      url: notificationsUrl,
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      onload: function(response) {
    
        if (response.readyState != 4 && response.statusText != "OK") { //Ha ocurrido algun error
            currentStatus = "ERROR";
            setNotificationsCount("X");
            return;
        }
        
        lastUpdate = Date.now();
        
        var documentResponse = jQuery.parseHTML(response.responseText);
        var citas = jQuery(documentResponse).find("#inlinemodform table[id*='post']");
        if (citas.length == 0) {

            var tooManyQueriesError = jQuery(documentResponse).find(".page li").text();
            //Hemos recibido un error debido a demasidas peticiones seguidas. Esperamos el tiempo que nos diga ilitri y volvemos a lanzar la query.
            if (tooManyQueriesError && !firstLoad) {
                tooManyQueriesError = tooManyQueriesError.substring(tooManyQueriesError.indexOf("aún") + 4);
                var secondsToWait = tooManyQueriesError.substring(0, tooManyQueriesError.indexOf(" "));
                var remainingSeconds = parseInt(secondsToWait) + 1;
                interval = setInterval(function() {
                    if (remainingSeconds > 0)
                        setNotificationsCount("...<sup>" + (remainingSeconds--) + "</sup>");
                    else {                    
                        updateNotifications();
                        clearInterval(interval);
                    }
                }
                , 1000);
                return;
            } else if (firstLoad && arrayQuotes.length > 0) {
	            //Si en la primera carga falla, no dejamos esperando al usuario
			    populateNotificationsBox(arrayQuotes);
				setNotificationsCount(arrayQuotes.length);
			    
			    currentStatus = "OK";

			    return;
            }
        }        
            
        newQuotes = new Array();
        var cita;
        if (lastReadQuote) { //Contamos las citas no leídas hasta la última que tenemos guardada
            for (i = 0; i < citas.length; i++) { 
            	cita = new Cita(citas[i]);
                if (lastReadQuote == cita.postLink) {
                    break;
                } else {
	                newQuotes.push(cita);
                }
            }
        }
 
        if (citas.length > 0) {
        	lastReadQuote = new Cita(citas[0]).postLink;
        	GM_setValue("FC_LAST_READ_QUOTE_" + userid, new Cita(citas[0]).postLink);
        }

        arrayQuotes = newQuotes.concat(arrayQuotes); //Mergeamos las nuevas y las antiguas
        
        populateNotificationsBox(arrayQuotes);
        
        lastQuotesJSON = JSON.stringify(arrayQuotes); //Formateamos a JSON para guardarlo
        
        count = arrayQuotes.length;
    
        setNotificationsCount(count);

        GM_setValue("FC_LAST_QUOTES_UPDATE_" + userid, Date.now().toString());
        GM_setValue("FC_LAST_QUOTES_" + userid, lastQuotesJSON);
    
        currentStatus = "OK";
        
        
        //Mensajes de alerta para el usuario
        if (firstLoad) {
	        if (newQuotes.length == 1) {
		        cita = newQuotes[0];
		        if (confirm("El usuario '" + cita.userName + " te ha citado en el hilo '" + cita.threadName + "'\n¿Quieres ver el post ahora?")) {
		        	markAsRead(cita);
			        window.open(cita.postLink, "_self");
		        }
	        } else if (newQuotes.length > 1) {
		        if (confirm("Tienes " + newQuotes.length + " nuevas citas en el foro\n¿Quieres verlas ahora?")) {
		        	$("html, body").animate({ scrollTop: 0 }, "slow");
			        showNotificationsBox();
		        }
	        }
        }
        
      }
    });
}

function setNotificationsCount(count) {
    notificationsDiv = jQuery(".notifications");
    if (count > 0) {
        notificationsDiv.addClass("unread");
    } else {
        notificationsDiv.removeClass("unread");
    }
    notificationsCount = count;
    notificationsDiv.html(count);
}

function createNotificationsBox() {
	notificationsBox = jQuery("<div id='notificationsBox'/>");

	$(document.body).append(notificationsBox);
	$(document).mouseup(function (e) {	
	    if (notificationsBox.css("display") == "block" && !notificationsBox.is(e.target) //No es nuestra caja
	        && notificationsBox.has(e.target).length === 0) { //Ni tampoco un hijo suyo
	        notificationsBox.hide(); //Cerramos la caja
	        e.stopImmediatePropagation();
	        e.stopPropagation();
	        e.preventDefault();
	    }
	});
	
	markAsReadButton = jQuery("<div class='notificationRow' id='markAllAsReadRow'/>");
	markAsReadButton.html("Marcar todas como leídas");
	notificationsBox.append(markAsReadButton);
	
}

function showNotificationsBox() {
	notificationsBox.css("top", jQuery(".notifications").offset().top + jQuery(".notifications").height() + 14);	
	notificationsBox.show();
}

function populateNotificationsBox(array) {
	notificationsBox.html('<div id="noNotificationsMessage">No tienes ninguna notificación</div>'); //Vaciamos
	for (i = 0; i < array.length; i++) {
		addToNotificationsBox(array[i]);
	}
	if (array.length > 0) {
		markAsReadButton = jQuery("<div id='markAllAsReadRow'/>");
		markAsReadButton.html("Marcar todas como leídas");
		markAsReadButton.click(function(){
			emptyArray = new Array();
			setNotificationsCount(0);
			populateNotificationsBox(emptyArray);
			lastQuotesJSON = JSON.stringify(emptyArray);
			GM_setValue("FC_LAST_QUOTES_" + userid, lastQuotesJSON);
/* 			updateNotifications(); */
		});
		notificationsBox.append(markAsReadButton);
	}
}

function addToNotificationsBox(cita) {
	jQuery("#noNotificationsMessage").hide();
	row = jQuery("<div class='notificationRow'><div><b>El usuario <a href='" + cita.userLink + "'>" + cita.userName + "</a> te ha citado</div><div><a href='" + cita.threadLink + "'>" + cita.threadName + "</a></b></div><div></div></div>");
	link = jQuery("<a href='" + cita.postLink + "' style='color:#444;'>" + cita.postText + "</a>");
	
	link.mousedown(function(e) { 
		if (e.which != 3) {
			setNotificationsCount(notificationsCount - 1);
			$(this).parent().parent().addClass("read");
			markAsRead(cita);
			$(this).off("mousedown");	
		}
	});

	link.appendTo(row.find("div").get(2));

	notificationsBox.append(row);
}

function markAsRead(cita) {
	
	var index = jQuery.inArray(cita, arrayQuotes);
	
	if (index != -1) {
		arrayQuotes.splice(index, 1);
		lastQuotesJSON = JSON.stringify(arrayQuotes);
    	GM_setValue("FC_LAST_QUOTES_" + userid, lastQuotesJSON);
    }
}


function Cita(el) {
	
	postElement = $(el).find(".smallfont > em > a");
	this.postLink = postElement.attr("href");
	this.postText = postElement.text();	
	
	threadElement = $(el).find(".alt1 > div > a > strong");
	this.threadLink = threadElement.parent().attr("href");
	this.threadName = threadElement.text();
	
	userElement = $(el).find(".smallfont > a");
	this.userLink = userElement.attr("href");
	this.userName = userElement.text();
	
}

/**
 * HILOS FAVORITOS [TheBronx]
 * Mostramos un icono para marcar hilos favoritos
 * Los hilos favoritos pasan a estar destacados
 */
function favoriteThreads() {
    var hilos = new Array();
    var hilo = {};
    //recogemos todos los hilos actuales
    $('#threadslist tr td').each( function() {
        var identifier = $(this).attr('id');
        if ( identifier != undefined && identifier.indexOf('td_threadstatusicon')>=0 ) {
            //celda icono
            hilo.icon_td_id = identifier;
        } else if (identifier != undefined && identifier.indexOf('td_threadtitle')>=0) {
            //celda titulo
            var a = $(this).find('div > a').first();
            hilo.href = a.attr('href');
            hilo.id = parseInt(a.attr('href').replace(/.*showthread\.php\?.*t=/,""),10);
            hilo.title = a.html();
            hilos.push( hilo );
            hilo = {};
        }
    });
    
    //ahora resaltamos los hilos favoritos y mostramos los iconos correspondientes
    for (var i=0; i<hilos.length; i++) {
        var hilo = hilos[i];
        var icon_td = jQuery( "#"+hilo.icon_td_id );
        if ( favorites.indexOf( hilo.id ) >= 0 ) {
            //es un hilo favorito
            icon_td.parent().addClass("favorite");
            icon_td.hover(
                function() {//mouse in
                    $(this).addClass("fav");
                },
                function() {//mouse out
                    $(this).removeClass("fav");
                }
            );
        } else {
            //es un hilo normal
            icon_td.hover(
                function() {//mouse in
                    $(this).addClass("not_fav");
                },
                function() {//mouse out
                    $(this).removeClass("not_fav");
                }
            );
        }
        //en ambos casos al hacer clic se cambia su estado (fav->no_fav y viceversa) y se guarda/elimina de favoritos
        icon_td.click( function(e) {
            var id = parseInt($( this ).attr('id').replace("td_threadstatusicon_",""),10);
            //si no era favorito...
            if (favorites.indexOf(id) < 0) {
                //lo agregamos a favoritos
                favorites.push(id);
                //quitamos el class antiguo
                $( this ).removeClass("not_fav");
                //cambiamos los eventos hover
                $( this ).unbind('mouseenter mouseleave');
                //nuevos eventos
                $( this ).hover(
                    function() {//mouse in
                        $(this).addClass("fav");
                    },
                    function() {//mouse out
                        $(this).removeClass("fav");
                    }
                );
                $( this ).parent().addClass("favorite");
            } else {
                //lo borramos de favoritos
                favorites.splice(favorites.indexOf(id),1);
                //quitamos el class antiguo
                $( this ).removeClass("fav");
                //cambiamos los eventos hover
                $( this ).unbind('mouseenter mouseleave');
                //nuevos eventos
                $( this ).hover(
                    function() {//mouse in
                        $(this).addClass("not_fav");
                    },
                    function() {//mouse out
                        $(this).removeClass("not_fav");
                    }
                );
                $( this ).parent().removeClass("favorite");
            }
            saveFavorites();
        });
    }
}

function saveFavorites() {
    GM_setValue("FC_FAVORITE_THREADS_" + userid, JSON.stringify(favorites));
}

/* ACTUALIZADOR AUTOMÁTICO */
// The following code (updated 07/24/13) is released under public domain.
// Usage guide: https://userscripts.org/guides/45

(function() {
    var id = 175463,
      hours = 1,
      name = typeof GM_info === 'object' ? GM_info.script.name : 'ShurScript',
      version = typeof GM_info === 'object' ? GM_info.script.version : '0.02',
      time = new Date().getTime();
    function call(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+id+'.meta.js',
            onload: function(xpr) {compare(xpr, response);},
            onerror: function(xpr) {if (secure) call(response, false);}
        });
    }
    function enable() {
        GM_registerMenuCommand('Activar actualizaciones automáticas del '+name, function() {
            GM_setValue('updated_175463', new Date().getTime()+'');
            call(true, true)
        });
    }
    function compareVersion(r_version, l_version) {
        var r_parts = r_version.split('.'),
          l_parts = l_version.split('.'),
          r_len = r_parts.length,
          l_len = l_parts.length,
          r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    }
    function compare(xpr,response) {
        var xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        var xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (xversion) && (xname[1] == name) ) {
            xversion = xversion[1];
            xname = xname[1];
        } else {
            if ( (xpr.responseText.match('the page you requested doesn\'t exist')) || (xname[1] != name) )
            GM_setValue('updated_175463', 'off');
            return false;
        }
        var updated = compareVersion(xversion, version);
        if ( updated && confirm('Hay disponible una nueva versión del '+xname+'.\n¿Quieres instalarla?') ) {
            try {
                location.href = 'http://userscripts.org/scripts/source/'+id+'.user.js';
            } catch(e) {}
        } else if ( xversion && updated ) {
            if(confirm('¿Quieres desactivar las actualizaciones automáticas de este script?')) {
                GM_setValue('updated_175463', 'off');
                enable();
                alert('Puedes volver a activarlas desde el submenú User Script Commands.');
            }
        } else if (response)
            alert('No hay actualizaciones disponibles del '+name);
    }
    function check() {
        if (GM_getValue('updated_175463', 0) == 'off')
            enable();
        else {
            if (+time > (+GM_getValue('updated_175463', 0) + 1000*60*60*hours)) {
                GM_setValue('updated_175463', time+'');
                call(false, true);
            }
            GM_registerMenuCommand('Comprobar actualizaciones del '+name, function() {
                GM_setValue('updated_175463', new Date().getTime()+'');
                call(true, true);
            });
        }
    }
    if (typeof GM_xmlhttpRequest !== 'undefined' &&
        (typeof GM_info === 'object' ? // has a built-in updater?
         GM_info.scriptWillUpdate === false : true))
        try {
            if (unsafeWindow.frameElement === null) check();
        } catch(e) {
            check();
        }
})();


/**
 * CITAS ANIDADAS [Fritanga]
 */
//globales
// Crea el objeto AJAX.
var xmlhttp=null;
// Constantes para las Citas Anidadas
var buttonText = 'Anidar cita';
var errText = "No se pudo anidar la cita: ";
var urlprefix = document.URL.substr(0,document.URL.indexOf('newreply.php'));
// Busca la zona de texto.
var textarea_insertpoint = -1;
var requote = /\[QUOTE=[^;\]]+;/;
var preNewline = '\n';
var postID = null;

function nestedQuotes() {
	var textarea = $('#vB_Editor_001_textarea');
	if(textarea == undefined) return; //no tiene sentido continuar si no encontramos el textarea
	
	/**
	 * FIELDSET DE OPCIONES EN EL EDITOR
	 */
	// Busca donde colocar el fieldset.
	var pageDiv = document.evaluate("//*[@id='vB_Editor_001_smiliebox']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	// Crea el fieldset
	var fieldsetb = document.createElement("fieldset");
	fieldsetb.title = 'ShurScript';
	fieldsetb.style.marginBottom = '10px';
	var legendb = document.createElement("legend");
	legendb.innerHTML = 'ShurScript';

	// Inserta el fieldset y su leyenda
	pageDiv.parentNode.insertBefore(fieldsetb, pageDiv);
	fieldsetb.appendChild(legendb);

	// Crea y añade el botón al fieldset
	var qmbutton = document.createElement("input");
	qmbutton.className = 'button';
	qmbutton.type = 'BUTTON';
	qmbutton.style.cursor = "pointer";
	qmbutton.addEventListener("click", doQuote, false);
	qmbutton.setAttribute('id','butNestQuote');
	qmbutton.value = buttonText;

	fieldsetb.appendChild(qmbutton); // Añade el botón al fieldset
	console.log("fieldset agregado textarea");
}

/**
 * habilita o deshabilita el textarea y el boton de citas anidadas
 */
function setTextareaEnabled( flag, buttonText ) {
	var qmbutton = jQuery('#butNestQuote');
	var textarea = jQuery('#vB_Editor_001_textarea');
	qmbutton.attr('disabled', !flag);
	textarea.attr('disabled', !flag);
	qmbutton.val( buttonText );
}

// Primera función tras pulsar el botón!
function doQuote(e) {
	var textarea = jQuery('#vB_Editor_001_textarea');
	// Anula el botón mientras trabaja.
	setTextareaEnabled( false, 'Trabajando...' );
	// Busca la cita que ha de anidar en el textarea,
	// empezando por arriba.
	var tatext = textarea.val().toUpperCase();
	textarea_insertpoint = tatext.search(requote);
	if(textarea_insertpoint >= 0) {
		var postidpos = textarea_insertpoint+7;
		preNewline = '\n';
		textarea_insertpoint = tatext.indexOf(']',textarea_insertpoint)+1;
		while(tatext.substr(textarea_insertpoint,1) == ' ' || tatext.substr(textarea_insertpoint,1) == '	' || tatext.substr(textarea_insertpoint,1) == '\n') {
			if(tatext.substr(textarea_insertpoint,1) == '\n') preNewline = '';
			textarea_insertpoint++;
		}
		// Continúa buscando más citas.
		while(tatext.substr(textarea_insertpoint,7) == '[QUOTE=' && tatext.indexOf(';',textarea_insertpoint) > 0 && tatext.indexOf(';',textarea_insertpoint) < tatext.indexOf(']',textarea_insertpoint)) {
			preNewline = '\n';
			postidpos = textarea_insertpoint+7;
			textarea_insertpoint = tatext.indexOf(']',textarea_insertpoint)+1;
			while(tatext.substr(textarea_insertpoint,1) == ' ' || tatext.substr(textarea_insertpoint,1) == '	' || tatext.substr(textarea_insertpoint,1) == '\n') {
				if(tatext.substr(textarea_insertpoint,1) == '\n') preNewline = '';
				textarea_insertpoint++;
			}
		}
		postidpos = tatext.indexOf(';',postidpos)+1;
		postID = tatext.substring(postidpos, tatext.indexOf(']',postidpos))
		var geturl = urlprefix + 'showpost.php?p=' + postID;
        
		// Hace una llamada AJAX para obtener el post.
		xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange=findFirstQuote;
		xmlhttp.open("GET",geturl,true);
		xmlhttp.send(null);
	} else {
		setTextareaEnabled( true, 'Anidar cita' );
		alert(errText+"no se han encontrado citas para anidar.");
	}
}
function findFirstQuote() {
	console.log(xmlhttp);
	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
		// Comprueba el retorno, si no es un post, salta un aviso.
		var gotPostOK = true;
		var quoteid = '';
		if (xmlhttp.status!=200 && xmlhttp.responseText.indexOf('id="post_message_'+postID+'"') < 0) gotPostOK = false;
		if(gotPostOK) 
		{// 200 = "OK"
			var xmlDoc=document.createElement('div');
			xmlDoc.innerHTML = xmlhttp.responseText;
			// Busca en el retorno la cita, si no la encuentra, almacena variable para altertar al usuario.
			quoteid = document.evaluate("//div[@id='post_message_"+postID+"']//img[@alt='Ver Mensaje']/..", xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
			if(quoteid == null) gotPostOK = false;
			else quoteid = quoteid.href;
			xmlDoc.innerHTML = '';
		}
		// Obtiene la ID de la cita.
		if(gotPostOK) {
			var postidx = quoteid.match(/[?&]p=\d+/);
			if(postidx == null) gotPostOK = false;
			else quoteid = postidx[0].substr(3);
		}
		if(gotPostOK) {
			var qmbutton = jQuery('#butNestQuote');
			qmbutton.value = 'Citando...';
			// Crea una llamda AJAX para obtener el mensaje citado.
			var geturl = urlprefix + 'newreply.php?do=newreply&p=' + quoteid;
			xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange=addQuotedMessage;
			xmlhttp.open("GET",geturl,true);
			xmlhttp.send(null);
		}
		if(!gotPostOK) {
			// Habilita de nuevo el botón.
			setTextareaEnabled( true, 'Anidar cita' );
			if(quoteid == null) alert(errText+"El mensaje no posee ninguna cita o ya ha sido citado.");
			else alert("No se ha podido obtener el post original (status="+xmlhttp.status+").\nForoCoches podría estar caído. ¡Guarda una copia del mensaje!");
		}
	}
}
function unescape_ent(str) {
    var temp = document.createElement("div");
    temp.innerHTML = str;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild)
    return result;
}
function addQuotedMessage() {
	if (xmlhttp.readyState==4)
	{// 4 = "loaded"
		var gotPostOK = true;
		var quote = '';
		if (xmlhttp.status!=200 && xmlhttp.responseText.indexOf('id="vB_Editor_001_textarea"') < 0) gotPostOK = false;
		if(gotPostOK) {
			// Comprueba el valor de retorno, si no es un mensaje citado, alerta al usuario.
			var quoteStart = xmlhttp.responseText.indexOf('id="vB_Editor_001_textarea"');
			var quoteEnd = -1;
			if(quoteStart >= 0) quoteStart = xmlhttp.responseText.indexOf('[QUOTE', quoteStart);
			if(quoteStart >= 0) quoteEnd = xmlhttp.responseText.indexOf('[/QUOTE]', quoteStart);
			if(quoteStart < 0) gotPostOK = false;
			// Obtiene el mensaje citado (todo el contenido del textarea).
			else quote = xmlhttp.responseText.substring(quoteStart, quoteEnd)+'\n[/QUOTE]';
		}
		if(gotPostOK) {
			var textarea = jQuery('#vB_Editor_001_textarea');
			// Inserta el mensaje en el lugar correspondiente del TextArea.
			textarea.val( textarea.val().substr(0,textarea_insertpoint) + preNewline + unescape_ent(quote) + '\n' + textarea.val().substr(textarea_insertpoint) );
			
			//insertamos en iframe
			//unsafeWindow.save_iframe_to_textarea();
		}
		// Rehabilita el botón y la caja de texto.
		setTextareaEnabled( true, 'Anidar cita' );
		if(!gotPostOK) {
			if(quoteid == null) alert("No se ha podido obtener el post original (status="+xmlhttp.status+").\nForoCoches podría estar caído. ¡Guarda una copia del mensaje!");
		}
	}
}