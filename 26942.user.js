// ==UserScript==
// @name           OGame Galaxy AutoExplorer & One click moon spy 2010
// @namespace      OGame Galaxy AutoExplorer & One click moon spy 2010
// @description    Recorre la galaxia automáticamente exportando los datos al Galaxy Tool, espia lunas con un solo click, realizado para la nueva version v0.84 de Ogame.es .
// @include        http://*.ogame.com.es/game/index.php?page=galaxy&*
// ==/UserScript==

/*
*Version 1.3 r1
-Salto de galaxia desatendido

*Version 1.3
-Manejar el tiempo de salto entre los sistemas
-Manejar el numero de sondas a enviar cuando se espia una luna

*Version 1.2 r2
-Recorre las galaxia automaticamente
-Espia lunas con un clik


***Proxima Actualizacion***
-Recolectar con un click

By Minguez

*/

    var head, strJava;
 	head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
	script = document.createElement('script');
    strJava = "function setCookie(name, value){if(name != '')document.cookie = name + '=' + value;}function getCookie(name){if(name == '') return('');name_index = document.cookie.indexOf(name + '=');if(name_index == -1) return('');cookie_value =  document.cookie.substr(name_index + name.length + 1, document.cookie.length);end_of_cookie = cookie_value.indexOf(';');if(end_of_cookie != -1) cookie_value = cookie_value.substr(0, end_of_cookie);space = cookie_value.indexOf('+');while(space != -1){ cookie_value = cookie_value.substr(0, space) + ' ' + cookie_value.substr(space + 1, cookie_value.length);space = cookie_value.indexOf('+');}return(cookie_value);}function clearCookie(name){ expires = new Date();expires.setYear(expires.getYear() - 1);document.cookie = name + '=null' + '; expires=' + expires; 		 }function clearCookies(){Cookies = document.cookie;Cookie = Cookies;expires = new Date();expires.setYear(expires.getYear() - 1);while(Cookie.length > 0){Cookie = Cookies.substr(0, Cookies.indexOf(';'));Cookies = Cookies.substr(Cookies.indexOf(';') + 1, Cookies.length);if(Cookie != '')document.cookie = Cookie + '; expires=' + expires;elsedocument.cookie = Cookies + '; expires=' + expires;			  			  	  }		 		 }function NextSystem(){document.getElementById('auto').name = 'systemRight';document.getElementById('galaxy_form').submit();}function NextGalaxy(){var currentGalaxy = document.getElementsByName('galaxy')[0].value;if (currentGalaxy != '9'){bolNextGalaxy = confirm('Saltar a la siguiente Galaxia ?');if (bolNextGalaxy) {document.getElementsByName('galaxy')[0].value = ++currentGalaxy;document.getElementsByName('system')[0].value = 1;document.getElementById('galaxy_form').submit();}}}function activarScript(){setCookie('OGAEisAuto','1');NextSystem();}function desactivarScript(){setCookie('OGAEisAuto','');document.getElementById('galaxy_form').submit();}function overlib() {var strHTML = overlib.arguments[0];if (strHTML.indexOf('<font color=#808080')>0){pos1 = strHTML.indexOf('[')+1;pos2 = strHTML.indexOf(']')-pos1;coord = strHTML.substr(pos1,pos2);coord = coord.split(':');gal = coord[0];sis = coord[1];pla = coord[2];var oldHTML ='<font color=#808080 >Espiar</font>';var newHTML ='<a href=\"#\" onclick=\"OGAE_doit(' + gal + ', ' + sis + ', ' + pla + ')\">Espiar</a>';strHTML = strHTML.replace(oldHTML,newHTML);overlib.arguments[0] = strHTML;}if (!olLoaded || isExclusive(overlib.arguments)) return true;if (olCheckMouseCapture) olMouseCapture();if (over) {over = (typeof over.id != 'string') ? o3_frame.document.all['overDiv'] : over;cClick();}olHideDelay=0;o3_text=ol_text;o3_cap=ol_cap;o3_sticky=ol_sticky;o3_background=ol_background;o3_close=ol_close;o3_hpos=ol_hpos;o3_offsetx=ol_offsetx;o3_offsety=ol_offsety;o3_fgcolor=ol_fgcolor;o3_bgcolor=ol_bgcolor;o3_textcolor=ol_textcolor;o3_capcolor=ol_capcolor;o3_closecolor=ol_closecolor;o3_width=ol_width;o3_border=ol_border;o3_cellpad=ol_cellpad;o3_status=ol_status;o3_autostatus=ol_autostatus;o3_height=ol_height;o3_snapx=ol_snapx;o3_snapy=ol_snapy;o3_fixx=ol_fixx;o3_fixy=ol_fixy;o3_relx=ol_relx;o3_rely=ol_rely;o3_fgbackground=ol_fgbackground;o3_bgbackground=ol_bgbackground;o3_padxl=ol_padxl;o3_padxr=ol_padxr;o3_padyt=ol_padyt;o3_padyb=ol_padyb;o3_fullhtml=ol_fullhtml;o3_vpos=ol_vpos;o3_aboveheight=ol_aboveheight;o3_capicon=ol_capicon;o3_textfont=ol_textfont;o3_captionfont=ol_captionfont;o3_closefont=ol_closefont;o3_textsize=ol_textsize;o3_captionsize=ol_captionsize;o3_closesize=ol_closesize;o3_timeout=ol_timeout;o3_function=ol_function;o3_delay=ol_delay;o3_hauto=ol_hauto;o3_vauto=ol_vauto;o3_closeclick=ol_closeclick;o3_wrap=ol_wrap;o3_followmouse=ol_followmouse;o3_mouseoff=ol_mouseoff;o3_closetitle=ol_closetitle;o3_css=ol_css;o3_compatmode=ol_compatmode;o3_fgclass=ol_fgclass;o3_bgclass=ol_bgclass;o3_textfontclass=ol_textfontclass;o3_captionfontclass=ol_captionfontclass;o3_closefontclass=ol_closefontclass;setRunTimeVariables();fnRef = '';o3_frame = ol_frame;if(!(over=createDivContainer())) return false;parseTokens('o3_', overlib.arguments);if (!postParseChecks()) return false;if (o3_delay == 0) {return runHook(\"olMain\", FREPLACE);} else {o3_delayid = setTimeout(\"runHook('olMain', FREPLACE)\", o3_delay);return false;}}function OGAE_doit(g,s,p){doit(6, g, s, p, 3, OGAE_Probes);}function OGAE_save(){setCookie('OGAETime',parseInt(document.getElementsByName('OGAE_form_time')[0].value,10));setCookie('OGAEProbes',parseInt(document.getElementsByName('OGAE_form_probes')[0].value,10));document.getElementById('galaxy_form').submit();}";


