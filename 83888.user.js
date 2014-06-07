// ==UserScript==
// @name           Google - Megaupload Searcher
// @namespace      URI <http://taguri.org/>
// @description    Search in megaupload by searching for "megaupload:" and than type your quary.
// @include        http://www.google.*
// ==/UserScript==

function getURLVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?')+1).split('&');
	
	for(var i = 0;i< hashes.length;i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	
	return vars;
}

var getVars = getURLVars();
var quary = getVars['q'];

if(quary.indexOf('megaupload%3A') == 0)
{
	if(!confirm("The search will start in few seconds,\nplease wait it can take a long time...\nDo you want to continue?"))
	{
		return false;
	}
	
	var thisElement;
	var allElements = document.getElementsByTagName('*');
	for (var i = 0; i < allElements.length; i++)
	{
		thisElement = allElements[i];
		thisElement.innerHTML = "";
	}
	
	search(quary.replace('megaupload%3A', ''));
}

function search(q)
{
	var URL = "http://4megaupload.com/index.php?q=" + q + "&filetype=0";
	window.location.href = URL;
}
