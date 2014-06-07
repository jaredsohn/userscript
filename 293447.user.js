// ==UserScript==
// @id         		UnLymitedSeries
// @name       		UnLymited Series
// @version    		0.6.11
// @namespace  		https://highfredo.no-ip.org
// @author     		Highfredo
// @description  	Plugin que suple algunas carencias de Series.ly
// @updateURL       http://userscripts.org/scripts/source/293447.meta.js
// @downloadURL     http://userscripts.org/scripts/source/293447.user.js
// @run-at          document-end
// @match      		http://series.ly/scripts/*
// @match      		http://series.ly/series/*
// @match      		http://series.ly/pelis/*
// @match      		http://series.ly/tvshows/*
// @match      		http://series.ly/docus/*
// @copyright  		2014+, Highfredo
// @require   		http://code.jquery.com/jquery-1.7.1.min.js
// @require	   		https://dl.dropboxusercontent.com/u/29200106/assets/purl.js
// @require			http://cdnjs.cloudflare.com/ajax/libs/fancybox/2.0.4/jquery.fancybox.pack.min.js
// @resource 		icon_gear https://dl.dropboxusercontent.com/u/29200106/assets/gear_16.png
// @resource 		icon_down https://dl.dropboxusercontent.com/u/29200106/assets/down_16.png
// @resource 		icon_up   https://dl.dropboxusercontent.com/u/29200106/assets/up_16.png
// @resource 		icon_save https://dl.dropboxusercontent.com/u/29200106/assets/save_16.png
// @resource 		icon_clean https://dl.dropboxusercontent.com/u/29200106/assets/clean_16_2.png
// ==/UserScript==


console.log("UnLymited Series by Highfredo!");

/**
* Global vars
**/
var $_defaults = {
	config : { 
		servidores_favoritos: ["Youtube", "MEGA", "MediaFire", "Putlocker", "VK"],
		menu_selected_default: {
			calidad : ["all"],
			servidor: ["servidores_favoritos"],
			idioma : ["all"],
			type : ["all"],
			subtitulos : ["all"],
			features : ["all"],
			uploader : ["all"]
		}
	}, 
	auth: {
		token: undefined,
		expire: undefined
	}, 
	user: {
		token: undefined,
		expire: undefined,
		nick: $currentUserName
	}
}

var $links = {};
var $currentUserName = $(".myNick a").first().text();
var $api = {
	id : "126", // unLymited
	secret : "ac99nHhq35npXXRbfcDS",
	url : "http://api.series.ly/v2"
}
var $url = $.url(window.location.href);



/**
* CSS
**/
GM_addStyle("\
.filtro-options {\
	margin: 0px 12px 0px 12px\
}\
.masBtn {\
	margin-right: 19px;\
}\
.botonera {\
	padding-top: 7px;\
}\
.cursor-pointer {\
	cursor: pointer;\
}\
.mini-boton {\
	padding-right: 10px;\
}\
#filtros {\
	padding-top: 4px;\
	z-index: 1000;\
	position: absolute;\
	width: 97%;\
	background-color: white;\
}\
#contentContainer {\
	height: 79%; !important;\
}\
#episodesContainer {\
	width: inherit !important;\
	height: inherit !important;\
}\
#linksContainer {\
	height: 100%; !important;\
}\
#episodeLinks {\
	padding-top: 37px;\
}\
#commentsContainer{\
	height: 96%; !important;\
}\
#addLinksContainer{\
	height: 100%;\
	overflow-x: hidden;\
	overflow-y: auto;\
}\
#epFooter{\
	position: absolute;\
	width: 100%;\
	height:100%;\
}");


/**
*	GM utilities
**/
unsafeWindow.gmdebug = function(variable) {
	return eval(variable);
}

function clear_data() {
	var store = GM_listValues();
	$.each(store, function(index, value){
		GM_deleteValue(value);
	})
	alert("Todos los datos borrados");
}

function clear_tokens() {
	var store = GM_listValues();
	$.each(store, function(index, value) {
		if(value.match(/^userToken|^auth/))
			GM_deleteValue(value);
	})
	alert("Auth Tokens y User Tokens borrados");
}


/**
* Series.ly API Auth Stuff
**/
function auth(newAuth) {
	if(newAuth) {
		GM_setValue('auth', newAuth);
	} else {
		return GM_getValue('auth') || $_defaults.auth;
	}
}

