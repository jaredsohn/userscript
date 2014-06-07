// ==UserScript==
// @name           Banden nachricht att all 
// @author         http://pennerhack.foren-city.de 
// @namespace      basti1012
// @description    mit diesen script kann jeder seiner ganzen bande eine private nachricht schreiben ohne allen das gleiche kopieren zu muessen . es wird nur so schnell gesendet damit auch keine spam sperre eingeschaltet wird
// @include        *pennergame.de/gang/memberlist/*
// @include        *clodogame.fr/gang/memberlist/*
// @include        *berlin.pennergame.de/gang/memberlist/*
// @include        *menelgame.pl/gang/memberlist/*
// @include        *dossergame.co.uk/gang/memberlist/*
// @include        *mendigogame.es/gang/memberlist/*
// @include        *serserionline.com/gang/memberlist/*
// @include        *bumrise.com/gang/memberlist/*
// @include        *muenchen.pennergame.de/gang/memberlist/*
// @exclude        *highscore*
// ==/UserScript==



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




var neu = document.getElementsByClassName("tieritemA")[0];
SubmitButtonHTML = '<br>Betreff : <br><input type="text" id="betreff" name="betreff" value=""><br>Nachricht:<br><textarea name="neutext" cols="50" rows="8" id="neutext" ></textarea><br><input type="button" name="senden" id="senden" value="angekreuzten penner eine nachricht senden " />';
var newp = document.createElement("tr");
newp.innerHTML = '<b id="id1"</b><br><b id="id2"</b><br><b id="id3"</b>';
var newli = document.createElement("tr");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);


var membertableh = document.getElementsByClassName('tieritemA')[0];
var tr = membertableh.getElementsByTagName('tr');
var membertable = document.getElementById('pgmemberlist-table');
for (var z=1; z<=30; z++) {
	try{
		var trg = membertable.getElementsByTagName('tr')[z].innerHTML;
		var namen = trg.split('/profil/id:')[1].split('</td>')[0];
		var id = namen.split('">')[1].split('</a>')[0];
		i = z-1;
		GM_setValue("sendernamen"+i , id);
		var newnotiztd = document.createElement('td');
		newnotiztd.innerHTML = '<input type="checkbox" name="sender" id="sender"+i/>'+id+'';
		tr[z+1].insertBefore(newnotiztd, tr[z+1].getElementsByTagName('td')[5]);
	}catch(e){}
}





document.getElementsByName('senden')[0].addEventListener('click', function save_spenden () {


var neutext = document.getElementsByName('neutext')[0].value;
var betreff = document.getElementsByName('betreff')[0].value;
GM_setValue("neutext", neutext);
GM_setValue("betreff", betreff);
	GM_setValue("i", '0');
	function checkfelder_check(){
		i = GM_getValue("i")
		weiter(i)
		i++;
		GM_setValue("i" , i);

	if(i<=30){
		ergebniss = 100/30;
		neuergebniss = ergebniss*i;
		document.getElementById('id3').innerHTML = '<font style=\"color:yellow; font-size:140%;\">Sendestatus '+neuergebniss+' % abgeschlossen </font>';
	}

	}




function weiter(i){
		if(i<=30){
			try{
				var ee = document.getElementsByName("sender")[i].checked;
				if(ee ==true){
					var wer = GM_getValue("sendernamen"+i)
					document.getElementById('id1').innerHTML = '<font style=\"color:gren; font-size:140%;\">'+wer+' Bekommt gerade eine Nachricht</font>';
					senden(wer)
				}else{
					var wer = GM_getValue("sendernamen"+i)
					document.getElementById('id1').innerHTML = '<font style=\"color:blue; font-size:140%;\">'+wer+' Bekommt nix</font>';
				}
			}catch(err){
			}
		}
	}



function senden(wer){


	GM_xmlhttpRequest({
		method: 'POST',
		url: ''+link+'/messages/write/send/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('f_toname='+wer+'&f_subject='+GM_getValue("betreff")+'&f_text='+GM_getValue("neutext")+'&f_did=&submit=Nachricht+verschicken'),
		onload: function(responseDetails){
document.getElementById('id2').innerHTML = '<font style=\"color:black; font-size:140%;\">Letzte Nachricht an '+wer+' gesendet<br>Betreff :<br>'+GM_getValue("betreff")+'<br>Nachricht :<br>'+GM_getValue("neutext")+'</font>';
	}
});

}



window.setInterval(checkfelder_check, 10500)

},false);



