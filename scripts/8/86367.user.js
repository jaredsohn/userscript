// ==UserScript==
// @name           automatische Weiterleitung
// @namespace      wkw
// @include        http://www.wer-kennt-wen.de/*sucess*
// @include			http://www.wer-kennt-wen.de/start*
// @include			http://www.wer-kennt-wen.de/settings*
// ==/UserScript==

// "final" vars
var version = '2010.09.19';
var otherscripts = new Array();
var scriptURL = '86367';
//http://userscripts.org/scripts/show/ + scriptURL

var scriptname = 'automatische Weiterleitung';

var user = document.body.innerHTML.substring(document.body.innerHTML.indexOf('willkommen') + 11, document.body.innerHTML.indexOf('!',document.body.innerHTML.indexOf('willkommen')));
var url= document.URL;
var i = 0;

// mainfunction
	
	// needs mainscript!!!
	
	function main(){
		//fügt die Buttons des Arrays Buttons der navigationsleiste hinzu
		i = 0;
		if(url.indexOf('start') > -1){
			if(url.indexOf('update') > -1)
			{
				window.location.href = '/start';
				update();
			}
			addText('h6','el1',scriptname);
			addText('p','el1',' \n Version: '+ version);
			
		// löscht element wenn das script installiert ist	
			document.getElementById('el2').removeChild(document.getElementById('div' + scriptURL));	
		}
		else if(url.indexOf('success') > -1)
		{
			window.location.href = 'http://www.wer-kennt-wen.de/start';
		}
		else if(url.indexOf('settings/privacy/JSscripts') > -1){
			// keine Einstellungsmöglichkeiten
			
		}
	}
	
// Buttons hinzufügen und löschen	
		function addNewButton(){
			var neuerButtonLink = prompt('Gib den Link für den neuen Button ein');
			var neuerButtonName = prompt('Gib bitte den Namen des neuen Buttons ein');
			if( neuerButtonLink != null && neuerButtonName != null)
			{
				var newButton = '<a href="' + neuerButtonLink + '">' + neuerButtonName + '</a>';
				GM_setValue(user + 'wkw_buttons_' + i,newButton);
			}
			window.location.reload();
		}
	
		function deleteButton(){
			var ButtonNummer = prompt('Welchen Button willst du löschen?');
			
			ButtonNummer--;
			for(; ButtonNummer < i -1;ButtonNummer++)
			{
			//	alert(Buttons[ButtonNummer+1]);
				GM_setValue(user + 'wkw_buttons_' + ButtonNummer,GM_getValue('wkw_buttons_' + ButtonNummer+1));
				
			}
			GM_deleteValue(user + 'wkw_buttons_' + (i - 1));
			window.location.reload();
		}

		
//	Typen: p,h1,h2,h3,h4,h5,h6
	function addText(Typ,PlaceID,Text)
	{
		if(document.getElementById(PlaceID) != null)
		{
			var newText = document.createElement(Typ);
			var spanElement = document.createElement('span');
			
			spanElement.innerHTML = Text;
			newText.appendChild(spanElement);
			
			document.getElementById(PlaceID).appendChild(newText);
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
						alert(scriptname + ': \nDein Script ist auf dem neuesten stand :)');
					}
			}
		});	
	}

// läd das sript sobald wkw fertig eladen hat
window.addEventListener('load',function(){main();},true);