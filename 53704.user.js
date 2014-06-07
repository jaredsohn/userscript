// ==UserScript==
// @name           Pennergame spionage Hamburg Berlin Muenchen version(1.4)
// @namespace      http://pennerhack.foren-city.de [pennerhack] oder auch unter basti1012 bekannt 
// @description    Zeigt alles an was man wissen muss zeigt alle verlaufe wie punkte geld und highscore an auch der bande der letzen 7 tage und so weiter 
// @include        http://*pennergame*
// @exclude      *login*
// @exclude      *board*
// ==/UserScript==


// muss auf true stellen damit bei der ersten installation updates angezeigt werden koennen . wer keine updates will
// schreibt false rein und wird nur noch updates kriegen wenn  er die unter settings wieder anschalten tut 


if (document.location.href.indexOf('/profil/id:')>=0) {
var ausgab = document.getElementById('content').innerHTML;
var wer = ausgab.split('/friendlist/?friend=')[1].split('"')[0];
//var wer = document.URL.split('/profil/id:')[1].split('/')[0];
var wo = document.URL.split('http://')[1].split('.pennergame')[0];
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var wo = 'berlin';
}
if(document.location.href.indexOf('www.pennergame.de/')>=0) {
var wo = 'hamburg';
}
if(document.location.href.indexOf('muenchen.pennergame.de')>=0) {
var wo = 'muenchen';
}
weiter(wer,wo)
}

if(GM_getValue("update")==null){
	GM_setValue("update",'true');
}



if(GM_getValue("spio")==null){
	GM_setValue("spio",'90');
}

if(GM_getValue("spio1")==null){
	GM_setValue("spio1",'1190');
}


if(GM_getValue("ersteinstalation")==null){
alert("Bei der ertsen instalation bitte unter /settings/ gehen und die positsionen und die Bildgroesse einstellen\nDa die Update Funktion noch nicht so geht wie ich das will muss bei der ersten installation,\nFolgenes gemacht werden\n Einmal den Hacjken aus den kasten machen und speichjern\nDanach den Hacken wieder rein machen und wieder speichern.\nDanach solte die Update Funktion auch wieder Funktionieren also bitte so machen dann solte auch alles klappen\nMfg Basti1012");
	GM_setValue("ersteinstalation",'true');
}




// einstellbereich was das script alle darf und machen soll ist in allen pennergames aufindbar und laest sich auch in jeden pennergame einstellen
// egal in welchen game man es einstellt es wird dann in jeden spiuel auch so angezeigt also immer dran denken die einstellungen die man vornehmen tut
// werden auch in jeden game so uebernommenb besten dank mfg basti1012

