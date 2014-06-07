// ==UserScript==
// @version		3.02
// @author		TheBronx
// @date		2011-07-02
// @name		OgameKit
// @namespace	ogamekit
// @description	Kit de utilidades para Ogame
// @include		http://*.ogame.*/game/*
// @include		http://ogame.*/
// @include		http://www.ogame.*/
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

/**
 * Almacenes, produccion y recursos actuales
 */
var aMetal; var pMetal; var metal;
var aCristal; var pCristal; var cristal;
var aDeuterio; var pDeuterio; var deuterio;

/**
 * Coordenadas del planeta actual
 */
var coords;

/**
 * Lista de planetas del usuario (array de strings tipo "4:499:8")
 */
var planetas;

/**
 * Produccion diaria
 */
var metalAlDia; var cristalAlDia; var deuterioAlDia;

/**
 * Tiempos de llenado de almacenes
 */
var tAlmMetal; var tAlmCristal; var tAlmDeuterio;

/**
 * Produccion "ideal" regla 3:2:1
 */
var pMetalIdeal; var pCristalIdeal; var pDeuterioIdeal;

var paginaActual;
var divClear = '<div style="clear:both;height:4px;"></div>';
var hr = '<hr style="margin:8px 0;border-top-color:#111;border-bottom-color:#444;border-width:1px 0;border-style:solid;display:block;">';
var linkAnterior;

/**
 * Opciones
 */
var opOcultarPublicidad = false;
var mostrarInfoEnAnuncio = false;
var link1_name;
var link1_href;
var link2_name;
var link2_href;
var link3_name;
var link3_href;
var idioma = 'en';
var autologin = false;
var server = "";
var username = "";
var password = "";
var showFleetResources = true;
var minEscombros = 10000;
var opMostrarImperio = true;

/**
 * Lenguaje en uso (dependiendo el idioma en opciones se usa uno u otro)
 */
var LANG;

var $2; //for ajax success events.

function main()
{
	getPaginaActual();
	if ( (paginaActual=="unknown") || (paginaActual=="showmessage") || (paginaActual=="techinfo") || (paginaActual=="globalTechtree") || (paginaActual=="techtree")
		|| (paginaActual=="buddies") || (paginaActual=="notices") || (paginaActual=="combatreport") || (paginaActual=="search") || (paginaActual=="writemessage") || (paginaActual=="empire"))
	{
		//el script no funciona en estas paginas, por ahora.
	}
	else if (paginaActual=="home")
	{
		loadOptions();
		login();
	}
	else
	{
		initialize();
		
		if (opMostrarImperio) addEmpireLink();
		
		//agregamos un listener al contenido de la capa de crear edificios, investigar, hacer flota y defensas		
		$2("#detail").ajaxSuccess(function(e, xhr, settings) {
			if ( (settings.url.search("page=resources") != -1) || (settings.url.search("page=station") != -1) || (settings.url.search("page=research") != -1) || (settings.url.search("page=shipyard") != -1) || (settings.url.search("page=defense") != -1) )
				calculateTime();
		});
		
		if (opOcultarPublicidad) hideAds();

		if (paginaActual=="resourceSettings")
		{
			addWarehousesGraphic();
			addProductionRatio();
			shipsAndDefenses();
		}
		else if (paginaActual=="galaxy")
		{
			$2("#galaxyContent").ajaxSuccess(function(e, xhr, settings) {
				if (settings.url.search("galaxyContent") != -1)
				{
					escombros();
				}
			});
			escombrosWait(2000);
		}
		else if (paginaActual=="movement")
		{
			if (showFleetResources)
			{
				$('.fleetDetails').each( function() {
					var tabla = $(this).find('.starStreak .route div table');
					recursos = getRecursosFlota(tabla);
					$(this).find('.starStreak').append('<div style="position:absolute;top:21px;left:20%;color:#0F5;">'+recursos[0] + ", " + recursos[1] + ", " + recursos[2]+'</div>');
				});
			}
		}
	}
}

function getPaginaActual()
{
	url = window.location + "";
	if (window.location.hostname == url.substring(7).replace(/\//g,"") )
	{
		paginaActual = "home";
	}
	else
	{
		//averiguar en que apartado del juego estamos
		partes = url.substring(url.indexOf('?')+1).split("&");
		comienzos = url.substring(0,url.indexOf('?')).split("/");
		if (comienzos[comienzos.length-1] == "index.php")
			paginaActual = partes[0].substring(partes[0].indexOf('=')+1);
		else
			paginaActual = "unknown";
	}
}

function login()
{
	if ( (server!="") && (username!="") && (password!=""))
	{
		$('#login').show("slow");
		$('#loginForm').attr('action', "http://" + server + "/game/reg/login2.php");
		$('#serverLogin option').each(function() {
			if ($(this).val() == server)
			{
				$(this).attr('selected', "");
				return false;
			}
		});
		$('#usernameLogin').val(username);
		$('#passwordLogin').val(password);
		if (autologin) document.getElementById('loginForm').submit();
	}
}

/**
 * Cargamos recursos, produccion, calculamos datos, etc
 */
function initialize()
{
	try {$2 = unsafeWindow.$;}
	catch(e) {$2 = window.$;}
	
	//carga de datos
	loadCoords();
	loadPlanets();
	loadResources();
	loadProduction();
	loadWarehouses();
	//calculos
	calculateWarehouses();
	if(paginaActual=="resourceSettings") regla321();
	//otros
	loadOptions();
	addOptions();
}

function addEmpireLink()
{
	//insertamos el enlace en el menu izquierdo
	var link = window.document.createElement('a');
	link.setAttribute('href', '#');
	link.textContent = LANG.imperio;
	link.className = "menubutton";
	link.addEventListener('click', showEmpire, false);
	$('#menuTable li').last().before('<li id="ogamekit-empire"><span class="menu_icon"><img width="38" height="29" src="img/navigation/navi_ikon_empire_a.gif"></span></li>');
	$('#ogamekit-empire').append(link);

}

function showEmpire()
{
	if ( $('#ogamekit-empire-view').length < 1)
	{
		linkAnterior = $('#menuTable li a.selected'); linkAnterior.removeClass('selected');
		$('#ogamekit-empire a').addClass('selected');
		$('#inhalt').after('<div id="ogamekit-empire-view" style="display:none;float:left;margin:0 20px 5px;padding:10px;position:relative;width:604px;background-color:#0D1014;border:3px double #000;"></div>');
		//rellenamos la capa con informacion del imperio
		var imperio = $('#ogamekit-empire-view');
		var tabla1 = '<table style="width:100%;text-align:right;"><tr><th>'+LANG.planeta+'</th><th style="width:150px">'+LANG.metal+'</th><th style="width:150px">'+LANG.cristal+'</th><th style="width:150px">'+LANG.deuterio+'</th></tr>';
		var tabla2 = '<table style="width:100%;text-align:right;"><tr><th>'+LANG.planeta+'</th><th style="width:150px">+'+LANG.metal+'</th><th style="width:150px">+'+LANG.cristal+'</th><th style="width:150px">+'+LANG.deuterio+'</th></tr>';
		var fila1;
		var fila2;
		var auxm = 0; var auxc = 0; var auxd = 0;
		var totalm = 0; var totalc = 0; var totald = 0;
		for(i=0;i<planetas.length;i++)
		{
			if (i%2 == 0) bg=' style="background-color:#13181D"'; else bg=' style="background-color:#0D1014"';
			
			if (coords[0]+":"+coords[1]+":"+coords[2] == planetas[i]) thisPlanet=true; else thisPlanet=false;
			
			fila1 = (thisPlanet) ? '<tr'+bg+'><td class="label"><i> ⇒ '+planetas[i]+'</i></td>' : '<tr'+bg+'><td class="label">'+planetas[i]+'</td>';
			totalm += GM_getValue(planetas[i]+".metal", 0);
			fila1 = fila1 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".metal", 0))+'</td>';
			totalc += GM_getValue(planetas[i]+".cristal", 0);
			fila1 = fila1 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".cristal", 0))+'</td>';
			totald += GM_getValue(planetas[i]+".deuterio", 0);
			fila1 = fila1 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".deuterio", 0))+'</td>';
			fila1 = fila1 + '</tr>';
			
			fila2 = (thisPlanet) ? '<tr'+bg+'><td class="label"><i> ⇒ '+planetas[i]+'</i></td>' : '<tr'+bg+'><td class="label">'+planetas[i]+'</td>';
			auxm += GM_getValue(planetas[i]+".pmetal", 0);
			fila2 = fila2 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".pmetal", 0))+'</td>';
			auxc += GM_getValue(planetas[i]+".pcristal", 0);
			fila2 = fila2 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".pcristal", 0))+'</td>';
			auxd += GM_getValue(planetas[i]+".pdeuterio", 0);
			fila2 = fila2 + '<td class="normalmark">'+puntos(GM_getValue(planetas[i]+".pdeuterio", 0))+'</td>';
			fila2 = fila2 + '</tr>';
			
			tabla1 = tabla1 + fila1;
			tabla2 = tabla2 + fila2;
		}
		var bt = ' style="border-top:1px dotted #848484"';
		tabla1 = tabla1 + '<tr class="summary"><td class="label"'+bt+'>'+LANG.total+'</td><td class="undermark"'+bt+'>'+puntos(totalm)+'</td><td class="undermark"'+bt+'>'+puntos(totalc)+'</td><td class="undermark"'+bt+'>'+puntos(totald)+'</td></tr>' + '</table>';
		tabla2 = tabla2 + '<tr class="summary"><td class="label"'+bt+'>'+'Hour'+'</td><td class="undermark"'+bt+'>+'+puntos(auxm)+'</td><td class="undermark"'+bt+'>+'+puntos(auxc)+'</td><td class="undermark"'+bt+'>+'+puntos(auxd)+'</td></tr>' + 
		'<tr class="summary"><td class="label"'+bt+'>'+'Day'+'</td><td class="undermark"'+bt+'>+'+puntos(auxm*24)+'</td><td class="undermark"'+bt+'>+'+puntos(auxc*24)+'</td><td class="undermark"'+bt+'>+'+puntos(auxd*24)+'</td></tr>' + 
		'<tr class="summary"><td class="label"'+bt+'>'+'Week'+'</td><td class="undermark"'+bt+'>+'+puntos(auxm*168)+'</td><td class="undermark"'+bt+'>+'+puntos(auxc*168)+'</td><td class="undermark"'+bt+'>+'+puntos(auxd*168)+'</td></tr>'+'</table>';
		imperio.append('<h2>'+LANG.recursos+'</h2>' + tabla1 + '<br/><h2>'+LANG.produccion+'</h2>' + tabla2);
		
		$('#inhalt').hide();
		$('#ogamekit-empire-view').fadeIn(500);
	}
	else
	{
		$('#ogamekit-empire a').removeClass('selected');
		linkAnterior.addClass('selected');
		$('#ogamekit-empire-view').hide(); $('#ogamekit-empire-view').remove();
		$('#inhalt').show(500);
	}
}

