// ==UserScript==
// @name       Quadratmeterpreis auf immobilienscout24.de
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Quadratmeterpreis auf immobilienscout24.de
// @match      http://www.immobilienscout24.de/*
// @copyright  2012+, Jonas Brekle
// ==/UserScript==

var detailPageKaltmiete = $(".is24qa-kaltmiete");
if (detailPageKaltmiete.length > 0) {
var preis = parseFloat(detailPageKaltmiete.text().trim().replace('.', '').replace(',', '.').replace(/[^\d.-]/g, ''));

var qmSingle = parseFloat($(".is24qa-wohnflaeche-ca").text().trim().replace(/[\s]+/g, ' ').split(" ")[0].replace('.', '').replace(',', '.'));

var qmpreis = preis/qmSingle;
$('<tr><td>Quadratmeterpreis:</td><td><b>'+qmpreis.toFixed(2)+' EUR/m&sup2;</b></td></tr>').insertAfter($('.is24-bottom-border02').first());
}

(function($) {
  
  function formatCurrency(euro) {
    if (isNaN(euro)) {
      return '?';
    }
    var cents = Math.floor(euro * 100 + 0.50000000001);
    euro = Math.floor(cents / 100);
    cents = cents % 100;
    if (cents < 10) { 
      cents = "0" + cents;
    }
    return euro + ',' + cents;
  }

  function entry() {
    var 
      $$ = $(this),
      $KM = $$.find('dt:contains("Kaltmiete")').next(),
      $WF = $$.find('dt:contains("Wohnfläche")').next();
  
    if ($KM.length && $WF.length) {
        
      var 
        km = parseFloat($KM.text().replace(".",""), 10),
        qm = parseFloat($WF.text().replace(".",""), 10),
        qm_preis = Math.round( (km/qm) * 100 ) / 100;

      $WF.html($WF.html() + ' (' + formatCurrency(qm_preis) + ' €/m²)');
      
    }

  }
  
  $(function() {
    $('#resultListItems li').each(entry);
  });

})(jQuery.noConflict());