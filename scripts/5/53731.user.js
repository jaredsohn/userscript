// ==UserScript==
// @name           Mach-Den-SpendenBecher-Voll.By-Basti1012 Pennergame 4.0
// @namespace      http://pennerhack.foren-city.de
// @description    Dieses Script Holt dir die 50 Spenden rein in Wennigen Minuten( odfer Sekunden).Einfach auf Automatisch stellen  dann klickt er solange bis die 50 Spenden voll sind .
// @include        *pennergame.de*
// @include	   *.pennerzone.de/spenden/*
// ==/UserScript==


if(GM_getValue("sekunde")==null){
GM_setValue("sekunde",'35000');
}


if(GM_getValue("sta")=='true'){
	document.getElementById('provocation_area').innerHTML = '<form name="prov_form"><div id="provocation_note"><div id="provocation_text" class="provocation_text"></div></div></form>';
	document.getElementById('provocation_text').innerHTML ='<a id="close">Close</a><br><b id="ccc"</b><br><b id="bbb"</b><br><b id="aaa"</b><br><b id="ddd"</b>';//<font style=\"color:green; font-size:120%;\">
	document.getElementById('close').addEventListener('click', function einstell () {
	GM_setValue("sta" ,'false');
	window.location.reload();
},false);
}




if(GM_getValue("sta")=='true'){
	document.getElementById("ddd").innerHTML = '<a id="einstella"> Einstellbereich </a>';
	document.getElementById('einstella').addEventListener('click', function einstell () {
		document.getElementById('provocation_area').innerHTML = '<form name="prov_form"><div id="provocation_note"><a class="close" href="#" onclick="CloseProvocation();"><img src="http://static.pennergame.de/img/pv4/premiummedia/img/premium/provocation/provocation_note_close.png" border="0"></a><div id="provocation_text" class="provocation_text"><div class="prov_links"></div></div></div></form>';
		document.getElementById('provocation_text').innerHTML ='<font style=\"color:green; font-size:120%;\">Sekunden Relodzeit<input type="text" name="sekunde" size="6" value="">'
		+'<br><a id="ffd">Close einstellung und Speichern</a>';

		document.getElementsByName('sekunde')[0].value = GM_getValue("sekunde");

		document.getElementById('ffd').addEventListener('click', function einstell () {
			GM_setValue("sekunde", document.getElementsByName("sekunde")[0].value);

			alert("Reloszeit(SPENDEN GEHEN) wurde gespeichert\nSpendengeschwindigkeit ist jetzt \n"+document.getElementsByName("sekunde")[0].value+"")
			window.location.reload();
		},false);
	},false);
}





