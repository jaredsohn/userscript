// ==UserScript==
// @name           formulawan_sponsor
// @namespace      formulawansponsor
// @description    fuegt Informationen zur Sponsorenseite hinzu. Diese Version wurde aus dem Franzoesischen uebersetzt. Danke an den Ersteller des Originals.
// @include        http://www.formulawan.de/Fenetre_Sponsor.php?action=Gestion
// @license       GPL v3
// @version       1.02
// ==/UserScript==
// @translate by   Die Stuemper


var inc = 4+1;
if(parseInt(document.getElementsByClassName('staffCount')[0].getElementsByTagName('strong')[0].innerHTML) == 0) inc = 3+1;
var i = 0;
var gain_mini = 0;
while(document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i]){
	var ligue = parseInt(document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i].getElementsByTagName('strong')		[0].nextSibling.textContent.replace(new RegExp('in Liga|,| |\t|\n|\r|', 'g'),''));
	var max_sponsor = 50 + 15 * ligue;
	var actuel_sponsor = parseInt(document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i+2].getElementsByTagName('span')[0].firstChild.textContent);
	var elt_to_mod = document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i+1];
	var elt_to_mod2 = document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i].childNodes[2];
	var image_nb = 1;
	if(max_sponsor == actuel_sponsor) image_nb = 5;
	else if( (actuel_sponsor/max_sponsor) >= 0.75 ) image_nb = 4; 
	else if( (actuel_sponsor/max_sponsor) >= 0.66 ) image_nb = 3;
	else if( (actuel_sponsor/max_sponsor) >= 0.5 ) image_nb = 2;

	var image_code = "&nbsp;("+ parseInt(100*actuel_sponsor/max_sponsor) + 
		"\%)&nbsp;<span class=\"rarity\"><img src=\"/img_de/icons/tiny_rarity_"+
		image_nb +".gif?version=5\" title=\""+
		parseInt(100*actuel_sponsor/max_sponsor)+"\%\" /></span>";
	elt_to_mod.innerHTML += image_code;
	elt_to_mod2.innerHTML = "<li>maximal m\u00f6glich : <strong> <span class=\"money\" title=\""+max_sponsor+" Schrauben\">"+
				max_sponsor+"<img src=\"/img_de/icons/tiny_money.gif?version=5\" alt=\"Boulon(s)\"/></span></strong></li>" + 
				elt_to_mod2.innerHTML;
	i+=inc;
	gain_mini+=actuel_sponsor;

} ;//
var max_target = document.getElementById('innerContent');
var before_target = document.getElementsByTagName('h2')[0];
var div_gain_max = document.createElement("div");
div_gain_max.className = "ack";
div_gain_max.innerHTML = "Gewinn (min/max): von " 
		+ gain_mini 
		+ " bis "
		+ gain_mini*7 
		+ "&nbsp;<img src=\"/img_de/icons/tiny_money.gif?version=5\" alt=\"Boulon(s)\" />";
max_target.insertBefore(div_gain_max,before_target);
