// ==UserScript==
// @name           AlleTurniere S+T
// @namespace      http://www.bminton.de/gmonkey/alleturniere
// @include        http://www.alleturniere.de/sport/draw.aspx?id=*
// @include        http://www.alleturniere.de/sport/drawmatches.aspx?id=*
// @include        http://www.alleturniere.de/sport/matches.aspx?id=*
// @include        http://www.alleturniere.de/sport/teammatches.aspx?id=*
// @include        http://www.alleturniere.de/sport/playerstats.aspx?id=*
// @include        http://www.turnier.de/sport/draw.aspx?id=*
// @include        http://www.turnier.de/sport/drawmatches.aspx?id=*
// @include        http://www.turnier.de/sport/matches.aspx?id=*
// @include        http://www.turnier.de/sport/teammatches.aspx?id=*
// @include        http://www.turnier.de/sport/playerstats.aspx?id=*
// @version      1.1.0
// ==/UserScript==

/* @include        http://www.(turnier|alleturniere).de/sport/(draw|drawmatches|matches|teammatches|playerstats).aspx?id=*/

// compatibility for other browsers
	var is_chrome = /chrome/.test( navigator.userAgent.toLowerCase() ); 	// chrome GM_setValue and load-eventlistener is bugged
	check_compatibility();

// data for update mechanism 
 var THISSCRIPTVERSION = "1.1.0";
 var THISSCRIPTNAME = "AlleTurnier S+T";
 var THISSCRIPTINSTALL_URL = 'http://userscripts.org/scripts/show/70388';
 var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/source/70388.user.js';
 
 
