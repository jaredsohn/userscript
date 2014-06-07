// Copyright 2006 Dragan Bosnjak. All Rights Reserved.

// ==UserScript==
// @name          Guild Wars Wiki Extension
// @namespace     http://cm.eamped.com/
// @description   Extend GW Wiki and Official Guild Wars Wiki with few additional links on each page
// @include       http://gw.gamewikis.org/wiki/*
// @include       http://wiki.guildwars.com/wiki/*

// ==/UserScript==
//   v1.0

const ICO_WIKI = "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAAD///////////////////////////+nusa5yNH///////////////////////////////////////////////////+rvsiXqrW1wcmltr/////////////////////////////////////////z9vf7+vkCLEWPqrupvcoAIDrm6Or8/f7///////////////////////////9td4QAAAkAGTEeQFVVhJ5qla0bO04CGzEAAAlga3j///////////////////9qbnZggpCIo6+Aho0XQV6qx9TA3OgTOlRzfIWjw85phpR2fIP////////////89vRqqsjR8voBFywHHzAWNUiSuMqXvM0RMEUJHjAADiPY/P9cj6fs6ej///////+mtb8xYnwIJDgnSmIXKDoCChdgnLlzrsoAAAIUJzkcPVQKIzg1YnyQoa3///////94jZouSlwULUALITQWDQs1RExSdYZOc4c8UFkSCAQWNEoVLD8yTWBugIz///////9Lc4gCGjATKz07borp+v1KfJUwWnEwWnFKgJvi9vk8bIYTLD4CGzA/Z37///////+gwdEYJTMTLD4wY399qr5NhaJEcotDcIlAeJZwoLUwY38SKz0xR1aYt8f////////p7vAWO1UKIDR2prx6mahTiKI3YXsuV29nnbeIprVcka4MIDMYOVDd4+b///////////+DtcgAABJ/priVrrhelbJGdY8+aYCq2+14mKJLfZgAAhWHrb3//////////////////v6jtbkNIjJtnrI+XGs/b4o4ZYBLbXtDdY0fN0R+lp3////////////////////////39/eBq74vU2gVPlhclbBbkqwSM0xceIitydT6+Pj////////////////////////////////L1t2QqLVNgZtynrKSqbWtusT//v7///////////////////////////////////////////+suMDCydD///////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const ICO_GWGW = "data:application/octet-stream;base64,R0lGODlhEAAQAJEAAP///wAAAMq5WQAAACH5BAAAAAAALAAAAAAQABAAAAIjhI+py+0Pk5jChHNPTbejjXiZsU0W4Gkqyo6kibHRTNf2UgAAOw==";
const ICO_GURU = "data:image/icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD7+/sBuL3DU4OGio3U1NUx////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDr6+sXSmaJxDJObdfj4+QZ////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD29vYJQFN2zwwtZ/fV1dYq////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AiZGhhAlBoP1ve5GX////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8fHxDkJ3tPAmdcT9ycnJOP///wD///8A////AP///wD///8A////APHx8Q+4vcJQn6q3a6CqtWXBwsM/9/f3BrG0uF5zwPH9NHCh8vj4+AP///8A////AP///wD///8A+Pj4Bpituodjo8n1a8f6/V258v1SkrzyRH6p6TRtnepNeZnXPqv0/Uh4odD///8A////AP///wD///8A+vr7A3qZqrV41vf9gNr9/WmrzPOpsLZn9vb2Bvz8/ACjrbZpU6zZ/VvJ+f1gjafA////AP///wD///8A////AKqwtG2j4PH91/f+/a3O2fy9v8NL////AP///wD///8A////AHyertK17fz9hp6pvf///wD///8A////AP///wCBnavSvO7+/bfv/v2HmqOx////AP///wD///8A////AP///wB8n6/gruP6/YSaq7n///8A////AP///wD///8AOn2u+F7H+v1nyPH9qauuXf///wD///8A////AP///wCprLNtdJqy+IHO9f1njaiz////AP///wD///8A////ADxuq9sVc9r9GXbA/c/P0TX///8A////AP///wD///8A////AOrp6hWQorSCbIKarv///wD///8A////AP///wCcprp0L3zj/Q1Mpf3FxchB////AP///wD///8A////AP///wB/hJSf5OTmHPz8/AD///8A////AP///wD///8A+vr6A3GJr68bWaf9Z3SLo/z8/AD///8A////AP///wDz8/UPLUV67ltlea319fUH////AP///wD///8A////AP///wD4+PkDlqO4gzdYiPZcbomztri7T9vc3SjMztE/WGuHwg82ff0oXaP9ipOijv///wD///8A////AP///wD///8A////AP///wDo6OoZpLTIfmSItMkwUofuN2mk9maOtt6XuM+qyM7TTfz8/AD///8A////AP///wD///8A//AAAP/hAAD/wwAA/8cAAP+HAADgBwAAgA8AAAEPAAAHjwAAD48AAA8PAAAPjwAAD58AAA8PAACADwAA4B8AAA=="
const ICO_INCG = "data:image/icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAAASCwAAEgsAAAAAAAAAAAAAZGRkZGRkW1tbTk5OU1NTYGBgZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkYGBgQEBAGRkZGRkZGRkZGRkZUFBQTExMGRkZGRkZNzc3QEBAGRkZGRkZREREZGRkSEhIGRkZGRkZEkZWFi42GRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZXl5eGRkZFi42A6rhAMD/AMD/Cn2jGRkZGRkZB5PBAMD/FDhEGRkZArXwAMD/GRkZT09PGRkZCn2jAMD/AMD/AMD/AMD/DmaDGRkZArXwAMD/EVFmFyMnAMD/AMD/FDhEPj4+GRkZAMD/A6rhFyMnDmaDAMD/DmaDGRkZAMD/AMD/DmaDEkZWAMD/AMD/EkZWLy8vFDhEAMD/DHOVFi42Cn2jAMD/DmaDFDhEAMD/AMD/CIiyDmaDAMD/AMD/DmaDHx8fEkZWAMD/DmaDEkZWAMD/AMD/DmaDEkZWAMD/AMD/BaDTDHOVAMD/AMD/DmaDGRkZEkZWAMD/DmaDFDhEB5PBB5PBD1t0DmaDAMD/BaDTAMD/B5PBBaDTAMD/B5PBGRkZFi42AMD/CIiyGRkZFyMnFyMnGRkZDmaDAMD/Cn2jAMD/ArXwCn2jAMD/B5PBGRkZJycnArXwAMD/EVFmCn2jAMD/D1t0B5PBAMD/EVFmAMD/AMD/DmaDBaDTAMD/GRkZVVVVDmaDAMD/AMD/AMD/AMD/Fi42BaDTAMD/GRkZAMD/AMD/EkZWB5PBAMD/FyMnZGRkUlJSD3aYAMD/ArXwFW2KPj4+CZbDE3qcPz8/D4KoCJTCMEhQHGiBCZXDNFhkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkAAA=";
const ICO_DELICIOUS = "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP8AAADd3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="

