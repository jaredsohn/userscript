// ==UserScript==
    // @name           InfoRLP
    // @namespace      www.erepublik.com
    // @description    Infos du party Radicaux Penseurs Libres (eRepublik)
    // @version        1.00
    // @include        http://www.erepublik.com/en
    // @include        http://www.erepublik.com/fr
    // Inspiré du code d'orango pour L'InfoDefenseSystem
    // ==/UserScript==

    GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://forum.erepfrance.com/viewtopic.php?f=394&t=6059&p=132635#p132635',

       onload:function(response){
          var order_string = response.responseText.match('1st-start#(.*)#1st-stop');
          var tmp = "";
          order_string = order_string.join("");
          order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);
          order_string = order_string.substring(0,order_string.indexOf('#'));

          var tags = order_string.split('|');
          var company = tags[0];
          var orders = tags[1];

          var $box_str =    '   <div class="title">'+
                '      <h1>Infos RLP</h1>'+
                '   </div>'+
                '   <ul class="tabs">'+
                '      <li id="nationaltab">'+
                '         <a href="#" class="on latest_events" id="national">'+
                '            <span>'+ company +'</span>'+
                '         </a>'+
                '      </li>'+
                '   </ul>'+
                '      <marquee>'+ orders +'</marquee>'+
                '   <p>&nbsp;</p>';

          columna=document.getElementById('latestnews');
          contenedor = document.createElement("div");
          contenedor.innerHTML = $box_str;
          columna.parentNode.insertBefore(contenedor, columna);
          
       }
    });