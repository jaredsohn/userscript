// ==UserScript==
// @name           Stadtscanner(scnelle version ) hamburg berlin pennergame 4.0
// @namespace      zeigt alle vorherschende banden an in allen stadtteilen wer wo wie und so weiter vorherschende bande ist 
// @author         Basti1012 pennerhack.foren-city.de
// @include        http://www.pennergame.de/highscore/*
// @include        http://berlin.pennergame.de/highscore/*
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
var anzahl = '94';
}

if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var anzahl = '103';
}



var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="Bandensuche" id="Bandensuche" alt="Bandensuche" title="Pennergame Spam" <span class="btn-right"><span class="btn-left">Vorherschende Bandensuche</span></span></a></li>';
document.getElementById('Bandensuche').addEventListener('click', function Bandensuches() {


var rein1 = '<br><br><br><br><br><h1>Stadtteile Scannen</h1><br>Es werden alle '+anzahl+' Stadtteile angezeigt wer wo die vorherschaft hat dazu muss man diesen Stadtteil nicht mehr besitzen dieses Script kann das auch ohne in den besitz der Stadt zu sein '
	+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br>'
var newdiv1 = document.getElementsByClassName('zrelative sitdown')[0];
	newdiv1.innerHTML = ''+rein1+'<table class="list" border="1" width="1060"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="20">Id</th>'
	+'<th scope="col" align="left" width="210">Stadtname</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="290">Vorherschende Bande</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="80">einwohner</th>'
	+'<th align="left" width="100">Punkte</th>'
	+'<th align="center" width="80">Positsion</th>'
	+'<th align="center" width="50">Member</th>'
	+'<th align="center" width="100">Bandenadmin</th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"></th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/img/overview/new_msg.gif"></th>'
	+'<th align="center" width="100">Mitglieder</th>'
	+'</tr>' ;







GM_xmlhttpRequest({
   	 method: 'GET',
    	 url: ''+link+'/city_list/',
    	 onload: function(responseDetails) {
		var cont = responseDetails.responseText;
GM_setValue("cont", cont);
eins(1);
}});






function eins(a){

var cont = GM_getValue("cont");
				//for(a=1;a<=anzahl;a++) {
if(a <= anzahl){
					var stadt = cont.split("&city"+a+"=")[1].split("&city_einwohner")[0];
					var id = cont.split("&city_bande"+a+"=")[1].split("&")[0];
					var bandenname = cont.split("city_bandenname"+a+"=")[1].split("&")[0];
					var einwohner = cont.split("city_einwohner"+a+"=")[1].split("&")[0];

					document.title = '[ Scanne Stadtteile.Bin bei staadt '+a+' von '+anzahl+'] Copyright by Basti1012 und Newman';
					var Stadtpro = Math.round((100/anzahl)*100)/100
					var Stadterg = Math.round((Stadtpro*a)*1)/1
					var balkie = Math.round((Stadterg*3)*10)/10
					var reinmachen ='[Stadt:<strong><b> '+a+' </b></strong>von '+anzahl+'.Fortschrit <strong><b> '+Stadterg+'  % </b></strong> Fertig  ]';
					document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';

				drei(stadt,id,bandenname,einwohner,a)
			}
	

}


























function drei(stadt,id,bandenname,einwohner,a){

		GM_xmlhttpRequest({
    			 method: 'GET',
    			 url: ''+link+'/profil/bande:'+id+'/',
    			 onload: function(responseDetails) {
     				   var content = responseDetails.responseText;

					var chef1 = content.split('Mitglieder</b>')[1];
					var chef = chef1.split('</tr>')[1];
					var chefetage = chef.split('/profil/')[1];
					var chefetage1 = chefetage.split('</td>')[0];

					var chef1id = chefetage1.split('d:')[1];
					var chefid = chef1id.split('/')[0];

					var chef1name= chefetage1.split('>')[1];
					var chefname = chef1name.split('<')[0];


						if(content.match(/Mitglieder/)){
							try{
								var name1 = content.split('<tr align="left"><td colspan="2">')[1];
								var name = name1.split('</table>')[0];
							}catch(e){
								var name = 'ERROR';
							}

								var bande3 = '<a class="tooltip"><font color="yellow"><b>Mitglieder</b></font><span><small><br>'
 								+'<font style=\"color:blue; font-size:120%;\"><b>Mitglieder:</b></font><br>'
 								+'<font style=\"color:whithe; font-size:120%;\"><b>'+name+'</b></a></font><br>'
								+'</small></span>';



					var chef1 = content.split('colspan="2">Punkte: ')[1];
					var points = chef1.split('</td>')[0];

					var member_count1 = content.split('padding-bottom:3px;"><b>')[1];
					var member_count = member_count1.split('Mitglieder</b>')[0];

					var position1 = content.split('colspan="2">Platzierung: ')[1];
					var position = position1.split('</td>')[0];

					var fight ='<a href="/fight/?to='+chefname+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
					var sms ='<a href="/messages/write/?to='+chefid+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';

					newdiv1.innerHTML += '<table class="list" border="1" width="1060"><tbody><tr bgcolor="#272727">'
					+'<th align="center" width="20">'+a+'</th>'
					+'<th align="center" width="210">'+stadt+'</th>'
					+'<th align="center" width="290"><a href="/profil/bande:'+id+'/">'+bandenname+'</a></th>'
					+'<th align="center" width="80"><img class="icons" alt="Einwohner" src="http://media.pennergame.de/img/einwohner.gif" title="Einwohner">'+einwohner+'</img></th>'
					+'<th align="center" width="100">'+points+'</th>'
					+'<th align="center" width="80">'+position+'</th> '
					+'<th align="center" width="50">'+member_count+'</th>'
					+'<th align="center" width="100"><a href="/profil/id:'+chefid+'/">'+chefname+'</a></th>'
					+'<th align="center" width="15">'+fight+'</th>'
					+'<th align="center" width="15">'+sms+'</th>'
					+'<th align="center" width="100">'+bande3+'</th>'
					+'</tr></tbody></table>';


					if(Number(a)==anzahl){
						document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:yellow; font-size:150%;\"><b>Die suche ist nun beendet mehr Scripte von mir gibt es hier <a href="http://pennerhack.foren-city.de">Scripte von Basti1012</a></font>';
					}
	a++;			}
eins(a);
}});

}
},false);

