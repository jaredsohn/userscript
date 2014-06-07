// ==UserScript==
// @name			Pardus Universe Switcher (com. w/ druggie) SmallFix1
// @namespace		Taki
// @description		Allows you to quickly switch between Orion, Artemis and Pegasus, AND doesn't fuck up with the Pardus Druggy Script! :D...
// @include			http*://*.pardus.at/msgframe.php
// ==/UserScript==

// use this at best as temporary solution until Raz does a more awesome version of this.


var links = document.getElementsByTagName('img');
for (var i = 0; i < links.length; ++i)
{
	var linkNode = links[i];
	if(linkNode.title.match('Orion'))
	{
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Pegasus");
			hp.appendChild(document.createTextNode(' P'));
			linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Artemis");
			hp.appendChild(document.createTextNode(' A'));
			linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
	}  
	else if(linkNode.title.match('Artemis'))
	{
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Pegasus");
			hp.appendChild(document.createTextNode(' P'));
			linkNode.parentNode.insertBefore(hp, linkNode.nextSibling);
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Orion");
			hp.appendChild(document.createTextNode('O '));
			linkNode.parentNode.insertBefore(hp, linkNode);
	}
	else if(linkNode.title.match('Pegasus'))
	{
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Orion");
			hp.appendChild(document.createTextNode('O '));
			linkNode.parentNode.insertBefore(hp, linkNode);
			var hp = document.createElement('A');
			hp.setAttribute('target','_main');
			hp.setAttribute('href',"http://www.pardus.at/index.php?section=account_play&universe=Artemis");
			hp.appendChild(document.createTextNode('A '));
			linkNode.parentNode.insertBefore(hp, linkNode);
	}
}
