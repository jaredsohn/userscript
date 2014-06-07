// ==UserScript==
// @name           Pennergame Berlin Bandenprofil v2.9 (Berlin updates by me ;))
// @namespace      11235813[Bande:Kuestenpenner]
// @description    Zeigt auch Promille an. Punktemarkierung: Gr?n= Kannste angreifen. Rot=kann dich angreifen, du ihn aber nicht.
// @include 	   http://*mendigogame.es/profil/bande:*	
// ==/UserScript==
var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://inodes.pennergame.de/es_ES/avatare/");
var userid2 = userid1[1].split('_');
var userid=userid2[0];
var siglink = 'http://img.mendigogame.es/cache/bl_DE/signaturen/';

	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://www.mendigogame.es/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			
			var userpoints = dom.getElementsByTagName('points')[0].textContent;
			var angriffmax = Math.floor(userpoints*1.5);
			var angriffmin = Math.floor(userpoints*0.8);
			
			GM_setValue("angriffmax",angriffmax);
			GM_setValue("angriffmin",angriffmin);
			GM_setValue("userpoints",userpoints);
			
		}
					  });
var table = document.getElementsByTagName("table")[2];
var tr = table.getElementsByTagName("tr");
		

var siglink = "http://img.mendigogame.es/cache/bl_DE/signaturen/";
for (var x = 0; x <= tr.length; x++) {
	var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:');
	tr[x].getElementsByTagName("td")[1].style.width = '100px';
	tr[x].style.valign = "middle";
		var id = text1[1].split('/">');
	var points =tr[x].getElementsByTagName('td')[2].textContent;
	var maxatt = Math.floor(points*1.5);
	var minatt = Math.floor(points*0.8);
	if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
		tr[x].getElementsByTagName('td')[2].style.color = "#DF3918"; 
		}
		if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
		tr[x].getElementsByTagName('td')[2].style.color = "#99CC00"; 
		}
	Geldladen(id[0],x);
}




