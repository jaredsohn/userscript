// ==UserScript==
// @name           AHF Wireless
// @namespace      Mimihitam/Shiv SRJ
// @description    AHF Orders/News/Alerts/Updates on Faujis's eRepublik Home Page.
// @include        http://ww*.erepublik.com/en
// @include        http://ww*.erepublik.com/es
// @include        http://ww*.erepublik.com/de
// @include        http://ww*.erepublik.com/fr
// @include        http://ww*.erepublik.com/pt
// @include        http://ww*.erepublik.com/ru
// ==/UserScript==

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://docs.google.com/View?id=ddffq6jp_3d56rs2hg',

	onload:function(response){
		//Retrieve and truncate string
		var order_string = response.responseText.match('#(.*)#');
		var tmp = "";
		order_string = order_string.join("");
		order_string = order_string.substring(order_string.indexOf('#')+1,order_string.length-1);
		order_string = order_string.substring(0,order_string.indexOf('#'));

		// VARS
		var tags = order_string.split('|');
		var company = tags[0];
		var orders = tags[1];
		var link = tags[2];
		var date_issued = tags[3];


		// String
		var $box_str = 	'	<div class="title">'+
				'		<h1>AHF Wireless</h1>'+
				'	</div>'+
				'	<ul class="tabs">'+
				'		<li id="nationaltab">'+
				'			<a href="#" class="on latest_events" id="national">'+
				'				<span>' + company + '</span>'+
				'			</a>'+
				'		</li>'+
				'	</ul>'+
				'	<h3 style="clear: both;">'+
				'		<a href="' + link + '">'+
				'			<div style="float: right;">'+
				'				<span id="id_round_button_ajax" class="round_btt-start">'+
				'					<span class="round_btt-end">'+
				'						<span style="width: 50px; font-weight: bold; font-size: 14px; text-align:center;" class="round_btt-core">'+
				'							GO'+
				'						</span>'+
				'					</span>'+
				'				</span>'+
				'			</div>'+
				'		</a>'+
				'		<div style="padding: 5px 0pt;">' + orders + '</div>'+
				'	</h3>'+
				'	<p style="color: #9F9F9F;">' + date_issued + '</p>'+
				'	<p>&nbsp;</p>';

		columna=document.getElementById('latestnews');
		contenedor = document.createElement("div");
		contenedor.innerHTML = $box_str;

		if(order_string.length) {   //Only insert if string is uncommented
			columna.parentNode.insertBefore(contenedor, columna);
		}
	}
});