function loadCoords()
{
	coords = new Array(0,0,0);
	var coordenadas = $('#myWorlds .smallplanet a.active span.planet-koords').html();
	if (coordenadas == null) coordenadas = $('#myWorlds .smallplanet a.planetlink span.planet-koords').html();
	
	//change for ogame RU
	if (coordenadas == null) coordenadas = $('#myPlanets .smallplanet a.active span.planet-koords').html();
	if (coordenadas == null) coordenadas = $('#myPlanets .smallplanet a.planetlink span.planet-koords').html();
	
	//if nothing of the above was succesful, show error and load -1:-1:-1 as coords.
	if (coordenadas == null) {coordenadas = "[-1:-1:-1]"; $('body').append('<span style="color:red;position:absolute;bottom:30px;right:10px;display:block;">OgameKit: Error, I can\'t load your planet coordinates.</span>');}
	//[x:xxx:xx] quitamos los corchetes
	coordenadas = coordenadas.substring(1,coordenadas.length-1);
	coords = coordenadas.split(":");
}

function loadPlanets()
{
	planetas = new Array();
	$('#myWorlds .smallplanet .planetlink').each(function () {
		var coordenadas = $(this).find('span.planet-koords').html();
		coordenadas = coordenadas.substring(1,coordenadas.length-1);
		planetas.push(coordenadas);
	});
	//for ogame RU, the div is called "myPlanets", instead of "myWorlds" xD
	$('#myPlanets .smallplanet .planetlink').each(function () {
		var coordenadas = $(this).find('span.planet-koords').html();
		coordenadas = coordenadas.substring(1,coordenadas.length-1);
		planetas.push(coordenadas);
	});
}

/**
 * Ocultamos el anuncio. En su lugar mostramos otra informacion si asi esta configurado en opciones
 */
function hideAds()
{
	anuncio = $('#banner_skyscraper');
	if (mostrarInfoEnAnuncio)
	{
		anuncio.html(LANG.metal+":"+pMetal.toFixed(2)+" <br/>" +
			LANG.cristal+":"+pCristal.toFixed(2)+" <br/>" +
			LANG.deuterio+":"+pDeuterio.toFixed(2)+" <br/>" +
			"<br/>" +
			LANG.almMetalLleno+"<br/>" + secondsToTime(tAlmMetal) + "<br/>" +
			LANG.almCristalLleno+"<br/>" + secondsToTime(tAlmCristal) + "<br/>" +
			LANG.almDeuterioLleno+"<br/>" + secondsToTime(tAlmDeuterio)+ "<br/><br/>");
		anuncio.css({'color' : '#fff', 'font-size' : '9px' , 'width' : '120px'});
	}
	else
	{
		anuncio.css({'color' : '#fff', 'font-size' : '9px' , 'width' : '120px'});
		anuncio.html("");
	}
	//insertamos los links si es que hay alguno
	if ( (link1_name != "" ) && (link1_href != "" ) )
		anuncio.append('<a href="'+link1_href+'" target="_blank">'+link1_name+'</a><br/>');
	if ( (link2_name != "" ) && (link2_href != "" ) )
		anuncio.append('<a href="'+link2_href+'" target="_blank">'+link2_name+'</a><br/>');
	if ( (link3_name != "" ) && (link3_href != "" ) )
		anuncio.append('<a href="'+link3_href+'" target="_blank">'+link3_name+'</a><br/>');
}

/**
 * Calcula la produccion por minuto y la carga en las variables globales
 */
function loadProduction()
{
	var re = /\+\d+/;
	
	pMetal = $('#metal_box').attr('title').replace(/\./g,"");
	pMetal = re.exec(pMetal);
	pMetal = pMetal/60; //produccion por minuto
	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".pmetal", Math.round(pMetal*60)); //guardamos la produccion por hora de este planeta
	
	pCristal = $('#crystal_box').attr('title').replace(/\./g,"");
	pCristal = re.exec(pCristal);
	pCristal = pCristal/60; //produccion por minuto
	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".pcristal", Math.round(pCristal*60)); //guardamos la produccion por hora de este planeta
	
	pDeuterio = $('#deuterium_box').attr('title').replace(/\./g,"");
	pDeuterio = re.exec(pDeuterio);
	pDeuterio = pDeuterio/60; //produccion por minuto
	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".pdeuterio", Math.round(pDeuterio*60)); //guardamos la produccion por hora de este planeta
}

/**
 * Carga los recursos existentes en las variables globales
 */
function loadResources()
{
	metal = $('#resources_metal').html().replace(/\./g,"");
	cristal = $('#resources_crystal').html().replace(/\./g,"");
	deuterio = $('#resources_deuterium').html().replace(/\./g,"");

	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".metal", Math.round(metal)); //guardamos
	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".cristal", Math.round(cristal)); //guardamos
	GM_setValue(coords[0]+":"+coords[1]+":"+coords[2]+".deuterio", Math.round(deuterio)); //guardamos
}

/**
 * Carga los valores de capacidad de almacenes
 */
function loadWarehouses()
{
	aMetal = $('#metal_box').attr('title').replace(/\./g,"").split("<br>");
	aMetal = aMetal[1].substring(aMetal[1].indexOf('>')+1).replace("</span>",'');
	aMetal = parseInt(aMetal);
	
	aCristal = $('#crystal_box').attr('title').replace(/\./g,"").split("<br>");
	aCristal = aCristal[1].substring(aCristal[1].indexOf('>')+1).replace("</span>",'');
	aCristal = parseInt(aCristal);
	
	aDeuterio = $('#deuterium_box').attr('title').replace(/\./g,"").split("<br>");
	aDeuterio = aDeuterio[1].substring(aDeuterio[1].indexOf('>')+1).replace("</span>",'');
	aDeuterio = parseInt(aDeuterio);
}

/**
 * Calcula el tiempo de llenado de los almacenes
 */
function calculateWarehouses()
{
	tAlmMetal = ((aMetal - metal)/pMetal)*60;
	tAlmCristal = ((aCristal - cristal)/pCristal)*60;
	tAlmDeuterio = ((aDeuterio - deuterio)/pDeuterio)*60;
}

/**
 * Agrega los graficos de ocupacion de almacenes en el apartado de recursos
 */
