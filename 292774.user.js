// Anti "Cookies Warning"
// version 0.1 ALFA!
// 2014-01-14
// Released under the GPL License
// http://www.gnu.org/copyleft/gpl.html
// 
// --------------------------------------------------------------------
//
// This is Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Anti "Cookies Warning"", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		 Anti "Cookies Warning"
// @namespace	 http://diveintogreasemonkey.org/download/
// @description Disable the "cookies warning" (for the EU law) without accepting cookies. Alfa version, more sites soported soon.
// @include *
// @exclude http://diveintogreasemonkey.org/*
// @exclude http://www.diveintogreasemonkey.org/*
// @grant       none
// ==/UserScript==

//orange.es
if(document.getElementById("oH_cookie")!=null)
    setInterval(function(){document.getElementById("oH_cookie").style.display='none'},200);

//elcorteingles.es
setInterval(function(){if(document.getElementsByClassName("cookies-policy")!=null){ var strMessage1 = document.getElementsByClassName("cookies-policy")[0] ; strMessage1.outerHTML = ''; }},1200);

//avis.es
setInterval(function(){if(document.getElementsByClassName("cookieconsent-dialog")!=null){ var strMessage1 = document.getElementsByClassName("cookieconsent-dialog")[0] ; strMessage1.outerHTML = ''; }},200);

//sareb.es
setInterval(function(){if(document.getElementsByClassName("cookies_contenedor")!=null){ var strMessage1 = document.getElementsByClassName("cookies_contenedor")[0] ; strMessage1.outerHTML = ''; }},200);

//eldiario.es
setInterval(function(){document.getElementById("headerCookiesAdvice").style.display='none'},100);

//jazztel.com
setInterval(function(){document.getElementById("cookies").style.display='none'},100);


//elperiodico.com
setInterval(function(){document.getElementById("msg-cookie").style.display='none'},100);

//bicing.cat
setInterval(function(){document.getElementById("cookie_bar").style.display='none'},100);

//google.es
setInterval(function(){document.getElementById("epbar").style.display='none'},100);

//randstat.com
setInterval(function(){document.getElementById("layer_cookie").style.display='none'},100);

//alcampo.com
setInterval(function(){document.getElementById("cc-notification").style.display='none'},100);


//ono.es
setInterval(function(){document.getElementById("cookies-layer").style.display='none'},100);

//meteo.cat
setInterval(function(){document.getElementById("alert_cookie").style.display='none'},100);

//mundoteam.com
setInterval(function(){document.getElementById("hi-eu-opt-in").style.display='none'},100);

//elpais.com
setInterval(function(){document.getElementById("capaAvisoPoliticaCookies_superior_mensajes").style.display='none'},100);


//atrapalo.com
setInterval(function(){document.getElementById("cookiesInfo").style.display='none'},100);

//publico.es
if(document.getElementById("avisocookies")!=null)
    setInterval(function(){document.getElementById("avisocookies").style.display='none'},100);


//burbuja.info
if(document.getElementById("cookie_assistant_container")!=null)
    document.getElementById("cookie_assistant_container").style.visibility='hidden';

//andorranojoyeria.com
if(document.getElementById("ca_banner")!=null)
    setInterval(function(){document.getElementById("ca_banner").style.display='none'},1200);

//cotizalia.com
setInterval(function(){$('#cookie_msn').slideUp({duration:800,complete:function(){$(this).remove();},easing:'easeInOutBack'})},1200);


//elmundo.es
if(document.getElementById("privacyPolicyLayer")!=null)
    setInterval(function(){document.getElementById("privacyPolicyLayer").style.display='none'},100);

//lavanguardia.com
setInterval(function(){GGCookies.hideCookiesBox()},200);

//heraldo.es
setInterval(function(){quitarAvisoCookies()},200);

//gsmspain.com
if(document.getElementsByName("form1")!=null && (document.getElementsByName("form1")[0].innerHTML).indexOf('left:50%;margin-left:-456px; font-size: 14px; background: none repeat scroll 0 0 rgba(191, 227, 210, 1); border: 2px solid rgba(0, 146, 94, 1); border-radius: 6px 6px 6px 6px; bottom: 10px; padding: 10px 15px; position: fixed; width: 867px; z-index: 1000')!=-1)
{ 
    var strMessage1 = document.getElementsByName("form1")[0] ;
    strMessage1.innerHTML = '';
}




