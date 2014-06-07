// ==UserScript==
// @name           ATNoteTitles
// @namespace      b.gameforge.ikariam.go
// @description    Adds javascript links to the add note page to easily populate the Title field.
// @include        http://*.ikariam.org/admintool/admin/addnote.php*
// @version        0.1
// ==/UserScript==

var titleLinks = new Array(
	{ title: 'Multi Ban', text: 'Multi' },
	{ title: 'Fleet Contact', text: 'Fleet Contact' },
	{ title: 'Pushing', text: 'Pushing' },
	{ title: 'Pushed', text: 'Pushed' },
	{ title: 'Bashing', text: 'Bashing', br: true },
	{ title: 'Light Insult', text: 'Light Insult' },
	{ title: 'Heavy Insult', text: 'Heavy Insult' },
	{ title: 'Non-English Message', text: 'Non-English', br: true },
	{ title: 'Account Sitting Violation', text: 'Account Sitting' },
	{ title: 'Account Sharing', text: 'Account Sharing', br: true },
	{ title: 'Bug Using', text: 'Bug Using' },
	{ title:  'Scripting', text: 'Scripting', br: true },
	{ title: 'Racism', text: 'Racism' },
	{ title: 'Real-Life Threats', text: 'RL Threats' },
	{ title: 'Staff Insults', text: 'Staff Insults', br: true },
	{ title: 'Inappropriate Player Name', text: 'Player Name' },
	{ title: 'Inappropriate Town Name', text: 'Town Name' },
	{ title: 'Inappropriate Alliance Text', text: 'Alliance Text', br: true },
	{ title: 'Report Tool Abuse', text: 'Report Abuse' }
);

function processTitleLinks()
{
	var result = '';
	var links = titleLinks;
	
	for (var i = 0; links[i] != null; i++)
	{
		result += '<a href="#" onclick="setNoteTitle(\'' + links[i].title + '\'); return false;">' + links[i].text + '<a><br />\n';
		if (links[i].br)
			result += '<br />\n';
	}
		
	return result;
}

function setNoteTitle(title)
{
	var titleInput = document.getElementsByTagName('table')[0].rows[1].getElementsByTagName('input')[0];
	titleInput.value = title;
}

// Stolen from Greasemonkey
// http://wiki.greasespot.net/Code_snippets#Embed_a_function_in_the_current_page
function embedFunction(f)
{
	var script = document.createElement('script');
	script.innerHTML = f.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	document.body.appendChild(script);
}

embedFunction(setNoteTitle);

// Float note table left.
var noteTable = document.getElementsByTagName('table')[0];
noteTable.style.cssFloat = 'left';

// Create title link div.
var linkDiv = document.createElement('div');
linkDiv.style.cssFloat = 'left';
linkDiv.style.width = '100px';
linkDiv.style.fontSize = '10px';
linkDiv.innerHTML = processTitleLinks();

noteTable.parentNode.insertBefore(linkDiv, noteTable);