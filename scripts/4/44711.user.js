// ==UserScript==
// @name           Cash_&_BAC_in_profile_by_Newman_UK
// @namespace      http://ego-shooters.foren-city.de/ and http://Junk1e.pennergame.de/
// @description    You can see, how much money and BAC has a tramp in his profile. And this scripts makes conspicuous animal fake sign.
// @include        http://*dossergame.co.uk/profil/*
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

var siglink = "http://img.pennergame.de/cache/en_EN/signaturen/";

if (id && id != 399816) {
	GM_xmlhttpRequest({
		method: 'GET',
   		url: 'http://www.dossergame.co.uk/dev/api/user.' + id + '.xml',
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
			cash_show = "&#163;" + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if (cash.length>=6){
			cash_show = "&#163;" + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if(cash.length>2){
			cash_show = "&#163;" + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length);
		} else if(cash.length==2){
			cash_show = "&#163;0," + cash;
		}
		else {
			cash_show = "&#163;0,0" + cash;
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
	tr[8].innerHTML = '<td><strong>&nbsp;Cash</strong></td><td>'+ cash_show +'</td><td><strong>&nbsp;BAC</strong></td><td>'+ promille +'</td>';

}



// Script von NewMan und Junk1e. Im Pennergame unter NewMan01 und Junk1e zu finden.
// Script is made by Newman and Junk1e. In Pennergame(German) Newman01 and Junk1e.