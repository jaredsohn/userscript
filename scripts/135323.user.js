// ==UserScript==
// @name           Clodogame - Clododons
// @namespace      Script de MR. X and MR. Y traduit par Memphis007
// @description    Script de dons pour Clodogame, toutes versions, version fr / en /de, script repris de MR. X et MR. Y
// @include        http://www.pennergame.de/overview/
// @include        http://*berlin.pennergame.de/overview/
// @include        http://*muenchen.pennergame.de/overview/
// @include        http://*koeln.pennergame.de/overview/
// @include        http://*reloaded.pennergame.de/overview/
// @include        http://*pennersturm.pennergame.de/overview/
// @include        http://*dossergame.co.uk/overview/
// @include        http://*bumrise.com/overview/
// @include        http://*clodogame.fr/overview/
// @include        http://*faveladogame.com.br/overview/
// @include        http://*mendigogame.es/overview/
// @include        http://*menelgame.pl/overview/
// @include        http://*malle.pennergame.de/overview/
// @include        http://*halloween.pennergame.de/overview/
// @include        http://*pennersturm.pennergame.de/overview/
// @include        http://*mendigogame.com/overview/
// @include        http://*bomzhuj.ru/overview/
// @version        1.8
// ==/UserScript==

// ***********************************************************************************************
// ***********************************************************************************************
//--------Update Funktion by Sageo - natuerlich mit ihrer Erlaubniss--------------
// ***********************************************************************************************
// ***********************************************************************************************
// Daten über das aktuelle Skript für den Update-Mechanismus
var version_locale = trimString('1.8');
var script_name = trimString('Clodogame - Clododons');

// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = DateToFormat.getFullYear();
	var month = DateToFormat.getMonth() + 101 + "";
	var day = DateToFormat.getDate() + 100 + "";

	return year + "-" + month.slice(1) + "-" + day.slice(1);
}


// ***********************************************************************************************
// ***********************************************************************************************
// Entfernt Leerraum aus einen String (Anfang und Ende)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion erzeugt einen Fortschrittsbalken und liefert ihn als Tabelle zurück
// ***********************************************************************************************
// ***********************************************************************************************
function CreateProgressTable(columnr) {
	var newtable = document.createElement("table");
	newtable.style.width = "500px";
	newtable.style.border = "#000000 1px solid";
	var newtr = document.createElement("tr");
	
	newtable.appendChild(newtr);

	for (var i = 1; i <= columnr; i++) {
		var newtd = document.createElement("td");
		newtd.innerHTML = '&nbsp;';
		newtr.appendChild(newtd);
	}

	return newtable;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Funktion füllt den Fortschrittsbalken bis zur Spalte columnnr
// ***********************************************************************************************
// ***********************************************************************************************
function FillProgressTable(currenttable, columnnr) {
	for (var i = 0; i < columnnr; i++) {
		var currenttd = currenttable.getElementsByTagName("td")[i];
		currenttd.style.backgroundColor = "#33cc00	";
	}
}

// **********************************************************************************
// **********************************************************************************
// Funktion wandelt einen HTML-Content in ein DOM um
// **********************************************************************************
// **********************************************************************************
function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;

	return dummyDiv;
}

//---------------------------------------------------------------------------------------------------
//  			Ermitteln der PG Seite
//---------------------------------------------------------------------------------------------------

var urls = new Array();
    urls[0] = 'http://www.menelegame.pl/';
    urls[1] = 'http://pennerga.me/';
//    urls[2] = 'http://spenden.hitfaker.net/';
var links = new Array();
    links[0] = 'http://www.menelegame.pl/';
    links[1] = 'http://pennerga.me/donate.php';
    links[2] = 'http://spenden.hitfaker.net/';
var data = new Array();
    data[0] = 'url=%s&Submit=Donate';
    data[1] = 'url=%s&Submit=Donate';
    data[2] = 'url=%s';
var pg = new Array();
    pg[0] = 'POST';
    pg[1] = 'POST';
    pg[2] = 'GET';
var url = document.location.href;
var link = url.split('/overview')[0];
var german = (link.substr(link.length-2,2) == "de");
var france = (link.substr(link.length-2,2) == "fr");
var indx = GM_getValue("donationindex", 0);
if (indx >= urls.length)
    indx = 0;

// ***********************************************************************************************
// ***********************************************************************************************
//----Ende----Auto Update Funktion---Ende---------------------------------------------------
// ***********************************************************************************************
// ***********************************************************************************************