function user(newUser) {
	if(newUser) {
		GM_setValue('userToken_' + newUser.nick, newUser);
	} else {
		return GM_getValue('userToken_' + $currentUserName) || $_defaults.user;
	}
}

function userConfig(config) {
	if(typeof config == "object") {
		GM_setValue('userConfig_' + $currentUserName + '_' + (config.idm || ''), config); // Sin idm => para todos
	} else {
		try 		{idm2 = idm}
		catch(err)  {idm2 = '' }
		var defaults = GM_getValue('userConfig_' + $currentUserName + '_');
		var perMedia = GM_getValue('userConfig_' + $currentUserName + '_' + idm2);
		return $.extend($_defaults.config, defaults, perMedia);
	}
}


function _new_auth_token() {
	return $.getJSON( $api.url+'/auth_token', { id_api: $api.id, secret: $api.secret }, function(data){
		if (data.error == 0){
			var newAuth = {
				token : data.auth_token,
				expire: data.auth_expires_date * 1000
			}
			console.log("Nuevo auth token guardado");
			auth(newAuth);
		} else {
			alert("Ha ocurrido un error generando: auth_token");
		}
	} );
}

function _new_user_token() {
	// Si hay un user_token en la url la guarda, sino lo pide
	if($url.param('user_token') != undefined) {
		var newUser = {
			token:  $url.param('user_token'),
			expire: $url.param('user_expires_date') * 1000,
			nick: $currentUserName
		}
		user(newUser);
		window.location.href = "http://" + $url.param('goto');
	} else {
		window.location.href = $api.url+"/user/user_login?auth_token="+auth().token+"&redirect_url="+
			$url.attr('source')+"?goto="+$url.attr('host')+$url.attr('path');
	}
}

function doLoginAuth() { 
	// Se piden los tokens necesarios
	var auth_expire = auth().expire   || new Date(0);
	var user_expire = user().expire   || new Date(0);
	if(auth_expire <= new Date()) {
		_new_auth_token().done(function(){
			_new_user_token();
		});
		console.log("Se piden ambos tokens");
	} else if(user_expire <= new Date()) {
		_new_user_token();
		console.log("Se pide solo el user token");
	} else {
		console.log("No se pide ningun token");
	}
}


/**
* Definicion de filtros
**/
var menus = 
{
	calidad :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.quality == value);
		},
		options : function() {
			var calidades = new Array();
			var data = "data-quality";
			$('#episodeLinks ['+data+']').each(function(index, value){
				var calidad = $(value).attr(data);
				if($.inArray(calidad, calidades) === -1)
					calidades.push(calidad);
			});

			return calidades.sort(myAlphabeticalSort);
		},
		id : "calidadSelect",
		name : 'Calidad',
		ancho : '21%' 
	},

	servidor :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			if(value == 'servidores_favoritos')
				return $.inArray(info.host, this.favoritos) != -1;
			else
				return (value == 'all' || info.host == value);
		},
		options : function() {
			var servidores = new Array();
			var data = "data-host-name";
			$('#episodeLinks ['+data+']').each(function(index, value){
				var servidor = $(value).attr(data);
				if($.inArray(servidor, servidores) === -1) {
					servidores.push(servidor);
				}
			});

			servidores.sort(myAlphabeticalSort);
			servidores.unshift('servidores_favoritos');
			return servidores;
		},
		id : "servidorSelect",
		name : 'Servidor',
		ancho : '21%',
		favoritos : userConfig().servidores_favoritos
	}, 

    idioma :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.lang == value);
		},
		options : function() {
			var idiomas = new Array();
			var data = "data-lang";
			$('#episodeLinks ['+data+']').each(function(index, value){
				var idioma = $(value).attr(data);
				if($.inArray(idioma, idiomas) === -1) {
					idiomas.push(idioma);
				}
			});
			return idiomas.sort(myAlphabeticalSort);
		},
		id : "idiomaSelect",
		name : 'Idioma',
		ancho : '21%' 
	},
	
	type :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.linksType == value);
		},
		options : function() {
			return ['streaming', 'direct_download']
		},
		id : "typeSelect",
		name : 'Metodo descarga',
		ancho : '21%' 
	},

	subtitulos :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.sub == value);
		},
		options : function() {
			var sutitulos = new Array();
			$.each($links, function(index, value){
				if($.inArray(value.sub, sutitulos) === -1) {
					sutitulos.push(value.sub);
				}
			});
			return sutitulos.sort(myAlphabeticalSort);
		},
		id : "subSelect",
		name : 'Subtitulos',
		ancho : '21%',
		isExtra : true 
	},

	features :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.features == value);
		},
		options : function() {
			var features = new Array();
			$.each($links, function(index, value){
				if($.inArray(value.features, features) === -1) {
					features.push(value.features);
				}
			});
			return features.sort(myAlphabeticalSort);
		},
		id : "featuresSelect",
		name : 'Resolución',
		ancho : '21%',
		isExtra : true 
	},

	uploader :
	{
		filtro : function(element) {
			var value = $('#'+this.id).val();
			var info = $links[$(element).attr('data-key')];
			return (value == 'all' || info.UploadedBy == value);
		},
		options : function() {
			var uploaders = new Array();
			$.each($links, function(index, value){
				if($.inArray(value.UploadedBy, uploaders) === -1) {
					uploaders.push(value.UploadedBy);
				}
			});
			return uploaders.sort(myAlphabeticalSort);
		},
		id : "uploaderSelect",
		name : 'Uploader',
		ancho : '21%',
		isExtra : true 
	}
}

