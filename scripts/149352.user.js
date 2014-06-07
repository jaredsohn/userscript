// ==UserScript==
// @name			JVPlus Test
// @namespace		vutqy
// @description		Ajout de fonctionnalités aux forums de JeuxVideo.com
// @version			3.04
// @include			http://www.jeuxvideo.com/*
// @include			http://jvplus.fr/*
// @include			http://www.jvplus.fr/*
// ==/UserScript==

/*************************************************************************
Gestion des nouvelles versions
*************************************************************************/
(function() {
	var ma_version = '3.04';
	
	if (geid('jvplus_derniere_version')) {
		var jvplus_derniere_version = geid('jvplus_derniere_version').innerHTML;
		
		if (geid('jvplus_ma_version')) {
			geid('jvplus_ma_version').innerHTML = ma_version;
		}
		
		document.body.className = jvplus_derniere_version == ma_version ? 'a_jour' : 'pas_a_jour';
	}
})();

/*************************************************************************
CSS
*************************************************************************/
(function() {
	var e = document.createElement('style');
	e.innerHTML = '/* JVPlus */\
		.msg1:target, .msg2:target { background-color: #ffc; }\
		\
		[ignored] { opacity: 0.5; }\
		[ignored]:hover { opacity: 1; }\
		[ignored] .date { color: transparent; cursor: default; }\
		[ignored] [target=avertir] { display: none; }\
		[ignored] .ancre, [ignored] .post { display: none; }\
		[ignored] .pseudo { margin-bottom: 0; }\
		tr[ignored] a img { opacity: 0.5; }\
		tr[ignored]:hover a img { opacity: 1; }\
		tr[ignored] td { padding: 2px 1px !important; }\
		div.ignorer { display: inline-block; width: 13px; height: 12px; cursor: pointer; background: url(http://image.jeuxvideo.com/pics/messages_prives/ico_black_on.png); }\
		[ignored] div.ignorer { background: url(http://image.jeuxvideo.com/pics/messages_prives/ico_black_off.png); }\
		\
		p.rss a:not([href*="rss"]) { padding: 0; background: none; color: #669; }\
		\
		#col1[cache] { opacity: .85; }\
		#col1[loading] { opacity: .6; }\
		\
		#ft_pjax { position: absolute; right: 44px; top: 3px; cursor: pointer; width: 39px; height: 17px; background: url(http://image.noelshack.com/fichiers/2012/37/1347656041-sprite.png); }\
		#ft_pjax.off { background-position: -39px 0; }\
		#ft1 + #ft2 + #ft_pjax { right: 88px; }\
		\
		#popup_cdv { position: fixed; top: 100px; left: 100px; z-index: 2147483647; background: rgba(255, 255, 255, .5); box-shadow: 0 5px 40px rgba(0, 0, 0, .7); }\
		#popup_cdv.closed { display: none; }\
		#popup_cdv header { text-align: left; background: white; position: relative; border-bottom: 1px solid rgba(0, 0, 0, .8); }\
		#popup_cdv header input { width: 735px; color: #666; border: none; outline: none; padding: 5px 8px; }\
		#popup_cdv header input:hover, #popup_cdv header input:focus { color: black; }\
		#popup_cdv header span { display: block; width: 14px; height: 14px; border-radius: 999px; position: absolute; top: 8px; right: 8px; background: url(http://image.noelshack.com/fichiers/2012/37/1347656041-sprite.png) 0 -17px; }\
		#popup_cdv header span:hover { background-position: -14px -17px; }\
		#popup_cdv header span:active { background-position: -28px -17px; }\
		#popup_cdv iframe { width: 770px; height: 570px; border: 0; }\
		\
	';
	document.head.appendChild(e);
})();

/*************************************************************************
Accès au dernier message d’un topic par un clic sur son icône
*************************************************************************/
function dernier_message() {
	var topics = getTopics();
	
	for (var i in topics) {
		tr = topics[i];

		var td, messages = false, lien, icone_topic, id_topic;
		for (var j in tr.children) {
			td = tr.children[j];
			if (typeof td != 'undefined' && typeof td.innerHTML != 'undefined') {
				/* Nombre de messages.
				On utilise textContent au lieu d’innerHTML pour être compatible avec JVCPremium, qui met une balise sur le nombre de messages. */
				if (/^[0-9]{0,6}$/.test(td.textContent)) {
					messages = td.textContent;
				}
				
				if (typeof td.children != 'undefined' && typeof td.children[0] != 'undefined' && td.children[0].className == 'ltopic') {
					lien = td.children[0].href;
					id_topic = td.children[0].name.substr(6);
				}
			}
		}
		if (messages !== false) {
			icone_topic = tr.children[0].innerHTML;
			lien = lien.replace(id_topic + '-1-', id_topic + '-' + parseInt(1 + messages / 20) + '-');
			tr.children[0].innerHTML = '<a href="' + lien + '">' + icone_topic + '</a>';
			
			messages = false;
		}
	}
}

