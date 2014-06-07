// ==UserScript==
// @name        Antispoil
// @description Bloque les topics en majuscule
// @include     http://www.jeuxvideo.com/*
// @include     http://*.forumjv.com/*
// @exclude		http://*.forumjv.com/jvchat*
// @exclude     http://www.jeuxvideo.com/jvchat*
// @version     1.0.1
// ==/UserScript==

// Check pour voir si on est sur forumjv
if(document.domain.split('.')[1] == 'forumjv')
{
	// Prend la liste des topics
	var topics = document.getElementsByClassName('titre');
}
else
{
	// Prend la liste des topics
	var topics = document.getElementsByClassName('ltopic');
}

// Analyse les topics un par un
for(var i = 0; i < topics.length; i++)
{
	// Prend le nom du topic
    var nomDuTopic = topics[i].innerHTML;
	// Vérifie si le topic est en majuscules
    if(nomDuTopic == nomDuTopic.toUpperCase())
    {
		// Change le nom du topic
        topics[i].innerHTML = 'SPOIL BLOQUE';
		// Bloque le lien pour éviter les clics accidentels
        topics[i].href = 'javascript:void(0)';
    }
}