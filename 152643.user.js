// ==UserScript==
// @name        Ikariam's Access Key
// @namespace   ikariamscript.webege.com
// @description You can use keyboard shortcuts to access certain features of Ikariam more quickly.
// @include     http://s*.*.ikariam.com/*
// @version     0.5
// @downloadURL https://userscripts.org/scripts/source/152643.user.js
// @updateURL   https://userscripts.org/scripts/source/152643.meta.js
// ==/UserScript==
/*
Access key	Command
(space) List ShortCut
0-9/a-g	Open location
h	Overview of finances
q	Overview of towns
w	Military overview
r	Research overview
t	Overview of messages and diplomacy
p	Inspect the selected town
o	Switch to the island map of the selected town
i	Centre the selected town on the World Map
*/

var accessKey = {
	'gold'      : 'h',
	'cities'    : 'q',
	'military'  : 'w',
	'research'  : 'r',
	'diplomacy' : 't',
	'city'      : 'p',
	'island'    : 'o',
	'worldMap'  : 'i'
};

for(var i = 0; i <= 16; i++) {
  var h = i.toString(17);
  $('#js_CityPosition'+i+'Link').attr('accesskey', h);
}

$('#js_GlobalMenu_gold').attr('accesskey', accessKey.gold);
$('#js_GlobalMenu_cities').attr('accesskey', accessKey.cities);
$('#js_GlobalMenu_military').attr('accesskey', accessKey.military);
$('#js_GlobalMenu_research').attr('accesskey', accessKey.research);
$('#js_GlobalMenu_diplomacy').attr('accesskey', accessKey.diplomacy);

$('#js_cityLink > a').attr('accesskey', accessKey.city);
$('#js_islandLink > a').attr('accesskey', accessKey.island);
$('#js_worldMapLink > a').attr('accesskey', accessKey.worldMap);

$(document).ready(function() {
	var title = '';
	var table = '<table class="table01 dotted center">';
	table += '<tr><th>ShortCut</th><th>Link</th></tr>';
	var count = 0, alt, titleTmp;
	$('a[accesskey]').each(function() {
		alt = (count % 2) ? '' : 'alt';
		titleTmp = $(this).attr('title') || $(this).parent().attr('title');
		titleTmp = titleTmp.replace(/\(\d+\)/, '');
		table += '<tr class="' + alt + '"><td style="font-weight: bold;">' + $(this).attr('accesskey').toUpperCase() + '</td><td><a style="display: block;" href="' + $(this).attr('href') + '" onclick="ajaxHandlerCall(this.href); return false;">' + titleTmp + '</a></td></tr>' + "\n";
		title += $(this).attr('accesskey').toUpperCase() + ': ' + titleTmp + "\n";
		count++;
	});
	table += '</table>';
	$('#GF_toolbar ul:first').append('<li title="' + title + '"><a id="shortcut" href="#" accesskey=" ">ShortCut</a></li>');
	$('#shortcut').click(function() {
		window.ajax.Responder.changeView(["options","<div id=\"mainview\"><div class=\"buildingDescription\"><h1>Ikariam's Access Key<\/h1><\/div><div class=\"contentBox01h\"><h3 class=\"header\">ShortCut<\/h3><div class=\"content\">" + table + "<\/div><div class=\"footer\"><\/div><\/div><\/div>"]);
		return false;
	});
});