// ==UserScript==
// @name           Jetzt online!
// @namespace      WKW 
// @description    Alle deine Freunde die online sind, findest du rechts in einer neuen Sidebar.
// @description    Author: http://www.wer-kennt-wen.de/person/8qd938zp
// @description    Gruppe: http://www.wer-kennt-wen.de/club/eqppbhod
// @description    Version: 2010.09.28
// @include        http://www.wer-kennt-wen.de/*
// ==/UserScript==
var version = '2010.09.28';
var codes = new Array();
var names = new Array();
var truefalse = new Array();
var links_a = new Array();
var aktueller_benutzername;
var alle_user = new Array();
var sounds_name = new Array();
var select_sounds_post;
var quellcode;
var user;
var tmp;
var benutzer_code;


var icon_snd = 'data:image/gif;base64,R0lGODlhHgAOANUAAP////v///P+//f39+b7/vDw8O/w8N7z/Ojp6efn6NXr+Mzq+ODg4d/f39fX187Ozq3Q6cTFxbu7vJa93LGxsqenqJycncyRaXadxseLZ2+cv8yLQJCRkmeWuISEhnZ3eEt3pWhoajVgi1hZWyVXhgw1aQAMRQAMPAAAKAAAGQAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHAAAALAAAAAAeAA4AAAa3QIBwSCwaiw7JcXlscBpCR8HjAGQwBKbRUAmFGoNI5PkBbFSliUALGEhClMETwBk/LI6zakWCBIwcI4IcCUJzBh8OeBV6KiooIAtFgYJEcwAeCSEGHI2OKicdCkOUI5ZQABQNHnSejiYaB6SCpqSoT6adn4+Rk7QPtkIhCB4NFnopIn5GDxLOH3NzEhXOFBFnaWtsABEhFcUDHwwfBSEDF1jbRAMVI6iLSupLCQZDDh4D8uoD+QBBADs=';

///// Icon zum adden /////
var icon_add = "data:image/png;base64,R0lGODlhEAAQAIQBAGaZzP///8zMzDNmmZnM/8yZAJmZmf/MZv/MM8yZM5nMzP//zJmZzGZmZsz//8zM/8zMZmaZmZmZZv///////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAQABAAQAWA4IeM42eK5AmsQWs0QuCswFcUCaE8cSAQBEniZhoAjLTkwFQ4LA45IFCROByIK0LP0BIIaEVaaxygLT9e72DNTgtszSdESoBYiU2oQkFgMHRUC0QRAAQPHz5jQIQmKwxjDS8CMythAD09AQQrZ2wrmJxrJ2lsbV4nBqkGJ6iqHyEAOw==";


	  /////////////////////////////////////////////
////////// Initialisiert die Variablen Start /////
	/////////////////////////////////////////////
	function initVars()
	{
		//alert('initVars');
		///// Werbung entfernen /////
		topad = document.getElementById('topad');
		if( topad )
			topad.parentNode.removeChild(topad);
		ads = document.getElementById('ads');
		if( ads )
			ads.parentNode.removeChild(ads);

		///// Aktuelle URL /////
		url = document.URL












		var msgDIV = document.createElement('div');
		msgDIV.setAttribute('class' , 'box info');
		msgDIV.setAttribute('name' , 'msgDIV');

var theMSG = 'WKW Jetzt Online!-Script<br><br>Dieses Userscript ist fehlerhaft<br>Dieses Userscript wird nicht mehr weiter entwickelt!<br><br>Ab sofort gibt es dieses Userscript nur noch als eigenständiges Firefox Addon.<br>Das Addon kannst Du dir hier besorgen:<br><br><a href="https://addons.mozilla.org/en-US/firefox/addon/wkw-stuff/">https://addons.mozilla.org/en-US/firefox/addon/wkw-stuff/</a>';
			msgDIV.innerHTML = theMSG;

		var div = content.window.document.getElementById('rahmen');
		div.insertBefore(msgDIV, div.firstChild);
		allMsgDIV = content.window.document.getElementsByName('msgDIV');











		/////// Alle "Jetzt online!"-Benutzer finden /////
		var user_online = false;		
		for(i = 0;;i++)
		{
			var benutzer = GM_getValue('benutzer_' + i , null );
			if (benutzer == null){
				break;			
 			}else{
				alle_user[i] = benutzer;
				check_is_on = GM_getValue( alle_user[i] + '_' +i , null );
                if ( check_is_on )
				{
					user_online = true;
					user = alle_user[i];
					//check_version();
				}
			}
		}

		///// Ist schon ein Benutzer auf online gesetzt? /////
		if (!user_online)
		{
			///// Ist der Benutzer eingeloggt? /////
			if( document.getElementById('topright').getElementsByTagName('p')[0].innerHTML.indexOf('Herzlich')>-1)
			{
				///// Aktuell angemeldeten User-Code ermitteln /////
				GM_xmlhttpRequest(
				{
				method: 'GET',
				url: 'http://www.wer-kennt-wen.de/person',
				onload: function(responseDetails){
					ichseite = responseDetails.responseText.match(/\/user\/([A-Za-z0-9]{8})/);
					benutzer_code = ichseite[0].substring(6);	
					//alert('ich seite | '+benutzer_code+' |');

					if ( alle_user.length == 0 )
					{
						///// 1. Benutzer anlegen /////
						alle_user[0];
						new_user();
					}
					///// Wenn mind. 1 Benutzer dann... /////
					if ( alle_user.length > 0 )
					{
						for( i = 0; i < alle_user.length; i++ )
						{
							alle_benutzer = tmp +='|'+alle_user[i];							
							if ( alle_user[i].match(benutzer_code ))
							{							
								///// Setze den Benutzer auf online /////								
								GM_setValue(alle_user[i]+'_' +i,true);
								///// Alles Buddys auf offline /////
								for(x = 0; x < codes.length; x++)
								{
									GM_setValue(alle_user[x]+'_'+ codes[x],false);
								}
								user = benutzer_code;
								//check_version();
							}else{
								///// Setze wenn vorhanden zur Sicherheit alle andern auf offline /////
								GM_setValue(alle_user[i]+'_' +i,false);
							}
						}
						///// 2. 3. 4. Benutzer neu anlegen /////
						if (alle_benutzer.match(benutzer_code) == null )
						{	
							new_user();
						}					
					}
				}
			});
		}
	}

		///// Sounddateien auslesen /////
		sound_post_sel = GM_getValue(user+'_sound_post' , null);
		sound_added_on_sel = GM_getValue(user+'_sound_buddy_on' , null);
		sound_added_off_sel = GM_getValue(user+'_sound_buddy_off' , null);

		/////// Alle Buddykürzel auslesen /////
		for(i = 0;;i++)
		{
			var code = GM_getValue(user+'_codes_' + i,null);
			if (code  == null)
				break;
			else
				codes[i] = code;			
		}	

		///// Alle Buddynamen auslesen /////
		for(i = 0;i < codes.length;i++)
		{
			var name = GM_getValue(user+'_names_' + codes[i],null);
			if (name  == null)
				break;
			else
				names[i] = name;
		}	

		///// Letzter Click bei 'Millisekunden' /////
		var time = new Date().getTime();
		timestamp = Math.round(time/1000);
		GM_setValue(user+'_click',timestamp);
		GM_setValue(user+'_click_message',false);


	}
	  ///////////////////////////////////////////
///////// Initialisiert die Variablen ENDE /////
	///////////////////////////////////////////



      //////////////////////////////////////