/* 
	html add
*/ 
	// settings image link on page ?
	if(!document.getElementById('showsettingslink')) {
		var objSettingsImg = document.createElement('img');
		objSettingsImg.src = 'data:image/gif;base64,R0lGODlhZAANANUAAGZmZnm14itbkdXV1YyMjHl5eePk4ry8vFSOw5mZmRJot+Hu88zMzLW1tampqWZmZvb29t7e3kx3p16r4LvGyu7u7oKCgkVrmf///8/Y4u7s6Vyw68XFxeby9jNmmRdrvFJ8rP769PXy7ubm5sPAvGat3w9pvt7v9////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUUACgALAAAAABkAA0AAAb/QJRwOIRAiMikcslsOp9QZISB1GgG0ax2y3UyIsPRaHAsHgjoQ3nJabjfDSyy4kAnONuBGyqPkuQRBgZichYAh4cERHp9BIiPDXOPh5FZDYdOBwWKWgdYEYEjDEcDhwkDhgAGQ5eVKG2XAAVufUKxDQyIQxVuHGUVAwZ6FcByA2RtFUIGhha1UAcMGgxuyigVh7OjQ8IJAKerQ4lsiXFEHJPKlwWHepgoh6kAyo66WhgMDBQhSOiQQvUQcRIybomDSVQgmIJQoMABFLESUIlFEAABhQAcvGI3694AEgg2LEgCgYMDdgDw1OFIQKM4i00qHPB2CFg7JLHKUIQHIJIjnU4/tQgbQUKCggkjhfjDk6snK6dICiahqewggGM3DVjbCfEdJRRBwcKMMtRXiAsfJnQQgi0Roj6tkkjtJxDREVNNE3QF8JQvzwJNXToq8GzJCA4ROIwQIsLDhxJrX03C82QuEqvZwhl4dHFv34qILJRpetVJhQiHwQzRIMBEgEXHujCBcCwcbGuVewKbE/vJgC9JDIDIILt48a/FgwAAOw==';
		var objSettingsLE = document.createElement("li");
		objSettingsLE.setAttribute('id','showsettingslink');
		var objSettingsLink = document.createElement("a");
		if(document.getElementById('tournamentsubmenu')) 
			document.getElementById('tournamentsubmenu').childNodes[1].appendChild(objSettingsLE).appendChild(objSettingsLink).appendChild(objSettingsImg); 
		else if(document.getElementById('organizationmenu'))
			document.getElementById('organizationmenu').childNodes[5].appendChild(objSettingsLE).appendChild(objSettingsLink).appendChild(objSettingsImg); 
	}		
		
	// content box
		var objContentbox = document.createElement("div");
		objContentbox.setAttribute('id','contentbox');
		objContentbox.setAttribute('style', 'overflow: auto; width:540px; height:300px; display:none; background-color:#FCF7EF; border:2px solid #FF9900; position:absolute; z-Index:101; opacity: 0.92; -moz-border-radius: 10px; border-radius: 10px; -webkit-border-radius: 10px; box-shadow: 10px 10px 10px grey;');
                
		var objBody = document.getElementsByTagName("body").item(0);		
		objBody.appendChild(objContentbox);

	// span with the loaded data
		var objSpan = document.createElement("span");
		objSpan.setAttribute('id','contentbox_span');
		objSpan.innerHTML = 'empty';
		objContentbox.appendChild(objSpan);
		
	// settings box
		var objSettingsbox = document.createElement("div");
		objSettingsbox.setAttribute('id','settings');
		objSettingsbox.setAttribute('style', 'padding: 0 15px; width:420px; height:450px; display:none; line-height:200%; font-size:120%; background-color:#FCF7EF; border:2px solid #FF9900; position:absolute; z-Index:10002; opacity: 0.92; -moz-border-radius: 10px; border-radius: 10px; -webkit-border-radius: 10px; box-shadow: 10px 10px 30px grey;');
        objSettingsbox.innerHTML = 
            '<div style="text-align: right; height: 22px; margin: 4px 4px -4px 0;"><a style="color: #FF9900; font-size:12px;" href="" onclick="' + "document.getElementById('settings').style.display='none'; return false;" + '">Schlie&szlig;en <b>X</b></a></div>'
			+'<h3 style="text-align:center; margin: 5px 0 20px 0; color:#FF9900; font-weight:bold; font-size:1.2em;">Einstellungen (Bminton-Script)</h3>'
        +'Team hervorheben: <input type="text" name="myteam" value="'+ GM_getValue('myteam', '') +'" size="20"><br>'
			+' -> Farbe: <select name="trcolor" size="1">'
			+'<option value="">Keine</option>'
			+'<option value="#FCF7EF" '+ (GM_getValue('trcolor')=='#FCF7EF' ? 'SELECTED' : '') +'>Beige</option>'
			+'<option value="#FFFFCF" '+ (GM_getValue('trcolor')=='#FFFFCF' ? 'SELECTED' : '') +'>Gelb</option>'
			+'<option value="#CFEEFF" '+ (GM_getValue('trcolor')=='#CFEEFF' ? 'SELECTED' : '') +'>Blau</option>'
			+'<option value="#CFFFCF" '+ (GM_getValue('trcolor')=='#CFFFCF' ? 'SELECTED' : '') +'>Gr&uuml;n</option>'
			+'<option value="#FFCFCF" '+ (GM_getValue('trcolor')=='#FFCFCF' ? 'SELECTED' : '') +'>Rot</option>'
			+'<option value="#EEEEEE" '+ (GM_getValue('trcolor')=='#EEEEEE' ? 'SELECTED' : '') +'>Grau</option>'		
			+'</select><br><br />'
			+'<input type="checkbox" name="showgames" '+ (GM_getValue('showgames') ? 'checked' : '') +' value="1"> Spiele anzeigen '
			+' - <select name="show_lastgames" size="1">'
			+'<option value="1000">keine ausblenden</option>'
			+'<option value="20" '+ (GM_getValue('show_lastgames')=='20' ? 'SELECTED' : '') +'>20 alte + zukünftige</option>'
			+'<option value="16" '+ (GM_getValue('show_lastgames')=='16' ? 'SELECTED' : '') +'>16 alte + zukünftige</option>'
			+'<option value="12" '+ (GM_getValue('show_lastgames')=='12' ? 'SELECTED' : '') +'>12 alte + zukünftige</option>'
			+'<option value="10" '+ (GM_getValue('show_lastgames')=='10' ? 'SELECTED' : '') +'>10 alte + zukünftige</option>'
			+'<option value="8" '+ (GM_getValue('show_lastgames')=='8' ? 'SELECTED' : '') +'>8 alte + zukünftige</option>'
			+'<option value="6" '+ (GM_getValue('show_lastgames')=='6' ? 'SELECTED' : '') +'>6 alte + zukünftige</option>'
			+'<option value="4" '+ (GM_getValue('show_lastgames')=='4' ? 'SELECTED' : '') +'>4 alte + zukünftige</option>'
			+'<option value="3" '+ (GM_getValue('show_lastgames')=='3' ? 'SELECTED' : '') +'>3 alte + zukünftige</option>'
			+'<option value="2" '+ (GM_getValue('show_lastgames')=='2' ? 'SELECTED' : '') +'>2 alte + zukünftige</option>'
			+'<option value="1" '+ (GM_getValue('show_lastgames')=='1' ? 'SELECTED' : '') +'>1 altes + zukünftige</option>'
			+'<option value="0" '+ (GM_getValue('show_lastgames')=='0' ? 'SELECTED' : '') +'>nur zukünftige</option>'		
			+'</select><br />'
			+'<input id="popupmatch" type="checkbox" name="popupmatch" '+ (GM_getValue('popupmatch') ? 'checked' : '') +' '+ /*(!GM_getValue('showgames') ? 'disabled="true"' : '') + */ ' value="1"> Infobox statt neue Seite &ouml;ffnen<br>'
			+'<input id="scrolldown" type="checkbox" name="scrolldown" '+ (GM_getValue('scrolldown') ? 'checked' : '')  +' '+ /* (!GM_getValue('showgames') ? 'disabled="true"' : '') +*/ ' value="1"> Automatisch etwas runterscrollen<br>'
			+'<br />'
			+'<input type="checkbox" name="showsettingslink" '+ (GM_getValue('showsettingslink',true) ? 'checked' : '') +' value="1"> Einstellungslink auf Seite anzeigen <span id="space4objSettingsImg"></span><br>' 
			+'<div style="margin: 0 20px; line-height:150%; font-size:80%;">Alternativ erreichen sie die Einstellungen unter <br /> Extras > Greasemonkey > Benutzerscript-Befehle <br /> oder durch dr&uuml;cken der <b>Strg</b>-Taste.'
			+'<br /><br /><hr /><i>Script: ' + THISSCRIPTNAME + ' Version <b>' + THISSCRIPTVERSION + '</b> by Timo T</i> - <a href="" id="update">auf Update prüfen</a>'
			+'</div>';		
		objBody.appendChild(objSettingsbox);

		if(document.getElementById('space4objSettingsImg') && document.getElementById('space4objSettingsImg').childNodes.length==0)
			document.getElementById('space4objSettingsImg').appendChild(objSettingsImg.cloneNode(false));
		
	// add div box for team matches
		var objTeammatchesbox = document.createElement("span");
		objTeammatchesbox.setAttribute('id','teammatches');
		//document.getElementById('content').appendChild(objTeammatchesbox);	

 
