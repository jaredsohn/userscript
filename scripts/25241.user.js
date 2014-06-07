// ==UserScript==
// @name	NeoSpiderer 1.1
// @namespace 	EvilChaos.com
// @description	Randomly visits pages on neopets.com, and alerts when there's a random event.
// @include 	http://*.neopets.com/*
// @exclude	http://images.neopets.com/*
// ==/UserScript==

//Settings in seconds. Change them to spider at a lower/higher speed.
var minTime = 4;
var maxTime = 9;
var PERIOD = (maxTime * 1000 - minTime * 1000) * Math.random() + minTime * 1000;

// Functions
var excludes = [
	/\.wav$/,
	/logout\.phtml$/,
	/process_neofriend_requests.phtml/,
	/^javascript:/,
];

function filterLinks(links_array)
{
	var return_array = [];
	for (var i = 0; i < links_array.length; i++)
	{
		val = true;
		for (var x = 0; x < excludes.length; x++)
		{
			if (!links_array[i].href.match(/^http:\/\/\w+\.neopets\.com/))
			{
				val = false;
				break;
			}
			if (links_array[i].href.match(excludes[x]))
			{
				val = false;
				break;
			}
		}
		if (val) return_array.push(links_array[i]);
	}
	return return_array;
}

function getLink()
{
	var links = filterLinks(document.links);
	var rnd = Math.floor(Math.random() * (links.length - 1));
	return links[rnd].toString();
}

// Spider Part

if (document.body.innerHTML.indexOf("NEW BATTLEDOME CHALLENGER")>-1) {alert("You have a new challenger!");}		//battledome
else if (document.body.innerHTML.indexOf("as an avatar on the NeoBoards")>-1) {alert("You have a new avatar!");}	//avatar
else if (document.body.innerHTML.indexOf("You have a new quest")>-1) {alert("You have a new quest!");}			//quest
else if (document.body.innerHTML.indexOf("Random Event!!!")>-1) {alert("Something has happened!");}				//tyrannian/winter RE
else if (document.body.innerHTML.indexOf("Something has happened!")>-1) {alert("Something has happened!");}		//other
else {
	setTimeout('window.location.href = "' + getLink() + '";', PERIOD);
}