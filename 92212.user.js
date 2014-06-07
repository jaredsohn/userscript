// ==UserScript==
    // @name           Pinguim Flu
    // @namespace      www.erepublik.com
    // @description    eRepublik
    // @version        1
    // @include        http://www.erepublik.com/en
    // @include        http://www.erepublik.com/pt
    // ==/UserScript==

       GM_xmlhttpRequest({
       method: 'GET',
       url: 'http://pinguimflu.freeforums.org/post3.html',

       onload:function(response){
          var order_string = response.responseText.match('start#(.*)#stop');
          var tmp = "";
          order_string = order_string.join("");
          order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);
          order_string = order_string.substring(0,order_string.indexOf('#'));

          var tags = order_string.split('|');
          var company = tags[0];
          var orders = tags[1];
          var link = tags[2];
          var date_issued = tags[3];


          var $box_str =    '   <div class="title">'+
                '      <h1>Script</h1>'+
                '   </div>'+
                '   <ul class="tabs">'+
                '      <li id="nationaltab">'+
                '         <a href="#" class="on latest_events" id="national">'+
                '            <span>' + company + '</span>'+
                '         </a>'+
                '      </li>'+
                '   </ul>'+
                '      <br><br><div style="padding: 5px 0pt;">' + orders + '</div>'+
                '      '+
                '   <p style="color: #9F9F9F;">' + date_issued + '</p>'+
                '   <p>&nbsp;</p>';

          columna=document.getElementById('battle_listing').parentNode;
          contenedor = document.createElement("div");
          contenedor.innerHTML = $box_str;

          if(order_string.length) {   
             columna.insertBefore(contenedor, columna.firstChild);
          }
       }
    });