////////// Onlineliste erzeugen Start /////
	//////////////////////////////////////	
	function justonline()
	{
		var person_a = new Array();
		var bilder_a = new Array();
		var vorname_a = new Array();
		var nameAngezeigt = new Array();
		var istonline = '';
		var istonline_tmp = '';
		var tmp
		//initVars();


		var time = new Date().getTime();
		now = Math.round(time/1000);
		now -= 600; // Aktuelle Uhrzeit -600 Seknunden 
		last_click = GM_getValue(user+'_click',null);
		message = GM_getValue(user+'_click_message',null);
		if ( last_click < now)// && !message)
		{
			//alert('letzter click länger 10 minuten');
			status = 0; // value="0" ist unsichtbar
			visible(status);
		}

		///// Die Seite mit der Onlineliste abfragen /////
		GM_xmlhttpRequest(
		{
		method: 'GET',
		url: 'http://www.wer-kennt-wen.de/people/online',
		overrideMimeType: "text/html; charset=ISO-8859-1",
		onload: function(responseDetails)
		{
			///// Quellcode zum Posteingang checken /////			
			quellcode_post = responseDetails.responseText;
			post(quellcode_post);
			///// Position zum kürzen ermitteln Anfang /////
    		var start = responseDetails.responseText.indexOf('<div class="pl-pic">')-50;
			///// Position zum kürzen ermitteln Ende /////
			var stop  = responseDetails.responseText.indexOf('<h2 id="invHeader">'); 		
	      	///// Quellcode kürzen /////
			var quellcode = responseDetails.responseText.substring(start,stop);



			///// Findet das Kürzel für die Person /////
			var treffer = quellcode.match(/([A-Za-z0-9]{8})\" class=\"online\"/g);
			if ( treffer != null ) 
			{
				for( i=0; i < treffer.length; i++ ) 
				{			
					person_a.push(treffer[i].substr(0,8));
				}
			}

			///// Findet alle "medium" Bilder ////
			var treffer = quellcode.match(/http:([./0-9a-zA-Z_]){1,}medium([./0-9a-zA-Z_]){1,}(jpg|gif)/g);
			if ( treffer != null )
			{
				for( i=0; i < treffer.length; i++ )
				{			
					bilder_a.push(treffer[i]+' \n');
				}
			}

			///// Findet Vornamen /////
			var treffer = quellcode.match(/alt="([^"]*\s)/g);
			var treffer = quellcode.match(/alt="([^"]*\s)/g);
			if ( treffer != null ) 
			{			
				for( i=0; i < treffer.length; i++ ) 
				{			
					vorname_a.push(treffer[i].substr(5));
					/*var foobaz=treffer[i].match( /"\w+/g );
					foobaz.substring(1);
					alert(foobaz);*/
					
				}

			}
//alert(vorname_a);

			///// String mit allen Buddys erzeugen /////
			for ( y=0; y < person_a.length; y++)
			{
				for ( x=0; x < codes.length; x++)
				{					
					if ( person_a[y].indexOf(codes[x]) == 0 )
						{
						istonline_tmp = tmp +='|'+person_a[y];
						}
				}
					istonline = istonline_tmp.substring(9);
			}

			///// Welche Nachricht ausgeben? /////
			message_pop_on = GM_getValue(user+'_message_pop_on',null);
			message_pop_off = GM_getValue(user+'_message_pop_off',null);
			message_sound_on = GM_getValue(user+'_message_sound_on',null);
			message_sound_off = GM_getValue(user+'_message_sound_off',null);
			sound_buddy = '';	
						
			//// Ist online/offline Messagausgabe /////
			for (i = 0;i < codes.length;i++)
			{
				truefalse[i] = GM_getValue(user+'_' + codes[i]);
				///// Buddy ist online /////
				if ( istonline.match(codes[i]))
				{
					if ( !truefalse[i] )
					{
						if ( message_sound_on ){
							sound_buddy = '<embed src="'+sound_added_on_sel+'" height="0" width="0">';			}
						if ( message_pop_on ){
							alert(names[i] + ' (' + codes[i] + ') ist online');
						}						
						GM_setValue(user+'_' + codes[i],true);
					}
				}
				///// Buddy ist offline /////
				if ( istonline.match(codes[i]) == null )
				{
					if ( truefalse[i] )
					{
						if ( message_sound_off ){
							sound_buddy = '<embed src="'+sound_added_off_sel+'" height=0" width="0">';			}
						if ( message_pop_off ){
							alert(names[i] + ' (' + codes[i] + ') ist offline');
						}
						GM_setValue(user + '_' + codes[i],false);
					}
				}
			}

			///// Texte Onlineliste Überschrift /////
	 		anz_on = person_a.length;	
			if ( anz_on < 1 ){text = '0 Leute sind online';}
			if( anz_on == 1 ){text = 'Eine Person ist online';}				
			if( anz_on > 1 ){text = anz_on+' Leute sind online';}

			///// Entfernt die alte Tabelle nach dem reload /////
			function killElement(element)
			{
				if (element) 
				{
				  	var papa = element.parentNode;
				  	if (papa) papa.removeChild(element);
			 	}
			}
			killElement(document.getElementById("onlineliste"));

			///// Onlineliste generieren /////
			var div = document.createElement('div');
			div.setAttribute("id","onlineliste1");
			var element = document.createElement('table');
			element.setAttribute("id","onlineliste");

			///// Onlineliste Überschrift /////
			HTML = sound_buddy+'<table class="photolist"><tbody><tr><td colspan="2"><h2><span>'+text+'<img style="cursor: pointer;" src="http://static.werkenntwen.de/images/icons/help_h2.gif" class="needHelp right" id="hilfetext" alt="Info zu Jetzt online!" title="Info zu Jetzt online!" value"hilfeanzeigen"></span></h2></tr>';

			///// Ist niemand online bastel auch keine Tabelle /////
			if (person_a.length > 0 )
			{
				anordnung = GM_getValue(user+'_anordnung',null);
				if ( anordnung )
				{
				  
				  //////////////////////////////////////////
				 ///// Ausgabe der Liste in 2 Spalten /////
				//////////////////////////////////////////

				///// (Anzahl Freunde online) / (2) ergibt aufgerundet die Anzahl der <TR> /////
				var anz = 0;	
				var anz = person_a.length / 2;		
					anz_TR = Math.round(anz);

					///// a als Zähler für die Ausgabe von den 3 Arrays person_a, bilder_a, vornamen_a /////
					a = 0;

					///// 1. Schleife erstellt <TD> dann 2. Scheife für 2 <TD> und </TD> nach dem break; /////

					for( i=0; i < anz_TR; i++)
					{
						HTML += '</tr>';
						for( x=0; x < 2; x++)
						{
								if ( istonline.match(person_a[a]))
								{
									var onlinepic = '<a href="http://www.wer-kennt-wen.de/person/'+person_a[a]+'" class="online"><img src="http://static.werkenntwen.de/images/icon_ok.gif"></a>';
//alert('geaddet '+vorname_a[a]);							
								}
								else
								{
									var onlinepic = '<a href="'+url+'" class="online"><img src="'+icon_add+'" border="0" id="add_'+person_a[a]+vorname_a[a]+'"></a>';
//alert('nicht geaddet '+vorname_a[a]);
								}							
							if ( a == anz_on)
							{
								HTML += '<td></td>';
								break;
							}					
							HTML  += '<td><div class="pl-pic">'+onlinepic+' <a href="/person/'+person_a[a]+'"><img src="'+bilder_a[a]+'" alt="'+vorname_a[a]+'" title="'+vorname_a[a]+'" border="0"></a></div><a class="onlineliste" href="/person/'+person_a[a]+'">'+vorname_a[a]+'</a><br><a href="/message/toUser/'+person_a[a]+'"><img src="http://static.werkenntwen.de/images/icons/icon_user_message.gif" title="Nachricht an '+vorname_a[a]+'"></a>&nbsp;<a href="/interconnection/invite/'+person_a[a]+'/type/1"><img src="http://static.werkenntwen.de/images/icons/icon_controller.gif" title="Mit '+vorname_a[a]+' Wer gewinnt? spielen"></a>&nbsp;<a href="javascript:void(window.open(\'/chat.php?user='+person_a[a]+'\', \'chat_'+person_a[a]+'\', \'width=550,height=490,resizable=no\')\)\;"><img src="http://static.werkenntwen.de/images/icons/icon_chat.gif" title="Mit '+vorname_a[a]+' chatten"></a></td>';
							a++;
						}
					}
					HTML += '</tr>';
				}
				else
				{
					  /////////////////////////////////////////
					 ///// Ausgabe der Liste in 1 Spalte /////
					/////////////////////////////////////////			 
					for( a=0; a < anz_on; a++)
					{				
						if ( istonline.match(person_a[a]))
						{
							var onlinepic = '<a href="http://www.wer-kennt-wen.de/person/'+person_a[a]+'" class="online"><img src="http://static.werkenntwen.de/images/icon_ok.gif"></a>';
//alert('geaddet '+vorname_a[a]);							
						}
						else
						{
									var onlinepic = '<a href="'+url+'" class="online"><img src="'+icon_add+'" border="0" id="add_'+person_a[a]+vorname_a[a]+'"></a>';
//alert('nicht geaddet '+vorname_a[a]);
						}						

						HTML  += '<tr><td><div class="pl-pic">'+onlinepic+'<a href="/person/'+person_a[a]+'"><img src="'+bilder_a[a]+'" alt="'+vorname_a[a]+'" title="'+vorname_a[a]+'" border="0"></a></div><a href="/person/'+person_a[a]+'">'+vorname_a[a]+'</a><br><a href="/message/toUser/'+person_a[a]+'"><img src="http://static.werkenntwen.de/images/icons/icon_user_message.gif" title="Nachricht an '+vorname_a[a]+'"></a>&nbsp;<a href="/interconnection/invite/'+person_a[a]+'/type/1"><img src="http://static.werkenntwen.de/images/icons/icon_controller.gif" title="Mit '+vorname_a[a]+' Wer gewinnt? spielen"></a>&nbsp;<a href="javascript:void(window.open(\'/chat.php?user='+person_a[a]+'\', \'chat_'+person_a[a]+'\', \'width=550,height=490,resizable=no\')\)\;"><img src="http://static.werkenntwen.de/images/icons/icon_chat.gif" title="Mit '+vorname_a[a]+' chatten"></a></td></tr>';
					}
				}			
			}
			else	
			{
				HTML +='<tr><td colspan="2"><img src="http://static.werkenntwen.de/images/icons/icon_message.gif"><br>Niemand<br>von Deinen<br>Kontakten<br>ist online!</td></tr>';
			}
			HTML += '<tr><td colspan="2"><h2><span><a href="http://www.wer-kennt-wen.de/club/eqppbhod">Jetzt online! WKW-Gruppe</a></span></h2></td></tr></tbody></table></table>';
			element.innerHTML = HTML;

			document.getElementsByTagName('body')[0].appendChild(element);
			document.getElementById('hilfetext').addEventListener('click',function(){einstellungen();},true);

			///// EventListener nur für die Personen die noch nicht geaddet sind /////
			for ( i = 0; i < person_a.length;i++)
			{
				if ( !istonline.match(person_a[i]))
				{	
//alert(vorname_a[i]+' nicht geaddet');
					document.getElementById('add_'+person_a[i]+vorname_a[i]).addEventListener('click', addfromList, false);
				}
			}
			
			imageZoom();
			window.setTimeout(function(){justonline();},60000);	
		}
	});
}
		  /////////////////////////////////////