/*
   key handeling for later edit of teamname
*/
 window.addEventListener('keydown', function(e) {

	if(e.keyCode == 17 ) {   // ctrl
		show_settings();
	} else if(e.keyCode == e.DOM_VK_ESCAPE) {      // ESC hides contentbox
		document.getElementById('contentbox').style.display = 'none';
		document.getElementById('settings').style.display   = 'none';
	} //else alert(e.keyCode);

 }, true);

/*
   Greasemonkey menu entry
*/
 if(typeof(GM_registerMenuCommand)!=='undefined') {
	GM_registerMenuCommand( "Einstellungen ändern", function(e) {
		show_settings();                      
	}, "e", "alt", "e" );
 }	

/* 
  if loaded execute settings
*/
	window.addEventListener('load', function() {
		onload_action();
	}, false);
	
	if(is_chrome) onload_action();
	

 function onload_action() 
 {
	// show poule ?
		/*if(GM_getValue('hidepoule', false))
			if(document.getElementById('poule')) 
				document.getElementById('poule').style.display = 'none';*/	
		
		if(!GM_getValue('showsettingslink', true)) 
			document.getElementById('showsettingslink').style.display = 'none';	
		
	// show games ?
		if(GM_getValue('showgames', false)) 
			showgames(GM_getValue('showgames'));
			
	// firststart
		if(GM_getValue('firststart', true)) {
			show_settings();
			GM_setValue('firststart', false);
		}	
		
	//  mark team ?
		if(GM_getValue('myteam', false) && GM_getValue('myteam') !== null)
			markteam(GM_getValue('myteam'));
    
    // scroll down ?
		if(GM_getValue('scrolldown', false))
			window.scrollTo(0,366);	
 }			

