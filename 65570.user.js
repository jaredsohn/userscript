// ==UserScript==
// @name All Pennergame ueberwachung alle Pennergame in einen Blick
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Zeigt in einen Fenster alle Penner an .Wenn ihr in allen 4.0 Pennergames online seid koennt ihr ueber die Seite www.pennergame.de/?zentrale/ alle penner auf einen Blick sehen 
// @include http://*pennergame.de/?zentrale/*
// @include http://*berlin.pennergame.de/?zentrale/*
// @include http://*menelgame.pl/?zentrale/*
// @include http://*dossergame.co.uk/?zentrale/*
// @include http://*mendigogame.es/?zentrale/*
// @include http://*clodogame.fr/?zentrale/*
// @include http://*serserionline.com/?zentrale/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf('/?zentrale/')>=0){
document.getElementsByTagName('html')[0].innerHTML = '<head><title>Penner Komandozentrale</title> <link rel="shortcut icon" href="http://static.pennergame.de/img/pv4/favicon.ico" /><link rel="stylesheet" type="text/css" href="http://static.pennergame.de/styles/pv4/pv4_modifiedFromV3.css" title="Main Stylesheet"  /><link rel="stylesheet" type="text/css" href="http://static.pennergame.de/styles/pv4/de_DE/screen_test.css" title="Main Stylesheet"  /></head>';


	function linkwahl(x){
		if(x<=7){
			if(x==1){
				var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
			} if(x==2){
				var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.berlin.pennergame.de/bl_DE/signaturen/';
			} if(x==3){
				var link = "http://www.clodogame.fr"
var sig = 'http://inodes.clodogame.fr/fr_FR/signaturen/';
			} if(x==4){
				var link = "http://www.mendigogame.es"
var sig = 'http://inodes.mendigogame.es/es_ES/signaturen/';
			} if(x==5){
				var link = "http://www.serserionline.com"
var sig = 'http://inodes.serserionline.com/tr_TR/signaturen/';
			} if(x==6){
				var link = "http://www.dossergame.co.uk"
var sig = 'http://inodes.dossergame.co.uk/uk_UK/signaturen/';
			} if(x==7){
				var link = "http://www.menelgame.pl"
var sig = 'http://inodes.menelgame.pl/pl_PL/signaturen/';
			}



			GM_xmlhttpRequest({
				method: 'GET', 
				url: ''+link+'/overview/',
				onload: function(responseDetails) {
					var content = responseDetails.responseText;
					id3 = content.split('href="/profil')[1].split('</h2>')[0];
					idd = id3.split('/id:')[1].split('/')[0];

					GM_xmlhttpRequest({
						method: 'GET',
						url: ''+link+'/dev/api/user.'+idd+'.xml',
						onload: function(responseDetails) {
							var parser = new DOMParser();
							var dom = parser.parseFromString(responseDetails.responseText, "application/xml");

					x++;

					linkwahl(x)
					versuch2(content,x,link,dom,sig)
}});
				}
			});
		}
	}

x=1;
linkwahl(x);



var body = document.createElement('body');
body.innerHTML = '<a href="/overview/"><- zur &Uuml;bersicht</a><br><center><h12 style="color: white;"><u>Penner Komandozentrale</u></h1></center><div name="link"</div><div name="link"</div><div name="link"</div><div name="link"</div><div name="link"</div><div name="link"</div><div name="link"</div>';
document.getElementsByTagName('html')[0].appendChild(body);
var links = document.createElement('div');
body.appendChild(links);




