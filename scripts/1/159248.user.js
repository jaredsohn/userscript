// ==UserScript==
// @name		eNL Orders
// @version		1.01
// @author		Fanaxidiel featuring Bort
// @namespace		*orders_eNL
// @description		Plugin to see eNL MoD orders.
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require		http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require		http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include		http://*.erepublik.com/*
// @updateURL		http://userscripts.org/scripts/source/159248.meta.js
// @downloadURL		http://userscripts.org/scripts/source/159248.user.js
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
    //var orders = '<h4>eNL MoD Orders</h4><div id="mod_orders"></div>';
    $('head').append('<style type="text/css">#battle_listing .prio_ma em{color:#aa8f48}#battle_listing .prio_ma li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .prio_ma li .tank_img{background-position:left -14px}#battle_listing .prio_ma li a.county{background-position:left top}#battle_listing .prio_ma li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .prio_ma li a.county:hover{background-position:left top !important}#battle_listing .prio_ma li a{background-position:left -102px}#battle_listing .prio_ma li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .prio_ma li a:hover{background-position:left -136px}#battle_listing .prio_ma li a:hover span{background-position:right -136px}#battle_listing .prio_ma li a:active{background-position:left -170px}#battle_listing .prio_ma li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .prio_ma strong{color:#8a560c}#battle_listing .prio_ma small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_al em{color: #aa8f48;}#battle_listing .prio_al li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .prio_al li .tank_img{background-position: left -14px;}#battle_listing .prio_al li a.county{background-position:left top;}#battle_listing .prio_al li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .prio_al li a.county:hover{background-position: left top !important;}#battle_listing .prio_al li a{background-position:left -102px;}#battle_listing .prio_al li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .prio_al li a:hover{background-position:left -136px;}#battle_listing .prio_al li a:hover span{background-position:right -136px;}#battle_listing .prio_al li a:active{background-position:left -170px;}#battle_listing .prio_al li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .prio_al strong{color:#8a560c;}#battle_listing .prio_al small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_me em{color: #AEA944;}#battle_listing .prio_me li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .prio_me li .tank_img{background-position: left -14px;}#battle_listing .prio_me li a.county{background-position: left top;}#battle_listing .prio_me li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .prio_me li a.county:hover{background-position: left top !important;}#battle_listing .prio_me li a{background-position: left -102px;}#battle_listing .prio_me li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .prio_me li a:hover{background-position: left -136px;}#battle_listing .prio_me li a:hover span{background-position: right -136px;}#battle_listing .prio_me li a:active{background-position: left -170px;}#battle_listing .prio_me li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .prio_me strong{color: #8a560c;}#battle_listing .prio_me small{color: #b16a00;}</style>');
    $('head').append('<script type="text/javascript" src="/js/jquery.tipsy.1334921039.js"></script>');
    var imageHeader = 'http://i.imgur.com/N3Eg66n.png';
    var orders = '<div id="mod_orders"><img src="'+ imageHeader + '" style="float: none; margin-top:-5px; margin-bottom:-2px" alt="Tanks4life battle orders"/></div>';
    $('#battle_listing').prepend(orders);
}
function footer() {
	var x = division();
	var linkDiv = '';
    switch(x) {
    case 1: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23eUNL&server=rizon.mibbit.org'; break;
    case 2: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23eUNL&server=rizon.mibbit.org'; break;
    case 3: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23eUNL&server=rizon.mibbit.org'; break;
    case 4: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23eUNL&server=rizon.mibbit.org'; break;
    default: linkDiv = 'XX';
    }    
    var orders = '<div class="rest"><a href="http://enetherlands.nl" title="" target="_blank">Our Forum</a><a href="' + linkDiv + '" title="" target="_blank">Our chat</a></div>';
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
    case 5: x = 'de'; break;
    case 6: x = 'op'; break;
    case 7: x = 'no'; break;
    default: x = 'XX';
    }    
	return x;
}
function nameprio2(i) {
    var x = 'YY';
    switch(i) {
    case 1: x = 'MPP'; break;
    case 2: x = 'RW'; break;
    case 3: x = 'MEDIUM'; break;
    case 4: x = 'LOW'; break;
    case 5: x = 'ALREADY WON'; break;
    case 6: x = 'ALREADY LOST'; break;
    case 7: x = 'NO FIGHT'; break;
    default: x = 'XX';
    }    
	return x;
}
function infoprio(i) {
    var x = 'priority ' + i + ' not set';
    switch(i) {
        case 1: x = 'MPP: This battle can be fought from an allied country.'; break;
        case 2: x = 'RW: To join this battle move to the occupying country.'; break;
        case 3: x = 'MEDIUM: Fight here, but try to save some energy for the next time you log in the game.'; break;
        case 4: x = 'LOW: Fight here if you can not join some more important battle.'; break;
        case 5: x = 'ALREADY WON: This battle seems to be already won so avoid to fight here unless things radically change.'; break;
        case 6: x = 'ALREADY LOST: This battle seems to be already lost so avoid to fight here unless things radically change.'; break;
        case 7: x = 'NO FIGHT: Avoid to fight here: that would probably cause more harm than help.'; break;
    default: x = 'priority ' + i + ' not set';
    }    
	return x;
}
function battles() {
	var x = division();
    $.get('https://docs.google.com/document/d/1ZT_dRBwf7Rt9Xov6TlL8820HKcppfzR0iIJn9AJpAyE/preview', function(data) {
		//alert('Prioridades Cargadas.');
        var prios = data.substring(data.indexOf('╠')+1, data.indexOf('╣')).split('|');
        //alert(prios[x]);
        var battles = prios[x].split(';');
        for (var i = 1; i < battles.length; i++) {
            if (battles[i] != "" && battles[i].length > 0) {
            	//alert(i + ":" + battles[i]);
            	//$(bats[i]).find('a.county').replaceWith("<strong>"+$(bats[i]).find('a.county span').text()+"</strong>");
				var ico = '<img id="info_' + nameprio(i) + '" original-title="' + infoprio(i) + '" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" style="position:relative;bottom: 5px;right: -5px;" alt="">';
                var _htmlBattles = '<h4>Prio Level : ' + nameprio2(i) + '</h4>' + ico + '<ul id="prio_' + nameprio(i) + '" class="prio_' + nameprio(i) + '"></ul>';
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