// ==UserScript==
// @name       Futmondo Anti-Spy
// @namespace  http://userscripts.org/scripts/show/152130
// @version    0.2
// @description  Script que implementa una nueva funcionalidad a Futmondo, que es la de poder ocultar/mostrar datos sensibles, que por estrategía no te interesa que otros puedan ver en tu pantalla.
// @match      http://www.futmondo.com/*
// @copyright  Víctor Mundet
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==
//Ocultamos por defecto los bloques implicados
GM_addStyle(".communityMenuHidden .budget { display:none; }");
GM_addStyle(".communityMenuHidden .offers { display:none; }");
GM_addStyle(".communityMenuHidden .balance { display:none; }");
GM_addStyle(".communityMarketHidden .icoOffer { display:none; }");
$('#communityMenu').addClass('communityMenuHidden');
$('#marketPlayers').addClass('communityMarketHidden');
//Añadimos los estilos para los botones de Ocultar y de Mostrar los bloques anteriores
GM_addStyle(".buttonSaveEstado { position: absolute !important; top: 175px !important; left: 102px !important; width:16px; height:16px; background-color: rgba(62, 87, 6, 1); }");
GM_addStyle(".buttonSaveEstado:hover { opacity:0.8; }");
GM_addStyle(".menuHiddenMostrar, .menuHiddenOcultar { position:absolute !important; top: 176px !important; margin-left: 9px !important; -webkit-background-clip: border-box;-webkit-background-origin: padding-box;-webkit-background-size: auto;-webkit-box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px 0px inset;-webkit-transition-delay: 0s;-webkit-transition-duration: 0.15000000596046448s;-webkit-transition-property: all;-webkit-transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);background-attachment: scroll;background-clip: border-box;background-color: transparent;background-image: -webkit-linear-gradient(top, rgba(165, 205, 78, 1) 0%, rgba(107, 143, 26, 1) 100%);background-origin: padding-box;background-size: auto;border-bottom-left-radius: 2px;border-bottom-right-radius: 2px;border-top-left-radius: 2px;border-top-right-radius: 2px;box-shadow: rgba(0, 0, 0, 0.8) 0px 0px 3px 0px inset;color: rgba(62, 87, 6, 1);cursor: pointer;display: block;float: left;font-family: Ubuntu, 'Trebuchet MS';font-size: 11px;height: 12px;list-style-type: disc;margin-bottom: 0px;margin-left: 2px;margin-right: 2px;margin-top: 0px;padding-bottom: 2px;padding-left: 4px;padding-right: 4px;padding-top: 1px;position: relative;text-align: center;text-decoration: none;text-shadow: rgba(255, 255, 0, 0.219608) 1px 1px 1px;width: 80px;}");
GM_addStyle(".menuHiddenMostrar:hover, .menuHiddenOcultar:hover { color:white; }");
//Añadimos los botones en el HTML
$('#colLeft').prepend('<a href="javascript:void(0);" class="buttonSaveEstado" title="Guardar configuración"><img src="https://dl.dropbox.com/u/1857950/Futmondo/save.png" /></a>');
$('#colLeft').prepend('<a href="javascript:void(0);" class="menuHiddenMostrar" title="Futmondo Anti-Spy">Mostrar datos</a>');
$('#colLeft').prepend('<a href="javascript:void(0);" class="menuHiddenOcultar" title="Futmondo Anti-Spy" style="display:none;">Ocultar datos</a>');
//Definimos el click del boton de Motrar
$(".menuHiddenMostrar").click(function() {
    $('.menuHiddenMostrar').fadeOut();
    $('.menuHiddenOcultar').fadeIn();
    $('.communityMenuHidden .budget').slideDown();
    $('.communityMenuHidden .offers').slideDown();
    $('.communityMenuHidden .balance').slideDown();
    $('.communityMarketHidden .icoOffer').fadeIn();
    $('#communityMenu').removeClass('communityMenuHidden');
    $('#marketPlayers').removeClass('communityMarketHidden');
});
//Definimos el click del boton de Ocultar
$(".menuHiddenOcultar").click(function() {
    $('#communityMenu .budget').css('display', 'block');
    $('#communityMenu .offers').css('display', 'block');
    $('#communityMenu .balance').css('display', 'block');
    $('#marketPlayers .icoOffer').css('display', 'block');
    $('#communityMenu').addClass('communityMenuHidden');
    $('#marketPlayers').addClass('communityMarketHidden');
    $('.menuHiddenOcultar').fadeOut();
    $('.menuHiddenMostrar').fadeIn();
    $('.communityMenuHidden .budget').slideUp();
    $('.communityMenuHidden .offers').slideUp();
    $('.communityMenuHidden .balance').slideUp();
    $('.communityMarketHidden .icoOffer').fadeOut();
});
//Definimos el click del boton de guardar estado
$(".buttonSaveEstado").click(function() {
   if ($("#communityMenu").hasClass('communityMenuHidden'))
   {
       GM_setValue('futmondo_ocultar', true);
   }
   else
   {
       GM_setValue('futmondo_ocultar', false);
   }
});

var futmondo_ocultar = GM_getValue('futmondo_ocultar', true);

if (!futmondo_ocultar)
{
    $(".menuHiddenMostrar").click();
}