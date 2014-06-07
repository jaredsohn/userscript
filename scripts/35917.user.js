// ==UserScript==
// @name           Wurzelimperium Berater
// @namespace      *wurzelimperium.de*
// @include        http://s*.wurzelimperium.de/*
// ==/UserScript==


// ***************************************************
// *** Dieses Script zeigt die fehlenden Produkte  ***
// *** und die RentabilitÃ¤t der Zwerge (Kunden) an ***
// ***                                             ***
// *** Zu jedem Zwerg erscheint eine Blase mit den ***
// *** Produkten die nicht im Lager sind.          ***
// ***                                             ***
// *** Zu jedem Zwerg erscheint eine Blase mit dem ***
// *** Prozentsatz des Verkaufspreises im Vergleich***
// *** zum Markt. Zahlen Ã¼ber 100 bedeuten Gewinn  ***
// *** beim Verkauf an den Zwerg. Die Daten werden ***
// *** dabei vom Tool WimpStreet heruntergeladen,  ***
// *** wo immer tagesaktuelle Preise zu finden     ***
// *** sind.                                       ***
// ***                                             ***
// *** Um die Preise dort aktuell zu halten, habe  ***
// *** ich mich entschlossen den Machern von Wimp  ***
// *** Street etwas zurÃ¼ckzugeben. Daher fragt     ***
// *** dieses Script einige wenige aktuelle Preise ***
// *** des Servers ab und schickt sie Ã¼ber das     ***
// *** Eingabeformular auf der Seite zurÃ¼ck. Wenn  ***
// *** du dabei nicht mitmachen willst, schreibe   ***
// *** bitte in die Zeile unten                    ***
// *** "false" statt "true" und es werden keine    ***
// *** Preisdaten gesendet, die anderen Features   ***
// *** funktionieren trotzdem weiter.              ***
// ***************************************************

(function () {

// ***************************************************
var participate = true; // Dieser Wert darf verÃ¤ndert werden (siehe oben)
// ***************************************************

// Ab hier nichts mehr verÃ¤ndern!

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
var server = reg.exec(loc)[1];
var page = reg.exec(loc)[2];

switch (page) {
	case "verkauf_map": do_verkauf_map();break;
	case "verkauf": do_verkauf();break;
}

function urlencode(str) {
return escape(str).replace('+', '%2B').replace('%20', '+').replace('*', '%2A').replace('/', '%2F').replace('@', '%40');
}
var sum=0;
var sav;
var summe;
function do_verkauf(){
	frame=document.getElementById("kunde");
	divs=document.getElementsByTagName("div");
	divs[0].innerHTML=divs[0].innerHTML+"<br><span style='font-size:15px;font-weight:normal;'>(Marktpreise pro Stück)</span>";
	eintraege=divs[1].getElementsByTagName("div");
	sum=0;
	sav=divs[2+eintraege.length].innerHTML;
	summe=divs[2+eintraege.length];
	summe.style.top="300px";
	divs[4+eintraege.length].style.top="360px";
	for (var wr=0;wr<eintraege.length;wr++){
		plant=eintraege[wr].innerHTML.substr(eintraege[wr].innerHTML.indexOf(" ")+1);
		amount=eintraege[wr].innerHTML.substr(0,eintraege[wr].innerHTML.indexOf("x"));
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://aurora-glacialis.de/wi/rprice.php?server='+server+'&plant='+plant+'&id='+wr+'x'+amount,
			headers: {
				'User-agent': 'Mozilla/4.0',
			},
			onload: function(responseDetails00) {
				rs=responseDetails00.responseText;
				id=rs.substr(rs.indexOf("#")+1);
				amount=id.substr(id.indexOf("x")+1);
				row=id.substr(0,id.indexOf("x"));
				price=rs.substr(0,rs.indexOf("#"));
				sum=sum+(amount*price);
				//console.log(' id='+id+' amount='+amount+' row='+row+' price='+price+' sum='+sum);
				summe.innerHTML="<span style='font-size:15px;font-weight:normal;color:#0000dd;'>(Summe Marktpreis: "+Math.round(sum)+" wT)<br>(abzüglich Gebühr: "+Math.round(sum-(sum*0.1))+" wT)</span><br>"+sav;
				divs=document.getElementsByTagName("div");
				eintraege=divs[1].getElementsByTagName("div");
				eintraege[row].innerHTML=eintraege[row].innerHTML+" <span style='font-size:15px'>("+price+" wT)</span>";
			}
		});
	}
}