/*************************************************************************
Boutons Citer sur la page d’un topic
*************************************************************************/
function bouton_citer_topic() {
	var lien_repondre = '#lien_repondre';
	if (document.getElementsByClassName('bt_repondre').length > 0) {
		lien_repondre = document.getElementsByClassName('bt_repondre')[0].href;
		lien_repondre = lien_repondre.substr(0, lien_repondre.length - 'form_post'.length) + 'citer_';
		
		var ancres = document.getElementsByClassName('ancre');
		var ancre, lien_citer;
		for (var i in ancres) {
			ancre = ancres[i];
			if (typeof ancre.children != 'undefined' && typeof ancre.children[0] != 'undefined' && ancre.children[0].innerHTML == 'Lien permanent') {
				lien_citer = lien_repondre + ancre.parentNode.parentNode.id.substr('message_'.length);
				ancre.innerHTML = '<a href="' + lien_citer + '">Citer</a> - ' + ancre.innerHTML;
			}
		}
	}
}

/*************************************************************************
Boutons Citer sur le formulaire de réponse
*************************************************************************/
function bouton_citer_form() {
	if (geid('dix_msg')) {
		var messages = getPosts();
		var message, ancre, a;
		for (var i in messages) {
			message = messages[i];
			ancre = document.createElement('li');
			ancre.className = 'ancre';
			message.children[0].appendChild(ancre);
			
			a = document.createElement('a');
			a.href = '#' + message.id;
			a.innerHTML = 'Citer';
			ancre.appendChild(a);
			a.addEventListener('click', ajout_citation_rapide);
		}
	}
}

/*************************************************************************
Focus sur le champ de réponse d’un topic
*************************************************************************/
function focus_champ() {
	if (location.hash == '#form_post') {
		var newmessage = geid('newmessage');
		if (newmessage) {
			newmessage.focus();
		}
	}
}

/*************************************************************************
Ajout d’une citation quand on a cliqué sur un lien pour citer
*************************************************************************/
function ajout_citation() {
	if (location.hash && location.hash.substr(0, 7) == '#citer_') {
		var url_split = location.href.split('-');
		var forum_id = url_split[1];
		var topic_id = url_split[2];
		
		var message_id = location.hash.substr(7);
		var page = url_split[3];
		
		var topic_name = url_split[7];
		for (var i = 8; i < url_split.length; i++) {
			topic_name += '-' + url_split[i];
		}
		topic_name = topic_name.split('.')[0];
		
		var newmessage = geid('newmessage');
		newmessage.innerHTML = 'Ajout de la citation en cours…';
		newmessage.focus();
		
		var lien_citation = 'http://www.jeuxvideo.com/forums/1-' + forum_id + '-' + topic_id + '-' + page + '-0-1-0-' + topic_name + '.htm' + '#message_' + message_id;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var citation_html = xhr.responseText.substr(xhr.responseText.indexOf('<div id="message_' + message_id + '"'));
				if (!citation_html) {
					newmessage.innerHTML = 'Désolé, une erreur s’est produite lors de la récupération du message à citer.';
					return;
				}
				
				var citation_texte = textToQuote(citation_html, lien_citation);
				
				newmessage.innerHTML = citation_texte;
			}
		}
		xhr.open('GET', lien_citation, true);
		xhr.send(null);
	}
}

/*************************************************************************
Ajout d’une citation rapide (formulaire de réponse)
*************************************************************************/
function ajout_citation_rapide(event) {
	event.preventDefault();
	var id = this.href.split('#')[1];
	var newmessage = geid('newmessage');
	
	var citation_html = this.parentNode.parentNode.parentNode.innerHTML;
	var caracteres = [
		[/&lt;/g, '<'],
		[/&gt;/g, '>'],
		[/&amp;/g, '&'],
		[/&nbsp;/g, ' ']
	];
	for (var i in caracteres) {
		citation_html = citation_html.replace(caracteres[i][0], caracteres[i][1]);
	}
	var citation_texte = textToQuote(citation_html);
	
	if (newmessage.value == '') {
		citation_texte = citation_texte.trim() + "\r\n\r\n";
	}
	
	newmessage.focus();
	newmessage.value += citation_texte;
}

