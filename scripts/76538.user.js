// ==UserScript==
// @name           Ignorer les nolifes
// @namespace      Ignorer les nolifes
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function ignore() {

	// On récupère toutes les balises <div> dans un tableau
	var divMessages = document.getElementsByTagName('div');

	for (var i = 0; divMessages[i]; i++)
	{
		// Si on est sur le <div> d'un message (repérable grâce aux classes)
		if (divMessages[i].className == 'msg msg1' || divMessages[i].className == 'msg msg2')
		{
			var infos = divMessages[i].innerHTML.match(/<li class="pseudo">\n<strong>(.{1,})<\/strong>/);
			if (infos[1] == 'Agabougabouga' || infos[1] == 'ici' || infos[1] == 'ici' || infos[1] == 'ici') {
			// On remplace le post
			divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<ul>/, '<div style="display: none;"><ul>');
			divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<\/ul>/, '</div></ul>');
			}
		}
	}
}

ignore();