////////////// Onlineliste erzeugen ENDE /////
		/////////////////////////////////////


	  ////////////////////////////////////////////////////
////////// Benutzerprofil Adden-Link einfügen Start /////
	////////////////////////////////////////////////////

	function personsSite(){
	    arrow_start = document.getElementById('content').innerHTML.indexOf('arrow');
	    arrow_stop = document.getElementById('content').innerHTML.lastIndexOf('arrow');
		// Kenne ich die Person direkt?
		if ( arrow_start == arrow_stop )
		{
			if ( arrow_start > -1 )
			{		
				var id = url.substring(url.length - 8);
			//	alert(id);
				var h1 = document.getElementById('rahmen').getElementsByTagName('h1')[0].innerHTML;
			//	alert(h1);
				var name = h1.substring(0,h1.indexOf(' Seite') -1);
			//	alert(name);
				var sidebar = document.getElementById('sidebar');
				var newButton1 = document.createElement('li');
				newButton1.setAttribute("class","adden");
		
				for( i = 0;;i++ )
				{		
					if( id.indexOf(codes[i]) > -1)
					{
						newButton1.innerHTML = '<font color="#135AA0">nicht mehr anzeigen wenn ' + name + ' online geht</font>';
						newButton1.addEventListener('click',function(){var eing = confirm('Willst du ' + name + ' wirklich löschen?'); if (eing){deletePerson(id,name);} reload();},true);
						break;
					}
					else if( i >= codes.length -1)
					{
						newButton1.innerHTML = '<font color="#135AA0">anzeigen wenn ' + name + ' online geht</font>';
						newButton1.addEventListener('click',function(){addNewPerson(id,name)},true);
						break;
					}
			
				}
				//hinzufügen
					var ul = sidebar.getElementsByTagName('ul')[0];
					ul.appendChild(newButton1);
			}
		}	
	}
	
	  ///////////////////////////////////////////////////
////////// Benutzerprofil Adden-Link einfügen Ende /////
	///////////////////////////////////////////////////


	  //////////////////////////////////////////////