/*
  click on teammatch displays box instead of opening new page
*/
 var click_behavier = function(e) {
 
	if(e.button=='0' && e.target.nodeName=='A' && e.target.getAttribute('href')) {
		var tmppage = e.target.getAttribute('href').slice(0,e.target.getAttribute('href').indexOf('?')).replace(/.\//,'');
		if(tmppage=='teammatch.aspx' || tmppage=='location.aspx' || tmppage=='player.aspx' || tmppage=='courts.aspx') {
			if(GM_getValue('popupmatch', false)) {
				e.stopPropagation();
				e.preventDefault();
				
				// xml get text and strip from
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://www.alleturniere.de/sport/' + e.target.getAttribute('href'), 
					headers: {
						'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
						'Accept': 'text/xml',
					},
					onload: function(responseDetails) {
						if(responseDetails.statusText=='OK') {

							// show contextbox
							var objContentbox = document.getElementById('contentbox');
							objContentbox.style.display = '';
                            
							objContentbox.style.top    = (window.pageYOffset<90) ? '90px' : (self.pageYOffset+20) + 'px'; 
							objContentbox.style.left   = (self.pageXOffset-580+window.innerWidth) + 'px'; 
                             
							var tmpdata = responseDetails.responseText;	 
						
							var tmpform = tmpdata.slice( tmpdata.indexOf('<form '), tmpdata.indexOf('<div') );	  	  
							tmpdata = '<div id="content">' + tmpdata.slice( tmpdata.indexOf('<div id="pagebuttons">'), tmpdata.lastIndexOf('<div class="leaderboard banner">') );
                            
                            // Info nach unten
                            if(tmppage=='teammatch.aspx') {
                                var tmpdata2 = tmpdata.slice( 0, tmpdata.indexOf('<table>')) + '<br />' + tmpdata.slice(tmpdata.indexOf('</table>')) + '<br /><table><caption>Informationen</caption>' + tmpdata.slice(tmpdata.indexOf('<table>')+7, tmpdata.indexOf('</table>'));
                           		tmpdata = tmpdata2;
                            }    

							tmpdata = tmpdata.replace(/<a id="aPrintButton" class="button_print" title="Drucken" href="javascript\:window\.print\(\)">Drucken<\/a>/,'<a style="float: right; color:#FF9900;" href="" onclick="' + "document.getElementById('contentbox').style.display='none'; return false;" + '">Schlie&szlig;en <b>X</b></a>');
							document.getElementById('contentbox_span').innerHTML = tmpform + tmpdata + '</form>';

							objContentbox.style.height = (document.getElementById('contentbox').scrollHeight) + 'px';

						} else
							document.getElementById('contentbox_span').innerHTML = '<div style="text-align: right; height: 22px; margin: 4px 4px -4px 0;"><a style="color: black;" href="" onclick="' + "document.getElementById('contentbox').style.display='none'; return false;" + '">Schlie&szlig;en</a></div> <p>error: pleace try again (' + responseDetails.statusText + ')</p>';
						}
					}
				);
			}	
		}	
	} else if(e.button=='0' && e.target.nodeName=='IMG' && e.target.parentNode.parentNode.id=='showsettingslink') {
		show_settings();
	} else if(e.button=='0' && e.target.nodeName=='A' && e.target.id=='update') { 
		e.stopPropagation();
		e.preventDefault();
		check4update();
	}
 }
	
 document.addEventListener('click', click_behavier, true);	
 
 