function addWarehousesGraphic()
{
	colorM = colorC = colorD = "#9C0";
	porcentajeMetal = (metal*100)/aMetal; 
	if (porcentajeMetal>=100) {
		porcentajeMetal=100;
		colorM="#C00";
	}
	else if (porcentajeMetal>80)
	{
		colorM="#ea8700";
	}
	porcentajeCristal = (cristal*100)/aCristal;
	if (porcentajeCristal>=100) {
		porcentajeCristal=100;
		colorC="#C00";
	}
	else if (porcentajeCristal>80)
	{
		colorC="#ea8700";
	}
	porcentajeDeuterio = (deuterio*100)/aDeuterio;
	if (porcentajeDeuterio>=100) {
		porcentajeDeuterio=100;
		colorD="#C00";
	}
	else if (porcentajeDeuterio>80)
	{
		colorD="#ea8700";
	}

	divAlmacenes = '<div style="margin:10px auto;width:90%;font-size:10px;max-width:610px;">'+
	LANG.metal + ' ('+secondsToTime(tAlmMetal)+'): <div style="float:right;width:400px;height:20px;border:1px solid '+colorM+';"><div style="background-color:'+colorM+';height:100%;width:'+porcentajeMetal+'%"></div></div>' +divClear+
	LANG.cristal + ' ('+secondsToTime(tAlmCristal)+'): <div style="float:right;width:400px;height:20px;border:1px solid '+colorC+';"><div style="background-color:'+colorC+';height:100%;width:'+porcentajeCristal+'%"></div></div>' +divClear+
	LANG.deuterio + ' ('+secondsToTime(tAlmDeuterio)+'): <div style="float:right;width:400px;height:20px;border:1px solid '+colorD+';"><div style="background-color:'+colorD+';height:100%;width:'+porcentajeDeuterio+'%"></div></div>' +divClear+
	'</div>' + divClear;
	$('#inhalt .mainRS').append(divAlmacenes);
}

/**
 * Agrega info de produccion ideal al apartado de recursos
 */
function addProductionRatio()
{
	var colorM = "green"; var colorC = "green"; var colorD = "green";
	if (pMetal<pMetalIdeal) colorM = "#D29D00";
	if (pCristal<pCristalIdeal) colorC = "#D29D00";
	if (pDeuterio<pDeuterioIdeal) colorD = "#D29D00";
	
	divProdIdeal = '<tr>' +
	'<td class="label" colspan="2" style="font-size:92%;">'+LANG.prod321+':</td>' +
	'<td class="undermark" style="color:'+colorM+';">'+puntos(Math.ceil(pMetalIdeal*60))+'</td>' +
	'<td class="undermark" style="color:'+colorC+';">'+puntos(Math.ceil(pCristalIdeal*60))+'</td>' +
	'<td class="undermark" style="color:'+colorD+';">'+puntos(Math.ceil(pDeuterioIdeal*60))+'</td>' +
	'<td class="undermark">-</td>' +
	'<td></td></tr>';
	$('tr.summary').after(divProdIdeal);
}

/**
 * Calcula numero de naves por dia en funcion de la produccion
 */
function shipsAndDefenses()
{
	metalAlDia = pMetal*60*24;
	cristalAlDia = pCristal*60*24;
	deuterioAlDia = pDeuterio*60*24;
	//con estos recursos, que naves podemos hacer?
	var naves = new Array();
	//sondas
	var sonda = new Object;
	sonda.nombre = LANG.sonda;
	sonda.metal = 0; sonda.cristal = 1000; sonda.deuterio = 0;
	perDay(sonda);
	naves.push(sonda);
	//satelites
	var satelite = new Object;
	satelite.nombre = LANG.satelite;
	satelite.metal = 0; satelite.cristal = 2000; satelite.deuterio = 500;
	perDay(satelite);
	naves.push(satelite);
	//npc
	var npc = new Object;
	npc.nombre = LANG.npc;
	npc.metal = 2000; npc.cristal = 2000; npc.deuterio = 0;
	perDay(npc);
	naves.push(npc);
	//ngc
	var ngc = new Object;
	ngc.nombre = LANG.ngc;
	ngc.metal = 6000; ngc.cristal = 6000; ngc.deuterio = 0;
	perDay(ngc);
	naves.push(ngc);
	//recicladores
	var reciclador = new Object;
	reciclador.nombre = LANG.reciclador;
	reciclador.metal = 10000; reciclador.cristal = 6000; reciclador.deuterio = 2000;
	perDay(reciclador);
	naves.push(reciclador);
	//cazas ligeros
	var cl = new Object;
	cl.nombre = LANG.cl;
	cl.metal = 3000; cl.cristal = 1000; cl.deuterio = 0;
	perDay(cl);
	naves.push(cl);
	//cazas pesados
	var cp = new Object;
	cp.nombre = LANG.cp;
	cp.metal = 6000; cp.cristal = 4000; cp.deuterio = 0;
	perDay(cp);
	naves.push(cp);
	//cruceros
	var crucero = new Object;
	crucero.nombre = LANG.crucero;
	crucero.metal = 20000; crucero.cristal = 7000; crucero.deuterio = 2000;
	perDay(crucero);
	naves.push(crucero);
	//naves de batalla
	var nb = new Object;
	nb.nombre = LANG.nb;
	nb.metal = 45000; nb.cristal = 15000; nb.deuterio = 0;
	perDay(nb);
	naves.push(nb);
	//acorazados
	var acorazado = new Object;
	acorazado.nombre = LANG.acorazado;
	acorazado.metal = 30000; acorazado.cristal = 40000; acorazado.deuterio = 15000;
	perDay(acorazado);
	naves.push(acorazado);
	//bombarderos
	var bombardero = new Object;
	bombardero.nombre = LANG.bombardero;
	bombardero.metal = 50000; bombardero.cristal = 25000; bombardero.deuterio = 15000;
	perDay(bombardero);
	naves.push(bombardero);
	//destructores
	var destructor = new Object;
	destructor.nombre = LANG.destructor;
	destructor.metal = 60000; destructor.cristal = 50000; destructor.deuterio = 15000;
	perDay(destructor);
	naves.push(destructor);
	//estrellas de la muerte
	var edlm = new Object;
	edlm.nombre = LANG.edlm;
	edlm.metal = 5000000; edlm.cristal = 4000000; edlm.deuterio = 1000000;
	perDay(edlm);
	naves.push(edlm);
	
	//defensas
	var defensas = new Array();
	//lanzamisiles
	var lanza = new Object;
	lanza.nombre = LANG.lanza;
	lanza.metal = 2000; lanza.cristal = 0; lanza.deuterio = 0;
	perDay(lanza);
	defensas.push(lanza);
	//lasers pequeños
	var laserp = new Object;
	laserp.nombre = LANG.laserp;
	laserp.metal = 1500; laserp.cristal = 500; laserp.deuterio = 0;
	perDay(laserp);
	defensas.push(laserp);
	//lasers grandes
	var laserg = new Object;
	laserg.nombre = LANG.laserg;
	laserg.metal = 6000; laserg.cristal = 2000; laserg.deuterio = 0;
	perDay(laserg);
	defensas.push(laserg);
	//gauss
	var gauss = new Object;
	gauss.nombre = LANG.gauss;
	gauss.metal = 20000; gauss.cristal = 15000; gauss.deuterio = 2000;
	perDay(gauss);
	defensas.push(gauss);
	//ionicos
	var ionico = new Object;
	ionico.nombre = LANG.ionico;
	ionico.metal = 2000; ionico.cristal = 6000; ionico.deuterio = 0;
	perDay(ionico);
	defensas.push(ionico);
	//plasmas
	var plasma = new Object;
	plasma.nombre = LANG.plasma;
	plasma.metal = 50000; plasma.cristal = 50000; plasma.deuterio = 30000;
	perDay(plasma);
	defensas.push(plasma);
	//misiles interplanetarios
	var mInterplanet = new Object;
	mInterplanet.nombre = LANG.mInterplanet;
	mInterplanet.metal = 12500; mInterplanet.cristal = 2500; mInterplanet.deuterio = 10000;
	perDay(mInterplanet);
	defensas.push(mInterplanet);
	//misiles intercepcion
	var mIntercep = new Object;
	mIntercep.nombre = LANG.mIntercep;
	mIntercep.metal = 8000; mIntercep.cristal = 0; mIntercep.deuterio = 2000;
	perDay(mIntercep);
	defensas.push(mIntercep);
	
	//mostramos resultados
	showDailyUnits(naves,defensas);
}

/**
 * Calcula cuantas unidades de "objeto" se pueden hacer con los recursos diarios
 */
function perDay(objeto)
{
	var x = -1;
	var dia = new Array();
	dia[0] = (objeto.metal==0) ? -1 : Math.floor(metalAlDia/objeto.metal);
	dia[1] = (objeto.cristal==0) ? -1 : Math.floor(cristalAlDia/objeto.cristal);
	dia[2] = (objeto.deuterio==0) ? -1 : Math.floor(deuterioAlDia/objeto.deuterio);
	for (i=0;i<3;i++)
	{
		if(dia[i]>-1)
		{
			if ( (dia[i]<x) || (x==-1) )
				x=dia[i];
		}		
	}
	//podemos hacer x al dia, eso cuanto cuesta en total?
	objeto.totalMetalDia = objeto.metal*x;
	objeto.totalCristalDia = objeto.cristal*x;
	objeto.totalDeuterioDia = objeto.deuterio*x;
	objeto.alDia = x;
}

/**
 * Espera 1 segundo antes de calcular nada
 */
