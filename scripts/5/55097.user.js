// ==UserScript==
// @name           Playersearch button for ogame.GameStats.org 
// @namespace      http://ogame.gamestats.org
// @description    Adds a button to the menu of redesign to search players on ogame.GameStats.org directly.
// @include        http://*.ogame.*/game/index.php?page=*
// ==/UserScript==


/*

Usage: Just click on "Playersearch" (the new tab in your leftmenu) and type in the player's name you want to search on GameStats.
Press enter or click on the button next to the input field and new tab will be opened with the playe's details page on GameStats.org
Maybe you'll have to permit firefox to open popups from ogame pages

*/

function searchPlayer() {
	var player = document.getElementById('playersearch').value;
	if (player != 'Playersearch') {
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
		window.open('http://ogame.gamestats.org/'+country+'/'+universe+'/search/player/'+player);
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
	input.setAttribute('value', 'Playersearch');
	input.setAttribute('style', 'width: 119px; border: 0px solid #767f88; color: #767f88; background-color: transparent; text-align: center; padding: 2px 0 2px; margin: 3px 7px; font:bold 11px/14px verdana, arial, helvetica, sans-serif; ');
	input.setAttribute('onclick', "if(this.value=='Playersearch'){this.value='';this.style.border='1px solid #767f88';this.style.color='#f1f1f1';}");
	input.setAttribute('onblur', "if(this.value==''){this.value='Playersearch';this.style.border='0px solid #767f88';this.style.color='#767f88';}");
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

