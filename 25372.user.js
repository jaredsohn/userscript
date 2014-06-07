// ==UserScript==
// @name              Syrnia Fix: Bigger Message Inputs
// @namespace     
// @description   This script makes input textareas bigger
// @include          http://www.syrnia.com/theGame/includes2/messages.m2h*
// @include          http://www.syrnia.com/theGame/includes2/clan.m2h?p=forum&action=addmes*
// @include          http://www.syrnia.com/theGame/includes2/clan.m2h?p=forum&action=addreply*
// @include          http://www.syrnia.com/theGame/includes2/clan.m2h?p=forum&action=edit*
// @include          http://www.syrnia.com/theGame/mainincludes/forum.m2h?pop=yes&action=addmes*
// @include          http://www.syrnia.com/theGame/mainincludes/forum.m2h?pop=yes&action=addreply*
// @include          http://www.syrnia.com/theGame/mainincludes/forum.m2h?pop=yes&action=edit*
// ==/UserScript==

tables = document.getElementsByTagName('table');
for(i = 0, l = tables.length; i<l; i++)
{
	if (window.location.pathname == "/theGame/includes2/clan.m2h") //Apply styles for clan
	{
		if (tables[i].parentNode.tagName == 'FORM')
		{
			tables[i].style.width = '80%';
		}
	}
	else if (window.location.pathname == "/theGame/mainincludes/forum.m2h") //Apply styles for forum
	{
		if (tables[i].parentNode.tagName == 'FORM')
		{
			tables[i].style.width = '100%'; //make inner table fill the outer table
		}
		else
			tables[i].style.width = '80%'; //make inner table the width that we want 
	}
	else if (window.location.pathname == "/theGame/includes2/messages.m2h") //Apply styles for messages
	{
		if (tables[i].bgColor == '#cdbfa1')
		{
			tables[i].style.width = '60%'; //Make the send message table the width we want
		}
	}
}

textareas = document.getElementsByTagName('textarea');
for(i = 0, l = textareas.length; i<l; i++)
{
	textareas[i].style.width = '100%'; //Makes all textarea's fill the width of the table
}