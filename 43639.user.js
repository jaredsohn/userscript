// ==UserScript==
// @name           Highscore V1.5
// @namespace      11235813-Kuestenpenner
// @author		11235813
// @description    Zeigt Geld und Promillepegel der Penner in der Highscoreliste an
// @include        http://*pennergame.de/highscore*
// @exclude        http://*pennergame.de/highscore/gang/*
// ==/UserScript==
var highlightit0 = 5000;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;


var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Geld";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[4]);
var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Promille";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[5]);
var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Online";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);
var msgth=tr[0].getElementsByTagName('th')[7];
msgth.style.textAlign = "middle";
msgth.innerHTML = "Haustier";

var laenge = tr.length;
var sig = "http://img.pennergame.de/cache/signaturen/";

for (var x = 1; x<=laenge-1; x++)
{
	var td = tr[x].getElementsByTagName('td');
	var id1 = td[1].innerHTML.split('/profil/id:');
	var id = id1[1].split('/"');
	cashinfo(id[0],x);
	Haustier(id[0],x);
}




function cashinfo(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
		var newtd = document.createElement('td');
		var promille = document.createElement('td');
		try
		{
      cash = dom.getElementsByTagName('cash')[0].textContent;	
			if (cash >= highlightit0*100){
			  newtd.style.color = "#25ab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit1*100){
  	    newtd.style.color = "#84C618";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit2*100){
  	    newtd.style.color = "#dfde18";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit3*100){
  	    newtd.style.color = "#DE5A18";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit4*100){
  	    newtd.style.color = "#df3918";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= highlightit5*100){
  	    newtd.style.color = "#df1818";
				newtd.style.fontWeight = "bold";
			}
			

			newtd.innerHTML = "<div align='center'>&euro;" + mach(cash)+'';
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			promille.innerHTML = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id + '.jpg"></div>';
			tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[5]);
		}
		catch(err)
		{
			newtd.innerHTML = "<div align='center'>-</div>";
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			promille.innerHTML = "<div align='center'>-</div>";
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
function Haustier(id,x) {
	GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://pennergame.de/profil/id:'+id+'/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			try {
			var online1 = content.split('Ist gerade')[1];
			var online2 = online1.split('</')[0];
			} catch(err) {
				var online2 ='Offline';
			}

			var online = document.createElement('td');


						
			
			
			
			
			try {
				var hausi1 = content.split('<div style="float:left; margin-top:12px;"><img src="')[1];
				var hausi2 = hausi1.split('"')[0];
											
				
				if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg')
			{
				var petname = 'Elefant';
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/25834.jpg')
			{
				var petname = 'Nashorn';
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/14896.jpg')
			{
				var petname = 'Eisb&auml;r';
			}
			else if(hausi2 =='http://media.pennergame.de/img/tiere/12536.jpg')
			{
				var petname = '&Auml;ffchen';
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/43703.jpg')
			{
				var petname = 'Tiger';
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/73953.jpg')
			{
				var petname = 'Krokodil';
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/98962.jpg')
			{
				var petname  = "Giraffe";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg')
			{
				var petname  = "Nilpferd";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/90385.jpg')
			{
				var petname  = "Pferd";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/32563.jpg')
			{
				var petname  = "Chihuahua";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/62456.jpg')
			{
				var petname  = "Cockerspaniel";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/15240.jpg')
			{
				var petname  = "Pitbull";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/09051.jpg')
			{
				var petname  = "Sch&auml;ferhund";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/48263.jpg')
			{
				var petname  = "Adler";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/12758.jpg')
			{
				var petname  = "Pudel";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/62474.jpg')
			{
				var petname  = "Hausziege";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/61402.jpg')
			{
				var petname  = "Schlange";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/89386.jpg')
			{
				var petname  = "Falke";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/73735.jpg')
			{
				var petname  = "Katze";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/21903.jpg')
			{
				var petname  = "Frettchen";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/77310.jpg')
			{
				var petname  = "Hase";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/73684.jpg')
			{
				var petname  = "Ratte";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/31451.jpg')
			{
				var petname  = "Taube";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/52483.jpg')
			{
				var petname  = "Wellensittich";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/73308.jpg')
			{
				var petname  = "Hamster";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/11836.jpg')
			{
				var petname  = "Maus";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/68930.jpg')
			{
				var petname  = "Goldfisch";
			}
			else if(hausi2 == 'http://media.pennergame.de/img/tiere/00001.jpg')
			{
				var petname  = "Kakerlake";
			} else {
				
				
				try {
					var petname = content.split('Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <b>')[1].split('</b>')[0];
				} catch (err) {
					var petname = '<img src="http://media.pennergame.de/img/premium.gif"></img></div>'
				}
			}				
				

				
				
			} catch (err) {
				var petname = '<em>-</em>';
							}
					
			
				if (online2 == 'Offline') {
					onlinehtml = '<div align="middle"><img src="http://kuestenpenner.ku.ohost.de/of.png></img></div>';						
					} else { 					
					onlinehtml = '<div align ="middle"><img src="http://media.pennergame.de/img/on.png></img></div>';
					}
		
			online.innerHTML = onlinehtml;
			tr[x].insertBefore(online, tr[x].getElementsByTagName('td')[6]);
			tr[x].getElementsByTagName('td')[7].innerHTML = '<div align="center">'+petname+'</div>';
			}
			});		
	}