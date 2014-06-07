// ==UserScript==
// @name           immo24mod_op
// @namespace      Oliver Prygotzki
// @include        http://immobilienscout24.tld/*
// @include        http://www.immobilienscout24.tld/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright      Oliver Prygotzki <http://oliver.prygotzki.de/>
// @version        1.0
// @license        Creative Commons Attribution-Noncommercial 3.0 Germany License
// @description    Anzeige des €/m²-Preises, Hervorhebung provisionfreier Wohnungen (= grüner Rahmen) sowie verdächtig günstiger Angebot (= roter Rahmen)
// ==/UserScript==

(function($) {
  
  var FRAUD_LIMIT = 8.00; // Angebote unter diesem Wert [in €/m²] werden rot umrandet (Betrugsverdacht oder Schnäppchen…)

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
      $KM = $$.find('DT:contains("Kaltmiete")').next(),
      $WF = $$.find('DT:contains("Wohnfläche")').next();
  
    if ($KM.length && $WF.length) {
        
      var 
        km = parseFloat($KM.text(), 10),
        qm = parseFloat($WF.text(), 10),
        qm_preis = Math.round( (km/qm) * 10 ) / 10;
          
      $WF.html($WF.html() + ' (' + formatCurrency(qm_preis) + ' €/m²)');
      
      if (qm_preis < FRAUD_LIMIT) {
        $$.css({ outline: 'medium solid red' });
      }
    }

    if (/(ohne|keine)\s+Provision|Provisionsfrei/i.test($$.text())) {
      $$.css({ outline: 'medium solid green' });
    }
  }
  
  $(function() {
    $('.is24-res-entry').each(entry);
  });

})(jQuery.noConflict());
