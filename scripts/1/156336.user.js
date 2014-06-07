// ==UserScript==
// @name			MOD Ukraine - Prio
// @version			0.9
// @author			UkrFalcon, Zena Warrior
// @namespace	    ukr_mod_prio
// @grant
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require			http://hosting-files.googlecode.com/files/jquery.tipsy.js
// @include			/^http://(www|m)\.erepublik\.com/(en|uk)/?$/
// @updateURL		http://userscripts.org/scripts/source/156336.meta.js
// @downloadURL		http://userscripts.org/scripts/source/156336.user.js
// ==/UserScript==

function addHeaders() {
    // Styles.
    $('head').append('<style type="text/css">#battle_listing .mod_prio_5 em{color:#aa8f48}#battle_listing .mod_prio_5 li{border-color:#ffdc5d;background-color:#fff0c0}#battle_listing .mod_prio_5 li .tank_img{background-position:left -14px}#battle_listing .mod_prio_5 li a.county{background-position:left top}#battle_listing .mod_prio_5 li a.county span{background-color:#f5df99;color:#8a560c}#battle_listing .mod_prio_5 li a.county:hover{background-position:left top !important}#battle_listing .mod_prio_5 li a{background-position:left -102px}#battle_listing .mod_prio_5 li a span{background-position:right -102px;text-shadow:#a63301 0px -1px 0px}#battle_listing .mod_prio_5 li a:hover{background-position:left -136px}#battle_listing .mod_prio_5 li a:hover span{background-position:right -136px}#battle_listing .mod_prio_5 li a:active{background-position:left -170px}#battle_listing .mod_prio_5 li a:active span{color:#f49e9e;background-position:right -170px}#battle_listing .mod_prio_5 strong{color:#8a560c}#battle_listing .mod_prio_5 small{color:#b16a00}</style>');
    $('head').append('<style type="text/css">#battle_listing .mod_prio_4 em{color: #aa8f48;}#battle_listing .mod_prio_4 li{border-color: #ffdc5d;background-color: #fff0c0;}#battle_listing .mod_prio_4 li .tank_img{background-position: left -14px;}#battle_listing .mod_prio_4 li a.county{background-position:left top;}#battle_listing .mod_prio_4 li a.county span{background-color:#f5df99;color:#8a560c;}#battle_listing .mod_prio_4 li a.county:hover{background-position: left top !important;}#battle_listing .mod_prio_4 li a{background-position:left -102px;}#battle_listing .mod_prio_4 li a span{background-position: right -102px;text-shadow:#a63301 0px -1px 0px;}#battle_listing .mod_prio_4 li a:hover{background-position:left -136px;}#battle_listing .mod_prio_4 li a:hover span{background-position:right -136px;}#battle_listing .mod_prio_4 li a:active{background-position:left -170px;}#battle_listing .mod_prio_4 li a:active span{color:#f49e9e;background-position:right -170px;}#battle_listing .mod_prio_4 strong{color:#8a560c;}#battle_listing .mod_prio_4 small{color:#b16a00;}</style>');
    $('head').append('<style type="text/css">#battle_listing .mod_prio_3 em{color: #AEA944;}#battle_listing .mod_prio_3 li{border-color: #FEFA5F;background-color: #FFFEBF;}#battle_listing .mod_prio_3 li .tank_img{background-position: left -14px;}#battle_listing .mod_prio_3 li a.county{background-position: left top;}#battle_listing .mod_prio_3 li a.county span{background-color: #f5df99;color: #8a560c;}#battle_listing .mod_prio_3 li a.county:hover{background-position: left top !important;}#battle_listing .mod_prio_3 li a{background-position: left -102px;}#battle_listing .mod_prio_3 li a span{background-position: right -102px;text-shadow: #a63301 0px -1px 0px;}#battle_listing .mod_prio_3 li a:hover{background-position: left -136px;}#battle_listing .mod_prio_3 li a:hover span{background-position: right -136px;}#battle_listing .mod_prio_3 li a:active{background-position: left -170px;}#battle_listing .mod_prio_3 li a:active span{color: #f49e9e;background-position: right -170px;}#battle_listing .mod_prio_3 strong{color: #8a560c;}#battle_listing .mod_prio_3 small{color: #b16a00;}</style>');

    // Divs.
    $('#battle_listing').prepend('<div class="rest"><img src="http://3.firepic.org/3/images/2013-01/12/4ra6qr18e1p8.jpg" alt=""></div>');
    $('#battle_listing').prepend('<h4>Ukraine Ministry of Defence Orders</h4><div id="ua_mod_orders"></div>');
    $('#battle_listing').prepend('<div id="ua_mod_info" class="boxes"><h4>Ukraine Ministry of Defence Information</h4><div id="ua_mod_info_msg"></div></div>');
    $('#battle_listing').prepend('<div id="mod_orders"><img src="http://5.firepic.org/5/images/2013-01/12/uo4bfixiqnp9.jpg" style="float: none; margin-top:-5px; margin-bottom:-2px"/></div>');
}


