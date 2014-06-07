// ==UserScript==
// @name           TravianSkins
// @namespace      Travian Skins
// @description    Allow skins for Travian T3.5
// @include        http://*.travian*.*/*.php*
// @exclude        http://*.travian*.*/hilfe.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/index.php*
// @exclude        http://*.travian*.*/anleitung.php*
// @exclude        http://*.travian*.*/impressum.php*
// @exclude        http://*.travian*.*/anmelden.php*
// @exclude        http://*.travian*.*/spielregeln.php*
// @exclude        http://*.travian*.*/links.php*
// @exclude        http://*.travian*.*/geschichte.php*
// @exclude        http://*.travian*.*/tutorial.php*
// @exclude        http://*.travian*.*/manual.php*
// @exclude        http://*.travian*.*/ajax.php*
// @exclude        http://*.travian*.*/ad/*
// @exclude        http://*.travian*.*/chat/*
// @exclude        http://forum.travian*.*
// @exclude        http://board.travian*.*
// @exclude        http://shop.travian*.*
// @exclude        http://*.travian*.*/activate.php*
// @exclude        http://*.travian*.*/support.php*
// @exclude        http://help.travian*.*/*log
// @exclude        *.css
// @exclude        *.js
// ==/UserScript==

	var skin = GM_getValue('travianskins', '');
	
	if( location.href.indexOf('spieler.php?s=4') != -1 ) 
	{
	GM_addStyle('#show_gp_activate_button {display:inline;}');
	var HTMLtext = '<table><thead><tr><th colspan="2">Travian Skins Settings</th></tr></thead>' +
	'<tbody><tr><td style="padding:10px 7px; font-size:12px;" colspan="2">' +
	'Like Travian doesn\'t release graphic packs yet, I have make this lil script for allow gps based on the beautiful <a href="http://www.travianskins.com">TravianSkins</a> site.<br />I\'m not the travianskins owner so don\'t ask me when gps will be released !<br /><br />Just copy the link at the bottom of the travianskins page and paste it here.<br />My favourite is <a href="http://www.travianskins.com/desolated/">http://www.travianskins.com/desolated/</a> :-D<br /><br />Best regards,<br />Marcus.' +
	'</td></tr><tr class="s7"><td>Path:</td>' +
'<td><input class="fm" id="gfx_path" name="gfx_path" type="text" value="'+ skin +'" size="50" maxlength="200"></td></tr>' +
'</tbody></table>' +
'<p><table cellspacing="0" cellpadding="0"><tr>' +
'<td style="width:100px; height:40px;" id="show_gp_logo"></td>' +
'<td style="width:300px; text-align:center">' +
'<input id="show_gp_activate_button" onclick="activeSettings()" class="std" style="font-size:16pt; height:24pt;" type="Submit" value="Activate">' +
'</td><td style="width:100px;"></td></tr></table></p>';

    var settingsDialog = document.createElement("div");
    settingsDialog.innerHTML = HTMLtext;
	var explain = document.getElementsByTagName("table");
    document.getElementById("content").replaceChild(settingsDialog, explain[0]);
	
	unsafeWindow.activeSettings = function() {
        var newURL = document.getElementById("gfx_path").value;
		window.setTimeout(GM_setValue, 0, 'travianskins', newURL);
        window.location.replace(window.location);
    };
	}
	
		
 //   GM_addStyle('@import "'+ skin +'unx.css";');
	
	for (i=1; i<=12; i++){
	GM_addStyle('div.village1 div.f'+ i +',div.map img.f'+ i +'{background-image:url('+ skin +'img/un/g/f'+ i +'.jpg) no-repeat;}');
	}
	for (i=5; i<=30; i++){
	GM_addStyle('img.g'+ i +'{background-image:url('+ skin +'img/un/g/g'+ i +'.gif);}');
	}
    GM_addStyle('div.village2 div.d2_0{background:url('+ skin +'img/un/g/bg0.jpg) no-repeat;}');
    GM_addStyle('div.village2 div.d2_1{background:url('+ skin +'img/un/g/bg1.jpg) no-repeat;}');
    GM_addStyle('div.village2 div.d2_11{background:url('+ skin +'img/un/g/bg11.jpg) no-repeat;}');
    GM_addStyle('div.village2 div.d2_12{background:url('+ skin +'img/un/g/bg12.jpg) no-repeat;}');
    GM_addStyle('div.village2 div#village_map img.iso{background-image:url('+ skin +'img/un/g/iso.gif);}');
	
	for (i=1; i<=12; i++){
    GM_addStyle('div.map img.w'+ i +'{background-image:url('+ skin +'img/un/m/w'+ i +'.jpg);}');
	}
    GM_addStyle('#map_content{background-image:url('+ skin +'img/un/m/map.jpg);background-position:2px -70px;}');
	for (i=0; i<=9; i++){
    GM_addStyle('#map_content .b0'+ i +'{background-image:url('+ skin +'img/un/m/d0'+ i +'.gif);}');
	}
	for (i=10; i<=35; i++){
    GM_addStyle('#map_content .b'+ i +'{background-image:url('+ skin +'img/un/m/d'+ i +'.gif);}');
	}
	for (i=0; i<=9; i++){
    GM_addStyle('#map_content .o'+ i +'{background-image:url('+ skin +'img/un/m/o'+ i +'.gif);}');
	}
	for (i=10; i<=12; i++){
    GM_addStyle('#map_content .o'+ i +'{background-image:url('+ skin +'img/un/m/o'+ i +'.gif);}');
	}
	for (i=0; i<=9; i++){
    GM_addStyle('#map_content .t'+ i +'{background-image:url('+ skin +'img/un/m/t'+ i +'.gif);}');
	}
	
    GM_addStyle('div#header{background-image:url('+ skin +'img/un/l/mw.gif);');
	for (i=1; i<=4; i++){
    GM_addStyle('a#n'+ i +' img{background-image:url('+ skin +'img/un/l/n'+ i +'.gif);}');
	}
	for (i=1; i<=4; i++){
    GM_addStyle('div.i'+ i +'{background-image:url('+ skin +'img/un/l/m'+ i +'.gif);}');
	}
    GM_addStyle('div#sleft a#logo img {background-image:url('+ skin +'img/en/a/travian0.gif);}');
    GM_addStyle('div#sleft a#logo img.logo_plus {background-image:url('+ skin +'img/en/a/travian1.gif);}');
    GM_addStyle('#btn_plus {background-image:url('+ skin +'img/en/a/plus.gif); background-position:0px -21px;}');

	for (i=1; i<=5; i++){
    GM_addStyle('img.r'+ i +'{background-image:url('+ skin +'img/un/r/'+ i +'.gif);background-position:0 0;}');
	}

	for (i=1; i<=60; i++){
    GM_addStyle('img.u'+ i +'{background-image:url('+ skin +'img/un/u/'+ i +'.gif);background-position:0 0;}');
	}

