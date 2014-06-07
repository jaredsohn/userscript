// ==UserScript==
// @name           formulawan_sponsor_en
// @namespace      formulawansponsoren
// @description    adds information on the sponsor's page
// @include        http://www.formulawan.com/Fenetre_Sponsor.php?action=Gestion
// @license       GPL v3
// @version       1.02
// ==/UserScript==
var inc = 4+1;
if(parseInt(document.getElementsByClassName('staffCount')[0].getElementsByTagName('strong')[0].innerHTML) == 0) inc = 3+1;
var i = 0;
var gain_mini = 0;
while(document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i]){
	var ligue = parseInt(document.getElementsByTagName('h2')[0].nextSibling.nextSibling.getElementsByTagName('li')[i].getElementsByTagName('strong')		[0].nextSibling.textContent.replace(new RegExp('in league|,| |\t|\n|\r|', 'g'),''));
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
		"\%)&nbsp;<span class=\"rarity\"><img src=\"/img_fr/icons/tiny_rarity_"+
		image_nb +".gif?version=5\" title=\""+
		parseInt(100*actuel_sponsor/max_sponsor)+"\%\" /></span>";
	elt_to_mod.innerHTML += image_code;
	elt_to_mod2.innerHTML = "<li>Sponsor maximum : <strong> <span class=\"money\" title=\""+max_sponsor+" boulon(s)\">"+
				max_sponsor+"<img src=\"/img_fr/icons/tiny_money.gif?version=5\" alt=\"Boulon(s)\"/></span></strong></li>" + 
				elt_to_mod2.innerHTML;
	i+=inc;
	gain_mini+=actuel_sponsor;

} ;//
var max_target = document.getElementById('innerContent');
var before_target = document.getElementsByTagName('h2')[0];
var div_gain_max = document.createElement("div");
div_gain_max.className = "ack";
div_gain_max.innerHTML = "Gains (min/max): from " 
		+ gain_mini 
		+ " to "
		+ gain_mini*7 
		+ "&nbsp;<img src=\"/img_fr/icons/tiny_money.gif?version=5\" alt=\"Boulon(s)\" />";
max_target.insertBefore(div_gain_max,before_target);

