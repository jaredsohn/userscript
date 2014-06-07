// ==UserScript==
// @name           Nachrichten sender Pennergame
// @namespace      Pennerhack ( visit: http://pennerhack.foren-city.de/ )
// @description    nachrichten sender unter voreingestellter funcktionen 
// @include        http://*pennergame.de/highscore/*
// @include        http://*menelgame.pl/highscore/*
// @include        http://*clodogame.fr/highscore/*
// @include        http://*mendigogame.es/highscore/*
// @include        http://*dossergame.co.uk/highscore/*
// @include        http://*serserionline.com/highscore/*
// @include        http://*bumrise.com/highscore/*
// @include        http://*bichionline.ru/highscore/*
// @include        http://*pivetgame.com.br/highscore/*
// @exclude          http://*board*

// @exclude       http://*redirect*

// ==/UserScript==


for(a=1;a<=10;a++){
GM_deleteValue("id"+a);
}


var url = document.location.href;
if (url.indexOf("berlin.pennergame.de")>=0) {
var siglink = "http://inodes.pennergame.de/bl_DE/signaturen/";
var link = "http://berlin.pennergame.de"


}
if (url.indexOf("http://www.pennergame")>=0) {
var siglink = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.pennergame.de"

}
if (url.indexOf("dossergame")>=0) {
var siglink = "http://inodes.pennergame.de/en_EN/signaturen/";
var link = "http://www.dossergame.co.uk"

}
if (url.indexOf("menelgame")>=0) {
var siglink = "http://inodes.pennergame.de/pl_PL/signaturen/";
var link = "http://www.menelgame.pl/"

}
if (url.indexOf("clodogame")>=0) {
var siglink = "http://inodes.pennergame.de/fr_FR/signaturen/";
var link = "http://www.clodogame.fr/"
}
if (url.indexOf("mendigogame.es")>=0) {
var siglink1 = "http://inodes.pennergame.de/es_ES/signaturen/";
var link = "http://www.mendigogame.es/"

}
if (url.indexOf("serserionline.com")>=0) {
var siglink1 = "http://inodes.pennergame.de/de_DE/signaturen/";
var link = "http://www.serserionline.com/"

}
if (url.indexOf("bumrise")>=0) {
var siglink1 = "http://inodes.pennergame.de/us_EN/signaturen/";
var link = "http://www.bumrise.com/"

}
if (url.indexOf("muenchen.pennergame")>=0) {
var siglink1 = "http://inodes.pennergame.de/mu_DE/signaturen/";
var link = "http://muenchen.pennergame.de/"
}


	var neu = document.getElementById('highscoreright');
	SubmitButtonHTML = '<b id="ausgabe"</b><b id="ergebniss"</b>';
	var newp = document.createElement("th");
	newp.innerHTML = '<br><br><br>'
	+'<br>Betreff : <br><input type="text" id="betreff" name="betreff" value="'+GM_getValue("betreff")+'"><br>Nachricht:<br><textarea id="neutext"  name="neutext" cols="50" rows="8"  value="'+GM_getValue("neutext")+'" ></textarea><br><input type="button" id="save" value="Sende nachricht speichern">'
	+'<font color=\"green\"><br>Einfach aussuchen wem geschrieben werden soll und das Script schreibt alle leute an die deinen wunsch erfuellen.(es werden maximal 9 nachrichten auf einmal gesendet wegen Spam sperre von PG)</font><br>'
	+'<select id="wemsenden">'
	+'<option value="1">Online</option>'
	+'<option value="2">Mit Bande</option>'
	+'<option value="3">Ohne Bande</option>'
	+'<option value="4">Gleiche Stadt wie ich</option>'
	+'</select>'
	+'<input type="button" id="allelinks" value="suchen und senden">'
	var newli = document.createElement("th");
	newli.appendChild(newp);
	newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br><b id='gesendet'</b>";
	neu.appendChild(newli);

document.getElementById('neutext').value = GM_getValue("neutext");

document.getElementById('save').addEventListener('click', function einstell () {
var neutext = document.getElementById('neutext').value;
var betreff = document.getElementById('betreff').value;
GM_setValue("neutext", neutext);
GM_setValue("betreff", betreff);
location.reload();
},false);

document.getElementById('allelinks').addEventListener('click', function einstell () {



	wer = document.getElementById('wemsenden').value;
GM_setValue("i", '0');
	if(wer==1){
		goprofil(wer);
	}else

	if(wer==2){
		api(wer);
	}else

	if(wer==3){
		api(wer);
	}else

	if(wer==4){
		feld = document.getElementById('my-profile').innerHTML;
		stadt= feld.split('class="el2">')[1].split('<')[0];
		goprofil(wer,stadt);
	}
},false);









