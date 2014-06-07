// ==UserScript==
// @name           Stadtscanner neue version unter city (Version 2.6)pennergame 4.0
// @namespace      zeigt alle vorherschende banden an in allen stadtteilen wer wo wie und so weiter vorherschende bande ist 
// @author         Basti1012 pennerhack.foren-city.de
// @include        http://www.pennergame.de/highscore/*
// ==/UserScript==

var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="Bandensuche" id="Bandensuche" alt="Bandensuche" title="Pennergame Spam" <span class="btn-right"><span class="btn-left">Vorherschende Bandensuche</span></span></a></li>';
document.getElementById('Bandensuche').addEventListener('click', function Bandensuches() {


var rein1 = '<br><br><br><br><br><h1>Stadtteile Scannen</h1><br>Es werden alle 104 Stadtteile angezeigt wer wo die vorherschaft hat dazu muss man diesen Stadtteil nicht mehr besitzen dieses Script kann das auch ohne in den besitz der Stadt zu sein '
	+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br>'
var newdiv1 = document.getElementsByClassName('zrelative sitdown')[0];
	newdiv1.innerHTML = ''+rein1+'<table class="list" border="1" width="1140"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="20">Id</th>'
	+'<th scope="col" align="left" width="210">Stadtname</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="290">Vorherschende Bande</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="80">einwohner</th>'
	+'<th align="left" width="100">Punkte</th>'
	+'<th align="center" width="80">Positsion</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="80">Founder</th>'
	+'<th align="center" width="50">Member</th>'
	+'<th align="center" width="100">Bandenadmin</th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"></th>'
	+'<th align="center" width="15"><img src="http://media.pennergame.de/img/overview/new_msg.gif"></th>'
	+'<th align="center" width="100">Mitglieder</th>'
	+'</tr>' ;











fertig(1)

function fertig(a){
GM_xmlhttpRequest({
    method: 'GET',
    url: "http://www.pennergame.de/city_list/",
    onload: function(responseDetails) {
    var cont = responseDetails.responseText;
if(a<=103){



var stadt = cont.split("&city"+a+"=")[1].split("&city_einwohner")[0];
var id = cont.split("&city_bande"+a+"=")[1].split("&")[0];
var bandenname = cont.split("city_bandenname"+a+"=")[1].split("&")[0];
var einwohner = cont.split("city_einwohner"+a+"=")[1].split("&")[0];
infosbande(id,bandenname,stadt,einwohner,a);


	document.title = '[ Scanne Stadtteile.Bin bei staadt '+a+' von 103(hamburg)(berlin 94)] Copyright by Basti1012 und Newman';
	var zahl = '103';
	var Stadtpro = Math.round((100/103)*100)/100
	var Stadterg = Math.round((Stadtpro*a)*1)/1
	var balkie = Math.round((Stadterg*3)*10)/10
	var reinmachen ='[Stadt:<strong><b> '+a+' </b></strong>von 103.Fortschrit <strong><b> '+Stadterg+'  % </b></strong> Fertig  ]';
	document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';


}
}});
}









function infosbande(id,bandenname,stadt,einwohner,a){
		GM_xmlhttpRequest({
    			 method: 'GET',
    			 url: 'http://www.pennergame.de/profil/bande:'+id+'/',
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
						var bande3 = ''
						 +'<a class="tooltip"><font color="yellow"><b>Mitglieder</b></font><span><small><br>'
 						+'<font style=\"color:blue; font-size:120%;\"><b>Mitglieder:</b></font><br>'
 						+'<font style=\"color:whithe; font-size:120%;\"><b>'+name+'</b></a></font><br>'
						+'</small></span>';
ende(id,bandenname,stadt,einwohner,a,bande3,chefid,chefname);
}
}});
}



















function ende(id,bandenname,stadt,einwohner,a,bande3,chefid,chefname){
    	GM_xmlhttpRequest(
    	{
    		method: 'GET',
    		url: 'http://www.pennergame.de/dev/api/gang.' + id +'.xml',
    		onload: function(responseDetails) {
    			var parser_gang = new DOMParser();
    			var dom_gang = parser_gang.parseFromString(responseDetails.responseText, "application/xml");
   			var points = dom_gang.getElementsByTagName('points')[0].textContent;
   			//var id = dom_gang.getElementsByTagName('id')[0].textContent;
   			//var name = dom_gang.getElementsByTagName('name')[0].textContent;
   			var founder = dom_gang.getElementsByTagName('founder')[0].textContent;
   			var position = dom_gang.getElementsByTagName('position')[0].textContent;
   			var member_count = dom_gang.getElementsByTagName('member_count')[0].textContent;


var fight ='<a href="/fight/?to='+chefname+'"><img src="http://media.pennergame.de/de/img/att.png" width="16" height="16"</a>';
var sms ='<a href="/messages/write/?to='+chefid+'"><img src="http://media.pennergame.de/img/overview/new_msg.gif"</a>';




			newdiv1.innerHTML += '<table class="list" border="1" width="1140"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="20">'+a+'</th>'
			+'<th align="center" width="210">'+stadt+'</th>'
			+'<th align="center" width="290"><a href="/profil/bande:'+id+'/">'+bandenname+'</a></th>'
			+'<th align="center" width="80"><img class="icons" alt="Einwohner" src="http://media.pennergame.de/img/einwohner.gif" title="Einwohner">'+einwohner+'</img></th>'
			+'<th align="center" width="100">'+points+'</th>'
			+'<th align="center" width="80">'+position+'</th> '
			+'<th align="center" width="80">'+founder+'</th>'
			+'<th align="center" width="50">'+member_count+'</th>'
			+'<th align="center" width="100"><a href="/profil/id:'+chefid+'/">'+chefname+'</a></th>'
			+'<th align="center" width="15">'+fight+'</th>'
			+'<th align="center" width="15">'+sms+'</th>'
			+'<th align="center" width="100">'+bande3+'</th>'

			+'</tr></tbody></table>';


knopfe(a);

fertig(a+1)
}});
}



function knopfe(a){
if(Number(a)==103){
document.getElementsByName('sbalki')[0].innerHTML = '<font style=\"color:yellow; font-size:150%;\"><b>Die suche ist beendet</b></font>';









			newdiv1.innerHTML += '<table class="list" border="1" width="1140"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="570">Die suche ist nun beendet mehr Scripte von mir gibt es hier <a href="http://pennerhack.foren-city.de">Scripte von Basti1012</a></th>'
			+'<th align="center" width="570">Die suche ist nun beendet mehr Scripte von Newman <a href="http://ego-shooters.net/forum/">Scripte von Newman</a></th> '

}



}

},false);

