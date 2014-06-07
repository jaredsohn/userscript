// ==UserScript==
    // @name           Rozkazy Polish Private Army
    // @namespace      www.erepublik.com
    // @description    Military groups orders
    // @version        0.01
    // @include        http://www.erepublik.com/en
    // @include        http://www.erepublik.com/pl
    // @author         Tooros
// ==/UserScript==

GM_xmlhttpRequest({
   method: 'GET',
   url: 'http://docs.google.com/Doc?docid=0ATPluWoV1Gj5ZDg5dGtmd18xOGN4cmdyc2Y2&hl=pl',

   onload:function(response){
	  //Retrieve and truncate string
	  var order_string = response.responseText.match('#order#(.*)#order#');
	  var tmp = "";
	  order_string = order_string.join("");
	  order_string = order_string.substring(order_string.indexOf('#order#')+7,order_string.length-7);
	  order_string = order_string.substring(0,order_string.indexOf('#order#'));

	  // VARS
	  var tags = order_string.split('|');
	  var company = tags[0];
	  var orders = tags[1];
	  var link = tags[2];
	  var date_issued = tags[3];


	  // String
	  var $box_str = '   <h3 style="clear: both;">'+

'      <a href="http://eppa.pl/viewtopic.php?f=4&t='+link+'" target="_blank">'+
			'         <div style="float: right;">'+
			'            <span id="id_round_button_ajax" class="round_btt-start">'+
			'               <span class="round_btt-end">'+
			'                  <span style="width: 50px; font-weight: bold; font-size: 14px; text-align:center;" class="round_btt-core">'+
			'                     eppa.pl'+
			'                  </span>'+
			'               </span>'+
			'            </span>'+
			'         </div>'+
			'      </a>'+
			'      <div style="padding: 5px 0pt;">' + orders + '</div>'+
			'   </h3>'+
			'   <p style="color: #9F9F9F;">' + date_issued + '</p>'+
			'   <p>&nbsp;</p>';

	  columna=document.getElementById('latestnews');
	  contenedor = document.createElement("div");
	  contenedor.innerHTML = $box_str;

	  if(order_string.length) {   //Only insert if string is uncommented
		 columna.parentNode.insertBefore(contenedor, columna);
	  }
   }
});