var url = document.location.href;
if (url.indexOf("/settings/")>=0) {
	var neu = document.getElementsByTagName("table")[0];
	SubmitButtonHTML = '';
	var newp = document.createElement("tr");
	newp.innerHTML = '<br><br><br>'
	+'<font color=\"green\">Positsion des Buttons von Oben</font><br>'
	+'<input type="text" name="spio"><br>'
	+'<font color=\"green\">Positsion des Buttons von Links</font><br>'
	+'<input type="text" name="spio1"><br>'
	+'<font color=\"green\">Gr&ouml;sse der Bilder einstellen.</font><br>'
	+'<select name="bildgross">'
	+'<option value="grosss=100klein50=">klein</option>'
	+'<option value="grosss=200klein100=">normal klein</option>'
	+'<option value="grosss=300klein150=">Normal </option>'
	+'<option value="grosss=400klein200=">Normale gross</option>'
	+'<option value="grosss=500klein250=">etwas gross</option>'
	+'<option value="grosss=600klein300=">Gross(original groesse)</option>'
	+'<option value="grosss=700klein350=">Noch gr&ouml;ser</option>'
	+'<option value="grosss=800klein400=">sehr gross</option>'
	+'<option value="grosss=900klein450=">riesieg</option>'
	+'<option value="grosss=1000klein500=">sehr riesig</option>'
	+'<option value="grosss=1100klein550=">Mega gross</option>'
	+'<option value="grosss=1200klein600=">Letze gr&ouml;sse mega hammer hard gross</option>'
	+'<option value="grosss=1400klein700=">riesieg</option>'
	+'<option value="grosss=0klein0=">-- Ab hier ist sehr gross benutzung auf eigener gefahr --</option>'
	+'<option value="grosss=1600klein800=">--(Sehr riesig xl )(achtung guten pc notwendig)--</option>'
	+'<option value="grosss=1800klein900=">--(Sehr riesig xxl )(achtung sehr guten pc notwendig)--</option>'
	+'<option value="grosss=2000klein1000=">--(Sehr riesig xxxl )(achtung hightec pc notwendig)--</option>'
	+'</select>'
	+'<font color=\"green\">Automatische Update benachrichtigung wieder aktivieren</font>'
	+'<input type="checkbox" name="update"/><br>'
	+'<input type="button" name="spinagesichern" value="Angegebene Spionage daten sichern"><br>'
	var newli = document.createElement("tr");
	newli.appendChild(newp);
	newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
	neu.appendChild(newli);





	document.getElementsByName("bildgross")[0].value = GM_getValue("bildgross");
	document.getElementsByName("spio")[0].value = GM_getValue("spio");
	document.getElementsByName("spio1")[0].value = GM_getValue("spio1");
	document.getElementsByName("update")[0].checked = GM_getValue("update");

	document.getElementsByName('spinagesichern')[0].addEventListener('click', function save_spenden () {
		GM_setValue("bildgross", document.getElementsByName("bildgross")[0].value);
		GM_setValue("spio", document.getElementsByName("spio")[0].value);
		GM_setValue("spio1", document.getElementsByName("spio1")[0].value);
		GM_setValue("update", document.getElementsByName("update")[0].checked);
		alert("Positsion \nVon oben : "+GM_getValue("spio")+"\nVon Links : "+GM_getValue("spio1")+" \nUpdates aktiv : "+GM_getValue("update")+"\n Groese der Bilder wurde auf "+GM_getValue("bildgross")+" eingestellt \nWurde soeben gespeichert\nViel spass mit den Spionage Script By  Basti1012")
		window.location.reload();
	},false);
}


// hier wird ueber userscripts.org ne update abfrage gemacht ob es neue script version gibt .
// fals ja wird es angezeigt und auch fruehere versionen kopennen bei bedarf wiexder instaliert werden 

updatejanein = GM_getValue("update");
if(updatejanein == true){
	GM_xmlhttpRequest({
  		method: 'GET',
   		url: "http://userscripts.org/scripts/show/53704",
        	onload: function(responseDetails) {
        		var acontent = responseDetails.responseText;
				var weiterbildung = acontent.split('version(')[1];			
				var weiterbildung1 = weiterbildung.split(')')[0];
				if(weiterbildung1 == '1.4'){
				}else{
					var aktuell = acontent.split('version(')[1].split(')')[0];
					var hinweis = acontent.split('22222222')[1].split('33333333')[0];
					var menue='<font style=\"color:yellow; font-size:180%;\"><b>Aktuelle neue Version ist '+aktuell+'<br><br>'+hinweis+'</b></font><br><input type="button" name="keineupdates" id="keineupdates" value="Keine Updates mehr " />';

					var NewXtraMenueDiv = document.createElement('div');
					NewXtraMenueDiv.innerHTML += '<span name="PlunderInfoScreen" style="position:absolute;top:222px;left:433px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:1.8;opacity:1.8;border:1px solid red; background-color:black;">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center>'+menue+'</center></span></span>';
					document.body.appendChild(NewXtraMenueDiv);

					document.getElementsByName('keineupdates')[0].addEventListener('click', function save_spenden () {
						GM_setValue("update" ,'false');
						alert("Ab sofort werden keine neue Updates mehr angezeigt .Um wieder Update Hinweise zu kriegen muss unter Einstellungen die Updates wieder Aktivieren");
						window.location.reload();
					},false);
				}	
			}
	});
}


