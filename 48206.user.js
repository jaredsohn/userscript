// ==UserScript==
// @name           Highscore v1.4.5 überarbeitet von NewMan. Tlumaczenie dla menelgame by PaWmArCc
// @namespace      
// @description    Highscore skrypt 1.5 überarbeitet von NewMan. Pokazuje punkty bandy, date rejestracji i zwierze danego gracza. Pokazuje rowniez pieniadze danego gracza ale nie dziala to dosyc dobrze (skrypt w budowie). Wersja V3.1
// @include        http://*menelgame.pl/highscore/*
// ==/UserScript==

var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

var laenge = tr.length;
var siglink = "http://img.menelgame.pl/cache/signaturen/";

var newth = document.createElement('th');
newth.setAttribute('align', 'left');
newth.innerHTML = 'Punkty <br> bandy';
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[3]);
var newth_2 = document.createElement('th');
newth_2.setAttribute('align', 'left');
newth_2.innerHTML = 'Pieniądze/ <br /> Data Rejestracji';
tr[0].insertBefore(newth_2, tr[0].getElementsByTagName('th')[7]);
var newth_3 = document.createElement('th');
newth_3.setAttribute('align', 'left');
newth_3.innerHTML = 'Zwierzak';
tr[0].insertBefore(newth_3, tr[0].getElementsByTagName('th')[8]);

for (var x = 1; x<=laenge -1; x++)
{
	var td = tr[x].getElementsByTagName('td');
	var id1 = td[1].innerHTML.split('/profil/id:');
	var id = id1[1].split('/"');
	Geldladen(id[0],x);
}

function Geldladen(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.menelgame.pl/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			reg = dom.getElementsByTagName('reg_since')[0].textContent;
			id_gang = dom.getElementsByTagName('id')[1].textContent;
			name = dom.getElementsByTagName('name')[0].textContent;
			var newtd_2 = document.createElement('td');
			
			if (id_gang != 0 && id_gang != 'None') {
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.menelgame.pl/dev/api/gang.' + id_gang +'.xml',
					onload: function(responseDetails) {
						var parser_gang = new DOMParser();
						var dom_gang = parser_gang.parseFromString(responseDetails.responseText, "application/xml");
						try{
							var points = dom_gang.getElementsByTagName('points')[0].textContent;
						} catch (err){
							var points = "-";
						}
					
						newtd_2.innerHTML = points;
						tr[x].insertBefore(newtd_2, tr[x].getElementsByTagName('td')[3]);
					}
				});
			}
			else {
				newtd_2.innerHTML = '-';
				tr[x].insertBefore(newtd_2, tr[x].getElementsByTagName('td')[3]);
			}
			
			var newtd_3 = document.createElement('td');
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.menelgame.pl/profil/id:'+ id +'/',
				onload: function(responseDetails) {
					var side = responseDetails.responseText;
					try{
					var side_split = side.split('<table style="margin: 5px; padding: 5px;');
					var side_split_2 = side_split[1].split('</table>');

					try {
						var side_split_3 = side_split_2[0].split('<img style="margin-top:3px" src="http://www.menelgame.pl/headline/');
						var side_split_4 = side_split_3[1].split('/?size=28" />');
						var tier_ueberschrift = side_split_4[0];
					} catch(err) {
						var tier_ueberschrift = "";
					}
					try {
						var side_split_5 = side_split_4[1].split('<div style="float:left; margin-top:12px;">');
						var side_split_6 = side_split_5[1].split('</div>');
						var haustier_bild = side_split_6[0];
					} catch (err) {
						var haustier_bild = "";
					}
					try {
						var side_split_7 = side_split_6[1].split('<p>');
						var side_split_8 = side_split_7[1].split('</p>');
						var tier_beschreib = side_split_8[0];
					} catch (err){
						var tier_beschrieb = "";
					}
					try {
						var side_split_9 = side_split_8[1].split('</div>');
						var side_split_1_1 = side_split_9[1].split('</td>');
						//alert(side_split_1_1[0]);
						var tier_tip = side_split_1_1[0];
					} catch (err){
						//alert(err);
						var tier_tip = "";
					}
					    var haustier = ' <img style="margin-top:3px" src="http://www.menelgame.pl/headline/' + tier_ueberschrift +'/?size=28" /><br />'+ haustier_bild + '<br />' + tier_beschreib + tier_tip;
						newtd_3.innerHTML = haustier;
						tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}
					catch(err) {
						//alert(err);
						var haustier = '_';
					
						newtd_3.innerHTML = haustier;
						tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}

				}
			});

		var newtd = document.createElement('td');

		
		try
		{
        		cash = dom.getElementsByTagName('cash')[0].textContent;
			if (cash >= 1500000 && cash <= 3000000) {
   newtd.style.color = "#FFFF00";
}
else if (cash >= 3000100 && cash <= 5000000) {
   newtd.style.color = "#00FF00";
}
else if (cash >= 5000100 && cash <= 15000000){
   newtd.style.color = "#FF0000";
   newtd.style.fontWeight = "bold";
}
else if (cash >15000100) {
   newtd.style.color = "#FF0000";
   newtd.style.fontWeight = "bolder";
   newtd.style.fontSize = "16px";
   alert ('Auf Platz:' + x + ' hat ' + name + ' mehr als 150000 Euro auf der Hand.');
}
			var pskript = '<br /> <div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' + siglink + id + '.jpg"></div>';	
			if(cash.length >= 9)
			{
			 newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			}
			else if (cash.length>=6)
			{
			newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			}
			else if(cash.length>2)
			{
			newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			}
			else if(cash.length==2)
			{
			newtd.innerHTML = "&euro;0," + cash + '<br />' + reg + pskript;
			}
			else
			{
			newtd.innerHTML = "&euro;0,0" + cash + '<br />' + reg + pskript;
			}

			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
		}
		catch(err)
		{
			newtd.innerHTML = "-" + '<br />' + reg;
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
		}

	}	
	});

};