function showDailyUnits (naves,defensas)
{
	//creamos el contenedor
	var contenedor = '<div id="contenedor" style="width:90%;margin:0 auto;"></div>';
	$('.mainRS').append(contenedor);
	//creamos los enlaces para mostrar naves/defensas
	//link de flota
	var linkFlota = window.document.createElement('a');
	linkFlota.setAttribute('href', '#unidadesDiarias');
	linkFlota.textContent = LANG.flota;
	linkFlota.style.color = "#88dd55";
	linkFlota.style.margin = "5px 10px";
	linkFlota.addEventListener('click', function() {showDailyUnitsTable(naves);}, false);
	//link de defensa
	var linkDefensa = window.document.createElement('a');
	linkDefensa.setAttribute('href', '#unidadesDiarias');
	linkDefensa.textContent = LANG.defensa;
	linkDefensa.style.color = "#88dd55";
	linkDefensa.style.margin = "5px 10px";
	linkDefensa.addEventListener('click', function() {showDailyUnitsTable(defensas);}, false);
	
	$('#contenedor').append(linkFlota);
	$('#contenedor').append(linkDefensa);
	//creamos la capa donde mostraremos los datos
	$('#contenedor').append('<div id="unidadesDiarias" style="display:none;"></div>');
	
}
function showDailyUnitsTable(listaObjetos)
{
	var tabla = '<table style="font-size:10px;">';
	tabla += '<tr><td class="label"></td><td>'+LANG.porDia+'</td><td>'+LANG.metSobrante+'</td><td>'+LANG.criSobrante+'</td><td>'+LANG.deuSobrante+'</td></tr>';
	for(i=0;i<listaObjetos.length;i++)
	{
		obj = listaObjetos[i];
		tabla += (i%2 != 0) ? '<tr>' : '<tr class="alt">';
		tabla += '<td class="label">'+obj.nombre+'</td><td>'+obj.alDia+'</td><td>'+puntos(metalAlDia-obj.totalMetalDia)+'</td><td>'+puntos(cristalAlDia-obj.totalCristalDia)+'</td><td>'+puntos(deuterioAlDia-obj.totalDeuterioDia)+'</td>' +
		'</tr>';
	}
	tabla += '</table>';
	
	$('#unidadesDiarias').html(tabla);
	$('#unidadesDiarias').css('display','block');
}

function escombrosWait (wait)
{
	setTimeout(escombros,wait);
}

/**
 * Funcion que reemplaza los links capados de RECICLAR escombros por los enlaces buenos.
 * Resalta los escombros grandes
 */
function escombros()
{
	var imgEscombros = "data:image/png;base64,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";

	var coordenadasActuales = new Array();
	coordenadasActuales[1] = $('#galaxy_input').val();
	coordenadasActuales[2] = $('#system_input').val();
	var url = window.location + "";
	var session = getSession(url.replace("#",""));
	url = url.substring(0,url.search("page"));
	url = url + "page=fleet1&" + session;
	
	$('#galaxytable td.debris').each( function() {
		link = $(this).find('a.tipsGalaxy');
		if (link.length > 0)
		{
			//reemplazo de links capados
			var planeta = link.attr("rel").replace("#debris","");
			var enlace = url + "&galaxy="+coordenadasActuales[1]+"&system="+coordenadasActuales[2]+"&position="+planeta+"&type=2&mission=8";
			$(this).find("#debris"+planeta+" ul.ListLinks li a").replaceWith('<a href="'+enlace+'">'+LANG.reciclar+'</a>');
			
			//resaltado de escombros
			var contenido = 0;
			$(this).find("#debris"+planeta+" ul.ListLinks li.debris-content").each(function () {
				var partes = $(this).html().split(" ");
				contenido += parseInt(partes[1].replace(/\./g,""));
			});
			if ( (contenido>minEscombros) && (minEscombros>0) )
				$(this).find("img").attr("src",imgEscombros);

		}
	});
}

/**
 * Recibe una tabla que contiene la info de la flota en cuestion. Devuelve los valores de los 3 recursos que transporta
 */
function getRecursosFlota(tabla)
{
	var recursos = new Array(0,0,0);
	var i = 0;
	var trs = tabla.find('tr').length;
	tabla.find('tr').each( function( intIndex ) {
		if (intIndex>=(trs-3))
		{
			recursos[i] = jQuery.trim( $(this).find('td:last').html() );
			i++;
		}
	});
	return recursos;
}

/**
 * devuelve "sesion=xxxxxxx"
 */
function getSession(url)
{
	var fragmento = url.substring( url.search("session=") );
	partes = fragmento.split("&");
	return partes[0];
}

/**
 * Nueva funcion para agregar puntos en los miles y usar formato Ogame (ej: 400k, 3M)
 */
function puntos(numero)
{
	var cadena = "";
	numero = parseInt(numero,10);
	if (numero==0) return "0";
	//cambiamos 1.000.000 por 1M
	if (numero%1000000 == 0) cadena = (numero/1000000)+"M";
	else
	{
		//cambiamos 900.000 por 900k
		if ((numero%1000 == 0) && (numero<1000000) ) cadena = (numero/1000)+"k";
		else
		{
			//si no es cifra redonda, agregamos los puntos
			if (numero<1000) cadena = numero + "";
			else
			{
				unidades=numero%1000 + "";
				while (unidades.length < 3) {
					unidades = '0' + unidades;
				}
				if (numero<1000000)
				{
					cadena = Math.floor(numero/1000) + "." + unidades;
				}
				else
				{
					millones=Math.floor(numero/1000000);
					miles=Math.floor((numero-millones*1000000)/1000) + "";
					while (miles.length < 3) {
						miles = '0' + miles;
					}
					cadena = millones + "." + miles + "." + unidades;
				}
			}
		}
	}
	
	return cadena;
}

/**
 * Calcula el tiempo necesario para construir edificios/flota/defensas/investigaciones
 */
function calculateTime()
{
	existe = $("#costs");
	if (existe.length>0)
	{
		var necesarios=new Array();
		necesarios[0]=0;//metal
		necesarios[1]=0;//cristal
		necesarios[2]=0;//deuterio
		necesarios[3]=0;//energia
		
		$('#costs #resources li.metal').each(function() {
			palabra = this.title.split(" ");
			palabra[palabra.length-1] = traduce(palabra[palabra.length-1]);
			switch (palabra[palabra.length-1])
			{
			case "Metal": necesarios[0]=palabra[0].substring(1, palabra[0].length).replace(/\./g,""); break;
			case "Cristal": necesarios[1]=palabra[0].substring(1, palabra[0].length).replace(/\./g,""); break;
			case "Deuterio": necesarios[2]=palabra[0].substring(1, palabra[0].length).replace(/\./g,""); break;
			case "Energía": necesarios[3]=palabra[0].substring(1, palabra[0].length).replace(/\./g,""); break;
			}
		});
		//ya sabemos los recursos q hacen falta, veamos cuantos tenemos
		loadResources();
		var faltan=new Array();
		faltan[0] = (necesarios[0]>0) ? necesarios[0]-metal : 0;
		faltan[1] = (necesarios[1]>0) ?  necesarios[1]-cristal : 0;
		faltan[2] = (necesarios[2]>0) ?  necesarios[2]-deuterio : 0;
		
		var tiempoRestante=new Array();
		tiempoRestante[0] = (faltan[0]>0) ? faltan[0]/pMetal : 0;
		tiempoRestante[1] = (faltan[1]>0) ? faltan[1]/pCristal : 0;
		tiempoRestante[2] = (faltan[2]>0) ? faltan[2]/pDeuterio : 0;
		tiempoRestante[3] = 1;//la energia no sabemos cuando estara disponible
		
		var i=0;
		while ((i<4) && (tiempoRestante[i]<=0)) i++;
		$('span.missing_resource').each(function() {
			if(tiempoRestante[i]!=1.7976931348623157E+10308) //Infinity
			{
				mostrar = secondsToTime(tiempoRestante[i]*60);
			}
			else
			{
				mostrar = LANG.infinito;
			}
			if(i!=3) //el 3 es la energia
				this.innerHTML = puntos(necesarios[i]) + '<br/><span style="font-size:9px;color:green;">' + mostrar + '</span>';
			i++;
			while ((i<4) && (tiempoRestante[i]<=0)) i++;
		});
		
		//calculamos maximo naves/defensas que podemos hacer con los recursos que tenemos
		if ((paginaActual=='defense') || (paginaActual=='shipyard'))
		{
			if ((faltan[0]>0) || (faltan[1]>0) || (faltan[2]>0))
			{
				//no es posible crear ni siquiera 0. falta algun recurso
			}
			else
			{
				var posibles=new Array();
				posibles[0] = Math.floor(metal/necesarios[0]);
				posibles[1] = Math.floor(cristal/necesarios[1]);
				posibles[2] = Math.floor(deuterio/necesarios[2]);
				numPosibles = minimo(posibles);
				if (numPosibles!=-1)
				{
					//calculamos cuanto tiempo llevaria hacer ese maximo de naves
					var tiempoPorUnidad = timeToSeconds( $('#action ul li .time').html() );
					$('#action ul li .time').after('<p id="ogamekit-time">'+ LANG.tiempoTotal +": "+ secondsToTime(tiempoPorUnidad*numPosibles) + '</p>' );
					
					//insertar listener en el input, para leer su valor y calcular tiempo
					$('li.enter input').keyup(function() {
						entradaUsuario = $('li.enter input').val();
						if (parseInt(entradaUsuario)>0)
						{
							$('#ogamekit-time').html(LANG.tiempoTotal + ': ' + secondsToTime(tiempoPorUnidad*entradaUsuario));
							
							//ademas, calculamos cuantos recursos supone hacer esas "x" naves, y lo mostramos
							recursosParaX = new Array();
							color = new Array();
							if (necesarios[0]>0) //necesitamos metal
							{
								met = necesarios[0]*entradaUsuario;
								recursosParaX.push(met);
								if (met>metal) color.push("red");
								else color.push("green");
							}
							if (necesarios[1]>0) //cristal
							{
								cri = necesarios[1]*entradaUsuario;
								recursosParaX.push(cri);
								if (cri>cristal) color.push("red");
								else color.push("green");
							}
							if (necesarios[2]>0) //y deuterio
							{
								deu = necesarios[2]*entradaUsuario;
								recursosParaX.push(deu);
								if (deu>deuterio) color.push("red");
								else color.push("green");
							}

							$('#costs #resources li.metal span').each( function (i) {
								//mostramos datos
								if ( $('#menos'+i).length != 0 ) 
									$('#menos'+i).replaceWith( '<p style="font-size:10px;color:'+color[i]+';" id="menos'+i+'">-'+puntos(recursosParaX[i]) + '</p>' );
								else
									$(this).after( '<p style="font-size:10px;color:'+color[i]+';" id="menos'+i+'">-'+puntos(recursosParaX[i]) + '</p>' );
							});
						}
					});
					
					//mostramos el tiempo bajo la linea donde dice el tiempo por nave
					var maxLink = window.document.createElement('a');
					maxLink.setAttribute('href', '#');
					maxLink.textContent = 'max:' + numPosibles;
					maxLink.style.color = "#88dd55";
					maxLink.addEventListener('click', function() {insertMax(numPosibles, tiempoPorUnidad, necesarios);}, false);
					$('.enter p').html(maxLink);
				}
			}
		}
	}
}

