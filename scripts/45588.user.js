// ==UserScript== 
// @name           Ogame Resource Ticker
// @namespace      Oliver
// @description    Updates resources live
// @include        http://uni*.ogame.*/game/index.php*
// @exclude        http://uni42.ogame.org/game/index.php*
// @exclude        http://uni8.ogame.org/game/index.php*
// @exclude        http://uni6.ogame.de/game/index.php*
// ==/UserScript==

var rates = new Array(0,0,0);
var page = location.search.split('?')[1].split('&')[0];

// get planet coordinates
var dropdown = document.getElementById('header_top').getElementsByTagName('select')[0];
var coords = '['+dropdown.getElementsByTagName('option')[dropdown.selectedIndex].innerHTML.split('[')[1];
var notmoon = document.getElementsByTagName('img')[0].src.split('/')[6] != "s_mond.jpg";

// when resources page is visited, set the rates cookie
if (page == 'page=resources' && notmoon)
{
	// cookie expires 1 year from now
	var expires = new Date();
	expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 365);
	var fields = document.getElementById('ressourcen').getElementsByTagName('tr');
	var i;
	for (i=0; i<fields.length; i++)
	{
		var header = fields[i].getElementsByTagName('th');
		if (header.length != 0 && header[0].innerHTML.match (':'))
			break;
	}
	fields = fields[i].getElementsByTagName('font');
	rates[0] = fields[0].innerHTML.replace(/\./g,'');
	rates[1] = fields[1].innerHTML.replace(/\./g,'');
	rates[2] = fields[2].innerHTML.replace(/\./g,'');
	document.cookie = 'rates'+coords+'='+rates[0]+':'+rates[1]+':'+rates[2]+'; expires='+expires;
}

// read the rates cookie and set rates array
var cookies = document.cookie;
if (cookies.indexOf('rates'+coords) != -1)
{
	var sp = cookies.indexOf('rates'+coords)+6+coords.length;
	var ep = cookies.indexOf(';',sp);
	if (ep == 2) ep = cookies.length;
	cookie = unescape(cookies.substring(sp,ep)).split(':');
	for (var i in cookie)
		rates[i] = parseInt(cookie[i]);
}

// get the resource text things.
var values = document.getElementById('resources').getElementsByTagName('tr')[2].getElementsByTagName('font');

// inserts dots into numbers
function addDots(n)
{
	n += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(n)) {
		n = n.replace(rgx, '$1' + '.' + '$2');
	}
	return n;
}

// increments the given field
function incrementRes(field)
{
	var value = addDots(parseInt(field.innerHTML.replace(/\./g,'')) + 1);
	field.innerHTML = value;
	return;
}

// increment the resources when necessary
for (var i=0; i<3; i++)
	if (rates[i] != 0 && notmoon)
		setInterval(incrementRes, Math.round(60.0*60/rates[i]*1000), values[i]);