var diccionario =
{
	get : function (value) {
		return (this[value] || value)
	},
	servidores_favoritos : 'Servidores favoritos',
	no_sub : "Sin subtitular",
	streaming : 'Visionado directo',
	direct_download : 'Descaga',

	uploaded : 'Uploaded',
	allmyvideos : 'Allmyvideos',
	'' : 'Sin categoria'
}


/**
* Metodo de ordenacion para las opciones del menu
**/
function myAlphabeticalSort(a, b) {
	if(a == '') return -1; // Pone el elemento sin categoria primero
	if(b == '') return 1;
    return diccionario.get(a).toLowerCase().localeCompare(diccionario.get(b).toLowerCase());
}

/**
* Construye un filtro de busqueda
**/
function buildSelect(info) {
	var select = $("<select id=" + info.id + " class='masked filtro'>")
			.append("<option value='all' data-text='"+info.name+"'>Todos</option>");

	$.each(info.options(), function(index, value){
		select.append(new Option(diccionario.get(value), value))
	});

	var selectContainer = $("<div class='select-element' style='width: " + (info.ancho || '30%') + " !important'>")
			.append("<div class='masked-select-val'><span class='float-right'>▾</span><span class='txt'>" + info.name + "</span></div>")
			.append(select);

	select.change(function(){
		var selected = select.find("option:selected");
		selectContainer.find(".masked-select-val .txt").text(selected.attr('data-text') || selected.text());
	});

	return selectContainer;		
}

function doFilter() {
	$("#episodeLinks [data-host-name]").each(function(index, value) {
		var self = $(value);
		self.removeClass("oculto");
		$.each(menus, function(index, menu){
			if (!menu.filtro(value)) {
				self.addClass("oculto");
				$('#trReport_'+self.attr('id').split('_')[1]).css('display', 'none');
				return;
			}
		});
	})
}

function doCleanFilters() {
	$(".filtro").val('all').change();
}

function doSaveFilter() {
	if(confirm("¿Guardar filtros para esta serie?")) {
		var newConfig = {idm: idm, menu_selected_default:{}};
		$.each(menus, function(key, value){
			newConfig.menu_selected_default[key] = [$('#'+value.id).val()]
		})
		userConfig(newConfig);
	}
}

function selectMenuDefaults() {
	$.each(userConfig().menu_selected_default, function(key, value) {
		$.each(value, function(index, value2) {
			if($.inArray(value2, menus[key].options()) != -1 || value2 == 'all') {
				$('#'+menus[key].id).val(value2);
				return false;
			}
		})
	});
	$("select").change();
}