/*************************************************************************
Boutons Ignorer
*************************************************************************/
function boutons_ignorer() {
	if (geclass('date').length > 0) {
		var e_dates = geclass('date');
		
		for (var i in e_dates) {
			var e = e_dates[i];
			var pseudo, cdv;
			
			if (e.parentNode && e.parentNode.parentNode.id.substr(0, 8) == 'message_') {
				pseudo = e.parentNode.children[0].children[0].innerHTML.toLowerCase();
				cdv = e.parentNode.children[0].children[1];
				/* BUG: Conflit possible avec le bouton supprimer des modérateurs. */
				
				if (cdv) {
					ajouterBoutonIgnorer(e, pseudo);
				}
			}
		}
	}
}

/*************************************************************************
Mise sous silence des pseudos ignorés
*************************************************************************/
function maj_ignorer() {
	var messages = getPosts();
	var message, pseudo, ancre, a;
	for (var i in messages) {
		message = messages[i];
		pseudo = message.children[0].children[0].children[0].innerHTML;
		if (isIgnored(pseudo)) {
			message.setAttribute('ignored', '');
		}
		if (message.hasAttribute('ignored', '') && !isIgnored(pseudo)) {
			message.removeAttribute('ignored');
		}
	}

	
	var topics = [geclass('tr1'), geclass('tr2')];
	var topic, lien;
	for (var i in topics) {
		for (var j in topics[i]) {
			topic = topics[i][j];
			if (typeof topic.children != 'undefined' && typeof topic.children[0] != 'undefined') {
				if (isIgnored(topic.children[2].innerHTML)) {
					topic.setAttribute('ignored', '');
					
					lien = topic.children[1].children[0];
					lien.title = lien.innerHTML;
					lien.innerHTML = ' ';
				}
			}
		}
	}
}

/*************************************************************************
Ignorer/Désignorer un pseudo
*************************************************************************/
function ignorer(element, designorer) {
	var pseudo = element.parentNode.parentNode.children[0].children[0].innerHTML.toLowerCase();
	
	if (!designorer) {
		localStorage.ignore += ' ' + pseudo;
	}
	else {
		var pseudos = localStorage.ignore;
		var index = pseudos.indexOf(' ' + pseudo);
		if (index != -1) {
			localStorage.ignore = pseudos.substr(0, index) + pseudos.substr(index + 1 + pseudo.length);
		}
	}
	
	maj_ignorer();
	boutons_ignorer();
}

/*************************************************************************
Lien vers les statistiques du forum
*************************************************************************/
function lien_stats() {
	if (geclass('rss').length > 0) {
		if (geclass('rss')[0].innerHTML.indexOf('RSS du forum') != -1) {
			var num = location.href.split('-')[1];
			geclass('rss')[0].innerHTML += '<a href="http://jvstats.planet-shitfliez.net/stats/inflate.php?num=' + num + '" target="_blank">Statistiques JVstats</a>';
		}
	}
}

/*************************************************************************
PJAX
*************************************************************************/
function bouton_pjax() {
	if (!geid('ft2')) {
		return;
	}
	
	var ft = document.createElement('div');
	ft.id = 'ft_pjax';
	ft.title = 'Désactiver la navigation rapide de JVPlus';
	
	if (pjax_is_off()) {
		ft.className = 'off';
		ft.title = 'Activer la navigation rapide de JVPlus';
	}
	
	geid('ft2').parentNode.appendChild(ft);
	
	ft.addEventListener('click', function() {
		if (pjax_is_off()) {
			localStorage.jvplus_pjax = 'on';
		}
		else {
			localStorage.jvplus_pjax = 'off';
		}
		
		location.reload();
	});
}

