// ==UserScript==

// @name           Highscore von basti1012 zusammen gebaut testversion
// @namespace      zeigt in highscore geld promille onlinstatus und normalerweise tiere an da ich nur 5 links zu tieren habe werden nur die ersten 4 tiere angezeigt sobald ich mehr habe wird das aktualliesieret
// @author         fals einer schon mehr tiere hat bitte quellcode von den tier schicken
// @include        http://berlin.pennergame.de/highscore*

// @exclude        http://berlin.pennergame.de/highscore/gang/*

// ==/UserScript==

var highlightit0 = 5000;
var highlightit1 = 10000;
var highlightit2 = 20000;
var highlightit3 = 50000;
var highlightit4 = 75000;
var highlightit5 = 125000;		//Define Highlights


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
newth.innerHTML = "RegDatum";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[6]);

var newth = document.createElement('th');
newth.style.textAlign = "middle";
newth.innerHTML = "Online";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('th')[7]);

var msgth=tr[0].getElementsByTagName('th')[8];
msgth.style.textAlign = "middle";
msgth.innerHTML = "Haustier";

var laenge = tr.length;
var sig = "http://imgberlin.pennergame.de/cache/de_DE/signaturen/";

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
   	url: 'http://www.berlin.pennergame.de/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var newtd = document.createElement('td');
			var promille = document.createElement('td');
			var reg = document.createElement('td');
			
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
			

			newtd.innerHTML = "<div align='center'>&euro;" + mach(cash)+'';		//get Cash and set Style [newtd]
			
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);		//Fill in Cash [td[4]]
			
			
			promille.innerHTML = '<div align="center" style="overflow: hidden; width: 40px; height: 14px;"><img style="position: relative; top: -42px; left: -120px;" src="' + sig + id + '.jpg"></div>';		//set Sig-Code [promille]
			
			tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[5]);		//Fill in Sig-Code [td[5]]
			
			reg.innerHTML = '<div align="middle>'+dom.getElementsByTagName('reg_since')[0].textContent+'</div>';		//set Reg [reg]
			
			tr[x].insertBefore(reg, tr[x].getElementsByTagName('td')[6]);		//Fill in Reg [td[7]]

			
		}
		catch(err)
		{
			newtd.innerHTML = "<div align='center'>-</div>";
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			
			promille.innerHTML = "<div align='center'>-</div>";
			tr[x].insertBefore(promille, tr[x].getElementsByTagName('td')[5]);
			
			reg.innerHTML = '<div align="middle>'+dom.getElementsByTagName('reg_since')[0].textContent+'</div>';		//set Reg [reg]
			
			tr[x].insertBefore(reg, tr[x].getElementsByTagName('td')[6]);		//Fill in Reg [td[7]]

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
}		//cash Funktion

function Haustier(id,x) {
	GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://berlin.pennergame.de/profil/id:'+id+'/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			
			try {
			var online1 = content.split('Ist gerade')[1];
			var online2 = online1.split('</')[0];
			} catch(err) {
				var online2 ='Offline';
			}

			var online = document.createElement('td');		//get Online	[online]		
			
						
			
			
			try {
				var hausi1 = content.split('<div style="float:left; margin-top:12px;"><img src="')[1];
				var hausi2 = hausi1.split('"')[0];
											
				
					if(hausi2 == 'http://media.pennergame.de/img/tiere/94826.jpg')
				{
					
var petname = 'Elefant';
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/25834.jpg')
				{
					
var petname = 'Nashorn';
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/14896.jpg')
				{
					
var petname = 'Eisb&auml;r';
				}
				else if(hausi2 =='http://mediaberlin.pennergame.de/img/tiere/12536.jpg')
				{
					
var petname = '&Auml;ffchen';
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/43703.jpg')
				{
					
var petname = 'Tiger';
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73953.jpg')
				{
					
var petname = 'Krokodil';
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/98962.jpg')
				{
					
var petname  = "Giraffe";
				}
				else if(hausi2 == 'http://media.pennergame.de/img/tiere/64220.jpg')
				{
					
var petname  = "Nilpferd";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/90385.jpg')
				{
					
var petname  = "Pferd";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/32563.jpg')
				{
					
var petname  = "Chihuahua";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/62456.jpg')
				{
					
var petname  = "Cockerspaniel";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/15240.jpg')
				{
					
var petname  = "Pitbull";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/09051.jpg')
				{
					
var petname  = "Sch&auml;ferhund";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48263.jpg')
				{
					
var petname  = "Adler";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/12758.jpg')
				{
					
var petname  = "Pudel";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/62474.jpg')
				{
					
var petname  = "Hausziege";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/61402.jpg')
				{
					
var petname  = "Schlange";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/89386.jpg')
				{
					
var petname  = "Falke";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73735.jpg')
				{
					
var petname  = "Katze";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/21903.jpg')
				{
					
var petname  = "Frettchen";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/77310.jpg')
				{
					
var petname  = "Streifenhörnchen";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/73684.jpg')
				{
					
var petname  = "opossum";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/31451.jpg')
				{
					
var petname  = "Möwe";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/52483.jpg')
				{
					
var petname  = "Erdmänchen";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/02634.jpg')
				{
					
var petname  = "Clownfisch";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/92653.jpg')
				{
					
var petname  = "Rotkehlchen";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/75284.jpg')
				{
					
var petname  = "Grasfrosch";
				}
				else if(hausi2 == 'http://mediaberlin.pennergame.de/img/tiere/48264.jpg')
				{
					
var petname  = "Silberfisch";
				} else {
					
					
					try {
						
var petname = content.split('Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <b>')[1].split('</b>')[0];
					} catch (err) {
						
var petname = '<img src="http://mediaberlin.pennergame.de/img/premium.gif"></img></div>'
					}
				}			
				

				
				
			} catch (err) {
				
var petname = '<em>-</em>';
		