/*
  event listener for change of settings (input and select fields)
*/ 
 var change_behavier = function(e) {
	if( (e.target.nodeName=='INPUT' || e.target.nodeName=='SELECT') && e.target.parentNode.id == 'settings')
		change_settings(e.target);	
 };
 
 document.addEventListener('change', change_behavier, true);

 
/*
  settings box
*/
 function show_settings()
 { 
	var objSettingsbox = document.getElementById('settings');
    objSettingsbox.style.display = '';
	
	objSettingsbox.style.top    = (self.pageYOffset + 100) + 'px'; //(self.pageYOffset + (window.innerHeight/2) - 300) + 'px';
    objSettingsbox.style.left   = (self.pageXOffset + 150) + 'px'; //((window.innerWidth>1160) ? 600 : (self.pageXOffset + (window.innerWidth/2) - 260)) + 'px';
 }
 
 
 function change_settings(obj) 
 {	
	if(obj.name=='hidepoule') { 
		if(obj.checked) { 
			GM_setValue('hidepoule', true);
			if(document.getElementById('poule')) document.getElementById('poule').style.display = 'none';
		} else { 		
			GM_setValue('hidepoule', false);
			if(document.getElementById('poule')) document.getElementById('poule').style.display = '';
		}
	} else if(obj.name=='showsettingslink') { 
		if(obj.checked) { 
			GM_setValue('showsettingslink', true);
			document.getElementById('showsettingslink').style.display = '';
		} else { 		
			GM_setValue('showsettingslink', false);
			document.getElementById('showsettingslink').style.display = 'none';
		}	
	} else if(obj.name=='show_lastgames') { 
			GM_setValue('show_lastgames', obj.value);
			if(window.location.href.search(/draw\.aspx/)!= -1)
				hide_old_games();		
	} else if(obj.name=='popupmatch') { 
		if(obj.checked) { 
			GM_setValue('popupmatch', true);
		} else { 		
			GM_setValue('popupmatch', false);
			document.getElementById('contentbox').style.display = 'none';
		}
	} else if(obj.name=='trcolor') { 
		GM_setValue('trcolor', obj.value);
		markteam(GM_getValue('myteam'));
	} else if(obj.name=='myteam') { 
		GM_setValue('myteam', obj.value);
		markteam(GM_getValue('myteam'));
	} else if(obj.name=='showgames') { 
		if(obj.checked) { 
			GM_setValue('showgames', true);
			document.getElementById('popupmatch').disabled = false;
			document.getElementById('scrolldown').disabled = false;
			if(document.getElementById('teammatches').innerHTML.length<100) 
				showgames(true);
			else 
				document.getElementById('teammatches').style.display = ''; 
		} else { 		
			GM_setValue('showgames', false);
			document.getElementById('teammatches').style.display = 'none';
			document.getElementById('contentbox').style.display = 'none';
			document.getElementById('popupmatch').disabled = true;
			document.getElementById('scrolldown').disabled = true;
		}	
	} else if(obj.name=='scrolldown') { 
		if(obj.checked) { 
			GM_setValue('scrolldown', true);
		} else { 		
			GM_setValue('scrolldown', false);
		}
	} 
 }
 
 
