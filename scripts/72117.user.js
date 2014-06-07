// ==UserScript==
// @name           root (+ lastpages)
// @namespace      root (+ lastpages)
// @include        http://www.jeuxvideo.com/forums/*
// ==/UserScript==

function sup_page_topics(idRecherche) {
	
	if (idRecherche == 4)
	{
		document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvcprono.free.fr/root/img/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {if (document.getElementById('msg_' + i).className == '&nbsp;') {document.getElementById('msg_' + i).checked = true;}} return false;\">Tout cocher (msg)</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
		document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer TOUTE votre sÃ©lection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer la TOTALITÃ‰ des topics/messages de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)} return false;\">Effacer (page)</a></li>\r\n</ul>");	
	}
	else
	{
		document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvcprono.free.fr/root/img/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
		document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer TOUTE votre sÃ©lection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer la TOTALITÃ‰ des topics de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)} return false;\">Effacer (page)</a></li>\r\n</ul>");
	}
	
	// On ajoute la colonne des cases Ã  cocher
	var topics = document.getElementById('liste_topics').innerHTML;
	topics = topics.replace(/<tr>/, '<tr>\r\n<th style="width: 15px;">&nbsp;</th>');

	// On rÃ©cupÃ¨re toutes les balises <tr> puisque pas d'id sur celle qu'on cherche
	var trTopics = document.getElementsByTagName('tr');
	
	// Initialisation du tableau contenant les liens de suppression
	var supLien = new Array();
	p = 1;
	
	for (var l = 1; trTopics[l]; l++) // On Ã©xecute l'opÃ©ration autant de fois qu'il y a de balises <tr>
	{
		// Si on est sur le <tr> d'un topic (repÃ©rable grÃ¢ce aux classes)
		if (trTopics[l].className == 'tr1' || trTopics[l].className == 'tr2')
		{
			// On rÃ©cupÃ¨re le lien de modÃ©ration (1ere balise <a>)
			var lien = trTopics[l].getElementsByTagName('a');
			supLien[p] = lien[0];
			p++;
		}
	}
	
	// Si c'est une recherche par message, on vire les cases Ã  cocher pour les topics
	if (idRecherche == 4)
	{
		// On incrÃ©mente Ã  partir de 1 tous les messages, et implentation des liens de suppressions dans les value
		for (var id = 1; topics.search(/<tr class="(tr[12]|trinv)">\r?\n?<td>(<img|&nbsp;)/) != -1; id++)
		{
			// On ajoute les cases + ajout du lien de suppression dans le value
			topics = topics.replace(/(<tr class="tr[12]">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" id="msg_' + id + '" value="' + supLien[id] + '" class="$2" /></td>\r\n<td>$2');
			// Topics invisibles
			topics = topics.replace(/(<tr class="trinv">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" disabled="disabled" /></td>\r\n<td>$2');
		}
	}
	else
	{
		// On incrÃ©mente Ã  partir de 1 tous les messages, et implentation des liens de suppressions dans les value
		for (var id = 1; topics.search(/<tr class="(tr[12]|trinv)">\r?\n?<td>(<img|&nbsp;)/) != -1; id++)
		{
			// On ajoute les cases + ajout du lien de suppression dans le value
			topics = topics.replace(/(<tr class="tr[12]">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" id="msg_' + id + '" value="' + supLien[id] + '" /></td>\r\n<td>$2');
			// Topics invisibles
			topics = topics.replace(/(<tr class="trinv">\r?\n?)<td>(<img|&nbsp;)/, '$1<td><input type="checkbox" disabled="disabled" /></td>\r\n<td>$2');
		}
	}
	document.getElementById('liste_topics').innerHTML = topics;
}

function sup_page_messages() {

    document.getElementById('menu_interactif').innerHTML = document.getElementById('menu_interactif').innerHTML.replace(/<\/ul>(\r?\n?)$/, "</ul>$1</div>\r\n<div id=\"menu_actions\">\r\n<h3 style=\"background: url(http://jvcprono.free.fr/root/img/t_sommaire_actions.gif);\"><span>Actions</span></h3>\r\n<ul>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = true;} return false;\">Tout cocher</a></li>\r\n<li><a href=\"#\" onclick=\"for (var i = 1; document.getElementById('msg_' + i); i++) {document.getElementById('msg_' + i).checked = false;} return false;\">Tout d&eacute;cocher</a></li>\r\n</ul>\r\n");
    document.getElementById('menu_actions').innerHTML = document.getElementById('menu_actions').innerHTML.replace(/<\/ul>/, "<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer TOUTE votre sÃ©lection ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).checked) { if (document.getElementById('msg_' + i).value != '') {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}}} return false;\">Effacer (s&eacute;lection)</a></li>\r\n<li><a href=\"#\" onclick=\"var root_confirmation = confirm('Etes vous sÃ»r(e) de vouloir effacer la TOTALITÃ‰ des messages de cette page ?'); for (var i = 1; document.getElementById('msg_' + i) && root_confirmation; i++) { if (document.getElementById('msg_' + i).value != '') {window.open(document.getElementById('msg_' + i).value, 'popup_' + i)}} return false;\">Effacer (page)</a></li>\r\n</ul>");

	var divMessages = document.getElementsByTagName('div');
	// On initialise une autre variable pour les messages car i = pas fiable vu que Ã§a teste TOUTES les div
	var j = 1;
	
	for (var i = 1; divMessages[i]; i++)
	{
		if (divMessages[i].className == 'msg msg1' || divMessages[i].className == 'msg msg2')
		{
			var url = window.location.href;
			var urlInfos = url.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
			
			if (urlInfos[4] == 1 && j == 1) // Si c'est le tout premier post du topic
			{
				// On rÃ©cupÃ¨re le lien de suppression
				var supLien = divMessages[i].getElementsByTagName('a')[0].href;
				divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<li class="pseudo">\n/, '<li class="pseudo">\n<input type="checkbox" id="msg_' + j + '" disabled="disabled" value="" />\n');
				j++;
			}
			else
			{
				// On rÃ©cupÃ¨re le lien de suppression
				var supLien = divMessages[i].getElementsByTagName('a')[0].href;
				divMessages[i].innerHTML = divMessages[i].innerHTML.replace(/<li class="pseudo">\n/, '<li class="pseudo">\n<input type="checkbox" id="msg_' + j + '" value="' + supLien + '" />\n');
				j++;
			}
		}
	}
}

function lastPages(moderateur) {

	// On rÃ©cupÃ¨re toutes les balises <tr> puisque pas d'id sur celle qu'on cherche
	var trTopics = document.getElementsByTagName('tr');
	
	for (var i = 1; trTopics[i]; i++) // On Ã©xecute l'opÃ©ration autant de fois qu'il y a de balises <tr>
	{
		// Si on est sur le <tr> d'un topic (repÃ©rable grÃ¢ce aux classes)
		if (trTopics[i].className == 'tr1' || trTopics[i].className == 'tr2')
		{
			if (moderateur == 'on')
			{
				try {
				var nbrePages = trTopics[i].getElementsByTagName('td')[5].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[1].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[1];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');
	
				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
				
				} catch(err) {
				
				var nbrePages = trTopics[i].getElementsByTagName('td')[5].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[0].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[1];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');
	
				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
				}
			}
			else
			{
				var nbrePages = trTopics[i].getElementsByTagName('td')[3].innerHTML;
				var href = trTopics[i].getElementsByTagName('a')[0].href;
				var tdDossier = trTopics[i].getElementsByTagName('td')[0];
				var pages = Math.floor(nbrePages / 20 + 1);
				href = href.replace(/http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/, 'http://www.jeuxvideo.com/forums/1-$2-$3-' + pages + '-$5-$6-$7-$8.htm');

				tdDossier.innerHTML = tdDossier.innerHTML.replace(/<img src="(.*)" alt="">/, '<a href="' + href + '"><img src="$1" alt=""></a>');
			}
		}
	}
}

function init() {

	var urlInfos = window.location.href.match(/^http:\/\/www\.jeuxvideo\.com\/forums\/(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(\d{1,})\-(.*)\.htm/);
	
	if (urlInfos[1] == 0) // Si on est sur la liste des sujets
	{
		var lineTopicTd = document.getElementById('liste_topics').getElementsByTagName('tr'); // On vÃ©rifie si il y a la ligne de modÃ©ration
		if (lineTopicTd[0].getElementsByTagName('th')[1].className == 'col_moder')
		{	
			sup_page_topics(urlInfos[7]);
			var moderateur = 'on';
		}
	}
	else
	{
		var lineMsgs = document.getElementsByTagName('td');

		if (lineMsgs[10].getElementsByTagName('a')[1].className == 'bloquer')
		{
			sup_page_messages();
			var moderateur = 'on';
		}
		else if (lineMsgs[10].getElementsByTagName('a')[0].className == 'debloquer')
		{
			sup_page_messages();
			var moderateur = 'on';
		}
	}
	
	if (moderateur == undefined) {var moderateur = 'off';}
	lastPages(moderateur);
}

init();