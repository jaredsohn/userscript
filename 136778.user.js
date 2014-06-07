// ==UserScript==
// @name			JVMod
// @description		Arme de moderation des commentaires
// @version			0.0.1
// @namespace		http://www.jeuxvideo.com/
// @include			http://www.jeuxvideo.com/cheats/*
// @include			http://www.jeuxvideo.com/news/*
// @include			http://www.jeuxvideo.com/previews/*
// @include			http://www.jeuxvideo.com/dossiers/*
// @include			http://www.jeuxvideo.com/gaming_live/*
// @include			http://www.jeuxvideo.com/bandes-annonces-videos-jeux/*
// @include			http://www.jeuxvideo.com/reportages-videos-jeux/*
// @include			http://www.jeuxvideo.com/chroniques-video/*
// @include			http://www.jeuxvideo.com/extraits-videos-jeu/*
// @include			http://www.jeuxvideo.com/making-of-videos-jeux/*
// @include			http://www.jeuxvideo.com/le-direct/*
// @include			http://www.jeuxvideo.com/boite-a-idees/*
// @include			http://www.jeuxvideo.com/demos/*
// @include			http://www.jeuxvideo.com/fonds-ecran-wallpapers/*
// @copyright		Leirok
// ==/UserScript==

var moderationActif = document.getElementById('message_*').lastChild('popup')

if (moderationActif = true)
{
	var page = document.getElementsByTagName('message_*');
	
	var href = page.getAttribute('href');
		page.setAttribute('href', '"http://www.jeuxvideo.com/commentaires/*">1');
}