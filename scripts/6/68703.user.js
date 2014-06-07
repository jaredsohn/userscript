// ==UserScript==
// @name           Net Fighters Game Bot 1
// @namespace      NFBot1
// @description    Net Fighters game generic (for any character) bot with random behavior
// @include        http://netfighters.org/server.php*
// ==/UserScript==
//	Put any character into any arena and open http://netfighters.org/server.php to start
var responses = document.body.innerHTML.split('\r\n');
var techs, chars, current, selected, defend;
var baseaddr = "http://netfighters.org/server.php?send0=usable_techs&send1=inarena&send2=currentturn&send3=selectedchar&send4=msgread";
var wait = 10000;

for (var i in responses) {
	document.title = window.status = responses[i];
	if (responses[i].match("help ") || responses[i].match("Not your turn")) break;
	if (responses[i].match("Not enough time")) location.href = baseaddr+"&send9=endturn";
	//if (responses[i].match("Character not in any arena")) location.href = baseaddr+"&send9=arenajoinbest";
	techs = chars = current = selected = defend = false;
	if (x = responses[i].match(/usable_techs (.+)/)) techs = x[1].split(';');
	if (x = responses[i].match(/inarena (.+)/)) chars = x[1].split(';');
	if (x = responses[i].match(/currentturn (.+)/)) current = x[1];
	if (x = responses[i].match(/selectedchar (.+)/)) selected = x[1];
	if (x = responses[i].match(/defend (.+)/)) defend = x[1].split(';');
	canact = (selected == current) || defend;
	if (!current && chars.length > 2) location.href = baseaddr+"&send9=start";
	if (current) wait = 10000;
	else wait = 50000;
	if (techs && chars && current && canact) {
		randtech = Math.floor(Math.random()*techs.length);
		do {
			randchar = Math.floor(Math.random()*(chars.length-1))+1;
		} while ((chars[randchar] == selected) && (current == selected))
		location.href = baseaddr+"&send9=tech "+techs[randtech]+" "+chars[randchar];
	}
	else if (chars && current && canact) {
		location.href = baseaddr+"&send9=endturn";	
	}
}
setTimeout("location.href='"+baseaddr+"'",wait);