function goprofil(wer,stadt){
	var table = document.getElementById("content").innerHTML;
	for(a=1;a<=20;a++){
		id = table.split('profil/id:')[a].split('/')[0];
		name = table.split('username">')[a].split('</a>')[0];
		weiter(id,name,wer,stadt,a)
	}
}
function weiter(id,name,wer,stadt,a){
	GM_xmlhttpRequest({
		method: 'GET',
		url: ''+link+'/profil/id:' + id + '/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			if(wer==1){
				var suche = content.search("Ist gerade Online");
				try{
					if (suche != -1) {
i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);

						var online = "<img src='http://media.pennergame.de/img/on.gif'></img>";
						document.getElementById('ausgabe').innerHTML += '<br><a href="'+link+'/profil/id:'+id+'/">'+name+'</a> ist '+online+'';
					} else {
						var online = "<img src='http://media.pennergame.de/img/off.gif'></img>";
						//document.getElementById('ausgabe').innerHTML += '<br><a href="'+link+'/profil/id:'+id+'/">'+name+'</a> ist '+online+'';
					}
				}catch(e){
				}

			}else if(wer==4){
				try{
    					var location1 = content.split('Stadtteil</strong></td>')[1].split('/td>')[0];
     				 	var location3 = location1.split('>')[1].split('<')[0];
		      		}catch(e){
					var location3 = '<font style=\"font-size:100%;\"><b>premium</b></font>';
				}
				if(location3==stadt){

i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);




					document.getElementById('ausgabe').innerHTML += '<br><a href="'+link+'/profil/id:'+id+'/">'+name+'</a> WOHNT IN '+location3+'';
				}
		        }



if(a==20){
ergebniss = GM_getValue("i");
document.getElementById('ergebniss').innerHTML += '<br>Habe '+ergebniss+' Penner mit deiner Einstellung gefunden';
senden()
}
		}
	});
}

















function api(wer){
	var table = document.getElementById("content").innerHTML;
	for(a=1;a<=20;a++){
		id = table.split('profil/id:')[a].split('/')[0];
		name = table.split('username">')[a].split('</a>')[0];
		weiterapi(id,name,wer,a)
	}
}
function weiterapi(id,name,wer,a){
	GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/dev/api/user.'+id+'.xml',
  		onload: function(responseDetails) {
  		var parser = new DOMParser();
  			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
  			var pts = dom.getElementsByTagName('points')[0].textContent;
			var name = dom.getElementsByTagName('name')[0].textContent;
			var id = dom.getElementsByTagName('id')[0].textContent;
  			var status = dom.getElementsByTagName('status')[0].textContent;

			if (status==3) {
				var statu = '<img src="http://media.pennergame.de/img/bande/admin.gif">';//<font style=\"color:blue; font-size:100%;\"><b> Admin</b></font>';
			}else if (status==2) {
				var statu = '<img src="http://media.pennergame.de/img/bande/coadmin.gif">';//<font style=\"color:orange; font-size:100%;\"><b> Co-Admin</font>';
			}else if (status==1) {
				var statu = '<img src="http://media.pennergame.de/img/bande/member.gif">';//<font style=\"color:grey; font-size:100%;\"><b> Mitglied</font>';
			}else if (status==0) {
				var statu = '-';
			}
			if(wer==3){
				if(status==0){

i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);



					document.getElementById('ausgabe').innerHTML += '<br><a href="'+link+'/profil/id:'+id+'/">'+name+'</a> Hat Keine Bande ';
				}
			}else if(wer==2){
			if(status==1){

i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);



				var bande = dom.getElementsByTagName('name')[1].textContent;
				var idbande = dom.getElementsByTagName('id')[1].textContent;
				document.getElementById('ausgabe').innerHTML += '<br>'+statu+'<a href="'+link+'/profil/id:'+id+'/">'+name+'</a> ist in der Bande <a href ="http://www.pennergame.de/profil/bande:'+idbande+'/">'+bande+'</a>';
			}else 
			if(status==2){
i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);


				var bande = dom.getElementsByTagName('name')[1].textContent;
				var idbande = dom.getElementsByTagName('id')[1].textContent;
				document.getElementById('ausgabe').innerHTML += '<br>'+statu+'<a href="'+link+'/profil/id:'+id+'/">'+name+'</a> ist in der Bande <a href ="http://www.pennergame.de/profil/bande:'+idbande+'/">'+bande+'</a>';
			}else 
			if(status==3){
i = GM_getValue("i");
i++;
GM_setValue("i",i);
GM_setValue("id"+a,id);


				var bande = dom.getElementsByTagName('name')[1].textContent;
				var idbande = dom.getElementsByTagName('id')[1].textContent;
				document.getElementById('ausgabe').innerHTML += '<br>'+statu+'<a href="'+link+'/profil/id:'+id+'/">'+name+'</a> ist in der Bande <a href ="http://www.pennergame.de/profil/bande:'+idbande+'/">'+bande+'</a>';
			}
			}


if(a==20){
ergebniss = GM_getValue("i");
document.getElementById('ergebniss').innerHTML += '<br>Habe '+ergebniss+' Penner mit deiner Einstellung gefunden';
senden()
}

		}
	});
}


function senden(){

for(a=1;a<=10;a++){
sendenjanein = GM_getValue("id"+a);
if(sendenjanein == null){
}else{
sender(sendenjanein);
}
}
}






function sender(sendenjanein){

	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname=id:'+sendenjanein+'&f_subject='+GM_getValue("betreff")+'&f_text='+GM_getValue("neutext")+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails){
document.getElementById('gesendet').innerHTML += '<br>Letzte Nachricht an '+sendenjanein+' gesendet';//<br>Betreff :<br>'+GM_getValue("betreff")+'<br>Nachricht :<br>'+GM_getValue("neutext")+'</font>';
	}
});

//alert(sendenjanein)

 }