function getDivision() {
    // Define player's military division by parsing out his level.
    var d = $('#large_sidebar div.user_level').text();
    var x;
    if (d > 36) { x = 4;}
    else if (d > 29) { x = 3; }
    else if (d > 24) { x = 2; }
    else { x = 1; }
    return x;
}


function getPrioPicture(i) {
    var x = '';
    switch(i) {
    	case 5: x = 'http://5.firepic.org/5/images/2012-12/27/d3frnfsjk6jp.jpg'; break;		// 5 stars.
    	case 4: x = 'http://5.firepic.org/5/images/2012-12/27/9c1s2fx78vly.jpg'; break;		// 4 stars.
    	case 3: x = 'http://5.firepic.org/5/images/2012-12/27/lqe41oz04aob.jpg'; break;		// 3 stars.
    	case 2: x = 'http://3.firepic.org/3/images/2012-12/27/gr3oga79xsqa.jpg'; break;		// 2 stars.
    	case 1: x = 'http://5.firepic.org/5/images/2012-12/27/al5buav0if5j.jpg'; break;		// 1 star.
    	case 0: x = 'http://3.firepic.org/3/images/2012-12/27/p5iwmbatb8rz.jpg'; break;		// Don't fight.
        default: x = '';
    }
    return x;
}


function getPrioHintText(i) {
    var x = '';
    switch(i) {
        case 5: x = '5 \u0437\u0456\u0440\u043e\u043a: \u0412\u043e\u044e\u0454\u043c\u043e \u0437\u0430 \u0440\u0430\u0445\u0443\u043d\u043e\u043a \u0445\u043f \u0437 \u0442\u0430\u043d\u043a\u0430\u043c\u0438 \u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0443 \u043a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c \u0440\u0430\u0437\u0456\u0432 \u0437\u0430 \u0431\u0438\u0442\u0432\u0443, \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0454\u043c\u043e \u0432\u0441\u0456 \u0431\u0430\u0442\u043e\u043d\u0447\u0438\u043a\u0438 \u0442\u0430 \u0431\u0430\u0437\u0443\u043a\u0438, \u044f\u043a\u0456 \u0454 \u0432 \u043d\u0430\u044f\u0432\u043d\u043e\u0441\u0442\u0456. \u0411\u0438\u0442\u0432\u0430 \u0454 \u043a\u0440\u0438\u0442\u0438\u0447\u043d\u043e\u0432\u0430\u0436\u043b\u0438\u0432\u043e\u044e!'; break;
        case 4: x = '4 \u0437\u0456\u0440\u043a\u0438: \u0412\u043e\u044e\u0454\u043c\u043e \u043b\u0438\u0448\u0435 \u0437\u0430 \u0440\u0430\u0445\u0443\u043d\u043e\u043a \u0445\u043f \u043f\u043e \u043c\u043e\u0436\u043b\u0438\u0432\u043e\u0441\u0442\u0456 \u0437 \u0442\u0430\u043d\u043a\u0430\u043c\u0438 \u043c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0443 \u0440\u0430\u0437 \u0437\u0430 \u0431\u0438\u0442\u0432\u0443. \u0411\u0438\u0442\u0432\u0430 \u043c\u0430\u0454 \u0441\u0442\u0440\u0430\u0442\u0435\u0433\u0456\u0447\u043d\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044f.'; break;
        case 3: x = '3 \u0437\u0456\u0440\u043a\u0438: \u0412\u043e\u044e\u0454\u043c\u043e \u043b\u0438\u0448\u0435 \u0437\u0430 \u0440\u0430\u0445\u0443\u043d\u043e\u043a \u0445\u043f \u0437\u0430 \u043c\u043e\u0436\u043b\u0438\u0432\u043e\u0441\u0442\u0456 \u0434\u0435\u043a\u0456\u043b\u044c\u043a\u0430 \u0440\u0430\u0437 \u0437\u0430 \u0431\u0438\u0442\u0432\u0443, \u0442\u0430\u043d\u043a\u0438 \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0454\u043c\u043e \u0437\u0430 \u0431\u0430\u0436\u0430\u043d\u043d\u044f\u043c.'; break
        case 2: x = '2 \u0437\u0456\u0440\u043a\u0438: \u0412\u043e\u044e\u0454\u043c\u043e \u043b\u0438\u0448\u0435 \u0437\u0430 \u0440\u0430\u0445\u0443\u043d\u043e\u043a \u0445\u043f, \u044f\u043a\u0435 \u0432\u0456\u0434\u043d\u043e\u0432\u043b\u044e\u0454\u0442\u044c\u0441\u044f \u0437\u0430 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u043e\u044e \u0457\u0436\u0456, \u0442\u0430\u043d\u043a\u0438 \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0454\u043c\u043e \u0437\u0430 \u0431\u0430\u0436\u0430\u043d\u043d\u044f\u043c \u0437 \u0442\u0440\u0435\u043d\u0443\u0432\u0430\u043b\u044c\u043d\u043e\u044e \u043c\u0435\u0442\u043e\u044e.'; break;
        case 0: x = '\u0412 \u0431\u0438\u0442\u0432\u0456 \u043d\u0435 \u0431\u0438\u0442\u0438 \u0432 \u0431\u0443\u0434\u044c-\u044f\u043a\u043e\u043c\u0443 \u0432\u0438\u043f\u0430\u0434\u043a\u0443, \u0446\u044e \u0431\u0438\u0442\u0432\u0443 \u043d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e \u043f\u0440\u043e\u0433\u0440\u0430\u0442\u0438.'; break;
        default: x = '';
    }
    return x;
}