var spionagebuttonerstellen = document.createElement('div');
spionagebuttonerstellen.innerHTML += '<span name="spionagebuton" style="position:absolute;top:'+GM_getValue("spio")+'px;left:'+GM_getValue("spio1")+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.0;opacity:1.0;border:0px solid red; /*background-color:black;*/">&nbsp;&nbsp;<span style=" color:#FFFFFF"><center><input type="button" id="spionage" value="Spionieren gehen"></center></span></span>';
document.body.appendChild(spionagebuttonerstellen);



document.getElementById('spionage').addEventListener('click', function brot_essen(){
	document.getElementById('content').innerHTML ='<input type="text" id="wer" value=""><input type="button" id="los1" value="Hamburger spieler"><input type="button" id="los2" value="Berliner Spieler suchen "> <input type="button" id="los3" value="M&uuml;nchener Spieler suchen ">';
					
	document.getElementById('los1').addEventListener('click', function starten(){
		wer = document.getElementById('wer').value;
		wo ='hamburg';
		weiter(wer,wo)
	},false);

	document.getElementById('los2').addEventListener('click', function starten(){
		wer = document.getElementById('wer').value;
		wo ='berlin';
		weiter(wer,wo)
	},false);

	document.getElementById('los3').addEventListener('click', function starten(){
		wer = document.getElementById('wer').value;
		wo ='muenchen';
		weiter(wer,wo)
	},false);
},false);















	function weiter(wer,wo){
	bildg = GM_getValue("bildgross");
	yachse = bildg.split('grosss=')[1].split('klein')[0];
	xachse = bildg.split('klein')[1].split('=')[0];
		GM_xmlhttpRequest({
			method: 'POST',
			url: 'http://pg-'+wo+'.cy-media.net/spion.php/',
			headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: encodeURI('select=name&spio_id='+wer+'&Button=Auschn%C3%BCffeln'),
    			onload: function(responseDetails){
                		var content = responseDetails.responseText;
				try{
					var hauptfeld = content.split('<div class="post_top">')[1].split('Richtigkeit')[0];
					var bildavater1 = hauptfeld.split('src="http://inodes.pennergame.de/')[1].split('.jpg')[0];
					var bildavater = '<img src="http://inodes.pennergame.de/'+bildavater1+'.jpg"</img>';
					var name = hauptfeld.split('/friendlist/?friend=')[1].split('/')[0];
					var id = hauptfeld.split('/write/?to=')[1].split('/')[0];
					var bildschrieft = '<img src="http://www.pennergame.de/headline/'+name+'/"</img>';

					var fight = '<a href="http://www.pennergame.de/fight/?to='+name+'" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/att.png" style="border: medium none; vertical-align: middle;" 					alt="'+name+' in '+wo+' angreifen und mit gl&uuml;ck gewinnen" title="'+name+' in '+wo+' angreifen und mit gl&uuml;ck gewinnen" height="26" width="26"></a>';
					var freundesliste = '<a href="http://www.pennergame.de/friendlist/?friend='+name+'/" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/add.gif" style="border: medium none; vertical-align: middle;" 			alt="'+name+' In deiner freundesliste aufnehmen in pennerghame '+wo+'" title="'+name+' In deiner freundesliste aufnehmen in pennerghame '+wo+'" height="26" width="26"></a>';
					var schreiben = '<a href="http://www.pennergame.de/profil/id:'+id+'/" style="text-decoration: none;"><img src="http://static.pennergame.de/img/pv4/icons/new_msg.gif" style="border: medium none; vertical-align: middle;" 				alt="'+name+' eine nachricht schreiben in pennergame '+wo+'" title="'+name+' eine nachricht schreiben in pennergame '+wo+'" height="26" width="26"></a>';
					var profil = '<a href="http://www.pennergame.de/profil/id:'+id+'/" style="text-decoration: none;"><img src="http://pg-hamburg.cy-media.net/img/penner-profil.png" style="border: medium none; vertical-align: middle;" 					alt="'+name+' Profil bvesuchen in den pennergame '+wo+'" title="'+name+' Profil bvesuchen in den pennergame '+wo+'" height="26" width="26"></a>';
					var online1 = hauptfeld.split('</a>&nbsp;<img src="')[1].split('"')[0];
					var on = online1.split('img/')[1].split('.png')[0];

					var online = '<a href="http://www.pennergame.de/profil/id:'+id+'/" style="text-decoration: none;"><img src="http://pg-hamburg.cy-media.net/'+online1+'" style="border: medium none; vertical-align: middle;" 					alt="'+name+' ist in Pennergame '+wo+' '+on+'" title="'+name+' ist in Pennergame '+wo+' '+on+'" height="26" width="26"></a>';


					var angemeldet = hauptfeld.split('seit:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					var Punkte = hauptfeld.split('Punkte:')[1].split('</tr>')[0].split('&nbsp;')[1].split('</td>')[0];
					var Platzierung = hauptfeld.split('Platzierung:')[1].split('</tr>')[0].split('&nbsp;')[1].split('</td>')[0];
					var Rankingpunkte = hauptfeld.split('Rankingpunkte:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					var Promille = hauptfeld.split('Promille:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					var Haustier = hauptfeld.split('Haustier:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					var Stadtteil = hauptfeld.split('Stadtteil:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					var Bande = hauptfeld.split('Bande:')[1].split('</tr>')[0];
					try{
						var Bandeid = Bande.split('value="')[2].split('"')[0];
						var Bandename = Bande.split('alt="')[1].split(' ')[0];
					}catch(e){
						var Bandeid = '';
						var Bandename = '';
					}
					try{
						var bandeseit = hauptfeld.split('Bande seit:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
						var Bandenstatus = hauptfeld.split('Bandenstatus:')[1].split('</tr>')[0].split('<td>')[1].split('</td>')[0];
					}catch(e){
						var bandeseit = 'Keine Bande';
						var Bandenstatus = 'Keine Bande';
					}
					// FALS EINER DIE BILDER ALS TOOLTIPP HABEN WILL MUSS ER DIE HIER WIEDER FREI GEBEN UND UNTEN EINFUEGEN DANN HAT ER DIE BILDER ALS TOOL TIPP
					//var punkteverlauf = '<a class="tooltip" href="http://hamburg.pennerzone.de/highscore/ugraph'+id+'">[Punkte]<span><img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'"</img></span></a>';
					//var platzverlauf = '<a class="tooltip" href="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=pos">[Platz]<span><img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=pos"</img></span></a>';
					//var geldverlauf = '<a class="tooltip" href="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=cash ">[Geld]<span><img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=cash"</img></span></a>';
					//var bandeverlauf = '<a class="tooltip" href="http://anonym.to/?http://hamburg.pennerzone.de/highscore/g'+Bandeid+'-'+Bandename+'.html">[Bandenverlauf]<span><img src="http://anonym.to/?http://hamburg.pennerzone.de/highscore/g'+Bandeid+'-'+Bandename+'.html"</img></span></a>';


var was = ''

+'<font style=\"color:yellow; font-size:250%;\"><b>Dein ergebniss der Penner '+name+' aus '+wo+'</font><br>'

+'<br>'+bildschrieft+'<br>'
+''+bildavater+'<br>'
+''+fight+freundesliste+schreiben+profil+online+'<br>'
+'Name : '+name+'<br>'
+'Id :'+id+'<br>'
+'Angemeldet seid :'+angemeldet+'<br>'
+'Punkte : '+Punkte+'<br>'
+'Platzierung : '+Platzierung+'<br>'
+'Rankingpunkte : '+Rankingpunkte+'<br>'
+'Promille : '+Promille+'<br>'
+'Haustier : '+Haustier+'<br>'
+'Stadtteil : '+Stadtteil+'<br>'
+'Bande : <a href="http://www.pennergame.de/profil/bande:'+Bandeid+'/">'+Bandename+'</a><br>'
+'Bande seid :'+bandeseit+'<br>'
+'Bandenstatus : '+Bandenstatus+'<br>'
+'<font style=\"color:green; font-size:150%;\"><b>History der letzen tage </font><br>'
+'<b id="verlauf"</b>'
+'<font style=\"color:green; font-size:150%;\"><b>Punkte verlauf </font><br>'
+'<img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'" title="Punkte verlauf der letzten tage von den penner '+name+'" height="'+xachse+'" width="'+yachse+'"<br>'
+'<font style=\"color:green; font-size:150%;\"><b>Platzverlauf</b></font><br>'
+'<img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=pos" title="Platz verlauf der letzten tage von den penner '+name+'" height="'+xachse+'" width="'+yachse+'"<br>'
+'<font style=\"color:green; font-size:150%;\"><b>Geldverlauf</b></font><br>'
+'<img src="http://hamburg.pennerzone.de/highscore/ugraph'+id+'?t=cash" title="Geld verlauf der letzten tage von den penner '+name+'" height="'+xachse+'" width="'+yachse+'"<br>'
+'<b id="bandeinfo"</b>'

+'<br><br><font style=\"color:yellow; font-size:110%;\"><b>Dieses Script ist Copyright By Basti1012<br>'
+'Die Funktionen und das Scripte wurde von Basti1012 Hergestellt und Programiert und somit auch erfunden <br>'
+'Die Bilder (Punkte,Platz,Geld verlauf) werden von einer anderen Seiter zu verf&uuml;gung gestellt <br>'
+'Die Bilder die hier Die verl&auml:fe anzeigen werden von <a href="http://pennerzone.de">Pennerzone</a> zur verf&uuml;gung gestellt </b></font><br>'

					verlauf(id,name,wo)
					weiter2(id,name)
					bande(Bandeid,Bandename,wo,yachse,xachse)
					document.getElementById('content').innerHTML += '<br><b id="wer1"</b><br><b id="wer2"</b><br><b id="wer3"</b><br>'+was+'';
				}catch(e){
					document.getElementById('content').innerHTML += '<font style=\"color:red; font-size:250%;\"><b>'+wer+' ist nicht in der datenbank oder exestiert nicht</font>';
				}
		}
	});
}






function weiter2(id,name){
	GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://www.pennergame.de/highscore/user/?name='+name+'&gang=&district=0&min=&max=',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		try{
			penner1 = content.split('class="col2">')[1].split('</td>')[0];
			id1 = penner1.split('/profil/id:')[1].split('/')[0];
			name1 = penner1.split('>')[1].split('<')[0];
			penner = '<a href="http://www.pennergame.de/profil/id:'+id1+'/">'+name1+'</a>';
			bande1 = content.split('class="col3">')[1].split('</td>')[0];
			id1bande = bande1.split('/profil/bande:')[1].split('/')[0];
			name1bande = bande1.split('>')[1].split('<')[0];
			bande = '<a href="http://www.pennergame.de/profil/bande:'+id1bande+'/">'+name1bande+'</a>';
			stadt = content.split('class="col4">')[1].split('</td>')[0];
			punkte = content.split('class="col5">')[1].split('</td>')[0];
			komplett = 'der penner '+penner+'ist in hamburg auch und hat <br> Punkte : '+punkte+'<br> Stadt : '+stadt+'<br>und ist in bande : '+bande+'<br>';
		}catch(e){
			komplett = 'Den Spieler gibt es in Hamburg nicht ';
		}
document.getElementById('wer1').innerHTML += komplett;
}});

GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://berlin.pennergame.de/highscore/user/?name='+name+'&gang=&district=0&min=&max=',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		try{
			penner1 = content.split('class="col2">')[1].split('</td>')[0];
			id1 = penner1.split('/profil/id:')[1].split('/')[0];
			name1 = penner1.split('>')[1].split('<')[0];
			penner = '<a href="http://berlin.pennergame.de/profil/id:'+id1+'/">'+name1+'</a>';
			bande1 = content.split('class="col3">')[1].split('</td>')[0];
			id1bande = bande1.split('/profil/bande:')[1].split('/')[0];
			name1bande = bande1.split('>')[1].split('<')[0];
			bande = '<a href="http://berlin.pennergame.de/profil/bande:'+id1bande+'/">'+name1bande+'</a>';
			stadt = content.split('class="col4">')[1].split('</td>')[0];
			punkte = content.split('class="col5">')[1].split('</td>')[0];
			komplett = 'der penner '+penner+'ist in berlin auch und hat <br> Punkte : '+punkte+'<br> Stadt : '+stadt+'<br>und ist in bande : '+bande+'<br>';
		}catch(e){
			komplett = 'Den Spieler gibt es in Berlin nicht ';
		}