/**
* Inserta el menu con los filtros
**/
function customFilterMediaLinks() {
	// Crea el conjunto de selects con los filtros
	var menu = $("<div id='filtros' class='filtro-options clearfix'>");
	var menuExtra = $("<div id='filtros_extra' class='hidden'>");
	$.each(menus, function(index, value){
		if(value.isExtra) {
			menuExtra.append(buildSelect(value));
		} else{
			menu.append(buildSelect(value));
		}
	});


	// botonera
	var botonera = $('<div class="float-right botonera"></div>');
	menu.append(botonera).append(menuExtra);

	// Crea el boton de "mas filtros"
	var masBtn = $('<img class="cursor-pointer mini-boton masBtn" src="' + GM_getResourceURL("icon_down") + '" title="Mas filtros">').click(function(){
		menuExtra.toggle();
	});
	botonera.append(masBtn);

	// Crea la opcion de limpiar filtros
	var limpiarBtn = $('<img class="cursor-pointer mini-boton" src="' + GM_getResourceURL("icon_clean") + '" title="Limpiar filtros">').click(doCleanFilters); 
	botonera.append(limpiarBtn);

	// Crea el boton de guardar filtros
	var saveBtn   =  $('<img class="cursor-pointer mini-boton" src="' + GM_getResourceURL("icon_save") + '" title="Guardar filtros para esta serie">').click(doSaveFilter);
	botonera.append(saveBtn);

	// Hace el filtrado
	menu.find("select").change(doFilter);

	menu.insertBefore("#episodeLinks"); //#contentContainer
	selectMenuDefaults();
}


/**
* Sobrescribe funciones series.ly
**/
unsafeWindow.loadEpisodes = function(idc,timestamp){
	var mainInfo=mediaObject.getMainInfo($suffix,$mainCountry);
	var mediaTitle=strtr(mainInfo.title,'"','');
	var epTitles=new Array();
	var epTitles2=new Array();
	var episodesIndex=new Array();
	var i=0;
	$(mediaObject.getSeasons()).each(function(k,seasonNumber){
		$(mediaObject.getEpisodes(seasonNumber,$suffix)).each(function(k,ep){
			if(ep.episode<10)
				epNumb='0'+ep.episode.toString();
			else
			epNumb=ep.episode;

			if((ep.title==null)||(ep.title=='')||(typeof(ep.title)=="undefined")){
				ep.title='&nbsp;&nbsp;&nbsp;';
			}
			epTitles[ep.idc]=ep.season+'x'+epNumb+' - <span id="editTitle'+ep.idc+'" contenteditable="false">'+ep.title.stripSlashes()+'</span>';
			epTitles2[ep.idc]=ep.season+'x'+epNumb+' - '+ep.title;
			episodesIndex[i]=ep.idc;i++;
		});
	});
	if(mediaStyle=='serie'){
		nextEp=false;
		prevEp=false;
		foundAct=false;
		findNext=false;
		firstEp=false;
		lastEp=false;
		for(i=0;i<episodesIndex.length;i++){
			idcAct=episodesIndex[i];
			if(firstEp==false)
				firstEp=idcAct;
			if(findNext==true){
				nextEp=idcAct;
				findNext=false;
			}
			if(idcAct==idc){
				foundAct=true;
				findNext=true;
			}
			if(foundAct==false)
				prevEp=idcAct;
			lastEp=idcAct;
		}
	}
	var toAppend="";
	toAppend+='<div id="episodesTitle" class="clearfix">';
	toAppend+='<div id="episodesImg" class="float-left"><img src="http://cdn.opensly.com/'+mediaStyle+'s/'+id_media+'-p.jpg" /></div>';
	toAppend+='<div class="float-left" style="height: 55px; /*width: 630px*/">';
	toAppend+='<h4>'+mediaTitle+'</h4>';
	if($myEpViewed[idc]==true){
		toAppend+='<div class="mediaSprite eye viewed tr_'+idc+' float-left tipsy_derecha" original-title="'+lang('info_uncheck')+'" onclick="episodeToggle(\''+idc+'\'"></div>';
	} else{
		toAppend+='<div class="mediaSprite eye tr_'+idc+' float-left tipsy_derecha" original-title="'+lang('info_check')+'" onclick="episodeToggle(\''+idc+'\')"></div>';
	}
	toAppend+='<p style="margin-left: 45px; overflow:hidden">'+epTitles[idc];
	toAppend+='</p>';
	toAppend+='</div>';
	toAppend+='<div class="float-right" style="margin-top: 20px;">';
	toAppend+='<span style="cursor: pointer" onclick="showLinks();">'+lang('info_links')+'</span> | <span style="cursor: pointer" onclick="showComments(\''+idc+'\');">'+lang('info_comments')+'</span>';
	toAppend+=' | <button class="gradientButton" href="javascript:void(0)" onClick="add_video3(\''+idm+'\', \''+mediaType+'\')">'+lang('info_addlink')+'</button>';
	toAppend+='</div>';
	toAppend+='</div>';

	toAppend+='<div id="contentContainer">';
	toAppend+='<div id="linksContainer"><img src="http://cdn.opensly.com/preloader_gris_grande.gif" style="padding:22% 36%" /></div>';
	toAppend+='<div id="commentsContainer" class="oculto"><div id="comment-space"></div></div>';
	toAppend+='<div id="addLinksContainer" class="oculto"></div>';
	toAppend+='</div>'

	toAppend+='<div id="epFooter">';
	sharerText='Viendo '+mediaTitle.stripSlashes()+' '+epTitles2[idc].stripSlashes();
	toAppend+='<div id="sharerButtons" class="float-left" style="padding:15px 20px">';
	toAppend+='<div class="mediaSprite twitter float-left" onClick="window.open(\'https://twitter.com/share?url=&text='+sharerText+'&via=series_ly\', \'twitter\', \'width=540,height=375,scrollbars=yes,location=no,menubar=no, status=no\')"></div>';
	toAppend+='<div class="mediaSprite facebook float-left" onClick="revisaface()"></div>';
	toAppend+='<div class="float-left" style="margin-left: 10px; margin-top: 3px">'+sharerText+'</div>';
	toAppend+='</div>';
	toAppend+='<div class="clearfix float-right" style="width: 125px">';
	if(idc!=lastEp)
		toAppend+='<div class="mediaSprite play epPass next float-right" onClick="loadEpisodes('+nextEp+','+timestamp+')"></div>';
	if(idc!=firstEp)
		toAppend+='<div class="mediaSprite play left epPass float-right" onClick="loadEpisodes('+prevEp+','+timestamp+')"></div>';
	toAppend+='</div>';
	toAppend+='</div>';
	$("#episodesContainer").html(toAppend);
	loadLinks(idc,mediaType,timestamp);
} 

