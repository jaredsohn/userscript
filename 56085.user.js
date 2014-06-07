// ==UserScript==
// @name           PG Geld-Promille Script - HH und B (c) by multispende.net  - Spolszczenie: Chani (http://menelgame.org)
// @namespace      http://www.multispende.net
// @author				 multispender
// @description    Pokazuje ilość pieniędzy i promili userów na liście rankingowej (highscore).
// @include        http://*menelgame.pl/highscore*
// ==/UserScript==

if(document.URL.match(/berlin/)){
  var sig = "http://img.menelgame.pl/cache/pl_PL/signaturen/";
	var api = "http://www.menelgame.pl/dev/api/user.";
}else{
  var sig = "http://img.menelgame.pl/cache/pl_PL/signaturen/";
	var api = "http://www.menelgame.pl/dev/api/user.";
}
var highlightit1 = 15000;
var highlightit2 = 30000;
var highlightit3 = 50000;
var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
var newth = document.createElement('th');
newth.style.textAlign = "left";
newth.innerHTML = "Pieniądze";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[4]);
var newth = document.createElement('th');
newth.style.textAlign = "left";
newth.innerHTML = "Promile";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[5]);
var laenge = tr.length;
for (var x = 1; x<=laenge; x++)
{
	var td = tr[x].getElementsByTagName('td');
	var id1 = td[1].innerHTML.split('/profil/id:');
	var id = id1[1].split('/"');
	cashinfo(id[0],x);
}

function cashinfo(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: api + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var newtd = document.createElement('td');
		var promille = document.createElement('td');
		try
		{
      cash = dom.getElementsByTagName('cash')[0].textContent;	
			if (cash >= highlightit1*100){
			  newtd.style.color = "#efab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit2*100){
  	    newtd.style.color = "#25ab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit3*100){
  	    newtd.style.color = "#ef3422";
				newtd.style.fontWeight = "bold";
			}
			newtd.innerHTML = mach(cash) + " zł";
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			promille.innerHTML = '<div style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id + '.jpg"></div>';
			tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[5]);
		}
		catch(err)
		{
			newtd.innerHTML = "-";
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			promille.innerHTML = "-";
			tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[5]);
		}

	}	
	});
}

function mach(zahl) {
   var j=1;
   var res=zahl.substr((zahl.length-1),1);
   i=zahl.length;
	 if (i < 3){
	   while (i < 3) {
		   zahl = "0" + zahl;
			 i++;
		 }
	 }	  
   while (j <= zahl.length) {
      if (j%3 == 0) {
         res="."+res;
      }
			if (j==2) {
         res=","+res;
				 j++;
      }
			i--;
			res=zahl.substr((i-1),1)+res;
			j++;
			
   }
   return res;
}