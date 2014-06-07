// ==UserScript==
// @name           futbol24+
// @namespace      futbol24+
// @description    futbol24 Plus
// @include        http://*futbol24.com/Live*
// ==/UserScript==
$ = unsafeWindow.$;
console = unsafeWindow.console;

var nro_ajax = 0;
var en_loop = false;
var match_class = '#f24com_tables .match';
var match_class_con_info = '#f24com_tables .f24plus';
var html_distinto_hth = true;
var async = true;

removerBanner();

$('#f24com_bar1').append('<span id="show_more_info" style="cursor:pointer;" class="f24com_clickevent">Show + Info</span>');
$('#show_more_info').click(function() {
	comprobarFechaBorradoDatos();
	if (!en_loop) {
		loop($(match_class), 0); //comienza a buscar mas info
	}
});

function comprobarFechaBorradoDatos() {
	var ultimaFechaTime = localStorage.getItem("fecha-borrado-datos");
	var hoy = new Date();
	if (!ultimaFechaTime) {
		localStorage.setItem("fecha-borrado-datos", hoy.getTime());
	} else if ((hoy.getTime() - ultimaFechaTime) / (1000*60*60*24) > 2) {
		localStorage.clear();
		localStorage.setItem("fecha-borrado-datos", hoy.getTime());
	}
	return true;
}

function loop(arr, i) {
	en_loop = true;
	if (arr[i]) {
		doMagic(arr[i]);
		if (maximoNroAjax()) {
			setTimeout(function() { loop(arr, i + 1) }, 7000);
		} else {
			loop(arr, i + 1);
		}
	} else {
		en_loop = false;
		setInterval(actulizarListaPartidos, 500); //Continuar actulizando los partidos
	}
}

function maximoNroAjax() {
	return async && nro_ajax != 0 && nro_ajax % 5 == 0;
}

function actulizarListaPartidos () {
	removerBanner();
	var partidos = $(match_class);
	if(partidos.length != $(match_class_con_info).length) {
		partidos.each(function(index, partido) { doMagic(partido); });
	}
}

//Obtiene el id del partido
function getIdMatch(match) {
	var match_id = match.id.split('_');
	return match_id[match_id.length-1];
}

function obtenerNombreEquipo(team, match) {
	return $('.' + team + ':first', match).text();
}

function doMagic(match) {
	var match_id = getIdMatch(match); //El ID del partido
	//match.id ID del elemento
	if (existeMatch('hth', match.id)) {
		actualizarHTH(match.id);
	} else {
		nro_ajax += 1;
		$.ajax({
			url: 'http://www.futbol24.com/ml/matchRedirect/?TypeId=4&TypeHash=faf6a&MId=' + match_id,
			success: function(html) { try { getHeadToHead(html, match.id); } catch (e) { console.log(e); } },
			async: async
		});
	}

	if (existeMatch('pos', match.id)) {
		actualizarPos(match.id);
	} else {
		var tabla_posiciones = obtenerTablaPosiciones(match);
		if (tabla_posiciones == null) {
			nro_ajax += 1;
			$.ajax({
				url: 'http://www.futbol24.com/ml/matchRedirect/?TypeId=3&TypeHash=4f8ac&MId=' + match_id,
				success: function(html) { try { getPosition(null, html, match); } catch (e) { console.log(e); } },
				async: async
			});
		} else {
			getPosition(tabla_posiciones, null, match);
		}
	}
	
	$(match).addClass('f24plus');
}

//Remueve pequeño banner BET
function removerBanner() {	
	$('.info .banner_h').remove();
}

//Remueve la info del "head to head"
function removerHTHAnterior(match_id) {
	$('#' + match_id + ' .info small').remove();
}

//Crea div con la info a usar
function crearTempXPath(html) {
	var div = document.createElement('div'); div.id = 'temp-xpath'; div.style = 'display: none'; div.innerHTML = html;
	document.body.appendChild(div);
}

//Remover el div con la info a usar
function removerTempXPath() {
	$('#temp-xpath').remove();
}

//Obtiene la info del "head to head"
function getHeadToHead(html, match_id) {
	removerHTHAnterior(match_id);
	crearTempXPath(html);
	
	var hth_local = null;

	//Distinto path para partidos donde no se han enfrentado entre ellos
	//Algo pasa al consultar la pagina del head to head por ajax devualve un html distinto

	var path_hth = html_distinto_hth ? "/div[13]/div[4]/table/tbody/tr[1]/td[3]" : "//div[@id='contentleft']/div[13]/div[4]/table/tbody/tr[1]/td[3]";
	var hth_visita = xpath(path_hth);
	
	hth_visita = $(hth_visita[0]).text();
	
	if (hth_visita == "") {
		path_hth = html_distinto_hth ? "/div[12]/div[4]/table/tbody/tr[1]/td[3]" : "//div[@id='contentleft']/div[12]/div[4]/table/tbody/tr[1]/td[3]";
		hth_visita = xpath(path_hth);
		hth_visita = $(hth_visita[0]).text();
		path_hth = html_distinto_hth ? "/div[11]/div[4]/table/tbody/tr[1]/td[3]" : "//div[@id='contentleft']/div[11]/div[4]/table/tbody/tr[1]/td[3]";
		hth_local= xpath(path_hth);
	} else {
		path_hth = html_distinto_hth ? "/div[12]/div[4]/table/tbody/tr[1]/td[3]" : "//div[@id='contentleft']/div[12]/div[4]/table/tbody/tr[1]/td[3]";
		hth_local = xpath(path_hth);
	}

	removerTempXPath();
	var hth_html = "<small style='color: #7D7E7C;'>(" + $(hth_local[0]).text() + "-" + hth_visita + ")</small>";
	$('#' + match_id + ' .info').append(hth_html);
	saveMatch('hth', match_id, hth_html);
}

