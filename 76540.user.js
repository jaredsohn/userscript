// ==UserScript==
// @name           Pardus SFC-Style Skill Exporter
// @namespace      marnick.leau@skynet.be
// @description    Exports your current skills to a string with a similar format to the FSC's strings.
// @include        http*://*.pardus.at/overview_stats.php*
// ==/UserScript==

unsafeWindow.calculate = function(count) {
	var skills = new Array;
	for (i = 6;i < 11;i++) {
		skills.push(document.getElementsByTagName('form')[1].getElementsByTagName('tr')[i].getElementsByTagName('td')[count].innerHTML);
	}

	var types = ("tac:,HA:,man:,weap:,eng:").split(',');
	var skillList = "FSC4pilot";
	for (var i = 0;i < types.length;i++) {
		skillList += "|" + types[i] + skills[i];
	}
	prompt("Just press ctrl+C!",skillList);
}

document.getElementsByTagName('form')[1].getElementsByTagName('tr')[11].getElementsByTagName('td')[1].innerHTML += "<input type=\"button\" value=\"Export\" onClick=\"calculate(1)\">";
document.getElementsByTagName('form')[1].getElementsByTagName('tr')[11].getElementsByTagName('td')[2].innerHTML += "<input type=\"button\" value=\"Export\" onClick=\"calculate(2)\">";