unsafeWindow.loadFilmLinks = function(idm, timestamp) {
    var mainInfo = mediaObject.getMainInfo($suffix, $mainCountry);
    var mediaTitle = strtr(mainInfo.title, '"', '');
    var toAppend = "";
    toAppend += '<div id="episodesTitle" class="clearfix">';
    toAppend += '<div id="episodesImg" class="float-left"><img src="http://cdn.opensly.com/' + mediaStyle + 's/' + id_media + '-p.jpg" /></div>';
    toAppend += '<div class="float-left" style="height: 55px; /*width: 630px*/">';
    toAppend += '<h4>' + lang('info_movieyear') + ' ' + mainInfo.year + '</h4>';
    toAppend += '<p style="margin-left: 0px; overflow:hidden"><span id="editTitle' + idm + '" contenteditable="false">' + mediaTitle + '</span>';
    if (typeof (myAD) != "undefined" && mediaType != MOVIE) {
        toAppend += toAppendAD1(idm, mediaType);
    }
    toAppend += '</p>';
    toAppend += '</div>';
    toAppend += '<div class="float-right" style="margin-top: 20px;">';
    toAppend += '<span style="cursor: pointer" onclick="showLinks();">'+lang('info_links')+'</span>';
	toAppend += ' | <button class="gradientButton" href="javascript:void(0)" onClick="add_video3(\''+idm+'\', \''+mediaType+'\')">'+lang('info_addlink')+'</button>';
    toAppend += '</div>';
    toAppend += '</div>';

	toAppend += '<div id="contentContainer">';
    toAppend += '<div id="linksContainer"><img src="http://cdn.opensly.com/preloader_gris_grande.gif" style="padding:22% 36%" /></div>';
   	toAppend += '<div id="addLinksContainer" class="oculto"></div>';
   	toAppend += '</div>';

    toAppend += '<div id="epFooter">';
    sharerText = lang('info_sharetext') + ' ' + mediaTitle.stripSlashes();
    toAppend += '<div id="sharerButtons" class="float-left" style="padding:15px 20px">';
    toAppend += '<div class="mediaSprite twitter float-left" onClick="window.open(\'https://twitter.com/share?url=&text=' + sharerText + '&via=series_ly\', \'twitter\', \'width=540,height=375,scrollbars=yes,location=no,menubar=no, status=no\')"></div>';
    toAppend += '<div class="mediaSprite facebook float-left" onClick="revisaface()"></div>';
    toAppend += '<div class="float-left" style="margin-left: 10px; margin-top: 3px">' + sharerText + '</div>';
    toAppend += '</div>';
    toAppend += '</div>';
    $("#episodesContainer").html(toAppend);
    loadLinks(idm, mediaType, timestamp);
}