try
{
	var h = getTitleElement();
	var pageTitle = h.innerHTML;
	h.innerHTML = pageTitle+" ";
  h.appendChild( getStandardLinks(pageTitle, unsafeWindow.document.title) );
}
catch(error)
{
  // ignore;
}

function getTitleElement()
{
	var c = unsafeWindow.document.getElementById("content").childNodes;
	var t = null;
	for (var i = 0; i < c.length; i++)
	{
		if(c[i].tagName=="H1") return c[i];
	}
	return null;
}

function getStandardLinks(title, fullTitle)
{
	var url = unsafeWindow.location.href;

  var span = unsafeWindow.document.createElement('span');
  span.className = "extLinks";
  span.addIcon = function(text, image, url)
  {
  	this.appendChild(getIconFor(text, image, url));
  	this.innerHTML += " ";
  }

  if(url.match("http://gw.gamewikis.org/wiki/"))
  {
  	span.addIcon("Official Wiki", ICO_WIKI, "http://wiki.guildwars.com/wiki/"+url.substring(29));
  }
  else if(url.match("http://wiki.guildwars.com/wiki/"))
  {
  	span.addIcon("GuildWiki", ICO_GWGW, "http://gw.gamewikis.org/wiki/"+url.substring(31));
  }

	span.addIcon("Search for \""+title+"\" on GW Guru forum", ICO_GURU, "http://www.guildwarsguru.com/forum/search.php?do=process&showposts=0&quicksearch=1&s=&query="+encodeURIComponent(title));
	span.addIcon("Search for \""+title+"\" on IncGamers forum", ICO_INCG, "http://guildwars.incgamers.com/forums/search.php?do=process&showposts=0&quicksearch=1&s=&query="+encodeURIComponent(title));
	span.addIcon("Bookmark \""+title+"\" on del.icio.us", ICO_DELICIOUS, "http://del.icio.us/post?url="+encodeURIComponent(unsafeWindow.location)+"&title="+encodeURIComponent(fullTitle));

	return span;

}

function getIconFor(text, image, url)
{

	var a = unsafeWindow.document.createElement('a');
	a.href = url;
	a.title = text;

  var img = unsafeWindow.document.createElement('img');
  img.src = image;
  img.title = text;
  img.alt = text;

  a.appendChild(img);
  return a;

}
