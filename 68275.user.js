// ==UserScript==
// @name		Rozkazy MON i oddziałowe
// @version		0.02
// @description	Aktualne rozkazy dotyczace walk Polakow
// @author		piotrek78
// @namespace	piotrek78
// @include		http://ww*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

// script de pe erepstats.com modificat: user eRep: Longfellow
// modified by carbon ;)
// modified by piotrek78 partially using Erepublik Plus code http://userscripts.org/scripts/show/49247


var unitName = 'PPA';


var orders = '<ul style="height: auto !important;">';
var units = new Array;
units['PPA'] = 23;
function addOrders() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ereptools.net:8080/orders.txt',
		onload:function(responseDetails){
				
				if(responseDetails.status == 200)
				{
					//sa rozkazy MON
					//format: rozkazy|link|data
					var tags = responseDetails.responseText.split('|');
					var commandMON = tags[0];
					var linkMON = tags[1];
					var dateMON = tags[2];
					orders += '<li class="ordersMON"><a href=\"'+linkMON+'\"><b>Rozkazy MON:</b> '+commandMON+ ' @'+ dateMON +'</a> </li>';
					GM_addStyle("li.ordersMON a {width: auto !important; height: auto !important; float: left; background-color: #E9F5FA; padding: 5px 5px 5px 5px !important; }");
					GM_addStyle("li.ordersMON a:hover {width: auto !important; float: left; color: white; background-color: #53B3D3; padding: 5px 5px 5px 5px !important; }");
				}
				addMUOrders();

				},
		onerror:function(responseDetails){
				//nie ma rozkazow MON
				addMUOrders();
				
				}
			}
		);
}
function addMUOrders() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://egovstats.com/rozkazy/' + units[unitName] +'.txt',
		onload:function(responseDetails){
				
				//alert(responseDetails.responseText);
				if(responseDetails.status == 200)
				{
					//sa rozkazy oddziału
					//format: data|rozkazy|link
					var tags = responseDetails.responseText.split('|');
					var commandMU = tags[1];
					var linkMU = tags[2];
					var dateMU = tags[0];
				
					orders += '<li class="ordersMU"><a href=\"'+linkMU+'\"><b>Rozkazy ' + unitName + ':</b> '+commandMU+ ' @'+ dateMU +'</a> </li>';
					GM_addStyle("li.ordersMU a {width: auto !important; height: auto !important; float: left; background-color: #E9F5FA; padding: 5px 5px 5px 5px !important; }");
					GM_addStyle("li.ordersMU a:hover {width: auto !important; float: left; color: white; background-color: #53B3D3; padding: 5px 5px 5px 5px !important; }");
				}
				$("#menu").append(orders + '</ul>');

				},
		onerror:function(responseDetails){
				//nie ma rozkazow oddziału
				orders += '</ul>';
				$("#menu").append(orders);

				}
			}
		);
}


window.addEventListener('load', function(){var checker=setInterval(function(){
	if(typeof ($ = jQuery.noConflict()) != "undefined") {
		clearInterval(checker);
		addOrders();
	}
},100);}, false);