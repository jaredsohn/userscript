// ==UserScript==
// @name				GM FA-filter
// @author				Patricier
// @description			Filter voor de dorpen die je al aanvalt
// @include				http://nl*.tribalwars.nl/game.php?*screen=am_farm*
// ==/UserScript==

/////SETUP////////////
var order = "asc";// Oplopend (asc) of Aflopend (desc) sorteren
/////////////////////


function filter(){
	if(!document.URL.match(/screen=am_farm&order=distance&dir=/))
		{ 
			location.href='game.php?&screen=am_farm&order=distance&dir=' + order;
		}
			var div = document.getElementById('am_widget_Farm');
			var td = div.getElementsByTagName('td');td[0].innerHTML += '<br>Dorpen waarop al een aanval loopt worden gefilterd.';
			for (var i = 1; i< td.length; i++)
				{
				if (td[i].innerHTML.indexOf('<img src="http://cdn2.tribalwars.net/graphic/command/attack.png?1') != -1)
					{td[i].parentNode.style.display = 'none';}
				}
}
filter();