function Geldladen(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://mendigogame.es/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try {
        	 var cash = dom.getElementsByTagName('cash')[0].textContent;
			} catch(err) {
				var cash = -1;
			}
			var name = dom.getElementsByTagName('name')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var attref = 'http://mendigogame.es/fight/?to='+name;
			var newtd = document.createElement('td');
			var newtd1 =document.createElement('td');
			
			newtd1.style.width = "20px";
			var newtd5 = document.createElement('td');

			GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.mendigogame.es/profil/id:'+id+'/',
        onload: function(responseDetails,id) {
        	var content = responseDetails.responseText;
			try {
			var online1 = content.split('Está online')[1];
			var online2 = online1.split('</')[0];
			
			} catch(err) {
				var online2 ='Offline';
			}
			
			var location1 = content.split('Barrio</strong></td>')[1];
			var location2 = location1.split('<td bgcolor="#232323">')[1];
			var location3 = location2.split('</td>')[0];
						
			
			
			
			
			try {
				var hausi1 = content.split('<img src="http://media.mendigogame.es/img/tiere/fr')[1];
				var hausi2 = hausi1.split('"')[0];
				var mascota = content.split('<img style="margin-top:3px" src="http://www.mendigogame.es/headline/')[1];
				var mascota2 = mascota.split('/')[0];
				
							
				
			if(hausi2 == '94826.jpg')

			{
				var petname = 'Elefant';
			}
			else if(hausi2 == '25834.jpg')
			{
				var petname = 'Nashorn';
			}
			else if(hausi2 == '14896.jpg')
			{
				var petname = 'Eisb&auml;r';
			}
			else if(hausi2 =='http://media.mendigogame.es/img/tiere/12536.jpg')
			{
				var petname = '&Auml;ffchen';
			}
			else if(hausi2 == '4263.jpg')
			{
				var petname = 'Águila';
			}
			else if(hausi2 == '2536.jpg')
			{
				var petname = 'Monito';
			}
			else if(hausi2 == '1456.jpg')
			{
				var petname  = "Cockerspaniel";
			}
			else if(hausi2 == '8569.jpg')
			{
				var petname  = "Rinoceronte";
			}
			else if(hausi2 == '5687.jpg')
			{
				var petname  = "Tigre";
			}
			else if(hausi2 == '4843.jpg')
			{
				var petname  = "Cocodrilo";
			}
			else if(hausi2 == '2563.jpg')
			{
				var petname  = "Jirafa";
			}
			else if(hausi2 == '4220.jpg')
			{
				var petname  = "Hipopotamo";
			}
			else if(hausi2 == '7563.jpg')
			{
				var petname  = "Chihuahua";
			}
			else if(hausi2 == '5240.jpg')
			{
				var petname  = "Pitbull";
			}
			else if(hausi2 == '9051.jpg')
			{
				var petname  = "Pastor Alemán";
			}
			else if(hausi2 == '7760.jpg')
			{
				var petname  = "Gallo";
			}
			else if(hausi2 == '1482.jpg')
			{
				var petname  = "Serpiente";
			}
			else if(hausi2 == '9386.jpg')
			{
				var petname  = "Halcón";
			}
			else if(hausi2 == '3735.jpg')
			{
				var petname  = "Gato";
			}
			else if(hausi2 == '1903.jpg')
			{
				var petname  = "Hurón";
			}
			else if(hausi2 == '7730.jpg')
			{
				var petname  = "Conejo";
			}
			else if(hausi2 == '4591.jpg')
			{
				var petname  = "Canario";
			}
			else if(hausi2 == '3684.jpg')
			{
				var petname  = "Rata";
			}
			else if(hausi2 == '1451.jpg')
			{
				var petname  = "Paloma";
			}
			else if(hausi2 == '5423.jpg')
			{
				var petname  = "Hamster";
			}
			else if(hausi2 == '8795.jpg')
			{
				var petname  = "Ratón";
			}
			else if(hausi2 == '8930.jpg')
			{
				var petname  = "Pez rojo";
			}
			else if(hausi2 == '8596.jpg')
			{
				var petname  = "Cucaracha";
			} else {
				var petname = '<em>Desconocido</em>'
			}				
				newtd5.style.color = "#DF3918";
						
				
				
			} catch (err) {
				var petname = '<em>Desactivado</em>';
							}
					newtd5.innerHTML = '<div align="middle">'+petname+'</div>';

			
				if (online2 == 'Offline') {
					newtd1.innerHTML = '<div align="middle"><img src="http://kuestenpenner.ku.ohost.de/of.png></img></div>';						
					} else { 					
					newtd1.innerHTML='<div align ="middle"><img src="http://media.mendigogame.es/img/on.png></img></div>';
					}
			
			}
			});
							  
						
			var newtd2 = document.createElement('td');
			newtd3 = document.createElement('td');
			newtd3.innerHTML='<div align="middle">';
			newtd3.innerHTML +='<a href="'+attref+'">&oplus;</a></div>';
			newtd2.innerHTML= '<div align="middle">'+reg+'</div>';
		
			
			var newtd4 = document.createElement('td');
			var pskript = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div></div>'
			if (cash == -1) {
				var pskript = '<div align = "right" >---</div>';
			}
			newtd4.innerHTML = pskript;
			if (cash >= 15000*100){
			  newtd.style.color = "#efab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= 30000*100){
  	    newtd.style.color = "#25ab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= 50000*100){
  	    newtd.style.color = "#ef3422";
				newtd.style.fontWeight = "bold";
			}
			if(cash.length >= 9)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"</div>";
			}
			else if (cash.length>=6)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "</div>";
			}
			else if(cash.length>2)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "</div>";
			}
			else if(cash.length==2)
			{
			newtd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "</div>";
			}
			else if(cash== -1)
			{
			newtd.innerHTML = '<div align="right">&euro;n/a</div>';
			}
			else 
			{
			newtd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "</div>";
			}
			
				
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			tr[x].insertBefore(newtd1, tr[x].getElementsByTagName('td')[5]);
			tr[x].insertBefore(newtd5, tr[x].getElementsByTagName('td')[6]);
			tr[x].insertBefore(newtd2, tr[x].getElementsByTagName('td')[7]);
			tr[x].insertBefore(newtd3, tr[x].getElementsByTagName('td')[8]);
			tr[x].insertBefore(newtd4, tr[x].getElementsByTagName('td')[9]);


			
		
			
		}
	});
}


//Fixed
//Adaptado a la versión española por PeterMcDowell