function parsePrioDoc(data) {
    var prio='', info='';
    var division = getDivision();

    startIdx = data.indexOf('{--#');
    endIdx = data.indexOf('#--}');
    if (startIdx != -1 && endIdx != -1) {
        // Ugly way of handling newlines in HTML from Doc preview.
        var prioData = data.substring(startIdx + 4, endIdx).replace(/\\n/g, '~').split('~');

        // Parsing each string and converting text into info dictionary.
        for (var i=1; i<prioData.length; i++) {
            var x = $.trim(prioData[i]).split(':');
            if ($.trim(x[0]) == 'DIV'+division) {
                prio = x[1];
            } else if ($.trim(x[0]) == 'INFO') {
                info = x[1];
            }
        }
        prio = $.trim(prio);
        info = $.trim(info);
    }
    return {prio: $.trim(prio),
            info: $.trim(info)};
}



function updatePrio(prio) {
    if (prio != '') {
    	var battles = prio.split(' ');
        for (var i=0; i<battles.length; i++) {
            var x = battles[i].split('#', 2);
            var priority=$.trim(x[0]).length, battleId=$.trim(x[1]);

            // Add priority icons.
            var ico = '<img id="ico_prio_' + priority + '" title="" src="http://www.erepublik.com/images/modules/_icons/small_info_icon.png" style="position:relative;bottom: 5px;right: -5px;" a>';
            var _htmlBattles = '<div id="prio_container_'+priority+'"><h4><img src=" ' + getPrioPicture(priority) + '" alt="Prio Image"></h4>' + ico + '<ul id="mod_prio_' + priority + '" class="mod_prio_' + priority + '"></ul></div>';
            $('#ua_mod_orders').append(_htmlBattles);
            $('#ico_prio_' + priority).prop('title', getPrioHintText(priority));
            $('#ico_prio_' + priority).tipsy({title: 'title', gravity: $.fn.tipsy.autoNS});

            // Add actual links to battles.
            addBattle(priority, '#battle-'+battleId);
        }
    }
}


function addBattle(priority, battleId) {
    var prioId = '#mod_prio_'+priority;
    $(prioId).load('/en/military/campaigns {'+battleId+'}', function(response, status, xhr) {
        if (status == "success") {
            if ($(battleId).length == 0) {
                $('#prio_container_'+priority).remove();
            } else {
                $(prioId).find('strong').remove();
                $(prioId).find('div.tank_img').replaceWith('<small>vs</small>');
                $(prioId).find('div.tank_img').replaceWith('<small>vs</small>');
                $(prioId).find('a.county').replaceWith('<strong>'+$(battleId).find('a.county span').text()+'</strong>');
            }
        }
    });
}


function updateInfo(info) {
    info = $.trim(info);
    if (info != '') {
        $('#ua_mod_info_msg').html('</br><span style="font-size:11px;color: #7D7F81;">'+info+'</span>');
    } else {
        $('#ua_mod_info').remove();
    }
}


/*$(window).ready(function() {
    addHeaders();
    $.get('https://docs.google.com/document/d/1jyJ5IaLkDbTRBYrXv4iEtlTHoZXhh4J_pHNx6T5t5dk/preview?pli=1', function(data) {
        var parsedData = parsePrioDoc(data);
        updatePrio(parsedData.prio);
        updateInfo(parsedData.info);
	});
});*/

function modifyPage() {
    //jQuery is already defined by eRep, waits for it to load
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(LL_waiting, 100);
    } else {
        if(document.getElementById('homepage_feed') != null) {
            var _jquery = $;
            $ = unsafeWindow.jQuery;
            addHeaders();
            $.get('https://docs.google.com/document/d/1xNZepatEhEnsMNrOQYydQ-SzFiQQtnoalF94Gd4nlLg/preview?pli=1', function(data) {
                var parsedData = parsePrioDoc(data);
                updatePrio(parsedData.prio);
                updateInfo(parsedData.info);
            });
            $ = _jquery;
        }
    }
}

modifyPage();