////////// Einstellung & Hilfe erzeugen Start /////
	//////////////////////////////////////////////

	function einstellungen ()
	{

		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://justonline.ju.funpic.de/sounds.html',
			onload: function(responseDetails)
			{
				links_a = new Array();				
				///// Findet alle Soundlinks ////
				var links = responseDetails.responseText.match(/http:([./0-9a-zA-Z_]){1,}.(wav|swf)/g);
				if ( links != null )
				{
					for( i=0; i < links.length; i++ )
					{			
						links_a.push(links[i]);
					}
				}

			sound_post_sel = GM_getValue(user+'_sound_post' , null); // aktuell gewählter Sound bei neuer Nachricht
			sound_added_on_sel = GM_getValue(user+'_sound_buddy_on' , null); // aktuell gewählter Sound bei Buddy geht on
			sound_added_off_sel = GM_getValue(user+'_sound_buddy_off' , null); // aktuell gewählter Sound bei Buddy geht off
			sound_post = GM_getValue(user+'_post_sound_on_off' , null);
			message_pop_on = GM_getValue(user+'_message_pop_on',null);
			message_pop_off = GM_getValue(user+'_message_pop_off',null);
			message_sound_on = GM_getValue(user+'_message_sound_on',null);
			message_sound_off = GM_getValue(user+'_message_sound_off',null);

			var form = document.body.insertBefore(document.createElement("form"), document.body.firstChild);
			form.id = "einstellungen";
			var overlay = form.appendChild(document.createElement("div"));
			overlay.id = "overlay";
		
			var fieldset = form.appendChild(document.createElement("fieldset"));
		
			var legend = fieldset.appendChild(document.createElement("legend"));
			legend.appendChild(document.createTextNode("Jetzt online! - Einstellungen"));

			///// Navigation START /////
			var div = fieldset.appendChild(document.createElement("div"));
	 		div.setAttribute('id' , 'navigation');

			var ul = div.appendChild(document.createElement("ul"));
			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Einstellungen"));
			a.setAttribute('id' , 'table1');
			a.addEventListener('click', changeTable, false);

			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Buddylist"));
			a.setAttribute('id' , 'table2');
			a.addEventListener('click', changeTable, false);

			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Hilfe"));
			a.setAttribute('id' , 'table3');
			a.addEventListener('click', changeTable, false);

			var li = ul.appendChild(document.createElement("li"));
			var a = li.appendChild(document.createElement("a"));
			a.appendChild(document.createTextNode("Version"));
			a.addEventListener('click', versionstest, false);
			///// Navigation ENDE /////
	
			///// Tabelle Einstellungen START /////
			var table = fieldset.appendChild(document.createElement("table"));
			table.setAttribute('id' , 'table_1');
			table.setAttribute('style' , 'display:block');
			table.setAttribute('border' , '0');
			var tr = table.appendChild(document.createElement("tr"));
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');


			td.appendChild(document.createTextNode("Sound wenn Buddy on geht"));
			var label = td.appendChild(document.createElement("label"));
			var input = label.appendChild(document.createElement("input"));
			input.name = 'message_sound_on';
			input.type = "checkbox";
			input.checked = (message_sound_on);
			label.appendChild(document.createTextNode(" aktiviert"));
			var hr = label.appendChild(document.createElement('hr'));

			td.appendChild(document.createTextNode("Sound wenn Buddy off geht"));
			var label = td.appendChild(document.createElement("label"));
			var input = label.appendChild(document.createElement("input"));
			input.name = 'message_sound_off';
			input.type = "checkbox";
			input.checked = (message_sound_off);
			label.appendChild(document.createTextNode(" aktiviert"));
			var hr = label.appendChild(document.createElement('hr'));

			td.appendChild(document.createTextNode("Fenster wenn Buddy on geht"));
			var label = td.appendChild(document.createElement("label"));
			var input = label.appendChild(document.createElement("input"));
			input.name = 'message_pop_on';
			input.type = "checkbox";
			input.checked = (message_pop_on);
			label.appendChild(document.createTextNode(" aktiviert"));
			var hr = label.appendChild(document.createElement('hr'));

			td.appendChild(document.createTextNode("Fenster wenn Buddy off geht"));
			var label = td.appendChild(document.createElement("label"));
			var input = label.appendChild(document.createElement("input"));
			input.name = 'message_pop_off';
			input.type = "checkbox";
			input.checked = (message_pop_off);
			label.appendChild(document.createTextNode(" aktiviert"));
			var hr = label.appendChild(document.createElement('hr'));

			td.appendChild(document.createTextNode("Sound bei neuer Nachricht"));
			var label = td.appendChild(document.createElement("label"));
			var input = label.appendChild(document.createElement("input"));
			input.name = 'sound_post';
			input.type = "checkbox";
			input.checked = (sound_post);
			label.appendChild(document.createTextNode(" aktiviert"));

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			td.appendChild(document.createTextNode("Sounddatei bei neuer Nachricht"));
			var snd = 1;
			sound_dateien(snd);
			var hr = td.appendChild(document.createElement("hr"));
			td.appendChild(document.createTextNode("Sounddatei Buddy geht on"));
			var snd = 2;
			sound_dateien(snd);
			var hr = td.appendChild(document.createElement("hr"));
			td.appendChild(document.createTextNode("Sounddatei Buddy geht on"));
			var snd = 3;
			sound_dateien(snd);
			var hr = td.appendChild(document.createElement("hr"));
			///// Tabelle Einstellungen ENDE /////

			///// Tabelle Buddylist START /////
			var table = fieldset.appendChild(document.createElement("table"));
			table.setAttribute('id' , 'table_2');
			table.setAttribute('style' , 'display:none');
			table.setAttribute('border' , '0');
			var tr = table.appendChild(document.createElement("tr"));
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '3');
			td.appendChild(document.createTextNode('Wähle die zu löschenden Buddys aus'));
			for ( i = 0; i < codes.length;i++)
			{	
				nr = i;
				nr++;
				var tr = table.appendChild(document.createElement('tr'));
				var td = tr.appendChild(document.createElement('td'));
				td.appendChild(document.createTextNode(nr+'.'));
				var td = tr.appendChild(document.createElement('td'));
				var label = td.appendChild(document.createElement("label"));
				img = label.appendChild(document.createElement('img'));
				img.src = 'http://static.werkenntwen.de/images/icon_waste.gif';
				label.appendChild(document.createTextNode(' '));
				var input = label.appendChild(document.createElement("input"));
				input.id = codes[i];
				input.type = "checkbox";
				var td = tr.appendChild(document.createElement('td'));
				var a = td.appendChild(document.createElement('a'));
				a.setAttribute('href' , 'http://www.wer-kennt-wen.de/person/'+codes[i]);
				a.setAttribute('target' , 'blank');
				a.appendChild(document.createTextNode(names[i]+' ( '+codes[i]+' )'));
			}
			///// Tabelle Buddylist ENDE /////

			///// Tabelle Hilfe START /////
			var table = fieldset.appendChild(document.createElement("table"));
			table.setAttribute('id' , 'table_3');
			table.setAttribute('style' , 'display:none;');
			table.setAttribute('border' , '0');
			var tr = table.appendChild(document.createElement("tr"));

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr1');
			a.appendChild(document.createTextNode('1. Onlineliste'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr2');
			a.appendChild(document.createTextNode('2. Buddylist'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr3');
			a.appendChild(document.createTextNode('3. Benachrichtigungen'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr4');
			a.appendChild(document.createTextNode('4. Fehler'));
			a.addEventListener('click' , changeTr , false);

			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('style' , 'padding:2px;');
			var a = td.appendChild(document.createElement('a'));
			a.setAttribute('id' , 'tr5');
			a.appendChild(document.createTextNode('5. Danke ;-)'));
			a.addEventListener('click' , changeTr , false);


			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_1');
			tr.setAttribute('style' , 'display:block');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.appendChild(document.createTextNode('11111111111'));
			td.innerHTML = '<p>Rechts oben, wo normalerweise die Werbung erscheint, siehst du jetzt eine Liste mit deinen Freunden, die gerade auf WKW online sind. Die Ansicht der Liste kannst du unter <b>Einstellungen</b> von 1 bis 4-spaltig umstellen. Gerade wenn Du die Schrift schon vergrößert hast oder ein kleines Netbook besitz kann es passieren, dass die Liste rechts ausserhalb des Bildschirmes ist.<br>Die Liste wird alle 60 Sekunden automatisch erneuert.<br><b><font color="#ec4317">ACHTUNG!</b></font><br>Das bedeutet auch, dass du eingeloggt bleibst auf WKW, selbst wenn du nicht an deinem Rechner sitzt! Wenn Du <u>10 Minuten keine neue Seite bei WKW aufgerufen hast</u> stellt Dich das Script automatisch auf Onlinestatus <b>\'Ņicht anzeigen\'</b>. Bestätigst Du diese Meldung wird dein Onlinestatus auf <b>\'sichtbar\'</b> zurück gestellt.<br>Ist Dein Onlinestatus generell auf \'Nicht anzeigen\' passiert <u>gar nichts</u>.<br>Ab sofort kannst Du deinen Rechner einfach verlassen, wirst akkustisch über neue Nachrichten informiert, bist aber nicht 24 Stunden am Stück als online sichtbar!!!<br>Jajaja.... ich weiß - geile Idee <img src="http://static.werkenntwen.de/images/emoticons/zwinkern.gif" alt=";-)" title=";-)"><br>Bitte dazu noch diesen <a href="http://www.wer-kennt-wen.de/forum/showThread/pci2bpd11hl8" target="blank">Thread</a> im Forum lesen!</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_2');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>Auf den Profilen deiner Freunde wirst du rechts einen neuen Link finden:<br><img src="'+icon_add+'"> anzeigen wenn <i>XYZ</i> online geht<br>Hat dein Freund in der Onlineliste das Weckersymbol kannst Du ihn auch darüber auf deine Buddyliste setzen. Alle Freunde, die schon auf deiner Buddyliste sind, haben in der Onlineliste wieder das normale Onlinesymbol.<br>Klicke auf den Link oder auf den Wecker und Du wirst gefragt, ob du den Namen deines Freundes so übernehmen willst. Klickst Du jetzt auf "Abbrechen" kannst Du ihm individuell einen Namen zuweisen. Sinnvoll wenn man mehrere Buddys mit dem gleichen Vornamen hat.<br>Unter <b>Buddylist</b> findest du alle Buddys zusammen, kannst einzelne oder auch alle komplett löschen. Löschen kannst du einen Buddy auch wenn Du auf seinem Profil bist. Klicke dazu einfach rechts auf den Link:<br><img src="'+icon_add+'"> nicht mehr anzeigen wenn <i>XYZ</i> online geht<br><b><font color="#ec4317">ACHTUNG!</b></font><br>Um Fehlfunktionen zu vermeiden, nutze diese Funktion, egal ob du einen Buddy hinzufügen oder löschen möchtest nur, wenn du WKW nur in einem Fenster bzw Tabulator geöffnet hast!!!</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_3');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>Wenn Du Personen in Deiner Buddylist hast kannst Du dich benachrichtigen lassen wenn sie online oder offline gehen.<br>Du kannst wahlweise ein kleines Meldungsfenster öffnen lassen, oder es wird ein Sound abgespielt wenn Du die Option aktiviert hast. Die Sounddateien kannst Du in der rechten Spalte wählen und auch anhören.<br>Zusätzlich wird auch alle 60 Sekunden Dein Posteingang auf neue Nachrichten geprüft. Ist mindestens 1 neue Nachricht vorhanden wird der von Dir gewählte Sound alle 60sek. abgespielt bis alle neuen Nachrichten gelesen sind. Auch dieses Feature läßt sich komplett deaktivieren.<br>Nein... Du kannst (zum Glück) keine Sounddateien auswählen die sich auf Deinem Rechner befinden! Das ist unter Greasemonkey nicht vorgesehen weil es ein Sicherheitsrisiko darstellt (für Dich!). Wenn Du einen bestimmten Sound haben möchtest melde Dich einfach mal in der <a href="http://www.wer-kennt-wen.de/club/eqppbhod" target="blank">Jetzt online! Gruppe</a> zu Wort.<br>Wenn kann nur ich die Sound hinzufügen.</p>';

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_4');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p><font color="#ec4317"><b>Dieses Script ist völlig fehlerfrei!</b></font><br>Der Fehler sitzt immer 60cm vom Bildschirm entfernt und nennt sich "Benutzer".<br>Ja - ich rede von Dir <img src="http://static.werkenntwen.de/images/emoticons/breites_grinsen.gif" alt="???" title="???" id="foo"><br>Wenn Du allerdings vom Gegenteil überzeugt bist, Dir eine Funktion noch fehlen sollte, Du Hilfe benötigst oder Ideen hast, komm in die <a href="http://www.wer-kennt-wen.de/club/eqppbhod" target="blank">Jetzt online! Gruppe</a>!<br>Ausserdem wirst Du da auch immer über aktuelle Updates informiert.<br>Nicht ist so alt wie Die Version von gestern!<br>P.S.<br>Ja klar..... Du darfst natürlich Deinen Freunden von diesem Script hier erzählen und sie in die Gruppe einladen <img src="http://static.werkenntwen.de/images/emoticons/zwinkern.gif" alt=";-)" title=";-)"></p>';
			document.getElementById('foo').addEventListener('click' , function(){GM_openInTab('http://www.mattworx.de/');}, false);

			var tr = table.appendChild(document.createElement("tr"));
			tr.setAttribute('id' , 'tr_5');
			tr.setAttribute('style' , 'display:none');
			var td = tr.appendChild(document.createElement("td"));
			td.setAttribute('colspan' , '5');
			td.innerHTML = '<p>Teile der Funktion "Buddy´s adden", oder die dazugehörige Benachrichtigungen sind von <a href="http://userscripts.org/users/173927" target="blank">winnerbyhabit</a>.... naja sagen wir mal.... geklaut <img src="http://static.werkenntwen.de/images/emoticons/zwinkern.gif" alt=";-)" title=";-)"><br>winnerbyhabit schreibt auch Scripte für WKW die ihr euch <a href="http://userscripts.org/users/173927/scripts" target="blank">HIER</a> ansehen könnt.</p>';

			///// Tabelle Hilfe ENDE /////

			fieldset.appendChild(document.createElement("br"));
		
			var button = fieldset.appendChild(document.createElement("input"));
			button.type = "button";
			button.value = "Speichern";
			button.addEventListener("click", speichern, false);
		
			fieldset.appendChild(document.createTextNode(" "));
		
			var button = fieldset.appendChild(document.createElement("input"));
			button.type = "button";
			button.value = "Abbrechen";
			button.addEventListener("click", abbruch, false);

			function changeTable(e)
			{
				var e=e? e : window.event;
				var el=e.target? e.target : e.srcElement;
				show_table = el.id.substring(5); 
				for ( i=1; i < 4; i++ )
				{
					if ( show_table == i ) {

						document.getElementById('table_'+i).style.display = "block";
					}else {

						document.getElementById('table_'+i).style.display = "none";
					}
				}
			}

			function changeTr(e)
			{
				var e=e? e : window.event;
				var el=e.target? e.target : e.srcElement;
				show_tr = el.id.substring(2); 
				for ( i=1; i < 6; i++ )
				{
					if ( show_tr == i ) {

						document.getElementById('tr_'+i).style.display = "block";
					}else {

						document.getElementById('tr_'+i).style.display = "none";
					}
				}
			}

			function playSound(e)
			{
				var e=e? e : window.event;
				var el=e.target? e.target : e.srcElement;
				var playSnd = document.createElement('p');	
				playSnd.innerHTML = '<embed src="'+links_a[el.id]+'" height="0" width="0">';
				document.getElementById('footer').appendChild(playSnd);
			}

			function sound_dateien(snd)
			{	
				for ( i=0; i < links_a.length; i++ )
				{
					sounds_name[i]=links_a[i].substring( links_a[i].indexOf('_') +1 , links_a[i].lastIndexOf('.') );			
					if ( snd == 1 )
					{
						if ( links_a[i].indexOf('Post')> -1 )
						{

							var label = td.appendChild(document.createElement("label"));
							var img = label.appendChild(document.createElement('img'));
							img.src = icon_snd;
							img.setAttribute('id' , ''+i+'');
							img.setAttribute('style' , 'cursor:pointer;');
							img.setAttribute('title' , 'Play '+sounds_name[i]);
							img.addEventListener('click', playSound, false);
							label.appendChild(document.createTextNode(' '));
							var input = label.appendChild(document.createElement("input"));
							input.name = 'sound_post';
							input.value = i;
							input.type = "radio";				
							input.checked = ( links_a[i] == sound_post_sel );
							label.appendChild(document.createTextNode(' '+sounds_name[i]));
						}
					}
					if ( snd == 2 )
					{
						if ( links_a[i].indexOf('Online')> -1 )
						{

							var label = td.appendChild(document.createElement("label"));
							var img = label.appendChild(document.createElement('img'));
							img.src = icon_snd;
							img.setAttribute('id' , ''+i+'');
							img.setAttribute('style' , 'cursor:pointer;');
							img.setAttribute('title' , 'Play '+sounds_name[i]);
							img.addEventListener('click', playSound, false);
							label.appendChild(document.createTextNode(' '));
							var input = label.appendChild(document.createElement("input"));
							input.name = 'sound_buddy_on';
							input.value = i;
							input.type = "radio";
							input.checked = ( links_a[i] == sound_added_on_sel );
							label.appendChild(document.createTextNode(' '+sounds_name[i]));
						}
					}
					if ( snd == 3 )
					{
						if ( links_a[i].indexOf('Offline')> -1 )
						{
							var label = td.appendChild(document.createElement("label"));
							var img = label.appendChild(document.createElement('img'));
							img.src = icon_snd;
							img.setAttribute('id' , ''+i+'');
							img.setAttribute('style' , 'cursor:pointer;');
							img.setAttribute('title' , 'Play '+sounds_name[i]);
							img.addEventListener('click', playSound, false);
							label.appendChild(document.createTextNode(' '));
							var input = label.appendChild(document.createElement("input"));
							input.name = 'sound_buddy_off';
							input.value = i;
							input.type = "radio";
							input.checked = ( links_a[i] == sound_added_off_sel );
							label.appendChild(document.createTextNode(' '+sounds_name[i]));
						}
					}
				}
			}

			}
		});
	};

	function abbruch()
	{
		if(!document.getElementById('einstellungen'))
			return;
		
		var form = document.getElementById('einstellungen');
		form.parentNode.removeChild(form);
	};
	
	function speichern()
	{
		if(!document.getElementById('einstellungen'))
			return;
		
		var i=0;
		var form = document.getElementById('einstellungen');
		
		if(form.elements[++i])
			GM_setValue(user+'_message_sound_on', form.elements[i].checked);
		if(form.elements[++i])
			GM_setValue(user+'_message_sound_off', form.elements[i].checked);
		if(form.elements[++i])
			GM_setValue(user+'_message_pop_on', form.elements[i].checked);
		if(form.elements[++i])
			GM_setValue(user+'_message_pop_off', form.elements[i].checked);
		if(form.elements[++i])
			GM_setValue(user+'_post_sound_on_off', form.elements[i].checked);

		for ( x=0; x < links_a.length; x++)
		{
			if(form.elements[++i].checked)  //  baruche ich fpr die siunddateinen checkbox
			//alert(user+'_'+form.elements[i].name+','+ links_a[form.elements[i].value]);
				GM_setValue(user+'_'+form.elements[i].name, links_a[form.elements[i].value]);
		}

		///// Ich HASSE diese Funktion!!! /////
		for (x = 0; x < codes.length;x++)
		{
			codes_del = new Array(); // frisches Array
			names_del = new Array(); // frisches Array
			///// Vor jeden Löschvorgang aktuelle Buddylist auslesen /////
			for(y = 0;;y++)
			{
				var code = GM_getValue(user+'_codes_' + y,null);
				if (code  == null)
					break;
				else
					codes_del[y] = code;			
			}	
			for(z = 0;z < codes.length;z++)
			{
				var name = GM_getValue(user+'_names_' + codes[z],null);
				if (name  == null)
					break;
				else
					names_del[z] = name;
			}
			if(form.elements[++i].checked) // Ist der Haken gesetzt? Spring rein
			{
				for(a = 0; a < codes.length; a++)
				{
					if(	form.elements[i].id == codes_del[a] )
					{	
						GM_setValue(user+'_codes_' +  a,codes_del[codes_del.length - 1])
						GM_deleteValue(user+'_' + codes_del[a]);
						GM_deleteValue(user+'_codes_' + (codes_del.length-1));
						GM_deleteValue(user+'_names_' + codes_del[a]);
					}
				}
			}
		}

			location.reload();
		abbruch();
	};

	  /////////////////////////////////////////////
////////// Einstellung & Hilfe erzeugen Ende /////
	/////////////////////////////////////////////

	  ////////////////////////////////////////
////////// Online/Offline stellen START /////
	////////////////////////////////////////

	function visible(status)
	{
		//// Onlinestatus auf sichtbar machen und Overlay killen /////
		if ( status == 1 )
		{
			if(document.getElementById('einstellungen')){
				var form = document.getElementById('einstellungen');
				form.parentNode.removeChild(form);//alert('ist da');
			}
		}
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://www.wer-kennt-wen.de/settings/privacy',
			onload: function(responseDetails)
			{
				send_form = false;
				post_data = 'sent=1&back='; 
				var hashKey = responseDetails.responseText.match(/name="_hashKey" value="([0-9]){13}"/g); // _hashKey 
				var hash = responseDetails.responseText.match(/name="_hash" value="([0-9a-z]){32}"/g); // hash
				post_data += '&_hashKey='+hashKey[0].substring(23,36); 
				post_data += '&_hash='+hash[0].substring(20,52);
				form_start = responseDetails.responseText.indexOf('Profilangaben');
				form_stop = responseDetails.responseText.indexOf('Mehr Infos zu angepasster Werbung');
				var form_text = responseDetails.responseText.substring(form_start,form_stop);
				var treffer1 = form_text.match(/value="([0-9]){1}"(\s){1,100}sel/g); //alle value="XY"
				var treffer2 = form_text.match(/name="([^"]*)/g); // Feldname
				message=GM_getValue(user+'_click_message',true);
				if ( treffer1 != null || treffer1 != null ) 
				{
					for( i=0; i < treffer2.length; i++ ) 
					{							
						var value = treffer1[i].substring(7,8);
						if ( i == 17 ) 
						{
							///// 1 bedeutet Onlinestatus wird angezeigt!!!
							///// Bei 0 mach einfach nix weil ist ja eh schon auf unsichtbar
							///// Bei 1 spring rein und setze auf 0 = unsichtbar
							///// Bei 0 und Status 1 spring rein und setze auf 1 = sichtbar
							///// Status kommt von der Overlay-Meldung	
							///// Meine Nerven :-S									
							if ( treffer1[i].substring(7,8) == 1 || status == 1 ) 
							{
								if ( status == 0 )
								{
									var value = 0;
									var sichtbar = 0;
									send_form = true;
									//alert(treffer1[i].substring(7,8)+' wird off angezeigt mach auf 0');
								}
								if ( status == 1 )
								{
									var value = 1;
									var sichtbar = 1;
									send_form = true;
									//alert(treffer1[i].substring(7,8)+' wird on angezeigt mach auf 1');
								}
							}else if (message)
								{ 	
									//alert(treffer1[i].substring(7,8)+' wird off angezeigt mach nix');
									// message==true | Es gibt schon ein Overlay in einem andern Tab/Fenster
									// Mach ein Overlay in diesem Tab/Fenster
									message_offline();
								}
						}
						post_data += '&'+treffer2[i].substr(6)+'='+value;
					}
					// Wenn nicht alle Values & Feldnamen gefunden wurden loggout
					if ( treffer1.length == 22 && treffer2.length == 22 ) 
					{
						if ( send_form ){/*alert('hab post_data')*/;send(sichtbar);}
					}else{
						window.location.href = 'http://www.wer-kennt-wen.de/logout/';
					}
				}
			}
		});
	}

	function send(sichtbar)
	{
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.wer-kennt-wen.de/settings/privacy",
			data: post_data,
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			onload: function(response) {
				if ( sichtbar == 1 )
				{
					//reload();
					//window.location.href = 'http://www.wer-kennt-wen.de/settings/privacy';
					//alert('form gesendet und reload');
				}else if ( sichtbar == 0 ) {
					message_offline();
				}
			}
		});
	}

	function message_offline()
	{
			//alert('form gesendet und nachricht ausgeben');

			///// Kill Overlay wenn vorhanden und erneuern /////
			if(document.getElementById('einstellungen')){
				var form = document.getElementById('einstellungen');
				form.parentNode.removeChild(form);//alert('ist da');
			}
			// Value setzen das Overlay existiert.
			// Andere Tab/Fenster werden danch fragen und auch ein Ovlerlay erzeugen
			GM_setValue(user+'_click_message',true);
			var form = document.body.insertBefore(document.createElement("form"), document.body.firstChild);
			form.id = "einstellungen";
			var overlay = form.appendChild(document.createElement("div"));
			overlay.id = "overlay";
			var fieldset = form.appendChild(document.createElement("fieldset"));
			var legend = fieldset.appendChild(document.createElement("legend"));
			legend.appendChild(document.createTextNode("Jetzt online!"));
			var div = fieldset.appendChild(document.createElement("div"));
			div.setAttribute('class' , 'info box');
			div.innerHTML = 'Dein letzter <i>klick</i> bei WKW war vor über 10 Minuten.<br><br>Dein Onlinestatus wurde auf <b>\'nicht sichtbar\'</b> gestellt<br>Klickst Du jetzt auf \'OK\' wird Dein Onlinestatus wieder auf <b>\'sichtbar\'</b> geändert.<br><b>Info´s zu der Funktion findest Du im Forum</b><br><br>';
			var button = div.appendChild(document.createElement("input"));
			status_neu = 1; // value="1" ist sichtbar
			button.type = "button";
			button.value = "  OK  ";
			button.addEventListener('click' , function(){visible(status_neu);}, false);
	}
	  ///////////////////////////////////////