function versuch2(content,x,link,dom,sig){

	var name = dom.getElementsByTagName('name')[0].textContent;
	var id = dom.getElementsByTagName('id')[0].textContent;
	var platz = dom.getElementsByTagName('position')[0].textContent;
	var punkte = dom.getElementsByTagName('points')[0].textContent;
	var reg = dom.getElementsByTagName('reg_since')[0].textContent;
	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
	var city = dom.getElementsByTagName('city')[0].textContent;


	try{
		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
	}catch(e){
		cash ='- - -';
	}

	try{
		var bandeid = dom.getElementsByTagName('id')[1].textContent;
		var bande = dom.getElementsByTagName('name')[1].textContent;
		var status = dom.getElementsByTagName('status')[0].textContent;
		var joined = dom.getElementsByTagName('joined')[0].textContent;
	}catch(e){
		var bande = 'No';
		var bandeid = 'e';
	}

        if (status==3) {
       		var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif"><font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
 		var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==2) {
        	var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif"><font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
     		var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==1) {
       		var statu = '<img src="http://media.pennergame.de/img/bande/member.gif"><font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
 		var bandeergebniss = '<a href="/profil/bande:'+bandeid+'/" style="text-decoration: none;">'+bande+'</a>';
	}else if (status==0) {
		var statu = '-';
		var bandeergebniss = '-';
	}



	try{
		var cash = dom.getElementsByTagName('cash')[0].textContent/100;
		var promille = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="'   + sig + id + '.jpg"></div></div>';
	}catch(e){
		var promille = '- - -';
	}

						if (cash <= 1000000){
							farbe1 = "black";}
						if (cash <= 900000){
							var farbe1 = "gray";}
						if (cash <= 800000){
							farbe1 = "blue";}
						if (cash <= 700000){
							var farbe1 = "cyan";}
						if (cash <= 600000){
							farbe1 = "red";}
						if (cash <= 500000){
							var farbe1 = "green";}
						if (cash <= 400000){
							farbe1 = "magenta";}
						if (cash <= 300000){
							farbe1 = "orange";}
						if (cash <= 200000){
							var farbe1 = "yellow";}
						if (cash <= 100000){
							var farbe1 = "";}



try{
geld = content.split('class="v">')[2].split('</span>')[0];
}catch(e){
geld ='';
}

try{
stadt =  content.split('class="el2">')[1].split('</span>')[0];
}catch(e){
stadt='';
}


try{
pro = content.split('class="v">')[3].split('</li>')[0];
}catch(e){
pro='';
}

try{
def =    content.split('class="def">')[1].split('</span>')[0];
}catch(e){
def='';
}

try{
att =    content.split('"att">')[1].split('</span>')[0];
}catch(e){
att='';
}

try{
tieratt = content.split('class="att">+')[1].split('</span>')[0];
}catch(e){
tieratt='';
}

try{
tierdef = content.split('class="def">+')[1].split('</span>')[0];
}catch(e){
tierdef='';
}

try{
tiermit = content.split('class="mitleid">+')[1].split('</span>')[0];
}catch(e){
tiermit='';
}

try{
user = content.split('id="useronline">')[1].split('</li>')[0];
}catch(e){
user='';
}





try{
sauber = content.split('style="width: 323px;">')[1].split('<ul')[0];
}catch(e){
sauber='';
}

try{
spenden = content.split('Du hast heute ')[1].split(' Spenden')[0];
}catch(e){
spenden='';
}

try{
waffe = content.split('class="double')[1].split('href="/city/weapon_store/')[0].split('src="')[1].split('"')[0];
}catch(e){
waffe='';
}

try{
heim = content.split('class="double')[2].split('href="/city/home/')[0].split('src="')[1].split('"')[0];
}catch(e){
heim='';
}

try{
instru = content.split('class="double')[3].split('href="/city/music_store/')[0].split('src="')[1].split('"')[0];
}catch(e){
instru='';
}

try{
schnor = content.split('class="double')[4].split('href="/city/scrounge/')[0].split('src="')[1].split('"')[0];
}catch(e){
schnor='';
}



i=x-1;

if(i==1){
welchestadt = '<center><font style=\"color:yellow; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>  Pennergame Hamburg<<<<<<<<<<<'+link+'<<<<<<<<<<<<<<<<</font> </center><br>';
} if(i==2){
welchestadt = '<center><font style=\"color:orange; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>  Pennergame Berlin<<<<<<<<<<<<<<<'+link+'<<<<<<<<<<<<<</font> </center><br>';
} if(i==3){
welchestadt = '<center><font style=\"color:green; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>>  Pennergame Frankreich<<<<<<<<<'+link+'<<<<<<<<<<<<<<<<<<<</font> </center><br>';
} if(i==4){
welchestadt = '<center><font style=\"color:red; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>>>>  Pennergame Mendigogame<<<<<<<<<'+link+'<<<<<<<<<<<<<<<<<</font> </center><br>';
} if(i==5){
welchestadt = '<center><font style=\"color:blue; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>>>  Pennergame Istanbul<<<<<<<<<<<<'+link+'<<<<<<<<<<<<<<<</font> </center><br>';
} if(i==6){
welchestadt = '<center><font style=\"color:gray; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>>>  Pennergame Dossergame<<<<<<<<<'+link+'<<<<<<<<<<<<<<<<<<<</font> </center><br>';
} if(i==7){
welchestadt = '<center><font style=\"color:lila; font-size:130%;\">>>>>>>>>>>>>>>>>>>>>>>>  Pennergame Menelgame<<<<<<<<<<<'+link+'<<<<<<<<<<<<<<</font> </center><br>';
}


document.getElementsByName("link")[x].innerHTML = '<br>'+welchestadt+'<br>'
+'<strong>&nbsp;Sammelzeit: <div name="status3"</div><br>'
+'&nbsp;Weiterbildungszeit: <div name="status1"</div><br>'
+'&nbsp;Fighteit: <div name="status2"></div><br>'

+'&nbsp;Geld :'+geld+'<br>'
+'&nbsp;Promille : '+pro+'<br>'


+'&nbsp; <font style=\"color:blue; font-size:100%;\">Signatur Daten </font><br>'
+'&nbsp;Geld :<font style=\"color:'+farbe1+'; font-size:100%;\"> '+cash+'</font><br>'
+'&nbsp;Promille: '+promille+'<br>'

+'&nbsp;Regestrierungsdatum : '+reg+'<br>'
+'&nbsp;Ranking Punkte : '+rankingpoints+'<br>'

+'&nbsp;Bande : '+bandeergebniss+'<br>'
+'&nbsp;Status : '+statu+'<br>'
+'&nbsp;Bande erstellt : '+joined+'<br>'

+'&nbsp;Name : <a href="'+link+'/profil/id:'+id+'/" style="text-decoration: none;">'+name+'</a><br>'
+'&nbsp;Id : '+id+'<br>'
+'&nbsp;Stadt : '+stadt+'<br>'
+'&nbsp;Stadtid: '+city+'<br>'
+'&nbsp;Platz : '+platz+'<br>'
+'&nbsp;Punkte  : '+punkte+'<br>'
+''+sauber+'<br>'
+'&nbsp;Def : '+def+'<br>'
+'&nbsp;Att : '+att+'<br>'
+'&nbsp;Tieratt : '+tieratt+'<br>'
+'&nbsp;Tierdef : '+tierdef+'<br>'
+'&nbsp;Tiermit : '+tiermit+'<br>'
+'&nbsp;Spenden : '+spenden+'<br>'
+'&nbsp;Waffe : <img src="'+waffe+'"><br>'
+'&nbsp;EigenHeim : <img src="'+heim+'"><br>'
+'&nbsp;Instrument : <img src="'+instru+'"><br>'
+'&nbsp;Schnorplatz : <img src="'+schnor+'"><br>'
+''+user+'<br></strong>'
+'Gehe nach <a href="'+link+'"><font style=\"color:blue; font-size:130%;\">'+link+'</font></a><br>'


//function counterrelod(){
counter1 = content.split('type="text/javascript">counter(')[1].split(')')[0]/60;
document.getElementsByName("status1")[0].innerHTML = counter1;  
counter2 = content.split('type="text/javascript">counter(')[2].split(')')[0]/60;
document.getElementsByName("status2")[0].innerHTML = counter2; 
counter3 = content.split('type="text/javascript">counter(')[3].split(')')[0]/60;
document.getElementsByName("status3")[0].innerHTML = counter3; 
//}
//window.setInterval(counterrelod, 3000);

}
}
