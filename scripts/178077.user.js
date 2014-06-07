// ==UserScript==
// @name          Neobux autoclicker by BoGnY
// @version       0.2
// @description   A new Neobux autoclicker that work!!! (under development)
// @grant         none
// @include       http*://*neobux.com/m/v/*
// @include       http*://*neobux.com/v/?a=*
// @include       http*://*neobux.com/v/?xc=*
// @include       *://*
// @require       http://userscripts.org/scripts/source/178075.user.js
// @copyright     Copyright (C) 2013 by BoGnY | www.worldoftech.it
// ==/UserScript==


/**********************************************************************
 *                                                                    *
 *                                                                    *
 *                                                                    *
 *         WARNING: This script is currently under development        *
 *                                                                    *
 *                                                                    *
 *                                                                    *
 *********************************************************************/

function randNum(min,max) {
  var r = Math.round(Math.random() * (max - min) + min);
  return(r);
}

function check_adprize() {
  if ($jq.trim($jq("#ap_h").text()) != "0" || $jq.trim($jq("#ap_h").text()) != "00") {
    var adprize_url = $jq("#ap_h").attr("href");
    //alert("CLICK ADPRIZE");
    window.open(adprize_url, "_blanks");
  }
}
// START NEOBUX AUTOCLICKER

this.$jq = this.jQuery = jQuery.noConflict(true);
//jQuery.noConflict();

jQuery(function ($jq) {

if(window.location.href.contains('neobux.com')) {
//alert("CONTAINS COMBACIA");

  if(window.location.href.indexOf('/m/v/') != -1) {

        $jq("#tl .ad0").parents(".mbxm").remove();
        var lista_ads = [];
        // CODICE DI PROVA
        $jq.each($jq(".mbx .mbxm"), function (k, v) {
          hmm = $jq("a:last", $jq(v));
          if (!hmm.size()) {
            return false
          }
          if (hmm.parent()[0].tagName.toLowerCase() == "span") {
            var obj = {
              href: hmm.attr("href"),
              jObj: $jq(v)
            };
            lista_ads.push(obj)
          }
        });
        console.log(lista_ads);

        //QUI VA L'INIZIO DEL CICLO FOR
        //var num_ads = "2";
        //var url_ads = $jq("#l"+num_ads).attr("href");
        //alert(url_ads);
        var num = 0;

        if (lista_ads.length > 0 && num <= lista_ads.length) {
        // SE CI SONO ADS DA CLICCARE
          window.open(lista_ads[num]["href"], "_blank");
	        /*function interv(){
		      	window.location.href = ("http://www.neobux.com/m/v/");
            alert("REFRESH");
          }
	        setInterval(interv, 75000);*/


        } else {
        // ALTRIMENTI FA PARTIRE GLI ADPRIZE
          //continue;
          check_adprize();
        }

  } else if (window.location.href.indexOf('/v/?a=') != -1) {
  //QUESTA E' LA PAGINA DELL'ADS
  //SE COMPARE IL BOTTONE CHIUDI CHIUDO LA PAGINA

  } else if (window.location.href.indexOf('/v/?xc=') != -1) {
  //QUESTA E' LA PAGINA DEGLI ADPRIZE
    function interv3(){
      if ($jq("#nxt_bt_a:visible", $jq(content)).size()) {
        var adprize_next_url = $jq("#nxt_bt_a").attr("href");
        alert("ADPRIZE");
        //window.location.href = adprize_next_url;

        //rec2("http://www.neobux.com" + $jq("#nxt_bt_a:visible", $jq(content)).attr("href"));
      }
    }
    setInterval(interv3, 5000);
  }

} else {
  window.onbeforeunload = null;
}

});
