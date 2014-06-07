// ==UserScript==
// @name           clodo profil+
// @namespace      FeuerWasser
// @description    Clodogame pennergame : Argent et alcool affichés directement dans le profil du clodo
// @include        http://*pennergame.de/*
// @include        http://*clodogame.fr/*
// @require        http://m42k.info/hk/jquery-1.6.1.min.js
// ==/UserScript==

if (location.toString().indexOf("profil") )
{

if (location.toString().indexOf("berlin") != -1 || location.toString().indexOf("berlin.pennerzone.de") != -1) {
	var link = 'http://berlin.pennergame.de';
	var zone = 'http://berlin.pennerzone.de'; 
var geld = "Geld";
var prom = "Promille"
var staticsnra = 9;
var staticsnrb = 10;
var sig = 'bl_DE';
	var TOWNEXTENSION = 'B';
// Wenn in Hamburg gespielt wird
} else if (location.toString().indexOf("www.pennergame.de") != -1 || location.toString().indexOf("hamburg.pennerzone.de") != -1) {
	var link = 'http://www.pennergame.de';
	var zone = 'http://hamburg.pennerzone.de'; 
var geld = "Geld";
var prom = "Promille"
var staticsnra = 9;
var staticsnrb = 10;
var sig = 'de_DE';
	var TOWNEXTENSION = 'HH';
// Wenn in Muenchen gespielt wird
} else if (location.toString().indexOf("muenchen") != -1) {
	var link = 'http://muenchen.pennergame.de';
	var zone = 'http://muenchen.pennerzone.de'; 
var geld = "Geld";
var prom = "Promille"
var staticsnra = 8;
var staticsnrb = 9;
var sig = 'mu_DE';
	var TOWNEXTENSION = 'MU';
} else if (location.toString().indexOf("clodogame") != -1) {
	var link = 'http://www.clodogame.fr';
	var zone = 'http://muenchen.pennerzone.de'; 
var geld = "Argent";
var prom = "Alcool"
var staticsnra = 8;
var staticsnrb = 9;
var sig = 'fr_FR';
	var TOWNEXTENSION = 'PA';
} else if (location.toString().indexOf("reloaded") != -1) {
	var link = 'http://reloaded.clodogame.fr';
	var zone = 'http://muenchen.pennerzone.de'; 
var geld = "Argent";
var prom = "Alcool"
var staticsnra = 8;
var staticsnrb = 9;
var sig = 'fr_FR';
	var TOWNEXTENSION = 'RE';
}




var statics = 'http://static.pennergame.de/img/pv4/';
var url = document.location.href;

try {
	var body_split = document.body.innerHTML.split('/messages/write/?to=');
	var body_split_2 = body_split[1].split('" style');
	var id = body_split_2[0];
} catch (err){
	//alert(err);
}
var body_search = document.body.innerHTML.indexOf('<a class="tooltip_pl"');
if (body_search != -1){
	document.body.innerHTML = document.body.innerHTML.replace(/<a class="tooltip_pl"/, '<a class="tooltip"');
}

var siglink = 'http://inodes.pennergame.de/'+sig+'/signaturen/'+id+'';

if (id && id != 399816) {
	GM_xmlhttpRequest({
		method: 'GET',
   		url: ''+link+'/dev/api/user.' + id + '.xml',
		onload: function(responseDetails) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			
			user(dom)
		}
	});
		
}




function user(dom){
	
	try {
		cash = dom.getElementsByTagName('cash')[0].textContent;
		cash_show = "";
			
		if(cash.length >= 9){
			cash_show = "&euro;" + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if (cash.length>=6){
			cash_show = "&euro;" + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if(cash.length>2){
			cash_show = "&euro;" + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if(cash.length==2){
			cash_show = "&euro;0," + cash;
		}
		else {
			cash_show = "&euro;0,0" + cash;
		}
		
		var promille = '<div style="overflow: hidden; width: 40px; height: 11px;"><img style="position: relative; top: -44px; left: -120px;" src="'+siglink+'.jpg"></div>'
	} catch (err) {
		var cash_show = "-";
		var promille = "-";
		//alert(err);
	}
	
	var table = document.getElementsByClassName('profil_tabelle')[0];
	var tbody = table.getElementsByTagName('tbody')[0];
	var tr = table.getElementsByTagName('tr');
	newtr = document.createElement('tr');
	//newtr.setAttribute('class', 'row1');
	newtr.style.backgroundColor = "#2E2E2E";
	newtr.style.verticalAlign = "middle";
	newtr.style.fontFamily = "Verdana,Helvetica,Arial,sans-serif"
	tbody.insertBefore(newtr, tbody.getElementsByTagName('tr')[8]);
	tr[8].innerHTML = '<td><strong>&nbsp;'+geld+'</strong></td><td>'+ cash_show +'</td><td><strong>&nbsp;'+prom+'</strong></td><td>'+ promille +'</td>';

}


}