GM_xmlhttpRequest({
	method:"GET",
	url: 'http://www.pennergame.de/overview/',
   	onload:function(responseDetails) {
		quelltext = responseDetails.responseText;
		nochspenden = quelltext.split('hast heute ')[1].split(' Spenden')[0];
		spendenlink = quelltext.split('http://change.pennergame.de/change_please/')[1].split('/')[0];
		if(nochspenden<=49){
			far = 'green';
		}else{
		GM_setValue("sta" ,'false');
			far= 'red';
		}
		var neua = document.getElementById("topmenu");
		var neu = neua.getElementsByTagName("ul")[0];
		SubmitButtonHTML = '';
		var newp = document.createElement("li");
		newp.innerHTML = '<b id="ein"></b>';
		var newli = document.createElement("li");
		newli.appendChild(newp);
		newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
		neu.appendChild(newli);

		document.getElementById("ein").innerHTML = '<a id="einstell"><font style=\"color:'+far+'; font-size:180%;\"><b>'+nochspenden+'/50</font></a>';

		document.getElementById('einstell').addEventListener('click', function einstell () {
		spendi(spendenlink)
		},false);
















function spendi(spendenlink){
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://hamburg.pennerzone.de/spenden/',
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                  data: encodeURI('link=http://change.pennergame.de/change_please/'+spendenlink+'/&submit=Eintragen'),
				//data: encodeURI('link=http%3A%2F%2Fchange.pennergame.de%2Fchange_please%2F'+spendenlink+'%2F&submit=Eintragen'),
				onload: function(responseDetails)
     				{




					GM_setValue("sta" ,'true');
					alert("Link eingetragen");
					starten()
					window.location.reload();
   				}
 	 		});	
		}





		function starten(){

			GM_xmlhttpRequest({
				method:"GET",
				url: 'http://hamburg.pennerzone.de/spenden/spenden',
   				onload:function(responseDetails) {
					quelltext = responseDetails.responseText;
					if(quelltext.match(/Diesen Link als Spam /)){
						zusammen(quelltext)

					}else
					if(quelltext.match(/Gerade kein Link /)){
						zusammen(quelltext)
					}else
					if(quelltext.match(/Nicht so schnell/)){
						zusammen(quelltext)
					}else{
						//zusammen(quelltext)
					}
				}
			});
		function zusammen(quelltext){
		abfragen()
			if(quelltext.match(/Becher geworfen!/)){
				var geld1 = quelltext.split('hast &euro;')[1];
				var cash = geld1.split(' in')[0];
				cash = cash.replace(/,/g,"");
				cash = cash/100;
				wem1 = quelltext.split('Das <a href="http://www.pennergame.de/')[1].split('r><br>')[0];
				link = wem1.split('rofil/id:')[1].split('/')[0];
				name = wem1.split('</a> von ')[1].split('<b')[0];
				wem = '<a href="/profil/id:'+link+'/"><b style=\"color:yellow; font-size:100%;\">'+name+'</b></a>';

				document.getElementById("bbb").innerHTML = '<b style=\"color:green; font-size:140%;\">Du hast '+cash+' &euro;</b> an '+wem+' gespendet</b>';
					} else if(quelltext.match(/hat heute schon genug Spenden erhalten/)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:orange; font-size:140%;\">'+wem+' Hat Heute genug Spenden erhalten</a>';
					}else if(quelltext.match(/ist bereits bis zum Rand/)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:orange; font-size:140%;\">'+wem+' Becher ist bis zum Rand voll</a>';
					}else if(quelltext.match(/Refid ist nicht bekannt/)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:red; font-size:140%;\">RefId Spendenlink unbekannt </a>';
					}else if(quelltext.match(/etwas in den Becher werfen.../)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:red; font-size:140%;\">Spender ist Berliner</a>';
					}else if(quelltext.match(/Minuten wieder Spenden/)){
						var minu1 = quelltext.split('class="settingpoint')[1];
						var minu2 = minu1.split('id="content')[0];
						var minu3 = minu2.split('counter(')[1];
						var minut = minu3.split(')')[0];

				document.getElementById("bbb").innerHTML = '<a style=\"color:orange; font-size:140%;\">Du kannst erst in '+minut+' Sekunden Spenden</a>';
					}else if(quelltext.match(/Error Unknown User/)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:red; font-size:140%;\">Der User ist Unbekannt (Gel&ouml;scht)</a>';


					}else if(quelltext.match(/Gerade kein Link fuer Sie da/)){

				document.getElementById("bbb").innerHTML = '<a style=\"color:red; font-size:140%;\">Gerade kein Link fuer Sie da</a>';
					}else{

				document.getElementById("bbb").innerHTML = '<a style=\"color:black; font-size:140%;\">Unbekannter fehler</a>';
					}
			}
		}





		function abfragen(){

		GM_xmlhttpRequest({
			method:"GET",
			url: 'http://www.pennergame.de/overview/',
   			onload:function(responseDetails) {
				quelltext = responseDetails.responseText;
				nochspenden = quelltext.split('hast heute ')[1].split(' Spenden')[0];
				spendenlink = quelltext.split('http://change.pennergame.de/change_please/')[1].split('/')[0];
				if(nochspenden<=49){
					far = 'green';
				}else{
				GM_setValue("sta" ,'false');
					far= 'red';
				}

			document.getElementById("ein").innerHTML = '<font style=\"color:blue; font-size:100%;\"><b>ok</b></font><font style=\"color:'+far+'; font-size:180%;\"><b>'+nochspenden+'/50</font>';
		}});
		GM_xmlhttpRequest({
			method:"GET",
			url: 'http://hamburg.pennerzone.de/spenden/stats.html',
   			onload:function(responseDetails) {
				quelltext = responseDetails.responseText;
				try{

					ss = quelltext.split('<big><b>')[1].split('</b></big>')[0];
					sss = quelltext.split('<big><b>')[2].split('</b></big>')[0];

					document.getElementById("ccc").innerHTML = '<font style=\"color:blue; font-size:140%;\">Gespendet :<b>('+ss+')</b> Erhalten :<b>('+sss+')</b></font></a>';

				}catch(e){




				}
		}});

		}


		if(GM_getValue("sta")=='true'){
			document.getElementById("aaa").innerHTML = '<font style=\"color:blue; font-size:100%;\">Bot Aktiv ('+GM_getValue("sekunde")+' Sekunden Spende)</font>';
			window.setInterval(starten, GM_getValue("sekunde"));
		}
	}});
// copyright by basti1012 by pennerhack