function pjax() {
	if (pjax_is_off()) {
		return;
	}
	
	if (location.href.split('/')[2].toLowerCase() == 'www.jeuxvideo.com' && location.href.split('/')[3] == 'forums') {
		/* Liens. */
		liens = document.getElementsByTagName('a');
		for (var i in liens) {
			var lien = liens[i];
			
			if (lien.href && lien.href.split('/')[2] == 'www.jeuxvideo.com' && !lien.hasAttribute('pjax')) {
				/* Lien inter-forums. */
				if (lien.href.split('/')[3] == 'forums' && lien.href.substr(0, lien.href.indexOf('#')) != location.href) {
					if (!(lien.innerHTML == 'Citer' && lien.hash.substr(0, 8) == '#message')) {
						lien.setAttribute('pjax', '');
						lien.addEventListener('click', function(e) {
							pjax_click(e, this);
						});
					}
				}
				
				/* Lien cdv. */
				if (lien.href.split('/')[3] == 'profil') {
					if (lien.href != lien.href.toLowerCase()) {
						lien.href = lien.href.toLowerCase(); // Le lien de Bonjour « pseudo » en haut de page conserve la majuscule dans le lien.
					}
					lien.setAttribute('pjax', '');
					lien.addEventListener('click', function(e) {
						popup_cdv_open(e, this);
					});
				}
			}
		}
		
		/* Recherche. */
		var form = geid('recherche_forum');
		if (form) {
			var textfield = geid('textfield_forum');
			if (textfield.defaultValue != 'Rechercher') {
				textfield.focus();
			}
			form.addEventListener('submit', pjax_recherche);
			form.setAttribute('pjax', '');
		}
	}
}

function pjax_click(event, elem) {
	var link = elem.href;

	if (event.which > 1 || event.metaKey || event.ctrlKey || elem.target)
		return;
	
	event.preventDefault();
	
	pjax_load(link);
	
	history.pushState({foo: link}, '', link);
}

function pjax_load(link, event) {
	last_link = location.href;
	
	if (!this.pages) {
		this.pages = [];
	}
	for (var i in pages) {
		if (pages[i][0] == link) {
			geid('col1').setAttribute('cache', '');
			geid('col1').innerHTML = pages[i][2];
			
			if (scrollY < 185 || last_link != link)
				scrollTo(0, 185);
			
			document.title = pages[i][1];
			load();
			break;
		}
	}
	
	var scroll_original = scrollY;
	
	if (!geid('col1').hasAttribute('cache')) {
		geid('col1').setAttribute('loading', '');
	}
	
	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4)
			return;
		
		if (link != location.href) // Si on change de page avant que la page soit chargée.
			return;
		
		var title = xhr.responseText.between('<title>', '</title>');
		title = html_entity_decode(title);
		
		var col = xhr.responseText.between('<div id="col1">', '<div id="col2">');
		col = col.replace(/<script[\s\S]+?<\/script>/g, '');
		col = col.substr(0, col.lastIndexOf('</div>'));
		var scroll = 185;
		
		if (geid('col1').hasAttribute('cache') && scroll_original != scrollY) // Si une page en cache est affiché, scroller uniquement si l’utilisateur n’a pas déjà scrollé.
			scroll = false;
		
		if (last_link == link) // Ne pas scroller si l’utilisateur rafraîchit la page.
			scroll = false;
		
		geid('col1').removeAttribute('cache');
		geid('col1').removeAttribute('loading');
		geid('col1').innerHTML = col;
		if (scroll) {
			/* event.state.foo existe quand l’utilisateur a fait suivant/précédent.
			Dans ce cas on ne scroll que s’il est trop en haut de page. */
			if (!(event && event.state && event.state.foo) || scrollY < scroll) {
				scrollTo(0, scroll);
			}
		}
		document.title = title;
		load();
		load2();
		
		if (i && pages[i][0] == link) {
			pages[i] = [link, title, col];
		}
		else {
			pages.push([link, title, col]);
		}
	}
	xhr.open('GET', link, true);
	xhr.send();
}

var pop = false;
window.addEventListener('popstate', function(event) {
	if (!pop) {
		pop = !pop;
		return;
		/* popstate se déclenche quand on arrive sur les forums pour la première fois (sans ajax). */
	}
	if (location.href.split('/')[2].toLowerCase() == 'www.jeuxvideo.com' && location.href.split('/')[3] == 'forums' && location.href.substr(0, location.href.indexOf('#')) != location.href) {
		pjax_load(location.href, event);
	}
});

function popup_cdv_open(event, elem) {
	var link = elem.href;

	if (event.which > 1 || event.metaKey || event.ctrlKey)
		return;
	
	event.preventDefault();
	event.stopPropagation(); // On empêche jQuery d’ouvrir sa popup.
	
	var popup = document.createElement('div');
	popup.id = 'popup_cdv';
	document.body.appendChild(popup);
	
	header = document.createElement('header');
	popup.appendChild(header);
	
	input = document.createElement('input');
	header.appendChild(input);
	input.addEventListener('keyup', function() {
		update_cdv(this.value);
	});
	
	span = document.createElement('span');
	header.appendChild(span);
	span.addEventListener('click', close_cdv);
	document.body.addEventListener('click', close_cdv_if_outside);
	
	iframe = document.createElement('iframe');
	iframe.name = 'profil';
	popup.appendChild(iframe);
	input.defaultValue = iframe.src = link;
	
	update_cdv();
}

