// ==UserScript==
// @name Imagemap on infobar
// @description Puts a link to a topic's imagemap on the infobar
// @namespace pendevin
// @include http://boards.endoftheinter.net/showmessages.php*
// @include https://boards.endoftheinter.net/showmessages.php*
// @include http://images.endoftheinter.net/imagemap.php*
// @include https://images.endoftheinter.net/imagemap.php*
// ==/UserScript==

function getUrlVars(urlz)
{
	var vars = [], hash;
	var hashes = urlz.slice(urlz.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
		if (hash[1]!=null && hash[1].indexOf("#")>=0)
		{
			vars[hash[0]]=hash[1].slice(0,hash[1].indexOf("#"));
		}
	}
	return vars;
}

var divs=document.getElementsByClassName("infobar")[0];
var get=getUrlVars(window.location.href);
var page=location.pathname;

if (page=="/imagemap.php"&&get["topic"]!=undefined)
{
	var as2=divs.getElementsByTagName("a");
	for (var j=0; j<as2.length; j++)
	{
		if (as2[j].href.indexOf("imagemap.php?")>0)
		{
			as2[j].href=as2[j].href+"&board="+get["board"];
		}
	}
	divs.innerHTML=divs.innerHTML+" | <a href='/showmessages.php?board="+get["board"]+"&topic="+get["topic"]+"' title='Back to Topic'>Back to Topic</a>";
}
else if (page=="/showmessages.php")
{
	divs.innerHTML=divs.innerHTML+" | <a href='/imagemap.php?board="+get["board"]+"&topic="+get["topic"]+"' title='Imagemap'>Imagemap</a>";
}