function do_verkauf_map(){
	//console.log ("erzeuge hinweise");	
	newbutt = document.createElement('button');
  	newbutt.setAttribute('type','button');
  	newbutt.style.position='absolute';
  	newbutt.style.right='5px';
  	newbutt.style.bottom='5px';
  	newbutt.innerHTML='Hinweise aktualisieren';
  	newbutt.setAttribute('onClick','document.location.reload(true);');
    document.getElementsByTagName("body")[0].appendChild(newbutt);
	wimps=document.getElementsByTagName("img");
	for (var ws=0;ws<wimps.length;ws++){
		if (wimps[ws].id.substr(0,1)=="i") {
			// Fetch missing
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://s'+server+'.wurzelimperium.de/verkauf.php?kunde='+wimps[ws].alt+'&kundemap='+wimps[ws].id,
				headers: {
					'User-agent': 'Mozilla/4.0',
				},
				onload: function(responseDetails) {
					var temp = document.createElement('div');
					temp.innerHTML=responseDetails.responseText;
					
					kunde=temp.getElementsByTagName("input")[0].value;
					kunde_map=temp.getElementsByTagName("input")[1].value;
					
					alldivs=temp.getElementsByTagName("div");
					var miss="";
					for (var ad=0;ad<alldivs.length;ad++){
						if (alldivs[ad].className=="rot") {
							miss=miss+alldivs[ad].innerHTML.substr(alldivs[ad].innerHTML.indexOf("x")+1)+"<br>";
						}
					}
					document.getElementById("blase"+kunde_map).style.zIndex=50;
					document.getElementById("blase"+kunde_map).style.top="1px";
					if (miss) {
						document.getElementById("blase"+kunde_map).innerHTML=document.getElementById("blase"+kunde_map).innerHTML+'<div style="position:absolute;top:70px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:3px;border:solid thin red;color: black;background-color: #FFDDDD;width:70px;font-size:0.8em;">Fehlt:<br>'+miss+'</div>';
					} else {
						document.getElementById("blase"+kunde_map).innerHTML=document.getElementById("blase"+kunde_map).innerHTML+'<div style="position:absolute;top:70px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:3px;border:solid thin green;color: black;background-color: #DDFFDD;width:70px;font-size:0.8em;">Alles auf Lager<br></div>';
					}
					// Fetch Calculation
					GM_xmlhttpRequest({
						method:'POST',
						url: 'http://aurora-glacialis.de/wi/rcalc.php?server='+server,
						headers: {'Content-type': 'application/x-www-form-urlencoded'},
						data: 'kunde='+kunde_map+'&liste='+urlencode(responseDetails.responseText),
						onload: function(responseDetails2) {
							res=responseDetails2.responseText;
							//console.log("Antwort");
							kunde_map=res.substr(0,res.indexOf("*"));
							proz=res.substr(res.indexOf("*")+1);
							if (proz<=100) {
								document.getElementById("blase"+kunde_map).innerHTML=document.getElementById("blase"+kunde_map).innerHTML+'<div style="position:absolute;top:35px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:3px;border:solid thin red;color: black;background-color: #FFDDDD;width:70px;font-size:0.8em;height:20px;">'+proz+'% des Marktwerts</div>';
							} else {
								document.getElementById("blase"+kunde_map).innerHTML=document.getElementById("blase"+kunde_map).innerHTML+'<div style="position:absolute;top:35px;-moz-border-radius: 5px;-webkit-border-radius: 5px;padding:5px;border:solid thin green;color: black;background-color: #DDFFDD;width:70px;font-size:0.8em;height:20px;">'+proz+'% des Marktwerts</div>';
							}
						}
					});
					if (participate==true) {
						if (Math.floor(Math.random()*101)<10) {
							blase=document.getElementById("blase"+kunde_map);
							plants=blase.getElementsByTagName("div");
							fetchPrice(plants[0].className.substr(2));
						}
					}
				}
			});
		}
	}
}

function fetchPrice(i) { 
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://s'+server+'.wurzelimperium.de/stadt/markt.php?order=p&v='+i+'&filter=1',
		headers: {
			'User-agent': 'Mozilla/4.0',
		},
		onload: function(responseDetails3) {
			var temp2 = document.createElement('div');
			temp2.innerHTML=responseDetails3.responseText;
			alltrs=temp2.getElementsByTagName("tr");
			plant=alltrs[3].getElementsByTagName("td")[1].getElementsByTagName("a")[0].href;
			plant=parseInt(plant.substr(27));		
			price=parseFloat(alltrs[3].getElementsByTagName("td")[3].innerHTML.replace(",","."))+parseFloat(alltrs[4].getElementsByTagName("td")[3].innerHTML.replace(",","."))+parseFloat(alltrs[5].getElementsByTagName("td")[3].innerHTML.replace(",","."));
			price=price/3;
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://aurora-glacialis.de/wi/addinfo.php?server='+server+'&plant='+plant+'&price='+price,
				headers: {
					'User-agent': 'Mozilla/4.0',
				},
				onload: function() {}
			});

		}
	});
}
})();