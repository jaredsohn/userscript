// ==UserScript==
// @name           Yurtsever Direniş Örgütü Scripti
// @namespace      www.erepublik.com
// @description    Yurtsever Direniş Örgütü için eRepublik haberleşme scriptidir.
// @version        0.01
// @include        http://www.erepublik.com/*
// ==/UserScript==



GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://halkuretim.byethost10.com/ref/ydo.xml',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,
				"application/xml");
			var entries = dom.getElementsByTagName('halkuretim');
			for (var i = 0; i < entries.length; i++) {
				company = entries[i].getElementsByTagName("a1011192")[0].textContent;


		// String
		var $box_str = 	'	<div class="title">'+
				'		<h1>YDO Emirleri</h1>'+
				'	</div>'+
				'	<ul class="tabs">'+
				'		<li id="nationaltab">'+
				'			<a href="#" class="on latest_events" id="national">'+
				'				<span>' + company + '</span>'+
				'			</a>'+
				'		</li>'+
				'	</ul>'+
				'	<h3 style="clear: both;">'+
				'		<a href="' + company + '">'+
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
				'		<div style="padding: 5px 0pt;">' + company + '</div>'+
				'	</h3>'+
				'	<p style="color: #9F9F9F;">' + company + '</p>'+
				'	<p>&nbsp;</p>';

		columna=document.getElementById('latestnews');
		contenedor = document.createElement("div");
		contenedor.innerHTML = $box_str;

		if(order_string.length) {   //Only insert if string is uncommented
			columna.parentNode.insertBefore(contenedor, columna);
		}
	}
});