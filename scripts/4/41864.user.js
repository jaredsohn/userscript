// ==UserScript==
// @match	   http://www.urbandead.com/map.cgi*
// @match          http://urbandead.com/map.cgi*
// @include        http://*urbandead.com/map.cgi*
// @name           UDInventory
// @namespace      http://userscripts.org/users/72447
// @description    Groups items together in your inventory
// ==/UserScript==

var a = 0;
var matches = 0;
var newform = 0;

// pistols
matches = document.body.innerHTML.match(/"pistol" class="m".*?>\([0-9]+\)/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-b" method="post">';
	newform += '<input type="submit" value="';
	newform += (matches.length > 1 ? matches.length + ' ' : '') + 'pistol';
	newform += (matches.length > 1 ? 's' : '') + '" class="m">&nbsp;<b>';
	for(a = 0; a < matches.length; a++) {
		newform += matches[a].match(/\([0-9]+\)/);
	}
	newform += '</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-b".*?<\/form>/, newform).replace(
		/<form action="map\.cgi\?use-b".*?<\/form>/g, '');
}

// shotguns
matches = document.body.innerHTML.match(/"shotgun" class="m".*?>\([0-9]+\)/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-s" method="post">';
	newform += '<input type="submit" value="';
	newform += (matches.length > 1 ? matches.length + ' ' : '') + 'shotgun';
	newform += (matches.length > 1 ? 's' : '') + '" class="m">&nbsp;<b>';
	for(a = 0; a < matches.length; a++) {
		newform += matches[a].match(/\([0-9]+\)/);
	}
	newform += '</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-s".*?<\/form>/, newform).replace(
		/<form action="map\.cgi\?use-s".*?<\/form>/g, '');
}

// first-aid kits
matches = document.body.innerHTML.match(/"first-aid kit" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-h" method="post">';
	newform += '<input type="submit" value="first-aid kit" class="m">&nbsp;<b>(';
	newform += matches.length + ')</b>&nbsp;on&nbsp;';
	var fakHtml = document.body.innerHTML.match(
		/<select name="target"><option value="">self.*?<\/form>/);
	if(fakHtml == null) fakHtml = 'self</form>';
	newform += fakHtml;
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-h" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-h" method="post" class="a">.*?<\/form>/g,
		'');
}

// revivification syringes
matches = document.body.innerHTML.match(/"revivification syringe" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-z" method="post">';
	newform += '<input type="submit" value="revivification syringe" class="m">&nbsp;';
	newform += '<b>(' + matches.length + ')</b>';
	newform += document.body.innerHTML.match(
		/"revivification syringe" class="m".*?>(.*?)&nbsp;\(10AP\)<\/form>/)[1];

	if(document.body.innerHTML.match(/<span class="apw">/) !== null) {
		newform += '&nbsp;<span style="color:DarkRed;font-weight:bold;">(10AP)</span>';
	} else {
		newform += '&nbsp;(10AP)';
	}

	newform += '</form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-z" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-z" method="post" class="a">.*?<\/form>/g,
		'');
}

// pistol clips
matches = document.body.innerHTML.match(/"pistol clip" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-k" method="post">';
	newform += '<input type="submit" value="pistol clip" class="m">&nbsp;';
	newform += '<b>(' + matches.length + ')</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-k" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-k" method="post" class="a">.*?<\/form>/g,
		'');
}

// shotgun shells
matches = document.body.innerHTML.match(/"shotgun shell" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-r" method="post">';
	newform += '<input type="submit" value="shotgun shell" class="m">&nbsp;';
	newform += '<b>(' + matches.length + ')</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-r" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-r" method="post" class="a">.*?<\/form>/g,
		'');
}

// spray cans
matches = document.body.innerHTML.match(/"spray can" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-x" method="post">';
	newform += '<input type="submit" value="spray can" class="m">&nbsp;';
	newform += '<b>(' + matches.length + ')</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-x" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-x" method="post" class="a">.*?<\/form>/g,
		'');
}

// fuel cans
matches = document.body.innerHTML.match(/"fuel can" class="m".*?>/g);
if(matches !== null && matches.length > 1)
{
	newform = '<form class="a" action="map.cgi?use-i" method="post">';
	newform += '<input type="submit" value="fuel can" class="m">&nbsp;';
	newform += '<b>(' + matches.length + ')</b></form>';
	document.body.innerHTML = document.body.innerHTML.replace(
		/<form action="map\.cgi\?use-i" method="post" class="a">.*?<\/form>/,
		newform).replace(
		/<form action="map\.cgi\?use-i" method="post" class="a">.*?<\/form>/g,
		'');
}

// mall search compactor
newform = '<form name="srch" id="srch" class="a" action="map.cgi?search'
	+ (/search.$/.exec(window.location.href)
		? window.location.href[window.location.href.length - 1]
		: 'a')
	+ '" method="post">';
newform += '<input type="submit" value="Search" class="m"><select id="storelist"> ';
newform += '<option value="a" onclick="document.srch.action=\'map.cgi?searcha\'"'
	+ (/searcha$/.exec(window.location.href) ? ' selected="selected"' : '')
	+ '>the Gun store</option>';
newform += '<option value="b" onclick="document.srch.action=\'map.cgi?searchb\'"'
	+ (/searchb$/.exec(window.location.href) ? ' selected="selected"' : '') 
	+ '>the Tech store</option>';
newform += '<option value="c" onclick="document.srch.action=\'map.cgi?searchc\'"'
	+ (/searchc$/.exec(window.location.href) ? ' selected="selected"' : '') 
	+ '>the Hardware store</option>';
newform += '<option value="d" onclick="document.srch.action=\'map.cgi?searchd\'"'
	 + (/searchd$/.exec(window.location.href) ? ' selected="selected"' : '') 
	 + '>the Sports store</option>';
newform += '<option value="e" onclick="document.srch.action=\'map.cgi?searche\'"'
	+ (/searche$/.exec(window.location.href) ? ' selected="selected"' : '') 
	+ '>the Liquor store</option>';
newform += '<option value="f" onclick="document.srch.action=\'map.cgi?searchf\'"'
	+ (/searchf$/.exec(window.location.href) ? ' selected="selected"' : '') 
	+ '>the Bookstore</option>';
newform += '<option value="g" onclick="document.srch.action=\'map.cgi?searchg\'"'
	+ (/searchg$/.exec(window.location.href) ? ' selected="selected"' : '') 
	+ '>the Drugstore</option>';
newform += '</select></form>';
document.body.innerHTML = document.body.innerHTML.replace(
	/<form action="map\.cgi\?searcha".*?<\/form>/i, newform);
document.body.innerHTML = document.body.innerHTML.replace(
	/<form action="map\.cgi\?search[b-g]".*?<\/form>/ig, '');