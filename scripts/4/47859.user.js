// ==UserScript==
// @name           Pardus Attack Button Mover
// @namespace      Pardus
// @description    Adds some space between attack buttons
// @include        *.pardus.at/ship2opponent_combat.php*
// @author         Chip Seraphine
// ==/UserScript==

(function() {

    var i= 1;
    var item= document.getElementsByTagName( 'div' );
    if(item[i] != null)
    {
        item[i].innerHTML= '<br>' +  item[i].innerHTML + '<br><br>';
    }

})();

// Xpath:
// /html/body/table/tbody/tr[2]/td[2]/table[2]/tbody/tr/td/form/div[2]