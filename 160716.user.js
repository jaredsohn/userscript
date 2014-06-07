// ==UserScript==
// @name		Lethal Force [Le.F.] Battle Orders
// @version		1.3312
// @author		Smokiie is back
// @namespace		*Lethal Force Battle Orders
// @description		Plugin to see Lethal Force Battle Orders.
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require        	http://malsup.github.com/jquery.blockUI.js
// @require		http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @require		http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @include		http://*.erepublik.com/*
// @updateURL		http://userscripts.org/scripts/source/160716.meta.js
// @downloadURL		http://userscripts.org/scripts/source/160716.user.js
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
    //var orders = '<h4>Lethal Force Battle Orders</h4><div id="mod_orders"></div>';
    $('head').append('<style type="text/css">#battle_listing .prio_ma em{color:#aa8f48}#battle_listing .prio_ma li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .prio_ma li .tank_img{background-position:left -14px}#battle_listing .prio_ma li a.county{background-position:left top}#battle_listing .prio_ma li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .prio_ma li a.county:hover{background-position:left top !important}#battle_listing .prio_ma li a{background-position:left -102px}#battle_listing .prio_ma li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .prio_ma li a:hover{background-position:left -136px}#battle_listing .prio_ma li a:hover span{background-position:right -136px}#battle_listing .prio_ma li a:active{background-position:left -170px}#battle_listing .prio_ma li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .prio_ma strong{color:#8a560c}#battle_listing .prio_ma small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_al em{color: #aa8f48;}#battle_listing .prio_al li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .prio_al li .tank_img{background-position: left -14px;}#battle_listing .prio_al li a.county{background-position:left top;}#battle_listing .prio_al li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .prio_al li a.county:hover{background-position: left top !important;}#battle_listing .prio_al li a{background-position:left -102px;}#battle_listing .prio_al li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .prio_al li a:hover{background-position:left -136px;}#battle_listing .prio_al li a:hover span{background-position:right -136px;}#battle_listing .prio_al li a:active{background-position:left -170px;}#battle_listing .prio_al li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .prio_al strong{color:#8a560c;}#battle_listing .prio_al small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .prio_me em{color: #AEA944;}#battle_listing .prio_me li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .prio_me li .tank_img{background-position: left -14px;}#battle_listing .prio_me li a.county{background-position: left top;}#battle_listing .prio_me li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .prio_me li a.county:hover{background-position: left top !important;}#battle_listing .prio_me li a{background-position: left -102px;}#battle_listing .prio_me li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .prio_me li a:hover{background-position: left -136px;}#battle_listing .prio_me li a:hover span{background-position: right -136px;}#battle_listing .prio_me li a:active{background-position: left -170px;}#battle_listing .prio_me li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .prio_me strong{color: #8a560c;}#battle_listing .prio_me small{color: #b16a00;}</style>');
    $('head').append('<script type="text/javascript" src="/js/jquery.tipsy.1334921039.js"></script>');
    var imageHeader = 'http://i50.tinypic.com/fb9o4j.png';
    var orders = '<div id="mod_orders"><img src="'+ imageHeader + '" style="float: none; margin-top:-5px; width:336px; height:160px; border:2px groove #000000; border-radius:10px; margin-bottom:-2px;" alt="Lethal Force battle orders"/></div>';  
    $('#battle_listing').prepend(orders);
}
function footer() {
	var x = division();
	var linkDiv = '';
    switch(x) {
    case 1: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23LeF.public&server=rizon.mibbit.org'; break;
    case 2: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23LeF.public&server=rizon.mibbit.org'; break;
    case 3: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23LeF.public&server=rizon.mibbit.org'; break;
    case 4: linkDiv = 'http://client00.chat.mibbit.com/?channel=%23LeF.public&server=rizon.mibbit.org'; break;
    default: linkDiv = 'XX';
    }    
    var orders = '<div class="rest"><a href="http://www.dinkypage.com/lef-damage/" title="" target="_blank">Submit damage</a><a href="'  + linkDiv + '<div class="rest"><a href="http://www.dinkypage.com/lef-new-members/" title="" target="_blank">Invitation Form</a><a href="'  + linkDiv + '" title="" target="_blank">Join chat for info</a><a href="'  + linkDiv + '<div class="rest"><a href="http://www.userscripts.org/scripts/source/160716.user.js" title="" target="_blank">Update</a><b>Always get more info (cc per mil, side etc) before you hit.</b></div>';
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
    case 1: x = 'HELL'; break;
    case 2: x = 'SUPERIOR'; break;
    case 3: x = 'GREAT'; break;
    case 4: x = 'FIRE UP'; break;
    case 5: x = 'NORMAL'; break;
    case 6: x = 'GLANCING'; break;
    case 7: x = 'ALL ALONE'; break;
    default: x = 'XX';
    }    
	return x;
}
function infoprio(i) {
    var x = 'priority ' + i + ' not set';
    switch(i) {
        case 1: x = 'HELL: Country has bought damage and must WIN AT ALL COSTS. We fight with food fights, candies, bombs and rockets from the beggining of each round.'; break;
        case 2: x = 'SUPERIOR: Country has bought damage and must WIN. We fight with food fights, candies and bombs from the beggining of each round.'; break;
        case 3: x = 'GREAT: Country has bought damage. We fight with food fights from the beggining of each round, and only if bar is under 52%. We keep damage for later rounds too, if bar is safe.'; break;
        case 4: x = 'FIRE UP: Country has bought damage. We fight with food fights from the beggining of each round, and only if bar is under 52%.'; break;
        case 5: x = 'NORMAL: Country has bought damage. We fight with food fights only after the first hour of each round, and only if bar is under 52%.'; break;
        case 6: x = 'GLANCING: Country is not buying damage right now, but it is possible to need damage soon. Do not fight yet.'; break;
        case 7: x = 'ALL ALONE: Country is not buying damage, but it is fighting all alone. We are obliged to help. If there is no other battle available please fight here.'; break;
    default: x = 'priority ' + i + ' not set';
    }    
	return x;
}
function battles() {
	var x = division();
    $.get('https://docs.google.com/document/d/1U2axOCfG4zQsaB-S0Za5vCXr5VLeTHgGar66BirrJ_4/preview', function(data) {
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