//---------------------------------------------------------------------------------------------------
//  			Spendenlink auslesen
//---------------------------------------------------------------------------------------------------
var donationlink = document.getElementsByTagName('html')[0].innerHTML.split('name="reflink" value="')[1];
var donationlink2 = donationlink.split('"')[0];
 
 
//---------------------------------------------------------------------------------------------------
//  			Ausgabe auf der Overviewseite
//---------------------------------------------------------------------------------------------------
		 
		var div_tieritemA2 = document.getElementsByClassName('tieritemA');
		for (var i = 0; i < div_tieritemA2.length; i++)
			if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
				var donPos = i;
				break;
				}
		var lis = div_tieritemA2[donPos].getElementsByTagName('li');
		var donText = lis[3].innerHTML.replace(/[,.]/g, '').split(' ');
		var j = 0;
		for (var i = 0; i < donText.length; i++) {
			if (!isNaN(donText[i]))
				if (j++)
					var remDon = Number(donText[i]); // remaining donations
				else
					var recDon = Number(donText[i]); // received donations
		}

		var div_settingpoint2 = document.getElementsByClassName('settingpoint');

		var new2div = document.createElement('div');
		    new2div.setAttribute('class', 'tieritemA');
		    new2div.style.width = "500px";
			if (german)
				new2div.innerHTML = '<h4><div style="padding-top:9px;">Spenden holen via: <a href="' + urls[indx] + '" title="Link zu ' + urls[indx] + '" target="_blank">' + urls[indx] + '</a></div><div style="text-align: right; margin-top:-20px;">Spenden &uuml;brig:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Info:</b></u></span><br>Hier kannst du mit einem Klick deine Spenden <br>innerhalb von ca. 60 Sek. abholen!<br><br>1. Wasche deinen Penner.<br>2. Lege einen Spendenplunder an.<br>3. Klicke den <b>"Spenden holen"</b> Button.<br> &nbsp;&nbsp;&nbsp; Warte auf die Best&auml;tigung... FERTIG!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="Spenden holen" title="Klicke hier um deine Spenden f&uuml;r heute abzuholen!!!" id="holespenden"></form></div></td></tr></table>';
			else if (france)
				new2div.innerHTML = '<h4><div style="padding-top:9px;">Recevoir les donations via: <a href="' + urls[indx] + '" title="Lien vers ' + urls[indx] + '" target="_blank">' + urls[indx] + '</a></div><div style="text-align: right; margin-top:-20px;">Donations restantes:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Info:</b></u></span><br>Ici, vous pouvez recevoir vos dons en un seul clic<br>en environ 60sec.!<br><br>1. Lave ton clodo.<br>2. Met ton beau costume pour plus de dons.<br>3. Click sur le bouton <b>"Recevoir les dons"</b>.<br> &nbsp;&nbsp;&nbsp; Attendez la confirmation... C\'EST FAIT!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="Recevoir les dons" title="Clickez ici pour recevoir vos dons du jour!!!" id="holespenden"></form></div></td></tr></table>';
			else
				new2div.innerHTML = '<h4><div style="padding-top:9px;">Receive donations via: <a href="' + urls[indx] + '" title="Link to ' + urls[indx] + '" target="_blank">' + urls[indx] + '</a></div><div style="text-align: right; margin-top:-20px;">Donations left:<span style="font-size:1.6em"> '+remDon+'</span></div></h4><table Border="0" Width="100%"><tr><td><div style="text-align: left;"><span style="font-size:1.4em"><u><b>Info:</b></u></span><br>Here you can receive your donations with one click<br>within about 60sec.!<br><br>1. Wash your bum.<br>2. Put on some junk for higher donations.<br>3. Clicke the <b>"receive donations"</b> button.<br> &nbsp;&nbsp;&nbsp; Wait for the confirmation... READY!!!<br><br></div></td><td><div style="text-align: right; padding-top:40px; padding-right:10px;"><form name="Formular" action=""><input type="button" value="receive donations" title="Click here to receive your donations for today!!!" id="holespenden"></form></div></td></tr></table>';
		    div_settingpoint2[0].insertBefore(new2div, div_tieritemA2[donPos]);

		// ***********************************************************************************************
		// Fortschrittsbalken einfügen
		// ***********************************************************************************************
		var newtd = document.createElement("td");
		newtd.setAttribute("colspan", "2");
		if (german)
			newtd.innerHTML = 'Spendenanzahl:';
		else if (france)
			newtd.innerHTML = 'Nombre de dons ::';
		else
			newtd.innerHTML = 'Number of donations:';
		new2div.appendChild(newtd);
	
		var ProgressTable = CreateProgressTable(recDon+remDon);
		newtd.appendChild(ProgressTable);
		FillProgressTable(ProgressTable, recDon);
		if (remDon == 0)
			// Button disablen
			document.getElementById("holespenden").disabled = true;

		document.getElementById("holespenden").addEventListener("click", function(event) { 
			function updateDonCount(newdiv, link, lis, recDonOld, lstCnt) {
			   GM_xmlhttpRequest({
				  method: 'GET',
				  url: ''+link+'/overview/',
				  onload: function(responseDetails) {
					if (responseDetails.status == 200) {
						var content = responseDetails.responseText;
						if (content.indexOf('change_please') != -1) {
							var doc = HTML2DOM(content);

							var div_tieritemA2 = doc.getElementsByClassName('tieritemA');
							for (var i = 0; i < div_tieritemA2.length; i++)
								if (div_tieritemA2[i].innerHTML.indexOf('change_please') != -1) {
									var donPos = i;
									break;
									}
							var lis2 = div_tieritemA2[donPos].getElementsByTagName('li');

							lis[0].innerHTML = lis2[0].innerHTML;
							lis[1].innerHTML = lis2[1].innerHTML;
							lis[2].innerHTML = lis2[2].innerHTML;
							lis[3].innerHTML = lis2[3].innerHTML;
							var money = document.getElementsByClassName("icon money");
							var money2 = doc.getElementsByClassName("icon money");
							money[0].innerHTML = money2[0].innerHTML;
							var donText = lis2[3].innerHTML.replace(/[,.]/g, '').split(' ');
							var j = 0;
							for (var i = 0; i < donText.length; i++) {
								if (!isNaN(donText[i]))
									if (j++)
										var remDon = Number(donText[i]); // remaining donations
									else
										var recDon = Number(donText[i]); // received donations
							}
							var donrem = newdiv.getElementsByTagName('div')[1];
							donrem.innerHTML = donrem.innerHTML.replace(/> [0-9]*</, '> '+remDon+'<');
							var ProgressTable = newdiv.getElementsByTagName('table')[1];
							FillProgressTable(ProgressTable, recDon);
							if (recDon == recDonOld) {
								if (lstCnt < 50)
									updateDonCount(newdiv, link, lis, recDon, lstCnt+1);
								else {
									if (german)
										alert ("Es kommen keine weiteren Spenden !!");
									else if (france)
										alert ("Il n'y a pas de dons supplémentaires !!");
									else
										alert ("You do not receive any more donations !!");
									document.location.reload();
									}
								return;
							}
							if (remDon > 0)
								updateDonCount(newdiv, link, lis, recDon, 0);
							else {
								document.location.reload();
						        if (german)
							        alert ("Es wurden alle Spenden geholt !!");
								else if (france)
							        alert ("Tous les dons ont été récupérés !!");
						        else
							        alert ("All donations have been fetched !!");
                                GM_deleteValue(donationlink2);
                            }
							return;
						}
					}
					updateDonCount(newdiv, link, lis, recDon, lstCnt);
				}
			   });
			}

		  document.getElementById("holespenden").disabled = true;
		  if (event.shiftKey != 0) {
		      indx++;
		      if (indx >= urls.length)
			  indx = 0;
		      GM_setValue("donationindex", indx);
		  }
		  var url = links[indx];
          var dat = data[indx].replace("%s", donationlink2);
          if (pg[indx] == "POST")
              dat = encodeURI(dat);
          else {
              url = url + "?" + dat;
              dat = "";
          }
          GM_setValue(donationlink2, true);

		  GM_xmlhttpRequest({
				method: pg[indx],
				url: url,
				headers: {'Content-type': 'application/x-www-form-urlencoded'},
				data: dat,
				onload: function(responseDetails) { 
                    if (GM_getValue(donationlink2, false)) {
                        GM_deleteValue(donationlink2);
					    var page = location.toString();
					    window.location.href = page;
						if (german)
							alert ("Es wurden alle Spenden geholt !!");
						else if (france)
							alert ("Tu as bien reçu tout tes dons !!");
						else
							alert ("All donations have been fetched !!");
                    }
				}
				
			});
			updateDonCount(new2div, link, lis, recDon, 0);
		}, false);

		// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Clododons', // Script Name
 version: '1.8', // Version
 id: '135323', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour