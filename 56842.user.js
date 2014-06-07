// ==UserScript==
// @name           Stadtscanner neue version fuer pennergame 4.0 
// @namespace      zeigt alle gekauften stadtteile die vorherschhaft in den stadt hambueg pennergame 4.0 unter highscore gibt es einen extra punkt fuer stadt vorherschaft suche
// @author         Basti1012 pennerhack.foren-city.de
// @include        http://www.pennergame.de/highscore/*
// ==/UserScript==





GM_deleteValue("e");
var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var stadanzahl = '103';
var ifanzahl = '103';
var Vorherschaftseid = '';
var vorherschendebande = '';
var Platz = '';;
var Punkte = '';
var link = "http://www.pennergame.de"
}
if (url.indexOf("http://pennergame")>=0) {
var stadanzahl = '103';
var ifanzahl = '103';
var Vorherschaftseid = '';
var vorherschendebande = '';
var Platz = '';;
var Punkte = '';
var link = "http://pennergame.de"
}
var i = GM_getValue("i");
if (i == null){
i = '1';
GM_setValue("i" , i);
};








var table = document.getElementById('nav-2');
table.innerHTML += '<li><a name="Bandensuche" id="Bandensuche" alt="Bandensuche" title="Pennergame Spam" <span class="btn-right"><span class="btn-left">Vorherschende Bandensuche</span></span></a></li>';
document.getElementById('Bandensuche').addEventListener('click', function Bandensuches() {

var rein1 = '<br><br><br><br><br><b>Stadtteile Scannen</b><br>'
	+'<input type=\"submit\" class=\"formbutton\" name=\"wein1\" value=\"Stadt Scannen\">'
	+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="StadtIdInfo" id="StadtIdInfo"></div></b></font></div><br>'
	+'<font style=\"color:white; font-size:100%;\"><b><div align="left" name="sbalki" id="sbalki"></div></b></font><br>'

var newdiv1 = document.getElementsByClassName('zrelative sitdown')[0];
	newdiv1.innerHTML = ''+rein1+'<table class="list" border="1" width="750"><tbody><tr bgcolor="#272727">'
	+'<th align="center" width="10">Id</th>'
	+'<th scope="col" align="left" width="40">Platz</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="220">Vorherschende Bande</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="70">Punkte</th>'
	+'<th align="left" width="120">Seid wann</th>'
	+'<th align="center" width="120">Stadtteil</th>'
	+'<th scope="col" align="left" bgcolor="#272727" width="80">Fights</th>'
	+'<th align="center" width="50">Mitglieder</th>'
	+'</tr>' ;

	document.getElementsByName("wein1")[0].addEventListener('click', function linkklickewerone() {
	document.getElementsByName('wein1').disabled = "disabled";			
	wechseln();
	},false); 

	var e = GM_getValue("e");
	if (e == null){
	e = '1';
	};

	var Stadtmenge = GM_getValue("Stadtmenge");
	if (Stadtmenge == null){
	Stadtmenge = '0';
	};

function wechseln(){
	if(e <= Number(ifanzahl)){
	document.title = '[ Scanne Stadtteile.Bin bei staadt '+e+' von '+stadanzahl+'(hamburg)(berlin 94)] Copyright by Basti1012 und Newman';
	var zahl = 'stadanzahl';
	var Stadtpro = Math.round((100/stadanzahl)*100)/100
	var Stadterg = Math.round((Stadtpro*e)*1)/1
	var balkie = Math.round((Stadterg*3)*10)/10
	var reinmachen ='[Stadt:<strong><b> '+e+' </b></strong>von '+stadanzahl+'.Fortschrit <strong><b> '+Stadterg+'  % </b></strong> Fertig  ]';
	document.getElementsByName('sbalki')[0].innerHTML = '&nbsp; '+reinmachen+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkie+'px;"></div></div>';
	var pro = Math.round((Stadtpro*Stadtmenge)*1)/1
	var balkia = Math.round((3*Stadtmenge)*10)/10
	var reinmachee ='[Du besitzt <b>'+Stadtmenge+'</b> Stadtteile.Das sind <b>'+pro+' %</b>]';
	document.getElementsByName('StadtIdInfo')[0].innerHTML = '&nbsp; '+reinmachee+'<br><div class="processbar_bg" style="width: 300px;"><div id="active_process2" class="processbar" style="width: '+balkia+'px;"></div></div>';


var reintun = 'value="'+e+'"';
GM_xmlhttpRequest(
   {
	method: 'GET',
  	url: ''+link+'/city/district/',
	onload: function(responseDetails) 
		{
		var content = responseDetails.responseText;
			try{
			var text1 = content.split(''+reintun+'')[1];
			var text2 = text1.split('form')[0];
			var text3 = text2.split('value="')[1];
			var text4 = text3.split('"')[0];
			}catch(e){
			}
			if (text4 == "Kaufen") {
			e++;
			wechseln();
			}else{

   	GM_xmlhttpRequest({
      		method: 'POST',
      		url: ''+link+'/city/district/buy/',
     		 headers: {'Content-type': 'application/x-www-form-urlencoded'},
       			data: encodeURI('id='+e+'&submitForm=Einziehen'),
      			onload: function(responseDetails){
                		var content = responseDetails.responseText;
                		if(content.indexOf('Willkommen') != -1){
                    			user(); 
  						Stadtmenge++;
                			}else{
                   				 e++;
                   	 			wechseln();
					document.title = 'Stadt  '+e+' Nicht vorhanden !! Mfg Basti1012';
                			}   
   				}
			});
			}
		}
	});
}else{
GM_deleteValue("e");	

}



function user () {
GM_xmlhttpRequest({
     method: 'GET',
     url: ''+link+'/city/',
     onload: function(responseDetails) {
        var content = responseDetails.responseText;
		if(content.match(/Vorherrschende/)){
		var punkte1 = content.split('messageslist3')[1];
		var punkte2 = punkte1.split('</tbody></table>')[0]
		var punkte3 = punkte2.split('<tr class="bflist">')[1];
		var punkte4 = punkte3.split('</tr>')[0];
		var punkte5 = punkte4.split('<strong>')[1];
		var punkte6 = punkte5.split('</strong>')[0];// punkte der vorerschende bande
		var platz1 = punkte2.split('<tr class="bflist">')[2];
		var platz2 = platz1.split('</tr>')[0];
		var platz3 = platz2.split('<strong>')[1];
		var platz4 = platz3.split('.</strong>')[0];// platz der bande
		var vor1 = punkte2.split('<tr class="bflist">')[3];
		var vor2 = vor1.split('</tr>')[0];
		var vor3 = vor2.split('>')[3];
		var vor4 = vor3.split('<')[0]; //vorherschaft seid 
		var id = punkte2.split('<a href="/profil/bande:')[1]; // id der bande mit vorherschaft 
		var id1 = id.split('/"><img')[0];
		var name = punkte2.split('/"><strong>')[1];// name der bande mit vorherschaft
		var name1 = name.split('</strong>')[0];
		var name2 = '<a href="/profil/bande:'+id1+'/"><strong>'+name1+'</strong></a>';
		var stadt1 = content.split('Vorherrschende Bande in')[1];
		var stadt2 = stadt1.split('</h3>')[0]

		try{
			var table = content.split('<tr class="bflist">')[1];
			var table2 = table.split('<tr>')[0];
			var wann = table2.split('>&nbsp;')[1];
			var wann2 = wann.split('<')[0];
			var wer = table2.split('<a href="')[1];
			var werid1 = wer.split('">')[0];
			var wera = table2.split('<a href="')[2];
			var werid2 = wera.split('">')[0];
			var wern = table2.split('<strong>')[1];
			var wername1 = wern.split('</strong>')[0];
			var werv = table2.split('<strong>')[2];
			var wername2 = werv.split('</strong>')[0];
			var fights1='<font style=\"color:whithe; font-size:120%;\"><b>'+wann2+'</b></font><br>'
			+'<font style=\"color:whithe; font-size:120%;\"><b>Fight gegen</b></font><br>'
 			+'<font style=\"color:whithe; font-size:120%;\"><b>'+wername1+'</b></font><br>';

		}catch(e){
		var fights1='';
		}

			try{
			var table2 = content.split('<tr class="bflist">')[2];
			var table22 = table2.split('<tr>')[0];
			var wann2 = table22.split('>&nbsp;')[1];
			var wann22 = wann2.split('<')[0];
			var wer2 = table22.split('<a href="')[1];
			var werid12 = wer2.split('">')[0];
			var wern2 = table22.split('<strong>')[1];
			var wername12 = wern2.split('</strong>')[0];
			var fights2='<font style=\"color:whithe; font-size:120%;\"><b>'+wann22+'</b></font><br>'
			 +'<font style=\"color:whithe; font-size:120%;\"><b>Fight gegen</b></font><br>'
 			+'<font style=\"color:whithe; font-size:120%;\"><b>'+wername12+'</b></font><br>';

			}catch(e){
			var fights2='';
			}

		try{
			var table3 = content.split('<tr class="bflist">')[3];
			var table23 = table3.split('<tr>')[0];
			var wann3 = table23.split('>&nbsp;')[1];
			var wann23 = wann3.split('<')[0];
			var wer3 = table32.split('<a href="')[1];
			var werid13 = wer3.split('">')[0];
			var wern3 = table23.split('<strong>')[1];
			var wername3 = wern3.split('</strong>')[0];
			var fights3='<font style=\"color:whithe; font-size:120%;\"><b>'+wann23+'</b></font><br>'
 			+'<font style=\"color:whithe; font-size:120%;\"><b>Fight gegen</b></font><br>'
 			+'<font style=\"color:whithe; font-size:120%;\"><b>'+wername13+'</b></font><br>';

		}catch(e){
		var fights3='';
		}

		try{
			var table4 = content.split('<tr class="bflist">')[4];
			var table24 = table4.split('<tr>')[0];
			var wann4 = table24.split('>&nbsp;')[1];
			var wann24 = wann4.split('<')[0];
			var wer4 = table24.split('<a href="')[1];
			var werid14 = wer4.split('">')[0];
			var wern4 = table24.split('<strong>')[1];
			var wername14 = wern4.split('</strong>')[0];
			var fights4='<font style=\"color:whithe; font-size:120%;\"><b>'+wann24+'</b></font><br>'
			 +'<font style=\"color:whithe; font-size:120%;\"><b>Fight gegen</b></font><br>'
			 +'<font style=\"color:whithe; font-size:120%;\"><b>'+wername14+'</b></font><br>';

			}catch(e){
			var fights4='';
			}

			var fightso ='<a class="tooltip"><font color="yellow"><b>Fights</b></font><span><small><br>'
			 +'<font style=\"color:whithe; font-size:120%;\"><b>Fights mit dieser bande in dieser stadt :</b></font><br>'
			 +'<br>'+fights1+'<br>'+fights2+'<br>'+fights3+'<br>'+fights4+'</a><br>';
			+'</small></span>';

		GM_xmlhttpRequest({
    			 method: 'GET',
    			 url: ''+link+'/profil/bande:'+id1+'/',
    			 onload: function(responseDetails) {
     				   var content = responseDetails.responseText;
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



		newdiv1.innerHTML += '<table class="list" border="1" width="750"><tbody><tr bgcolor="#272727">'
			+'<th align="center" width="10">'+e+'</th>'
			+'<th align="center" width="40"><strong>'+platz4+'</strong></th>'
			+'<th align="center" width="230">'+name2+'</th>'
			+'<th align="center" width="70">'+punkte6+'</th>'
			+'<th align="center" width="120"><b>'+vor4+'</th>'
			+'<th align="center" width="120">'+stadt2+'</th> '
			+'<th align="center" width="80">'+fightso+'</th>'
			+'<th align="center" width="40">'+bande3+'</th>'
			+'</tr></tbody></table>';

						}
					}});
			}		
	
			e++;
			wechseln();
			GM_setValue("e" , e);	
		}});
    }
}

},false);
















// Copyright by basti1012 und Newman