function close_cdv() {
	var popup = geid('popup_cdv');
	
	if (!popup)
		return;
	
	return popup.parentNode.removeChild(popup);
}

function close_cdv_if_outside(event) {
	var popup = geid('popup_cdv');
	var elem = event.target;
	
	if (!popup)
		return;
	
	while (elem.parentNode) {
		if (elem == geid('popup_cdv')) {
			return;
		}
		elem = elem.parentNode;
	}
	
	return popup.parentNode.removeChild(popup);
}

function update_cdv(link) {
	if (!geid('popup_cdv')) {
		return;
	}
	
	var popup = geid('popup_cdv');
	var iframe = popup.children[1];
	
	if (link) {
		var pseudo = link.split('/')[4].split('.')[0].toLowerCase();
		if (link.match(/^http:\/\/www\.jeuxvideo\.com\/profil\/[a-z0-9-_\[\]]{3,15}\.html$/)) {
			if (iframe.contentWindow.document.getElementsByTagName('html')[0]) {
				iframe.contentWindow.document.getElementsByTagName('html')[0].style.opacity = '0.2';
			}
			iframe.src = '/profil/' + pseudo + '.html';
		}
	}
	
	var height = 570;
	if (iframe.contentWindow.document.body) {
		iframe.contentWindow.document.body.style.overflow = 'hidden';
		
		if (iframe.contentWindow.document.getElementsByClassName('banni')[0]) // Pseudo banni.
			height = 200;
		else if (iframe.contentWindow.document.getElementById('page')) // Erreur 404.
			height = 570;
		else
			height = iframe.contentWindow.document.body.offsetHeight;
	}
	
	iframe.style.height = height + 'px';
	
	popup.style.top = (innerHeight - popup.offsetHeight) / 2 + 'px';
	popup.style.left = (innerWidth - 770) / 2 + 'px';
	
	setTimeout(update_cdv, 300);
}

function pjax_recherche(event) {
	/* Note : Le temps d’intervalle entre deux recherches est de 1 seconde */
	event.preventDefault();
	event.stopPropagation();
	
	var text = geid('textfield_forum').value.trim();
	var type = event.target.children[0].children[1].value;
	if (text) {
		var parts = location.href.split('/')[4].split('-');
		
		/* « Retour liste des sujets » donne des liens bizarres. */
		if (parts[0] == 26)
			parts[0] = 0;
		if (parts[2] != 0)
			parts[2] = 0;
			
		var url = 'http://www.jeuxvideo.com/forums/';
		for (var i = 0; i < 6; i++)
			url += parts[i] + '-';
		url += type + '-' + text + '.htm';

		pjax_load(url);
		history.pushState({foo: url}, '', url);
	}
}

/*************************************************************************
Chargement
*************************************************************************/
function load() {
	dernier_message();
	bouton_citer_topic();
	bouton_citer_form();
	focus_champ(); // Ajouter boutons citer avant car ils changent le scroll.
	ajout_citation();
	boutons_ignorer();
	maj_ignorer();
	lien_stats();
	bouton_pjax();
	pjax();
}
load();

function load2() {
	/* Forums préférés — http://www.jeuxvideo.com/js/forums_coeur.js */
	eval('jQuery("#coeur_ajouter").bind("click",coeur_ajouter);jQuery("a.sup_pref").live("click",coeur_delete);jQuery("#liste_forums_pref li a.sup_pref").each(function(){coeur_forums.push(parseInt(jQuery(this).attr("forum"),10))})');
}


/*************************************************************************
Fonctions diverses
*************************************************************************/
function geid(id) {
	return document.getElementById(id);
}

function geclass(className) {
	return document.getElementsByClassName(className);
}

function getag(tagName) {
	return document.getElementsByTagName(tagName);
}

String.prototype.between = function(begin, end) {
	var _1 = this.split(begin)[1];
	if (typeof _1 == 'undefined') {
		return false;
	}
	var _2 = _1.split(end)[0];
	return _2;
}

