// ==UserScript==
// @name           Tip.it - Change Tab Title
// @namespace      http://userscripts.org/users/42648
// @description    Changes the tab title to a more streamlined document name.
// @include        http://tip.it/runescape/*
// ==/UserScript==

//There're 4 possibilities here. Bestiary (main page and each beast's page), quest, item (the item main page and each individual item page) and everything else; 

if (document.title=='Tip.it Runescape Help :: Bestiary :: The Original RuneScape help site!')
{
//If it's the main bestiary page, the title is Bestiary, otherwise make it the same as the beast name;
var beastcheck=document.getElementsByTagName('table')[2].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].firstChild.data;
	if (beastcheck=='Levels:')
	{
	document.title="Bestiary"
	}
	else
	{
	document.title=beastcheck
	}
}
else
{
var pagetypecheck=document.getElementsByTagName('h1')[4].firstChild.data;


if (pagetypecheck=='How often do you visit our forums?')
//if it's a quest page;
{
document.title=document.getElementsByTagName('table')[2].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].firstChild.data;
}
else if (pagetypecheck=='Items Database')
//If it's the main items database page just say items database, otherwise use the item name;
{
var maincheck=document.getElementsByTagName('table')[2].getElementsByTagName('tr')[0].getElementsByTagName('td')[1].firstChild.data;
	if (maincheck=='Available to')
	{
	document.title="Items Database"
	}
	else
	{
	document.title=maincheck
	}
}
else
//Otherwise make it whatever the main heading is;
{
document.title=pagetypecheck
}
}