/*
  cycle through all links and mark club 
*/
 function markteam(myteam)
 {
	// first clear all
	var arr = document.getElementsByTagName("td");
	for(var i = 0; i < arr.length; i++) 
		arr[i].style.backgroundColor = '';
 
	var arr = document.getElementsByTagName("a");

	for(var i = 0; i < arr.length; i++) {
		if(arr[i].getAttribute('href') && (arr[i].getAttribute('href').slice(0,20)=='/sport/team.aspx?id=' || arr[i].getAttribute('href').slice(0,18)=='teammatch.aspx?id=' || arr[i].getAttribute('href').slice(0,24)=='teamplayerstats.aspx?id=') && arr[i].childNodes[0].nodeName=='#text')
		{	
			if(arr[i].parentNode.nodeName=='TD')
				var thistd = arr[i].parentNode;
			else if(arr[i].parentNode.parentNode.nodeName=='TD')
				var thistd = arr[i].parentNode.parentNode;
			else if(arr[i].parentNode.parentNode.parentNode.nodeName=='TD')
				var thistd = arr[i].parentNode.parentNode.parentNode;
				
			if(typeof(myteam)!=='undefined' && arr[i].childNodes[0].data.slice(0,myteam.length)==myteam)
				thistd.style.backgroundColor = GM_getValue('trcolor', '#FCF7EF');
		}			
	}
 }
 
 
/*
  show games - xml request
*/ 
 function showgames(style)
 {
	if(window.location.href.search(/draw\.aspx/)!= -1) {
        if(GM_getValue('show_lastgames', 1000)>10) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: window.location.href.replace("draw.aspx", "drawmatches.aspx"),
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'text/xml',
				},
				onload: function(responseDetails) {
					if(responseDetails.statusText=='OK') {
					
						var tmpdata = responseDetails.responseText;
				
						tmpdata = tmpdata.slice( tmpdata.indexOf('<table class="ruler matches">'), tmpdata.lastIndexOf('</table>') );
                    	$(".matches").attr("id","teammatches");
						document.getElementById('teammatches').innerHTML = tmpdata;
					
						// mark team ?
						if(GM_getValue('myteam', false) && GM_getValue('myteam') !== null)
							markteam(GM_getValue('myteam'));
					
						/*/ scroll down ?
						if(GM_getValue('scrolldown', false))
						window.scrollTo(0,92);	*/
                    
                   	 hide_old_games();
					} else
						document.getElementById('teammatches').innerHTML = '<p align="center" style="color:red;">error loading team matches: pleace reload (' + responseDetails.statusText + ')</p>';
				}
			});
        } else {
            hide_old_games();
        }
	}
 }
 
 
/*
	hide old games?
*/	
 function hide_old_games() 
 {  
	var show_lastgames = GM_getValue('show_lastgames', 1000);
	var arr = document.getElementsByTagName("tr");
		
	for(var i = arr.length-1; i >=0 ; i--) {   
		if( (arr[i].childNodes.length==18 && arr[i].childNodes[0].nodeName=='#text') || (arr[i].childNodes.length==16 && arr[i].childNodes[0].nodeName=='TD') ) 
			if( (arr[i].childNodes[0].nodeName=='#text' && arr[i].childNodes[9].nodeName=='TD' && arr[i].childNodes[9].childNodes.length>0) || (arr[i].childNodes[0].nodeName=='TD' && arr[i].childNodes[8].nodeName=='TD' && arr[i].childNodes[8].childNodes.length>0) )
				if(show_lastgames>0) {
					show_lastgames--;
					arr[i].style.display = '';
				} else
					arr[i].style.display = 'none';	
	}
 }	
 
 