////////// Online/Offline stellen ENDE /////
	///////////////////////////////////////


	  ///////////////////////////////////
////////// Funktionssammlung Start /////
	///////////////////////////////////

		///// Fügt Sound hinzu bei neuen Nachrichten /////
		function post(quellcode_post)
		{
			sound_post = GM_getValue(user+'_post_sound_on_off' , null);
			if ( sound_post )
			{
				if ( quellcode_post.indexOf('box email')> -1 )
				{
					var time_snd = new Date().getTime();
					now_snd = Math.round(time_snd/1000);
					now_snd -= 59; // Aktuelle Uhrzeit -600 Seknunden 
					last_snd = GM_getValue(user+'_last_snd',null);
					if ( last_snd < now_snd ){
						var time_snd = new Date().getTime();
						timestamp_snd = Math.round(time_snd/1000);
						GM_setValue(user+'_last_snd',timestamp_snd);
						var sound_post = document.createElement('p');	
						sound_post.innerHTML = '<embed src="'+sound_post_sel+'" height="0" width="0">';	
						window.setTimeout(function(){document.getElementById('footer').appendChild(sound_post);},3000);
					}
				}
			}

		}

		///// Personen aus Onlineliste heraus adden /////
		function addfromList(e)
		{
			var e=e? e : window.event;
			var el=e.target? e.target : e.srcElement;
			if (el.id.indexOf('add')>-1)
			{
				var id = el.id.substr(4,8);
				var vorname = el.id.substr(12);
				addNewPerson(id,vorname);					
			}	
		}

		/////// Läd die aktuelle Seite neu /////
		function reload(){
			window.location.reload();
		}

		///// Neuen "Jetzt online!"-Benutzer hinzufügen /////
		function new_user()
		{
			GM_setValue(benutzer_code+'_' +alle_user.length,true);
			GM_setValue('benutzer_' +alle_user.length,benutzer_code);
			GM_setValue(benutzer_code+'_install',true);
			//GM_setValue(benutzer_code+'_message',true);
			GM_setValue(benutzer_code+'_anordnung',true);
			///// Neu ab Version 2010.09.12 /////
			///// Sound setzen /////
			GM_setValue(benutzer_code + '_sound_post' , 'http://justonline.ju.funpic.de/Post_Standart.wav');
			GM_setValue(benutzer_code + '_sound_buddy_on' , 'http://justonline.ju.funpic.de/Online_Standart.wav' );
			GM_setValue(benutzer_code + '_sound_buddy_off' , 'http://justonline.ju.funpic.de/Offline_Standart.wav' );
			///// Neue Benachrichtigung setzen /////
			GM_setValue(benutzer_code+'_message_pop_on',true);
			GM_setValue(benutzer_code+'_message_pop_off',true);
			GM_setValue(benutzer_code+'_message_sound_on',true);
			GM_setValue(benutzer_code+'_message_sound_off',true);
			GM_setValue(benutzer_code+'_post_sound_on_off',true);
			GM_setValue('version' , version);
			///// Alte Benachrichtigung entfernen /////
			GM_deleteValue(benutzer_code+'_message',null);
			///// Overlay basteln /////
			var form = document.body.insertBefore(document.createElement("form"), document.body.firstChild);
			form.id = "einstellungen";
			var overlay = form.appendChild(document.createElement("div"));
			overlay.id = "overlay";
			var fieldset = form.appendChild(document.createElement("fieldset"));
			var legend = fieldset.appendChild(document.createElement("legend"));
			legend.appendChild(document.createTextNode("Jetzt online! - Neuer Benutzer"));
			var div = fieldset.appendChild(document.createElement("div"));
			div.setAttribute('class' , 'info box');
			div.innerHTML = 'Version: '+version+'<br><br>Neuen Benutzer ('+benutzer_code+') hinzugfügt.<br>Bevor Du "Jetzt online!" benutzt ließ bitte die Hilfe damit es zu keinen Problemen kommt. Die Hilfe findest sie rechts in der Onlineliste hinter dem <img src="http://static.werkenntwen.de/images/icons/help_h2.gif"> Symbol.<br><br>';
			var button = div.appendChild(document.createElement("input"));
			button.type = "button";
			button.value = "  OK  ";
			button.addEventListener("click", reload, false);
		}  

		///// Version auf www.userscripts.org abfragen /////
		function versionstest(){
			GM_xmlhttpRequest(
			{
			method: 'GET',
			url: 'http://userscripts.org/scripts/show/85339',
			onload: function(responseDetails)
			{
				version_start = responseDetails.responseText.indexOf('<title>')+25;
				version_stop = responseDetails.responseText.indexOf(' for Greasemonkey</title>');
				versions_nr = responseDetails.responseText.substring(version_start,version_stop);
				Eingabe = confirm('Jetzt online!\n\nDeine Version:\nVERSION: '+version+'\nAktuell:\n'+versions_nr+'\n\nMöchtest Du zu der Downloadseite wechseln?');
					if (Eingabe)
						window.location.href = 'http://userscripts.org/scripts/show/85339';
					}
			});
		}

		///// Personen adden, löschen, alle löschen /////
		function addNewPerson(id,name){
			if (id != null && name != null )
			{
				
				if (!confirm('Möchtest Du ' + name + ' als Spitzname übernehmen?'))
				{
					name = prompt('Welchen Spitznamen willst du statt dessen übernehmen?');
					if (name == null)
					 return;
				}
				initVars();
				GM_setValue(user+'_' + id,false);
				GM_setValue(user+'_codes_' + codes.length,id);
				GM_setValue(user+'_names_' + id,name);
				alert(name + ' (' + id + ') hinzugefügt für Benutzer '+user+'\n\nInsgesamt in der Liste: ' + (codes.length+1)+' Personen');
				reload();
			}
		}
	
		///// Person aus der Buddyliste löschen /////
		function deletePerson(id,name)
		{
			initVars();
			if (confirm('Möchtest Du ' + name + ' | '+id+' wirklich löschen?'))
			{
				for (i = 0; i < codes.length;i++)
				{
					if(	codes[i].indexOf(id) > -1)
					{	
						
						GM_setValue(user+'_codes_' +  i,codes[codes.length - 1])
						GM_deleteValue(user+'_' + id);
						GM_deleteValue(user+'_codes_' + (codes.length-1));
						GM_deleteValue(user+'_names_' + id);
						alert(name + ' gelöscht');
						break;
					}
				}
			}
			row_delete = document.getElementById('delperson_bt3e2oyi');
			row_delete.style.display == "none";alert(id);
		}
		
		///// Alle Personen auf einmal aus der Buddylist löschen /////
		function deleteAllPersons(){
			initVars();
			for ( i = 0; i < codes.length;i++)
			{
				GM_deleteValue(user+'_' + codes[i]);
				GM_deleteValue(user+'_names_' + codes[i]);
				GM_deleteValue(user+'_codes_' + i);
			}
			reload();
		}
		
	///// Sperrt 'meinen' Updatethread im Forum /////
	function grup_special()
	{
		if( document.getElementById('write') != null )
			document.getElementById('write').innerHTML = '<br><br><h3>Dieser Thread ist nur für Update Ankündigungen!<br>Wenn Du Fragen hast benutze bitte einen anderen Thread.</h3>';
	}

	///// Bei Logout alle Buddy und den aktuellen Nutzer auf offline stellen /////
	function logoutSuccess(){
		initVars();
		for(i = 0; i < codes.length; i++)
		{
			GM_setValue(user+'_'+ codes[i],false);
		}
		for(i = 0; i < alle_user.length; i++){
			GM_setValue(alle_user[i]+'_' +i,false);
		}
	}

	  //////////////////////////////////
