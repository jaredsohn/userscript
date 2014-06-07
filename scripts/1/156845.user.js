// ==UserScript==
// @name        HomerJ.de 1080p Linker & Vod Kategorie Aufräumer
// @description Setzt bei allen vod's 1080p als default und räumt die vod Kategorien etwas auf. Eben für SC2 Jünger.
// @namespace   figge crew
// @include     http://homerj.de/index.php?show=vods*
// @include     http://www.homerj.de/index.php?show=vods*
// @version     1.0.5
// ==/UserScript==
(function()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (!document.location.href.match(/homerj\.de.*show=vods/))
		return;
	var myFunc = (function () {
      // Auflösung anpassen
      var $links = $('a[href*="play"]');
      $links.each(function(index) {
        var href = $(this).attr('href');
        if(!href.match(/&res=/)) {
          href = href + "&res=1080p";
          $(this).attr('href', href);
        }
      });
      // Bei Seitenauswahl auch immer zur oberen Listenkante springen
      // Dies wird schon gemacht wenn man auf einen der großen VOD Button klickt
      var $links = $('a[href*="start="]');
      $links.each(function(index) {
        var href = $(this).attr('href');
        href = href + "#overview";
        $(this).attr('href', href);
      });
      
      
      // alle VOD Kategorien entfernen ausser Alle, SCII, HGD und Live casts
      // Danach HGD in die erste Reihe setzen
      console.log('Cleanup VOD categories ...');
      var honor;
      $('td .w235.pt10.tac').each(function (index) {
          var s = $(this).children().first().attr('href');
          if (!s.match(/cat=10/)) {
              $(this).remove();
          } else {
              honor=$(this);        
          }
      });
      $('td .w156.pt10.tac').each(function (index) {
            $(this).remove();
      });
      $('td .w157.pt10.tac').each(function (index) {
            $(this).remove();
      });
      if(honor !== undefined) {
          console.log('Honor greift durch gefunden');
          elem = $($('td .w235.tac')[2]);
          honor.removeClass('pt10');
          console.log('Entferne css class');
          elem.replaceWith(honor);
          console.log('done.');
      }                             
  }).toString ();
	var script = document.createElement ("script");
	script.setAttribute ("type", "application/javascript");
	script.textContent = "(" + myFunc + ") ();";
	document.body.appendChild (script);
})();