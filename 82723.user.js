// ==UserScript==
// @name           Starfleet HQ - Sign a post
// @description    Provides buttons for adding a Starfleet HQ signature to posts
// @namespace      http://community.livejournal.com/starfleet_hq/
// @include        http://community.livejournal.com/starfleet_hq/*
// @include        http://community.livejournal.com/sfhq_shoreleave/*
// @include        http://community.livejournal.com/team_kirk/*
// @include        http://community.livejournal.com/team_picard/*
// @include        http://community.livejournal.com/team_sisko/*
// @include        http://community.livejournal.com/team_janeway/*
// @include        http://community.livejournal.com/team_archer/*
// @include        http://community.livejournal.com/sfhq_promenade/*
// @include        http://community.livejournal.com/starfleet_stamp/*
// ==/UserScript==

var userName = '<insert your livejournal user name here>';
var team = '<team_kirk|team_picard|team_sisko|team_janeway|team_archer>';
var sigTags = Array(

'<URL of signature tag (comma separated list)>'

);

var textareas = document.getElementsByTagName('textarea');

for (var i=0; i<textareas.length; i++)
{
	if (textareas[i].id == 'commenttext' || textareas[i].id == 'body')
	{
		var txtButton = document.createElement('button');
		txtButton.type = 'button';
		txtButton.id = 'textSign';
		//txtButton.style.float = 'left';
		txtButton.appendChild(document.createTextNode('Text Sign'));
		txtButton.addEventListener('click', insertAtCursor, false);

		var imgButton = document.createElement('button');
		imgButton.type = 'button';
		imgButton.id = 'imageSign';
		//imgButton.style.float = 'left';
		imgButton.appendChild(document.createTextNode('Signature Tag'));
		imgButton.addEventListener('click', insertAtCursor, false);

		textareas[i].parentNode.insertBefore(imgButton, textareas[i].nextSibling);
		textareas[i].parentNode.insertBefore(txtButton, textareas[i].nextSibling);
	}
}


function insertAtCursor(event)
{
	event.preventDefault();

	var text;

	if (event.currentTarget.id == 'textSign')
	{
		text = '<lj user="' + userName + '">//<lj user="' + team + '">';
	}
	else if (event.currentTarget.id == 'imageSign')
	{
		var index = Math.floor(Math.random() * sigTags.length);
		text = '<img src="' + sigTags[index] + '" title="' + userName + '//' + team + '">';
	}

	var textareas = document.getElementsByTagName('textarea');

	for (var i=0; i<textareas.length; i++)
	{
		if (textareas[i].id == 'commenttext' || textareas[i].id == 'body')
		{
			var scrollX = textareas[i].scrollLeft;
			var scrollY = textareas[i].scrollTop;
			textareas[i].value = textareas[i].value + '\n\n' + text;
	
			textareas[i].focus();
			textareas[i].scrollLeft = scrollX;
			textareas[i].scrollTop = scrollY;
		}
	}
}