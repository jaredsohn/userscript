// ==UserScript==
// @name            Swaggifier
// @namespace       TuVeuxUnCroustibeurre
// @version         1.2
// @description     Permet d'écrire des topics de manière Swag sur JVC.
// @include         http://www.jeuxvideo.com/forums/0-*
// @include         http://www.jeuxvideo.com/forums/3-*
// @include         http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @include         http://www.jeuxvideo.com/messages-prives/*
// ==/UserScript==

var textarea = document.getElementById('newmessage');

var post = document.getElementById('rep');

if(post === null)
{
	post = document.getElementById('new_msg');
}

if(post === null)
{
	post = document.getElementById('post');
}

post.addEventListener('submit', function()
{
	var swagText = '';
	var text = textarea.value;
	var swagChar = ['ÀÁÂÃÄÅàáâãäå', 'Bb', 'Çç', 'Ðd', 'ÈÉÊËèéêë', 'Ff', 'Gg', 'Hh', 'ÌÍÎÏìíîï', 'Jj', 'Kk', 'L', 'Mm', 'Ññ', 'ðòóôõöøÒÓÔÕÖØ', 'Pp', 'Qq', 'Rr', 'šŠ', 't', 'ÙÚÛÜùúûü', 'v', 'w', 'Xx', 'Ýýÿ', 'Žž'];
	// © ® º ª ƒ ¥ ß þ ¢ $ § × ¤

	text = text.replace(/:rire:/g, 'xD').replace(/:noel:/g, ':$').replace(/:[a-zA-Z]+?:/g, ':3');
	text = text.replace(/%/g, '‰');

	for(var i = 0, len = text.length; i < len; i++)
	{
		if(text.substr(i, 5) === 'http:' || text.substr(i, 6) === 'https:' || text.substr(i, 3) === ':d)' || text.substr(i, 3) === ':g)')
		{
			var nextSpace = text.indexOf(' ', i);

			if(nextSpace === -1)
			{
				nextSpace = text.indexOf('\n', i);
			}
			if(nextSpace === -1)
			{
				swagText += text.substring(i);
				break;
			}
			else
			{
				swagText += text.substring(i, nextSpace);
				i = nextSpace - 1;
				continue;
			}
		}
		
		if(text[i] >= 'a' && text[i] <= 'z')
		{
			var repl = swagChar[text.charCodeAt(i) - 97];
			swagText += repl[Math.floor(Math.random() * repl.length)];
		}
		else if(text[i] >= 'A' && text[i] <= 'Z')
		{
			var repl = swagChar[text.charCodeAt(i) - 65];
			swagText += repl[Math.floor(Math.random() * repl.length)];
		}
		else
		{
			swagText += text[i];
		}
	}
	
	textarea.value = swagText;
}, true);