/**
 * Inserta el valor "num" en el campo de texto de creacion de unidades (defensa y flota)
 */
function insertMax(num, time, necesarios)
{
	$('li.enter input').val(num);
	$('#ogamekit-time').html(LANG.tiempoTotal + ': ' + secondsToTime(time*num));
	
	//costes de ese numero de naves:
	recursosParaX = new Array();
	color = new Array();
	if (necesarios[0]>0) //necesitamos metal
	{
		met = necesarios[0]*num;
		recursosParaX.push(met);
		if (met>metal) color.push("red");
		else color.push("green");
	}
	if (necesarios[1]>0) //cristal
	{
		cri = necesarios[1]*num;
		recursosParaX.push(cri);
		if (cri>cristal) color.push("red");
		else color.push("green");
	}
	if (necesarios[2]>0) //y deuterio
	{
		deu = necesarios[2]*num;
		recursosParaX.push(deu);
		if (deu>deuterio) color.push("red");
		else color.push("green");
	}
	
	$('#costs #resources li.metal span').each( function (i) {
		//mostramos datos
		if ( $('#menos'+i).length != 0 ) 
			$('#menos'+i).replaceWith( '<p style="font-size:10px;color:'+color[i]+';" id="menos'+i+'">-'+puntos(recursosParaX[i]) + '</p>' );
		else
			$(this).after( '<p style="font-size:10px;color:'+color[i]+';" id="menos'+i+'">-'+puntos(recursosParaX[i]) + '</p>' );
	});
}

/**
 * Calcula la produccion "ideal" del planeta segun la regla 3:2:1
 */
function regla321()
{
	//tomamos como referencia el metal
	pMetalIdeal = pMetal;
	pCristalIdeal = (pMetalIdeal/3)*2;
	pDeuterioIdeal = pMetalIdeal/3;
}

/**
 * Opciones del script
 */
function loadOptions()
{
	opOcultarPublicidad = GM_getValue("eliminarPublicidad", false);
	mostrarInfoEnAnuncio = GM_getValue("mostrarInfoEnAnuncio", false);
	link1_name = GM_getValue("link1_name", "OgameKit"); link1_href = GM_getValue("link1_href", "http://userscripts.org/scripts/show/108998");
	link2_name = GM_getValue("link2_name", ""); link2_href = GM_getValue("link2_href", "");
	link3_name = GM_getValue("link3_name", ""); link3_href = GM_getValue("link3_href", "");
	idioma = GM_getValue("idioma", 'en');
	switch (idioma)
	{
	case 'es': LANG = LANG_ES; break;
	case 'en': LANG = LANG_EN; break;
	case 'fr': LANG = LANG_FR; break;
	case 'pl': LANG = LANG_PL; break;
	case 'pt': LANG = LANG_PT; break;
	case 'ru': LANG = LANG_RU; break;
	case 'tr': LANG = LANG_TR; break;
	case 'it': LANG = LANG_IT; break;
	deafult: LANG = LANG_EN;
	}
	autologin = GM_getValue("autologin", false);
	server = GM_getValue("server", "");
	username = GM_getValue("username", "");
	password = GM_getValue("password", "");
	showFleetResources = GM_getValue("showFleetResources", true);
	minEscombros = GM_getValue("minEscombros", 10000);
	opMostrarImperio = GM_getValue("mostrarImperio", true);
}

function addOptions()
{
	//insertamos el enlace en el menu izquierdo
	var link = window.document.createElement('a');
	link.setAttribute('href', '#');
	link.textContent = 'OgameKit';
	link.style.color = "orange";
	link.className = "menubutton";
	link.addEventListener('click', showOptions, false);
	$('#menuTable').append('<li id="ogamekit-options"><span class="menu_icon"></span></li>');
	$('#ogamekit-options').append(link);
}