/*
	check for update 
*/	
 function check4update() 
 { 
	GM_xmlhttpRequest({method: 'GET', url: THISSCRIPTINSTALL_URL, onload: function(responseDetails) {

			if (responseDetails.status == 200) {
				var content = responseDetails.responseText;
				// script version
				var scriptversion = content.split("<b>Version:</b>")[1];
				scriptversion = scriptversion.split("<br")[0].substr(1, 5);
				
				// update info
				var update_info = content.split('<li><b>Version ' + THISSCRIPTVERSION + '</b>')[0];
				update_info = update_info.substr(update_info.lastIndexOf("<br />")+6).replace(/<ul>/g,'').replace(/<li><b>/g,'\n\n').replace(/<li>/g,'\n - ').replace(/<\/ul>/g,'').replace(/<\/li>/g,'').replace(/<b>/g,'').replace(/<\/b>/g,'');
				if(update_info.length>100) update_info = '\n\nFehler Konnte Info nicht lesen (ist ihre Version ' + THISSCRIPTVERSION + ' vielleicht neuer als oben genannte?)';
	
				// new version ?
				if (scriptversion != THISSCRIPTVERSION) {
					var alerttext = "Die aktuelle Version des Skriptes '" + THISSCRIPTNAME + "' ist:\n\n" + scriptversion + "\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nInformationen über die neue Version:" + update_info + "\n\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschließend durchgeführt werden."
					alert(alerttext);
					
					// load page
					window.location.href = THISSCRIPTSOURCE_URL;
				} else alert('Kein Update verfügbar. Ihre Version ist aktuell.');
			} else alert('Keine oder fehlerhafte Antwort vom Updateserver. Versuchen Sie es später noch einmal oder besuchen direkt: \n\n' + THISSCRIPTINSTALL_URL);

		}
	});
 }
 
 
/*
	Other Browsers like Opera doesn't have unsafeWindow, GM_getValue, GM_setValue and GM_xmlhttpRequest. We provide workarounds for that case.
*/
 function check_compatibility() 
 {  
	if(typeof(unsafeWindow)=='undefined')
		unsafeWindow = window;
    if(typeof(GM_getValue)=='undefined' || is_chrome) {
		GM_getValue = function ( cookieName, oDefault ) {
			var cookieJar = document.cookie.split( "; " );
			for( var x = 0; x < cookieJar.length; x++ ) {
				var oneCookie = cookieJar[x].split( "=" );
				if( oneCookie[0] == escape( cookieName ) ) {	
					try {
						var footm = unescape( oneCookie[1] );
						if(footm=='false') footm = false;
					} catch(e) { return oDefault; }
					return footm;
				}
			}
			return oDefault;
		};
	}

	if(typeof(GM_setValue)=='undefined' || is_chrome) {
		GM_setValue = function ( cookieName, cookieValue, lifeTime ) { 
			if( !cookieName ) { return; }
			if( lifeTime == "delete" ) { lifeTime = -10; } else { lifeTime = 31536000; }
			document.cookie = escape( cookieName ) + "=" + escape( cookieValue ) + ";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
		}
	}
	
	if(typeof(GM_xmlhttpRequest)=='undefined') { 	// not cross-domain - not needed anyway
		/* GM_xmlhttpRequest implementation adapted from the Turnabout GM compatibility library: http://www.reifysoft.com/turnabout.php Used under the following license: Copyright (c) 2005, Reify Software, Inc. All rights reserved. Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 1) Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 2) Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 3) Neither the name of the Reify Software, Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
		GM_xmlhttpRequest = function (details) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				var responseState = {
					responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
					responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
					readyState:xmlhttp.readyState,
					responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
					status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
					statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
				}
				if (details["onreadystatechange"]) {
					details["onreadystatechange"](responseState);
				}
				if (xmlhttp.readyState==4) {
					if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
						details["onload"](responseState);
					}
					if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
						details["onerror"](responseState);
					}
				}
			}
			try { //cannot do cross domain
				xmlhttp.open(details.method, details.url);
			} catch(e) {
				if( details["onerror"] ) { //simulate a real error
					details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
				}
				return;
			}
			if (details.headers) {
				for (var prop in details.headers) {
					xmlhttp.setRequestHeader(prop, details.headers[prop]);
				}
			}
			xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
		}
	}
 }