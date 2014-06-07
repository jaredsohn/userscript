// ==UserScript==
// @name          S(VZ)alker 2.0
// @namespace     http://1x1hoster.de/sVZ/stalker/download
// @description   Eine neue Version, eines Scripts fuer schuelerVZ.net mit vielen Funktion, die das Stalker-Leben erleichtern. Die neue Version zeichnet sich dadurch aus, dass sie, dank neuer Position auch mit der SVZ-Sidebar und/oder dem "dein-SVZ-kann-mehr!"-Script funktioniert.
// @include       http://www.schuelervz.net/*
// @include	      http://www.1x1hoster.de/svztalker*
// ==/UserScript==

//alert('Stalker!!!');


//Funktion

//Standart Werte
	//Rechtespaltebreite
	GM_setValue("Rechtespaltebreite","120");


if(!GM_getValue("PinnwandEintraege"+userid))
{
	GM_setValue("PinnwandEintraege"+userid,"0");
}
if(!GM_getValue("FreundeAlben"+userid))
{
	GM_setValue("FreundeAlben"+userid,"0");
}

if(document.getElementById('script_stat'))
{
	var script_stat = document.getElementById('script_stat');
	script_stat.innerHTML = 'Das Script ist installier und aktiviert!';
	script_stat.className = 'green';	
}
else
{	
var source = "http://1x1hoster.de/sVZ/stalker/source";

var sVZlogo = document.getElementById('logo');
sVZlogo.innerHTML = 'Die Chiller im SchülerKZ<br/>'+sVZlogo.innerHTML;

//Variablen
	//User
	var userid = document.evaluate("//a[@class='left']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	userid = userid.href.slice(34, 50);

//Pinnwand
if(document.getElementById('Pinboard_Overview') || document.getElementById('Pinboard_List'))
{
 	if(document.getElementById('Pinboard_Overview'))
 	{
 		var pinnwandkommentarfeld_breite = "355px";
 		var pinboard_Content = 'pinboard_Content wordwrap';
 	}
 	else
 	{
		var pinnwandkommentarfeld_breite = "500px";
		var pinboard_Content = 'pinboard_Content';
	}
	
	//Pinnwand.Größers Kommentarfeld
	var pinnwandkommentar = document.getElementById('Pinboard_entry');
	pinnwandkommentar.style.height = "auto";
	pinnwandkommentar.style.width = pinnwandkommentarfeld_breite;
	
	pinnwandkommentar.rows = 3;
	pinnwandkommentar.setAttribute("onkeydown","var text_arr = this.value.split('\\n'); if(text_arr.length>3) { this.rows = text_arr.length; }");
	
	//Pinnwand.Größers Kommentarfeld.Zeichen
	if(document.getElementById('Pinboard_Overview'))
	{
		var pinnwandzeichen = document.evaluate("//div[@class='fieldNotes']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  	}
  	else
  	{
  	 	var pinnwandzeichen = document.evaluate("//div[@class='buttonArea']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
	}
	pinnwandzeichen.parentNode.removeChild(pinnwandzeichen);
  	
  	var pinnwandzeichen2 = document.evaluate("//label[@for='Pinboard_entry']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
  	pinnwandzeichen2.innerHTML = 'Eintrag (noch <span id="pinboardCharsCount">1001</span> Zeichen):';
  	pinnwandzeichen2.style.width = pinnwandkommentarfeld_breite;

  	
  	//Pinnwand zurück schreiben
  	//Nach dem Klick auf "Zurückschreiben"
  	function pinnwandantwort_f(id,person)
  	{ 
		GM_setValue("PinnwandAntwortEintrag", document.getElementById(id+'_pinnwandeintrag').innerHTML.replace(/<br>/g, "\n"));
		GM_setValue("PinnwandAntwortPerson", person);
		window.location.href='http://www.schuelervz.net/Profile/'+person+'#Pinboard_Overview';
	}

  	//Click Event hinzugügen
  	function addEvent(obj, id, person)
	{
		var fn = function() { pinnwandantwort_f(id,person) };
		if (obj.addEventListener) 
		{
			obj.addEventListener('click', fn, false);
		} 
		else if (obj.attachEvent) 
		{
			obj.attachEvent('oncklick', fn);
		} 
		else 
		{
            obj['onclick'] = fn;
        }
	}

  	var pinnwandeintrag = document.evaluate("//div[@class='"+pinboard_Content+"']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  	var pinnwandantworten = document.evaluate("//div[@class='pinboard_Reply']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  	var pinnwandperson = document.evaluate("//p[@class='commentMetaData']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  	if(pinnwandeintrag.snapshotLength!=pinnwandantworten.snapshotLength)
  	{
		alert('Pinnwandeintrag ist nicht gleich Pinnwandantworten!');
	}
	else
	{
		for (var i = 0; i < pinnwandantworten.snapshotLength; i++) 
		{
		 	if(pinnwandperson.snapshotItem(i).innerHTML.search(/<a href="\/Profile\/(\w{16})">/)!=-1)
		 	{
		 		pinnwandeintrag.snapshotItem(i).setAttribute('id',i+'_pinnwandeintrag');
				pinnwandantworten.snapshotItem(i).innerHTML = '<a href="javascript:;">[Zurück Schreiben]</a>'+pinnwandantworten.snapshotItem(i).innerHTML;
				addEvent(pinnwandantworten.snapshotItem(i),i,pinnwandperson.snapshotItem(i).innerHTML.match(/<a href="\/Profile\/(\w{16})">/)[1]);
			}
		}
  	}
  	
  	if(window.location.href=='http://www.schuelervz.net/Profile/'+GM_getValue('PinnwandAntwortPerson')+'#Pinboard_Overview')
  	{
  	 	document.evaluate("//div[@class='pinboard_Write clearFix']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.display = 'block';
  	 	pinnwandkommentar.value = GM_getValue('PinnwandAntwortEintrag');
  	 	GM_setValue('PinnwandAntwortEintrag','');
  	 	GM_setValue('PinnwandAntwortPerson','');
	}
	
	//Pinnwandeintrags Anzahl merken
	if(window.location.href=='http://www.schuelervz.net/Profile/'+userid || window.location.href=='http://www.schuelervz.net/Profile/'+userid+'#Pinboard_Overview')
	{
	 	var pinnwand = document.getElementById('Pinboard_Overview').innerHTML;
	 	if(pinnwand.search(/Zeige [0-9]+ von\s+<a href="\/Pinboard\/[A-Za-z0-9]{16}\/p\/1">\n\s+([0-9]+)\n\s+Einträgen\s+<\/a>/)!=-1)
	 	{
			GM_setValue("PinnwandEintraege"+userid, pinnwand.match(/Zeige [0-9]+ von\s+<a href="\/Pinboard\/[A-Za-z0-9]{16}\/p\/1">\n\s+([0-9]+)\n\s+Einträgen\s+<\/a>/)[1]);
	 	}
	}
	
	//Pinnwandstatisktik?
	if(window.location.href.search(/http:\/\/www\.schuelervz\.net\/Profile\/[A-Za-z0-9]{16}\/Statistik/)!=-1)
	{
	 	var statistik_code = window.location.href.match(/http:\/\/www\.schuelervz\.net\/Profile\/([A-Za-z0-9]{16})\/Statistik/)[1];
	 	
		var pinnwand_statistik = new Array(); 
		
			
		var statistik = GM_xmlhttpRequest({
			method: 'GET',
    		url: 'http://www.schuelervz.net/Pinboard/'+statistik_code+'/p/1',
    		headers: 
			{
	 			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml'
    		},
    		onload: function(responseDetails) 
			{	
				var statistik_pinnwandeintraege = responseDetails.responseText.match(/([0-9]+) Einträgen/)[1];
				var statistik_pinnwandseiten = Math.ceil(statistik_pinnwandeintraege/20);
				
				
				alert('Einträge:'+statistik_pinnwandeintraege+'\nSeiten:'+statistik_pinnwandseiten);

				for (var pinni = 1; pinni < statistik_pinnwandseiten; pinni++) 
				{
					var pinnwand_seite = GM_xmlhttpRequest({
					method: 'GET',
    				url: 'http://www.schuelervz.net/Pinboard/'+statistik_code+'/p/'+pinni,
    				headers: 
					{
	 					'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'application/atom+xml,application/xml,text/xml'
    				},
    				onload: function(antwort) 
					{
						var pinnwand_seite_html = antwort.responseText.replace(/\n/g, "");
						pinnwand_seite_html = pinnwand_seite_html.match(/<\/div>\s*<ul>(.+)<\/ul>\s*<\/div>/)[1];
					
						var pinnwand_seite_eintrag = pinnwand_seite_html.split('<li class="clearFix">');
	
					   	for (var i = 1; i < pinnwand_seite_eintrag.length; i++)
					   	{
					   	 	if(pinnwand_seite_eintrag[i].search(/<a href="\/Profile\/[A-Za-z0-9]{16}">/)==-1)
					   	 	{
					   	 	 	if(pinnwand_statistik['nutzer_del'])
					   	 	 	{
					   	 			pinnwand_statistik['nutzer_del']['eintrag'] += 1;
					   	 			alert(pinnwand_statistik['nutzer_del']['eintrag']);
					   	 		}
					   	 		else
					   	 		{
									pinnwand_statistik['nutzer_del'] = new Array();
									pinnwand_statistik['nutzer_del']['eintrag'] = 1;
									pinnwand_statistik['nutzer_del']['name'] = 'Nutzer gelöscht';
								}
							}
							else
							{
					   	 		var pinnwand_eintrag_user = pinnwand_seite_eintrag[i].match(/<a href="\/Profile\/([A-Za-z0-9]{16})">/)[1];
				   	 	
					 	  	 	if(pinnwand_statistik[pinnwand_eintrag_user])
				   			 	{
									pinnwand_statistik[pinnwand_eintrag_user]['eintrag'] += 1;
								}
								else
								{	 
									pinnwand_statistik[pinnwand_eintrag_user] = new Array();
									pinnwand_statistik[pinnwand_eintrag_user]['eintrag'] = 1;
								
									pinnwand_statistik[pinnwand_eintrag_user]['name'] = pinnwand_seite_eintrag[i].match(/<p class="commentMetaData">\s*<a href="\/Profile\/[A-Za-z0-9]{16}">(.+)<\/a>\s*\(/)[1];
								}	
								//pinnwand_statistik[pinnwand_eintrag_user]['bild'] = pinnwand_seite_eintrag[i].match(/<img src="http:\/\/(.+)\.jpg" alt="" \/><\/a>/)[1];
							}

							if(pinni == statistik_pinnwandseiten && i == pinnwand_seite_eintrag.length)
							{	
								var seiten_titel = document.evaluate("//div[@class='floatL']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	 							seiten_titel.innerHTML = seiten_titel.innerHTML.replace(/Seite/g, "Pinnwand Statistik");

		 					
								var seite_ausgabe = '<div id="Profile_InformationSnipplet"><h2>Pinnwand Statistik</h2><table><tr><td>Name</td><td>Einträge</td></tr>';
								for (var curr_userid in pinnwand_statistik)
								{
									seite_ausgabe += /*'<img src="http://'+pinnwand_statistik[curr_userid]['bild']+'.jpg" alt="" /><br/>'+*/'<tr><td>'+pinnwand_statistik[curr_userid]['name']+'</td><td>'+pinnwand_statistik[curr_userid]['eintrag']+'</td></tr>';
								}
								seite_ausgabe += '</table></div>';
								var seite_profil = 	document.getElementById('profileRight');
								seite_profil.innerHTML = seite_ausgabe;
							}
						}
						
					}});
					

				}
						

			}});

				
	}
	
	

}

//Extra Informationen
if(document.getElementById('Profile_InformationSnipplet_Personal'))
{
	document.getElementById('Profile_InformationSnipplet_Personal').innerHTML += '<div class="label">Eigene Infos:</div><div class="labeledText" id="eigeneinfos"></div>';
	var eigeneinfos_div = document.getElementById('eigeneinfos');
	var eigeneinfos_user = window.location.href.match(/Profile\/([A-Za-z0-9]{16})/)[1];
	
	var userinfos;
	if(GM_getValue('EigeneInfos'+eigeneinfos_user))
	{
	 	userinfos = GM_getValue('EigeneInfos'+eigeneinfos_user);
		eigeneinfos_div.innerHTML = userinfos.replace(/\n/g,"<br/>");
	}
	else
	{
	 	userinfos = '';
		eigeneinfos_div.innerHTML = '<i>Keine</i>';
	}
	eigeneinfos_div.innerHTML += '<br/><a id="eigeneinfos_edit" href="javascript:;">[&auml;ndern]</a>';
	
		
		var eigeneinfos_edit_function = function() { 
			eigeneinfos_div.innerHTML = '<textarea onkeydown="var text_arr = this.value.split(\'\\n\'); if(text_arr.length>3) { this.rows = text_arr.length; }" style="height: auto; width: 270px;" id="infos_text_feld" rows="3" cols="45" name="infos_text">'+userinfos+'</textarea><br/><input id="submit_edit_userinfos" class="fieldBtnSubmit" type="button" value="Speichern"/>';
				
				var eigeneinfos_edit_speichern = function() { 
		 		GM_setValue('EigeneInfos'+eigeneinfos_user,document.getElementById('infos_text_feld').value);
			 	userinfos = GM_getValue('EigeneInfos'+eigeneinfos_user);
		 	
				eigeneinfos_div.innerHTML = userinfos.replace(/\n/g,"<br/>");
				eigeneinfos_div.innerHTML += '<br/><a id="eigeneinfos_edit" href="javascript:;">[&auml;ndern]</a>';
			};
			if (document.getElementById('submit_edit_userinfos').addEventListener) 
			{
				document.getElementById('submit_edit_userinfos').addEventListener('click', eigeneinfos_edit_speichern, false);
			} 
			else if (document.getElementById('submit_edit_userinfos').attachEvent) 
			{
				document.getElementById('submit_edit_userinfos').attachEvent('oncklick', eigeneinfos_edit_speichern);
			} 
			else 
			{
            	document.getElementById('submit_edit_userinfos')['onclick'] = eigeneinfos_edit_speichern ;
        	}
		};
		if (document.getElementById('eigeneinfos_edit').addEventListener) 
		{
			document.getElementById('eigeneinfos_edit').addEventListener('click', eigeneinfos_edit_function, false);
		} 
		else if (document.getElementById('eigeneinfos_edit').attachEvent) 
		{

			document.getElementById('eigeneinfos_edit').attachEvent('oncklick', eigeneinfos_edit_function);
		} 
		else 
		{
            document.getElementById('eigeneinfos_edit')['onclick'] = eigeneinfos_edit_function ;
        }
        

	

}

//Fotoalben
if(document.getElementById('PhotoAlbumsFriends'))
{
	var fotoalben_freunde = document.getElementById('PhotoAlbumsFriends').innerHTML;
	GM_setValue("FreundeAlben"+userid, fotoalben_freunde.match(/<h2>\n\s+Fotoalben\s+von Freunden\n\s+\(([0-9]+)\)\n\s+<\/h2>/)[1]);
}

/*labeledText
//Private Seite erweitern
if(document.getElementById('Profile_PrivecySnipplet'))
{
  	var user_name = document.evaluate("//ul[@class='linkList']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0);
	if(user_links.innerHTML.search(/<a href="\/PhotoAlbums\/Tags\/[A-Za-z0-9]{16}">/g)==-1)
	{
	 	document.match(/<div class="labeledText">  ~?~ Nena ~. </div>/g)[1];
		user_links.innerHTML = '<li><a href="/PhotoAlbums/Tags/6f4bbe822cb66d23">Janek ist auf 42 Fotos verlinkt</a></li>'+user_links.innerHTML;
	}
}*/

//Aktuelle Infos (Nachrichten, Gruscheln, Freunde, Pinnwand)
if(document.getElementById('ad728x90'))
{
	document.getElementById('ad728x90').innerHTML = '';	
}

var rechtespalte = document.getElementById('leftSideBox');
document.getElementById('allIn').style.width = 930+(GM_getValue('Rechtespaltebreite')-160)+"px";
rechtespalte.style.width =  GM_getValue('Rechtespaltebreite')+"px";
rechtespalte.innerHTML = 'Aktuelle Infos:<br/><a id="klickupdate" href="javascript:;">aktualisieren</a><br/><a id="box_open" href="javascript:;">Box öffnen</a><br/><span id="infos_nachrichten"></span><br/><span id="infos_pinnwand"></span><br/><span id="infos_freunde"></span><br/><span id="infos_gruscheln"></span><br/><span id="infos_alben"></span><br/><span id="infos_gruppen"></span>';

var box;
function setBox(wert)
{
	box = wert;
}

function getBox()
{
	return box;
}

var updateInfos = function () 
{
 			var uebersicht = getBox(); 			
			//Nachrichten
			var nachrichten_req = GM_xmlhttpRequest({
			method: 'GET',
    		url: 'http://www.schuelervz.net/Messages',
    		headers: 
			{
	 			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml'
    		},
    		onload: function(responseDetails) 
			{	
	 			if(responseDetails.responseText.search(/<div id="msg_[0-9]+" class="tr status_new .. clearFix">/g)!=-1)
	 			{
					neuenachrichten = responseDetails.responseText.match(/<div id="msg_[0-9]+" class="tr status_new .. clearFix">/g).length;
					if(neuenachrichten!=1)
					{
						var neuenachrichten_aus = '<b>'+neuenachrichten+'</b> ungelesene Nachrichten';
					}
					else
					{
						var neuenachrichten_aus = '<b>Eine</b> ungelesene Nachricht';
					}
				}
				else
				{
					neuenachrichten_aus = 'Keine ungelesene Nachricht';
					neuenachrichten = 0;
				}
				if(uebersicht)
				{
					document.getElementById('box_nachrichten').innerHTML = neuenachrichten;
				}
				else
				{
    				document.getElementById('infos_nachrichten').innerHTML = neuenachrichten_aus;
    			}	
			}});

			//Pinnwand
			var pinnwand_req = GM_xmlhttpRequest({
			method: 'GET',
    		url: 'http://www.schuelervz.net/Profile/'+userid,
    		headers: 
			{	
	 			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml'
    		},
    		onload: function(responseDetails) 
			{	
			 	if(responseDetails.responseText.search(/Zeige [0-9]+ von\s+<a href="\/Pinboard\/[A-Za-z0-9]{16}\/p\/1">\n\s+([0-9]+)\n\s+Einträgen\s+<\/a>/)!=-1)
			 	{
	 				var pinnwandeintraege_mom = responseDetails.responseText.match(/Zeige [0-9]+ von\s+<a href="\/Pinboard\/[A-Za-z0-9]{16}\/p\/1">\n\s+([0-9]+)\n\s+Einträgen\s+<\/a>/)[1];
					if(GM_getValue("PinnwandEintraege"+userid)<pinnwandeintraege_mom)
					{
						pinnwandeintraege_mom = pinnwandeintraege_mom-GM_getValue("PinnwandEintraege"+userid);
						if(pinnwandeintraege_mom!=1)
						{
							var pinnwandeintraege_mom_aus = '<b>'+pinnwandeintraege_mom+'</b> neue Pinnwand Einträge';
						}
						else
						{
							var pinnwandeintraege_mom_aus = '<b>Ein</b> neuer Pinnwand Eintrag';
						}
					}	
					else
					{
					 	pinnwandeintraege_mom = 0;
						var pinnwandeintraege_mom_aus = 'Kein neuer Pinnwand Eintrag';
					}
				}
				else
				{
				 	pinnwandeintraege_mom = 0;
					pinnwandeintraege_mom_aus = 'Keinen oder Einen Pinnwandeintrag';	
				}
				
				if(uebersicht)
				{
					document.getElementById('box_pinnwand').innerHTML = pinnwandeintraege_mom;
				}
				else
				{	
					document.getElementById('infos_pinnwand').innerHTML = pinnwandeintraege_mom_aus;
				}
			}});

			//Startseite: Freunde, Gruscheln, Gruppen
			var startseite_req = GM_xmlhttpRequest({
			method: 'GET',
   			url: 'http://www.schuelervz.net/Start',
    		headers: 
			{
	 			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml'
    		},
    		onload: function(responseDetails) 
			{	
	 			if(responseDetails.responseText.search(/<h2>Neue Freunde<\/h2>/)!=-1)
	 			{
	 				var freundschaftsanfrage = responseDetails.responseText.match(/([0-9]+) Einladung../)[1];
					if(freundschaftsanfrage!=1)
					{
						var freundschaftsanfrage_aus = '<b>'+freundschaftsanfrage+'</b> neue Freundschaftsanfragen';
					}
					else
					{
						var freundschaftsanfrage_aus = '<b>Eine</b> neue Freundschaftsanfrage';
					}
				}
				else
				{
					var freundschaftsanfrage_aus = 'Keine neue Freundschaftsanfrage';
					var freundschaftsanfrage = 0;
				}
				
				if(box)
				{
					document.getElementById('box_freunde').innerHTML =freundschaftsanfrage;
				}
				else
				{
					document.getElementById('infos_freunde').innerHTML = freundschaftsanfrage_aus;
				}	
				
				
				if(responseDetails.responseText.search(/<h2>Du wurdest gegruschelt<\/h2>/)!=-1)
				{
				 	var gruschler = responseDetails.responseText.match(/class="gruschel">\[zurückgruscheln\]<\/a>/g);
				 	gruschler = gruschler.length;
				 	//<a href="#" title="zurückgruscheln" class="gruschel"><\/a>
					var gruschler_aus = 'Du wurdest <b>'+gruschler+'</b>-mal gegruschelt';
				}
				else
				{
				 	var gruschler = 0;
					var gruschler_aus = 'Du wurdest nicht gegruschelt';
				}
				
				if(uebersicht)
				{
					document.getElementById('box_gruscheln').innerHTML = gruschler;
				}
				else
				{
					document.getElementById('infos_gruscheln').innerHTML = gruschler_aus;
				}
				
				if(responseDetails.responseText.search(/<a href="\/Groups\/Join\/[A-Za-z0-9]{16}" title="\[annehmen\]">\[annehmen\]<\/a>/)!=-1)
				{
					var gruppeneinladung = responseDetails.responseText.match(/<a href="\/Groups\/Join\/[A-Za-z0-9]{16}" title="\[annehmen\]">\[annehmen\]<\/a>/g);
					gruppeneinladung = gruppeneinladung.length;
					if(gruppeneinladung!=1)
					{
						gruppeneinladung_aus = '<b>'+gruppeneinladung+'</b> Gruppeneinladungen';
					}
					else
					{
						gruppeneinladung_aus = '<b>Eine</b> Gruppeneinladung';
					}	
				}
				else
				{
				 	gruppeneinladung = 0;
					gruppeneinladung_aus = 'Keine Gruppeneinladung';
				}
				if(uebersicht)
				{
					document.getElementById('box_gruppen').innerHTML = gruppeneinladung;
				}
				else
				{
					document.getElementById('infos_gruppen').innerHTML = gruppeneinladung_aus;
				}
			}});
					
			//Fotoalben
			var fotoalben_req = GM_xmlhttpRequest({
			method: 'GET',
   			url: 'http://www.schuelervz.net/PhotoAlbums/'+userid,
    		headers: 
			{
	 			'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml'
    		},
    		onload: function(responseDetails) 
			{
			 	var alben = responseDetails.responseText.match(/<h2>\n\s+Fotoalben\s+von Freunden\n\s+\(([0-9]+)\)\n\s+<\/h2>/)[1];
			 	if(alben==0)
			 	{
					alben_aus = 'Kein Fotoalbum';
				}
				else
				{
				 	if(GM_getValue("FreundeAlben"+userid)<alben)
					{
						alben = alben-GM_getValue("FreundeAlben"+userid);
						if(alben!=1)
						{
							alben_aus = '<b>'+alben+'</b> neue Fotoalben';
						}
						else
						{
							alben_aus = '<b>Ein</b> neues Fotoalbum';
						}
					}	
					else
					{
					 	alben = 0;
						alben_aus = 'Kein neues Fotoalbum';
					}
				}
				if(uebersicht)
				{
					document.getElementById('box_alben').innerHTML = alben;	
				}
				else
				{	
					document.getElementById('infos_alben').innerHTML = alben_aus;
				}
			}});
}

function box_schliessen()
{
 	setBox(false);
 	updateInfos();
	var loeschen = document.getElementById('PhxCover'); 
	loeschen.parentNode.removeChild(loeschen);
 
	var loeschen2 = document.getElementById('PhxDialog0');
	loeschen2.parentNode.removeChild(loeschen2);
}

function box_oeffnen()
{
	var alles = document.getElementById("allIn");
	var fenster = document.createElement("div");
	fenster.setAttribute("style","");
	fenster.setAttribute("id","PhxCover");
	fenster.style.display = 'block';
	fenster.style.width = '100%';
	fenster.style.height = '100%';
	alles.parentNode.insertBefore(fenster, alles.nextSibling);
	var box_inhalt = '<table><tr><td><div style="width: 150px; height: 144px; background-image: url(\'http://static.pe.schuelervz.net/Img/IconGru.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#FF9900" id="box_gruscheln"></font></div></td><td><div style="width: 150px; height: 128px; background-image: url(\'http://static.pe.schuelervz.net/Img/IconFriend.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#00FFFF" id="box_freunde"></font></div></td><td><div style="width: 150px; height: 108px; background-image: url(\'http://static.pe.schuelervz.net/Img/IconGroup.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#00FFFF" id="box_gruppen"></font></div></td></tr><tr><td align="center"><font size="5">Gruschlen</font></td><td align="center"><font size="5">Freunde</font></td><td align="center"><font size="5">Gruppe</font></td></tr><tr><td><div style="width: 150px; height: 157px; background-image: url(\'http://img247.imageshack.us/img247/6635/pinnwandyn7.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#00FFFF" id="box_pinnwand"></font></div></td><td><div style="width: 150px; height: 128px; background-image: url(\'http://img179.imageshack.us/img179/5346/00007ps4.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#00FFFF" id="box_alben"></font></div></td><td><div style="width: 150px; height: 108px; background-image: url(\'http://static.pe.schuelervz.net/Img/IconMail.jpg\'); text-align: center;"><font style="font-size: 70pt;" color="#00FFFF" id="box_nachrichten"></font></div></td></tr><tr><td align="center"><font size="5">Pinnwand</font></td><td align="center"><font size="5">Fotoalben</font></td><td align="center"><font size="5">Nachrichten</font></td></tr></table>';
	
	var box = document.createElement("div");
	box.setAttribute("id","PhxDialog0");
	box.setAttribute("class","phxDialogCenter phxDialogMain");
	box.setAttribute("style","");
	box.style.top = '50px';
	fenster.parentNode.insertBefore(box, fenster.nextSibling);
	box.innerHTML = '<div class="phxDialog"><div class="phxDialogTop"></div><div class="phxDialogBody"><div class="phxDialogTitle">Aktuelle Ereignisse</div><div class="phxDialogContent">'+box_inhalt+'</div><div class="phxDialogButtons"><a id="PhxDialog0_Button1" class="btnLikeLink FieldBtnSubmit" href="#" onclick="">Schließen</a></div></div><div class="phxDialogBottom"></div></div>';

	document.getElementById('PhxDialog0_Button1').addEventListener('click', box_schliessen, false);
	setBox(true);
	updateInfos();
}

setBox(false);
updateInfos();
//window.setInterval(updateInfos, 30000);
document.getElementById('klickupdate').addEventListener('click', updateInfos, false);
document.getElementById('box_open').addEventListener('click', box_oeffnen, false);


//http://www.schuelervz.net/Friends/Delete/2257ec0bae40f68e
}