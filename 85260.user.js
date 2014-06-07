// ==UserScript==
// @name           The-West Envanter Boyutu
// @namespace      www.the-west.org
// @include        http://*.the-west.*
// @author         Knight
// @translator     JohnCooper
// @contributor    JohnCooper
// ==/UserScript==

/*
TWSmallInventPics

Copyright (c) by Knight
Veraenderung oder eigene Veroeffentlichung dieses Scripts erfordert
eine
Genehmigung des Autors. Weiterhin garantiert der Autor nach Veraenderung

nicht mehr die Funktionstuechtigkeit und haftet nicht fuer eventuell aufkommende Schaeden.

Fragen oder Fehler koennen im The West Forum gemeldet werden.

The West Forum - TWSmallInventPics: http://forum.the-west.de/showthread.php?t=30284

WICHTIG: Um im Forum einen Beitrag zu schreiben, ist eine Anmeldung nötig.
*/


// Preloader


small = new Image();
small.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/small.png";

small_off = new Image();
small_off.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/smallinv.png";

big = new Image();
big.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/big.png";
           http://i649.photobucket.com/albums/uu217/JohnCooperED/big-1.png
big_off = new Image();
big_off.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/biginv.png";

off = new Image();
off.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/off.png";

off_off = new Image();
off_off.src = "http://i649.photobucket.com/albums/uu217/JohnCooperED/offinv.png";


// SetCookie + GetCookie

function Set_Cookie( name, value, expires, path, domain, secure ) {
    var today = new Date();
    today.setTime( today.getTime() );

    if ( expires ) {
        expires = expires * 1000 * 60 * 60 * 24;
    }

    var expires_date = new Date( today.getTime() + (expires) );

    document.cookie = name + "=" +escape( value ) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
    ( ( path ) ? ";path=" + path : "" ) +
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

function Get_Cookie( check_name ) {
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false;

	for ( i = 0; i < a_all_cookies.length; i++ ){
		a_temp_cookie = a_all_cookies[i].split( '=' );

		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		if ( cookie_name == check_name ) {
			b_cookie_found = true;

			if ( a_temp_cookie.length > 1 ) {
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}


// MainScript

    var small = document.createElement('link');
        small.type = 'text/css';
        small.rel = 'stylesheet';
        small.href = 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/smallstyle.css';
        small.id = 'twsip_smallcss';
        document.getElementsByTagName('head')[0].appendChild(small);

    var big = document.createElement('link');
        big.type = 'text/css';
        big.rel = 'stylesheet';
        big.id = 'twsip_bigcss';
        big.href = 'http://twknight.bplaced.net/TW/TWSmallInventPics/css/bigstyle.css';

    var logo_twsip = document.createElement("div");
        logo_twsip.id="logo_twsip";
        logo_twsip.innerHTML='<a id="twsipButtonLink" href="#" onclick="twsip_settings_visible()" style="background: none; cursor: pointer; margin-left: 116px; margin-top: 195px; z-index: 10;"><img src="http://i649.photobucket.com/albums/uu217/JohnCooperED/setting.png" alt="TWSmallInventPics" title="TW Envanter Boyut Ayarları"</a>';
        document.getElementById('left_menu').appendChild(logo_twsip);

    var create_twsip_settings = document.createElement("div");
        create_twsip_settings.id="twsip_settings";
        create_twsip_settings.setAttribute('style', 'position: absolute; left: 50%; top: 0px; margin-left: -500px; width: 1000px; height: 600px; z-index: 899999;');

    var create_twsip_settings1 = document.createElement("div");
        create_twsip_settings1.id="twsip_settings_inner";
        create_twsip_settings1.setAttribute('style', 'background: url("http://the-west.de/images/messagebox/messagebox_bg.png") repeat scroll 0% 0%; overflow: hidden; position: absolute; width: 450px; height: 200px; margin-left: -225px; margin-top: -100px; top: 50%; left: 50%; color: rgb(0, 0, 0); z-index: 900000;');

    var create_twsip_settings2 = document.createElement("div");
        create_twsip_settings2.id="twsip_settings_textbox";
        create_twsip_settings2.setAttribute('style', 'padding: 15px 15px 60px; text-align: left;');

    var create_twsip_bordertop = document.createElement("div");
        create_twsip_bordertop.id="twsip_settings_bordertop";
        create_twsip_bordertop.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_bordertop.png") repeat-x scroll 0% 0%; width: 100%; height: 10px; left: 0px; top: 0px; position: absolute;');

    var create_twsip_borderbottom = document.createElement("div");
        create_twsip_borderbottom.id="twsip_settings_borderbottom";
        create_twsip_borderbottom.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_borderbottom.png") repeat-x scroll center bottom; width: 100%; height: 10px; left: 0px; bottom: 0px; position: absolute;');

    var create_twsip_borderleft = document.createElement("div");
        create_twsip_borderleft.id="twsip_settings_borderleft";
        create_twsip_borderleft.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_bordervertical.png") repeat-y scroll 0% 0%; width: 10px; height: 100%; left: 0px; top: 0px; position: absolute;');

    var create_twsip_borderright = document.createElement("div");
        create_twsip_borderright.id="twsip_settings_borderright";
        create_twsip_borderright.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_bordervertical.png") repeat-y scroll right center; width: 10px; height: 100%; right: 0px; top: 0px; position: absolute;');

    var create_twsip_cornerstop_lt = document.createElement("div");
        create_twsip_cornerstop_lt.id="twsip_settings_cornerstop";
        create_twsip_cornerstop_lt.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_cornerstop.png") no-repeat scroll 0% 0%; width: 20px; height: 10px; left: 0px; top: 0px; position: absolute;');

    var create_twsip_cornerstop_lb = document.createElement("div");
        create_twsip_cornerstop_lb.id="twsip_settings_cornerstop";
        create_twsip_cornerstop_lb.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_cornersbottom.png") no-repeat scroll left bottom; width: 20px; height: 10px; left: 0px; bottom: 0px; position: absolute;');

    var create_twsip_cornerstop_rt = document.createElement("div");
        create_twsip_cornerstop_rt.id="twsip_settings_cornerstop";
        create_twsip_cornerstop_rt.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_cornerstop.png") no-repeat scroll right top; width: 20px; height: 10px; right: 0px; top: 0px; position: absolute;');

    var create_twsip_cornerstop_rb = document.createElement("div");
        create_twsip_cornerstop_rb.id="twsip_settings_cornerstop";
        create_twsip_cornerstop_rb.setAttribute('style', 'background: url("http://i649.photobucket.com/albums/uu217/JohnCooperED/messagebox_cornersbottom.png") no-repeat scroll right bottom; width: 20px; height: 10px; right: 0px; bottom: 0px; position: absolute;');

    var create_twsip_settings_ueberschrift = document.createElement("h2");
        create_twsip_settings_ueberschrift.id="twsip_settings_ueberschrift";
        create_twsip_settings_ueberschrift.setAttribute('style', 'text-align: center; display: block; margin-bottom: 10px;');
        create_twsip_settings_ueberschrift.innerHTML='TW Envanter Boyut Ayarları<br/>';

    var create_twsip_settings_buttonsize_option = document.createElement("div");
        create_twsip_settings_buttonsize_option.id="twsip_settings_buttonsize";
        create_twsip_settings_buttonsize_option.innerHTML='Boyut Seçenekleri: <img src="http://i649.photobucket.com/albums/uu217/JohnCooperED/small.png" id="small" onclick="button_small()" style="cursor:pointer;"><img src="http://i649.photobucket.com/albums/uu217/JohnCooperED/biginv.png" id="big" style="margin-left: 10px; cursor:pointer;" onclick="button_big()"><img src="http://i649.photobucket.com/albums/uu217/JohnCooperED/offinv.png" id="normal" style="margin-left: 10px; cursor:pointer;" onclick="button_normal()">';

    var create_twsip_settings_close = document.createElement("div");
        create_twsip_settings_close.id="twsip_settings_close";
        create_twsip_settings_close.setAttribute('style', 'padding-bottom: 12px; position: absolute; bottom: 0px; left: 0px; text-align: center; width: 450px;');
        create_twsip_settings_close.innerHTML='<img onclick="location.reload()" src="http://i649.photobucket.com/albums/uu217/JohnCooperED/ok.png" style="cursor: pointer; margin: 8px;"/><img onclick="twsip_settings_invisible()" src="http://i649.photobucket.com/albums/uu217/JohnCooperED/cancel.png" style="cursor: pointer; margin: 8px;"/>';

/* ####################TODO#######################
   ###############################################
   ###############################################
   ##########Int-Vars sind nicht global###########
   ###############################################

function topS(eN) {
   var allDiv = document.getElementById('windows').childNodes;
   for(var i = 0; i = allDiv.length; i++) {
     if(eN = 'window_inventory') {
       if(allDiv[i].id = 'window_inventory') {
          allDiv[i].style.top = '75px';
          window.setInterval('topI("window_inventory")', 100);
          clearInterval(invent);
       }
     }

     if(eN = 'window_building_tailor_') {
       if(allDiv[i].id.indexOf('window_building_tailor_') != -1) {
          allDiv[i].style.top = '75px';
          window.setInterval('topI("window_inventory")', 100);
          clearInterval(invent);
       }
     }

     if(eN = 'window_building_gunsmith_') {
       if(allDiv[i].id.indexOf('window_building_gunsmith_') != -1) {
          allDiv[i].style.top = '75px';
          window.setInterval('topI("window_inventory")', 100);
          clearInterval(invent);
       }
     }

     if(eN = 'window_building_general_') {
       if(allDiv[i].id.indexOf('window_building_general_') != -1) {
          allDiv[i].style.top = '75px';
          window.setInterval('topI("window_inventory")', 100);
          clearInterval(invent);
       }
     }

     if(eN = 'window_fort_building_storage_') {
       if(allDiv[i].id.indexOf('window_fort_building_storage_') != -1) {
          allDiv[i].style.top = '75px';
          window.setInterval('topI("window_fort_building_storage_")', 100);
          clearInterval(invent);
       }
     }
   }
}

function topI(eN) {
   if(eN = 'window_inventory') {
      window.setInterval
*/

function checkForTWProNL() {
   if(typeof twpro_langname != 'undefined' && typeof twsortinvent == 'undefined' && Get_Cookie( 'TWSIP_buttonsize' ) != 'normal') {
           var inCSS = '#bag { height: 430px!important; } #twpro_clothingfilter { margin-top: 527px!important; left: 650px!important; } #window_inventory_content div[style = "position: absolute; margin-top: 390px; left: 520px;"] { margin-top: 523px!important; left: 677px!important; } #window_inventory_content div[style = "left: 20px; position: absolute; margin-top: 390px;"] { margin-top: 523px!important; }';
           var cssLink = document.createElement('style');
           cssLink.type = 'text/css';
           cssLink.innerHTML = inCSS;
           document.getElementsByTagName('head')[0].appendChild(cssLink);
    }
}

window.setTimeout('checkForTWProNL()', 1000);


if(Get_Cookie( 'TWSIP_buttonsize' ) == 'big') {
    if(document.getElementById('twsip_smallcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_smallcss'));
    }

    document.getElementsByTagName('head')[0].appendChild(big);

}

if(Get_Cookie( 'TWSIP_buttonsize' ) == 'normal') {
    if(document.getElementById('twsip_smallcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_smallcss'));
    }

    if(document.getElementById('twsip_bigcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_bigcss'));
    }
}

function checkForSetting() {
    if(Get_Cookie( 'TWSIP_buttonsize' ) == 'big') {
        document.getElementById('small').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/smallinv.png');
        document.getElementById('big').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/big.png');
        document.getElementById('normal').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/offinv.png');
    }

    if(Get_Cookie( 'TWSIP_buttonsize' ) == 'normal') {
        document.getElementById('small').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/smallinv.png');
        document.getElementById('big').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/biginv.png');
        document.getElementById('normal').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/off.png');
    }
}


    function twsip_settings_visible() {
         document.getElementById('left_top').appendChild(create_twsip_settings);
         document.getElementById('twsip_settings').appendChild(create_twsip_settings1);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_settings2);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_bordertop);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_borderbottom);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_borderleft);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_borderright);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_cornerstop_lt);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_cornerstop_lb);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_cornerstop_rt);
         document.getElementById('twsip_settings_inner').appendChild(create_twsip_cornerstop_rb);
         document.getElementById('twsip_settings_textbox').appendChild(create_twsip_settings_ueberschrift);
         document.getElementById('twsip_settings_textbox').appendChild(create_twsip_settings_buttonsize_option);
         document.getElementById('twsip_settings_textbox').appendChild(create_twsip_settings_close);
         if (navigator.cookieEnabled == false) {
             create_twsip_settings_buttonsize_option.innerHTML='Cookies m&uuml;ssen aktiviert sein!';
         }
	 Set_Cookie( 'TWSIP_visibility', 'visible', 365, '/', '', '' );

         checkForSetting();
    }

    function twsip_settings_invisible() {
         document.getElementById('left_top').removeChild(create_twsip_settings);
	 Set_Cookie( 'TWSIP_visibility', 'invisible', 365, '/', '', '' );
    }

function button_small() {
    document.getElementById('small').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/small.png');
    document.getElementById('big').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/biginv.png');
    document.getElementById('normal').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/offinv.png');

    Set_Cookie( 'TWSIP_buttonsize', 'small', 365, '/', '', '' );

    if(document.getElementById('twsip_bigcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_bigcss'));
    }
    document.getElementsByTagName('head')[0].appendChild(small);
}

function button_big() {
    document.getElementById('small').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/smallinv.png');
    document.getElementById('big').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/big.png');
    document.getElementById('normal').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/offinv.png');

    Set_Cookie( 'TWSIP_buttonsize', 'big', 365, '/', '', '' );

    if(document.getElementById('twsip_smallcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_smallcss'));
    }

    document.getElementsByTagName('head')[0].appendChild(big);
}

function button_normal() {
    document.getElementById('small').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/smallinv.png');
    document.getElementById('big').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/biginv.png');
    document.getElementById('normal').setAttribute('src', 'http://i649.photobucket.com/albums/uu217/JohnCooperED/off.png');

    Set_Cookie( 'TWSIP_buttonsize', 'normal', 365, '/', '', '' );

    if(document.getElementById('twsip_smallcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_smallcss'));
    }

    if(document.getElementById('twsip_bigcss')) {
       document.getElementsByTagName('head')[0].removeChild(document.getElementById('twsip_bigcss'));
    }
}