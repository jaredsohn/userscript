// ==UserScript==
// @name           User_Profil_berlin_von_NewMan V1.1.1
// @namespace      http://forum.ego-shooters.net
// @description    Einfügen des Geldes und der Promille ins Pennerprofil und macht die Faketieranzeige sichtbar.
// @include        http://*berlin.pennergame.de/profil/*
// ==/UserScript==

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

var siglink = "http://imgberlin.pennergame.de/cache/bl_DE/signaturen/";

if (id && id != 399816) {
	GM_xmlhttpRequest({
		method: 'GET',
   		url: 'http://berlin.pennergame.de/dev/api/user.' + id + '.xml',
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
		
		var promille = '<div style="overflow: hidden; width: 40px; height: 11px;"><img style="position: relative; top: -44px; left: -120px;" src="' + siglink + id + '.jpg"></div>'
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
	tr[8].innerHTML = '<td><strong>&nbsp;Geld</strong></td><td>'+ cash_show +'</td><td><strong>&nbsp;Promille</strong></td><td>'+ promille +'</td>';

}



//Script von NewMan im Penergame unter NewMan01 zu finden.