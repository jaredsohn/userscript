// ==UserScript==
// @name		TANKS4LIFE Battle Priorities
// @version		1.01
// @author		Fanaxidiel featuring Bort
// @namespace		*orders_T4L
// @description		Plugin to see Tanks4life orders.
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require		http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require		http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include		http://*.erepublik.com/*
// @updateURL		http://userscripts.org/scripts/source/159044.meta.js
// @downloadURL		http://userscripts.org/scripts/source/159044.user.js
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
    //var orders = '<h4>TANKS4LIFE Battle Priorities</h4><div id="mod_orders"></div>';
    $('head').append('<style type="text/css">#battle_listing .prio_ma em{color:#aa8f48}#battle_listing .prio_ma li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .prio_ma li .tank_img{background-position:left -14px}#battle_listing .prio_ma li a.county{background-position:left top}#battle_listing .prio_ma li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .prio_ma li a.county:hover{background-position:left top !important}#battle_listing .prio_ma li a{background-position:left -102px}#battle_listing .prio_ma li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .prio_ma li a:hover{background-position:left -136px}#battle_listing .prio_ma li a:hover span{background-position:right -136px}#battle_listing .prio_ma li a:active{background-position:left -170px}#battle_listing .prio_ma li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .prio_ma strong{color:#8a560c}#battle_listing .prio_ma small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_al em{color: #aa8f48;}#battle_listing .prio_al li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .prio_al li .tank_img{background-position: left -14px;}#battle_listing .prio_al li a.county{background-position:left top;}#battle_listing .prio_al li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .prio_al li a.county:hover{background-position: left top !important;}#battle_listing .prio_al li a{background-position:left -102px;}#battle_listing .prio_al li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .prio_al li a:hover{background-position:left -136px;}#battle_listing .prio_al li a:hover span{background-position:right -136px;}#battle_listing .prio_al li a:active{background-position:left -170px;}#battle_listing .prio_al li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .prio_al strong{color:#8a560c;}#battle_listing .prio_al small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_me em{color: #AEA944;}#battle_listing .prio_me li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .prio_me li .tank_img{background-position: left -14px;}#battle_listing .prio_me li a.county{background-position: left top;}#battle_listing .prio_me li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .prio_me li a.county:hover{background-position: left top !important;}#battle_listing .prio_me li a{background-position: left -102px;}#battle_listing .prio_me li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .prio_me li a:hover{background-position: left -136px;}#battle_listing .prio_me li a:hover span{background-position: right -136px;}#battle_listing .prio_me li a:active{background-position: left -170px;}#battle_listing .prio_me li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .prio_me strong{color: #8a560c;}#battle_listing .prio_me small{color: #b16a00;}</style>');
    $('head').append('<script type="text/javascript" src="/js/jquery.tipsy.1334921039.js"></script>');
    var imageHeader = 'http://i.imgur.com/LCufNop.jpg';
    var orders = '<div id="mod_orders"><img src="'+ imageHeader + '" style="float: none; margin-top:-5px; margin-bottom:-2px" alt="Prioridades de Combate - MoD eChile (v1.1.95)"/></div>';
    $('#battle_listing').prepend(orders);
}
function footer() {
	var x = division();
	var linkDiv = '';
    switch(x) {
    case 1: linkDiv = 'http://www.tanks4life.com/p/irc-live.html'; break;
    case 2: linkDiv = 'http://www.tanks4life.com/p/irc-live.html'; break;
    case 3: linkDiv = 'http://www.tanks4life.com/p/irc-live.html'; break;
    case 4: linkDiv = 'http://www.tanks4life.com/p/irc-live.html'; break;
    default: linkDiv = 'XX';
    }    
    var orders = '<div class="rest"><a href="http://www.tanks4life.com/p/engagement-rules.html" title="" target="_blank">Regole di Tanks4life</a><a href="' + linkDiv + '" title="" target="_blank">Entra in chat</a></div>';
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
    case 5: x = 'ov'; break;
    case 6: x = 'op'; break;
    case 7: x = 'no'; break;
    default: x = 'XX';
    }    
	return x;
}
function nameprio2(i) {
    var x = 'YY';
    switch(i) {
    case 1: x = 'MASSIMA'; break;
    case 2: x = 'ALTA'; break;
    case 3: x = 'MEDIA'; break;
    case 4: x = 'BASSA'; break;
    case 5: x = 'ORMAI VINTA'; break;
    case 6: x = 'ORMAI PERSA'; break;
    case 7: x = 'NON COMBATTERE QUI'; break;
    default: x = 'XX';
    }    
	return x;
}
function infoprio(i) {
    var x = 'priorità ' + i + ' non apposta';
    switch(i) {
        case 1: x = 'MASSIMA: Combatti al massimo delle tue potenzialità: è un ottima occasione per utilizzare risorse straordinarie come barrette, missili o bazooka.'; break;
        case 2: x = 'ALTA: Combatti qui a preferenza di altre battaglie: combatti al massimo delle tue potenzialità ma non sprecare risorse straordinarie.'; break;
        case 3: x = 'MEDIA: Combatti qui, ma non impiegare tutte le energie: conservane una parte abbondante per la prossima volta che potrai entrare in gioco e combattere.'; break;
        case 4: x = 'BASSA: Combatti qui solo se non puoi combattere in altre battaglie, trattenendo comunque il grosso delle energie in vista di campagne più importanti.'; break;
        case 5: x = 'ORMAI VINTA: Questa battaglia sembra già vinta: non combattere qui se non in caso che la situazione sia improvvisamente ribaltata.'; break;
        case 6: x = 'ORMAI PERSA: Questa battaglia sembra già vinta: non combattere qui se non in caso che la situazione sia improvvisamente ribaltata.'; break;
        case 7: x = 'NON COMBATTERE QUI: Non combattere per nessuna ragione in questa campagna: saresti di ostacolo e non di aiuto al tuo paese.'; break;
    default: x = 'priorità ' + i + ' non definita';
    }    
	return x;
}
function battles() {
	var x = division();
    $.get('https://docs.google.com/document/d/17a1rcDiECIexGXi9XOs5d2gC5QkwhVC5cZhOGPNTYxs/preview', function(data) {
		//alert('Prioridades Cargadas.');
        var prios = data.substring(data.indexOf('╠')+1, data.indexOf('╣')).split('|');
        //alert(prios[x]);
        var battles = prios[x].split(';');
        for (var i = 1; i < battles.length; i++) {
            if (battles[i] != "" && battles[i].length > 0) {
            	//alert(i + ":" + battles[i]);
            	//$(bats[i]).find('a.county').replaceWith("<strong>"+$(bats[i]).find('a.county span').text()+"</strong>");
				var ico = '<img id="info_' + nameprio(i) + '" original-title="' + infoprio(i) + '" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" style="position:relative;bottom: 5px;right: -5px;" alt="">';
                var _htmlBattles = '<h4>Importanza : ' + nameprio2(i) + '</h4>' + ico + '<ul id="prio_' + nameprio(i) + '" class="prio_' + nameprio(i) + '"></ul>';
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