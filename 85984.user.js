// ==UserScript==
// @name           mainscript
// @namespace      wkw
// @include        http://www.wer-kennt-wen.de*
// ==/UserScript==

// "final" vars
var version = '2010.09.19';
var scriptname = 'wkw-script-Baukastenhauptmodul';
var scriptURL = '85984';
//http://userscripts.org/scripts/show/ + scriptURL

var otherscripts = new Array();
//						name			  id
	otherscripts[0] = ['addButtons',	'85991'];
	otherscripts[1] = ['changeColors',	'86023'];
	otherscripts[2] = ['FotoZoom',		'86080'];
//	otherscripts[3] = ['WKW Jetzt online! VERSION:', '85339'];
var url= document.URL;


// mainfunction
	function main(){
		if(document.getElementById('flag' + scriptname) == null){
			// werbung entfernen
			if(document.getElementById('topad') != null)
				document.getElementById('topad').innerHTML = '';
			if (document.getElementById('ads') != null)
				document.getElementById('ads').innerHTML = '';
				
			// damit das script nicht 2 mal geladen wird
			var flag = document.createElement('p');
			flag.id = 'flag' + scriptname;
			document.body.appendChild(flag);

			if(url.indexOf('start') > -1){
				if(url.indexOf('update') > -1)
				{
					window.location.href = '/start';
					update();
				}
				if(document.getElementById('sidebar').getElementsByTagName('div').length > 0)
				{
					document.getElementById('sidebar').innerHTML = '';
				//für: installierte scripts	
					el1 = document.createElement('div');
					el1.id = 'el1';
					document.getElementById('sidebar').appendChild(el1);
				//für: verfügbare scripts
					el2 = document.createElement('div');
					el2.id = 'el2';
					document.getElementById('sidebar').appendChild(el2);
					
				// installierte scripts	
					addText('h2','el1','Installierte Scripte:');
					addButton('el1','Update','alle scripts updaten','/start/update');
					document.getElementById('Update').addEventListener('click',function() {window.location.href = url+'/update';},true);
					
					addText('p','el1','');
					addButton('el1','Einstellungen','Einstellungen','/settings/privacy/JSscript');
					document.getElementById('Einstellungen').addEventListener('click',function() {window.location.href ='/settings/privacy/JSscripts';},true);

				//verfügbare scripts	
					addText('h2','el2','verfügbare scripte');
					for (i = 0; i < otherscripts.length;i++){
						var Div = document.createElement('div');
							Div.id = 'div' + otherscripts[i][1];
							document.getElementById('el2').appendChild(Div);
						addText('h6','div' + otherscripts[i][1],otherscripts[i][0]);
						addButton('div' + otherscripts[i][1],'install' + otherscripts[i][1],'installieren');
						document.getElementById('install' + otherscripts[i][1]).addEventListener('click',function(){window.location.href = 'http://userscripts.org/scripts/source/' + this.id.substring(7) + '.user.js';},true);
						addText('p','div' + otherscripts[i][1],'');
					}
				}
				addText('h6','el1',scriptname);
				addText('p','el1',' \n Version: '+ version);
				
			}
			else if (url.indexOf('settings') > -1){
				
				var JSsettings = document.createElement('li');
				JSsettings.innerHTML = '<a href="settings/privacy/JSscripts">Scripteinstellungen</a>';
				
				addGlobalStyle('.UI-tabs ul li a {padding:6px 15px 4px 3px !important;}');
				if(url.indexOf('JSscripts') > -1)
				{
					document.getElementById('settingsUI').innerHTML = '';
					
					var Einstellungen = document.createElement('div');
					Einstellungen.id = 'JSEinstellungen';
					Einstellungen.innerHTML = '<h1<u> Javascripteinstellungen</u></h1>';
					document.getElementById('settingsUI').appendChild(Einstellungen);
					
					//Hilfe
					var Hilfe = document.createElement('div');
					Hilfe.id = 'JSHilfe';
					Hilfe.innerHTML = '<h1><u> Hilfe </u></h1>';
					document.getElementById('settingsUI').appendChild(Hilfe);
					
					//HilfeElemente Hinzufügen
						addText('h1','JSHilfe','mainscript');
						addHilfe('andere Javascripts hinzufügen','Man kann ander Javascripts hinzufügen indem man auf der <a href="start">Startseite</a> in der rechten Seite auf den Button unter dem Javascript klickt.');
						addHilfe('Javascripts updaten','du kannst alle Javascripts gleichzeitig nach updates suchen lassen, indem du entweder auf der <a href="start">Startseite</a> auf alle scripts updaten klickst oder indem du in die Adresszeile <a href="start/update">www.wer-kennt-wen.de/start/update</a> eingibst.');
				}
				document.getElementById('rahmen').getElementsByTagName('div')[0].getElementsByTagName('ul')[0].appendChild(JSsettings);
			}
		}
		
	}
//andere Funktionen	

//erzeugt einen neuen Button !!fügt keine Funktion hinzu!!
	function addButton(PlaceID,ButtonID,ButtonText,href){
		if(document.getElementById(PlaceID) != null)
		{
			var newButton = document.createElement('input');
			newButton.id = ButtonID;
			newButton.class = 'formbutton';
			newButton.type = 'Button';
			newButton.value = ButtonText;
			

			newButton.href = href;
			document.getElementById(PlaceID).appendChild(newButton);
		}
	}
	
	function addGlobalStyle(css) {
				var head, style;
				head = document.getElementsByTagName('head')[0];
				if (!head) { return; }
				style = document.createElement('style');
				style.type = 'text/css';
				style.innerHTML = css;
				head.appendChild(style);
	}
	
	function addHilfe(heading,text)
	{
		addText('h2','JSHilfe',heading);
		addText('p' ,'JSHilfe',text);
	}
	
/*	function addFunction(id){
		window.location.href = id;
	}*/
	
//	Typen: p,h1,h2,h3,h4,h5,h6
	function addText(Typ,PlaceID,Text){
		if(document.getElementById(PlaceID) != null)
		{
			var newText = document.createElement(Typ);
			var spanElement = document.createElement('span');
			
			spanElement.innerHTML = Text;
			newText.appendChild(spanElement);
			
			document.getElementById(PlaceID).appendChild(newText);
		}
	}
	
	function öffneHilfe() {
		document.getElementById('openHilfe').value = 'Hilfe schließen ';
		table2 = document.getElementById('Hilfetext');
		if (table2.style.display == "none") {
		 table2.style.display = "";
		}else {
			table2.style.display = "none";
		}
	}
	
	function update(){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/' + scriptURL,
			onload: function(responseDetails) {
				if (responseDetails.responseText.substring(responseDetails.responseText.indexOf(scriptname) + scriptname.length,responseDetails.responseText.indexOf(scriptname) + scriptname.length + 11).indexOf(version) == -1)
				{
				//	alert(responseDetails.responseText.substring(responseDetails.responseText.indexOf(scriptname) + scriptname.length,responseDetails.responseText.indexOf(scriptname) + scriptname.length+11).trim());
					if(confirm('Es ist eine neue Version verfügbar. \n Installieren?'))
					{
						//GM_openInTab('http://userscripts.org/scripts/source/' + scriptURL+ '.user.js');
						window.location.href = 'http://userscripts.org/scripts/source/' + scriptURL+ '.user.js';
					}
				}
				else
					{
						alert(scriptname + ': \n Dein Script ist auf dem neuesten stand :)');
					}
			}
		});	
	}

// läd das sript sobald wkw fertig eladen hat
window.addEventListener('load',function(){main();},true);