// ==UserScript==
// @name           Gamestats Lookup v 1.1
// @namespace      http://ogame.gamestats.org
// @description    Adds a button to the menu of uni 31 to search players on ogame.GameStats.org directly.
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
		var universe = 'uni';
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
	var menu = document.getElementById("menu");
    
	var div = document.createElement('div');
	div.setAttribute('align', 'center');

	var a = document.createElement('a');
	a.setAttribute('onClick', 'searchPlayer()');

/*	var img = document.createElement('img');
	img.setAttribute('src', 'img/navigation/navi_ikon_trader_a.gif');
	img.setAttribute('height', '29');
	img.setAttribute('width', '38');
	img.setAttribute('style', 'cursor:pointer');
	img.setAttribute('onmouseover', "this.src='img/navigation/navi_ikon_trader_b.gif';");
	img.setAttribute('onmouseout', "this.src='img/navigation/navi_ikon_trader_a.gif';");


	a.appendChild(img);*/
	div.appendChild(a);
    
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'playersearch');
	input.setAttribute('value', 'Gamestats Lookup');
	input.setAttribute('style', 'width: 112px; border: 0px solid #767f88; color: #dce100; /*background-color: transparent;*/ text-align: center; padding: 0px 0 0px; margin: 0px 0px; font:bold 11px/14px verdana, arial, helvetica, sans-serif; ');
	input.setAttribute('onclick', "if(this.value=='Gamestats Lookup'){this.value='';this.style.border='1px solid #767f88';this.style.color='#dce100';}");
	input.setAttribute('onblur', "if(this.value==''){this.value='Gamestats Lookup';this.style.border='0px solid #767f88';this.style.color='#dce100';}");
	input.setAttribute('onKeyDown', "if(event.keyCode==13) searchPlayer();");

	var span2 = document.createElement('div');
	span2.setAttribute('class', 'textlabel');
	

	span2.appendChild(input);

	var li = document.createElement('div');
	li.setAttribute('align', 'center');

	li.appendChild(div);
	li.appendChild(span2);

	menu.appendChild(li);

	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "" + searchPlayer + "";
	
	document.body.appendChild(script);
}

window.addEventListener('load', addButton, true);