// ==UserScript==
// @name           War-Riders Search for RD Ogame
// @namespace      http://www.userscripts.org
// @author         Cabble
// @version        1
// @description    Ergaenzt das ingame Menue um eine War-Riders Suche.
// @include        http://uni???.ogame.*/game/index.php?page=*
// ==/UserScript==

function SearchString2() {
    var curuni = document.URL.substring(10, 13); //gets the number of the current universe to use it for the war-riders page
	var searchwr = document.getElementById('wrsearch').value;
	if (searchwr != 'War-Riders') {

		var searchwr = document.getElementById('wrsearch').value;
		window.open('http://www.war-riders.de/?lang=de&uni=' + curuni + '&page=search&post=1&type=player&name='+searchwr);
	}
}

function addButton() {
	var menu = document.getElementById("menuTable");

	var span = document.createElement('span');
	span.setAttribute('class', 'menu_icon');

	var a = document.createElement('a');
	a.setAttribute('onClick', 'SearchString2()');

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
	input.setAttribute('id', 'wrsearch');
	input.setAttribute('value', 'War-Riders');
	input.setAttribute('style', 'width: 119px; border: 0px solid #767f88; color: #767f88; background-color: transparent; text-align: center; padding: 2px 0 2px; margin: 3px 7px; font:bold 11px/14px verdana, arial, helvetica, sans-serif; ');
	input.setAttribute('onclick', "this.value='';this.style.border='1px solid #767f88';this.style.color='#f1f1f1'");
	input.setAttribute('onblur', "if(this.value==''){this.value='War-Riders';this.style.border='0px solid #767f88';this.style.color='#767f88';}");
	input.setAttribute('onKeyDown', "if(event.keyCode==13) SearchString2();");

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
	script.innerHTML = "" + SearchString2 + "";

	document.body.appendChild(script);
}

window.addEventListener('load', addButton, true);