function jvcHtmlToText(message_html) {
	var texte = message_html;
	
	/* Sauts de ligne */
	var texte_retour = "\r\n| ";
	while (texte.indexOf("\n") != -1) {
		texte = texte.replace("\n", "");
	}
	while (texte.indexOf("\r") != -1) {
		texte = texte.replace("\r", "");
	}
	while (texte.indexOf("<br />") != -1) {
		texte = texte.replace("<br />", texte_retour);
	}
	while (texte.indexOf("<br>") != -1) {
		texte = texte.replace("<br>", texte_retour);
	}
	
	/* Smileys */
	while (/ ?<img src="http:\/\/image.jeuxvideo.com\/smileys_img\/[^"]+" alt="([^"]+)"( \/)?>/.test(texte)) {
		texte = texte.replace(/ ?<img src="http:\/\/image.jeuxvideo.com\/smileys_img\/[^"]+" alt="([^"]+)"( \/)?>/, "$1");
	}
	
	/* Liens */
	while (/<a href="(mailto:)?([^"]+)".+<\/a>/.test(texte)) {
		texte = texte.replace(/<a href="(mailto:)?([^"]+)".+<\/a>/, '$2');
	}
	
	return texte;
}

String.prototype.inArray = function(array) {
	for (var key in array) {
		if (this == array[key]) {
			return true;
		}
	}
	
	return false;
}

function textToQuote(citation_html, lien_citation) {
	var pseudo = citation_html.between('title="Voir le profil de ', '"');
	var de = 'aeiou'.indexOf(pseudo[0].toLowerCase()) == -1 ? 'de ' : 'd’';
	
	var date = citation_html.between('<li class="date">', '<a').replace(/<span>via mobile<\/span> /, '').replace(/\r?\n/g, '').replace('Posté le ', '').trim();
	
	citation_html = citation_html.substr(citation_html.indexOf('<li class="post">') + '<li class="post">'.length);
	citation_html = citation_html.substr(0, citation_html.indexOf('</li>'));
	citation_html = citation_html.trim();
	
	var citation_texte = "\r\n\r\n";
	if (lien_citation) {
		citation_texte = '| ' + lien_citation + "\r\n";
	}
	
	citation_texte += '| Citation ' + de + pseudo + ', ' + date + "\r\n"
	+ '| « ' + jvcHtmlToText(citation_html) + " »\r\n\r\n";
	/* L’espace avant » est un espace normal (non-insécable) pour éviter
	les problèmes avec les smileys tels que :) en fin de message. */
	
	return citation_texte;
}

/* Inutilisée, servait pour empêcher d’ignorer son propre pseudo. */
function monPseudo() {
	try {
		return geid('compte').children[0].children[0].innerHTML;
	}
	catch(e) {
		return '';
	}
}

function getPosts() {
	var messages = [geclass('msg msg1'), geclass('msg msg2')];
	var messages_array = [];
	
	var message;
	for (var i in messages) {
		for (var j in messages[i]) {
			message = messages[i][j];
			if (typeof message.children != 'undefined' && typeof message.children[0] != 'undefined') {
				messages_array.push(message);
			}
		}
	}
	
	return messages_array;
}

function getTopics() {
	var topics = [];
	var liste_topics = document.getElementById('liste_topics');
	if (!liste_topics) {
		return [];
	}
	/* Le premier enfant de liste_topics est le <tbody>, invisible dans le HTML, mais existant dans le DOM. */
	liste_topics = liste_topics.children[0];
	
	var topic;
	for (var i in liste_topics.children) {
		topic = liste_topics.children[i];
		if (topic.children && topic.children[0].id != 'c1') {
			topics.push(topic);
		}
	}
	
	return topics;
}
	
function ajouterBoutonIgnorer(parent, pseudo) {
	var ignored = isIgnored(pseudo);
	
	if (parent.lastChild.className == 'ignorer') {
		parent.removeChild(parent.lastChild);
	}
	else {
		parent.innerHTML += ' '; // Pour pas être collé au bouton avertir.
	}

	var div = document.createElement('div');
	div.className = 'ignorer';
	parent.appendChild(div);
	div.title = (ignored ? 'Ne plus ignorer' : 'Ignorer') + ' ce membre';
	
	div.addEventListener('click', function() {
		ignorer(this, ignored);
	});
	
	return div;
}

function html_entity_decode(string) {
	if (!this.elem) {
		this.elem = document.createElement('div');
	}
	this.elem.innerHTML = string;
	return this.elem.textContent;
}

function pjax_is_off() {
	return localStorage.jvplus_pjax && localStorage.jvplus_pjax == 'off';
}