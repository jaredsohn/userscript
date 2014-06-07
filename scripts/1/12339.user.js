// version 0.5
// 2007/09/17

// ==UserScript==
// @name            Ogame - Salto Cuantico
// @author          Flater - Modificado por FryGuy
// @description     Salto cuántico avanzado, permite elegir todas/ninguna nave.
// @include         http://*.ogame.com.es/*
// ==/UserScript==



(function(){

  if (location.href.search('page=infos') != -1) {   

    //==========================
    //Suprime la tabla de descripión description 
    //==========================

    var supp_image_porte = document.evaluate('//div[@id="content"]/center/table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue ;
    supp_image_porte.innerHTML = '<br>' ;

    //=========================================
    //Inserta y modifica las funciones js del juego
    //=========================================

    var script = window.document.createElement('span') ;
    script.innerHTML = '<script src="js/flotten.js" type="text/javascript"></script><script language="JavaScript">function maxShipsC() {var id;for (i = 200; i < 220; i++) {id = "c"+i; maxShip(id); }}function noShipsC (){var id;for (i = 200; i < 220; i++) {id = "c"+i;noShip(id);}}</script>';
    var doc = document.evaluate('//div[@id="content"]/center/form', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue ;
    doc.parentNode.insertBefore(script, doc) ;

    //===============
    //Reconstrucción de la tabla
    //===============

    var trnode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tr');
    trnode[0].childNodes[1].attributes[0].nodeValue = 4 ;
    trnode[trnode.length-1].childNodes[1].attributes[0].nodeValue = 4 ;
    
    for( i = 1; i < trnode.length-1; i++ ) {
      var vaisseaux         = trnode[i].childNodes[1].childNodes[0].childNodes[0];
      var nb_vaisseaux      = trnode[i].childNodes[1].childNodes[1];
      var nb_vaisseaux1     = nb_vaisseaux.nodeValue.substring(1, nb_vaisseaux.nodeValue.indexOf('disponible',0) - 1);
      var class_vaisseaux   = trnode[i].childNodes[3].childNodes[0].attributes[4];
      var class_vaisseaux1  = class_vaisseaux.nodeValue.substring(1,4);
      var class_ship        = "'c" + class_vaisseaux1 + "'";
      trnode[i].innerHTML = 
        '<th><a>' +
        vaisseaux.nodeValue +
        '</a></th><th>' +
        nb_vaisseaux1 +
        '<input name="maxc' + class_vaisseaux1 + '" value="' + nb_vaisseaux1 + '" type="hidden">' +
        '</th><th><a href="javascript:maxShip(' + class_ship + ');">max</a></th>' +
        '<th><input tabindex="1" name="c' + class_vaisseaux1 + '" size="7" maxlength="7" value="0" type="text"></th>';
    }

    var tablenode = document.getElementsByTagName('form')[0].getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];

    tablenode.innerHTML = 
      tablenode.innerHTML.substring(0, tablenode.innerHTML.length - 88) +
      '<th colspan="2"><a href="javascript:noShipsC();">Ninguna Nave</a></th>' + 
      '<th colspan="2"><a href="javascript:maxShipsC();">Todas las Naves</a></th>' +
      '<tr>' + 
      tablenode.innerHTML.substring(tablenode.innerHTML.length - 88, tablenode.innerHTML.length - 1) + 
      '</tr>';
}

})();