document.getElementById('wer2').innerHTML += komplett;
}});


GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://muenchen.pennergame.de/highscore/user/?name='+name+'&gang=&district=0&min=&max=',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		try{
			penner1 = content.split('class="col2">')[1].split('</td>')[0];
			id1 = penner1.split('/profil/id:')[1].split('/')[0];
			name1 = penner1.split('>')[1].split('<')[0];
			penner = '<a href="http://muenchen.pennergame.de/profil/id:'+id1+'/">'+name1+'</a>';
			bande1 = content.split('class="col3">')[1].split('</td>')[0];
			id1bande = bande1.split('/profil/bande:')[1].split('/')[0];
			name1bande = bande1.split('>')[1].split('<')[0];
			bande = '<a href="http://muenchen.pennergame.de/profil/bande:'+id1bande+'/">'+name1bande+'</a>';
			stadt = content.split('class="col4">')[1].split('</td>')[0];
			punkte = content.split('class="col5">')[1].split('</td>')[0];
			komplett = 'der penner '+penner+'ist in muenchen auch und hat <br> Punkte : '+punkte+'<br> Stadt : '+stadt+'<br>und ist in bande : '+bande+'<br>';
		}catch(e){
			komplett = 'Den Spieler gibt es in m&uuml;nchen nicht ';
		}