function showOptions()
{
	//si quedo abierta una capa anterior, la borramos.
	var posibleCapaAnterior = $('#ogamekit-overlay');
	if (posibleCapaAnterior.length) posibleCapaAnterior.remove();
	//insertamos la capa de opciones
	var o = '<div id="ogamekit-overlay" style="display:none;position:absolute;z-index:90;background-color:rgba(0,0,0,0.7);"></div>';
	$('body').prepend(o);
	var overlay = $('#ogamekit-overlay');
	overlay.css('width', $(window).width() );
	overlay.css('height', $(window).height() );
	//link de cierre
	var aCerrar = window.document.createElement('a');
	aCerrar.setAttribute('href', '#');
	aCerrar.addEventListener('click', hideOptions, false);
	imgCierre = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA3NCSVQICAjb4U/gAAAAnFBMVEX////4YWP/dXjyS07/dXj9bXD6a234YWP4XWD2WVv2VFfsOTzoLzHmKSvkISP2VFf0TE/vREftPT/iHB72WVvvREf0TE//hon/gYX/fYD/e33/dXj/cXP9bXD/a236a23/Zmb4YWP4XWD/Wl32WVv/VVj2VFf3VFb0TE/yS072SUvvREfuQELtPT/sOTzrMzXoLzHnLC/mKSvkISPh2jkWAAAANHRSTlMAESIiMzMzMzMzMzMzMzNERERERHd3qv//////////////////////////////////////xnOhPwAAAAlwSFlzAAALEgAACxIB0t1+/AAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAJJJREFUGJVtzNcagjAMBtC498TVZWktFaEVx/u/mx2gXJibPyf5EoBWders9mOOd6toQgbBgh96wQjRobPkWO79huIj5qPgMt5ycqJCctIYQDCEMVFfAyh8yWjLE0UyN5j9LChl56udR0+dlbnnaV4tajNtAKoyLZ5LN1hroa3fvEzxSHyzudl4+44G2DbfE/hTH+8DDcV0Y3OAAAAAAElFTkSuQmCC";
	aCerrar.setAttribute('style', 'position:absolute;top:0;right:0;width:16px;height:16px;background:url('+imgCierre+') no-repeat scroll 0 0 transparent');
	
	if (opOcultarPublicidad) ch = "checked"; else ch = "";
	if (mostrarInfoEnAnuncio) ch2 = "checked"; else ch2 = "";
	var selected = new Array();
	selected[0] = (idioma=='es') ? "selected" : "";
	selected[1] = (idioma=='en') ? "selected" : "";
	selected[2] = (idioma=='fr') ? "selected" : "";
	selected[3] = (idioma=='pl') ? "selected" : "";
	selected[4] = (idioma=='pt') ? "selected" : "";
	selected[5] = (idioma=='ru') ? "selected" : "";
	selected[6] = (idioma=='tr') ? "selected" : "";
	selected[7] = (idioma=='it') ? "selected" : "";
	var contenido = LANG.lenguaje+': <select id="idioma" style="float:right;width:150px;">'+
		'<option value="es" '+selected[0]+'>Español</option>'+
		'<option value="en" '+selected[1]+'>English</option>'+
		'<option value="fr" '+selected[2]+'>Français</option>'+
		'<option value="pl" '+selected[3]+'>Polski</option>'+
		'<option value="pt" '+selected[4]+'>Portuguese</option>'+
		'<option value="ru" '+selected[5]+'>Русский</option>'+
		'<option value="tr" '+selected[6]+'>Türkçe</option>'+
		'<option value="it" '+selected[7]+'>Italiano</option>'+
		'</select>' + hr +
	'<input type="checkbox" name="publicidad" id="publicidad" '+ch+'> '+LANG.ocultarPublicidad+'<br/>' +
	'<span style="margin:2px;margin-left:10px;"><input type="checkbox" name="infoInstead" id="infoInstead" '+ch2+'> '+LANG.mostrarInfoEnAnuncio+'</span><br/>';
	
	contenido = contenido + "<br/>Links:" + divClear + '<input id="link1_name" type="text" style="float:left;margin-left:2px;" value="'+link1_name+'"></input><input id="link1_href" type="text" style="float:right;width:180px;" value="'+link1_href+'"></input>' + divClear +
	divClear + '<input id="link2_name" type="text" style="float:left;margin-left:2px;" value="'+link2_name+'"></input><input id="link2_href" type="text" style="float:right;width:180px;" value="'+link2_href+'"></input>' + divClear +
	divClear + '<input id="link3_name" type="text" style="float:left;margin-left:2px;" value="'+link3_name+'"></input><input id="link3_href" type="text" style="float:right;width:180px;" value="'+link3_href+'"></input>' + divClear + hr;
	
	if (autologin) al = "checked"; else al = "";
	contenido += '<div id="ogamekit-login">' +
		'<label style="float:left;">Server <span style="font-size:9px;">(eg: uni110.ogame.fr)</span>:</label></td><td><input id="server" type="text" style="float:right;width:150px;" value="'+server+'"></input>' + divClear +
		'<label style="float:left;">Username:</label></td><td><input id="username" type="text" style="float:right;width:150px;" value="'+username+'"></input>' + divClear +
		'<label style="float:left;">Password:</label></td><td><input id="password" type="password" style="float:right;width:150px;" value="'+password+'"></input>' + divClear +
		'<input type="checkbox" name="autologin" id="autologin" '+al+'> Autologin</div>' + hr;
	
	if (showFleetResources) ch3 = "checked"; else ch3 = "";
	contenido += '<input type="checkbox" name="showFleetResources" id="showFleetResources" '+ch3+'> '+ LANG.showFleetResources + hr;
	
	contenido += LANG.minEscombros+': <input type="text" name="minEscombros" id="minEscombros" value="'+minEscombros+'" style="float:right;width:150px;">' + hr;
	
	if (opMostrarImperio) chI = "checked"; else chI = "";
	contenido += '<input type="checkbox" name="imperio" id="imperio" '+chI+'> ' + LANG.imperio + hr;
	
	var guardar = document.createElement("a");
	//guardar.text = LANG.guardar; //daba problemas en chrome
	guardar.appendChild(document.createTextNode(LANG.guardar));
	guardar.setAttribute('href', '#');
	guardar.addEventListener('click', saveOptions, false);
	guardar.setAttribute('style', 'margin-top:10px;margin-left:340px;display:block;');

	var opciones = document.createElement("div");
	opciones.id = "ogamekit-opciones";
	overlay.append(opciones);
	var divOpciones = $('#ogamekit-opciones');
	divOpciones.css({'position':'relative', 'margin':'150px auto auto' , 'width':'400px' , 'background-color':'#2f2f2f' , 'border':'1px solid #666' , 'color':'orange' , 'padding':'20px' , 'text-align':'left'});
	divOpciones.html(contenido);
	divOpciones.append(guardar);
	
	$('#ogamekit-opciones').append(aCerrar);
	overlay.show('slow');
}
function hideOptions()
{
	$('#ogamekit-overlay').remove();
}
function saveOptions()
{
	opOcultarPublicidad = $('#publicidad').is(':checked');
	GM_setValue("eliminarPublicidad", opOcultarPublicidad);
	mostrarInfoEnAnuncio = $('#infoInstead').is(':checked');
	GM_setValue("mostrarInfoEnAnuncio", mostrarInfoEnAnuncio);
	
	link1_name = $('#link1_name').val();
	link1_href = $('#link1_href').val();
	GM_setValue("link1_name", link1_name);
	GM_setValue("link1_href", link1_href);
	link2_name = $('#link2_name').val();
	link2_href = $('#link2_href').val();
	GM_setValue("link2_name", link2_name);
	GM_setValue("link2_href", link2_href);
	link3_name = $('#link3_name').val();
	link3_href = $('#link3_href').val();
	GM_setValue("link3_name", link3_name);
	GM_setValue("link3_href", link3_href);
	
	idioma = $("#idioma option:selected").attr('value');
	GM_setValue("idioma", idioma);
	autologin = $('#autologin').is(':checked');
	GM_setValue("autologin", autologin);
	server = $('#ogamekit-login #server').val();
	username = $('#ogamekit-login #username').val();
	password = $('#ogamekit-login #password').val();
	GM_setValue("server", server);
	GM_setValue("username", username);
	GM_setValue("password", password);
	showFleetResources = $('#showFleetResources').is(':checked');
	GM_setValue("showFleetResources", showFleetResources);
	minEscombros = parseInt($('#minEscombros').val().replace(".",""));
	GM_setValue("minEscombros", minEscombros);
	opMostrarImperio = $('#imperio').is(':checked');
	GM_setValue("mostrarImperio", opMostrarImperio);
	hideOptions();
	document.location.reload(); //recargamos la pagina
}

// --------------------------------- funciones auxiliares ---------------------------------
/**
 * Convierte una cantidad de segundos en H, M y S
 */
function secondsToTime( secs )
{
	if (secs==1.7976931348623157E+10308) return LANG.infinito;
	else
	{
		if (secs<0) return "0s";
	    var hours = Math.floor(secs / (60 * 60));
	   
	    var divisor_for_minutes = secs % (60 * 60);
	    var minutes = Math.floor(divisor_for_minutes / 60);
	 
	    var divisor_for_seconds = divisor_for_minutes % 60;
	    var seconds = Math.ceil(divisor_for_seconds);
	   
	    resultado = "";
	    if (hours>0) resultado=hours+"h ";
	    if (minutes>0) resultado = resultado+minutes+"m ";
	    if (seconds>0) resultado = resultado+seconds+"s";
		
		//devolvemos el formato adecuado segun idioma:
		//[PL] Xg Xmin. Xsek. -> Xh Xm Xs
		if (idioma=='pl') { resultado = resultado.replace("h", "g"); resultado = resultado.replace("m", "min."); resultado = resultado.replace("s", "sek."); }
		else
			//[RU] Xч Xм Xс -> Xh Xm Xs
			if (idioma=='ru') { resultado = resultado.replace("h", "ч"); resultado = resultado.replace("m", "м"); resultado = resultado.replace("s", "с"); }
	    
		return resultado;
	}
}

/**
 * Convierte una cadena de texto de tipo: Xh Xm Xs en la cantidad equivalente de segundos
 * [FIX] PL server: time format -> Xg Xmin. Xsek.
 * [FIX] RU server: time format -> Xч Xм Xс
 */
function timeToSeconds( time )
{
	//Xg Xmin. Xsek. -> Xh Xm Xs
	time = time.replace("g", "h"); time = time.replace("min.", "m"); time = time.replace("sek.", "s");
	//Xч Xм Xс -> Xh Xm Xs
	time = time.replace("ч", "h"); time = time.replace("м", "m"); time = time.replace("с", "s");
	var seconds = 0;
	time = jQuery.trim(time);
	parts = time.split(" ");
	for (i=0;i<parts.length;i++)
	{
		c = parts[i].charAt(parts[i].length-1);
		number = parseInt( parts[i].substring(0,parts[i].length-1), 10);
		switch (c)
		{
			case 'h' : seconds = seconds + (number*60*60); break;
			case 'm' : seconds = seconds + (number*60); break;
			case 's' : seconds = seconds + number; break;
		}
	}
	return seconds;
}

/**
 * calcula el minimo (que sea mayor de cero) de los 3 primeros elementos de un array
 * en caso de no haber ninguno positivo, devuelve -1
 */
function minimo( lista )
{
	var min=-1;
	for (i=0;i<3;i++)
	{
		elemento = lista[i];
		if ((min==-1) && (elemento>0))
		{
			min=elemento;
		}
		else 
		{
			if ((elemento>0) && (elemento<min))
				min=elemento;
		}	
	}
	return min;
}

/**
 * Traduce a español algunas palabras necesarias para el funcionamiento del script
 */
