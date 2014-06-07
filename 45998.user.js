// ==UserScript==
// @name           Ogame Time Until Available
// @namespace      Oliver
// @description    Adds a timer to ships, buildings and research you cannot yet afford, counting down to when you will have produced enough resources for them. 
// @include        http://*.ogame.*/game/index.php?page=*building*
// @exclude        http://uni6.ogame.de/*
// @exclude        http://uni42.ogame.org/*
// ==/UserScript==

// thanks Vess and wisc for your help!

// get the metal, crystal and deut. strings for language independence - thanks wisc!
var mstring = document.getElementById('resources').getElementsByTagName('tr')[1].getElementsByTagName('font')[0].innerHTML;
var cstring = document.getElementById('resources').getElementsByTagName('tr')[1].getElementsByTagName('font')[1].innerHTML;
var dstring = document.getElementById('resources').getElementsByTagName('tr')[1].getElementsByTagName('font')[2].innerHTML;

var strings = new Array(mstring, cstring, dstring);

// set up other vars
var page = location.search.split('?')[1].split('&')[0];
var timers = new Array();
var hascookie = false;
var dropdown = document.getElementById('header_top').getElementsByTagName('select')[0];
var notmoon = document.getElementsByTagName('img')[0].src.split('/')[6] != "s_mond.jpg";
var coords = '['+dropdown.getElementsByTagName('option')[dropdown.selectedIndex].innerHTML.split('[')[1];
var rates = new Array(0,0,0);

// for those of you with the resource ticker installed, well, the cookie's gonna get written twice until I can think of a better way.
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

// read the planet's cookie
var cookies = document.cookie;
if (cookies.indexOf('rates'+coords) != -1)
{
	var sp = cookies.indexOf('rates'+coords)+6+coords.length;
	var ep = cookies.indexOf(';',sp);
	if (ep == 2) ep = cookies.length;
	cookie = unescape(cookies.substring(sp,ep)).split(':');
	for (var i in cookie)
		rates[i] = parseInt(cookie[i]);
	hascookie = true;
}

// get the resource text things.
var values = document.getElementById('resources').getElementsByTagName('tr')[2].getElementsByTagName('font');

if (notmoon && hascookie && (page == 'page=b_building' || page == 'page=buildings'))
{
	var box = document.getElementById('content').getElementsByTagName('tr');
	var i = 1;
	if (page == "page=buildings")
		i = 2;
	for (i; i<box.length && box[i].getElementsByTagName('td').length > 2; i++)
	{
		var reqs = box[i].getElementsByTagName('td')[1].innerHTML.split("<br>")[2].split(" ");
		var time = 0;
		var resource = "";
		for (var j=1; j<reqs.length; j++)
		{
			if (reqs[j].substring(0,3) != "<b>")
				continue;
			if (reqs[j-1] == mstring+':')
				r = 0;
			else if (reqs[j-1] == cstring+':')
				r = 1;
			else if (reqs[j-1] == dstring+':')
				r = 2;
			var need = parseInt(reqs[j].replace(/\./g,'').replace(/<\/?[^>]+(>|$)/g, "")) - parseInt(values[r].innerHTML.replace(/\./g,''));
			if (need < 0)
				need = 0;
			if (1.0 * need / rates[r] > time)
			{
				time = 1.0 * need / rates[r];
				resource = strings[r];
			}
		}
		if (time > 0)
		{
			var hours = Math.floor(time);
			time = (time - hours)*60;
			var mins = Math.floor(time);
			time = (time - mins) * 60;
			var secs = Math.floor(time);
			box[i].getElementsByTagName('td')[1].innerHTML = box[i].getElementsByTagName('td')[1].innerHTML += "Resource Accumulation Time ("+resource+"): <span class=\"resourcetime\">"+hours+"h&nbsp;"+mins+"m&nbsp;"+secs+"s</span><br>";
			var spans = box[i].getElementsByTagName('td')[1].getElementsByTagName('span')
			timers[i] = spans[spans.length-1];
		}
	}
}

//decrements the time in fields by 1
function updateTime()
{
	for (i in timers)
	{
		field = timers[i];
		var current = field.innerHTML.split("&nbsp;");
		var time = parseInt(current[0]) * 3600 + parseInt(current[1]) * 60 + parseInt(current[2]) - 1;
		if (time >= 0)
		{
			var hours = Math.floor(time/3600);
			time = time - hours * 3600;
			var mins = Math.floor(time/60);
			time = time - mins * 60;
			var secs = Math.floor(time);
			field.innerHTML = hours+"h&nbsp;"+mins+"m&nbsp;"+secs+"s";
		}
	}
	return;
}

if (notmoon && hascookie)
	setInterval(updateTime, 1000);