document.getElementById('wer3').innerHTML += komplett;
}});
}



















// verlauf des penners was er die letzen paar tage gemacht hat wird hier abgefragt und eingefuegt 




function verlauf(id,name,wo){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+wo+'.pennerzone.de/highscore/u'+id+'-'+name+'.html',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			try{
				penner = content.split('<legend>History</legend>')[1].split('</fieldset>')[0];

			}catch(e){
				penner = 'No history vorhanden ';
			}
			document.getElementById('verlauf').innerHTML += penner;
		}
	});
}
























// hier werden die banden details und banden history abgefragt und eingefuegt 



function bande(Bandeid,Bandename,wo,yachse,xachse){



	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://hamburg.pennerzone.de/highscore/g'+Bandeid+'-'+Bandename+'.html',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;
			try{
				penner = content.split('<legend>History</legend>')[1].split('</fieldset>')[0];

			document.getElementById('bandeinfo').innerHTML += '<font style=\"color:green; font-size:150%;\"><b>Punkteverlauf bande</b></font><br>'
			+'<img src="http://hamburg.pennerzone.de/highscore/ggraph'+Bandeid+'.png" title="Geld verlauf der letzten tage von den penner '+name+'" height="'+xachse+'" width="'+yachse+'"<br>'
			+'<font style=\"color:green; font-size:150%;\"><b>highscoreverlauf bande</b></font><br>'
			+'<img src="http://hamburg.pennerzone.de/highscore/ggraph'+Bandeid+'.png?t=pos" title="Geld verlauf der letzten tage von den penner '+name+'" height="'+xachse+'" width="'+yachse+'"<br><font style=\"color:green; font-size:150%;\"><b>History verlauf der Bande </font>'+penner+'';

			}catch(e){



				//penner = '<font style=\"color:red; font-size:150%;\"><b>No Banden History vorhanden </font>';
				penner = content.split('<p>')[1].split('</p>')[0];
document.getElementById('bandeinfo').innerHTML += '<font style=\"color:green; font-size:150%;\"><b>'+penner+'</b></font>';


			}

		}
	});
}











































//copyright by basti1012
//Dieses script ist eine neu erscheinung und wurde bist jetzt nicht einmal gebaut oder erfunden 
// da das script was ganz neues auf den pennergame spiele markt ist der copyright by basti1012.
// die bilder die den punkte highscore und geld verlauf anzeigen werden von pennerzone.de zur verfuegung gestellt .
// in den sinne bedanken wir uns auch an den pennerzone team  das wir die bilder benutzen duerfen und somit dieses script diese funktionen auch nutzen kann