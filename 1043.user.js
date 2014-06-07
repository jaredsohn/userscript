// ==UserScript==
// @name          del.icio.us en franÃÂ§ais
// @namespace     http://www.sensio.com/userscripts
// @description	  del.icio.us en franÃÂ§ais
// @include       http://del.icio.us/*
// ==/UserScript==

(function() {
	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/del.icio.us/, 'del.icio.us [fr]');

	dico = new Array('>related tags<', '\\(optional\\)', '>extended<', '\\(space separated\\)', 'ÃÂ» popular tags', 'ÃÂ» recommended tags', 'ÃÂ» your tags', 'search:', '>search<', 'social bookmarks', '>bookmarks<', '<td>username', '<td>password', '>login<', 'log in', '>settings<', 'inbox', 'forgot password', '>post<', '>logout<', '>register<', '>about<', 'later', 'earlier', 'most active', 'see more tags', '>popular tags<', '>popular<');
	dicoTrad = new Array('>tags associÃÂ©s<', '(optionel)', '>ÃÂ©tendue<', '(sÃÂ©parÃÂ© par une espace)', '&raquo; tags populaires', '&raquo; tags recommandÃÂ©s', '&raquo; vos tags', 'recherche :', '>recherche<', 'communautÃÂ© de signets', '>signets<', '<td>utilisateur', '<td>mot de passe', '>se connecter<', 'se connecter', '>paramÃÂ¨tres<', 'inbox', 'retrouver son mot de passe', '>soumettre<', '>se dÃÂ©connecter<', '>s\'inscrire<', '>ÃÂ  propos<', 'aprÃÂ¨s', 'avant', 'les + actifs', 'plus de tags', '>tags populaires<', '>populaire<');
	for (i = 0; i < dico.length; i++)
	{
		var h = document.body.innerHTML;
		var re = new RegExp(dico[i], 'g');
		document.body.innerHTML = h.replace(re, dicoTrad[i]);
	}

	// Fix login form submit
	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/\/se connecter/g, '/login');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/first posted by (.+?) on (\d{4})\-(\d{2})\-(\d{2})/g, 'soumis par $1 le $4/$3/$2');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/and (\d+) other people/g, 'et par $1 personnes');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/and 1 other person/g, 'et par 1 personne');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/\((\d+) recently\)/g, '($1 rÃÂ©cemment)');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/by\s+<a class/g, 'par <a href');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/to\s+<a class/g, 'dans <a href');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/on (\d{4})\-(\d{2})\-(\d{2})/g, 'le $3/$2/$1');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/(\d+) items total/g, '$1 enregistrements');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/page (\d+) of (\d+)/g, 'page $1 sur $2');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/<a (.+?)>edit<\/a> this item/g, '<a $1>ÃÂ©diter</a> cette page');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/<a (.+?)>copy<\/a> this item/g, '<a $1>copier</a> cette page');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/An (.+?) feed for this page is available at/, 'Un fil $1 est disponible pour cette page');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/Show (.+?) items per page./m, 'Affichage de $1 enregistrements par page.');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/Showing (\d+) items per page./m, 'Affichage de $1 enregistrements par page.');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/delete this post/, 'Effacer cet enregistrement');

	var h = document.body.innerHTML;
	document.body.innerHTML = h.replace(/originally posted /, 'soumis ');

	// Some CSS tweaks
	head = window._content.document.getElementsByTagName('head')[0];
	style = window._content.document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.innerHTML = "* { font-family: Arial; font-size: 95% } a { color: #339; }";
	head.appendChild(style);
})();
