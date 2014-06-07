// ==UserScript==
// @name           Banden-Profil-Delux Version 2010 ( ink 3 Uhr rechner ) By Basti1012
// @namespace      by basti1012 
// @description    Zeigt alles an was man wissen muss wenn bei einer bande auf das profil geht by basti1012 Zeigt premium tiere premium player und geloeschte penner an ( neu mit 3 uhr rechner )
// @include       http://*.pennergame.de/profil/bande*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
if (url.indexOf("http://www.berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
var id1 = document.getElementById("my-profile").innerHTML.split('/profil/id:')[1];
var id = id1.split('/')[0];


GM_xmlhttpRequest({
  method: 'GET',
 url: ''+link+'/dev/api/user.'+id+'.xml',
  		onload: function(responseDetails) {
  		var parser = new DOMParser();
  			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
  			var pts = parseInt(dom.getElementsByTagName('points')[0].textContent);
			var minPts = parseInt(pts - pts * 0.2);
			var maxPts = parseInt(pts + pts * 0.5);
	var pts = GM_setValue("pts" ,pts);
	var max = GM_setValue("minPts" ,minPts);
	var min = GM_setValue("maxPts" ,maxPts);

}});


var table = document.getElementsByTagName("table")[2];
table.setAttribute('cellpadding', '1px');
var tr = table.getElementsByTagName("tr");
for (var x = 0; x < tr.length; x++) {
  if (x%2 == 0){
	  tr[x].setAttribute('style', 'background:#222222;');
	}
	var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:');
	var id = text1[1].split('/"');


	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'reg'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:100px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'stadt'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:left;width:100px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'geld'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:100px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'promille'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:60px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'tier'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:150px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'onlinestatus'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:14px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'schlecht'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:center;width:14px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'angreifen'+x);
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:20px;');

	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', 'nachricht'+x);	
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:20px;');


	var newtd = tr[x].appendChild(document.createElement('td'));
	newtd.setAttribute('id', '3uhr'+x);	
	newtd.setAttribute('style', 'vertical-align:middle;text-align:right;width:20px;');

	var text11 = tr[x].getElementsByTagName("td")[2].innerHTML.split('style="')[1];
	var dabe = text11.split('"')[0];

rechnen(dabe)
 	Geldladen(id[0],x);
}
	var newtr = document.createElement('tr');
        var newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:left;');
        newtd.innerHTML = "Pennername";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Punkte";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "regdatum";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Stadt";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Geld";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "Promille";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:center;');
        newtd.setAttribute('style', 'font-weight:bold;text-decoration:underline;text-align:right;');
        newtd.innerHTML = "3 UhrPunkte";
        newtd.innerHTML = "Haustier";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        newtd = newtr.appendChild(document.createElement('td'));
        newtd.innerHTML = "&nbsp;";
        table.getElementsByTagName('tbody')[0].insertBefore(newtr, tr[0]);

function rechnen(dabe){

	var pts = GM_getValue("pts");
	var max = GM_getValue("minPts");
	var min = GM_getValue("maxPts");
	try{
		dabei = dabe.split('color: rgb(')[1].split(',')[0];
		if(Number(dabei) >= 240){
 			document.getElementById('angreifen'+x).innerHTML = '<img src="http://www.fotos-hochladen.net/gelbfightv3dlkm2z.jpg">';
		}else
		if(Number(dabei) <= 50){
			document.getElementById('angreifen'+x).innerHTML = '<img src="http://www.fotos-hochladen.net/gruen2fight7k8iqwzr.jpg">';
		}
	}catch(err){
 	document.getElementById('angreifen'+x).innerHTML = '<img src="http://www.fotos-hochladen.net/rotfight6esitcmg.jpg">';
}

}

//http://www.fotos-hochladen.net/blaufightw920zm4o.jpg
//http://www.fotos-hochladen.net/gelbfightv3dlkm2z.jpg
//http://www.fotos-hochladen.net/view/gruen1fightu2x6aifw.jpg
//http://www.fotos-hochladen.net/gruen2fight7k8iqwzr.jpg
//http://www.fotos-hochladen.net/rotfight6esitcmg.jpg

function Geldladen(id,x) {
	GM_xmlhttpRequest({
    		method: 'GET',
   		url: ''+link+'/dev/api/user.' + id + '.xml',
    		onload: function(responseDetails) {
    			var parser = new DOMParser();
    			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var pts = dom.getElementsByTagName('points')[0].textContent;
			var username = dom.getElementsByTagName('name')[0].textContent;
				try{
				  	cash = dom.getElementsByTagName('cash')[0].textContent;
    					document.getElementById('geld'+x).innerHTML = '&euro;' + mach(cash);
					document.getElementById('promille'+x).innerHTML = '<div style="float:right;overflow: hidden; width: 40px; height: 10px;"><img style="position: relative; top: -45px; left: -120px;" src="' + sig + id + '.jpg"></div>';
				}catch(err){
        				document.getElementById('geld'+x).innerHTML = '<span style="font-size:10px; color:#555555;">N/A</span>';
					document.getElementById('promille'+x).innerHTML = '<span style="font-size:10px; color:#555555;">N/A</span>';
				}
					var reg = dom.getElementsByTagName('reg_since')[0].textContent;
				try{
					GM_xmlhttpRequest({
						method: 'GET',
						url: ''+link+'/highscore/user/?name='+username+'&gang=&district=0&min=&max=',
						onload: function(responseDetails) {
							var cont = responseDetails.responseText;	
							var feld = cont.split('<div>Punkte</div>')[1];
							var feld1 = feld.split('class="even">')[0];
							var feld2 = feld1.split('class="col5">')[1];
							var dreiuhr = feld2.split('</td>')[0];
							neu = dreiuhr-pts;
							if(neu>0){
								var neua = '<font style=\"color:green; font-size:100%;\"><b>'+neu+'</b></font><img src="http://www.fotos-hochladen.net/grueenjg0wkviy.jpg" height="12" width="12"></img>';
							}else
							if(neu<0){
								var neua = '<font style=\"color:red; font-size:100%;\"><b>'+neu+'</b></font><img src="http://www.fotos-hochladen.net/rot23djkrpo.jpg" height="12" width="12"></img>';
							}else
							if(neu==0){
								var neua = '<font style=\"color:yellow; font-size:100%;\"><b>'+neu+'</b></font><img src="http://www.fotos-hochladen.net/gelbq62f85lu.jpg" height="12" width="12"></img>';
							}
								document.getElementById('3uhr'+x).innerHTML = neua;
							}
					});	
				}catch(e){}

				document.getElementById('reg'+x).innerHTML = reg;
				document.getElementById('angreifen'+x).setAttribute('profilid', id);
				document.getElementById('angreifen'+x).setAttribute('username', username)
				document.getElementById('nachricht'+x).innerHTML = "<a href=\"/messages/write/?to="+id+"\"><img style\"margin:5px;\" src=\"http://media.pennergame.de/img/overview/new_msg.gif\" title=\""+username+" eine Nachricht schreiben.\"></a>";
			}
		});

		GM_xmlhttpRequest({
			method: 'GET',
			url: ''+link+'/profil/id:' + id + '/',
			onload: function(responseDetails) {
			var content = responseDetails.responseText;
			try{
    				var hausi5 = content.split('margin-top:12px;">')[1];
    				var hausi3 = hausi5.split('</div>')[0];

    				var hausi4 = hausi3.split('<img src="')[1];
    				var hausi2 = hausi4.split('"')[0];

if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/94826.jpg'){var petname = 'Elefant';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/25834.jpg'){var petname = 'Nashorn';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/14896.jpg'){var petname = 'Eisb&auml;r';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12536.jpg'){var petname = '&Auml;ffchen';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/43703.jpg'){var petname = 'Tiger';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73953.jpg'){var petname = 'Krokodil';}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/98962.jpg'){var petname  = "Giraffe";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/64220.jpg'){var petname  = "Nilpferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/90385.jpg'){var petname  = "Pferd";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/32563.jpg'){var petname  = "Chihuahua";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62456.jpg'){var petname  = "Cockerspaniel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/15240.jpg'){var petname  = "Pitbull";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/09051.jpg'){var petname  = "Sch&auml;ferhund";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/48263.jpg'){var petname  = "Adler";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/12758.jpg'){var petname  = "Pudel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/62474.jpg'){var petname  = "Hausziege";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/61402.jpg'){var petname  = "Schlange";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/89386.jpg'){var petname  = "Falke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73735.jpg'){var petname  = "Katze";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/21903.jpg'){var petname  = "Frettchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/77310.jpg'){var petname  = "Hase";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73684.jpg'){var petname  = "Ratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/31451.jpg'){var petname  = "Taube";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/52483.jpg'){var petname  = "Wellensittich";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/73308.jpg'){var petname  = "Hamster";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/11836.jpg'){var petname  = "Maus";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/68930.jpg'){var petname  = "Goldfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/de_DE/tiere/00001.jpg'){var petname  = "Kakerlake";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48264.jpg'){var petname  = "Silberfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/75284.jpg'){var petname  = "Grasfrosch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/92653.jpg'){var petname  = "Rotkelchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/02634.jpg'){var petname  = "Clownfisch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/01743.jpg'){var petname  = "Erdm&auml;nnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11542.jpg'){var petname  = "M&ouml;we";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/66294.jpg'){var petname  = "Opossum";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11634.jpg'){var petname  = "Streifenh&ouml;rnchen";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/11743.jpg'){var petname  = "Igel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/47838.jpg'){var petname  = "Hausschwein";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/94652.jpg'){var petname  = "Schneeeule";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/65384.jpg'){var petname  = "Bisamratte";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/18540.jpg'){var petname  = "Moorschnucke";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/76538.jpg'){var petname  = "Yorkshire Terrier";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/64133.jpg'){var petname  = "Habicht";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/48256.jpg'){var petname  = "Collie";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/98641.jpg'){var petname  = "Dogge";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/28463.jpg'){var petname  = "Retriever";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/32563.jpg'){var petname  = "Mops";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/96242.jpg'){var petname  = "Elch";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/85242.jpg'){var petname  = "Zebra";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/99624.jpg'){var petname  = "Kamel";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/13323.jpg'){var petname  = "Riesenschildkr&ouml;te";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/83290.jpg'){var petname  = "Leopard";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/37551.jpg'){var petname  = "Waschb?r";}
      else if(hausi2 == 'http://static.pennergame.de/img/pv4/shop/bl_DE/tiere/73933.jpg'){var petname  = "Maus (Geld)";}

	var suche = content.search("selbsterstelltes Haustier");
	if (suche != -1) {
  		  var hausi55 = content.split('selbsterstelltes Haustier')[2];
  		  var hausi33 = hausi55.split('Haustier zu erstellen')[0];
   		  var hausi555 = hausi33.split('<b>')[1];
   		  var hausi33 = hausi555.split('</b>')[0];
		  var petname = '<a class="tooltip" href="/premium/"><font style=\"color:green; font-size:100%;\">[Premium]</font><span><b>selbsterstelltes Haustier</b><br>Bei dem Tier handelt es sich um ein selbsterstelltes Haustier und basiert auf den Basiswerten von <font style=\"color:green; font-size:100%;\"><b>'+hausi33+'</b></font><br><br>Klicke hier um auch Dir ein eigenes Haustier zu erstellen</span></a>';
	}
}catch(e){
var petname = '--';
}

try{
     var location1 = content.split('Stadtteil</strong></td>')[1];
     var location3 = location1.split('</td>')[0];
}catch(e){
	var location3 = '<font style=\"color:green; font-size:100%;\"><b>premium</b></font>';
}
try{
	var geschlecht2 = content.split('http://static.pennergame.de/img/pv4/icons/')[1];
	var geschlecht  = geschlecht2.split('.jpg"')[0];
	var suche = content.search("male");
	if (suche != -1) {
		var geschlecht_image = '<div style="display:inline-block;"><img src="http://static.pennergame.de/img/pv4/icons/male.jpg" height="12" width="12"></img></div>&nbsp;&nbsp;';
	}
	var suche1 = content.search("female");
	if (suche1 != -1) {
		var geschlecht_image = '<div style="display:inline-block;"><img src="http://static.pennergame.de/img/pv4/icons/female.jpg" height="12" width="12"></img></div>&nbsp;&nbsp;';
	}
} catch(err) {
var suche1 = content.search("scht oder vom Spiel verbannt!");
if (suche1 != -1) {
var geschlecht_image = '<font style=\"color:green; font-size:100%;\">[X]</font>';
}
tr[x].setAttribute('style', 'background:red;');
}   


document.getElementById('stadt'+x).innerHTML = location3;
document.getElementById('tier'+x).innerHTML = petname;     
document.getElementById('schlecht'+x).innerHTML = geschlecht_image;
var suche = content.search("Ist gerade Online");
		try{
			if (suche != -1) {
				var online2a = "<img src='http://media.pennergame.de/img/on.gif'></img>";
				}
			else {
				var online2a = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			};
		}catch(e){
			var online2a = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
		}
          document.getElementById('onlinestatus'+x).innerHTML = online2a;


		}
	});
}