function traduce(palabra)
{
	switch(palabra)
	{
	case LANG_EN.metal: palabra = LANG_ES.metal; break;
	case LANG_FR.metal: palabra = LANG_ES.metal; break;
	case LANG_PL.metal: palabra = LANG_ES.metal; break;
	case LANG_PT.metal: palabra = LANG_ES.metal; break;
	case LANG_RU.metal: palabra = LANG_ES.metal; break;
	//case LANG_TR.metal: palabra = LANG_ES.metal; break; innecesario
	case LANG_IT.metal: palabra = LANG_ES.metal; break;
	
	case LANG_EN.cristal: palabra = LANG_ES.cristal; break;
	case LANG_FR.cristal: palabra = LANG_ES.cristal; break;
	case LANG_PL.cristal: palabra = LANG_ES.cristal; break;
	case LANG_PT.cristal: palabra = LANG_ES.cristal; break;
	case LANG_RU.cristal: palabra = LANG_ES.cristal; break;
	case LANG_TR.cristal: palabra = LANG_ES.cristal; break;
	case LANG_IT.cristal: palabra = LANG_ES.cristal; break;
	
	case LANG_EN.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_FR.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_PL.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_PT.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_RU.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_TR.deuterio: palabra = LANG_ES.deuterio; break;
	case LANG_IT.deuterio: palabra = LANG_ES.deuterio; break;
	
	case LANG_EN.energia: palabra = LANG_ES.energia; break;
	case LANG_FR.energia: palabra = LANG_ES.energia; break;
	case LANG_PL.energia: palabra = LANG_ES.energia; break;
	case LANG_PT.energia: palabra = LANG_ES.energia; break;
	case LANG_RU.energia: palabra = LANG_ES.energia; break;
	case LANG_TR.energia: palabra = LANG_ES.energia; break;
	case LANG_IT.energia: palabra = LANG_ES.energia; break;
	}
	
	return palabra;
}

/**
 * Lenguajes
 */
