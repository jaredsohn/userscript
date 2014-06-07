// ==UserScript==
// @name           Highscore v1.4.5
// @namespace      
// @description    Highscore para mendigogame
// @include        http://*mendigogame.es/highscore/*
// ==/UserScript==


var min1 = 2000000;
var min2 = 3000000;
var min2b = 3000100;
var min3 = 4000000;
var min3b = 4000100;
var min4 = 5000000;
var min4b = 5000100;






var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');

var laenge = tr.length;
var siglink = "http://img.mendigogame.es/cache/signaturen/";

var newth_2 = document.createElement('th');
newth_2.setAttribute('align', 'left');
newth_2.innerHTML = 'Dinero/ <br /> Registro';
tr[0].insertBefore(newth_2, tr[0].getElementsByTagName('th')[7]);
//var newth_3 = document.createElement('th');
//newth_3.setAttribute('align', 'left');
//newth_3.innerHTML = 'Tier';
//tr[0].insertBefore(newth_3, tr[0].getElementsByTagName('th')[8]);

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
   	url: 'http://www.mendigogame.es/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			reg = dom.getElementsByTagName('reg_since')[0].textContent;
			id_gang = dom.getElementsByTagName('id')[1].textContent;
			name = dom.getElementsByTagName('name')[0].textContent;
	
			
			var newtd_3 = document.createElement('td');
			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://www.mendigogame.es/profil/id:'+ id +'/',
				onload: function(responseDetails) {
					var side = responseDetails.responseText;
					var profil = responseDetails.responseText;

					mendigoOnline = '';
					var mendigoOnlineVar = profil.search('title="Online"');
					 if (mendigoOnlineVar != -1) {
						newtd.innerHTML = ' <img src="http://media.mendigogame.es/img/on.png" width="8" height="8"> ' + newtd.innerHTML
						tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);

					 }

					try{
					var side_split = side.split('<table style="margin: 5px; padding: 5px;');
					var side_split_2 = side_split[1].split('</table>');

					try {
						var side_split_3 = side_split_2[0].split('<img style="margin-top:3px" src="http://www.mendigogame.es/headline/');
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
						//var tier_tip = "";
					}
					   // var haustier = ' <img style="margin-top:3px" src="http://www.mendigogame.es/headline/' + tier_ueberschrift +'/?size=28" /><br />'+ haustier_bild + '<br />' + tier_beschreib + tier_tip;
					   // var haustier = haustier_bild + '<br />' + tier_beschreib + tier_tip;
					
						 //var haustier = ''
						//newtd_3.innerHTML = haustier;
						//tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}
					catch(err) {
						//alert(err);
						//var haustier = '';
					
						//newtd_3.innerHTML = haustier;
						//tr[x].insertBefore(newtd_3, tr[x].getElementsByTagName('td')[8]);
					}


				}
			});

		var newtd = document.createElement('td');

		
		try
		{
        		cash = dom.getElementsByTagName('cash')[0].textContent;

if (reg.substring(0,2) <= "12" && reg.substring(3,5) == "08" &&
    reg.substring(0,2) >= "02" && reg.substring(3,5) == "08"){
   newtd.style.color = "#00FFFF";
}
if (cash >= min1 && cash <= min2) {
   newtd.style.color = "#00FF00";
}
else if (cash >= min2b && cash <= min3) {
   newtd.style.color = "#FFFF00";
}
else if (cash >= min3b && cash <= min4){
   newtd.style.color = "#FF0000";
   newtd.style.fontWeight = "bold";
}
else if (cash > min4b) {
   newtd.style.color = "#FF0000";
   newtd.style.fontWeight = "bolder";
   newtd.style.fontSize = "16px";
   alert ('Atencion: Mira a ' + name + ' un puto mendigo tontopoyas con mas de 50mil euros.');

}

			var pskript = '<br /> <div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' + siglink + id + '.jpg"></div>';	

			if(cash.length >= 9)
			{
			 newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
			}
			else if (cash.length>=6)
			{
			newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
			}
			else if(cash.length>2)
			{
			newtd.innerHTML = "&euro;" + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + '<br />' + reg + pskript;
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
			}
			else if(cash.length==2)
			{
			newtd.innerHTML = "&euro;0," + cash + '<br />' + reg + pskript;
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
			}
			else
			{
			//newtd.innerHTML = "&euro;0,0" + cash + '<br />' + reg + pskript;
			}

		}
		catch(err)
		{
			//newtd.innerHTML = "-" + '<br />' + reg;
			//tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[7]);
		}

	}	
	});

};