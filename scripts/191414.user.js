// ==UserScript==
// @name    Bloqueo de anuncios en Interbenavente
// @match   *://*.interbenavente.es/*
// @run-at  document-end
// @version 1
// @grant   GM_addStyle
// ==/UserScript==

GM_addStyle("#backgroundAd, .BANNERS-TOP, .BANNERS-BOTTOM, ins, iframe[height='250'], .BANNER>object, #fpopup, a[href*='tradedoubler'], a[href*='serviciosweb'],a[href*='serviciosweb'],*[style='visibility: visible; background-image: none;'],*[alt*='facebook.com/']{display:none!important;height:0!important;width:0!important;}");

/* quitar la mierda del fondo, va mas lenta que mi abuela en muelles */
Array.prototype.forEach.call(
document.querySelectorAll("script,style"),
function(e)
{
  if (e.innerHTML.match(/los40.com|backgroundAd/))
    e.parentElement.removeChild(e);
});

unsafeWindow.open = null;
unsafeWindow.Popup = null;

function kill_it_with_fire()
{
    /* exterminar los popups con grimosos y molestos gráficos tricolor, cargarse los anuncios locales para evitar la epilepsia */
    var Popup, open=null;
    var boom=document.querySelectorAll("#backgroundAd, .BANNERS-TOP, .BANNERS-BOTTOM, ins, iframe[height='250'], .BANNER>object, #fpopup, a[href*='tradedoubler'], a[href*='serviciosweb'],a[href*='serviciosweb'],*[style='visibility: visible; background-image: none;'],*[alt*='facebook.com/']")
    
    Array.prototype.forEach.call(boom,function(e){
      e.parentElement.removeChild(e);
      console.log("removing "+e);
    });
};

/* inyectarlo todo de un modo tan cutre y abyecto que deja la página en mal lugar */
document.head.appendChild(
    script = document.createElement("script")
);

script.innerHTML = kill_it_with_fire.toString() + ";kill_it_with_fire();";