////////// Funktionssammlung Ende /////
	//////////////////////////////////

	
	  /////////////////////////////////
////////// Seitensteuerung Start /////
	/////////////////////////////////
	function main(){
		if ( document.getElementById('flag') == null)
		{
	/*		//flag ( damit das nur einmal angewendet wird )
			var flag = document.createElement('p');
			flag.id = 'flag';
			document.body.appendChild(flag); */
			initVars();


			//Seitenauswahl
			if ( url.indexOf('logout') == -1 && url.indexOf('rights') == -1 && url.length != 28){
				justonline(); 
			}
			if (url.indexOf('person') > -1)
				personsSite();
			else if (url.indexOf('showThread/o9dwtl3xscp8') > -1)
				grup_special();
			else if( url.indexOf('logout') > -1)
				logoutSuccess();
		}	
	}

	  ////////////////////////////////
////////// Seitensteuerung Ende /////
	////////////////////////////////


	  //////////////////////////////
////////// CSS einfügen Start /////
	//////////////////////////////

var css = "" + (<r><![CDATA[

a.onlineliste
{
	font-size: .80em;
}
li.adden
{
	background:url('data:image/png;base64,R0lGODlhEAAQAIQBAGaZzP///8zMzDNmmZnM/8yZAJmZmf/MZv/MM8yZM5nMzP//zJmZzGZmZsz//8zM/8zMZmaZmZmZZv///////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAQABAAQAWA4IeM42eK5AmsQWs0QuCswFcUCaE8cSAQBEniZhoAjLTkwFQ4LA45IFCROByIK0LP0BIIaEVaaxygLT9e72DNTgtszSdESoBYiU2oQkFgMHRUC0QRAAQPHz5jQIQmKwxjDS8CMythAD09AQQrZ2wrmJxrJ2lsbV4nBqkGJ6iqHyEAOw==') 2px 8px no-repeat;
} li.adden a
{
	color:fe1303;
}

#overlay
{
	position:fixed!important;
	top:0!important;
	bottom:0!important;
	left:0!important;
	right:0!important;
	width:100%!important;
	height:100%!important;
	margin:0!important;
	padding:0!important;
	border:0px none!important;
	background:none transparent!important;
	z-index:65536!important;
}
#overlay
{
	background-color:#CCC!important;
	opacity:0.7!important;
	-moz-opacity:0.7!important;
}
#fieldset a
{
	font-size: 0.8em!important;
}
#einstellungen a
{
	font-size: 0.95em!important;
	cursor:pointer!important;
}
#einstellungen fieldset
{
	z-index:65536!important;
	background:none white!important;
	position:fixed!important;
	width:60%!important;
	height:auto!important;
	margin:0 -12.5em!important;
	top:10px!important;
	left:40%!important;
	text-align:left!important;
	padding: 5px 10px 12px !important;
	font-size: 0.95em!important;
}
#einstellungen fieldset legend
{
	background-color:white!important;
	padding:0 2px !important;
}
#einstellungen fieldset label
{
	display:block!important;
}
#einstellungen fieldset td
{
	vertical-align: top;
}
#einstellungen fieldset hr
{
	margin: 4px 4px 4px 4px!important;
}

]]></r>);

	if(GM_addStyle)
		GM_addStyle(css);
		else
		{
			var head = document.getElementsByTagName('head')[0];
			if(head)
			{
				var style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = css;
				head.appendChild(style);
			}
		}

	  /////////////////////////////