function obtenerTablaPosiciones(partido) {
	var nombre_liga = obtenerNombreEquipo('league span', partido); //En realidad obtiene el nombre de la liga
	return $.parseJSON(localStorage.getItem(nombre_liga));
}

function generarTablaPosiciones(tabla_posiciones_html, partido) {
	var total_pos = tabla_posiciones_html.length;
	var tabla_posiciones = {};
	
	for (var i = 0; i < total_pos; i++) {
   		var equipo = $(tabla_posiciones_html[i]);
   		var nombre_equipo = $('.team:first', equipo).text();
   		var posicion = $('.no:first', equipo).text();
		tabla_posiciones[nombre_equipo] = posicion;
	}

	var nombre_liga = obtenerNombreEquipo('league span', partido); //En realidad obtiene el nombre de la liga
	localStorage.setItem(nombre_liga, $.stringify(tabla_posiciones));
	return tabla_posiciones;
	
}

function getPosition(tabla_posiciones, html, match) {
	if (tabla_posiciones == null) {
		crearTempXPath(html);
		var tabla_posiciones_html = xpath('//div[@id="statT"]/div[2]/form/table/tbody/tr');
		removerTempXPath();
		tabla_posiciones = generarTablaPosiciones(tabla_posiciones_html, match);
	}

	var nombre_equipo_local = obtenerNombreEquipo('home', match);
	var nombre_equipo_visita = obtenerNombreEquipo('guest', match);

	var total_pos = Object.keys(tabla_posiciones).length;
	var pos_media = parseInt(total_pos / 2);

	var distancia_entre_equipos = false;
	var pos_equipo_local = 0
	var pos_equipo_visita = 0;

	$.each(tabla_posiciones, function(nombre_equipo, posicion) {
		if (nombre_equipo == nombre_equipo_local) {
			pos_equipo_local = posicion;
		}
		if (nombre_equipo == nombre_equipo_visita) {
			pos_equipo_visita = posicion;
		}

		if (pos_equipo_local != 0 && pos_equipo_visita != 0) {
			if (total_pos > 5 && Math.abs(pos_equipo_local - pos_equipo_visita) >= pos_media) {
				distancia_entre_equipos = true;
			}
			return false;
		}
	});

	var equipo_local = $('.home', match);
	var equipo_visita = $('.guest', match);

	var nombre_local_pos =  equipo_local.text() + " <small>(" + pos_equipo_local + ")</small>";
	equipo_local.html(nombre_local_pos);

	var nombre_visita_pos = "<small>(" + pos_equipo_visita + ")</small> " + equipo_visita.text();
	equipo_visita.html(nombre_visita_pos);

	var distancia = distancia_entre_equipos ? 'true' : 'false';
	saveMatch('pos', match.id, '{"equipo_local": "' + nombre_local_pos + '", "equipo_visita": "' + nombre_visita_pos + '", "distancia": ' + distancia + '}');

	if (distancia_entre_equipos) {
		equipo_local.css('background-color', '#fff2a8');
		equipo_visita.css('background-color', '#fff2a8');
	}
}

function actualizarHTH(match_id, match_info) {
	removerHTHAnterior(match_id);
	$('#' + match_id + ' .info').append(getMatch('hth', match_id));
}

function actualizarPos(match_id, match_info) {
	var pos_equipos = getMatch('pos', match_id);
	pos_equipos = $.parseJSON(pos_equipos);
	var partido = $('#' + match_id);
	var equipo_local = $('.home', partido).html(pos_equipos.equipo_local);
	var equipo_visita = $('.guest', partido).html(pos_equipos.equipo_visita);
	if (pos_equipos.distancia) {
		equipo_local.css('background-color', '#fff2a8');
		equipo_visita.css('background-color', '#fff2a8');
	}
}

function existeMatch(type, key) {
	return getMatch(type, key) ? true : false;
}

function getMatch(type, key) {
	return localStorage.getItem(type + "-" + key);
}

function saveMatch(type, key, value) {
	return localStorage.setItem(type + "-" + key, value);
}

function xpath() {
	var elements = new Array();
	for (var i = 0; i < arguments.length; i++) {
		try {
			var iterator = document.evaluate("//div[@id='temp-xpath']" + arguments[i], document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for (var i = 0; i < iterator.snapshotLength; i++) {
				elements.push(iterator.snapshotItem(i));
			}
		} catch(e) {
			console.log("Error XPath: " + e);
			continue;
		}
	}
	return elements;
}

var SUC_script_num = 103543; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

$.extend({
    stringify : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);

            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});