unsafeWindow.loadLinks = function(idm, mediaType, timestamp) {
	loadLinksInformation(idm, mediaType, timestamp);
} 

unsafeWindow.loadLinksInformation = function(idm,mediaType,timestamp){
	epReports=new Array();
	var myCallback = function(data){ 
		totalReports=data;
		$(data).each(function(k,v){
			epReports[v.idv]=true;
		});
		var totalLinks=0;
		var nav=navigator.appName.toString();
		if(mediaType==SERIE||mediaType==TVSHOW){
			CapMediaType=5;
		} else{
			CapMediaType=mediaType;
		}
		var url='/scripts/media/epLinks.php?mediaType='+CapMediaType+'&idc='+idm+'&time='+timestamp+'.txt';
		$.ajax({
			url:url,
			type:'GET',
			success:function(arrayLinks){
				$links = arrayLinks; // guarda los links del capitulo en un scope global
				unsafeWindow.$links=arrayLinks;
				var toAppend='<table id="episodeLinks">';
				var linksType="";
				var linkPoints;
				var extraClass;
				$(arrayLinks).each(function(k, link){
					if(linksType!=link.linksType){
						toAppend+='<tr class="separate"><td><div>'+strtr(link.linksType,$statusText)+'</div></td></tr>';
					}
					linkPoints=0;
					toAppend+='<tr id="link_'+link.idv+'" style="cursor:pointer" class="sly-link" data-host-name="'+link.host+'" data-lang="'+link.lang+'" data-quality="'+link.quality+'" data-key="'+ k +'">';
					toAppend+='<td class="epHost" style="position:relative;display:block">';
					toAppend+='<div style="width:100%" title="'+lang('info_addedby')+' '+link.NickAddedBy+" el "+link.DateAdded+'" class="link-row float-left clearfix" onclick="navLink('+idm+','+link.idv+',\''+link.host+'\',\''+mediaType+'\', '+linkPoints+')">';
					toAppend+='<div class="link-points float-left pointer" style="padding:15px"><img class="transferValueIcon" src="http://cdn.opensly.com/slypoints.png"> <span>'+linkPoints+'</span></div>';
					toAppend+='<div class="spriteHosts '+link.sprite+' float-left pointer"></div>';
					toAppend+='<div class="linkInfo lang float-left" style="width: 190px">'+link.lang;
					if(link.sub!="") {
						toAppend+=' | '+lang('info_subtitles-short')+' '+link.sub;
					}
					toAppend+='</div>';
					content=link.quality;
					if(link.features!=''&&link.features!=undefined){
						content+=' | '+link.features;
					}
					if(mediaType==MOVIE){
						if(link.info!=''){
							content+=' | '+link.info;
						}
					}
					if(content!=""){
						toAppend+='<div class="linkInfo quality float-left" style="width: 190px">'+content+'</div>';
					}
					if(link.price>0){
						toAppend+='<div class="linkInfo price float-left" style="margin:0; position:absolute; right:0; top:12px">'+link.price+' EUR</div>';
					}
					toAppend+='</div>';
					if(link.linksType!='oficialServer'){
						toAppend+='<div id="reportLink-'+link.idv+'" class="reportLink float-right"><div class="linkOptionsButton hover" onclick="checkAndReport('+idm+','+link.idv+',\''+mediaType+'\');return false;">¿No funciona?</div></div>';
					}
					toAppend+='</td>';
					toAppend+='</tr>';
					toAppend+='<tr id="trReport_'+link.idv+'" class="oculto"><td></td></tr>';
					linksType=link.linksType;
					totalLinks++;
				}); // Fin each

				if(totalLinks==0){
					toAppend+='<span style="margin-left:40%;" id="no-links-warning">'+lang('info_nolinks')+'</span>';
				}
				toAppend+='<tr id="filter-no-results" class="hidden"><td>No hay ningún enlace que concida con tus filtros.<br>Desactiva alguno de ellos, o añade un enlace para ganar puntos.</td></tr>'
				toAppend+='</table>';
				$("#linksContainer").html(toAppend);
				customFilterMediaLinks();
			}// Fin success
		}); // Fin ajax
	}; // Fin myCallback
	
	myCallback(epReports);
	
} 

