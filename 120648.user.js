// ==UserScript==
    // @name           Efrance Info 
    // @namespace      www.erepublik.com
    // @description    Nouvelles de l'eFrance (eRepublik)
    // @version        V1.1
    // @include        http://www.erepublik.com/en
    // @include        http://www.erepublik.com/en#
    // @include        http://www.erepublik.com/fr
    // @include        http://www.erepublik.com/fr#
    // @include        http://www.erepublik.com
    // ==/UserScript==

    GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://forum.erepfrance.com/viewtopic.php?f=42&t=27135',

       onload:function(response){
          var order_string = response.responseText.match('efrancestart#(.*)#stopefrance');
          var tmp = "";
          order_string = order_string.join("");
          order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);
          order_string = order_string.substring(0,order_string.indexOf('#'));

          //var tags = order_string.split('|');
          //var info = tags[0];
          //var orders = tags[1];
          //var date_issued = tags[2];


          var $box_str =    '<div>'+  order_string + '</div>';
  ;

          columna=document.getElementById('battle_listing').parentNode;
          contenedor = document.createElement("div");
          contenedor.innerHTML = $box_str;

          if(order_string.length) {   
             columna.insertBefore(contenedor, columna.firstChild);
          }
       }
    });