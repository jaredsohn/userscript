// ==UserScript==
// @name			Battle Orders - MoD Albania
// @version			1.1.96
// @author			Llillo  & MeDzeLi
// @namespace		ealbania_mod
// @description		Plugin for display Battle Orders of Albania.
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require			http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include			http://*.erepublik.com/*
// @updateURL		http://userscripts.org/scripts/source/157793.meta.js
// @downloadURL		http://userscripts.org/scripts/source/157793.user.js
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
    $('head').append('<style type="text/css">#battle_listing .prio_ma em{color:#aa8f48}#battle_listing .prio_ma li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .prio_ma li .tank_img{background-position:left -14px}#battle_listing .prio_ma li a.county{background-position:left top}#battle_listing .prio_ma li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .prio_ma li a.county:hover{background-position:left top !important}#battle_listing .prio_ma li a{background-position:left -102px}#battle_listing .prio_ma li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .prio_ma li a:hover{background-position:left -136px}#battle_listing .prio_ma li a:hover span{background-position:right -136px}#battle_listing .prio_ma li a:active{background-position:left -170px}#battle_listing .prio_ma li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .prio_ma strong{color:#8a560c}#battle_listing .prio_ma small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_al em{color: #aa8f48;}#battle_listing .prio_al li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .prio_al li .tank_img{background-position: left -14px;}#battle_listing .prio_al li a.county{background-position:left top;}#battle_listing .prio_al li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .prio_al li a.county:hover{background-position: left top !important;}#battle_listing .prio_al li a{background-position:left -102px;}#battle_listing .prio_al li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .prio_al li a:hover{background-position:left -136px;}#battle_listing .prio_al li a:hover span{background-position:right -136px;}#battle_listing .prio_al li a:active{background-position:left -170px;}#battle_listing .prio_al li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .prio_al strong{color:#8a560c;}#battle_listing .prio_al small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_me em{color: #AEA944;}#battle_listing .prio_me li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .prio_me li .tank_img{background-position: left -14px;}#battle_listing .prio_me li a.county{background-position: left top;}#battle_listing .prio_me li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .prio_me li a.county:hover{background-position: left top !important;}#battle_listing .prio_me li a{background-position: left -102px;}#battle_listing .prio_me li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .prio_me li a:hover{background-position: left -136px;}#battle_listing .prio_me li a:hover span{background-position: right -136px;}#battle_listing .prio_me li a:active{background-position: left -170px;}#battle_listing .prio_me li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .prio_me strong{color: #8a560c;}#battle_listing .prio_me small{color: #b16a00;}</style>');
    $('head').append('<script type="text/javascript" src="/js/jquery.tipsy.1334921039.js"></script>');
    var imageHeader = 'http://img35.imageshack.us/img35/7835/9f855edc087942cc9e1434d.png';
    var orders = '<div id="mod_orders"><img src="'+ imageHeader + '" style="float: none; margin-top:-5px; margin-bottom:-2px" alt="Combat Priorities - MoD Albania (v1.1.95)"/></div>';
    $('#battle_listing').prepend(orders);
}
function footer() {
    var linkDiv = 'http://goo.gl/qMM6E';
    var orders = '<div class="rest"><a href="http://goo.gl/glysS" title="" target="_blank">Vendpunimi i Urdhërave</a><a href="' + linkDiv + '" title="" target="_blank">KANALI i KORDINIMEVE (CHAT)</a></div>';
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
    case 1: x = 'EXTREME'; break;
    case 2: x = 'HIGH'; break;
    case 3: x = 'MEDIUM'; break;
    case 4: x = 'LOW'; break;
    case 5: x = 'SAFE'; break;
    case 6: x = 'LOST'; break;
    case 7: x = 'DO NOT FIGHT'; break;
    default: x = 'XX';
    }    
	return x;
}
function infoprio(i) {
    var x = 'priority ' + i + ' not set';
    switch(i) {
        case 1: x = 'EXTREME: Kampanjë shum e rëndësishme, përdorni BAZOOKA dhe ENERGY BARS nqse muri është nën 52% ,  VINI RE : Kjo betejë duhet fituar'; break;
        case 2: x = 'HIGH: Kampanjë e rëndësishme. Ju duhet që të siguroheni që muri është mbi 52% në mënyrë që kjo betejë të sigurohet me fitore.'; break;
        case 3: x = 'MEDIUM: Kampanjë e prioriteteve të mesme, për ju mjafton që të harxhoni gjithë ENERGJINË që e keni nqse muri është nën 53%.'; break;
        case 4: x = 'LOW: Kampanjë e nivelit të ulët! Për këtë kampanjë shkrepni vetëm nqse e shihni të nevojshme , VINI RE: mos harxhoni ENERGY BARS dhe BAZOOKA , por harxhone energjinë nqse është e nevojsh,e'; break;
        case 5: x = 'SAFE: KAMPANJA tashmë është nën favorin tonë. Prandaj mos harxhoni asgjë për këtë betejë.'; break;
        case 6: x = 'LOST: Bëmë gjithqka që ishte e mundur, por kësaj radhe armiku u tregua i befasishëm , dhe është e pamundru fitorja. Prandaj mos luftoni në këtë kampanjë ne e humbëm atë !.'; break;
        case 7: x = 'DO NOT FIGHT: Mos luftoni në këtë kampnanjë ! ARSYEA: Strategji LUFTARAKE. Ne duhet humbur atë.'; break;
    default: x = 'priority ' + i + ' not defined in the complement';
    }    
	return x;
}
function battles() {
	var x = division();
    $.get('https://docs.google.com/document/d/1twG4GGUpwSSm6-Z3ACENL46hI9DyXFwGU2BYs13FgLw/preview?pli=1', function(data) {
		//alert('Prioritetet e Betejave');
        var prios = data.substring(data.indexOf('╠')+1, data.indexOf('╣')).split('|');
        //alert(prios[x]);
        var battles = prios[x].split(';');
        for (var i = 1; i < battles.length; i++) {
            if (battles[i] != "" && battles[i].length > 0) {
            	//alert(i + ":" + battles[i]);
            	//$(bats[i]).find('a.county').replaceWith("<strong>"+$(bats[i]).find('a.county span').text()+"</strong>");
				var ico = '<img id="info_' + nameprio(i) + '" original-title="' + infoprio(i) + '" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" style="position:relative;bottom: 5px;right: -5px;" alt="">';
                var _htmlBattles = '<h4>Priority : ' + nameprio2(i) + '</h4>' + ico + '<ul id="prio_' + nameprio(i) + '" class="prio_' + nameprio(i) + '"></ul>';
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