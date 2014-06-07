// ==UserScript==
// @name           Télécharger YouTube
// @namespace      http://jibouleau.com/
// @include        http://www.youtube.com/*
// @description    Ajoute un lien pour télécharger les vidéos sur YouTube
// ==/UserScript==

var re = /player2.swf\?(.+)/;

var liste = document.getElementsByTagName('embed');

for (var i = 0; i < liste.length; i ++)
{
	var embed = liste[i];
	
	var arr = re.exec(embed.src);
	
	if (arr != null)
	{
		var e = document.createElement("A");
		e.innerHTML = "Télécharger la vidéo";
		e.href = "/get_video?" + arr[1];
		
		embed.parentNode.appendChild(e);
	}
}