////////// CSS einfügen Ende /////
	/////////////////////////////

GM_registerMenuCommand("Jetzt online! - Einstellungen", einstellungen);
//////////////////////////////////////////
window.addEventListener('load',main,true);	
//////////////////////////////////////////


	///// Angepasst für WKW Orginal von
	///// MarshallMar http://userscripts.org/scripts/review/40217
	var imageZOOM = false;


	// this are parts of the script of MarshallMar
	// for his script look here: http://userscripts.org/scripts/review/40217
	function imageZoom(){
		var imgList = document.getElementsByTagName("img");
		for( i=0; i < imgList.length; i++) {
			var imgName = imgList[i].src;
			var s = imgName.search(/\/(medium|tiny|small)\//); 
			if( s != -1) {
				bigimage=imgName.replace(/\/(medium|tiny|small)\//, "/big/");
				newImg = document.createElement("img");

				ow=imgList[i].width;
				oh=imgList[i].height;
				imgList[i].addEventListener("mouseover",
						function(e){
							newX=cumulativeOffset(this)[0]
							newY=cumulativeOffset(this)[1]
							newImg.src=this.src.replace(/\/(medium|tiny|small)\//, "/big/");
							//newImg.style.width="140px";
							//newImg.style.height = "185px";
							newImg.style.position="absolute";
							newImg.style.zIndex='999';
							newImg.style.top=(newY-185/2).toString() + 'px';
							newImg.style.left=(newX+ow).toString() + 'px';
							document.body.appendChild(newImg);
						},false);
				imgList[i].addEventListener("mouseout",
						function(e){
							document.body.removeChild(newImg);
						},false);

			}
		}
	}
		
		function cumulativeOffset(element) {
			var valueT = 0, valueL = 0;
			do {
				valueT += element.offsetTop || 0;
				valueL += element.offsetLeft || 0;
				element = element.offsetParent;
			} while (element);
			return [valueL, valueT];
		}