unsafeWindow.navLink = function(idc,idv,host,mediaType,linkPoints){
	if(auth().token == undefined || user().token == undefined) {
		alert("Ha ocurrido un problema con los tokens de autorizacion");
		return;
	}
			
	var tipus;

    if((mediaType==SERIE||mediaType==TVSHOW)){
    	tipus=5;
    } else{
    	tipus=mediaType;
    }

	$("#reportLink-"+idv).show();
	onEpisode(idc);
	$("#link_"+idv).addClass("lastSelected");
	slyMain.navigateToUrl('http://api.series.ly/v2/media/link/go/'+idv+'?auth_token='+auth().token+'&user_token='+user().token);


	try{
		if(linkPoints!=0){
			$('.link-points span').text('0');
			slyStorage.seeMedia(idc,mediaType);
		}
	}catch(e){}
} 


unsafeWindow.showEpisodes = function(idc,timestamp) { //TODO que el fancybox se adapte al tamaño de la pantalla
	var data='<div id="episodesContainer"></div>';
	$.fancybox(data, {width: 900, height: 600, padding: 0, margin: 0, scrolling: 'no', autoSize: false, openEffect: 'none', closeEffect: 'none'});
	loadEpisodes(idc, timestamp);
}

unsafeWindow.showFilmLinks = function(idm, timestamp) {
    var data = '<div id="episodesContainer"></div>';
    $.fancybox(data, {width: 900, height: 600, padding: 0, margin: 0, scrolling: 'no', autoSize: false, openEffect: 'none', closeEffect: 'none'});
    loadFilmLinks(idm, timestamp);
}

/**
*	Mejoras de la interfaz 
**/
unsafeWindow.showComments = function(idepisode) {
    if ($('#comment-space').children().size() == 0) {
        slyComments.fetchComments('media_episode', '5-' + idepisode, 'newest');
    }
    $('#linksContainer').hide('slow');
    $('#addLinksContainer').hide('slow');
    $('#commentsContainer').show('slow');
}


unsafeWindow.showLinks = function() {
    $('#commentsContainer').hide('slow');
    $('#addLinksContainer').hide('slow');
    $('#linksContainer').show('slow');
}

unsafeWindow.add_video3 = function(idc, mediaType) {
	if ($('#addLinksContainer').children().size() == 0) {
        $('#addLinksContainer').load("/templates/media/add_video.php?idc=" + idc + '&mediaType=' + mediaType);
    }
    $('#commentsContainer').hide('slow');
    $('#linksContainer').hide('slow');
    $('#addLinksContainer').show('slow');
}

/**
*	Configuracion del usuario, TODO
*
**/

function addConfig(list, title, content) {
	var jList = list.find('ul');
	jList.append('<span class="titPrefe">' + title + '</span>');
	jList.append('<span class="float-right"><a href="javascript:void(0)" onclick="$(' + title.replace(' ', '_') +'_conf).toggle();" class="azul">Editar</a></span>');
	jList.append('<div id="' + title.replace(' ', '_') +'_conf" class="oculto">' + content + '</div>');
}

function buildConfigFancyBox() {
	var jOptions = $('<div id="perfilPreferenciasContainer"><div id="perfilPreferencias"><ul></ul></div></div>');
	addConfig(jOptions, 'Filtros generales', '<textarea rows="4" cols="50">'+ JSON.stringify(userConfig(), undefined, "\t") +'</textarea>');

	return jOptions;
}

function openConfigFancyBox() {
	//$.fancybox(buildConfigFancyBox(), {width:900, height:600, padding:0, margin:0, scrolling:'no', autoSize:false, openEffect:'none', closeEffect:'none'})
	alert('Proximamente ;)');
}

function createConfigFancyBox() {
	var toAdd = $('<a href="#" class="">unLymited</a>').click(openConfigFancyBox);
	$('#othersPopup').prepend(toAdd);
}



/**
*	Funciones que se ejecutan al inicio
**/
doLoginAuth();
createConfigFancyBox();
GM_registerMenuCommand("Clear All Data", clear_data, "c");
GM_registerMenuCommand("Clear Tokens", clear_tokens, "t");

// Comprueba el login mientras navegas por la pagina
$(document).on('click', 'a.ajaxSend', function (e) {
    doLoginAuth();
});