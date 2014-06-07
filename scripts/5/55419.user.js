// ==UserScript==
// @name           Spielersuche für War-Riders.de 
// @namespace      http://www.war-riders.de
// @description    Fügt dem Menü von OGame v1.0 einen Buttom hinzu, um Spieler direkt bei War-Riders.de zu suchen.
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


/*

Anleitung: Nachdem das Script installiert wurde, erscheint ein neuer Button names "Spielersuche" im Hauptmenü.
Zum Suchen eines Spielers einfach auf den Button klicken, den Namen eingeben und "ENTER" drücken oder auf den Knopf links daneben klicken.
Schon öffnet sich die War-Riders Seite von diesem Spieler in einem neuen Fenster. 
Sollte sich keines öffnen, kommt möglicherweise ein Warnung, dass ein Popup blockiert wurde. Dieses müsst ihr einmalig  erlauben, um das Script einwandfrei nutzen zu können. 

*/

function searchPlayer() {
	var player = document.getElementById('playersearch').value;
	if (player != 'Spielersuche') {
		var universe = 'andromeda';
		var country = 'org';
	
		var url = document.location.href;
		var pattern = /http:\/\/(.*?)\..*?\.(.*?)\//i;
		var matches = pattern.exec(url);
		if (matches != null) {
			universe = matches[1];
			country = matches[2];
		}
	
		var player = document.getElementById('playersearch').value;
		window.open('http://www.war-riders.de/'+country+'/'+universe+'/search/player/'+player);
	}
}

function addButton() {
	var menu = document.getElementById("menuTable");
    
	var span = document.createElement('span');
	span.setAttribute('class', 'menu_icon');

	var a = document.createElement('a');
	a.setAttribute('onClick', 'searchPlayer()');

	var img = document.createElement('img');
	img.setAttribute('src', 'img/navigation/navi_ikon_trader_a.gif');
	img.setAttribute('height', '29');
	img.setAttribute('width', '38');
	img.setAttribute('style', 'cursor:pointer');
	img.setAttribute('onmouseover', "this.src='img/navigation/navi_ikon_trader_b.gif';");
	img.setAttribute('onmouseout', "this.src='img/navigation/navi_ikon_trader_a.gif';");


	a.appendChild(img);
	span.appendChild(a);
    
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'playersearch');
	input.setAttribute('value', 'Spielersuche');
	input.setAttribute('style', 'width: 119px; border: 0px solid #767f88; color: #767f88; background-color: transparent; text-align: center; padding: 2px 0 2px; margin: 3px 7px; font:bold 11px/14px verdana, arial, helvetica, sans-serif; ');
	input.setAttribute('onclick', "if(this.value=='Spielersuche'){this.value='';this.style.border='1px solid #767f88';this.style.color='#f1f1f1';}");
	input.setAttribute('onblur', "if(this.value==''){this.value='Spielersuche';this.style.border='0px solid #767f88';this.style.color='#767f88';}");
	input.setAttribute('onKeyDown', "if(event.keyCode==13) searchPlayer();");

	var span2 = document.createElement('span');
	span2.setAttribute('class', 'textlabel');

	span2.appendChild(input);

	var li = document.createElement('li');
	li.setAttribute('class', 'menubutton_table');

	li.appendChild(span);
	li.appendChild(span2);

	menu.appendChild(li);

	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "" + searchPlayer + "";
	
	document.body.appendChild(script);
}

window.addEventListener('load', addButton, true);