var LANG_ES = {
	metal: "Metal",
	cristal: "Cristal",
	deuterio: "Deuterio",
	energia: "Energía",
	almMetalLleno: "Alm. de metal lleno en: ",
	almCristalLleno: "Alm. de cristal lleno en: ",
	almDeuterioLleno: "Alm. de deut. lleno en: ",
	prod321: "Produccion según ratio 3:2:1",
	prodActual: "Prod. Actual",
	prodIdeal: "Prod. Ideal",
	infinito: "Infinito",
	guardar: "Guardar",
	ocultarPublicidad: "Ocultar publicidad",
	mostrarInfoEnAnuncio: "Mostrar info en su lugar",
	lenguaje: "Lenguaje",
	showFleetResources: "Mostrar recursos en viaje",
	minEscombros: "Tamaño mín. escombros",
	tiempoTotal: "Tiempo total",
	flota: "Flota",
	sonda: "Sonda",
	satelite: "Satélite",
	npc: "Nave pequeña de carga",
	ngc: "Nave grande de carga",
	reciclador: "Reciclador",
	cl: "Caza ligero",
	cp: "Caza pesado",
	crucero: "Crucero",
	nb: "Nave de batalla",
	acorazado: "Acorazado",
	bombardero: "Bombardero",
	destructor: "Destructor",
	edlm: "Estrella de la Muerte",
	defensa: "Defensas",
	lanza: "Lanzamisiles",
	laserp: "Láser pequeño",
	laserg: "Láser grande",
	gauss: "Cañón gauss",
	ionico: "Cañón iónico",
	plasma: "Cañón de plasma",
	mInterplanet: "Misiles Interplanetarios",
	mIntercep: "Misiles de interceción",
	metSobrante: "Metal sobrante",
	criSobrante: "Cristal sobrante",
	deuSobrante: "Deuterio sobrante",
	porDia: "Al día",
	reciclar: "Reciclar",
	imperio: "Imperio",
	recursos: "Recursos",
	produccion: "Producción",
	total: "Total",
	planeta: "Planeta"
};
var LANG_EN = {
	metal: "Metal",
	cristal: "Crystal",
	deuterio: "Deuterium",
	energia: "Energy",
	almMetalLleno: "Metal storage full in: ",
	almCristalLleno: "Crystal storage full in: ",
	almDeuterioLleno: "Deut. storage full in: ",
	prod321: "Production compared to 3:2:1 rate",
	prodActual: "Current Prod.",
	prodIdeal: "Ideal Prod.",
	infinito: "Infinity",
	guardar: "Save",
	ocultarPublicidad: "Hide ads",
	mostrarInfoEnAnuncio: "Show other info instead",
	lenguaje: "Language",
	showFleetResources: "Show fleet resources",
	minEscombros: "Min. size of debris",
	tiempoTotal: "Total time",
	flota: "Ships",
	sonda: "Espionage Probe",
	satelite: "Solar Satellite",
	npc: "Small cargo ship",
	ngc: "Large cargo ship",
	reciclador: "Recycler",
	cl: "Light fighter",
	cp: "Heavy fighter",
	crucero: "Cruiser",
	nb: "Battleship",
	acorazado: "Battlecruiser",
	bombardero: "Bomber",
	destructor: "Destroyer",
	edlm: "Deathstar",
	defensa: "Defense",
	lanza: "Rocket Launcher",
	laserp: "Light Laser",
	laserg: "Heavy Laser",
	gauss: "Gauss Cannon",
	ionico: "Ion Cannon",
	plasma: "Plasma Turret",
	mInterplanet: "Interplanetary Missiles",
	mIntercep: "Anti-Ballistic Missiles",
	metSobrante: "Remaining Metal",
	criSobrante: "Remaining Crystal",
	deuSobrante: "Remaining Deuterium",
	porDia: "Per day",
	reciclar: "Recycle",
	imperio: "Empire",
	recursos: "Resources",
	produccion: "Production",
	total: "Total",
	planeta: "Planet"
};
//Thanks to "la faucille"
var LANG_FR = {
	metal: "Métal",
	cristal: "Cristal",
	deuterio: "Deutérium",
	energia: "Energie",
	almMetalLleno: "Hangar Métal rempli ds: ",
	almCristalLleno: "Hangar Cristal rempli ds: ",
	almDeuterioLleno: "Réservoir Deut. rempli ds: ",
	prod321: "Production comparée au rapport 3:2:1",
	prodActual: "Prod. actuelle",
	prodIdeal: "Prod. idéale",
	infinito: "Infini",
	guardar: "Sauver",
	ocultarPublicidad: "Masquer pubs",
	mostrarInfoEnAnuncio: "Montrer Infos complémentaires",
	lenguaje: "Langage",
	showFleetResources: "Montrer ressources des flottes",
	minEscombros: "Taille min. débris",
	tiempoTotal: "Temps total",
	flota: "Flotte",
	sonda: "Sonde espionnage",
	satelite: "Satellite solaire",
	npc: "Petit transporteur",
	ngc: "Grand transporteur",
	reciclador: "Recycleur",
	cl: "Chasseur léger",
	cp: "Chasseur lourd",
	crucero: "Croiseur",
	nb: "Vaisseau de bataille",
	acorazado: "Traqueur",
	bombardero: "Bombardier",
	destructor: "Destructeur",
	edlm: "Étoile de la mort",
	defensa: "Défense",
	lanza: "Lanceur de missiles",
	laserp: "Artillerie laser légère",
	laserg: "Artillerie laser lourde",
	gauss: "Canon de Gauss",
	ionico: "Artillerie à ions",
	plasma: "Lanceur de plasma",
	mInterplanet: "Missile Interplanétaire",
	mIntercep: "Missile d`interception",
	metSobrante: "Métal restant",
	criSobrante: "Cristal restant",
	deuSobrante: "Deutérium restant",
	porDia: "Par jour",
	reciclar: "Recycler",
	imperio: "Empire",
	recursos: "Ressources",
	produccion: "Production",
	total: "Total",
	planeta: "Planète"
};
//Thanks to "ErCmAc"
var LANG_PL = {
	metal: "Metal",
	cristal: "Kryształ",
	deuterio: "Deuter",
	energia: "Energia",
	almMetalLleno: "Magazyn Metalu pełny za: ",
	almCristalLleno: "Magazyn Kryształu pełny za: ",
	almDeuterioLleno: "Magazyn Deuteru pełny za: ",
	prod321: "Produkcja porównana do stawki 3:2:1",
	prodActual: "Obecna Prod.",
	prodIdeal: "Idealna Prod.",
	infinito: "Nieskończoność",
	guardar: "Zapisz",
	ocultarPublicidad: "Ukrywaj Reklamy",
	mostrarInfoEnAnuncio: "W zamian pokaż inne informacje",
	lenguaje: "Język",
	showFleetResources: "Show fleet resources",
	minEscombros: "Min. size of debris",
	tiempoTotal: "Całkowity czas",
	flota: "Flota",
	sonda: "Sonda szpiegowska",
	satelite: "Satelita słoneczny",
	npc: "Mały transporter",
	ngc: "Duży transporter",
	reciclador: "Recykler",
	cl: "Lekki myśliwiec",
	cp: "Ciężki myśliwiec",
	crucero: "Krążownik",
	nb: "Okręt wojenny",
	acorazado: "Pancernik",
	bombardero: "Bombowiec",
	destructor: "Niszczyciel",
	edlm: "Gwiazda Śmierci",
	defensa: "Obrona",
	lanza: "Wyrzutnia rakiet",
	laserp: "Lekkie działo laserowe",
	laserg: "Ciężkie działo laserowe",
	gauss: "Działo Gaussa",
	ionico: "Działo jonowe",
	plasma: "Wyrzutnia plazmy",
	mInterplanet: "Interplanetary Missiles",
	mIntercep: "Anti-Ballistic Missiles",
	metSobrante: "Pozostały Metal",
	criSobrante: "Pozostały Kryształ",
	deuSobrante: "Pozostały Deuter",
	porDia: "Na dzień",
	reciclar: "Recycle",
	imperio: "Empire",
	recursos: "Resources",
	produccion: "Production",
	total: "Total",
	planeta: "Planet"
}
//Thanks to "Chotaz"
var LANG_PT = {
	metal: "Metal",
	cristal: "Cristal",
	deuterio: "Deutério",
	energia: "Energia",
	almMetalLleno: "Armazém de metal cheio em: ",
	almCristalLleno: "Armazém de cristal cheio em: ",
	almDeuterioLleno: "Armazém de deutério cheio em: ",
	prod321: "Produção em rácio 3:2:1",
	prodActual: "Prod. Actual.",
	prodIdeal: "Prod. Ideal",
	infinito: "Infinito",
	guardar: "Guardar",
	ocultarPublicidad: "Ocultar publicidade",
	mostrarInfoEnAnuncio: "Mostrar outra informações",
	lenguaje: "Linguagem",
	showFleetResources: "Show fleet resources",
	minEscombros: "Min. size of debris",
	tiempoTotal: "Tempo total",
	flota: "Frota",
	sonda: "Sonda de Espionagem",
	satelite: "Satélite Solar",
	npc: "Cargueiro pequeno",
	ngc: "Cargueiro grande",
	reciclador: "Reciclador",
	cl: "Caça ligeiro",
	cp: "Caça pesado",
	crucero: "Cruzador",
	nb: "Interceptor",
	acorazado: "Battlecruiser",
	bombardero: "Bombardeiro",
	destructor: "Destruidor",
	edlm: "Estrela da Morte",
	defensa: "Defesa",
	lanza: "Lança Mísseis",
	laserp: "Laser Ligeiro",
	laserg: "Laser Pesado",
	gauss: "Canhão de Gauss",
	ionico: "Canhão de Iões",
	plasma: "Canhão de Plasma",
	mInterplanet: "Interplanetary Missiles",
	mIntercep: "Anti-Ballistic Missiles",
	metSobrante: "Metal restante",
	criSobrante: "Cristal restante",
	deuSobrante: "Deutério restante",
	porDia: "Por dia",
	reciclar: "Recycle",
	imperio: "Empire",
	recursos: "Resources",
	produccion: "Production",
	total: "Total",
	planeta: "Planet"
}
//Thanks to "ASiper"
var LANG_RU = {
	metal: "Металл",
	cristal: "Кристалл",
	deuterio: "Дейтерий",
	energia: "Энергия",
	almMetalLleno: "Хранилище металла заполнится через: ",
	almCristalLleno: "Хранилище кристалла заполнится через: ",
	almDeuterioLleno: "Хранилище дейтерия заполнится через: ",
	prod321: "Выработка в 3:2:1",
	prodActual: "Текущее пр-во",
	prodIdeal: "Идеальное пр-во",
	infinito: "Неопр.",
	guardar: "Сохранить",
	ocultarPublicidad: "Убрать баннер",
	mostrarInfoEnAnuncio: "Показать дополнительную информацию",
	lenguaje: "Язык",
	showFleetResources: "Показать ресурсы в полёте",
	minEscombros: "Мин. поле обломков",
	tiempoTotal: "Общее время",
	flota: "Флот",
	sonda: "Шпионский зонд",
	satelite: "Солнечный спутник",
	npc: "Малый транспорт",
	ngc: "Большой транспорт",
	reciclador: "Переработчик",
	cl: "Лёгкий истребитель",
	cp: "Тяжёлый истребитель",
	crucero: "Крейсер",
	nb: "Линкор",
	acorazado: "Линейный крейсер",
	bombardero: "Бомбардировщик",
	destructor: "Уничтожитель",
	edlm: "Звезда смерти",
	defensa: "Оборона",
	lanza: "Ракетная установка",
	laserp: "Лёгкий лазер",
	laserg: "Тяжёлый лазер",
	gauss: "Пушка Гаусса",
	ionico: "Ионное орудие",
	plasma: "Плазменное орудие",
	mInterplanet: "Межпланетная ракета",
	mIntercep: "Ракета-перехватчик",
	metSobrante: "Остаток Металла",
	criSobrante: "Остаток Кристалла",
	deuSobrante: "Остаток Дейтерия",
	porDia: "В день",
	reciclar: "Переработать",
	imperio: "Империя",
	recursos: "Ресурсы",
	produccion: "Производство",
	total: "Всего",
	planeta: "Планета"
}
/* thanks to AmchoD */
var LANG_TR = {
	metal: "Metal",
	cristal: "Kristal",
	deuterio: "Deuterium",
	energia: "Enerji",
	almMetalLleno: "Metal deposunun dolmasına: ",
	almCristalLleno: "Kristal deposunun dolmasına: ",
	almDeuterioLleno: "Deut. deposunun dolmasına: ",
	prod321: "3:2:1 oranına göre üretim",
	prodActual: "Şimdiki Üretim",
	prodIdeal: "Ideal Üretim",
	infinito: "Sonsuz",
	guardar: "Kaydet",
	ocultarPublicidad: "Reklamları gizle",
	mostrarInfoEnAnuncio: "Yerine başka bilgi göster",
	lenguaje: "Dil",
	showFleetResources: "Filo hammadelerini göster",
	minEscombros: "Min. enkaz büyüklüğü",
	tiempoTotal: "Toplam zaman",
	flota: "Filo",
	sonda: "Casus Sondasi",
	satelite: "Solar Uydu",
	npc: "Küçük Nakliye Gemisi",
	ngc: "Büyük Nakliye Gemisi",
	reciclador: "Geri Dönüsümcü",
	cl: "Hafif Avci",
	cp: "Agir Avci",
	crucero: "Kruvazör",
	nb: "Komuta Gemisi",
	acorazado: "Firkateyn",
	bombardero: "Bombardiman Gemisi",
	destructor: "Muhrip",
	edlm: "Ölüm Yildizi",
	defensa: "Savunma",
	lanza: "Roketatar",
	laserp: "Hafif Lazer Topu",
	laserg: "Agir Lazer Topu",
	gauss: "Gaus Topu",
	ionico: "Iyon Topu",
	plasma: "Plazma Aticilar",
	mInterplanet: "Gezegenlerarasi Roketler",
	mIntercep: "Yakaliyici Roketler",
	metSobrante: "Kalan Metal",
	criSobrante: "Kalan Kristal",
	deuSobrante: "Kalan Deuterium",
	porDia: "Günde",
	reciclar: "Sök",
	imperio: "Imparatorluk",
	recursos: "Kaynaklar",
	produccion: "Üretim",
	total: "Toplam",
	planeta: "Gezegen"
};
/* thanks to Snooze2 */
var LANG_IT = {
	metal: "Metallo",
	cristal: "Cristallo",
	deuterio: "Deuterio",
	energia: "Energia",
	almMetalLleno: "Deposito di Metallo pieno in: ",
	almCristalLleno: "Deposito di Cristallo pieno in: ",
	almDeuterioLleno: "Deposito di Deuterio pieno in: ",
	prod321: "Produzione rispetto al tasso 3:2:1",
	prodActual: "Produzione Attuale",
	prodIdeal: "Produzione Ideale",
	infinito: "Infinito",
	guardar: "Salva",
	ocultarPublicidad: "Nascondi Publicità",
	mostrarInfoEnAnuncio: "Mostra invece altre informazioni",
	lenguaje: "Lingua",
	showFleetResources: "Mostra risorse in volo",
	minEscombros: "Dimensione minima detriti",
	tiempoTotal: "Tempo totale",
	flota: "Flotta",
	sonda: "Sonda Spia",
	satelite: "Satellite Solare",
	npc: "Cargo Leggero",
	ngc: "Cargo Pesante",
	reciclador: "Riciclatrice",
	cl: "Caccia Leggero",
	cp: "Caccia Pesante",
	crucero: "Incrociatore",
	nb: "Nave da Battaglia",
	acorazado: "Incrociatore da Battaglia",
	bombardero: "Bombardiere",
	destructor: "Corazzata",
	edlm: "Morte Nera",
	defensa: "Difese",
	lanza: "Lanciamissili",
	laserp: "Laser Leggero",
	laserg: "Laser Pesante",
	gauss: "Cannone Gauss",
	ionico: "Cannone Ionico",
	plasma: "Cannone al Plasma",
	mInterplanet: "Missili Interplanetari",
	mIntercep: "Missili Anti Balistici",
	metSobrante: "Metallo Rimanente",
	criSobrante: "Cristallo Rimanente",
	deuSobrante: "Deuterio Rimanente",
	porDia: "Al Giorno",
	reciclar: "Ricicla",
	imperio: "Impero",
	recursos: "Risorse",
	produccion: "Produzione",
	total: "Totale",
	planeta: "Pianeta"
};
	
window.addEventListener('load',main,true);