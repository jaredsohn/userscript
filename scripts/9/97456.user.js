// ==UserScript==
// @name           MiSeesmic - Custom Theme for Seesmic
// @description    Change colors and fonts in Seesmic Web App Twitter - Cambio de colores y fuentes del entorno Seesmic Web Twitter
// @include        http*://seesmic.com/web/*
// @date           20110622
// @version        1.23
// @author         Antonio Rguez. Capita
// @license        GPL GNU General Public License - http://www.gnu.org/copyleft/gpl.html  
// ==/UserScript==


(function() {

// ----------------------------------------------------------------------------------------------
//
//            Personaliza el entorno a tu gusto - Customize interface
//
// ----------------------------------------------------------------------------------------------
//     COLORES - COLORS
// ----------------------------------------------------------------------------------------------
//
// Tema blanco - White Theme
//
const b_color_texto = '#444'; // Text Color
const b_color_detalle = '#555'; // Detail Color
const b_color_usuario = '#008040'; // Username Color
const b_color_usuario_encima = '#ff8000'; // Username Color Hover
const b_color_enlace = '#0080c0'; // Link Color
const b_color_enlace_encima = '#ff0080'; // Link Color Hover

//
// Tema negro - Black Theme
//
const n_color_texto = '#ddd'; // Text Color
const n_color_detalle = '#bbb'; // Detail Color
const n_color_usuario = '#FFF2D5'; // Username Color
const n_color_usuario_encima = '#008040'; // Username Color Hover
const n_color_enlace = '#77d2ff'; // Link Color
const n_color_enlace_encima = '#ff0080'; // Link Color Hover 

// ----------------------------------------------------------------------------------------------
//     TAMAÑO LETRAS - FONT SIZE
// ----------------------------------------------------------------------------------------------
// Cambia al valor deseado, puedes usar decimales separando con punto no coma.
// Change value to desired size, including decimals values.
//
var letra_texto = 1.1; 
// ----------------------------------------------------------------------------------------------	

// ----------------------------------------------------------------------------------------------
//
//           Fin parámetros de personalización - End customs parameters
//
// ----------------------------------------------------------------------------------------------






// Parche para GNU/Linux
if (typeof(GM_addStyle)=='undefined') 
{
	function GM_addStyle(styles) {	
		var S = document.createElement('style');
		S.type = 'text/css';
		var T = ''+styles+'';
		T = document.createTextNode(T)
		S.appendChild(T);
		document.body.appendChild(S);
		return;
	}
}

function getCookie(c_name) {
var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
  		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  		x=x.replace(/^\s+|\s+$/g,"");
  		if (x==c_name)
  		{
    		return unescape(y);
  		}
 	}
}

var tema = getCookie("user_properties");

var temaCSS = ".timelineItem {background:url('https://sites.google.com/site/miseesmic/_/rsrc/1290689296107/home/fondo.gif') repeat-x scroll center bottom #fff !important;}\
.selectedMenuButton, .customTree .selectedTreeItem a {color:#fff !important;background:#517899 !important}\
.selectedMenuButton .menuLabel {color:#fff !important}";

var color_texto = b_color_texto;
var color_detalle = b_color_detalle;
var color_usuario = b_color_usuario;
var color_usuario_encima = b_color_usuario_encima;
var color_enlace = b_color_enlace;
var color_enlace_encima = b_color_enlace_encima;

if (tema != null)
{      
	if (tema.search(/black/i) >= 0)
	{
		temaCSS = ".tabMenuSelected, .tabMenuSelected div.gwt-HTML .tabItemButton {background:#bbb}\
.timelineItem {background:url('http://seesmic.com/web/theme/black/header.png') repeat-x scroll  #666 !important;}\
.selectedMenuButton, .customTree .selectedTreeItem a {color:#222 !important;background:#bbb !important}\
.selectedMenuButton .menuLabel {color:#222 !important}";

		color_texto = n_color_texto;
		color_detalle = n_color_detalle;
		color_usuario = n_color_usuario;
		color_usuario_encima = n_color_usuario_encima;
		color_enlace = n_color_enlace;
		color_enlace_encima = n_color_enlace_encima;
	}
} 

var miCSS = "*{font-family:Liberation Sans,Tahoma,Arial,Helvetica !important;}\
select, input, textarea, table.profileView td, .list_div, .conversationThreadTitle, .profileTooltipView, .profileTooltipViewTwitterUser, .profileTooltipViewLastTweet, table#user_infos tr td a, .timelineItem .content .body a, .gwt-HTML {font-size:"+letra_texto+"em !important;letter-spacing:0.01em !important}\
.timelineItem .content .body a {font-size:"+letra_texto+"em !important}\
.timelineItem a {color:"+color_enlace+" !important}\
.profileTooltipViewLastTweet div, .profileTooltipButton {font-size:"+(letra_texto-0.05)+"em !important; color:"+color_texto+"}\
.tabItemButtonContainer, .timelineItem .detailsRow .detailsLeft, .postBarIdleText, td.postBarButtons div {font-size:"+(letra_texto-0.15)+"em !important}\
.searchTextbox, .conversationThread .detailsRow .detailsLeft .inline {font-size:"+(letra_texto)+"em !important}\
.tabItem .gwt-HTML {font-size:1em !important;font-weight:bold !important}\
.timelineItem .detailsRow .detailsLeft {color:"+color_detalle+" !important;}\
.timelineItem .detailsRow .detailsLeft a {color:"+color_detalle+" !important;}\
.timelineItem .detailsRow .detailsLeft a:hover, .timelineItem .content .body a:hover {color:"+color_enlace_encima+" !important; }\
.timelineItem .content .body a.inlineTwitUsername {color:"+color_usuario+" !important}\
.timelineItem .content .body a.inlineTwitUsername:hover {color:"+color_usuario_encima+" !important}\
.timelineItem .detailsRight {background-color:transparent !important;}\
.timelineItem .detailsRight a {color:#00688a !important;text-decoration:none !important;text-shadow: none !important; font-size:"+(letra_texto+0.05)+"em !important}\
.iconMenu {margin:0 5px !important;}\
.iconMenuWithItems .iconMenuTolltip a {color:#c5f1fe !important;text-shadow:0 1px 1px #222 !important;font-size:"+(letra_texto+0.05)+"em !important}\
.timelineItem .detailsRight a:hover {color:#ffdd55 !important;background:#555;text-shadow:none !important}\
.timelineItem .content .bodyContainer {color:"+color_texto+" !important;}.tabItem{width:68px !important}\
.tabItemButton{width:64px !important;margin:3px 0 0 !important;}\
.notifierContainer {left:40% !important; margin-top:38px !important}\
div.menuLabel .gwt-HTML, div.customTree .gwt-HTML {font-size:"+(letra_texto+0.05)+"em !important;}\
.customTree .customTreeItem {font-size:"+(letra_texto+0.05)+"em !important}\
textarea.postBarTextarea {height:90px !important;font-size:"+(letra_texto+0.15)+"em !important}\
.inlineRecursive, .inlineRecursive span, .inlineRecursive div {font-size:"+letra_texto+"em !important;}\
.conversationThread .inlineRecursive, .conversationThread .inlineRecursive span, .conversationThread .inlineRecursive div, .conversationThread .timelineItem .detailsRow .detailsLeft div {color:"+color_texto+" !important}\
.userMenu .textFlow {display:none !important}\
.postBarContainer {margin-left: 9px !important;margin-top:3px !important}\
.itemBgReply {border-left: 5px solid #289D46 !important; width:99% !important}\
.customTreeHeader a:hover, .customTreeItem a:hover, .menuLabel a:hover {color:#fff !important; background:#289D46 !important}";

miCSS += temaCSS;

GM_addStyle(miCSS);

function ajustaMenu() {	
	var elemento = document.getElementById('appHeader'); 
	if (elemento != null) 
	{	
		elemento.style.background = 'none';	
		elemento.style.paddingTop = '0';	
		elemento.style.marginLeft = '60px';	
	}
 		
   elemento = document.getElementById('headerTabsPanel'); 
	if (elemento != null) 
	{ 
		elemento.style.marginTop = '-10px';
		elemento.style.marginBottom = '3px';					
	}

   elemento = document.getElementById('seesmicLogo'); 
	if (elemento != null) 
	{ 
		elemento.style.display = 'none';		
	}
	
	elemento = document.getElementById('headerTopPanel'); 
	if (elemento != null) 
	{		
		elemento.style.marginTop = '0';						
	}	
   

   elemento = document.getElementById('tabs'); 
	if (elemento != null) 
	{		
		elemento.style.marginTop = '-5px';			
	}	
   elemento = document.getElementById('refreshButton'); 
	if (elemento != null) 
	{		
		elemento.style.marginTop = '3px';			
	}	

   elemento = document.getElementById('searchBox'); 
	if (elemento != null) 
	{		
		elemento.style.marginTop = '10px';			
		elemento.style.marginLeft = '0';			
		elemento.style.marginRight = '-50px';			
		elemento.style.paddingLeft = '20px';					
	}	

	elemento = document.getElementById('headerPanel'); 
	if (elemento != null) 
	{
		elemento.parentNode.height = '38px'; 
		elemento.style.paddingLeft = '5px'; 
	   elemento.style.height = ''; 
	}
}

	setTimeout (ajustaMenu, 500);

})();