function getCookie(name){
         if(name == '') return('');
         name_index = document.cookie.indexOf(name + '=');
         
         if(name_index == -1) return('');
         
         cookie_value =  document.cookie.substr(name_index + name.length + 1, document.cookie.length);
         
         end_of_cookie = cookie_value.indexOf(';');
         if(end_of_cookie != -1) cookie_value = cookie_value.substr(0, end_of_cookie);

         space = cookie_value.indexOf('+');
         while(space != -1){ 
              cookie_value = cookie_value.substr(0, space) + ' ' + 
              cookie_value.substr(space + 1, cookie_value.length);
							 
              space = cookie_value.indexOf('+');
         }
         return(cookie_value);
}

function NextSystem(){
	document.getElementById('auto').name = 'systemRight';
	document.getElementById('galaxy_form').submit();
}

function NextGalaxy(){
	var currentGalaxy = document.getElementsByName('galaxy')[0].value;
	if (currentGalaxy != '9'){
		//bolNextGalaxy = confirm('Saltar a la siguiente Galaxia ?');
		//if (bolNextGalaxy) {
			document.getElementsByName('galaxy')[0].value = ++currentGalaxy;
			document.getElementsByName('system')[0].value = 1;
			document.getElementById('galaxy_form').submit();
		//}
	}
}


function xpath(query) {
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var OGAE_isAuto = getCookie("OGAEisAuto");
var OGAE_Time_seg = getCookie("OGAETime");
var OGAE_Probes = getCookie("OGAEProbes");

if (OGAE_Time_seg==""){
	OGAE_Time=5000;
	OGAE_Time_seg = 5;
}else{
	OGAE_Time=OGAE_Time_seg*1000;	
}
if (OGAE_Probes==""){
	OGAE_Probes = "1";
}

var OGAE_divAction, OGAE_divText;

if (OGAE_isAuto=="1"){
	OGAE_divAction = "desactivarScript()";
	OGAE_divText = "Desactivar"
}else{
	OGAE_divAction = "activarScript()";
	OGAE_divText = "Activar"	
}

var my_width = 0;

if (typeof(window.innerWidth) == 'number'){
	my_width = window.innerWidth;
}else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)){
    my_width  = document.documentElement.clientWidth;
}else if (document.body && (document.body.clientWidth || document.body.clientHeight)){
	my_width  = document.body.clientWidth;
}
my_posX = my_width - 210;

strJava += "var OGAE_Probes = "+OGAE_Probes+";"
script.innerHTML = strJava;
head.appendChild(script);

var OGAE_new_div;
OGAE_new_div = "<div style='position:fixed;top:10px;left:"+my_posX+"px;z-index:999;border:solid white 1px;width:200px;padding:2px;'>";
OGAE_new_div += "OGame Galaxy AutoExplorer";
OGAE_new_div += "<br><br>";
OGAE_new_div += "Velocidad: <input type='text' size='2' maxlength='2' name='OGAE_form_time' value='"+OGAE_Time_seg+"' /> seg.<br>";
OGAE_new_div += "Sondas: <input type='text' size='2' maxlength='2' name='OGAE_form_probes' value='"+OGAE_Probes+"' /><br><a href='javascript:;' onclick='OGAE_save();'>Guardar</a>";
OGAE_new_div += "<br><br>";
OGAE_new_div += "<a href='javascript:;' onclick='"+OGAE_divAction+";'>"+OGAE_divText+"</a>";
OGAE_new_div += "</div>";

var newDiv = document.createElement("div");
newDiv.innerHTML = OGAE_new_div;
document.body.insertBefore(newDiv, document.body.firstChild);


//var OGAE_galaxy = xpath("//input[@name='galaxy']").snapshotItem(0).value;
//var OGAE_system = xpath("//input[@name='system']").snapshotItem(0).value;
var OGAE_galaxy = document.getElementsByName('galaxy')[0].value;
var OGAE_system = document.getElementsByName('system')[0].value;


if (OGAE_isAuto=="1"){
	if (OGAE_system != "499") { 
		setInterval(NextSystem,OGAE_Time);
	}else{
		setInterval(NextGalaxy,OGAE_Time); 
	}
}
