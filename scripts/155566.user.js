// ==UserScript==
// @name			Ordenes de Batalla - MoD eSpain
// @version			2.1
// @author			Wayfinarer
// @namespace		eSpain_mod
// @description		Plugin para visualizar las Ordenes de Batalla de eSpain.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include			http://*.erepublik.com/*
// @updateURL		http://userscripts.org/scripts/source/155566.meta.js
// @downloadURL		http://userscripts.org/scripts/source/155566.user.js
// ==/UserScript==
function LL_carga() {
	//jQuery is already defined by eRep, waits for it to load
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(LL_waiting, 100);
	}
	else {
		if(document.getElementById('homepage_feed') != null) {
            var _paso = $;
            $ = unsafeWindow.jQuery;
            header();
            battles();
            footer();
            $ = _paso;
		}
    }    
}
function header() {
    //$('head').append('<style type="text/css"></style>');
    //var orders = '<h4>Prioridades de eSpain (Beta v1.1)</h4><div id="mod_orders"></div>';
    $('head').append('<style type="text/css">#battle_listing .prio_ma em{color:#aa8f48}#battle_listing .prio_ma li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .prio_ma li .tank_img{background-position:left -14px}#battle_listing .prio_ma li a.county{background-position:left top}#battle_listing .prio_ma li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .prio_ma li a.county:hover{background-position:left top !important}#battle_listing .prio_ma li a{background-position:left -102px}#battle_listing .prio_ma li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .prio_ma li a:hover{background-position:left -136px}#battle_listing .prio_ma li a:hover span{background-position:right -136px}#battle_listing .prio_ma li a:active{background-position:left -170px}#battle_listing .prio_ma li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .prio_ma strong{color:#8a560c}#battle_listing .prio_ma small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_al em{color: #aa8f48;}#battle_listing .prio_al li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .prio_al li .tank_img{background-position: left -14px;}#battle_listing .prio_al li a.county{background-position:left top;}#battle_listing .prio_al li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .prio_al li a.county:hover{background-position: left top !important;}#battle_listing .prio_al li a{background-position:left -102px;}#battle_listing .prio_al li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .prio_al li a:hover{background-position:left -136px;}#battle_listing .prio_al li a:hover span{background-position:right -136px;}#battle_listing .prio_al li a:active{background-position:left -170px;}#battle_listing .prio_al li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .prio_al strong{color:#8a560c;}#battle_listing .prio_al small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_me em{color: #AEA944;}#battle_listing .prio_me li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .prio_me li .tank_img{background-position: left -14px;}#battle_listing .prio_me li a.county{background-position: left top;}#battle_listing .prio_me li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .prio_me li a.county:hover{background-position: left top !important;}#battle_listing .prio_me li a{background-position: left -102px;}#battle_listing .prio_me li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .prio_me li a:hover{background-position: left -136px;}#battle_listing .prio_me li a:hover span{background-position: right -136px;}#battle_listing .prio_me li a:active{background-position: left -170px;}#battle_listing .prio_me li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .prio_me strong{color: #8a560c;}#battle_listing .prio_me small{color: #b16a00;}</style>');
    $('head').append('<script type="text/javascript" src="/js/jquery.tipsy.1334921039.js"></script>');
    // var imageHeader = 'http://img835.imageshack.us/img835/333/scriptfary.jpg';
    var orders = '<div id="mod_orders"></div>';
    $('#battle_listing').prepend(orders);
}
function footer() {
	var x = division();
	var linkDiv = '';
    switch(x) {
    case 1: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23IAN-militar&server=rizon.mibbit.org'; break;
    case 2: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23IAN-militar&server=rizon.mibbit.org'; break;
    case 3: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23Defensa&server=rizon.mibbit.org'; break;
    case 4: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23Defensa&server=rizon.mibbit.org'; break;
    default: linkDiv = 'XX';
    }    
    var orders = '<div class="rest"><a href="http://goo.gl/dQSnr" title="" target="_blank">Planilla Ordenes Militares</a><a href="' + linkDiv + '" title="" target="_blank">Canal de Coordinación</a></div>';
    $(orders).insertAfter('#mod_orders');
}
function division() {
    var div = $('#large_sidebar div.user_level').text();
    var x=-1;
    if (div > 36) { x=4;}
    else if (div > 29) { x=3; }
    else if (div > 24) { x=2; }
    else if (div > 0) { x=1; }
	else x=0;
    return x;
}
function nameprio(i) {
    var x = 'YY';
    switch(i) {
    case 1: x = 'ma'; break;
    case 2: x = 'al'; break;
    case 3: x = 'me'; break;
    case 4: x = 'ba'; break;
    case 5: x = 'se'; break;
    case 6: x = 'pe'; break;
    case 7: x = 'no'; break;
    default: x = 'XX';
    }    
	return x;
}
function nameprio2(i) {
    var x = 'YY';
    switch(i) {
    case 1: x = 'MAXIMA'; break;
    case 2: x = 'ALTA'; break;
    case 3: x = 'MEDIA'; break;
    case 4: x = 'BAJA'; break;
    case 5: x = 'SEGURA'; break;
    case 6: x = 'PERDIDA'; break;
    case 7: x = 'NO LUCHAR'; break;
    default: x = 'XX';
    }    
	return x;
}
function infoprio(i) {
    var x = 'prioridad ' + i + ' no seteada';
    switch(i) {
        case 1: x = 'MAXIMA: Campaña prioritaria y/o muy complicada de cerrar. Se requiere que el porcentaje de dominio (barra), en todas las batallas, esté entre 52% y 55% para asegurar su victoria.'; break;
        case 2: x = 'ALTA: Campaña complicada de cerrar. Se requiere que el porcentaje de dominio (barra), en todas las batallas, esté entre 52% y 55% para asegurar su victoria.'; break;
        case 3: x = 'MEDIA: Campaña de mediana prioridad. Se requiere que el porcentaje de dominio (barra), en todas las batallas, esté entre 51% y 53% para asegurar su victoria.'; break;
        case 4: x = 'BAJA: Campaña avanzada en puntaje a favor o se requiere un mínimo de daño para su victoria. Vigilar y combatir SOLO si las prioridades mayores están muy controladas (barras de las otras batallas sobre 52%).'; break;
        case 5: x = 'SEGURA: Campaña muy avanzada en puntaje a favor. IMPORTANTE: muchas veces se necesita NO LUCHAR para retrasar el cierre de la campaña, por asuntos estratégicos. NO LUCHES en esta campaña. Otra división tiene la misión cerrarla.'; break;
        case 6: x = 'PERDIDA: A pesar de todo el esfuerzo y lucha de nuestras tropas y aliados no es posible ganar esta campaña. NO LUCHES en esta campaña, la perdimos.'; break;
        case 7: x = 'NO LUCHAR: Se necesita perder la campaña por asuntos estratégicos. NO LUCHES en esta campaña, debemos perderla.'; break;
    default: x = 'prioridad ' + i + ' no definida en el complemento';
    }    
	return x;
}
function battles() {
	var x = division();
    $.get('https://docs.google.com/spreadsheet/pub?key=0At0MCGxYZF_LdFFVUFhLVFExS01Fd0xORjRUZ0JId2c&single=true&gid=2&range=b13&output=txt', function(data) {
		//alert('Load was performed.');
        var prios = data.substring(data.indexOf('╠')+1, data.indexOf('╣')).split('|');
        //alert(prios[x]);
        var battles = prios[x].split(';');
        for (var i = 1; i < battles.length; i++) {
            if (battles[i] != "" && battles[i].length > 0) {
            	//alert(i + ":" + battles[i]);
            	//$(bats[i]).find('a.county').replaceWith("<strong>"+$(bats[i]).find('a.county span').text()+"</strong>");
				var ico = '<img id="info_' + nameprio(i) + '" original-title="' + infoprio(i) + '" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" style="position:relative;bottom: 5px;right: -5px;" alt="">';
                var _htmlBattles = '<h4>Prioridad : ' + nameprio2(i) + '</h4>' + ico + '<ul id="prio_' + nameprio(i) + '" class="prio_' + nameprio(i) + '"></ul>';
            	$('#mod_orders').append(_htmlBattles);
                $('#info_' + nameprio(i)).tipsy({gravity: $.fn.tipsy.autoNS});

            	battle('#prio_' + nameprio(i), battles[i]);
            }
        }
    });
}
function battle(prio, battles) {
    $(prio).load("/en/military/campaigns {"+battles.substring(0,battles.length - 1)+"}", function(response, status, xhr) {
        if (status == "success") {
            $(prio).find('strong').remove(); 
            $(prio).find('div.tank_img').replaceWith('<small>vs</small>');
            $(prio).find('div.tank_img').replaceWith('<small>vs</small>');
            //$(prio).find('li').css("style",_sr1);
            //$(prio).find('li a.county').replaceWith($(prio).find('li a.county  span'));
			var bats = battles.split(',');
            for (var i = 0; i < bats.length; i++) {
                //alert(bats[i]);
                $(bats[i]).find('a.county').replaceWith("<strong>"+$(bats[i]).find('a.county span').text()+"</strong>");
            }
        }
    });
}
LL_carga();